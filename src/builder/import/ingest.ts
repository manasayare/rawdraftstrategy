// Source-agnostic ingestion: the single entry point a connector (ChatGPT, Claude, Notion, Drive…) or
// the paste box uses to turn context into a workshop draft. Pure: no browser, no network. Matching
// uses whatever Library index the caller provides.
import { matchAgenda, type AgendaMatch, type MatchIndex } from "./match";
import { emptyBrief, missingInformation, parseContext, type ContextBrief, type KeyFacts } from "./parse";
import type { Brief } from "../types";

export type IngestSource = "chatgpt" | "claude" | "paste" | "notes" | "agenda" | "google-drive" | "notion" | "slack" | "miro" | "figjam" | "linear" | "jira" | "confluence" | "other";

export type IngestInput = {
  sourceType: IngestSource;
  sourceUrl?: string;
  /** Anything textual: a conversation, a brief, notes, an agenda. */
  rawText?: string;
  /** Already-structured context from a connector; wins over what is parsed from rawText. */
  structuredContext?: Partial<ContextBrief> & { title?: string };
  attachments?: { name: string; text: string }[];
  requestedOutcome?: string;
  /** e.g. "3 hours", "half day", 180 */
  timeConstraint?: string | number;
  participants?: string | number;
  /** An agenda the caller already has as lines: "9:00 Welcome", or {title, mins}. */
  agenda?: (string | { title: string; mins?: number; start?: string })[];
};

export type IngestResult = {
  name: string;
  brief: ContextBrief;
  facts: KeyFacts;
  /** Proposed blocks: the caller's agenda (matched to the Library) when given, otherwise empty for the client to compose. */
  suggestedStructure: AgendaMatch[];
  matchedLibraryResources: { id: string; title: string; line: string; confidence: string }[];
  missingInformation: string[];
  sourceText: string;
};

const MAX = 200_000;

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



export function createWorkshopFromContext(input: IngestInput, index?: MatchIndex): IngestResult {
  const agendaText = (input.agenda || []).map(a => (typeof a === "string" ? a : (a.start ? a.start + " " : "- ") + a.title + (a.mins ? " (" + a.mins + " min)" : ""))).join("\n");
  const text = [input.rawText || "", ...(input.attachments || []).map(a => "# " + a.name + "\n" + a.text), agendaText].filter(Boolean).join("\n\n").slice(0, MAX);
  const parsed = parseContext(text);
  const sc = input.structuredContext || {};
  const brief = { ...emptyBrief(), ...parsed.brief };
  (Object.keys(brief) as (keyof ContextBrief)[]).forEach(k => { const v = sc[k]; if (typeof v === "string" && v.trim()) brief[k] = v.trim(); });
  if (input.requestedOutcome) brief.output = brief.output || input.requestedOutcome;
  if (input.participants != null) brief.participants = brief.participants || String(input.participants);

  // Explicit constraints from the caller override what the text implies.
  const facts = { ...parsed.facts };
  const extra = [input.timeConstraint != null ? (typeof input.timeConstraint === "number" ? input.timeConstraint + " minutes" : input.timeConstraint) : "", input.participants != null ? input.participants + " people" : "", input.requestedOutcome || ""].filter(Boolean).join(". ");
  if (extra) Object.assign(facts, Object.fromEntries(Object.entries(parseContext(extra).facts).filter(([, v]) => v != null)));
  if (parsed.agenda.length) { delete facts.time; delete facts.minutes; }

  const suggestedStructure = index ? matchAgenda(parsed.agenda, index) : parsed.agenda.map(line => ({ line, kind: line.kind === "block" ? "custom" : line.kind, confidence: "none", candidates: [] }) as AgendaMatch);
  return {
    name: sc.title || parsed.title,
    brief,
    facts,
    suggestedStructure,
    matchedLibraryResources: suggestedStructure.filter(m => m.kind === "library" && m.ref).map(m => ({ id: m.ref!, title: m.refTitle || "", line: m.line.title, confidence: m.confidence })),
    missingInformation: missingInformation(brief, facts, parsed.agenda.length > 0),
    sourceText: text
  };
}
