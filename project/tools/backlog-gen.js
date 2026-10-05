// Generator for rd-backlog.js. Usage inside run_script: eval(await readFile('tools/backlog-gen.js')); const js = GEN(mdLines, rdDataText);
// Reads the master backlog markdown and emits a data patch. Nothing is invented: records carry only what the backlog states.
var GEN = function (L, r) {
  const norm = s => String(s).toLowerCase().replace(/[®™]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '');
  const base = s => norm(String(s).split(' / ')[0].split(' (')[0]);
  const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[®™]/g, '').replace(/&/g, 'and').replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
  const clean = s => String(s).replace(/\*\*/g, '').replace(/`/g, '').replace(/—|–/g, ', ').replace(/\s+,/g, ',').replace(/[;.]$/, '').trim();
  const secIdx = n => L.findIndex(x => new RegExp('^# ' + n + '\\.').test(x));
  const exPairs = [...r.matchAll(/\("([a-z0-9-]+)", "([A-Z0-9][^"]+)"/g)];
  const exIds = new Set(exPairs.map(m => m[1])), exTitles = new Map(exPairs.map(m => [norm(m[2]), m[1]]));
  const urls = [];
  [27, 134].forEach(n => { const a = secIdx(n); if (a < 0) return; for (let i = a + 1; i < L.length && !/^# \d+\./.test(L[i]); i++) { const m = L[i].match(/^- (.+?): (https?:\S+)/); if (m) urls.push([m[1], m[2]]); } });
  const ORGURL = [["liberating structures", "liberatingstructures"], ["luma", "luma-institute"], ["gamestorming", "gamestorming.com"], ["strategyzer", "strategyzer.com/library/the-business"], ["character", "character.vc/labs"], ["design council", "double-diamond"], ["ideo", "designkit"], ["d.school", "dschool"], ["sessionlab", "sessionlab.com/library"], ["service design tools", "servicedesigntools"], ["hyper island", "hyperisland"], ["gov.uk", "gov.uk/service-manual/user-research"], ["atlassian", "atlassian"]];
  const findUrl = (title, owner) => { const nt = norm(title); const hit = urls.find(([n]) => { const nn = norm(n.replace(/^(Character|Strategyzer|Stanford|Design Council|IDEO\.org|UK Government Office for Science|Atlassian|GOV\.UK|Hyper Island)\s+/i, '')); return nn.length > 4 && (nn === nt || nt.includes(nn) || nn.includes(nt)); });
    if (hit) return hit[1]; const ow = (owner || '').toLowerCase(); const o = ORGURL.find(([k]) => ow.includes(k)); if (o) { const u = urls.find(([, uu]) => uu.includes(o[1])); if (u) return u[1]; } return null; };
  const SEC = { 1: [["strategy"], ["decide", "plan"], "Strategy"], 2: [["strategy"], ["decide"], "Strategy"], 3: [["organization"], ["align"], "Facilitation"], 4: [["organization", "culture"], ["start"], "Facilitation"], 5: [["strategy"], ["prioritise", "decide"], "Strategy"], 6: [["research", "customer"], ["understand", "test"], "User Research"], 7: [["research", "experience"], ["understand"], "User Research"], 8: [["innovation", "product"], ["create"], "Innovation"], 9: [["strategy", "business"], ["plan", "explore"], "Strategy"], 10: [["product"], ["decide", "create"], "Product"], 11: [["brand"], ["create"], "Brand"], 12: [["gtm"], ["test", "plan"], "Strategy"], 13: [["organization", "culture"], ["reflect", "align"], "Organization"], 14: [["futures"], ["anticipate", "explore"], "Futures"], 15: [["strategy"], ["explore", "learn"], "Facilitation"], 16: [["strategy"], ["learn"], "Innovation"], 17: [["strategy"], ["learn"], "Facilitation"], 18: [["organization"], ["learn"], "Facilitation"], 19: [["ai"], ["plan"], "AI"], 20: [["strategy"], ["plan"], "Strategy"],
    57: [["strategy", "business"], ["understand", "decide"], "Consulting"], 58: [["strategy", "business"], ["plan", "prioritise"], "Strategy"], 59: [["organization"], ["plan", "align"], "Organization"], 60: [["business", "service"], ["understand", "plan"], "Operations"], 61: [["experience", "research"], ["test", "understand"], "UX"], 62: [["experience", "product"], ["create", "test"], "UX"], 63: [["experience", "research"], ["test"], "UX"], 64: [["service", "experience"], ["understand", "create"], "Service Design"], 65: [["organization"], ["align"], "Facilitation"], 66: [["organization"], ["align"], "Facilitation"], 67: [["organization", "culture"], ["start"], "Facilitation"], 68: [["strategy"], ["align", "decide"], "Facilitation"], 69: [["strategy", "business"], ["plan"], "Consulting"], 70: [["strategy"], ["plan"], "Strategy"] };
  const SYS = /system|causal|loop|iceberg|ecocycle/i;
  const typeOf = (ty, sec) => { const x = ty.toLowerCase();
    if ((sec >= 17 && sec <= 20) || sec === 69) return "resource"; if (sec === 70 || /playbook/.test(x)) return "playbook";
    if (/sprint/.test(x)) return "sprint"; if (/serious game|game|simulation|wargam/.test(x)) return "game";
    if (/icebreaker|check-in|warm-up|spatial activity|opening/.test(x) && sec !== 66) return "icebreaker"; if (/energiser|energizer|^reset/.test(x)) return "energiser";
    if (/reflection|retrospective/.test(x)) return "reflection"; if (/methodolog/.test(x) && !/principle/.test(x)) return "methodology";
    if (/workshop|offsite|format$/.test(x) && !/asset|activity|exercise/.test(x)) return "workshop"; if (/toolkit|resource|library|template|asset|book|course|^pdf|doc|deliverable/.test(x)) return "resource";
    if (/framework|model|canvas|matrix|theory|principle|artifact|tool|map|analysis|diagnostic|portfolio/.test(x)) return "framework"; return "activity"; };
  const stageOf = ty => { const x = ty.toLowerCase(); return /open|check-in|warm/.test(x) ? "open" : /explor/.test(x) ? "explore" : /sense|synthes/.test(x) ? "makesense" : /creat|ideat/.test(x) ? "create" : /decid|decision|priorit|converg/.test(x) ? "decide" : /commit|plann|action/.test(x) ? "commit" : /clos/.test(x) ? "close" : /reflect|retro|debrief/.test(x) ? "reflect" : /energi/.test(x) ? "energise" : null; };
  const fmtOf = (ty, sec, title) => { const x = (ty + ' ' + title).toLowerCase(); if (sec === 19) return "Prompt"; if (/book/.test(x) && sec === 18) return "Book"; if (/course|certif|training|programme|program/.test(x)) return "Course"; if (/toolkit/.test(x)) return "Toolkit"; if (/library|repositor|hub/.test(x)) return "Source library"; if (/pdf|doc|worksheet|template|canvas|card$|sheet|brief|report|log|pre-read|deck|deliverable/.test(x)) return "Template"; if (/board|miro|figjam/.test(x)) return "Board"; return sec === 18 ? "Reference" : null; };
  const visOf = (v, ty, title, sec) => { const x = (ty + ' ' + title).toLowerCase();
    if (sec === 19) return "prompt_text"; if (v && v !== "plain_type") return v;
    const R = [[/iceberg/, "iceberg_layers"], [/issue tree|logic tree|hypothesis tree|driver tree|mece|pyramid|decomposition/, "sticky_tree"], [/value chain|value stream|sipoc|process map|swimlane|flow|journey|walkthrough|task analysis/, "sticky_sequence"], [/blueprint|operating model|layers|tom\b/, "sticky_layers"], [/survey|questionnaire|van westendorp|sus\b|scale/, "survey_scale"], [/persona|profile|icp|archetype|empathy/, "profile_card"], [/raci|daci|rapid|responsib|role|decision rights|ownership|org design|span/, "role_grid"], [/behaviou?r over time|graph|metric|north star|okr|kpi|measure|analytics|tree testing/, "time_graph"],
      [/rice|scor|kano|pricing|price|willingness|benchmark|maturity|capabilit|diagnostic|sizing|economics|ltv|cac|pool|share/, "score_bars"], [/fake door|smoke test|concierge|a\/b|experiment|wizard/, "split_test"], [/interview|conversation|dialogue|café|cafe|fishbowl|troika|paired|networking|coaching|feedback|circle|hosting/, "dialogue_pairs"],
      [/observ|inquiry|fly-on|immersion|guided tour|ethnograph|shadow|safari|walk-a-mile|desk research|analogous|audit|inventory|evaluation|heuristic|accessib/, "observe_frame"], [/check-in|check-out|weather|energi|stretch|reset|walk and talk|movement|timebox|warm-up/, "pulse_line"], [/card sort|taxonomy|sitemap|navigation|content inventory/, "index_shelf"],
      [/segment|cluster|affinity|synthes|theme/, "sticky_cluster"], [/vote|decide|decision|priorit/, "sticky_vote"], [/matrix|2x2|portfolio|quadrant/, "sticky_matrix"], [/stakeholder|ecosystem|system map|actor/, "sticky_map"], [/game|simulation|tabletop/, "tokens_board"], [/prototype|sketch|storyboard/, "paper_sketches"],
      [/book/, "book_spines"], [/course|certif|competenc|learning path|training|programme|program|academy/, "learning_path"], [/library|toolkit|repositor|hub|collection|kit|toolbox/, "index_shelf"], [/pdf|doc|template|worksheet|report|brief|pre-read|run sheet|log|deck|memo|business case|recap/, "doc_page"]];
    const m = R.find(([re]) => re.test(x)); return m ? m[1] : "plain_type"; };

  const out = [], byKey = new Map(), upd = {};
  const addNew = rec => { const k = base(rec.title); if (byKey.has(k)) return byKey.get(k); let id = slug(rec.title); while (exIds.has(id) || out.some(o => o.id === id)) id += "-x"; rec.id = id; out.push(rec); byKey.set(k, rec); return rec; };
  const target = title => { const ex = exTitles.get(norm(title)) || exTitles.get(base(title)) || (exIds.has(slug(title)) ? slug(title) : null); if (ex) return { ex }; const n = byKey.get(base(title)); return n ? { n } : null; };
  const patch = (title, p) => { const t = target(title); if (!t) return false; if (t.ex) upd[t.ex] = Object.assign(upd[t.ex] || {}, p, { practices: [...new Set(((upd[t.ex] || {}).practices || []).concat(p.practices || []))] }); else { Object.entries(p).forEach(([k, v]) => { if (k === "practices") t.n.practices = [...new Set(t.n.practices.concat(v))]; else if (k === "blueprint") t.n.blueprint = (t.n.blueprint || []).concat(v); else if (t.n[k] == null || (Array.isArray(t.n[k]) && !t.n[k].length)) t.n[k] = v; }); } return true; };
  const mk = (title, f) => { const owner = f.creator || "Common practice"; const origin = f.origin || (/raw draft/i.test(owner) ? "rawdraft" : "external"); return Object.assign({ title, type: "activity", short: "", creator: owner, origin, status: origin === "external" ? "reference" : "draft", priority: null, publicTreatment: null, visualReference: visOf(null, f.subtype || "", title, 0), areas: [], goals: [], practices: [], stage: null, format: null, sourceUrl: origin === "rawdraft" ? null : findUrl(title, owner), subtype: f.subtype || "", section: f.section }, f); };

  // A. Inventory tables
  let sec = 0;
  for (let i = 145; i < L.length; i++) { const ln = L[i]; const h = ln.match(/^# (\d+)\./); if (h) { sec = +h[1]; continue; }
    if (!SEC[sec] || !ln.startsWith('| ') || ln.startsWith('| Resource') || ln.startsWith('|---')) continue;
    const c = ln.split('|').slice(1, -1).map(s => s.trim()); if (c.length < 7) continue;
    const [title0, ty, use, owner, treat, vis, pri] = c; const title = clean(title0); const [areas, goals, practice] = SEC[sec];
    const vref = visOf(vis, ty, title, sec);
    if (patch(title, { priority: pri, publicTreatment: treat, vis: vref, visualReference: vref, practices: [practice] })) continue;
    const T = typeOf(ty, sec), ow = owner.toLowerCase(), tr = treat.toUpperCase();
    const rd = /raw draft/.test(ow) && !/liberating|character|lean|common|jtbd/.test(ow);
    const origin = rd ? "rawdraft" : (/RAW DRAFT GUIDE/.test(tr) ? "adapted" : "external");
    const practices = [practice]; if (SYS.test(title + ty)) practices.push("Systems");
    addNew({ type: T, title, short: clean(use.replace(/ → /g, ", ").replace(/×/g, "x")) + ".", creator: owner, origin, status: /OBSERVED/.test(tr) ? "observed" : origin === "external" ? "reference" : "draft", priority: pri, publicTreatment: treat, visualReference: vref, areas, goals, practices, stage: stageOf(ty), format: fmtOf(ty, sec, title), sourceUrl: origin === "rawdraft" ? null : findUrl(title, owner), subtype: ty, section: sec });
  }

  // B. Detailed records (78 to 122, plus per-method blocks in 115 and 127)
  const FIELD = [[/^(purpose|what it is|core purpose)$/i, "purpose"], [/^(use when|good for|useful applications|use with)$/i, "useWhen"], [/^(avoid when|what it is not|do not conclude|important rule)$/i, "avoidWhen"], [/^(inputs|prepare|preparation|study setup)$/i, "inputs"],
    [/^(core mechanics|sequence|run|build sequence|session structure|for each step ask|checks|steps|how to run)$/i, "steps"], [/^(outputs?|required output)$/i, "outputs"], [/^(failure modes?|common mistakes|common breakout failures|watch for)$/i, "failures"], [/^raw draft (caution|rule|adaptation|addition)$/i, "notes"]];
  const SKIPH = /\bassets?\b|^(identity|asset opportunities|raw draft (treatment|asset|page should add)|current official|origin|external source|source connection)/i;
  const PR = n => n >= 77 && n <= 85 ? "Consulting" : n >= 86 && n <= 97 ? "UX" : n >= 98 && n <= 106 ? "Service Design" : n >= 120 && n <= 122 ? "User Research" : n === 123 || n === 125 ? "Facilitation" : n === 126 || n === 127 ? "Organization" : "Facilitation";
  const parseBlocks = (a, b, lvl) => { const blocks = []; let cur = null, sub = "";
    for (let i = a; i < b; i++) { const ln = L[i]; if (/^```/.test(ln)) { i++; while (i < b && !/^```/.test(L[i])) i++; continue; }
      const hh = ln.match(lvl === 2 ? /^## (.+)/ : /^### (.+)/); if (hh) { cur = { h: clean(hh[1]), items: [], text: [] }; blocks.push(cur); sub = ""; continue; }
      const h3 = ln.match(/^#{3,4} (.+)/); if (h3 && cur) { sub = clean(h3[1]); continue; }
      if (!cur || !ln.trim() || /^---/.test(ln) || /^\|/.test(ln)) continue;
      const li = ln.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/); if (li) cur.items.push((sub ? sub + ": " : "") + clean(li[1])); else cur.text.push(clean(ln)); }
    return blocks.filter(x => x.items.length || x.text.length); };
  const toFields = (blocks, type) => { const f = { blueprint: [] }; blocks.forEach(bk => { if (SKIPH.test(bk.h)) return; const m = FIELD.find(([re]) => re.test(bk.h)); const key = m && m[1];
      const val = bk.items.length ? bk.items : [bk.text.join(" ")];
      if (key === "purpose") f.purpose = bk.text.join(" ") || bk.items.join("; ");
      else if (key === "steps" && type === "sprint") f.blueprint.push({ h: bk.h, items: val });
      else if (key) f[key] = (f[key] || []).concat(val);
      else f.blueprint.push(bk.items.length ? { h: bk.h, items: bk.items } : { h: bk.h, text: bk.text.join(" ") }); });
    if (!f.blueprint.length) delete f.blueprint; return f; };
  const detTypeFromYaml = (a, b) => { for (let i = a; i < b; i++) { const m = L[i].match(/^resource_type:\s*(\w+)/); if (m) return m[1]; } return null; };
  const YT = { framework: "framework", model: "framework", diagnostic: "framework", activity: "activity", exercise: "activity", research_method: "activity", ux_method: "activity", facilitation_method: "activity", decision_method: "activity", workshop: "workshop", sprint: "sprint", icebreaker: "icebreaker", energiser: "energiser", reflection: "reflection", serious_game: "game", methodology: "methodology", resource: "resource" };
  const detCount = { patched: 0, created: 0 };
  for (let n = 77; n <= 131; n++) { const a = secIdx(n); if (a < 0) continue; const b = (() => { for (let i = a + 1; i < L.length; i++) if (/^# \d+\./.test(L[i])) return i; return L.length; })();
    const head = L[a]; const m = head.match(/record:\s*(.+)$/);
    if (m) { const title = clean(m[1]); const t0 = target(title); const yt = YT[detTypeFromYaml(a, b)] || (/consult/i.test(head) ? "framework" : "activity");
      const type = t0 && t0.n ? t0.n.type : yt; const f = toFields(parseBlocks(a + 1, b, 2), type); f.practices = [PR(n)];
      if (f.purpose && t0 && t0.n && !t0.n.short) t0.n.short = f.purpose;
      if (patch(title, f)) detCount.patched++; else { addNew(mk(title, Object.assign({ type, short: f.purpose || "", subtype: head.replace(/^# \d+\. /, ""), section: n, origin: "external", publicTreatment: "RAW DRAFT guide with sources" }, f))); detCount.created++; }
      continue; }
    if (n === 115 || n === 127) { const lv = parseBlocks(a + 1, b, 2); let cur = null; const groups = [];
      for (let i = a + 1; i < b; i++) { const hh = L[i].match(/^## (.+)/); if (hh) { cur = { title: clean(hh[1]), s: i + 1, e: b }; if (groups.length) groups[groups.length - 1].e = i; groups.push(cur); } }
      groups.forEach(g => { const f = toFields(parseBlocks(g.s, g.e, 3).concat(parseBlocks(g.s, g.e, 2)), n === 115 ? "methodology" : "framework"); f.practices = [PR(n)];
        if (!patch(g.title, f)) { addNew(mk(g.title, Object.assign({ type: n === 115 ? "methodology" : "framework", short: f.purpose || (n === 115 ? "A conversation methodology." : "A group-dynamics framework."), subtype: n === 115 ? "Conversation methodology" : "Group-dynamics framework", section: n, origin: "external", publicTreatment: "SUMMARY + SOURCE" }, f))); detCount.created++; } else detCount.patched++; }); }
  }

  // C. Icebreaker operational catalogue (117)
  const s117 = secIdx(117); let ice = 0;
  if (s117 >= 0) for (let i = s117 + 1; i < L.length && !/^# \d+\./.test(L[i]); i++) { const ln = L[i]; if (!ln.startsWith('| ') || /^\| Activity/.test(ln) || ln.startsWith('|---')) continue;
    const c = ln.split('|').slice(1, -1).map(s => s.trim()); if (c.length < 8) continue; const [t0, time, group, energy, vul, remote, mats, purpose] = c; const title = clean(t0);
    const f = { duration: time.replace(/–/g, " to "), groupSize: group.replace(/–/g, " to "), energy: energy.charAt(0).toUpperCase() + energy.slice(1), vulnerability: vul.replace(/–/g, " to "), remote: /yes/i.test(remote) ? "Yes" : /no/i.test(remote) ? "No" : remote, materials: /^none$/i.test(mats) ? [] : mats.split(/,\s*|\/\s*/).map(clean).filter(Boolean), practices: ["Facilitation"] };
    if (!patch(title, f)) { addNew(mk(title, Object.assign({ type: /energi|stretch|reset|movement/i.test(title + purpose) && /high/i.test(energy) ? "energiser" : "icebreaker", short: clean(purpose).charAt(0).toUpperCase() + clean(purpose).slice(1) + ".", subtype: "Icebreaker", section: 117, stage: "open", publicTreatment: "RAW DRAFT guide" }, f))); }
    ice++; }

  // D. Bullet catalogues to index for search
  const CAT = { 108: ["resource", "Hyper Island reference", "Facilitation", "Hyper Island"], 118: ["activity", "Workshop exercise", "Facilitation", null], 119: ["activity", "Facilitation intervention", "Facilitation", null], 120: ["activity", "Research operations", "User Research", null], 124: ["activity", "Interactive training technique", "Facilitation", "Thiagi Group"], 125: ["game", "Serious game candidate", "Facilitation", null], 126: ["resource", "Team-practice source", "Organization", null], 128: ["framework", "Consulting analysis", "Consulting", null], 129: ["activity", "UX method", "UX", null], 130: ["activity", "Service design method", "Service Design", null], 131: ["activity", "Facilitation method", "Facilitation", null] };
  const STG = { OPEN: "open", EXPLORE: "explore", "MAKE SENSE": "makesense", CREATE: "create", DECIDE: "decide", COMMIT: "commit", CLOSE: "close", REFLECT: "reflect" };
  let indexed = 0;
  Object.entries(CAT).forEach(([n, [type, sub, practice, creator]]) => { const a = secIdx(n); if (a < 0) return; let grp = "";
    for (let i = a + 1; i < L.length && !/^# \d+\./.test(L[i]); i++) { const ln = L[i]; const hh = ln.match(/^##+ (.+)/); if (hh) { grp = clean(hh[1]); continue; }
      const li = ln.match(/^- (.+)/); if (!li) continue; let txt = clean(li[1]); if (txt.length > 90 || /^(do not|use |add |include |each |every |this |the |a |an )/i.test(txt)) continue;
      const parts = txt.split(/:\s+|,\s+(?=[a-z])/); const title = parts[0].replace(/;$/, "").replace(/^./, ch => ch.toUpperCase()); const desc = parts.slice(1).join(", ");
      if (title.length < 3 || title.length > 60 || /\bpage$/i.test(title)) continue;
      if (n == 108 && grp) { const parent = byKey.get(base(grp)); if (parent) (parent.blueprint = parent.blueprint || [{ h: "Parts", items: [] }])[0].items.push(txt); continue; }
      const situation = n == 119 ? grp : null;
      const f = { practices: [practice] }; if (n == 118 && STG[grp.toUpperCase()]) f.stage = STG[grp.toUpperCase()];
      if (patch(title, f)) continue;
      if (n == 119) f.useWhen = [grp];
      const srcGrp = n == 126 ? grp : null;
      const short = srcGrp ? "Listed in the " + srcGrp + "." : desc ? desc.charAt(0).toUpperCase() + desc.slice(1) + "." : n == 119 ? "A facilitator move for: " + grp.toLowerCase() + "." : n == 118 ? "An exercise for the " + grp.toLowerCase() + " part of a session." : sub + (grp ? ", " + grp.toLowerCase() : "") + ".";
      addNew(mk(title, Object.assign({ type: n == 119 ? "activity" : type, short, subtype: sub + (grp ? " / " + grp : ""), section: +n, creator: srcGrp || creator || "Common practice", origin: "external", status: "draft", publicTreatment: "INDEX", indexOnly: true, situation, stage: f.stage || (n == 119 ? null : null) }, f)));
      indexed++; } });

  // E. Synonyms (45) and P0 blueprints (50)
  const syn = {}; const s45 = secIdx(45);
  if (s45 >= 0) for (let i = s45 + 1; i < L.length && !/^# \d+\./.test(L[i]); i++) { const ln = L[i]; if (!ln.startsWith('| ') || /^\| Canonical/.test(ln) || ln.startsWith('|---')) continue; const c = ln.split('|').slice(1, -1).map(s => s.trim()); if (c.length >= 2) syn[norm(c[0])] = c[1]; }
  const bp = {}; const s50 = secIdx(50), e50 = secIdx(51); const SKIP = /\bassets?\b|fill later|do not fabricate|asset opportunit|commentary|^type$|^origin$|^creator$|^source|rights|licen/i; let cur = null, h3 = null;
  if (s50 >= 0) for (let i = s50; i < e50; i++) { const ln = L[i]; const m2 = ln.match(/^## 50\.\d+ (.+)/); if (m2) { cur = bp[norm(m2[1])] = { title: m2[1], blocks: [] }; h3 = null; continue; }
    const m3 = ln.match(/^### (.+)/); if (m3 && cur) { h3 = SKIP.test(m3[1].trim()) ? null : { h: m3[1].trim(), items: [], text: [] }; if (h3) cur.blocks.push(h3); continue; }
    if (!h3 || !ln.trim() || ln.startsWith('---')) continue; const li = ln.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/); if (li) h3.items.push(clean(li[1])); else h3.text.push(clean(ln)); }
  Object.values(bp).forEach(b => b.blocks = b.blocks.filter(x => x.items.length || x.text.length).map(x => x.items.length ? { h: x.h, items: x.items } : { h: x.h, text: x.text.join(' ') }));

  // F. Method-selection comparisons (47)
  const cmp = []; const s47 = secIdx(47);
  if (s47 >= 0) { let c = null, side = null;
    for (let i = s47 + 1; i < L.length && !/^# \d+\./.test(L[i]); i++) { const ln = L[i]; const m = ln.match(/^## (?:When to use )?(.+?) vs\.? (.+)$/i);
      if (m) { c = { a: clean(m[1]), b: clean(m[2]), pa: [], pb: [] }; cmp.push(c); side = null; continue; }
      if (!c) continue; const sm = ln.match(/^([A-Z][^:]{2,60}):\s*$/); if (sm) { side = norm(sm[1]) === norm(c.a) ? "pa" : norm(sm[1]) === norm(c.b) ? "pb" : side; continue; }
      const li = ln.match(/^\s*- (.+)/); if (li && side) c[side].push(clean(li[1]).replace(/^./, ch => ch.toUpperCase())); } }
  const stats = { created: out.length, patchedExisting: Object.keys(upd).length, detail: detCount, icebreakerRows: ice, indexed, synonyms: Object.keys(syn).length, comparisons: cmp.length, blueprints: Object.keys(bp).length };
  const js = `// Raw Draft Library backlog import. GENERATED by tools/backlog-gen.js from the master backlog markdown. Do not hand-edit; re-run the generator.
// Records are summary + source only. Nothing beyond the backlog is invented. indexOnly records are search entries with a name and context, no guide yet.
(function () {
  if (!window.RD) return;
  const NEW = ${JSON.stringify(out)};
  const UPD = ${JSON.stringify(upd)};
  const SYN = ${JSON.stringify(syn)};
  const BP = ${JSON.stringify(bp)};
  const CMP = ${JSON.stringify(cmp)};
  const PRACTICE_BY_TYPE = { sprint: "Strategy", workshop: "Facilitation", playbook: "Strategy", framework: "Strategy", activity: "Facilitation", icebreaker: "Facilitation", energiser: "Facilitation", reflection: "Facilitation", game: "Facilitation", methodology: "Innovation", resource: "Facilitation" };
  const AREA_PRACTICE = { product: "Product", brand: "Brand", futures: "Futures", research: "User Research", experience: "UX", service: "Service Design", ai: "AI", organization: "Organization", innovation: "Innovation" };
  const NOTE = { rawdraft: "Raw Draft guide in preparation. Summary only for now.", adapted: "Raw Draft guide in preparation, adapted from the sources named below.", external: "Summarised only. Follow the original source for the method.", index: "Indexed so it can be found. A guide has not been written yet." };
  const FILL = ["purpose", "useWhen", "avoidWhen", "inputs", "steps", "outputs", "failures", "duration", "groupSize", "energy", "vulnerability", "remote", "materials", "stage"];
  const nm = s => String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
  const empty = v => v == null || v === "" || (Array.isArray(v) && !v.length);
  const items = window.RD.items.map(it => { const u = UPD[it.id]; const pr = [].concat(u ? (u.practices || []) : [], (it.areas || []).map(a => AREA_PRACTICE[a]).filter(Boolean)); if (!pr.length) pr.push(PRACTICE_BY_TYPE[it.type] || "Strategy");
    const o = Object.assign({}, it, { practices: [...new Set(pr)] }); if (!u) return o;
    if (u.priority) o.priority = u.priority; if (u.publicTreatment) o.publicTreatment = u.publicTreatment; if (!o.visualReference && u.visualReference && u.visualReference !== "plain_type") o.visualReference = u.visualReference;
    FILL.forEach(k => { if (!empty(u[k]) && empty(o[k]) && !(k === "steps" && o.type === "sprint")) o[k] = u[k]; });
    if (u.notes) o.notes = (o.notes || []).concat(u.notes); if (u.blueprint) o.blueprint = (o.blueprint || []).concat(u.blueprint); return o; });
  const have = new Map(); items.forEach((it, i) => { have.set(it.id, i); have.set(nm(it.title), i); have.set(nm(String(it.title).split(" (")[0]), i); });
  NEW.forEach(n => { const i = have.has(n.id) ? have.get(n.id) : have.has(nm(n.title)) ? have.get(nm(n.title)) : have.get(nm(n.title.split(" / ")[0].split(" (")[0]));
    if (i != null) { const it = items[i]; const o = Object.assign({}, it, { practices: [...new Set((it.practices || []).concat(n.practices))] }); FILL.forEach(k => { if (!empty(n[k]) && empty(o[k])) o[k] = n[k]; }); if (n.blueprint) o.blueprint = (o.blueprint || []).concat(n.blueprint); if (!o.visualReference && n.visualReference !== "plain_type") o.visualReference = n.visualReference; items[i] = o; return; }
    const rec = Object.assign({ org: null, rights: n.origin === "external" ? "Original material © its creators. Summarised, not reproduced." : null, attribution: n.origin === "rawdraft" ? "Raw Draft" : n.creator, outputs: [], related: [], uses: [], resources: [], before: [], after: [], alternative: [], stages: [], lastVerified: null, duration: null, participants: null, groupSize: null, horizon: null, summaryOnly: true, backlog: true }, n);
    rec.notes = [n.indexOnly ? NOTE.index : NOTE[n.origin]].concat(n.notes || []);
    have.set(rec.id, items.length); have.set(nm(rec.title), items.length); items.push(rec); });
  items.forEach(it => { const k = nm(it.title), k2 = nm(String(it.title).split(" (")[0].split(" / ")[0]); const s = SYN[k] || SYN[k2]; if (s) it.synonyms = s; const b = BP[k] || BP[k2]; if (b) it.blueprint = b.blocks.concat(it.blueprint || []); });
  window.RD = Object.assign({}, window.RD, { items, comparisons: CMP, practices: ["Consulting", "Strategy", "Product", "UX", "User Research", "Service Design", "Facilitation", "Innovation", "Brand", "Futures", "Systems", "Organization", "Operations", "AI"] });
})();
`;
  return { js, stats };
};
