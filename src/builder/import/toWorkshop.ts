// Turns imported context into Builder data, using the Library loaded in the browser.
import { RDB, RDL, libraryItems, type LibItem } from "../engine";
import { fromEngine, mkLib, mkStruct } from "../items";
import type { Brief, ContextBrief, Item, Source, SourceType } from "../types";
import type { AgendaMatch, MatchIndex } from "./match";
import type { KeyFacts } from "./parse";

const POOL = ["activity", "framework", "icebreaker", "energiser", "reflection", "game", "workshop"];

export function libraryIndex(): MatchIndex {
  const items = libraryItems().filter(x => POOL.includes(x.type));
  return { items, search: q => RDL().search(q, items).slice(0, 4) };
}

/** The structured facts the engine and checks use. */
export function engineBrief(b: ContextBrief, f: KeyFacts): Brief {
  const ev = (b.evidence + " " + b.situation).toLowerCase(), evidence: string[] = [];
  if (/interview|customer research|user research|usability/.test(ev)) evidence.push("Customer research");
  if (/analytics|churn|data|metric|funnel|nps/.test(ev)) evidence.push("Analytics");
  if (/market|competitor/.test(ev)) evidence.push("Market research");
  if (/strategy|okr|plan/.test(ev) && b.evidence) evidence.push("Existing strategy");
  const out: Brief = { question: (b.problem || b.goal || "").slice(0, 400) };
  if (f.outcome) out.outcome = f.outcome;
  if (f.time) out.time = f.time;
  if (f.people) out.people = f.people;
  if (f.owner) out.owner = f.owner;
  if (f.format) out.format = f.format;
  if (evidence.length) out.evidence = evidence;
  if (b.constraints) out.notes = b.constraints.slice(0, 400);
  return out;
}

/** Reviewed agenda matches → editable blocks. Library titles replace near-duplicates; extra detail is kept. */
export function itemsFromMatches(matches: AgendaMatch[]): Item[] {
  return matches.map(m => {
    const l = m.line;
    if (m.kind === "section") return { ...mkStruct("section"), title: l.title };
    if (m.kind === "day") return mkStruct("day");
    if (m.kind === "break" || m.kind === "lunch") return { ...mkStruct(m.kind), title: l.title || (m.kind === "lunch" ? "Lunch" : "Break"), mins: l.mins };
    const it = m.kind === "library" && m.ref ? RDL().get(m.ref) : undefined;
    if (it) {
      const x = mkLib(it, l.mins), extra = l.title.split(/\s+[–—-]\s+|:\s+/).slice(1).join(" – ");
      if (extra) x.cfg = { ...x.cfg, purpose: extra.charAt(0).toUpperCase() + extra.slice(1) };
      return x;
    }
    return { ...mkStruct("custom"), title: l.title, mins: l.mins };
  });
}

/** A first structure from the brief when the context had no agenda. */
export const suggestedItems = (b: Brief): Item[] => fromEngine(RDB().compose(b));

export const newSource = (type: SourceType, text: string, title?: string): Source => ({
  id: "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
  type, text, added: Date.now(),
  title: title || ({ paste: "Pasted text", ai: "AI conversation", agenda: "Workshop agenda", notes: "Notes", file: "Document", connector: "Connected source" } as const)[type]
});

// Context → Library recommendations. Keyword cues map to well-known methods; the engine's own
// composition for the brief fills the rest. Nothing already in the workshop is repeated.
const CUES: [RegExp, string[]][] = [
  [/interview|research|customer|user/, ["Evidence Review", "Affinity Mapping", "Insight Statement"]],
  [/opportunit/, ["Opportunity Solution Tree", "Opportunity Mapping"]],
  [/assum|risk|uncertain/, ["Assumption Mapping", "Premortem"]],
  [/decid|decision|choose|direction/, ["Decision Matrix", "Note and Vote", "Decision Criteria"]],
  [/priorit|roadmap/, ["Impact / Effort Matrix", "MoSCoW", "Dot Voting"]],
  [/align|agree|disagree|can'?t agree/, ["Hopes and Fears", "1-2-4-All"]],
  [/idea|brainstorm|concept/, ["Crazy 8s", "Lightning Demos", "Brainwriting 6-3-5"]],
  [/journey|onboard|experience/, ["Customer Journey Map"]],
  [/action|next step|owner|follow/, ["Next Actions"]]
];
export function contextRecommendations(ctx: ContextBrief | undefined, b: Brief, used: Set<string>, limit = 6): LibItem[] {
  const text = ctx ? Object.values(ctx).join(" ").toLowerCase() : "";
  const pool = libraryItems().filter(x => POOL.includes(x.type)), byTitle = (t: string) => pool.find(x => x.title.toLowerCase() === t.toLowerCase());
  const out: LibItem[] = [];
  const add = (it?: LibItem) => { if (it && !used.has(it.id) && !out.some(o => o.id === it.id)) out.push(it); };
  CUES.forEach(([re, titles]) => { if (re.test(text)) titles.forEach(t => add(byTitle(t))); });
  if (b.question || b.outcome) RDB().compose(b).forEach(x => add(x.ref ? RDL().get(x.ref) : undefined));
  return out.slice(0, limit);
}
