// <rd-uptime since="2026-10-05T00:00:00+05:30">: time since the public beta went live, ticking every second.
// Updates its own text so the page around it never re-renders.
(function () {
  const pad = n => String(n).padStart(2, "0");
  class RDUptime extends HTMLElement {
    connectedCallback() {
      const tick = () => {
        const s = Math.max(0, Math.floor((Date.now() - Date.parse(this.getAttribute("since"))) / 1000));
        const d = Math.floor(s / 86400), h = Math.floor(s / 3600) % 24, m = Math.floor(s / 60) % 60;
        this.textContent = d + "d " + pad(h) + ":" + pad(m) + ":" + pad(s % 60);
      };
      tick();
      this.iv = setInterval(tick, 1000);
    }
    disconnectedCallback() { clearInterval(this.iv); }
  }
  if (!customElements.get("rd-uptime")) customElements.define("rd-uptime", RDUptime);
})();
