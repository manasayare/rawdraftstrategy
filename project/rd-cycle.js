// Raw Draft cycle engine. RDCycle.mount(el, { onStage(i, phase), driven }) -> { goTo(i), setProgress(f), destroy() }
// driven: time stands still until setProgress(0..1) moves it, e.g. from scroll. The visible state eases towards it.
// One persistent set of nodes changes state: potential, creation (field expands), chaos (competing links), chaos/clarity (local binding),
// clarity (nodes bind into units, units into bodies, bodies connect), cadence (circulation), a new disturbance, creation again.
(function () {
  const INK = "236,233,224", ACC = "#ff4b23";
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T = { pot: 0, cre: 1.8, cha: 7, osc: 13, cla: 25, cad: 31, per: 40, end: 45 };
  const START = [T.cre, T.cha, T.cla - 3, T.cad];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), sm = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }, ease = x => 1 - Math.pow(1 - clamp(x, 0, 1), 3), lerp = (a, b, k) => a + (b - a) * k;
  const rng = s => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const SCHED = [
    [[0, .1], [.15, .7], [.3, .2], [.55, .85], [1, 1]], [[0, .05], [.35, .3], [.55, .1], [.75, .45], [.9, .25], [1, .95]], [[0, .2], [.3, .65], [.5, .7], [.75, .9], [1, 1]],
    [[0, .1], [.25, .5], [.6, .9], [1, 1]], [[0, .3], [.3, .45], [.5, .2], [.7, 0], [1, 0]], [[0, .1], [.4, .6], [.6, .3], [.8, .8], [1, 1]], [[0, .2], [.2, .55], [.5, .5], [.65, .15], [.85, .7], [1, 1]]];
  const sched = (k, f) => { const s = SCHED[k]; for (let i = 1; i < s.length; i++) if (f <= s[i][0]) { const a = s[i - 1], b = s[i]; return lerp(a[1], b[1], sm((f - a[0]) / (b[0] - a[0] || 1))); } return s[s.length - 1][1]; };

  function build(W, H, low) {
    const R = rng(7), per = low ? 6 : 10, n = per * 7, C = [];
    const cx = W * .5, cy = H * .5, sx = W * (low ? .42 : .4), sy = H * .38;
    const centers = [[-.55, -.35], [.05, -.55], [.55, -.2], [-.15, .1], [.75, .45], [-.6, .5], [.25, .5]].map(([x, y]) => [cx + x * sx, cy + y * sy]);
    for (let i = 0; i < n; i++) {
      const k = i % 7, m = Math.floor(i / 7), atom = Math.floor(m / 3), slot = m % 3;
      const fa = R() * 6.283, fr = Math.sqrt(R());
      C.push({ k, m, atom, slot, fx: cx + Math.cos(fa) * fr * sx * 1.2, fy: cy + Math.sin(fa) * fr * sy * 1.25, ph: R() * 6.28, aa: atom * 2.2 + k * .7, ar: atom === 0 ? 0 : 20 + atom * 9, la: slot * 2.094 + k, x: cx, y: cy, a: 0, coh: 0 });
    }
    const chaos = [], atomB = [], molB = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const A = C[i], B = C[j]; if (A.k !== B.k) { if (R() < .012) chaos.push([i, j, R()]); continue; }
      if (A.atom === B.atom) atomB.push([i, j]); else if (A.slot === 0 && B.slot === 0) molB.push([i, j]); else if (R() < .35) chaos.push([i, j, R()]); }
    const back = [[0, 3], [3, 1], [1, 2], [3, 6], [6, 4], [0, 5], [2, 6]];
    return { C, chaos, atomB, molB, centers, back, cx, cy, low };
  }

  function phaseCoh(p, t) { const oscF = clamp((t - T.osc) / (T.cla - T.osc), 0, 1);
    if (t < T.cha) return 0; if (t < T.osc) return .18 * Math.max(0, Math.sin((t - T.cha) * 1.2 + p.k)); if (t < T.cla) return sched(p.k, oscF); return p.k === 4 ? 0 : 1; }

  function targets(S, t) {
    const { C, centers, cx, cy } = S, out = new Array(C.length);
    const sc = t < T.cre ? 0 : ease((t - T.cre) / 4.5);
    for (let i = 0; i < C.length; i++) {
      const p = C[i], c = centers[p.k], coh = phaseCoh(p, t);
      const c1 = clamp(coh * 1.7, 0, 1), c2 = sm((coh - .35) / .65);                        // bind into units first, then units into a body
      const ff = sc * (1 + Math.sin(t * .4 + p.ph) * .015);
      const fx = cx + (p.fx - cx) * ff, fy = cy + (p.fy - cy) * ff;
      const pull = t < T.cha ? 0 : sm((t - T.cha) / (T.osc - T.cha + 4)) * .6;
      const energy = t < T.cha ? 3 * sc : 22 * (1 - c1);
      const chx = lerp(fx, c[0], pull) + Math.sin(t * 1.6 + p.ph) * energy, chy = lerp(fy, c[1], pull) + Math.cos(t * 1.3 + p.ph * 1.3) * energy;
      const rot = t > T.cla ? (t - T.cla) * .06 * (p.k % 2 ? 1 : -1) : 0;
      const spread = 1 + (1 - c2) * 1.9;
      const acx = c[0] + Math.cos(p.aa + rot) * p.ar * spread + Math.sin(t * .9 + p.atom) * 6 * (1 - c2), acy = c[1] + Math.sin(p.aa + rot) * p.ar * .82 * spread + Math.cos(t * .8 + p.atom) * 6 * (1 - c2);
      const lr = p.slot === 0 ? 0 : 7 * (1 + (1 - c1) * 2.2), la = p.la + t * .25 * (t > T.cad ? 1 : .3);
      let x = lerp(chx, acx + Math.cos(la) * lr, c1), y = lerp(chy, acy + Math.sin(la) * lr, c1), a = t < T.cre ? 0 : clamp((t - T.cre) * 1.2, 0, 1);
      if (p.k === 4) a *= t < T.osc ? 1 : 1 - sm((clamp((t - T.osc) / (T.cla - T.osc), 0, 1) - .45) / .3);
      if (t > T.cad + 3 && t < T.cad + 6 && i === 9) { const d = Math.sin((t - T.cad - 3) / 3 * Math.PI); x += d * 18; y -= d * 8; }
      if (t >= T.per) { const u = sm((t - T.per) / (T.end - T.per)); x = cx + (x - cx) * (1 + u * .8); y = cy + (y - cy) * (1 + u * .8); a *= 1 - u; }
      out[i] = { x, y, a, coh, c1, c2 };
    }
    return out;
  }

  function stageOf(t) { if (t < T.cha) return [0, "Creation"]; if (t < T.osc) return [1, "Chaos"]; if (t < T.cla - 3) return [Math.sin((t - T.osc) * .7) > 0 ? 2 : 1, "Chaos ⇄ Clarity"]; if (t < T.cad) return [2, "Clarity"]; if (t < T.per) return [3, "Cadence"]; return [3, "A new disturbance"]; }

  // One stage at a time, no back-and-forth, for scroll-driven use.
  function simpleStage(t) { const i = t < T.cha + 1 ? 0 : t < (T.osc + T.cla) / 2 ? 1 : t < T.cad ? 2 : 3; return [i, ["Creation", "Chaos", "Clarity", "Cadence"][i]]; }

  function draw(ctx, S, P, t, W, H) {
    ctx.clearRect(0, 0, W, H);
    const { C, chaos, atomB, molB, centers, back, cx, cy } = S;
    const sc = t < T.cre ? 0 : ease((t - T.cre) / 4.5), gf = t < T.cha ? 1 : clamp(1 - (t - T.cha) / 5, 0, 1);
    if (sc > 0 && gf > 0) { ctx.strokeStyle = `rgba(${INK},${.07 * gf})`; ctx.lineWidth = 1; ctx.beginPath(); const g = 8;
      for (let i = -g; i <= g; i++) { const o = i / g; ctx.moveTo(cx + o * W * .6 * sc, cy - H * .55 * sc); ctx.lineTo(cx + o * W * .6 * sc, cy + H * .55 * sc); ctx.moveTo(cx - W * .6 * sc, cy + o * H * .55 * sc); ctx.lineTo(cx + W * .6 * sc, cy + o * H * .55 * sc); } ctx.stroke(); }
    if (t < T.cre + 1.2) { const u = clamp(t / T.cre, 0, 1), a = t < T.cre ? .3 + u * .7 : 1 - (t - T.cre) / 1.2; ctx.fillStyle = ACC; ctx.globalAlpha = clamp(a, 0, 1); ctx.beginPath(); ctx.arc(cx, cy, 1.5 + u * 3.5, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1; }
    const seg = (A, B, al, w) => { if (al <= .01) return; ctx.lineWidth = w || 1; ctx.strokeStyle = `rgba(${INK},${al})`; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); };
    // competing links: first relations in creation, over-connection in chaos, fading as units bind
    for (const [i, j, r] of chaos) { const A = P[i], B = P[j], a = Math.min(A.a, B.a); if (a <= 0) continue;
      const cre = t < T.cha ? (r < .1 ? sm((sc - .7) / .3) * .14 : 0) : 0;
      const live = t >= T.cha ? (Math.sin(t * (1.1 + r * 1.6) + r * 30) > .1 ? 1 : .15) * (1 - Math.min(A.c1, B.c1)) * .3 : 0;
      seg(A, B, Math.max(cre, live) * a); }
    // bonds: short bright bonds inside each unit, then longer bonds between unit nuclei
    for (const [i, j] of atomB) { const A = P[i], B = P[j]; seg(A, B, Math.min(A.c1, B.c1) * .6 * Math.min(A.a, B.a), 1.2); }
    for (const [i, j] of molB) { const A = P[i], B = P[j]; const v = Math.min(A.c2, B.c2); seg(A, B, v * .38 * Math.min(A.a, B.a)); }
    const cent = centers.map((c, k) => { let x = 0, y = 0, n = 0, v = 0; C.forEach((p, i) => { if (p.k === k && p.slot === 0 && P[i].a > .2) { x += P[i].x; y += P[i].y; n++; v += P[i].c2; } }); return n ? [x / n, y / n, v / n] : null; });
    back.forEach(([a, b], e) => { const A = cent[a], B = cent[b]; if (!A || !B) return; const on = sm(Math.min(A[2], B[2]) * 1.4 - .4 - e * .05); if (on <= 0) return;
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(${INK},${.3 * on})`; ctx.setLineDash(on < .95 ? [3, 5] : []); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
      if (t > T.cla + 2 && t < T.per + 2) { const fade = sm((t - T.cla - 2) / 3), u = ((t - T.cla) * .22 + e * .31) % 1; ctx.globalAlpha = fade; ctx.fillStyle = e === 2 ? ACC : `rgba(${INK},.9)`; ctx.fillRect(lerp(A[0], B[0], u) - 2, lerp(A[1], B[1], u) - 2, 4, 4); ctx.globalAlpha = 1; } });
    for (let i = 0; i < P.length; i++) { const p = P[i]; if (p.a <= .01) continue; const nuc = C[i].slot === 0, s = 1.8 + (nuc ? p.c1 * 2 : p.c1 * .6);
      ctx.fillStyle = `rgba(${INK},${(.5 + p.c1 * .45) * p.a})`; ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s); }
    if (t > T.per - 1.5) { const u = sm((t - T.per + 1.5) / 3), ex = lerp(W * 1.02, cx + W * .18, u), ey = lerp(H * .12, cy - H * .12, u);
      const v = t > T.per + 1.5 ? sm((t - T.per - 1.5) / (T.end - T.per - 1.5)) : 0, nx = lerp(ex, cx, v), ny = lerp(ey, cy, v);
      if (cent[2] && v < .5) { ctx.strokeStyle = `rgba(255,75,35,${.6 * (1 - v * 2)})`; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(cent[2][0], cent[2][1]); ctx.stroke(); }
      ctx.fillStyle = ACC; ctx.beginPath(); ctx.arc(nx, ny, 3 + v * 2, 0, 6.283); ctx.fill(); }
  }

  function mount(el, opts) {
    opts = opts || {};
    const cv = document.createElement("canvas"); cv.style.cssText = "display:block;width:100%;height:100%"; cv.setAttribute("aria-hidden", "true"); el.innerHTML = ""; el.appendChild(cv);
    const ctx = cv.getContext("2d"); let W = 0, H = 0, S = null, P = null, raf = 0, vis = true, t0 = performance.now(), off = 0, lastStage = "", destroyed = false, lastF = 0, warp = null;
    function size() { W = el.clientWidth; H = el.clientHeight; if (!W || !H) return; const d = Math.min(2, devicePixelRatio || 1); cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      if (reduce) { drawStatic(); return; } S = build(W, H, W < 640); P = S.C.map(() => ({ x: S.cx, y: S.cy, a: 0, coh: 0, c1: 0, c2: 0 })); }
    function drawStatic() { const frames = [4, 10, 21, 34, 42.5], vert = W < 640, n = frames.length, fw = vert ? W : W / n, fh = vert ? H / n : H; ctx.clearRect(0, 0, W, H);
      frames.forEach((ft, k) => { ctx.save(); ctx.translate(vert ? 0 : k * fw, vert ? k * fh : 0); ctx.beginPath(); ctx.rect(0, 0, fw, fh); ctx.clip(); const s = build(fw, fh, true); draw(ctx, s, targets(s, ft), ft, fw, fh); ctx.restore();
        if (k) { ctx.strokeStyle = `rgba(${INK},.15)`; ctx.beginPath(); vert ? (ctx.moveTo(0, k * fh), ctx.lineTo(W, k * fh)) : (ctx.moveTo(k * fw, 0), ctx.lineTo(k * fw, H)); ctx.stroke(); } }); }
    const raw = () => (performance.now() - t0) / 1000 + off, wrap = x => ((x % T.end) + T.end) % T.end;
    const D0 = T.cre + .6, D1 = T.per - .6; let dTarget = D0, dT = D0;
    function now() { if (opts.driven) return dT; if (warp) { const u = clamp((performance.now() - warp.s) / warp.d, 0, 1); off = lerp(warp.from, warp.to, sm(u)) - (performance.now() - t0) / 1000; if (u >= 1) warp = null; } return wrap(raw()); }
    function frame(ts) { if (destroyed) return; raf = vis ? requestAnimationFrame(frame) : 0; if (!S) return; ts = ts || performance.now(); const dt = lastF ? Math.min(.1, (ts - lastF) / 1000) : .016; lastF = ts;
      if (opts.driven) dT += (dTarget - dT) * (1 - Math.exp(-dt * 3));
      const t = now(), tg = targets(S, t), k = 1 - Math.exp(-dt * 4), ka = 1 - Math.exp(-dt * 5);
      for (let i = 0; i < P.length; i++) { const p = P[i], q = tg[i], kk = t < T.cre + .3 && !warp ? 1 : k; p.x += (q.x - p.x) * kk; p.y += (q.y - p.y) * kk; p.a += (q.a - p.a) * ka; p.coh += (q.coh - p.coh) * ka; p.c1 += (q.c1 - p.c1) * ka; p.c2 += (q.c2 - p.c2) * ka; }
      draw(ctx, S, P, t, W, H); const [i, ph] = opts.driven ? simpleStage(t) : stageOf(t); const key = i + ph; if (key !== lastStage) { lastStage = key; opts.onStage && opts.onStage(i, ph); } }
    const ro = new ResizeObserver(size); ro.observe(el); size(); if (!reduce) raf = requestAnimationFrame(frame);
    const io = new IntersectionObserver(es => { vis = es.some(e => e.isIntersecting); if (vis && !raf && !reduce) { lastF = 0; raf = requestAnimationFrame(frame); } }, { threshold: 0 }); io.observe(el);
    if (reduce) opts.onStage && opts.onStage(-1, "");
    return {
      // move through intervening states quickly instead of cutting, so the same system visibly transforms
      setProgress(f) { dTarget = lerp(D0, D1, clamp(f, 0, 1)); },
      goTo(i) { if (reduce) return; const cur = raw(), base = cur - wrap(cur); let to = base + START[i]; if (to < cur - .5) to += T.end; warp = { from: cur, to, s: performance.now(), d: clamp((to - cur) * 90, 600, 2600) }; },
      destroy() { destroyed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); el.innerHTML = ""; }
    };
  }
  window.RDCycle = { mount, phases: T, _t: { build, targets, draw, stageOf } };
})();
