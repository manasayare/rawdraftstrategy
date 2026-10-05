"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RDNav } from "@/lib/dc";
import "@/rd";
import RawDraft from "@/generated/RawDraft";

export default function App() {
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

  return <RawDraft />;
}
