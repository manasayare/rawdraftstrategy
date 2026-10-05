// Sanity connection settings, read from environment variables. Server-only: never import from client code.
// Accepts the names the Vercel–Sanity integration and Sanity's own templates use.
const pick = (...names) => { for (const n of names) if (process.env[n]) return process.env[n]; return ""; };

export const sanity = {
  projectId: pick("NEXT_PUBLIC_SANITY_PROJECT_ID", "SANITY_PROJECT_ID", "SANITY_STUDIO_PROJECT_ID"),
  dataset: pick("NEXT_PUBLIC_SANITY_DATASET", "SANITY_DATASET", "SANITY_STUDIO_DATASET") || "production",
  apiVersion: "2026-10-05",
  // The dataset is private: reads need a token. The write token also creates suggestions and seeds the dataset.
  readToken: pick("SANITY_API_READ_TOKEN", "SANITY_READ_TOKEN"),
  writeToken: pick("SANITY_API_WRITE_TOKEN", "SANITY_WRITE_TOKEN", "SANITY_API_TOKEN", "SANITY_TOKEN", "SANITY_AUTH_TOKEN"),
  webhookSecret: pick("SANITY_REVALIDATE_SECRET", "SANITY_WEBHOOK_SECRET"),
};

export const configured = () => !!sanity.projectId;
// SANITY_API_BASE points at a local stand-in for tests (scripts/sanity-mock.mjs); unset in production.
export const base = (cdn) => pick("SANITY_API_BASE") || `https://${sanity.projectId}.${cdn ? "apicdn" : "api"}.sanity.io/v${sanity.apiVersion}`;

export async function query(groq, params = {}, init = {}) {
  const qs = new URLSearchParams({ query: groq, perspective: "published" });
  for (const [k, v] of Object.entries(params)) qs.set("$" + k, JSON.stringify(v));
  const token = sanity.readToken || sanity.writeToken;
  const res = await fetch(`${base(!token)}/data/query/${sanity.dataset}?${qs}`, { ...init, headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text().catch(() => "")}`.slice(0, 300));
  return (await res.json()).result;
}

export async function mutate(mutations, { token = sanity.writeToken, returnIds = false } = {}) {
  if (!token) throw new Error("No Sanity write token");
  const res = await fetch(`${base(false)}/data/mutate/${sanity.dataset}?returnIds=${returnIds}&visibility=async`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ mutations })
  });
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${await res.text().catch(() => "")}`.slice(0, 500));
  return res.json();
}
