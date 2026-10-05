// Compiles the Claude Design export in project/*.dc.html into React components for the Next.js app.
//
//   node scripts/dc-to-jsx.mjs
//
// Each .dc.html page has three parts: a <helmet> (fonts, global CSS, engine scripts), a template
// (HTML with {{ }} bindings, <sc-if>, <sc-for>, <dc-import>, style-hover/style-focus), and a logic
// class (`class Component extends DCLogic`). The template becomes JSX with the same inline styles,
// the logic class is kept as written, and the few places that assume hash routing are patched
// (PATCHES below). Re-run after a new export; nothing in src/generated is edited by hand.
import { parseDocument } from "htmlparser2";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "project");
const OUT = path.join(ROOT, "src/generated");
const RD_OUT = path.join(ROOT, "src/rd");

const PAGES = {
  "Raw Draft": "RawDraft",
  "RD Item": "RDItem",
  "RD Library": "RDLibrary",
  "RD Pages": "RDPages",
  "RD Sprints": "RDSprints",
  "RD Work": "RDWork",
  "RD Suggest": "RDSuggest",
};

// Pages that have been rebuilt as hand-written React. dc-import resolves to these instead of generated code.
const NATIVE = {
  "RD Builder": ["Builder", "@/builder/Builder"],
};

// Engine and data scripts, in the order Raw Draft.dc.html loads them.
const ENGINE = ["rd-data.js", "rd-backlog.js", "rd-sprint-formats.js", "rd-network.js", "rd-builder.js", "rd-lib.js", "rd-cycle.js", "rd-cycle-scroll.js", "rd-uptime.js", "rd-ascii.js", "rd-structure.js", "rd-visual.js"];

// Hash routing → path routing. Every replacement must match exactly once.
const PATCHES = {
  "Raw Draft": [
    [`parse() { const h = (location.hash || "#/").slice(1);`, `parse() { const h = location.pathname + location.search;`],
    [`window.addEventListener("hashchange", this.onHash);`, `window.addEventListener("rd:route", this.onHash);`],
    [`window.removeEventListener("hashchange", this.onHash);`, `window.removeEventListener("rd:route", this.onHash);`],
    [`go(h) { location.hash = h.replace(/^#/, ""); }`, `go(h) { RDNav.go(h); }`],
  ],
  "RD Library": [
    [`if (location.hash !== "#/library") location.hash = "/library";`, `if (location.pathname + location.search !== "/library") RDNav.go("/library");`],
  ],
  "RD Pages": [
    [`history.replaceState(null, "", k === "work"`, `RDNav.replace(k === "work"`],
  ],
  "RD Builder": [
    [`history.replaceState(null, "", "#/builder");`, `RDNav.replace("#/builder");`],
    [/location\.origin \+ location\.pathname \+ RDL\.deco\(RDL\.get\(x\.ref\)\)\.href/g, `location.origin + RDNav.href(RDL.deco(RDL.get(x.ref)).href)`],
  ],
};
const ENGINE_PATCHES = {
  "rd-lib.js": [[`const go = h => { location.hash = h.replace(/^#/, ""); };`, `const go = h => { RDNav.go(h); };`]],
};

const EVENT_MAP = Object.fromEntries("Click Change Input Submit KeyDown KeyUp KeyPress MouseDown MouseUp MouseEnter MouseLeave Focus Blur DoubleClick ContextMenu MouseMove MouseOver MouseOut PointerDown PointerUp PointerMove PointerEnter PointerLeave PointerCancel PointerOver PointerOut GotPointerCapture LostPointerCapture TouchStart TouchEnd TouchMove TouchCancel DragStart DragEnd DragEnter DragLeave DragOver AnimationStart AnimationEnd AnimationIteration TransitionEnd".split(" ").map(e => ["on" + e.toLowerCase(), "on" + e]));
const ATTR_MAP = { class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", maxlength: "maxLength", autocomplete: "autoComplete", inputmode: "inputMode", spellcheck: "spellCheck", autofocus: "autoFocus", colspan: "colSpan", rowspan: "rowSpan", enterkeyhint: "enterKeyHint" };
const VOID = new Set("area base br col embed hr img input link meta source track wbr".split(" "));

const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const js = s => JSON.stringify(s);
const cssToObj = css => {
  const o = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const p = decl.slice(0, i).trim();
    o[p.startsWith("--") ? p : camel(p)] = decl.slice(i + 1).trim();
  }
  return o;
};

// ---- {{ expression }} language: paths, ===/!==/==/!=, !, literals ----
function compileExpr(src, scope) {
  const e = String(src).trim();
  if (!e) return "undefined";
  if (e[0] === "(" && e.at(-1) === ")" && wrapsWhole(e)) return compileExpr(e.slice(1, -1), scope);
  const eq = topEquality(e);
  if (eq) return `(${compileExpr(e.slice(0, eq.index), scope)} ${eq.op} ${compileExpr(e.slice(eq.index + eq.op.length), scope)})`;
  if (e[0] === "!") return `!${compileExpr(e.slice(1), scope)}`;
  if (["true", "false", "null", "undefined"].includes(e) || /^-?\d+(\.\d+)?$/.test(e)) return e;
  if (e.length >= 2 && (e[0] === '"' || e[0] === "'") && e.at(-1) === e[0]) return js(e.slice(1, -1));
  return compilePath(e, scope);
}
function wrapsWhole(e) {
  let d = 0;
  for (let i = 0; i < e.length - 1; i++) { if (e[i] === "(") d++; else if (e[i] === ")" && --d === 0) return false; }
  return true;
}
function topEquality(e) {
  let d = 0;
  for (let i = 0; i < e.length; i++) {
    const c = e[i];
    if (c === "[" || c === "(") d++;
    else if (c === "]" || c === ")") d--;
    else if (d === 0 && (c === "=" || c === "!") && e[i + 1] === "=") {
      if (i > 0 && (e[i - 1] === "=" || e[i - 1] === "!")) continue;
      if (!e.slice(0, i).trim()) continue;
      const op = e[i + 2] === "=" ? c + "==" : c + "=";
      return { index: i, op };
    }
  }
  return null;
}
function compilePath(e, scope) {
  const head = e.match(/^[A-Za-z_$][\w$]*/);
  if (!head) return "undefined";
  let out = scope.has(head[0]) ? scope.get(head[0]) : `V.${head[0]}`;
  let i = head[0].length;
  while (i < e.length) {
    if (e[i] === ".") {
      const m = e.slice(i + 1).match(/^[A-Za-z_$][\w$]*/) || e.slice(i + 1).match(/^\d+/);
      if (!m) return "undefined";
      out += /^\d/.test(m[0]) ? `?.[${m[0]}]` : `?.${m[0]}`;
      i += 1 + m[0].length;
    } else if (e[i] === "[") {
      let d = 1, j = i + 1;
      for (; j < e.length && d > 0; j++) { if (e[j] === "[") d++; else if (e[j] === "]" && --d === 0) break; }
      out += `?.[${compileExpr(e.slice(i + 1, j), scope)}]`;
      i = j + 1;
    } else return "undefined";
  }
  return out;
}
// attribute value → JS expression
function compileAttr(raw, scope) {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
  if (whole) return { expr: compileExpr(whole[1], scope), dynamic: true, whole: true };
  if (raw.includes("{{")) {
    const parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
    const tpl = parts.map((p, i) => (i & 1 ? "${dcStr(" + compileExpr(p, scope) + ")}" : p.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${"))).join("");
    return { expr: "`" + tpl + "`", dynamic: true };
  }
  return { expr: js(raw), dynamic: false, raw };
}

// ---- template → JSX ----
function makeCompiler(page, pseudoSheet) {
  const imports = new Set();
  let loopN = 0;

  function children(nodes, scope, ind) {
    return nodes.map(n => node(n, scope, ind)).filter(Boolean);
  }
  function node(n, scope, ind) {
    if (n.type === "text") return text(n.data, scope, ind);
    if (n.type !== "tag" && n.type !== "script" && n.type !== "style") return null;
    const tag = n.name;
    if (tag === "helmet") return null;
    if (tag === "sc-if") {
      const c = compileExpr(n.attribs.value.replace(/^\s*\{\{|\}\}\s*$/g, ""), scope);
      const kids = children(n.children, scope, ind + "    ");
      if (!kids.length) return null;
      return `${ind}{${c} ? (\n${ind}  <>\n${kids.join("\n")}\n${ind}  </>\n${ind}) : null}`;
    }
    if (tag === "sc-for") {
      const list = compileExpr(n.attribs.list.replace(/^\s*\{\{|\}\}\s*$/g, ""), scope);
      const as = n.attribs.as || "item";
      const id = `${as.replace(/\W/g, "_")}_${loopN}`, ix = `$i${loopN++}`;
      const sub = new Map(scope).set(as, id).set("$index", ix);
      const kids = children(n.children, sub, ind + "    ");
      return `${ind}{dcList(${list}).map((${id}, ${ix}) => (\n${ind}  <React.Fragment key={${ix}}>\n${kids.join("\n")}\n${ind}  </React.Fragment>\n${ind}))}`;
    }
    if (tag === "dc-import") {
      const native = NATIVE[n.attribs.name];
      const comp = native ? native[0] : PAGES[n.attribs.name];
      if (!comp) throw new Error(`${page}: unknown dc-import ${n.attribs.name}`);
      imports.add(native ? native.join("|") : comp);
      const props = Object.entries(n.attribs).filter(([k]) => !["name", "hint-size", "style"].includes(k))
        .map(([k, v]) => `${camel(k)}={${compileAttr(v, scope).expr}}`);
      return `${ind}<div className="sc-host"><${comp} ${props.join(" ")} /></div>`;
    }
    return element(n, scope, ind);
  }
  function text(data, scope, ind) {
    if (!data.includes("{{")) {
      if (!data.trim() && !data.includes(" ")) return null;
      return `${ind}{${js(data)}}`;
    }
    const parts = data.split(/\{\{([\s\S]+?)\}\}/g);
    return parts.map((p, i) => (i & 1 ? `${ind}{dcText(${compileExpr(p, scope)})}` : p ? `${ind}{${js(p)}}` : null)).filter(Boolean).join("\n");
  }
  function element(n, scope, ind) {
    const tag = n.name, custom = tag.includes("-");
    const props = [], classes = [];
    const dynAttrs = [];
    for (const [k0, v] of Object.entries(n.attribs)) {
      if (k0.startsWith("style-")) { classes.push(pseudoSheet(k0.slice(6), v)); continue; }
      let k = k0;
      const lk = k0.toLowerCase();
      if (EVENT_MAP[lk]) k = EVENT_MAP[lk];
      else if (ATTR_MAP[lk] && !custom) k = ATTR_MAP[lk];
      const a = compileAttr(v, scope);
      if (k === "style") {
        props.push(a.dynamic ? `style={dcCss(${a.expr})}` : `style={${js(cssToObj(a.raw))}}`);
      } else if (k === "href") {
        props.push(a.dynamic ? `href={dcHref(${a.expr})}` : `href=${js(hrefStatic(a.raw))}`);
      } else if ((k === "value" || k === "checked") && a.dynamic) {
        props.push(`${k}={${a.expr} ?? ${k === "checked" ? "false" : '""'}}`);
      } else if (k === "className") {
        classes.unshift(a.dynamic ? "${dcStr(" + a.expr + ")}" : a.raw);
      } else if (a.dynamic) {
        props.push(`${k}={${a.expr}}`);
        if (custom) dynAttrs.push(a.expr);
      } else {
        props.push(`${k}=${js(a.raw)}`);
      }
    }
    if (classes.length) {
      const cn = classes.join(" ");
      props.push(cn.includes("${") ? "className={`" + cn + "`}" : `className=${js(cn)}`);
    }
    // Custom elements read attributes on connect; remount them when a bound attribute changes.
    if (custom && dynAttrs.length) props.unshift(`key={[${dynAttrs.join(", ")}].join("|")}`);
    const open = `<${tag}${props.length ? " " + props.join(" ") : ""}`;
    if (VOID.has(tag)) return `${ind}${open} />`;
    const kids = children(n.children, scope, ind + "  ");
    if (!kids.length) return `${ind}${open}></${tag}>`;
    return `${ind}${open}>\n${kids.join("\n")}\n${ind}</${tag}>`;
  }
  return { node, children, imports };
}
const hrefStatic = h => (h.startsWith("#/") ? h.slice(1) : h);

function pseudoSheetFactory() {
  const rules = [], cache = new Map();
  const fn = (pseudo, css) => {
    const k = pseudo + "|" + css;
    if (cache.has(k)) return cache.get(k);
    const cls = "scp-" + pseudo + "-" + cache.size.toString(36);
    const body = css.split(";").map(d => d.trim()).filter(Boolean).map(d => (/!\s*important$/i.test(d) ? d : d + " !important")).join(";");
    rules.push(`.${cls}:${pseudo}{${body}}`);
    cache.set(k, cls);
    return cls;
  };
  fn.rules = rules;
  return fn;
}

// ---- logic class ----
function applyPatches(src, patches, label) {
  for (const [from, to] of patches || []) {
    if (from instanceof RegExp) {
      const n = (src.match(from) || []).length;
      if (!n) throw new Error(`${label}: patch ${from} matched nothing`);
      src = src.replace(from, to);
      continue;
    }
    const at = src.indexOf(from);
    if (at < 0 || src.indexOf(from, at + 1) >= 0) throw new Error(`${label}: patch must match once: ${from.slice(0, 60)}`);
    src = src.slice(0, at) + to + src.slice(at + from.length);
  }
  return src;
}

// ---- main ----
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(RD_OUT, { recursive: true });
const pseudo = pseudoSheetFactory();
const helmetCss = [];

for (const [file, comp] of Object.entries(PAGES)) {
  const src = fs.readFileSync(path.join(SRC, file + ".dc.html"), "utf8");
  const body = src.slice(src.indexOf("<x-dc>") + 6, src.lastIndexOf("</x-dc>"));
  const doc = parseDocument(body, { lowerCaseAttributeNames: false, lowerCaseTags: false, recognizeSelfClosing: true });

  const helmet = doc.children.find(c => c.name === "helmet");
  if (helmet) for (const c of helmet.children) if (c.name === "style") helmetCss.push(c.children.map(t => t.data).join(""));

  const C = makeCompiler(file, pseudo);
  const roots = doc.children.filter(c => c.name !== "helmet");
  const jsx = C.children(roots, new Map(), "      ");

  const script = src.match(/<script type="text\/x-dc" data-dc-script>([\s\S]*?)<\/script>/);
  if (!script) throw new Error(file + ": no logic");
  // The logic refers to its own class as `Component` (Component.NAV, Component.AREAS), so the name stays.
  let logic = script[1].trim();
  logic = applyPatches(logic, PATCHES[file], file);

  const out = `// GENERATED by scripts/dc-to-jsx.mjs from project/${file}.dc.html. Do not edit; re-run the script.
/* eslint-disable */
"use client";
import React from "react";
import { DCLogic, dcList, dcText, dcStr, dcCss, dcHref, RDNav } from "@/lib/dc";
${[...C.imports].map(i => (i.includes("|") ? `import ${i.split("|")[0]} from "${i.split("|")[1]}";` : `import ${i} from "./${i}";`)).join("\n")}

${logic}

Component.displayName = ${js(comp)};
Component.prototype.template = function (V) {
  return (
    <>
${jsx.join("\n")}
    </>
  );
};

export default Component;
`;
  fs.writeFileSync(path.join(OUT, comp + ".jsx"), out);
  console.log("wrote", comp);
}

// Global CSS: helmet styles (deduped by rule text) + generated :hover/:focus classes.
const seen = new Set(), css = [];
for (const block of helmetCss) for (const line of block.split("\n").map(l => l.trim()).filter(Boolean)) if (!seen.has(line)) { seen.add(line); css.push(line); }
fs.writeFileSync(path.join(OUT, "dc.css"), `/* GENERATED by scripts/dc-to-jsx.mjs. Helmet styles from project/*.dc.html and style-hover/style-focus classes. */\n${css.join("\n")}\n${pseudo.rules.join("\n")}\n`);

// Engine scripts, patched for path routing, imported in order by src/rd/index.js.
for (const f of ENGINE) {
  const s = applyPatches(fs.readFileSync(path.join(SRC, f), "utf8"), ENGINE_PATCHES[f], f);
  fs.writeFileSync(path.join(RD_OUT, f), `// COPIED by scripts/dc-to-jsx.mjs from project/${f}.\n` + s);
}
// Engines load in order; `after` hooks run right after a file, e.g. to swap in content from Sanity
// before the files that read it.
fs.writeFileSync(path.join(RD_OUT, "index.js"), `// GENERATED by scripts/dc-to-jsx.mjs. Load order matches Raw Draft.dc.html.
export async function loadEngines(after = {}) {
${ENGINE.map(f => `  await import("./${f}");\n  if (after[${js(f)}]) after[${js(f)}]();`).join("\n")}
}
`);
console.log("wrote dc.css and", ENGINE.length, "engine scripts");
