// Round-trip check for src/sanity/map.mjs without a Sanity connection:
// bundled data → toDocuments → (local stand-in for CONTENT_QUERY) → fromContent → compare with the original.
//   node scripts/check-sanity-map.mjs
import { toDocuments, fromContent } from "../src/sanity/map.mjs";
import { loadBundled } from "./bundled-content.mjs";
import { randomUUID } from "node:crypto";
import { emulateContentQuery } from "./sanity-emulator.mjs";

const src = loadBundled();
const docs = toDocuments(src, randomUUID);
const content = emulateContentQuery(docs);
const out = fromContent(content);

// Compare, treating null/undefined/missing as equal.
const norm = v => v === null || v === undefined ? undefined : Array.isArray(v) ? v.map(norm) : typeof v === "object" ? Object.fromEntries(Object.entries(v).filter(([, x]) => x !== null && x !== undefined).map(([k, x]) => [k, norm(x)]).sort()) : v;
const diffs = [];
const cmp = (label, a, b) => { const A = JSON.stringify(norm(a)), B = JSON.stringify(norm(b)); if (A !== B) diffs.push(label); };
src.RD.items.forEach((it, i) => {
  const o = out.items.find(x => x.id === it.id);
  if (!o) return diffs.push("missing item " + it.id);
  for (const k of new Set([...Object.keys(it), ...Object.keys(o)])) cmp(`item ${it.id}.${k}`, it[k], o[k]);
});
src.RD.work.forEach(w => { const o = out.work.find(x => x.id === w.id); for (const k of Object.keys(w)) cmp(`work ${w.id}.${k}`, w[k], o[k]); });
src.RD.notes.forEach(n => { const o = out.notes.find(x => x.id === n.id); for (const k of Object.keys(n)) cmp(`note ${n.id}.${k}`, n[k], o[k]); });
src.RDN.people.forEach(p => { const o = out.people.find(x => x.slug === p.slug); for (const k of Object.keys(p)) cmp(`person ${p.slug}.${k}`, p[k], o[k]); });
src.TPL.forEach((t, i) => { cmp(`template ${t.name}`, t, out.templates[i]); });
cmp("sources", src.RD.sources, out.sources.sort((a, b) => src.RD.sources.findIndex(s => s.id === a.id) - src.RD.sources.findIndex(s => s.id === b.id)));
cmp("item order", src.RD.items.map(i => i.id), out.items.map(i => i.id));

const known = d => /^item .*\.resources$/.test(d) || /\.lastVerified$/.test(d); // two dangling references; lastVerified was always null
const real = diffs.filter(d => !known(d));
console.log(`${docs.length} documents. ${diffs.length} differences, ${real.length} unexpected.`);
real.slice(0, 40).forEach(d => console.log("  " + d));
console.log("expected:", diffs.filter(known).join(", "));
const size = JSON.stringify(docs).length;
console.log("payload", (size / 1024).toFixed(0) + "KB");
process.exit(real.length ? 1 : 0);
