// Shareable workshop links. POST stores a snapshot as a `sharedWorkshop` document and returns its id plus an
// edit key; posting again with that id and key updates the same link. Opening /builder?w=<id> loads a copy.
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { configured, mutate, query, sanity } from "@/sanity/env.mjs";

const MAX = 300_000;
const hash = (k: string) => createHash("sha256").update(k).digest("hex");
const newId = () => randomBytes(8).toString("base64url").replace(/[-_]/g, "").slice(0, 10).padEnd(10, "x");

type Snapshot = { name?: unknown; start?: unknown; view?: unknown; brief?: unknown; items?: unknown; context?: unknown };
function clean(w: Snapshot) {
  if (!w || typeof w !== "object" || !Array.isArray(w.items) || w.items.length > 500) return null;
  const snap = {
    name: String(w.name ?? "Untitled workshop").slice(0, 200),
    start: /^\d{2}:\d{2}$/.test(String(w.start)) ? String(w.start) : "09:30",
    view: String(w.view ?? "timeline").slice(0, 20),
    brief: w.brief && typeof w.brief === "object" ? w.brief : {},
    items: w.items,
    ...(w.context && typeof w.context === "object" ? { context: w.context } : {})
  };
  const data = JSON.stringify(snap);
  return data.length > MAX ? null : { name: snap.name, data };
}

export async function POST(request: Request) {
  if (!configured() || !sanity.writeToken) return Response.json({ error: "not_configured" }, { status: 503 });
  let b: { workshop?: Snapshot; id?: unknown; key?: unknown };
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const snap = clean(b.workshop as Snapshot);
  if (!snap) return Response.json({ error: "invalid" }, { status: 422 });
  const now = new Date().toISOString();
  try {
    const id = typeof b.id === "string" && /^\w{6,20}$/.test(b.id) ? b.id : "";
    const key = typeof b.key === "string" ? b.key : "";
    if (id && key) {
      const cur = await query(`*[_id == $id][0]{keyHash}`, { id: "ws-" + id }, { cache: "no-store" });
      const a = Buffer.from(hash(key)), c = Buffer.from(String(cur?.keyHash || ""));
      if (cur && a.length === c.length && timingSafeEqual(a, c)) {
        await mutate([{ patch: { id: "ws-" + id, set: { ...snap, updated: now } } }]);
        return Response.json({ id, key, updated: true });
      }
    }
    const nid = newId(), nkey = randomBytes(18).toString("base64url");
    await mutate([{ create: { _id: "ws-" + nid, _type: "sharedWorkshop", ...snap, keyHash: hash(nkey), created: now, updated: now } }]);
    return Response.json({ id: nid, key: nkey, updated: false });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "store_failed" }, { status: 502 });
  }
}
