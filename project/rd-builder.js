// Builder engine. Composes workshops and sprints from the Raw Draft Library (window.RD.items). No invented activities:
// every block resolves to a Library record when one exists; generic structural blocks (break, close) are labelled as such.
(function () {
  const nm = s => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
  const find = titles => { if (!window.RD) return null; for (const t of titles) { const k = nm(t); const it = RD.items.find(x => nm(x.title) === k || nm(String(x.title).split(" (")[0]) === k); if (it) return it; } return null; };
  // role: label, candidate Library titles (best first), default minutes, uses, produces, kind (div|conv|neutral), energy
  const ROLES = {
    custom: ["Custom", [], 20, [], [], "neutral", 1],
    open: ["Open", ["Hopes and concerns", "One-word check-in", "Check-in", "Hopes and Fears", "Working Agreements"], 15, [], ["ROOM"], "neutral", 1],
    frame: ["Frame", ["Welcome and framing", "How Might We", "Problem Statement", "5 Whys", "Abstraction Laddering"], 20, [], ["QUESTION"], "neutral", 1],
    evidence: ["Evidence", ["Evidence Review", "Evidence Map", "Desk Research", "Customer Interview", "Research Question Canvas"], 30, ["QUESTION"], ["EVIDENCE"], "neutral", 1],
    sense: ["Make sense", ["Affinity Mapping", "Rose, Thorn, Bud", "Insight Statement", "Empathy Map"], 35, ["EVIDENCE"], ["PATTERNS"], "conv", 2],
    landscape: ["Landscape", ["Competitive Alternatives Research", "Competitive Alternatives", "Stakeholder Mapping", "Customer Journey Map"], 35, ["QUESTION"], ["PATTERNS", "EVIDENCE"], "neutral", 2],
    options: ["Options", ["Crazy 8s", "Silent Ideation", "1-2-4-All", "Brainwriting 6-3-5", "Lightning Demos"], 40, ["QUESTION"], ["OPTIONS"], "div", 3],
    assumptions: ["Assumptions", ["Assumption Mapping", "Premortem", "Kill-Risk Mapping"], 35, [], ["ASSUMPTIONS"], "conv", 2],
    criteria: ["Criteria", ["Decision Criteria", "Decision Criteria Workshop", "Weighted Decision Matrix", "Decision Matrix"], 20, ["QUESTION"], ["CRITERIA"], "conv", 1],
    prioritise: ["Prioritise", ["Gallery Walk", "Impact / Effort Matrix", "Dot Voting", "Note and Vote", "MoSCoW"], 30, ["OPTIONS"], ["PRIORITIES"], "conv", 2],
    decide: ["Decide", ["Note and Vote", "Decision Matrix", "Magic Lenses", "Weighted Decision Matrix"], 30, ["OPTIONS"], ["DECISION"], "conv", 2],
    test: ["Next test", ["Experiment / Attempt Card", "Attempt Loop", "GTM Experiment Card", "Concept Test"], 25, ["DECISION|PRIORITIES"], ["TESTPLAN"], "conv", 1],
    commit: ["Commit", ["Next Actions", "Decision Log", "What, So What, Now What?", "Decision Recap"], 15, ["DECISION|PRIORITIES"], ["ACTIONS"], "conv", 1],
    breaks: ["Break", [], 10, [], [], "neutral", 0],
    energise: ["Energise", ["Walk and Talk", "Stretch / movement reset"], 10, [], [], "neutral", 0]
  };
  const SHAPES = {
    "Decision": ["open", "frame", "evidence", "options", "criteria", "decide", "commit"],
    "Direction": ["open", "frame", "evidence", "landscape", "options", "assumptions", "decide", "test", "commit"],
    "Strategy": ["open", "frame", "evidence", "landscape", "options", "criteria", "decide", "test", "commit"],
    "Ideas": ["open", "frame", "evidence", "options", "options", "prioritise", "commit"],
    "Prototype": ["frame", "evidence", "options", "decide", "test", "commit"],
    "Research evidence": ["frame", "evidence", "sense", "assumptions", "test", "commit"],
    "Plan": ["open", "frame", "options", "prioritise", "test", "commit"],
    "Alignment": ["open", "frame", "landscape", "sense", "options", "decide", "commit"],
    "Priorities": ["open", "frame", "options", "criteria", "prioritise", "commit"]
  };
  const MIN = { "90 min": 90, "Half day": 210, "1 day": 390, "2 days": 780, "3 to 5 days": 1560, "Multiple sessions": 480, "Not sure": 210 };
  const TOPICS = [[/position|competit|messag/, "Positioning", ["Positioning Sprint", "Positioning Workshop"]], [/\bai\b|agent|automat|llm/, "AI Product Strategy", ["AI Product Strategy Sprint", "AI Opportunity Workshop"]], [/brand/, "Brand Strategy", ["Brand Strategy Sprint"]], [/service|public|citizen/, "Service Design", ["Service Design Sprint"]], [/future|foresight|scenario|five years|5 years|next decade/, "Foresight", ["Foresight Sprint", "Future Scenarios Workshop"]], [/segment|customer|who is this|users? need/, "Research", ["Research Sprint"]], [/go.to.market|gtm|launch|pricing/, "GTM", ["GTM Sprint"]], [/leadership|align|offsite/, "Leadership Alignment", ["Strategy Offsite"]], [/decid|choose|option/, "Decision", ["Decision Sprint", "Decision Workshop"]], [/product|feature|mvp|build/, "Product Strategy", ["Product Strategy Sprint"]]];

  function extract(text) {
    const t = " " + String(text || "").toLowerCase() + " ", b = {};
    if (/half.{0,3}day|4 hours|four hours|3 hours|three hours|morning|afternoon/.test(t)) b.time = "Half day"; else if (/90 ?min|hour and a half|1\.5 hours|two hours|2 hours/.test(t)) b.time = "90 min"; else if (/two days|2 days|2-day/.test(t)) b.time = "2 days"; else if (/(one|1|full) day/.test(t)) b.time = "1 day"; else if (/week|5 days|three days|3 days/.test(t)) b.time = "3 to 5 days";
    const num = t.match(/\b(\d{1,3})\s+(?:[a-z]+\s+){0,3}?(people|participants|leaders|of us|person|members|founders)/); const words = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12, twenty: 20 };
    const wn = t.match(/\b(two|three|four|five|six|seven|eight|nine|ten|twelve|twenty)\s+(?:[a-z]+\s+){0,3}?(people|participants|leaders|founders|members|of us)/); const n = num ? +num[1] : wn ? words[wn[1]] : null;
    if (n) b.people = n <= 1 ? "1" : n <= 5 ? "2 to 5" : n <= 10 ? "6 to 10" : n <= 20 ? "11 to 20" : "20+";
    const who = [["Founders", /founder/], ["Leadership", /leadership|ceo|exec|c-suite|senior/], ["Product", /product/], ["Design", /design/], ["Engineering", /engineer|tech lead|cto/], ["Research", /research/], ["Sales", /sales/], ["Marketing", /marketing|brand team/], ["Operations", /operations|ops\b/], ["Customers", /customers? (will|join|in the room)/]].filter(([, re]) => re.test(t)).map(([k]) => k);
    if (who.length) b.who = who;
    if (/ceo|founder|i (can )?decide|decision owner|decider/.test(t)) b.owner = /only join|last hour|joins? (for )?the (last|final)/.test(t) ? "Joins final part" : "Yes";
    if (/remote|zoom|online|distributed/.test(t)) b.format = "Remote"; else if (/hybrid/.test(t)) b.format = "Hybrid"; else if (/in.person|offsite|room|on.?site/.test(t)) b.format = "In person";
    const ev = [["Customer research", /interview|customer research|user research/], ["Analytics", /analytics|data shows|metrics/], ["Market research", /market research|competitor/], ["Existing strategy", /existing strategy|current strategy/], ["Prototype", /prototype/]].filter(([, re]) => re.test(t)).map(([k]) => k); if (ev.length) b.evidence = ev; else if (/no (research|evidence|data)|nothing yet/.test(t)) b.evidence = ["Nothing yet"];
    if (/decid|choose|which|whether|should we/.test(t)) b.outcome = "Decision"; else if (/position|strategy|direction/.test(t)) b.outcome = "Direction"; else if (/idea|brainstorm/.test(t)) b.outcome = "Ideas"; else if (/prototype|test an idea/.test(t)) b.outcome = "Prototype"; else if (/understand|research|need it|learn/.test(t)) b.outcome = "Research evidence"; else if (/align|agree/.test(t)) b.outcome = "Alignment"; else if (/prioriti/.test(t)) b.outcome = "Priorities"; else if (/plan|roadmap/.test(t)) b.outcome = "Plan";
    const sents = String(text || "").trim().split(/(?<=[.?!])\s+/); const q = sents.find(x => /\?|\b(which|whether|should|decide|choose|figure out|how (do|should|can))\b/i.test(x)) || sents[0] || ""; b.question = q.length > 140 ? q.slice(0, 137) + "..." : q;
    return b;
  }
  async function extractAI(text) {
    const base = extract(text);
    try { if (!window.claude || !window.claude.complete) return base;
      const out = await window.claude.complete(`Extract a workshop brief from this text. Reply with JSON only, keys optional: question (one sentence), outcome (one of: Decision, Direction, Ideas, Prototype, Research evidence, Plan, Alignment, Priorities, Strategy), time (one of: 90 min, Half day, 1 day, 2 days, 3 to 5 days, Multiple sessions), people (one of: 1, 2 to 5, 6 to 10, 11 to 20, 20+), who (array from: Founders, Leadership, Product, Design, Engineering, Research, Sales, Marketing, Operations, Customers, External stakeholders), owner (Yes, No, Joins final part), format (In person, Remote, Hybrid), evidence (array from: Customer research, Analytics, Market research, Internal data, Existing strategy, Prototype, Nothing yet), notes (short string of constraints). Only include what the text states or clearly implies.\n\nText: ${text}`);
      const j = JSON.parse(String(out).replace(/^[^{]*/, "").replace(/[^}]*$/, "")); return Object.assign(base, j);
    } catch (e) { return base; }
  }
  let uid = 0; const id = () => "b" + Date.now().toString(36) + (uid++);
  function block(role, alt) { const R = ROLES[role]; const it = alt ? (RD.items.find(x => x.id === alt) || null) : find(R[1]); return { id: id(), role, label: R[0], ref: it ? it.id : null, title: it ? it.title : (role === "breaks" ? "Break" : R[0]), mins: R[2], locked: false }; }
  function recommend(b) {
    const t = (b.question || "") + " " + (b.context || "") + " " + (b.notes || ""), long = (MIN[b.time] || 210) >= 780; let topic = TOPICS.find(([re]) => re.test(t.toLowerCase())); if (b.outcome === "Decision" && (!topic || /Leadership|Product Strategy|Research/.test(topic[1]))) topic = TOPICS.find(x => x[1] === "Decision");
    const kind = long ? "Sprint" : "Workshop", name = (topic ? topic[1] : "Strategy") + " " + kind;
    const rec = topic ? (find(topic[2].filter(x => long ? /sprint/i.test(x) : /workshop/i.test(x))) || find(topic[2])) : null;
    const why = [b.evidence && b.evidence.length && !b.evidence.includes("Nothing yet") ? "You already have some evidence, so the time goes into choosing rather than broad discovery." : "There is little evidence yet, so the agenda makes room to gather and test it.", long ? "With " + b.time.toLowerCase() + " a sprint can include making and testing, not only discussion." : "In " + (b.time || "Half day").toLowerCase().replace("half day", "half a day").replace("90 min", "90 minutes") + " the aim is one clear output, not a full programme."].join(" ");
    return { kind, name, ref: rec ? rec.id : null, why };
  }
  const dayBlock = t => Object.assign(block("breaks"), { title: t || "End of day 1", mins: 0, day: true });
  function compose(b) {
    const T = MIN[b.time] || 210, two = T >= 780;
    let shape = (SHAPES[b.outcome] || SHAPES.Direction).slice();
    if (two) shape = shape.filter(r => r !== "test" && r !== "commit").concat(["day", "open", "assumptions", "test", "sense", "commit"]);
    let blocks = shape.map(r => r === "day" ? dayBlock() : block(r));
    if (b.format === "Remote") blocks = blocks.filter(x => x.role !== "energise");
    if (blocks[0] && blocks[1] && blocks[0].role === "open" && blocks[1].role === "frame") blocks.unshift(blocks.splice(1, 1)[0]);
    const cap = two ? 3 : 2.2, tot = two ? 780 : Math.min(T, 390);
    fit(blocks, tot, cap); addBreaks(blocks); fit(blocks, tot, cap);
    const ov = total(blocks) - tot; if (ov > 0) { const big = blocks.filter(x => x.role !== "breaks").sort((p, q) => q.mins - p.mins)[0]; if (big) big.mins = Math.max(10, big.mins - ov); }
    return blocks;
  }
  function addBreaks(blocks) { let run = 0; for (let i = 0; i < blocks.length; i++) { if (blocks[i].role === "breaks") { run = 0; continue; } run += blocks[i].mins; if (run >= 100 && i < blocks.length - 1 && blocks[i + 1].role !== "breaks") { blocks.splice(i + 1, 0, block("breaks")); run = 0; i++; } } }
  function fit(blocks, total, cap) { const free = blocks.filter(x => !x.locked && !x.pre && x.role !== "breaks"); const fixed = blocks.filter(x => !x.pre && (x.locked || x.role === "breaks")).reduce((s, x) => s + x.mins, 0); const sum = free.reduce((s, x) => s + ROLES[x.role][2], 0) || 1; const k = Math.max(.5, (total - fixed) / sum); free.forEach(x => x.mins = Math.max(10, Math.round(ROLES[x.role][2] * Math.min(k, cap || 2.2) / 5) * 5)); }
  const total = blocks => blocks.filter(x => !x.pre).reduce((s, x) => s + x.mins, 0);
  const TOK = { QUESTION: "Question", EVIDENCE: "Evidence", PATTERNS: "Patterns", OPTIONS: "Options", ASSUMPTIONS: "Assumptions", CRITERIA: "Criteria", PRIORITIES: "Priorities", DECISION: "Decision", TESTPLAN: "Test plan", ACTIONS: "Actions", ROOM: "Room" };
  const tokL = u => u.split("|").map(k => TOK[k] || k).join(" or ");
  const need = (u, have) => u.split("|").some(k => have.has(k));
  const OPT = { options: ["EVIDENCE", "PATTERNS"], decide: ["CRITERIA", "PRIORITIES", "ASSUMPTIONS"], test: ["ASSUMPTIONS"], assumptions: ["OPTIONS", "PATTERNS"], prioritise: ["CRITERIA"] };
  const consumes = (role, p) => ROLES[role][3].concat(OPT[role] || []).some(u => u.split("|").some(k => p.includes(k)));
  function flow(blocks) { const have = new Set(["QUESTION"]); blocks.filter(x => x.pre).forEach(x => ROLES[x.role][4].forEach(p => have.add(p)));
    return blocks.map(x => { const R = ROLES[x.role]; const uses = R[3].filter(u => u !== "QUESTION").map(u => ({ k: tokL(u), ok: need(u, have) })); if (!x.pre) R[4].forEach(p => have.add(p)); return { id: x.id, uses, makes: R[4].filter(p => p !== "ROOM").map(p => TOK[p]) }; }); }
  function insights(b, blocks) {
    const out = [], live = blocks.filter(x => !x.pre), roles = live.map(x => x.role), sum = k => live.filter(x => ROLES[x.role][5] === k).reduce((s, x) => s + x.mins, 0), div = sum("div"), conv = sum("conv"), fid = r => (live.find(x => x.role === r) || {}).id;
    if (roles.includes("decide") && (!b.owner || b.owner === "No" || b.owner === "Not sure")) out.push({ sev: "high", at: fid("decide"), t: "No decision owner is present for this decision.", fix: "Bring them in for the final part, or call the output a recommendation.", cmd: "owner" });
    if (b.owner === "Joins final part" && roles.includes("decide")) out.push({ sev: "mid", at: fid("decide"), t: "The decision owner joins late.", fix: "Brief them on options and criteria before this block starts." });
    if (roles.includes("evidence") && (b.evidence || []).includes("Nothing yet")) out.push({ sev: "high", at: fid("evidence"), t: "This block needs customer evidence, but none is attached.", fix: "Run a few interviews first, or replace it with Desk Research." });
    if (div > conv * 2 && div > 30) out.push({ sev: "mid", t: "You have " + div + " minutes of divergence and only " + conv + " of convergence.", fix: "Add criteria before deciding.", cmd: "converge" });
    if (!roles.includes("decide") && !roles.includes("prioritise")) out.push({ sev: "mid", t: "This session ends without an explicit choice.", fix: "Add a decision gate near the end.", cmd: "decision" });
    else if (!roles.includes("decide") && /Decision|Direction|Strategy/.test(b.outcome || "")) out.push({ sev: "mid", at: fid("prioritise"), t: "This workshop ends with prioritisation but no explicit decision.", fix: "Add a decision gate after prioritising.", cmd: "decision" });
    let run = 0, hi = 0; live.forEach((x, i) => { if (x.role === "breaks" || x.role === "energise") { run = 0; hi = 0; return; } run += x.mins; if (ROLES[x.role][6] >= 2) hi++; else hi = 0;
      if (run > 120) { out.push({ sev: "mid", at: x.id, t: "More than two hours without a break by this point.", fix: "Add a break before this block.", cmd: "break", n: blocks.indexOf(x) }); run = -1e9; }
      if (hi >= 3) { out.push({ sev: "mid", at: x.id, t: "Three demanding activities in a row without a break.", fix: "Add a break before this block.", cmd: "break", n: blocks.indexOf(x) }); hi = -1e9; } });
    const have = new Set(["QUESTION"]); blocks.filter(x => x.pre).forEach(x => ROLES[x.role][4].forEach(p => have.add(p)));
    live.forEach(x => { const R = ROLES[x.role]; const miss = R[3].filter(u => !need(u, have)); if (miss.length && x.role !== "breaks") out.push({ sev: "mid", at: x.id, seq: true, t: x.title + " needs " + miss.map(tokL).join(" + ").toLowerCase() + ", which no earlier block produces.", fix: "Move it later, or add a block that produces it." }); R[4].forEach(p => have.add(p)); });
    live.forEach((x, i) => { if (!["sense", "landscape", "assumptions", "criteria"].includes(x.role)) return; const p = ROLES[x.role][4]; if (!live.slice(i + 1).some(y => consumes(y.role, p))) out.push({ sev: "mid", at: x.id, t: "The output of " + x.title + " is not used by any later block.", fix: "Move it earlier, or follow it with a block that uses " + TOK[p[0]].toLowerCase() + "." }); });
    if (["11 to 20", "20+"].includes(b.people) && !live.some(x => /1-2-4|breakout/i.test(x.title))) out.push({ sev: "mid", t: "With " + b.people + " people, whole-group discussion will stall.", fix: "Use 1-2-4-All, breakouts and a co-facilitator.", cmd: "big" });
    return out;
  }
  function stress(b, blocks) {
    const roles = blocks.filter(x => !x.pre).map(x => x.role), T = MIN[b.time] || 210, t = total(blocks), r = [];
    const add = (k, ok, msg, fix) => r.push({ k, ok, msg, fix });
    add("Question", (b.question || "").length > 25, (b.question || "").length > 25 ? "Specific enough to work on." : "The question is too broad to answer in one session.", "Rewrite it as one decision or one unknown.");
    add("Outcome", !!b.outcome, b.outcome ? "Ends with: " + b.outcome.toLowerCase() + "." : "No defined output.", "Choose what must exist at the end.");
    add("Decision", roles.includes("decide") || roles.includes("prioritise"), roles.includes("decide") ? "There is a decision block." : "Nothing gets chosen.", "Add a decision gate.");
    add("Authority", b.owner === "Yes" || b.owner === "Joins final part", b.owner === "Yes" ? "The decision owner is in the room." : b.owner === "Joins final part" ? "The owner joins late. Brief them first." : "Nobody present can choose.", "Add the decision owner to the final part.");
    add("Evidence", roles.includes("evidence") && !(b.evidence || []).includes("Nothing yet"), roles.includes("evidence") ? ((b.evidence || []).includes("Nothing yet") ? "The evidence block has nothing to work with." : "Reality enters through evidence.") : "Everything rests on internal opinion.", "Add an Evidence block early.");
    const seqIssues = insights(b, blocks).filter(x => / needs /.test(x.t)); add("Sequence", !seqIssues.length, seqIssues.length ? seqIssues[0].t : "Each block feeds the next.", "Reorder so inputs come first.");
    add("Divergence", roles.includes("options"), roles.includes("options") ? "Alternatives are generated." : "No alternatives are generated.", "Add an Options block.");
    const conv = blocks.filter(x => ["decide", "criteria", "prioritise"].includes(x.role)).reduce((s, x) => s + x.mins, 0); add("Convergence", conv >= 25, conv >= 25 ? conv + " minutes to choose." : "Too little time to choose.", "Give Decide at least 25 minutes.");
    const big = { "11 to 20": 1, "20+": 1 }[b.people]; add("Participation", !big || blocks.some(x => /1-2-4|breakout/i.test(x.title)), big ? "Large group: check every voice is heard." : "Group size suits the methods.", "Use 1-2-4-All or breakouts.");
    const hard = blocks.filter(x => ROLES[x.role][6] >= 3).length; add("Load", hard <= 2, hard <= 2 ? "Cognitive load looks realistic." : hard + " high-energy blocks in one session.", "Space them out with breaks.");
    add("Timing", Math.abs(t - T) <= 15 || T > 390, Math.abs(t - T) <= 15 || T > 390 ? "Fits the time available." : "Agenda is " + t + " min for " + T + " available.", "Use Fit to time.");
    add("Follow through", roles.includes("commit") || roles.includes("test"), roles.includes("commit") ? "Ends with owners and next steps." : "Nobody owns what happens next.", "Add a Commit block.");
    return r;
  }
  function alternatives(b, blk) {
    const R = ROLES[blk.role], cur = blk.ref, small = ["1", "2 to 5"].includes(b.people), big = ["11 to 20", "20+"].includes(b.people);
    const pool = R[1].map(t => find([t])).filter(Boolean).filter(x => x.id !== cur);
    return pool.slice(0, 4).map(it => { const lv = it.level, dur = String(it.duration || it.time || ""); let why = it.short || "";
      if (/1-2-4/.test(it.title) && big) why = "Better for a large group: every voice in, fast."; else if (/premortem/i.test(it.title)) why = "Better once a direction is chosen and you need failure risks."; else if (/note and vote/i.test(it.title)) why = "Better when time is short and the group needs to choose quickly."; else if (/matrix/i.test(it.title)) why = "Better when options need comparing against explicit criteria.";
      return { id: it.id, title: it.title, why, meta: [dur, lv === "first" ? "First-time friendly" : lv === "advanced" ? "Advanced" : ""].filter(Boolean).join(" · ") }; });
  }
  function command(cmd, b, blocks, avail, n) { const r = command0(cmd, b, blocks, avail, n); r.changes.forEach(c => { if (c.type === "insert" && !c.nb) c.nb = c.split ? dayBlock("End of part 1") : block(c.role, c.ref); }); return r; }
  function command0(cmd, b, blocks, avail, n) {
    const ch = [], t = total(blocks), T = avail || MIN[b.time] || 210;
    if (cmd === "fit" || cmd === "cut60" || cmd === "cut") { let need = cmd === "cut60" ? 60 : cmd === "cut" ? (n || 30) : t - T;
      if (need <= 0) { const extra = -need, xs = blocks.filter(x => !x.locked && !x.pre && ["decide", "options", "sense", "assumptions"].includes(x.role)); if (cmd !== "fit" || extra < 20 || !xs.length) return { title: "Already fits", changes: [] };
        const per = Math.max(5, Math.floor(extra / xs.length / 5) * 5); return { title: extra + " more minutes available", changes: xs.map(x => ({ type: "mins", id: x.id, to: x.mins + per, label: "Extend", why: "Builder gives spare time to the blocks that usually run short.", saved: -per })) }; }
      blocks.filter(x => !x.locked && !x.pre && x.role === "options" && blocks.filter(y => y.role === "options" && !y.pre).length > 1).slice(1).forEach(x => { if (need > 0) { ch.push({ type: "remove", id: x.id, label: "Remove", what: x.title, why: "Second ideation round. One is enough at this length.", saved: x.mins }); need -= x.mins; } });
      blocks.filter(x => !x.locked && !x.pre && x.role === "landscape").forEach(x => { if (need > 0) { ch.push({ type: "async", id: x.id, label: "Move async", what: x.title, why: "Can be prepared before the session.", saved: x.mins }); need -= x.mins; } });
      blocks.filter(x => !x.locked && !x.pre && x.role !== "breaks" && x.mins > 25 && x.role !== "decide").sort((a, b2) => b2.mins - a.mins).forEach(x => { if (need > 0) { const to = Math.max(15, x.mins - Math.min(need, Math.round(x.mins / 2 / 5) * 5)); ch.push({ type: "mins", id: x.id, label: "Compress", what: x.title + " " + x.mins + " to " + to + " min", to, why: "Keeps the step, tightens the timebox.", saved: x.mins - to }); need -= x.mins - to; } });
      blocks.filter(x => !x.locked && !x.pre && x.role !== "breaks" && x.mins > 15 && !ch.some(c => c.id === x.id) && x.role !== "decide").sort((a, b2) => b2.mins - a.mins).forEach(x => { if (need > 0) { const to = Math.max(10, x.mins - Math.min(need, 10)); if (to < x.mins) { ch.push({ type: "mins", id: x.id, label: "Compress", what: "", to, why: "Short timebox. Keep the output, drop discussion.", saved: x.mins - to }); need -= x.mins - to; } } });
      blocks.filter(x => !x.locked && !x.pre && ["energise", "assumptions", "landscape", "sense"].includes(x.role) && !ch.some(c => c.id === x.id && c.type !== "mins")).forEach(x => { if (need > 0) { const prev = ch.findIndex(c => c.id === x.id); if (prev >= 0) { need += ch[prev].saved; ch.splice(prev, 1); } ch.push({ type: "remove", id: x.id, label: "Remove", what: "", why: "Lowest-impact block for this outcome. Check the downstream note.", saved: x.mins }); need -= x.mins; } });
      const target = cmd === "cut60" ? 60 : cmd === "cut" ? (n || 30) : t - T, found = ch.reduce((s, c) => s + c.saved, 0);
      return { title: (cmd === "fit" ? target + " minutes need to come out" : "Cut " + target + " minutes") + (found < target ? " · found " + found : ""), changes: ch, short: found < target ? "Locked and decision blocks were left alone. Remove another block by hand to save the rest." : "" }; }
    if (cmd === "break") { const i = n != null ? n : Math.max(1, Math.floor(blocks.length / 2)); return { title: "Add a break", changes: [{ type: "insert", at: i, role: "breaks", label: "Add", what: "Break, 10 min", why: "Attention drops after about 90 minutes.", saved: -10 }] }; }
    if (cmd === "decision") { const has = blocks.some(x => x.role === "decide"); return has ? { title: "A decision gate is already in place", changes: [] } : { title: "Add a decision gate", changes: [{ type: "insert", at: Math.max(0, blocks.length - 1), role: "decide", label: "Add", what: "Decide, 30 min", why: "Otherwise the session ends with a list, not a choice.", saved: -30 }] }; }
    if (cmd === "evidence") { const has = blocks.some(x => x.role === "evidence"); return has ? { title: "Evidence is already in the agenda", changes: [] } : { title: "Add customer evidence", changes: [{ type: "insert", at: 1, role: "evidence", label: "Add", what: "Evidence, 30 min", why: "Lets reality in before options are generated.", saved: -30 }] }; }
    if (cmd === "big") { const c2 = [], o = blocks.find(x => x.role === "options" && !/1-2-4/.test(x.title)), it = find(["1-2-4-All"]), d = blocks.find(x => x.role === "decide"), nv = find(["Note and Vote", "Dot Voting"]), syn = blocks.find(x => x.role === "sense") || blocks.find(x => x.role === "evidence");
      if (o && it) c2.push({ type: "replace", id: o.id, ref: it.id, label: "Replace", why: "Every voice in, without a 20-person discussion.", saved: 0 });
      if (d && nv && d.ref !== nv.id) c2.push({ type: "replace", id: d.id, ref: nv.id, label: "Replace", why: "Silent voting before discussion stops the loudest voices deciding.", saved: 0 });
      if (syn) c2.push({ type: "mins", id: syn.id, to: syn.mins + 15, label: "Extend", why: "Breakouts need time to report back and merge.", saved: -15 });
      c2.push({ type: "note", label: "Add", what: "A co-facilitator and breakouts of 4 to 6", why: "One facilitator cannot hold 20 people through synthesis.", saved: 0 });
      return { title: "Adapt for a larger group", changes: c2 }; }
    if (cmd === "exec") { const c2 = []; blocks.filter(x => !x.locked && !x.pre && x.role === "landscape").forEach(x => c2.push({ type: "async", id: x.id, label: "Move async", why: "Executives read faster than they workshop. Send it as a pre-read.", saved: x.mins }));
      blocks.filter(x => !x.locked && !x.pre && ["evidence", "options", "sense"].includes(x.role) && x.mins > 20).forEach(x => { const to = Math.max(15, Math.round(x.mins * .65 / 5) * 5); c2.push({ type: "mins", id: x.id, to, label: "Compress", why: "Keep the step, cut the walkthrough.", saved: x.mins - to }); });
      if (!blocks.some(x => x.role === "decide")) c2.push({ type: "insert", at: Math.max(0, blocks.length - 1), role: "decide", label: "Add", why: "Executives expect to leave with a decision.", saved: -30 });
      c2.push({ type: "note", label: "Change", what: "Open with the decision required and the options on one page", why: "Starts at the level the room operates at.", saved: 0 });
      return { title: "Make this executive-friendly", changes: c2 }; }
    if (cmd === "diverge") { const used = blocks.map(x => x.ref), alt = ROLES.options[1].map(x => find([x])).find(x => x && !used.includes(x.id)), i = blocks.map(x => x.role).lastIndexOf("options"); return { title: "Add more divergence", changes: [{ type: "insert", at: i >= 0 ? i + 1 : Math.max(1, blocks.findIndex(x => ROLES[x.role][5] === "conv")), role: "options", ref: alt && alt.id, label: "Add", why: "A second, different generation method widens the option set.", saved: -40 }] }; }
    if (cmd === "converge") { const d = blocks.findIndex(x => x.role === "decide"); if (!blocks.some(x => x.role === "criteria")) return { title: "Improve convergence", changes: [{ type: "insert", at: d >= 0 ? d : blocks.length - 1, role: "criteria", label: "Add", why: "Agreeing how to judge before judging makes the choice faster and fairer.", saved: -20 }] }; const x = blocks[d]; return { title: "Improve convergence", changes: x ? [{ type: "mins", id: x.id, to: x.mins + 15, label: "Extend", why: "Choosing usually takes longer than generating.", saved: -15 }] : [] }; }
    if (cmd === "commit") return blocks.some(x => x.role === "commit") ? { title: "Follow-through is already in place", changes: [] } : { title: "Add follow-through", changes: [{ type: "insert", at: blocks.length, role: "commit", label: "Add", why: "Owners and dates are what survive the room.", saved: -15 }] };
    if (cmd === "concrete") { const c2 = []; if (!blocks.some(x => x.role === "test")) { const c = blocks.findIndex(x => x.role === "commit"); c2.push({ type: "insert", at: c >= 0 ? c : blocks.length, role: "test", label: "Add", why: "A test plan is a concrete artifact, not a mood.", saved: -25 }); } c2.push({ type: "note", label: "Change", what: "Each block names the artifact it leaves on the wall", why: "Makes it obvious when a block produced nothing usable.", saved: 0 }); return { title: "Make the output more concrete", changes: c2 }; }
    if (cmd === "prework") { const c2 = []; blocks.filter(x => !x.locked && !x.pre && x.role === "landscape").forEach(x => c2.push({ type: "async", id: x.id, label: "Move async", why: "Can be prepared individually before the session.", saved: x.mins })); const e = blocks.find(x => x.role === "evidence" && !x.pre); if (e && e.mins > 20) { const to = Math.max(15, e.mins - 15); c2.push({ type: "mins", id: e.id, to, label: "Compress", why: "Participants read the evidence summary beforehand.", saved: e.mins - to }); } c2.push({ type: "note", label: "Add", what: "Pre-read sent 48 hours before", why: "The room starts from shared context.", saved: 0 }); return { title: "Create pre-work", changes: c2 }; }
    if (cmd === "owner") return { title: "Bring the decision owner in", changes: [{ type: "brief", key: "owner", val: "Joins final part", label: "Change", what: "Decision owner joins the final part", why: "Without someone who can choose, the session ends with a recommendation.", saved: 0 }] };
    if (cmd === "remote") return { title: "Make this remote", changes: [{ type: "note", label: "Change", what: "Shared board per block, cameras on for Decide", why: "Remote work needs one visible board and explicit turns.", saved: 0 }].concat(blocks.filter(x => x.role === "energise").map(x => ({ type: "remove", id: x.id, label: "Remove", what: x.title, why: "Physical energisers do not translate to video.", saved: x.mins }))).concat(blocks.filter(x => x.mins > 60).map(x => ({ type: "mins", id: x.id, to: 50, label: "Compress", what: x.title + " " + x.mins + " to 50 min", why: "Remote blocks over an hour lose people.", saved: x.mins - 50 }))) };
    if (cmd === "easy") return { title: "Make it easier to facilitate", changes: blocks.filter(x => { const it = x.ref && L().get(x.ref); return it && it.level === "advanced"; }).map(x => { const alt = alternatives(b, x).find(a => { const it = L().get(a.id); return it && it.level !== "advanced"; }); return alt ? { type: "replace", id: x.id, ref: alt.id, label: "Replace", what: x.title + " with " + alt.title, why: "Needs less facilitation experience.", saved: 0 } : null; }).filter(Boolean) };
    if (cmd === "halves") { const half = Math.floor(blocks.length / 2); return { title: "Turn into 2 half-days", changes: [{ type: "insert", at: half, role: "breaks", label: "Split", what: "Overnight break after " + blocks[half - 1].title, why: "Gives time to gather evidence between sessions.", saved: 0, split: true }] }; }
    return { title: "", changes: [] };
  }
  function apply(blocks, changes) { let out = blocks.map(x => Object.assign({}, x));
    changes.filter(c => c.type === "insert").sort((a, c) => c.at - a.at).forEach(c => out.splice(Math.min(c.at, out.length), 0, Object.assign({}, c.nb || block(c.role, c.ref), { id: id() })));
    changes.forEach(c => { const x = c.id && out.find(y => y.id === c.id); if (c.type === "remove") out = out.filter(y => y.id !== c.id); else if (!x) return; else if (c.type === "async") x.pre = true; else if (c.type === "mins") x.mins = c.to; else if (c.type === "replace") { const it = L().get(c.ref); if (it) { x.ref = it.id; x.title = it.title; } } });
    return out; }
  function impact(blocks, c) {
    const x = c.id && blocks.find(y => y.id === c.id);
    if (c.type === "async") return "Its output still arrives, as pre-work.";
    if (c.type === "remove" && x) { const after = blocks.filter(y => y.id !== x.id), f0 = flow(blocks), f1 = flow(after); const broke = after.filter((y, i) => f1[i].uses.some(u => !u.ok) && !f0[blocks.indexOf(y)].uses.some(u => !u.ok)).map(y => y.title); return broke.length ? broke.join(", ") + " will lose " + ROLES[x.role][4].map(k => TOK[k].toLowerCase()).join(" + ") + " as input." : "No later block depends on it."; }
    if (c.type === "mins" && x) return c.to < x.mins * .6 ? "Expect thinner " + (TOK[ROLES[x.role][4][0]] || "output").toLowerCase() + "." : c.to < x.mins ? "Same output, tighter timebox." : "More time for the same output.";
    if (c.type === "replace") return "Same stage and output. Later blocks are unaffected.";
    if (c.type === "insert" && c.nb) { const p = ROLES[c.nb.role][4], later = blocks.slice(c.at).filter(y => !y.pre && consumes(y.role, p)).map(y => y.title); return later.length ? "Feeds " + later.slice(0, 2).join(" and ") + "." : c.nb.role === "breaks" ? "Resets attention for what follows." : ""; }
    return "";
  }
  const WHY = { open: "Gets every voice in before the work starts.", frame: "Fixes one question so every later block answers the same thing.", evidence: "Lets reality in before anyone proposes answers.", sense: "Turns raw evidence into patterns the group can act on.", landscape: "Shows the alternatives the customer already has.", options: "Generates real alternatives so the choice is not a default.", assumptions: "Separates what must be true from what is still belief.", criteria: "Agrees how to judge before judging.", prioritise: "Narrows the list to what matters most.", decide: "Turns options into one explicit choice.", test: "Converts the decision into the cheapest next test.", commit: "Names owners and dates so the work survives the room.", breaks: "Attention drops after about 90 minutes.", energise: "Resets energy after a heavy block." };
  const ORDER = ["open", "frame", "evidence", "landscape", "sense", "options", "assumptions", "criteria", "prioritise", "decide", "test", "commit"];
  function insertAt(blocks, role) { if (role === "breaks") return Math.max(1, Math.floor(blocks.length / 2)); const r = ORDER.indexOf(role); let at = 0; blocks.forEach((x, i) => { const o = ORDER.indexOf(x.role); if (o >= 0 && o <= r) at = i + 1; }); return at; }
  function detail(b, blk) {
    const R = ROLES[blk.role], it = blk.ref ? L().get(blk.ref) : null, d = it ? L().deco(it) : null, big = ["11 to 20", "20+"].includes(b.people), notes = [];
    if (big) notes.push("Run it in groups of 4 to 6, then share back. Silent writing before any discussion.");
    if (b.format === "Remote") notes.push("One board frame per group. Call on people by name rather than waiting for volunteers.");
    if (blk.role === "decide" && b.owner === "Joins final part") notes.push("Brief the decision owner on options and criteria before this block starts.");
    if (it) (it.adaptations || []).slice(0, 2).forEach(a => notes.push(typeof a === "string" ? a : a.t || ""));
    const lk = x => ({ title: x.title, href: L().deco(x).href, kind: L().deco(x).typeLabel });
    const rel = it ? [].concat(it.alternatives || [], it.related || [], it.complements || []).map(r => typeof r === "string" ? L().get(r) : null).filter(Boolean) : [];
    const related = rel.concat(R[1].map(t => find([t])).filter(Boolean)).filter((x, i, a) => x.id !== blk.ref && a.findIndex(y => y.id === x.id) === i).slice(0, 4).map(lk);
    const assets = it ? (it.resources || []).map(r => L().get(r)).filter(Boolean).map(lk) : [];
    return { why: WHY[blk.role] || "", purpose: it ? (it.purpose || it.short || "") : "", time: d ? (d.timeLabel || it.duration || "") : "", people: d ? (d.peopleLabel || it.groupSize || "") : "",
      input: R[3].filter(u => u !== "QUESTION").map(tokL).join(" + ") || "The question", output: (it && it.outputs || []).join(", ") || R[4].filter(p => p !== "ROOM").map(p => TOK[p]).join(", "),
      useWhen: it && it.useWhen || [], avoidWhen: it && it.avoidWhen || [], steps: it && Array.isArray(it.steps) ? it.steps.filter(s => typeof s === "string").slice(0, 8) : [],
      watch: it ? (it.failures || []).slice(0, 4).map(f => typeof f === "string" ? f : f.p || f.symptom || "").filter(Boolean) : [], notes: notes.filter(Boolean),
      source: it ? [it.creator, it.attribution].filter(Boolean).join(". ") : "", rights: it && it.rights || "", related, assets, href: d ? d.href : "", kind: d ? d.typeLabel : "" };
  }
  const ASK = [[/cut|shorter|trim|less time|too long/, "cut"], [/remote|online|zoom|distributed/, "remote"], [/\d{2,} people|large group|bigger group|more people/, "big"], [/exec|leadership|board|c-suite|ceo/, "exec"], [/pre-?work|async|before the session/, "prework"], [/break/, "break"], [/decision|decide/, "decision"], [/evidence|customer|research/, "evidence"], [/diverg|more ideas|wider/, "diverge"], [/converg|narrow|choose/, "converge"], [/easier|first.time|beginner|simpl/, "easy"], [/split|two half|2 half|half.days/, "halves"], [/concrete|tangible|output/, "concrete"], [/follow|next step/, "commit"], [/stress|check|review/, "stress"], [/fit/, "fit"]];
  async function ask(text) { const t = String(text || "").toLowerCase(), m = t.match(/(\d+)\s*(min|minutes)/), h = t.match(/(\d+)\s*hours?/), nn = m ? +m[1] : h ? +h[1] * 60 : 30;
    for (const [re, c] of ASK) if (re.test(t)) return { cmd: c, n: c === "cut" ? nn : undefined };
    try { if (window.claude && window.claude.complete) { const out = String(await window.claude.complete("A workshop designer asked: \"" + text + "\". Choose the single best matching command from: cut, fit, remote, big, exec, prework, break, decision, evidence, diverge, converge, easy, halves, concrete, commit, stress. Reply with the command word only, or none.")).trim().toLowerCase().replace(/[^a-z]/g, ""); if (ASK.some(a => a[1] === out)) return { cmd: out, n: out === "cut" ? nn : undefined }; } } catch (e) {}
    return null; }
  const TEMPLATES = [
    ["90-minute Product Decision Workshop", { question: "Which product direction should we commit to next?", outcome: "Decision", time: "90 min", people: "2 to 5", who: ["Product", "Design", "Engineering"], owner: "Yes", format: "In person", evidence: ["Customer research"] }],
    ["Half-Day Positioning Workshop", { question: "How should we position the product against what customers already use?", outcome: "Direction", time: "Half day", people: "2 to 5", who: ["Founders"], owner: "Yes", format: "In person", evidence: ["Customer research", "Market research"] }],
    ["2-Day AI Product Strategy Sprint", { question: "Where should AI change our product, and what do we test first?", outcome: "Strategy", time: "2 days", people: "6 to 10", who: ["Founders", "Product", "Design", "Engineering"], owner: "Yes", format: "In person", evidence: ["Customer research", "Analytics"] }],
    ["Leadership Alignment Workshop", { question: "Which three priorities do we commit to for the next two quarters?", outcome: "Alignment", time: "1 day", people: "6 to 10", who: ["Leadership"], owner: "Yes", format: "In person", evidence: ["Existing strategy", "Internal data"] }],
    ["Scenario Stress-Test Workshop", { question: "Does our strategy hold up across plausible futures for our category?", outcome: "Strategy", time: "Half day", people: "6 to 10", who: ["Leadership", "Product"], owner: "Joins final part", format: "Hybrid", evidence: ["Market research", "Existing strategy"] }]
  ].map(([name, brief]) => ({ name, brief }));
  function pack(b, blocks) { const r = blocks.map(x => x.role), P = [];
    P.push(["Prepare", ["Brief", "Participant invitation", "Materials checklist"].concat(b.format === "Remote" ? ["Remote setup"] : ["Room setup"]).concat(r.includes("evidence") ? ["Pre-read"] : [])]);
    P.push(["Run", ["Minute-by-minute agenda", "Facilitator run sheet"].concat(r.includes("decide") ? ["Decision gate script"] : [])]);
    P.push(["Work", ["Board structure", "Parking lot"].concat(r.includes("decide") ? ["Decision log"] : []).concat(r.includes("prioritise") || r.includes("decide") ? ["Voting area"] : [])]);
    if (r.includes("evidence") || r.includes("sense")) P.push(["Research", ["Interview guide", "Research plan"]]);
    P.push(["After", ["Summary template", "Action tracker"].concat(r.includes("decide") ? ["Decision memo"] : [])]);
    if (r.includes("test")) P.push(["Next test", ["Experiment plan"]]);
    return P; }
  function agendaText(b, blocks) { let m = 0; const f = x => String(Math.floor(x / 60)).padStart(2, "0") + ":" + String(x % 60).padStart(2, "0"); return [b.question, ""].concat(blocks.map(x => { const s = f(m) + "  " + x.label.toUpperCase() + "  " + x.title + "  (" + x.mins + " min)"; m += x.mins; return s; })).concat(["", "Total " + total(blocks) + " min"]).join("\n"); }
  const L = () => window.RDL;
  const ROLE_BY_ID = { "gallery-walk": "prioritise", "evidence-review": "evidence", "welcome-and-framing": "frame", "hopes-and-concerns": "open", "next-actions": "commit", "dot-voting": "prioritise", "decision-criteria": "criteria", "assumption-ranking": "assumptions", "one-two-four-all": "options", "structured-critique": "prioritise", "expert-interviews": "evidence", "five-act-interview": "evidence", "concept-testing": "test", "rapid-prototyping": "test", "silent-ideation": "options", "signal-collection": "evidence", "horizon-scanning": "evidence", "signal-clustering": "sense", "what-so-what-now-what": "commit", "rose-bud-thorn": "commit", "stakeholder-mapping": "landscape", "customer-journey-map": "landscape", "service-blueprint": "landscape", "competitive-alternatives": "landscape", "value-proposition": "options", "scenario-matrix": "options", "futures-wheel": "options", "backcasting": "test", "risk-map": "assumptions", "opportunity-mapping": "sense", "jobs-to-be-done": "evidence", "how-might-we": "frame", "decision-matrix": "decide", "note-and-vote": "decide" };
  function roleOf(it) { if (!it) return "custom"; if (ROLE_BY_ID[it.id]) return ROLE_BY_ID[it.id]; const k = nm(it.title); for (const r in ROLES) if (ROLES[r][1].some(t => nm(t) === k)) return r; const g = it.goals || [];
    const st = it.stage; if (st === "open") return "open"; if (st === "energise") return "energise"; if (st === "makesense") return "sense"; if (st === "create") return "options"; if (st === "decide") return g.includes("prioritise") ? "prioritise" : "decide"; if (["commit", "close", "reflect"].includes(st)) return "commit";
    if (st === "explore") return /interview|research|scan|signal|observ|survey/i.test(it.title) || g.includes("understand") ? "evidence" : "landscape";
    if (g.includes("test")) return "assumptions"; if (g.includes("prioritise")) return "prioritise"; if (g.includes("decide")) return "decide"; if (g.includes("create")) return "options"; if (g.includes("understand")) return "evidence"; return "landscape"; }
  function minsOf(it) { if (!it) return 20; const k = it.timeKey; if (/^\d+$/.test(k || "")) return Math.max(5, +k); const m = String(it.duration || it.time || "").match(/(\d+)\s*(min|minutes)/); if (m) return Math.max(5, Math.round(+m[1] / 5) * 5); const r = ROLES[roleOf(it)]; return r ? r[2] : 20; }
  function suggest(blocks, anchor, dir) { const out = []; const used = new Set(blocks.map(x => x.ref)); const R = anchor ? ROLES[anchor.role] : null;
    const roles = !anchor ? ["open", "frame", "evidence"] : dir === "before" ? ORDER.filter(r => R[3].concat(OPT[anchor.role] || []).some(u => u.split("|").some(k => ROLES[r][4].includes(k)))) : ORDER.filter(r => r !== anchor.role && consumes(r, R[4]));
    const ordered = dir === "before" ? roles.slice().reverse() : roles;
    ordered.forEach(r => ROLES[r][1].forEach(t => { const it = find([t]); if (it && !used.has(it.id) && !out.some(o => o.it.id === it.id)) out.push({ it, role: r, why: !anchor ? WHY[r] : dir === "before" ? "Produces " + ROLES[r][4].map(k => TOK[k].toLowerCase()).join(" + ") + ", which " + anchor.title + " uses." : "Uses the " + R[4].filter(k => ROLES[r][3].concat(OPT[r] || []).some(u => u.includes(k))).map(k => TOK[k].toLowerCase()).join(" + ") + " that " + anchor.title + " produces." }); }));
    const seen = {}; return out.filter(o => (seen[o.role] = (seen[o.role] || 0) + 1) <= 1).slice(0, 4); }
  const T = (id, m) => [id, m];
  const TPL = [
    ["90-minute Decision Workshop", "Choose between options and leave with a recorded decision.", { outcome: "Decision", time: "90 min" }, [["§", "Open"], T("welcome-and-framing", 10), ["§", "Decide"], T("decision-criteria", 20), T("silent-ideation", 15), T("decision-matrix", 25), T("note-and-vote", 10), ["§", "Commit"], T("next-actions", 10)]],
    ["Half-Day Positioning Workshop", "From evidence to a positioning direction and the assumptions behind it.", { outcome: "Direction", time: "Half day" }, [["§", "Open"], T("welcome-and-framing", 10), T("hopes-and-concerns", 15), ["§", "Understand"], T("evidence-review", 30), T("competitive-alternatives", 40), ["break", 15], ["§", "Create"], T("value-proposition", 40), ["§", "Decide"], T("note-and-vote", 20), T("assumption-mapping", 25), T("next-actions", 15)]],
    ["Research Synthesis Workshop", "Turn raw research into patterns and opportunities.", { outcome: "Research evidence", time: "Half day" }, [["§", "Open"], T("welcome-and-framing", 10), T("evidence-review", 30), ["§", "Make sense"], T("affinity-mapping", 50), ["break", 10], T("how-might-we", 25), ["§", "Commit"], T("dot-voting", 10), T("next-actions", 15)]],
    ["Leadership Alignment Workshop", "A full day that ends in agreed priorities with owners.", { outcome: "Alignment", time: "1 day" }, [["§", "Open"], T("welcome-and-framing", 15), T("hopes-and-concerns", 20), ["§", "Understand"], T("evidence-review", 40), T("one-two-four-all", 30), ["break", 15], T("stakeholder-mapping", 45), ["lunch", 45], ["§", "Decide"], T("decision-criteria", 30), T("decision-matrix", 45), ["break", 15], T("note-and-vote", 20), ["§", "Commit"], T("next-actions", 30), T("what-so-what-now-what", 20)]],
    ["2-Day Product Strategy Sprint", "Two days from evidence to a tested product direction.", { outcome: "Strategy", time: "2 days" }, [["§", "Understand"], T("welcome-and-framing", 20), T("evidence-review", 45), T("customer-journey-map", 60), ["break", 15], T("how-might-we", 30), ["§", "Create"], T("lightning-demos", 45), ["lunch", 60], T("crazy-8s", 30), T("gallery-walk", 25), ["break", 15], ["§", "Decide"], T("note-and-vote", 30), ["day"], ["§", "Test"], T("one-word-check-in", 10), T("assumption-mapping", 60), ["break", 15], T("rapid-prototyping", 120), ["lunch", 60], T("concept-testing", 90), ["break", 15], ["§", "Commit"], T("decision-matrix", 40), T("next-actions", 30)]],
    ["Scenario Workshop", "Plausible futures and what they mean for today's strategy.", { outcome: "Strategy", time: "Half day" }, [["§", "Explore"], T("welcome-and-framing", 15), T("horizon-scanning", 40), T("signal-clustering", 40), ["break", 15], ["§", "Create"], T("scenario-matrix", 60), T("futures-wheel", 40), ["break", 10], ["§", "Commit"], T("backcasting", 40), T("next-actions", 20)]],
    ["Design Sprint", "Four days: map, sketch, decide and prototype, then test with five customers.", { outcome: "Prototype", time: "3 to 5 days" }, [["§", "Map"], T("expert-interviews", 90), T("how-might-we", 30), ["lunch", 60], T("lightning-demos", 60), T("crazy-8s", 30), ["day"], ["§", "Decide"], T("gallery-walk", 40), T("structured-critique", 60), T("note-and-vote", 30), ["lunch", 60], ["day"], ["§", "Prototype"], T("rapid-prototyping", 360), ["day"], ["§", "Test"], T("five-act-interview", 300), T("next-actions", 30)]],
    ["Retrospective", "Look back as a team and commit to what changes next.", { outcome: "Plan", time: "90 min" }, [T("one-word-check-in", 5), T("rose-bud-thorn", 25), T("affinity-mapping", 25), T("dot-voting", 10), T("what-so-what-now-what", 25), T("next-actions", 15)]]
  ].map(([name, d, brief, seq]) => ({ name, d, brief, seq }));
  window.RDB = { ROLES, ORDER, TPL, roleOf, minsOf, suggest, consumes, SHAPES, MIN, TOK, WHY, TEMPLATES, extract, extractAI, recommend, compose, fit, addBreaks, total, insights, flow, stress, alternatives, command, apply, impact, detail, insertAt, ask, pack, agendaText, block };
})();
