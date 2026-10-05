// Real export files for a workshop: an A4 PDF and a Word document. Both libraries load on first use.
import type { AgendaDoc, AgendaRow } from "./agenda";
import { fileBase } from "./agenda";

const ACCENT: [number, number, number] = [255, 75, 35];
const INK: [number, number, number] = [11, 11, 10];
const MUTE: [number, number, number] = [107, 103, 94];
const RULE: [number, number, number] = [216, 212, 200];

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ---------- PDF ----------
export async function agendaPdf(doc: AgendaDoc) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 16, R = W - M, BOTTOM = H - 18;
  let y = M;
  // Every y below is the top of the text, not its baseline.
  const T = (s: string, x: number, yy: number, o: { align?: "right" } = {}) => pdf.text(s, x, yy, { baseline: "top", ...o });

  const font = (size: number, style: "normal" | "bold" = "normal", color = INK) => { pdf.setFont("helvetica", style); pdf.setFontSize(size); pdf.setTextColor(...color); };
  const lineH = (size: number) => size * 0.3528 * 1.35;
  const room = (h: number) => { if (y + h > BOTTOM) { footer(); pdf.addPage(); y = M; } };
  const rule = (color = RULE, w = 0.2) => { pdf.setDrawColor(...color); pdf.setLineWidth(w); pdf.line(M, y, R, y); };
  const text = (s: string, x: number, width: number, size: number, style: "normal" | "bold" = "normal", color = INK) => {
    font(size, style, color);
    const lines = pdf.splitTextToSize(s, width) as string[];
    lines.forEach((ln, i) => T(ln, x, y + lineH(size) * i));
    return lines.length * lineH(size);
  };
  let pageNo = 1;
  const footer = () => { font(7.5, "normal", MUTE); T("Designed in Raw Draft Builder", M, H - 10); T(`${doc.date} · ${pageNo++}`, R, H - 10, { align: "right" }); };

  // Header
  font(8, "normal", MUTE); T(doc.kicker.toUpperCase(), M, y); y += 6;
  y += text(doc.name || "Untitled workshop", M, R - M, 24, "bold") + 1;
  y += text(doc.meta, M, R - M, 10.5, "normal") + 3;

  if (doc.brief.length) {
    rule(INK, 0.3); y += 4;
    for (const [k, v] of doc.brief) {
      font(9.5);
      const h = Math.max(lineH(9.5), (pdf.splitTextToSize(v, R - M - 30) as string[]).length * lineH(9.5));
      room(h + 1.5);
      text(k, M, 28, 9.5, "normal", MUTE);
      text(v, M + 30, R - M - 30, 9.5);
      y += h + 1.5;
    }
    rule(); y += 2;
  }

  const heading = (title: string, right?: string) => {
    room(16);
    y += 6;
    font(14, "bold"); T(title, M, y + 1);
    if (right) { font(9, "normal", MUTE); T(right, R, y + 2, { align: "right" }); }
    y += 8;
  };
  const sub = (title: string) => { room(10); y += 2; font(7.5, "bold", ACCENT); T(title.toUpperCase(), M, y + 1); y += 5; };
  const row = (r: AgendaRow, timed: boolean) => {
    const titleW = R - M - 26 - 16;
    font(10, "bold");
    const tl = pdf.splitTextToSize(r.title, titleW) as string[];
    const outL = r.output ? (pdf.splitTextToSize("Output · " + r.output, titleW) as string[]) : [];
    const h = tl.length * lineH(10) + outL.length * lineH(8.5) + 3.5;
    room(h + 1);
    y += 1.5;
    if (timed) { text(r.start || "", M, 26, 10, "bold"); font(8.5, "normal", MUTE); T("–" + (r.end || ""), M + 11, y); }
    else text(`${r.mins} min`, M, 26, 10, "bold");
    tl.forEach((ln, i) => { font(10, "bold"); T(ln, M + 26, y + lineH(10) * i); });
    let yy = y + tl.length * lineH(10);
    outL.forEach((ln, i) => { font(8.5, "normal", MUTE); T(ln, M + 26, yy + lineH(8.5) * i); });
    if (timed) { font(8.5, "normal", MUTE); T(`${r.mins} min`, R, y, { align: "right" }); }
    y += h - 1.5;
    rule([228, 224, 213], 0.15);
  };

  if (doc.pre.length) { heading("Before the session"); doc.pre.forEach(r => row(r, false)); }
  for (const d of doc.days) {
    heading(doc.days.length > 1 ? d.label : "The session", `${d.range} · ${d.total}`);
    for (const s of d.sections) { if (s.title) sub(s.title); s.rows.forEach(r => row(r, true)); }
  }
  if (doc.after.length) { heading("Afterwards"); doc.after.forEach(r => row(r, false)); }

  if (doc.notes.length) {
    footer(); pdf.addPage(); y = M;
    heading("Session notes");
    for (const g of doc.notes) {
      sub(g.group);
      for (const e of g.entries) {
        font(10, "bold");
        const l1 = pdf.splitTextToSize(e.text, R - M) as string[];
        const l2 = e.typed ? (pdf.splitTextToSize(e.typed, R - M) as string[]) : [];
        room(l1.length * lineH(10) + l2.length * lineH(9) + lineH(8) + 3);
        y += 1.5;
        y += text(e.text, M, R - M, 10, "bold");
        if (e.typed) y += text(e.typed, M, R - M, 9);
        y += text(e.block + (e.owner ? " · Owner: " + e.owner : ""), M, R - M, 8, "normal", MUTE) + 1;
        rule([228, 224, 213], 0.15);
      }
    }
  }
  footer();
  download(pdf.output("blob"), `${fileBase(doc)}-agenda.pdf`);
}

// ---------- Word ----------
export async function agendaDocx(doc: AgendaDoc) {
  const d = await import("docx");
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, HeadingLevel, AlignmentType } = d;
  const FONT = "Arial";
  const run = (t: string, o: Record<string, unknown> = {}) => new TextRun({ text: t, font: FONT, size: 20, ...o });
  const p = (children: InstanceType<typeof TextRun>[], o: Record<string, unknown> = {}) => new Paragraph({ children, spacing: { after: 60 }, ...o });
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const thin = { style: BorderStyle.SINGLE, size: 4, color: "E4E0D5" };
  const cell = (children: InstanceType<typeof Paragraph>[], width: number) => new TableCell({ children, width: { size: width, type: WidthType.PERCENTAGE }, borders: { top: none, left: none, right: none, bottom: thin }, margins: { top: 80, bottom: 80 } });
  const table = (rows: AgendaRow[], timed: boolean) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(r => new TableRow({ children: [
      cell([p([run(timed ? `${r.start || ""}–${r.end || ""}` : `${r.mins} min`, { bold: true })])], 18),
      cell([p([run(r.title, { bold: true })]), ...(r.output ? [p([run("Output · " + r.output, { size: 17, color: "6B675E" })])] : [])], timed ? 70 : 82),
      ...(timed ? [cell([p([run(`${r.mins} min`, { color: "6B675E" })], { alignment: AlignmentType.RIGHT })], 12)] : [])
    ] }))
  });
  const h2 = (t: string, right?: string) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 120 }, children: [new TextRun({ text: t, font: FONT, size: 30, bold: true, color: "0B0B0A" }), ...(right ? [new TextRun({ text: "   " + right, font: FONT, size: 18, color: "6B675E" })] : [])] });
  const h3 = (t: string) => new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({ text: t.toUpperCase(), font: FONT, size: 16, bold: true, color: "FF4B23" })] });

  const body: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [
    p([run(doc.kicker.toUpperCase(), { size: 16, color: "6B675E" })]),
    new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 120 }, children: [new TextRun({ text: doc.name || "Untitled workshop", font: FONT, size: 52, bold: true, color: "0B0B0A" })] }),
    p([run(doc.meta, { size: 22 })], { spacing: { after: 200 } })
  ];
  for (const [k, v] of doc.brief) body.push(p([run(k + ": ", { color: "6B675E" }), run(v)]));
  if (doc.pre.length) body.push(h2("Before the session"), table(doc.pre, false));
  for (const day of doc.days) {
    body.push(h2(doc.days.length > 1 ? day.label : "The session", `${day.range} · ${day.total}`));
    for (const s of day.sections) { if (s.title) body.push(h3(s.title)); body.push(table(s.rows, true)); }
  }
  if (doc.after.length) body.push(h2("Afterwards"), table(doc.after, false));
  if (doc.notes.length) {
    body.push(new Paragraph({ pageBreakBefore: true, children: [] }), h2("Session notes"));
    for (const g of doc.notes) {
      body.push(h3(g.group));
      for (const e of g.entries) {
        body.push(p([run(e.text, { bold: true })], { spacing: { after: 20 } }));
        if (e.typed) body.push(p([run(e.typed)], { spacing: { after: 20 } }));
        body.push(p([run(e.block + (e.owner ? " · Owner: " + e.owner : ""), { size: 16, color: "6B675E" })], { spacing: { after: 140 } }));
      }
    }
  }
  body.push(p([run(`Designed in Raw Draft Builder · ${doc.date}`, { size: 16, color: "6B675E" })], { spacing: { before: 400 } }));

  const file = new Document({ creator: "Raw Draft Builder", title: doc.name, sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 900, right: 900 } } }, children: body }] });
  download(await Packer.toBlob(file), `${fileBase(doc)}-agenda.docx`);
}
