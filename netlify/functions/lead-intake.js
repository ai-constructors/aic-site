// ============================================================================
// lead-intake.js — dual-write target for the aic-site contact form. Added
// 2026-08-14 (SA), Mary Max build, per Mark's ask: "we need both [email and
// Supabase] as a redundancy... Mary should be able to watch [Supabase] and
// take action."
//
// ARCHITECTURE (per Mark's approved 2026-08-13 ruling + the standing 2026-07-
// 03 ruling on Toto's deactivated mailbox_routes entry — lead/contact capture
// must NOT be built as an email-parsing "mail-consumer" pattern):
//   - contact.html's existing submit handler keeps posting to Netlify's own
//     native Forms endpoint ("/") completely unmodified. That path is the
//     guaranteed, already-working email notification and gates the visible
//     success/error message the visitor sees.
//   - contact.html ALSO fires a second, independent, best-effort POST to
//     THIS function, in parallel, fire-and-forget. This is the Supabase leg:
//     it writes the same submission into web_leads (tenant=house), which is
//     Mary Max's primary operational channel (see MaryMax-Agent-Spec-v0.1
//     §7: "Receives:... form submissions <- the site, pre-tagged by route").
//   - Neither leg can break the other. If this function is down, misconfig-
//     ured, or Supabase is unreachable, the visitor still sees Netlify's
//     normal success message and the email still sends. If Netlify Forms has
//     a bad day, the lead still lands in web_leads for Mary to find.
//
// This function does NOT reply to the lead, does not touch pilot@ai-
// constructors.com, and does not do anything Mary-side beyond the raw write
// — her log/acknowledge/triage loop is a separate scheduled function
// (jeeves-aic-site/netlify/functions/mary-lead-triage.js), reading from
// web_leads asynchronously. Keeping this function's job to "write the row,
// nothing else" means a slow or failing Mary-side process can never make the
// contact form itself feel broken.
//
// SECURITY: public, unauthenticated endpoint (this IS the public contact
// form's second write) — see the honeypot check and rate limiter below. No
// tenant is ever read from the request; it is hardcoded to 'house' since
// this site only ever represents AIC itself, never a client.
// ============================================================================
const crypto = require("crypto");
const db = require("./_supabase.js");

var TENANT = "house";

// ---- CORS -------------------------------------------------------------
function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
}
function cors(event) {
  var allow = allowedOrigins();
  var origin = ((event && event.headers) || {}).origin || ((event && event.headers) || {}).Origin || "";
  var acao;
  if (allow.length === 0) acao = origin || "*";
  else if (allow.indexOf(origin) !== -1) acao = origin;
  else acao = allow[0];
  return {
    "Access-Control-Allow-Origin": acao,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json"
  };
}

// ---- rate limiting: Netlify Blobs -> in-memory fallback ---------------
// Mirrors the pattern in jeeves-lamb-site/netlify/functions/_guard.js —
// same idiom, independent copy since this is a different site/deploy.
var _mem = null;
function memStore() {
  if (!_mem) _mem = new Map();
  return { get: function (k) { return _mem.has(k) ? _mem.get(k) : null; }, set: function (k, v) { _mem.set(k, v); } };
}
var _store = null;
function store() {
  if (_store) return _store;
  try {
    var b = require("@netlify/blobs");
    var s = b.getStore("aic-lead-intake-guard");
    _store = { get: function (k) { return s.get(k, { type: "json" }); }, set: function (k, v) { return s.setJSON(k, v); } };
  } catch (e) { _store = memStore(); }
  return _store;
}
async function getJSON(k, def) { try { var v = await store().get(k); return v == null ? def : v; } catch (e) { return def; } }
async function setJSON(k, v) { try { await store().set(k, v); } catch (e) {} }
function clientIp(event) {
  var h = (event && event.headers) || {};
  return h["x-nf-client-connection-ip"] || h["x-forwarded-for"] || "anon";
}
function ipId(event) { return "ip:" + crypto.createHash("sha256").update(String(clientIp(event))).digest("hex").slice(0, 16); }
var RATE_PER_MIN = Number(process.env.LEAD_INTAKE_RATE_PER_MIN || 6);
var RATE_PER_DAY = Number(process.env.LEAD_INTAKE_RATE_PER_DAY || 100);
async function rateOk(id) {
  var minK = "rl:" + id + ":" + Math.floor(Date.now() / 60000);
  var dayK = "rd:" + id + ":" + new Date().toISOString().slice(0, 10);
  var m = await getJSON(minK, 0), d = await getJSON(dayK, 0);
  if (m >= RATE_PER_MIN) return false;
  if (d >= RATE_PER_DAY) return false;
  await setJSON(minK, m + 1); await setJSON(dayK, d + 1);
  return true;
}

// ---- body parsing -------------------------------------------------------
// contact.html posts application/x-www-form-urlencoded (same body it sends
// to Netlify's native Forms endpoint) — parse that shape; also accept plain
// JSON in case a future caller sends it that way.
function parseBody(event) {
  var raw = event.body || "";
  var ct = ((event.headers || {})["content-type"] || (event.headers || {})["Content-Type"] || "");
  if (ct.indexOf("application/json") !== -1) {
    try { return JSON.parse(raw); } catch (e) { return {}; }
  }
  var out = {};
  var params = new URLSearchParams(raw);
  params.forEach(function (v, k) { out[k] = v; });
  return out;
}

var VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async function (event) {
  var CORS = cors(event);
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "POST only" }) };

  var rl = await rateOk(ipId(event));
  if (!rl) return { statusCode: 429, headers: CORS, body: JSON.stringify({ error: "rate_limited" }) };

  var body = parseBody(event);

  // Honeypot — mirrors the form's own bot-field. A filled honeypot is a bot;
  // return 200 so it doesn't learn anything, just don't write the row.
  if (body["bot-field"]) return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, skipped: "honeypot" }) };

  var name = (body.name || "").toString().trim();
  var email = (body.email || "").toString().trim();
  if (!name || !VALID_EMAIL.test(email)) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "name and a valid email are required" }) };
  }

  try {
    var lead = await db.create(TENANT, "web_leads", {
      source: "contact_form",
      submitted_name: name.slice(0, 300),
      submitted_email: email.slice(0, 300),
      submitted_phone: null,
      submitted_company: (body.company || "").toString().trim().slice(0, 300) || null,
      interest: (body.interest || "").toString().trim().slice(0, 200) || null,
      message: (body.message || "").toString().trim().slice(0, 5000) || null,
      raw_payload: body,
      status: "new"
    });
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, id: lead.id }) };
  } catch (e) {
    // Best-effort leg — log loudly server-side but never let this endpoint's
    // failure surface to the visitor (contact.html doesn't gate UX on this
    // call's result, but keep the response honest for anyone testing it
    // directly, e.g. Mark, or the mary-lead-triage.js smoke path).
    console.error("lead-intake write failed:", e.message);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "write_failed", detail: e.message }) };
  }
};
