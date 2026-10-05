"use client";
// Workshop Builder. Route: /builder. Props come from the URL (?add=, ?q=, ?tpl=, ?w=).
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Home from "./components/Home";
import ImportView from "./components/ImportView";
import ModeTabs from "./components/ModeTabs";
import ReviewView from "./components/ReviewView";
import LibraryPanel from "./components/LibraryPanel";
import RunMode from "./components/RunMode";
import SidePanel from "./components/SidePanel";
import TemplatePicker from "./components/TemplatePicker";
import { Ghost, MobileBar, Notices } from "./components/Chrome";
import { derive } from "./derive";
import { BuilderStore, type BuilderProps } from "./store";
import { BuilderProvider, BODY } from "./ui";

export default function Builder(props: BuilderProps) {
  const [store] = useState(() => new BuilderStore());
  const S = useSyncExternalStore(store.subscribe, store.get, store.get);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => store.mount(propsRef.current), [store]);
  useEffect(() => { store.syncProps(props); }, [store, props.add, props.q, props.tpl, props.w]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { window.scrollTo(0, 0); }, [S.phase, S.wid]);

  // Recomputed when the workshop changes, not on every tick of the run clock.
  const d = useMemo(() => (S.ready ? derive(S) : null), [S.ready, S.items, S.brief, S.start, S.context, S.proposal, S.w, S.dismissed, S.workshops, S.session, S.wid, S.name, S.view]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!d) return <section data-screen-label="Builder" style={{ minHeight: "60vh" }} />;

  const wide = d.wide;
  return (
    <BuilderProvider value={{ store, d }}>
      <section data-screen-label="Builder" style={{ padding: `clamp(16px,2.5vw,32px) clamp(12px,2vw,28px) ${wide ? "48px" : "96px"}`, fontFamily: BODY, color: "#ece9e0" }}>
        <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{S.live}</div>
        {S.phase === "home" && <Home />}
        {(S.phase === "bench" || S.phase === "review" || (S.phase === "import" && !!S.wid)) && <ModeTabs />}
        {S.phase === "import" && <ImportView />}
        {S.phase === "review" && <><Notices /><ReviewView /></>}
        {S.phase === "bench" && (
          <>
            <Header />
            {S.runView && <RunMode />}
            <Notices />
            <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(260px,300px) minmax(0,1fr) minmax(280px,330px)" : "minmax(0,1fr)", gap: "20px clamp(16px,2vw,28px)", alignItems: "start", marginTop: 18 }}>
              <LibraryPanel />
              <main style={{ minWidth: 0 }}><Canvas /></main>
              <SidePanel />
            </div>
            {!wide && !S.drag && <MobileBar />}
            {S.center === "tpl" && <TemplatePicker />}
          </>
        )}
        <Ghost />
      </section>
    </BuilderProvider>
  );
}
