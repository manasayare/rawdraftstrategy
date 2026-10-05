// Minimal stand-in for Sanity's HTTP API, for testing seeding and content loading locally.
//   node scripts/sanity-mock.mjs [port]      then run the site with SANITY_API_BASE=http://localhost:<port>
// Stores mutations in memory. Answers count(...) queries and the content query (via the emulator).
import http from "node:http";
import { emulateContentQuery } from "./sanity-emulator.mjs";

const docs = new Map();
const port = +(process.argv[2] || 4566);
const send = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(body)); };

http.createServer((req, res) => {
  let body = "";
  req.on("data", c => (body += c));
  req.on("end", () => {
    const url = new URL(req.url, "http://x");
    if (url.pathname.includes("/data/mutate/")) {
      const { mutations } = JSON.parse(body);
      for (const m of mutations) {
        const [op, d] = Object.entries(m)[0];
        if (op === "create" && docs.has(d._id)) return send(res, 409, { error: { description: "exists" } });
        if (op === "create" || op === "createOrReplace" || (op === "createIfNotExists" && !docs.has(d._id))) docs.set(d._id, d);
        if (op === "patch") { const cur = docs.get(d.id); if (!cur) return send(res, 404, { error: "missing" }); Object.assign(cur, d.set || {}); (d.unset || []).forEach(k => delete cur[k]); }
      }
      return send(res, 200, { transactionId: "t" + Date.now(), results: mutations.map(m => ({ id: Object.values(m)[0]._id, operation: "create" })) });
    }
    if (url.pathname.includes("/data/query/")) {
      const q = url.searchParams.get("query") || "";
      const m = q.match(/^count\(\*\[_type == "(\w+)"\]\)$/);
      if (m) return send(res, 200, { result: [...docs.values()].filter(d => d._type === m[1]).length });
      if (q.includes('"items"')) return send(res, 200, { result: emulateContentQuery([...docs.values()]) });
      if (q.includes('*[_type == "lead"]')) return send(res, 200, { result: [...docs.values()].filter(d => d._type === "lead").sort((a, b) => b.received.localeCompare(a.received)) });
      if (q.includes("*[_type == \"submission\"")) return send(res, 200, { result: [...docs.values()].filter(d => d._type === "submission") });
      return send(res, 400, { error: "unsupported query in mock: " + q.slice(0, 80) });
    }
    if (url.pathname === "/_docs") return send(res, 200, [...docs.values()]);
    send(res, 404, {});
  });
}).listen(port, () => console.log("sanity mock on", port));
