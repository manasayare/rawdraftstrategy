// Builder state and every action that changes it. Plain TypeScript with a subscribe/get pair for
// useSyncExternalStore, so behaviour can be reasoned about (and tested) without React.
import { BIG_GROUPS, BLANK_NOTICE } from "./constants";
import { RDB, RDL, enginesReady, type Template } from "./engine";
import { available, selectionProposal, workshopProposal, type SelCmd } from "./commands";
import { agendaDoc, copyText } from "./exportDoc";
import { applyChanges, clone, eng, expand, isLiveBlock, mins, mkStruct, norm, tplItems, uid } from "./items";
import { layout } from "./layout";
import { loadWorkspace, saveWorkspace } from "./storage";
import { parseStart } from "./time";
import {
  BLANK_FILTERS, type Brief, type Center, type DragPayload, type Drop, type Item, type LibFilters, type NoteEntry, type NoteType,
  type Phase, type Proposal, type RunState, type Sheet, type View, type Workshop
} from "./types";

export type State = {
  ready: boolean;
  /** Viewport width; the layout switches at 1100px. */
  w: number;
  reducedMotion: boolean;
  phase: Phase;
  workshops: Workshop[];
  wid: string | null;
  // The open workshop
  items: Item[];
  brief: Brief;
  name: string;
  start: string;
  view: View;
  hist: Item[][];
  // Canvas
  open: string | null;
  sel: string[];
  drag: (DragPayload & { w: number }) | null;
  drop: Drop | null;
  proposal: Proposal | null;
  stress: boolean;
  notice: string;
  /** Screen-reader announcement. */
  live: string;
  center: Center;
  sheet: Sheet;
  // Library panel
  lib: LibFilters;
  filters: boolean;
  libPrev: string | null;
  libN: number;
  suggestFor: { id: string; dir: "before" | "after" } | null;
  pendingAdd: string | null;
  // Side panel
  alts: string | null;
  ctx: boolean;
  cmp: string;
  copied: boolean;
  prompted: string | null;
  exporting: "pdf" | "docx" | null;
  sharing: boolean;
  shareMsg: string;
  // Run mode
  run: RunState | null;
  runType: NoteType;
  runDraft: string;
  tick: number;
};

type Patch = Partial<State> | ((s: State) => Partial<State>);
export const WIDE = 1100;
const sig = (s: Pick<State, "items" | "name" | "brief" | "start">) => JSON.stringify([s.items, s.name, s.brief, s.start]);

type Bridge = { pdf(doc: unknown): Promise<void>; docx(doc: unknown): Promise<void>; share(w: unknown, prev?: unknown): Promise<{ id: string; key: string; url: string }>; load(id: string): Promise<Partial<Workshop>> };
const bridge = () => (window as unknown as { RDX?: Bridge }).RDX;

export class BuilderStore {
  state: State;
  private listeners = new Set<() => void>();
  private sigs: Record<string, string> = {};
  private stamps: Record<string, number> = {};
  private saveQueued = false;
  private handled = { add: "", q: "", tpl: "", w: "" };
  /** Set for a moment after a drag or resize so the click that ends it is ignored. */
  justDragged = false;
  private press: { x: number; y: number; ox: number; oy: number; w: number; payload: DragPayload; started: boolean } | null = null;
  ghost: HTMLElement | null = null;
  private runTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    const ws = loadWorkspace(), cur = ws.current ? ws.workshops.find(w => w.id === ws.current) : undefined;
    this.state = {
      ready: enginesReady(), w: window.innerWidth, reducedMotion: !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
      phase: cur ? "bench" : "home", workshops: ws.workshops, wid: cur ? cur.id : null,
      items: cur?.items || [], brief: cur?.brief || {}, name: cur ? cur.name : "Untitled workshop", start: cur?.start || "09:30", view: cur?.view || "timeline", hist: [],
      open: null, sel: [], drag: null, drop: null, proposal: null, stress: false, notice: "", live: "", center: "canvas", sheet: null,
      lib: { ...BLANK_FILTERS }, filters: false, libPrev: null, libN: 24, suggestFor: null, pendingAdd: null,
      alts: null, ctx: false, cmp: "90", copied: false, prompted: null, exporting: null, sharing: false, shareMsg: "",
      run: null, runType: "decision", runDraft: "", tick: 0
    };
  }

  // ---- store plumbing ----
  get = () => this.state;
  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => this.listeners.delete(fn); };
  set = (p: Patch) => {
    const patch = typeof p === "function" ? p(this.state) : p;
    this.state = { ...this.state, ...patch };
    this.listeners.forEach(l => l());
    if (!this.saveQueued) { this.saveQueued = true; queueMicrotask(() => { this.saveQueued = false; this.persist(); }); }
  };
  get wide() { return this.state.w >= WIDE; }

  /** Current workshop merged back into the list, with "updated" bumped only when its content changed. */
  workshopList(s: State = this.state): Workshop[] {
    return s.workshops.map(w => (w.id === s.wid ? { ...w, items: s.items, brief: s.brief, name: s.name, start: s.start, view: s.view, updated: this.stamps[w.id] || w.updated } : w));
  }
  private persist() {
    const s = this.state;
    if (s.wid) {
      const g = sig(s);
      if (this.sigs[s.wid] !== g) { if (this.sigs[s.wid] != null) this.stamps[s.wid] = Date.now(); this.sigs[s.wid] = g; }
    }
    saveWorkspace({ workshops: this.workshopList(), current: s.wid });
  }

  // ---- lifecycle ----
  mount(props: BuilderProps) {
    const onResize = () => this.set({ w: window.innerWidth });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (this.press?.started) this.endDrag(true);
      else this.set({ open: null, alts: null, sel: [], sheet: null });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    let poll: ReturnType<typeof setInterval> | null = null;
    const go = () => { this.set({ ready: true }); this.syncProps(props); this.firstVisit(props); };
    if (this.state.ready) go();
    else poll = setInterval(() => { if (enginesReady()) { clearInterval(poll!); go(); } }, 40);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      if (poll) clearInterval(poll);
      this.unbindPointer();
      this.runStop();
    };
  }

  /** With nothing saved yet, open a blank canvas with the template picker showing. */
  private firstVisit(props: BuilderProps) {
    setTimeout(() => { if (!props.w && this.state.phase === "home" && !this.state.workshops.length) this.newWorkshop({}, { center: "tpl" }); }, 0);
  }

  /** Reacts to ?add=, ?q=, ?tpl= and ?w= once each, then cleans the URL. */
  syncProps(p: BuilderProps) {
    if (!this.state.ready) return;
    const clean = () => (window as unknown as { RDNav?: { replace(h: string): void } }).RDNav?.replace("#/builder");
    if (p.add && this.handled.add !== p.add) { this.handled.add = p.add; this.addFromLibrary(p.add); }
    if (p.q && this.handled.q !== p.q) {
      this.handled.q = p.q; clean();
      if (this.state.phase !== "bench") {
        const ws = this.state.workshops;
        if (ws.length) this.openWorkshop((ws.find(w => w.id === this.state.wid) || ws[ws.length - 1]).id);
        else this.newWorkshop({});
      }
      this.set(s => ({ lib: { ...s.lib, q: p.q! }, libN: 24 }));
    }
    if (p.tpl && this.handled.tpl !== p.tpl) { this.handled.tpl = p.tpl; clean(); const t = RDB().TPL[+p.tpl]; if (t) this.openTemplate(t); }
    if (p.w && this.handled.w !== p.w) { this.handled.w = p.w; clean(); this.openShared(p.w); }
  }

  // ---- workshops ----
  newWorkshop(o: Partial<Workshop>, extra: Partial<State> = {}) {
    const id = "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const w: Workshop = { id, name: "Untitled workshop", items: [], brief: {}, chat: [], start: "09:30", view: "timeline", created: Date.now(), updated: Date.now(), ...o };
    this.set(s => ({
      workshops: this.workshopList(s).concat([w]), wid: id, items: norm(w.items), brief: w.brief, name: w.name, start: w.start, view: w.view, hist: [],
      phase: "bench", center: "canvas", open: null, sel: [], proposal: null, stress: false, ...extra
    }));
  }
  openWorkshop(id: string) {
    this.set(s => {
      const list = this.workshopList(s), w = list.find(x => x.id === id);
      if (!w) return {};
      return { workshops: list, wid: id, items: w.items || [], brief: w.brief || {}, name: w.name, start: w.start || "09:30", view: w.view || "timeline", hist: [], phase: "bench", center: "canvas", open: null, sel: [], proposal: null, notice: "" };
    });
  }
  goHome() { this.set(s => ({ workshops: this.workshopList(s), phase: "home", open: null, sel: [], proposal: null, sheet: null })); }
  openTemplate(t: Template) {
    this.newWorkshop({ name: t.name, items: tplItems(t), brief: { ...(t.brief as Brief) } }, { notice: t.name + " opened as an editable copy. Change anything." });
  }
  blankWorkshop() { this.newWorkshop({}, { notice: BLANK_NOTICE }); }
  currentWorkshop() { return this.state.workshops.find(x => x.id === this.state.wid); }

  // ---- sharing ----
  /** A share link opens the sender's workshop as a copy you own. Your own link reopens your workshop. */
  openShared(id: string) {
    const mine = this.state.workshops.find(w => w.share?.id === id);
    if (mine) { this.openWorkshop(mine.id); return; }
    this.set({ notice: "Opening shared workshop…" });
    const B = bridge();
    (B ? B.load(id) : Promise.reject(new Error("Couldn't open the shared workshop.")))
      .then(w => this.newWorkshop(
        { name: String(w.name || "Shared workshop"), items: Array.isArray(w.items) ? w.items : [], brief: w.brief && typeof w.brief === "object" ? w.brief : {}, start: w.start || "09:30", view: w.view || "timeline", from: id },
        { notice: "Shared workshop opened as your own copy. Changes stay with you." }
      ))
      .catch((e: Error) => {
        this.set({ notice: e.message });
        if (this.state.phase === "home" && !this.state.workshops.length) this.newWorkshop({}, { center: "tpl" });
      });
  }
  shareLink() {
    const s = this.state;
    if (s.sharing || !s.wid) return;
    const w = this.currentWorkshop();
    // Run notes stay in this browser.
    const items = s.items.map(x => (x.cfg?.log ? { ...x, cfg: { ...x.cfg, log: undefined } } : x));
    this.set({ sharing: true, shareMsg: "" });
    const B = bridge();
    (B ? B.share({ name: s.name, start: s.start, view: s.view, brief: s.brief, items }, w?.share) : Promise.reject(new Error("Sharing isn't available.")))
      .then(r => {
        copyText(r.url);
        this.set(st => ({ sharing: false, shareMsg: "Link saved and copied. Anyone with it gets their own copy.", workshops: this.workshopList(st).map(x => (x.id === st.wid ? { ...x, share: { id: r.id, key: r.key }, sharedSig: sig(st) } : x)) }));
      })
      .catch((e: Error) => this.set({ sharing: false, shareMsg: e.message }));
  }
  shareState() {
    const s = this.state, w = this.currentWorkshop();
    return { shared: !!w?.share, upToDate: !!w?.share && w.sharedSig === sig(s), url: w?.share ? location.origin + "/builder?w=" + w.share.id : "" };
  }

  // ---- editing ----
  /** Every structural edit goes through here: snapshot for undo, normalise, clear the stress result. */
  commit(fn: (items: Item[]) => Item[], msg?: string, extra: Partial<State> = {}) {
    this.set(s => ({ hist: s.hist.concat([s.items]).slice(-40), items: norm(fn(clone(s.items))), stress: false, live: msg || "", ...extra }));
  }
  undo() { this.set(s => (s.hist.length ? { items: s.hist[s.hist.length - 1], hist: s.hist.slice(0, -1), proposal: null, live: "Undone" } : {})); }
  edit(id: string, patch: Partial<Item>) { this.set(s => ({ items: s.items.map(x => (x.id === id ? { ...x, ...patch } : x)), stress: false })); }
  setCfg(id: string, k: string, v: unknown) { this.set(s => ({ items: s.items.map(x => (x.id === id ? { ...x, cfg: { ...x.cfg, [k]: v } } : x)) })); }
  moveBy(id: string, dir: number) {
    const title = this.state.items.find(x => x.id === id)?.title || "section";
    this.commit(items => {
      const i = items.findIndex(x => x.id === id), j = i + dir;
      if (i < 0 || j < 0 || j >= items.length || items[j].zone !== items[i].zone) return items;
      [items[i], items[j]] = [items[j], items[i]];
      const m = items[j], a = items[j - 1], b = items[j + 1];
      if (m.par && !(a?.par === m.par || b?.par === m.par)) m.par = null;
      return items;
    }, "Moved " + title + (dir < 0 ? " earlier" : " later"));
  }
  remove(id: string, msg: string, extra: Partial<State> = {}) { this.commit(its => its.filter(y => y.id !== id), msg, extra); }
  insertItems(add: Item[], at: number | null, msg: string) {
    this.commit(items => { const pos = at == null ? items.filter(x => x.zone !== "after").length : at; items.splice(pos, 0, ...add); return items; }, msg);
  }
  /** Adds after the selection when there is one, otherwise at the end of the live workshop. */
  addEnd(add: Item[], label: string) {
    const s = this.state;
    let at: number | null = null;
    if (s.sel.length) {
      const last = Math.max(...s.sel.map(id => s.items.findIndex(x => x.id === id)));
      if (last >= 0) { at = last + 1; add.forEach(a => (a.zone = s.items[last].zone)); }
    }
    this.insertItems(add, at, label + " added");
    this.set({ notice: label + " added " + (at == null ? "at the end of the live workshop." : "after the selected block.") + " Drag it anywhere." });
  }
  addFromLibrary(id: string) {
    const it = RDL().get(id);
    if (!it) return;
    const isFormat = ["workshop", "sprint", "playbook"].includes(it.type);
    if (this.state.phase !== "bench") { this.newWorkshop({ name: isFormat ? it.title : "Untitled workshop", items: expand(it) }, { notice: "Added " + it.title + ". Drag more from the Library." }); return; }
    if (!this.state.items.some(x => x.kind === "block")) {
      this.commit(() => expand(it), "Added " + it.title, { name: it.type === "workshop" || it.type === "sprint" ? it.title : this.state.name, notice: "Added " + it.title + ". Drag more from the Library." });
    } else this.set({ pendingAdd: id });
  }
  setBrief(k: keyof Brief, v: unknown) { this.set(s => ({ brief: { ...s.brief, [k]: v } })); }
  /** Changing context offers a matching proposal: time → fit, a big group → adapt, remote → adapt. */
  onContext(k: keyof Brief, val: string) {
    const s = this.state, was = s.brief[k] as string | undefined, big = (v?: string) => BIG_GROUPS.includes(v || "");
    this.setBrief(k, val);
    if (!val || val === was || !s.items.some(x => x.kind === "block")) return;
    const sub = "You changed " + (k === "owner" ? "decision owner" : k) + ": " + (was || "not set") + " → " + val;
    if (k === "time") setTimeout(() => this.propose("fit", null, sub), 0);
    else if (k === "people" && big(val) && !big(was)) setTimeout(() => this.propose("big", null, sub), 0);
    else if (k === "format" && val === "Remote") setTimeout(() => this.propose("remote", null, sub), 0);
  }

  // ---- proposals ----
  propose(cmd: string, n?: number | null, sub?: string | null, scope?: string[]) {
    const s = this.state;
    if (cmd === "stress") { this.set({ stress: true }); return; }
    const P = scope ? selectionProposal(cmd as SelCmd, s.items, s.brief, scope, n) : workshopProposal(cmd, s.items, s.brief, available(s.brief), n, sub);
    P.changes.forEach(c => (c.on = true));
    this.set({ proposal: P, open: null, sheet: this.wide ? null : "assist" });
  }
  toggleChange(ci: number) { this.set(s => ({ proposal: s.proposal && { ...s.proposal, changes: s.proposal.changes.map((y, yi) => (yi === ci ? { ...y, on: !y.on } : y)) } })); }
  acceptProposal() {
    this.set(s => {
      if (!s.proposal) return {};
      const sel = s.proposal.changes.filter(c => c.on), br = { ...s.brief } as Record<string, unknown>;
      sel.filter(c => c.type === "brief").forEach(c => (br[c.key as string] = c.val));
      return {
        hist: s.hist.concat([s.items]).slice(-40), items: applyChanges(s.items, sel.filter(c => c.type !== "brief")), brief: br as Brief, proposal: null, stress: false,
        notice: sel.length ? "Applied " + sel.length + " change" + (sel.length > 1 ? "s" : "") + ". Undo if it is not right." : "", live: "Changes applied"
      };
    });
  }

  // ---- drag and drop ----
  private onMove = (ev: PointerEvent) => this.move(ev);
  private onUp = () => this.endDrag(false);
  private onCancel = () => this.endDrag(true);
  private unbindPointer() {
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onCancel);
    if (document.body) document.body.style.userSelect = "";
  }
  beginPress(e: React.PointerEvent, payload: DragPayload) {
    if (e.button && e.button !== 0) return;
    const t = e.target as HTMLElement;
    if (t.closest?.(payload.kind === "move" ? "button,input,textarea,select,a" : "input,textarea,select,a")) return;
    // On touch, cards move only from their handle so the page can still scroll; Library cards only drag on wide screens.
    if (e.pointerType === "touch" && !t.closest?.("[data-handle]") && payload.kind === "move") return;
    if (e.pointerType === "touch" && payload.kind !== "move" && this.state.w < WIDE) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.press = { x: e.clientX, y: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, w: Math.min(320, Math.max(220, r.width)), payload, started: false };
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onCancel);
  }
  private move(ev: PointerEvent) {
    const P = this.press;
    if (!P) return;
    if (!P.started) {
      if (Math.abs(ev.clientX - P.x) + Math.abs(ev.clientY - P.y) < 6) return;
      P.started = true;
      document.body.style.userSelect = "none";
      this.set({ drag: { ...P.payload, w: P.w }, drop: null });
    }
    ev.preventDefault?.();
    const rm = this.state.reducedMotion;
    if (this.ghost) this.ghost.style.transform = "translate(" + (ev.clientX - P.ox) + "px," + (ev.clientY - P.oy) + "px) rotate(" + (rm ? 0 : -1.2) + "deg) scale(" + (rm ? 1 : 1.02) + ")";
    if (ev.clientY < 70) window.scrollBy(0, -14);
    else if (ev.clientY > window.innerHeight - 70) window.scrollBy(0, 14);
    const d = this.hit(ev.clientX, ev.clientY);
    if ((d ? d.key : null) !== (this.state.drop ? this.state.drop.key : null)) this.set({ drop: d });
  }
  /** What is under the pointer: the Library (cancel), the right third of a card (run in parallel), or a gap. */
  private hit(x: number, y: number): Drop | null {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!el?.closest || !this.press) return null;
    const P = this.press.payload;
    if (el.closest("[data-libpanel]")) return { type: "cancel", key: "cancel" };
    const lane = el.closest("[data-lane]");
    if (lane && P.isBlock) {
      const r = lane.getBoundingClientRect(), id = lane.getAttribute("data-lane")!;
      if (x > r.left + r.width * 0.66 && !(P.kind === "move" && id === P.id)) return { type: "par", id, key: "par:" + id };
    }
    const row = el.closest("[data-first]");
    if (row) {
      const r = row.getBoundingClientRect(), f = +row.getAttribute("data-first")!, l = +row.getAttribute("data-last")!, z = row.getAttribute("data-zone") as Item["zone"];
      const before = this.state.view === "blocks" ? x < r.left + r.width / 2 : y < r.top + Math.min(r.height / 2, 60);
      const at = before ? f : l + 1;
      return { type: "ins", at, zone: z, key: "ins:" + z + ":" + at };
    }
    const de = el.closest("[data-dayend]");
    if (de) { const at = +de.getAttribute("data-dayend")!, z = de.getAttribute("data-dzone") as Item["zone"]; return { type: "ins", at, zone: z, key: "ins:" + z + ":" + at }; }
    return null;
  }
  endDrag(cancel: boolean) {
    const P = this.press;
    this.unbindPointer();
    this.press = null;
    if (!P || !P.started) return;
    const d = this.state.drop;
    this.justDragged = true;
    setTimeout(() => (this.justDragged = false), 50);
    this.set({ drag: null, drop: null });
    if (cancel || !d || d.type === "cancel") return;
    this.drop(P.payload, d);
  }
  private drop(p: DragPayload, d: Exclude<Drop, { type: "cancel" }>) {
    const s = this.state;
    let label = "";
    this.commit(items => {
      let moving: Item[];
      let at = d.type === "ins" ? d.at : 0;
      if (p.kind === "move") {
        const ids = s.sel.includes(p.id) && s.sel.length > 1 ? s.sel : [p.id], set = new Set(ids);
        moving = items.filter(x => set.has(x.id));
        if (d.type === "ins") at -= items.slice(0, at).filter(x => set.has(x.id)).length;
        items = items.filter(x => !set.has(x.id));
        label = moving.length > 1 ? moving.length + " blocks moved" : (moving[0].title || "Item") + " moved";
      } else {
        moving = p.kind === "lib" ? expand(RDL().get(p.id)) : [mkStruct(p.t)];
        label = (p.title || "Block") + " added";
      }
      if (d.type === "par") {
        const ti = items.findIndex(x => x.id === d.id);
        if (ti < 0) return items;
        const tg = items[ti], pid = tg.par || uid();
        tg.par = pid;
        let pos = ti;
        while (items[pos + 1] && items[pos + 1].par === pid) pos++;
        moving = moving.filter(m => m.kind === "block");
        moving.forEach(m => { m.par = pid; m.zone = "live"; });
        items.splice(pos + 1, 0, ...moving);
        label += " into a parallel group";
        return items;
      }
      if (d.zone !== "live" && moving.some(m => m.kind !== "block")) moving = moving.filter(m => m.kind === "block");
      const prev = items[at - 1], next = items[at];
      moving.forEach(m => { m.zone = d.zone; m.par = d.zone === "live" && m.kind === "block" && prev && next && prev.par && prev.par === next.par ? prev.par : null; });
      items.splice(Math.max(0, Math.min(at, items.length)), 0, ...moving);
      return items;
    }, label);
    this.set({ live: label });
  }
  /** Drag a card's bottom edge to change its length in 5-minute steps. k is pixels per minute. */
  resizeStart(e: React.PointerEvent, id: string, k: number) {
    e.stopPropagation();
    e.preventDefault();
    const x = this.state.items.find(y => y.id === id);
    if (!x) return;
    const y0 = e.clientY, m0 = mins(x);
    this.set(s => ({ hist: s.hist.concat([s.items]).slice(-40) }));
    const mv = (ev: PointerEvent) => {
      const nm = Math.max(5, m0 + Math.round((ev.clientY - y0) / k / 5) * 5);
      if (nm !== this.state.items.find(y => y.id === id)?.mins) this.set(s => ({ items: s.items.map(y => (y.id === id ? { ...y, mins: nm } : y)), stress: false }));
    };
    const up = () => {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      this.justDragged = true;
      setTimeout(() => (this.justDragged = false), 50);
      const y = this.state.items.find(z => z.id === id);
      if (y) this.set({ live: y.title + " is now " + y.mins + " minutes" });
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  }

  // ---- exports ----
  exportFile(kind: "pdf" | "docx") {
    const s = this.state, B = bridge();
    if (s.exporting) return;
    const L = layout(s.items, parseStart(s.start));
    this.set({ exporting: kind });
    Promise.resolve(B && B[kind](agendaDoc(s, L.total, L.days.length))).catch(() => {}).then(() => this.set({ exporting: null }));
  }
  flash(key: "copied" | "prompted", value: true | string) {
    this.set({ [key]: value } as Partial<State>);
    setTimeout(() => this.set({ [key]: key === "copied" ? false : null } as Partial<State>), 1500);
  }

  // ---- run mode ----
  liveBlocks(s: State = this.state) { return s.items.filter(isLiveBlock); }
  runElapsed(r: RunState | null = this.state.run) { return r ? r.acc + (r.t0 ? Date.now() - r.t0 : 0) : 0; }
  private onRunKey = (e: KeyboardEvent) => {
    if (!this.state.run) return;
    const tg = (e.target as HTMLElement)?.tagName;
    if (tg === "TEXTAREA" || tg === "INPUT") { if (e.key === "Escape") (e.target as HTMLElement).blur(); return; }
    if (e.key === "Escape") { e.stopPropagation(); this.runEnd(); }
    else if (e.key === " ") { e.preventDefault(); this.runPlay(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); this.runMove(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); this.runMove(-1); }
  };
  runBegin() {
    if (!this.liveBlocks().length) return;
    this.runStop();
    this.set({ run: { i: 0, acc: 0, t0: null, log: {}, extra: {}, done: false } });
    this.runTimer = setInterval(() => { if (this.state.run?.t0) this.set(s => ({ tick: s.tick + 1 })); }, 250);
    window.addEventListener("keydown", this.onRunKey, true);
  }
  runStop() {
    if (this.runTimer) clearInterval(this.runTimer);
    this.runTimer = null;
    window.removeEventListener("keydown", this.onRunKey, true);
  }
  runEnd() { this.runStop(); this.set({ run: null }); }
  runPlay() {
    this.set(s => {
      const r = s.run;
      if (!r || r.done) return {};
      return { run: { ...r, ...(r.t0 ? { acc: r.acc + Date.now() - r.t0, t0: null } : { t0: Date.now() }) } };
    });
  }
  /** Moves by d blocks, or to index `to`. Time spent on the block being left is logged. */
  runMove(d: number, to?: number) {
    this.set(s => {
      const r = s.run;
      if (!r) return {};
      const L = this.liveBlocks(s), cur = L[r.i], log = { ...r.log }, el = this.runElapsed(r);
      if (cur && !r.done && el > 0) log[cur.id] = el;
      const n = to != null ? to : r.done ? L.length - 1 : r.i + d;
      if (n < 0) return {};
      if (n >= L.length) return { run: { ...r, log, acc: 0, t0: null, done: true } };
      const nx = L[n];
      return { run: { ...r, i: n, log, acc: log[nx.id] || 0, t0: r.t0 || (d > 0 && el > 0) ? Date.now() : null, done: false } };
    });
  }
  runAddTime(id: string) { this.set(s => (s.run ? { run: { ...s.run, extra: { ...s.run.extra, [id]: (s.run.extra[id] || 0) + 5 } } } : {})); }
  setLog(id: string, fn: (log: NoteEntry[]) => NoteEntry[]) {
    this.set(s => ({ items: s.items.map(x => (x.id === id ? { ...x, cfg: { ...x.cfg, log: fn((x.cfg?.log || []).slice()) } } : x)) }));
  }
  runApplyTimings() {
    const lg = this.state.run?.log || {};
    this.commit(list => list.map(x => (lg[x.id] != null && x.kind === "block" ? { ...x, mins: Math.max(5, Math.round(lg[x.id] / 300000) * 5) } : x)), "Timings updated from the session");
    this.runEnd();
  }
  /** Stats used by the header and checks; recomputed by components from items. */
  engBlocks() { return eng(this.state.items); }
}

export type BuilderProps = { add?: string; q?: string; tpl?: string; w?: string };
