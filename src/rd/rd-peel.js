// COPIED by scripts/dc-to-jsx.mjs from project/rd-peel.js.
// <rd-peel>: the favicon note, stuck on the footer. Drag the curled corner to peel it; what's
// underneath is a small thank-you, Instagram and a code. Set the three values below.
(function () {
  const CONFIG = {
    instagram: "",            // handle without @, e.g. "rawdraft.studio". Empty hides the line.
    code: "PEELED",
    offer: "Mention it when you book. Something nice happens."
  };

  const W = 184, REST = 26, HOVER = 48;
  const css = `
    :host { display:block; width:${W}px; height:${W}px; position:relative; touch-action:none; user-select:none; -webkit-user-select:none }
    .under { position:absolute; inset:0; background:#ece9e0; color:#0b0b0a; padding:14px 14px 12px; box-sizing:border-box; display:flex; flex-direction:column; gap:6px; font:400 13px/1.35 Satoshi, system-ui, sans-serif; border-radius:3px; visibility:hidden }
    :host([peeling]) .under, :host([peeled]) .under { visibility:visible }
    .under b { font:500 18px/1 'Clash Display', Satoshi, sans-serif; letter-spacing:-.02em }
    .under a { color:#0b0b0a; text-decoration:none; border-bottom:1px solid #ff4b23; align-self:flex-start }
    .code { margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:8px; border:1px dashed #0b0b0a; padding:6px 8px; font:600 14px/1 ui-monospace, Menlo, monospace; letter-spacing:.08em }
    .code button, .again { background:#0b0b0a; color:#ece9e0; border:0; padding:5px 8px; font:500 11px/1 Satoshi, system-ui, sans-serif; letter-spacing:0; cursor:pointer }
    .again { position:absolute; right:-2px; bottom:-30px; background:none; color:#8f8b80; padding:6px 0 }
    .again:hover { color:#ece9e0 }
    .note { position:absolute; inset:0; cursor:grab; outline:none }
    .note:focus-visible { outline:2px solid #ff4b23; outline-offset:4px }
    :host([peeled]) .note { pointer-events:none }
    .front, .flap { position:absolute; left:0; top:0; width:${W}px; height:${W}px }
    .flapwrap { position:absolute; inset:0; filter:drop-shadow(-6px -4px 8px rgba(0,0,0,.45)); pointer-events:none }
    .flap { transform-origin:0 0 }
    .gone { transition:transform .5s cubic-bezier(.5,0,.75,0), opacity .5s; transform:translate(40px,-160px) rotate(24deg); opacity:0 }
    .hint { position:absolute; right:-4px; bottom:-26px; font:400 11px/1 Satoshi, system-ui, sans-serif; color:#5a5850; opacity:0; transition:opacity .3s }
    :host(:hover) .hint { opacity:1 }
    :host([peeled]) .hint, :host([peeling]) .hint { display:none }
  `;
  const svgFront = `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a39"/><stop offset="1" stop-color="#262625"/></linearGradient></defs><rect width="${W}" height="${W}" rx="3" fill="url(#g)"/><circle cx="${W / 2}" cy="${W / 2}" r="${W * 0.155}" fill="#ff3b24"/></svg>`;
  const svgBack = `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" aria-hidden="true"><defs><linearGradient id="b" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6a6964"/><stop offset=".55" stop-color="#4a4946"/><stop offset="1" stop-color="#3a3936"/></linearGradient></defs><rect width="${W}" height="${W}" rx="3" fill="url(#b)"/></svg>`;

  const poly = pts => "polygon(" + pts.map(([x, y]) => x + "px " + y + "px").join(",") + ")";
  // Fold line x + y = c. The front keeps x + y <= c; the flap is the rest, mirrored across the line.
  const frontPts = c => c >= W ? [[0, 0], [W, 0], [W, c - W], [c - W, W], [0, W]] : [[0, 0], [c, 0], [0, c]];
  const flapPts = c => c >= W ? [[W, c - W], [W, W], [c - W, W]] : [[c, 0], [W, 0], [W, W], [0, W], [0, c]];

  class RDPeel extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const root = this.attachShadow({ mode: "open" });
      const ig = CONFIG.instagram ? `<a href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener">@${CONFIG.instagram} on Instagram</a>` : "";
      root.innerHTML = `<style>${css}</style>
        <div class="under" aria-live="polite"><b>You looked under it.</b><span>Most people never peel the note. That's most of the job, really.</span>${ig}
          <div class="code"><span>${CONFIG.code}</span><button type="button" class="copy">Copy</button></div>
          <span style="font-size:11px;color:#5a5850">${CONFIG.offer}</span></div>
        <div class="note" role="button" tabindex="0" aria-label="A sticky note. Peel it off (Enter)">
          <div class="front">${svgFront}</div><div class="flapwrap"><div class="flap">${svgBack}</div></div>
        </div>
        <span class="hint">peel me</span>`;
      this.note = root.querySelector(".note"); this.front = root.querySelector(".front"); this.flap = root.querySelector(".flap");
      this.reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.c = 2 * W - REST; this.draw();
      const local = e => { const r = this.getBoundingClientRect(), s = r.width / W; return [(e.clientX - r.left) / s, (e.clientY - r.top) / s]; };
      this.note.addEventListener("pointerenter", () => { if (!this.drag) this.anim(2 * W - HOVER); });
      this.note.addEventListener("pointerleave", () => { if (!this.drag) this.anim(2 * W - REST); });
      this.note.addEventListener("pointerdown", e => { this.drag = true; this.note.setPointerCapture(e.pointerId); this.note.style.cursor = "grabbing"; this.setAttribute("peeling", ""); });
      this.note.addEventListener("pointermove", e => { if (!this.drag) return; const [x, y] = local(e); this.set(Math.max(0, Math.min(2 * W - REST, (x + y) / 2 + W))); });
      const up = () => { if (!this.drag) return; this.drag = false; this.note.style.cursor = ""; this.c < W * 0.9 ? this.peel() : this.anim(2 * W - REST, () => this.removeAttribute("peeling")); };
      this.note.addEventListener("pointerup", up); this.note.addEventListener("pointercancel", up);
      this.note.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.setAttribute("peeling", ""); this.anim(W * 0.5, () => this.peel()); } });
      root.querySelector(".copy").addEventListener("click", e => { try { navigator.clipboard.writeText(CONFIG.code); } catch (x) {} e.target.textContent = "Copied"; setTimeout(() => (e.target.textContent = "Copy"), 1400); });
    }
    set(c) { this.c = c; this.draw(); }
    draw() {
      const c = this.c;
      this.front.style.clipPath = poly(frontPts(c));
      this.flap.style.clipPath = poly(flapPts(c));
      this.flap.style.transform = `matrix(0,-1,-1,0,${c},${c})`;
    }
    anim(to, done) {
      cancelAnimationFrame(this.raf);
      if (this.reduce) { this.set(to); done && done(); return; }
      const from = this.c, t0 = performance.now(), dur = 260;
      const step = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); this.set(from + (to - from) * e); k < 1 ? (this.raf = requestAnimationFrame(step)) : done && done(); };
      this.raf = requestAnimationFrame(step);
    }
    peel() {
      this.setAttribute("peeled", ""); this.removeAttribute("peeling");
      this.note.classList.add("gone");
      const again = document.createElement("button"); again.className = "again"; again.type = "button"; again.textContent = "Stick it back";
      again.addEventListener("click", () => { again.remove(); this.note.classList.remove("gone"); this.removeAttribute("peeled"); this.set(2 * W - REST); this.note.focus(); });
      this.shadowRoot.appendChild(again);
      this.shadowRoot.querySelector(".copy").focus({ preventScroll: true });
    }
  }
  if (!customElements.get("rd-peel")) customElements.define("rd-peel", RDPeel);
})();
