// COPIED by scripts/dc-to-jsx.mjs from project/rd-data.js.
// Raw Draft, structured content layer (CMS-ready). window.RD = { sources, items, cases, notes, futures, facilitation, principles }
// origin: rawdraft | adapted | external      status: tested | adapted | reference | observed | draft
// Unknowns are left null and rendered as "Not specified" / "Not yet verified". Nothing here implies affiliation or endorsement.
(function () {
  const sources = [
    { id: "character", name: "Character", kind: "Organisation", url: "https://www.character.vc", note: "Jake Knapp & John Zeratsky's company. Origin of the Foundation Sprint and related program formats." },
    { id: "knapp", name: "Jake Knapp", kind: "Practitioner", url: "https://jakeknapp.com", note: "Creator of the Design Sprint (at Google / GV). Co-author of Sprint and Click." },
    { id: "zeratsky", name: "John Zeratsky", kind: "Practitioner", url: null, note: "Co-author of Sprint, Make Time and Click." },
    { id: "ajsmart", name: "Facilitator.com / AJ&Smart", kind: "Organisation", url: null, note: "Popularised the four-day Design Sprint and workshop formats for facilitators." },
    { id: "ideo", name: "IDEO", kind: "Organisation", url: "https://www.ideo.com", note: "Design firm commonly associated with popularising design thinking, HMW and the DFV lenses." },
    { id: "dschool", name: "Stanford d.school", kind: "Organisation", url: "https://dschool.stanford.edu", note: "Publishes design thinking methods and teaching resources." },
    { id: "sdt", name: "Service Design Tools", kind: "Toolkit", url: "https://servicedesigntools.org", note: "Open collection of service design tools and methods." },
    { id: "strategyzer", name: "Strategyzer", kind: "Organisation", url: "https://www.strategyzer.com", note: "Business Model Canvas, Value Proposition Canvas, Testing Business Ideas." },
    { id: "iftf", name: "IFTF, Institute for the Future", kind: "Organisation", url: "https://www.iftf.org", note: "Futures research organisation; foresight training and signals methods." },
    { id: "undp", name: "UNDP", kind: "Organisation", url: "https://www.undp.org", note: "Publishes foresight guidance for the public sector." },
    { id: "unesco", name: "UNESCO Futures Literacy", kind: "Programme", url: "https://www.unesco.org", note: "Futures Literacy Laboratories and related learning." },
    { id: "horizons", name: "Policy Horizons Canada", kind: "Government", url: "https://horizons.service.canada.ca", note: "Government of Canada foresight organisation; publishes methods and training." },
    { id: "futuresfriends", name: "Futures Friends", kind: "Community", url: null, note: "Futures community. Details to be documented." },
    { id: "lenny", name: "Lenny's Newsletter", kind: "Newsletter", url: "https://www.lennysnewsletter.com", note: "Product, growth and strategy writing." },
    { id: "thefutur", name: "The Futur", kind: "Education", url: "https://thefutur.com", note: "Brand strategy and creative business education." },
    { id: "iaf", name: "IAF, International Association of Facilitators", kind: "Association", url: "https://www.iaf-world.org", note: "Professional body for facilitators; runs a certification programme." },
    { id: "sessionlab", name: "SessionLab", kind: "Tool / library", url: "https://www.sessionlab.com", note: "Session planning tool with a public library of facilitation methods." },
    { id: "liberating", name: "Liberating Structures", kind: "Practitioners", url: "https://www.liberatingstructures.com", note: "Henri Lipmanowicz and Keith McCandless. Openly published interaction patterns." },
    { id: "lego", name: "The LEGO Group", kind: "Organisation", url: null, note: "Origin of LEGO Serious Play. Holds the trademark and official materials." },
    { id: "rawdraft", name: "Raw Draft", kind: "Practice", url: null, note: "Raw Draft's own material." },
    { id: "various", name: "Common practice", kind: null, url: null, note: "Widely used; no single verified originator recorded." }
  ];

  const I = [];
  const add = (type, id, title, f) => I.push(Object.assign({ id, type, title, origin: "external", status: "reference", goals: [], areas: [], outputs: [], related: [], uses: [], resources: [], before: [], after: [], alternative: [], lastVerified: null, format: null, duration: null, participants: null, groupSize: null, horizon: null, stages: [], rights: null }, f));
  const RDX = { origin: "rawdraft", status: "draft", creator: "Raw Draft", org: "rawdraft", rights: "To be decided", attribution: "Raw Draft" };

  // ━━━━━━━━━━ SPRINTS
  add("sprint", "foundation-sprint", "Foundation Sprint", { origin: "external", status: "reference", creator: "Jake Knapp & John Zeratsky", org: "character", sourceUrl: "https://www.character.vc", attribution: "Character. Described in the book Click (2025).", rights: "Original method © its authors. Summarised, not reproduced.",
    question: "What needs to be true for this to work?", short: "Define the customer, problem, differentiation and founding hypothesis before committing to a direction.",
    goals: ["create", "decide", "align"], areas: ["strategy", "product", "innovation"], stages: ["idea", "definition"], duration: "2 days (as published)", participants: "Founders / core team + decider", groupSize: "Small team", format: "In-person or remote",
    useWhen: ["A new initiative is mostly conviction", "The team cannot agree who it is for", "Differentiation is assumed, not stated", "You are about to commit build budget"],
    avoidWhen: ["Direction is set and only execution remains, go to Product Strategy", "Nobody with authority can attend both days", "You need customer evidence first, run a Research Sprint"],
    inputs: ["What you already know about customers", "Known alternatives and competitors", "Constraints: budget, time, mandate"],
    steps: [{ name: "Basics", purpose: "Agree customer, problem, advantages and competition.", methods: ["jobs-to-be-done", "competitive-alternatives", "note-and-vote"], artifact: "Basics sheet" },
      { name: "Differentiation", purpose: "Choose the differentiators that matter and plot against alternatives.", methods: ["competitive-alternatives", "dot-voting"], artifact: "Differentiation chart" },
      { name: "Approach", purpose: "Generate several ways to pursue it and compare them deliberately.", methods: ["decision-criteria", "note-and-vote"], artifact: "Chosen approach" },
      { name: "Founding hypothesis", purpose: "Write the hypothesis and the assumptions it rests on.", methods: ["assumption-mapping"], artifact: "Founding hypothesis" }],
    outputs: ["Customer", "Problem", "Differentiation", "Strategic hypothesis", "Assumptions"],
    failures: ["Differentiators that are actually table stakes", "A hypothesis too vague to be wrong", "Skipping competition because 'there is none'"],
    adaptations: ["Remote across four half-days", "Leadership version: decider joins key decisions only"],
    notes: ["Stage summaries here are Raw Draft's paraphrase. See the original for the actual exercises.", "Library methods are mapped to stages by Raw Draft for navigation, not as the canonical agenda."],
    after: ["product-strategy-sprint", "design-sprint"], before: ["research-sprint"], alternative: ["opportunity-sprint"], resources: ["res-click", "res-character"] });

  add("sprint", "opportunity-sprint", "Opportunity Sprint", Object.assign({}, RDX, {
    question: "Where should we focus?", short: "Map the opportunity landscape and choose where to bet before anyone proposes a solution.",
    goals: ["discover", "prioritise", "decide"], areas: ["strategy", "innovation"], stages: ["idea"], duration: "2–3 days (proposed)", participants: "Strategy, product, commercial + decider", groupSize: "5–8",
    useWhen: ["A growth mandate without a defined target", "Too many ideas and no fair way to compare them", "A new market or capability needs a first map"],
    avoidWhen: ["You already know what to build", "There is no appetite to drop options"],
    inputs: ["Market and customer context", "Existing ideas backlog", "Strategic constraints"],
    steps: [{ name: "Scan", purpose: "Collect jobs, shifts and advantages.", methods: ["expert-interviews", "jobs-to-be-done", "horizon-scanning"], artifact: "Opportunity inputs" },
      { name: "Map", purpose: "Cluster into opportunity spaces.", methods: ["opportunity-mapping", "affinity-mapping"], artifact: "Opportunity landscape" },
      { name: "Prioritise", purpose: "Score against explicit criteria.", methods: ["decision-criteria", "dot-voting"], artifact: "Prioritised opportunities" },
      { name: "Bet", purpose: "Name the bets and what we must learn.", methods: ["assumption-mapping"], artifact: "Strategic bets + questions" }],
    outputs: ["Opportunity landscape", "Prioritised opportunities", "Strategic bets", "Questions to investigate"],
    failures: ["Opportunities written as solutions", "Criteria chosen after the favourite is known"],
    adaptations: ["One-day leadership version", "Remote with async pre-work"],
    before: [], after: ["foundation-sprint", "research-sprint"], alternative: ["foresight-sprint"], resources: ["res-tbi"] }));

  add("sprint", "research-sprint", "Research Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Draws on published customer interview practice (incl. the Five-Act Interview).",
    question: "What do we need to know before deciding?", short: "A bounded period of customer research that ends in implications and revised assumptions, not a deck.",
    goals: ["understand", "test", "decide"], areas: ["research", "customer"], stages: ["idea", "definition", "live"], duration: "≈1 week (proposed)", participants: "Researcher, product, design + observers", groupSize: "2–5 + participants",
    useWhen: ["A decision is blocked on missing evidence", "Opinions are standing in for customer understanding", "Assumptions have never been checked"],
    avoidWhen: ["You need statistically representative data", "The decision will be made regardless of findings"],
    inputs: ["The decision this informs", "Current assumptions", "Access to participants"],
    steps: [{ name: "Frame", purpose: "Turn the decision into research questions.", methods: ["assumption-ranking"], artifact: "Research plan" },
      { name: "Interview", purpose: "Talk to people; the team observes.", methods: ["five-act-interview", "expert-interviews"], artifact: "Interview notes" },
      { name: "Synthesise", purpose: "Cluster observations into patterns.", methods: ["affinity-mapping"], artifact: "Behavioural patterns" },
      { name: "Imply", purpose: "What it means for the decision.", methods: ["how-might-we", "assumption-mapping"], artifact: "Implications + revised assumptions" }],
    outputs: ["Evidence", "Behavioural patterns", "Needs", "Implications", "Revised assumptions"],
    failures: ["Leading questions that confirm the plan", "Quoting the loudest participant as the pattern"],
    adaptations: ["Expert-interview only version", "Remote interviews with live observation"],
    after: ["foundation-sprint", "product-strategy-sprint"], alternative: ["design-sprint"], resources: ["res-mom-test", "res-cdh"] }));

  add("sprint", "product-strategy-sprint", "Product Strategy Sprint", Object.assign({}, RDX, {
    question: "What product is worth building?", short: "Turn a hypothesis into the product, its critical workflow and an honest MVP boundary.",
    goals: ["create", "prioritise", "decide"], areas: ["product", "strategy"], stages: ["definition", "prototype"], duration: "2–3 days (proposed)", participants: "Product, design, engineering, commercial + decider", groupSize: "4–7",
    useWhen: ["A founding hypothesis exists", "The backlog grows faster than conviction", "MVP scope is a negotiation, not a decision"],
    avoidWhen: ["Customer and problem are still undefined, run a Foundation Sprint", "The product is mature and needs optimisation, not strategy"],
    inputs: ["Founding hypothesis", "Critical assumptions", "Any customer evidence"],
    steps: [{ name: "Hypothesis", purpose: "Restate the bet as a product hypothesis.", methods: ["jobs-to-be-done", "value-proposition"], artifact: "Product hypothesis" },
      { name: "Workflow", purpose: "Map the one workflow that must be excellent.", methods: ["customer-journey-map", "how-might-we"], artifact: "Critical workflow" },
      { name: "Boundary", purpose: "Draw the MVP line; everything else waits.", methods: ["decision-criteria", "note-and-vote"], artifact: "MVP boundary + not-yet list" },
      { name: "Assumptions", purpose: "Find what the MVP must test first.", methods: ["assumption-mapping", "assumption-ranking"], artifact: "Assumptions + test plan" },
      { name: "Direction", purpose: "Sequence what follows if it works.", methods: ["decision-matrix"], artifact: "Roadmap direction" }],
    outputs: ["Product hypothesis", "Critical workflow", "MVP boundary", "Assumptions", "Roadmap direction"],
    failures: ["MVP defined by effort instead of learning value", "Every stakeholder's feature survives the boundary", "No kill criteria before the test"],
    adaptations: ["One-day version when the hypothesis is strong", "Leadership readout on the final afternoon"],
    before: ["foundation-sprint"], after: ["design-sprint", "gtm-sprint"], alternative: ["ai-product-strategy-sprint"], resources: ["res-tbi", "res-cdh"] }));

  add("sprint", "design-sprint", "Design Sprint", { origin: "external", status: "reference", creator: "Jake Knapp (with John Zeratsky, Braden Kowitz)", org: "knapp", sourceUrl: "https://www.thesprintbook.com", attribution: "Created by Jake Knapp at Google, developed at GV. Published in Sprint (2016).", rights: "Original method © its authors. High-level sequence only.",
    question: "How can we make and test the idea before committing to it?", short: "Map, sketch, decide, prototype and test with real customers, in five days.",
    goals: ["design", "test", "decide"], areas: ["product", "experience", "innovation"], stages: ["definition", "prototype"], duration: "5 days (as published)", participants: "Up to 7 incl. decider", groupSize: "≤7", format: "In-person or remote",
    useWhen: ["A high-stakes solution needs testing before build", "The team is stuck between competing concepts"],
    avoidWhen: ["The problem is not yet understood", "You cannot recruit target customers that week", "The answer will not change the plan"],
    inputs: ["A clear challenge", "Expert access", "Five target customers recruited"],
    steps: [{ name: "Map", purpose: "Long-term goal, map, choose a target.", methods: ["expert-interviews", "how-might-we"], artifact: "Map + target" },
      { name: "Sketch", purpose: "Remix and improve ideas individually.", methods: ["lightning-demos", "crazy-8s"], artifact: "Solution sketches" },
      { name: "Decide", purpose: "Critique and choose; storyboard.", methods: ["structured-critique", "note-and-vote"], artifact: "Storyboard" },
      { name: "Prototype", purpose: "A realistic façade.", methods: ["rapid-prototyping"], artifact: "Prototype" },
      { name: "Test", purpose: "Five one-on-one interviews.", methods: ["five-act-interview"], artifact: "Interview patterns" }],
    outputs: ["Prototype", "Customer reactions", "Patterns", "Go / adjust / stop decision"],
    failures: ["Testing something already decided", "Prototype too polished to invite criticism", "Decider absent on Decide day"],
    adaptations: ["Four-day version (popularised by AJ&Smart)", "Remote sprint"],
    before: ["foundation-sprint", "product-strategy-sprint"], after: ["gtm-sprint"], alternative: ["research-sprint"], resources: ["res-sprint", "res-ajsmart"] });

  add("sprint", "positioning-sprint", "Positioning Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Adapted from April Dunford's positioning process (Obviously Awesome, 2019).",
    question: "Why should someone choose this?", short: "Decide what this is, who it is for, and what it is better than, then write it down.",
    goals: ["create", "decide", "align"], areas: ["brand", "gtm", "product"], stages: ["definition", "live"], duration: "2 days (proposed)", participants: "Founder / product lead, marketing, sales", groupSize: "4–8",
    useWhen: ["Sales explain the product differently every time", "A relaunch or new segment", "Strong product, weak pull"],
    avoidWhen: ["The product itself is undefined", "You only need copywriting"],
    inputs: ["Best-fit customers", "Won / lost deal notes", "Competitive landscape"],
    steps: [{ name: "Customers", purpose: "Who loves it, and why.", methods: ["jobs-to-be-done"], artifact: "Best-fit customer" },
      { name: "Alternatives", purpose: "What they would do if you did not exist.", methods: ["competitive-alternatives"], artifact: "Competitive frame" },
      { name: "Value", purpose: "Attributes to value to proof.", methods: ["value-proposition", "affinity-mapping"], artifact: "Value proposition" },
      { name: "Frame", purpose: "Choose the market frame. Decide.", methods: ["note-and-vote"], artifact: "Positioning + proof requirements" }],
    outputs: ["Positioning", "Competitive frame", "Differentiation", "Value proposition", "Proof requirements"],
    failures: ["Features listed as value", "Market frame chosen because it sounds bigger"],
    before: ["foundation-sprint"], after: ["gtm-sprint", "brand-strategy-sprint"], alternative: ["positioning-workshop"], resources: ["res-obviously"] }));

  add("sprint", "brand-strategy-sprint", "Brand Strategy Sprint", Object.assign({}, RDX, {
    question: "What should this brand mean?", short: "Make belief, personality and narrative explicit enough to design with.",
    goals: ["create", "align", "design"], areas: ["brand", "culture"], stages: ["definition", "live"], duration: "2–3 days (proposed)", participants: "Leadership, marketing, product + decider", groupSize: "4–8",
    useWhen: ["A new brand", "An existing brand no longer fits the business"], avoidWhen: ["You only need a visual refresh", "Positioning is unresolved, do that first"],
    inputs: ["Positioning", "Audience research", "Existing brand assets"],
    steps: [{ name: "Ground", purpose: "Positioning and audience truths.", methods: ["expert-interviews", "jobs-to-be-done"], artifact: "Brand inputs" },
      { name: "Belief", purpose: "Why it exists beyond what it sells.", methods: ["silent-ideation", "how-might-we"], artifact: "Principles" },
      { name: "Character", purpose: "Personality and behaviour.", methods: ["structured-critique", "dot-voting"], artifact: "Personality" },
      { name: "Story", purpose: "Narrative and brief.", methods: ["note-and-vote"], artifact: "Narrative + creative brief" }],
    outputs: ["Positioning", "Principles", "Personality", "Narrative", "Creative brief"],
    failures: ["Values that any company could claim", "Brief written for the committee"],
    before: ["positioning-sprint"], after: [], alternative: [], resources: ["res-thefutur"] }));

  add("sprint", "experience-strategy-sprint", "Experience Strategy Sprint", Object.assign({}, RDX, {
    question: "What should the experience become?", short: "Define the intended experience end to end, and where to invest first.",
    goals: ["understand", "design", "prioritise"], areas: ["experience", "customer"], stages: ["live", "scaling"], duration: "2–3 days (proposed)", participants: "Product, design, ops, CX + decider", groupSize: "5–8",
    useWhen: ["Customers churn and nobody agrees why", "Many teams own pieces of one experience"], avoidWhen: ["The issue is purely operational, Service Design Sprint"],
    inputs: ["Customer research", "Current journey data"],
    steps: [{ name: "Current", purpose: "Current journey from evidence.", methods: ["customer-journey-map"], artifact: "Current journey" },
      { name: "Moments", purpose: "Find the moments that matter.", methods: ["how-might-we", "dot-voting"], artifact: "Moments that matter" },
      { name: "Future", purpose: "Design the future journey.", methods: ["crazy-8s", "structured-critique"], artifact: "Future journey" },
      { name: "Principles", purpose: "Codify and prioritise.", methods: ["decision-criteria"], artifact: "Design principles" }],
    outputs: ["Experience strategy", "Moments that matter", "Future journey", "Design principles"],
    failures: ["Mapping an imagined ideal customer"], before: ["research-sprint"], after: ["service-design-sprint", "design-sprint"], alternative: ["customer-journey-workshop"], resources: ["res-tisdd"] }));

  add("sprint", "service-design-sprint", "Service Design Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Adapted from established service design practice (service blueprinting; This Is Service Design Doing).",
    question: "How should the whole service work?", short: "Redesign a service across frontstage and backstage, and find the dependencies that decide it.",
    goals: ["understand", "design", "plan"], areas: ["experience", "organization", "customer"], stages: ["live", "scaling"], duration: "≈1 week (proposed)", participants: "Frontline staff, ops, product, policy + decider", groupSize: "5–10",
    useWhen: ["Customers feel failures caused by things they never see", "Several departments deliver one service"], avoidWhen: ["Frontline staff cannot participate"],
    inputs: ["Service data", "Policy constraints", "Staff access"],
    steps: [{ name: "Ecosystem", purpose: "Actors and relationships.", methods: ["ecosystem-mapping", "stakeholder-mapping"], artifact: "Ecosystem map" },
      { name: "Journey", purpose: "Customer side from evidence.", methods: ["customer-journey-map"], artifact: "Journey" },
      { name: "Blueprint", purpose: "Frontstage, backstage, support.", methods: ["service-blueprint"], artifact: "Service blueprint" },
      { name: "Prioritise", purpose: "Where to intervene first.", methods: ["risk-map", "decision-criteria"], artifact: "Dependencies + priorities" }],
    outputs: ["Ecosystem", "Journey", "Service blueprint", "Operational dependencies", "Priorities"],
    failures: ["Blueprinting without the people who do the work", "Every scenario at once"],
    before: ["experience-strategy-sprint"], after: ["design-sprint"], alternative: [], resources: ["res-tisdd", "res-sdt"] }));

  add("sprint", "ai-product-strategy-sprint", "AI Product Strategy Sprint", Object.assign({}, RDX, {
    question: "Where should AI actually create value?", short: "Separate AI that changes the work from AI that decorates it, then define roles, controls and what to prototype.",
    goals: ["discover", "prioritise", "design"], areas: ["ai", "product", "strategy"], stages: ["idea", "definition", "live"], duration: "2–3 days (proposed)", participants: "Product, ops, tech, risk / compliance + decider", groupSize: "5–8",
    useWhen: ["A mandate to 'do AI' without a defined bet", "Many pilots, no strategy", "Agentic workflows under discussion"],
    avoidWhen: ["The data needed does not exist or cannot be used", "You need a model evaluation, not a strategy"],
    inputs: ["Workflow inventory", "Data access constraints", "Regulatory constraints"],
    steps: [{ name: "Workflows", purpose: "Inventory and decompose real work.", methods: ["customer-journey-map", "expert-interviews"], artifact: "Workflow map" },
      { name: "Opportunities", purpose: "Where AI changes the work.", methods: ["opportunity-mapping"], artifact: "Opportunity map + use cases" },
      { name: "Roles", purpose: "Human / machine responsibilities and control points.", methods: ["decision-rights", "risk-map"], artifact: "Roles + control points" },
      { name: "Choose", purpose: "Prioritise and set prototype direction.", methods: ["decision-criteria", "note-and-vote"], artifact: "Prototype direction" }],
    outputs: ["Opportunity map", "Use cases", "Human / machine roles", "Workflows", "Control points", "Prototype direction"],
    failures: ["Ideas collapse into chatbots", "Late compliance veto", "Most exciting chosen over most credible"],
    notes: ["Make every agent concrete: trigger, scope of action, what it must never do.", "Give risk and compliance a criterion to own, not a veto to use."],
    before: ["opportunity-sprint"], after: ["design-sprint"], alternative: ["ai-opportunity-workshop"], resources: ["res-tbi", "res-lenny"] }));

  add("sprint", "gtm-sprint", "GTM Sprint", Object.assign({}, RDX, {
    question: "How should this meet the market?", short: "Form a go-to-market hypothesis, segment, offer, message, motion, you can test in weeks.",
    goals: ["plan", "test", "create"], areas: ["gtm", "product"], stages: ["prototype", "live"], duration: "2–3 days (proposed)", participants: "Product, marketing, sales + decider", groupSize: "4–8",
    useWhen: ["Launch is near and the plan is a channel list", "Product works but growth does not"], avoidWhen: ["Positioning is unresolved"],
    inputs: ["Positioning", "Pricing constraints", "Channel data"],
    steps: [{ name: "Segment", purpose: "Choose who buys first.", methods: ["jobs-to-be-done"], artifact: "Segment" },
      { name: "Offer", purpose: "What exactly is sold.", methods: ["value-proposition"], artifact: "Offer" },
      { name: "Message", purpose: "Positioning to message.", methods: ["competitive-alternatives", "structured-critique"], artifact: "Messaging direction" },
      { name: "Experiments", purpose: "Cheapest tests of the motion.", methods: ["assumption-ranking", "concept-testing"], artifact: "GTM hypothesis + experiments" }],
    outputs: ["Segment", "Offer", "GTM hypothesis", "Messaging direction", "Experiments"],
    failures: ["Every segment at once", "Experiments without pass / fail criteria"],
    before: ["positioning-sprint"], after: [], alternative: [], resources: ["res-obviously", "res-lenny"] }));

  add("sprint", "decision-sprint", "Decision Sprint", Object.assign({}, RDX, {
    question: "What decision actually needs to be made?", short: "Resolve one difficult decision with explicit options, criteria, rationale and next actions.",
    goals: ["decide", "align", "prioritise"], areas: ["strategy", "organization"], stages: ["definition", "live", "scaling"], duration: "1–2 days (proposed)", participants: "Decider + people affected + evidence holders", groupSize: "3–8",
    useWhen: ["A decision 'nearly made' for months", "Stakeholders argue solutions, not criteria", "Leadership cannot agree"],
    avoidWhen: ["No single accountable decider exists, fix decision rights first", "The decision is reversible and cheap, just decide"],
    inputs: ["The decision as currently framed", "Known options", "Available evidence"],
    steps: [{ name: "Frame", purpose: "State the actual decision.", methods: ["decision-rights", "silent-ideation"], artifact: "Decision statement" },
      { name: "Options", purpose: "Make options explicit, incl. do nothing.", methods: ["how-might-we"], artifact: "Option set" },
      { name: "Criteria", purpose: "Agree what good looks like first.", methods: ["decision-criteria", "dfv"], artifact: "Weighted criteria" },
      { name: "Evidence", purpose: "What we know vs. assume.", methods: ["assumption-mapping", "risk-map"], artifact: "Assumptions + risks" },
      { name: "Decide", purpose: "The decider decides; record it.", methods: ["note-and-vote", "decision-matrix"], artifact: "Decision + rationale + next actions" }],
    outputs: ["Explicit decision", "Criteria", "Rationale", "Assumptions", "Risks", "Next actions"],
    failures: ["Criteria reverse-engineered to justify a favourite", "Decision made but never recorded"],
    before: [], after: ["product-strategy-sprint"], alternative: ["decision-workshop"], resources: ["res-kaner"] }));

  add("sprint", "foresight-sprint", "Foresight Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Adapted from established strategic foresight practice (IFTF, Policy Horizons Canada, UNDP and others).",
    question: "What changes should we prepare for?", short: "Understand external change and uncertainty: signals, drivers, scenarios, implications.",
    purpose: "Understand external change and uncertainty.",
    goals: ["anticipate", "understand", "plan"], areas: ["futures", "strategy"], horizon: "5–15 years", duration: "≈1 week (proposed)", participants: "Strategy, insight, cross-functional leads + outsiders", groupSize: "6–12",
    useWhen: ["Long-term plans extrapolate the present", "A category is shifting and nobody can say how"], avoidWhen: ["You need a forecast or a number, foresight does not predict"],
    inputs: ["Focal question", "Time horizon", "Pre-collected signals"],
    steps: [{ name: "Sense", purpose: "Scan and collect signals.", methods: ["horizon-scanning", "signal-collection"], artifact: "Signal library" },
      { name: "Interpret", purpose: "Cluster; name drivers and uncertainties.", methods: ["signal-clustering", "systems-map"], artifact: "Drivers + uncertainties" },
      { name: "Imagine", purpose: "Build distinct scenarios.", methods: ["scenario-matrix"], artifact: "Scenarios" },
      { name: "Decide", purpose: "Implications and no-regret actions.", methods: ["wind-tunnelling"], artifact: "Implications + no-regret actions" }],
    outputs: ["Signals", "Drivers", "Uncertainties", "Scenarios", "Implications", "No-regret actions"],
    failures: ["Scenarios that are good / bad / middle", "Implications never connected to current decisions"],
    distinct: "Foresight looks outward: what is changing around us.",
    before: [], after: ["scenario-sprint", "opportunity-sprint"], alternative: ["futures-thinking-sprint"], resources: ["res-iftf", "res-undp", "res-horizons"] }));

  add("sprint", "futures-thinking-sprint", "Futures Thinking Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Adapted from futures studies practice incl. futures literacy and speculative design.",
    question: "What else could the future look like?", short: "Explore alternative and preferred futures, and work back to what to do now.",
    purpose: "Explore alternative and preferred futures.",
    goals: ["anticipate", "create", "learn"], areas: ["futures", "culture", "innovation"], horizon: "10+ years", duration: "2 days (proposed)", participants: "Mixed team, deliberately broad", groupSize: "6–15",
    useWhen: ["A team is trapped in one assumed future", "You need a preferred direction, not just risk"], avoidWhen: ["You need to stress-test a specific plan, Scenario Sprint"],
    inputs: ["Focal topic", "Some signals"],
    steps: [{ name: "Assumptions", purpose: "Surface the future we assume.", methods: ["silent-ideation"], artifact: "Used future" },
      { name: "Alternatives", purpose: "Consequences and alternatives.", methods: ["futures-wheel", "future-persona"], artifact: "Alternative futures + behaviours" },
      { name: "Artifacts", purpose: "Make the future tangible.", methods: ["speculative-artifact"], artifact: "Concepts" },
      { name: "Prefer", purpose: "Choose and backcast.", methods: ["backcasting"], artifact: "Preferred direction + backcast actions" }],
    outputs: ["Alternative futures", "Future behaviours", "Concepts", "Preferred direction", "Backcast actions"],
    failures: ["One utopia, no alternatives", "Artifacts admired, not discussed"],
    distinct: "Futures thinking widens: what else could be true, and what do we want?",
    before: ["foresight-sprint"], after: [], alternative: ["scenario-sprint"], resources: ["res-unesco"] }));

  add("sprint", "scenario-sprint", "Scenario Sprint", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Adapted from the two-axis scenario planning tradition (Shell, Global Business Network).",
    question: "How would different futures change this decision?", short: "Stress-test a strategy against several plausible futures and find the robust moves.",
    purpose: "Stress-test strategy against uncertainty.",
    goals: ["anticipate", "decide", "plan"], areas: ["futures", "strategy"], horizon: "3–10 years", duration: "2–3 days (proposed)", participants: "Strategy owners + decider", groupSize: "6–12",
    useWhen: ["A large commitment depends on factors no one can predict"], avoidWhen: ["No specific strategy or decision to test"],
    inputs: ["The strategy or decision", "Drivers and uncertainties"],
    steps: [{ name: "Uncertainties", purpose: "Choose two critical, independent uncertainties.", methods: ["signal-clustering", "dot-voting"], artifact: "Critical uncertainties" },
      { name: "Scenarios", purpose: "Build four futures.", methods: ["scenario-matrix"], artifact: "Scenarios" },
      { name: "Wind tunnel", purpose: "Test the strategy in each.", methods: ["wind-tunnelling"], artifact: "Vulnerabilities + implications" },
      { name: "Robust moves", purpose: "Actions and indicators.", methods: ["backcasting"], artifact: "Robust actions + indicators" }],
    outputs: ["Scenarios", "Vulnerabilities", "Strategic implications", "Robust actions", "Indicators to monitor"],
    failures: ["Axes that are really one variable", "A secretly preferred 'good' scenario"],
    distinct: "Scenarios narrow: does our plan survive the futures we can imagine?",
    before: ["foresight-sprint"], after: ["decision-sprint"], alternative: ["future-scenarios-workshop"], resources: ["res-long-view"] }));

  // Character, public reference formats + observed formats (method not documented here)
  add("sprint", "name-sprint", "Name Sprint", { origin: "external", status: "reference", creator: "Character", org: "character", sourceUrl: "https://www.character.vc", attribution: "Character (Jake Knapp & John Zeratsky).", rights: "© its authors. Not reproduced.",
    short: "A public Character format for choosing a name.", areas: ["brand"], goals: ["create", "decide"], summaryOnly: true, notes: ["Summarised only. Follow the original source for the method."] });
  add("sprint", "pitch-sprint", "Pitch Sprint", { origin: "external", status: "reference", creator: "Character", org: "character", sourceUrl: "https://www.character.vc", attribution: "Character (Jake Knapp & John Zeratsky).", rights: "© its authors. Not reproduced.",
    short: "A public Character format for shaping a pitch.", areas: ["gtm", "strategy"], goals: ["create"], summaryOnly: true, notes: ["Summarised only. Follow the original source for the method."] });
  [["message-sprint", "Message Sprint", "Messaging"], ["leads-sprint", "Leads Sprint", "Lead generation"], ["risk-sprint", "Risk Sprint", "Risk"], ["demo-sprint", "Demo Sprint", "Demos"], ["website-sprint", "Website Sprint", "Websites"], ["sales-deck-sprint", "Sales Deck Sprint", "Sales decks"], ["sales-call-sprint", "Sales Call Sprint", "Sales calls"], ["marketing-sprint", "Marketing Sprint", "Marketing"]].forEach(([id, t, ctx]) =>
    add("sprint", id, t, { origin: "external", status: "observed", creator: "Character", org: "character", sourceUrl: null, attribution: "Observed as a Character program format.", rights: null, short: "" + ctx + ". Known only by name and context.", areas: ["gtm"], goals: [], undocumented: true }));

  // ━━━━━━━━━━ WORKSHOPS
  add("workshop", "positioning-workshop", "Positioning Workshop", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Compressed from April Dunford's positioning process.",
    short: "A single-session positioning draft: customers, alternatives, value, market frame.", goals: ["create", "align"], areas: ["brand", "gtm"], duration: "Single session (proposed: ≈90 min)", participants: "Founder / product lead, sales, marketing", groupSize: "4–8",
    useWhen: ["You need a working positioning draft fast"], avoidWhen: ["The positioning must hold up in market, run the Sprint"],
    inputs: ["3 recent won deals, 1 lost deal"], materials: ["Wall or board", "Sticky notes", "Timer"],
    steps: ["Frame: agree this is a draft and what decision it informs.", "Best-fit customers: who loves it, and the job they hired it for.", "Alternatives: what they would do if you vanished.", "Value: unique attributes → the value they enable.", "Market frame: which frame makes the value obvious? Note and vote.", "Draft one sentence; name an owner and next test."],
    uses: ["jobs-to-be-done", "competitive-alternatives", "value-proposition", "note-and-vote"], outputs: ["Draft positioning", "Alternatives list", "Open questions"],
    failures: ["Adjectives before evidence", "Choosing the bigger-sounding market"], related: ["positioning-sprint"], resources: ["res-obviously"] }));
  add("workshop", "assumption-mapping-workshop", "Assumption Mapping Workshop", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Built on assumptions mapping (David J. Bland).",
    short: "Surface what must be true, and find the assumption most likely to kill the idea.", goals: ["test", "prioritise"], areas: ["product", "innovation"], duration: "Single session", groupSize: "4–10",
    steps: ["Write assumptions individually (desirable, viable, feasible).", "Map on importance × evidence.", "Pick the top three in the important / unknown quadrant.", "Design the cheapest disproving test for each."],
    uses: ["silent-ideation", "assumption-mapping", "assumption-ranking"], outputs: ["Assumption map", "Top risks", "Test ideas"], related: ["foundation-sprint"], resources: ["res-tbi"] }));
  add("workshop", "ai-opportunity-workshop", "AI Opportunity Workshop", Object.assign({}, RDX, {
    short: "One session to find credible, concrete AI opportunities worth prototyping.", goals: ["discover", "prioritise"], areas: ["ai"], duration: "Half day (proposed)", groupSize: "6–10",
    useWhen: ["Leadership wants AI opportunities grounded in real work"], avoidWhen: ["No workflows collected beforehand"],
    steps: ["Frame what 'credible' means; risk states constraints first.", "Review pre-collected workflows.", "Score agent fit: autonomy, reversibility, data, exposure.", "Sketch concrete agents with limits.", "Map what must be true.", "Choose three; name owners."],
    uses: ["customer-journey-map", "opportunity-mapping", "crazy-8s", "risk-map", "note-and-vote"], outputs: ["Workflow inventory", "Opportunity briefs"], related: ["ai-product-strategy-sprint"], resources: ["res-lenny"] }));
  add("workshop", "future-scenarios-workshop", "Future Scenarios Workshop", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Compressed two-axis scenario method.",
    short: "Two uncertainties, four futures, one set of implications.", goals: ["anticipate"], areas: ["futures"], duration: "Half day (proposed)", groupSize: "8–16", horizon: "5–10 years",
    steps: ["Agree the focal question and horizon.", "Rate drivers by impact and uncertainty.", "Cross the two critical uncertainties.", "Narrate each quadrant.", "Implications for today."],
    uses: ["signal-clustering", "scenario-matrix", "wind-tunnelling"], outputs: ["Scenario matrix", "Narratives", "Implications"], related: ["scenario-sprint"], resources: ["res-long-view"] }));
  add("workshop", "customer-journey-workshop", "Customer Journey Workshop", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Common journey mapping practice.",
    short: "Map what customers actually go through, with evidence, and mark where it breaks.", goals: ["understand", "align"], areas: ["experience", "customer"], duration: "Single session", groupSize: "5–12",
    steps: ["Pick one persona, one scenario.", "Lay out stages and actions from evidence.", "Add thoughts, feelings, touchpoints.", "Mark lows; HMW on the worst three."],
    uses: ["customer-journey-map", "how-might-we", "dot-voting"], outputs: ["Journey map", "Pain points"], related: ["experience-strategy-sprint"], resources: ["res-tisdd"] }));
  add("workshop", "decision-workshop", "Decision Workshop", Object.assign({}, RDX, {
    short: "Get a group from circling to a recorded decision in one session.", goals: ["decide", "align", "facilitate"], areas: ["organization"], duration: "Single session", groupSize: "3–8",
    useWhen: ["A first workshop: small, bounded, clear outcome"], steps: ["Confirm the decider and the decision.", "Silent input on options.", "Agree criteria before discussing options.", "Score, discuss, decide.", "Record decision and next actions."],
    uses: ["decision-rights", "silent-ideation", "decision-criteria", "note-and-vote"], outputs: ["Decision record"], related: ["decision-sprint"], resources: ["res-kaner", "res-sessionlab"] }));

  // ━━━━━━━━━━ FRAMEWORKS
  const FW = (id, title, f) => add("framework", id, title, f);
  FW("assumption-mapping", "Assumption Mapping", { creator: "David J. Bland", org: "strategyzer", attribution: "Popularised by David J. Bland; Testing Business Ideas (Strategyzer, 2019).", rights: "© its authors.",
    short: "A 2×2 of importance against evidence that shows which beliefs to test first.", goals: ["test", "prioritise"], areas: ["product", "innovation", "strategy"],
    useWhen: ["Before committing build effort", "After strategy work, to find what is still belief"], avoidWhen: ["Assumptions are not written yet, generate first"],
    steps: ["Write assumptions as 'We believe…', one per note.", "Place on importance × evidence.", "Important + little evidence = test first.", "Write the cheapest disproving test for the top three."],
    outputs: ["Prioritised assumptions", "Leap-of-faith shortlist"], failures: ["Assumptions too vague to test", "Hunches rated as evidence"], adaptations: ["Add an ethical / regulatory category"], resources: ["res-tbi"] });
  FW("opportunity-mapping", "Opportunity Mapping", Object.assign({}, RDX, { short: "Places opportunity spaces on attractiveness and ability-to-win, with evidence attached.", goals: ["discover", "prioritise"], areas: ["strategy", "innovation"],
    steps: ["Name opportunities as customer problems, not solutions.", "Plot attractiveness vs. ability to win.", "Attach evidence to each position.", "Shortlist; plan evidence for uncertain ones."], outputs: ["Opportunity landscape", "Evidence gaps"],
    notes: ["Related to, but distinct from, Teresa Torres' Opportunity Solution Tree."], resources: ["res-cdh"] }));
  FW("stakeholder-mapping", "Stakeholder Mapping", { creator: "Aubrey Mendelow (power / interest grid)", org: "various", attribution: "Power / interest grid, Mendelow (1991).", short: "Places stakeholders by influence and interest to plan involvement.", goals: ["align", "plan"], areas: ["organization"],
    steps: ["List everyone affected or affecting.", "Plot by power and interest.", "Plan engagement per quadrant."], outputs: ["Stakeholder map", "Engagement plan"] });
  FW("ecosystem-mapping", "Ecosystem Mapping", { org: "sdt", attribution: "Common service design practice.", short: "Maps actors, flows of value and relationships around a service or market.", goals: ["understand"], areas: ["experience", "organization", "strategy"],
    steps: ["Place the user or core offer at the centre.", "Add actors in rings of proximity.", "Draw flows: money, data, information, goods.", "Mark gaps and dependencies."], outputs: ["Ecosystem map"], resources: ["res-sdt"] });
  FW("customer-journey-map", "Customer Journey Map", { org: "various", attribution: "Common practice; no single originator recorded.", short: "What a person does, thinks and feels across an experience, step by step.", goals: ["understand", "design"], areas: ["customer", "experience"],
    steps: ["One persona, one scenario.", "Stages and actions.", "Thoughts, feelings, touchpoints, from evidence.", "Mark lows and moments that matter."], outputs: ["Journey map", "Pain points"], failures: ["Mapping an imagined ideal customer"], resources: ["res-sdt"] });
  FW("service-blueprint", "Service Blueprint", { creator: "G. Lynn Shostack", org: "various", attribution: "Shostack (HBR, 1984); extended by Bitner, Ostrom & Morgan (2008).", short: "Customer actions against frontstage, backstage and support processes.", goals: ["understand", "design"], areas: ["experience", "organization"],
    useWhen: ["Failures customers feel come from things they never see"], avoidWhen: ["The people who do the work are absent"],
    steps: ["Pick one scenario.", "Customer actions left to right.", "Frontstage, line of visibility, backstage, support.", "Mark failure points and handoffs."], outputs: ["Blueprint", "Failure points", "Dependencies"], resources: ["res-tisdd", "res-sdt"] });
  FW("jobs-to-be-done", "Jobs to Be Done", { creator: "Clayton Christensen; Tony Ulwick; Bob Moesta (distinct schools)", org: "various", attribution: "Several JTBD schools exist.", short: "Frames demand around the progress a person is trying to make.", goals: ["understand"], areas: ["product", "customer", "gtm"],
    steps: ["Interview recent switchers.", "Capture push, pull, anxiety, habit.", "Write jobs as progress statements.", "Cluster; find under-served jobs."], outputs: ["Job statements", "Struggling moments"], failures: ["Features disguised as jobs"], resources: ["res-mom-test"] });
  FW("dfv", "Desirability / Feasibility / Viability", { org: "ideo", attribution: "Widely attributed to IDEO. Exact origin not verified.", status: "reference", short: "Three lenses: do people want it, can we build it, should we as a business.", goals: ["decide", "test"], areas: ["innovation", "product"],
    steps: ["One-sentence idea.", "Assess each lens with evidence.", "The weakest lens is where to test."], outputs: ["Weakest lens"], failures: ["Used as a scorecard instead of a prompt"] });
  FW("decision-matrix", "Decision Matrix", { creator: "Stuart Pugh (concept selection)", org: "various", attribution: "Weighted matrices predate Pugh; his method is the common reference.", short: "Scores options against weighted criteria.", goals: ["decide", "prioritise"], areas: ["strategy", "organization"],
    steps: ["Agree criteria first.", "Weight; decider confirms.", "Score independently.", "Use the result to start the decision, not replace it."], outputs: ["Weighted scores"], failures: ["Weights tuned after scoring"] });
  FW("competitive-alternatives", "Competitive Alternatives", { creator: "April Dunford", org: "various", attribution: "Obviously Awesome (2019).", short: "What customers would do if you did not exist, often a spreadsheet, a person, or nothing.", goals: ["understand"], areas: ["gtm", "brand", "product"],
    steps: ["Ask: if we vanished, what would best customers do?", "Include doing nothing, hiring someone, Excel.", "Note what we do that each cannot."], outputs: ["Alternatives list"], failures: ["Only direct competitors listed"], resources: ["res-obviously"] });
  FW("value-proposition", "Value Proposition", { creator: "Alex Osterwalder et al.", org: "strategyzer", attribution: "Value Proposition Canvas, Strategyzer.", rights: "Canvas © Strategyzer; check their terms before reuse.", short: "Fit between customer jobs, pains and gains and what the offer does about them.", goals: ["design", "create"], areas: ["product", "gtm", "brand"],
    steps: ["Customer side: jobs, pains, gains.", "Offer side: products, pain relievers, gain creators.", "Look for fit, and for gaps."], outputs: ["Value proposition"], resources: ["res-strategyzer"] });
  FW("systems-map", "Systems Map", { org: "various", attribution: "Systems thinking practice.", status: "reference", short: "Shows elements, relationships and feedback loops that produce a behaviour.", goals: ["understand"], areas: ["strategy", "organization", "futures"],
    steps: ["Name the behaviour over time.", "List elements that influence it.", "Draw causal links and loops.", "Find leverage points."], outputs: ["Causal loop map", "Leverage points"] });
  FW("risk-map", "Risk Map", Object.assign({}, RDX, { short: "Places risks by likelihood and consequence, and names the ones that could kill the idea.", goals: ["plan", "decide"], areas: ["strategy", "ai", "product"],
    steps: ["List risks: customer, operational, regulatory, technical, reputational.", "Plot likelihood × consequence.", "Mark kill-risks.", "Assign owners and mitigations."], outputs: ["Risk map", "Kill-risks"], related: ["kill-risk"] }));
  FW("scenario-matrix", "Scenario Matrix", { creator: "Shell scenarios team; Global Business Network", org: "various", attribution: "Pierre Wack, Peter Schwartz and others.", short: "Crosses two critical uncertainties into four plausible futures.", goals: ["anticipate", "decide"], areas: ["futures", "strategy"], horizon: "5–15 years",
    useWhen: ["Strategy depends on factors no one can predict"], avoidWhen: ["The uncertainties are not independent"],
    steps: ["Focal question and horizon.", "Rate drivers by impact and uncertainty.", "Pick two independent critical uncertainties.", "Cross, name and narrate.", "What each future demands."], outputs: ["Four scenarios", "Signposts"], failures: ["Axes that are one variable"], resources: ["res-long-view"] });
  FW("futures-wheel", "Futures Wheel", { creator: "Jerome C. Glenn", org: "various", attribution: "Glenn (1971); documented in the Millennium Project's Futures Research Methodology.", short: "Maps first-, second- and third-order consequences of a change.", goals: ["anticipate", "understand"], areas: ["futures"],
    steps: ["Write the change at the centre.", "Direct consequences around it.", "Consequences of consequences.", "Look for surprises at the outer ring."], outputs: ["Consequence map"], failures: ["Stopping at first-order effects"] });
  FW("backcasting", "Backcasting", { creator: "John B. Robinson", org: "various", attribution: "Robinson (1982), energy policy.", short: "Starts from a preferred future and works back to moves needed today.", goals: ["plan", "anticipate"], areas: ["futures", "strategy"],
    steps: ["Describe the preferred future concretely.", "What must have happened just before?", "Step back to today.", "First moves and indicators."], outputs: ["Pathway", "First moves", "Indicators"] });

  // Raw Draft original frameworks
  FW("creation-chaos-clarity", "Creation → Chaos → Clarity", Object.assign({}, RDX, { featured: true,
    short: "Raw Draft's operating framework: make the hypothesis explicit, map what could kill it, convert uncertainty into bounded attempts.", goals: ["create", "test", "decide"], areas: ["strategy", "innovation", "product"],
    phases: [{ k: "CREATION", d: "Make the opportunity and underlying hypothesis explicit.", e: ["Market / context change", "Problem", "Alternatives", "Differentiation", "Founding hypothesis", "Right-to-win"] },
      { k: "CHAOS", d: "Map what could make it fail.", e: ["Constraints", "Actors", "Dependencies", "Failure modes", "Risks", "Kill conditions"] },
      { k: "CLARITY", d: "Convert uncertainty into bounded attempts.", e: ["Hypothesis", "Artifact", "Test", "Pass criteria", "Fail criteria", "Decision rule", "Timebox"] }],
    decision: ["KEEP", "MODIFY", "KILL"], uses: ["creation-gate", "chaos-gate", "kill-risk", "attempt-loop", "build-permissioning", "decision-rights"], outputs: ["Explicit hypothesis", "Kill conditions", "Bounded attempts", "Keep / modify / kill decisions"] }));
  FW("build-permissioning", "Build Permissioning", Object.assign({}, RDX, { short: "What has to be true before anyone is allowed to build, and how much.", goals: ["decide", "plan"], areas: ["product", "organization"], outputs: ["Build permission"], related: ["creation-chaos-clarity"], incomplete: true }));
  FW("decision-rights", "Decision Rights", Object.assign({}, RDX, { short: "Make explicit who decides, who is consulted and who is informed, before the session.", goals: ["decide", "align", "facilitate"], areas: ["organization"],
    steps: ["Name the decision.", "Name the decider, one person.", "Name who must be consulted, and how.", "Agree how the decision will be recorded."], outputs: ["Decision rights statement"], related: ["creation-chaos-clarity"] }));
  FW("facilitation-principles", "Raw Draft Facilitation Principles", Object.assign({}, RDX, { short: "Seven working rules for sessions that produce decisions, not just activity.", goals: ["facilitate", "learn"], areas: ["organization"], principlesRef: true, related: ["decision-rights"] }));

  // ━━━━━━━━━━ METHODS
  const M = (id, title, f) => add("activity", id, title, f);
  M("note-and-vote", "Note and Vote", { creator: "Jake Knapp & John Zeratsky", org: "character", sourceUrl: "https://www.character.vc", attribution: "From the Design Sprint (Sprint, 2016) and later Character work.", short: "Silent individual ideas, a quick vote, and a final call from the decider.", goals: ["decide", "facilitate"], areas: ["organization"], duration: "≈10–15 min", groupSize: "3–10",
    useWhen: ["A group must choose quickly without groupthink"], avoidWhen: ["There is no decider", "Options need deep analysis"], materials: ["Paper or sticky notes", "Pens", "Timer", "Board"],
    steps: ["Everyone writes ideas silently.", "Each person picks their best one or two.", "Write them on the board, no discussion.", "Each person votes.", "The decider makes the final call."],
    outputs: ["Shortlist", "Decision"], failures: ["Discussion creeps in before the vote", "Decider abdicates to the vote count"], adaptations: ["Remote: anonymous digital notes"], resources: ["res-sprint"] });
  M("how-might-we", "How Might We", { creator: "Min Basadur (P&G); popularised by IDEO", org: "ideo", attribution: "Basadur at Procter & Gamble; later IDEO.", short: "Reframes problems as open questions that invite solutions.", goals: ["create", "understand"], areas: ["innovation", "product"],
    steps: ["Write problems as 'How might we…'.", "Not too broad, not too narrow.", "Cluster and vote."], outputs: ["HMW questions"], failures: ["HMWs that smuggle in a solution"] });
  M("crazy-8s", "Crazy 8s", { org: "knapp", attribution: "Google design / Design Sprint.", short: "Eight variations of one idea in eight minutes.", goals: ["create", "design"], areas: ["product", "innovation"], duration: "8 minutes", materials: ["A4 paper folded in eight", "Marker", "Timer"],
    steps: ["Fold paper into eight panels.", "One minute per panel.", "Sketch variations of your strongest idea.", "Pick the best to develop."], outputs: ["Sketch variations"], failures: ["Eight different ideas instead of variations"] });
  M("lightning-demos", "Lightning Demos", { org: "knapp", attribution: "Design Sprint (Sprint, 2016).", short: "Short tours of existing solutions from anywhere, to borrow good ideas.", goals: ["create", "discover"], areas: ["product", "innovation"], duration: "≈3 min per demo",
    steps: ["Each person brings examples from any domain.", "Demo each briefly.", "Sketch the big idea from each."], outputs: ["Inspiration board"] });
  M("affinity-mapping", "Affinity Mapping", { creator: "Jiro Kawakita (KJ method)", org: "various", attribution: "KJ method.", short: "Clusters observations bottom-up until patterns emerge.", goals: ["understand"], areas: ["research"],
    steps: ["One observation per note.", "Group silently by similarity.", "Name clusters with sentences.", "Look for tensions."], outputs: ["Patterns"], failures: ["Imposing categories before clustering"] });
  M("dot-voting", "Dot Voting", { org: "various", attribution: "Common practice.", short: "Each participant places a fixed number of dots to show preference.", goals: ["prioritise", "facilitate"], areas: ["organization"],
    steps: ["Give each person a few dots.", "Vote silently, at once.", "Discuss clusters, not counts."], outputs: ["Heat map"], failures: ["Senior people vote first; others follow"] });
  M("expert-interviews", "Expert Interviews", { org: "various", attribution: "Common practice; used in Design Sprint 'Ask the Experts'.", short: "Short structured conversations with people who know parts of the problem.", goals: ["understand", "learn"], areas: ["research", "strategy"],
    steps: ["Choose experts across angles.", "Prepare 3–5 open questions.", "Team captures HMW notes while listening."], outputs: ["Expert insights", "HMW notes"] });
  M("five-act-interview", "Five-Act Interview", { creator: "Michael Margolis (GV)", org: "knapp", attribution: "Described in Sprint (2016).", short: "Structured customer interview: welcome, context, intro, tasks, debrief.", goals: ["test", "understand"], areas: ["research", "customer"], groupSize: "1 interviewer + observers",
    steps: ["Welcome.", "Context questions.", "Introduce the prototype.", "Tasks, thinking aloud.", "Debrief."], outputs: ["Observed reactions"] });
  M("concept-testing", "Concept Testing", { org: "various", attribution: "Market research practice.", short: "Puts a concept in front of target users before it is built.", goals: ["test"], areas: ["product", "brand"],
    steps: ["Write the concept as it would be sold.", "Show individually.", "Observe, do not pitch.", "Look for behaviour, not compliments."], outputs: ["Reactions"], failures: ["Asking 'would you use this?'"] });
  M("rapid-prototyping", "Rapid Prototyping", { org: "various", attribution: "Common practice.", short: "Build only enough for people to react honestly.", goals: ["design", "test"], areas: ["product", "experience"],
    steps: ["What must it answer?", "Cheapest fidelity that answers it.", "Fake the rest.", "Stop when it is real enough."], outputs: ["Prototype"], failures: ["Polishing what does not need testing"] });
  M("assumption-ranking", "Assumption Ranking", Object.assign({}, RDX, { origin: "adapted", status: "adapted", attribution: "Variant of assumptions mapping.", short: "A fast forced ranking of assumptions by how badly being wrong would hurt.", goals: ["prioritise", "test"], areas: ["product", "strategy"],
    steps: ["List assumptions.", "Rank by 'if wrong, how bad?', no ties.", "Test the top one first."], outputs: ["Ranked assumptions"] }));
  M("silent-ideation", "Silent Ideation", { org: "various", attribution: "Common practice; 'working alone together'.", short: "Everyone generates ideas individually, in silence, before any discussion.", goals: ["create", "facilitate"], areas: ["organization"],
    steps: ["Give a precise prompt.", "Timebox silent writing.", "Share without debate."], outputs: ["Independent ideas"], failures: ["Facilitator talks during silence"] });
  M("structured-critique", "Structured Critique", { org: "various", attribution: "Common practice (incl. Design Sprint art museum / heat map).", short: "Review work in silence first, then discuss against agreed criteria.", goals: ["decide", "design"], areas: ["product", "brand"],
    steps: ["Display work anonymously.", "Silent review; mark strong parts.", "Discuss in a fixed order.", "Creator speaks last."], outputs: ["Shared view of strengths"] });
  M("decision-criteria", "Decision Criteria", Object.assign({}, RDX, { short: "Agree what a good choice looks like before options are discussed.", goals: ["decide", "align"], areas: ["strategy", "organization"],
    steps: ["Draft criteria silently.", "Cluster and phrase.", "Decider confirms and weights."], outputs: ["Weighted criteria"], related: ["decision-matrix"] }));
  M("horizon-scanning", "Horizon Scanning", { org: "horizons", attribution: "Foresight practice (Policy Horizons Canada, UNDP, others).", short: "Systematic search for early signs of change.", goals: ["anticipate", "discover"], areas: ["futures"],
    steps: ["Scope and horizon.", "Search beyond your industry (STEEP).", "Log signals with source and date.", "Review regularly."], outputs: ["Signal set"], resources: ["res-horizons"] });
  M("signal-collection", "Signal Collection", { org: "iftf", attribution: "Signals practice (IFTF and others).", short: "Capture concrete examples of change, each with a source.", goals: ["anticipate"], areas: ["futures", "culture"],
    steps: ["Define what counts as a signal.", "Capture: what, where, source, date, why it matters.", "Include boring signals."], outputs: ["Signal cards"], resources: ["res-iftf"] });
  M("signal-clustering", "Signal Clustering", { org: "iftf", attribution: "Signals practice.", status: "reference", short: "Group signals into emerging patterns and drivers.", goals: ["anticipate", "understand"], areas: ["futures"],
    steps: ["Lay out signals.", "Cluster silently.", "Name patterns.", "Identify drivers behind them."], outputs: ["Patterns", "Drivers"] });
  M("wind-tunnelling", "Wind Tunnelling", { org: "various", attribution: "Scenario planning practice.", short: "Test a strategy or option against each scenario to see where it breaks.", goals: ["decide", "anticipate"], areas: ["futures", "strategy"],
    steps: ["List strategic options.", "For each scenario: does it hold?", "Mark robust, fragile, contingent.", "Identify no-regret moves."], outputs: ["Robustness view", "No-regret moves"] });
  M("future-persona", "Future Persona", { org: "various", attribution: "Futures / design practice.", status: "observed", short: "A person living in a scenario, their day, needs and trade-offs.", goals: ["anticipate", "design"], areas: ["futures", "customer"], incomplete: true });
  M("speculative-artifact", "Speculative Artifact", { org: "various", attribution: "Speculative / critical design practice.", status: "reference", short: "An object from a possible future that makes it discussable.", goals: ["anticipate", "create"], areas: ["futures", "culture"],
    steps: ["Choose a scenario.", "Ask what ordinary object would exist there.", "Make it, quickly.", "Use it to provoke discussion."], outputs: ["Artifact"] });
  // Raw Draft original methods
  M("creation-gate", "Creation Gate", Object.assign({}, RDX, { short: "A checkpoint: is the hypothesis explicit enough to be wrong?", goals: ["decide"], areas: ["strategy"], related: ["creation-chaos-clarity"], incomplete: true }));
  M("chaos-gate", "Chaos Gate", Object.assign({}, RDX, { short: "A checkpoint: have we mapped what could kill it?", goals: ["decide"], areas: ["strategy"], related: ["creation-chaos-clarity"], incomplete: true }));
  M("kill-risk", "Kill-Risk", Object.assign({}, RDX, { short: "Name the single risk that, if true, ends the idea, and test it first.", goals: ["test", "prioritise"], areas: ["strategy", "product"], related: ["creation-chaos-clarity", "risk-map"], incomplete: true }));
  M("attempt-loop", "Attempt Loop", Object.assign({}, RDX, { short: "Hypothesis → artifact → test → pass / fail → keep, modify or kill, inside a timebox.", goals: ["test", "decide"], areas: ["innovation", "product"],
    steps: ["Write the hypothesis.", "Choose the artifact.", "Define the test.", "Set pass and fail criteria.", "Set the decision rule and timebox.", "Run. Keep, modify or kill."], outputs: ["Attempt record", "Decision"], related: ["creation-chaos-clarity"] }));

  // ━━━━━━━━━━ PLAYBOOKS (suggested, not prescriptions)
  const PB = (id, title, f) => add("playbook", id, title, Object.assign({}, RDX, f));
  PB("pb-define-mvp", "Define an MVP", { short: "From an unclear idea to an MVP boundary and a first test.", situation: "You have an idea with momentum but no agreed definition of what to build first.", outcome: "An MVP boundary the team agrees on, and the test that will tell you if it was right.",
    beforeYouStart: ["Name the decider", "Collect any customer evidence", "Agree the budget for the first version"], time: "Varies, roughly 1–3 weeks end to end",
    sequence: [["Foundation", "foundation-sprint", "Agree customer, problem, differentiation.", "Founding hypothesis", false], ["Assumption Mapping", "assumption-mapping", "Find what must be true.", "Riskiest assumptions", false], ["Product Strategy", "product-strategy-sprint", "Workflow and MVP line.", "MVP boundary", false], ["Prototype", "rapid-prototyping", "Make the riskiest part tangible.", "Prototype", true], ["Test", "five-act-interview", "Put it in front of customers.", "Evidence + decision", false]],
    skip: "Skip the prototype step if the riskiest assumption is commercial rather than experiential, test it with a concept test or pre-sale instead.",
    failures: ["Jumping to Product Strategy without agreeing the customer", "Prototype built to impress, not to learn"], goals: ["create", "decide", "test"], areas: ["product"], sprints: ["foundation-sprint", "product-strategy-sprint", "design-sprint"], resources: ["res-tbi"] });
  PB("pb-ai-opportunities", "Explore AI Opportunities", { short: "Grounded AI opportunities from real workflows, with roles and risks explicit.", situation: "Leadership wants AI value but pilots are scattered and ungrounded.", outcome: "A prioritised set of AI opportunities with human / AI roles and controls defined.",
    beforeYouStart: ["Collect real workflows by interview", "Bring risk / compliance in early", "Know your data constraints"], time: "Varies, one workshop to a multi-day sprint",
    sequence: [["Workflow Map", "customer-journey-map", "Map real work, step by step.", "Workflow map", false], ["Task Decomposition", null, "Break steps into tasks and judgements.", "Task list", false], ["Opportunity Mapping", "opportunity-mapping", "Where AI changes the work.", "Opportunity map", false], ["Human / AI Responsibility", "decision-rights", "Who does what; where control sits.", "Roles + control points", false], ["Risk Mapping", "risk-map", "What could go wrong, and how badly.", "Risk map", false], ["Prioritisation", "decision-criteria", "Choose against agreed criteria.", "Prioritised opportunities", false]],
    skip: "Task Decomposition can merge into the Workflow Map for simple processes.", failures: ["Starting from the model, not the work", "Risk joins at the end"], goals: ["discover", "prioritise"], areas: ["ai"], sprints: ["ai-product-strategy-sprint"], resources: ["res-lenny"] });
  PB("pb-leadership-agree", "Leadership Team Can't Agree", { short: "From circling debate to a recorded decision.", situation: "A senior team has discussed the same decision repeatedly without resolution.", outcome: "An explicit decision, its rationale, and next actions.",
    beforeYouStart: ["Confirm who has authority to decide", "Interview each leader privately", "Gather the evidence that exists"], time: "Varies, one long session to two days",
    sequence: [["Decision Framing", "decision-rights", "State the actual decision and who makes it.", "Decision statement", false], ["Silent Input", "silent-ideation", "Independent views before discussion.", "Individual positions", false], ["Options", "how-might-we", "Make options explicit.", "Option set", false], ["Criteria", "decision-criteria", "Agree what good looks like.", "Weighted criteria", false], ["Evidence", "assumption-mapping", "What we know vs. assume.", "Evidence gaps", true], ["Decision", "note-and-vote", "The decider decides.", "Decision record", false]],
    skip: "Skip Evidence only if the decision is reversible and cheap.", failures: ["No one is actually the decider", "Criteria argued after options"], goals: ["decide", "align"], areas: ["organization", "strategy"], sprints: ["decision-sprint"], resources: ["res-kaner"] });
  PB("pb-position-product", "Position a New Product", { short: "From 'what is it?' to a positioning and message you can test.", situation: "A new product exists but nobody explains it the same way twice.", outcome: "A positioning and a first message direction.",
    beforeYouStart: ["Identify best-fit customers", "Collect won / lost deal notes"], time: "Varies, days to two weeks",
    sequence: [["Foundation", "foundation-sprint", "Customer, problem, differentiation.", "Founding hypothesis", true], ["Competitive Alternatives", "competitive-alternatives", "What they would do otherwise.", "Alternatives", false], ["Positioning", "positioning-sprint", "Value, frame, decision.", "Positioning", false], ["Message", "gtm-sprint", "Turn positioning into message.", "Message direction", false]],
    skip: "Skip Foundation if customer and differentiation are already agreed.", failures: ["Writing message before positioning"], goals: ["create", "align"], areas: ["gtm", "brand"], sprints: ["positioning-sprint", "gtm-sprint"], resources: ["res-obviously"] });
  PB("pb-brand-foundation", "Build a Brand Foundation", { short: "Research to positioning to brand strategy to creative brief.", situation: "A brand needs to be created or rebuilt on a real strategy.", outcome: "A brand strategy and a creative brief designers can use.",
    beforeYouStart: ["Agree who signs off the brand", "Gather existing research"], time: "Varies",
    sequence: [["Research", "research-sprint", "Audience truths.", "Patterns", true], ["Positioning", "positioning-sprint", "Why choose it.", "Positioning", false], ["Brand Strategy", "brand-strategy-sprint", "Meaning, personality, narrative.", "Brand strategy", false], ["Creative Brief", null, "Translate into a brief.", "Creative brief", false]],
    skip: "Research can be lighter if recent, credible audience work exists.", failures: ["Brand strategy without positioning"], goals: ["create", "design"], areas: ["brand"], sprints: ["brand-strategy-sprint", "positioning-sprint"], resources: ["res-thefutur"] });
  PB("pb-rethink-cx", "Rethink a Customer Experience", { short: "From evidence of what is broken to a prototyped better experience.", situation: "Customer experience is degrading and fixes have been piecemeal.", outcome: "An experience strategy, blueprint and a prototype of the key moment.",
    beforeYouStart: ["Collect CX data and complaints", "Secure frontline participation"], time: "Varies",
    sequence: [["Research", "research-sprint", "Understand what customers go through.", "Evidence", false], ["Journey Mapping", "customer-journey-map", "Map from evidence.", "Journey", false], ["Experience Strategy", "experience-strategy-sprint", "What it should become.", "Experience strategy", false], ["Service Blueprint", "service-blueprint", "What must change backstage.", "Blueprint", false], ["Prototype", "rapid-prototyping", "Test the key moment.", "Prototype", true]],
    skip: "Blueprint can be skipped when the issue is purely digital.", failures: ["Designing the front, ignoring the back"], goals: ["understand", "design"], areas: ["experience", "customer"], sprints: ["experience-strategy-sprint", "service-design-sprint"], resources: ["res-tisdd"] });
  PB("pb-future-category", "Explore the Future of a Category", { short: "Horizon scan to scenarios to backcast moves for a category team.", situation: "A category plan extrapolates last year; leadership senses change but cannot name it.", outcome: "Scenarios, opportunity spaces and moves to make now.",
    beforeYouStart: ["Set focal question and horizon", "Pre-collect signals"], time: "Varies, weeks, with workshops",
    sequence: [["Horizon Scan", "horizon-scanning", "Search widely.", "Scan", false], ["Signals", "signal-collection", "Capture concrete evidence of change.", "Signal cards", false], ["Drivers", "signal-clustering", "Patterns and forces.", "Drivers", false], ["Scenarios", "scenario-matrix", "Four futures.", "Scenarios", false], ["Opportunity Mapping", "opportunity-mapping", "Where to play.", "Opportunity spaces", false], ["Backcasting", "backcasting", "Moves for today.", "Moves + indicators", false]],
    skip: "Use an existing scan if recent; do not skip Signals.", failures: ["Trend reports instead of signals", "Scenarios never reach the plan"], goals: ["anticipate", "plan"], areas: ["futures"], sprints: ["foresight-sprint", "scenario-sprint"], resources: ["res-iftf", "res-long-view"] });
  PB("pb-research-decisions", "Turn Research Into Decisions", { short: "From a pile of findings to a decision someone owns.", situation: "Research exists but has not changed anything.", outcome: "A decision based on explicit implications.",
    beforeYouStart: ["Gather all raw notes", "Invite the decider for the final step"], time: "Varies, one to two sessions",
    sequence: [["Synthesis", "affinity-mapping", "Cluster observations.", "Clusters", false], ["Patterns", "signal-clustering", "Name patterns.", "Patterns", false], ["Implications", "how-might-we", "What it means for us.", "Implications", false], ["Opportunity Mapping", "opportunity-mapping", "Place opportunities.", "Opportunity map", false], ["Prioritisation", "decision-criteria", "Agree what matters.", "Priorities", false], ["Decision", "note-and-vote", "Decide.", "Decision", false]],
    skip: "Merge Patterns into Synthesis for small studies.", failures: ["Quoting the loudest participant"], goals: ["understand", "decide"], areas: ["research"], sprints: ["research-sprint", "decision-sprint"], resources: ["res-cdh"] });

  // ━━━━━━━━━━ RESOURCES
  const R = (id, title, f) => add("resource", id, title, Object.assign({ origin: "external", status: "reference" }, f));
  R("res-sprint", "Sprint", { format: "Book", creator: "Jake Knapp, John Zeratsky, Braden Kowitz", org: "knapp", sourceUrl: "https://www.thesprintbook.com", short: "The published Design Sprint process.", level: "Beginner–Intermediate", recommendedFor: "Anyone running a Design Sprint", rights: "Commercial book", related: ["design-sprint", "note-and-vote"] });
  R("res-click", "Click", { format: "Book", creator: "Jake Knapp & John Zeratsky", org: "character", short: "Introduces the Foundation Sprint.", level: "Intermediate", recommendedFor: "Founders, product leaders", rights: "Commercial book", related: ["foundation-sprint"] });
  R("res-character", "Character methods and writing", { format: "Article", creator: "Character", org: "character", sourceUrl: "https://www.character.vc", short: "Public material on Foundation Sprint and related formats.", level: "All", rights: "Check source", related: ["foundation-sprint", "name-sprint", "pitch-sprint"] });
  R("res-ajsmart", "AJ&Smart / Facilitator.com workshops", { format: "Course", creator: "AJ&Smart", org: "ajsmart", short: "Training on workshop facilitation and Design Sprint 2.0.", level: "Beginner–Intermediate", recommendedFor: "New facilitators", rights: "Commercial", tags: ["facilitation"], related: ["design-sprint"] });
  R("res-tbi", "Testing Business Ideas", { format: "Book", creator: "David J. Bland & Alex Osterwalder", org: "strategyzer", short: "A library of experiments for testing assumptions.", level: "Intermediate", recommendedFor: "Product and innovation teams", rights: "Commercial book", related: ["assumption-mapping"] });
  R("res-strategyzer", "Value Proposition Canvas", { format: "Template", creator: "Strategyzer", org: "strategyzer", sourceUrl: "https://www.strategyzer.com", short: "The canvas and supporting material.", level: "Beginner", rights: "Check Strategyzer terms", related: ["value-proposition"] });
  R("res-obviously", "Obviously Awesome", { format: "Book", creator: "April Dunford", org: "various", short: "A practical positioning process.", level: "Beginner–Intermediate", recommendedFor: "Founders, PMMs", rights: "Commercial book", related: ["positioning-sprint", "positioning-workshop", "competitive-alternatives"] });
  R("res-tisdd", "This Is Service Design Doing", { format: "Book", creator: "Stickdorn, Hormess, Lawrence, Schneider", org: "various", short: "Comprehensive service design methods and facilitation.", level: "Intermediate", rights: "Commercial book", related: ["service-blueprint", "service-design-sprint"] });
  R("res-sdt", "Service Design Tools", { format: "Toolkit", creator: "Service Design Tools", org: "sdt", sourceUrl: "https://servicedesigntools.org", short: "Open catalogue of service design tools.", level: "All", rights: "Check source", related: ["ecosystem-mapping", "service-blueprint"] });
  R("res-dschool", "d.school resources", { format: "Toolkit", creator: "Stanford d.school", org: "dschool", sourceUrl: "https://dschool.stanford.edu", short: "Design thinking methods and teaching material.", level: "Beginner", rights: "Check source", tags: ["facilitation"], related: ["how-might-we"] });
  R("res-designkit", "Design Kit", { format: "Toolkit", creator: "IDEO.org", org: "ideo", sourceUrl: "https://www.designkit.org", short: "Human-centred design methods.", level: "Beginner", rights: "Check source", related: ["how-might-we", "dfv"] });
  R("res-long-view", "The Art of the Long View", { format: "Book", creator: "Peter Schwartz", org: "various", short: "Classic introduction to scenario planning.", level: "Beginner", rights: "Commercial book", related: ["scenario-matrix", "scenario-sprint"] });
  R("res-iftf", "IFTF Foresight Essentials", { format: "Course", creator: "IFTF", org: "iftf", sourceUrl: "https://www.iftf.org", short: "Professional foresight training.", level: "Intermediate", rights: "Commercial, pricing not listed here", tags: ["facilitation"], related: ["signal-collection", "foresight-sprint"] });
  R("res-undp", "UNDP foresight guidance", { format: "PDF", creator: "UNDP", org: "undp", short: "Foresight guidance for public sector practitioners.", level: "Intermediate", rights: "Check source", related: ["foresight-sprint", "horizon-scanning"] });
  R("res-unesco", "Futures Literacy", { format: "Article", creator: "UNESCO", org: "unesco", short: "UNESCO's Futures Literacy programme and laboratories.", level: "All", rights: "Check source", related: ["futures-thinking-sprint"] });
  R("res-horizons", "Policy Horizons foresight methods", { format: "Toolkit", creator: "Policy Horizons Canada", org: "horizons", sourceUrl: "https://horizons.service.canada.ca", short: "Government foresight methods and training material.", level: "Intermediate", rights: "Check source", related: ["horizon-scanning", "foresight-sprint"] });
  R("res-futuresfriends", "Futures Friends", { format: "Community", creator: "Futures Friends", org: "futuresfriends", status: "observed", short: "Futures community. Details to be documented.", level: "All", rights: null, related: [] });
  R("res-lenny", "Lenny's Newsletter", { format: "Newsletter", creator: "Lenny Rachitsky", org: "lenny", sourceUrl: "https://www.lennysnewsletter.com", short: "Product and growth writing; useful AI product context.", level: "All", rights: "Subscription", related: ["product-strategy-sprint"] });
  R("res-thefutur", "The Futur", { format: "Video", creator: "The Futur", org: "thefutur", sourceUrl: "https://thefutur.com", short: "Brand strategy and creative business education.", level: "Beginner–Intermediate", rights: "Mixed free / paid", related: ["brand-strategy-sprint"] });
  R("res-iaf", "IAF Certified Professional Facilitator", { format: "Certification", creator: "IAF", org: "iaf", sourceUrl: "https://www.iaf-world.org", short: "Professional facilitator certification by assessment.", level: "Advanced", rights: null, tags: ["facilitation"], related: [] });
  R("res-sessionlab", "SessionLab library", { format: "Toolkit", creator: "SessionLab", org: "sessionlab", sourceUrl: "https://www.sessionlab.com", short: "Public library of facilitation methods + session planner.", level: "All", rights: "Check source", tags: ["facilitation"], related: ["decision-workshop"] });
  R("res-kaner", "Facilitator's Guide to Participatory Decision-Making", { format: "Book", creator: "Sam Kaner et al.", org: "various", short: "Divergence, the groan zone, convergence.", level: "Intermediate", rights: "Commercial book", tags: ["facilitation"], related: ["decision-sprint"] });
  R("res-gathering", "The Art of Gathering", { format: "Book", creator: "Priya Parker", org: "various", short: "Purpose, hosting and why gatherings fail.", level: "Beginner", rights: "Commercial book", tags: ["facilitation"], related: [] });
  R("res-mom-test", "The Mom Test", { format: "Book", creator: "Rob Fitzpatrick", org: "various", short: "Talking to customers without being lied to.", level: "Beginner", rights: "Commercial book", related: ["research-sprint", "jobs-to-be-done"] });
  R("res-cdh", "Continuous Discovery Habits", { format: "Book", creator: "Teresa Torres", org: "various", short: "Weekly discovery and the Opportunity Solution Tree.", level: "Intermediate", rights: "Commercial book", related: ["opportunity-mapping"] });

  // ━━━━━━━━━━ SESSION TYPES, METHODOLOGIES, GAMES (structure seeds)
  const A = (type, id, title, f) => add(type, id, title, Object.assign({ origin: "external", status: "reference", org: "various" }, f));
  A("activity", "one-two-four-all", "1-2-4-All", { creator: "Henri Lipmanowicz & Keith McCandless", org: "liberating", attribution: "Liberating Structures.", short: "Silent reflection, then pairs, then fours, then the whole group.", goals: ["create", "understand"], areas: ["organization"], methodology: "liberating-structures",
    steps: ["Ask the question. One minute of silent reflection.", "Two minutes in pairs.", "Four minutes in groups of four.", "Each group shares one idea with everyone."], outputs: ["Ideas from everyone in the room"], resources: ["res-ls"] });
  A("icebreaker", "one-word-check-in", "One-word check-in", { attribution: "Common practice.", short: "Each person names how they are arriving, in one word.", purpose: "Getting people speaking", goals: ["start"], areas: ["organization"], energy: "Low", familiarity: "Strangers or teams",
    steps: ["Ask: in one word, how are you arriving today?", "Go round the room. No discussion.", "Thank people and move on."], say: "In one word, how are you arriving today? No explanation needed.", useWhen: ["Opening a serious or tense session"], avoidWhen: ["Groups larger than about 20"] });
  A("icebreaker", "hopes-and-concerns", "Hopes and concerns", { attribution: "Common practice.", short: "Surface what people hope for and worry about before the work starts.", purpose: "Context setting", goals: ["start", "align"], areas: ["organization"], energy: "Low", familiarity: "Any",
    steps: ["Each person writes one hope and one concern, one per note.", "Read them out and place them on two sides of the wall.", "Name the patterns. Come back to the concerns at the close."], useWhen: ["People arrive with different expectations"], avoidWhen: ["You will not be able to address the concerns raised"], materials: ["Sticky notes", "Markers"], synonyms: "hopes and fears expectations" });
  A("activity", "welcome-and-framing", "Welcome and framing", { attribution: "Common practice.", short: "State why the group is here, the question, the output and how decisions will be made.", purpose: "Shared starting point", goals: ["start", "align"], areas: ["organization"], synonyms: "welcome intro opening kickoff agenda",
    steps: ["Say why this session exists, in one sentence.", "Show the question and what must exist at the end.", "Name the decision owner and how the final call is made.", "Walk the agenda. Agree working norms."], outputs: ["Shared question", "Agreed output"], useWhen: ["Every session with more than a few people"], avoidWhen: ["Turning it into a 30-minute presentation"], materials: ["Agenda on the wall"] });
  A("activity", "evidence-review", "Evidence Review", { attribution: "Common practice.", short: "Walk the room through what is actually known, before anyone proposes answers.", purpose: "Let reality in early", goals: ["understand"], areas: ["research", "customer"], synonyms: "customer evidence review research readout findings insights share",
    steps: ["Before: one page of findings, each linked to its source.", "Present findings, not conclusions. Quotes and numbers.", "Each person writes what surprised them, one per note.", "Mark what is known, believed and unknown."], outputs: ["Shared evidence", "Known / believed / unknown"], useWhen: ["Research exists but not everyone has seen it"], avoidWhen: ["There is no evidence yet. Gather it first."], failures: ["Turning findings into a pitch", "Treating one loud quote as a pattern"], materials: ["Evidence summary", "Sticky notes"] });
  A("activity", "gallery-walk", "Gallery Walk", { attribution: "Common practice in education and design critique.", short: "Concepts go on the wall and everyone reviews them silently, marking what is strong.", purpose: "Review options without pitching", goals: ["create", "decide"], areas: ["product", "innovation"], synonyms: "silent review critique concepts heat map",
    steps: ["Hang every concept on the wall, unattributed.", "Walk silently. Dot what is strong, note questions.", "Read the clusters of dots aloud.", "Creators answer questions only at the end."], outputs: ["Heat map of strong ideas", "Open questions"], useWhen: ["After sketching, before voting"], avoidWhen: ["Fewer than three concepts"], failures: ["Creators pitching their own work"], materials: ["Wall space", "Small dot stickers"] });
  A("activity", "next-actions", "Next Actions", { attribution: "Common practice.", short: "Turn the decision into owned actions: what, who, by when.", purpose: "Follow-through", goals: ["plan"], areas: ["organization"], synonyms: "who what when actions owners follow up close wrap-up",
    steps: ["Read back the decision.", "List the actions it needs.", "Each action gets one owner and a date.", "Name the first check-in."], outputs: ["Owned action list"], useWhen: ["Every session that made a decision"], avoidWhen: ["Assigning owners who are not in the room"], failures: ["Actions owned by 'the team'"], materials: ["Action board"] });
  A("icebreaker", "object-show-and-tell", "Object show and tell", { attribution: "Common practice.", short: "Each person shows an object within reach and links it to the topic.", purpose: "Introductions", goals: ["start"], areas: ["organization"], energy: "Medium", familiarity: "Strangers",
    steps: ["Ask everyone to find an object within reach that says something about the topic.", "Each person shows it and explains in under a minute."], useWhen: ["Remote sessions with new groups"] });
  A("energiser", "count-to-twenty", "Count to twenty", { attribution: "Common improvisation exercise.", short: "The group counts to twenty, one voice at a time, with no order agreed.", goals: ["start"], areas: ["organization"], energy: "Medium", movement: "None",
    steps: ["Eyes down.", "Anyone can say the next number. If two people speak at once, start again from one.", "Stop at twenty or after five minutes."], useWhen: ["Attention is dropping", "After a long discussion"] });
  A("energiser", "stand-and-sort", "Stand and sort", { attribution: "Common practice.", short: "People line up in order of a simple criterion, without talking.", goals: ["start"], areas: ["organization"], energy: "High", movement: "Active",
    steps: ["Name a criterion, such as years in the organisation.", "People sort themselves into a line in silence.", "Check the order out loud."], useWhen: ["After lunch", "Moving from discussion into making"] });
  A("reflection", "what-so-what-now-what", "What, So What, Now What?", { creator: "Henri Lipmanowicz & Keith McCandless", org: "liberating", attribution: "Liberating Structures.", short: "Reflect on what happened, why it matters and what to do next.", goals: ["reflect", "learn"], areas: ["organization"], methodology: "liberating-structures",
    steps: ["What happened? Facts only.", "So what? Patterns and meaning.", "Now what? Actions."], outputs: ["Shared lessons", "Next actions"], resources: ["res-ls"] });
  A("reflection", "rose-bud-thorn", "Rose, bud, thorn", { attribution: "Common practice.", short: "Name something that worked, something promising and something that did not work.", goals: ["reflect"], areas: ["organization"],
    steps: ["Rose: what worked.", "Bud: what has potential.", "Thorn: what did not work.", "Cluster, then discuss the thorns first."], outputs: ["Retrospective notes"] });

  const MT = (id, title, f) => A("methodology", id, title, f);
  MT("lego-serious-play", "LEGO Serious Play", { creator: "The LEGO Group", org: "lego", attribution: "Developed at the LEGO Group. Official materials, training and trademark belong to the LEGO Group.", rights: "Check current licence and trademark terms at the source before using the name or materials.",
    short: "A facilitated approach where people build models in LEGO bricks to think, communicate and solve problems.", goals: ["understand", "create", "align"], areas: ["strategy", "organization", "culture"], formats: ["lego", "making"],
    goodFor: ["Getting every voice into the room", "Making abstract strategy concrete", "Exploring systems and relationships"], principles: ["Everyone builds. Everyone shares.", "The builder owns the meaning of the model.", "Building with your hands helps you think."],
    flow: ["Pose a question", "Build a model in response", "Share the story of the model", "Reflect and connect models"], tools: { special: ["LEGO Serious Play brick kits"] }, limitations: ["Needs a trained facilitator", "Brick kits are required", "Takes longer than discussion"], level: "advanced" });
  MT("liberating-structures", "Liberating Structures", { creator: "Henri Lipmanowicz & Keith McCandless", org: "liberating", sourceUrl: "https://www.liberatingstructures.com", short: "Simple patterns for structuring interaction so everyone can contribute.", goals: ["start", "align", "create"], areas: ["organization"],
    goodFor: ["Including everyone", "Replacing presentations and open discussion"], principles: ["Include and unleash everyone", "Small structures, used often"], flow: ["Choose a structure for the purpose", "Run it in short timed rounds", "String structures together"], uses: ["one-two-four-all", "what-so-what-now-what"], resources: ["res-ls"], limitations: ["Each structure is simple. Sequencing them well takes practice."] });
  MT("gamestorming", "Gamestorming", { creator: "Dave Gray, Sunni Brown, James Macanufo", short: "A collection of workshop games organised around opening, exploring and closing.", goals: ["create", "explore"], areas: ["organization", "innovation"],
    goodFor: ["Designing sessions with a clear arc"], principles: ["Open, explore, close", "Make thinking visible", "Work with artifacts"], flow: ["Open: diverge", "Explore: examine", "Close: converge"], uses: ["dot-voting", "affinity-mapping"], resources: ["res-gamestorming"] });
  MT("design-thinking", "Design Thinking", { creator: "IDEO, Stanford d.school and others", org: "ideo", short: "A human-centred approach to problems built on research, iteration and prototyping.", goals: ["understand", "create", "test"], areas: ["product", "experience", "innovation"],
    principles: ["Start with people", "Make things to think", "Iterate"], flow: ["Understand", "Define", "Ideate", "Prototype", "Test"], uses: ["how-might-we", "rapid-prototyping", "concept-testing"], resources: ["res-designkit", "res-dschool"], limitations: ["Often reduced to a workshop ritual without real research"] });
  MT("service-design", "Service Design", { org: "sdt", short: "Designing services across customer experience, staff and operations.", goals: ["understand", "create"], areas: ["service", "experience", "organization"],
    principles: ["Frontstage and backstage together", "Design with the people who deliver the service"], flow: ["Research", "Map", "Redesign", "Pilot"], uses: ["service-blueprint", "customer-journey-map", "ecosystem-mapping"], resources: ["res-tisdd", "res-sdt"] });
  MT("strategic-foresight", "Strategic Foresight", { org: "iftf", short: "Structured exploration of external change to inform decisions today.", goals: ["anticipate", "plan"], areas: ["futures", "strategy"],
    principles: ["Plausible, not probable", "Signals before trends"], flow: ["Sense", "Interpret", "Imagine", "Decide", "Act"], uses: ["horizon-scanning", "signal-collection", "signal-clustering", "futures-wheel", "backcasting"], resources: ["res-iftf", "res-horizons", "res-undp"] });
  MT("scenario-planning", "Scenario Planning", { creator: "Shell scenarios team; Global Business Network", short: "Several plausible futures used to test strategy against uncertainty.", goals: ["anticipate", "decide"], areas: ["futures", "strategy"],
    principles: ["Several futures, none preferred", "Test the strategy, not the forecast"], flow: ["Focal question", "Drivers and uncertainties", "Scenario matrix", "Wind tunnel"], uses: ["scenario-matrix", "wind-tunnelling"], resources: ["res-long-view"] });

  const GDEB = ["What happened?", "Why did it happen?", "Which assumptions were exposed?", "What does this imply for the real strategy?"];
  A("game", "tabletop-strategy-game", "Tabletop strategy game", { origin: "rawdraft", status: "draft", org: "rawdraft", creator: "Raw Draft", rights: "To be decided", gameKind: "Tabletop", template: true,
    short: "The structure for a strategic tabletop game. No game is published here yet.", goals: ["anticipate", "decide", "learn"], areas: ["strategy", "business"], formats: ["tabletop", "game", "cards"], level: "advanced",
    game: [["Context", "The strategic situation being simulated."], ["Players", "Roles or teams."], ["Board", "The system being represented."], ["Resources", "Tokens, cards, budgets or capabilities."], ["Rounds", "What each round represents."], ["Events", "External changes introduced between rounds."], ["Decisions", "What players choose each round."], ["Consequences", "How the system changes in response."]], debrief: GDEB });
  A("game", "scenario-simulation", "Scenario simulation", { origin: "rawdraft", status: "draft", org: "rawdraft", creator: "Raw Draft", rights: "To be decided", gameKind: "Simulation", template: true,
    short: "The structure for a role-based simulation with hidden information. No simulation is published here yet.", goals: ["anticipate", "decide"], areas: ["strategy", "policy"], formats: ["simulation", "roleplay"], level: "advanced",
    game: [["Objective", "What players are trying to achieve."], ["Roles", "Who plays which actor."], ["Environment", "The scenario and setting."], ["Rules", "What players can and cannot do."], ["Information given", "What every player receives."], ["Information hidden", "What only some roles hold."], ["Rounds", "The time each round represents."], ["Decision points", "Where players must commit."], ["Facilitator role", "Runs time, injects events, keeps the rules."], ["End condition", "When or how it ends."]], debrief: GDEB });
  add("workshop", "lego-strategy-workshop", "LEGO strategy workshop", Object.assign({}, RDX, { short: "A strategy session built on LEGO Serious Play. Placeholder record.", methodology: "lego-serious-play", formats: ["lego", "making"], incomplete: true, goals: ["align", "create"], areas: ["strategy"], level: "advanced" }));

  FW("swot", "SWOT", { attribution: "Common strategy practice. Origin disputed.", short: "Strengths, weaknesses, opportunities and threats on one page.", principle: "Separate what you control from what you do not.", goals: ["understand"], areas: ["strategy", "business"],
    steps: ["Strengths and weaknesses: internal.", "Opportunities and threats: external.", "Ask what each combination implies."], limitations: ["Easily becomes a list with no decision attached"] });
  FW("pestle", "PESTLE", { attribution: "Common strategy practice.", short: "Political, economic, social, technological, legal and environmental factors.", principle: "Scan the outside world in six directions so nothing obvious is missed.", goals: ["understand", "anticipate"], areas: ["strategy", "futures", "policy"],
    steps: ["List factors under each of the six headings.", "Mark the ones that would change your strategy.", "Turn those into questions or signals to watch."], limitations: ["Breadth without depth", "Dates quickly"] });

  PB("pb-strategy-offsite", "Run a Strategy Offsite", { short: "A one or two day offsite that ends in strategic choices and owned actions.", situation: "A leadership team needs to step back, agree direction and commit to priorities.", outcome: "Strategic choices, priority actions and named owners.",
    beforeYouStart: ["Interview each leader beforehand", "Agree who makes the final calls", "Share a short pre-read"], time: "1 to 2 days",
    sequence: [["Stakeholder interviews", "expert-interviews", "Collect views before the room.", "Interview notes", false, "Before"], ["Context setting", "hopes-and-concerns", "Open with expectations on the wall.", "Hopes and concerns", false, "Open"], ["Strategic landscape", "pestle", "Scan the outside world.", "Landscape map", false, "Explore"], ["Tensions and opportunities", "affinity-mapping", "Cluster what was heard.", "Named tensions", false, "Make sense"], ["Optional: tabletop game", "tabletop-strategy-game", "Play out choices before making them.", "Exposed assumptions", true, "Explore"], ["Strategic choices", "decision-criteria", "Agree criteria, then choose.", "Selected choices", false, "Decide"], ["Priority actions", "note-and-vote", "Pick what happens first.", "Priority actions", false, "Commit"], ["Owners and next steps", "what-so-what-now-what", "Reflect and assign.", "Owners and dates", false, "Close"]],
    skip: "The tabletop game is optional. Skip it if the team lacks a full day.", failures: ["Choices left as options", "No owners named before people leave"], goals: ["align", "decide", "plan"], areas: ["strategy", "organization"], sprints: ["decision-sprint"], resources: ["res-kaner", "res-gamestorming"] });

  R("res-ls", "Liberating Structures", { format: "Toolkit", creator: "Henri Lipmanowicz & Keith McCandless", org: "liberating", sourceUrl: "https://www.liberatingstructures.com", short: "The public collection of Liberating Structures.", level: "All", rights: "Check source for licence", tags: ["facilitation"], related: ["one-two-four-all", "what-so-what-now-what"] });

  // Operational detail. Raw Draft proposals, marked draft.
  Object.assign(I.find(x => x.id === "product-strategy-sprint"), {
    duration: "2 days (proposed)", level: "practiced",
    prereqs: { decider: "Required", research: "Helpful", customers: "Helpful", roles: ["Decider", "Product lead", "Design", "Engineering lead", "Someone who talks to customers"], prework: ["Founding hypothesis or brief, one page", "Any customer interview notes", "Current backlog or feature list"], space: "One room with two large walls, or one shared board" },
    before: [["What must be decided?", "What the first version includes, and what waits."], ["Who sponsors it?", "The person accountable for the product outcome."], ["Who is the Decider?", "One person. Confirm before day one."], ["What research should exist?", "At least a few customer conversations. If none, run a Research Sprint first."], ["What do participants receive?", "The one-page brief, two days before."], ["What does the facilitator prepare?", "Agenda, board, templates, timer, a parking lot."]],
    tools: { physical: ["Sticky notes", "Markers", "Dot stickers", "Timer", "Whiteboard"], digital: ["Miro or FigJam", "Google Docs"] },
    agenda: [
      { day: "Day 1", t: "00:00", name: "Set the question", mins: 15, purpose: "Agree what must be decided by the end of day two.", output: "Decision statement", detail: { facilitator: "State the decision and the Decider. Write the decision on the wall.", participants: "Listen, ask clarifying questions only.", say: "By the end of tomorrow we will have drawn the line around the first version. Everything outside it waits.", watch: "People debating solutions already. Park them.", close: "Read the decision statement out loud." } },
      { day: "Day 1", t: "00:15", name: "Restate the bet", mins: 45, ref: "jobs-to-be-done", purpose: "Write the product hypothesis.", output: "Product hypothesis" },
      { day: "Day 1", t: "01:00", name: "Map the critical workflow", mins: 90, ref: "customer-journey-map", purpose: "Find the one workflow that must be excellent.", output: "Critical workflow" },
      { day: "Day 1", t: "02:30", name: "Break", mins: 15 },
      { day: "Day 1", t: "02:45", name: "How might we", mins: 45, ref: "how-might-we", purpose: "Turn the workflow into opportunities.", output: "HMW questions" },
      { day: "Day 1", t: "03:30", name: "Close day one", mins: 15, purpose: "Confirm what changed. Name open questions.", output: "Open questions" },
      { day: "Day 2", t: "00:00", name: "Draw the MVP line", mins: 90, ref: "decision-criteria", purpose: "Decide what is in and what waits.", output: "MVP boundary and not-yet list", detail: { facilitator: "Agree criteria first, then sort features against them. Hand the final call to the Decider.", participants: "Score silently, then discuss the differences.", say: "If it does not help us learn whether the bet is right, it waits.", materials: ["Feature cards", "Dot stickers"], watch: "Every stakeholder's feature surviving. Make the not-yet list visible.", close: "Decider reads the boundary out loud." } },
      { day: "Day 2", t: "01:30", name: "Find the riskiest assumption", mins: 60, ref: "assumption-mapping", purpose: "Choose what the MVP must test first.", output: "Ranked assumptions" },
      { day: "Day 2", t: "02:30", name: "Write the test plan", mins: 60, purpose: "Define the first test and its kill criteria.", output: "Test plan" },
      { day: "Day 2", t: "03:30", name: "Roadmap direction", mins: 45, ref: "decision-matrix", purpose: "Sequence what follows if the test passes.", output: "Roadmap direction" },
      { day: "Day 2", t: "04:15", name: "Owners and close", mins: 15, ref: "what-so-what-now-what", purpose: "Name owners and dates.", output: "Action list" }],
    facilitatorNotes: ["Never skip agreeing criteria before scoring features.", "The not-yet list can be shortened. The kill criteria cannot.", "If the customer is disputed in the first hour, stop. Run a Foundation Sprint instead.", "Give quieter people the pen during the boundary exercise."],
    failuresX: [{ p: "The group votes on features before agreeing criteria.", why: "Voting is used as a shortcut to deciding.", what: "Stop. Agree criteria, then return to the features." }, { p: "The MVP keeps growing.", why: "Nobody owns the no.", what: "Ask the Decider to confirm every addition out loud." }],
    variations: [["Remote", "Run as four half-days on a shared board."], ["Low time", "One day: skip the roadmap step and shorten the workflow map."], ["Executive team", "Decider joins Set the question, Draw the MVP line and close only."]],
    afterSession: { document: ["Decision statement", "MVP boundary and not-yet list", "Test plan"], h24: ["Share the boundary and test plan with everyone who attended"], week: ["Start the first test", "Decider confirms owners"], next: ["design-sprint", "concept-testing"] },
    assets: [{ title: "Facilitator run sheet", format: "PDF", mode: "rawdraft", status: "planned" }, { title: "MVP boundary board", format: "Miro", mode: "board", platform: "Miro", viewUrl: null, duplicateUrl: null, status: "planned" }, { title: "Participant pre-read", format: "Doc", mode: "rawdraft", status: "planned" }]
  });
  Object.assign(I.find(x => x.id === "decision-workshop"), {
    level: "first", prereqs: { decider: "Required", research: "Helpful", customers: "None", roles: ["Decider", "People affected by the decision"], prework: ["One paragraph describing the decision"] },
    tools: { physical: ["Sticky notes", "Markers", "Dot stickers", "Timer"], digital: ["Miro or FigJam"] },
    agenda: [
      { t: "00:00", name: "Set the question", mins: 10, purpose: "Agree what must be decided.", output: "Decision statement", detail: { say: "Today we leave with one decision, recorded, with an owner.", watch: "Two decisions hiding in one question.", close: "Write the decision statement where everyone can see it." } },
      { t: "00:10", name: "Silent input", mins: 15, ref: "silent-ideation", purpose: "Collect individual perspectives before discussion.", output: "Raw inputs", detail: { say: "We are going to work individually first. Write one idea per note.", materials: ["Sticky notes", "Markers"] } },
      { t: "00:25", name: "Options", mins: 25, purpose: "Turn inputs into explicit options, including doing nothing.", output: "Option set" },
      { t: "00:50", name: "Criteria", mins: 20, ref: "decision-criteria", purpose: "Agree what a good choice looks like.", output: "Weighted criteria" },
      { t: "01:10", name: "Score and discuss", mins: 30, ref: "decision-matrix", purpose: "Compare options against criteria.", output: "Scored options" },
      { t: "01:40", name: "Decide", mins: 15, ref: "note-and-vote", purpose: "The Decider decides.", output: "Decision" },
      { t: "01:55", name: "Record and close", mins: 15, purpose: "Write the decision, rationale and owner.", output: "Decision record" }],
    facilitatorNotes: ["Confirm the Decider before you book the room.", "If criteria cannot be agreed, the decision is not ready. Say so."],
    afterSession: { document: ["Decision record"], h24: ["Send the decision record to everyone affected"], next: ["decision-sprint"] },
    assets: [{ title: "Decision record template", format: "Doc", mode: "rawdraft", status: "planned" }, { title: "Decision workshop board", format: "FigJam", mode: "board", platform: "FigJam", viewUrl: null, duplicateUrl: null, status: "planned" }]
  });

  // Session metadata: [stage, time, sizes, facilitator level, formats, delivery]
  const META = {
    "note-and-vote": ["decide", "15", ["2-4", "5-8", "9-15"], "first", ["writing"]], "how-might-we": ["explore", "30", ["2-4", "5-8", "9-15"], "first", ["writing"]],
    "crazy-8s": ["create", "15", ["2-4", "5-8", "9-15"], "first", ["writing", "prototyping"]], "lightning-demos": ["explore", "60", ["2-4", "5-8"], "first", ["discussion", "digital"]],
    "affinity-mapping": ["makesense", "60", ["2-4", "5-8", "9-15"], "first", ["mapping"]], "dot-voting": ["decide", "5", ["5-8", "9-15", "16-30"], "first", ["mapping"]],
    "expert-interviews": ["explore", "60", ["2-4", "5-8"], "practiced", ["discussion"]], "five-act-interview": ["explore", "60", ["2-4"], "practiced", ["field"]],
    "concept-testing": ["decide", "variable", ["2-4"], "practiced", ["field"]], "rapid-prototyping": ["create", "full", ["2-4", "5-8"], "practiced", ["prototyping"]],
    "assumption-ranking": ["makesense", "30", ["2-4", "5-8"], "first", ["writing"]], "silent-ideation": ["create", "15", ["2-4", "5-8", "9-15", "16-30"], "first", ["writing"]],
    "structured-critique": ["decide", "60", ["5-8"], "practiced", ["mapping"]], "decision-criteria": ["decide", "30", ["2-4", "5-8"], "practiced", ["discussion", "writing"]],
    "horizon-scanning": ["explore", "variable", ["solo", "2-4"], "practiced", ["field"]], "signal-collection": ["explore", "variable", ["solo", "2-4", "5-8"], "first", ["field", "writing"]],
    "signal-clustering": ["makesense", "60", ["5-8", "9-15"], "practiced", ["mapping"]], "wind-tunnelling": ["decide", "90", ["5-8", "9-15"], "advanced", ["discussion"]],
    "future-persona": ["create", "60", ["5-8"], "practiced", ["writing"]], "speculative-artifact": ["create", "90", ["5-8", "9-15"], "practiced", ["making"]],
    "one-two-four-all": ["explore", "15", ["5-8", "9-15", "16-30", "30+"], "first", ["discussion"]],
    "one-word-check-in": ["open", "5", ["2-4", "5-8", "9-15"], "first", ["discussion"]], "hopes-and-concerns": ["open", "15", ["5-8", "9-15"], "first", ["writing"]], "welcome-and-framing": ["open", "15", ["2-4", "5-8", "9-15", "16-30"], "first", ["discussion"]], "evidence-review": ["explore", "30", ["2-4", "5-8", "9-15"], "first", ["discussion"]], "gallery-walk": ["decide", "15", ["5-8", "9-15", "16-30"], "first", ["mapping"]], "next-actions": ["commit", "15", ["2-4", "5-8", "9-15"], "first", ["discussion"]],
    "object-show-and-tell": ["open", "15", ["2-4", "5-8"], "first", ["discussion"], "Remote"], "count-to-twenty": ["energise", "5", ["5-8", "9-15"], "first", ["discussion"]],
    "stand-and-sort": ["energise", "5", ["9-15", "16-30"], "first", ["discussion"], "In person"], "what-so-what-now-what": ["reflect", "30", ["5-8", "9-15", "16-30"], "first", ["discussion"]],
    "rose-bud-thorn": ["close", "15", ["2-4", "5-8", "9-15"], "first", ["writing"]],
    "positioning-workshop": ["explore", "90", ["5-8"], "practiced", ["mapping", "discussion"]], "assumption-mapping-workshop": ["makesense", "90", ["5-8", "9-15"], "first", ["mapping"]],
    "ai-opportunity-workshop": ["explore", "half", ["5-8", "9-15"], "practiced", ["mapping", "discussion"]], "future-scenarios-workshop": ["explore", "half", ["9-15"], "advanced", ["mapping", "discussion"]],
    "customer-journey-workshop": ["makesense", "half", ["5-8", "9-15"], "practiced", ["mapping"]], "decision-workshop": ["decide", "half", ["2-4", "5-8"], "first", ["writing", "discussion"]],
    "lego-strategy-workshop": ["explore", "full", ["5-8"], "advanced", ["lego", "making"], "In person"],
    "assumption-mapping": ["makesense"], "opportunity-mapping": ["makesense"], "stakeholder-mapping": ["explore"], "ecosystem-mapping": ["explore"], "customer-journey-map": ["makesense"],
    "service-blueprint": ["makesense"], "jobs-to-be-done": ["explore"], "dfv": ["decide"], "decision-matrix": ["decide"], "competitive-alternatives": ["explore"], "value-proposition": ["create"],
    "systems-map": ["makesense"], "risk-map": ["decide"], "scenario-matrix": ["create"], "futures-wheel": ["explore"], "backcasting": ["commit"], "swot": ["makesense"], "pestle": ["explore"],
    "tabletop-strategy-game": ["explore", "half", ["5-8", "9-15", "16-30"], "advanced", ["tabletop", "game", "cards"], "In person"],
    "scenario-simulation": ["explore", "half", ["9-15", "16-30"], "advanced", ["simulation", "roleplay"], "In person"]
  };
  const GOALMAP = { discover: "explore", design: "create", facilitate: "start" };
  I.forEach(it => {
    const m = META[it.id] || [];
    it.goals = [...new Set((it.goals || []).map(g => GOALMAP[g] || g))];
    it.stage = it.stage || m[0] || null;
    it.time = it.time && typeof it.time === "string" && it.type === "playbook" ? it.time : it.time;
    it.timeKey = m[1] || (it.type === "sprint" ? "multi" : it.type === "resource" || it.type === "methodology" ? null : "variable");
    it.sizes = m[2] || (it.type === "resource" || it.type === "methodology" ? [] : ["variable"]);
    it.level = it.level || m[3] || (it.type === "sprint" ? "practiced" : it.type === "framework" ? "first" : "practiced");
    it.formats = it.formats || m[4] || [];
    it.delivery = m[5] || it.format || (it.type === "resource" ? null : "In person or remote");
    if (it.failures && !it.failuresX) it.failuresX = null;
  });

  // Why It Works: applied work. All current entries are DEMO placeholders for layout. No client names, dates, outcomes or metrics.
  const work = [
    { id: "enterprise-ai-platform", title: "Enterprise AI Platform", descriptor: "Agent workflow strategy for a platform team", date: null, type: "Project Note", sector: "AI / Enterprise", clientName: null, anonymous: true,
      question: "Where should agents actually enter the workflow?", context: null, constraints: [], approach: null, decisions: null,
      artifacts: [{ kind: "Workflow map", caption: "Placeholder. Shows where each agent would act and where a person keeps control." }, { kind: "Agent fit matrix", caption: "Placeholder. Workflows scored on reversibility, data access and exposure." }],
      whatHappened: null, whatIWouldChange: null, cover: null, gallery: [],
      relatedSprints: ["ai-product-strategy-sprint"], relatedMethods: ["note-and-vote"], relatedFrameworks: ["opportunity-mapping", "risk-map", "decision-rights"], relatedPlaybooks: ["pb-ai-opportunities"], relatedNotes: ["ai-prototyping-cheap"], confidentiality: "Anonymised", status: "demo" },
    { id: "public-digital-service", title: "Public Sector Digital Service", descriptor: "Service redesign across frontstage and backstage", date: null, type: "Method in Practice", sector: "Public Sector / Service Design", clientName: null, anonymous: true,
      question: "How do you simplify a service used by very different kinds of people?", context: null, constraints: [], approach: null, decisions: null,
      artifacts: [{ kind: "Service blueprint", caption: "Placeholder. Current state, mapped with frontline staff." }, { kind: "Journey comparison", caption: "Placeholder. Three user types through the same service." }],
      whatHappened: null, whatIWouldChange: null, cover: null, gallery: [],
      relatedSprints: ["service-design-sprint"], relatedMethods: [], relatedFrameworks: ["service-blueprint", "ecosystem-mapping", "customer-journey-map"], relatedPlaybooks: ["pb-rethink-cx"], relatedNotes: ["workshops-fail-before"], confidentiality: "Anonymised", status: "demo" },
    { id: "early-stage-b2b", title: "Early-Stage B2B SaaS", descriptor: "Customer and MVP definition for a seed-stage team", date: null, type: "Sprint Note", sector: "B2B Software", clientName: null, anonymous: true,
      question: "Who is this actually for?", context: null, constraints: [], approach: null, decisions: null,
      artifacts: [{ kind: "Founding hypothesis", caption: "Placeholder. One page, written on day two." }, { kind: "MVP boundary", caption: "Placeholder. What is in, and the longer list of what waits." }],
      whatHappened: null, whatIWouldChange: null, cover: null, gallery: [],
      relatedSprints: ["foundation-sprint", "product-strategy-sprint"], relatedMethods: ["concept-testing"], relatedFrameworks: ["assumption-mapping"], relatedPlaybooks: ["pb-define-mvp"], relatedNotes: ["idea-too-vague"], confidentiality: "Anonymised", status: "demo" },
    { id: "global-fs-product", title: "Global Financial Services Product", descriptor: "A rebuild, extend or retire decision", date: null, type: "Decision", sector: "Financial Services", clientName: null, anonymous: true,
      question: "Rebuild, extend or retire?", context: null, constraints: [], approach: null, decisions: null,
      artifacts: [{ kind: "Decision record", caption: "Placeholder. Options, weighted criteria and the call." }],
      whatHappened: null, whatIWouldChange: null, cover: null, gallery: [],
      relatedSprints: ["decision-sprint"], relatedMethods: ["decision-criteria"], relatedFrameworks: ["decision-matrix"], relatedPlaybooks: ["pb-leadership-agree"], relatedNotes: [], confidentiality: "Anonymised", status: "demo" }
  ];

  // Notes: writing and research. Current entries are DRAFT placeholders.
  const notes = [
    { id: "workshops-fail-before", title: "Why workshops fail before they begin", date: "2026-10-03", topic: "Facilitation", dek: "Most problems are visible in the invitation.", status: "draft", cover: null, images: [],
      body: ["A session that goes badly usually went wrong earlier. The outcome was never written down. The person who can decide was not invited. The room had the people who were available, not the people who were needed.", "Fix those three things and most exercises work. Skip them and no exercise will save the session."],
      relatedSprints: ["decision-sprint"], relatedFrameworks: ["decision-rights", "facilitation-principles"], relatedMethods: [], relatedWork: ["public-digital-service"], sourceLinks: [] },
    { id: "ai-prototyping-cheap", title: "AI makes prototyping cheap. Deciding what to prototype is still expensive.", date: "2026-09-27", topic: "Product / AI", dek: "Speed moves the bottleneck to choosing.", status: "draft", cover: null, images: [],
      body: ["A team can now make five prototypes in the time one used to take. That does not tell them which question the prototype should answer.", "The scarce work is choosing the assumption worth testing. That still needs evidence, a decider and a clear kill condition."],
      relatedSprints: ["ai-product-strategy-sprint", "design-sprint"], relatedFrameworks: ["assumption-mapping"], relatedMethods: ["rapid-prototyping"], relatedWork: ["enterprise-ai-platform"], sourceLinks: [] },
    { id: "signals-not-trends", title: "Signals are not trends", date: "2026-09-18", topic: "Futures", dek: "A signal is evidence. A trend is an interpretation.", status: "draft", cover: null, images: [],
      body: ["A signal is a concrete thing you can point to: a product, a policy, a behaviour, with a source and a date. A trend is a story told about many signals.", "Collect signals first. Name trends later, and expect to be wrong about some of them."],
      relatedSprints: ["foresight-sprint"], relatedFrameworks: [], relatedMethods: ["signal-collection", "signal-clustering", "horizon-scanning"], relatedWork: [], sourceLinks: [{ title: "Institute for the Future", publisher: "IFTF", url: "https://www.iftf.org" }] },
    { id: "idea-too-vague", title: "How to know when an idea is still too vague", date: "2026-09-09", topic: "Strategy", dek: "If nothing could prove it wrong, it is not ready.", status: "draft", cover: null, images: [],
      body: ["Try writing the idea as a hypothesis: who it is for, what problem it solves, why they would choose it over what they do today.", "If the team cannot agree on each part, or if no result could disprove it, the idea needs another draft before it needs a build."],
      relatedSprints: ["foundation-sprint"], relatedFrameworks: ["assumption-mapping"], relatedMethods: [], relatedWork: ["early-stage-b2b"], sourceLinks: [] }
  ];

  const futures = [
    { k: "SENSE", d: "Notice change early.", topics: ["Signals", "Weak signals", "Trends", "Drivers", "Horizon scanning"], ids: ["horizon-scanning", "signal-collection", "res-iftf", "res-horizons"] },
    { k: "INTERPRET", d: "Make sense of it.", topics: ["Systems", "Patterns", "Uncertainties", "Culture", "Implications"], ids: ["signal-clustering", "systems-map", "futures-wheel"] },
    { k: "IMAGINE", d: "Widen what seems possible.", topics: ["Alternative futures", "Scenarios", "Preferred futures", "Future personas", "Speculative artifacts"], ids: ["scenario-matrix", "future-persona", "speculative-artifact", "res-unesco"] },
    { k: "DECIDE", d: "Bring it back to today's choices.", topics: ["Wind tunnelling", "Opportunity spaces", "Strategic implications", "No-regret moves"], ids: ["wind-tunnelling", "opportunity-mapping", "future-scenarios-workshop"] },
    { k: "ACT", d: "Move, and keep watching.", topics: ["Backcasting", "Strategic bets", "Experiments", "Indicators"], ids: ["backcasting", "attempt-loop", "pb-future-category"] }
  ];

  const facilitation = [
    { k: "START", lessons: ["What facilitation is", "Role of facilitator", "Outcomes", "Participants", "Decision rights"], ids: ["decision-rights", "facilitation-principles"] },
    { k: "DESIGN", lessons: ["Workshop structure", "Choosing methods", "Sequencing", "Timing", "Preparation", "Remote / room setup"], ids: ["decision-workshop", "res-sessionlab"] },
    { k: "RUN", lessons: ["Instructions", "Timeboxing", "Participation", "Divergence", "Convergence", "Voting", "Decision closure"], ids: ["silent-ideation", "dot-voting", "note-and-vote"] },
    { k: "WHEN THINGS GO WRONG", lessons: ["Dominant participants", "Silence", "Conflict", "Executives", "Unclear authority", "Remote fatigue"], ids: ["structured-critique", "res-kaner"] },
    { k: "SPECIALISE", lessons: ["Strategy", "Product", "Brand", "Research", "Futures", "Service Design"], ids: ["decision-sprint", "design-sprint", "brand-strategy-sprint", "research-sprint", "foresight-sprint", "service-design-sprint"] },
    { k: "GO DEEPER", lessons: ["Books", "Courses", "Certifications", "Communities", "Practitioners"], ids: ["res-kaner", "res-gathering", "res-ajsmart", "res-iaf", "res-futuresfriends"] }
  ];

  const principles = [
    ["A decider exists", "Important decisions need explicit authority. Name the person before the session, not during it."],
    ["Evidence beats opinion", "Ask: how do we know? Label claims as evidence or assumption."],
    ["Every exercise creates something", "A decision, evidence, an artifact or a next action. If not, cut the exercise."],
    ["Gates are real", "Do not continue simply because the agenda says so. Stop, loop back or kill."],
    ["Time is a constraint", "Use visible timeboxes. Running over is a decision, made openly."],
    ["Participation is work", "Relevant people need to be present and doing, not observing."],
    ["Facilitator owns process", "The decision-maker owns the decision. Do not swap roles."]
  ];

  // visualReference: card artwork type for rd-visual.js. Unmapped records fall back by type/format in rd-lib.
  const VIS = {"foundation-sprint":"single_sticky","product-strategy-sprint":"sticky_funnel","design-sprint":"paper_sketches","opportunity-sprint":"sticky_tree","research-sprint":"sticky_cluster","ai-product-strategy-sprint":"system_loops","foresight-sprint":"signal_constellation","futures-thinking-sprint":"sticky_timeline","scenario-sprint":"sticky_matrix","service-design-sprint":"sticky_layers","experience-strategy-sprint":"sticky_sequence","decision-sprint":"sticky_vote","positioning-sprint":"sticky_matrix","brand-strategy-sprint":"single_sticky","gtm-sprint":"sticky_map","note-and-vote":"sticky_vote","affinity-mapping":"sticky_cluster","assumption-mapping":"sticky_matrix","opportunity-mapping":"sticky_cluster","stakeholder-mapping":"sticky_map","ecosystem-mapping":"sticky_map","customer-journey-map":"sticky_sequence","service-blueprint":"sticky_layers","crazy-8s":"paper_sketches","how-might-we":"single_sticky","jobs-to-be-done":"single_sticky","horizon-scanning":"signal_constellation","scenario-matrix":"sticky_matrix","futures-wheel":"signal_constellation","backcasting":["sticky_timeline","reverse"],"lego-serious-play":"lego_blocks_abstract","lego-strategy-workshop":"lego_blocks_abstract","tabletop-strategy-game":"tokens_board","scenario-simulation":"tokens_board","liberating-structures":"plain_type","gamestorming":"cards_deck","signal-collection":"sticky_scatter","signal-clustering":"sticky_cluster","systems-map":"system_loops","kill-risk":"sticky_funnel","attempt-loop":"sticky_orbits","decision-matrix":"sticky_matrix","competitive-alternatives":"sticky_map","rapid-prototyping":"paper_sketches","concept-testing":"paper_sketches","dot-voting":"sticky_vote","decision-workshop":"sticky_vote","ai-opportunity-workshop":"sticky_map","future-scenarios-workshop":"sticky_matrix","customer-journey-workshop":"sticky_sequence","assumption-mapping-workshop":"sticky_matrix","positioning-workshop":"sticky_matrix","strategic-foresight":"signal_constellation","scenario-planning":"sticky_matrix","service-design":"sticky_layers","design-thinking":"plain_type","pb-define-mvp":"sticky_funnel","pb-strategy-offsite":"sticky_sequence","pb-future-category":["sticky_timeline","horizons"],"res-horizons":["sticky_timeline","horizons"],"pb-ai-opportunities":"sticky_map","pb-leadership-agree":"sticky_vote"};
  I.forEach(it => { const v = VIS[it.id]; if (v) { it.visualReference = Array.isArray(v) ? v[0] : v; if (Array.isArray(v)) it.visualVariant = v[1]; } });
  const TOPICS = {"enterprise-ai-platform":[["AI","Product"],"Project"],"public-digital-service":[["Experience","Research"],"Project"],"early-stage-b2b":[["Product","Strategy"],"Project"],"global-fs-product":[["Strategy","Business"],"Decision"]}, NTOPICS = {"workshops-fail-before":[["Facilitation"],"Essay"],"ai-prototyping-cheap":[["Product","AI"],"Essay"],"signals-not-trends":[["Futures"],"Observation"],"idea-too-vague":[["Strategy"],"Guide"]};
  work.forEach(w => { const t = TOPICS[w.id] || [[], "Project"]; w.topics = t[0]; w.format = t[1]; });
  notes.forEach(n => { const t = NTOPICS[n.id] || [[n.topic], "Essay"]; n.topics = t[0]; n.format = t[1]; });
  // Prompt assets: copy into any agent. Raw Draft does not run them. status: draft until tested.
  const prompts = [
    { id: "prompt-prepare-sprint", title: "Prepare this sprint", status: "draft", author: "Raw Draft", related: ["product-strategy-sprint", "foundation-sprint"],
      purpose: "Turn your situation into a sprint brief, a participant list and pre-work.", when: "One to two weeks before the sprint, once the Decider is confirmed.",
      context: ["The decision the sprint must produce", "Who the customer is, as far as you know", "What research already exists", "Who could attend and their roles", "Dates and format"],
      prompt: "You are helping me prepare a strategy sprint.\n\nSprint: [SPRINT NAME]\nDecision it must produce: [DECISION]\nCustomer: [WHO]\nExisting research: [SUMMARY OR NONE]\nPossible participants and roles: [LIST]\nDates and format: [IN PERSON / REMOTE, DATES]\n\n1. Rewrite the decision as one sentence a Decider could say yes or no to.\n2. List the roles that must be in the room and flag any that are missing.\n3. List the material participants should read beforehand, in priority order.\n4. Write a short pre-work request for participants, under 150 words.\n5. List the three assumptions most likely to derail the sprint.\n\nAsk me questions before answering if anything above is unclear.",
      output: "A one-line decision, a participant gap list, a pre-read list, a pre-work message and three risks.", verify: ["The Decider named is the person who can actually decide", "Pre-work is short enough that people will do it", "Nothing in the brief assumes research you do not have"] },
    { id: "prompt-agenda", title: "Turn my context into a workshop agenda", status: "draft", author: "Raw Draft", related: ["decision-workshop", "pb-strategy-offsite"],
      purpose: "Draft a timed agenda from the outcome, group and time available.", when: "When you know the outcome and the time, but not the structure.",
      context: ["The outcome the session must produce", "Group size and roles", "Total time", "Remote or in person"],
      prompt: "Draft a facilitated workshop agenda.\n\nOutcome required: [WHAT MUST EXIST AT THE END]\nGroup: [NUMBER] people, roles: [ROLES]\nTime: [DURATION]\nFormat: [IN PERSON / REMOTE]\n\nUse the arc Open, Explore, Make sense, Create, Decide, Commit, Close. For each block give: start time, activity, purpose, duration, output. Prefer silent individual work before discussion. End with named owners. Keep at least 10% of the time unallocated.",
      output: "A timed agenda table with an output for every block.", verify: ["Timings add up to the time available", "There is a real decision step, not only discussion", "Activities named exist and suit the group size"] },
    { id: "prompt-synthesise", title: "Synthesise workshop notes", status: "draft", author: "Raw Draft", related: ["decision-workshop", "affinity-mapping"],
      purpose: "Turn raw notes or board exports into decisions, open questions and owners.", when: "Within 24 hours of the session.",
      context: ["Raw notes or a board export", "The outcome the session was meant to produce"],
      prompt: "Here are raw notes from a workshop. The session was meant to produce: [OUTCOME].\n\n[PASTE NOTES]\n\nReturn:\n1. Decisions made, quoting the evidence for each.\n2. Open questions, with who raised them.\n3. Actions with owners and dates where stated. Mark missing owners clearly.\n4. Anything that contradicts the stated outcome.\nDo not invent decisions that are not in the notes.",
      output: "A short decision record, open questions and an action list.", verify: ["Every decision listed was actually made in the room", "Owners match what people agreed to"] }
  ];
  const cases = work.map(w => Object.assign({}, w, { label: w.title, kind: w.type, q: w.question, methods: [].concat(w.relatedSprints, w.relatedFrameworks, w.relatedMethods) }));
  notes.forEach(n => { n.read = ""; n.related = [].concat(n.relatedSprints, n.relatedFrameworks, n.relatedMethods); });
  window.RD = { sources, items: I, work, cases, notes, futures, facilitation, principles, prompts, links: { linkedin: null, substack: null } };
})();
