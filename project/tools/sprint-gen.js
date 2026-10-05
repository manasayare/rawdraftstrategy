// Generator for rd-sprint-formats.js. Usage in run_script: eval(await readFile('tools/sprint-gen.js')); const { js, stats } = SPRINTGEN(mdLines);
// Parses sections 136 to 173 of the master backlog (v5+). Copies the backlog's own structure; invents nothing.
var SPRINTGEN = function (L) {
  const idx = n => L.findIndex(x => new RegExp('^# ' + n + '\\.').test(x));
  const end = n => { const a = idx(n); for (let i = a + 1; i < L.length; i++) if (/^# \d+\./.test(L[i])) return i; return L.length; };
  const clean = s => String(s).replace(/\*\*/g, '').replace(/`/g, '').replace(/[“”]/g, '"').replace(/\s*[—–]\s*/g, ' to ').replace(/[;]$/, '').replace(/\.$/, '').trim();
  const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const SKIP = /^(raw draft treatment|current public|best known example|external examples|publicly documented)/i;
  function parse(a, b, re) { const out = []; let cur = null, lab = null, inCode = false, code = [];
    for (let i = a; i < b; i++) { const ln = L[i];
      if (/^```/.test(ln)) { if (inCode && cur) cur.shapes.push({ label: lab, text: code.join('\n').trim() }); code = []; inCode = !inCode; continue; }
      if (inCode) { code.push(ln); continue; }
      const h = ln.match(re); if (h) { cur = { name: clean(h[1].replace(/^\d+\.\d+\s+/, '').replace(/^FORMAT [A-Z]:\s*/i, '')), shapes: [], f: [], text: [], urls: [] }; out.push(cur); lab = null; continue; }
      if (!cur) continue;
      (ln.match(/https?:\/\/\S+/g) || []).forEach(u => cur.urls.push(u.replace(/[).,]+$/, '')));
      const h3 = ln.match(/^#{3,4}\s+(.+)/); if (h3) { lab = clean(h3[1]); cur.f.push({ k: lab, items: [] }); continue; }
      const lm = ln.match(/^([A-Z][A-Za-z0-9 /'&+-]{1,40}):\s*(.*)$/); if (lm && !/^https?/.test(lm[2])) { lab = clean(lm[1]); const v = clean(lm[2]); cur.f.push({ k: lab, items: v ? [v] : [] }); continue; }
      if (/^-?\s*https?:/.test(ln.trim().replace(/^- /, ''))) continue;
      const li = ln.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/); const val = li ? clean(li[1]) : ln.trim() && !/^---/.test(ln) && !/^>/.test(ln) ? clean(ln) : ln.trim().startsWith('>') ? clean(ln.replace(/^>\s*/, '')) : null;
      if (!val) continue; const last = cur.f[cur.f.length - 1]; if (lab && last) last.items.push(val); else cur.text.push(val); }
    return out; }
  const rowsOf = t => t.split(/\n\s*\n/).map(b => b.split('\n').map(s => s.trim()).filter(Boolean)).filter(b => b.length).map(b => b.length === 1 ? { k: "", v: b[0] } : { k: b[0], v: b.slice(1).join(' / ') });
  const DAYK = /^(day \d|session \d|before|async|prep|fieldwork|synthesis|decision|scan|interpret|imagine|decide|act|brief|play|inject|debrief|transfer|week \d|input)/i;
  function toFormat(s, group, origin) {
    const shape = [], seen = new Set(); s.shapes.forEach(x => rowsOf(x.text).forEach(r => { const k = r.k + '|' + r.v; if (!seen.has(k)) { seen.add(k); shape.push(r); } }));
    const fields = [];
    s.f.forEach(x => { if (SKIP.test(x.k) || /^sources?$/i.test(x.k)) return; if (DAYK.test(x.k) && x.items.length <= 2 && x.items.join(' ').length < 140) shape.push({ k: x.k, v: x.items.join(' / ') }); else if (x.items.length) fields.push({ k: x.k.replace(/^./, c => c.toUpperCase()), items: x.items }); });
    const nm = (s.name + ' ' + group).toLowerCase();
    const vis = /async/.test(nm) ? "async" : /weekly|cadence|recurring/.test(nm) ? "cadence" : /distributed|two-week|executive|embedded/.test(nm) ? "distributed" : /research/.test(nm) ? "research" : /prototype|design|evidence|five-day|four-day|three-day|iteration/.test(nm) ? "prototype" : "intensive";
    const days = (s.name.match(/(one|two|three|four|five|half)[- ]day/i) || [])[1];
    const n = { half: 1, one: 1, two: 2, three: 3, four: 4, five: 5 }[(days || '').toLowerCase()] || (shape.filter(r => /^day \d/i.test(r.k)).length || null);
    const ext = origin || (s.urls.length || /ajandsmart|aj&smart|character|google|knapp|gv/i.test(s.name + s.text.join(' ')) ? "external" : "rawdraft");
    return { id: slug(s.name), name: s.name, group, origin: ext, vis, days: n, shape, fields, intro: s.text.slice(0, 2).join(' '), urls: [...new Set(s.urls)] };
  }
  const formats = [];
  [[138, "Sprint format"], [139, "Calendar shape"], [140, "Participation"], [141, "Delivery mode"], [142, "Intensity"], [152, "Raw Draft default"]].forEach(([n, g]) => parse(idx(n) + 1, end(n), /^## (.+)/).forEach(s => formats.push(toFormat(s, g, n === 152 ? "rawdraft" : null))));
  [163, 165, 166, 167, 168, 169].forEach(n => { const a = idx(n); if (a < 0) return; const title = clean(L[a].replace(/^# \d+\.\s*/, '')); const s = parse(a, end(n), /^# \d+\.\s*(.+)/)[0]; parse(a + 1, end(n), /^## (.+)/).forEach(x => { s.f = s.f.concat(x.f.length ? x.f : [{ k: x.name, items: x.text }]); s.shapes = s.shapes.concat(x.shapes); s.urls = s.urls.concat(x.urls); });
    const f = toFormat(s, "Context", /aj&smart|ajandsmart/i.test(L.slice(a, a + 6).join(' ')) && n !== 163 ? "external" : "rawdraft"); f.name = title; f.id = slug(title); formats.push(f); });
  const phases = []; for (let n = 144; n <= 151; n++) { const a = idx(n); if (a < 0) continue; const k = clean(L[a].replace(/^# \d+\. Sprint phase detail:\s*/, ''));
    const s = parse(a + 1, end(n), /^## (.+)/); phases.push({ k, intro: clean(L.slice(a + 1, a + 4).find(x => x.trim() && !/^#/.test(x)) || ''), blocks: s.map(x => ({ k: x.name, items: x.f.reduce((acc, y) => acc.concat(y.items.length ? [y.k + ": " + y.items.join(", ")] : [y.k]), x.text) })).filter(b => b.items.length) }); }
  const matrix = []; { const a = idx(153); for (let i = a; i < end(153); i++) { const c = L[i].split('|').slice(1, -1).map(s => s.trim()); if (c.length === 2 && !/^-+$/.test(c[0]) && c[0] !== 'Situation') matrix.push({ situation: clean(c[0]), format: clean(c[1]) }); } }
  const anti = parse(idx(154) + 1, end(154), /^## (.+)/).map(s => { const bad = s.f.find(x => /^(bad|symptom)$/i.test(x.k)), fi = s.f.findIndex(x => /^fix$/i.test(x.k)); const fix = fi < 0 ? [] : s.f.slice(fi).reduce((a, y, j) => a.concat(j === 0 ? y.items : [y.k + (y.items.length ? ": " + y.items.join(", ") : "")]), []).filter(x => !/^either:?$|^or$/i.test(x)); return { name: s.name, bad: bad ? bad.items.join(' ') : s.text.join(' '), fix }; });
  const sequences = parse(idx(164) + 1, end(164), /^## (.+)/).filter(s => s.shapes.length).map(s => ({ name: s.name, steps: s.shapes[0].text.split('\n').map(x => clean(x.replace(/^[→>\-\s]+/, ''))).filter(x => x && !/^[↓→]$/.test(x)) }));
  const compare = []; { const a = idx(161); for (let i = a; i < end(161); i++) { const m = L[i].match(/^- (.+?) vs\.? (.+)$/i); if (m) compare.push([clean(m[1]), clean(m[2])]); } }
  const roles = parse(idx(156) + 1, end(156), /^## (.+)/).map(s => ({ name: s.name, items: s.f.reduce((acc, y) => acc.concat(y.items.length ? y.items : []), s.text).slice(0, 6) })).filter(r => r.items.length);
  const stats = { formats: formats.length, byGroup: formats.reduce((m, f) => (m[f.group] = (m[f.group] || 0) + 1, m), {}), phases: phases.length, matrix: matrix.length, anti: anti.length, sequences: sequences.length, compare: compare.length, roles: roles.length };
  const js = `// Sprint formats, phases and selection guidance. GENERATED by tools/sprint-gen.js from the master backlog (sections 136 to 173). Do not hand-edit.
// A Sprint record stores its topic; formats are separate, reusable delivery variants (section 136).
window.RD_SPRINT = ${JSON.stringify({ formats, phases, matrix, anti, sequences, compare, roles })};
`;
  return { js, stats };
};
