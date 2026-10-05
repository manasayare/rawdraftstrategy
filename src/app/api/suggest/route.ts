// Receives "Suggest a resource" submissions and stores them as `submission` documents in Sanity
// (Studio → Suggestion), status "new". The dataset is private, so the email stays private.
import { randomUUID } from "node:crypto";
import { configured, mutate, sanity } from "@/sanity/env.mjs";

const TYPES = ["sprint", "workshop", "playbook", "framework", "activity", "icebreaker", "energiser", "reflection", "game", "methodology", "resource"];
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);
const url = (v: unknown) => { const s = clip(v, 500); return /^https?:\/\/\S+\.\S+/.test(s) ? s : undefined; };

export async function POST(request: Request) {
  if (!configured() || !sanity.writeToken) return Response.json({ error: "not_configured" }, { status: 503 });
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // Bots fill the hidden "website" field; accept quietly and drop it.
  if (clip(b.website, 200)) return Response.json({ ok: true });

  const doc = {
    _id: randomUUID(), _type: "submission", status: "new", submittedAt: new Date().toISOString(),
    resourceTitle: clip(b.resourceTitle, 200), resourceType: TYPES.includes(String(b.resourceType)) ? String(b.resourceType) : undefined, resourceUrl: url(b.resourceUrl),
    description: clip(b.description, 6000), howUsed: clip(b.howUsed, 3000) || undefined,
    creditName: clip(b.creditName, 120), creditUrl: url(b.creditUrl), email: clip(b.email, 200), isAuthor: b.isAuthor === true, consent: b.consent === true
  };
  if (!doc.resourceTitle || doc.description.length < 20 || !doc.creditName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doc.email) || !doc.consent) {
    return Response.json({ error: "invalid" }, { status: 422 });
  }
  try {
    await mutate([{ create: doc }]);
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "store_failed" }, { status: 502 });
  }
}
