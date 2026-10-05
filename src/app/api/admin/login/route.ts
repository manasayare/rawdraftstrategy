import { adminConfigured, checkPassword, COOKIE, sessionValue } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });
  const { password } = await request.json().catch(() => ({ password: "" }));
  // A short pause makes guessing slow without needing storage for rate limits.
  await new Promise(r => setTimeout(r, 400));
  if (!checkPassword(String(password || ""))) return Response.json({ error: "wrong_password" }, { status: 401 });
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=${sessionValue()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`);
  return res;
}

export async function DELETE() {
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  return res;
}
