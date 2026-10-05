// Receives "Book a workshop" enquiries and appends them to a Google Sheet through an
// Apps Script web app (docs/enquiries-apps-script.gs). Configure in Vercel:
//   ENQUIRY_SHEET_URL   the web app URL ending in /exec
//   ENQUIRY_SECRET      any long random string; the same value is set in the script
const FIELDS = ["name", "email", "org", "role", "help", "topics", "length", "people", "when", "budget", "notes", "source", "page"] as const;
const MAX = 4000;

export async function POST(request: Request) {
  const url = process.env.ENQUIRY_SHEET_URL, secret = process.env.ENQUIRY_SECRET;
  if (!url || !secret) return Response.json({ error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // Bots fill the hidden "website" field; accept quietly and drop it.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  const row: Record<string, string> = {};
  for (const k of FIELDS) row[k] = String(body[k] ?? "").trim().slice(0, MAX);
  if (!row.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return Response.json({ error: "invalid" }, { status: 422 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, received: new Date().toISOString(), ...row }),
      redirect: "follow",
    });
    const out = await res.json().catch(() => null);
    if (!res.ok || !out || out.ok !== true) return Response.json({ error: "sheet_failed" }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "sheet_unreachable" }, { status: 502 });
  }
}
