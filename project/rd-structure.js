// <rd-structure> Hero structure: an unfinished space-frame drawn in perspective, larger than the viewport.
// Nearly still at rest. Pointer proximity brightens nearby members and exposes joints; slight parallax and tension. Pauses offscreen.
(function () {
  const INK = "236,233,224", ACC = "#ff4b23";
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rng = s => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  function model(low) {
    const V = [], E = [], paths = [], add = (x, y, z) => (V.push([x, y, z]), V.length - 1), edge = (a, b, w) => E.push([a, b, w || 1]);
    const R = rng(11);
    // 1. long tapering truss sweeping out of frame
    const seg = low ? 9 : 14, top = [], bot = [], side = [];
    for (let i = 0; i <= seg; i++) { const u = i / seg, x = -260 + u * 1500, y = 420 - u * 980 + Math.sin(u * 3) * 40, z = 160 - u * 520, h = 120 - u * 50;
      top.push(add(x, y - h / 2, z)); bot.push(add(x + 18, y + h / 2, z + 10)); side.push(add(x + 30, y, z + 90 - u * 40)); }
    for (let i = 0; i <= seg; i++) { edge(top[i], bot[i]); edge(top[i], side[i], .6); edge(bot[i], side[i], .6);
      if (i < seg) { edge(top[i], top[i + 1], 1.4); edge(bot[i], bot[i + 1], 1.4); edge(side[i], side[i + 1], .8); edge(i % 2 ? top[i] : bot[i], i % 2 ? bot[i + 1] : top[i + 1]); if (!low && i % 3 === 0) edge(side[i], top[i + 1], .5); } }
    paths.push(top.slice());
    // 2. partial dome: ribs from a ground ring to a shared crown, some hoops missing
    const ribs = low ? 4 : 7, pts = 9, crown = add(560, -470, -40), ribIx = [];
    for (let r = 0; r < ribs; r++) { const th = -1.15 + r * (1.9 / (ribs - 1)), rib = [];
      for (let k = 0; k < pts; k++) { const a = k / (pts - 1) * Math.PI / 2, rad = 560 * Math.cos(a); rib.push(k === pts - 1 ? crown : add(560 + Math.sin(th) * rad, 360 - Math.sin(a) * 830, -40 + Math.cos(th) * rad * .9)); }
      for (let k = 0; k < pts - 1; k++) edge(rib[k], rib[k + 1], 1.2); ribIx.push(rib); }
    paths.push(ribIx[Math.floor(ribs / 2)].slice());
    [2, 4, 6].forEach((lv, j) => { for (let r = 0; r < ribs - 1; r++) { if ((r + j) % (low ? 2 : 4) === 3) continue; edge(ribIx[r][lv], ribIx[r + 1][lv], .7); if (!low && j === 1 && r % 2 === 0) edge(ribIx[r][lv], ribIx[r + 1][lv + 1], .45); } });
    // 3. scaffold fragment
    const cols = low ? 3 : 5, lev = low ? 3 : 5, sc = [];
    for (let c = 0; c < cols; c++) { const col = []; for (let l = 0; l < lev; l++) col.push(add(900 + c * 120, 380 - l * 150, 260 - c * 40)); sc.push(col); for (let l = 0; l < lev - 1; l++) edge(col[l], col[l + 1], .9); }
    for (let c = 0; c < cols - 1; c++) for (let l = 0; l < lev; l++) { if (R() < .25) continue; edge(sc[c][l], sc[c + 1][l], .6); if (l < lev - 1 && (c + l) % 2 === 0) edge(sc[c][l], sc[c + 1][l + 1], .4); }
    // 4. a few tie members between systems
    edge(top[Math.floor(seg * .55)], ribIx[0][3], .5); edge(ribIx[ribs - 1][2], sc[0][2], .5); edge(bot[seg], sc[cols - 1][lev - 1], .4);
    // construction lines: long and faint, extending past the frame
    const cons = [[[-900, 520, 0], [2200, -900, -400]], [[300, 360, -40], [300, 360, -40], 1], [[-600, 360, -40], [2000, 360, -40]], [[560, 900, -40], [560, -1400, -40]]].filter(c => !c[2]);
    const stress = ribIx[Math.max(1, ribs - 2)][5];
    return { V, E, paths, cons, stress };
  }
  class RDStructure extends HTMLElement {
    connectedCallback() {
      this.style.display = "block"; this.style.overflow = "hidden"; this.setAttribute("aria-hidden", "true");
      if (!this.cv) { this.cv = document.createElement("canvas"); this.cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"; this.appendChild(this.cv); this.ctx = this.cv.getContext("2d"); }
      this.pt = { x: 0, y: 0, on: 0, tx: 0, ty: 0, ton: 0 }; this.t0 = performance.now(); this.vis = true;
      this.host = this.parentElement;
      this.onMove = e => { const r = this.getBoundingClientRect(); this.pt.tx = e.clientX - r.left; this.pt.ty = e.clientY - r.top; this.pt.ton = 1; this.kick(); };
      this.onLeave = () => { this.pt.ton = 0; this.kick(); };
      if (this.host && matchMedia("(hover: hover)").matches) { this.host.addEventListener("pointermove", this.onMove); this.host.addEventListener("pointerleave", this.onLeave); }
      this.ro = new ResizeObserver(() => this.size()); this.ro.observe(this);
      this.io = new IntersectionObserver(es => { this.vis = es.some(e => e.isIntersecting); this.kick(); }); this.io.observe(this);
      this.size();
    }
    disconnectedCallback() { cancelAnimationFrame(this.raf); this.raf = 0; this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); if (this.host) { this.host.removeEventListener("pointermove", this.onMove); this.host.removeEventListener("pointerleave", this.onLeave); } }
    size() { const w = this.clientWidth, h = this.clientHeight; if (!w || !h) return; const d = Math.min(2, devicePixelRatio || 1); this.cv.width = w * d; this.cv.height = h * d; this.ctx.setTransform(d, 0, 0, d, 0, 0); this.W = w; this.H = h; this.low = w < 700; this.M = model(this.low); this.disp = this.M.V.map(() => [0, 0]); this.draw(); this.kick(); }
    kick() { if (!this.raf && this.vis && this.isConnected) this.raf = requestAnimationFrame(() => this.loop()); }
    loop() { this.raf = 0; if (!this.vis) return; this.draw(); if (!reduce || Math.abs(this.pt.on - this.pt.ton) > .01) this.raf = requestAnimationFrame(() => this.loop()); }
    draw() {
      const { ctx, W, H, M, pt } = this; if (!M) return; const t = (performance.now() - this.t0) / 1000;
      pt.x += (pt.tx - pt.x) * .12; pt.y += (pt.ty - pt.y) * .12; pt.on += (pt.ton - pt.on) * .06;
      const nx = pt.on * (pt.x / W - .5), ny = pt.on * (pt.y / H - .5), br = reduce ? 0 : 1;
      const yaw = -.34 + nx * .05 + Math.sin(t * .05) * .012 * br, pitch = .1 + ny * .035 + Math.sin(t * .037) * .006 * br;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const s = this.low ? H / 1150 : Math.max(H / 1000, W / 1700), f = 1400, ox = this.low ? W * .35 : W * .58, oy = this.low ? H * .62 : H * .52;
      const P = M.V.map(([x, y, z], i) => { x -= 500; const X = x * cy + z * sy, Z0 = -x * sy + z * cy, Y = y * cp - Z0 * sp, Z = y * sp + Z0 * cp; const k = f / (f + Z * s); let px = ox + X * s * k, py = oy + Y * s * k;
        const d = this.disp[i]; if (pt.on > .01 && !this.low) { const dx = px - pt.x, dy = py - pt.y, dd = Math.hypot(dx, dy); const push = dd < 150 ? (1 - dd / 150) * 4 * pt.on : 0; d[0] += ((dd ? dx / dd : 0) * push - d[0]) * .15; d[1] += ((dd ? dy / dd : 0) * push - d[1]) * .15; } else { d[0] *= .9; d[1] *= .9; }
        return [px + d[0], py + d[1], Z]; });
      ctx.clearRect(0, 0, W, H);
      const textFade = x => this.low ? .55 : clamp01((x - W * .18) / (W * .3)) * .75 + .25;
      ctx.lineWidth = 1; ctx.setLineDash([2, 6]); ctx.strokeStyle = `rgba(${INK},.07)`; ctx.beginPath();
      M.cons.forEach(([a, b]) => { const pa = proj(a), pb = proj(b); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); }); ctx.stroke(); ctx.setLineDash([]);
      function proj([x, y, z]) { x -= 500; const X = x * cy + z * sy, Z0 = -x * sy + z * cy, Y = y * cp - Z0 * sp, Z = y * sp + Z0 * cp; const k = f / (f + Z * s); return [ox + X * s * k, oy + Y * s * k]; }
      for (const [a, b, w] of M.E) { const A = P[a], B = P[b], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2; const depth = clamp01(1 - ((A[2] + B[2]) / 2 + 600) / 1600) * .5 + .5;
        let al = (.1 + w * .1) * depth * textFade(mx); if (pt.on > .01 && !this.low) { const dd = Math.hypot(mx - pt.x, my - pt.y); if (dd < 190) al += (1 - dd / 190) * .45 * pt.on; }
        ctx.strokeStyle = `rgba(${INK},${Math.min(.85, al)})`; ctx.lineWidth = w > 1.1 ? 1.2 : 1; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); }
      if (pt.on > .01 && !this.low) P.forEach(p => { const dd = Math.hypot(p[0] - pt.x, p[1] - pt.y); if (dd < 130) { const a = (1 - dd / 130) * pt.on; ctx.fillStyle = `rgba(${INK},${a * .9})`; ctx.fillRect(p[0] - 2.5, p[1] - 2.5, 5, 5); } });
      const st = P[M.stress]; ctx.fillStyle = ACC; const ps = 4 + (reduce ? 0 : Math.sin(t * 1.4) * .8); ctx.fillRect(st[0] - ps / 2, st[1] - ps / 2, ps, ps);
      if (!reduce) { const cyc = 9, u = (t % cyc) / 2.2, path = M.paths[Math.floor(t / cyc) % M.paths.length]; if (u < 1.6) { const n = path.length - 1, end = Math.min(n, u * n), a = u > 1 ? 1 - (u - 1) / .6 : 1;
          ctx.strokeStyle = `rgba(255,75,35,${.8 * a})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(P[path[0]][0], P[path[0]][1]);
          for (let i = 1; i <= Math.floor(end); i++) ctx.lineTo(P[path[i]][0], P[path[i]][1]);
          const fr = end % 1, i0 = Math.floor(end); if (fr && i0 < n) ctx.lineTo(P[path[i0]][0] + (P[path[i0 + 1]][0] - P[path[i0]][0]) * fr, P[path[i0]][1] + (P[path[i0 + 1]][1] - P[path[i0]][1]) * fr); ctx.stroke(); ctx.lineWidth = 1; } }
    }
  }
  const clamp01 = v => Math.max(0, Math.min(1, v));
  if (!customElements.get("rd-structure")) customElements.define("rd-structure", RDStructure);
})();
