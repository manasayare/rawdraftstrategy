// Receives "Book a workshop" enquiries and stores them as `lead` documents in Sanity (private dataset).
// They appear in the leads dashboard at /admin, and in the Studio under Lead.
import { randomUUID } from "node:crypto";
import { configured, mutate, sanity } from "@/sanity/env.mjs";

const FIELDS = ["name", "email", "org", "role", "help", "topics", "length", "people", "when", "budget", "notes", "source", "page"] as const;
const MAX = 4000;

export async function POST(request: Request) {
  if (!configured() || !sanity.writeToken) return Response.json({ error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // Bots fill the hidden "website" field; accept quietly and drop it.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  const row: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = String(body[k] ?? "").trim().slice(0, MAX);
    if (v) row[k] = v;
  }
  if (!row.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email || "")) return Response.json({ error: "invalid" }, { status: 422 });

  try {
    await mutate([{ create: { _id: randomUUID(), _type: "lead", status: "new", received: new Date().toISOString(), ...row } }]);
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "store_failed" }, { status: 502 });
  }
}
