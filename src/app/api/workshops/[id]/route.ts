// Reads a shared workshop snapshot. Never returns the edit key.
import { configured, query } from "@/sanity/env.mjs";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^\w{6,20}$/.test(id)) return Response.json({ error: "not_found" }, { status: 404 });
  if (!configured()) return Response.json({ error: "not_configured" }, { status: 503 });
  try {
    const doc = await query(`*[_id == $id && _type == "sharedWorkshop"][0]{data, updated}`, { id: "ws-" + id }, { cache: "no-store" });
    if (!doc?.data) return Response.json({ error: "not_found" }, { status: 404 });
    return Response.json({ workshop: JSON.parse(doc.data), updated: doc.updated });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "load_failed" }, { status: 502 });
  }
}
