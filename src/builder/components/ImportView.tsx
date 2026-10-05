"use client";
// Import: bring context in from anywhere (an AI conversation, notes, a brief, an agenda), review what
// was understood, then create a workshop from it. The context stays attached to the workshop.
import { useEffect, useMemo, useState } from "react";
import { BRIEF_QUESTIONS, C } from "../constants";
import { RDL } from "../engine";
import { matchAgenda, type AgendaMatch } from "../import/match";
import { BRIEF_FIELDS, missingInformation, parseContext, type ContextBrief, type KeyFacts, type ParsedContext } from "../import/parse";
import { engineBrief, itemsFromMatches, libraryIndex, newSource, suggestedItems } from "../import/toWorkshop";
import { mins } from "../items";
import { hm } from "../time";
import type { Item, SourceType } from "../types";
import { BODY, Chip, DISPLAY, Kicker, KickerRow, accent, field, outline, textBtn, useBuilder } from "../ui";

type ReviewState = { parsed: ParsedContext; brief: ContextBrief; facts: KeyFacts; matches: AgendaMatch[]; name: string; start: string; source: SourceType };

type Kind = SourceType | "workshop" | "connect";
const KINDS: [Kind, string][] = [["paste", "Paste text"], ["ai", "AI conversation"], ["agenda", "Existing agenda"], ["notes", "Notes"], ["file", "Upload document"], ["workshop", "Import workshop"], ["connect", "Connect source"]];
const PLACEHOLDER: Partial<Record<Kind, string>> = {
  paste: "Paste a brief, a PRD, a strategy doc, a Slack thread…",
  ai: "Paste the whole ChatGPT or Claude conversation, or just the answer. “You said / ChatGPT said” markers are fine.",
  agenda: "9:00 Welcome\n9:15 Hopes and Fears\n9:45 Journey Mapping\n10:30 Break\n…",
  notes: "Meeting notes, interview notes, research findings…"
};
const CONNECTORS = ["ChatGPT", "Claude", "Google Drive", "Notion", "Slack", "Miro", "FigJam", "Linear", "Jira", "Confluence"];

const EXAMPLE = `You said:
We're a B2B SaaS company (project management for construction firms). We have two possible product directions for next year: (A) go deeper on enterprise onboarding and permissions, or (B) build a self-serve SMB tier. Leadership can't agree. We've done 12 customer interviews and have churn data showing SMB accounts churn at 4x the rate. I need to run a half-day workshop with 8 people including our CEO, who makes the final call. It'll be in person at our office.

ChatGPT said:
**Goal**
Choose one product direction for next year and agree on what would need to be true for it to work.

**Key assumptions to test**
- Enterprise buyers will pay for advanced permissions
- SMB churn is driven by onboarding, not price

**Desired output**
A chosen direction, the top 5 assumptions behind it, and owners for next steps.

**Proposed agenda**
9:30 Welcome and framing
9:45 Hopes and Fears
10:05 Evidence Review – walk through interviews and churn data
10:50 Break
11:05 Affinity Mapping
11:45 Assumption Mapping
12:15 Note & Vote
12:45 CEO decision and rationale
13:05 Next Actions
13:30 Close`;

const area = { ...field, display: "block", width: "100%", padding: "12px 14px", fontSize: 15, lineHeight: 1.5, resize: "vertical" } as const;

export default function ImportView() {
  const { S, store } = useBuilder();
  const [kind, setKind] = useState<Kind>("ai");
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [review, setReview] = useState<ReviewState | null>(null);
  const fromWorkshop = !!S.wid && S.workshops.some(w => w.id === S.wid);

  // Context sent by a connector arrives here for review, never straight into a workshop.
  useEffect(() => {
    const seed = S.importSeed;
    if (!seed) return;
    store.set({ importSeed: null });
    setText(seed.text);
    const parsed = parseContext(seed.text);
    const brief = { ...parsed.brief };
    Object.entries(seed.brief || {}).forEach(([k, v]) => { if (v && k in brief) (brief as Record<string, string>)[k] = v; });
    if (parsed.agenda.length) { delete parsed.facts.time; delete parsed.facts.minutes; }
    const src: SourceType = seed.sourceType === "chatgpt" || seed.sourceType === "claude" ? "ai" : seed.sourceType === "agenda" || seed.sourceType === "notes" ? seed.sourceType : "connector";
    setReview({ parsed, brief, facts: parsed.facts, matches: matchAgenda(parsed.agenda, libraryIndex()), name: seed.title || parsed.title, start: parsed.agenda.find(a => a.start)?.start || "09:30", source: src });
  }, [S.importSeed]); // eslint-disable-line react-hooks/exhaustive-deps

  const read = () => {
    const parsed = parseContext(text);
    const source: SourceType = kind === "workshop" || kind === "connect" ? "paste" : kind === "paste" && parsed.turns > 1 ? "ai" : kind;
    const matches = matchAgenda(parsed.agenda, libraryIndex());
    const first = parsed.agenda.find(a => a.start);
    // With an agenda, its own times define the length; "half-day" is only a rough label.
    if (parsed.agenda.length) { delete parsed.facts.time; delete parsed.facts.minutes; }
    setReview({ parsed, brief: parsed.brief, facts: parsed.facts, matches, name: parsed.title, start: first?.start || "09:30", source });
  };
  const onFile = async (f?: File) => {
    if (!f) return;
    setErr("");
    if (/\.(pdf|docx?|pptx?|key|pages)$/i.test(f.name)) { setErr("PDF and Office files can't be read here yet. Copy the text in, or export it as .txt or .md."); return; }
    const t = await f.text();
    setText(/\.html?$/i.test(f.name) ? t.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/[ \t]+/g, " ") : t);
  };
  const importWorkshop = () => {
    try {
      const d = JSON.parse(text);
      if (!Array.isArray(d.items)) throw new Error();
      store.newWorkshop({ name: String(d.name || "Imported workshop"), items: d.items, brief: d.brief || {}, start: d.start || "09:30", context: d.context }, { notice: "Workshop imported. Everything is editable." });
    } catch { setErr("That isn't a Raw Draft workshop file. Use “Existing agenda” for a plain agenda."); }
  };

  if (review) return <Review r={review} setR={v => setReview(v)} back={() => setReview(null)} text={text} fromWorkshop={fromWorkshop} />;

  return (
    <div style={{ maxWidth: 980 }}>
      <Kicker>BUILDER · IMPORT</Kicker>
      <h1 style={{ margin: "12px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-.035em", lineHeight: 0.95 }}>Bring in what you already know.</h1>
      <p style={{ margin: "14px 0 0", maxWidth: "62ch", fontSize: 17, lineHeight: 1.5, color: C.soft }}>Paste a ChatGPT or Claude conversation, research notes, a brief or an agenda. Raw Draft pulls out the brief and turns any agenda into editable blocks linked to the Library. You review everything before it becomes a workshop.</p>
      <div role="tablist" aria-label="What are you bringing in?" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24 }}>
        {KINDS.map(([k, l]) => <Chip key={k} on={kind === k} off={C.ink} onClick={() => { setKind(k); setErr(""); }} style={{ minHeight: 38, padding: "0 12px", fontSize: 14 }}>{l}</Chip>)}
      </div>

      {kind === "connect" ? (
        <div style={{ marginTop: 18, border: "1px solid " + C.rule, padding: "18px 20px" }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: C.soft, maxWidth: "62ch" }}>Connectors will send context straight into a workshop. None are live yet; copy and paste works with all of these today.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {CONNECTORS.map(c => <span key={c} style={{ border: "1px dashed " + C.line, color: C.mute, padding: "8px 12px", fontSize: 14 }}>{c} · not connected</span>)}
          </div>
        </div>
      ) : (
        <>
          {kind === "file" && (
            <label style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, border: "1px dashed " + C.edge, padding: "18px 20px", cursor: "pointer", fontSize: 15, color: C.soft }}>
              <input type="file" accept=".txt,.md,.markdown,.csv,.json,.html,.htm,text/*" onChange={e => onFile(e.target.files?.[0])} style={{ fontSize: 14, color: C.soft }} />
              <span>Text, Markdown or HTML. The text appears below to check.</span>
            </label>
          )}
          <textarea aria-label="Context to import" value={text} onChange={e => setText(e.target.value)} rows={14}
            placeholder={kind === "workshop" ? "Paste a Raw Draft workshop .json export" : PLACEHOLDER[kind] || PLACEHOLDER.paste} style={{ ...area, marginTop: 14, minHeight: 280 }} />
          {err && <p role="alert" style={{ margin: "8px 0 0", fontSize: 14, color: C.accent }}>{err}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 14 }}>
            <button onClick={kind === "workshop" ? importWorkshop : read} disabled={!text.trim()} style={accent({ minHeight: 48, padding: "0 22px", fontSize: 16, opacity: text.trim() ? 1 : 0.4 })}>{kind === "workshop" ? "Import workshop" : "Read context"}</button>
            {!text && kind !== "workshop" && <button onClick={() => { setText(EXAMPLE); setKind("ai"); }} className="bh-ink" style={textBtn({ color: C.mute, fontSize: 14, minHeight: 40 })}>Try an example conversation</button>}
            <span style={{ flex: "1 1 auto" }} />
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 13, color: C.mute, maxWidth: "70ch" }}>Nothing is sent anywhere. The text is read in this browser and saved with the workshop as a source you can return to.</p>
        </>
      )}
    </div>
  );
}

const FACT_KEYS: (keyof KeyFacts & ("outcome" | "time" | "people" | "owner" | "format"))[] = ["outcome", "time", "people", "owner", "format"];

function Review({ r, setR, back, text, fromWorkshop }: { r: ReviewState; setR: (v: ReviewState) => void; back: () => void; text: string; fromWorkshop: boolean }) {
  const { S, store, d } = useBuilder();
  const [showEmpty, setShowEmpty] = useState(false);
  const wide = d.wide;
  const b = engineBrief(r.brief, r.facts);
  const hasAgenda = r.matches.some(m => m.kind !== "section" && m.kind !== "day");
  const suggestion = useMemo(() => (hasAgenda ? [] : suggestedItems(b)), [hasAgenda, JSON.stringify(b)]); // eslint-disable-line react-hooks/exhaustive-deps
  const filled = BRIEF_FIELDS.filter(f => r.brief[f.key]), empty = BRIEF_FIELDS.filter(f => !r.brief[f.key]);
  const missing = missingInformation(r.brief, r.facts, r.parsed.agenda.length > 0);
  const linked = r.matches.filter(m => m.kind === "library").length, blocks = r.matches.filter(m => m.kind !== "section" && m.kind !== "day").length;
  const setBrief = (k: keyof ContextBrief, v: string) => setR({ ...r, brief: { ...r.brief, [k]: v } });
  const setMatch = (i: number, m: Partial<AgendaMatch>) => setR({ ...r, matches: r.matches.map((x, j) => (j === i ? { ...x, ...m } : x)) });

  const go = (mode: "agenda" | "blank" | "attach") => {
    const items: Item[] = mode === "blank" ? [] : hasAgenda ? itemsFromMatches(r.matches) : mode === "attach" ? [] : suggestion;
    const context = { brief: r.brief, sources: [newSource(r.source, text)] };
    const n = items.filter(x => x.kind === "block").length;
    store.createFromContext({
      name: r.name || "Untitled workshop", context, brief: b, items, start: r.start, attach: mode === "attach",
      notice: mode === "attach" ? "Context added to this workshop." : mode === "blank" ? "Blank workshop with your context attached. Recommendations in the Library use it." : hasAgenda ? `Imported ${n} blocks, ${linked} linked to the Library. Change anything.` : `First draft of ${n} blocks from your brief. Every block is a Library method you can swap or delete.`
    });
  };

  return (
    <div>
      <button onClick={back} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 14, minHeight: 36, marginBottom: 10 })}>← Edit the text</button>
      <Kicker>BUILDER · IMPORT · REVIEW</Kicker>
      <h1 style={{ margin: "12px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(32px,4.4vw,60px)", letterSpacing: "-.035em", lineHeight: 0.95 }}>Context understood.</h1>
      <p style={{ margin: "10px 0 0", fontSize: 16, color: C.soft, maxWidth: "62ch" }}>Correct anything before building. This stays with the workshop as its brief.</p>
      <label style={{ display: "block", marginTop: 20, maxWidth: 640 }}>
        <span style={{ fontSize: 12, color: C.mute }}>Workshop name</span>
        <input value={r.name} onChange={e => setR({ ...r, name: e.target.value })} style={{ display: "block", width: "100%", marginTop: 4, background: "none", border: 0, borderBottom: "1px solid " + C.line, color: C.ink, padding: "4px 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: 28 }} />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.1fr) minmax(0,1fr)" : "minmax(0,1fr)", gap: "28px 40px", marginTop: 24, alignItems: "start" }}>
        <section aria-label="Brief">
          <Kicker>KEY FACTS</Kicker>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8, marginTop: 8 }}>
            {FACT_KEYS.map(k => {
              const q = BRIEF_QUESTIONS.find(x => x.key === k)!;
              return (
                <label key={k} style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: r.facts[k] ? C.mute : C.accent }}>{q.label}{r.facts[k] ? "" : " · not found"}</span>
                  <select value={(r.facts[k] as string) || ""} onChange={e => setR({ ...r, facts: { ...r.facts, [k]: e.target.value || undefined } })} style={{ ...field, display: "block", width: "100%", marginTop: 4, minHeight: 38, padding: "0 6px", fontSize: 14 }}>
                    <option value="">Not set</option>
                    {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              );
            })}
            <label style={{ minWidth: 0 }}>
              <span style={{ fontSize: 12, color: C.mute }}>Starts</span>
              <input type="time" value={r.start} onChange={e => setR({ ...r, start: e.target.value || "09:30" })} style={{ ...field, display: "block", width: "100%", marginTop: 4, minHeight: 38, padding: "0 6px", fontSize: 14, colorScheme: "dark" }} />
            </label>
          </div>
          <Kicker style={{ marginTop: 22 }}>BRIEF</Kicker>
          {filled.map(f => (
            <label key={f.key} style={{ display: "block", marginTop: 10 }}>
              <span style={{ fontSize: 12, color: C.mute }}>{f.label}</span>
              <textarea value={r.brief[f.key]} onChange={e => setBrief(f.key, e.target.value)} rows={Math.min(6, Math.max(2, Math.ceil(r.brief[f.key].length / 70)))} style={{ ...area, marginTop: 4, padding: "8px 10px", fontSize: 14 }} />
            </label>
          ))}
          {empty.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowEmpty(v => !v)} aria-expanded={showEmpty} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 14, minHeight: 32 })}>{(showEmpty ? "Hide" : "Add") + " what wasn't found: " + empty.map(f => f.label.toLowerCase()).join(", ")}</button>
              {showEmpty && empty.map(f => (
                <label key={f.key} style={{ display: "block", marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: C.mute }}>{f.label}</span>
                  <textarea value={r.brief[f.key]} onChange={e => setBrief(f.key, e.target.value)} rows={2} placeholder={f.hint} style={{ ...area, marginTop: 4, padding: "8px 10px", fontSize: 14 }} />
                </label>
              ))}
            </div>
          )}
          {missing.length > 0 && <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}><span style={{ color: C.accent }}>Worth adding: </span>{missing.join(" · ")}</p>}
        </section>

        <section aria-label="Agenda">
          {hasAgenda ? (
            <>
              <KickerRow left="AGENDA FOUND" right={`${blocks} blocks · ${linked} linked to the Library`} />
              <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
                {r.matches.map((m, i) => m.kind === "day" || m.kind === "section" ? (
                  <div key={i} style={{ padding: "10px 0 4px", fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{m.line.title.toUpperCase()}</div>
                ) : (
                  <MatchRow key={i} m={m} onChange={p => setMatch(i, p)} />
                ))}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: C.mute }}>Linked blocks bring the Library's instructions, materials and facilitation notes with them. Anything unmatched becomes a custom block.</p>
            </>
          ) : (
            <>
              <KickerRow left="NO AGENDA IN THE TEXT" right={suggestion.filter(x => x.kind === "block").length + " suggested blocks · " + hm(suggestion.reduce((s, x) => s + mins(x), 0))} />
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.45, color: C.soft }}>A first structure from your brief, using Library methods. Change anything after.</p>
              <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
                {suggestion.map(x => x.kind === "section" ? <div key={x.id} style={{ padding: "10px 0 4px", fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{(x.title || "").toUpperCase()}</div> : x.kind === "block" ? (
                  <div key={x.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0", borderBottom: "1px solid " + C.hair, fontSize: 15 }}><span>{x.title}</span><span style={{ color: C.mute }}>{x.mins} min</span></div>
                ) : null)}
              </div>
            </>
          )}
        </section>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 28, paddingTop: 18, borderTop: "1px solid " + C.rule }}>
        <button onClick={() => go("agenda")} style={accent({ minHeight: 50, padding: "0 22px", fontSize: 16 })}>Create workshop</button>
        <button onClick={() => go("blank")} style={outline({ minHeight: 50, padding: "0 18px", fontSize: 15, border: "1px solid " + C.edge })}>Start blank with this context</button>
        {fromWorkshop && <button onClick={() => go("attach")} style={outline({ minHeight: 50, padding: "0 18px", fontSize: 15, border: "1px solid " + C.edge })}>Add context to “{S.name}”</button>}
        <span style={{ flex: "1 1 auto" }} />
      </div>
    </div>
  );
}

function MatchRow({ m, onChange }: { m: AgendaMatch; onChange: (p: Partial<AgendaMatch>) => void }) {
  const it = m.ref ? RDL().get(m.ref) : undefined;
  const value = m.kind === "library" ? "lib:" + m.ref : m.kind;
  const opts = [...(it && !m.candidates.some(c => c.id === it.id) ? [{ id: it.id, title: it.title }] : []), ...m.candidates];
  const tag = m.kind === "library" ? (m.confidence === "exact" ? "Library" : "Library · check") : m.kind === "custom" ? "Custom" : m.kind === "lunch" ? "Lunch" : "Break";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr) 64px", gap: "4px 10px", alignItems: "center", padding: "9px 0", borderBottom: "1px solid " + C.hair }}>
      <span style={{ fontSize: 13, color: C.mute, fontVariantNumeric: "tabular-nums" }}>{m.line.start || ""}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, lineHeight: 1.3 }}>{m.line.title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 12, color: m.kind === "library" ? (m.confidence === "exact" ? C.ink : C.accent) : C.mute, border: "1px solid " + (m.kind === "library" ? C.line : C.hair), padding: "1px 6px" }}>{tag}</span>
          <select aria-label={"Match for " + m.line.title} value={value} onChange={e => {
            const v = e.target.value;
            if (v.startsWith("lib:")) { const ref = v.slice(4), x = RDL().get(ref); onChange({ kind: "library", ref, refTitle: x?.title, confidence: "exact" }); }
            else onChange({ kind: v as AgendaMatch["kind"], ref: undefined, refTitle: undefined, confidence: "none" });
          }} style={{ ...field, fontFamily: BODY, minHeight: 30, fontSize: 13, padding: "0 4px", maxWidth: "100%" }}>
            {opts.map(c => <option key={c.id} value={"lib:" + c.id}>{c.title}</option>)}
            <option value="custom">Custom block</option>
            <option value="break">Break</option>
            <option value="lunch">Lunch</option>
          </select>
        </div>
      </div>
      <label style={{ fontSize: 12, color: C.mute }}>
        <input type="number" min={5} step={5} aria-label={"Minutes for " + m.line.title} value={m.line.mins} onChange={e => onChange({ line: { ...m.line, mins: Math.max(0, parseInt(e.target.value, 10) || 0) } })} style={{ ...field, width: "100%", minHeight: 30, padding: "0 4px", fontSize: 13 }} />
      </label>
    </div>
  );
}
