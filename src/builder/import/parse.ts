// Reads pasted context (an AI conversation, notes, a brief, a PRD) and pulls out a workshop brief and,
// when there is one, an agenda. Pure functions with no browser or Library dependency, so a server-side
// connector can use them too. Heuristic by design: everything it finds is shown for review and editing.

export type ContextBrief = {
  problem: string;
  goal: string;
  situation: string;
  participants: string;
  constraints: string;
  decisions: string;
  evidence: string;
  assumptions: string;
  output: string;
  ideas: string;
};
export const BRIEF_FIELDS: { key: keyof ContextBrief; label: string; hint: string }[] = [
  { key: "problem", label: "Problem", hint: "What needs figuring out" },
  { key: "goal", label: "Goal", hint: "What the workshop should achieve" },
  { key: "situation", label: "Current situation", hint: "Where things stand now" },
  { key: "participants", label: "Participants", hint: "Who is in the room, who decides" },
  { key: "constraints", label: "Constraints", hint: "Time, format, budget, politics" },
  { key: "decisions", label: "Decisions needed", hint: "What must be decided" },
  { key: "evidence", label: "Known evidence", hint: "Research, data, interviews" },
  { key: "assumptions", label: "Assumptions", hint: "What is believed but unproven" },
  { key: "output", label: "Desired output", hint: "What exists at the end" },
  { key: "ideas", label: "Existing workshop ideas", hint: "Formats or methods already suggested" }
];
export const emptyBrief = (): ContextBrief => ({ problem: "", goal: "", situation: "", participants: "", constraints: "", decisions: "", evidence: "", assumptions: "", output: "", ideas: "" });

/** Facts the schedule and checks use directly. Values match the Builder's option lists. */
export type KeyFacts = { time?: string; people?: string; owner?: string; format?: string; outcome?: string; minutes?: number };

export type AgendaLine = { kind: "block" | "section" | "day"; title: string; mins: number; start?: string; zone?: "pre" | "live" | "after" };

export type ParsedContext = { brief: ContextBrief; facts: KeyFacts; agenda: AgendaLine[]; turns: number; title: string };

// ---------- helpers ----------
const clean = (s: string) => s.replace(/\*\*|__|`/g, "").replace(/^[\s>*#\-–—•·]+/, "").replace(/^\d+[.)]\s+/, "").replace(/\s+/g, " ").trim();
/** Lines that belong to an agenda rather than prose. */
const agendaLike = (l: string) => /^\s*[-*•]?\s*\d{1,2}[:.]\d{2}/.test(l) || (/^\s*(?:\d+[.)]|[-*•–])\s+/.test(l) && /\b\d{1,3}\s*(min|minutes|mins|h|hours?)\b/i.test(l)) || /^\s*\|/.test(l);
const firstSentences = (s: string, n = 2) => s.split(/(?<=[.?!])\s+/).slice(0, n).join(" ").trim();
const join = (a: string, b: string) => (a ? (b && !a.includes(b) ? a + "\n" + b : a) : b);

// Heading keywords → brief field. Order matters: first match wins.
const HEADINGS: [keyof ContextBrief, RegExp][] = [
  ["ideas", /\b(agenda|workshop (plan|design|structure|outline|format)|activities|exercises|session (plan|outline|flow)|run of show|proposed (workshop|session)|format)\b/i],
  ["decisions", /\b(decisions?( needed| to make)?|what (we|you) need to decide|key (choice|question)s?)\b/i],
  ["assumptions", /\b(assumptions?|hypothes[ie]s|unknowns|beliefs|risks? (and|&) unknowns)\b/i],
  ["evidence", /\b(evidence|research|data|insights?|findings|what we know|interviews?|signals)\b/i],
  ["participants", /\b(participants|attendees|who('s| is) (in the room|attending|involved)|people|audience|stakeholders|roles|team)\b/i],
  ["constraints", /\b(constraints?|limitations?|logistics|timing|time ?frame|budget|requirements)\b/i],
  ["output", /\b(outputs?|deliverables?|artifacts?|by the end|success (criteria|looks like)|desired outcome|outcomes?)\b/i],
  ["goal", /\b(goals?|objectives?|purpose|aims?|what (we|you) want)\b/i],
  ["problem", /\b(problem|challenge|core question|the question|issue|opportunity|why (this|now))\b/i],
  ["situation", /\b(context|background|current (state|situation)|situation|where (we|things) (are|stand)|overview|summary)\b/i]
];

// Sentence cues used when the text has no headings for a field.
const CUES: [keyof ContextBrief, RegExp][] = [
  ["problem", /\b(the (core |main |real )?(problem|challenge|question) (is|we)|we (are|'re) (struggling|stuck|unsure|not sure)|we don'?t know|can(no|')t agree|unclear (whether|which|how))\b/i],
  ["goal", /\b(the goal|our goal|we want to|we need to|aim is|objective is|trying to|so that we)\b/i],
  ["decisions", /\b(decide|decision|choose between|pick (one|a)|which (one|option|direction|market)|commit to)\b/i],
  ["evidence", /\b(\d+\s+(customer |user )?interviews|survey|analytics|data shows|research (shows|found)|we (heard|learned|found)|nps|churn)\b/i],
  ["assumptions", /\b(assum|we believe|we think|hypothes|might be true|unproven|bet that)\b/i],
  ["constraints", /\b(only (have|got)|limited|deadline|by (q[1-4]|end of)|budget|remote|in person|hybrid|half.?day|full.?day|\d+\s*(hours?|hrs?)\b)/i],
  ["participants", /\b(ceo|cto|cpo|founders?|leadership|exec(utive)?s?|product managers?|designers?|engineers?|researchers?|stakeholders|\d+\s+people|participants)\b/i],
  ["output", /\b(by the end|leave with|walk out with|output|deliverable|end up with|produce)\b/i],
  ["situation", /\b(currently|right now|today we|at the moment|so far|we have (been|built|launched))\b/i]
];

// ---------- conversation ----------
const SPEAKER = /^\s*(?:\*\*)?(you said|chatgpt said|chatgpt|claude|assistant|user|human|you|me|ai|gpt-?\d?\w*)(?:\*\*)?\s*:\s*/i;
/** Splits a pasted AI conversation into turns; plain text is one turn. */
export function splitTurns(text: string): { who: "user" | "ai" | "text"; text: string }[] {
  const lines = text.replace(/\r/g, "").split("\n"), out: { who: "user" | "ai" | "text"; text: string }[] = [];
  let cur: { who: "user" | "ai" | "text"; text: string } = { who: "text", text: "" };
  for (const ln of lines) {
    const m = ln.match(SPEAKER);
    if (m) {
      if (cur.text.trim()) out.push(cur);
      const w = m[1].toLowerCase();
      cur = { who: /^(you|you said|user|human|me)$/.test(w) ? "user" : "ai", text: ln.slice(m[0].length) + "\n" };
    } else cur.text += ln + "\n";
  }
  if (cur.text.trim()) out.push(cur);
  return out;
}

// ---------- agenda ----------
const TIME = /(\d{1,2})[:.](\d{2})\s*(am|pm)?/i;
const RANGE = /^\s*(\d{1,2}[:.]\d{2}\s*(?:am|pm)?)\s*(?:[-–—to]+\s*(\d{1,2}[:.]\d{2}\s*(?:am|pm)?))?\s*[|:\-–—·)]*\s*/i;
const DUR = /\(?\b(\d{1,3})\s*(?:-\s*\d{1,3}\s*)?(min(?:ute)?s?|m\b|h(?:ou)?rs?|h\b)\)?/i;
const toMin = (s: string) => {
  const m = s.match(TIME);
  if (!m) return null;
  let h = +m[1];
  const ap = (m[3] || "").toLowerCase();
  if (ap === "pm" && h < 12) h += 12;
  if (ap === "am" && h === 12) h = 0;
  return h * 60 + +m[2];
};
const durOf = (s: string) => {
  const m = s.match(DUR);
  if (!m) return null;
  return /^h/i.test(m[2]) ? +m[1] * 60 : +m[1];
};
const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (m: number) => pad(Math.floor(m / 60) % 24) + ":" + pad(m % 60);

/**
 * Finds agenda lines: "9:00 Welcome", "09:15–09:45 Hopes and Fears", "| 10:30 | Break | 15 min |",
 * "1. Journey mapping (45 min)", "- Note & Vote — 20 minutes", plus "Day 2" and section headings
 * inside an agenda. Durations come from the line, or from the gap to the next start time.
 */
export function parseAgenda(text: string): AgendaLine[] {
  const rows: (AgendaLine & { t?: number; t2?: number; explicit?: boolean })[] = [];
  const lines = text.replace(/\r/g, "").split("\n");
  let inAgenda = false, gapRun = 0;
  for (let raw of lines) {
    if (raw.includes("|")) raw = raw.split("|").map(c => c.trim()).filter(Boolean).join(" · ");
    const line = raw.replace(/\*\*|__/g, "").trim();
    if (!line) { if (inAgenda && ++gapRun > 2) inAgenda = false; continue; }
    gapRun = 0;
    if (/^[-:\s·|]+$/.test(line)) continue;
    const day = line.match(/^#*\s*day\s*(\d+)\b/i);
    if (day) { if (rows.length || +day[1] > 1) rows.push({ kind: "day", title: "Day " + day[1], mins: 0 }); inAgenda = true; continue; }
    const r = line.replace(/^[\s>*\-–—•]+/, "").match(RANGE);
    const body0 = r ? line.replace(/^[\s>*\-–—•]+/, "").slice(r[0].length) : "";
    if (r && TIME.test(r[1]) && body0 && !/^\d/.test(body0)) {
      let body = body0.replace(/\s*·\s*/g, " · ");
      const d = durOf(body);
      body = body.replace(DUR, "").replace(/\s*[·|,]\s*$/g, "").replace(/\(\s*\)/g, "");
      const title = clean(body.split(/\s+[·]\s+|\s+[-–—]\s+(?=[A-Z(])|:\s+(?=[A-Z])/)[0]) || clean(body);
      if (!title) continue;
      rows.push({ kind: "block", title, mins: d || 0, t: toMin(r[1]) ?? undefined, t2: r[2] ? toMin(r[2]) ?? undefined : undefined, explicit: !!d });
      inAgenda = true;
      continue;
    }
    // Untimed list item with a duration: "1. Journey mapping (45 min)", "- Note & Vote — 20 minutes".
    const li = line.match(/^(?:\d+[.)]|[-*•–])\s+(.+)$/);
    if (li && DUR.test(li[1]) && li[1].length < 140) {
      const d = durOf(li[1])!, title = clean(li[1].replace(DUR, "").replace(/[\s:–—\-·,]+$/g, "").split(/\s+[–—-]\s+|:\s+/)[0]);
      if (title && d > 0 && d <= 600) { rows.push({ kind: "block", title, mins: d, explicit: true }); inAgenda = true; continue; }
    }
    // Section heading inside an agenda ("Part 2: Decide", "## Create").
    if (inAgenda && /^(#{1,4}\s+|part\s+\d+|phase\s+\d+|stage\s+\d+)/i.test(line) && line.length < 60) {
      const t = clean(line.replace(/^(part|phase|stage)\s+\d+\s*[:.\-–—]?\s*/i, ""));
      if (t) rows.push({ kind: "section", title: t, mins: 0 });
    }
  }
  // Fill durations from the next start time, then from end times.
  const blocks = rows.filter(x => x.kind === "block");
  blocks.forEach((x, i) => {
    if (x.explicit) return;
    if (x.t != null && x.t2 != null && x.t2 > x.t) { x.mins = x.t2 - x.t; return; }
    const nx = blocks[i + 1];
    if (x.t != null && nx && nx.t != null && nx.t > x.t) x.mins = nx.t - x.t;
  });
  blocks.forEach(x => { if (!x.mins || x.mins > 600) x.mins = /break|coffee/i.test(x.title) ? 15 : /lunch/i.test(x.title) ? 45 : 15; });
  // Drop trailing sections and lone day markers; a list with fewer than 3 blocks is not an agenda.
  while (rows.length && rows[rows.length - 1].kind !== "block") rows.pop();
  if (blocks.length < 3) return [];
  return rows.map(x => ({ kind: x.kind, title: x.title, mins: x.mins, ...(x.t != null ? { start: hhmm(x.t) } : {}) }));
}

// ---------- facts ----------
export function keyFacts(text: string): KeyFacts {
  const t = " " + text.toLowerCase() + " ", f: KeyFacts = {};
  const hours = t.match(/\b(\d(?:\.\d)?)\s*-?\s*(?:hours?|hrs?|h)\b(?! (?:ago|later))/);
  if (/\b(half[- ]?day|4[- ]?hours?|morning session|afternoon session)\b/.test(t)) { f.time = "Half day"; f.minutes = 210; }
  else if (/\b(full[- ]?day|one[- ]day|1[- ]day|all[- ]day)\b/.test(t)) { f.time = "1 day"; f.minutes = 390; }
  else if (/\b(two[- ]day|2[- ]day|2 days|two days)\b/.test(t)) { f.time = "2 days"; f.minutes = 780; }
  else if (/\b(90[- ]?min|90 minutes|hour and a half|1\.5 hours?)\b/.test(t)) { f.time = "90 min"; f.minutes = 90; }
  else if (hours) { const h = +hours[1]; f.minutes = Math.round(h * 60); f.time = h <= 1.5 ? "90 min" : h <= 4.5 ? "Half day" : "1 day"; }
  const words: Record<string, number> = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, fifteen: 15, twenty: 20 };
  const pm = t.match(/\b(\d{1,3}|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty)\s+(?:[a-z-]+\s+){0,2}?(people|participants|attendees|leaders|execs|founders|stakeholders|of us|team members|pms|designers)\b/);
  if (pm) { const n = /\d/.test(pm[1]) ? +pm[1] : words[pm[1]]; f.people = n <= 1 ? "1" : n <= 5 ? "2 to 5" : n <= 10 ? "6 to 10" : n <= 20 ? "11 to 20" : "20+"; }
  if (/\b(ceo|founder|cpo|vp|head of|decision[- ]?maker|decision owner|decider|makes the (final )?call)\b/.test(t)) f.owner = /\b(join(s|ing)? (for )?(the )?(last|final|end)|only (for|at) the end|drops? in)\b/.test(t) ? "Joins final part" : "Yes";
  if (/\b(remote|zoom|google meet|teams call|online|virtual|distributed)\b/.test(t)) f.format = "Remote"; else if (/\bhybrid\b/.test(t)) f.format = "Hybrid"; else if (/\b(in[- ]person|offsite|on[- ]?site|in the room|workshop room)\b/.test(t)) f.format = "In person";
  if (/\b(decide|decision|choose|pick one|which (direction|option|market)|directions|final call)\b/.test(t)) f.outcome = /\bdirections?|strategy\b/.test(t) ? "Direction" : "Decision";
  else if (/\b(align|alignment|agree on|shared understanding)\b/.test(t)) f.outcome = "Alignment";
  else if (/\b(prioriti[sz]e|priorities|roadmap)\b/.test(t)) f.outcome = "Priorities";
  else if (/\b(ideas?|brainstorm|ideate|concepts?)\b/.test(t)) f.outcome = "Ideas";
  else if (/\b(synthesi[sz]e|make sense of|interviews|research)\b/.test(t)) f.outcome = "Research evidence";
  return f;
}

// ---------- brief ----------
/** Splits text into (heading, body) blocks. Headings: markdown, bold lines, short "Label:" lines. */
function sections(text: string): { head: string; body: string }[] {
  const out: { head: string; body: string }[] = [];
  let cur = { head: "", body: "" };
  for (const ln of text.replace(/\r/g, "").split("\n")) {
    const s = ln.trim();
    const md = s.match(/^#{1,6}\s+(.+)$/), bold = s.match(/^\*\*([^*]{2,60})\*\*:?\s*$/), label = s.match(/^\*{0,2}([A-Z][A-Za-z /&'’-]{2,40})\*{0,2}:\s*(.*)$/);
    if (md || bold) { if (cur.head || cur.body.trim()) out.push(cur); cur = { head: (md ? md[1] : bold![1]).replace(/[*:]/g, "").trim(), body: "" }; continue; }
    if (label && HEADINGS.some(([, re]) => re.test(label[1]))) { if (cur.head || cur.body.trim()) out.push(cur); cur = { head: label[1], body: label[2] ? label[2] + "\n" : "" }; continue; }
    cur.body += ln + "\n";
  }
  if (cur.head || cur.body.trim()) out.push(cur);
  return out;
}

const tidy = (s: string, max = 600) => {
  const lines = s.split("\n").map(l => clean(l)).filter(Boolean);
  const t = lines.join("\n");
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, "") + "…" : t;
};

export function parseContext(text: string): ParsedContext {
  const turns = splitTurns(text), brief = emptyBrief();
  // Prefer what the person wrote for problem and goal; the AI's replies for structure.
  const userText = turns.filter(t => t.who === "user").map(t => t.text).join("\n");
  const all = turns.map(t => t.text).join("\n");

  for (const sec of sections(all)) {
    const field = HEADINGS.find(([, re]) => re.test(sec.head))?.[0];
    if (!field || !sec.body.trim()) continue;
    const body = field === "ideas" ? sec.body : sec.body.split("\n").filter(l => !agendaLike(l)).join("\n");
    if (body.trim()) brief[field] = join(brief[field], tidy(body));
  }
  const pool = (t: string) => t.split("\n").filter(l => !agendaLike(l) && !/^\W*(workshop |session |proposed )?agenda\b/i.test(l.trim())).join(" ").split(/(?<=[.?!])\s+/).map(s => clean(s)).filter(s => s.length > 12 && s.length < 300 && !/\?$/.test(s) || /\b(which|whether|should we)\b/i.test(s));
  const sentences = pool(userText || all), allSentences = pool(all);
  for (const [field, re] of CUES) {
    if (brief[field]) continue;
    const used = (s: string) => Object.values(brief).some(v => v.includes(s));
    const src = sentences.some(s => re.test(s) && !used(s)) ? sentences : allSentences;
    const i = src.findIndex(s => re.test(s) && !used(s));
    if (i < 0) continue;
    // A short hit ("Leadership can't agree.") reads better with the sentence before it.
    const hit = src[i].length < 60 && i > 0 && !Object.values(brief).some(v => v.includes(src[i - 1])) ? src[i - 1] + " " + src[i] : src[i];
    const next = src.slice(i + 1).find(s => re.test(s) && !used(s));
    brief[field] = field === "problem" || field === "goal" ? hit : [hit, next].filter(Boolean).join(" ");
  }
  if (!brief.decisions && /\b(choose|decide|pick|select|commit to)\b/i.test(brief.goal)) brief.decisions = brief.goal;
  if (!brief.problem && userText) brief.problem = firstSentences(clean(userText.split("\n").find(l => l.trim().length > 20) || ""), 2);
  if (!brief.problem && !brief.goal && allSentences[0] && !/\bagenda\b/i.test(allSentences[0])) brief.problem = firstSentences(allSentences[0], 1);

  const agenda = parseAgenda(all);
  if (agenda.length) brief.ideas = agenda.filter(a => a.kind === "block").map(a => a.title).join(", ");
  // The person's own words win over what an assistant suggested ("…adapt this for remote").
  const facts = { ...keyFacts(all), ...stripEmpty(keyFacts(userText)) };
  const title = deriveTitle(all, brief, facts);
  return { brief, facts, agenda, turns: turns.filter(t => t.who !== "text").length, title };
}

const stripEmpty = <T extends object>(o: T): Partial<T> => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null && v !== "")) as Partial<T>;

function deriveTitle(text: string, b: ContextBrief, f: KeyFacts): string {
  const h = text.match(/^#\s+(.{4,70})$/m) || text.match(/^\*\*([^*]{4,60}workshop[^*]{0,20})\*\*/im) || text.match(/\b([A-Z][\w-]*(?:\s+[A-Z][\w-]*){0,4}\s+(?:Workshop|Sprint|Offsite|Session))\b/);
  if (h) return clean(h[1]);
  const topic = (b.goal + " " + b.problem).toLowerCase();
  const kind = f.time === "90 min" ? "Session" : "Workshop";
  const T: [RegExp, string][] = [[/position|messag/, "Positioning"], [/strateg|direction/, "Product Strategy"], [/align/, "Alignment"], [/priorit|roadmap/, "Prioritisation"], [/research|interview|synthes/, "Research Synthesis"], [/pricing/, "Pricing"], [/onboard/, "Onboarding"], [/\bai\b/, "AI Opportunity"], [/retro/, "Retrospective"]];
  const m = T.find(([re]) => re.test(topic));
  return (m ? m[1] : "Strategy") + " " + kind;
}

/** What is still missing for a good workshop design. */
export function missingInformation(b: ContextBrief, f: KeyFacts): string[] {
  const m: string[] = [];
  if (!b.goal && !b.problem) m.push("What the workshop is for");
  if (!f.time) m.push("How much time there is");
  if (!f.people && !b.participants) m.push("Who will be in the room");
  if (!f.owner && /decision|direction|decide/i.test(b.goal + b.problem + b.decisions)) m.push("Who makes the final decision");
  if (!b.output) m.push("What should exist at the end");
  return m;
}
