// Sanity webhook target: refreshes cached content when something is published.
// Webhook: POST https://<site>/api/revalidate, secret = SANITY_REVALIDATE_SECRET. See docs/sanity.md.
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { sanity } from "@/sanity/env.mjs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
  if (!sanity.webhookSecret || !(await isValidSignature(body, signature, sanity.webhookSecret))) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }
  revalidateTag("content", "max");
  return Response.json({ revalidated: true });
}
