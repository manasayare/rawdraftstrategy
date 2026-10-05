// Suggestions: an experienced facilitator reading the agenda beside you. Deterministic rules over the
// workshop, its context and the Library's structured data (roles, what methods use and make, durations,
// group sizes, delivery, preparation). Rules never change the workshop; they return actions, and any
// action that edits the agenda goes through a previewed proposal.
import { RDB, RDL, libraryItems, type LibItem } from "../engine";
import { mins } from "../items";
import { knownTime } from "../library";
import { hm } from "../time";
import type { Brief, Change, Item, Proposal, Workshop, WorkshopContext } from "../types";

export type Level = "attention" | "improve" | "optional";
export const LEVEL_LABEL: Record<Level, string> = { attention: "NEEDS ATTENTION", improve: "COULD IMPROVE", optional: "OPTIONAL" };

export type SAction =
  | { kind: "propose"; label: string; proposal: Proposal }
  | { kind: "command"; label: string; cmd: string; n?: number }
  | { kind: "context"; label: string }
  | { kind: "brief"; label: string; key: keyof Brief; value: unknown }
  | { kind: "alts"; label: string; id: string }
  | { kind: "methods"; label: string; stage: string }
  | { kind: "open"; label: string; id: string };

export type Suggestion = {
  /** Stable per rule (and block), used for dismissal. */
  id: string;
  level: Level;
  title: string;
  text: string;
  why?: string;
  /** Block the suggestion is about, for the inline indicator. */
  at?: string;
  /** Few-word inline label. */
  short?: string;
  actions: SAction[];
  /** What the suggestion depends on. A dismissal holds until this changes. */
  sig: string;
  /** Shown only on the block, because a combined card in the panel covers it. */
  inlineOnly?: boolean;
};

export type RuleInput = { items: Item[]; brief: Brief; context?: WorkshopContext | null; start: number; total: number; nDays: number; avail: number | null; history: Workshop[]; currentId?: string | null };

// ---------- helpers ----------
const BIG = ["11 to 20", "20+"], SMALL = ["1", "2 to 5"];
const PEOPLE_SIZES: Record<string, string[]> = { "1": ["solo"], "2 to 5": ["2-4", "5-8"], "6 to 10": ["5-8", "9-15"], "11 to 20": ["9-15", "16-30"], "20+": ["16-30", "30+"] };
const r5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);
const roleOf = (x: Item) => (x.role && RDB().ROLES[x.role] ? x.role : "custom");
const R = (role: string) => RDB().ROLES[role] || RDB().ROLES.custom;
const kindOf = (x: Item) => R(roleOf(x))[5];
const energyOf = (x: Item) => R(roleOf(x))[6];
const isBreak = (x: Item) => x.role === "breaks" || x.role === "energise";
const TOK: Record<string, string> = { QUESTION: "a question", EVIDENCE: "research evidence", PATTERNS: "synthesised patterns", OPTIONS: "options", ASSUMPTIONS: "assumptions", CRITERIA: "evaluation criteria", PRIORITIES: "priorities", DECISION: "a decision", TESTPLAN: "a test plan", ACTIONS: "next actions" };
const PRODUCER: Record<string, string> = { EVIDENCE: "evidence", PATTERNS: "sense", OPTIONS: "options", ASSUMPTIONS: "assumptions", CRITERIA: "criteria", PRIORITIES: "prioritise", DECISION: "decide", TESTPLAN: "test", ACTIONS: "commit" };
const ROLE_NOUN: Record<string, string> = { evidence: "evidence review", sense: "synthesis", options: "ideation", assumptions: "assumption step", criteria: "criteria step", prioritise: "prioritisation step", decide: "decision step", test: "test plan", commit: "next-actions step" };

/** A Library method for a role: its best-known candidate that exists, not already used. */
export function methodFor(role: string, used: Set<string> = new Set()): LibItem | undefined {
  const pool = libraryItems();
  for (const t of R(role)[1]) {
    const it = pool.find(x => x.title.toLowerCase() === t.toLowerCase());
    if (it && !used.has(it.id)) return it;
  }
  return undefined;
}
const insertOf = (it: LibItem, anchor: string | null, zone: Item["zone"] = "live", m?: number): Change => {
  const role = RDB().roleOf(it), mm = m || RDB().minsOf(it);
  return { type: "insert", anchor, item: { kind: "block", zone, role, ref: it.id, title: it.title, mins: mm }, label: "Add", why: "", saved: -mm };
};
const P = (title: string, changes: Change[], sub?: string): Proposal => ({ title, sub, changes });

// ---------- rules ----------
export function suggestions(inp: RuleInput): Suggestion[] {
  const { items, brief: b, context, total, nDays, avail } = inp, out: Suggestion[] = [];
  const live = items.filter(x => x.zone === "live" && x.kind === "block");
  if (!live.length) return out;
  const pre = items.filter(x => x.zone === "pre" && x.kind === "block");
  const used = new Set(items.map(x => x.ref || "").filter(Boolean));
  const ctxB = context?.brief;
  const people = b.people || "", big = BIG.includes(people), small = SMALL.includes(people);
  const roles = live.map(roleOf);
  const has = (...rs: string[]) => roles.some(r => rs.includes(r));
  const lastLiveId = (pred: (x: Item) => boolean) => [...live].reverse().find(pred)?.id;
  const afterId = (id?: string) => { if (!id) return null; const i = items.findIndex(x => x.id === id); const nx = items.slice(i + 1).find(x => x.zone === "live"); return nx ? nx.id : null; };
  const firstId = (pred: (x: Item) => boolean) => live.find(pred)?.id;
  const evidenceText = [ctxB?.evidence || "", (b.evidence || []).filter(e => e !== "Nothing yet").join(", ")].filter(Boolean).join(" · ");
  const evidenceAvailable = !!evidenceText;
  const outcome = b.outcome || "";
  const decisionNeeded = /Decision|Direction|Strategy/.test(outcome) || !!ctxB?.decisions?.trim() || has("decide");

  // 1. Time over what's available, and optional blocks that could go.
  if (avail && nDays === 1 && total > avail) {
    const over = total - avail, optional = live.filter(x => x.priority === "optional");
    const longest = [...live].filter(x => !isBreak(x)).sort((a, c) => mins(c) - mins(a))[0];
    const next = ["90 min", "Half day", "1 day", "2 days"].find(t => (RDB().MIN[t] || 0) >= total);
    out.push({
      id: "over", level: "attention", title: over + " min over available time", text: `The agenda is ${hm(total)} for ${hm(avail)} available.`,
      actions: [
        { kind: "command", label: "Fit to time", cmd: "fit" },
        ...(optional.length ? [{ kind: "propose" as const, label: "Drop optional blocks", proposal: P("Drop optional blocks", optional.map(x => ({ type: "remove" as const, id: x.id, label: "Remove", why: "Marked optional.", saved: mins(x) }))) }] : []),
        ...(!optional.length && longest ? [{ kind: "propose" as const, label: `Shorten ${longest.title} by ${Math.min(r5(over), mins(longest) - 5)} min`, proposal: P("Shorten " + longest.title, [{ type: "mins", id: longest.id, to: mins(longest) - Math.min(r5(over), mins(longest) - 5), label: "Compress", why: "The longest activity absorbs the overrun.", saved: Math.min(r5(over), mins(longest) - 5) }]) }] : []),
        ...(next && next !== b.time ? [{ kind: "brief" as const, label: "Change available time to " + next, key: "time" as const, value: next }] : [])
      ],
      sig: String(Math.ceil(over / 10))
    });
  }

  // 2. No stated outcome.
  if (!outcome && !ctxB?.goal && !b.question) out.push({ id: "outcome", level: "improve", title: "No stated outcome", text: "Builder can't check whether the agenda gets you there without knowing what should exist at the end.", actions: [{ kind: "context", label: "Set outcome" }], sig: "" });

  // 3–4. Decision quality.
  if (decisionNeeded) {
    if (!has("decide")) {
      const it = methodFor("decide", used), anchor = afterId(lastLiveId(x => ["options", "prioritise", "criteria", "assumptions", "sense"].includes(roleOf(x)))) ?? firstId(x => roleOf(x) === "commit") ?? null;
      out.push({
        id: "decide-step", level: "attention", title: "Missing decision step",
        text: has("options", "prioritise") ? "You generate and narrow options, but the workshop never explicitly chooses one." : "The outcome is a decision, but no activity makes it.",
        actions: [...(it ? [{ kind: "propose" as const, label: "Add decision step", proposal: P("Add a decision step", [{ ...insertOf(it, anchor), why: "An explicit moment where the decider chooses, so the session ends with a decision." }]) }] : []), { kind: "methods", label: "Show methods", stage: "decide" }],
        sig: roles.join(",")
      });
    }
    if (!b.owner || b.owner === "Not sure") out.push({ id: "owner", level: "attention", title: "No decision owner", text: "Nobody is named as able to make the final call.", why: "Without one, the session ends with a recommendation rather than a decision.", at: firstId(x => roleOf(x) === "decide"), short: "No decider", actions: [{ kind: "context", label: "Set decision owner" }], sig: b.owner || "" });
    else if (b.owner === "No") out.push({ id: "owner", level: "attention", title: "Decider not in the room", text: "The person who decides won't attend, so the group can only recommend.", at: firstId(x => roleOf(x) === "decide"), short: "Decider absent", actions: [{ kind: "brief", label: "They'll join the final part", key: "owner", value: "Joins final part" }, { kind: "context", label: "Change decision owner" }], sig: "No" });
    if (has("decide") && !has("criteria", "prioritise")) {
      const dec = live.find(x => roleOf(x) === "decide")!, it = methodFor("criteria", used);
      if (/matrix|weighted|criteria/i.test(dec.title || "")) out.push({ id: "criteria:" + dec.id, level: "attention", title: dec.title + " needs criteria", text: `${dec.title} needs evaluation criteria. Add a step to define them first.`, at: dec.id, short: "Needs criteria", actions: [...(it ? [{ kind: "propose" as const, label: "Add criteria activity", proposal: P("Add criteria first", [{ ...insertOf(it, dec.id), why: "Options are scored against criteria agreed before anyone sees the scores." }]) }] : []), { kind: "alts", label: "Show alternatives", id: dec.id }], sig: dec.id });
    }
    if (!evidenceAvailable && !has("evidence", "sense", "landscape")) out.push({ id: "decision-evidence", level: "optional", title: "Decision without evidence", text: "Nothing in the context or agenda brings outside evidence into the decision.", actions: [...(methodFor("evidence", used) ? [{ kind: "propose" as const, label: "Add evidence review", proposal: P("Add evidence review", [{ ...insertOf(methodFor("evidence", used)!, firstId(x => ["options", "criteria", "decide", "prioritise", "assumptions"].includes(roleOf(x))) ?? null), why: "Reality enters before options are judged." }]) }] : []), { kind: "brief", label: "Mark evidence as available", key: "evidence", value: ["Customer research"] }], sig: roles.join(",") });
  }

  // 5. Inputs and outputs: does each method have what it needs from earlier steps?
  const have = new Set(["QUESTION"]);
  pre.forEach(x => R(roleOf(x))[4].forEach(t => have.add(t)));
  if (evidenceAvailable) have.add("EVIDENCE");
  const reported = new Set<string>();
  // Clusters from synthesis can be voted on, so patterns count as options.
  const satisfied = (k: string) => have.has(k) || (k === "OPTIONS" && have.has("PATTERNS"));
  live.forEach(x => {
    const role = roleOf(x);
    if (role !== "custom" && !isBreak(x)) {
      const miss = R(role)[3].filter(u => u !== "QUESTION" && !u.split("|").some(satisfied) && !reported.has(u));
      miss.forEach(u => reported.add(u));
      miss.slice(0, 1).forEach(u => {
        const tok = u.split("|")[0], prodRole = PRODUCER[tok], it = prodRole ? methodFor(prodRole, used) : undefined;
        const acts: SAction[] = [];
        if (it) acts.push({ kind: "propose", label: "Add " + (ROLE_NOUN[prodRole] || it.title) + " before it", proposal: P("Add " + it.title, [{ ...insertOf(it, x.id), why: `Produces ${TOK[tok]} for ${x.title}.` }]) });
        if (tok === "EVIDENCE") acts.push({ kind: "brief", label: "Mark evidence as available", key: "evidence", value: ["Customer research"] }, { kind: "propose", label: "Move to another workshop", proposal: P("Move " + x.title + " out", [{ type: "zone", id: x.id, to: "after", label: "Move", why: "Run it once the evidence exists.", saved: mins(x) }]) });
        else acts.push({ kind: "alts", label: "Show alternatives", id: x.id });
        out.push({ id: "input:" + x.id + ":" + tok, level: ["decide", "prioritise"].includes(role) ? "attention" : "improve", title: x.title + " is missing " + TOK[tok], text: `${x.title} expects ${TOK[tok]}, but nothing earlier in the workshop${tok === "EVIDENCE" ? " or in the context" : ""} provides it.`, at: x.id, short: "Missing input", actions: acts, sig: x.id + ":" + [...have].sort().join(",") });
      });
      R(role)[4].forEach(t => have.add(t));
    }
  });

  // 6. Evidence available but never used.
  if (evidenceAvailable && !has("evidence", "sense", "landscape")) {
    const ev = methodFor("evidence", used), se = methodFor("sense", used), anchor = firstId(x => ["options", "assumptions", "criteria", "prioritise", "decide"].includes(roleOf(x))) ?? null;
    out.push({
      id: "evidence-unused", level: "improve", title: "Evidence available but unused", text: `The context mentions ${evidenceText.length > 90 ? evidenceText.slice(0, 88) + "…" : evidenceText}, but no activity works with it.`,
      actions: [...(ev ? [{ kind: "propose" as const, label: "Add " + ev.title, proposal: P("Add " + ev.title, [{ ...insertOf(ev, anchor), why: "Puts what you already know in front of the group before they generate or judge options." }]) }] : []), ...(se ? [{ kind: "propose" as const, label: "Add " + se.title, proposal: P("Add " + se.title, [{ ...insertOf(se, anchor), why: "Turns raw research into shared patterns." }]) }] : [])],
      sig: roles.join(",")
    });
  }

  // 7. Duration for the group, whole-group discussion with many people, and methods sized for other groups.
  const sizeMisfits: Item[] = [];
  live.forEach(x => {
    if (isBreak(x) || !x.ref) return;
    const it = RDL().get(x.ref);
    if (!it) return;
    const rec = knownTime(it) ? RDB().minsOf(it) : 0, m = mins(x), part = ["sense", "decide", "prioritise", "landscape", "assumptions", "criteria"].includes(roleOf(x));
    // Bigger groups need more time to gather and discuss contributions, within reason.
    const lo = Math.max(rec, Math.min(r5(rec * 1.3), rec + 15)), hi = Math.max(lo, Math.min(r5(rec * 1.7), rec + 30));
    if (rec && big && part && x.cfg.mode !== "Small group" && m < lo) {
      out.push({ id: "tight:" + x.id, level: "improve", title: "Timing may be tight", text: `${x.title} is ${m} minutes for ${people} people. Consider ${lo === hi ? lo : lo + "–" + hi} minutes, or smaller groups.`, at: x.id, short: "Timing may be tight",
        actions: [{ kind: "propose", label: "Change to " + lo + " min", proposal: P(x.title + " to " + lo + " min", [{ type: "mins", id: x.id, to: lo, label: "Extend", why: "More people means more contributions to gather and discuss.", saved: m - lo }]) }, { kind: "propose", label: "Use breakouts", proposal: P(x.title + " in small groups", [{ type: "cfg", id: x.id, key: "mode", val: "Small group", label: "Change", what: x.title + " · small groups of 4 to 6", why: "Groups work in parallel, so the time holds.", saved: 0 }]) }], sig: m + "|" + people + "|" + (x.cfg.mode || "") });
    } else if (rec && m < rec * 0.6) {
      out.push({ id: "short:" + x.id, level: "optional", title: "Shorter than usual", text: `${x.title} usually takes about ${rec} minutes; it has ${m}.`, at: x.id, short: "Short", actions: [{ kind: "propose", label: "Change to " + rec + " min", proposal: P(x.title + " to " + rec + " min", [{ type: "mins", id: x.id, to: rec, label: "Extend", why: "The Library's usual length for this method.", saved: m - rec }]) }], sig: String(m) });
    }
    const sizes = (it.sizes || []).filter(s => s !== "variable");
    if (sizes.length && people && !(big && x.cfg.mode === "Small group") && !sizes.some(s => (PEOPLE_SIZES[people] || []).includes(s))) {
      const bigger = small;
      sizeMisfits.push(x);
      out.push({ inlineOnly: true, id: "size:" + x.id, level: "improve", title: bigger ? "Designed for larger groups" : "Designed for smaller groups", text: `${x.title} is designed for groups of ${sizes.join(", ").replace(/-/g, "–")}. With ${people} people ${bigger ? "a smaller discussion format may work better" : "split into breakouts or choose a method built for scale"}.`, at: x.id, short: "Group size", actions: [{ kind: "alts", label: "Show better fits", id: x.id }], sig: people });
    }
  });
  if (sizeMisfits.length > 1) {
    const names = sizeMisfits.map(x => x.title).join(", ");
    out.push({ id: "size-all", level: "improve", title: small ? "Methods built for larger groups" : "Methods built for smaller groups", text: `${sizeMisfits.length} activities suit a different group size than ${people} people: ${names}.`,
      actions: [...(!small ? [{ kind: "propose" as const, label: "Use breakouts for all", proposal: P("Run them in breakouts", sizeMisfits.map(x => ({ type: "cfg" as const, id: x.id, key: "mode", val: "Small group", label: "Change", what: x.title + " · groups of 4 to 6", why: "Each group stays at the size the method was built for.", saved: 0 }))) }] : []), { kind: "alts", label: "Better fit for " + sizeMisfits[0].title, id: sizeMisfits[0].id }], sig: people + "|" + sizeMisfits.map(x => x.id).join(",") });
  } else sizeMisfits.forEach(x => { const s = out.find(o => o.id === "size:" + x.id); if (s) s.inlineOnly = false; });
  live.forEach(x => {
    if (big && mins(x) >= 30 && (x.cfg.mode === "Whole group" || (/discussion|debate|plenary/i.test(x.title || "") && x.cfg.mode !== "Small group"))) out.push({ id: "plenary:" + x.id, level: "improve", title: "Large whole-group discussion", text: `Whole-group discussion with ${people} people for ${mins(x)} minutes may limit participation.`, at: x.id, short: "Large group", actions: [{ kind: "propose", label: "Use breakouts", proposal: P(x.title + " in breakouts", [{ type: "cfg", id: x.id, key: "mode", val: "Small group", label: "Change", what: x.title + " · breakouts of 4 to 6, then report back", why: "Everyone speaks; the room hears the summary.", saved: 0 }]) }, { kind: "alts", label: "Replace activity", id: x.id }], sig: people + "|" + mins(x) + "|" + (x.cfg.mode || "") });
  });

  // 8. Breaks and load: long continuous stretches, and demanding activities back to back.
  if (total > 120) {
    let run = 0, flagged = false;
    items.forEach(x => {
      if (flagged || x.zone !== "live") return;
      if (x.kind === "day" || (x.kind === "block" && isBreak(x))) { run = 0; return; }
      if (x.kind !== "block") return;
      if (run + mins(x) > 110 && run >= 60) {
        flagged = true;
        const remaining = live.slice(live.indexOf(x)).reduce((s, y) => s + mins(y), 0);
        out.push({ id: "break:" + x.id, level: "improve", title: "Break recommended", text: `By the end of ${x.title} the group will have worked ${hm(run + mins(x))} without a break${remaining - mins(x) > 0 ? ", with " + hm(remaining - mins(x)) + " still to go" : ""}.`, at: x.id, short: "Break due",
          actions: [{ kind: "propose", label: "Add 10-minute break before it", proposal: P("Add a break", [{ type: "insert", anchor: x.id, item: { kind: "block", zone: "live", role: "breaks", title: "Break", mins: 10 }, label: "Add", why: "Attention drops after about 90 minutes of continuous work.", saved: -10 }]) }], sig: String(Math.round(run / 15)) });
      }
      run += mins(x);
    });
  }
  if (total > 120) {
    let streak: Item[] = [];
    for (const x of live) {
      if (isBreak(x)) { streak = []; continue; }
      if (energyOf(x) >= 2) streak.push(x); else streak = [];
      if (streak.length === 3) {
        const third = streak[2], light = methodFor("energise", used);
        out.push({ id: "load:" + third.id, level: "improve", title: "Three demanding activities in a row", text: `${streak.map(s => s.title).join(", ")} run back to back with no reset.`, why: "Both the group and the facilitator tire; the third one gets the least.", at: third.id, short: "No reset",
          actions: [{ kind: "propose", label: "Add break", proposal: P("Add a break", [{ type: "insert", anchor: third.id, item: { kind: "block", zone: "live", role: "breaks", title: "Break", mins: 10 }, label: "Add", why: "A short reset before the third demanding block.", saved: -10 }]) }, ...(light ? [{ kind: "propose" as const, label: "Insert lighter activity", proposal: P("Insert " + light.title, [{ ...insertOf(light, third.id), why: "A short energiser resets attention without a full break." }]) }] : [])], sig: streak.map(s => s.id).join(",") });
        break;
      }
    }
  }

  // 9. Divergence versus convergence.
  {
    const opts = live.filter(x => roleOf(x) === "options"), narrowRoles = ["sense", "criteria", "prioritise", "decide"];
    const firstOpt = opts[0] ? live.indexOf(opts[0]) : -1;
    const vote = firstOpt >= 0 ? live.slice(firstOpt).find(x => ["prioritise", "decide"].includes(roleOf(x))) : undefined;
    const optMin = opts.reduce((s, x) => s + mins(x), 0), narrowAfter = firstOpt >= 0 ? live.slice(firstOpt).filter(x => narrowRoles.includes(roleOf(x))).reduce((s, x) => s + mins(x), 0) : 0;
    const se = methodFor("sense", used);
    if (opts.length >= 2 && vote && !live.slice(firstOpt, live.indexOf(vote)).some(x => ["sense", "criteria"].includes(roleOf(x)))) {
      const shorten = opts[opts.length - 1];
      out.push({ id: "synthesis", level: "improve", title: "No synthesis before voting", text: `${opts.length} ideation activities go straight into ${vote.title} with nothing to make sense of the options first.`, at: vote.id, short: "Needs synthesis",
        actions: [...(se ? [
          { kind: "propose" as const, label: "Add synthesis", proposal: P("Add " + se.title, [{ ...insertOf(se, vote.id, "live", 20), why: "Cluster and name the options before anyone votes on them." }]) },
          { kind: "propose" as const, label: "Add synthesis, shorten ideation", proposal: P("Add " + se.title + " and shorten " + shorten.title, [{ ...insertOf(se, vote.id, "live", 20), why: "Cluster before voting." }, { type: "mins", id: shorten.id, to: Math.max(10, mins(shorten) - 10), label: "Compress", why: "Keeps the total close to where it was.", saved: Math.min(10, mins(shorten) - 10) }]) },
          { kind: "propose" as const, label: "Replace one ideation activity", proposal: P("Replace " + shorten.title + " with " + se.title, [{ type: "replace", id: shorten.id, ref: se.id, label: "Replace", why: "One round of ideas is often enough; spend the time making sense of them.", saved: 0 }]) }
        ] : [])], sig: roles.join(",") });
    } else if (optMin >= 60 && narrowAfter < 25) {
      out.push({ id: "diverge", level: "improve", title: "Much divergence, little narrowing", text: `You have ${optMin} minutes of idea generation and ${narrowAfter} minutes to narrow options.`,
        actions: [...(se ? [{ kind: "propose" as const, label: "Add 20-minute synthesis", proposal: P("Add " + se.title, [{ ...insertOf(se, afterId(opts[opts.length - 1].id), "live", 20), why: "Time to cluster and narrow." }]) }] : []), { kind: "command", label: "Improve convergence", cmd: "converge" }], sig: optMin + "|" + narrowAfter });
    }
  }

  // 10. Does the agenda produce the stated outcome?
  {
    const produced = new Set<string>();
    live.forEach(x => R(roleOf(x))[4].forEach(t => produced.add(t)));
    const NEED: Record<string, [string[], string, string]> = { Priorities: [["PRIORITIES", "DECISION"], "prioritise", "ranked priorities"], Ideas: [["OPTIONS"], "options", "ideas"], Prototype: [["OPTIONS", "DECISION"], "options", "something to prototype"], Plan: [["ACTIONS", "TESTPLAN"], "commit", "a plan"], "Research evidence": [["PATTERNS", "EVIDENCE"], "sense", "synthesised evidence"], Alignment: [["DECISION", "PRIORITIES"], "decide", "something agreed"] };
    const need = NEED[outcome];
    if (need && !need[0].some(t => produced.has(t))) {
      const it = methodFor(need[1], used), at = RDB().insertAt(live.map(x => ({ id: x.id, role: roleOf(x), label: "", mins: mins(x), pre: false })), need[1]);
      out.push({ id: "output-match", level: "attention", title: "Doesn't produce the outcome", text: `The desired outcome is ${outcome.toLowerCase()}, but no activity produces ${need[2]}.`, actions: it ? [{ kind: "propose", label: "Add " + it.title, proposal: P("Add " + it.title, [{ ...insertOf(it, live[at]?.id ?? null), why: "Produces " + need[2] + "." }]) }] : [{ kind: "context", label: "Check outcome" }], sig: outcome + "|" + roles.join(",") });
    }
  }

  // 11. Follow-through.
  if (live.length >= 3 && !has("commit", "test")) {
    const last = [...live].reverse().find(x => !isBreak(x) && !/^close|wrap/i.test(x.title || ""));
    const it = methodFor("commit", used);
    out.push({ id: "followthrough", level: "improve", title: "No owners or next actions", text: `You finish with ${last ? last.title : "the last activity"} but nothing assigns owners or next steps.`, actions: it ? [{ kind: "propose", label: "Add " + it.title, proposal: P("Add " + it.title, [{ ...insertOf(it, null), why: "Decisions survive the room when someone owns the next step." }]) }] : [], sig: roles.join(",") });
  }

  // 12. Duplication: consecutive narrowing methods, or the same method twice.
  {
    const conv = ["prioritise", "decide", "criteria"];
    for (let i = 0; i + 2 < live.length; i++) {
      const tri = live.slice(i, i + 3);
      if (tri.every(x => conv.includes(roleOf(x)) && roleOf(x) !== "criteria") || (tri.every(x => ["prioritise", "decide"].includes(roleOf(x))))) {
        out.push({ id: "dup:" + tri[1].id, level: "improve", title: "Three prioritisation methods in a row", text: `${tri.map(x => x.title).join(", ")} all narrow or choose. One or two may be enough.`, at: tri[1].id, short: "Overlap", actions: [{ kind: "propose", label: "Remove " + tri[1].title, proposal: P("Remove " + tri[1].title, [{ type: "remove", id: tri[1].id, label: "Remove", why: "The methods either side already narrow and decide.", saved: mins(tri[1]) }]) }], sig: tri.map(x => x.id).join(",") });
        break;
      }
    }
    const seen = new Map<string, Item>();
    live.forEach(x => { if (!x.ref || isBreak(x)) return; const prev = seen.get(x.ref); if (prev) out.push({ id: "twice:" + x.id, level: "optional", title: "Same method twice", text: `${x.title} appears twice. Intentional for a second round, or a duplicate?`, at: x.id, short: "Repeated", actions: [{ kind: "propose", label: "Remove the second", proposal: P("Remove the second " + x.title, [{ type: "remove", id: x.id, label: "Remove", why: "Duplicate.", saved: mins(x) }]) }], sig: x.id }); else seen.set(x.ref, x); });
  }

  // 13. Remote or in-person fit.
  if (b.format === "Remote") {
    live.forEach(x => {
      if (isBreak(x) && x.role !== "energise") return;
      const it = x.ref ? RDL().get(x.ref) : undefined;
      const physical = /walk|gallery|world caf|spectrum|line.?up|constellation|marketplace|stand-?up|human|movement/i.test(x.title || "") || /^in person$/i.test(it?.delivery || "") || x.role === "energise" || (it?.materials || []).some(m => /wall space|floor|move around|walk/i.test(m));
      if (physical && !/remote/i.test((x.cfg.notes || "") + (x.cfg.materials || ""))) out.push({ id: "remote:" + x.id, level: "improve", title: "Built for a room", text: `${x.title} relies on physical space or movement, and this workshop is remote.`, at: x.id, short: "In-person method",
        actions: [{ kind: "propose", label: "Use remote adaptation", proposal: P("Adapt " + x.title + " for remote", [{ type: "cfg", id: x.id, key: "materials", val: "Shared online board (Miro, FigJam), visible timer", label: "Change", what: "Materials · shared online board, visible timer", why: "Walls become board frames.", saved: 0 }, { type: "cfg", id: x.id, key: "notes", val: (x.cfg.notes ? x.cfg.notes + " " : "") + "Remote: one board frame per group, silent writing first, explicit turns.", label: "Change", what: "Facilitator notes · remote run", why: "Video needs a visible shared surface and explicit turns.", saved: 0 }]) }, { kind: "alts", label: "Replace", id: x.id }], sig: x.id });
    });
  } else if (b.format === "In person") {
    live.forEach(x => { const it = x.ref ? RDL().get(x.ref) : undefined; if (/^remote$/i.test(it?.delivery || "")) out.push({ id: "inperson:" + x.id, level: "optional", title: "Remote-only method", text: `${x.title} is designed for remote groups.`, at: x.id, short: "Remote method", actions: [{ kind: "alts", label: "Show alternatives", id: x.id }], sig: x.id }); });
  }

  // 14. Preparation the method needs before the day.
  live.forEach(x => {
    const it = x.ref ? RDL().get(x.ref) : undefined, raw = it as unknown as { beforeYouStart?: string[] } | undefined;
    const prep = raw?.beforeYouStart?.length ? raw.beforeYouStart : roleOf(x) === "landscape" && /compet|alternativ/i.test(x.title || "") ? ["Select the competitors and alternatives to review"] : null;
    if (!prep || /prepare|prep:/i.test(x.cfg.notes || "") || pre.some(p => (p.title || "").includes(x.title || "~"))) return;
    out.push({ id: "prep:" + x.id, level: "optional", title: "Needs preparation", text: `${x.title} works best with this ready beforehand: ${prep.slice(0, 2).join("; ").toLowerCase()}.`, at: x.id, short: "Prep needed",
      actions: [{ kind: "propose", label: "Add to pre-work", proposal: P("Add pre-work for " + x.title, [{ type: "insert", anchor: null, item: { kind: "block", zone: "pre", role: "custom", title: "Prepare for " + x.title, mins: 30 }, label: "Add", what: "Pre-work · " + prep.slice(0, 2).join("; "), why: "Done before the day, so the session time goes on the work itself.", saved: 0 }]) },
        { kind: "propose", label: "Add facilitator preparation", proposal: P("Note preparation for " + x.title, [{ type: "cfg", id: x.id, key: "notes", val: (x.cfg.notes ? x.cfg.notes + " " : "") + "Prepare: " + prep.join("; ") + ".", label: "Change", what: "Facilitator notes · preparation", why: "Shows on the Ready screen and in Run mode.", saved: 0 }]) }], sig: x.id });
  });

  // 15. Your own history: how long this method actually took in your past runs.
  const hist = new Map<string, number[]>();
  inp.history.forEach(w => {
    const ss = w.session;
    if (!ss?.endedAt) return;
    w.items.forEach(x => { const a = ss.actual[x.id]; if (a != null && x.kind === "block" && !isBreak(x)) { const k = x.ref || "t:" + (x.title || "").toLowerCase(); hist.set(k, [...(hist.get(k) || []), a / 60000]); } });
  });
  live.forEach(x => {
    if (isBreak(x)) return;
    const runs = hist.get(x.ref || "t:" + (x.title || "").toLowerCase()) || [];
    if (runs.length < 2) return;
    const avg = Math.round(runs.reduce((s, v) => s + v, 0) / runs.length), m = mins(x);
    if (Math.abs(avg - m) >= 10) out.push({ id: "history:" + x.id, level: "optional", title: "From your past runs", text: `Your last ${runs.length} ${x.title} sessions averaged ${avg} minutes. This one has ${m}.`, at: x.id, short: "Usually " + avg + " min", actions: [{ kind: "propose", label: "Set to " + r5(avg) + " min", proposal: P(x.title + " to " + r5(avg) + " min", [{ type: "mins", id: x.id, to: r5(avg), label: avg > m ? "Extend" : "Compress", why: "Based on how long it actually took you before.", saved: m - r5(avg) }]) }], sig: m + "|" + avg });
  });

  const order: Record<Level, number> = { attention: 0, improve: 1, optional: 2 };
  return out.sort((a, c) => order[a.level] - order[c.level]);
}
