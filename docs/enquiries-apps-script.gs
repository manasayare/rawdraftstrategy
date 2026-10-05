// Raw Draft enquiries → Google Sheet.
// Paste into the sheet's Extensions → Apps Script, set SECRET, then Deploy → New deployment →
// Web app (Execute as: Me, Who has access: Anyone). Put the /exec URL and the same SECRET in Vercel
// as ENQUIRY_SHEET_URL and ENQUIRY_SECRET. Setup steps: docs/enquiries.md
const SECRET = "paste-the-same-value-as-ENQUIRY_SECRET";
const COLUMNS = ["received", "name", "email", "org", "role", "help", "topics", "length", "people", "when", "budget", "notes", "source", "page"];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return reply({ ok: false, error: "bad_json" }); }
  if (data.secret !== SECRET) return reply({ ok: false, error: "forbidden" });

  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheets()[0];  // first tab; headers are added if it is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  // Prefix values that a spreadsheet would read as a formula.
  const safe = v => { const s = String(v == null ? "" : v); return /^[=+\-@]/.test(s) ? "'" + s : s; };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { sheet.appendRow(COLUMNS.map(k => safe(data[k]))); } finally { lock.releaseLock(); }
  return reply({ ok: true });
}

function reply(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
