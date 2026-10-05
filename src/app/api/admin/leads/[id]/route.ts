// Updates one lead from the dashboard: status, urgency, booked call time, private note.
import { isAdmin } from "@/lib/admin-auth";
import { STATUSES } from "@/lib/leads";
import { mutate } from "@/sanity/env.mjs";

const OK_STATUS = new Set(STATUSES.map(s => s[0]));
const OK_URGENCY = new Set(["high", "medium", "low"]);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!/^[\w-]{8,64}$/.test(id)) return Response.json({ error: "bad_id" }, { status: 400 });
  const b = await request.json().catch(() => ({}));
  const set: Record<string, unknown> = {}, unset: string[] = [];
  if (OK_STATUS.has(b.status)) set.status = b.status;
  if (OK_URGENCY.has(b.urgency)) set.urgency = b.urgency;
  if (b.callAt === null) unset.push("callAt");
  else if (typeof b.callAt === "string" && !Number.isNaN(Date.parse(b.callAt))) set.callAt = new Date(b.callAt).toISOString();
  if (Number.isInteger(b.callMinutes) && b.callMinutes > 0 && b.callMinutes <= 240) set.callMinutes = b.callMinutes;
  if (typeof b.decisionNote === "string") set.decisionNote = b.decisionNote.slice(0, 4000);
  if (!Object.keys(set).length && !unset.length) return Response.json({ error: "nothing_to_change" }, { status: 400 });
  try {
    await mutate([{ patch: { id, ...(Object.keys(set).length ? { set } : {}), ...(unset.length ? { unset } : {}) } }]);
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "save_failed" }, { status: 502 });
  }
}
