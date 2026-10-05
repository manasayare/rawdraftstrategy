"use client";
// Library panel: search, filters, structure blocks, suggestions and resources. Drag or tap "+ Add".
import type { CSSProperties } from "react";
import { C, STRUCTS, STRUCT_MINS } from "../constants";
import { RDB, RDL, type LibItem } from "../engine";
import { expand, mkStruct, uid } from "../items";
import { FILTER_ROWS, TYPE_LABELS, knownTime, searchLibrary } from "../library";
import { contextRecommendations } from "../import/toWorkshop";
import { BLANK_FILTERS, type LibFilters } from "../types";
import { BODY, Chip, DISPLAY, Kicker, KickerRow, field, path, textBtn, useBuilder } from "../ui";

/** On wide screens panels sit beside the canvas; on phones they open as bottom sheets. */
export const panelStyle = (wide: boolean, show: boolean): CSSProperties => ({
  position: wide ? "sticky" : "fixed", display: show ? "block" : "none", top: wide ? "84px" : "auto", left: 0, right: 0, bottom: 0,
  maxHeight: wide ? "calc(100vh - 100px)" : "86vh", overflow: "auto", zIndex: 80, background: wide ? "transparent" : "#0f0f0e",
  borderTop: wide ? "0" : "1px solid " + C.edge, padding: wide ? "0 4px 24px 0" : "16px 16px 28px", boxShadow: wide ? "none" : "0 -24px 60px rgba(0,0,0,.7)", minWidth: 0
});

const cardText: CSSProperties = { marginTop: 4, fontSize: 13, lineHeight: 1.4, color: C.soft };
const addBtn = textBtn({ marginTop: 6, color: C.ink, fontSize: 13, minHeight: 28 });

export default function LibraryPanel() {
  const { S, store, d } = useBuilder();
  const { wide, eb } = d;
  const L = S.lib, B = RDB();
  const { pool, results, parsed, activeFilters } = searchLibrary(L);
  const touch = wide ? "none" : "auto";
  const setL = (k: keyof LibFilters, v: string) => store.set(s => ({ lib: { ...s.lib, [k]: s.lib[k] === v ? "" : v }, libN: 24 }));

  // Suggestions: next to an anchor block ("What comes before/after?"), else after the last live block.
  const lastLive = [...eb].reverse().find(x => !x.pre && x.role !== "breaks");
  const sf = S.suggestFor ? eb.find(x => x.id === S.suggestFor!.id) : undefined;
  const browsing = !!(L.q || L.stage || L.type);
  const sug = browsing ? [] : B.suggest(eb, sf || lastLive || null, sf ? S.suggestFor!.dir : "after");
  const hasContext = !!(S.context || S.brief.question || S.brief.outcome);
  const recs = browsing || sf || !hasContext ? [] : contextRecommendations(S.context?.brief, S.brief, new Set(S.items.map(x => x.ref || "").concat(sug.map(x => x.it.id))), 5);

  const card = (it: LibItem, why?: string) => {
    const deco = RDL().deco(it), open = S.libPrev === it.id, isW = it.type === "workshop", n = isW ? expand(it).filter(x => x.kind === "block").length : 0;
    return {
      deco, open, isW, n,
      time: isW ? n + " blocks" : knownTime(it) ? B.minsOf(it) + " min" : deco.timeLabel || "",
      add: () => { store.addEnd(expand(it), it.title); store.addRecent([it.id]); if (!wide) store.set({ sheet: null }); },
      addL: isW ? "+ Add all " + n + " blocks" : "+ Add",
      down: (e: React.PointerEvent) => store.beginPress(e, { kind: "lib", id: it.id, isBlock: !isW, title: it.title, mins: isW ? n + " blocks" : B.minsOf(it) + " min", label: deco.typeLabel }),
      short: why || it.short || ""
    };
  };
  const insertNear = (it: LibItem) => {
    const at = S.items.findIndex(y => y.id === sf!.id) + (S.suggestFor!.dir === "before" ? 0 : 1);
    store.insertItems(expand(RDL().get(it.id)), at, it.title + " added");
    store.addRecent([it.id]);
  };

  return (
    <aside aria-label="Library" data-libpanel="1" style={panelStyle(wide, wide || S.sheet === "lib")}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 20 }}>Library</span>
        {!wide && <button onClick={() => store.set(s => ({ sheet: null, open: wide ? s.open : null }))} aria-label="Close library" style={{ whiteSpace: "nowrap", background: "none", border: "1px solid " + C.line, color: C.ink, minWidth: 40, minHeight: 40, cursor: "pointer" }}>×</button>}
        {wide && <span style={{ fontSize: 13, color: C.mute }}>Drag into the workshop</span>}
      </div>
      <div role="tablist" aria-label="Library source" style={{ display: "flex", flexWrap: "wrap", gap: "0 14px", marginTop: 8, borderBottom: "1px solid " + C.rule }}>
        {([["raw", "Raw Draft"], ["mine", "My Library"], ["saved", "Saved"], ["recent", "Recent"]] as const).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={S.libTab === k} onClick={() => store.set({ libTab: k })} style={{ whiteSpace: "nowrap", background: "none", border: 0, borderBottom: "2px solid " + (S.libTab === k ? C.accent : "transparent"), marginBottom: -1, color: S.libTab === k ? C.ink : C.mute, minHeight: 36, padding: 0, cursor: "pointer", fontSize: 14 }}>
            {l}{k === "mine" && S.mylib.templates.length + S.mylib.activities.length ? " · " + (S.mylib.templates.length + S.mylib.activities.length) : k === "saved" && S.mylib.saved.length ? " · " + S.mylib.saved.length : ""}
          </button>
        ))}
      </div>
      {S.libTab !== "raw" ? <MyLibraryTab card={card} /> : <>
      <input aria-label="Search the Library" value={L.q} onChange={e => { const q = e.target.value; store.set(s => ({ lib: { ...s.lib, q }, libN: 24 })); }} placeholder="icebreaker for 12 people" className="bf-line"
        style={{ display: "block", width: "100%", marginTop: 10, background: C.well, border: "1px solid " + C.line, outline: "none", color: C.ink, minHeight: 44, padding: "0 12px", fontFamily: BODY, fontSize: 15 }} />
      {parsed && <div style={{ marginTop: 6, fontSize: 13, color: C.mute }}>Reading as: {parsed}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
        <button onClick={() => store.set(s => ({ filters: !s.filters }))} aria-expanded={S.filters ? "true" : "false"} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 14, minHeight: 32 })}>{(S.filters ? "Hide filters" : "Filters") + (activeFilters ? " · " + activeFilters : "")}</button>
        {(activeFilters > 0 || !!L.q) && <button onClick={() => store.set({ lib: { ...BLANK_FILTERS } })} style={textBtn({ color: C.mute, fontSize: 14, minHeight: 32 })}>Clear</button>}
      </div>
      {S.filters && (
        <>
          <label style={{ display: "block", marginTop: 6 }}>
            <span style={{ display: "block", fontSize: 12, color: C.mute }}>Type</span>
            <select value={L.type} onChange={e => { const type = e.target.value; store.set(s => ({ lib: { ...s.lib, type } })); }} style={{ ...field, width: "100%", marginTop: 4, minHeight: 38, padding: "0 8px", fontSize: 14 }}>
              {Object.keys(TYPE_LABELS).map(k => <option key={k} value={k}>{TYPE_LABELS[k]}</option>)}
            </select>
          </label>
          {FILTER_ROWS().map(([label, key, opts]) => (
            <div key={key} role="group" aria-label={label} style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, color: C.mute }}>{label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
                {opts.map(([v, l]) => <Chip key={v} on={L[key] === v} onClick={() => setL(key, v)} style={{ minHeight: 30, padding: "0 8px", fontSize: 13 }}>{l}</Chip>)}
              </div>
            </div>
          ))}
        </>
      )}

      <Kicker style={{ marginTop: 16 }}>STRUCTURE</Kicker>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        {STRUCTS.map(([t, l]) => (
          <button key={t} aria-label={"Add " + l + ". Drag to place it."} className="bh-line-ink"
            onPointerDown={e => store.beginPress(e, { kind: "struct", t, isBlock: ["break", "lunch", "custom"].includes(t), title: l, mins: STRUCT_MINS[t], label: "Structure" })}
            onClick={() => {
              if (store.justDragged) return;
              const it = mkStruct(t);
              if (t === "section" || t === "day") store.insertItems([it], null, l + " added"); else store.addEnd([it], l);
              if (t === "custom") store.set({ open: it.id, sheet: wide ? null : "assist" }); else if (!wide) store.set({ sheet: null });
            }}
            style={{ whiteSpace: "nowrap", touchAction: touch, background: C.card, border: "1px dashed " + C.faint, color: C.ink, minHeight: 36, padding: "0 10px", cursor: "grab", fontSize: 13 }}>+ {l}</button>
        ))}
      </div>

      {recs.length > 0 && (
        <>
          <div style={{ marginTop: 18, fontSize: 12, letterSpacing: ".06em", color: C.accent }}>FOR THIS WORKSHOP</div>
          <div style={{ marginTop: 4, fontSize: 13, color: C.mute }}>From your context</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {recs.map(it => {
              const c = card(it);
              return (
                <div key={it.id} onPointerDown={c.down} className="bh-line-mute" style={{ touchAction: touch, background: C.card, border: "1px solid " + C.edge, padding: "10px 12px", cursor: "grab", userSelect: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{(c.deco.typeLabel || "").toUpperCase()}</span><span>{c.time}</span></div>
                  <div style={{ marginTop: 3, fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, lineHeight: 1.1 }}>{it.title}</div>
                  <div style={{ ...cardText, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{it.short}</div>
                  <button onClick={c.add} className="bh-accent" style={addBtn}>{c.addL}</button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {sug.length > 0 && (
        <>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{sf ? (S.suggestFor!.dir === "before" ? "BEFORE " : "AFTER ") + (sf.title || "").toUpperCase() : lastLive ? "SUGGESTED NEXT, AFTER " + (lastLive.title || "").toUpperCase() : "GOOD WAYS TO START"}</span>
            {sf && <button onClick={() => store.set({ suggestFor: null })} style={textBtn({ color: C.mute, fontSize: 13 })}>Clear</button>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {sug.map(s => {
              const c = card(s.it, s.why);
              return (
                <div key={s.it.id} onPointerDown={c.down} className="bh-line-mute" style={{ touchAction: touch, background: C.card, border: "1px solid " + C.edge, padding: "10px 12px", cursor: "grab", userSelect: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{(c.deco.typeLabel || "").toUpperCase()}</span><span>{c.time}</span></div>
                  <div style={{ marginTop: 3, fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, lineHeight: 1.1 }}>{s.it.title}</div>
                  <div style={cardText}>{s.why}</div>
                  <button onClick={sf ? () => insertNear(s.it) : c.add} className="bh-accent" style={addBtn}>{sf ? "+ Add " + S.suggestFor!.dir + " " + sf.title : "+ Add"}</button>
                </div>
              );
            })}
          </div>
        </>
      )}

      <KickerRow style={{ marginTop: 18 }} left="RESOURCES" right={results.length + " of " + pool.length} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {results.slice(0, S.libN).map(it => {
          const c = card(it), steps = (it.steps || []).filter((s): s is string => typeof s === "string").slice(0, 4), out = (it.outputs || []).slice(0, 2).join(", ");
          return (
            <div key={it.id} onPointerDown={c.down} className="bh-line-mute"
              style={{ touchAction: touch, background: C.card, border: "1px solid " + C.line, padding: "10px 12px", cursor: "grab", userSelect: "none", transform: `rotate(${((it._n || 1) % 3 - 1) * 0.35}deg)`, transition: "border-color .15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{(c.deco.typeLabel || "").toUpperCase()}</span><span style={{ display: "flex", gap: 8, alignItems: "center" }}>{c.time}<SaveStar id={it.id} /></span></div>
              <button onClick={() => store.set({ libPrev: c.open ? null : it.id })} aria-expanded={c.open ? "true" : "false"} className="bh-accent"
                style={{ display: "block", width: "100%", textAlign: "left", marginTop: 3, background: "none", border: 0, padding: 0, color: C.ink, cursor: "pointer", fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, lineHeight: 1.1 }}>{it.title}</button>
              <div style={{ ...cardText, display: "-webkit-box", WebkitLineClamp: c.open ? 8 : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.short}</div>
              {!!(it.outputs || []).length && <div style={{ marginTop: 5, fontSize: 12, color: C.mute }}>OUTPUT <span style={{ color: C.soft }}>{out}</span></div>}
              {c.open && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid " + C.rule, fontSize: 13, lineHeight: 1.45, color: C.soft }}>
                  {!!(it.useWhen || []).length && <div><span style={{ color: C.mute }}>Use when </span>{it.useWhen![0]}</div>}
                  {steps.length > 0 && <ol style={{ margin: "6px 0 0", paddingLeft: 18 }}>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>}
                  <div style={{ marginTop: 6 }}><span style={{ color: C.mute }}>Source </span>{c.deco.creatorLabel}</div>
                  <a href={path(c.deco.href)} style={{ display: "inline-flex", marginTop: 6, color: C.accent }}>Full Library page</a>
                </div>
              )}
              <button onClick={c.add} className="bh-accent" style={addBtn}>{c.addL}</button>
            </div>
          );
        })}
      </div>
      {results.length > S.libN && <button onClick={() => store.set(s => ({ libN: s.libN + 24 }))} style={{ whiteSpace: "nowrap", marginTop: 10, width: "100%", background: "none", border: "1px solid " + C.line, color: C.soft, minHeight: 40, cursor: "pointer", fontSize: 14 }}>Show more</button>}
      {!results.length && <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}>Nothing matches. Clear a filter, or add a custom block.</p>}
      </>}
    </aside>
  );
}

function SaveStar({ id }: { id: string }) {
  const { S, store } = useBuilder();
  const on = S.mylib.saved.includes(id);
  return <button onClick={e => { e.stopPropagation(); store.toggleSaved(id); }} aria-pressed={on} aria-label={on ? "Remove from Saved" : "Save to My Library"} title={on ? "Saved" : "Save"} className="bh-accent" style={{ background: "none", border: 0, padding: 0, minWidth: 22, minHeight: 22, cursor: "pointer", color: on ? C.accent : C.mute, fontSize: 15, lineHeight: 1 }}>{on ? "★" : "☆"}</button>;
}

type CardFn = (it: LibItem, why?: string) => { deco: { typeLabel: string }; time: string; add: () => void; addL: string; down: (e: React.PointerEvent) => void; short: string };

/** My Library, Saved and Recent tabs. */
function MyLibraryTab({ card }: { card: CardFn }) {
  const { S, store, d } = useBuilder();
  const m = S.mylib, tab = S.libTab;
  const libCards = (ids: string[], empty: string) => {
    const items = ids.map(id => RDL().get(id)).filter((x): x is LibItem => !!x);
    if (!items.length) return <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}>{empty}</p>;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        {items.map(it => { const c = card(it); return (
          <div key={it.id} onPointerDown={c.down} className="bh-line-mute" style={{ background: C.card, border: "1px solid " + C.line, padding: "10px 12px", cursor: "grab", userSelect: "none", touchAction: d.wide ? "none" : "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{(c.deco.typeLabel || "").toUpperCase()}</span><span style={{ display: "flex", gap: 8 }}>{c.time}<SaveStar id={it.id} /></span></div>
            <div style={{ marginTop: 3, fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, lineHeight: 1.1 }}>{it.title}</div>
            <div style={{ ...cardText, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.short}</div>
            <button onClick={c.add} className="bh-accent" style={addBtn}>{c.addL}</button>
          </div>
        ); })}
      </div>
    );
  };
  if (tab === "saved") return libCards(m.saved, "Star a Library card to keep it here.");
  if (tab === "recent") return libCards(m.recent, "Methods you add to workshops show up here.");
  return (
    <div style={{ marginTop: 12 }}>
      <Kicker>TEMPLATES</Kicker>
      {m.templates.map(t => (
        <div key={t.id} style={{ padding: "10px 0", borderBottom: "1px solid " + C.hair }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 17 }}>{t.name}</div>
          <div style={{ marginTop: 2, fontSize: 12, color: C.mute }}>{t.items.filter(x => x.kind === "block" && x.zone === "live").length} blocks{t.fromRun ? " · proven in a run" : ""}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button onClick={() => store.openMyTemplate(t)} className="bh-accent" style={textBtn({ color: C.ink, fontSize: 13, minHeight: 28 })}>Open as new workshop</button>
            <button onClick={() => store.removeTemplate(t.id)} className="bh-accent" style={textBtn({ color: C.mute, fontSize: 13, minHeight: 28 })}>Remove</button>
          </div>
        </div>
      ))}
      {!m.templates.length && <p style={{ margin: "6px 0 0", fontSize: 13, color: C.mute }}>Save a workshop as a template from Review, or from the Context panel.</p>}
      <Kicker style={{ marginTop: 18 }}>MY ACTIVITIES</Kicker>
      {m.activities.map(a => (
        <div key={a.id} style={{ background: C.card, border: "1px solid " + C.line, padding: "10px 12px", marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.mute }}><span>{a.ref ? "ADAPTED" : "CUSTOM"}</span><span>{a.mins} min</span></div>
          <div style={{ marginTop: 3, fontFamily: DISPLAY, fontWeight: 500, fontSize: 17 }}>{a.title}</div>
          {a.cfg.purpose && <div style={cardText}>{a.cfg.purpose}</div>}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => store.addEnd([{ id: uid(), kind: "block", zone: "live", title: a.title, mins: a.mins, role: a.role || "custom", ref: a.ref, cfg: { ...a.cfg }, custom: !a.ref }], a.title)} className="bh-accent" style={addBtn}>+ Add</button>
            <button onClick={() => store.removeActivity(a.id)} className="bh-accent" style={{ ...addBtn, color: C.mute }}>Remove</button>
          </div>
        </div>
      ))}
      {!m.activities.length && <p style={{ margin: "6px 0 0", fontSize: 13, color: C.mute }}>Open any block and choose “Save to My Library” to keep your own version.</p>}
    </div>
  );
}
