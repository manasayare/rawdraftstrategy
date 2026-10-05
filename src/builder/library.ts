// Library panel search: free text with "12 people" / "30 min" parsing, plus filter chips.
import { RDB, RDL, libraryItems, type LibItem } from "./engine";
import type { LibFilters } from "./types";

const POOL_TYPES = ["activity", "framework", "icebreaker", "energiser", "reflection", "game", "workshop"];

export const TYPE_LABELS: Record<string, string> = {
  "": "All resources", activity: "Activities", framework: "Frameworks", icebreaker: "Icebreakers", energiser: "Energisers", reflection: "Reflection", game: "Serious games",
  workshop: "Workshop formats", research: "Research methods", synthesis: "Synthesis methods", ideation: "Ideation methods", decision: "Decision methods", facilitation: "Facilitation methods"
};

export const OUTPUTS: Record<string, RegExp> = {
  Decision: /decision|decide|choice|chosen/, Ideas: /idea|sketch|concept|option/, Evidence: /evidence|finding|insight|interview|research|signal/, Map: /map|journey|blueprint|landscape|matrix/,
  Prototype: /prototyp/, Priorities: /priorit|ranked|shortlist|vote/, Plan: /plan|action|roadmap|owner|backcast/, Alignment: /align|agreement|shared|hopes|expectation/
};

const PEOPLE_KEYS: Record<string, string[]> = { Solo: ["solo"], "2–5": ["2-4", "5-8"], "6–10": ["5-8", "9-15"], "11–20": ["9-15", "16-30"], "20+": ["16-30", "30+"] };
const sizeKey = (n: number) => (n <= 1 ? "solo" : n <= 4 ? "2-4" : n <= 8 ? "5-8" : n <= 15 ? "9-15" : n <= 30 ? "16-30" : "30+");

/** True when the record states a duration in minutes (not just a range label). */
export const knownTime = (it: LibItem | undefined) => !!it && (/^\d+$/.test(it.timeKey || "") || /(\d+)\s*(min|minutes)/.test(String(it.duration || "")));
const fitsSize = (it: LibItem, keys: string[]) => !(it.sizes || []).length || it.sizes!.includes("variable") || keys.some(k => it.sizes!.includes(k));

const typeTest = (t: string, x: LibItem) => {
  const role = () => RDB().roleOf(x);
  switch (t) {
    case "research": return role() === "evidence";
    case "synthesis": return role() === "sense";
    case "ideation": return role() === "options";
    case "decision": return ["decide", "prioritise", "criteria"].includes(role());
    case "facilitation": return ["open", "frame", "commit", "energise"].includes(role());
    default: return x.type === t;
  }
};

export type LibraryResult = { pool: LibItem[]; results: LibItem[]; parsed: string; activeFilters: number };

export function searchLibrary(L: LibFilters): LibraryResult {
  const B = RDB(), pool = libraryItems().filter(x => POOL_TYPES.includes(x.type));
  let q = L.q.toLowerCase(), pN: number | null = null, tN: number | null = null;
  const pm = q.match(/(\d+)\s*(people|person|participants|ppl|of us)/); if (pm) { pN = +pm[1]; q = q.replace(pm[0], " "); }
  const tm = q.match(/(\d+)\s*-?\s*(min|minute|minutes|mins)\b/); if (tm) { tN = +tm[1]; q = q.replace(tm[0], " "); }
  const hh = q.match(/(\d+)\s*hours?/); if (hh) { tN = +hh[1] * 60; q = q.replace(hh[0], " "); }
  q = q.replace(/\b(for|with|a|an|in|under)\b/g, " ").trim();

  let res = q ? RDL().search(q, pool) : pool.slice().sort((a, c) => B.ORDER.indexOf(B.roleOf(a)) - B.ORDER.indexOf(B.roleOf(c)) || Number(a.type === "workshop") - Number(c.type === "workshop"));
  const tMax = L.time ? (L.time === "60+" ? null : +L.time) : tN;
  res = res.filter(it =>
    (!L.stage || it.stage === L.stage || (L.stage === "explore" && !it.stage && ["evidence", "landscape"].includes(B.roleOf(it)))) &&
    (!tMax || (knownTime(it) && B.minsOf(it) <= tMax)) &&
    (L.time !== "60+" || (knownTime(it) && B.minsOf(it) >= 60)) &&
    (!(L.people || pN) || fitsSize(it, L.people ? PEOPLE_KEYS[L.people] : [sizeKey(pN as number)])) &&
    (!L.format || L.format === "In person" ? true : /remote/i.test(it.delivery || "") || !it.delivery) &&
    (!L.output || OUTPUTS[L.output].test(((it.outputs || []).join(" ") + " " + (it.short || "")).toLowerCase())) &&
    (!L.type || typeTest(L.type, it)) &&
    (L.format !== "In person" || !/^remote$/i.test(it.delivery || ""))
  );
  const parsed = [tN ? "within " + tN + " min" : "", pN ? pN + " people" : "", q && (tN || pN) ? "“" + q + "”" : ""].filter(Boolean).join(" · ");
  const activeFilters = (["stage", "time", "people", "format", "output", "type"] as const).filter(k => L[k]).length;
  return { pool, results: res, parsed, activeFilters };
}

export const FILTER_ROWS = (): [string, keyof LibFilters, [string, string][]][] => [
  ["Purpose", "stage", RDL().STAGES.filter(s => s[0] !== "energise").map(s => [s[0], s[1]])],
  ["Time", "time", [["5", "5 min"], ["10", "10 min"], ["15", "15 min"], ["30", "30 min"], ["45", "45 min"], ["60+", "60+ min"]]],
  ["People", "people", ["Solo", "2–5", "6–10", "11–20", "20+"].map(x => [x, x])],
  ["Format", "format", ["In person", "Remote", "Hybrid"].map(x => [x, x])],
  ["Output", "output", Object.keys(OUTPUTS).map(x => [x, x])]
];

export const STAGE_CATS: [string, string][] = [["open", "Open"], ["explore", "Explore"], ["create", "Create"], ["decide", "Decide"], ["close", "Close"]];
