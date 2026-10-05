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
  type Phase, type Proposal, type Sheet, type Capture, type CaptureType, type View, type Workshop, type WorkshopContext, type Source, type Session
} from "./types";
import { emptyBrief } from "./import/parse";
import { CAPTURE_TYPES, capture, curId, elapsed, newSession, planOf } from "./run/session";
import { scriptFor } from "./run/script";
import { publishPresent } from "./run/present";
import { cleanItems, libId, loadMyLibrary, saveMyLibrary, type MyLibrary, type MyTemplate } from "./mylib";
import { summaryMarkdown } from "./review";
import type { SAction, Suggestion } from "./suggest/rules";
import { newSource } from "./import/toWorkshop";

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
  context: WorkshopContext | null;
  /** The latest run of this workshop, with everything captured. */
  session: Session | null;
  hist: Item[][];
  // Canvas
  open: string | null;
  sel: string[];
  drag: (DragPayload & { w: number }) | null;
  drop: Drop | null;
  proposal: Proposal | null;
  /** Dismissed suggestions for the open workshop. */
  dismissed: Record<string, string>;
  /** Block whose inline suggestion is expanded on the canvas. */
  sugOpen: string | null;
  /** Show optional suggestions too ("Review workshop"). */
  reviewAll: boolean;
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
  /** Run mode screen: the Ready screen, the live facilitator view, or closed. */
  runView: "ready" | "live" | null;
  runOverlay: "agenda" | "help" | "view" | null;
  readyChecklist: Record<string, boolean>;
  /** Block whose output to ask for, after it finishes. */
  outputPrompt: string | null;
  captureType: CaptureType;
  captureDraft: string;
  focusCapture: number;
  /** Time of the last end-of-activity cue, for a short visual flash. */
  flash: number;
  mylib: MyLibrary;
  /** Context sent by a connector, waiting for review on the Import screen. */
  importSeed: { text: string; sourceType: string; sourceUrl?: string; title?: string; brief?: Record<string, string> } | null;
  libTab: "raw" | "mine" | "saved" | "recent";
};

type Patch = Partial<State> | ((s: State) => Partial<State>);
export const WIDE = 1100;
const sig = (s: Pick<State, "items" | "name" | "brief" | "start">) => JSON.stringify([s.items, s.name, s.brief, s.start]);

type Bridge = { pdf(doc: unknown): Promise<void>; docx(doc: unknown): Promise<void>; share(w: unknown, prev?: unknown): Promise<{ id: string; key: string; url: string }>; load(id: string): Promise<Partial<Workshop>> };
function chime() {
  try {
    const A = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext, ctx = new A();
    [660, 880].forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = "sine"; o.frequency.value = f; const t = ctx.currentTime + i * 0.22; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.08, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.65); });
    setTimeout(() => ctx.close(), 1200);
  } catch {}
}
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

  constructor() {
    const ws = loadWorkspace(), cur = ws.current ? ws.workshops.find(w => w.id === ws.current) : undefined;
    this.state = {
      ready: enginesReady(), w: window.innerWidth, reducedMotion: !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
      phase: cur?.session?.startedAt && !cur.session.endedAt ? "bench" : "home", workshops: ws.workshops, wid: cur ? cur.id : null,
      items: cur?.items || [], brief: cur?.brief || {}, name: cur ? cur.name : "Untitled workshop", start: cur?.start || "09:30", view: cur?.view || "timeline", context: cur?.context || null, session: cur?.session || null, hist: [],
      open: null, sel: [], drag: null, drop: null, proposal: null, dismissed: cur?.dismissed || {}, sugOpen: null, reviewAll: false, notice: "", live: "", center: "canvas", sheet: null,
      lib: { ...BLANK_FILTERS }, filters: false, libPrev: null, libN: 24, suggestFor: null, pendingAdd: null,
      alts: null, ctx: false, cmp: "90", copied: false, prompted: null, exporting: null, sharing: false, shareMsg: "",
      runView: null, runOverlay: null, readyChecklist: {}, outputPrompt: null, captureType: "decision", captureDraft: "", focusCapture: 0, flash: 0, mylib: loadMyLibrary(), libTab: "raw", importSeed: null
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
  /** Re-render without saving (the run clock). */
  notify() { this.state = { ...this.state }; this.listeners.forEach(l => l()); }
  get wide() { return this.state.w >= WIDE; }

  /** Current workshop merged back into the list, with "updated" bumped only when its content changed. */
  workshopList(s: State = this.state): Workshop[] {
    return s.workshops.map(w => (w.id === s.wid ? { ...w, items: s.items, brief: s.brief, name: s.name, start: s.start, view: s.view, context: s.context || undefined, session: s.session, dismissed: s.dismissed, updated: this.stamps[w.id] || w.updated } : w));
  }
  private persist() {
    const s = this.state;
    if (s.wid) {
      const g = sig(s);
      if (this.sigs[s.wid] !== g) { if (this.sigs[s.wid] != null) this.stamps[s.wid] = Date.now(); this.sigs[s.wid] = g; }
    }
    saveWorkspace({ workshops: this.workshopList(), current: s.wid });
    if (s.session?.startedAt) publishPresent(s);
  }

  // ---- lifecycle ----
  mount(props: BuilderProps) {
    const onResize = () => this.set({ w: window.innerWidth });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (this.press?.started) this.endDrag(true);
      else this.set({ open: null, alts: null, sel: [], sheet: null, center: "canvas" });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    let poll: ReturnType<typeof setInterval> | null = null;
    const go = () => {
      this.set({ ready: true });
      this.syncProps(props);
      this.firstVisit(props);
      // A reload in the middle of a session goes straight back to it; the clock never stopped.
      const ss = this.state.session;
      if (ss?.startedAt && !ss.endedAt && this.state.phase === "bench") this.openRun();
    };
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
  private firstVisit(props: BuilderProps) { void props; }

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
      workshops: this.workshopList(s).concat([w]), wid: id, items: norm(w.items), brief: w.brief, name: w.name, start: w.start, view: w.view, context: w.context || null, session: w.session || null, hist: [],
      phase: "bench", center: "canvas", open: null, sel: [], proposal: null, dismissed: w.dismissed || {}, sugOpen: null, ...extra
    }));
  }
  openWorkshop(id: string) {
    this.set(s => {
      const list = this.workshopList(s), w = list.find(x => x.id === id);
      if (!w) return {};
      return { workshops: list, wid: id, items: w.items || [], brief: w.brief || {}, name: w.name, start: w.start || "09:30", view: w.view || "timeline", context: w.context || null, session: w.session || null, dismissed: w.dismissed || {}, sugOpen: null, hist: [], phase: "bench", center: "canvas", open: null, sel: [], proposal: null, notice: "" };
    });
  }
  goHome() { this.set(s => ({ workshops: this.workshopList(s), phase: "home", open: null, sel: [], proposal: null, sheet: null })); }
  /** A blank, untouched workshop is replaced rather than left behind when a template opens. */
  private dropIfEmpty() {
    const s = this.state;
    if (s.wid && !s.items.length && s.name === "Untitled workshop" && !s.context && !s.session) this.set(st => ({ workshops: st.workshops.filter(w => w.id !== st.wid), wid: null }));
  }
  openTemplate(t: Template) {
    this.dropIfEmpty();
    this.newWorkshop({ name: t.name, items: tplItems(t), brief: { ...(t.brief as Brief) } }, { notice: t.name + " opened as an editable copy. Change anything." });
  }
  blankWorkshop() { this.newWorkshop({}, { notice: BLANK_NOTICE }); }
  // ---- context ----
  /** Creates a workshop from imported context, or attaches the context to the open one. */
  createFromContext(o: { name: string; context: WorkshopContext; brief: Brief; items: Item[]; start?: string; attach?: boolean; notice: string }) {
    if (o.attach && this.state.wid) {
      const s = this.state, ctx = s.context || { brief: emptyBrief(), sources: [] };
      const merged = { ...ctx.brief };
      (Object.keys(o.context.brief) as (keyof typeof merged)[]).forEach(k => { if (o.context.brief[k] && !merged[k]) merged[k] = o.context.brief[k]; });
      this.set({ phase: "bench", context: { brief: merged, sources: ctx.sources.concat(o.context.sources) }, brief: { ...o.brief, ...stripEmpty(s.brief) }, notice: o.notice });
      if (o.items.length) this.commit(its => its.concat(o.items), "Imported blocks added");
      return;
    }
    this.newWorkshop({ name: o.name, items: o.items, brief: o.brief, context: o.context, start: o.start || "09:30" }, { notice: o.notice, center: "canvas" });
  }
  setContextBrief(k: string, v: string) { this.set(s => ({ context: { brief: { ...(s.context?.brief || emptyBrief()), [k]: v }, sources: s.context?.sources || [] } })); }
  removeSource(id: string) { this.set(s => (s.context ? { context: { ...s.context, sources: s.context.sources.filter(x => x.id !== id) } } : {})); }
  addSource(src: Source) { this.set(s => ({ context: { brief: s.context?.brief || emptyBrief(), sources: (s.context?.sources || []).concat([src]) } })); }

  currentWorkshop() { return this.state.workshops.find(x => x.id === this.state.wid); }

  // ---- sharing ----
  /** A share link opens the sender's workshop as a copy you own. Your own link reopens your workshop. */
  openShared(id: string) {
    const mine = this.state.workshops.find(w => w.share?.id === id);
    if (mine) { this.openWorkshop(mine.id); return; }
    this.set({ notice: "Opening shared workshop…" });
    const B = bridge();
    (B ? B.load(id) : Promise.reject(new Error("Couldn't open the shared workshop.")))
      .then(w => (w as { pendingImport?: State["importSeed"] }).pendingImport ? this.set({ phase: "import", wid: null, notice: "", importSeed: (w as { pendingImport: State["importSeed"] }).pendingImport }) : this.newWorkshop(
        { name: String(w.name || "Shared workshop"), items: Array.isArray(w.items) ? w.items : [], brief: w.brief && typeof w.brief === "object" ? w.brief : {}, start: w.start || "09:30", view: w.view || "timeline", from: id, context: w.context && typeof w.context === "object" ? w.context : undefined },
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
    (B ? B.share({ name: s.name, start: s.start, view: s.view, brief: s.brief, items, context: s.context || undefined }, w?.share) : Promise.reject(new Error("Sharing isn't available.")))
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
  /** Every structural edit goes through here: snapshot for undo, then normalise. */
  commit(fn: (items: Item[]) => Item[], msg?: string, extra: Partial<State> = {}) {
    this.set(s => ({ hist: s.hist.concat([s.items]).slice(-40), items: norm(fn(clone(s.items))), live: msg || "", ...extra }));
  }
  undo() { this.set(s => (s.hist.length ? { items: s.hist[s.hist.length - 1], hist: s.hist.slice(0, -1), proposal: null, live: "Undone" } : {})); }
  edit(id: string, patch: Partial<Item>) { this.set(s => ({ items: s.items.map(x => (x.id === id ? { ...x, ...patch } : x)) })); }
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
    this.commit(items => { const pos = at == null ? items.filter(x => x.zone === "pre" || x.zone === "live").length : at; items.splice(pos, 0, ...add); return items; }, msg);
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
    const P = scope ? selectionProposal(cmd as SelCmd, s.items, s.brief, scope, n) : workshopProposal(cmd, s.items, s.brief, available(s.brief), n, sub);
    P.changes.forEach(c => (c.on = true));
    this.set({ proposal: P, open: null, sheet: this.wide ? null : "assist" });
  }
  /** Shows a suggestion's change as a proposal: nothing is applied until the person accepts. */
  preview(P: Proposal) {
    const copy: Proposal = JSON.parse(JSON.stringify(P));
    copy.changes.forEach(c => (c.on = true));
    this.set({ proposal: copy, open: null, sheet: this.wide ? null : "assist" });
  }
  runSuggestion(a: SAction) {
    const wide = this.wide;
    if (a.kind === "propose") this.preview(a.proposal);
    else if (a.kind === "command") this.propose(a.cmd, a.n ?? null);
    else if (a.kind === "context") { this.set({ ctx: true, open: null, sheet: wide ? null : "assist" }); setTimeout(() => document.getElementById("rd-context")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }
    else if (a.kind === "brief") { if (typeof a.value === "string") this.onContext(a.key, a.value); else this.setBrief(a.key, a.value); }
    else if (a.kind === "alts") this.set({ open: a.id, alts: a.id, sel: [a.id], sheet: wide ? null : "assist" });
    else if (a.kind === "methods") this.set({ lib: { ...BLANK_FILTERS, stage: a.stage }, filters: true, libTab: "raw", sheet: wide ? null : "lib" });
    else if (a.kind === "open") this.set({ open: a.id, sheet: wide ? null : "assist" });
  }
  /** "Keep as is" holds until what the suggestion depends on changes; "Not relevant" holds for this workshop. */
  dismissSuggestion(sg: Suggestion, forGood = false) { this.set(s => ({ dismissed: { ...s.dismissed, [sg.id]: forGood ? "*" : sg.sig }, sugOpen: null })); }
  restoreSuggestions() { this.set({ dismissed: {} }); }
  toggleChange(ci: number) { this.set(s => ({ proposal: s.proposal && { ...s.proposal, changes: s.proposal.changes.map((y, yi) => (yi === ci ? { ...y, on: !y.on } : y)) } })); }
  acceptProposal() {
    this.set(s => {
      if (!s.proposal) return {};
      const sel = s.proposal.changes.filter(c => c.on), br = { ...s.brief } as Record<string, unknown>;
      sel.filter(c => c.type === "brief").forEach(c => (br[c.key as string] = c.val));
      return {
        hist: s.hist.concat([s.items]).slice(-40), items: applyChanges(s.items, sel.filter(c => c.type !== "brief")), brief: br as Brief, proposal: null,
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
        if (p.kind === "lib") setTimeout(() => this.addRecent([p.id]), 0);
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
      if (nm !== this.state.items.find(y => y.id === id)?.mins) this.set(s => ({ items: s.items.map(y => (y.id === id ? { ...y, mins: nm } : y)) }));
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

  // ---- reuse and My Library ----
  setMyLib(fn: (m: MyLibrary) => MyLibrary) { const m = fn(this.state.mylib); saveMyLibrary(m); this.set({ mylib: m }); }
  /** Saves the open workshop as a personal template. With useActual, durations come from the last run. */
  saveTemplate(name: string, useActual = false) {
    const s = this.state, act = useActual && s.session ? s.session.actual : {};
    const items = cleanItems(s.items).map(x => (act[x.id] != null && x.kind === "block" ? { ...x, mins: Math.max(5, Math.round(act[x.id] / 300000) * 5) } : x));
    const n = items.filter(x => x.kind === "block" && x.zone === "live").length;
    const t: MyTemplate = { id: libId("t"), name: name || s.name, d: (s.context?.brief.goal || s.brief.question || n + " blocks").slice(0, 140), items, brief: s.brief, start: s.start, context: s.context || undefined, created: Date.now(), fromRun: !!s.session?.endedAt };
    this.setMyLib(m => ({ ...m, templates: [t, ...m.templates] }));
    this.set({ notice: "Saved “" + t.name + "” to My Library as a template." });
  }
  openMyTemplate(t: MyTemplate) {
    this.dropIfEmpty();
    this.newWorkshop({ name: t.name, items: cleanItems(t.items).map(x => ({ ...x, id: uid() })), brief: { ...t.brief }, start: t.start, context: t.context }, { notice: t.name + " opened from My Library as a new workshop." });
  }
  removeTemplate(id: string) { this.setMyLib(m => ({ ...m, templates: m.templates.filter(t => t.id !== id) })); }
  saveActivity(x: Item) {
    this.setMyLib(m => ({ ...m, activities: [{ id: libId("a"), title: x.title || "Activity", mins: mins(x), role: x.role, ref: x.ref, cfg: { ...x.cfg, log: undefined }, created: Date.now() }, ...m.activities.filter(a => a.title !== x.title)] }));
    this.set({ notice: "“" + x.title + "” saved to My Library." });
  }
  removeActivity(id: string) { this.setMyLib(m => ({ ...m, activities: m.activities.filter(a => a.id !== id) })); }
  toggleSaved(id: string) { this.setMyLib(m => ({ ...m, saved: m.saved.includes(id) ? m.saved.filter(x => x !== id) : [id, ...m.saved] })); }
  addRecent(ids: string[]) { if (ids.length) this.setMyLib(m => ({ ...m, recent: [...ids, ...m.recent.filter(x => !ids.includes(x))].slice(0, 30) })); }
  /** A fresh copy of the open workshop, without its run. */
  duplicateWorkshop() {
    const s = this.state;
    this.newWorkshop({ name: s.name + " (copy)", items: cleanItems(s.items).map(x => ({ ...x, id: uid() })), brief: { ...s.brief }, start: s.start, context: s.context || undefined }, { notice: "Duplicated. Adapt it for the next group.", phase: "bench" });
  }
  /** A new workshop whose context is what this one left open. */
  followupWorkshop() {
    const s = this.state, ss = s.session;
    if (!ss) return;
    const open = ss.captures.filter(c => (c.type === "parking" || c.type === "question") && c.status !== "resolved" && c.status !== "action");
    const brief = { ...emptyBrief(), problem: open.map(c => c.text).join("\n"), decisions: ss.captures.filter(c => c.type === "decision").map(c => c.text).join("\n"), situation: "Follow-up to " + s.name + ".", goal: "Resolve what " + s.name + " left open." };
    const src = newSource("notes", summaryMarkdown(s.name, s.items, ss, s.context?.brief.goal), "Summary of " + s.name);
    this.newWorkshop({ name: "Follow-up: " + s.name, items: [], brief: { question: brief.goal, people: s.brief.people, format: s.brief.format }, context: { brief, sources: [src] }, start: s.start }, { notice: "Follow-up workshop created with the open items as its context. The Library suggests methods for it.", phase: "bench" });
  }

  // ---- run mode ----
  liveBlocks(s: State = this.state) { return s.items.filter(isLiveBlock); }
  private runTimer: ReturnType<typeof setInterval> | null = null;
  private alerted = new Set<string>();
  /** Updates the session (persisted with the workshop) and, through persist(), the participant screen. */
  setSession(fn: (ss: Session) => Session) { this.set(s => (s.session ? { session: fn(s.session) } : {})); }
  private itemOf(id: string) { return this.state.items.find(x => x.id === id); }
  current() { const ss = this.state.session; return ss ? this.itemOf(curId(ss)) : undefined; }

  /** Opens the run: straight back into a session in progress, otherwise the Ready screen. */
  openRun() {
    const ss = this.state.session;
    if (ss?.startedAt && !ss.endedAt) { this.set({ runView: "live", phase: "bench" }); this.startTicking(); return; }
    this.set({ runView: "ready", phase: "bench", readyChecklist: ss && !ss.startedAt ? ss.checklist : {} });
  }
  startRun() {
    const s = this.state, now = Date.now();
    const ss = { ...newSession(s.items, s.session), checklist: s.readyChecklist, startedAt: now, t0: now };
    ss.started = ss.order.slice(0, 1);
    this.alerted.clear();
    this.set({ session: ss, runView: "live", outputPrompt: null, notice: "" });
    this.startTicking();
  }
  private startTicking() {
    if (this.runTimer) return;
    this.runTimer = setInterval(() => {
      const ss = this.state.session;
      if (!ss || !this.state.runView) return;
      this.tickAlerts(ss);
      if (ss.t0) this.notify();
    }, 250);
    window.addEventListener("keydown", this.onRunKey, true);
  }
  runStop() {
    if (this.runTimer) clearInterval(this.runTimer);
    this.runTimer = null;
    window.removeEventListener("keydown", this.onRunKey, true);
  }
  /** Leaves Run mode; a session in progress stays and can be resumed. */
  exitRun() { this.runStop(); this.set({ runView: null, runOverlay: null }); }
  runPlay() { this.setSession(ss => (ss.endedAt ? ss : ss.t0 ? { ...ss, acc: elapsed(ss), t0: null } : { ...ss, t0: Date.now(), started: ss.started.includes(curId(ss)) ? ss.started : ss.started.concat([curId(ss)]) })); }
  /** Adds (or with a negative n, removes) minutes from the current activity. */
  runAdjust(n: number) {
    const x = this.current();
    if (!x) return;
    this.setSession(ss => ({ ...ss, extra: { ...ss.extra, [x.id]: Math.max(1 - mins(x), (ss.extra[x.id] || 0) + n) } }));
    if (n > 0) this.alerted.delete(x.id);
  }
  runReset() { this.setSession(ss => ({ ...ss, acc: 0, t0: ss.t0 ? Date.now() : null })); this.alerted.delete(curId(this.state.session!)); }
  /** Moves to block k. Time on the block being left is logged; a running clock keeps running. */
  runGo(k: number) {
    this.setSession(ss => {
      if (k < 0 || k >= ss.order.length) return ss;
      const cur = curId(ss), el = elapsed(ss), actual = { ...ss.actual };
      if (el > 0) actual[cur] = el;
      const nx = ss.order[k], running = !!ss.t0;
      return { ...ss, i: k, actual, acc: actual[nx] || 0, t0: running ? Date.now() : null, started: running && !ss.started.includes(nx) ? ss.started.concat([nx]) : ss.started, skipped: ss.skipped.filter(z => z !== nx) };
    });
  }
  /** Finishes the current activity and moves to the next one that isn't skipped. Asks for its output after. */
  runFinish() {
    const ss = this.state.session;
    if (!ss) return;
    const x = this.current();
    let k = ss.i + 1;
    while (k < ss.order.length && ss.skipped.includes(ss.order[k])) k++;
    const sc = x ? scriptFor(x, this.state.brief) : null;
    const ask = x && sc?.output && !ss.outputs[x.id] && x.role !== "breaks" ? x.id : null;
    if (k >= ss.order.length) { this.runEnd(); return; }
    this.runGo(k);
    if (ask) this.set({ outputPrompt: ask });
  }
  runBack() { const ss = this.state.session; if (ss && ss.i > 0) this.runGo(ss.i - 1); }
  runSkip(id: string, on = true) { this.setSession(ss => ({ ...ss, skipped: on ? ss.skipped.concat([id]) : ss.skipped.filter(z => z !== id) })); }
  /** Puts a backup activity straight after the current one. */
  runActivateBackup(id: string) {
    this.setSession(ss => (ss.order.includes(id) ? ss : { ...ss, order: [...ss.order.slice(0, ss.i + 1), id, ...ss.order.slice(ss.i + 1)] }));
    const x = this.itemOf(id);
    this.set({ live: (x?.title || "Backup") + " is next" });
  }
  runApply(fn: (ss: Session) => Session) { this.setSession(fn); }
  /** Takes the next scheduled break straight after the current activity. */
  runBreakNext(breakId: string) { this.setSession(ss => { const o = ss.order.filter(x => x !== breakId); o.splice(o.indexOf(curId(ss)) + 1, 0, breakId); return { ...ss, order: o }; }); }
  /** Adds a 10-minute break after the current activity, to the plan and to this run. */
  runAddBreak() {
    const cur = this.current();
    if (!cur) return;
    const br = { ...mkStruct("break"), mins: 10 };
    this.commit(its => { its.splice(its.findIndex(x => x.id === cur.id) + 1, 0, br); return its; }, "Break added");
    this.setSession(ss => { const o = ss.order.slice(); o.splice(ss.i + 1, 0, br.id); return { ...ss, order: o }; });
  }
  /** Ends the workshop and opens Review. */
  runEnd() {
    this.setSession(ss => { const el = elapsed(ss), actual = { ...ss.actual }; if (el > 0 && !ss.endedAt) actual[curId(ss)] = el; return { ...ss, actual, t0: null, acc: 0, endedAt: ss.endedAt || Date.now() }; });
    this.runStop();
    this.set({ runView: null, runOverlay: null, outputPrompt: null, phase: "review", notice: "" });
  }
  addCapture(type: CaptureType, text: string) {
    const t = text.trim();
    if (!t) return;
    this.setSession(ss => capture(ss, type, t, this.current()));
    this.set({ captureDraft: "" });
  }
  updateCapture(id: string, patch: Partial<Capture>) { this.setSession(ss => ({ ...ss, captures: ss.captures.map(c => (c.id === id ? { ...c, ...patch } : c)) })); }
  removeCapture(id: string) { this.setSession(ss => ({ ...ss, captures: ss.captures.filter(c => c.id !== id) })); }
  setBlockNote(id: string, text: string) { this.setSession(ss => ({ ...ss, blockNotes: { ...ss.blockNotes, [id]: text } })); }
  setOutput(id: string, text: string) { this.setSession(ss => ({ ...ss, outputs: { ...ss.outputs, [id]: text } })); }
  setRunSettings(p: Partial<Session["settings"]>) { this.setSession(ss => ({ ...ss, settings: { ...ss.settings, ...p } })); }

  /** Soft chime and a visual cue when an activity reaches zero; never more than once per activity. */
  private tickAlerts(ss: Session) {
    const x = this.current();
    if (!x || !ss.t0) return;
    const rem = planOf(ss, x) * 60000 - elapsed(ss);
    if (rem <= 0 && !this.alerted.has(x.id)) {
      this.alerted.add(x.id);
      if (ss.settings.sound === "soft") chime();
      if (ss.settings.sound !== "silent") { this.set({ flash: Date.now() }); }
    }
  }
  private onRunKey = (e: KeyboardEvent) => {
    const s = this.state;
    if (!s.runView || !s.session) return;
    const tg = (e.target as HTMLElement)?.tagName;
    if (tg === "TEXTAREA" || tg === "INPUT" || tg === "SELECT") { if (e.key === "Escape") (e.target as HTMLElement).blur(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (s.runView === "ready") { if (e.key === "Escape") { e.preventDefault(); this.exitRun(); } return; }
    const k = e.key;
    const handled = () => { e.preventDefault(); e.stopPropagation(); };
    if (k === "Escape") { handled(); if (s.runOverlay) this.set({ runOverlay: null }); else if (s.outputPrompt) this.set({ outputPrompt: null }); return; }
    if (k === " ") { handled(); this.runPlay(); return; }
    if (k === "n" || k === "N" || k === "ArrowRight") { handled(); this.runFinish(); return; }
    if (k === "p" || k === "P" || k === "ArrowLeft") { handled(); this.runBack(); return; }
    if (k === "=") { handled(); this.runAdjust(1); return; }
    if (k === "+") { handled(); this.runAdjust(5); return; }
    if (k === "-" || k === "_") { handled(); this.runAdjust(-1); return; }
    if (k === "a" || k === "A") { handled(); this.set({ runOverlay: s.runOverlay === "agenda" ? null : "agenda" }); return; }
    if (k === "?") { handled(); this.set({ runOverlay: s.runOverlay === "help" ? null : "help" }); return; }
    const ct = CAPTURE_TYPES.find(c => c.hotkey === k.toLowerCase());
    if (ct) { handled(); this.set(st => ({ captureType: ct.key, focusCapture: st.focusCapture + 1 })); }
  };
  /** Stats used by the header and checks; recomputed by components from items. */
  engBlocks() { return eng(this.state.items); }
}

const stripEmpty = <T extends object>(o: T): Partial<T> => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null && v !== "" && !(Array.isArray(v) && !v.length))) as Partial<T>;

export type BuilderProps = { add?: string; q?: string; tpl?: string; w?: string };
