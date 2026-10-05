// window.RDX: what the Builder logic calls for files and share links. Export libraries load on first use.
import type { AgendaDoc } from "./agenda";

type Share = { id: string; key: string };
async function share(workshop: unknown, prev?: Share | null) {
  const r = await fetch("/api/workshops", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workshop, ...(prev || {}) }) });
  if (r.status === 503) throw new Error("Sharing isn't switched on yet.");
  if (!r.ok) throw new Error("Couldn't save the link. Try again.");
  const d = await r.json();
  return { id: d.id as string, key: d.key as string, url: `${location.origin}/builder?w=${d.id}` };
}
async function load(id: string) {
  const r = await fetch(`/api/workshops/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (!r.ok) throw new Error(r.status === 404 ? "That shared workshop doesn't exist." : "Couldn't open the shared workshop.");
  return (await r.json()).workshop;
}

export const RDX = {
  pdf: async (doc: AgendaDoc) => (await import("./exporters")).agendaPdf(doc),
  docx: async (doc: AgendaDoc) => (await import("./exporters")).agendaDocx(doc),
  share,
  load
};
