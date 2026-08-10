/* AIC — Jeeves preview widget. All sample data is fictitious. */
(function(){
"use strict";
if(!document.getElementById("chatLog")) return;
const DEFAULT_PITCH = `<span class="eyebrow">Pilot program — now selecting</span>
<h1 class="jw-h1">Run your back office <span class="cu">with AI agents.</span></h1>
<p>AIC's agents empower you to win, manage, and scale at your pace — not by replacing your people, but by taking the errors and the busywork off their desks and leaving an audit trail behind every call.</p><div class="icp">Built for GCs and specialty contractors — first bid through every stage after.</div><div class="pitch-cta"><a class="btn">Apply for the pilot →</a></div>`;

const ALA  = `<div class="ala">◆ Also available à la carte — <u>see module pricing</u></div>`;
/* To-Do and PO are platform-only: internal operations, never sold standalone */
const PLAT = `<div class="ala plat">◆ Platform only — internal operations, not sold à la carte</div>`;
/* Finance is the core the whole platform reports into — never à la carte */
const CORE = `<div class="ala core">◆ Core of the platform — every other module reports into it</div>`;
const CORE_DOCS = `<div class="ala core">◆ Core of the platform — the library every module files into</div>`;

/* ---------- miniaturized "first screen" of the Meet module, AIC-branded ---------- */
const MEET_PREVIEW = `
<div class="mp-cap"><span class="l">What Meet opens to</span><span class="r">Live module · miniaturized</span></div>
<div class="mp">
  <div class="mp-hd">
    <div class="mp-logo">AIC</div>
    <div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div>
  </div>
  <div class="mp-body">
    <div class="mp-h">Network Prospects</div>
    <div class="mp-find">🔍 Find a Conference</div>
    <div class="mp-chips">
      <span class="mp-chip on">All</span><span class="mp-chip">Texas</span><span class="mp-chip">PNW</span>
      <span class="mp-chip">National</span><span class="mp-chip">Federal</span><span class="mp-chip">CRM</span><span class="mp-chip">Archived</span>
    </div>
    <div class="mp-rel">
      <span class="mp-relpill">Active relationship ▾</span>
      <span class="mp-relpill">Follow-up due ▾</span>
      <span class="mp-relpill">Owner contacts ▾</span>
    </div>
    <div class="mp-grid">
      <button class="mp-card link" data-drill="fw2026">
        <span class="loc">Will Rogers Memorial Center, Fort Worth</span>
        <span class="cnt"><span class="n">25</span><span class="u">contacts</span></span>
        <span class="tg">TEXAS</span>
        <div class="nm">Build Fort Worth Construction Expo 2026</div>
        <div class="dt">Thu Aug 6, 2026 · 7:30 AM–6:00 PM CDT</div>
        <span class="go">Open the 25 contacts →</span>
      </button>
      <div class="mp-card">
        <span class="loc">Houston, TX</span><span class="cnt"><span class="n">0</span><span class="u">contacts</span></span>
        <span class="tg">TEXAS</span><div class="nm">Houston Build Expo</div><div class="dt">2026-08-11 to 2026-08-12</div>
      </div>
      <div class="mp-card">
        <span class="loc">Austin, TX</span><span class="cnt"><span class="n">0</span><span class="u">contacts</span></span>
        <span class="tg">TEXAS</span><div class="nm">Austin Build Expo</div><div class="dt">2026-05-27 to 2026-05-28</div>
      </div>
      <div class="mp-card">
        <span class="loc">Dallas, TX</span><span class="cnt"><span class="n">0</span><span class="u">contacts</span></span>
        <span class="tg">TEXAS</span><div class="nm">Dallas Build Expo</div><div class="dt">2026-04-22 to 2026-04-23</div>
      </div>
      <div class="mp-card">
        <span class="loc">Round Rock, TX</span><span class="cnt"><span class="n">0</span><span class="u">contacts</span></span>
        <span class="tg">TEXAS</span><div class="nm">ABC Central Texas Construction Summit</div><div class="dt">2026-06-04</div>
      </div>
      <div class="mp-card">
        <span class="loc">Spokane, WA</span><span class="cnt"><span class="n">0</span><span class="u">contacts</span></span>
        <span class="tg">PNW</span><div class="nm">APWA Washington Chapter</div><div class="dt">2026-09-16 to 2026-09-18</div>
      </div>
    </div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
  <div class="mp-fab">+</div>
</div>`;

/* ---------- LEVEL 2: the conference contact board, with a working tier selector ----------
   All people, companies and projects below are FICTITIOUS sample data. ---------- */
const MEET_DRILL_FW = `<span class="eyebrow">Meet</span>
<h2>Build Fort Worth <span class="cu">Construction Expo 2026.</span></h2>
<p>25 contacts captured on the floor, deduped against your CRM, and tiered by who's worth your time.</p>
${ALA}
<div class="mp-cap"><span class="l">Conference · contact board</span><span class="r">Level 2 · fictitious sample data</span></div>
<div class="mp">
  <div class="mp-hd"><div class="mp-logo">AIC</div><div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div></div>
  <div class="mp-body" id="cbBoard">
    <button class="dd-back" data-drill="back">← Network Prospects</button>
    <div class="cb-actions"><span class="cb-btn">Edit</span><span class="cb-btn">Perform Dossier</span><span class="cb-btn danger">Delete event</span></div>
    <div class="cb-search">🔍 Search name or company</div>
    <div class="cb-tiers">
      <button class="cb-tier on" data-tier="all">All</button>
      <button class="cb-tier" data-tier="1">Tier 1</button>
      <button class="cb-tier" data-tier="2">Tier 2</button>
      <button class="cb-tier" data-tier="3">Tier 3</button>
      <button class="cb-tier" data-tier="spk">Speakers</button>
    </div>

    <div data-tiergroup="1">
      <div class="cb-gh">Tier 1 · Must-meet</div>
      <div class="cb-list">
        <div class="cb-row" data-tier="1" data-speaker="1"><div class="cb-av">M</div><div>
          <div class="cb-nm">Metro Regional Airport — A/E/C Capital Program <span class="cb-badge">Speaker</span></div>
          <div class="cb-sub"><b>Owner / Public Airport Authority</b> · Metro Regional Air…</div></div><span class="cb-dot"></span></div>

        <button class="cb-row link" data-tier="1" data-speaker="1" data-drill="dossier"><div class="cb-av">AW</div><div>
          <div class="cb-nm">Alan Whitcomb <span class="cb-badge">Speaker</span></div>
          <div class="cb-sub"><b>Project Executive</b> · Brennan Vance Partnership</div>
          <div class="cb-go">Open dossier →</div></div><span class="cb-dot"></span></button>

        <div class="cb-row" data-tier="1"><div class="cb-av">DP</div><div>
          <div class="cb-nm">Dale Prentiss</div>
          <div class="cb-sub"><b>Partner &amp; Senior Vice President</b> · Halvorsen General…</div></div><span class="cb-dot"></span></div>

        <div class="cb-row" data-tier="1" data-speaker="1"><div class="cb-av">T</div><div>
          <div class="cb-nm">Trinity Valley Health — Hospital Addition <span class="cb-badge">Speaker</span></div>
          <div class="cb-sub"><b>Owner / Health System</b> · Trinity Valley Health</div></div><span class="cb-dot"></span></div>
      </div>
    </div>

    <div data-tiergroup="2">
      <div class="cb-gh">Tier 2 · Worth a stop</div>
      <div class="cb-list">
        <div class="cb-row" data-tier="2"><div class="cb-av">MV</div><div>
          <div class="cb-nm">Marisol Vega</div>
          <div class="cb-sub"><b>Director of Facilities</b> · Cedar Park ISD</div></div><span class="cb-dot"></span></div>
        <div class="cb-row" data-tier="2" data-speaker="1"><div class="cb-av">GA</div><div>
          <div class="cb-nm">Grant Ashford <span class="cb-badge">Speaker</span></div>
          <div class="cb-sub"><b>Preconstruction Manager</b> · Sundial Builders</div></div><span class="cb-dot"></span></div>
      </div>
    </div>

    <div data-tiergroup="3">
      <div class="cb-gh">Tier 3 · If time allows</div>
      <div class="cb-list">
        <div class="cb-row" data-tier="3"><div class="cb-av">PR</div><div>
          <div class="cb-nm">Priya Raman</div>
          <div class="cb-sub"><b>Estimating Lead</b> · Kestrel Mechanical</div></div><span class="cb-dot"></span></div>
      </div>
    </div>

    <div class="ex-note" style="margin-top:12px">Jeeves logged each badge scan, enriched it from public sources, and tiered it. You approve every follow-up — nothing goes out on its own.</div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
</div>`;

/* ---------- LEVEL 3: the dossier — scrollable, to show depth. FICTITIOUS. ---------- */
const MEET_DOSSIER = `<span class="eyebrow">Meet · Dossier</span>
<h2>The homework, <span class="cu">already done.</span></h2>
<p>Every Tier 1 name comes with a compiled dossier — who they are, what they're building, and what to open with. Scroll it.</p>
${ALA}
<div class="mp-cap"><span class="l">Contact dossier</span><span class="r">Level 3 · scrollable · fictitious</span></div>
<div class="mp">
  <div class="mp-hd"><div class="mp-logo">AIC</div><div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div></div>
  <div class="mp-body">
    <button class="dd-back" data-back="1">← Build Fort Worth Expo 2026</button>
    <div class="dos">
      <div><div class="dos-av">AW</div><span class="dos-add">+ Add photo</span></div>
      <div class="dos-badges">
        <span class="dos-badge hot">Tier 1 · Must-meet</span><span class="dos-badge hot">Speaker</span><span class="dos-badge">High confidence</span>
      </div>
      <div class="dos-name">Alan Whitcomb</div>
      <div class="dos-role">Project Executive</div>
      <div class="dos-co">Brennan Vance Partnership</div>
      <div class="dos-proj">GC/CM Joint Venture — Cedar Ridge Pediatric Campus ($540M)</div>

      <div class="dos-sec"><div class="dos-lbl">Contact</div>
        <div class="dos-fld">Phone</div><div class="dos-fld" style="margin-bottom:0">Email</div></div>

      <div class="dos-sec"><div class="dos-lbl">Diligence status</div>
        <div class="dos-stat"><span>Cleared</span><span class="on">Under review</span><span>Avoid</span></div>
        <div class="dos-hint">Choose a status after reviewing the dossier.</div></div>

      <div class="dos-sec"><div class="dos-lbl">Who they are</div>
        <div class="dos-p">Confirmed 2026 Build Fort Worth session presenter (session PDF, Jun 12, 2026) for the Cedar Ridge Pediatric Campus. Brennan Vance Partnership is the GC/CM joint-venture partner on the healthcare package. Whitcomb has run the JV's precon desk for six years and sits on the trade-partner selection committee.</div></div>

      <div class="dos-sec"><div class="dos-lbl">Why they matter to you</div>
        <ul class="dos-ul">
          <li>Cedar Ridge releases three trade packages in Q1 — concrete, structural steel, masonry.</li>
          <li>All three match work you self-perform.</li>
          <li>The JV prequalifies subs 90 days ahead of bid. That window opens next month.</li>
          <li>He controls who gets on the invite list, not just who wins.</li>
        </ul></div>

      <div class="dos-sec"><div class="dos-lbl">Where you've crossed</div>
        <ul class="dos-ul">
          <li>Regional ABC summit, Mar 2025 — same panel audience, no direct contact logged.</li>
          <li>Two shared trade partners: Kestrel Mechanical, Sundial Builders.</li>
          <li>No prior bid history with his firm — you are a cold but well-matched approach.</li>
        </ul></div>

      <div class="dos-sec"><div class="dos-lbl">How to open</div>
        <ul class="dos-ul">
          <li>Lead with the self-perform crews — the JV is publicly short on masonry capacity.</li>
          <li>Reference the Cedar Ridge phasing plan; he presented it Thursday at 10:15.</li>
          <li>Ask about the prequal window, not the bid. He controls the first, not the second.</li>
        </ul></div>

      <div class="dos-sec"><div class="dos-lbl">Sources</div>
        <div class="dos-src">
          · Conference session PDF — Jun 12, 2026<br>
          · Owner capital plan, public board packet — Q2 2026<br>
          · JV award notice, trade press — Apr 2026<br>
          · Your CRM — 2 shared trade partners
        </div></div>

      <div class="ex-note" style="margin-top:11px">Compiled by Jeeves before you walked the floor. Every claim carries its source — nothing here is invented.</div>
    </div>
    <div class="dos-scroll">↕ scroll the dossier</div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
</div>`;

/* ---------- To-Do module: the internal work queue. Platform-only, never à la carte. ---------- */
const TODO_PREVIEW = `
<div class="mp-cap"><span class="l">What To-Do opens to</span><span class="r">Live module · miniaturized</span></div>
<div class="mp">
  <div class="mp-hd"><div class="mp-logo">AIC</div><div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div></div>
  <div class="mp-body">
    <div class="mp-h">To-Do</div>
    <div class="td-chips"><span class="td-chip on">All</span><span class="td-chip">Waiting on you</span>
      <span class="td-chip">Assigned out</span><span class="td-chip">To verify</span></div>

    <div class="td-gh">Waiting on you <span class="ct">· 3 open</span></div>
    <div class="td-list">
      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Review and sign Crimson High School proposals</div>
        <div class="td-m"><span class="td-src">Docs</span><span class="td-due today">Due today</span></div>
      </div><span class="td-act">Sign</span></div>

      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Contact Tier 1: Mike Springer</div>
        <div class="td-m"><span class="td-src">Meet</span><span class="td-due over">Overdue · Aug 6</span></div>
      </div><span class="td-act">Open</span></div>

      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Review safety plan for Jasper Plumbing</div>
        <div class="td-m"><span class="td-src">Inspect</span></div>
      </div><span class="td-act">Review</span></div>
    </div>

    <div class="td-gh">In progress <span class="ct">· 2 open</span></div>
    <div class="td-list">
      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Continue working on Excalibur Fuel Station estimate</div>
        <div class="td-m"><span class="td-src">Estimating</span><span class="td-due soon">Due Thu Aug 13</span></div>
      </div><span class="td-act wait">Resume</span></div>

      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Continue working on Alegrii Skybridge estimate</div>
        <div class="td-m"><span class="td-src">Estimating</span></div>
      </div><span class="td-act wait">Resume</span></div>
    </div>

    <div class="td-gh">Assigned out <span class="ct">· 1 open</span></div>
    <div class="td-list">
      <div class="td-row"><span class="td-ck"></span><div class="td-b">
        <div class="td-t">Interview Jeremy Sadsack for the warehouse manager</div>
        <div class="td-m"><span class="td-src">PM</span><span class="td-due soon">Due Mon Aug 17</span></div>
      </div><span class="td-act wait">Verify</span></div>
    </div>

    <div class="ex-note" style="margin-top:11px">Every item here was raised by an agent that hit a decision only a person can make. Nothing advances until someone accepts it.</div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
</div>`;

/* ---------- Recpt module: the field capture screen. PHONE-ONLY. FICTITIOUS job/vendor/coords. ---------- */
const RECPT_PREVIEW = `
<div class="mp-cap"><span class="l">What Recpt opens to</span><span class="r">Phone only · miniaturized</span></div>
<div class="mp phone">
  <div class="mp-hd"><div class="mp-logo">AIC</div><div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div></div>
  <div class="mp-body">
    <div class="rc-bar"><span>📷 Receipt photos</span><span>0 of 4 captured</span></div>
    <div class="rc-grid">
      <div class="rc-tile"><div class="rc-half cam"><span class="g">📷</span>Camera</div><div class="rc-half gal"><span class="g">🖼</span>Gallery</div></div>
      <div class="rc-tile"><div class="rc-half cam"><span class="g">📷</span>Camera</div><div class="rc-half gal"><span class="g">🖼</span>Gallery</div></div>
      <div class="rc-tile"><div class="rc-half cam"><span class="g">📷</span>Camera</div><div class="rc-half gal"><span class="g">🖼</span>Gallery</div></div>
      <div class="rc-tile"><div class="rc-half cam"><span class="g">📷</span>Camera</div><div class="rc-half gal"><span class="g">🖼</span>Gallery</div></div>
    </div>

    <div class="rc-sec"><div class="rc-sh">🎤 What's this for?</div><div class="rc-sb">
      <div class="rc-voice"><div class="rc-mic">🎤</div>
        <div class="rc-quote">"This is for CR-2214 — rebar delivery from Ridgeline Supply"</div></div>
      <div class="rc-hint">Tap the mic and speak, or type directly.</div>
    </div></div>

    <div class="rc-sec"><div class="rc-sh">📁 Cost target</div><div class="rc-sb">
      <div class="rc-row"><div class="rc-sel">— Select project / cost target —</div><span class="rc-new">+ New</span></div>
    </div></div>

    <div class="rc-sec"><div class="rc-sh">💳 Payer</div><div class="rc-sb">
      <div class="rc-chips"><span class="rc-chip">Company card</span><span class="rc-chip on">Personal — reimb.</span>
      <span class="rc-chip">Owner equity</span><span class="rc-chip">Not reimb.</span></div>
    </div></div>

    <div class="rc-geo">📍 32.755490, -97.330750 (±55m)</div>
    <div class="rc-more">▾ Add manual details (vendor, amount, PO#)</div>
    <button class="rc-cta" data-drill="recpt2">📸 Capture &amp; send</button>
    <div class="rc-foot">Photos + note sent for extraction. Anything unclear is flagged for your review.</div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
</div>`;

/* what the capture turns into — the point of the module */
const RECPT_RESULT = `<span class="eyebrow">Recpt</span>
<h2>One photo in. <span class="cu">A coded transaction out.</span></h2>
<p>That's the whole loop — snapped at the gate, coded to the job before the truck is unloaded. No envelope of receipts at month-end.</p>
${ALA}
<div class="mp-cap"><span class="l">Receipt · coded &amp; filed</span><span class="r">Phone only · level 2 · fictitious</span></div>
<div class="mp phone">
  <div class="mp-hd"><div class="mp-logo">AIC</div><div class="mp-hd-ic"><i>👥</i><i>◎</i><i>📷</i><i>i</i><i>⇅</i><i>☾</i></div></div>
  <div class="mp-body">
    <button class="dd-back" data-drill="recpt1">← Capture screen</button>
    <div class="mp-h">Ridgeline Supply — $1,284.60</div>
    <div class="ex-scores" style="max-width:none">
      <div class="ex-score"><span class="lbl">Job</span><span class="val">CR-2214 · Cedar Ridge</span></div>
      <div class="ex-score"><span class="lbl">Cost code</span><span class="val">03-200 Reinforcing steel</span></div>
      <div class="ex-score"><span class="lbl">Payer</span><span class="val">Personal — reimbursable</span></div>
      <div class="ex-score"><span class="lbl">Status</span><span class="val good">Coded &amp; filed</span></div>
    </div>
    <div class="rc-sec"><div class="rc-sh">What happened after you hit send</div><div class="rc-sb">
      <ul class="rc-tl">
        <li><span class="tk">✓ 0:02</span><span>Vendor, date, and total read off the photo — $1,284.60, Ridgeline Supply.</span></li>
        <li><span class="tk">✓ 0:04</span><span>Matched to CR-2214 from your voice note, cost code inferred from the line items.</span></li>
        <li><span class="tk">✓ 0:06</span><span>GPS confirmed the delivery was logged at the jobsite, not the yard.</span></li>
        <li><span class="tk">✓ 0:09</span><span>Queued to your reimbursement run and posted to the job cost report.</span></li>
      </ul>
    </div></div>
    <div class="ex-note" style="margin-top:10px">The PO number was missing from the receipt, so it's flagged for your review rather than guessed.</div>
  </div>
  <div class="mp-sync"><span class="d"></span>synced</div>
</div>`;

/* ============ OUTPUT DOCUMENT SAMPLES — all fictitious ============ */
const CO = { name:'CORNERSTONE STRUCTURAL GROUP', tag:'"Built Level. Built Honest."',
  addr:'4180 Larkspur Way SE, Suite 220, Fairhaven WA 98371', ph:'(253) 555-0142', web:'cornerstonestructural.example' };
const PROJ = { name:'Larkspur Commerce Center — Building B Addition', id:'BID-SPLIT-20260808-409B',
  owner:'Larkspur Commerce Holdings', cc:'33 73 00' };

/* ---- estimate leaves; every parent total is computed, so the sheet always foots ---- */
const EST_LEAVES = [
  ['1.1.1.1','26 05 00','Electrical line drawings',1,'LS','Fee',1200],
  ['1.1.1.2','26 05 00','Electrical engineer design',1,'LS','Fee',6800],
  ['1.1.1.3','01 31 00','GC PM coordination',6,'HR','Labor',119.71],
  ['1.1.2.1','26 05 00','Electrical permit fee',1,'LS','Fee',1450],
  ['1.2.1.1','26 22 00','Pad-mounted transformer',1,'EA','Vendor',28400],
  ['1.2.1.2','03 30 00','Transformer pad & conduit',1,'LS','Sub',6900],
  ['1.3.1.1','26 24 16','400A distribution panel',1,'EA','Vendor',9850],
  ['1.3.1.2','26 24 16','Panel set &amp; feeder terminations',40,'HR','Labor',88.40],
  ['2.1.1.1','01 71 23','Survey &amp; layout',1,'LS','Sub',4200],
  ['2.1.1.2','31 23 16','Mass excavation',540,'CY','Sub',18.75],
  ['2.1.2.1','03 30 53','Footings — concrete',86,'CY','Sub',412.00],
  ['2.1.2.2','03 21 00','Reinforcing steel',9.4,'TON','Vendor',2380.00],
  ['2.1.3.1','03 30 53','Slab on grade — 4,800 SF',4800,'SF','Sub',9.85],
  ['2.1.3.2','07 26 00','Under-slab vapor barrier',4800,'SF','Vendor',0.62],
  ['2.2.1.1','05 12 00','Structural steel frame',31.5,'TON','Vendor',3850.00],
  ['2.2.1.2','05 12 00','Steel erection',1,'LS','Sub',46800],
  ['2.2.2.1','05 31 00','Metal deck',4800,'SF','Vendor',3.40],
  ['2.3.1.1','07 42 13','Insulated metal wall panel',6200,'SF','Sub',18.90],
  ['2.3.2.1','07 54 00','TPO roof assembly',4800,'SF','Sub',12.40],
  ['2.3.3.1','08 41 13','Storefront &amp; entrances',1,'LS','Sub',34200],
  ['3.1.1.1','23 09 00','Mechanical engineer design',1,'LS','Fee',12400],
  ['3.1.2.1','23 74 13','RTU — 20 ton, gas/electric',2,'EA','Vendor',31500],
  ['3.1.2.2','23 31 13','Ductwork &amp; distribution',1,'LS','Sub',52800],
  ['3.1.2.3','23 05 93','Test &amp; balance',1,'LS','Sub',6400],
  ['3.2.1.1','22 11 16','Domestic water rough-in',1,'LS','Sub',24600],
  ['3.2.1.2','22 13 16','Sanitary waste &amp; vent',1,'LS','Sub',21800],
  ['3.2.2.1','22 40 00','Plumbing fixtures',14,'EA','Vendor',980.00],
  ['3.3.1.1','26 05 19','Branch wiring &amp; devices',1,'LS','Sub',44900],
  ['3.3.2.1','26 51 00','Interior lighting package',1,'LS','Vendor',28700],
  ['3.3.3.1','28 31 00','Fire alarm system',1,'LS','Sub',18400],
  ['4.1.1.1','09 29 00','Metal stud &amp; gypsum board',1,'LS','Sub',38900],
  ['4.1.2.1','09 51 00','Acoustical ceilings',3900,'SF','Sub',6.20],
  ['4.1.3.1','09 65 00','Resilient flooring',3900,'SF','Sub',7.85],
  ['4.1.4.1','09 91 00','Painting &amp; finishes',1,'LS','Sub',16200],
  ['5.1.1.1','01 45 00','Commissioning agent',1,'LS','Fee',14800],
  ['5.1.2.1','01 77 00','Closeout &amp; O&amp;M package',1,'LS','Labor',5400],
  ['5.1.2.2','01 31 00','Project management — closeout',48,'HR','Labor',119.71],
];
const EST_TITLES = {
 '1':'Utility Service Upgrade','1.1':'Electrical Permits','1.1.1':'Electrical Design','1.1.2':'Electrical Permit Receipt',
 '1.2':'Electrical Transformer','1.2.1':'Transformer Set','1.3':'Electrical Panel','1.3.1':'Panel &amp; Feeders',
 '2':'Building B Addition — Shell','2.1':'Foundation','2.1.1':'Sitework &amp; Layout','2.1.2':'Footings','2.1.3':'Slab on Grade',
 '2.2':'Structural Frame','2.2.1':'Steel Frame','2.2.2':'Deck','2.3':'Building Envelope','2.3.1':'Wall Panel',
 '2.3.2':'Roofing','2.3.3':'Openings',
 '3':'MEP Systems','3.1':'Mechanical','3.1.1':'Mechanical Design','3.1.2':'HVAC Installation',
 '3.2':'Plumbing','3.2.1':'Plumbing Rough-In','3.2.2':'Fixtures',
 '3.3':'Electrical','3.3.1':'Branch Distribution','3.3.2':'Lighting','3.3.3':'Life Safety',
 '4':'Interior Build-Out','4.1':'Interior Finishes','4.1.1':'Partitions','4.1.2':'Ceilings','4.1.3':'Flooring','4.1.4':'Painting',
 '5':'Commissioning &amp; Closeout','5.1':'Closeout','5.1.1':'Commissioning','5.1.2':'Project Closeout'
};
function r2(n){ return Math.round(n*100)/100; }
function money(n){ return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function buildEstimate(){
  const tot={}, byType={};
  EST_LEAVES.forEach(l=>{
    const ext=l[3]*l[6], parts=l[0].split('.');
    for(let i=1;i<=parts.length;i++){
      const k=parts.slice(0,i).join('.');
      tot[k]=(tot[k]||0)+ext;
      if(i===parts.length-1){ byType[k]=byType[k]||{}; byType[k][l[5]]=(byType[k][l[5]]||0)+ext; }
    }
  });
  const keys=new Set(); EST_LEAVES.forEach(l=>{const p=l.split?[]:l[0].split('.');p.forEach((_,i)=>keys.add(p.slice(0,i+1).join('.')));});
  const sorted=[...keys].sort((a,b)=>{const A=a.split('.').map(Number),B=b.split('.').map(Number);
    for(let i=0;i<Math.max(A.length,B.length);i++){if((A[i]||0)!==(B[i]||0))return (A[i]||0)-(B[i]||0);} return 0;});
  const leafMap={}; EST_LEAVES.forEach(l=>leafMap[l[0]]=l);
  let rows='';
  sorted.forEach(k=>{
    const d=k.split('.').length, leaf=leafMap[k];
    if(leaf){
      rows+='<tr class="lf"><td>'+leaf[1]+'</td><td>'+k+'</td><td class="ds">'+leaf[2]+'</td><td class="r">'+leaf[3]+
        '</td><td>'+leaf[4]+'</td><td>'+leaf[5]+'</td><td class="r">'+money(leaf[6])+'</td><td class="r b">'+money(leaf[3]*leaf[6])+'</td></tr>';
    } else {
      rows+='<tr class="lv'+d+'"><td></td><td>'+k+'</td><td class="ds" colspan="5">'+(EST_TITLES[k]||'')+'</td>'+
        '<td class="r b">'+money(tot[k])+'</td></tr>';
      if(byType[k]){
        rows+='<tr class="bt"><td colspan="8">Cost breakdown by type: '+
          Object.keys(byType[k]).map(t=>'<b>'+t+'</b> '+money(byType[k][t])).join(' &nbsp;|&nbsp; ')+'</td></tr>';
      }
    }
  });
  const cogs=EST_LEAVES.reduce((s,l)=>s+l[3]*l[6],0);
  return {rows:rows, cogs:cogs};
}
const EST = buildEstimate();
const OHP = EST.cogs*0.18, CONT = EST.cogs*0.10;

const DOC_ESTIMATE = ''+
'<div class="dn">Auto-generated from the live WBS on 9/8/2026, 11:15:52 PM — regenerates automatically whenever Input changes affect this Estimate. AACE Class 5 (conceptual) unless a design set says otherwise.</div>'+
'<div class="sumbox"><div class="cogs">COGS (Total Estimate, Level 0 direct cost): <b>'+money(EST.cogs)+'</b></div>'+
 '<div class="bkr"><div class="bk"><span class="l">Low bookend</span><span class="v">'+money(EST.cogs+CONT*0.5)+'</span>'+
 '<span class="s">Vendor 0% + Labor 0% + Profit 0% + Contingency 5%</span></div>'+
 '<div class="bk"><span class="l">High bookend</span><span class="v">'+money(EST.cogs+OHP+CONT)+'</span>'+
 '<span class="s">OHP 18% + Contingency 10%</span></div></div>'+
 '<div class="gt">Grand Total (active price): <b>'+money(EST.cogs+OHP+CONT)+'</b></div></div>'+
'<div class="esttbl"><table class="est"><thead><tr><th>Cost code</th><th>WBS #</th><th>Description</th><th class="r">Qty</th><th>Unit</th>'+
'<th>Cost type</th><th class="r">Unit price</th><th class="r">Extended total</th></tr></thead><tbody>'+EST.rows+'</tbody></table></div>';

const DOC_PROPOSAL = ''+
'<div class="lh"><div class="lhl"><div class="lg">CSG</div></div><div class="lhr">'+
 '<div class="cn">'+CO.name+'</div><div class="ct">'+CO.tag+'</div>'+
 '<div class="ca">'+CO.addr+' | '+CO.ph+' | '+CO.web+'</div></div></div>'+
'<div class="certs">SDVOSB · SBA-Certified SBE · WBE/WOSB · DOT DBE · CMMC-1 / Self Level 2 · NIST SP 800-171 · AGC Member · AGC Safety Team</div>'+
'<h3 class="ph">PROPOSAL</h3><div class="pd">September 8, 2026</div>'+
'<div class="to"><b>Marisol Vega</b><br>Director of Facilities<br>Larkspur Commerce Holdings<br>mvega@larkspurcommerce.example &nbsp;|&nbsp; (253) 555-0188</div>'+
'<div class="re"><b>RE: Proposal — '+PROJ.name+'</b> (4,800 SF single-story addition with full MEP), Larkspur Commerce Center, 4180 Larkspur Way SE, Fairhaven WA 98371.</div>'+
'<p>Dear Marisol,</p><p>Cornerstone Structural Group ("CSG") is pleased to submit the following proposal for the Building B Addition, based on the associated production drawings dated 8/28/2026.</p>'+
'<h4>Scope of Work</h4><ul>'+
'<li>New 4,800 SF single-story addition: foundation, structural steel frame, metal deck and building envelope.</li>'+
'<li>Utility service upgrade — pad-mounted transformer, 400A distribution panel and feeders.</li>'+
'<li>Complete MEP: two 20-ton rooftop units with distribution, domestic water and sanitary rough-in, 14 fixtures, branch wiring, lighting and fire alarm.</li>'+
'<li>Interior build-out — partitions, acoustical ceilings, resilient flooring and finishes.</li>'+
'<li>Commissioning, O&amp;M package and closeout documentation.</li></ul>'+
'<h4>Pricing</h4><p class="fp">Pricing below is firm fixed-price for the scope described.</p>'+
'<table class="prc"><tr><td>Furnish &amp; install, per approved scope and production drawings (includes material, freight, equipment, supervision and installation labor)</td><td class="r">'+money(EST.cogs+OHP)+'</td></tr>'+
'<tr><td>Contingency (10%) — released only against approved change</td><td class="r">'+money(CONT)+'</td></tr>'+
'<tr><td>WSST — state/local sales tax (10.4%)</td><td class="r">'+money((EST.cogs+OHP+CONT)*0.104)+'</td></tr>'+
'<tr class="tt"><td>TOTAL PROPOSED PRICE</td><td class="r">'+money(r2(EST.cogs+OHP)+r2(CONT)+r2((EST.cogs+OHP+CONT)*0.104))+'</td></tr></table>'+
'<h4>Clarifications &amp; Exclusions</h4><ul>'+
'<li>Pricing is based on the referenced production drawings as currently issued; a material change in scope, quantities, dimensions, or a subsequent revision may require this proposal to be requoted.</li>'+
'<li>Sales tax is shown as an estimate and will be confirmed to the exact combined rate in effect for the job-site address at time of invoicing.</li>'+
'<li>Excluded: hazardous material abatement, permit fees, owner-furnished equipment, off-hours premium time, and site security.</li>'+
'<li>Proposal valid for thirty (30) days from the date of this letter unless extended in writing.</li></ul>'+
'<p>CSG appreciates the opportunity to bid this project. Please contact us with any questions.</p>'+
'<div class="sig">Respectfully,<br><br><b>D. Prentiss</b><br>Partner &amp; Senior Vice President<br>'+CO.name+'</div>';

/* ---- schedule: 3-month addition, Sep–Nov 2026 ---- */
const LARK_SCHED = [
 ['major','1','Utility Service Upgrade'],
 ['sub','1.1','Electrical Permits'],
 ['wp','1.1.1','Electrical design','2026-09-02','2026-09-17'],
 ['wp','1.1.2','Electrical application','2026-09-18','2026-10-02'],
 ['wp','1.1.3','Application revision','2026-10-05','2026-10-13'],
 ['wp','1.1.4','Permit receipt','2026-10-14','2026-10-15'],
 ['sub','1.2','Electrical Transformer'],
 ['wp','1.2.1','Transformer set','2026-10-16','2026-10-23'],
 ['sub','1.3','Electrical Panel'],
 ['wp','1.3.1','Panel &amp; feeders','2026-10-26','2026-11-04'],
 ['major','2','Building B Addition — Shell'],
 ['sub','2.1','Foundation'],
 ['wp','2.1.1','Survey &amp; excavation','2026-09-02','2026-09-11'],
 ['wp','2.1.2','Footings','2026-09-14','2026-09-25'],
 ['wp','2.1.3','Slab on grade','2026-09-28','2026-10-07'],
 ['sub','2.2','Structural Frame'],
 ['wp','2.2.1','Steel frame','2026-10-08','2026-10-23'],
 ['wp','2.2.2','Metal deck','2026-10-26','2026-10-30'],
 ['sub','2.3','Envelope'],
 ['wp','2.3.1','TPO roofing','2026-11-02','2026-11-10'],
 ['wp','2.3.2','Wall panel','2026-11-11','2026-11-20'],
 ['wp','2.3.3','Storefront &amp; entrances','2026-11-23','2026-11-27'],
 ['major','3','MEP Systems'],
 ['sub','3.1','Mechanical'],
 ['wp','3.1.1','Mechanical design','2026-09-02','2026-09-23'],
 ['wp','3.1.2','HVAC rough &amp; RTU set','2026-10-26','2026-11-13'],
 ['sub','3.2','Plumbing'],
 ['wp','3.2.1','Plumbing rough-in','2026-10-12','2026-10-30'],
 ['sub','3.3','Electrical'],
 ['wp','3.3.1','Branch wiring &amp; devices','2026-11-02','2026-11-20'],
 ['wp','3.3.2','Fire alarm','2026-11-23','2026-11-27'],
 ['major','4','Interior Build-Out'],
 ['sub','4.1','Interior Finishes'],
 ['wp','4.1.1','Partitions &amp; gypsum board','2026-11-09','2026-11-20'],
 ['wp','4.1.2','Ceilings &amp; flooring','2026-11-23','2026-11-27'],
 ['major','5','Commissioning &amp; Closeout'],
 ['sub','5.1','Closeout'],
 ['wp','5.1.1','Commissioning','2026-11-30','2026-12-04']
];
const LARK_MONTHS=[[2026,7],[2026,8],[2026,9],[2026,10],[2026,11],[2027,0]];
const LARK_UNSCHED=['2.1.4 Concrete slab infill','3.1.3 Controls integration','4.1.3 Signage &amp; wayfinding'];
const SCH_MONTHS=[[2026,7],[2026,8],[2026,9],[2026,10],[2026,11]];
const MNAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
const SCH_TASKS=[
 ['1','1.1.1','Electrical design','2026-09-02','2026-09-17'],
 ['1','1.1.2','Electrical permit application','2026-09-18','2026-10-02'],
 ['1','1.2.1','Transformer set','2026-10-05','2026-10-14'],
 ['1','1.3.1','Panel &amp; feeders','2026-10-15','2026-10-27'],
 ['2','2.1.1','Survey &amp; excavation','2026-09-02','2026-09-11'],
 ['2','2.1.2','Footings','2026-09-14','2026-09-25'],
 ['2','2.1.3','Slab on grade','2026-09-28','2026-10-07'],
 ['2','2.2.1','Structural steel frame','2026-10-08','2026-10-23'],
 ['2','2.2.2','Metal deck','2026-10-26','2026-10-30'],
 ['2','2.3.1','Wall panel','2026-11-02','2026-11-13'],
 ['2','2.3.2','TPO roofing','2026-11-02','2026-11-10'],
 ['2','2.3.3','Storefront &amp; entrances','2026-11-16','2026-11-20'],
 ['3','3.1.1','Mechanical design','2026-09-02','2026-09-23'],
 ['3','3.1.2','HVAC rough &amp; RTU set','2026-10-26','2026-11-13'],
 ['3','3.2.1','Plumbing rough-in','2026-10-12','2026-10-30'],
 ['3','3.3.1','Branch wiring &amp; devices','2026-11-02','2026-11-20'],
 ['3','3.3.3','Fire alarm','2026-11-16','2026-11-24'],
 ['4','4.1.1','Partitions &amp; gypsum board','2026-11-09','2026-11-20'],
 ['4','4.1.2','Ceilings &amp; flooring','2026-11-23','2026-11-27'],
 ['5','5.1.1','Commissioning','2026-11-23','2026-11-30'],
];
const MAJ={'1':'Utility Service Upgrade','2':'Building B Addition — Shell','3':'MEP Systems','4':'Interior Build-Out','5':'Commissioning &amp; Closeout'};
const MAJC={'1':'#B5552F','2':'#3f7d4f','3':'#2f6f8f','4':'#a8752b','5':'#6b5aa6'};
function dparse(s){const p=s.split('-');return new Date(p[0],p[1]-1,p[2]);}
function fmt(d){return (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();}
function buildSchedule(mi){
  const m=SCH_MONTHS[mi], y=m[0], mo=m[1];
  const ms=new Date(y,mo,1), me=new Date(y,mo+1,0), days=me.getDate();
  const vis=SCH_TASKS.filter(t=>dparse(t[3])<=me && dparse(t[4])>=ms);
  let list = vis.length ? vis.map(t=>'<div class="wp"><div class="wl">'+t[0]+' '+MAJ[t[0]].toUpperCase()+' / '+t[1]+'</div>'+
      '<div class="wr"><span>'+t[2]+'</span><span class="dt">'+fmt(dparse(t[3]))+'–'+fmt(dparse(t[4]))+'</span></div></div>').join('')
    : '<div class="wp"><div class="wr"><span>No work packages fall in this month.</span></div></div>';
  let gantt='';
  Object.keys(MAJ).forEach(k=>{
    const kids=SCH_TASKS.filter(t=>t[0]===k);
    gantt+='<div class="gh">'+k+' '+MAJ[k]+'</div>';
    kids.forEach(t=>{
      const s=dparse(t[3]), e=dparse(t[4]);
      const on = s<=me && e>=ms;
      let bar='';
      if(on){
        const a=Math.max(s,ms), b=Math.min(e,me);
        const left=((a-ms)/(days*864e5))*100, w=Math.max(2.2,((b-a)/(days*864e5)+1/days)*100);
        bar='<span class="bar" style="left:'+left+'%;width:'+w+'%;background:'+MAJC[k]+'"></span>';
      }
      gantt+='<div class="grow"><span class="gn'+(on?'':' dim')+'">'+t[1]+' '+t[2]+'</span><span class="gt">'+bar+'</span></div>';
    });
  });
  const done=SCH_TASKS.filter(t=>dparse(t[4])<ms).length;
  return {list:list, gantt:gantt, vis:vis.length, done:done, label:MNAMES[mo]+' '+y, days:days};
}
function DOC_SCHEDULE(){
  return '<div class="dn">Auto-generated from the live WBS on 9/8/2026, 11:15:52 PM — regenerates automatically whenever Input changes affect this Schedule.</div>'+
  '<h4 class="sh">Schedule</h4>'+
  '<div class="sn">Month-at-a-time Gantt. Each Major Deliverable has its own bar colour, shared by its Sub-Deliverables and Work Packages. Drag the slider or use Prev / Next to move through the project.</div>'+
  SCHED_UI('dec', LARK_SCHED, LARK_MONTHS, DEC.schMonth,
    {ntp:'2026-09-01', today:1, title:'Larkspur Commerce Center — Building B Addition', unscheduled:LARK_UNSCHED});
}

/* ================= DECIDE — multi-state module. ALL DATA FICTITIOUS. ================= */
const DEC = {
  view:'dash', calSel:null, pcTab:0, pcSplit:58, hiliTab:'input', hiliOpen:{}, outDoc:'est', schMonth:1, dwgPage:1, dwgZoom:100, showCz:true
};

const GO_CARDS = [
  { id:'BID-SPLIT-20260808-409B', t:'Larkspur Commerce Center — Building B Addition',
    dec:'8/8/2026 by D. Prentiss', due:'2026-08-12', open:true },
  { id:'BID-INTAKE-20260729-6QL1', t:'Cedar Park ISD warehouse addition for freezer',
    dec:'8/3/2026 by D. Prentiss', due:'2026-08-13' },
  { id:'BID-INTAKE-20260804-W1VY', t:'Ridgeline County Jail modular remodel',
    dec:'8/8/2026 by A. Cortez', due:'2026-08-13' },
  { id:'BID-SPLIT-20260805-A53E', t:'TVH MRI Suite 4 renovations — Trinity Valley Health',
    dec:'8/8/2026 by A. Cortez', due:'2026-08-14' },
];

const NOTIFS = [
  { t:'Northgate FD cleaning facility', d:'8/7/2026', live:true },
  { t:'Cedar Park College culinary school', d:'8/7/2026' },
  { t:'Northgate Fire — Station 67 restoration', d:'8/6/2026' },
  { t:'Ridgeline County Fairgrounds Bldg 6', d:'8/3/2026' },
  { t:'Larkspur State Park environmental', d:'7/6/2026' },
];

function decHead(){
  return '<div class="dc-hd"><div><div class="t">Decide</div>'+
    '<div class="s">Go/No-Go dashboard · bids awaiting your call</div></div>'+
    '<div class="dc-hd-r"><span class="dc-pill">C001-DEMO</span><span class="dc-pill">Updated 7s ago</span>'+
    '<span class="dc-pill">ALL &#9662;</span><span class="dc-pill">Refresh</span>'+
    '<span class="dc-pill act">Check estimating email now</span></div></div>';
}
function decTabs(active){
  const t=(k,l,on)=> on
    ? '<button class="dc-tab '+(active===k?'on':'live')+'" data-dc="'+k+'">'+l+'</button>'
    : '<span class="dc-tab off">'+l+'</span>';
  return '<div class="dc-tabs">'+t('dash','Decide (4)',true)+t(0,'To-Do (1)')+t(0,'Held (115)')+
    t('go','Go / Outcome (33)',true)+t(0,'Archived (200)')+t(0,'Shadow (0)')+t(0,'CRE Watch (5)')+'</div>';
}
const DEC_BTNS = '<div class="dc-btns"><span class="dc-b go">Go</span><span class="dc-b">No-Go</span>'+
  '<span class="dc-b no">Dead-Pit</span><span class="dc-b">Shadow-Bid</span><span class="dc-b">Outreach</span>'+
  '<span class="dc-b">It’s an RFP list</span><span class="dc-b">Edit due date…</span></div>'+
  '<div class="dc-attach">&#128206; Attach document</div>'+
  '<div class="dc-flag">&#9940; Not related to an RFP? Flag it and train the triage &#9662;</div>';

function DECIDE_DASH(){
  return decHead()+decTabs('dash')+
  '<div class="dc-lbl">Go / No-Go</div>'+
  '<div class="dc-tools"><div class="dc-search">Search by opportunity name or bid number…</div>'+
  '<span class="dc-tbtn">&#128279; Group by similarity</span><span class="dc-tbtn warn">Retire past-due (2)</span></div>'+
  '<div class="dc-sub"><span class="on">All (3)</span><span>Direct (2)</span><span>Platform invites (1)</span></div>'+

  '<div class="dc-card hot"><span class="dc-wait">0d waiting</span>'+
    '<button class="dc-ttl link" data-dc="intake">2026 Fairhaven WWTP solids building floor replacement</button>'+
    '<div class="dc-id">BID-INTAKE-20260807-P7V0 &#9998; Rename</div>'+
    '<div class="dc-due"><b>Due:</b> 2026-08-07</div>'+
    '<div class="dc-sig"><b>Due signal (unconfirmed):</b> 2026-aug-07</div>'+
    '<div class="dc-hint">&#9656; Click the title to open the intake detail</div>'+DEC_BTNS+'</div>'+

  '<div class="dc-card"><span class="dc-wait">1d waiting</span>'+
    '<div class="dc-ttl">BidFeed digest for August 8, 2026 [2419.A5570]</div>'+
    '<div class="dc-id">BID-INTAKE-20260808-099X &#9998; Rename</div>'+
    '<div class="dc-due"><b>Due:</b> 2026-08-08</div>'+
    '<div class="dc-sig"><b>Due signal (unconfirmed):</b> 2026-aug-08</div>'+DEC_BTNS+'</div>'+

  '<div class="dc-card"><span class="dc-wait">0d waiting</span>'+
    '<div class="dc-ttl">BidFeed digest for August 9, 2026 [2419.A5570]</div>'+
    '<div class="dc-id">BID-INTAKE-20260809-XHBG &#9998; Rename</div>'+
    '<div class="dc-due"><b>Due:</b> 2026-08-09</div>'+
    '<div class="dc-sig"><b>Due signal (unconfirmed):</b> 2026-aug-09</div>'+DEC_BTNS+'</div>'+

  '<div class="dc-lbl" style="margin-top:10px">Triage confirmations</div>'+
  '<div class="dc-card go"><span class="dc-wait">0d waiting</span>'+
    '<div class="dc-ttl">BidFeed digest for August 8, 2026 [15087.K04212]</div></div>';
}

function DECIDE_INTAKE(){
  return '<div style="position:relative">'+
  '<button class="ik-x" data-back="1">&#10005;</button>'+
  '<div class="ik-t">2026 Fairhaven WWTP solids building floor replacement</div>'+
  '<div class="ik-m">BID-INTAKE-20260807-P7V0 &middot; Due 2026-08-07 &middot; Stage: identified</div>'+
  '<div class="ik-m" style="margin-top:5px">Due signal (unconfirmed, from message text): 2026-aug-07</div>'+
  '<div class="ik-lbl">Documents (1)</div>'+
  '<div class="ik-doc"><span class="n">Solicitation &amp; Instructions — Fairhaven Solids Building Floor Replacement.pdf</span>'+
    '<span class="tag">Correspondence</span><div class="m">8/7/2026, 3:06:21 PM &middot; 250 KB &nbsp;·&nbsp; &#11015; Download</div></div>'+
  '<div class="ik-lbl">Source messages (2)</div>'+
  '<div class="ik-msg"><div class="sub">RE: 2026 Fairhaven WWTP solids building floor replacement</div>'+
  '<div class="rt">estimating+caf_c001-demo@intake.ai-constructors.com &rarr; c001-demo+estimating@intake.ai-constructors.com &middot; 8/7/2026, 3:06:21 PM</div>'+
  '<pre>From: Dana Reyes\nSent: Friday, August 7, 2026 2:47 PM\nTo: Dana Reyes &lt;danar@fairhavenworks.gov&gt;\nCc: Rob Fleming &lt;robf@fairhavenworks.gov&gt;; Priya Anand &lt;priyaa@fairhavenworks.gov&gt;\nSubject: RE: 2026 Fairhaven WWTP solids building floor replacement\n\nGood afternoon,\n\nThe City of Fairhaven is seeking bids through the regional small works roster for the\nWastewater Treatment Plant’s solids building floor replacement.\n\nPlease see the attached engineer’s document for description and instructions regarding\nthe bidding process.\n\nAll communications relating to the project should be directed to the following prior to\nthe opening of the bids:\n\nAlice Whitford\nProject Controls Specialist, Northline Engineering\n1019 39th Ave, Fairhaven WA 98371\n253-555-0142\nawhitford@northline-eng.example</pre>'+
  '<div style="margin-top:8px;font-size:8px;color:var(--copper)">&#128206; Solicitation &amp; Instructions.pdf &nearr; &nbsp; &#128065; View original email &nearr;</div>'+
  '</div>'+
  '<div class="ex-note" style="margin-top:10px">Jeeves pulled the bid out of the estimating inbox, attached the solicitation, and kept both source emails against the record. Fictitious sample data.</div>'+
  '</div>';
}

/* ---- calendar reflects the real due dates on the Go cards ---- */
function calendar(){
  const counts={};
  GO_CARDS.forEach(c=>{const d=parseInt(c.due.slice(8),10); counts[d]=(counts[d]||0)+1;});
  let cells='';
  ['S','M','T','W','T','F','S'].forEach(d=>cells+='<div class="dow">'+d+'</div>');
  for(let i=0;i<6;i++) cells+='<div class="d pad">0</div>';       /* Aug 1 2026 = Saturday */
  for(let d=1;d<=31;d++){
    const n=counts[d];
    const cls='d'+(d===9?' today':'')+(n?' has':'')+(DEC.calSel===d?' sel':'');
    cells+= n ? '<button class="'+cls+'" data-cal="'+d+'">'+d+'<span class="n">'+n+'</span></button>'
              : '<div class="'+cls+'">'+d+'</div>';
  }
  return '<div class="dc-side"><div class="h">Due-date calendar</div>'+
    '<div class="cal-hd"><span>&#8249;</span>August 2026<span>&#8250;</span></div>'+
    '<div class="cal">'+cells+'</div></div>';
}
function notifs(){
  return '<div class="dc-side"><div class="h">Active estimates and pending notifications</div>'+
    NOTIFS.map(n=>'<'+(n.live?'button class="nt link" data-dc="precon-out"':'div class="nt"')+'>'+
      '<span class="dt">'+n.d+'</span>'+n.t+(n.live?' &rarr;':'')+
      '</'+(n.live?'button':'div')+'>').join('')+
    '<div style="font-size:7.5px;color:var(--ink-soft);margin-top:5px">Top item is live — opens the estimate output.</div></div>';
}

function DECIDE_GO(){
  const sel=DEC.calSel;
  const shown=GO_CARDS.filter(c=>!sel || parseInt(c.due.slice(8),10)===sel);
  const cards=shown.map(c=>
    '<div class="dc-card '+(c.open?'hot':'go')+'">'+
    '<div class="dc-ttl">'+c.t+' <span style="font-family:var(--mono);font-size:6.5px;color:var(--good)">go</span>'+
    ' <span style="font-family:var(--mono);font-size:6.5px;color:var(--ink-soft)">Awaiting proposal</span></div>'+
    '<div class="dc-id">'+c.id+' &#9998; Rename</div>'+
    '<div class="dc-due"><b>Decided:</b> '+c.dec+'</div>'+
    '<div class="dc-due"><b>Due:</b> '+c.due+'</div>'+
    '<div class="dc-due" style="color:var(--ink-soft)">Target role: not set <span class="dc-b" style="margin-left:4px">Set</span></div>'+
    '<div class="dc-btns"><button class="dc-b '+(c.open?'on':'')+'"'+(c.open?' data-dc="precon"':'')+'>Open PreCon workspace &rarr;</button>'+
    '<span class="dc-b">Edit due date…</span><span class="dc-b">Record outcome…</span><span class="dc-b no">Dead-Pit…</span></div>'+
    (c.open?'<div class="dc-hint">&#9656; This one opens the workspace</div>':'')+'</div>').join('');
  return decHead()+decTabs('go')+
    '<div class="dc-lbl">Go — awaiting the actual outcome (won / not awarded)</div>'+
    '<div class="dc-cols"><div>'+
      '<div class="dc-tools"><div class="dc-search">Search by opportunity name or bid number…</div>'+
      '<span class="dc-tbtn" style="background:rgba(63,125,79,.12);border-color:rgba(63,125,79,.4);color:var(--good)">+ Add project (Go back door)</span></div>'+
      (sel?'<div class="dc-note"><span>Showing bids due <b>August '+sel+'</b> — '+shown.length+' of '+GO_CARDS.length+'</span><button class="dc-clear" data-cal="clear">Clear ✕</button></div>':'')+
      cards+
    '</div><div>'+calendar()+notifs()+'</div></div>';
}

/* ================= PreCon workspace ================= */
const PC_TABS=['1 Intake memo','2 00.1','3 00.2','4 00.3','5 00.4','6 00.5','7 00.6'];
const INTAKE_MEMO =
'# Intake Memo — BID-SPLIT-20260808-409B\n'+
'**Project:** Larkspur Commerce Center — Building B Addition | **Client/Owner:** Larkspur Commerce Holdings\n\n---\n\n'+
'This opportunity arrived via automated digest intake (source digest: BID-INTAKE-20260807-8EEQ) on\n'+
'2026-08-07 and was split out as its own bid item. The owner listed is Larkspur Commerce Holdings,\n'+
'headquartered in Fairhaven, WA. The listing title references a "Building B Addition" scope\n'+
'at Larkspur Commerce Center, but **no further scope detail was included in the extracted entry** —\n'+
'full details would require following the source link provided.\n\n---\n\n'+
'**Open items before this can move to estimating:**\n\n'+
'- **Scope of work** — "Building B Addition" square footage is unstated; no work description included in this entry\n'+
'- **Bid due date** — no due date or response deadline detected\n'+
'- **Project location** — site address not stated beyond the owner\'s admin address\n'+
'- **Solicitation number / document set** — no solicitation number, drawings, or specs attached\n'+
'- **Procurement type** — IFB, RFP, or sources-sought unknown\n'+
'- **Full listing details** — must be retrieved from: https://bidfeed.example/go?doc=4a7953a6-8e4c';

const FOLDER_DOCS = {
  1:{h:'00.1 — Solicitation &amp; addenda', items:[['Solicitation_Larkspur_BldgB.pdf','8/8/2026 · 1.2 MB'],['Addendum_01.pdf','8/9/2026 · 210 KB']]},
  3:{h:'00.3 — Specifications', items:[['Div_02_Existing_Conditions.pdf','8/8/2026 · 880 KB'],['Div_33_Utilities.pdf','8/8/2026 · 1.5 MB']]},
  4:{h:'00.4 — Site &amp; field notes', items:[['Prebid_Walk_Notes.md','8/9/2026 · 12 KB'],['Site_Photos.zip','8/9/2026 · 22 MB']]},
  5:{h:'00.5 — Subcontractor &amp; supplier quotes', items:[['Quote_Kestrel_Mechanical.pdf','8/10/2026 · 140 KB'],['Quote_Ridgeline_Supply.pdf','8/10/2026 · 96 KB']]},
};
const OUT_DOCS = {
  est:{n:'Estimate — Building B Addition (AACE Class 5).html', m:'9/8/2026 · live from WBS', body:function(){return DOC_ESTIMATE;}},
  sch:{n:'Schedule — Building B Addition.html',                m:'9/8/2026 · live from WBS', body:function(){return DOC_SCHEDULE();}},
  prop:{n:'Proposal — Building B Addition.html',               m:'9/8/2026 · firm fixed-price', body:function(){return DOC_PROPOSAL;}}
};
function outDocHtml(){ return '<div class="docwrap">'+OUT_DOCS[DEC.outDoc].body()+'</div>'; }

/* ---- 00.2 drawing sheet ---- */
function drawingSheet(){
  const z = DEC.dwgZoom/100;
  return '<div class="dv-ctl"><span class="f">Bldg_B_Addition_Level1.pdf &#9662;</span>'+
    '<button class="f" data-dwg="prev">&larr; Page</button><span class="f">'+DEC.dwgPage+' / 3</span>'+
    '<button class="f" data-dwg="next">Page &rarr;</button>'+
    '<button class="f" data-dwg="out">&minus;</button><span class="f">'+DEC.dwgZoom+'%</span>'+
    '<button class="f" data-dwg="in">+</button><button class="f" data-dwg="reset">Reset</button>'+
    '<span class="f">Grab &amp; pan sheet</span>'+
    '<button class="f'+(DEC.showCz?' on':'')+'" data-dwg="cz">'+(DEC.showCz?'Hide':'Show')+' capture zones</button></div>'+
  '<div class="dv-hint">Drag a box on the sheet to mark a detail — Jeeves confirms the description and scale in the window on the right. Capture zones in the way of a new box? Use &ldquo;Hide capture zones&rdquo; to clear them.</div>'+
  '<div class="dv-sheet"><svg viewBox="0 0 460 300" style="width:100%;display:block;transform:scale('+z+');transform-origin:top left">'+
    '<rect x="0" y="0" width="460" height="300" fill="#fff"/>'+
    '<g stroke="#c9c4b6" stroke-width=".4" stroke-dasharray="3 3">'+
      [1,2,3,4,5].map(function(i){return '<line x1="'+(40+i*62)+'" y1="14" x2="'+(40+i*62)+'" y2="272"/>';}).join('')+
      ['A','B','C','D'].map(function(l,i){return '<line x1="30" y1="'+(50+i*58)+'" x2="360" y2="'+(50+i*58)+'"/>';}).join('')+
    '</g>'+
    [1,2,3,4,5].map(function(i){return '<circle cx="'+(40+i*62)+'" cy="10" r="7" fill="#fff" stroke="#34352F" stroke-width=".6"/>'+
      '<text x="'+(40+i*62)+'" y="12.5" font-size="6" text-anchor="middle" fill="#34352F">'+i+'</text>';}).join('')+
    ['A','B','C','D'].map(function(l,i){return '<circle cx="24" cy="'+(50+i*58)+'" r="7" fill="#fff" stroke="#34352F" stroke-width=".6"/>'+
      '<text x="24" y="'+(52.5+i*58)+'" font-size="6" text-anchor="middle" fill="#34352F">'+l+'</text>';}).join('')+
    '<rect x="40" y="50" width="310" height="174" fill="none" stroke="#34352F" stroke-width="1.6"/>'+
    '<rect x="52" y="62" width="104" height="72" fill="none" stroke="#34352F" stroke-width=".8"/>'+
    '<rect x="52" y="146" width="104" height="66" fill="none" stroke="#34352F" stroke-width=".8"/>'+
    '<rect x="170" y="62" width="78" height="150" fill="none" stroke="#34352F" stroke-width=".8"/>'+
    '<rect x="262" y="62" width="76" height="70" fill="none" stroke="#34352F" stroke-width=".8"/>'+
    '<rect x="262" y="146" width="76" height="66" fill="none" stroke="#34352F" stroke-width=".8"/>'+
    '<text x="60" y="76" font-size="5.5" fill="#54524a">OPEN OFFICE 104</text>'+
    '<text x="60" y="160" font-size="5.5" fill="#54524a">SHOP 108</text>'+
    '<text x="178" y="76" font-size="5.5" fill="#54524a">CORRIDOR 101</text>'+
    '<text x="270" y="76" font-size="5.5" fill="#54524a">MECH / ELEC 112</text>'+
    '<text x="270" y="160" font-size="5.5" fill="#54524a">RESTROOMS 114</text>'+
    '<g stroke="#B5552F" stroke-width=".7">'+
      '<line x1="40" y1="238" x2="350" y2="238"/><line x1="40" y1="234" x2="40" y2="242"/><line x1="350" y1="234" x2="350" y2="242"/></g>'+
    '<text x="195" y="248" font-size="6" text-anchor="middle" fill="#B5552F">80\'-0"</text>'+
    '<rect x="370" y="14" width="82" height="258" fill="#fbf8ef" stroke="#34352F" stroke-width=".8"/>'+
    '<text x="411" y="40" font-size="6" text-anchor="middle" fill="#34352F">LARKSPUR</text>'+
    '<text x="411" y="50" font-size="6" text-anchor="middle" fill="#34352F">COMMERCE CTR</text>'+
    '<text x="411" y="62" font-size="5" text-anchor="middle" fill="#54524a">BUILDING B ADDITION</text>'+
    '<line x1="374" y1="70" x2="448" y2="70" stroke="#34352F" stroke-width=".5"/>'+
    '<text x="411" y="84" font-size="4.5" text-anchor="middle" fill="#54524a">LEVEL 1 — FLOOR PLAN</text>'+
    '<text x="411" y="96" font-size="4.5" text-anchor="middle" fill="#54524a">ISSUED 8/28/2026</text>'+
    '<rect x="378" y="240" width="66" height="24" fill="none" stroke="#34352F" stroke-width=".6"/>'+
    '<text x="411" y="255" font-size="9" text-anchor="middle" fill="#34352F">A1.01</text>'+
  '</svg>'+
  (DEC.showCz ?
    '<div class="cz" style="left:36%;top:20%;width:17%;height:24%"><span class="lb" style="left:104%;top:0">4,800 SF addition — slab on grade, 6" thickened edge</span></div>'+
    '<div class="cz" style="left:57%;top:49%;width:17%;height:22%"><span class="lb" style="left:-96%;top:60%">Mech/elec room — 2 RTU curbs, 400A panel</span></div>' : '')+
  '</div>';
}

function pcSplitStyle(){ return 'grid-template-columns:'+DEC.pcSplit+'% 7px auto'; }

function hiliCats(){
  const cats=[['Bid rate settings','Set up','Crew rates, burden, and equipment rates that every estimate inherits. Set once per company, override per job.'],
    ['Cost codes (CSI MasterFormat)','Manage','Your division and section codes. Estimates, POs and receipts all post against this one list.'],
    ['Market categories','Manage','Public works, federal, K-12, healthcare, industrial — drives which bid feeds get watched.'],
    ['Project types','Manage','New construction, TI, renovation, civil. Used to score fit on Go/No-Go.'],
    ['General exclusions','Manage','Boilerplate exclusions pulled into every proposal so nothing gets promised by accident.'],
    ['Contract types','Manage','Lump sum, T&amp;M, unit price, GC/CM — sets which contract language the proposal uses.']];
  return cats.map((c,i)=>'<div class="pc-cat"><button class="row" data-hili="cat'+i+'">'+
    '<span class="nm">'+c[0]+'</span><span class="mg">'+(DEC.hiliOpen['cat'+i]?'−':c[1])+'</span></button>'+
    (DEC.hiliOpen['cat'+i]?'<div class="body">'+c[2]+'</div>':'')+'</div>').join('');
}
function hiliWbs(){
  const w=[['0.0','Market &amp; project type','Public works — water/wastewater. Fits your self-perform concrete and utilities lanes.'],
    ['0.1','Client information / point of contact','Larkspur Commerce Holdings — contracting officer not yet named in the listing.'],
    ['0.2','Project name, address &amp; owner','Larkspur Fish Hatchery; exact site address still outstanding from the source listing.'],
    ['0.3','Client-directed concerns &amp; instructions','None captured yet — no solicitation document has been attached.'],
    ['0.4','Contract information &amp; documents','Procurement type unknown (IFB / RFP / sources-sought).']];
  return w.map(x=>'<button class="pc-wbs" data-hili="wbs'+x[0]+'">'+x[0]+' '+x[1]+' <span class="st">'+
    (DEC.hiliOpen['wbs'+x[0]]?'':'not started')+'</span>'+
    (DEC.hiliOpen['wbs'+x[0]]?'<div class="body">'+x[2]+'</div>':'')+'</button>').join('');
}

function hiliInput(){
  return '<div class="pc-blurb">WBS-structured project build-out. Level 0 (project information) today — levels 1–5 (major deliverables through document attachment) are later phases.</div>'+
  '<div class="pc-sec">Price acceptance (contract / T&amp;M / notice of award)</div>'+
  '<div class="pc-blurb">Root of every predecessor chain — procurement planning starts here. Not yet decided.</div>'+
  '<div class="pc-chips"><span class="pc-chip on">Proposal accepted</span><span class="pc-chip">Negotiation</span><span class="pc-chip">Proposal rejected</span></div>'+
  hiliCats()+
  '<div class="pc-cat"><button class="row" data-hili="pid"><span class="nm">Project identity</span>'+
   '<span class="mg">'+(DEC.hiliOpen.pid?'−':'Expand')+'</span></button>'+
   (DEC.hiliOpen.pid?'<div class="body">Larkspur Commerce Center — Building B Addition &middot; 4,800 SF single-storey commercial addition, full MEP.</div>':'')+'</div>'+
  '<div class="pc-sec" style="margin-top:10px">WBS breakdown — levels 1–5</div>'+
  '<div class="pc-crumb"><span>WBS root</span> / <b>1: Utility Service Upgrade</b></div>'+
  '<div class="pc-md"><div class="mdh">1 — Major Deliverable</div>'+
   '<div class="mdrow"><span class="fld">Utility Service Upgrade</span><span class="pc-sm">Save</span>'+
   '<span class="ok">&#10003; Saved 9/6/2026</span></div>'+
   '<div class="mdl">Cost code</div><div class="fld">26 05 00</div>'+
   '<div class="mdl">Sub-deliverables — drag to reorder, or onto another to nest underneath:</div>'+
   '<div class="sd">1.1 Electrical Permits — $10,168.26 | Dur 43d | 09/02/2026 – 10/15/2026</div>'+
   '<div class="sd">1.2 Electrical Transformer — $35,300.00 | Dur 8d | 10/05/2026 – 10/14/2026</div>'+
   '<div class="sd">1.3 Electrical Panel — $13,386.00 | Dur 9d | 10/15/2026 – 10/27/2026</div>'+
   '<div class="pc-btns"><span class="pc-sm">+ Add sub-deliverable</span><span class="pc-sm">&#128218; Add from library</span></div></div>'+
  '<div class="pc-sec" style="margin-top:10px">WBS &middot; level 0 — project information</div>'+
  hiliWbs();
}
function hiliOutput(){
  const d=OUT_DOCS[DEC.outDoc];
  return '<div class="pc-sec">Output</div>'+
  '<div class="pc-chips">'+
    '<button class="pc-chip '+(DEC.outDoc==='est'?'on':'')+'" data-out="est">Estimate</button>'+
    '<button class="pc-chip '+(DEC.outDoc==='sch'?'on':'')+'" data-out="sch">Schedule</button>'+
    '<button class="pc-chip '+(DEC.outDoc==='prop'?'on':'')+'" data-out="prop">Proposal</button></div>'+
  '<div class="pc-mini on"><div class="n">'+d.n+'</div><div class="m">'+d.m+'</div></div>'+
  '<div style="margin-top:7px">'+outDocHtml()+'</div>'+
  '<div class="pc-blurb" style="margin-top:9px">Scroll each document. Estimating itself lives a level deeper than this walkthrough goes.</div>';
}
function hiliTodo(){
  return '<div class="pc-sec">To-Do</div><div class="pc-blurb">Items this workspace is waiting on a person for.</div>'+
  '<div class="pc-mini"><div class="n">Confirm bid due date</div><div class="m">No deadline detected in the listing</div></div>'+
  '<div class="pc-mini"><div class="n">Retrieve full listing details</div><div class="m">Source link in the intake memo</div></div>'+
  '<div class="pc-mini"><div class="n">Name the contracting officer</div><div class="m">Not stated by the agency</div></div>';
}

function PRECON(output){
  const tab = output ? 6 : DEC.pcTab;
  let docBody;
  if (tab===0){
    docBody='<h4>Intake memo</h4><div class="sub">Quick check — how this bid arrived. Read before the folder sequence.</div>'+
      '<div class="pc-sm" style="display:inline-block;margin-bottom:7px">Hide comments (0)</div>'+
      '<pre>'+INTAKE_MEMO.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</pre>';
  } else if (tab===2){
    docBody='<h4>00.2 — Drawings</h4><div class="sub">Production set, issued 8/28/2026.</div>'+drawingSheet();
  } else if (tab===6){
    docBody='<h4>00.6 — Output documents</h4><div class="sub">What this workspace produced. Click one to preview it.</div>'+
      Object.keys(OUT_DOCS).map(k=>'<button class="pc-mini '+(DEC.outDoc===k?'on':'')+'" data-out="'+k+'" style="width:100%;text-align:left">'+
        '<div class="n">'+OUT_DOCS[k].n+'</div><div class="m">'+OUT_DOCS[k].m+'</div></button>').join('')+
      '<div style="margin-top:8px">'+outDocHtml()+'</div>';
  } else {
    const f=FOLDER_DOCS[tab];
    docBody='<h4>'+f.h+'</h4><div class="sub">Files filed under this step of the folder sequence.</div>'+
      f.items.map(i=>'<div class="pc-mini"><div class="n">'+i[0]+'</div><div class="m">'+i[1]+'</div></div>').join('');
  }
  const hili = DEC.hiliTab==='output' ? hiliOutput() : (DEC.hiliTab==='todo' ? hiliTodo() : hiliInput());
  return '<div class="pc-hd"><div><div class="t">PreCon</div>'+
    '<div class="s">Jeeves module &middot; Document viewer &middot; HILI window</div></div>'+
    '<div class="dc-hd-r"><span class="dc-pill">C001-DEMO</span><span class="dc-pill">Refresh</span>'+
    '<button class="dc-pill act" data-back="1">&larr; Back</button></div></div>'+
  '<div class="pc-ttl">Larkspur Commerce Center — Building B Addition</div>'+
  '<div class="pc-meta"><span class="go">go</span><span class="id">BID-SPLIT-20260808-409B</span>'+
  '<span class="cls">AACE Class 5 (conceptual) unless a design set says otherwise</span></div>'+
  '<div class="pc-split" id="pcSplit" style="'+pcSplitStyle()+'">'+
    '<div class="pc-pane"><div class="pc-ph">Document viewer</div>'+
      '<div class="pc-tabs">'+PC_TABS.map((t,i)=>'<button class="pc-tab '+(i===tab?'on':'')+'" data-pct="'+i+'">'+t+'</button>').join('')+'</div>'+
      '<div class="pc-doc">'+docBody+'</div>'+
      '<div class="pc-btns"><span class="pc-sm">+ Upload document or zip</span><span class="pc-sm">+ Add a link</span></div>'+
      '<div class="pc-nav"><button data-pct="'+Math.max(0,tab-1)+'">&larr; Prev</button>'+
        '<button class="on" data-pct="'+Math.min(6,tab+1)+'">Next &rarr;</button></div>'+
      '<div class="pc-ph" style="margin-top:9px">Other captured documents</div>'+
      '<div class="pc-mini"><div class="n">Larkspur_Commerce_Bldg_B_Addition.zip</div><div class="m">8/8/2026 &nbsp;·&nbsp; Open &rarr; &nbsp;·&nbsp; Move to…</div></div>'+
    '</div>'+
    '<div class="pc-resizer" id="pcRz" title="Drag to resize"></div>'+
    '<div class="pc-pane right"><div class="pc-ph">HILI window</div>'+
      '<div class="pc-hb">'+
        '<button class="'+(DEC.hiliTab==='input'?'on':'')+'" data-hb="input">Input</button>'+
        '<button class="'+(DEC.hiliTab==='todo'?'on':'')+'" data-hb="todo">To-Do</button>'+
        '<button class="'+(DEC.hiliTab==='output'?'on':'')+'" data-hb="output">Output</button></div>'+
      hili+
    '</div>'+
  '</div>'+
  '<div class="ex-note" style="margin-top:10px">Drag the divider to resize the two panes. Fictitious project and documents — estimating itself sits a level deeper than this walkthrough.</div>';
}

function decideBody(){
  if (DEC.view==='intake') return DECIDE_INTAKE();
  if (DEC.view==='go') return DECIDE_GO();
  if (DEC.view==='precon') return PRECON(false);
  if (DEC.view==='precon-out') return PRECON(true);
  return DECIDE_DASH();
}
const DECIDE_CRUMB={dash:'Decide · Go/No-Go', intake:'Decide · Intake detail', go:'Decide · Go / Outcome',
  precon:'Decide · PreCon workspace', 'precon-out':'Decide · PreCon · Output'};

function renderDecide(){
  const a=AGENT_PITCH.decide;
  const wide = DEC.view==='precon'||DEC.view==='precon-out';
  setWork('<span class="eyebrow">Decide</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+ALA+
    '<div class="mp-cap"><span class="l">'+(wide?'PreCon workspace':'What Decide opens to')+'</span>'+
    '<span class="r">'+(wide?'Level 3 · resizable':'Live module · miniaturized')+'</span></div>'+
    '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
    '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
    '<div class="mp-body">'+decideBody()+'</div>'+
    '<div class="mp-sync"><span class="d"></span>synced</div></div>',
    DECIDE_CRUMB[DEC.view]||'Decide');
}

/* ================= INSPECT — field walk app. ALL DATA FICTITIOUS. ================= */
const INS = { proj:0, open:{}, sel:{}, menu:false, walk:3 };
const INS_PROJECTS = [
  {n:'— Select project —', a:'', c:'', s:'', z:''},
  {n:'Larkspur Commerce Center — Building B Addition', a:'4180 Larkspur Way SE', c:'Fairhaven', s:'WA', z:'98371'},
  {n:'Cedar Park ISD — Warehouse freezer addition',    a:'2200 Cedar Park Rd',   c:'Cedar Park', s:'TX', z:'78613'},
  {n:'Ridgeline County Jail — Modular remodel',        a:'118 County Center Dr', c:'Ridgeline',  s:'WA', z:'98002'},
  {n:'Trinity Valley Health — MRI Suite 4',            a:'900 Trinity Way',      c:'Fairhaven',  s:'WA', z:'98371'},
  {n:'Northgate FD — Cleaning facility',               a:'41 Northgate Ave',     c:'Northgate',  s:'WA', z:'98004'}
];
const INS_ACC = [
  ['basis','Investigation basis',['Pre-bid site visit','Owner-requested walk','Change-order verification','Progress / percent complete','Punch list','Warranty callback','Safety audit']],
  ['ptype','Project type',['New construction','Addition','Tenant improvement','Renovation','Civil / sitework','Modular']],
  ['work','Work category',['Concrete','Structural steel','Masonry','Envelope / roofing','Mechanical','Electrical','Plumbing','Interior finishes','Demolition']],
  ['contract','Contract type',['Lump sum','GC/CM','Design-build','T&amp;M','Unit price','IDIQ']],
  ['client','Client type',['Public — municipal','Public — federal','K-12 / higher ed','Healthcare','Commercial developer','Industrial']]
];
const INS_WALKS = [
  {n:1, d:'7/22/2026', by:'R. Salas',   obs:6,  note:'Pre-bid walk — existing conditions'},
  {n:2, d:'8/03/2026', by:'R. Salas',   obs:11, note:'Progress — footings & underground'},
  {n:3, d:'8/10/2026', by:'D. Prentiss',obs:9,  note:'In progress — this walk'}
];
function insSel(k){ return INS.sel[k] || []; }
function insCount(k){ return insSel(k).length; }

function INSPECT_PREVIEW(){
  const p = INS_PROJECTS[INS.proj];
  const acc = INS_ACC.map(function(a){
    const open = INS.open[a[0]];
    const opts = a[2].map(function(o,i){
      const on = insSel(a[0]).indexOf(i)>-1;
      return '<button class="ins-opt'+(on?' on':'')+'" data-ins="opt:'+a[0]+':'+i+'">'+(on?'&#10003; ':'')+o+'</button>';
    }).join('');
    return '<div class="ins-acc"><button class="ins-ah" data-ins="acc:'+a[0]+'">'+
      '<span>'+a[1]+' <span class="ins-badge'+(insCount(a[0])?' on':'')+'">'+insCount(a[0])+'</span></span>'+
      '<span class="ins-car">'+(open?'&#9652;':'&#9662;')+'</span></button>'+
      (open?'<div class="ins-ab">'+opts+'</div>':'')+'</div>';
  }).join('');
  return '<div class="mp-cap"><span class="l">What Inspect opens to</span><span class="r">Phone in the field &middot; browser in the office</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body">'+
    '<div class="ins-bar"><div class="ins-bl"><div class="ins-av">F</div>'+
      '<div><div class="ins-t">Field Walk</div><div class="ins-s">&rarr; Franklin intake</div></div></div>'+
      '<div class="ins-br"><span class="ins-saved">&#10003; Saved</span>'+
      '<button class="ins-menu" data-ins="menu">Actions &#9662;</button></div></div>'+
    (INS.menu?'<div class="ins-drop">'+
      '<button data-ins="newwalk">&#10010; Start a new walk</button>'+
      '<button data-ins="report">&#128196; Generate report</button></div>':'')+

    '<div class="ins-walks"><span class="lb">Walks on this project</span>'+
      INS_WALKS.map(function(w){return '<span class="ins-wk'+(w.n===INS.walk?' on':'')+'">Walk '+w.n+' &middot; '+w.d+' &middot; '+w.obs+' obs</span>';}).join('')+
      '<span class="ins-note">Multiple walks per project is normal — each one stacks onto the same record.</span></div>'+

    '<div class="ins-card"><div class="ins-ch">Project</div><div class="ins-cb">'+
      '<label class="ins-l">Bid list project</label>'+
      '<select class="ins-sel" id="insProj">'+INS_PROJECTS.map(function(x,i){
        return '<option value="'+i+'"'+(i===INS.proj?' selected':'')+'>'+x.n+'</option>';}).join('')+'</select>'+
      '<div class="ins-h">5 active projects loaded — picking one fills the rest in.</div>'+
      '<label class="ins-l">Inspector / your name</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?'D. Prentiss':'Who&rsquo;s doing this walk')+'</div>'+
      '<label class="ins-l">Project name</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?p.n:'e.g. Building B Addition')+'</div>'+
      '<label class="ins-l">Address</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?p.a:'Street address')+'</div>'+
      '<div class="ins-row"><div><label class="ins-l">City</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?p.c:'City')+'</div></div>'+
      '<div><label class="ins-l">State</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?p.s:'State')+'</div></div>'+
      '<div><label class="ins-l">ZIP</label><div class="ins-f'+(INS.proj?'':' ph')+'">'+(INS.proj?p.z:'ZIP')+'</div></div></div>'+
    '</div></div>'+
    acc+
    '<div class="ins-cap"><div class="ins-caph">Captured on this walk</div>'+
      '<div class="ins-obs"><span class="ic">&#128247;</span><div><b>Grid C/3 — footing rebar</b><div class="m">Voice note · 0:14 · #3 bar at 12" o.c. verified against S-201</div></div></div>'+
      '<div class="ins-obs"><span class="ic">&#128247;</span><div><b>Mech room 112 — housekeeping pad</b><div class="m">Photo · pad short 4" of RTU curb layout</div></div></div>'+
      '<div class="ins-obs"><span class="ic">&#127908;</span><div><b>North elevation — panel joint</b><div class="m">Voice note · 0:22 · sealant gap at 3 joints</div></div></div>'+
      '<div class="ins-hint">Captured hands-free on the phone. Same form in the office to define a project before anyone drives out.</div></div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}

function INSPECT_REPORT(){
  const p = INS_PROJECTS[INS.proj && INS.proj>0 ? INS.proj : 1];
  const chips = INS_ACC.map(function(a){
    const s = insSel(a[0]);
    const v = s.length ? s.map(function(i){return a[2][i];}).join(', ')
      : {basis:'Progress / percent complete', ptype:'Addition', work:'Concrete, Structural steel, Mechanical',
         contract:'Lump sum', client:'Commercial developer'}[a[0]];
    return '<tr><td class="k">'+a[1]+'</td><td>'+v+'</td></tr>';
  }).join('');
  return '<span class="eyebrow">Inspect · Report</span>'+
  '<h2>The walk writes <span class="cu">itself up.</span></h2>'+
  '<p>Everything captured on site becomes a dated, sourced field-walk report before you are off the jobsite.</p>'+ALA+
  '<div class="mp-cap"><span class="l">Field walk report</span><span class="r">Generated · scrollable · fictitious</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body"><button class="dd-back" data-back="1">&larr; Field walk</button>'+
  '<div class="docwrap">'+
   '<div class="lh"><div class="lhl"><div class="lg">CSG</div></div><div class="lhr">'+
    '<div class="cn">FIELD WALK REPORT</div><div class="ct">Cornerstone Structural Group &middot; walk #3 of 3</div>'+
    '<div class="ca">Generated 8/10/2026, 3:42 PM — from voice notes, photos and measurements captured on site.</div></div></div>'+
   '<table class="rmeta"><tr><td class="k">Project</td><td>'+p.n+'</td></tr>'+
    '<tr><td class="k">Address</td><td>'+p.a+', '+p.c+' '+p.s+' '+p.z+'</td></tr>'+
    '<tr><td class="k">Inspector</td><td>D. Prentiss — Partner &amp; Senior Vice President</td></tr>'+
    '<tr><td class="k">Walk date</td><td>Monday, August 10, 2026 &middot; 9:05–10:20 AM (1h 15m)</td></tr>'+
    '<tr><td class="k">Conditions</td><td>58&deg;F, overcast, dry. Slab area accessible; roof not accessed.</td></tr>'+
    '<tr><td class="k">Attending</td><td>Site super (CSG), owner rep (Larkspur Commerce Holdings), structural EOR by phone</td></tr></table>'+
   '<h4>Classification</h4><table class="rmeta">'+chips+'</table>'+
   '<h4>Observations</h4>'+
   '<table class="robs"><thead><tr><th>#</th><th>Location</th><th>Finding</th><th>Sev.</th><th>Action</th></tr></thead><tbody>'+
    '<tr><td>1</td><td>Grid C/3 — footings</td><td>#3 bar at 12&quot; o.c. verified against S-201. Clearances correct.</td><td><span class="sv ok">OK</span></td><td>None — photo filed</td></tr>'+
    '<tr><td>2</td><td>Mech room 112</td><td>Housekeeping pad 4&quot; short of RTU-1 curb layout on M-401.</td><td><span class="sv hi">High</span></td><td>RFI to EOR; hold curb set</td></tr>'+
    '<tr><td>3</td><td>North elevation</td><td>Sealant gap at 3 panel joints between grids 2–4.</td><td><span class="sv md">Medium</span></td><td>Envelope sub to re-tool</td></tr>'+
    '<tr><td>4</td><td>Slab on grade, bay 2</td><td>Vapour barrier lapped 4&quot;; spec calls for 6&quot; min.</td><td><span class="sv md">Medium</span></td><td>Correct before pour</td></tr>'+
    '<tr><td>5</td><td>Electrical room</td><td>400A panel backing installed; feeder conduit stubbed and capped.</td><td><span class="sv ok">OK</span></td><td>Ready for panel set</td></tr>'+
    '<tr><td>6</td><td>South laydown</td><td>Steel delivery staged outside the fenced line.</td><td><span class="sv md">Medium</span></td><td>Relocate — theft exposure</td></tr>'+
    '<tr><td>7</td><td>Trench, grid D</td><td>Open trench 3&#39;-6&quot; deep, no edge protection on the east run.</td><td><span class="sv hi">High</span></td><td>Barricade today — safety</td></tr>'+
    '<tr><td>8</td><td>Restrooms 114</td><td>Underslab sanitary rough matches P-201; inspection tag posted.</td><td><span class="sv ok">OK</span></td><td>None</td></tr>'+
    '<tr><td>9</td><td>Site access</td><td>Haul route rutting at the north gate after weekend rain.</td><td><span class="sv lo">Low</span></td><td>Add quarry spall</td></tr></tbody></table>'+
   '<h4>Measurements captured</h4><table class="robs"><thead><tr><th>Item</th><th>Measured</th><th>Drawing</th><th>Delta</th></tr></thead><tbody>'+
    '<tr><td>Housekeeping pad, RTU-1</td><td>5&#39;-8&quot; &times; 4&#39;-0&quot;</td><td>6&#39;-0&quot; &times; 4&#39;-0&quot;</td><td class="bad">&minus;4&quot;</td></tr>'+
    '<tr><td>Footing F-3 depth</td><td>3&#39;-0&quot;</td><td>3&#39;-0&quot;</td><td class="good">0</td></tr>'+
    '<tr><td>Clear height, open office</td><td>11&#39;-8&quot;</td><td>11&#39;-8&quot;</td><td class="good">0</td></tr>'+
    '<tr><td>Panel joint gap, north</td><td>3/8&quot;</td><td>1/4&quot; max</td><td class="bad">+1/8&quot;</td></tr></tbody></table>'+
   '<h4>Changed since walk #2 (8/03/2026)</h4><ul>'+
    '<li>Footings complete grids A–D; formwork stripped.</li>'+
    '<li>Underground plumbing inspected and backfilled — closes finding #4 from walk #2.</li>'+
    '<li>New: housekeeping pad dimension conflict (finding #2 above) — was not present at the last walk.</li>'+
    '<li>Still open from walk #2: north gate haul route (finding #9), now downgraded to low.</li></ul>'+
   '<h4>Follow-up actions</h4><table class="robs"><thead><tr><th>Action</th><th>Owner</th><th>Due</th></tr></thead><tbody>'+
    '<tr><td>Barricade open trench at grid D</td><td>Site super</td><td>8/10/2026 — today</td></tr>'+
    '<tr><td>RFI to EOR on RTU-1 pad dimension</td><td>Project engineer</td><td>8/11/2026</td></tr>'+
    '<tr><td>Re-lap vapour barrier, bay 2, before pour</td><td>Concrete foreman</td><td>8/12/2026</td></tr>'+
    '<tr><td>Re-tool 3 panel joints, north elevation</td><td>Envelope sub</td><td>8/14/2026</td></tr></tbody></table>'+
   '<div class="rsign"><b>Prepared by</b> D. Prentiss &middot; captured on site 8/10/2026 &middot; 9 observations, 4 measurements, 14 photos, 3 voice notes.<br>'+
    'Every line traces to the capture that produced it. Corrections are new entries — the original record is never overwritten.</div>'+
  '</div>'+
  '<div class="ex-note" style="margin-top:9px">Two findings were raised to the To-Do module automatically; nothing was sent to the owner without approval.</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function renderInspect(){
  const a=AGENT_PITCH.inspect;
  setWork('<span class="eyebrow">Inspect</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+ALA+INSPECT_PREVIEW(),
    'Agents & Skills · Inspect');
}

/* ================= PM — award through closeout. ALL DATA FICTITIOUS. ================= */
const PM = { view:'list', open:{sched:true, kpi:true}, schMonth:6 };
const PM_ROWS = [
 ['Northgate Temp Ramps Slip 12&rarr;14','Northgate Marine','NGM26043','closed','$88,427','$88,427','$88,427','100%',0],
 ['Kestrel Harbor Lake EV Hub','Kestrel Mechanical','KES26030','ready','$57,000','$57,000','$0','0%',0],
 ['Kestrel Harbor Lake — Bollard Foundation Excavation (Added Scope, DRAFT)','Kestrel Mechanical','KES26030-BOLLARD','prop','$6,255','$6,255','—','—',1],
 ['Fairhaven Works Park — Cracking Towers Decon','City of Fairhaven Parks','PRK730300','closed','$628,525','$628,525','$496,530','94%',0],
 ['Meridian Cold Storage B390','Meridian Cold','MERID-B390-PROV','design','$126,100','—','—','—',0],
 ['Larkspur Retaining Wall — Structural Inspection','T. Marsh / Northline Eng PLLC','2026-080','active','$3,000','$3,000','$2,127','—',0],
 ['Larkspur Retaining Wall — Corrective Action Repairs','T. Marsh / Northline Eng PLLC','2026-081','active','$21,150','$21,150','$10,575','—',1],
 ['Harbor District Ammunition Pier','Ridgeline Marine Construction','PIPELINE-HDIST-AMMO','prop','$782,522','—','—','—',0],
 ['Trinity Valley Cath Lab','Halvorsen General','TVH25287','closed','$70,996','$70,996','$68,100','100%',0],
 ['Fairhaven Lift Station 2 Rehabilitation','City of Fairhaven Public Works','FLS26-114','active','$1,284,900','$1,331,412','$742,830','58%',0],
 ['Slip 36 Enabling Work (T&amp;M)','Halvorsen General','HALV35210','active','$125,270','$125,270','$107,481','86%',0],
 ['Boathouse Bird Exclusion Netting (Phase 1A)','Halvorsen General','HALV35210-BN','prop','$39,497','—','—','—',1],
 ['Boathouse Interior Fit-Out (Phase 1A)','Halvorsen General','HALV35210-BH','prop','$105,678','—','—','—',1]
];
const PM_ST = {closed:['Closed','cl'], ready:['Job ready','rd'], prop:['Proposed','pr'], design:['Design','dg'], active:['Active','ac']};

function PM_LIST(){
  const rows = PM_ROWS.map(function(r,i){
    const st=PM_ST[r[3]], sample = r[2]==='FLS26-114';
    return '<tr class="'+(r[8]?'kid':'')+(sample?' hot':'')+'"'+(sample?' data-pm="proj"':'')+'>'+
      '<td class="nm">'+(r[8]?'<span class="ar">&#8618;</span> ':'')+r[0]+
        (sample?' <span class="opn">open &rarr;</span>':'')+'<div class="cl">'+r[1]+'</div></td>'+
      '<td class="mono">'+r[2]+'</td><td><span class="pst '+st[1]+'">'+st[0]+'</span></td>'+
      '<td class="r">'+r[4]+'</td><td class="r">'+r[5]+'</td><td class="r">'+r[6]+'</td>'+
      '<td class="r">'+r[7]+'</td><td><span class="pst wr">None</span></td></tr>';
  }).join('');
  return '<div class="mp-cap"><span class="l">What PM opens to</span><span class="r">Live module &middot; miniaturized</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body">'+
   '<div class="pm-hd"><div><div class="t">PM &middot; Virgil</div><div class="s">Award through closeout</div></div></div>'+
   '<div class="pm-lh"><span class="h">Projects</span><span class="c">'+PM_ROWS.filter(function(r){return !r[8];}).length+' projects &middot; 4 added scopes</span></div>'+
   '<div class="pm-sub">Want to see every section fully populated with realistic data? '+
    '<button class="pm-view" data-pm="proj">View sample project &rarr;</button></div>'+
   '<div class="pmtblwrap"><table class="pmtbl"><thead><tr><th>Project</th><th>Project #</th><th>Status</th>'+
    '<th class="r">Contract</th><th class="r">Current value</th><th class="r">Billed</th><th class="r">% Complete</th><th>Warranty</th></tr></thead>'+
    '<tbody>'+rows+'</tbody></table></div>'+
   '<div class="ins-hint">Added scopes nest under their parent award. Click the highlighted row to open the sample project.</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}

/* ---- sample project: many short activities so the bars stay thin ---- */
const PM_SCHED = [
 ['major','1','Mobilization &amp; Site Prep'],
 ['sub','1.1','Mobilization'],
 ['wp','1.1.1','Mobilize crew &amp; equipment','2026-03-02','2026-03-06'],
 ['wp','1.1.2','Site trailer set','2026-03-09','2026-03-11'],
 ['wp','1.1.3','Fencing &amp; signage','2026-03-12','2026-03-16'],
 ['wp','1.1.4','Erosion control','2026-03-17','2026-03-19'],
 ['sub','1.2','Temporary utilities'],
 ['wp','1.2.1','Temp power','2026-03-20','2026-03-24'],
 ['wp','1.2.2','Temp water &amp; sanitary','2026-03-25','2026-03-27'],
 ['major','2','Bypass Pumping &amp; Excavation'],
 ['sub','2.1','Bypass system'],
 ['wp','2.1.1','Bypass pump set','2026-03-30','2026-04-03'],
 ['wp','2.1.2','Discharge piping','2026-04-06','2026-04-09'],
 ['wp','2.1.3','Flow test &amp; commission','2026-04-10','2026-04-10'],
 ['sub','2.2','Excavation'],
 ['wp','2.2.1','Clear &amp; grub','2026-04-13','2026-04-16'],
 ['wp','2.2.2','Shoring install','2026-04-17','2026-04-23'],
 ['wp','2.2.3','Excavate to grade','2026-04-24','2026-04-30'],
 ['wp','2.2.4','Dewatering','2026-05-01','2026-05-05'],
 ['wp','2.2.5','Subgrade prep','2026-05-06','2026-05-08'],
 ['major','3','Pump Station Construction'],
 ['sub','3.1','Structural'],
 ['wp','3.1.1','Form base slab','2026-05-11','2026-05-15'],
 ['wp','3.1.2','Rebar — base','2026-05-18','2026-05-21'],
 ['wp','3.1.3','Pour base slab','2026-05-22','2026-05-26'],
 ['wp','3.1.4','Cure &amp; strip','2026-05-27','2026-06-02'],
 ['wp','3.1.5','Set precast wet well','2026-06-03','2026-06-09'],
 ['wp','3.1.6','Grout &amp; seal joints','2026-06-10','2026-06-12'],
 ['sub','3.2','Mechanical'],
 ['wp','3.2.1','Set pumps','2026-06-15','2026-06-19'],
 ['wp','3.2.2','Process piping','2026-06-22','2026-06-30'],
 ['wp','3.2.3','Valves &amp; actuators','2026-07-01','2026-07-07'],
 ['wp','3.2.4','Hydrostatic test','2026-07-08','2026-07-10'],
 ['sub','3.3','Electrical &amp; controls'],
 ['wp','3.3.1','Conduit &amp; feeders','2026-07-13','2026-07-20'],
 ['wp','3.3.2','MCC set','2026-07-21','2026-07-24'],
 ['wp','3.3.3','Control panel','2026-07-27','2026-07-31'],
 ['wp','3.3.4','Instrumentation','2026-08-03','2026-08-07'],
 ['wp','3.3.5','Loop checks','2026-08-10','2026-08-14'],
 ['wp','3.3.6','Startup &amp; testing','2026-08-17','2026-08-21'],
 ['major','4','Site Restoration &amp; Closeout'],
 ['sub','4.1','Restoration'],
 ['wp','4.1.1','Backfill','2026-08-24','2026-08-28'],
 ['wp','4.1.2','Compaction testing','2026-08-31','2026-09-02'],
 ['wp','4.1.3','Base course','2026-09-03','2026-09-08'],
 ['wp','4.1.4','Paving','2026-09-09','2026-09-15'],
 ['wp','4.1.5','Striping','2026-09-16','2026-09-18'],
 ['wp','4.1.6','Landscaping','2026-09-21','2026-09-25'],
 ['sub','4.2','Closeout'],
 ['wp','4.2.1','Punch list walk','2026-09-28','2026-10-02'],
 ['wp','4.2.2','Punch corrections','2026-10-05','2026-10-09'],
 ['wp','4.2.3','O&amp;M manuals','2026-10-12','2026-10-16'],
 ['wp','4.2.4','Owner training','2026-10-19','2026-10-23'],
 ['wp','4.2.5','As-built survey','2026-10-26','2026-10-30'],
 ['wp','4.2.6','Final closeout &amp; warranty start','2026-11-02','2026-11-06']
];
const PM_COL = {'1':'#B5552F','2':'#3f7d4f','3':'#2f6f8f','4':'#a8752b'};
const PM_MONTHS=[[2026,1],[2026,2],[2026,3],[2026,4],[2026,5],[2026,6],[2026,7],[2026,8],[2026,9],[2026,10],[2026,11]];
const PM_UNSCHED=['3.2.5 Spare parts turnover','4.1.7 Fence removal','4.2.7 Warranty walk (60-day)'];
function pmGantt(){
  return SCHED_UI('pm', PM_SCHED, PM_MONTHS, PM.schMonth,
    {ntp:'2026-03-02', today:6, title:'Fairhaven Lift Station 2 Rehabilitation · 42 work packages', unscheduled:PM_UNSCHED});
}

function pmSec(key,title,body,meta){
  const o=PM.open[key];
  return '<div class="pm-sec"><button class="pm-sh" data-pm="sec:'+key+'"><span>'+title+
    (meta?' <span class="mt">'+meta+'</span>':'')+'</span><span>'+(o?'&#9652;':'&#9662;')+'</span></button>'+
    (o?'<div class="pm-sb">'+body+'</div>':'')+'</div>';
}
function PM_PROJECT(){
  const kpi=[['Project #','FLS26-114'],['PO number (client)','PW-2026-0418'],['Contract value','$1,284,900'],
    ['Approved COs','$46,512'],['Current value','$1,331,412'],['Billed','$742,830'],['Retainage','$37,142'],
    ['% Complete','58%'],['COGS to date','$611,204'],['Gross profit to date','$131,626'],['Markup % (over COGS)','21.5%'],
    ['Remaining (NTE)','$588,582'],['Open hazards','1'],['OSHA recordable (open)','0'],['Prevailing wage (PW)','Yes'],
    ['Warranty','Starts at final closeout']];
  const t=function(h,r){return '<table class="pmt"><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>';}).join('')+
    '</tr></thead><tbody>'+r.map(function(row){return '<tr>'+row.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';};
  return '<span class="eyebrow">PM &middot; Virgil</span><h2>Every awarded job, <span class="cu">tracked start to close.</span></h2>'+
  '<p>Award through closeout in one record — schedule, subs, change events, billings, safety and the ledger all hanging off the same project.</p>'+ALA+
  '<div class="mp-cap"><span class="l">Sample project · fully populated</span><span class="r">Scrollable · fictitious</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body"><button class="dd-back" data-back="1">&larr; Projects</button>'+
   '<div class="pm-hd"><div><div class="t">Fairhaven Lift Station 2 Rehabilitation</div>'+
    '<div class="s">City of Fairhaven Public Works &middot; FLS26-114 &middot; Active</div></div></div>'+
   '<div class="docwrap">'+
    pmSec('kpi','Project summary','<div class="pmk">'+kpi.map(function(k){
      return '<div class="pmkc"><span class="l">'+k[0]+'</span><span class="v">'+k[1]+'</span></div>';}).join('')+'</div>')+
    pmSec('sched','Schedule', pmGantt(), '42 activities')+
    pmSec('to','Task orders', t(['TO #','Description','Value','Status'],[
      ['TO-01','Base contract — lift station rehab','$1,284,900','Executed'],
      ['TO-02','Added: standby generator pad','$28,400','Executed'],
      ['TO-03','Added: SCADA tie-in','$18,112','Executed']]),'3')+
    pmSec('subs','Subcontractor status', t(['Vendor / sub','Trade','Contract','Insurance','NTP','Completion','Safety orient.'],[
      ['Kestrel Mechanical','Pumps &amp; piping','$284,600','Current','3/24/26','—','Yes'],
      ['Sundial Electric','Electrical','$196,300','Current','7/06/26','—','Yes'],
      ['Larkspur Paving','Paving','$88,900','<span class="warn">Expires 9/1</span>','8/17/26','—','Yes'],
      ['Northline Testing','Special inspection','$21,400','Current','5/04/26','—','Yes']]),'4')+
    pmSec('pco','PCOs (potential change orders)', t(['Date','Type','Reference','Amount','Status'],[
      ['4/22/26','Differing site condition','PCO-004 · rock at El. 12','$31,880','Approved'],
      ['6/09/26','Owner request','PCO-007 · SCADA tie-in','$18,112','Approved'],
      ['7/28/26','Design clarification','PCO-011 · MCC clearance','$9,640','<span class="warn">Pending</span>'],
      ['8/14/26','Weather delay','PCO-013 · 3 days','$0','<span class="warn">Pending</span>']]),'2 pending')+
    pmSec('cash','Cash flow', t(['Month','Billed','Received','Costs','Net'],[
      ['May 2026','$182,400','$182,400','$164,900','<span class="good">+$17,500</span>'],
      ['Jun 2026','$204,110','$182,400','$191,240','<span class="bad">&minus;$8,840</span>'],
      ['Jul 2026','$196,320','$204,110','$172,600','<span class="good">+$31,510</span>'],
      ['Aug 2026','$160,000','$196,320','$82,464','<span class="good">+$113,856</span>']]))+
    pmSec('pay','Pay applications', t(['App #','Period','Amount','Retainage','Status'],[
      ['#3','May 2026','$182,400','$9,120','Paid'],
      ['#4','Jun 2026','$204,110','$10,206','Paid'],
      ['#5','Jul 2026','$196,320','$9,816','Paid'],
      ['#6','Aug 2026','$160,000','$8,000','<span class="warn">Submitted</span>']]),'1 outstanding')+
    pmSec('safe','Safety reports &amp; abatement', t(['Date','Item','Severity','Status'],[
      ['8/03/26','Open trench, no edge protection','High','Abated same day'],
      ['8/10/26','Extension cord through standing water','Medium','Abated'],
      ['8/17/26','Missing MCC arc-flash label','Low','<span class="warn">Open</span>']]),'1 open')+
    pmSec('ce','Change events', t(['Date','Event','Impact','Disposition'],[
      ['4/22/26','Rock encountered at El. 12','+9 days, +$31,880','Merged to PCO-004'],
      ['6/09/26','Owner added SCADA tie-in','+4 days, +$18,112','Merged to PCO-007'],
      ['8/14/26','3 days lost to weather','+3 days, $0','Time only']]))+
    pmSec('po','Purchase orders &amp; receipts', t(['PO #','Vendor','Scope','Amount','Received'],[
      ['PO-118','Ridgeline Supply','Rebar &amp; embeds','$46,220','Full'],
      ['PO-124','Kestrel Mechanical','Pumps (2)','$168,400','Full'],
      ['PO-131','Sundial Electric','MCC &amp; controls','$96,800','Partial'],
      ['PO-140','Larkspur Paving','HMA','$41,600','—']]))+
    pmSec('led','Ledger', t(['Date','Account','Description','Debit','Credit'],[
      ['8/01/26','01-31-00','Project management — Aug','$8,620','—'],
      ['8/06/26','26-05-19','Sundial Electric progress','$42,300','—'],
      ['8/12/26','—','Pay app #5 received','—','$196,320'],
      ['8/18/26','03-30-53','Concrete testing','$3,180','—']]))+
    pmSec('docs','Documents &amp; photos','<div class="pm-chips"><span>Drawings — 41</span><span>Submittals — 63</span>'+
      '<span>RFIs — 18</span><span>Field photos — 412</span><span>Inspection reports — 9</span><span>O&amp;M — in progress</span></div>')+
    pmSec('corr','Correspondence', t(['Date','From','Subject','Type'],[
      ['8/17/26','City of Fairhaven PW','RFI-018 response — MCC clearance','RFI'],
      ['8/14/26','Cornerstone','Notice — weather delay, 3 days','Notice'],
      ['8/06/26','Northline Testing','Compaction results, lift 3','Report']]))+
    pmSec('pmort','Post-mortem / lessons learned','<div class="pm-note">Opens automatically at final closeout. Draft already seeded from change events: '+
      '<b>rock at El. 12 was foreseeable</b> from the geotech log — add a rock line item to the next lift-station bid; '+
      '<b>MCC clearance</b> cost 11 days of float, so pull the electrical coordination review two weeks earlier.</div>')+
    pmSec('hili','HILI activity — task / estimate flags', t(['Raised','Flag','Waiting on'],[
      ['8/17/26','Pay app #6 submitted, not yet acknowledged','Owner'],
      ['8/17/26','Arc-flash label missing — safety item open','Site super'],
      ['8/14/26','PCO-011 pending 17 days — exceeds your 14-day rule','You'],
      ['8/12/26','Larkspur Paving insurance expires 9/1','PM']]),'4')+
   '</div>'+
   '<div class="ex-note" style="margin-top:9px">Every figure rolls up from the same record — nothing is re-keyed between the schedule, the ledger and the pay applications.</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function renderPM(){
  const a=AGENT_PITCH.pm;
  setWork('<span class="eyebrow">PM</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+ALA+PM_LIST(),'Agents & Skills · PM');
}

/* ============ SHARED MONTH-AT-A-TIME SCHEDULE (used by PreCon HILI + PM) ============ */
const MN_FULL=['January','February','March','April','May','June','July','August','September','October','November','December'];
function sdp(s){ const p=s.split('-'); return new Date(+p[0], p[1]-1, +p[2]); }
function sfm(d){ const p=n=>(n<10?'0':'')+n; return p(d.getMonth()+1)+'/'+p(d.getDate())+'/'+d.getFullYear(); }
const MAJ_COL=['#B5552F','#3f7d4f','#2f6f8f','#a8752b','#6b5aa6','#8a6d3b'];

/* rows: ['major',key,label] | ['sub',key,label] | ['wp',key,label,start,end] */
function SCHED_UI(ns, rows, months, mi, meta){
  const m=months[mi], ms=new Date(m[0],m[1],1), me=new Date(m[0],m[1]+1,0), days=me.getDate();
  const wps=rows.filter(r=>r[0]==='wp');
  const inMonth=r=>sdp(r[3])<=me && sdp(r[4])>=ms;
  const vis=wps.filter(inMonth);
  const done=wps.filter(r=>sdp(r[4])<ms).length;
  const parent={};
  let curMaj=null,curSub=null;
  rows.forEach(r=>{ if(r[0]==='major'){curMaj=r;} else if(r[0]==='sub'){curSub=r;}
    else parent[r[1]]=(curMaj?curMaj[1]+' '+curMaj[2]:'')+' / '+(curSub?curSub[1]+' '+curSub[2]:''); });

  const list = vis.length
    ? vis.map(r=>'<div class="wp"><div class="wl">'+parent[r[1]].toUpperCase()+'</div>'+
        '<div class="wr"><span>'+r[1]+' '+r[2]+'</span><span class="dt">'+sfm(sdp(r[3]))+'–'+sfm(sdp(r[4]))+'</span></div></div>').join('')
    : '<div class="wp"><div class="wr"><span>No work packages fall in this month.</span></div></div>';

  /* gantt: one positioned track so predecessor connectors can cross rows */
  const RH=13, X=p=>Math.max(0,Math.min(100,p));
  const pos=d=>((d-ms)/864e5)/days*100;
  let labels='', bars='', idx={};
  rows.forEach((r,i)=>{
    idx[r[1]]=i;
    let cls=r[0]==='major'?'gm':(r[0]==='sub'?'gs':'gw');
    if(r[0]==='wp' && !inMonth(r)) cls+=' gdim';
    labels+='<div class="gl '+cls+'" style="height:'+RH+'px">'+
      (r[0]!=='wp'?'<span class="tw">&#9662;</span>':'')+r[1]+' '+r[2]+'</div>';
  });
  rows.forEach((r,i)=>{
    if(r[0]!=='wp') return;
    if(!inMonth(r)) return;
    const s=sdp(r[3]), e=sdp(r[4]);
    const l=X(pos(s)), w=Math.max(1.2, X(pos(e)+(1/days*100))-l);
    const maj=parseInt(r[1].split('.')[0],10)-1;
    bars+='<span class="gbar" style="top:'+(i*RH+3)+'px;left:'+l+'%;width:'+w+'%;background:'+MAJ_COL[maj%MAJ_COL.length]+'"></span>';
  });
  /* finish-to-start connectors between consecutive work packages in the same sub */
  let sub=null, prev=null;
  rows.forEach((r,i)=>{
    if(r[0]==='sub'){ sub=r[1]; prev=null; return; }
    if(r[0]==='major'){ prev=null; return; }
    if(prev && inMonth(r) && inMonth(prev.r)){
      const pe=X(pos(sdp(prev.r[4]))+(1/days*100)), cs=X(pos(sdp(r[3])));
      const top=prev.i*RH+6, bot=i*RH+6;
      bars+='<span class="gcx" style="left:'+pe+'%;top:'+top+'px;height:'+(bot-top)+'px"></span>';
      if(cs>pe) bars+='<span class="gcy" style="left:'+pe+'%;top:'+bot+'px;width:'+(cs-pe)+'%"></span>';
    }
    prev={r:r,i:i};
  });
  /* NTP milestone */
  let milestone='';
  if(meta.ntp){ const nd=sdp(meta.ntp);
    if(nd>=ms&&nd<=me){ const l=X(pos(nd));
      milestone='<span class="gms" style="left:'+l+'%"></span><span class="gmd" style="left:'+l+'%"></span>'; } }
  let ticks='';
  for(let d=1; d<=days; d+=7){ const l=(d-1)/days*100;
    ticks+='<span class="gtk" style="left:'+l+'%">'+sfm(new Date(m[0],m[1],d))+'</span><span class="gvl" style="left:'+l+'%"></span>'; }

  const unsched = (meta.unscheduled||[]).length
    ? '<div class="gun"><b>Not yet scheduled</b> — '+meta.unscheduled.length+' work packages with no resolved start date:'+
      meta.unscheduled.map(u=>'<span>'+u+'</span>').join('')+'</div>' : '';

  return '<div class="sctl"><div class="sr">'+
    '<button class="sb" data-sch="'+ns+':'+Math.max(0,mi-1)+'">&#9664; Prev month</button>'+
    '<span class="schm">'+MN_FULL[m[1]]+' '+m[0]+'</span>'+
    '<button class="sb" data-sch="'+ns+':'+Math.min(months.length-1,mi+1)+'">Next month &#9654;</button>'+
    '<button class="sb" data-sch="'+ns+':'+meta.today+'">Jump to today</button></div>'+
    '<div class="slr"><span>'+MN_FULL[months[0][1]].slice(0,3)+' '+months[0][0]+'</span>'+
    '<input type="range" id="schRange_'+ns+'" data-schns="'+ns+'" min="0" max="'+(months.length-1)+'" value="'+mi+'">'+
    '<span>'+MN_FULL[months[months.length-1][1]].slice(0,3)+' '+months[months.length-1][0]+'</span></div>'+
    '<div class="scount"><span>'+done+' of '+wps.length+' work packages complete</span>'+
    '<span>'+vis.length+' visible this month</span><span>'+(wps.length-done)+' remaining active</span></div></div>'+
  '<div class="sl">Work packages — active</div>'+list+
  '<div class="sl">Gantt — '+MN_FULL[m[1]]+' '+m[0]+'</div>'+
  '<div class="gwrap2"><div class="gticks2">'+ticks+'</div>'+
    '<div class="ggrid"><div class="gcol">'+labels+'</div>'+
    '<div class="gtrack" style="height:'+(rows.length*RH)+'px">'+ticks.replace(/<span class="gtk"[^>]*>[^<]*<\/span>/g,'')+milestone+bars+'</div></div></div>'+
  '<div class="gleg2">'+meta.title+' · bar colour follows the major deliverable · black diamond = notice to proceed · thin lines are finish-to-start links</div>'+
  unsched;
}

/* ================= PO — Renfield. Basic purchase-order app. Platform only. ================= */
const PO = { tab:'create', tier:1, target:0, lines:[
  {d:'3/4" minus crushed rock', q:42, u:'TON', p:28.50, c:'31 23 23', k:'Material'},
  {d:'Rebar #4 x 20ft', q:180, u:'EA', p:14.20, c:'03 21 00', k:'Material'},
  {d:'Delivery — jobsite', q:1, u:'LS', p:340.00, c:'01 51 00', k:'Freight'}
]};
const PO_TARGETS = ['— Select cost target —','FLS26-114 · Fairhaven Lift Station 2','KES26030 · Kestrel Harbor Lake EV Hub',
  'PRK730300 · Fairhaven Works Park','OH-100 · Shop overhead','OH-220 · Fleet & equipment','DEPT-EST · Estimating department'];
const PO_UNITS=['EA','LS','TON','CY','SF','LF','HR','GAL'];
const PO_CODES=['—','01 51 00','03 21 00','03 30 53','05 12 00','22 11 16','23 31 13','26 05 19','31 23 23'];
const PO_CLASS=['Material','Equipment','Freight','Subcontract','Rental','Consumable'];
const PO_OPEN=[
  ['PO-20260806-004','Ridgeline Supply','FLS26-114','$8,412.00','Partial','2 of 3 lines received'],
  ['PO-20260807-002','Kestrel Mechanical','FLS26-114','$168,400.00','Open','Awaiting ship date'],
  ['PO-20260807-005','Sundial Electric','FLS26-114','$96,800.00','Partial','MCC received, controls pending'],
  ['PO-20260808-001','Larkspur Paving','FLS26-114','$41,600.00','Open','Scheduled 9/9'],
  ['PO-20260809-003','Northline Testing','PRK730300','$2,150.00','Closed','Invoice matched']
];
function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function poTotal(){ return PO.lines.reduce(function(s,l){return s+(l.q*l.p);},0); }
function poMoney(n){ return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function sel(name,opts,val,attrs){
  return '<select class="po-sel" '+(attrs||'')+'>'+opts.map(function(o,i){
    return '<option'+(o===val||i===val?' selected':'')+'>'+o+'</option>';}).join('')+'</select>';
}
function PO_CREATE(){
  const tiers=[['Tier 1','Preplanned vendor'],['Tier 2','Phone / email'],['Tier 3 &#9888;','Spot / urgent'],['Tier 4','Yard / internal']];
  const lines=PO.lines.map(function(l,i){
    return '<div class="po-line">'+
      '<input class="po-in d" value="'+esc(l.d)+'" data-poi="'+i+':d">'+
      '<input class="po-in q" type="number" value="'+l.q+'" data-poi="'+i+':q">'+
      sel('u',PO_UNITS,l.u,'data-poi="'+i+':u"')+
      '<input class="po-in p" type="number" step="0.01" value="'+l.p.toFixed(2)+'" data-poi="'+i+':p">'+
      sel('c',PO_CODES,l.c,'data-poi="'+i+':c"')+
      sel('k',PO_CLASS,l.k,'data-poi="'+i+':k"')+
      '<button class="po-x" data-po="del:'+i+'">&#10005;</button></div>';
  }).join('');
  return '<div class="po-card"><div class="po-ch">&#128203; PO header</div><div class="po-cb">'+
    '<div class="po-g3"><div><label class="po-l">PO number</label><div class="po-num">PO-20260810-001</div></div>'+
    '<div><label class="po-l">Created by</label><div class="po-in ro">D. Prentiss</div></div>'+
    '<div><label class="po-l">Date</label><div class="po-in ro">08/10/2026</div></div></div>'+
    '<label class="po-l">Cost target (job / overhead / department)</label>'+
    '<div class="po-row">'+sel('t',PO_TARGETS,PO.target,'id="poTarget"')+'<span class="po-new">+ New</span></div>'+
    (PO.target>0?'<div class="po-ok">&#10003; Posting to '+PO_TARGETS[PO.target]+'</div>':'')+
    '</div></div>'+
  '<div class="po-card"><div class="po-ch">&#127978; Vendor</div><div class="po-cb"><div class="po-g2">'+
    '<div><label class="po-l">Vendor name</label><div class="po-in ro">Ridgeline Supply</div></div>'+
    '<div><label class="po-l">Vendor contact</label><div class="po-in ro">(253) 555-0164</div></div></div></div></div>'+
  '<div class="po-card"><div class="po-ch">&#127919; Sourcing tier</div><div class="po-cb"><div class="po-tiers">'+
    tiers.map(function(t,i){return '<button class="po-tier'+(PO.tier===i?' on':'')+'" data-po="tier:'+i+'">'+
      '<b>'+t[0]+'</b><span>'+t[1]+'</span></button>';}).join('')+'</div>'+
    '<div class="po-hintx">'+['Preplanned buy against a negotiated agreement — best price, no approval needed.',
      'Called or emailed the vendor today. Standard for jobsite replenishment.',
      'Spot buy under urgency — flagged for review, and the premium is tracked against the job.',
      'Pulled from your own yard. No money leaves; the job still gets charged.'][PO.tier]+'</div>'+
    '</div></div>'+
  '<div class="po-card"><div class="po-ch">&#128230; Line items</div><div class="po-cb">'+
    '<div class="po-lh"><span>Description</span><span>Qty</span><span>Unit</span><span>Unit $</span><span>Cost code</span><span>Class</span><span></span></div>'+
    lines+
    '<button class="po-add" data-po="add">+ Add line</button>'+
    '<div class="po-tot">PO total: <b id="poTotal">'+poMoney(poTotal())+'</b></div></div></div>'+
  '<div class="po-card"><div class="po-ch">&#128221; Notes &amp; authorization</div><div class="po-cb">'+
    '<label class="po-l">Scope / notes</label>'+
    '<div class="po-in ro" style="min-height:26px">Backfill material for lift station, grid D. Deliver to north gate — call super on arrival.</div>'+
    '<div class="po-auth"><span class="po-a on">&#10003; Under your $10k limit — no second signature</span>'+
    '<span class="po-a">Send to vendor</span><span class="po-a">Save as draft</span></div></div></div>';
}
function PO_RECEIPT(){
  return '<div class="po-card"><div class="po-ch">&#128229; Log a receipt against an open PO</div><div class="po-cb">'+
    '<label class="po-l">Open PO</label>'+sel('r',['PO-20260806-004 · Ridgeline Supply · $8,412.00',
      'PO-20260807-002 · Kestrel Mechanical · $168,400.00','PO-20260807-005 · Sundial Electric · $96,800.00'],0,'')+
    '<div class="po-recv"><div class="po-rh"><span>Line</span><span>Ordered</span><span>Received</span><span>Status</span></div>'+
    '<div class="po-rr"><span>3/4" minus crushed rock</span><span>42 TON</span><span>42 TON</span><span class="ok">Complete</span></div>'+
    '<div class="po-rr"><span>Rebar #4 x 20ft</span><span>180 EA</span><span>180 EA</span><span class="ok">Complete</span></div>'+
    '<div class="po-rr"><span>Delivery — jobsite</span><span>1 LS</span><span>0</span><span class="wn">Outstanding</span></div></div>'+
    '<div class="po-hintx">Snap the packing slip and Jeeves matches it to the PO line. Anything it cannot match is flagged for you rather than guessed.</div>'+
    '<div class="po-auth"><span class="po-a on">&#128247; Attach packing slip</span><span class="po-a">Post receipt</span></div>'+
  '</div></div>';
}
function PO_OPENLIST(){
  return '<div class="po-card"><div class="po-ch">&#128193; Open purchase orders</div><div class="po-cb">'+
    '<table class="po-tbl"><thead><tr><th>PO #</th><th>Vendor</th><th>Cost target</th><th class="r">Amount</th><th>Status</th><th>Note</th></tr></thead><tbody>'+
    PO_OPEN.map(function(r){return '<tr><td class="mono">'+r[0]+'</td><td>'+r[1]+'</td><td class="mono">'+r[2]+'</td>'+
      '<td class="r">'+r[3]+'</td><td><span class="po-st '+(r[4]==='Open'?'op':(r[4]==='Partial'?'pa':'cl'))+'">'+r[4]+'</span></td>'+
      '<td class="mut">'+r[5]+'</td></tr>';}).join('')+'</tbody></table>'+
    '<div class="po-hintx">Every PO posts against a cost target the moment it is raised, so the job cost report is never waiting on month-end.</div>'+
  '</div></div>';
}
function PO_PREVIEW(){
  const tabs=[['create','&#128203; Create PO'],['receipt','&#128230; Log receipt'],['open','&#128193; Open POs']];
  return '<div class="mp-cap"><span class="l">What PO opens to</span><span class="r">Live module &middot; miniaturized</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body">'+
   '<div class="po-hd"><div><div class="t">Renfield</div><div class="s">Procurement &middot; serves the estimating desk &middot; C001-DEMO</div></div>'+
    '<div class="po-hr"><span class="po-stage">Stage 1</span><span class="po-gear">&#9881;</span></div></div>'+
   '<div class="po-tabs">'+tabs.map(function(t){return '<button class="po-tab'+(PO.tab===t[0]?' on':'')+'" data-po="tab:'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div>'+
   (PO.tab==='create'?PO_CREATE():(PO.tab==='receipt'?PO_RECEIPT():PO_OPENLIST()))+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function renderPO(){
  const a=AGENT_PITCH.po;
  setWork('<span class="eyebrow">PO</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+PLAT+PO_PREVIEW(),'Agents & Skills · PO');
}

/* ================= FINANCE — business health, ~$5M contractor. FICTITIOUS. ================= */
const FIN = { tab:'exec', proj:null };
const F = {
  rev:5124800, cogs:4046600, oh:712400,
  activeContract:2843900, billedActive:1682450, backlog:3914200,
  cash:486300, ar:742180, ar60:88400, ap:398600, retHeld:164900, wip:212700,
  closedCount:13, activeCount:6, line:1500000
};
F.gp = F.rev - F.cogs; F.net = F.gp - F.oh;
const FIN_PROJECTS = [
  ['Fairhaven Lift Station 2','FLS26-114','D. Prentiss','Active',1331412,742830,611204,58,0,37142],
  ['Slip 36 enabling work (T&amp;M)','HALV35210','L. Ortiz','Active',125270,107481,88940,86,0,0],
  ['Larkspur retaining wall repairs','2026-081','J. Rowe','Active',21150,10575,8210,52,0,0],
  ['Kestrel Harbor Lake EV hub','KES26030','J. Rowe','Job ready',57000,0,0,0,0,0],
  ['Meridian Cold Storage B390','MERID-B390','L. Ortiz','Design',126100,0,0,0,0,0],
  ['Harbor District ammunition pier','PIPELINE-HDIST','D. Prentiss','Proposed',782522,0,0,0,0,0],
  ['Fairhaven Works Park decon','PRK730300','L. Ortiz','Closeout',628525,496530,401180,94,18200,0],
  ['Trinity Valley cath lab','TVH25287','L. Ortiz','Closed',70996,70996,58940,100,0,3405],
  ['Northgate temp ramps','NGM26043','J. Rowe','Closed',88427,88427,71100,100,0,0],
  ['Cedar Park ISD freezer addition','CPI25-330','D. Prentiss','Closed',214600,214600,171800,100,0,0]
];
const FIN_CASH = [
  ['Mar 2026',412600,388200,431400],['Apr 2026',468900,451300,449000],['May 2026',521400,472800,497600],
  ['Jun 2026',389200,468100,418700],['Jul 2026',612800,504900,526600],['Aug 2026',438100,478400,486300]
];
function fm(n){ return '$'+Math.round(n).toLocaleString('en-US'); }
function fk(n){ return n>=1e6 ? '$'+(n/1e6).toFixed(2)+'M' : '$'+Math.round(n/1000)+'K'; }
function pct(n){ return n.toFixed(1)+'%'; }

function finKPIs(){
  const k=[
    ['Revenue — trailing 12','fk',F.rev,'Across '+(F.activeCount+F.closedCount)+' jobs','ac'],
    ['Gross profit','fk',F.gp,pct(F.gp/F.rev*100)+' margin','gd'],
    ['Net income','fk',F.net,pct(F.net/F.rev*100)+' after overhead','gd'],
    ['Backlog','fk',F.backlog,'Signed, not yet built','ac'],
    ['Cash on hand','fk',F.cash,'Plus '+fk(F.line)+' line, undrawn','gd'],
    ['A/R outstanding','fk',F.ar,fk(F.ar60)+' over 60 days','wr'],
    ['Retention held','fk',F.retHeld,'Releases at closeout','wr'],
    ['Work in progress','fk',F.wip,'Earned, not yet billed','ac']
  ];
  return '<div class="fk">'+k.map(function(x){
    return '<div class="fkc '+x[4]+'"><span class="l">'+x[0]+'</span><span class="v">'+fk(x[2])+'</span>'+
      '<span class="s">'+x[3]+'</span></div>';}).join('')+'</div>';
}
function finPL(){
  const rows=[['Revenue',F.rev,''],['Cost of goods sold',-F.cogs,''],['Gross profit',F.gp,'sub'],
    ['Overhead — payroll &amp; burden',-431200,''],['Overhead — facilities &amp; fleet',-168400,''],
    ['Overhead — insurance, bonding, software',-112800,''],['Net income',F.net,'tot']];
  return '<table class="ftbl"><thead><tr><th>Trailing twelve months</th><th class="r">Amount</th><th class="r">% of revenue</th></tr></thead><tbody>'+
    rows.map(function(r){return '<tr class="'+r[2]+'"><td>'+r[0]+'</td><td class="r'+(r[1]<0?' neg':'')+'">'+
      (r[1]<0?'('+fm(-r[1])+')':fm(r[1]))+'</td><td class="r">'+pct(Math.abs(r[1])/F.rev*100)+'</td></tr>';}).join('')+
    '</tbody></table>';
}
function finBars(){
  const rows=FIN_PROJECTS.map(function(p){return [p[0], p[5]-p[6], p[3]];})
    .sort(function(a,b){return b[1]-a[1];}).slice(0,10);
  const mx=Math.max.apply(null,rows.map(function(r){return Math.abs(r[1]);}))||1;
  return '<div class="fbars">'+rows.map(function(r,i){
    const w=Math.abs(r[1])/mx*100;
    return '<button class="fbar" data-fin="proj:'+i+'"><span class="n">'+r[0]+'</span>'+
      '<span class="t"><span class="b" style="width:'+w+'%;background:'+(r[1]>=0?'var(--good)':'var(--copper)')+'"></span></span>'+
      '<span class="v">'+fm(r[1])+'</span></button>';}).join('')+'</div>'+
    '<div class="fnote">Gross profit to date by project — billed less cost. Click a bar for the detail line.</div>'+
    (FIN.proj!==null&&rows[FIN.proj]?'<div class="fdet"><b>'+rows[FIN.proj][0]+'</b> — '+rows[FIN.proj][2]+
      ' · gross profit to date '+fm(rows[FIN.proj][1])+'</div>':'');
}
function finDonut(){
  const active=F.billedActive, closed=F.rev-F.billedActive, remain=F.activeContract-F.billedActive;
  const tot=active+closed+remain;
  const a=active/tot*360, c=a+closed/tot*360;
  return '<div class="fdon"><div class="ring" style="background:conic-gradient(#2f6f8f 0deg '+a+'deg, var(--good) '+a+'deg '+c+'deg, var(--oat-2) '+c+'deg 360deg)"></div>'+
   '<div class="lg"><span><i style="background:#2f6f8f"></i>Active billed '+fk(active)+'</span>'+
   '<span><i style="background:var(--good)"></i>Closed billed '+fk(closed)+'</span>'+
   '<span><i style="background:var(--oat-2)"></i>Active remaining '+fk(remain)+'</span></div></div>';
}
function finCash(){
  return '<table class="ftbl"><thead><tr><th>Month</th><th class="r">Cash in</th><th class="r">Cash out</th><th class="r">Net</th><th class="r">Balance</th></tr></thead><tbody>'+
   FIN_CASH.map(function(r){const net=r[1]-r[2];
     return '<tr><td>'+r[0]+'</td><td class="r">'+fm(r[1])+'</td><td class="r">'+fm(r[2])+'</td>'+
     '<td class="r '+(net>=0?'pos':'neg')+'">'+(net>=0?'+':'−')+fm(Math.abs(net))+'</td><td class="r">'+fm(r[3])+'</td></tr>';}).join('')+
   '</tbody></table>'+
   '<div class="fnote">Six-month operating cash. The June dip is the lift-station material buy landing before the pay app cleared.</div>';
}
function finRisk(){
  return '<table class="ftbl"><thead><tr><th>Project</th><th>PM</th><th>Status</th><th class="r">Contract</th><th class="r">Billed</th>'+
   '<th class="r">Cost</th><th class="r">Margin</th><th class="r">% Cpl</th><th class="r">AR&gt;60</th><th class="r">Reten.</th></tr></thead><tbody>'+
   FIN_PROJECTS.map(function(p){
     const gp=p[5]-p[6], mg=p[5]? (gp/p[5]*100):0;
     return '<tr><td class="nm">'+p[0]+'<div class="sub">'+p[1]+'</div></td><td>'+p[2]+'</td>'+
       '<td><span class="fst">'+p[3]+'</span></td><td class="r">'+fm(p[4])+'</td><td class="r">'+(p[5]?fm(p[5]):'—')+'</td>'+
       '<td class="r">'+(p[6]?fm(p[6]):'—')+'</td><td class="r '+(mg>=15?'pos':(p[5]?'neg':''))+'">'+(p[5]?pct(mg):'—')+'</td>'+
       '<td class="r">'+(p[7]?p[7]+'%':'—')+'</td><td class="r '+(p[8]?'neg':'')+'">'+(p[8]?fm(p[8]):'—')+'</td>'+
       '<td class="r">'+(p[9]?fm(p[9]):'—')+'</td></tr>';}).join('')+'</tbody></table>';
}
const FIN_TABS=[['exec','&#128202; Executive snapshot'],['pm','&#128736; Project manager'],['super','&#9979; Superintendent'],
  ['pe','&#128203; PE / admin'],['closed','&#128193; Closed projects'],['audit','&#128274; Audit log']];
function finBody(){
  if(FIN.tab==='exec') return finKPIs()+
    '<div class="fsec">Profit &amp; loss — trailing twelve months</div>'+finPL()+
    '<div class="fgrid"><div><div class="fsec">Gross profit by project</div>'+finBars()+'</div>'+
    '<div><div class="fsec">Revenue mix</div>'+finDonut()+'</div></div>'+
    '<div class="fsec">Operating cash flow</div>'+finCash()+
    '<div class="fsec">Active project risk dashboard</div><div class="ftblwrap">'+finRisk()+'</div>'+
    '<div class="fgrid"><div><div class="fsec">Outstanding balances &amp; risk flags</div>'+
      '<div class="frisk"><b>Fairhaven Works Park — retention</b><span>'+fm(18200)+' held pending final walk</span></div>'+
      '<div class="frisk"><b>Trinity Valley — retention</b><span>'+fm(3405)+' · releases on owner sign-off</span></div>'+
      '<div class="frisk warn"><b>A/R over 60 days</b><span>'+fm(F.ar60)+' across 2 invoices — both chased twice</span></div>'+
      '<div class="frisk warn"><b>Unsigned change events</b><span>'+fm(123400)+' submitted, no owner signature yet</span></div></div>'+
    '<div><div class="fsec">Portfolio summary</div><table class="ftbl"><tbody>'+
      '<tr><td>Active contract value</td><td class="r">'+fm(F.activeContract)+'</td></tr>'+
      '<tr><td>Billed on active</td><td class="r">'+fm(F.billedActive)+'</td></tr>'+
      '<tr><td>Backlog</td><td class="r">'+fm(F.backlog)+'</td></tr>'+
      '<tr><td>Closed jobs (all time)</td><td class="r">'+F.closedCount+'</td></tr>'+
      '<tr class="tot"><td>Revenue — trailing 12</td><td class="r">'+fm(F.rev)+'</td></tr>'+
      '</tbody></table></div></div>';
  if(FIN.tab==='pm') return '<div class="fsec">Project manager view — cost to complete</div>'+
    '<table class="ftbl"><thead><tr><th>Project</th><th class="r">Budget</th><th class="r">Committed</th><th class="r">Spent</th><th class="r">To complete</th><th class="r">Forecast margin</th></tr></thead><tbody>'+
    '<tr><td>Fairhaven Lift Station 2</td><td class="r">'+fm(1082400)+'</td><td class="r">'+fm(846200)+'</td><td class="r">'+fm(611204)+'</td><td class="r">'+fm(471196)+'</td><td class="r pos">18.7%</td></tr>'+
    '<tr><td>Slip 36 enabling work</td><td class="r">'+fm(102900)+'</td><td class="r">'+fm(94100)+'</td><td class="r">'+fm(88940)+'</td><td class="r">'+fm(13960)+'</td><td class="r pos">17.9%</td></tr>'+
    '<tr><td>Larkspur retaining wall</td><td class="r">'+fm(17400)+'</td><td class="r">'+fm(14800)+'</td><td class="r">'+fm(8210)+'</td><td class="r">'+fm(9190)+'</td><td class="r neg">11.4%</td></tr>'+
    '<tr><td>Fairhaven Works Park</td><td class="r">'+fm(512300)+'</td><td class="r">'+fm(508900)+'</td><td class="r">'+fm(401180)+'</td><td class="r">'+fm(111120)+'</td><td class="r pos">21.3%</td></tr>'+
    '</tbody></table><div class="fnote">Committed includes open purchase orders from the PO module — nothing is re-keyed.</div>'+
    '<div class="fsec">Flags</div><div class="frisk warn"><b>Larkspur retaining wall</b><span>Forecast margin 11.4% — below your 15% floor. Two change events unpriced.</span></div>';
  if(FIN.tab==='super') return '<div class="fsec">Superintendent view — labour &amp; production</div>'+
    '<table class="ftbl"><thead><tr><th>Crew</th><th>Job</th><th class="r">Hours (wk)</th><th class="r">Budget hrs</th><th class="r">Variance</th><th class="r">Units/day</th></tr></thead><tbody>'+
    '<tr><td>Concrete — crew A</td><td>Fairhaven LS2</td><td class="r">198</td><td class="r">180</td><td class="r neg">+18</td><td class="r">14 CY</td></tr>'+
    '<tr><td>Steel erection</td><td>Fairhaven LS2</td><td class="r">142</td><td class="r">160</td><td class="r pos">−18</td><td class="r">3.1 T</td></tr>'+
    '<tr><td>Masonry</td><td>Works Park</td><td class="r">88</td><td class="r">96</td><td class="r pos">−8</td><td class="r">210 SF</td></tr>'+
    '<tr><td>General labour</td><td>Slip 36</td><td class="r">64</td><td class="r">60</td><td class="r neg">+4</td><td class="r">—</td></tr>'+
    '</tbody></table><div class="fnote">Hours flow from the field capture — no timesheet re-entry.</div>'+
    '<div class="fsec">Open safety items</div><div class="frisk warn"><b>1 open hazard</b><span>Missing MCC arc-flash label — Fairhaven LS2, raised 8/17</span></div>'+
    '<div class="frisk"><b>OSHA recordable</b><span>0 open · 412 days since last recordable</span></div>';
  if(FIN.tab==='pe') return '<div class="fsec">PE / admin — billing &amp; compliance</div>'+
    '<table class="ftbl"><thead><tr><th>Item</th><th>Job</th><th class="r">Amount</th><th>Status</th></tr></thead><tbody>'+
    '<tr><td>Pay app #6</td><td>Fairhaven LS2</td><td class="r">'+fm(160000)+'</td><td><span class="fst wn">Submitted</span></td></tr>'+
    '<tr><td>Pay app #12</td><td>Works Park</td><td class="r">'+fm(48300)+'</td><td><span class="fst ok">Paid</span></td></tr>'+
    '<tr><td>Lien release — Kestrel</td><td>Fairhaven LS2</td><td class="r">'+fm(168400)+'</td><td><span class="fst wn">Awaiting</span></td></tr>'+
    '<tr><td>Certified payroll wk 32</td><td>Fairhaven LS2</td><td class="r">—</td><td><span class="fst ok">Filed</span></td></tr>'+
    '<tr><td>Sub insurance — Larkspur Paving</td><td>Fairhaven LS2</td><td class="r">—</td><td><span class="fst wn">Expires 9/1</span></td></tr>'+
    '</tbody></table><div class="fnote">Prevailing-wage jobs file certified payroll automatically each Friday; exceptions come to you.</div>';
  if(FIN.tab==='closed') return '<div class="fsec">Closed projects — all time</div>'+
    '<table class="ftbl"><thead><tr><th>Project</th><th class="r">Contract</th><th class="r">Final cost</th><th class="r">Margin</th><th class="r">Closed</th></tr></thead><tbody>'+
    '<tr><td>Trinity Valley cath lab</td><td class="r">'+fm(70996)+'</td><td class="r">'+fm(58940)+'</td><td class="r pos">17.0%</td><td class="r">Jun 2026</td></tr>'+
    '<tr><td>Northgate temp ramps</td><td class="r">'+fm(88427)+'</td><td class="r">'+fm(71100)+'</td><td class="r pos">19.6%</td><td class="r">May 2026</td></tr>'+
    '<tr><td>Cedar Park ISD freezer addition</td><td class="r">'+fm(214600)+'</td><td class="r">'+fm(171800)+'</td><td class="r pos">19.9%</td><td class="r">Mar 2026</td></tr>'+
    '<tr><td>Meridian Cold B210 dock levellers</td><td class="r">'+fm(146200)+'</td><td class="r">'+fm(124900)+'</td><td class="r pos">14.6%</td><td class="r">Feb 2026</td></tr>'+
    '<tr><td>Northgate FD apparatus bay</td><td class="r">'+fm(392800)+'</td><td class="r">'+fm(341600)+'</td><td class="r neg">13.0%</td><td class="r">Dec 2025</td></tr>'+
    '</tbody></table><div class="fnote">13 closed jobs · '+fk(2974000)+' billed · 17.8% average margin. Each carries its post-mortem.</div>';
  return '<div class="fsec">Audit log</div><table class="ftbl"><thead><tr><th>When</th><th>Who</th><th>Action</th></tr></thead><tbody>'+
    '<tr><td>8/10 3:42 PM</td><td>D. Prentiss</td><td>Approved PCO-011 · Fairhaven LS2 · '+fm(9640)+'</td></tr>'+
    '<tr><td>8/10 11:06 AM</td><td>Jeeves</td><td>Posted receipt PO-20260806-004 · 2 of 3 lines</td></tr>'+
    '<tr><td>8/9 4:18 PM</td><td>L. Ortiz</td><td>Pay app #6 submitted · '+fm(160000)+'</td></tr>'+
    '<tr><td>8/9 9:52 AM</td><td>Jeeves</td><td>Flagged Larkspur Paving insurance expiry (9/1)</td></tr>'+
    '<tr><td>8/8 2:31 PM</td><td>D. Prentiss</td><td>Go decision · Larkspur Commerce Building B</td></tr>'+
    '</tbody></table><div class="fnote">Append-only. Corrections are new entries — nothing is edited away.</div>';
}
function FIN_PREVIEW(){
  return '<div class="mp-cap"><span class="l">What Finance opens to</span><span class="r">Live module &middot; role-based</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body">'+
   '<div class="fin-hd"><div><div class="t">Cornerstone Structural Group</div>'+
    '<div class="s">Operational control dashboard &middot; role-based</div></div>'+
    '<div class="fin-hr"><span class="cui">CUI // SP-PRVCY · CMMC 2.0 L2</span>'+
    '<span class="doc">Doc ID: CSG-PMUI-2026-001 · Rev 1.0 · As of 8/10/2026</span></div></div>'+
   '<div class="fin-tabs">'+FIN_TABS.map(function(t){return '<button class="fin-tab'+(FIN.tab===t[0]?' on':'')+'" data-fin="tab:'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div>'+
   '<div class="docwrap">'+finBody()+'</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function renderFIN(){
  const a=AGENT_PITCH.finance;
  setWork('<span class="eyebrow">Finance</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+(a.ala||ALA)+FIN_PREVIEW(),'Agents & Skills · Finance');
}

/* ================= DOCS — the library. Everything the platform produces. FICTITIOUS. ================= */
const DOCS = { q:'', filter:'all', proj:'all', open:null };
const DOC_TYPES = [['all','All'],['wp','Work packages'],['est','Estimates'],['prop','Proposals'],
  ['gng','Go / No-Go'],['field','Field reports'],['sub','Submittals'],['close','Closeout'],['corr','Correspondence']];
const DOC_PROJ = ['all','Fairhaven Lift Station 2','Larkspur Commerce Bldg B','Fairhaven Works Park','Trinity Valley cath lab','Slip 36 enabling work'];
const DOC_ITEMS = [
 ['Estimate — Building B Addition (AACE Class 5)','est','Larkspur Commerce Bldg B','9/8/2026','240 KB','Rev 1.2','PreCon','est'],
 ['Schedule — Building B Addition','est','Larkspur Commerce Bldg B','9/8/2026','180 KB','Rev 1.2','PreCon','sch'],
 ['Proposal — Building B Addition','prop','Larkspur Commerce Bldg B','9/8/2026','320 KB','Rev 1.0','PreCon','prop'],
 ['Field walk report — walk #3','field','Larkspur Commerce Bldg B','8/10/2026','96 KB','Final','Inspect','walk'],
 ['1.1 Electrical Permits — work package','wp','Larkspur Commerce Bldg B','9/2/2026','44 KB','Rev 2.0','PreCon',''],
 ['2.1 Foundation — work package','wp','Fairhaven Lift Station 2','3/14/2026','52 KB','Rev 3.1','PM',''],
 ['3.3 Electrical &amp; controls — work package','wp','Fairhaven Lift Station 2','7/13/2026','61 KB','Rev 1.4','PM',''],
 ['4.2 Closeout — work package','wp','Fairhaven Lift Station 2','9/28/2026','38 KB','Rev 1.0','PM',''],
 ['Go / No-Go scorecard — Riverside Phase 2','gng','Fairhaven Lift Station 2','2/18/2026','88 KB','Final','Decide',''],
 ['Go / No-Go scorecard — Building B Addition','gng','Larkspur Commerce Bldg B','8/8/2026','91 KB','Final','Decide',''],
 ['Submittal 03300 — concrete mix design','sub','Fairhaven Lift Station 2','5/06/2026','1.4 MB','Rev 2','PM',''],
 ['Submittal 26 24 16 — distribution panel','sub','Fairhaven Lift Station 2','7/21/2026','2.1 MB','Rev 1','PM',''],
 ['Field walk report — walk #2','field','Fairhaven Lift Station 2','8/3/2026','88 KB','Final','Inspect',''],
 ['Field walk report — walk #1','field','Fairhaven Lift Station 2','7/22/2026','74 KB','Final','Inspect',''],
 ['O&amp;M manual &amp; warranty package','close','Trinity Valley cath lab','6/12/2026','18 MB','Final','PM',''],
 ['Post-mortem — lessons learned','close','Trinity Valley cath lab','6/19/2026','62 KB','Final','PM',''],
 ['Closeout package — as-builts &amp; releases','close','Fairhaven Works Park','7/30/2026','24 MB','Final','PM',''],
 ['RFI-018 response — MCC clearance','corr','Fairhaven Lift Station 2','8/17/2026','36 KB','—','PM',''],
 ['Notice — weather delay, 3 days','corr','Fairhaven Lift Station 2','8/14/2026','12 KB','—','PM',''],
 ['Solicitation &amp; instructions — Fairhaven WWTP','corr','Fairhaven Works Park','8/7/2026','250 KB','—','Decide','']
];
const DOC_ICON = {wp:'&#9633;', est:'&#128200;', prop:'&#128196;', gng:'&#9989;', field:'&#128065;',
  sub:'&#128193;', close:'&#128230;', corr:'&#9993;'};
function docMatch(d){
  if(DOCS.filter!=='all' && d[1]!==DOCS.filter) return false;
  if(DOCS.proj!=='all' && d[2]!==DOCS.proj) return false;
  if(DOCS.q){ const q=DOCS.q.toLowerCase();
    if((d[0]+' '+d[2]+' '+d[6]).toLowerCase().indexOf(q)<0) return false; }
  return true;
}
function docList(){
  const rows=DOC_ITEMS.filter(docMatch);
  if(!rows.length) return '<div class="dk-empty">Nothing matches that filter.</div>';
  return rows.map(function(d){
    const i=DOC_ITEMS.indexOf(d);
    return '<button class="dk-row'+(d[7]?' live':'')+'" data-dk="open:'+i+'">'+
      '<span class="ic">'+(DOC_ICON[d[1]]||'&#128196;')+'</span>'+
      '<span class="bd"><span class="n">'+d[0]+(d[7]?' <b class="op">open &rarr;</b>':'')+'</span>'+
      '<span class="m">'+d[2]+' &middot; '+d[6]+' &middot; '+d[4]+'</span></span>'+
      '<span class="rv">'+d[5]+'</span><span class="dt">'+d[3]+'</span></button>';
  }).join('');
}
function DOCS_LIB(){
  const counts={}; DOC_ITEMS.forEach(function(d){counts[d[1]]=(counts[d[1]]||0)+1;});
  return '<div class="mp-cap"><span class="l">What Docs opens to</span><span class="r">Live module &middot; miniaturized</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body">'+
   '<div class="dk-hd"><div><div class="t">Docs</div><div class="s">The library &middot; work packages through past reports</div></div>'+
    '<div class="dk-ct">'+DOC_ITEMS.length+' documents</div></div>'+
   '<div class="dk-tools"><input class="dk-search" id="dkQ" placeholder="Search the library…" value="'+esc(DOCS.q)+'">'+
    '<select class="po-sel dk-proj" id="dkProj">'+DOC_PROJ.map(function(p){
      return '<option'+(p===DOCS.proj?' selected':'')+'>'+(p==='all'?'All projects':p)+'</option>';}).join('')+'</select></div>'+
   '<div class="dk-chips">'+DOC_TYPES.map(function(t){
     const n=t[0]==='all'?DOC_ITEMS.length:(counts[t[0]]||0);
     return '<button class="dk-chip'+(DOCS.filter===t[0]?' on':'')+'" data-dk="f:'+t[0]+'">'+t[1]+' <b>'+n+'</b></button>';}).join('')+'</div>'+
   '<div class="dk-list" id="dkList">'+docList()+'</div>'+
   '<div class="ins-hint">Everything the platform produces lands here on its own — nothing is filed by hand. The four highlighted items open the real document.</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function DOCS_VIEW(){
  const d=DOC_ITEMS[DOCS.open];
  const body = d[7]==='est'?DOC_ESTIMATE : d[7]==='sch'?DOC_SCHEDULE() : d[7]==='prop'?DOC_PROPOSAL :
    '<div class="dn">Field walk report — generated 8/10/2026.</div>'+
    '<h4 class="sh">Field walk report</h4><div class="sn">Opened from the library. The full report lives in the Inspect module.</div>';
  return '<span class="eyebrow">Docs</span><h2>Everything, <span class="cu">where you left it.</span></h2>'+
  '<p>Opened straight from the library — same file, same revision, with its source module and history attached.</p>'+CORE_DOCS+
  '<div class="mp-cap"><span class="l">'+d[0]+'</span><span class="r">'+d[5]+' &middot; '+d[6]+' &middot; fictitious</span></div>'+
  '<div class="mp"><div class="mp-hd"><div class="mp-logo">AIC</div>'+
   '<div class="mp-hd-ic"><i>&#128101;</i><i>&#9673;</i><i>&#128247;</i><i>i</i><i>&#8645;</i><i>&#9790;</i></div></div>'+
  '<div class="mp-body"><button class="dd-back" data-back="1">&larr; Library</button>'+
   '<div class="dk-meta"><span><b>Project</b>'+d[2]+'</span><span><b>Type</b>'+
     (DOC_TYPES.filter(function(t){return t[0]===d[1];})[0]||['','—'])[1]+'</span>'+
     '<span><b>Raised by</b>'+d[6]+'</span><span><b>Revision</b>'+d[5]+'</span><span><b>Size</b>'+d[4]+'</span></div>'+
   '<div class="dk-hist"><b>Revision history</b>'+
     '<span>Rev 1.2 &middot; 9/8/2026 &middot; regenerated after WBS change (transformer set)</span>'+
     '<span>Rev 1.1 &middot; 8/29/2026 &middot; contingency raised to 10%</span>'+
     '<span>Rev 1.0 &middot; 8/24/2026 &middot; first issue from PreCon</span>'+
     '<i>Corrections are new revisions. Nothing is overwritten.</i></div>'+
   '<div class="docwrap">'+body+'</div>'+
  '</div><div class="mp-sync"><span class="d"></span>synced</div></div>';
}
function renderDOCS(){
  const a=AGENT_PITCH.docs;
  setWork('<span class="eyebrow">Docs</span><h2>'+a.h+'</h2><p>'+a.p+'</p>'+CORE_DOCS+DOCS_LIB(),'Agents & Skills · Docs');
}

const SOON = (n)=>`<div class="mp-soon"><div class="t">Module preview — next up</div>
<div class="d">The ${n} screen drops in here the same way Meet's does. Meet is wired as the working example so you can judge the pattern first.</div></div>`;

const AGENT_PITCH = {
  meet:    { n:'Meet',    h:`Every relationship, <span class="cu">one board.</span>`, p:`Every contact from every conference and plan room lands in one place — Jeeves reminds you who to follow up with and when.`, prev:MEET_PREVIEW },
  todo:    { n:'To-Do',   h:`Nothing falls through <span class="cu">the cracks.</span>`, p:`Every task an agent is waiting on you for shows up here — assign it, accept it, or verify it's done. To-Do is how the platform's agents hand work to your team and prove it got done, so it runs inside the platform rather than on its own.`, ala:PLAT, prev:TODO_PREVIEW },
  recpt:   { n:'Recpt',   h:`Receipts, filed <span class="cu">before you're back in the truck.</span>`, p:`Snap a photo in the field, say what it's for, and Jeeves codes it to the right job and cost code automatically.`, prev:RECPT_PREVIEW },
  decide:  { n:'Decide',  h:`Every bid, <span class="cu">scored and ready.</span>`, p:`Every solicitation that lands in your estimating inbox, triaged and waiting on one call from you. Follow it all the way through to the precon workspace.`, custom:'decide' },
  inspect: { n:'Inspect', h:`Job walks, <span class="cu">captured hands-free.</span>`, p:`A phone app on the jobsite and the same form in the office — classify the project, capture findings by voice or photo, and let the write-up generate itself. Several walks per project is the normal case, not the exception.`, custom:'inspect' },
  pm:      { n:'PM',      h:`Every awarded job, <span class="cu">tracked start to close.</span>`, p:`Award through closeout in one record — schedule, subs, change events, billings, safety and the ledger all hanging off the same project.`, custom:'pm' },
  po:      { n:'PO',      h:`Purchasing, <span class="cu">without the paper chase.</span>`, p:`A plain purchase-order app — raise the PO, pick the cost target, log the receipt against it. Every commitment posts to the job the moment it is raised, so the cost report is never waiting on month-end.`, custom:'po', ala:PLAT },
  finance: { n:'Finance', h:`The numbers your controller <span class="cu">wishes updated themselves.</span>`, p:`This is the core of the platform, not an add-on — every estimate, receipt, purchase order and pay application lands here. P&L, cash flow, backlog, A/R and job-level margin, rolled up for the owner, the bank and the bonding agent as the work happens rather than at month-end.`, custom:'finance', ala:CORE },
  docs:    { n:'Docs',    h:`Your library — <span class="cu">everything, filed as it happens.</span>`, p:`Work packages, estimates, proposals, Go/No-Go scorecards, field reports, submittals, closeout packages and correspondence. Every module files into it automatically, each document keeping its revision history and the module that raised it.`, custom:'docs', ala:CORE_DOCS },
};

const EX_ESTIMATE = `<div class="ex-card"><h3>142 Elm St. — Tenant Improvement</h3>
<table class="ex-table"><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
<tr><td>Demo &amp; haul-off</td><td>1</td><td>$4,200</td><td>$4,200</td></tr>
<tr><td>Metal stud framing</td><td>2,100 sf</td><td>$6.40</td><td>$13,440</td></tr>
<tr><td>Drywall &amp; finish</td><td>2,100 sf</td><td>$5.10</td><td>$10,710</td></tr>
<tr><td>Paint</td><td>2,100 sf</td><td>$1.85</td><td>$3,885</td></tr></table>
<div class="ex-total">Subtotal: $32,235 &nbsp;·&nbsp; Margin (18%): $5,802 &nbsp;·&nbsp; <b>Proposal total: $38,037</b></div>
<div class="ex-note">Jeeves compiled this from your uploaded takeoff and prior job costs — confirm sequence and language, then sign.</div></div>`;

const EX_GONOGO = `<div class="ex-card"><h3>Riverside Distribution Center — Phase 2</h3>
<div class="ex-scores">
<div class="ex-score"><span class="lbl">Win probability</span><span class="val good">64%</span></div>
<div class="ex-score"><span class="lbl">Target margin</span><span class="val good">16.2%</span></div>
<div class="ex-score"><span class="lbl">Bonding capacity</span><span class="val">Within limit</span></div>
<div class="ex-score"><span class="lbl">Schedule risk</span><span class="val warn">Moderate</span></div>
</div>
<div class="ex-stamp">RECOMMENDATION: GO</div>
<div class="ex-note">Every open bid scored like this and waiting on your call — nothing missed before the deadline.</div></div>`;

const EX_RECEIPT = `<div class="ex-card"><h3>Ridgeline Supply #4410 — $186.42</h3>
<div class="ex-scores">
<div class="ex-score"><span class="lbl">Job</span><span class="val">CR-2214 · Cedar Ridge</span></div>
<div class="ex-score"><span class="lbl">Cost code</span><span class="val">06-100 Framing</span></div>
<div class="ex-score"><span class="lbl">Submitted by</span><span class="val">Field · via photo</span></div>
<div class="ex-score"><span class="lbl">Status</span><span class="val good">Coded &amp; filed</span></div>
</div>
<div class="ex-note">Snapped in the truck, matched to the job and cost code automatically — no paperwork at week's end.</div></div>`;

const LIMITED_MSG = `Full functions are provided in the AIC platform. This is a limited response mock-up.`;

const workScreen = document.getElementById('workScreen');
const workTop    = document.getElementById('workTop');
const workCrumb  = document.getElementById('workCrumb');
const pitchBanner= document.getElementById('pitchBanner');
const chatLog    = document.getElementById('chatLog');
const chatForm   = document.getElementById('chatForm');
const chatInput  = document.getElementById('chatInput');

let engaged = false;

/* the moment the visitor engages, the pitch moves ABOVE the widget and stays there */
function engage(){
  if (engaged) return;
  engaged = true;
  pitchBanner.classList.add('show');
  workTop.classList.add('show');
}

function reset(){
  HIST.length = 0;
  engaged = false;
  pitchBanner.classList.remove('show');
  workTop.classList.remove('show');
  workScreen.innerHTML = DEFAULT_PITCH;
  document.querySelectorAll('.ag-row').forEach(r=>r.classList.remove('active'));
}

function setWork(html, crumb){
  engage();
  workScreen.innerHTML = html;
  workCrumb.textContent = crumb || 'Working screen';
  document.getElementById('backBtn').classList.toggle('show', HIST.length>1);
}

function addBubble(text, cls){
  const lbl = document.createElement('div');
  lbl.className = 'jw-msg-lbl' + (cls==='user' ? ' user' : '');
  lbl.textContent = cls==='user' ? 'You' : 'Jeeves';
  const b = document.createElement('div');
  b.className = 'jw-bubble' + (cls ? ' '+cls : '');
  b.textContent = text;
  chatLog.appendChild(lbl); chatLog.appendChild(b);
  chatLog.scrollTop = chatLog.scrollHeight;
}

const HIST = [];
function paint(){
  const d = HIST[HIST.length-1]; if (!d) return;
  if (d.t==='agent')  paintAgent(d.k);
  else if (d.t==='decide'){ DEC.view=d.v; renderDecide(); }
  else if (d.t==='meet') setWork(d.v==='board'?MEET_DRILL_FW:MEET_DOSSIER,
      d.v==='board'?'Meet · Build Fort Worth Expo 2026':'Meet · Dossier · Alan Whitcomb');
  else if (d.t==='recpt') setWork(RECPT_RESULT,'Recpt · Coded & filed');
  else if (d.t==='inspect') setWork(INSPECT_REPORT(),'Inspect · Field walk report');
  else if (d.t==='pm') setWork(PM_PROJECT(),'PM · Fairhaven Lift Station 2');
  else if (d.t==='docs') setWork(DOCS_VIEW(),'Docs · '+DOC_ITEMS[DOCS.open][0].replace(/&amp;/g,'&'));
}
function navTo(d){ HIST.push(d); paint(); }
function navBack(){ if (HIST.length>1){ HIST.pop(); paint(); } }

function showAgent(key){ navTo({t:'agent',k:key}); }

function paintAgent(key){
  const a = AGENT_PITCH[key];
  if (!a) return;
  if (a.custom === 'po') { renderPO(); return; }
  if (a.custom === 'finance') { renderFIN(); return; }
  if (a.custom === 'docs') { DOCS.open=null; renderDOCS(); return; }
  if (a.custom === 'pm') { PM.view='list'; renderPM(); return; }
  if (a.custom === 'inspect') { INS.menu=false; renderInspect(); return; }
  if (a.custom === 'decide') { DEC.calSel=null; DEC.pcTab=0; DEC.hiliTab='input'; DEC.hiliOpen={}; DEC.outDoc='est'; DEC.view='dash'; renderDecide(); return; }
  setWork(`<span class="eyebrow">${a.n}</span><h2>${a.h}</h2><p>${a.p}</p>${a.ala || ALA}${a.prev || SOON(a.n)}`,
          'Agents & Skills · ' + a.n);
}

document.getElementById('agentList').addEventListener('click', (e)=>{
  const row = e.target.closest('.ag-row');
  if (!row) return;
  document.querySelectorAll('.ag-row').forEach(r=>r.classList.remove('active'));
  row.classList.add('active');
  showAgent(row.dataset.agent);
});

/* tier selector on the level-2 contact board */
function applyTier(t){
  const board = document.getElementById('cbBoard');
  if (!board) return;
  board.querySelectorAll('.cb-tier').forEach(c=>c.classList.toggle('on', c.dataset.tier===t));
  board.querySelectorAll('[data-tiergroup]').forEach(g=>{
    let visible = 0;
    g.querySelectorAll('.cb-row').forEach(r=>{
      const show = t==='all' ? true : (t==='spk' ? r.dataset.speaker==='1' : r.dataset.tier===t);
      r.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    g.style.display = visible ? '' : 'none';
  });
}

/* drill down / back up inside a module preview */
workScreen.addEventListener('click', (e)=>{
  const tier = e.target.closest('.cb-tier');
  if (tier) { applyTier(tier.dataset.tier); return; }

  // ---- Decide module ----
  if (e.target.closest('[data-back]')) { navBack(); return; }
  const dc = e.target.closest('[data-dc]');
  if (dc) {
    const v = dc.dataset.dc;
    if (v==='precon-out') { DEC.hiliTab='output'; DEC.outDoc='est'; DEC.pcTab=6; DEC.pcSplit=30; }
    navTo({t:'decide', v:v});
    if (v==='precon')     addBubble('Opened the PreCon workspace — intake memo on the left, HILI window on the right.');
    if (v==='precon-out') addBubble('Opened the estimate output — estimate, schedule and proposal are all in 00.6.');
    return;
  }
  const cal = e.target.closest('[data-cal]');
  if (cal) { DEC.calSel = cal.dataset.cal==='clear' ? null : parseInt(cal.dataset.cal,10); renderDecide(); return; }
  const pct = e.target.closest('[data-pct]');
  if (pct) { DEC.pcTab = parseInt(pct.dataset.pct,10); renderDecide(); return; }
  const hb = e.target.closest('[data-hb]');
  if (hb) {
    DEC.hiliTab = hb.dataset.hb;
    DEC.pcSplit = (DEC.hiliTab==='output') ? 30 : 58;   // documents need the room
    renderDecide(); return;
  }
  const hl = e.target.closest('[data-hili]');
  if (hl) { const k=hl.dataset.hili; DEC.hiliOpen[k]=!DEC.hiliOpen[k]; renderDecide(); return; }
  const out = e.target.closest('[data-out]');
  if (out) { DEC.outDoc = out.dataset.out; renderDecide(); return; }
  const dk = e.target.closest('[data-dk]');
  if (dk) {
    const q = dk.dataset.dk.split(':');
    if (q[0]==='f')    { DOCS.filter=q[1]; renderDOCS(); return; }
    if (q[0]==='open') {
      const i=parseInt(q[1],10);
      if (!DOC_ITEMS[i][7]) return;            // only the wired documents open
      DOCS.open=i; navTo({t:'docs', v:i});
      addBubble('Opened '+DOC_ITEMS[i][0].replace(/&amp;/g,'&')+' from the library — revision history attached.');
      return;
    }
  }
  const fin = e.target.closest('[data-fin]');
  if (fin) {
    const q = fin.dataset.fin.split(':');
    if (q[0]==='tab')  { FIN.tab=q[1]; FIN.proj=null; renderFIN(); return; }
    if (q[0]==='proj') { const i=parseInt(q[1],10); FIN.proj = (FIN.proj===i?null:i); renderFIN(); return; }
  }
  const po = e.target.closest('[data-po]');
  if (po) {
    const v = po.dataset.po, q = v.split(':');
    if (q[0]==='tab')  { PO.tab=q[1]; renderPO(); return; }
    if (q[0]==='tier') { PO.tier=parseInt(q[1],10); renderPO(); return; }
    if (q[0]==='add')  { PO.lines.push({d:'',q:1,u:'EA',p:0,c:'—',k:'Material'}); renderPO(); return; }
    if (q[0]==='del')  { PO.lines.splice(parseInt(q[1],10),1); renderPO(); return; }
  }
  const pm = e.target.closest('[data-pm]');
  if (pm) {
    const v = pm.dataset.pm;
    if (v==='proj') { navTo({t:'pm', v:'proj'});
      addBubble('Opened the sample project — schedule, subs, PCOs, billings, safety and ledger all on one record.'); return; }
    if (v.indexOf('sec:')===0) { const k=v.slice(4); PM.open[k]=!PM.open[k];
      setWork(PM_PROJECT(),'PM · Fairhaven Lift Station 2'); return; }
  }
  const ins = e.target.closest('[data-ins]');
  if (ins) {
    const v = ins.dataset.ins;
    if (v==='menu')    { INS.menu = !INS.menu; renderInspect(); return; }
    if (v==='newwalk') { INS.menu=false; INS.sel={}; INS.open={}; INS.proj=0;
                         addBubble('Started a new walk — walk #4 on this project. The previous three stay on the record.');
                         renderInspect(); return; }
    if (v==='report')  { INS.menu=false; navTo({t:'inspect', v:'report'});
                         addBubble('Generated the field walk report — 9 observations, 4 measurements, and what changed since walk #2.');
                         return; }
    if (v.indexOf('acc:')===0) { const k=v.slice(4); INS.open[k]=!INS.open[k]; renderInspect(); return; }
    if (v.indexOf('opt:')===0) {
      const parts=v.split(':'), k=parts[1], i=parseInt(parts[2],10);
      INS.sel[k] = INS.sel[k] || [];
      const at = INS.sel[k].indexOf(i);
      if (at>-1) INS.sel[k].splice(at,1); else INS.sel[k].push(i);
      renderInspect(); return;
    }
  }
  const sch = e.target.closest('[data-sch]');
  if (sch) {
    const q = sch.dataset.sch.split(':'), n = parseInt(q[1],10);
    if (q[0]==='pm') { PM.schMonth=n; setWork(PM_PROJECT(),'PM · Fairhaven Lift Station 2'); }
    else { DEC.schMonth=n; renderDecide(); }
    return;
  }
  const dwg = e.target.closest('[data-dwg]');
  if (dwg) {
    const a=dwg.dataset.dwg;
    if(a==='next') DEC.dwgPage=Math.min(3,DEC.dwgPage+1);
    if(a==='prev') DEC.dwgPage=Math.max(1,DEC.dwgPage-1);
    if(a==='in')   DEC.dwgZoom=Math.min(160,DEC.dwgZoom+20);
    if(a==='out')  DEC.dwgZoom=Math.max(60,DEC.dwgZoom-20);
    if(a==='reset'){DEC.dwgZoom=100;DEC.dwgPage=1;}
    if(a==='cz')   DEC.showCz=!DEC.showCz;
    renderDecide(); return;
  }

  const t = e.target.closest('[data-drill]');
  if (!t) return;
  if (t.dataset.drill === 'back')    { navBack(); return; }
  if (t.dataset.drill === 'fw2026')  { navTo({t:'meet', v:'board'}); return; }
  if (t.dataset.drill === 'recpt1')  { navBack(); return; }
  if (t.dataset.drill === 'recpt2')  {
    navTo({t:'recpt', v:'result'});
    addBubble(`Captured — vendor, amount, job and cost code read off the photo and filed. Missing PO flagged for your review.`);
    return;
  }
  if (t.dataset.drill === 'dossier') {
    navTo({t:'meet', v:'dossier'});
    addBubble(`Opened Alan Whitcomb's dossier — who he is, what he's building, and what to open with.`);
  }
});

function handleMessage(text){
  engage();
  addBubble(text, 'user');
  const t = text.toLowerCase();
  if (t.includes('estimate')) {
    setWork(EX_ESTIMATE, 'Sample · Estimate draft');
    addBubble(`Here's a sample estimate — pulled from a real proposal, reformatted for this walkthrough.`);
  } else if (t.includes('receipt')) {
    setWork(EX_RECEIPT, 'Sample · Receipt capture');
    addBubble(`Here's a sample receipt capture — coded and filed automatically.`);
  } else if ((t.includes('go') && t.includes('no')) || t.includes('decide')) {
    setWork(EX_GONOGO, 'Sample · Go/No-Go scorecard');
    addBubble(`Here's a sample Go/No-Go — scored and ready for your call.`);
  } else if (t.includes('walk me through')) {
    addBubble(`Try asking things like "show me an example of an estimate," or click any module on the left to see what it does.`);
  } else {
    addBubble(LIMITED_MSG, 'limited');
  }
}

chatForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = chatInput.value.trim();
  if (!v) return;
  handleMessage(v);
  chatInput.value = '';
});

chatLog.addEventListener('click', (e)=>{
  const chip = e.target.closest('.jw-chip');
  if (chip) handleMessage(chip.dataset.chip);
});

document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('backBtn').addEventListener('click', navBack);
workScreen.addEventListener('input',(e)=>{
  if(e.target && e.target.id==='dkQ'){
    DOCS.q=e.target.value;
    const l=document.getElementById('dkList'); if(l) l.innerHTML=docList();
    return;
  }
  if(e.target && e.target.dataset && e.target.dataset.poi){ poEdit(e.target); return; }
  if(e.target && e.target.dataset && e.target.dataset.schns){
    const n=parseInt(e.target.value,10);
    if(e.target.dataset.schns==='pm'){ PM.schMonth=n; setWork(PM_PROJECT(),'PM · Fairhaven Lift Station 2'); }
    else { DEC.schMonth=n; renderDecide(); }
  }
});
workScreen.addEventListener('change',(e)=>{
  if(e.target && e.target.id==='insProj'){ INS.proj=parseInt(e.target.value,10); renderInspect(); return; }
  if(e.target && e.target.id==='poTarget'){ PO.target=e.target.selectedIndex; renderPO(); return; }
  if(e.target && e.target.id==='dkProj'){ DOCS.proj = e.target.selectedIndex===0?'all':e.target.value; renderDOCS(); return; }
  if(e.target && e.target.dataset && e.target.dataset.poi){ poEdit(e.target); }
});
function poEdit(el){
  const q=el.dataset.poi.split(':'), i=parseInt(q[0],10), f=q[1];
  if(!PO.lines[i]) return;
  PO.lines[i][f] = (f==='q'||f==='p') ? (parseFloat(el.value)||0) : el.value;
  const t=document.getElementById('poTotal');
  if(t) t.textContent = poMoney(poTotal());
}

/* drag the PreCon divider */
let rzActive=false;
document.addEventListener('mousedown',(e)=>{ if(e.target.closest('#pcRz')){ rzActive=true; e.preventDefault(); }});
document.addEventListener('mousemove',(e)=>{
  if(!rzActive) return;
  const g=document.getElementById('pcSplit'); if(!g) return;
  const r=g.getBoundingClientRect();
  let pct=((e.clientX-r.left)/r.width)*100;
  DEC.pcSplit=Math.max(28,Math.min(78,pct));
  g.style.gridTemplateColumns=DEC.pcSplit+'% 7px auto';
});
document.addEventListener('mouseup',()=>{ rzActive=false; });
})();
