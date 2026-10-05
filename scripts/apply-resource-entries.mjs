// Writes the collection contents in scripts/resource-entries.mjs to Sanity.
//   node scripts/apply-resource-entries.mjs --print          mutations as JSON, nothing sent
//   SANITY_API_BASE=… SANITY_API_WRITE_TOKEN=… node scripts/apply-resource-entries.mjs
// Patches existing collections, and corrects known bad fields. The records in
// RETIRE are listed, not touched: unpublish them in the Studio, which keeps a draft to restore.
import { COLLECTIONS, FIXES, RETIRE, toEntries } from "./resource-entries.mjs";
import { base, sanity } from "../src/sanity/env.mjs";

export function mutations() {
  const out = [];
  for (const [id, c] of Object.entries(COLLECTIONS)) {
    const set = { entries: toEntries(c.groups), entriesNoun: c.noun };
    if (c.sourceUrl) set.sourceUrl = c.sourceUrl;
    out.push({ patch: { id, set } });
  }
  for (const [id, set] of Object.entries(FIXES)) out.push({ patch: { id, set } });
  return { mutations: out, retire: Object.keys(RETIRE) };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop())) {
  const m = mutations();
  if (process.argv.includes("--print")) { console.log(JSON.stringify(m, null, 2)); process.exit(0); }
  const res = await fetch(`${base()}/data/mutate/${sanity.dataset}`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + sanity.writeToken },
    body: JSON.stringify({ mutations: m.mutations })
  });
  console.log(res.status, (await res.text()).slice(0, 300));
  console.log("Unpublish in the Studio:", m.retire.join(", "));
}
