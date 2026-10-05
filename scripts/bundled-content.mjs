// Loads the content bundled with the site (src/rd/*.js, the pre-Sanity data) in Node.
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";

const RD_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../src/rd");

export function loadBundled() {
  const ctx = {};
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of ["rd-data.js", "rd-backlog.js", "rd-sprint-formats.js", "rd-network.js", "rd-builder.js"]) vm.runInContext(fs.readFileSync(path.join(RD_DIR, f), "utf8"), ctx, { filename: f });
  // Plain copies, so nothing carries the VM's prototypes.
  return JSON.parse(JSON.stringify({ RD: ctx.RD, RDN: ctx.RDN, TPL: ctx.RDB.TPL }));
}
