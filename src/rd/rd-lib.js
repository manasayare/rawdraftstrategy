// COPIED by scripts/dc-to-jsx.mjs from project/rd-lib.js.
// Raw Draft: shared helpers: labels, relationship index, decoration, search.
window.RDL = (function () {
  const C = { bg: "#0b0b0a", ink: "#ece9e0", mute: "#8f8b80", rule: "#2a2925", acc: "#ff4b23", dim: "#5a5850" };
  const T_ = (l, pl, slug, fg) => ({ l, pl, slug, c: l.slice(0, 3).toUpperCase(), bg: "transparent", fg: fg || C.mute, bd: C.rule });
  const TYPE = {
    sprint: T_("Sprint", "Sprints", "sprints", C.ink), workshop: T_("Workshop", "Workshops", "workshops", C.ink), playbook: T_("Playbook", "Playbooks", "playbooks", C.acc),
    framework: T_("Framework", "Frameworks", "frameworks"), activity: T_("Activity", "Activities", "activities"), icebreaker: T_("Icebreaker", "Icebreakers", "icebreakers"),
    energiser: T_("Energiser", "Energisers", "energisers"), reflection: T_("Reflection", "Reflections", "reflections"), game: T_("Serious game", "Serious games", "games"),
    methodology: T_("Methodology", "Methodologies", "methodologies"), resource: T_("Resource", "Resources", "resources")
  };
  const SLUG = Object.fromEntries(Object.keys(TYPE).map(k => [TYPE[k].slug, k]));
  const TYPE_DEF = {
    sprint: "A structured sequence for resolving a substantial strategic question.",
    workshop: "A complete facilitated session with a defined outcome.",
    playbook: "A curated route through the library for a recognisable situation.",
    framework: "A model for structuring thinking.",
    activity: "A bounded exercise used inside a workshop.",
    icebreaker: "A short opening that helps a group connect and get ready to work.",
    energiser: "A short activity that restores energy or attention.",
    reflection: "An activity for processing and learning from what happened.",
    game: "A structured game or simulation used for learning, exploration or strategy.",
    methodology: "A larger system with its own principles and practices.",
    resource: "Books, templates, courses, articles and toolkits."
  };
  const STAGES = [["open", "Open"], ["explore", "Explore"], ["makesense", "Make sense"], ["create", "Create"], ["decide", "Decide"], ["commit", "Commit"], ["close", "Close"], ["energise", "Energise"], ["reflect", "Reflect"]];
  const TIMES = [["5", "5 min"], ["15", "15 min"], ["30", "30 min"], ["60", "60 min"], ["90", "90 min"], ["half", "Half day"], ["full", "Full day"], ["multi", "Multi-day"], ["variable", "Variable"]];
  const SIZES = [["solo", "Solo"], ["2-4", "2 to 4"], ["5-8", "5 to 8"], ["9-15", "9 to 15"], ["16-30", "16 to 30"], ["30+", "30+"], ["variable", "Variable"]];
  const LEVELS = [["first", "First-time friendly"], ["practiced", "Practiced"], ["advanced", "Advanced"]];
  const FORMATS = [["discussion", "Discussion"], ["writing", "Writing"], ["mapping", "Visual mapping"], ["prototyping", "Prototyping"], ["making", "Physical making"], ["roleplay", "Role play"], ["simulation", "Simulation"], ["game", "Serious game"], ["tabletop", "Tabletop"], ["cards", "Card-based"], ["lego", "LEGO / construction"], ["field", "Field research"], ["digital", "Digital collaboration"]];
  const ORIGIN = {
    rawdraft: { l: "Raw Draft", bg: C.acc, fg: C.acc, bd: C.acc, d: "Created by Raw Draft." },
    adapted: { l: "Adapted", bg: "transparent", fg: C.acc, bd: C.acc, d: "Raw Draft adaptation of an existing method." },
    external: { l: "External", bg: "transparent", fg: C.mute, bd: C.dim, d: "Created by another practitioner or organisation." }
  };
  const STATUS = {
    tested: { l: "Tested", d: "Raw Draft has used or substantially validated it." },
    adapted: { l: "Adapted", d: "Raw Draft's variation of an established method." },
    reference: { l: "Reference", d: "Well-documented external method." },
    observed: { l: "Observed", d: "Known external approach; the complete method is unavailable." },
    draft: { l: "Draft", d: "Still being developed." }
  };
  const GOALS = [["start", "Start"], ["understand", "Understand"], ["explore", "Explore"], ["create", "Create"], ["align", "Align"], ["prioritise", "Prioritise"], ["decide", "Decide"], ["test", "Test"], ["plan", "Plan"], ["anticipate", "Anticipate"], ["reflect", "Reflect"], ["learn", "Learn"]];
  const AREAS = [["strategy", "Strategy"], ["product", "Product"], ["brand", "Brand"], ["customer", "Customer"], ["experience", "Experience"], ["research", "Research"], ["innovation", "Innovation"], ["futures", "Futures"], ["culture", "Culture"], ["ai", "AI"], ["technology", "Technology"], ["service", "Service"], ["business", "Business"], ["gtm", "GTM"], ["organization", "Organization"], ["policy", "Policy"]];
  const AREA_L = Object.fromEntries(AREAS), GOAL_L = Object.fromEntries(GOALS), STAGE_L = Object.fromEntries(STAGES), TIME_L = Object.fromEntries(TIMES), SIZE_L = Object.fromEntries(SIZES), LEVEL_L = Object.fromEntries(LEVELS), FORMAT_L = Object.fromEntries(FORMATS);

  let ix = null, src = null;
  function index() {
    const D = window.RD; if (!D) return null;
    if (ix && src === D) return ix;
    const by = {}, n = {}, byMethodology = {}, usedIn = {}, inPlaybook = {}, inWork = {}, inNotes = {}, supportedBy = {}, srcBy = {};
    D.sources.forEach(s => srcBy[s.id] = s);
    D.items.forEach(it => { n[it.type] = (n[it.type] || 0) + 1; it._n = n[it.type]; by[it.id] = it; });
    const push = (m, k, v) => { (m[k] = m[k] || []); if (!m[k].includes(v)) m[k].push(v); };
    D.items.forEach(it => {
      (it.uses || []).forEach(u => push(usedIn, u, it.id));
      (it.agenda || []).forEach(a => a.ref && push(usedIn, a.ref, it.id));
      if (it.methodology) push(byMethodology, it.methodology, it.id);
      (it.steps || []).forEach(s => s && s.methods && s.methods.forEach(u => push(usedIn, u, it.id)));
      (it.sequence || []).forEach(s => s[1] && push(inPlaybook, s[1], it.id));
      (it.sprints || []).forEach(s => push(inPlaybook, s, it.id));
      if (it.type === "resource") (it.related || []).forEach(r => push(supportedBy, r, it.id));
      (it.resources || []).forEach(r => push(supportedBy, it.id, r));
    });
    const workBy = {}, noteBy = {}, workNotes = {}, noteWork = {};
    D.work.forEach(w => { workBy[w.id] = w; [].concat(w.relatedSprints, w.relatedMethods, w.relatedFrameworks, w.relatedPlaybooks).forEach(m => m && push(inWork, m, w.id)); (w.relatedNotes || []).forEach(nid => { push(workNotes, w.id, nid); push(noteWork, nid, w.id); }); });
    D.notes.forEach(nt => { noteBy[nt.id] = nt; [].concat(nt.relatedSprints, nt.relatedFrameworks, nt.relatedMethods).forEach(m => m && push(inNotes, m, nt.id)); (nt.relatedWork || []).forEach(wid => { push(noteWork, nt.id, wid); push(workNotes, wid, nt.id); }); });
    ix = { by, byMethodology, usedIn, inPlaybook, inWork, inCases: inWork, inNotes, supportedBy, srcBy, n, workBy, noteBy, workNotes, noteWork }; src = D;
    return ix;
  }
  const get = id => { const x = index(); return x && x.by[id]; };
  function deco(it) {
    if (!it) return null;
    const T = TYPE[it.type], O = ORIGIN[it.origin] || ORIGIN.external, S = STATUS[it.status] || STATUS.draft;
    const x = index(); const so = x && it.org ? x.srcBy[it.org] : null;
    return Object.assign({}, it, {
      href: "#/library/" + T.slug + "/" + it.id, typeLabel: it.type === "resource" ? (it.format || "Resource") : it.gameKind || T.l, kind: T.l,
      tBg: T.bg, tFg: T.fg, tBd: T.bd, code: T.c + "-" + String(it._n || 0).padStart(3, "0"),
      oLabel: O.l, oBg: O.bg, oFg: O.fg, oBd: O.bd, oDesc: O.d, sLabel: S.l, sDesc: S.d,
      isDraft: it.status === "draft", isObserved: it.status === "observed",
      durationLabel: it.duration || "Not specified", sizeLabel: it.groupSize || it.participants || "Not specified",
      outputsStr: (it.outputs || []).slice(0, 3).join(", "),
      creatorLabel: it.creator || (so ? so.name : "Not recorded"), orgLabel: so ? so.name : "",
      areasStr: (it.areas || []).map(a => AREA_L[a] || a).join(", "), goalsStr: (it.goals || []).map(g => GOAL_L[g] || g).join(", "),
      shortDesc: it.short || "", visual: it.visualReference || (it.type === "resource" ? (/pdf|toolkit|worksheet|template|canvas/i.test(it.format || "") ? "doc_page" : /miro|figjam|board/i.test(it.format || "") ? "sticky_scatter" : /prompt/i.test(it.format || "") ? "prompt_text" : /card|deck/i.test(it.format || "") ? "cards_deck" : "plain_type") : "plain_type"), visualVariant: it.visualVariant || "", vseed: it.id, shape: window.RDAscii ? RDAscii.shapeFor(it.id) : "sphere", seed: window.RDAscii ? RDAscii.seedFor(it.id) : 1,
      timeLabel: it.timeKey ? (it.timeKey === "variable" || it.timeKey === "multi" ? (it.duration || TIME_L[it.timeKey]) : TIME_L[it.timeKey]) : (it.duration || ""),
      peopleLabel: (it.sizes || []).length ? ((it.sizes.length > 1 && !it.sizes.includes("variable")) ? (SIZE_L[it.sizes[0]].split(" ")[0] + " to " + SIZE_L[it.sizes[it.sizes.length - 1]].split(" ").pop()) : SIZE_L[it.sizes[0]]) : (it.groupSize || ""),
      levelLabel: it.type === "resource" ? "" : (LEVEL_L[it.level] || ""), stageLabel: STAGE_L[it.stage] || "", deliveryLabel: it.type === "resource" ? "" : (it.delivery || ""),
      formatsStr: (it.formats || []).map(f => FORMAT_L[f]).join(", ")
    });
  }
  const refs = ids => (ids || []).map(get).filter(Boolean).map(deco);

  const STOP = new Set("a an the and or of to for in on at my our we i is it me how do what should can with run running help hour hours minute minutes min day days people person team after before about into this that from".split(" "));
  const SYN = { mvp: ["mvp", "boundary", "product strategy"], ai: ["ai", "agent"], future: ["futur", "foresight", "scenario"], futures: ["futur", "foresight", "scenario"], uncertain: ["uncertain", "scenario", "foresight"], align: ["align", "agree", "leadership", "decision"], leadership: ["leadership", "align", "decision"], customers: ["customer", "journey", "interview", "jobs"], understand: ["understand", "research", "customer"], first: ["facilitat", "decision workshop", "session"], workshop: ["workshop", "session"], icebreaker: ["icebreaker", "check-in", "open"], icebreakers: ["icebreaker"], energiser: ["energiser"], game: ["game", "simulation", "tabletop"], games: ["game", "simulation"], simulation: ["simulation", "game"], tabletop: ["tabletop", "game"], lego: ["lego"], wargame: ["simulation", "game"], retro: ["reflect", "retrospective"], retrospective: ["reflect"], positioning: ["position"], position: ["position"], brand: ["brand"], define: ["define", "foundation"], plan: ["plan", "scenario", "backcast"] };
  const tokens = q => (q || "").toLowerCase().replace(/[^a-z0-9\s/-]/g, " ").split(/\s+/).filter(t => t && !STOP.has(t) && !/^\d+$/.test(t));
  const has = (s, v) => v.length <= 3 ? new RegExp("(^|[^a-z])" + v + "([^a-z]|$)").test(s) : s.includes(v);
  const VIEWS = {
    need: [["Frame a problem", { re: /framing|problem statement|problem tree|issue tree|hypothesis tree|how might|5 whys|root cause|abstraction ladder|research question/ }], ["Run research", { practice: ["User Research"], re: /interview|inquiry|observ|survey|diary|research method/ }], ["Make sense of evidence", { stage: "makesense", re: /synthes|affinity|cluster|insight|sense-?making/ }], ["Generate ideas", { stage: "create", re: /ideat|brainstorm|crazy 8|brainwrit|scamper|idea generation/ }],
      ["Make a decision", { stage: "decide", re: /decision|decide|vote|voting/ }], ["Prioritize", { goal: "prioritise", re: /priorit|ranking|scoring/ }], ["Run a workshop", { type: ["workshop", "playbook"] }], ["Open a session", { type: ["icebreaker"], stage: "open" }], ["Energise a room", { type: ["energiser"], stage: "energise" }],
      ["Align a leadership team", { re: /leadership|offsite|executive|working agreement|alignment/ }], ["Design a service", { practice: ["Service Design"] }], ["Evaluate a UX", { all: true, practice: ["UX"], re: /evaluat|usability|heuristic|walkthrough|audit|accessib|testing|benchmark/ }], ["Fix navigation / IA", { re: /navigation|card sort|tree test|information architecture|taxonomy|sitemap|labell?ing/ }],
      ["Build a prototype", { re: /prototyp|storyboard|wizard of oz|mock-?up|paper prototype/ }], ["Test a concept", { re: /concept test|prototype test|fake door|smoke test|concierge|experiment|a\/b/ }], ["Plan strategy", { all: true, practice: ["Strategy", "Consulting"], goal: "plan" }], ["Design an operating model", { re: /operating model|org design|raci|daci|governance|capabilit|decision rights/ }],
      ["Plan change", { re: /change|transformation|adoption|roadmap/ }], ["Explore the future", { practice: ["Futures"] }], ["Run a simulation", { type: ["game"] }], ["Prepare a recommendation", { re: /recommend|business case|pyramid|storyline|executive summary|memo|readout/ }],
      ["Create a board / worksheet", { all: true, type: ["resource"], re: /template|board|worksheet|canvas|checklist/ }], ["Learn a methodology", { type: ["methodology"], re: /course|certif|learning path/ }]],
    output: [["Decision", /decision|decide/], ["Recommendation", /recommend/], ["Research evidence", /evidence|finding|research/], ["Insight", /insight/], ["Map", /\bmap/], ["Prioritized list", /priorit|ranked|shortlist/], ["Strategy", /strateg/], ["Prototype", /prototyp/], ["Journey", /journey/], ["Blueprint", /blueprint/], ["Scenario", /scenario/], ["Roadmap", /roadmap/], ["Operating model", /operating model/], ["Business case", /business case/], ["Workshop plan", /agenda|workshop plan|session plan|run sheet/], ["Team agreement", /agreement|charter/], ["Action plan", /action|owner|next step/], ["Learning", /learning|lesson|reflection/]],
    mode: [["Silent writing", /silent|brainwrit|note and vote|writ/], ["Discussion", /discuss|conversation|dialogue|caf|circle|fishbowl/], ["Interviewing", /interview/], ["Observation", /observ|shadow|safari|inquiry|ethnograph/], ["Voting", /vot|dot /], ["Mapping", /map/], ["Sketching", /sketch|crazy 8|storyboard|draw/], ["Physical making", /lego|making|physical|bodystorm|build with/], ["Role play", /role.?play/], ["Tabletop", /tabletop|board game/], ["Simulation", /simulat|war ?game/], ["Analysis", /analys|sizing|benchmark|economics|driver tree/], ["Presentation", /present|pitch|readout|share-?out/], ["Reflection", /reflect|retro|debrief|check-out/]]
  };
  const hay = it => it._hay || (it._hay = [it.title, it.short, it.subtype, it.synonyms, (it.outputs || []).join(" "), it.purpose, it.format].join(" ").toLowerCase());
  function inView(kind, label, it) {
    const row = (VIEWS[kind] || []).find(r => r[0] === label); if (!row) return true; const c = row[1], h = hay(it);
    if (c instanceof RegExp) return c.test(h);
    const tests = []; if (c.re) tests.push(c.re.test(h)); if (c.type) tests.push(c.type.includes(it.type)); if (c.goal) tests.push((it.goals || []).includes(c.goal)); if (c.stage) tests.push(it.stage === c.stage); if (c.practice) tests.push(c.practice.some(p => (it.practices || []).includes(p)));
    return c.all ? tests.every(Boolean) : tests.some(Boolean);
  }
  function search(q, list) {
    const toks = tokens(q); if (!toks.length) return list.slice();
    return list.map(it => {
      const t = it.title.toLowerCase();
      const h = [it.short, it.question, it.purpose, (it.outputs || []).join(" "), (it.areas || []).join(" "), (it.goals || []).join(" "), it.type, TYPE[it.type] && TYPE[it.type].l, it.gameKind, it.format, it.creator, it.situation, it.stage, (it.formats || []).join(" "), it.methodology, it.synonyms, it.subtype, (it.practices || []).join(" ")].join(" ").toLowerCase();
      let s = 0;
      toks.forEach(tk => (SYN[tk] || [tk]).forEach(v => { if (has(t, v)) s += 6; else if (has(h, v)) s += 2; }));
      if (s && it.type === "playbook") s += 2; if (s && it.type === "sprint") s += 1; if (it.status === "observed") s -= 1;
      return { it, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.it);
  }
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmtDate = iso => { if (!iso) return ""; const [y, m, d] = iso.split("-"); return d + " " + MON[+m - 1] + " " + y; };
  const workD = w => w ? Object.assign({}, w, { shape: window.RDAscii ? RDAscii.shapeFor(w.id) : "rings", seed: window.RDAscii ? RDAscii.seedFor(w.id) : 1, href: "#/work/" + w.id, meta: [w.type, w.sector].filter(Boolean).join(" / "), isDemo: w.status === "demo" }) : null;
  const noteD = n => n ? Object.assign({}, n, { shape: window.RDAscii ? RDAscii.shapeFor(n.id) : "wave", seed: window.RDAscii ? RDAscii.seedFor(n.id) : 1, href: "#/notes/" + n.id, dateLabel: fmtDate(n.date), isDraft: n.status === "draft" }) : null;
  const works = ids => (ids || []).map(id => index().workBy[id]).filter(Boolean).map(workD);
  const notesOf = ids => (ids || []).map(id => index().noteBy[id]).filter(Boolean).map(noteD);
  function ready(cb) { if (window.RD) return cb(); const t = setInterval(() => { if (window.RD) { clearInterval(t); cb(); } }, 40); }
  const go = h => { RDNav.go(h); };
  return { VIEWS, inView, SLUG, STAGES, TIMES, SIZES, LEVELS, FORMATS, STAGE_L, TIME_L, SIZE_L, LEVEL_L, FORMAT_L, fmtDate, workD, noteD, works, notesOf, C, TYPE, TYPE_DEF, ORIGIN, STATUS, GOALS, AREAS, AREA_L, GOAL_L, index, get, deco, refs, search, tokens, ready, go };
})();
