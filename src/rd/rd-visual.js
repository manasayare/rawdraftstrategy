// COPIED by scripts/dc-to-jsx.mjs from project/rd-visual.js.
// <rd-visual type="sticky_cluster" seed="12" label="Title"> Raw Draft workshop-artifact visuals. One renderer, shared constants, deterministic layouts.
(function () {
  const K = { W: 320, H: 180, nw: 24, nh: 18, r: 1.5, ink: "#ece9e0", acc: "#ff4b23", fill: .72, dim: .26, line: .32, sw: 1, rot: 5, ms: 200 };
  const TYPES = ["single_sticky", "sticky_scatter", "sticky_cluster", "sticky_vote", "sticky_matrix", "sticky_funnel", "sticky_sequence", "sticky_tree", "sticky_map", "sticky_timeline", "sticky_layers", "sticky_orbits", "paper_sketches", "cards_deck", "tokens_board", "signal_constellation", "system_loops", "lego_blocks_abstract", "doc_page", "prompt_text", "dialogue_pairs", "observe_frame", "book_spines", "learning_path", "index_shelf", "split_test", "score_bars", "role_grid", "pulse_line", "iceberg_layers", "time_graph", "survey_scale", "profile_card", "sprint_format", "plain_type"];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hash = s => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => { let s = (seed >>> 0) || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
  const f = n => Math.round(n * 10) / 10;

  function draw(type, seed, low, opt) {
    const R = rng(seed * 2654435761), j = a => (R() * 2 - 1) * a, out = [];
    const push = (el, dx, dy) => out.push(dx || dy ? `<g class="m" style="--dx:${f(dx)}px;--dy:${f(dy)}px">${el}</g>` : el);
    const note = (x, y, o = {}) => { const w = o.w || K.nw, h = o.h || K.nh, rot = o.rot != null ? o.rot : j(K.rot);
      push(`<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${K.r}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})" fill="${o.acc ? K.acc : K.ink}" fill-opacity="${o.acc ? 1 : (o.dim ? K.dim : K.fill)}"/>`, o.dx, o.dy); };
    const frame = (x, y, w, h, o = {}) => push(`<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.rx || 0}" transform="rotate(${f(o.rot || 0)} ${f(x + w / 2)} ${f(y + h / 2)})" fill="${o.fill || "none"}" stroke="${o.acc ? K.acc : K.ink}" stroke-opacity="${o.acc ? 1 : (o.op || .5)}" stroke-width="${K.sw}"/>`, o.dx, o.dy);
    const line = (x1, y1, x2, y2, o = {}) => out.push(`<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" stroke="${o.acc ? K.acc : K.ink}" stroke-opacity="${o.acc ? 1 : (o.op || K.line)}" stroke-width="${o.w || K.sw}" fill="none"${o.dash ? ' stroke-dasharray="2 4"' : ""}/>`);
    const curve = (d, o = {}) => out.push(`<path d="${d}" stroke="${o.acc ? K.acc : K.ink}" stroke-opacity="${o.acc ? 1 : (o.op || K.line)}" stroke-width="${K.sw}" fill="none"${o.dash ? ' stroke-dasharray="2 4"' : ""}/>`);
    const dot = (x, y, r, o = {}) => push(`<circle${o.appear ? ' class="a"' : ""} cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${o.acc ? K.acc : K.ink}" fill-opacity="${o.acc ? 1 : (o.op || K.fill)}"/>`, o.appear ? 0 : o.dx, o.appear ? 0 : o.dy);
    const ring = (x, y, r, o = {}) => out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${K.ink}" stroke-opacity="${o.op || .22}" stroke-width="${K.sw}"/>`);
    const C = 160, M = 90;
    switch (type) {
      case "single_sticky": note(C, M, { w: 58, h: 46, rot: -2.5, dy: -2 }); dot(C + 38, M - 30, 3, { acc: true }); break;
      case "sticky_scatter": { const n = low ? 9 : 14, pts = []; let g = 0;
        while (pts.length < n && g++ < 400) { const x = 30 + R() * 260, y = 26 + R() * 128; if (pts.every(p => Math.hypot(p[0] - x, p[1] - y) > 34)) pts.push([x, y]); }
        pts.forEach((p, i) => note(p[0], p[1], { acc: i === 3 || (!low && i === 9), rot: j(9), dx: (p[0] - C) * .025, dy: (p[1] - M) * .025 })); break; }
      case "sticky_cluster": { const cs = low ? [[90, 60], [230, 60], [160, 132]] : [[70, 58], [180, 48], [270, 96], [112, 132], [212, 138]];
        cs.forEach((c, k) => { const n = low ? 3 : 2 + (k % 3); line(c[0] - 16, c[1] - 26, c[0] + 4, c[1] - 26, { op: .5 });
          for (let i = 0; i < n; i++) { const x = c[0] + (i % 2) * 27 - 13 + j(2), y = c[1] + Math.floor(i / 2) * 21 - 2 + j(2); note(x, y, { acc: k === 1 && i === 0, rot: j(3), dx: (c[0] - x) * .08, dy: (c[1] - y) * .08 }); } }); break; }
      case "sticky_vote": { const P = [[70, 62], [160, 58], [250, 64], [74, 128], [164, 124], [252, 130]], V = [0, 4, 0, 1, 2, 0];
        P.forEach((p, i) => { note(p[0], p[1], { w: 40, h: 30, rot: j(3), acc: i === 1 }); for (let v = 0; v < V[i]; v++) dot(p[0] - 12 + v * 8, p[1] + 22, 2.6, { acc: i === 1 }); });
        dot(P[1][0] - 12 + 4 * 8, P[1][1] + 22, 2.6, { acc: true, appear: true }); break; }
      case "sticky_matrix": line(C, 18, C, 162, { op: .45 }); line(40, M, 280, M, { op: .45 });
        [[96, 48], [124, 66], [92, 128], [130, 140], [212, 124], [236, 140], [216, 52]].slice(0, low ? 5 : 7).forEach((p, i) => note(p[0], p[1], { rot: j(4), dim: i === 2 || i === 3 }));
        note(246, 40, { acc: true, rot: -3, dx: 2, dy: -2 }); break;
      case "sticky_funnel": { const L = low ? 6 : 10; for (let i = 0; i < L; i++) note(42 + (i % 2) * 30, 30 + Math.floor(i / 2) * (low ? 40 : 30), { rot: j(4), dim: i % 3 === 2, dx: 1 });
        [52, 90, 128].forEach(y => note(168, y, { rot: j(3) })); note(268, M, { w: 32, h: 26, rot: -2, acc: true, dx: 2 }); break; }
      case "sticky_sequence": { const n = low ? 4 : 6, gap = 240 / (n - 1); line(36, 122, 284, 122, { op: .3 });
        for (let i = 0; i < n; i++) { const x = 40 + i * gap, y = 84 + j(8); note(x, y, { rot: j(3), acc: i === n - 2, dx: 1 }); line(x, y + 12, x, 122, { op: .2 }); } break; }
      case "sticky_tree": { note(C, 30, { w: 34, h: 24, rot: 0, acc: true }); const B = low ? [96, 224] : [72, 160, 248];
        B.forEach((x, k) => { curve(`M${C} 42 C${C} 62 ${x} 58 ${x} 82`); note(x, 90, { rot: j(3) }); const m = 1 + (k % 2) + (low ? 0 : 1) - 1;
          for (let i = 0; i <= m; i++) { const xx = x - 15 * m + i * 30; line(x, 99, xx, 136, { op: .22 }); note(xx, 144, { rot: j(4), dim: i === m && k === 0, dy: 1 }); } }); break; }
      case "sticky_map": { note(C, M, { w: 34, h: 26, rot: 0, acc: true }); const n = low ? 5 : 7;
        for (let i = 0; i < n; i++) { const a = i / n * 6.283 + .4, rr = [50, 74, 62, 86, 54, 78, 68][i]; const x = C + Math.cos(a) * rr * 1.5, y = M + Math.sin(a) * rr * .82;
          if (i % 3 !== 2) line(C, M, x, y, { op: .25 }); note(x, y, { rot: j(4), dim: rr > 80, dx: (C - x) * .02, dy: (M - y) * .02 }); } break; }
      case "sticky_timeline": { const v = opt.variant;
        if (v === "horizons") { curve(`M30 46 C110 52 170 120 290 150`, { op: .5 }); curve(`M30 150 C120 148 190 60 290 34`, { op: .5 }); curve(`M110 128 C150 100 180 94 230 90`, { acc: true }); note(60, 54, { rot: -3 }); note(250, 46, { rot: 3 }); note(170, 108, { rot: 0, dim: true }); break; }
        line(30, 150, 290, 150, { op: .5 }); for (let i = 0; i < 6; i++) line(30 + i * 52, 146, 30 + i * 52, 154, { op: .4 });
        if (v === "reverse") { note(270, 60, { w: 32, h: 26, rot: 0, acc: true }); curve(`M252 64 C200 76 120 88 54 108`, { op: .45, dash: true }); [[206, 82], [140, 98], [68, 116]].forEach(p => note(p[0], p[1], { rot: j(3), dx: 2 })); break; }
        [[56, 116], [100, 74], [150, 104], [196, 56], [252, 90]].slice(0, low ? 4 : 5).forEach((p, i) => { line(p[0], p[1] + 9, p[0], 150, { op: .18 }); note(p[0], p[1], { rot: j(3), acc: i === 3, dy: -1 }); }); break; }
      case "sticky_layers": { [52, 90, 128].forEach(y => line(24, y, 296, y, { op: .3 })); const cols = low ? [70, 160, 250] : [56, 112, 168, 224, 274];
        [33, 71, 109, 147].forEach((y, r) => cols.forEach((x, c) => { if ((r * 7 + c * 3) % 5 !== 4) note(x, y, { w: 22, h: 15, rot: j(2), acc: c === 2 && r === 2, dim: r === 3 }); })); break; }
      case "sticky_orbits": { dot(34, 96, 4, { acc: true }); for (let i = 0; i < (low ? 4 : 7); i++) dot(70 + R() * 50, 40 + R() * 100, 1.8 + R(), { op: .5 });
        [[180, 62, 26], [240, 120, 32]].forEach(([x, y, r], k) => { ring(x, y, r); ring(x, y, r * .55, { op: .14 }); dot(x, y, 3.2); for (let i = 0; i < 3; i++) { const a = i * 2.1 + k; dot(x + Math.cos(a) * r, y + Math.sin(a) * r, 2.2); } });
        dot(286, 154, 2.6, { acc: true, dx: 3, dy: 2 }); break; }
      case "paper_sketches": { const c = low ? 2 : 4, cw = 260 / c, ch = 64;
        for (let r = 0; r < 2; r++) for (let k = 0; k < c; k++) { const x = 30 + k * cw, y = 24 + r * (ch + 12), i = r * c + k; frame(x + 3, y, cw - 10, ch, { acc: i === (low ? 1 : 5), op: .42, rot: j(.8) });
          line(x + 10, y + 14 + (i % 3) * 6, x + cw - 24 - (i % 2) * 14, y + 14 + (i % 3) * 6, { op: .35 }); if (i % 2) frame(x + 12, y + 34, cw - 34, 18, { op: .25 }); else line(x + 10, y + ch - 14, x + cw * .5, y + ch - 14, { op: .25 }); } break; }
      case "cards_deck": [[-9, 110, 96], [-3, 132, 90], [4, 154, 88], [10, 178, 92]].forEach(([rot, x, y], i) => { frame(x - 34, y - 48, 68, 96, { fill: "#0f0f0e", rot, op: .55, acc: i === 2, dx: i * .8 });
        if (i === 3) { line(x - 20, y - 26, x + 12, y - 26, { op: .5 }); line(x - 20, y - 16, x + 4, y - 16, { op: .3 }); dot(x + 16, y + 30, 3, { acc: false }); } }); break;
      case "tokens_board": { const cx = low ? 4 : 6, cy = 3, s = 34, x0 = C - cx * s / 2, y0 = M - cy * s / 2;
        for (let r = 0; r < cy; r++) for (let k = 0; k < cx; k++) frame(x0 + k * s, y0 + r * s, s, s, { op: .2 });
        curve(`M${x0 + s / 2} ${y0 + s * 2.5} L${x0 + s * 1.5} ${y0 + s * 1.5} L${x0 + s * 2.5} ${y0 + s * 1.5}`, { op: .45, dash: true });
        dot(x0 + s / 2, y0 + s * 2.5, 6, { op: .8 }); dot(x0 + s * 2.5, y0 + s * 1.5, 6, { acc: true, dx: 2 }); dot(x0 + s * (cx - 1.5), y0 + s / 2, 6, { op: .45 }); out.push(`<rect x="${f(x0 + s * (cx - 1.5) - 5)}" y="${f(y0 + s * 2.5 - 5)}" width="10" height="10" fill="${K.ink}" fill-opacity=".6"/>`); break; }
      case "signal_constellation": { const n = low ? 14 : 24, cl = [[208, 66], [118, 124]];
        for (let i = 0; i < n; i++) { const c = i < 10 ? cl[i % 2] : null, x = c ? c[0] + j(26) : 24 + R() * 272, y = c ? c[1] + j(18) : 20 + R() * 140; dot(x, y, c ? 2.4 : 1.6, { op: c ? .85 : .35, acc: i === 0, dx: c ? (c[0] - x) * .06 : 0, dy: c ? (c[1] - y) * .06 : 0 }); }
        line(cl[0][0] - 14, cl[0][1] + 6, cl[0][0] + 12, cl[0][1] - 8, { op: .3 }); line(cl[1][0] - 10, cl[1][1] - 6, cl[1][0] + 16, cl[1][1] + 4, { op: .3 }); line(cl[0][0], cl[0][1], cl[1][0], cl[1][1], { op: .16, dash: true }); break; }
      case "system_loops": { const n = low ? 4 : 5, P = []; for (let i = 0; i < n; i++) { const a = i / n * 6.283 - 1.57; P.push([C + Math.cos(a) * 92, M + Math.sin(a) * 58]); }
        P.forEach((p, i) => { const q = P[(i + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, ox = (mx - C) * .35, oy = (my - M) * .35; curve(`M${f(p[0])} ${f(p[1])} Q${f(mx + ox)} ${f(my + oy)} ${f(q[0])} ${f(q[1])}`, { acc: i === 1, op: .45 }); });
        curve(`M${f(P[0][0])} ${f(P[0][1])} Q${C - 20} ${M} ${f(P[2][0])} ${f(P[2][1])}`, { op: .2, dash: true }); P.forEach((p, i) => dot(p[0], p[1], 5, { acc: i === 2 })); break; }
      case "lego_blocks_abstract": [[110, 132, 64, 0], [142, 104, 64, 0], [182, 132, 64, 1], [124, 76, 40, 2]].forEach(([x, y, w, k]) => { const h = 22, acc = k === 1;
        out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${acc ? K.acc : K.ink}" fill-opacity="${acc ? 1 : (k ? .45 : .72)}"/>`); for (let s = 0; s < w / 16; s++) out.push(`<rect x="${x + 5 + s * 16}" y="${y - 5}" width="8" height="5" fill="${acc ? K.acc : K.ink}" fill-opacity="${acc ? 1 : (k ? .45 : .72)}"/>`); }); break;
      case "doc_page": out.push(`<path d="M128 22 H182 L198 38 V158 H128 Z" fill="none" stroke="${K.ink}" stroke-opacity=".55" stroke-width="1"/><path d="M182 22 V38 H198" fill="none" stroke="${K.ink}" stroke-opacity=".55"/>`);
        [50, 62, 74, 92, 104, 116, 128].forEach((y, i) => line(140, y, 140 + [44, 40, 28, 44, 36, 42, 22][i], y, { op: i === 0 ? .7 : .3, acc: i === 3 })); break;
      case "prompt_text": [[40, 50, 200], [40, 68, 170], [40, 86, 220], [40, 104, 120], [40, 130, 90]].forEach(([x, y, w], i) => line(x, y, x + w, y, { op: i === 4 ? .6 : .32, w: i === 4 ? 1.4 : 1 })); out.push(`<rect x="136" y="122" width="7" height="14" fill="${K.acc}"/>`); break;
      case "dialogue_pairs": { const P = low ? [[110, 90], [210, 90]] : [[96, 70], [224, 70], [160, 136]];
        P.forEach((p, i) => { dot(p[0], p[1], 9, { acc: i === 0, op: .8 }); ring(p[0], p[1], 18, { op: .18 }); });
        for (let i = 0; i < P.length; i++) { const a = P[i], b2 = P[(i + 1) % P.length]; if (P.length === 2 && i) break; const mx = (a[0] + b2[0]) / 2, my = (a[1] + b2[1]) / 2;
          [-8, 0, 8].forEach((o, k) => line(mx - 16 + (k % 2) * 4, my + o, mx + 12 - (k === 1 ? 10 : 0), my + o, { op: k === 0 ? .55 : .28, dx: 0 })); } break; }
      case "observe_frame": { const x0 = 70, y0 = 34, w = 180, h = 112, b = 16;
        [[x0, y0, 1, 1], [x0 + w, y0, -1, 1], [x0, y0 + h, 1, -1], [x0 + w, y0 + h, -1, -1]].forEach(([x, y, sx, sy]) => { line(x, y, x + b * sx, y, { op: .6 }); line(x, y, x, y + b * sy, { op: .6 }); });
        curve(`M${x0 + 24} ${y0 + 84} C${x0 + 60} ${y0 + 30} ${x0 + 110} ${y0 + 96} ${x0 + 156} ${y0 + 40}`, { op: .3, dash: true });
        [[x0 + 24, y0 + 84], [x0 + 82, y0 + 66]].forEach(p => dot(p[0], p[1], 2.4, { op: .5 })); dot(x0 + 128, y0 + 64, 5, { acc: true, dx: 3, dy: -2 }); break; }
      case "book_spines": { let x = 92; [[64, .7], [88, .45], [76, .72], [96, 0], [70, .45], [84, .72]].slice(0, low ? 4 : 6).forEach(([h, op], i) => { const w = 14 + (i % 3) * 4, y = 150 - h;
          if (i === 3) out.push(`<rect x="${x + 10}" y="${y}" width="${w}" height="${h}" transform="rotate(12 ${x + 10 + w / 2} 150)" fill="${K.acc}"/>`); else out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${K.ink}" fill-opacity="${op}"/>`);
          line(x + 3, y + 10, x + w - 3, y + 10, { op: .0 }); x += w + (i === 2 ? 26 : 5); }); line(70, 151, 250, 151, { op: .5 }); break; }
      case "learning_path": { const n = low ? 4 : 5; for (let i = 0; i < n; i++) { const x = 52 + i * (216 / (n - 1)), y = 140 - i * 22; out.push(`<rect x="${f(x - 20)}" y="${f(y)}" width="40" height="${f(150 - y + 8)}" fill="${K.ink}" fill-opacity="${f(.12 + i * .08)}"/>`); line(x - 20, y, x + 20, y, { op: .6 }); }
        dot(52 + 2 * (216 / (n - 1)), 140 - 2 * 22 - 9, 5, { acc: true, dx: 4, dy: -3 }); break; }
      case "index_shelf": { const cols = low ? 3 : 5, rows = 3; for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) { const x = 40 + k * (240 / cols), y = 32 + r * 42, w = 240 / cols - 10;
          frame(x, y, w, 30, { op: .3 }); out.push(`<rect x="${f(x + 4 + ((r + k) % 3) * 8)}" y="${f(y - 5)}" width="14" height="5" fill="${(r === 1 && k === 1) ? K.acc : K.ink}" fill-opacity="${(r === 1 && k === 1) ? 1 : .45}"/>`); line(x + 6, y + 14, x + w - 12, y + 14, { op: .25 }); } break; }
      case "split_test": { line(C, 22, C, 160, { op: .3 }); line(40, 64, 280, 64, { op: .5, dash: true });
        [[70, 52], [96, 74], [122, 66]].forEach(([x, h]) => out.push(`<rect x="${x}" y="${150 - h}" width="16" height="${h}" fill="${K.ink}" fill-opacity=".4"/>`));
        [[194, 70], [220, 96], [246, 112]].forEach(([x, h], i) => out.push(`<rect x="${x}" y="${150 - h}" width="16" height="${h}" fill="${i === 2 ? K.acc : K.ink}" fill-opacity="${i === 2 ? 1 : .72}"/>`)); line(56, 150, 268, 150, { op: .5 }); break; }
      case "score_bars": [[148, .72], [112, .72], [200, 1], [74, .4], [130, .55]].slice(0, low ? 4 : 5).forEach(([w, op], i) => { const y = 34 + i * 26; line(56, y + 7, 280, y + 7, { op: .12 }); out.push(`<rect x="56" y="${y}" width="${w}" height="14" fill="${op === 1 ? K.acc : K.ink}" fill-opacity="${op}"/>`); dot(44, y + 7, 2, { op: .5 }); }); break;
      case "role_grid": { const cols = 4, rows = low ? 3 : 4, F = [[0, 0], [1, 1], [2, 1], [3, 2], [1, 3], [2, 0]]; for (let r = 0; r < rows; r++) { line(60, 40 + r * 32, 270, 40 + r * 32, { op: .14 }); frame(30, 33 + r * 32, 18, 14, { op: .35 }); for (let k = 0; k < cols; k++) {
          const on = F.some(([a, b2]) => a === k && b2 === r), acc = k === 1 && r === 1; if (on) dot(100 + k * 50, 40 + r * 32, 6, { acc }); else ring(100 + k * 50, 40 + r * 32, 5, { op: .3 }); } } break; }
      case "pulse_line": curve(`M24 100 L118 100 C132 100 136 52 150 52 C164 52 166 128 180 128 C192 128 196 100 208 100 L296 100`, { op: .55 }); dot(150, 52, 4, { acc: true, dy: -3 }); line(24, 140, 296, 140, { op: .12 }); break;
      case "iceberg_layers": line(30, 66, 290, 66, { op: .55 }); out.push(`<path d="M140 66 L156 40 L176 50 L186 66 Z" fill="${K.ink}" fill-opacity=".72"/><path d="M118 72 H206 L224 104 H100 Z" fill="${K.ink}" fill-opacity=".34"/><path d="M98 110 H226 L240 136 H84 Z" fill="${K.ink}" fill-opacity=".2"/><path d="M82 142 H242 L250 162 H74 Z" fill="${K.acc}"/>`); break;
      case "time_graph": line(40, 150, 286, 150, { op: .5 }); line(40, 26, 40, 150, { op: .5 }); curve(`M44 128 C90 124 110 96 140 100 C176 104 196 52 230 50 C252 49 268 60 282 58`, { op: .65 }); curve(`M44 136 C120 134 200 120 282 110`, { op: .22, dash: true }); dot(230, 50, 4.5, { acc: true }); break;
      case "survey_scale": for (let r = 0; r < (low ? 3 : 4); r++) { const y = 42 + r * 34, pick = [3, 1, 4, 2][r]; line(50, y, 110, y, { op: .4 }); for (let k = 0; k < 5; k++) { const x = 140 + k * 30; if (k === pick) dot(x, y, 6, { acc: r === 0 }); else ring(x, y, 6, { op: .35 }); } } break;
      case "profile_card": frame(104, 30, 112, 124, { op: .5 }); dot(134, 64, 13, { op: .55 }); line(156, 58, 200, 58, { op: .6 }); line(156, 70, 188, 70, { op: .3 }); [96, 110, 124, 138].forEach((y, i) => line(118, y, 118 + [80, 64, 72, 40][i], y, { op: i === 1 ? 1 : .3, acc: i === 1 })); break;
      case "sprint_format": { const vv = opt.variant || "intensive", n = Math.max(1, Math.min(5, parseInt(opt.label, 10) || 3)), y = 74, h = 32;
        if (vv === "cadence") { for (let i = 0; i < 6; i++) dot(48 + i * 45, M, 7, { acc: i === 4, op: .7 }); line(48, M, 273, M, { op: .2 }); break; }
        if (vv === "distributed" || vv === "async") { const xs = [34, 104, 178, 246]; line(34, M, 286, M, { op: .25, dash: vv === "async" }); xs.forEach((x, i) => out.push(`<rect x="${x}" y="${vv === "async" ? y + [-14, 10, -6, 6][i] : y}" width="40" height="${h}" fill="${i === 3 ? K.acc : K.ink}" fill-opacity="${i === 3 ? 1 : .72}"/>`)); break; }
        if (vv === "research") { out.push(`<rect x="34" y="${y}" width="70" height="${h}" fill="${K.ink}" fill-opacity=".72"/><rect x="216" y="${y}" width="70" height="${h}" fill="${K.acc}"/>`); for (let i = 0; i < 7; i++) dot(122 + i * 13, M + (i % 2 ? 8 : -8), 2.2, { op: .5 }); break; }
        const W = 252, gap = 4, bw = (W - gap * (n - 1)) / n; for (let i = 0; i < n; i++) out.push(`<rect x="${f(34 + i * (bw + gap))}" y="${y}" width="${f(bw)}" height="${h}" fill="${(vv === "prototype" ? i === n - 1 : i === n - 1) ? K.acc : K.ink}" fill-opacity="${i === n - 1 ? 1 : .72}"/>`);
        line(34, y + h + 14, 286, y + h + 14, { op: .3 }); break; }
      default: { const t = (opt.label || "").replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean); const s = t.length > 1 ? t[0][0] + t[1][0] : (t[0] || "RD").slice(0, 2);
        out.push(`<text x="24" y="156" font-family="'Clash Display',sans-serif" font-weight="500" font-size="120" letter-spacing="-6" fill="${K.ink}" fill-opacity=".14">${s}</text>`); line(24, 24, 72, 24, { op: .5 }); }
    }
    return out.join("");
  }

  class RDVisual extends HTMLElement {
    static get observedAttributes() { return ["type", "seed", "label", "variant"]; }
    connectedCallback() {
      if (!this.shadowRoot) { this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `<style>:host{display:block;position:relative;overflow:hidden}svg{display:block;width:100%;height:100%}.m{transition:transform ${reduce ? 0 : K.ms}ms ease}:host([active]) .m{transform:translate(var(--dx),var(--dy))}.a{opacity:0;transition:opacity ${reduce ? 0 : K.ms}ms}:host([active]) .a{opacity:1}</style><div part="v" style="width:100%;height:100%"></div>`; }
      this.setAttribute("aria-hidden", "true");
      this.ro = new ResizeObserver(() => { const low = this.clientWidth < 300; if (low !== this.low) { this.low = low; this.render(); } }); this.ro.observe(this);
      this.host = this.closest("a,button,[data-card]");
      if (this.host) { this.on = () => this.setAttribute("active", ""); this.off = () => this.removeAttribute("active"); this.host.addEventListener("mouseenter", this.on); this.host.addEventListener("mouseleave", this.off); this.host.addEventListener("focus", this.on); this.host.addEventListener("blur", this.off); }
      this.low = this.clientWidth < 300; this.render();
    }
    disconnectedCallback() { this.ro && this.ro.disconnect(); if (this.host) { this.host.removeEventListener("mouseenter", this.on); this.host.removeEventListener("mouseleave", this.off); this.host.removeEventListener("focus", this.on); this.host.removeEventListener("blur", this.off); } }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    render() {
      const type = this.getAttribute("type") || "plain_type", seed = hash(this.getAttribute("seed") || type);
      const box = this.shadowRoot.querySelector("div");
      box.innerHTML = `<svg viewBox="0 0 ${K.W} ${K.H}" preserveAspectRatio="xMidYMid meet" focusable="false">${draw(TYPES.includes(type) ? type : "plain_type", seed, this.low, { label: this.getAttribute("label") || "", variant: this.getAttribute("variant") || "" })}</svg>`;
    }
  }
  if (!customElements.get("rd-visual")) customElements.define("rd-visual", RDVisual);
  window.RDVisual = { types: TYPES, constants: K };
})();
