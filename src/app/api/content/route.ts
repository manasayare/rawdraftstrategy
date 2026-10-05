// The site's content (Library, Work, Notes, Network, Builder templates) from Sanity, in the shape
// the Library and Builder engines read. 204 when Sanity isn't configured: the client then uses the
// content bundled with the site. Cached for 5 minutes and refreshed by /api/revalidate on publish.
import { configured, query } from "@/sanity/env.mjs";
import { CONTENT_QUERY, fromContent } from "@/sanity/map.mjs";

export async function GET() {
  if (!configured()) return new Response(null, { status: 204 });
  try {
    const raw = await query(CONTENT_QUERY, {}, { next: { revalidate: 300, tags: ["content"] } });
    const content = fromContent(raw);
    // An empty dataset (not seeded yet) falls back to the bundled content too.
    if (!content.items.length) return new Response(null, { status: 204 });
    return Response.json(content, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" } });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 204 });
  }
}
