// Password protection for /admin. The password lives in the ADMIN_PASSWORD environment variable;
// the session cookie holds an HMAC of it, so changing the password signs everyone out.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "rd_admin";
const password = () => process.env.ADMIN_PASSWORD || "";
const sign = (p: string) => createHmac("sha256", p).update("raw-draft-admin-v1").digest("base64url");
const same = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };

export const adminConfigured = () => password().length >= 8;
export const checkPassword = (attempt: string) => adminConfigured() && same(attempt, password());
export const sessionValue = () => sign(password());

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const c = (await cookies()).get(COOKIE)?.value || "";
  return same(c, sessionValue());
}
