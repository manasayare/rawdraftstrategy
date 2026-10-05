// COPIED by scripts/dc-to-jsx.mjs from project/rd-ascii.js.
// <rd-ascii shape="sphere|torus|rings|wave|scatter|cube" seed="n"> Animated ASCII render on canvas. Pauses off-screen; static on reduced motion.
(function () {
  const RAMP = " .'`^,:;-~=+*ic/|(lI1tfjrxnuvzXYUJCLQ0OZmwqpdbkhao#MW&8%B@";
  const DRIFT = "'`,._-\"";
  const SHAPES = ["sphere", "torus", "rings", "wave", "scatter", "cube"];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let s = seed || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  class RDAscii extends HTMLElement {
    connectedCallback() {
      if (!this.cv) { this.cv = document.createElement("canvas"); this.cv.style.cssText = "position:absolute;inset:0;display:block;width:100%;height:100%"; this.appendChild(this.cv); this.ctx = this.cv.getContext("2d"); }
      if (!this.style.display) this.style.display = "block";

      this.setup();
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this);
      this.io = new IntersectionObserver(es => { this.vis = es.some(e => e.isIntersecting); if (this.vis && !reduce) this.loop(); }, { rootMargin: "100px" }); this.io.observe(this);
      this.resize();
    }
    disconnectedCallback() { this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); cancelAnimationFrame(this.raf); this.raf = 0; }
    static get observedAttributes() { return ["shape", "seed", "cell"]; }
    attributeChangedCallback() { if (this.ctx) { this.setup(); this.W = 0; this.resize(); } }
    setup() {
      this.shape = this.getAttribute("shape") || "sphere";
      this.seed = parseInt(this.getAttribute("seed") || "1", 10) || 1;
      const r = rng(this.seed * 7919);
      this.phase = r() * 10; this.speed = 0.6 + r() * 0.5;
      this.drift = Array.from({ length: 16 }, (_, i) => ({ x: r(), y: r(), v: 0.01 + r() * 0.03, c: DRIFT[(r() * DRIFT.length) | 0], hot: i === 0 }));
    }
    resize() {
      if (getComputedStyle(this).position === "static") { this.style.position = "relative"; this.style.overflow = "hidden"; }
      const w = this.clientWidth, h = this.clientHeight; if (!w || !h) return;
      if (w === this.W && h === this.H && this.buf) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = parseFloat(this.getAttribute("cell") || "0") || Math.max(7, Math.min(12, w / 34));
      this.cw = cell * 0.62; this.ch = cell * 1.05; this.fs = cell;
      this.cols = Math.ceil(w / this.cw); this.rows = Math.ceil(h / this.ch); this.W = w; this.H = h;
      this.buf = new Float32Array(this.cols * this.rows); this.zb = new Float32Array(this.cols * this.rows);
      this.draw(reduce ? this.phase : (performance.now() / 1000) * this.speed + this.phase);
    }
    loop() {
      if (this.raf) return;
      let last = 0;
      const tick = now => {
        if (!this.vis || !this.isConnected) { this.raf = 0; return; }
        this.raf = requestAnimationFrame(tick);
        if (now - last < 60) return; last = now;
        this.draw((now / 1000) * this.speed + this.phase);
      };
      this.raf = requestAnimationFrame(tick);
    }
    field(t) {
      const { cols, rows, cw, ch, W, H, buf, zb } = this; buf.fill(0); zb.fill(0);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.4;
      const put = (px, py, z, b) => { const c = (px / cw) | 0, r = (py / ch) | 0; if (c < 0 || r < 0 || c >= cols || r >= rows) return; const k = r * cols + c; if (z >= zb[k]) { zb[k] = z; buf[k] = Math.max(buf[k], b); } };
      const s = this.shape;
      if (s === "sphere") {
        const L = [-0.55, -0.6, 0.58], ca = Math.cos(t * 0.5), sa = Math.sin(t * 0.5);
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const dx = ((c + .5) * cw - cx) / R, dy = ((r + .5) * ch - cy) / R, d2 = dx * dx + dy * dy;
          if (d2 >= 1) continue;
          const z = Math.sqrt(1 - d2), nx = dx * ca - z * sa, nz = dx * sa + z * ca;
          const lon = Math.atan2(nx, nz), lat = Math.asin(dy);
          const tex = 0.5 + 0.5 * Math.sin(lon * 7 + Math.sin(lat * 6) * 1.5) * Math.cos(lat * 9 + t * 0.3);
          const diff = Math.max(0, dx * L[0] + dy * L[1] + z * L[2]);
          buf[r * cols + c] = 0.08 + 0.92 * diff * (0.62 + 0.38 * tex);
        }
      } else if (s === "torus") {
        const A = t * 0.7, B = t * 0.35, cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B), K = R * 0.62;
        for (let th = 0; th < 6.283; th += 0.17) { const ct = Math.cos(th), st = Math.sin(th);
          for (let ph = 0; ph < 6.283; ph += 0.05) { const cp = Math.cos(ph), sp = Math.sin(ph);
            const h2 = ct + 2, D = 1 / (sp * h2 * sA + st * cA + 5), tt = sp * h2 * cA - st * sA;
            const x = cx + K * 2.2 * D * (cp * h2 * cB - tt * sB), y = cy + K * 2.2 * D * (cp * h2 * sB + tt * cB);
            const Ln = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
            if (Ln > 0) put(x, y, D, Math.min(1, Ln * 0.75 + 0.1)); } }
      } else if (s === "rings") {
        for (let k = 0; k < 4; k++) { const rr = R * (0.3 + k * 0.23), n = 26 + k * 18, w = (k % 2 ? -1 : 1) * (0.5 - k * 0.08);
          for (let i = 0; i < n; i++) { const a = i / n * 6.283 + t * w; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.62; put(x, y, 1, 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(a + t))); } }
        put(cx, cy, 2, 1);
      } else if (s === "wave") {
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const x = c / cols, y = r / rows;
          const h = Math.sin(x * 9 + t * 1.3 + Math.sin(y * 5 - t) * 1.6) * 0.5 + Math.sin(x * 4 - t * 0.7) * 0.3;
          const band = Math.abs(((y * 7 + h) % 1 + 1) % 1 - 0.5);
          buf[r * cols + c] = band < 0.09 ? (1 - band / 0.09) * (0.35 + 0.65 * y) : 0;
        }
      } else if (s === "scatter") {
        const rr = rng(this.seed), br = 0.55 + 0.45 * Math.sin(t * 0.6), ca = Math.cos(t * 0.4), sa = Math.sin(t * 0.4);
        for (let i = 0; i < 380; i++) { const u = rr() * 2 - 1, a = rr() * 6.283, rad = Math.cbrt(rr()) * (0.35 + 0.65 * br);
          let x = Math.sqrt(1 - u * u) * Math.cos(a) * rad, y = u * rad, z = Math.sqrt(1 - u * u) * Math.sin(a) * rad;
          const xr = x * ca - z * sa, zr = x * sa + z * ca; put(cx + xr * R * 1.25, cy + y * R, zr + 2, 0.25 + 0.75 * (zr + 1) / 2); }
      } else {
        const ax = t * 0.6, ay = t * 0.8, V = [];
        for (let i = 0; i < 8; i++) V.push([(i & 1) * 2 - 1, (i & 2) - 1, (i & 4) / 2 - 1]);
        const E = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
        const P = V.map(([x, y, z]) => { let y1 = y * Math.cos(ax) - z * Math.sin(ax), z1 = y * Math.sin(ax) + z * Math.cos(ax); let x2 = x * Math.cos(ay) + z1 * Math.sin(ay), z2 = -x * Math.sin(ay) + z1 * Math.cos(ay); const f = 3 / (z2 + 4.2); return [cx + x2 * R * 0.75 * f, cy + y1 * R * 0.75 * f, z2]; });
        E.forEach(([a, b]) => { for (let u = 0; u <= 1; u += 0.025) { const x = P[a][0] + (P[b][0] - P[a][0]) * u, y = P[a][1] + (P[b][1] - P[a][1]) * u, z = P[a][2] + (P[b][2] - P[a][2]) * u; put(x, y, 3 - z, 0.4 + 0.6 * (1 - (z + 1.7) / 3.4)); } });
      }
    }
    draw(t) {
      if (!this.buf) return;
      const { ctx, cols, rows, cw, ch, W, H, buf } = this;
      this.field(t);
      ctx.clearRect(0, 0, W, H);
      ctx.font = this.fs + "px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"; ctx.textBaseline = "top";
      const n = RAMP.length - 1;
      for (let lvl = 0; lvl < 5; lvl++) {
        ctx.fillStyle = "rgba(236,233,224," + (0.22 + lvl * 0.19).toFixed(2) + ")";
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const b = buf[r * cols + c]; if (b < 0.03) continue; if (Math.min(4, (b * 5) | 0) !== lvl) continue; ctx.fillText(RAMP[Math.max(1, Math.round(b * n))], c * cw, r * ch); }
      }
      this.drift.forEach(p => {
        const y = ((p.y + (reduce ? 0 : t * p.v)) % 1) * H, x = p.x * W;
        ctx.fillStyle = p.hot ? "rgba(255,75,35,.9)" : "rgba(236,233,224,.35)";
        ctx.fillText(p.hot ? "*" : p.c, x, y);
      });
    }
  }
  if (!customElements.get("rd-ascii")) customElements.define("rd-ascii", RDAscii);
  window.RDAscii = { shapes: SHAPES, shapeFor: id => SHAPES[hash(String(id)) % SHAPES.length], seedFor: id => (hash(String(id) + "s") % 97) + 1 };
})();
