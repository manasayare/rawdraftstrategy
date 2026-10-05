// COPIED by scripts/dc-to-jsx.mjs from project/rd-cycle-scroll.js.
// <rd-cycle-scroll>: the cycle of creation, driven by scroll. The section is tall; its inner panel
// sticks under the header while the animation moves from Creation to Cadence as you scroll through it.
// One stage name and one line at a time. Self-contained so scrolling never re-renders the page.
(function () {
  const STAGES = [
    ["Creation", "निर्माण", "Possibility acquires form."],
    ["Chaos", "अराजकता", "The idea meets reality."],
    ["Clarity", "स्पष्टता", "Structure begins to hold."],
    ["Cadence", "प्रवाह", "The system learns to run."]
  ];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CLASH = "'Clash Display',sans-serif";

  class RDCycleScroll extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.style.display = "block";
      this.style.position = "relative";
      this.innerHTML = `
<div data-pin style="position:sticky;top:60px;display:grid;align-items:center;gap:24px clamp(24px,4vw,64px)">
  <div data-canvas style="width:100%;min-width:0;border-top:1px solid #2a2925;border-bottom:1px solid #2a2925"></div>
  <div aria-live="polite" data-text style="min-width:0;transition:opacity .35s ease">
    <div data-n style="font-size:15px;color:#8f8b80"></div>
    <div data-title style="margin-top:8px;font-family:${CLASH};font-weight:500;font-size:clamp(56px,6.4vw,104px);letter-spacing:-.04em;line-height:.95;color:#ece9e0"></div>
    <div data-dev lang="hi" style="margin-top:10px;font-family:'Tiro Devanagari Hindi','Noto Serif Devanagari',serif;font-size:clamp(22px,2vw,30px);line-height:1.2;color:#8f8b80"></div>
    <p data-line style="margin:clamp(14px,2vw,24px) 0 0;font-family:${CLASH};font-weight:500;font-size:clamp(22px,2.2vw,32px);letter-spacing:-.015em;line-height:1.15;max-width:22ch;color:#ece9e0"></p>
  </div>
  <div aria-hidden="true" style="grid-column:1/-1;height:2px;background:#2a2925"><div data-bar style="height:100%;width:0;background:#ff4b23"></div></div>
</div>`;
      this.pin = this.querySelector("[data-pin]");
      this.cv = this.querySelector("[data-canvas]");
      this.text = this.querySelector("[data-text]");
      this.bar = this.querySelector("[data-bar]");
      this.stage = -1;
      this.layout();
      this.show(0, true);
      const start = () => {
        if (!this.isConnected) return;
        if (!window.RDCycle) return setTimeout(start, 50);
        this.eng = RDCycle.mount(this.cv, { driven: !reduce, onStage: i => this.show(i) });
        this.onScroll();
      };
      start();
      this.onScroll = this.onScroll.bind(this);
      this.onResize = () => { this.layout(); this.onScroll(); };
      window.addEventListener("scroll", this.onScroll, { passive: true });
      window.addEventListener("resize", this.onResize);
    }
    disconnectedCallback() {
      window.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.onResize);
      this.eng && this.eng.destroy();
      this.eng = null;
      this.ready = false;
    }
    layout() {
      const wide = window.innerWidth >= 900, vh = window.innerHeight - 60;
      this.style.height = reduce ? "auto" : `calc(${vh}px * 3.2)`;
      this.pin.style.position = reduce ? "relative" : "sticky";
      this.pin.style.height = reduce ? "auto" : vh + "px";
      this.pin.style.gridTemplateColumns = wide ? "minmax(0,7fr) minmax(0,4fr)" : "minmax(0,1fr)";
      this.pin.style.alignContent = "center";
      this.cv.style.height = wide ? `min(620px,${Math.round(vh * .72)}px)` : `${Math.round(vh * .48)}px`;
    }
    onScroll() {
      if (reduce) return;
      const r = this.getBoundingClientRect(), span = r.height - this.pin.offsetHeight;
      const f = span > 0 ? Math.min(1, Math.max(0, (60 - r.top) / span)) : 0;
      this.bar.style.width = (f * 100).toFixed(1) + "%";
      this.eng && this.eng.setProgress && this.eng.setProgress(f);
    }
    show(i, now) {
      if (i < 0) i = 0;
      if (i === this.stage) return;
      this.stage = i;
      const s = STAGES[i], set = () => {
        this.querySelector("[data-n]").textContent = "0" + (i + 1) + " / 04";
        this.querySelector("[data-title]").textContent = s[0];
        this.querySelector("[data-dev]").textContent = s[1];
        this.querySelector("[data-line]").textContent = s[2];
        this.text.style.opacity = 1;
      };
      if (now) return set();
      this.text.style.opacity = 0;
      clearTimeout(this.ft);
      this.ft = setTimeout(set, 200);
    }
  }
  if (!customElements.get("rd-cycle-scroll")) customElements.define("rd-cycle-scroll", RDCycleScroll);
})();
