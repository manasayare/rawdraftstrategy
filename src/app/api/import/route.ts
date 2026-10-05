// Connector entry point: send context, get back a workshop link. The workshop opens in Builder on the
// import review screen, so the person confirms the brief and agenda before anything is built.
// See docs/connectors.md. Set RAW_DRAFT_IMPORT_KEY to require "Authorization: Bearer <key>".
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { configured, mutate, query, sanity } from "@/sanity/env.mjs";
import { createWorkshopFromContext, engineBrief, type IngestInput, type IngestSource } from "@/builder/import/ingest";
import type { MatchIndex } from "@/builder/import/match";

const SOURCES: IngestSource[] = ["chatgpt", "claude", "paste", "notes", "agenda", "google-drive", "notion", "slack", "miro", "figjam", "linear", "jira", "confluence", "other"];
const POOL = ["activity", "framework", "icebreaker", "energiser", "reflection", "game", "workshop"];
const str = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

function authorised(req: Request) {
  const key = process.env.RAW_DRAFT_IMPORT_KEY;
  if (!key) return true;
  const got = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(createHash("sha256").update(got).digest("hex")), b = Buffer.from(createHash("sha256").update(key).digest("hex"));
  return timingSafeEqual(a, b);
}

async function libraryIndex(): Promise<MatchIndex | undefined> {
  try {
    const items = await query(`*[_type == "libraryItem" && kind in $kinds && defined(slug.current)]{ "id": slug.current, title, "type": kind }`, { kinds: POOL }, { next: { revalidate: 300, tags: ["content"] } });
    return Array.isArray(items) && items.length ? { items } : undefined;
  } catch { return undefined; }
}

export async function POST(request: Request) {
  if (!authorised(request)) return Response.json({ error: "unauthorised" }, { status: 401 });
  if (!configured() || !sanity.writeToken) return Response.json({ error: "not_configured" }, { status: 503 });
  let b: Record<string, unknown>;
  try { b = await request.json(); } catch { return Response.json({ error: "bad_request" }, { status: 400 }); }

  const input: IngestInput = {
    sourceType: SOURCES.includes(b.sourceType as IngestSource) ? (b.sourceType as IngestSource) : "other",
    sourceUrl: str(b.sourceUrl, 500),
    rawText: str(b.rawText, 200_000),
    structuredContext: b.structuredContext && typeof b.structuredContext === "object" ? Object.fromEntries(Object.entries(b.structuredContext as Record<string, unknown>).filter(([, v]) => typeof v === "string").map(([k, v]) => [k, (v as string).slice(0, 4000)])) : undefined,
    attachments: Array.isArray(b.attachments) ? (b.attachments as { name?: unknown; text?: unknown }[]).slice(0, 10).map(a => ({ name: str(a?.name, 200) || "Attachment", text: str(a?.text, 100_000) || "" })) : undefined,
    requestedOutcome: str(b.requestedOutcome, 500),
    timeConstraint: typeof b.timeConstraint === "number" ? b.timeConstraint : str(b.timeConstraint, 100),
    participants: typeof b.participants === "number" ? b.participants : str(b.participants, 300),
    agenda: Array.isArray(b.agenda) ? (b.agenda as unknown[]).slice(0, 80).map(a => (typeof a === "string" ? a.slice(0, 300) : { title: str((a as { title?: unknown })?.title, 300) || "Block", mins: Number((a as { mins?: unknown })?.mins) || undefined, start: str((a as { start?: unknown })?.start, 10) })) : undefined
  };
  if (!input.rawText && !input.structuredContext && !input.agenda?.length && !input.attachments?.length) return Response.json({ error: "empty", message: "Send rawText, structuredContext, agenda or attachments." }, { status: 422 });

  const r = createWorkshopFromContext(input, await libraryIndex());
  const id = randomBytes(8).toString("base64url").replace(/[-_]/g, "").slice(0, 10).padEnd(10, "x"), now = new Date().toISOString();
  const data = { name: r.name, start: "09:30", view: "timeline", brief: engineBrief(r.brief, r.facts), items: [], pendingImport: { text: r.sourceText, sourceType: input.sourceType, sourceUrl: input.sourceUrl, title: r.name, brief: r.brief } };
  try {
    // keyHash of a random key nobody holds: the link can be opened and copied, never overwritten.
    await mutate([{ create: { _id: "ws-" + id, _type: "sharedWorkshop", name: r.name, data: JSON.stringify(data), keyHash: createHash("sha256").update(randomBytes(24)).digest("hex"), created: now, updated: now } }]);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "store_failed" }, { status: 502 });
  }
  const origin = new URL(request.url).origin;
  return Response.json({
    workshopId: id, url: origin + "/builder?w=" + id, name: r.name, brief: r.brief, facts: r.facts,
    suggestedStructure: r.suggestedStructure.map(m => ({ kind: m.kind, title: m.line.title, mins: m.line.mins, start: m.line.start, libraryId: m.ref, libraryTitle: m.refTitle, confidence: m.confidence })),
    matchedLibraryResources: r.matchedLibraryResources, missingInformation: r.missingInformation
  }, { status: 201 });
}
