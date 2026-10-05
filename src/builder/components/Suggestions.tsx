"use client";
// Suggestions: quiet, continuous notes from an experienced facilitator reading the agenda. The panel
// lists them; blocks carry a small indicator that expands in place. Nothing changes without a preview.
import { C } from "../constants";
import { LEVEL_LABEL, type Level, type Suggestion } from "../suggest/rules";
import { DISPLAY, outline, textBtn, useBuilder } from "../ui";

export const LEVEL_COLOR: Record<Level, string> = { attention: C.accent, improve: C.ink, optional: C.mute };

export function SuggestionCard({ s, compact = false }: { s: Suggestion; compact?: boolean }) {
  const { store } = useBuilder();
  return (
    <div style={{ padding: compact ? "10px 12px" : "12px 0", borderBottom: compact ? 0 : "1px solid " + C.hair, border: compact ? "1px dashed " + (s.level === "attention" ? C.accent : C.faint) : undefined, background: compact ? C.bg : undefined }}>
      <div style={{ fontSize: 11, letterSpacing: ".07em", color: LEVEL_COLOR[s.level] }}>{s.title.toUpperCase()}</div>
      <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.45, color: C.ink }}>{s.text}</div>
      {s.why && <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.4, color: C.mute }}>{s.why}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 8 }}>
        {s.actions.map((a, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); store.runSuggestion(a); }} style={outline({ minHeight: 32, padding: "0 10px", fontSize: 13, border: "1px solid " + (i === 0 ? C.edge : C.line) })}>{a.label}</button>
        ))}
        <span style={{ flex: "1 1 auto" }} />
        <button onClick={e => { e.stopPropagation(); store.dismissSuggestion(s); }} title="Hide until this part of the workshop changes" className="bh-ink" style={textBtn({ color: C.mute, fontSize: 12, minHeight: 30 })}>Keep as is</button>
        <button onClick={e => { e.stopPropagation(); store.dismissSuggestion(s, true); }} title="Don't suggest this for this workshop" className="bh-ink" style={textBtn({ color: C.mute, fontSize: 12, minHeight: 30 })}>Not relevant</button>
      </div>
    </div>
  );
}

export default function SuggestionsPanel() {
  const { S, store, d } = useBuilder();
  const by = (l: Level) => d.sug.filter(s => s.level === l && !s.inlineOnly);
  const att = by("attention"), imp = by("improve"), opt = by("optional");
  const counts = [att.length && att.length + " need" + (att.length === 1 ? "s" : "") + " attention", imp.length && imp.length + " could improve", opt.length && !S.reviewAll && opt.length + " optional"].filter(Boolean).join(" · ");
  const group = (l: Level, list: Suggestion[]) => list.length > 0 && (
    <div key={l} style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".08em", color: LEVEL_COLOR[l] }}>{LEVEL_LABEL[l]}</div>
      <div style={{ borderTop: "1px solid " + C.rule, marginTop: 4 }}>{list.map(s => <SuggestionCard key={s.id} s={s} />)}</div>
    </div>
  );
  return (
    <section id="rd-suggestions" aria-label="Suggestions" style={{ marginTop: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, paddingBottom: 6, borderBottom: "1px solid " + C.rule }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 19 }}>Suggestions</span>
        <span style={{ fontSize: 13, color: C.mute }}>{counts}</span>
      </div>
      {!d.L.hasBlocks ? <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}>Add activities and suggestions appear here as you build.</p> : (
        <>
          {group("attention", att)}
          {group("improve", imp)}
          {S.reviewAll && group("optional", opt)}
          {!att.length && !imp.length && <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}>Nothing stands out. Suggestions update as you change the workshop.</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginTop: 10 }}>
            {!S.reviewAll && opt.length > 0 && <button onClick={() => store.set({ reviewAll: true })} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 13, minHeight: 32 })}>Review workshop · {opt.length} more idea{opt.length > 1 ? "s" : ""}</button>}
            {S.reviewAll && opt.length > 0 && <button onClick={() => store.set({ reviewAll: false })} className="bh-ink" style={textBtn({ color: C.mute, fontSize: 13, minHeight: 32 })}>Hide optional</button>}
            {d.dismissedCount > 0 && <button onClick={() => store.restoreSuggestions()} className="bh-ink" style={textBtn({ color: C.mute, fontSize: 13, minHeight: 32 })}>Show {d.dismissedCount} set aside</button>}
          </div>
        </>
      )}
    </section>
  );
}

/** Small indicator on a block card. Opens the suggestion in place on the canvas. */
export function SuggestionChip({ id }: { id: string }) {
  const { S, store, d } = useBuilder();
  const list = d.byAt[id] || [];
  if (!list.length) return null;
  const top = list[0], on = S.sugOpen === id;
  return (
    <button onClick={e => { e.stopPropagation(); store.set({ sugOpen: on ? null : id }); }} onPointerDown={e => e.stopPropagation()} aria-expanded={on}
      title={top.text} style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", background: "none", border: 0, padding: 0, cursor: "pointer", fontSize: 12, color: top.level === "attention" ? C.accent : C.soft }}>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 3, background: top.level === "attention" ? C.accent : top.level === "improve" ? C.soft : C.mute }} />
      {top.short || top.title}{list.length > 1 ? " +" + (list.length - 1) : ""}
    </button>
  );
}
