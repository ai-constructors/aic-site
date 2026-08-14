// ============================================================================
// _supabase.js — tenant-scoped Supabase data access for aic-site's Netlify
// Functions. Added 2026-08-14 (SA), Mary Max lead-intake build.
// SERVER-SIDE ONLY. Never expose SUPABASE_SERVICE_KEY to the browser.
//
// This is aic-site's OWN copy, not a shared import from jeeves-lamb-site —
// the two are separate Netlify sites/repos/deploys. It deliberately mirrors
// jeeves-lamb-site/netlify/functions/_supabase.js's security model (service-
// role key, explicit per-table whitelist, tenant resolved by slug -> row) so
// the two codebases stay in the same idiom, but it is scoped down to only
// what aic-site's public marketing site actually needs to touch: web_leads.
// Add a table here only after it has tenant_id + RLS, same rule as the LAMB
// file. Do not widen this whitelist "just in case" — this file runs behind a
// PUBLIC, unauthenticated endpoint (lead-intake.js), so keeping it narrow is
// the safety margin.
//
// SECURITY MODEL
//  - Uses the service-role key (bypasses RLS) because this Netlify Function
//    runs in a trusted server context, not the browser, and the caller here
//    is an anonymous site visitor with no Supabase session/JWT to carry a
//    tenant claim — there is no other way for an anonymous form submission
//    to land tenant-scoped data. RLS stays enabled on web_leads as the
//    backstop for any other access path.
//  - tenant_id is NEVER taken from the request. lead-intake.js always calls
//    create() with the hardcoded 'house' tenant slug — this site only ever
//    writes leads for AIC's own house tenant (Mary Max, per her spec, is
//    AIC-house-only and never touches a client tenant).
// ============================================================================
const { createClient } = require("@supabase/supabase-js");

let _client = null;
function client() {
  if (_client) return _client;
  var url = process.env.SUPABASE_URL;
  var key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_KEY not configured");
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

// web_leads added 2026-08-14 (SA) — landing table for the contact form dual-
// write, per Mark's ask ("email only, or email and a supabase as well... I
// think we need both as a redundancy"). See create_web_leads migration.
var TENANT_SCOPED_TABLES = { web_leads: 1 };

function assertTenant(tenant) {
  if (!tenant || typeof tenant !== "string") {
    throw new Error("tenant is required and must be a verified value — refusing unscoped query");
  }
}
function assertTable(table) {
  if (!TENANT_SCOPED_TABLES[table]) {
    throw new Error('table "' + table + '" is not a recognized tenant-scoped table in aic-site _supabase.js');
  }
}

var _tenantCache = new Map();
async function tenantRow(tenant) {
  assertTenant(tenant);
  var key = tenant.toLowerCase();
  if (_tenantCache.has(key)) return _tenantCache.get(key);
  var res = await client().from("tenants").select("id,slug,name,status").ilike("slug", tenant).maybeSingle();
  if (res.error) throw res.error;
  if (!res.data) throw new Error("unknown tenant: " + tenant);
  if (res.data.status !== "active") throw new Error("tenant is not active: " + tenant + " (" + res.data.status + ")");
  _tenantCache.set(key, res.data);
  return res.data;
}

async function create(tenant, table, row) {
  assertTable(table);
  var t = await tenantRow(tenant);
  var payload = Object.assign({}, row, { tenant_id: t.id });
  delete payload.id; // never let a caller pick a primary key
  var res = await client().from(table).insert(payload).select().single();
  if (res.error) throw res.error;
  return res.data;
}

module.exports = { client, tenantRow, create };
