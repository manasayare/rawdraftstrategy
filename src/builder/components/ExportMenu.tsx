"use client";
// Everything that takes the workshop out of Builder, in one menu beside Run: files, a copy, a share
// link, and reuse.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { C } from "../constants";
import { agendaCsv, agendaText, copyText, download, exportRows, fileName } from "../exportDoc";
import { boardFileName, boardSvg, exportSlides, mentiQuestions, stickyText } from "../exportBoards";
import { outline, useBuilder } from "../ui";

export default function ExportMenu() {
  const { S, store } = useBuilder();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btn = useRef<HTMLButtonElement>(null);
  // Placed against the viewport so it never runs off a narrow screen; closes on scroll.
  const toggle = () => {
    const r = btn.current?.getBoundingClientRect();
    if (r) setPos({ top: r.bottom + 6, left: Math.max(12, Math.min(r.right - 280, window.innerWidth - 292)) });
    setOpen(o => !o);
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", close); window.removeEventListener("scroll", onScroll); };
  }, [open]);
  const share = store.shareState(), rows = () => exportRows(S.items, S.start);
  const item = (label: ReactNode, run: () => void, note?: string, keep = false) => (
    <button role="menuitem" onClick={() => { run(); if (!keep) setOpen(false); }} className="bh-raise"
      style={{ display: "flex", justifyContent: "space-between", gap: 16, width: "100%", textAlign: "left", background: "none", border: 0, color: C.ink, padding: "9px 14px", cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}>
      <span>{label}</span>{note && <span style={{ color: C.mute, fontSize: 12 }}>{note}</span>}
    </button>
  );
  const group = (t: string) => <div style={{ padding: "10px 14px 4px", fontSize: 11, letterSpacing: ".08em", color: C.mute }}>{t}</div>;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button ref={btn} onClick={toggle} aria-haspopup="menu" aria-expanded={open} className="bh-line-mute"
        style={outline({ minHeight: 40, padding: "0 14px", fontSize: 14, border: "1px solid " + C.edge })}>Export ▾</button>
      {open && (
        <div role="menu" style={{ position: "fixed", left: pos.left, top: pos.top, zIndex: 90, width: 280, maxHeight: "calc(100vh - " + (pos.top + 12) + "px)", overflow: "auto", background: "#141413", border: "1px solid " + C.edge, boxShadow: "0 18px 40px rgba(0,0,0,.55)", paddingBottom: 6 }}>
          {group("DOWNLOAD")}
          {item(S.exporting === "pdf" ? "Preparing…" : "Agenda PDF", () => store.exportFile("pdf"))}
          {item(S.exporting === "docx" ? "Preparing…" : "Word document", () => store.exportFile("docx"), ".docx")}
          {item("Spreadsheet", () => download(fileName(S.name, ".csv"), "text/csv", agendaCsv(rows())), ".csv")}
          {item("Workshop file", () => download(fileName(S.name, ".json"), "application/json", JSON.stringify({ name: S.name, start: S.start, brief: S.brief, items: S.items, context: S.context || undefined }, null, 2)), ".json")}
          {group("WHITEBOARDS & SLIDES")}
          {item(busy ? "Preparing…" : "Slides", () => { if (busy) return; setBusy(true); exportSlides(S).catch(() => {}).then(() => setBusy(false)); }, ".pptx")}
          <div style={{ padding: "0 14px 6px", fontSize: 12, lineHeight: 1.4, color: C.mute, whiteSpace: "normal" }}>Opens in Google Slides, Keynote and PowerPoint. Facilitator script in speaker notes.</div>
          {item("Board for FigJam / Figma", () => download(boardFileName(S.name), "image/svg+xml", boardSvg(S)), ".svg")}
          <div style={{ padding: "0 14px 6px", fontSize: 12, lineHeight: 1.4, color: C.mute, whiteSpace: "normal" }}>Drag onto the canvas: editable cards per activity. Miro places it as an image.</div>
          {item(done === "miro" ? "Copied" : "Copy as sticky notes", () => { copyText(stickyText(S)); setDone("miro"); setTimeout(() => setDone(""), 1500); }, "Miro", true)}
          {item(done === "menti" ? "Copied" : "Copy poll questions", () => { copyText(mentiQuestions(S)); setDone("menti"); setTimeout(() => setDone(""), 1500); }, "Mentimeter", true)}
          {group("SHARE")}
          {item(S.copied ? "Copied" : "Copy agenda as text", () => { copyText(agendaText(S.name, rows())); store.flash("copied", true); }, undefined, true)}
          {item(S.sharing ? "Saving…" : share.shared ? (share.upToDate ? "Copy share link" : "Update share link") : "Create share link", () => store.shareLink(), undefined, true)}
          {(S.shareMsg || share.shared) && <div style={{ padding: "0 14px 6px", fontSize: 12, lineHeight: 1.4, color: C.mute, maxWidth: 300 }}>{S.shareMsg || share.url}</div>}
          {group("REUSE")}
          {item("Save as template", () => store.saveTemplate(S.name))}
          {item("Duplicate workshop", () => store.duplicateWorkshop())}
        </div>
      )}
    </div>
  );
}
