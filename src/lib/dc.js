// Runtime for components generated from Claude Design's .dc.html pages (see scripts/dc-to-jsx.mjs).
// Mirrors the dc-runtime semantics the prototype relied on: render values merged over props,
// {{ }} text holes that drop undefined/booleans, string styles parsed into objects.
"use client";
import React from "react";

export class DCLogic extends React.Component {
  renderVals() {
    return {};
  }
  render() {
    return this.template({ ...this.props, ...(this.renderVals() || {}) });
  }
}

export const dcList = v => (Array.isArray(v) ? v : []);
export const dcStr = v => (v == null ? "" : v);
export function dcText(v) {
  if (v == null || typeof v === "boolean") return null;
  if (React.isValidElement(v) || Array.isArray(v)) return v;
  return String(v);
}
export function dcCss(v) {
  if (v == null || typeof v !== "string") return v || undefined;
  const o = {};
  for (const decl of v.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const p = decl.slice(0, i).trim();
    o[p.startsWith("--") ? p : p.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o;
}

// The prototype routed on location.hash ("#/library?q=x"). The app routes on paths ("/library?q=x").
const toPath = h => (typeof h === "string" && h.startsWith("#/") ? h.slice(1) : h);
export const dcHref = toPath;

let router = null;
let silent = false;
export const RDNav = {
  href: toPath,
  go(h) {
    const p = toPath(h.startsWith("#") || h.startsWith("/") ? h : "/" + h);
    router ? router.push(p) : (location.href = p);
  },
  // Update the URL without a route change, as history.replaceState on the hash did.
  replace(h) {
    const p = toPath(h);
    if (p === location.pathname + location.search) return;
    silent = true;
    history.replaceState(history.state, "", p);
  },
  // Called by the app shell on every pathname/search change.
  attach(r) {
    router = r;
  },
  changed() {
    if (silent) {
      silent = false;
      return;
    }
    window.dispatchEvent(new Event("rd:route"));
  },
};
if (typeof window !== "undefined") window.RDNav = RDNav;
