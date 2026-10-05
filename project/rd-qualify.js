// Raw Draft "Book a workshop" qualification. Questions, scoring, routing and recommendations.
// Internal only: score, flags and route are never shown to the visitor.
window.RDQ = {
  calDiscovery: "https://cal.com/rawdraft/fit-check",
  calPriority: "https://cal.com/rawdraft/discovery-call",
  tallyFallback: "https://tally.so/r/mV76EN",
  endpoint: null, // [SUBMISSION_ENDPOINT] POST target. Until set, submissions are kept in localStorage "rd-submissions".
  thresholds: { priority: 70, discovery: 40 },

  questions: [
    { id: "help", q: "What do you need help with?", sub: "Pick up to two.", multi: 2, opts: [
      ["design", "Designing the workshop or Sprint", 16], ["facilitate", "Facilitating it on the day", 20], ["structure", "Structuring the problem first", 20],
      ["research", "Research and preparation", 14], ["synthesis", "Synthesis and follow-through", 12], ["unsure", "Not sure yet", 8]] },
    { id: "strategicProblems", q: "What is the session about?", sub: "The question the room needs to answer.", multi: 2, other: "other", opts: [
      ["decision", "A difficult decision", 30], ["build", "What to build", 30], ["position", "Positioning or brand", 28], ["align", "Aligning a leadership team", 28],
      ["research", "Making sense of research", 24], ["ai", "Where AI fits", 30], ["future", "Preparing for the future", 26], ["gtm", "Going to market", 26], ["other", "Something else", 15]] },
    { id: "format", q: "How long is the session?", opts: [
      ["90", "90 minutes", 3], ["half", "Half a day", 6], ["day", "A full day", 8], ["sprint", "2 to 5 days, a Sprint", 8], ["series", "Several sessions", 7], ["unsure", "Not sure yet", 4]] },
    { id: "people", q: "How many people?", opts: [["small", "2 to 5"], ["mid", "6 to 10"], ["large", "11 to 20"], ["xl", "20+"]] },
    { id: "decisionAccess", q: "Who makes the final call?", sub: "Without them, a workshop ends with a recommendation.", opts: [
      ["me", "I do.", 25], ["exec", "A founder or executive who will be there.", 25], ["team", "A small leadership team, together.", 22],
      ["joins", "They can join for part of it.", 18], ["unlikely", "They are unlikely to attend.", 5], ["unknown", "We do not know yet.", 8]] },
    { id: "decisionHorizon", q: "When would it happen?", opts: [
      ["weeks", "Within 2 to 4 weeks", 9], ["months", "Within 1 to 2 months", 8], ["quarter", "This quarter", 6], ["later", "Later this year", 3], ["none", "No date yet", 1]] },
    { id: "commercialReadiness", q: "What budget range is approved for this?", sub: "In USD. It helps me recommend a format that fits.", opts: [
      ["b1", "Under $2,500", 4], ["b2", "$2,500 to $7,500", 6], ["b3", "$7,500 to $15,000", 8], ["b4", "$15,000 to $30,000", 8], ["b5", "$30,000 or more", 8],
      ["pending", "A budget exists but isn't approved yet", 2], ["none", "No budget yet", 0]] },
    { id: "organizationType", q: "What best describes the organization?", optional: true, opts: [
      ["preRevenue", "Pre-revenue startup"], ["earlyStage", "Funded or early-stage startup"], ["growing", "Growing company"], ["established", "Established company"],
      ["enterprise", "Enterprise"], ["vc", "VC or accelerator"], ["public", "Public sector or government"], ["nonprofit", "Nonprofit or institution"], ["independent", "Independent"], ["other", "Other"]] }
  ],

  recs: {
    decision: ["decision-workshop", "decision-sprint", "decision-matrix"], build: ["product-strategy-sprint", "foundation-sprint", "pb-define-mvp"],
    position: ["positioning-workshop", "positioning-sprint", "brand-strategy-sprint"], align: ["pb-leadership-agree", "decision-workshop", "pb-strategy-offsite"],
    research: ["pb-research-decisions", "research-sprint", "affinity-mapping"], ai: ["ai-opportunity-workshop", "ai-product-strategy-sprint", "pb-ai-opportunities"],
    future: ["future-scenarios-workshop", "foresight-sprint", "scenario-sprint"], gtm: ["gtm-sprint", "positioning-sprint"], other: ["decision-workshop", "foundation-sprint"]
  },
  tplFor: { decision: 0, position: 1, research: 2, align: 3, build: 4, ai: 4, future: 5, gtm: 1, other: 0 },

  pts(id, v) { const q = this.questions.find(x => x.id === id); const o = q && q.opts.find(x => x[0] === v); return o && o[2] != null ? o[2] : 0; },
  label(id, v) { const q = this.questions.find(x => x.id === id); const o = q && q.opts.find(x => x[0] === v); return o ? o[1] : ""; },

  evaluate(a) {
    const probs = a.strategicProblems || [], help = a.help || [];
    const problemFit = probs.length ? Math.max(...probs.map(p => this.pts("strategicProblems", p))) : 0;
    const helpFit = help.length ? Math.max(...help.map(h => this.pts("help", h))) : 0;
    const decision = this.pts("decisionAccess", a.decisionAccess);
    const readiness = this.pts("decisionHorizon", a.decisionHorizon) + this.pts("commercialReadiness", a.commercialReadiness) + this.pts("format", a.format);
    const score = problemFit + helpFit + decision + readiness;
    const flags = {
      approved: /^b\d$/.test(a.commercialReadiness || ""),
      noDecisionAccess: a.decisionAccess === "unlikely",
      
      highFitProblem: problemFit >= 26,
      urgent: ["weeks", "months"].includes(a.decisionHorizon),
      wantsFacilitation: help.includes("facilitate") || help.includes("structure"),
      large: ["large", "xl"].includes(a.people)
    };
    const T = this.thresholds, early = flags.noDecisionAccess || ["pending", "none"].includes(a.commercialReadiness) || a.decisionHorizon === "none";
    let route;
    if (early || score < T.discovery) route = "early";
    else if (score >= T.priority && flags.highFitProblem && (flags.urgent || ["b3", "b4", "b5"].includes(a.commercialReadiness))) route = "priority";
    else route = "discovery";
    return { score, route, flags, parts: { problemFit, helpFit, decision, readiness } };
  },

  reasons(a, ev) {
    const r = [];
    if (ev.route === "early") { if (ev.flags.noDecisionAccess) r.push("The person who decides is unlikely to attend yet."); if (["pending", "none"].includes(a.commercialReadiness)) r.push("The budget isn't approved yet."); if (a.decisionHorizon === "none") r.push("There is no date yet."); if (!r.length) r.push("A few things need to be clearer before booking."); return r; }
    if (ev.flags.highFitProblem) r.push("A clear question for the room.");
    if (["me", "exec", "team", "joins"].includes(a.decisionAccess)) r.push("The person who decides will be there.");
    if (ev.flags.wantsFacilitation) r.push("You want the session designed and run, not just planned.");
    if (ev.flags.large) r.push("A larger group, where facilitation matters most.");
    if (ev.flags.urgent) r.push("There is a date to work towards.");
    if (ev.flags.approved) r.push("An approved budget of " + this.label("commercialReadiness", a.commercialReadiness).replace(/^Under/, "under") + ".");
    return r;
  },

  recommend(a, exists) {
    const lists = (a.strategicProblems || []).map(p => this.recs[p] || []);
    const out = []; let i = 0, more = true;
    while (more && out.length < 4) { more = false; lists.forEach(l => { if (l[i]) { more = true; if (!out.includes(l[i]) && exists(l[i]) && out.length < 4) out.push(l[i]); } }); i++; }
    if (!out.length) ["decision-workshop", "foundation-sprint"].forEach(x => exists(x) && out.push(x));
    return out;
  },

  builderText(a) {
    const p = (a.strategicProblems || [])[0], about = p === "other" && a.otherText ? a.otherText : (this.label("strategicProblems", p) || "an important question").toLowerCase();
    const len = { "90": "a 90-minute", half: "a half-day", day: "a full-day", sprint: "a 2 to 5 day", series: "a multi-session" }[a.format] || "a";
    const ppl = { small: "2 to 5", mid: "6 to 10", large: "11 to 20", xl: "20+" }[a.people];
    return "We need " + len + " workshop" + (ppl ? " for " + ppl + " people" : "") + " about " + about + ".";
  },

  build(a, ev, contact, source) {
    return {
      sourceType: source.sourceType || "direct", sourceTitle: source.sourceTitle || "",
      help: a.help || [], strategicProblems: a.strategicProblems || [], otherText: a.otherText || "", format: a.format || null, people: a.people || null,
      decisionAccess: a.decisionAccess || null, decisionHorizon: a.decisionHorizon || null, commercialReadiness: a.commercialReadiness || null, organizationType: a.organizationType || null,
      score: ev.score, route: ev.route, flags: ev.flags,
      name: contact.name || "", email: contact.email || "", company: contact.company || "", companyUrl: contact.companyUrl || "", notes: contact.notes || "",
      createdAt: new Date().toISOString()
    };
  },

  capture(sub) {
    try { const k = "rd-submissions"; const arr = JSON.parse(localStorage.getItem(k) || "[]"); arr.push(sub); localStorage.setItem(k, JSON.stringify(arr)); } catch (e) {}
    if (this.endpoint) { try { return fetch(this.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sub), keepalive: true }).then(r => r.ok).catch(() => false); } catch (e) { return Promise.resolve(false); } }
    return Promise.resolve(true);
  }
};
