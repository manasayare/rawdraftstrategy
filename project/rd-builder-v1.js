// Builder engine. Composes workshops and sprints from the Raw Draft Library (window.RD.items). No invented activities:
// every block resolves to a Library record when one exists; generic structural blocks (break, close) are labelled as such.
(function () {
  const nm = s => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
  const find = titles => { if (!window.RD) return null; for (const t of titles) { const k = nm(t); const it = RD.items.find(x => nm(x.title) === k || nm(String(x.title).split(" (")[0]) === k); if (it) return it; } return null; };
  // role: label, candidate Library titles (best first), default minutes, uses, produces, kind (div|conv|neutral), energy
  const ROLES = {
    open: ["Open", ["One-word check-in", "Check-in", "Hopes and Fears", "Working Agreements"], 15, [], ["ROOM"], "neutral", 1],
    frame: ["Frame", ["How Might We", "Problem Statement", "5 Whys", "Abstraction Laddering"], 20, [], ["QUESTION"], "neutral", 1],
    evidence: ["Evidence", ["Evidence Map", "Desk Research", "Customer Interview", "Research Question Canvas"], 30, ["QUESTION"], ["EVIDENCE"], "neutral", 1],
    sense: ["Make sense", ["Affinity Mapping", "Rose, Thorn, Bud", "Insight Statement", "Empathy Map"], 35, ["EVIDENCE"], ["PATTERNS"], "conv", 2],
    landscape: ["Landscape", ["Competitive Alternatives Research", "Competitive Alternatives", "Stakeholder Mapping", "Customer Journey Map"], 35, ["QUESTION"], ["PATTERNS"], "neutral", 2],
    options: ["Options", ["Crazy 8s", "Silent Ideation", "1-2-4-All", "Brainwriting 6-3-5", "Lightning Demos"], 40, ["QUESTION"], ["OPTIONS"], "div", 3],
    assumptions: ["Assumptions", ["Assumption Mapping", "Premortem", "Kill-Risk Mapping"], 35, ["OPTIONS"], ["ASSUMPTIONS"], "conv", 2],
    criteria: ["Criteria", ["Decision Criteria Workshop", "Weighted Decision Matrix", "Decision Matrix"], 20, ["QUESTION"], ["CRITERIA"], "conv", 1],
    prioritise: ["Prioritise", ["Impact / Effort Matrix", "Dot Voting", "Note and Vote", "MoSCoW"], 30, ["OPTIONS"], ["PRIORITIES"], "conv", 2],
    decide: ["Decide", ["Note and Vote", "Decision Matrix", "Magic Lenses", "Weighted Decision Matrix"], 30, ["OPTIONS"], ["DECISION"], "conv", 2],
    test: ["Next test", ["Experiment / Attempt Card", "Attempt Loop", "GTM Experiment Card", "Concept Test"], 25, ["DECISION"], ["TESTPLAN"], "conv", 1],
    commit: ["Commit", ["Decision Log", "What, So What, Now What?", "Decision Recap"], 15, ["DECISION"], ["ACTIONS"], "conv", 1],
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
    if (/half.?day|4 hours|four hours|3 hours|three hours|morning|afternoon/.test(t)) b.time = "Half day"; else if (/90 ?min|hour and a half|1\.5 hours|two hours|2 hours/.test(t)) b.time = "90 min"; else if (/two days|2 days|2-day/.test(t)) b.time = "2 days"; else if (/(one|1|full) day/.test(t)) b.time = "1 day"; else if (/week|5 days|three days|3 days/.test(t)) b.time = "3 to 5 days";
    const num = t.match(/\b(\d{1,3})\s+(senior\s+)?(people|participants|leaders|of us|person)/); const words = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12, twenty: 20 };
    const wn = t.match(/\b(two|three|four|five|six|seven|eight|nine|ten|twelve|twenty)\s+(people|participants|leaders|founders)/); const n = num ? +num[1] : wn ? words[wn[1]] : null;
    if (n) b.people = n <= 1 ? "1" : n <= 5 ? "2 to 5" : n <= 10 ? "6 to 10" : n <= 20 ? "11 to 20" : "20+";
    const who = [["Founders", /founder/], ["Leadership", /leadership|ceo|exec|c-suite|senior/], ["Product", /product/], ["Design", /design/], ["Engineering", /engineer|tech lead|cto/], ["Research", /research/], ["Sales", /sales/], ["Marketing", /marketing|brand team/], ["Operations", /operations|ops\b/], ["Customers", /customers? (will|join|in the room)/]].filter(([, re]) => re.test(t)).map(([k]) => k);
    if (who.length) b.who = who;
    if (/ceo|founder|i (can )?decide|decision owner|decider/.test(t)) b.owner = /only join|last hour|joins? (for )?the (last|final)/.test(t) ? "Joins final part" : "Yes";
    if (/remote|zoom|online|distributed/.test(t)) b.format = "Remote"; else if (/hybrid/.test(t)) b.format = "Hybrid"; else if (/in.person|offsite|room|on.?site/.test(t)) b.format = "In person";
    const ev = [["Customer research", /interview|customer research|user research/], ["Analytics", /analytics|data shows|metrics/], ["Market research", /market research|competitor/], ["Existing strategy", /existing strategy|current strategy/], ["Prototype", /prototype/]].filter(([, re]) => re.test(t)).map(([k]) => k); if (ev.length) b.evidence = ev; else if (/no (research|evidence|data)|nothing yet/.test(t)) b.evidence = ["Nothing yet"];
    if (/decid|choose|which|whether|should we/.test(t)) b.outcome = "Decision"; else if (/position|strategy|direction/.test(t)) b.outcome = "Direction"; else if (/idea|brainstorm/.test(t)) b.outcome = "Ideas"; else if (/prototype|test an idea/.test(t)) b.outcome = "Prototype"; else if (/understand|research|need it|learn/.test(t)) b.outcome = "Research evidence"; else if (/align|agree/.test(t)) b.outcome = "Alignment"; else if (/prioriti/.test(t)) b.outcome = "Priorities"; else if (/plan|roadmap/.test(t)) b.outcome = "Plan";
    const q = String(text || "").trim().split(/(?<=[.?!])\s/)[0]; b.question = q.length > 140 ? q.slice(0, 137) + "..." : q;
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
    const t = (b.question || "") + " " + (b.notes || ""), long = (MIN[b.time] || 210) >= 780, topic = TOPICS.find(([re]) => re.test(t.toLowerCase()));
    const kind = long ? "Sprint" : "Workshop", name = (topic ? topic[1] : "Strategy") + " " + kind;
    const rec = topic ? find(topic[2].filter(x => long ? /sprint/i.test(x) : true)) : null;
    const why = [b.evidence && b.evidence.length && !b.evidence.includes("Nothing yet") ? "You already have some evidence, so the time goes into choosing rather than broad discovery." : "There is little evidence yet, so the agenda makes room to gather and test it.", long ? "With " + b.time.toLowerCase() + " a sprint can include making and testing, not only discussion." : "In " + (b.time || "half a day").toLowerCase() + " the aim is one clear output, not a full programme."].join(" ");
    return { kind, name, ref: rec ? rec.id : null, why };
  }
  function compose(b) {
    const shape = (SHAPES[b.outcome] || SHAPES.Direction).slice(); const total = Math.min(MIN[b.time] || 210, 390);
    let blocks = shape.map(r => block(r));
    if (b.format === "Remote") blocks = blocks.filter(x => x.role !== "energise");
    fit(blocks, total); addBreaks(blocks); fit(blocks, total);
    return blocks;
  }
  function addBreaks(blocks) { let run = 0; for (let i = 0; i < blocks.length; i++) { if (blocks[i].role === "breaks") { run = 0; continue; } run += blocks[i].mins; if (run >= 100 && i < blocks.length - 1 && blocks[i + 1].role !== "breaks") { blocks.splice(i + 1, 0, block("breaks")); run = 0; i++; } } }
  function fit(blocks, total) { const free = blocks.filter(x => !x.locked && x.role !== "breaks"); const fixed = blocks.filter(x => x.locked || x.role === "breaks").reduce((s, x) => s + x.mins, 0); const sum = free.reduce((s, x) => s + ROLES[x.role][2], 0) || 1; const k = Math.max(.5, (total - fixed) / sum); free.forEach(x => x.mins = Math.max(10, Math.round(ROLES[x.role][2] * Math.min(k, 2.2) / 5) * 5)); }
  const total = blocks => blocks.reduce((s, x) => s + x.mins, 0);
  function insights(b, blocks) {
    const out = [], roles = blocks.map(x => x.role), div = blocks.filter(x => ROLES[x.role][5] === "div").reduce((s, x) => s + x.mins, 0), conv = blocks.filter(x => ROLES[x.role][5] === "conv").reduce((s, x) => s + x.mins, 0);
    if (roles.includes("decide") && (!b.owner || b.owner === "No" || b.owner === "Not sure")) out.push({ sev: "high", t: "No decision owner for the final decision.", fix: "Name who decides, or call the output a recommendation." });
    if (b.owner === "Joins final part" && roles.includes("decide")) out.push({ sev: "mid", t: "The decision owner joins late.", fix: "Brief them on options and criteria before the Decide block." });
    if (roles.includes("evidence") && b.evidence && b.evidence.includes("Nothing yet")) out.push({ sev: "high", t: "The Evidence block has nothing to review.", fix: "Run a few customer interviews first, or swap it for Desk Research." });
    if (div > conv * 2 && div > 30) out.push({ sev: "mid", t: div + " minutes of divergence and only " + conv + " of convergence.", fix: "Add Criteria or Prioritise before deciding." });
    if (!roles.includes("decide") && !roles.includes("prioritise")) out.push({ sev: "mid", t: "The session ends without a choice.", fix: "Add a decision gate near the end." });
    let run = 0; blocks.forEach(x => { if (x.role === "breaks") run = 0; else { run += x.mins; } }); if (blocks.some((x, i) => { let r = 0; for (let j = i; j < blocks.length && blocks[j].role !== "breaks"; j++) r += blocks[j].mins; return r > 120; })) out.push({ sev: "mid", t: "More than two hours without a break.", fix: "Add a break." });
    const have = new Set(); blocks.forEach(x => { const R = ROLES[x.role]; const missing = R[3].filter(u => !have.has(u) && u !== "QUESTION"); if (missing.length && x.role !== "breaks") out.push({ sev: "mid", t: x.title + " needs " + missing.join(" + ").toLowerCase() + ", which no earlier block produces.", fix: "Move it later, or add a block that produces it." }); R[4].forEach(p => have.add(p)); });
    const n = { "11 to 20": 15, "20+": 24 }[b.people]; if (n) out.push({ sev: "mid", t: "With " + b.people + " people, whole-group discussion will stall.", fix: "Use 1-2-4-All and breakouts, and add a co-facilitator." });
    return out;
  }
  function stress(b, blocks) {
    const roles = blocks.map(x => x.role), T = MIN[b.time] || 210, t = total(blocks), r = [];
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
  function command(cmd, b, blocks, avail) {
    const ch = [], t = total(blocks), T = avail || MIN[b.time] || 210;
    if (cmd === "fit" || cmd === "cut60") { let need = cmd === "cut60" ? 60 : t - T; if (need <= 0) return { title: "Already fits", changes: [] };
      blocks.filter(x => !x.locked && x.role === "options" && blocks.filter(y => y.role === "options").length > 1).slice(1).forEach(x => { if (need > 0) { ch.push({ type: "remove", id: x.id, label: "Remove", what: x.title, why: "Second ideation round. One is enough at this length.", saved: x.mins }); need -= x.mins; } });
      blocks.filter(x => !x.locked && x.role === "landscape").forEach(x => { if (need > 0) { ch.push({ type: "async", id: x.id, label: "Move to pre-work", what: x.title, why: "Can be prepared before the session.", saved: x.mins }); need -= x.mins; } });
      blocks.filter(x => !x.locked && x.mins > 25 && x.role !== "decide").sort((a, b2) => b2.mins - a.mins).forEach(x => { if (need > 0) { const to = Math.max(15, x.mins - Math.min(need, Math.round(x.mins / 2 / 5) * 5)); ch.push({ type: "mins", id: x.id, label: "Compress", what: x.title + " " + x.mins + " to " + to + " min", to, why: "Keeps the step, tightens the timebox.", saved: x.mins - to }); need -= x.mins - to; } });
      return { title: (cmd === "cut60" ? "Cut 60 minutes" : (t - T) + " minutes need to come out"), changes: ch }; }
    if (cmd === "break") { const i = Math.max(1, Math.floor(blocks.length / 2)); return { title: "Add a break", changes: [{ type: "insert", at: i, role: "breaks", label: "Add", what: "Break, 10 min", why: "Attention drops after about 90 minutes.", saved: -10 }] }; }
    if (cmd === "decision") { const has = blocks.some(x => x.role === "decide"); return has ? { title: "A decision gate is already in place", changes: [] } : { title: "Add a decision gate", changes: [{ type: "insert", at: Math.max(0, blocks.length - 1), role: "decide", label: "Add", what: "Decide, 30 min", why: "Otherwise the session ends with a list, not a choice.", saved: -30 }] }; }
    if (cmd === "evidence") { const has = blocks.some(x => x.role === "evidence"); return has ? { title: "Evidence is already in the agenda", changes: [] } : { title: "Add customer evidence", changes: [{ type: "insert", at: 1, role: "evidence", label: "Add", what: "Evidence, 30 min", why: "Lets reality in before options are generated.", saved: -30 }] }; }
    if (cmd === "big") { const o = blocks.find(x => x.role === "options"); const it = find(["1-2-4-All"]); return { title: "Adapt for 20 people", changes: [o && it ? { type: "replace", id: o.id, ref: it.id, label: "Replace", what: o.title + " with " + it.title, why: "Every voice in, without a 20-person discussion.", saved: 0 } : null, { type: "note", label: "Add", what: "A co-facilitator and breakouts of 4 to 6", why: "One facilitator cannot hold 20 people in synthesis.", saved: 0 }].filter(Boolean) }; }
    if (cmd === "remote") return { title: "Make this remote", changes: [{ type: "note", label: "Change", what: "Shared board per block, cameras on for Decide", why: "Remote work needs one visible board and explicit turns.", saved: 0 }].concat(blocks.filter(x => x.role === "energise").map(x => ({ type: "remove", id: x.id, label: "Remove", what: x.title, why: "Physical energisers do not translate to video.", saved: x.mins }))).concat(blocks.filter(x => x.mins > 60).map(x => ({ type: "mins", id: x.id, to: 50, label: "Compress", what: x.title + " " + x.mins + " to 50 min", why: "Remote blocks over an hour lose people.", saved: x.mins - 50 }))) };
    if (cmd === "easy") return { title: "Make it easier to facilitate", changes: blocks.filter(x => { const it = x.ref && L().get(x.ref); return it && it.level === "advanced"; }).map(x => { const alt = alternatives(b, x).find(a => { const it = L().get(a.id); return it && it.level !== "advanced"; }); return alt ? { type: "replace", id: x.id, ref: alt.id, label: "Replace", what: x.title + " with " + alt.title, why: "Needs less facilitation experience.", saved: 0 } : null; }).filter(Boolean) };
    if (cmd === "halves") { const half = Math.floor(blocks.length / 2); return { title: "Turn into 2 half-days", changes: [{ type: "insert", at: half, role: "breaks", label: "Split", what: "Overnight break after " + blocks[half - 1].title, why: "Gives time to gather evidence between sessions.", saved: 0, split: true }] }; }
    return { title: "", changes: [] };
  }
  function apply(blocks, changes) { let out = blocks.map(x => Object.assign({}, x));
    changes.forEach(c => { if (c.type === "remove" || c.type === "async") out = out.filter(x => x.id !== c.id); else if (c.type === "mins") { const x = out.find(y => y.id === c.id); if (x) x.mins = c.to; } else if (c.type === "insert") { const nb = block(c.role); if (c.split) { nb.title = "Overnight break"; nb.mins = 0; } out.splice(c.at, 0, nb); } else if (c.type === "replace") { const x = out.find(y => y.id === c.id); const it = L().get(c.ref); if (x && it) { x.ref = it.id; x.title = it.title; } } });
    return out; }
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
  window.RDB = { ROLES, SHAPES, MIN, extract, extractAI, recommend, compose, fit, addBreaks, total, insights, stress, alternatives, command, apply, pack, agendaText, block };
})();
