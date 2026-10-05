"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RDNav } from "@/lib/dc";
import { loadEngines } from "@/rd";
import RawDraft from "@/generated/RawDraft";
import { RDX } from "@/builder/bridge";

// Content comes from Sanity through /api/content; with no CMS connected (204) the bundled data is used.
// Sanity content replaces the bundled records right after the file that defines them loads,
// before any engine that reads them.
let loading = null;
function loadSite() {
  return (loading = loading || (async () => {
    const c = await fetch("/api/content").then(r => (r.status === 200 ? r.json() : null)).catch(() => null);
    await loadEngines(c ? {
      "rd-backlog.js": () => Object.assign(window.RD, { items: c.items, sources: c.sources, work: c.work, notes: c.notes }),
      "rd-network.js": () => Object.assign(window.RDN, { people: c.people, partners: c.partners }),
      "rd-builder.js": () => { if (c.templates.length) window.RDB.TPL.splice(0, window.RDB.TPL.length, ...c.templates); }
    } : {});
    window.RD.fromCMS = !!c;
    window.RDX = RDX;
  })());
}

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { loadSite().then(() => setReady(true)); }, []);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const first = useRef(true);
  RDNav.attach(router);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    RDNav.changed();
  }, [pathname, search]);

  // Plain <a href="/…"> links from the prototype navigate client-side.
  useEffect(() => {
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.hasAttribute("download") || (a.target && a.target !== "_self")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      e.preventDefault();
      router.push(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return ready ? <RawDraft /> : <div style={{ minHeight: "100vh", background: "#0b0b0a" }} />;
}
