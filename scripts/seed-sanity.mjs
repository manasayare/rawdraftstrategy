// Seeds an empty Sanity dataset with the content bundled with the site. Runs before every build
// (see package.json) and does nothing unless a project and write token are configured AND the
// dataset has no Library items yet, so it can never overwrite edits made in the Studio.
//   node scripts/seed-sanity.mjs            seed if empty
//   node scripts/seed-sanity.mjs --dry-run  print what would be written
import { randomUUID } from "node:crypto";
import { sanity, configured, query, mutate } from "../src/sanity/env.mjs";
import { toDocuments } from "../src/sanity/map.mjs";
import { loadBundled } from "./bundled-content.mjs";

const dry = process.argv.includes("--dry-run");
const log = (...a) => console.log("[seed-sanity]", ...a);

async function main() {
  const docs = toDocuments(loadBundled(), randomUUID);
  if (dry) {
    const counts = {};
    docs.forEach(d => (counts[d._type] = (counts[d._type] || 0) + 1));
    return log("dry run:", JSON.stringify(counts));
  }
  if (!configured()) return log("no Sanity project configured; skipping");
  if (!sanity.writeToken) return log("no write token; skipping");
  const existing = await query(`count(*[_type == "libraryItem"])`, {}, { cache: "no-store" });
  if (existing > 0) return log(`dataset already has ${existing} library items; skipping`);
  // Two Vercel projects build this repo; a fixed-id lock document lets only one of them seed.
  try { await mutate([{ create: { _id: "seed-lock", _type: "seedLock", at: new Date().toISOString() } }]); }
  catch (e) { return log("another build is seeding (or did); skipping"); }
  log(`seeding ${docs.length} documents into ${sanity.projectId}/${sanity.dataset}`);
  // Batches stay well under the 4MB mutation limit.
  let batch = [], size = 0, done = 0;
  const flush = async () => { if (!batch.length) return; await mutate(batch.map(d => ({ create: d }))); done += batch.length; log(`${done}/${docs.length}`); batch = []; size = 0; };
  for (const d of docs) {
    const s = JSON.stringify(d).length;
    if (size + s > 1_500_000 || batch.length >= 200) await flush();
    batch.push(d); size += s;
  }
  await flush();
  log("done");
}

// Never fail the build over seeding; the site falls back to bundled content.
main().catch(e => log("failed:", e.message));
