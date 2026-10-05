"use client";
// Configuration for the open block: title, length, mode, facilitation fields, moving, replacing,
// and what the Library says about it.
import type { CSSProperties } from "react";
import { BIG_GROUPS, C, CUSTOM_PRESETS, MODES } from "../constants";
import { RDB, RDL } from "../engine";
import { knownTime } from "../library";
import { scriptFor } from "../run/script";
import { copyText } from "../exportDoc";
import { mins, uid } from "../items";
import { BLANK_FILTERS, type Item } from "../types";
import { BODY, Chip, DISPLAY, field, outline, path, textBtn, useBuilder } from "../ui";

const link = textBtn({ color: C.soft, minHeight: 34 });
const sel: CSSProperties = { ...field, display: "block", width: "100%", marginTop: 4, minHeight: 36, padding: "0 6px", fontSize: 13 };

export default function BlockDetail({ x }: { x: Item }) {
  const { S, store, d } = useBuilder();
  const b = S.brief, wide = d.wide, B = RDB(), ROLES = B.ROLES;
  const it = x.ref ? RDL().get(x.ref) : undefined, deco = it ? RDL().deco(it) : undefined;
  const er = d.eb.find(y => y.id === x.id) || { role: x.role && ROLES[x.role] ? x.role : "custom", ref: x.ref, title: x.title };
  const DD = B.detail(b, er), rec = it ? B.minsOf(it) : null, big = BIG_GROUPS.includes(b.people || ""), m = mins(x);

  const warns: string[] = [];
  if (rec && knownTime(it) && m < rec * 0.7) warns.push(m + " minutes is tight" + (big ? " for " + b.people + " participants" : "") + ". The Library suggests about " + rec + ". Builder allows it.");
  if (big && ["sense", "options", "decide", "landscape"].includes(x.role || "") && x.cfg.mode !== "Small group" && !x.par) warns.push("With " + b.people + " people, run this in small groups or breakouts.");
  (d.byAt[x.id] || []).forEach(o => warns.push(o.t + " " + o.fix));

  const secs = S.items.filter(y => y.kind === "section"), dayDivs = S.items.filter(y => y.kind === "day");
  const fld = (k: keyof Item["cfg"], label: string, def: string, rows: number, ph = "") => {
    const v = x.cfg[k] as string | undefined;
    return { k, label, v: v != null ? v : def, src: v != null && it ? "Edited" : it && def ? "From the Library" : "", rows, ph };
  };
  const fields = [
    fld("purpose", "Purpose", DD.purpose || DD.why, 2),
    fld("instr", "Instructions", DD.steps.map((s, i) => i + 1 + ". " + s).join("\n"), 4, "How the facilitator runs it"),
    fld("materials", "Materials", it ? (it.materials || []).join(", ") : "", 1, "Sticky notes, timer, board"),
    fld("output", "Output", DD.output, 1),
    fld("notes", "Facilitator notes", DD.notes.join(" "), 2, "Anything to remember on the day")
  ];
  const sc = scriptFor(x, b);
  const script = [
    fld("open", "Opening prompt", sc.open, 2, "What you say to start it"),
    fld("questions", "Questions to ask", sc.questions.join("\n"), 2, "One per line"),
    fld("watch", "Watch for", sc.watch.join("\n"), 2, "What tends to go wrong"),
    fld("transition", "Transition", "", 1, "How you hand over to the next block"),
    fld("participant", "Participant screen", sc.participant.join("\n"), 3, "What the room sees. One line each.")
  ];
  const liveBlocks = S.items.filter(y => y.zone === "live" && y.kind === "block");
  const showAlts = S.alts === x.id, alts = showAlts ? B.alternatives(b, er) : [];
  const suggest = (dir: "before" | "after") => store.set({ suggestFor: { id: x.id, dir }, open: null, sheet: wide ? null : "lib", lib: { ...BLANK_FILTERS } });
  const lists = ([["Use when", DD.useWhen], ["Avoid when", DD.avoidWhen], ["Watch for", DD.watch]] as [string, string[]][]).filter(l => l[1].length);

  const toSection = (sid: string) => {
    if (!sid) return;
    store.commit(its => {
      const [mv] = its.splice(its.findIndex(y => y.id === x.id), 1);
      mv.zone = "live"; mv.par = null;
      let p = its.findIndex(y => y.id === sid) + 1;
      while (its[p] && its[p].zone === "live" && its[p].kind === "block") p++;
      its.splice(p, 0, mv);
      return its;
    }, x.title + " moved to " + secs.find(s => s.id === sid)?.title);
  };
  const toPlace = (v: string) => {
    if (!v) return;
    store.commit(its => {
      const [mv] = its.splice(its.findIndex(y => y.id === x.id), 1);
      mv.par = null;
      if (v === "pre" || v === "after" || v === "backup") { mv.zone = v; its.push(mv); return its; }
      mv.zone = "live";
      const next = its.filter(y => y.kind === "day")[+v.slice(3)];
      its.splice(next ? its.indexOf(next) : its.filter(y => y.zone === "pre" || y.zone === "live").length, 0, mv);
      return its;
    }, x.title + " moved");
  };
  const copyPrompt = () => {
    copyText("Facilitate " + x.title + " (" + m + " min)" + (b.people ? " for " + b.people + " people" : "") + ". " + (b.question ? "Question: " + b.question + ". " : "") + "Input: " + DD.input + ". Output: " + DD.output + ". " + DD.steps.map((s, i) => i + 1 + ". " + s).join(" "));
    store.flash("prompted", x.id);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.mute }}>{(x.role === "custom" ? "Custom block" : (ROLES[x.role || ""] || ROLES.custom)[0] + (deco ? " · " + deco.typeLabel : "")) + (x.zone !== "live" ? " · " + (x.zone === "pre" ? "Pre-work" : "After") : "")}</span>
        <button onClick={() => store.set({ open: null, alts: null, sheet: null })} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 14, minHeight: 32 })}>Close</button>
      </div>
      <input aria-label="Block title" value={x.title || ""} onChange={e => store.edit(x.id, { title: e.target.value })} className="bf-under-mute"
        style={{ display: "block", width: "100%", marginTop: 6, background: "none", border: 0, borderBottom: "1px solid " + C.line, outline: "none", color: C.ink, padding: "4px 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: 24, lineHeight: 1.1 }} />
      {(x.role === "custom" || x.custom) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
          {CUSTOM_PRESETS.map(l => (
            <button key={l} onClick={() => store.edit(x.id, { title: l, role: /coffee|lunch/i.test(l) ? "breaks" : "custom", mins: l === "Lunch" ? 45 : l === "Coffee" ? 15 : x.mins })} className="bh-line-mute" style={outline({ color: C.soft, minHeight: 30, padding: "0 8px", fontSize: 13 })}>{l}</button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
        <button onClick={() => store.edit(x.id, { mins: Math.max(5, m - 5) })} aria-label="Shorten by 5 minutes" style={outline({ width: 36, height: 36 })}>−</button>
        <input type="number" min="0" step="5" aria-label="Duration in minutes" value={String(x.mins)} onChange={e => store.edit(x.id, { mins: Math.max(0, parseInt(e.target.value, 10) || 0) })}
          style={{ ...field, width: 70, minHeight: 36, padding: "0 8px", fontSize: 15 }} />
        <button onClick={() => store.edit(x.id, { mins: m + 5 })} aria-label="Lengthen by 5 minutes" style={outline({ width: 36, height: 36 })}>+</button>
        <span style={{ fontSize: 14, color: C.mute }}>min · {x.zone === "live" ? "live" : x.zone === "pre" ? "before the session" : "after the session"}</span>
      </div>
      {!!(rec && knownTime(it)) && <div style={{ marginTop: 6, fontSize: 13, color: C.mute }}>{"Library recommends about " + rec + " min" + (deco?.timeLabel && deco.timeLabel !== rec + " min" ? " (" + deco.timeLabel + ")" : "") + "."}</div>}
      {warns.map((w, i) => <div key={i} style={{ marginTop: 8, padding: "8px 10px", border: "1px dashed " + C.accent, fontSize: 14, lineHeight: 1.4, color: C.ink }}>{w}</div>)}
      <div role="group" aria-label="Participant mode" style={{ marginTop: 14 }}>
        <div style={{ fontSize: 12, color: C.mute }}>Participant mode</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
          {MODES.map(l => <Chip key={l} on={x.cfg.mode === l} onClick={() => store.setCfg(x.id, "mode", x.cfg.mode === l ? "" : l)} style={{ minHeight: 32, padding: "0 9px", fontSize: 13 }}>{l}</Chip>)}
        </div>
      </div>
      {x.zone === "live" && (
        <div role="group" aria-label="Priority" style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: C.mute }}>In the run</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
            <Chip on={x.priority !== "optional"} onClick={() => store.edit(x.id, { priority: "core" })} style={{ minHeight: 32, padding: "0 9px", fontSize: 13 }}>Core</Chip>
            <Chip on={x.priority === "optional"} onClick={() => store.edit(x.id, { priority: "optional" })} style={{ minHeight: 32, padding: "0 9px", fontSize: 13 }}>Optional · can skip if late</Chip>
          </div>
        </div>
      )}
      {x.zone === "backup" && (
        <label style={{ display: "block", marginTop: 12, fontSize: 12, color: C.mute }}>Backup for
          <select value={x.backupFor || ""} onChange={e => store.edit(x.id, { backupFor: e.target.value || null })} style={sel}>
            <option value="">Any point in the workshop</option>
            {liveBlocks.map(y => <option key={y.id} value={y.id}>{y.title}</option>)}
          </select>
        </label>
      )}
      {(x.cfg.mode === "Small group" || !!x.par) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
          <label style={{ fontSize: 12, color: C.mute }}>Groups<input type="number" min="1" value={String(x.cfg.groups || "")} onChange={e => store.setCfg(x.id, "groups", e.target.value)} style={{ ...field, display: "block", width: 80, marginTop: 4, minHeight: 34, padding: "0 8px", fontSize: 14, fontFamily: undefined }} /></label>
          <label style={{ fontSize: 12, color: C.mute }}>People per group<input type="number" min="1" value={String(x.cfg.gsize || "")} onChange={e => store.setCfg(x.id, "gsize", e.target.value)} style={{ ...field, display: "block", width: 100, marginTop: 4, minHeight: 34, padding: "0 8px", fontSize: 14, fontFamily: undefined }} /></label>
        </div>
      )}
      {fields.map(f => (
        <label key={f.k} style={{ display: "block", marginTop: 12 }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{f.label}</span><span>{f.src}</span></span>
          <textarea value={f.v} onChange={e => store.setCfg(x.id, f.k, e.target.value)} rows={f.rows} placeholder={f.ph}
            style={{ ...field, display: "block", width: "100%", marginTop: 4, padding: "8px 10px", fontFamily: BODY, fontSize: 14, lineHeight: 1.45, resize: "vertical" }} />
        </label>
      ))}
      <details style={{ marginTop: 14 }}>
        <summary style={{ cursor: "pointer", fontSize: 13, color: C.soft }}>Facilitator script · what Run mode shows</summary>
        {script.map(f => (
          <label key={f.k} style={{ display: "block", marginTop: 10 }}>
            <span style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{f.label}</span><span>{f.src}</span></span>
            <textarea value={f.v} onChange={e => store.setCfg(x.id, f.k, e.target.value)} rows={f.rows} placeholder={f.ph}
              style={{ ...field, display: "block", width: "100%", marginTop: 4, padding: "8px 10px", fontFamily: BODY, fontSize: 14, lineHeight: 1.45, resize: "vertical" }} />
          </label>
        ))}
      </details>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        <label style={{ fontSize: 12, color: C.mute }}>Move to section
          <select value="" onChange={e => toSection(e.target.value)} style={sel}>
            <option value="">{secs.length ? "Choose" : "No sections yet"}</option>
            {secs.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </label>
        <label style={{ fontSize: 12, color: C.mute }}>Move to
          <select value="" onChange={e => toPlace(e.target.value)} style={sel}>
            <option value="">Choose</option><option value="pre">Pre-work</option><option value="after">After</option><option value="backup">Backups</option>
            {(dayDivs.length ? [null, ...dayDivs] : [null]).map((_, di) => <option key={di} value={"day" + di}>{dayDivs.length ? "Live, day " + (di + 1) : "Live workshop"}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginTop: 12, fontSize: 14 }}>
        {x.role !== "custom" && x.role !== "breaks" && <button onClick={() => store.set({ alts: showAlts ? null : x.id })} style={textBtn({ color: C.accent, minHeight: 34 })}>Replace</button>}
        <button onClick={() => suggest("before")} className="bh-ink" style={link}>What comes before?</button>
        <button onClick={() => suggest("after")} className="bh-ink" style={link}>What comes after?</button>
        <button onClick={() => store.commit(its => { const i = its.findIndex(y => y.id === x.id); its.splice(i + 1, 0, { ...its[i], id: uid(), cfg: { ...its[i].cfg } }); return its; }, x.title + " duplicated")} className="bh-ink" style={link}>Duplicate</button>
        <button onClick={() => store.remove(x.id, x.title + " deleted", { open: null, sheet: null, notice: x.title + " deleted. " + B.impact(d.eb, { type: "remove", id: x.id }) + " Undo brings it back." })} className="bh-accent" style={link}>Delete</button>
      </div>
      {showAlts && (
        <div style={{ marginTop: 10, border: "1px solid " + C.accent, padding: "10px 12px", background: C.bg }}>
          <div style={{ fontSize: 13, color: C.mute }}>Alternatives fitted to this workshop</div>
          {alts.map(a => {
            const ai = RDL().get(a.id);
            return (
              <div key={a.id} style={{ padding: "9px 0", borderBottom: "1px solid " + C.rule }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                  <a href={ai ? path(RDL().deco(ai).href) : ""} className="bh-accent" style={{ color: C.ink, fontWeight: 500, fontSize: 15, textDecoration: "none" }}>{a.title}</a>
                  <button onClick={() => store.commit(its => { const y = its.find(z => z.id === x.id)!, ni = RDL().get(a.id)!; y.ref = ni.id; y.title = ni.title; y.role = B.roleOf(ni); y.cfg = {}; return its; }, "Replaced with " + a.title, { alts: null, notice: "Replaced " + x.title + " with " + a.title + "." })}
                    style={outline({ border: "1px solid " + C.edge, minHeight: 32, padding: "0 10px", fontSize: 13 })}>Use</button>
                </div>
                <div style={{ marginTop: 2, fontSize: 12, color: C.mute }}>{a.meta}</div>
                <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.4, color: C.soft }}>{a.why}</div>
              </div>
            );
          })}
          {!alts.length && <p style={{ margin: "6px 0 0", fontSize: 13, color: C.mute }}>No close alternatives in the Library yet.</p>}
        </div>
      )}
      {it && (
        <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid " + C.rule }}>
          <div style={{ fontSize: 12, letterSpacing: ".06em", color: C.mute }}>FROM THE LIBRARY</div>
          <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.45 }}><span style={{ color: C.accent }}>Why it fits here. </span>{DD.why}</div>
          {lists.map(([k, items]) => (
            <div key={k} style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, color: C.mute }}>{k}</div>
              <ul style={{ margin: "3px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.45 }}>{items.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {DD.assets.map((a, i) => <a key={i} href={path(a.href)} style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", minHeight: 34, border: "1px solid " + C.line, color: C.ink, padding: "0 10px", fontSize: 13, textDecoration: "none" }}>{a.title}</a>)}
            <button onClick={copyPrompt} style={outline({ minHeight: 34, padding: "0 10px", fontSize: 13 })}>{S.prompted === x.id ? "Copied" : "Copy facilitation prompt"}</button>
          </div>
          {!!DD.source && <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.45, color: C.mute }}>Source. {DD.source} {DD.rights}</div>}
          {DD.related.length > 0 && <div style={{ marginTop: 8, fontSize: 13, color: C.mute }}>Related: {DD.related.map((r, i) => <a key={i} href={path(r.href)} style={{ color: C.soft, marginRight: 10 }}>{r.title}</a>)}</div>}
          <a href={path(DD.href)} style={{ display: "inline-flex", marginTop: 10, fontSize: 14, color: C.accent }}>Full Library page</a>
        </div>
      )}
    </div>
  );
}
