---
title: Raw Draft Library — Master Resource Backlog
version: 0.1
date: 2026-10-04
owner: Raw Draft Strategy
status: Working research inventory
---

# Raw Draft Library — Master Resource Backlog

This is the master backlog for the Raw Draft Library. It is deliberately broader than the first public release.

The goal is to give Raw Draft a deep inventory of Sprints, workshops, frameworks, activities, icebreakers, serious games, methodologies, books, courses, boards, templates, downloadable assets and agent prompts, while keeping the public Library curated and easy to navigate.

## How to use this file

For every candidate resource, decide:

1. Is it a first-class Library page?
2. Is it a curated external resource?
3. Is it something Raw Draft should recreate as an original worksheet or board?
4. Can Raw Draft legally redistribute it?
5. Should it have a Miro or FigJam board?
6. Should it include a downloadable PDF?
7. Should it include an agent prompt?
8. Does it belong inside a Sprint, Workshop or Playbook?
9. Should its card use a sticky-note visual reference?

## Publishing states

- **RAW DRAFT**: original Raw Draft material.
- **ADAPTED**: Raw Draft adaptation of a known method, with source.
- **EXTERNAL**: created by another practitioner or organization.
- **OBSERVED**: known to exist, but not enough public methodology to publish a recipe.
- **PRIVATE RESEARCH**: useful internally, but not suitable to reproduce publicly.

## Public treatment

- **FULL GUIDE**: publish full instructions.
- **SUMMARY + SOURCE**: explain what it is, when to use it, Raw Draft commentary, then link to the source.
- **LINK ONLY**: title + annotation + canonical external link.
- **PRIVATE**: research only.

## Rights rule

Do not rehost copyrighted PDFs, paid decks, books, courses, commercial cards or templates without permission. Prefer original summaries and canonical source links. Record creator, source URL, licence, reproduction status and last-verified date.

---

# Card visual system

Use original abstract workshop-artifact visuals rather than screenshots of somebody else's Miro, FigJam, book or PDF.

Use generic **sticky-note** language and original vector shapes rather than copying branded Post-it® artwork.

Suggested `visual_reference` values:

| Visual | Use |
|---|---|
| `single_sticky` | question framing, assumption, prompt |
| `sticky_scatter` | divergence, ideation, Chaos |
| `sticky_cluster` | affinity mapping, synthesis |
| `sticky_vote` | Note and Vote, prioritisation |
| `sticky_matrix` | 2×2s, impact/effort, scenarios |
| `sticky_funnel` | convergence and selection |
| `sticky_sequence` | journeys, agendas, roadmaps |
| `sticky_tree` | opportunity solution trees |
| `sticky_map` | stakeholder/ecosystem mapping |
| `sticky_timeline` | futures, Three Horizons, roadmaps |
| `sticky_layers` | service blueprint |
| `sticky_orbits` | Raw Draft Cycle of Creation |
| `paper_sketches` | sketching, prototyping, storyboards |
| `cards_deck` | prompt cards, serious games, scenarios |
| `tokens_board` | tabletop games and simulations |
| `lego_blocks_abstract` | physical construction methods |
| `signal_constellation` | foresight, weak signals, culture |
| `system_loops` | systems thinking |
| `plain_type` | books, courses, theory-heavy methods |

Strong sticky-note candidates: Note and Vote, How Might We, Affinity Mapping, Assumption Mapping, Dot Voting, Impact/Effort, Magic Lenses, Opportunity Mapping, Stakeholder Mapping, Journey Mapping, Service Blueprint, Lightning Decision Jam, Brainwriting, Horizon Scanning, Signal Clustering, Driver Mapping, Scenario Matrix, Futures Wheel, Backcasting, retrospectives and workshop agendas.

Do not use sticky-note visuals for everything. Books, courses, methodologies, serious games and physical facilitation should get visuals that reflect how they actually work.

---

# Recommended CMS fields

```yaml
title:
slug:
type:
subtype:
origin:
creator:
organization:
source_url:
rights_status:
public_treatment:
last_verified:
one_line_purpose:
use_when:
avoid_when:
goals:
domains:
session_stage:
format:
duration:
group_size:
facilitator_level:
remote_friendly:
physical_materials:
digital_tools:
prerequisites:
outputs:
steps:
facilitator_notes:
failure_modes:
variations:
debrief:
after_session:
related_sprints:
related_workshops:
related_frameworks:
related_activities:
related_methodologies:
related_playbooks:
related_resources:
raw_draft_commentary:
raw_draft_assets:
external_assets:
agent_prompts:
visual_reference:
launch_priority:
content_status:
```

Priority:
- **P0** first serious release
- **P1** second wave
- **P2** useful expansion
- **P3** specialist
- **R** source hub/reference
- **PRIVATE** research only


# 1. Raw Draft original and owned resources

These can become the strongest Library resources because Raw Draft can publish full instructions, boards, downloads, failure modes and prompts.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Cycle of Creation: Creation → Chaos → Clarity → Cadence | Framework | Recursive model of emergence, uncertainty, structure and repeatability | Raw Draft | FULL GUIDE | sticky_orbits | P0 |
| Creation Gate | Framework | Decide whether an opportunity has enough shape to enter active exploration | Raw Draft | FULL GUIDE | single_sticky | P0 |
| Chaos Gate | Framework | Decide whether enough uncertainty has been exposed before converging | Raw Draft | FULL GUIDE | sticky_scatter | P0 |
| Kill-Risk Mapping | Framework | Identify assumptions capable of killing a direction | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Build Permissioning | Framework | Only build an artifact when it resolves meaningful uncertainty | Raw Draft | FULL GUIDE | sticky_funnel | P0 |
| Attempt Loop | Framework | Hypothesis → artifact → test → evidence → Keep / Modify / Kill | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Decision Rights | Framework | Name the decision owner and define how input becomes a decision | Raw Draft | FULL GUIDE | plain_type | P0 |
| Evidence Over Opinion | Facilitation principle | Make claims visible and ask how the group knows them | Raw Draft | FULL GUIDE | sticky_vote | P0 |
| Raw Draft Facilitation Rules | Methodology / principles | Decision owner, visible timing, evidence, gates, artifacts and facilitator role | Raw Draft | FULL GUIDE | plain_type | P0 |
| Foundation Workshop Worksheet | Workshop asset | Structured foundation session used internally | Raw Draft | Create public version | sticky_sequence | P0 |
| Facilitator Run Sheet | Asset | Timing, gates, instructions and outputs | Raw Draft | FULL GUIDE / DOWNLOAD | sticky_sequence | P0 |
| Workshop Brief | Asset | Question, outcome, participants, decision owner and constraints | Raw Draft | FULL GUIDE / DOWNLOAD | single_sticky | P0 |
| Participant Pre-read | Asset | Prepare people without excessive homework | Raw Draft | FULL GUIDE / DOWNLOAD | plain_type | P0 |
| Decision Log | Asset | Decision, rationale, assumptions, owner and next action | Raw Draft | FULL GUIDE / DOWNLOAD | sticky_vote | P0 |
| Experiment / Attempt Card | Asset | Hypothesis, artifact, test and pass/fail rule | Raw Draft | FULL GUIDE / DOWNLOAD | single_sticky | P0 |
| Evidence Map | Framework / asset | Map claims, evidence strength, gaps and confidence | Raw Draft | FULL GUIDE / DOWNLOAD | sticky_matrix | P0 |
| Workshop Summary Report | Asset | Document decisions, evidence, artifacts, unknowns and actions | Raw Draft | FULL GUIDE / DOWNLOAD | plain_type | P0 |
| Workshop Retrospective | Workshop | Improve the next cycle after a facilitated engagement | Raw Draft | FULL GUIDE | sticky_cluster | P1 |
| Research Question Canvas | Asset | Turn strategic uncertainty into answerable research questions | Raw Draft | FULL GUIDE / DOWNLOAD | single_sticky | P0 |
| Opportunity Map | Framework / board | Evidence → needs/tensions → opportunity areas → bets | Raw Draft | FULL GUIDE / BOARD | sticky_cluster | P0 |
| AI Opportunity Map | Framework / board | Workflow → tasks/decisions → AI leverage → human roles → controls | Raw Draft | FULL GUIDE / BOARD | sticky_map | P0 |
| Message Hierarchy | Framework | Proposition → supporting claims → proof → sequence | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Creative Brief | Asset | Translate strategy into usable creative direction | Raw Draft | FULL GUIDE / DOWNLOAD | plain_type | P0 |
| GTM Experiment Card | Asset | Segment, offer, message, channel, metric and decision rule | Raw Draft | FULL GUIDE / DOWNLOAD | single_sticky | P0 |

# 2. Sprints

Sprints are complete engagement architectures. External Sprints should be credited and summarized. Raw Draft Sprints can have complete agendas, prerequisites, facilitator guidance, boards and downloads.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Foundation Sprint | Sprint | Define customer, problem, differentiation and founding hypothesis | Character / Jake Knapp & John Zeratsky | SUMMARY + SOURCE | sticky_vote | P0 |
| Design Sprint | Sprint | Map, sketch, decide, prototype and test a critical idea | Jake Knapp / John Zeratsky / GV lineage | SUMMARY + SOURCE | paper_sketches | P0 |
| Name Sprint | Sprint | Define brand context, generate names, vote and vet | Character / Jake Knapp | SUMMARY + SOURCE | sticky_vote | P1 |
| Pitch Sprint | Sprint | Draft a fundraising deck narrative quickly | Character / Jake Knapp | SUMMARY + SOURCE | sticky_sequence | P1 |
| Message Sprint | Sprint | Clarify positioning/message in Character Labs | Character | OBSERVED | plain_type | P2 |
| Leads Sprint | Sprint | Make contact with real customers in a target market | Character | OBSERVED | plain_type | P2 |
| Demo Sprint | Sprint | Focus and differentiate what is being sold and shown | Character | OBSERVED | paper_sketches | P2 |
| Customer Sprint | Sprint | Test actual offer/product with real customers | Character | OBSERVED / SOURCE | plain_type | P1 |
| Risk Sprint | Sprint | Named Character Labs unit; methodology not public | Character | OBSERVED | sticky_matrix | P3 |
| Website Sprint | Sprint | Named Character Labs unit; methodology not public | Character | OBSERVED | paper_sketches | P3 |
| Sales Deck Sprint | Sprint | Named Character Labs unit; methodology not public | Character | OBSERVED | sticky_sequence | P3 |
| Sales Call Sprint | Sprint | Recurring live-customer thread inside Character Labs | Character | OBSERVED | plain_type | P2 |
| Marketing Sprint | Sprint | Named Character Labs unit; methodology not public | Character | OBSERVED | plain_type | P3 |
| Opportunity Sprint | Sprint | Narrow a broad space into prioritized opportunities and bets | Raw Draft version to author | FULL GUIDE | sticky_cluster | P0 |
| Research Sprint | Sprint | Generate evidence for a strategic/product/brand/experience decision | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Product Strategy Sprint | Sprint | Opportunity → product direction → workflow → MVP → assumptions | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Experience Strategy Sprint | Sprint | Define what an experience should become | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Service Design Sprint | Sprint | Connect customer experience with people, process, tech and operations | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Positioning Sprint | Sprint | Choose a clear position relative to alternatives | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Brand Strategy Sprint | Sprint | Define meaning, principles, personality, narrative and creative brief | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| AI Product Strategy Sprint | Sprint | Identify AI value, roles, controls and prototype direction | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Emerging Technology Sprint | Sprint | Explore what a new capability enables and where to act | Raw Draft | FULL GUIDE | signal_constellation | P1 |
| GTM Sprint | Sprint | Segment, use case, offer, message, channel and experiments | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Decision Sprint | Sprint | Frame a consequential decision, evaluate options and commit | Raw Draft | FULL GUIDE | sticky_vote | P0 |
| Foresight Sprint | Sprint | Understand external change, drivers, uncertainties and implications | Raw Draft | FULL GUIDE | signal_constellation | P0 |
| Futures Thinking Sprint | Sprint | Explore alternative/preferred futures, concepts and backcasts | Raw Draft | FULL GUIDE | signal_constellation | P0 |
| Scenario Sprint | Sprint | Stress-test a decision or strategy across plausible futures | Raw Draft | FULL GUIDE | sticky_matrix | P0 |

# 3. Core facilitation patterns

These are reusable interaction patterns that make workshops work.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Note and Vote | Activity / decision method | Independent thinking → silent sharing → voting → Decider | Character | SUMMARY + SOURCE | sticky_vote | P0 |
| 1-2-4-All | Liberating Structure | Include every voice while rapidly developing ideas | Liberating Structures | SUMMARY + SOURCE | sticky_cluster | P0 |
| TRIZ | Liberating Structure | Reveal counterproductive behaviours by designing failure on purpose | Liberating Structures | SUMMARY + SOURCE | sticky_cluster | P1 |
| What, So What, Now What? | Reflection structure | Move from facts to interpretation to action | Liberating Structures | SUMMARY + SOURCE | sticky_sequence | P0 |
| 15% Solutions | Liberating Structure | Identify actions possible without more authority/resources | Liberating Structures | SUMMARY + SOURCE | single_sticky | P1 |
| 25/10 Crowd Sourcing | Liberating Structure | Rapidly surface and rank bold ideas from a large group | Liberating Structures | SUMMARY + SOURCE | sticky_vote | P1 |
| Troika Consulting | Liberating Structure | Peer consulting in groups of three | Liberating Structures | SUMMARY + SOURCE | plain_type | P1 |
| Impromptu Networking | Liberating Structure / opener | Rapid paired exchanges around a purposeful prompt | Liberating Structures | SUMMARY + SOURCE | plain_type | P1 |
| Nine Whys | Liberating Structure | Clarify deeper purpose | Liberating Structures | SUMMARY + SOURCE | sticky_sequence | P1 |
| Wicked Questions | Liberating Structure | Frame paradoxical tensions that must be held together | Liberating Structures | SUMMARY + SOURCE | single_sticky | P1 |
| Agreement-Certainty Matrix | Liberating Structure | Choose approaches based on agreement and certainty | Liberating Structures | SUMMARY + SOURCE | sticky_matrix | P1 |
| Ecocycle Planning | Liberating Structure | Map birth, maturity, creative destruction and renewal | Liberating Structures | SUMMARY + SOURCE | system_loops | P1 |
| Purpose-to-Practice | Liberating Structure | Design purpose, principles, participants, structure and practices | Liberating Structures | SUMMARY + SOURCE | sticky_sequence | P1 |
| Conversation Café | Dialogue method | Structured discussion balancing participation | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| User Experience Fishbowl | Listening format | Users/frontline participants share while others listen | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| Min Specs | Liberating Structure | Identify the minimum essential rules/constraints | Liberating Structures | SUMMARY + SOURCE | sticky_funnel | P1 |
| Appreciative Interviews | Inquiry activity | Discover conditions behind past success | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| World Café | Facilitation methodology | Rotating small-group conversations around important questions | World Café community | SUMMARY + SOURCE | plain_type | P1 |
| Open Space Technology | Facilitation methodology | Participant-created agenda for complex topics | Harrison Owen / Open Space community | SUMMARY + SOURCE | plain_type | P1 |
| Lean Coffee | Meeting format | Build and prioritize an agenda collaboratively | Lean Coffee community | SUMMARY + SOURCE | sticky_vote | P1 |
| Fishbowl Discussion | Discussion format | Small inner discussion observed by larger group | Multiple traditions | RAW DRAFT guide with sources | plain_type | P1 |
| ORID / Focused Conversation | Framework | Objective → Reflective → Interpretive → Decisional | ICA / Technology of Participation | SUMMARY + SOURCE | sticky_sequence | P1 |
| Consensus Workshop Method | Facilitation methodology | Generate, cluster, name and resolve ideas | ICA / Technology of Participation | SUMMARY + SOURCE | sticky_cluster | P1 |
| Parking Lot | Technique | Capture important off-topic items without derailing the session | Common facilitation practice | RAW DRAFT guide | single_sticky | P0 |
| Fist to Five | Alignment technique | Quickly gauge support/confidence | Common facilitation practice | RAW DRAFT guide with provenance | plain_type | P2 |
| Timeboxing | Technique | Maintain energy and focus using visible constraints | Common practice | RAW DRAFT guide | plain_type | P0 |
| Silent Ideation | Activity | Generate input before group influence appears | Common practice | RAW DRAFT guide | sticky_scatter | P0 |
| Structured Critique | Activity | Collect specific feedback using agreed criteria | Design/facilitation practice | RAW DRAFT guide | sticky_cluster | P0 |
| Gallery Walk / Art Museum | Activity | Review many outputs silently before discussion | Design Sprint / broader practice | SUMMARY + SOURCE | paper_sketches | P0 |
| Breakouts + Report Back | Activity pattern | Parallelize discussion and synthesis | Common practice | RAW DRAFT guide | sticky_cluster | P0 |

# 4. Icebreakers, check-ins and energisers

Keep these separate from strategy frameworks. Someone looking for a 5-minute opener should not have to browse full Sprints.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| One-word check-in | Icebreaker / check-in | Give everyone an immediate voice with low cognitive load | Common practice | RAW DRAFT guide | single_sticky | P0 |
| Weather Report check-in | Check-in | Describe current state as weather | Common facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Stinky Fish | Icebreaker / disclosure | Surface something participants are carrying but not saying | Hyper Island; Miro has template | SUMMARY + SOURCE | paper_sketches | P1 |
| Impromptu Networking | Icebreaker / networking | Rapid purposeful paired exchanges | Liberating Structures | SUMMARY + SOURCE | plain_type | P0 |
| Draw Your Character | Icebreaker | Use a quick drawing for introductions | Miro community example | LINK / adapted guide | paper_sketches | P2 |
| Personal Map | Icebreaker / connection | Share personal context visually | Management 3.0 / broader use | SUMMARY + SOURCE | sticky_map | P2 |
| Two Truths and a Lie | Icebreaker | Light social introduction | Common game | RAW DRAFT guide; use selectively | plain_type | P3 |
| Commonalities | Icebreaker | Find unexpected things people share | Common practice | RAW DRAFT guide | sticky_cluster | P1 |
| Story of Your Name | Icebreaker | Introduce identity through a name story | Common practice | RAW DRAFT guide | plain_type | P2 |
| Object Introduction | Icebreaker | Use an object as a prompt for introduction | Common practice | RAW DRAFT guide | plain_type | P2 |
| Human Spectrogram | Icebreaker / opinion mapping | Physically position along a continuum | Participatory practice | RAW DRAFT guide with sources | sticky_matrix | P2 |
| Constellations | Spatial activity | Position people in space around a question | Facilitation practice | RAW DRAFT guide | sticky_map | P2 |
| Paired Interviews | Icebreaker | Partners interview and introduce one another | Common practice | RAW DRAFT guide | plain_type | P1 |
| Check-in Question Bank | Resource | Questions grouped by room purpose and risk | Raw Draft | FULL GUIDE / DOWNLOAD | cards_deck | P0 |
| Workshop Energizer Bank | Resource | Activities grouped by energy, movement and remote suitability | Raw Draft | FULL GUIDE / DOWNLOAD | cards_deck | P1 |
| Walk and Talk | Energiser / reflection | Pair movement with reflection | Common practice | RAW DRAFT guide | plain_type | P1 |
| Stretch / movement reset | Energiser | Restore physical energy between cognitive blocks | Common practice | RAW DRAFT guide | plain_type | P1 |
| Silent reset | Reset | Lower energy and restore attention | Common practice | RAW DRAFT guide | plain_type | P2 |

# 5. Framing, prioritisation and decision-making

These should be easy to browse by the intents Decide and Prioritise.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| 5 Whys | Framework / activity | Explore possible root causes through repeated why questions | Lean / Toyota lineage | SUMMARY + SOURCE | sticky_sequence | P0 |
| Problem Tree Analysis | Framework | Map causes, central problem and effects | Development / LUMA | SUMMARY + SOURCE | sticky_tree | P1 |
| Abstraction Laddering | Framework | Move between concrete and abstract problem framings | LUMA | SUMMARY + SOURCE | sticky_sequence | P1 |
| How Might We | Framing technique | Turn problems or observations into generative questions | Design thinking / Design Sprint | SUMMARY + SOURCE | single_sticky | P0 |
| Assumption Mapping | Framework | Prioritize assumptions by importance and evidence | Lean/product discovery practice | RAW DRAFT guide with sources | sticky_matrix | P0 |
| Impact / Effort Matrix | Prioritization framework | Compare expected impact against effort | Common product/innovation practice | RAW DRAFT guide | sticky_matrix | P0 |
| Importance / Difficulty Matrix | Prioritization framework | Compare importance against difficulty | LUMA | SUMMARY + SOURCE | sticky_matrix | P1 |
| RICE | Prioritization framework | Reach × Impact × Confidence / Effort | Intercom lineage | SUMMARY + SOURCE | plain_type | P1 |
| MoSCoW | Prioritization framework | Must / Should / Could / Won't | DSDM lineage | SUMMARY + SOURCE | sticky_cluster | P2 |
| Kano Model | Prioritization / product framework | Separate basic, performance and delight needs | Noriaki Kano | SUMMARY + SOURCE | sticky_matrix | P2 |
| Weighted Decision Matrix | Decision framework | Score options against weighted criteria | Decision analysis | RAW DRAFT guide | sticky_matrix | P0 |
| NUF Test | Decision activity | Score ideas on New, Useful and Feasible | Gamestorming | SUMMARY + SOURCE | sticky_matrix | P2 |
| How-Now-Wow Matrix | Prioritization framework | Sort ideas by originality and feasibility | Gamestorming / creativity practice | SUMMARY + SOURCE | sticky_matrix | P1 |
| Magic Lenses | Decision method | View options through several 2×2 lenses | Character | SUMMARY + SOURCE | sticky_matrix | P0 |
| Premortem | Risk activity | Imagine failure in advance and identify causes | Gary Klein | SUMMARY + SOURCE | sticky_cluster | P0 |
| Kill Criteria | Decision framework | Define evidence that should stop/change a direction | Raw Draft | FULL GUIDE | sticky_funnel | P0 |
| Red Team / Blue Team | Challenge format | Challenge and defend a strategy using explicit roles | Military/security lineage | RAW DRAFT guide with careful context | tokens_board | P2 |
| Six Thinking Hats | Discussion framework | Use six deliberate thinking modes | Edward de Bono | LINK / SUMMARY only | cards_deck | P2 |
| DACI | Decision framework | Driver, Approver, Contributors, Informed | Atlassian | SUMMARY + SOURCE | plain_type | P1 |
| RACI | Responsibility framework | Responsible, Accountable, Consulted, Informed | Management practice | SUMMARY + SOURCE | plain_type | P2 |
| Decision Criteria Workshop | Workshop | Define criteria before comparing options | Raw Draft | FULL GUIDE | sticky_matrix | P0 |

# 6. Research and testing

Research pages should distinguish observed behaviour from stated opinion and be explicit about what a method can and cannot establish.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Stakeholder Interview | Research method | Understand perspective, incentives, constraints and decision context | Common research practice | RAW DRAFT guide | plain_type | P0 |
| Customer Interview | Research method | Understand past behaviour, needs and decision context | HCD / product research | RAW DRAFT guide with sources | plain_type | P0 |
| Five-Act Interview | Research method | Structured prototype interview | Design Sprint | SUMMARY + SOURCE | plain_type | P0 |
| Contextual Inquiry | Research method | Observe work in context while asking questions | HCI / LUMA | SUMMARY + SOURCE | plain_type | P0 |
| Fly-on-the-Wall Observation | Research method | Observe behaviour with minimal intervention | LUMA / ethnography | SUMMARY + SOURCE | plain_type | P1 |
| Walk-a-Mile Immersion | Research method | Experience participant context directly | LUMA | SUMMARY + SOURCE | plain_type | P2 |
| Guided Tour | Research method | Participant guides researcher through a space/process | HCD practice | SUMMARY + SOURCE | plain_type | P2 |
| Diary Study | Research method | Collect experience over time | UX research practice | RAW DRAFT guide with sources | plain_type | P1 |
| Cultural Probes | Research method | Participant-created artifacts reveal experience/culture | Design research lineage | SUMMARY + SOURCE | cards_deck | P2 |
| Intercept Interview | Research method | Short in-context interviews | Research practice | RAW DRAFT guide | plain_type | P2 |
| Think-Aloud Testing | Evaluation method | Participant verbalizes thought process during task | LUMA / usability research | SUMMARY + SOURCE | plain_type | P0 |
| Usability Test | Evaluation method | Observe users completing realistic tasks | UX research | RAW DRAFT guide with sources | plain_type | P0 |
| Heuristic Review | Evaluation framework | Evaluate experience against usability heuristics | Nielsen Norman lineage / LUMA | SUMMARY + SOURCE | plain_type | P1 |
| Concept Test | Research method | Test comprehension, desirability and tradeoffs | Product research | RAW DRAFT guide | paper_sketches | P0 |
| Prototype Test | Research method | Test hypotheses using a prototype | Design Sprint / HCD | RAW DRAFT guide with sources | paper_sketches | P0 |
| Fake Door Test | Experiment | Measure interest before building underlying capability | Lean experimentation | RAW DRAFT guide | plain_type | P1 |
| Landing Page Smoke Test | Experiment | Test proposition/behaviour with a lightweight page | Lean experimentation | RAW DRAFT guide | plain_type | P1 |
| Concierge Test | Experiment | Deliver value manually before automating | Lean startup practice | RAW DRAFT guide | plain_type | P1 |
| Wizard of Oz | Experiment / prototype | Simulate automation behind a realistic interface | HCI / Design Sprint lineage | SUMMARY + SOURCE | paper_sketches | P1 |
| Card Sorting | Research method | Understand grouping and labeling models | Information architecture | RAW DRAFT guide | cards_deck | P1 |
| Tree Testing | Research method | Evaluate findability in an information hierarchy | Information architecture | RAW DRAFT guide | plain_type | P1 |
| Survey | Research method | Collect structured self-report data at scale | Research practice | RAW DRAFT guide | plain_type | P1 |
| Desk Research | Research method | Synthesize public and internal evidence | Research practice | RAW DRAFT guide | plain_type | P0 |
| Analogous Research | Research method | Learn from comparable experiences outside the category | HCD practice | RAW DRAFT guide with sources | plain_type | P1 |
| Competitive Alternatives Research | Research method | Study competitors, workarounds and doing nothing | Positioning / Foundation Sprint | RAW DRAFT guide with sources | sticky_map | P0 |
| JTBD Interview | Research method | Understand progress people seek in context | Jobs to Be Done | SUMMARY + SOURCE | plain_type | P1 |
| Switch Interview | Research method | Reconstruct forces behind switching solutions | JTBD community | SUMMARY + SOURCE | plain_type | P2 |
| Extreme Users | Research approach | Learn from behavioural/contextual extremes | Design research / d.school | SUMMARY + SOURCE | plain_type | P1 |
| Participatory Research | Research approach | Participants contribute to interpretation/creation | HCD / LUMA | SUMMARY + SOURCE | sticky_cluster | P1 |

# 7. Synthesis, mapping and systems

These turn scattered evidence into structure and are excellent candidates for original mini-diagrams and sticky-note card references.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Affinity Mapping / Affinity Clustering | Synthesis method | Group observations/ideas into emergent themes | HCD / LUMA / many traditions | RAW DRAFT guide with sources | sticky_cluster | P0 |
| Stakeholder Mapping | Framework | Map actors, interests, influence and relationships | LUMA / service design | SUMMARY + SOURCE | sticky_map | P0 |
| Ecosystem Mapping | Framework | Map actors, exchanges, dependencies and context | Service/system design | RAW DRAFT guide with sources | sticky_map | P0 |
| Customer Journey Map | Framework | Represent stages, actions, touchpoints and opportunities | Service design | SUMMARY + SOURCE | sticky_sequence | P0 |
| Experience Map | Framework | Map end-to-end experience beyond one product/service | LUMA / service design | SUMMARY + SOURCE | sticky_sequence | P1 |
| Service Blueprint | Framework | Connect customer actions to frontstage/backstage/process/systems | Service design | SUMMARY + SOURCE | sticky_layers | P0 |
| Persona Profile | Framework | Represent a research-grounded user archetype | LUMA / UX practice | SUMMARY + SOURCE | plain_type | P2 |
| Empathy Map | Framework | Organize what is known about what people say/think/do/feel | HCD practice | RAW DRAFT guide with sources | sticky_cluster | P1 |
| Concept Mapping | Framework | Visualize relationships among concepts | LUMA | SUMMARY + SOURCE | sticky_map | P1 |
| Mental Model Diagram | Framework | Map user thinking/behaviours against capabilities | UX research lineage | SUMMARY + SOURCE | sticky_sequence | P2 |
| Opportunity Mapping | Framework | Turn evidence into opportunity territories | Raw Draft / broader innovation | FULL GUIDE | sticky_cluster | P0 |
| Opportunity Solution Tree | Product discovery framework | Outcome → opportunities → solutions → assumption tests | Teresa Torres / Product Talk | SUMMARY + SOURCE | sticky_tree | P0 |
| Insight Statement | Synthesis tool | Turn observations into evidence-grounded implications | HCD practice | RAW DRAFT guide | single_sticky | P0 |
| Tension Mapping | Framework | Surface conflicting needs, values or forces | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Needs Map | Framework | Organize needs and relative importance | Research practice | RAW DRAFT guide | sticky_cluster | P1 |
| Rose, Thorn, Bud | Synthesis / reflection | Identify positives, problems and opportunities | LUMA | SUMMARY + SOURCE | sticky_cluster | P1 |
| Bull's-eye Diagramming | Prioritization framework | Place items by relative importance/centrality | LUMA | SUMMARY + SOURCE | sticky_map | P2 |
| System Map | Systems framework | Map system elements and relationships | Systems practice / Policy Horizons | SUMMARY + SOURCE | system_loops | P0 |
| Causal Loop Diagram | Systems framework | Model reinforcing/balancing causal relationships | System dynamics | SUMMARY + SOURCE | system_loops | P1 |
| Rich Picture | Systems method | Represent complex situations visually before formalization | Soft Systems Methodology | SUMMARY + SOURCE | paper_sketches | P2 |
| Iceberg Model | Systems framework | Move from events to patterns, structures and mental models | Systems thinking practice | SUMMARY + SOURCE | plain_type | P1 |
| Behaviour Over Time Graph | Systems method | Represent change in a variable over time | Systems thinking | SUMMARY + SOURCE | plain_type | P2 |

# 8. Ideation and prototyping

These methods should usually produce a tangible artifact. Avoid treating ideation as an end state.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Crazy 8s | Ideation activity | Generate eight rough alternatives quickly | Design Sprint | SUMMARY + SOURCE | paper_sketches | P0 |
| Four-Step Sketch | Ideation method | Notes → Ideas → Crazy 8s → Solution Sketch | Design Sprint | SUMMARY + SOURCE | paper_sketches | P0 |
| Lightning Demos | Inspiration activity | Review analogous solutions before sketching | Design Sprint | SUMMARY + SOURCE | paper_sketches | P0 |
| Brainwriting 6-3-5 | Ideation method | Silent written idea generation and building | Creativity-method lineage | SUMMARY + SOURCE after verification | sticky_scatter | P2 |
| SCAMPER | Ideation framework | Substitute, Combine, Adapt, Modify, Put to use, Eliminate, Reverse | Bob Eberle lineage | SUMMARY + SOURCE | cards_deck | P2 |
| Reverse Brainstorming | Ideation method | Generate ways to worsen a problem, then reverse insights | Creativity practice | RAW DRAFT guide | sticky_scatter | P1 |
| Worst Possible Idea | Ideation activity | Reduce inhibition by intentionally generating bad ideas | Design/creativity practice | RAW DRAFT guide | sticky_scatter | P1 |
| Random Word | Ideation activity | Use unrelated stimulus to force new associations | Creativity practice | RAW DRAFT guide | cards_deck | P2 |
| Creative Matrix | Ideation framework | Generate concepts at intersections of people/needs and solution dimensions | LUMA | SUMMARY + SOURCE | sticky_matrix | P1 |
| Alternative Worlds | Ideation method | Imagine how another context would solve the problem | LUMA | SUMMARY + SOURCE | paper_sketches | P1 |
| Thumbnail Sketching | Ideation method | Generate many quick visual alternatives | LUMA | SUMMARY + SOURCE | paper_sketches | P1 |
| Round Robin | Ideation method | Build on ideas sequentially | LUMA | SUMMARY + SOURCE | sticky_sequence | P2 |
| Mash-up | Ideation method | Combine unrelated concepts/features into new propositions | HCD practice | RAW DRAFT guide with sources | paper_sketches | P1 |
| Bodystorming | Prototyping activity | Act out an experience physically to reveal issues | Design practice | SUMMARY + SOURCE | plain_type | P1 |
| Role Play | Prototyping / research activity | Simulate actors and interactions | Service design / HCD | RAW DRAFT guide | plain_type | P1 |
| Storyboard | Prototyping method | Represent an experience as sequential frames | Design Sprint / LUMA | SUMMARY + SOURCE | paper_sketches | P0 |
| Paper Prototype | Prototype method | Create low-cost interface/service representation | HCD practice | RAW DRAFT guide | paper_sketches | P0 |
| Rough & Ready Prototyping | Prototype method | Build low-fidelity representations quickly | LUMA | SUMMARY + SOURCE | paper_sketches | P1 |
| Concept Poster | Prototype / communication | Summarize a concept so others can react | LUMA | SUMMARY + SOURCE | paper_sketches | P1 |
| Cover Story Mock-up | Prototype / vision | Imagine future success as a publication cover/story | LUMA / Gamestorming variants | SUMMARY + SOURCE | paper_sketches | P2 |
| Video Scenario | Prototype | Use short video to represent a future experience | LUMA | SUMMARY + SOURCE | plain_type | P2 |
| Experience Prototype | Prototype | Simulate key moments of a service or experience | Service design | RAW DRAFT guide with sources | plain_type | P0 |
| Speculative Artifact | Futures prototype | Create an object/media fragment from a possible future | Experiential futures | SUMMARY + SOURCE | paper_sketches | P1 |

# 9. Strategy, business and innovation frameworks

Commercial frameworks often have clear owners. Summarize and link rather than reproducing proprietary templates.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Business Model Canvas | Framework | Describe how an organization creates, delivers and captures value | Strategyzer | SUMMARY + SOURCE; link official template | sticky_map | P0 |
| Value Proposition Canvas | Framework | Map jobs/pains/gains against products/services and value | Strategyzer | SUMMARY + SOURCE; link official template | sticky_map | P0 |
| Testing Card | Experiment framework | Define hypothesis, test, metric and threshold | Strategyzer | SUMMARY + SOURCE | single_sticky | P1 |
| Experiment Library | Resource library | 44 experiment types for testing business ideas | Strategyzer | LINK / curate selected references | plain_type | P1 |
| Portfolio Map | Framework | Map innovation portfolio and risk/return logic | Strategyzer | SUMMARY + SOURCE | sticky_matrix | P2 |
| Business Model Space | Framework | Explore business model alternatives | Strategyzer | SUMMARY + SOURCE | sticky_map | P2 |
| Lean Canvas | Framework | One-page startup business model framing | Ash Maurya | SUMMARY + SOURCE | sticky_map | P1 |
| SWOT | Framework | Strengths, Weaknesses, Opportunities, Threats | Strategy tradition / GOV Futures Toolkit | RAW DRAFT guide with sources | sticky_matrix | P1 |
| PESTLE / STEEP | Framework | Scan political/economic/social/tech/legal/environmental factors | Strategy/foresight practice | RAW DRAFT guide | sticky_cluster | P1 |
| Porter's Five Forces | Strategy framework | Assess industry structure and competitive forces | Michael Porter / HBR | SUMMARY + SOURCE only | plain_type | P2 |
| Ansoff Matrix | Strategy framework | Explore growth through market/product combinations | Igor Ansoff | SUMMARY + SOURCE | sticky_matrix | P2 |
| Strategy Canvas | Strategy framework | Visualize competing factors and value curves | Blue Ocean Strategy | SUMMARY + SOURCE | plain_type | P2 |
| Four Actions Framework / ERRC Grid | Strategy framework | Eliminate, Reduce, Raise, Create factors | Blue Ocean Strategy | SUMMARY + SOURCE | sticky_matrix | P2 |
| Good Strategy Kernel | Strategy framework | Diagnosis → guiding policy → coherent actions | Richard Rumelt | SUMMARY + SOURCE | plain_type | P1 |
| Playing to Win Choice Cascade | Strategy framework | Winning aspiration, where to play, how to win, capabilities, systems | Lafley & Martin | SUMMARY + SOURCE | sticky_sequence | P1 |
| North Star Framework | Product strategy framework | Define metric representing user value and leading business value | Amplitude | SUMMARY + SOURCE | plain_type | P1 |
| OKRs | Goal framework | Objectives and measurable key results | Goal-setting practice | SUMMARY + SOURCE | plain_type | P2 |
| Theory of Change | Impact framework | Map activities to outputs, outcomes, assumptions and impact | Evaluation/social impact practice | RAW DRAFT guide with sources | sticky_sequence | P1 |
| Logic Model | Impact framework | Inputs → activities → outputs → outcomes | Evaluation practice | RAW DRAFT guide with sources | sticky_sequence | P2 |
| Wardley Mapping | Strategy method | Map user needs/components against evolution to expose movement | Simon Wardley / mapping community | SUMMARY + SOURCE; verify CC terms | sticky_map | P1 |
| Strategic Guidance Framework | Strategy framework | Strategyzer strategic guidance tool | Strategyzer | LINK / SUMMARY | plain_type | P2 |
| Concept Card | Concept development tool | Move rough idea into concise concept | Board of Innovation | SUMMARY + SOURCE; link download | single_sticky | P1 |
| Innovation Project Template | Portfolio tool | Normalize innovation-project information | Board of Innovation | SUMMARY + SOURCE | plain_type | P2 |
| DIY Toolkit | Toolkit | 30 social innovation tools with printable templates | Nesta / STBY / Quicksand | LINK / curate tools | plain_type | P1 |
| Innovation Methods Compendium | Resource | Methods across innovation lifecycle | Nesta | LINK / source hub | plain_type | P2 |

# 10. Product strategy and discovery

Connect these directly to Product Strategy, Foundation, Research and Design Sprint pages.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Jobs to Be Done | Theory / framework | Understand progress people seek in particular circumstances | Christensen Institute / JTBD community | SUMMARY + SOURCE | plain_type | P0 |
| Opportunity Solution Tree | Product discovery framework | Outcome → opportunities → solutions → assumption tests | Teresa Torres / Product Talk | SUMMARY + SOURCE | sticky_tree | P0 |
| User Story Mapping | Product framework | Organize activities/stories to understand flow and release slices | Jeff Patton | SUMMARY + SOURCE | sticky_sequence | P1 |
| Product Principles | Strategy artifact | Create decision rules guiding product choices | Product strategy practice | RAW DRAFT guide | single_sticky | P0 |
| MVP Boundary | Strategy artifact | Define smallest coherent scope to test main hypothesis | Raw Draft | FULL GUIDE | sticky_funnel | P0 |
| Assumption Test Map | Framework | Connect assumptions to evidence and experiments | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Product Vision Board | Product framework | Connect vision, target group, needs, product and business goals | Roman Pichler | SUMMARY + SOURCE | sticky_map | P2 |
| Impact Mapping | Delivery framework | Goal → actors → impacts → deliverables | Gojko Adzic | SUMMARY + SOURCE | sticky_tree | P2 |
| Story Mapping Release Slice | Activity | Identify coherent release slices across a journey | User Story Mapping | SUMMARY + SOURCE | sticky_sequence | P1 |
| Buy a Feature | Prioritization game | Allocate scarce budget to desired features | LUMA / Innovation Games lineage | SUMMARY + SOURCE | tokens_board | P1 |
| Product Box | Serious game / concept | Design a box communicating product value | Innovation Games | SUMMARY + SOURCE | paper_sketches | P2 |
| Prune the Product Tree | Serious game | Discuss product evolution and priorities with a tree metaphor | Innovation Games | SUMMARY + SOURCE | tokens_board | P2 |
| Remember the Future | Serious game | Work backward from imagined future success | Innovation Games | SUMMARY + SOURCE | plain_type | P2 |

# 11. Brand, positioning and cultural strategy

Brand strategy should remain distinct from identity production. These resources can feed Positioning and Brand Strategy Sprints.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Three-Hour Brand Sprint | Brand workshop | Rapidly define brand context and attributes | Jake Knapp / GV-era resource | SUMMARY from verified archived/secondary source | sticky_sequence | P2 |
| Name Sprint | Brand Sprint | Create and vet a company/product name | Character / Jake Knapp | SUMMARY + SOURCE | sticky_vote | P0 |
| Positioning Framework | Strategy framework | Define target, alternatives, differentiated value and proof | Raw Draft synthesis with cited sources | FULL GUIDE | sticky_matrix | P0 |
| Obviously Awesome positioning method | Positioning methodology | Alternatives → attributes → value → target → category | April Dunford | SUMMARY + SOURCE / book | sticky_sequence | P1 |
| Geoffrey Moore positioning statement | Template | Structured target/category/benefit/reason-to-believe statement | Crossing the Chasm | SUMMARY + SOURCE | plain_type | P2 |
| Brand Personality Sliders | Brand framework | Define character using explicit spectrums | Brand sprint / broader practice | RAW DRAFT guide with sources | sticky_matrix | P1 |
| Brand Attributes | Workshop activity | Generate and prioritize desired brand attributes | Brand strategy practice | RAW DRAFT guide | sticky_vote | P0 |
| Brand Opposites | Workshop activity | Clarify desired position using continua | Name Sprint / brand practice | SUMMARY + SOURCE | sticky_matrix | P1 |
| Category / Competitive Landscape 2×2 | Brand framework | Map brands/products on meaningful perception axes | Brand practice | RAW DRAFT guide | sticky_matrix | P1 |
| Message Hierarchy | Messaging framework | Order proposition, claims and proof | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Value Proposition Ad-lib | Messaging tool | Concise structured statement of target, need and value | Strategyzer | SUMMARY + SOURCE | single_sticky | P2 |
| Golden Circle | Brand/leadership framework | Why → How → What | Simon Sinek | SUMMARY + SOURCE | plain_type | P3 |
| Brand House | Brand architecture framework | Organize promise, pillars, proof and personality | Multiple variants | RAW DRAFT version only if clearly defined | sticky_layers | P2 |
| Semiotic Mapping | Cultural / brand method | Map codes, signs and meanings within a category | Semiotics practice | RAW DRAFT guide with specialist sources | sticky_matrix | P2 |
| Cultural Tensions Map | Cultural strategy framework | Map competing values/tensions shaping a category | Raw Draft | FULL GUIDE | sticky_matrix | P1 |
| Creative Brief | Strategy artifact | Translate strategy into creative execution direction | Raw Draft | FULL GUIDE / DOWNLOAD | plain_type | P0 |

# 12. Go-to-market, messaging and commercial testing

These connect strategy to real market learning rather than treating launch as the end.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Ideal Customer Profile | GTM framework | Define initial customer profile worth targeting | GTM practice | RAW DRAFT guide | plain_type | P0 |
| Beachhead Market | GTM framework | Choose focused initial market | Entrepreneurship strategy | SUMMARY + SOURCE | sticky_funnel | P1 |
| Channel Hypothesis Map | GTM framework | List channels, assumptions, cost and evidence | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| GTM Experiment Card | Asset | Segment, offer, message, channel, metric and decision rule | Raw Draft | FULL GUIDE / DOWNLOAD | single_sticky | P0 |
| AARRR / Pirate Metrics | Growth framework | Acquisition, Activation, Retention, Referral, Revenue | Dave McClure lineage | SUMMARY + SOURCE | plain_type | P2 |
| Bullseye Framework | Channel strategy | Explore, rank and test acquisition channels | Traction / Weinberg & Mares | SUMMARY + SOURCE | sticky_map | P2 |
| Van Westendorp Price Sensitivity Meter | Pricing research | Estimate acceptable/expensive/cheap price perceptions | Peter van Westendorp | SUMMARY + SOURCE | plain_type | P2 |
| Gabor-Granger | Pricing research | Estimate willingness to pay across price points | Pricing research lineage | SUMMARY + SOURCE | plain_type | P3 |
| Message Test | Experiment | Compare comprehension/response to alternative messages | Raw Draft | FULL GUIDE | paper_sketches | P0 |
| Shopping Mode | Concept testing approach | Let customers compare fundamentally different concepts | John Zeratsky | SUMMARY + SOURCE | paper_sketches | P1 |
| Teleport Test | Diagnostic | Check product value before scaling marketing | John Zeratsky | SUMMARY + SOURCE | plain_type | P2 |

# 13. Teams, organisations and retrospectives

These widen the Library beyond product/design while remaining practical and facilitation-led.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Team Health Monitor | Workshop / team diagnostic | Assess team health and choose areas to improve | Atlassian Team Playbook | SUMMARY + SOURCE; link templates | sticky_matrix | P1 |
| Team Canvas | Framework / workshop | Define purpose, roles, values, needs and working relationships | Team Canvas / FigJam variants | SUMMARY + SOURCE | sticky_map | P1 |
| Working Agreements | Workshop | Define how a team will work together | Agile/team practice | RAW DRAFT guide | sticky_cluster | P0 |
| Roles & Responsibilities | Workshop | Make accountabilities explicit | Team practice | RAW DRAFT guide | sticky_map | P0 |
| DACI | Decision framework | Clarify driver, approver, contributors and informed parties | Atlassian | SUMMARY + SOURCE | plain_type | P1 |
| RACI | Responsibility framework | Clarify responsible/accountable/consulted/informed | Management practice | SUMMARY + SOURCE | plain_type | P2 |
| Start / Stop / Continue | Retrospective | Identify what to start, stop and continue | Retrospective practice | RAW DRAFT guide | sticky_cluster | P0 |
| 4Ls | Retrospective | Liked, Learned, Lacked, Longed For | Agile retrospective practice | RAW DRAFT guide with source research | sticky_cluster | P1 |
| Mad / Sad / Glad | Retrospective | Reflect through emotional categories | Agile retrospective practice | RAW DRAFT guide | sticky_cluster | P1 |
| Sailboat / Speedboat | Retrospective / planning game | Use wind, anchors and destination metaphors | Innovation Games / retrospective practice | SUMMARY + SOURCE | paper_sketches | P1 |
| Futurespective | Risk / planning workshop | Imagine a future outcome and reason backward | Agile/futures practice | RAW DRAFT guide | sticky_timeline | P1 |
| After Action Review | Reflection method | What was intended, what happened, why, what next | Organizational learning lineage | RAW DRAFT guide with sources | sticky_sequence | P1 |
| Project Premortem | Risk workshop | Imagine project failure and surface causes before launch | Gary Klein | SUMMARY + SOURCE | sticky_cluster | P0 |
| Project Kickoff | Workshop | Align on problem, outcome, roles, scope and constraints | Raw Draft / common practice | FULL GUIDE | sticky_sequence | P0 |

# 14. Futures, foresight and speculative practice

This should become one of the deepest parts of Raw Draft. The UK Government Futures Toolkit and Policy Horizons Canada are especially strong source families.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Futures Toolkit 2024 | Toolkit | 12 futures tools plus pathways and facilitation guidance | UK Government Office for Science | LINK / curate individual resources | signal_constellation | P0 |
| Delphi | Futures / expert method | Iterative expert questionnaires around uncertainty | UK Futures Toolkit / research lineage | SUMMARY + SOURCE | plain_type | P2 |
| Seven Questions | Futures interview method | Structured strategic interviews | UK Futures Toolkit | SUMMARY + SOURCE | plain_type | P1 |
| Horizon Scanning | Foresight method | Collect trends, emerging issues and weak signals | UK Futures Toolkit / Policy Horizons | SUMMARY + SOURCE | signal_constellation | P0 |
| Three Horizons | Futures framework | Explore current system, transition and future system | UK Futures Toolkit / IFF lineage | SUMMARY + SOURCE | sticky_timeline | P0 |
| Driver Mapping | Futures framework | Identify and map drivers of change | UK Futures Toolkit | SUMMARY + SOURCE | sticky_map | P0 |
| Scenarios | Futures method | Develop distinct plausible futures and implications | UK Futures Toolkit / scenario field | SUMMARY + SOURCE | sticky_matrix | P0 |
| Visioning | Futures method | Describe a desired future in enough detail to guide action | UK Futures Toolkit | SUMMARY + SOURCE | paper_sketches | P1 |
| Futures Wheel | Futures method | Explore first-, second- and higher-order consequences | UK Futures Toolkit / Jerome Glenn lineage | SUMMARY + SOURCE | signal_constellation | P0 |
| Policy / Strategy Stress-testing | Futures method | Test strategy against future conditions | UK Futures Toolkit | SUMMARY + SOURCE | sticky_matrix | P0 |
| Wind Tunnelling | Futures method | Compare options across multiple scenarios | UK Futures Toolkit | SUMMARY + SOURCE | sticky_matrix | P0 |
| Roadmapping | Futures / strategy method | Map actions, capabilities and milestones over time | UK Futures Toolkit | SUMMARY + SOURCE | sticky_timeline | P0 |
| Backcasting | Futures / planning method | Start from future state and work backward | UK Futures Toolkit | SUMMARY + SOURCE | sticky_timeline | P0 |
| Assumptions Surfacing | Foresight method | Make current assumptions explicit and test them later | Policy Horizons Canada | SUMMARY + SOURCE | single_sticky | P0 |
| Weak Signal Scanning | Foresight method | Find early indications of potentially disruptive change | Policy Horizons Canada | SUMMARY + SOURCE | signal_constellation | P0 |
| System Mapping for Foresight | Foresight method | Map system elements and pathways of change | Policy Horizons Canada | SUMMARY + SOURCE | system_loops | P0 |
| Cascade Diagram | Foresight method | Explore second- to fifth-order consequences | Policy Horizons Canada | SUMMARY + SOURCE | signal_constellation | P1 |
| Cross-Impact Analysis | Foresight method | Explore interactions among drivers/signals | Policy Horizons Canada | SUMMARY + SOURCE | sticky_matrix | P1 |
| Scenario Archetypes | Futures framework | Use recurring archetypes to create distinct futures | Policy Horizons / scenario literature | SUMMARY + SOURCE | sticky_matrix | P1 |
| Manoa Scenario Method | Futures method | Build rich scenarios from multiple emerging issues | Hawaii Research Center for Futures lineage | SUMMARY + SOURCE after verification | signal_constellation | P2 |
| Causal Layered Analysis | Futures method | Litany → systemic causes → worldview → myth/metaphor | Sohail Inayatullah | SUMMARY + SOURCE | sticky_layers | P2 |
| Morphological Analysis | Futures / strategy method | Explore combinations of uncertain dimensions | Fritz Zwicky lineage | SUMMARY + SOURCE | sticky_matrix | P2 |
| Dator's Four Futures | Scenario framework | Growth, collapse, discipline and transformation | Jim Dator / futures studies | SUMMARY + SOURCE | sticky_matrix | P2 |
| Futures Cone | Futures framework | Possible, plausible, probable and preferable futures | Futures studies tradition | RAW DRAFT visual with source research | plain_type | P1 |
| Experiential Futures | Methodology | Make futures tangible through experiences and artifacts | Experiential futures field | SUMMARY + SOURCE | paper_sketches | P1 |
| Speculative Design | Methodology | Use designed propositions to examine possible futures/values | Dunne & Raby / broader field | SUMMARY + SOURCE | paper_sketches | P1 |
| Design Fiction | Methodology | Use fictional artifacts/media to explore possible futures | Design fiction field | SUMMARY + SOURCE | paper_sketches | P1 |
| Future Persona | Futures activity | Imagine actors, needs and behaviours in future context | Futures/design practice | RAW DRAFT guide | paper_sketches | P1 |
| Future Journey | Futures activity | Map an experience inside a scenario | Raw Draft | FULL GUIDE | sticky_sequence | P1 |
| Future Newspaper / Headlines | Futures activity | Describe future events as headlines/stories | Futures practice | RAW DRAFT guide | paper_sketches | P1 |
| Speculative Artifact | Futures activity | Create an object/document from a possible future | Experiential futures | SUMMARY + SOURCE | paper_sketches | P0 |
| The Thing From The Future | Serious game | Generate future artifacts using structured card prompts | Situation Lab | LINK / SUMMARY; verify licence before reproducing deck | cards_deck | P1 |
| Futures Bazaar | Workshop resource | Create artifacts from the future | BBC resource referenced by UK Futures Toolkit | LINK / verify source | cards_deck | P2 |
| Foresight Strategy Toolkit | Toolkit | Participatory foresight for strategic planning | UNDP | LINK / curate chapter-level resources | signal_constellation | P0 |
| Horizons Foresight Training Modules | Learning path | Assumptions, scanning, systems, drivers, scenarios, results | Policy Horizons Canada | LINK / curate modules | signal_constellation | P0 |

# 15. Serious games, simulations and physical facilitation

Treat these as a distinct family. Games need rules, rounds, roles, materials and a structured debrief.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| LEGO Serious Play | Methodology | Construction/metaphor for reflection, dialogue and shared models | LEGO Group community-based methodology | SUMMARY + SOURCE; link official open-source material | lego_blocks_abstract | P0 |
| Tabletop Strategy Game | Workshop format | Simulate strategic choices, resources, events and consequences | Raw Draft format to author | FULL GUIDE / GAME KIT | tokens_board | P0 |
| Scenario Game | Serious game | Make decisions inside one or more future scenarios | Raw Draft / futures practice | FULL GUIDE / GAME KIT | tokens_board | P1 |
| Business Simulation | Simulation format | Model a business system and experiment with decisions | Simulation practice | RAW DRAFT framework | tokens_board | P2 |
| Red Team / Blue Team | Simulation / challenge | Challenge and defend a strategy with explicit roles | Military/security lineage | RAW DRAFT guide with careful provenance | tokens_board | P2 |
| Tabletop Exercise | Simulation format | Facilitated staged scenario used for resilience/response | Emergency management/security practice | RAW DRAFT guide with sources | tokens_board | P1 |
| Wargaming | Simulation methodology | Explore moves, countermoves and strategic interaction | Military / policy / business lineage | SUMMARY + SOURCES | tokens_board | P3 |
| EventStorming | Workshop methodology | Explore domain events, commands, actors and policies | Alberto Brandolini | SUMMARY + SOURCE | sticky_timeline | P1 |
| Beer Distribution Game | Systems simulation | Experience delay, feedback and supply-chain dynamics | MIT / system dynamics lineage | LINK / SUMMARY | tokens_board | P2 |
| Marshmallow Challenge | Team game / prototyping | Build under constraints to expose planning/iteration assumptions | Tom Wujec popularization / design education | SUMMARY + SOURCE | plain_type | P2 |
| Buy a Feature | Serious game | Allocate constrained budget across features | Innovation Games / LUMA | SUMMARY + SOURCE | tokens_board | P1 |
| Prune the Product Tree | Serious game | Discuss product evolution with tree metaphor | Innovation Games | SUMMARY + SOURCE | tokens_board | P2 |
| Speedboat | Serious game / retrospective | Identify anchors and forces affecting progress | Innovation Games | SUMMARY + SOURCE | paper_sketches | P1 |
| Remember the Future | Serious game | Describe success from a future vantage point | Innovation Games | SUMMARY + SOURCE | plain_type | P2 |
| Product Box | Serious game | Package a concept to force value communication | Innovation Games | SUMMARY + SOURCE | paper_sketches | P1 |
| Role-based Negotiation Simulation | Simulation format | Explore trade-offs among actors with different incentives | Raw Draft format to author | FULL GUIDE / GAME KIT | tokens_board | P2 |
| System Mapping Game | Serious game | Build and modify a system map through rounds/events | Raw Draft format to author | FULL GUIDE / GAME KIT | tokens_board | P2 |
| Signal Card Game | Serious game / futures | Combine signals to generate implications/concepts | Raw Draft format to author | FULL GUIDE / CARD DECK | cards_deck | P1 |
| Assumption Poker | Serious game / prioritization | Use cards/tokens to expose confidence and disagreement | Raw Draft candidate | FULL GUIDE / CARD DECK | cards_deck | P2 |

# 16. Methodologies and larger systems

Methodology pages explain the larger philosophy and system. They should link to activities/resources without pretending the methodology is one workshop.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Design Thinking Bootleg | Toolkit / methodology | Empathize, Define, Ideate, Prototype, Test plus method cards | Stanford d.school | CC BY-NC-SA; link/download per terms | cards_deck | P0 |
| Double Diamond | Design framework | Discover, Define, Develop, Deliver through divergence/convergence | Design Council | CC BY 4.0 | plain_type | P0 |
| Systemic Design Framework | Methodology / toolkit | Explore, Reframe, Create, Catalyse with systemic principles | Design Council | CC BY 4.0 | system_loops | P1 |
| LUMA System | Methodology / method library | 36 HCD methods: Looking, Understanding, Making | LUMA Institute | SUMMARY + SOURCE; don't rehost commercial cards | cards_deck | P0 |
| Liberating Structures | Methodology / library | 43 interaction structures | Liberating Structures | LINK / SUMMARY | plain_type | P0 |
| Gamestorming | Method library / book | Collaborative games for opening, exploring and closing | Dave Gray, Sunni Brown, James Macanufo | LINK / SUMMARY | cards_deck | P0 |
| Service Design | Methodology | Design services across journeys, touchpoints, people and systems | Service design field | RAW DRAFT overview with sources | sticky_layers | P0 |
| Strategic Foresight | Methodology | Explore change, plausible futures and implications | Multiple; GOV/Policy Horizons/UNDP sources | RAW DRAFT overview with sources | signal_constellation | P0 |
| Scenario Planning | Methodology | Develop/use multiple plausible futures | Multiple traditions | RAW DRAFT overview with sources | sticky_matrix | P0 |
| Jobs to Be Done | Theory / methodology | Understand progress sought in specific circumstances | Christensen Institute / community | SUMMARY + SOURCE | plain_type | P0 |
| Systems Thinking | Methodology | Understand wholes, relationships, feedback and dynamics | Systems field | RAW DRAFT overview with sources | system_loops | P0 |
| Human-Centered Design | Methodology | Understand people, frame problems, make/test solutions | d.school / IDEO / LUMA / broader field | RAW DRAFT overview with sources | plain_type | P0 |
| Lean Experimentation | Methodology | Turn assumptions into tests/evidence before large commitment | Lean Startup / Testing Business Ideas ecosystem | SUMMARY + SOURCES | single_sticky | P0 |
| Agile Retrospectives | Method family | Structured reflection/improvement for teams | Agile community | RAW DRAFT overview | sticky_cluster | P1 |
| Open Policy Making | Toolkit / methodology | Collaborative research/design/experimentation in policy | UK Policy Lab | LINK / source hub | plain_type | P2 |

# 17. Source libraries and repositories to curate

These should mostly appear as Sources and External Resources. Do not mirror them wholesale.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| SessionLab Public Library | Resource library | Large facilitation-method and template library with run details | SessionLab | LINK / source hub | plain_type | R |
| IAF Methods Library | Resource library | Professional facilitation methods hosted with SessionLab | IAF + SessionLab | LINK / source hub; some member-gated | plain_type | R |
| Liberating Structures Menu | Method library | 43 interaction structures | Liberating Structures | LINK / source hub | plain_type | R |
| Gamestorming | Method library | Collaborative games and method origins | Gamestorming | LINK / source hub | cards_deck | R |
| LUMA System Methods | Method library | 36 HCD methods | LUMA Institute | LINK / source hub | cards_deck | R |
| Stanford d.school Design Thinking Bootleg | Toolkit | HCD method-card deck | Stanford d.school | CC BY-NC-SA resource | cards_deck | R |
| IDEO.org Design Kit | Method library | Human-centered design methods with time, difficulty, materials and steps | IDEO.org | LINK / curate methods; verify reuse terms | paper_sketches | R |
| Design Council Double Diamond | Framework / toolkit | Design process and downloadable framework | Design Council | CC BY 4.0 | plain_type | R |
| Design Council Systemic Design Toolkit | Toolkit | Systemic design framework/toolkit | Design Council | CC BY 4.0 | system_loops | R |
| Service Design Tools | Resource library | Methods filterable by stage, participants, target and representation | Service Design Tools | LINK / source hub | sticky_layers | R |
| Strategyzer Library | Framework/playbook library | Business model, value proposition, testing and portfolio tools | Strategyzer | LINK / source hub | plain_type | R |
| Strategyzer Experiment Library | Experiment library | 44 experiments for testing business ideas | Strategyzer | LINK / source hub | plain_type | R |
| Miroverse Workshops | Template library | Workshop boards and community templates | Miro | LINK / curated external boards | sticky_scatter | R |
| Miro Icebreakers | Template collection | Digital icebreakers and energizers | Miro | LINK / curated external boards | sticky_scatter | R |
| Miro Ideation Workshops | Template collection | Ideation boards and prompt-card formats | Miro | LINK / curated external boards | sticky_scatter | R |
| FigJam Brainstorming Templates | Template library | Brainstorms, empathy maps, 5 Whys, RICE, brand and more | Figma / FigJam | LINK / curated boards | sticky_scatter | R |
| FigJam Template Browser | Template library | Meetings, diagramming, icebreakers, journeys and community files | Figma / FigJam | LINK / curated boards | sticky_scatter | R |
| OECD OPSI Toolkit Navigator | Meta-library | Hundreds of public-sector innovation toolkits | OECD OPSI | LINK / source hub | plain_type | R |
| Nesta DIY Toolkit | Toolkit | 30 social innovation tools and printable templates | Nesta / STBY / Quicksand | LINK / source hub | plain_type | R |
| Nesta Innovation Methods | Resource hub | Innovation methods across lifecycle | Nesta | LINK / source hub | plain_type | R |
| UK Futures Toolkit | Toolkit | 12 strategic futures tools plus pathways and facilitation | UK Government Office for Science | LINK / source hub | signal_constellation | R |
| UK Futures Resource Collection | Asset library | Facilitator guides, worksheets, templates and exemplars | UK Government Office for Science | LINK / open-government source | signal_constellation | R |
| Policy Horizons Canada Training Modules | Learning library | Foresight training and facilitator-ready material | Policy Horizons Canada | LINK / source hub | signal_constellation | R |
| UNDP Foresight Strategy Toolkit | Toolkit | Foresight-informed strategic planning | UNDP | LINK / source hub | signal_constellation | R |
| IAF Core Competencies | Professional framework | Global facilitation competency framework | IAF | LINK / source hub | plain_type | R |
| Atlassian Team Playbook | Playbook library | Team health, decisions, planning and collaboration | Atlassian | LINK / curate plays | plain_type | R |
| Board of Innovation Tools | Tool library | Innovation canvases and downloadable tools | Board of Innovation | LINK / curated tools | plain_type | R |
| Lenny's Newsletter / templates | Writing/resource source | Product, growth, hiring and operating resources | Lenny Rachitsky | LINK / curate public resources; respect paywalls | plain_type | R |
| Character Guides | Sprint library | Foundation, Design, Name, Note and Vote, templates | Character | LINK / curate guides | sticky_vote | R |
| Facilitator.com | Learning/resource hub | Facilitation and Design Sprint resources | Facilitator.com / AJ&Smart | LINK / curated guides/courses | plain_type | R |
| Laws of UX | Reference library | Psychology principles useful for library UX and interface critique | Jon Yablonski | LINK / reference, not facilitation method source | plain_type | R |

# 18. Books, courses and learning paths

Use these in Learn Facilitation, Learn Strategy, Learn Research and Learn Futures. Raw Draft does not need to invent certification.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| IAF Core Competencies | Professional framework | Understand six facilitation competency areas | IAF | LINK | plain_type | P0 |
| IAF certification pathway | Credential pathway | Professional facilitation development | IAF | LINK | plain_type | P1 |
| Facilitator.com Design Sprint Masterclass | Course | Learn Design Sprint delivery/facilitation | Facilitator.com / AJ&Smart | LINK; paid | plain_type | P1 |
| LUMA training / certification | Course | Learn LUMA methods and facilitation | LUMA Institute | LINK; paid | plain_type | P1 |
| Innovating for People | Book/cards | Handbook and planning cards for 36 LUMA methods | LUMA Institute | LINK; commercial | cards_deck | P1 |
| Sprint | Book | Design Sprint | Jake Knapp, John Zeratsky, Braden Kowitz | LINK | plain_type | P0 |
| Click | Book | Foundation Sprint | Jake Knapp & John Zeratsky | LINK | plain_type | P0 |
| Gamestorming | Book | Collaborative games for teams | Dave Gray, Sunni Brown, James Macanufo | LINK | cards_deck | P0 |
| The Surprising Power of Liberating Structures | Book | Liberating Structures repertoire | Henri Lipmanowicz & Keith McCandless | LINK | plain_type | P1 |
| The Art of Gathering | Book | Purpose, invitation and structure of gatherings | Priya Parker | LINK | plain_type | P0 |
| The Workshop Survival Guide | Book | Practical workshop design/facilitation | Devin Hunt & Rob Fitzpatrick | LINK | plain_type | P1 |
| Facilitator's Guide to Participatory Decision-Making | Book | Participation, convergence and decision-making | Sam Kaner et al. | LINK | plain_type | P1 |
| Handbook of Professional Facilitation | Book | Professional facilitation and workshop design | Pepe Nummi | LINK / IAF listing | plain_type | P2 |
| The World Café | Book/methodology | Hosting conversations that matter | Juanita Brown & David Isaacs | LINK | plain_type | P2 |
| Open Space Technology: A User's Guide | Book/methodology | Open Space facilitation | Harrison Owen | LINK | plain_type | P2 |
| Business Model Generation | Book | Business Model Canvas | Osterwalder & Pigneur | LINK | plain_type | P1 |
| Value Proposition Design | Book | Value Proposition Canvas | Osterwalder et al. | LINK | plain_type | P1 |
| Testing Business Ideas | Book | Experiment design/evidence | David Bland & Alex Osterwalder | LINK | plain_type | P0 |
| Continuous Discovery Habits | Book | Product discovery and Opportunity Solution Trees | Teresa Torres | LINK | plain_type | P0 |
| Competing Against Luck | Book | Jobs to Be Done theory | Clayton Christensen et al. | LINK | plain_type | P1 |
| Obviously Awesome | Book | Positioning method | April Dunford | LINK | plain_type | P1 |
| Good Strategy/Bad Strategy | Book | Strategy kernel | Richard Rumelt | LINK | plain_type | P1 |
| Playing to Win | Book | Strategy choice cascade | A.G. Lafley & Roger Martin | LINK | plain_type | P1 |
| Thinking in Systems | Book | Systems-thinking fundamentals | Donella Meadows | LINK | plain_type | P0 |
| Speculative Everything | Book | Speculative design | Anthony Dunne & Fiona Raby | LINK | plain_type | P1 |
| This is Service Design Doing | Book/methods | Service design methods and facilitation | Stickdorn et al. | LINK | plain_type | P0 |
| Mapping Experiences | Book | Journey/service/experience mapping | Jim Kalbach | LINK | plain_type | P1 |
| Design Thinking Bootleg | Toolkit | Open design-thinking method cards | Stanford d.school | CC BY-NC-SA | cards_deck | P0 |
| UK Futures Toolkit | Toolkit | Strategic futures methods and worksheets | Government Office for Science | LINK | signal_constellation | P0 |
| Policy Horizons Foresight Training Modules | Course/toolkit | Structured foresight training | Policy Horizons Canada | LINK | signal_constellation | P0 |
| UNDP Foresight Strategy Toolkit | Toolkit | Foresight-informed strategic planning | UNDP | LINK | signal_constellation | P0 |

# 19. Agent-prompt assets Raw Draft can create

These are resources, not an AI product. Each page can contain purpose, context to provide, prompt, expected output and what a human must verify.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Prepare this Sprint | Agent prompt | Turn company context into facilitator prep checklist | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Adapt this workshop to 90 minutes | Agent prompt | Shorten agenda while preserving critical output | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Adapt this workshop for remote | Agent prompt | Translate setup without losing interaction quality | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Adapt this workshop for executives | Agent prompt | Reduce overhead and clarify decision points | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Create participant pre-work | Agent prompt | Generate concise pre-work from purpose/context | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Create a pre-read | Agent prompt | Turn evidence into neutral pre-read | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P1 |
| Create a facilitator script | Agent prompt | Draft instructions, transitions and decision framing | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Generate interview questions | Agent prompt | Translate research questions into non-leading prompts | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Synthesize interview notes | Agent prompt | Cluster evidence without inventing findings | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_cluster | P0 |
| Turn notes into affinity clusters | Agent prompt | Propose clusters while preserving evidence references | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_cluster | P0 |
| Extract assumptions | Agent prompt | Identify explicit/implicit assumptions in documents | Raw Draft | FULL GUIDE / COPY PROMPT | single_sticky | P0 |
| Rank assumptions by risk | Agent prompt | Suggest importance/evidence placements for human review | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_matrix | P0 |
| Turn assumptions into experiments | Agent prompt | Create bounded tests and evidence thresholds | Raw Draft | FULL GUIDE / COPY PROMPT | single_sticky | P0 |
| Create decision criteria | Agent prompt | Propose explicit criteria from context/constraints | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_matrix | P1 |
| Summarize workshop outputs | Agent prompt | Extract decisions, evidence, unknowns and actions | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Create a workshop report | Agent prompt | Draft post-workshop report without invented outcomes | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P0 |
| Generate a follow-up test plan | Agent prompt | Turn decisions into validation activities | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_sequence | P0 |
| Scan for signals | Agent prompt | Create scanning plan and source categories | Raw Draft | FULL GUIDE / COPY PROMPT | signal_constellation | P1 |
| Turn signals into implications | Agent prompt | Generate higher-order implications for review | Raw Draft | FULL GUIDE / COPY PROMPT | signal_constellation | P1 |
| Build scenario axes | Agent prompt | Generate candidate critical uncertainties | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_matrix | P1 |
| Stress-test strategy against scenarios | Agent prompt | Compare assumptions/moves across scenarios | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_matrix | P1 |
| Create speculative artifact prompts | Agent prompt | Generate artifact briefs grounded in a scenario | Raw Draft | FULL GUIDE / COPY PROMPT | paper_sketches | P2 |
| Generate tabletop events | Agent prompt | Draft scenario events for facilitator review | Raw Draft | FULL GUIDE / COPY PROMPT | cards_deck | P2 |
| Debrief a serious game | Agent prompt | Turn observations into implications/questions | Raw Draft | FULL GUIDE / COPY PROMPT | plain_type | P2 |
| Audit a workshop agenda | Agent prompt | Check pacing, ownership, outputs, breaks and cognitive load | Raw Draft | FULL GUIDE / COPY PROMPT | sticky_sequence | P0 |

# 20. Raw Draft assets to create

These practical assets can make the Library worth returning to. Attach them only where they genuinely help somebody run the work.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Facilitator Run Sheet | PDF / Doc | Timing, instructions, materials, outputs and warnings | Raw Draft | FULL DOWNLOAD | sticky_sequence | P0 |
| Participant Worksheet | PDF / printable | Prompts/spaces participants actually use | Raw Draft | FULL DOWNLOAD | single_sticky | P0 |
| Agenda Template | Doc / Sheet | Time, activity, purpose, owner, output | Raw Draft | FULL DOWNLOAD | sticky_sequence | P0 |
| Workshop Brief | Doc / Form | Question, outcome, decision owner, participants, constraints | Raw Draft | FULL DOWNLOAD | single_sticky | P0 |
| Pre-read Template | Doc | Context, evidence, questions, definitions | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Participant Invitation | Copy template | Purpose, preparation, attendance expectation | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Decision Log | Sheet / Doc | Decision, rationale, assumptions, owner, date, next step | Raw Draft | FULL DOWNLOAD | sticky_vote | P0 |
| Assumption Register | Sheet / board | Assumptions, evidence, importance, owner, status | Raw Draft | FULL DOWNLOAD | sticky_matrix | P0 |
| Experiment Card | Printable / board | Hypothesis, artifact, test, metric, pass/fail | Raw Draft | FULL DOWNLOAD | single_sticky | P0 |
| Evidence Map | Board / sheet | Claims, evidence, gaps, confidence | Raw Draft | FULL DOWNLOAD | sticky_matrix | P0 |
| Miro Board | Board | Complete collaborative workspace | Raw Draft | OPEN / DUPLICATE if configured | sticky_scatter | P0 |
| FigJam Board | Board | Complete collaborative workspace | Raw Draft | OPEN / DUPLICATE if configured | sticky_scatter | P0 |
| Printable Canvas | PDF | Framework ready to print | Raw Draft | FULL DOWNLOAD | sticky_map | P0 |
| Prompt Cards | Card deck | Questions/prompts used during workshop | Raw Draft | FULL DOWNLOAD | cards_deck | P1 |
| Scenario Cards | Card deck | Drivers/events/actors/uncertainties | Raw Draft | FULL DOWNLOAD | cards_deck | P1 |
| Signal Cards | Card deck | Curated change signals | Raw Draft | FULL DOWNLOAD | cards_deck | P1 |
| Tabletop Game Board | Printable / digital board | System map, zones, tracks, decision spaces | Raw Draft | FULL DOWNLOAD | tokens_board | P1 |
| Game Role Cards | Card deck | Goals, constraints and private information | Raw Draft | FULL DOWNLOAD | cards_deck | P1 |
| Game Event Cards | Card deck | External changes introduced by round | Raw Draft | FULL DOWNLOAD | cards_deck | P1 |
| Debrief Sheet | PDF / Doc | Observation → meaning → implication → action | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Customer Interview Guide | Doc | Opening, context, tasks and debrief | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Research Recruitment Screener | Form / Doc | Recruit against explicit criteria | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Research Synthesis Board | Miro / FigJam | Notes, clusters, patterns, implications | Raw Draft | FULL BOARD | sticky_cluster | P0 |
| Journey Mapping Board | Miro / FigJam | Stages, actions, experience, evidence, opportunities | Raw Draft | FULL BOARD | sticky_sequence | P0 |
| Service Blueprint Board | Miro / FigJam | Customer, frontstage, backstage, process, systems | Raw Draft | FULL BOARD | sticky_layers | P0 |
| Scenario Matrix Board | Miro / FigJam | Critical uncertainties and quadrants | Raw Draft | FULL BOARD | sticky_matrix | P0 |
| Horizon Scan Board | Miro / FigJam | Signals, source, domain, impact, horizon | Raw Draft | FULL BOARD | signal_constellation | P0 |
| Backcasting Board | Miro / FigJam | Future state → milestones → present actions | Raw Draft | FULL BOARD | sticky_timeline | P0 |
| Opportunity Map Board | Miro / FigJam | Evidence → needs/tensions → opportunities → bets | Raw Draft | FULL BOARD | sticky_cluster | P0 |
| Workshop Output Report | Slides / Doc | Question, process, decisions, artifacts, evidence, actions | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| One-week Follow-up Checklist | Checklist | Validate owners, implementation and unknowns | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Method Cheat Sheet | PDF | One-page run guide | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Method Comparison Sheet | PDF / webpage | When to use A vs B, trade-offs, prerequisites | Raw Draft | FULL GUIDE | plain_type | P1 |
| Facilitation Failure-mode Sheet | PDF | Common room problems and interventions | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Remote Workshop Checklist | PDF | Tech, access, boards, backups, breaks | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Physical Room Setup Checklist | PDF | Walls, boards, seating, supplies, accessibility | Raw Draft | FULL DOWNLOAD | plain_type | P1 |

# 21. Private/user-supplied research sources

These are useful inputs to Raw Draft's internal thinking, but should not automatically become public Library content.

## C4E 4R Process

Internal value:
- brand discovery;
- leadership/stakeholder interviews;
- team workshop;
- framework development;
- representation;
- rollout.

Public treatment:
- **PRIVATE RESEARCH** unless explicit permission is obtained.
- The document is marked for limited circulation.
- Use it to inform Raw Draft's understanding of how brand strategy can extend beyond a single workshop.
- Do not copy its process language, phase descriptions or templates publicly.

## The Futur — Unbland Yourself

Internal value:
- personal/brand strategy prompts;
- purpose and meaning;
- brand core;
- voice;
- ethos;
- positioning;
- packaging.

Public treatment:
- **PRIVATE RESEARCH / LINK TO OFFICIAL PRODUCT ONLY**.
- The supplied workbook states all rights reserved.
- Do not reproduce workbook pages, exercises or illustrations.
- It can inspire gaps in Raw Draft's brand-learning taxonomy.

## The Futur — Pocket Full of Do

Internal value:
- creativity;
- mindset;
- pricing;
- sales;
- negotiation;
- marketing;
- relationships.

Public treatment:
- **PRIVATE RESEARCH / LINK TO OFFICIAL BOOK ONLY**.
- The supplied copy states all rights reserved.

## The Futur — Client Acquisition Machine

Internal value:
- Prove → Invite → Qualify → Assess;
- qualification-question design;
- fit/disqualifier logic;
- assessment-call structure;
- content-to-client thinking.

Public treatment:
- **PRIVATE RESEARCH** for Raw Draft's commercial system.
- Do not reproduce its workbook, scoring prompts or proprietary material.
- Raw Draft's public qualification flow should remain original.

## Future of User Research Report 2026

Internal value:
- AI-assisted research;
- human judgment;
- research operations;
- synthesis;
- changing researcher roles.

Public treatment:
- first identify publisher/licence from the complete source before surfacing.
- Use as a cited Note/source rather than copying report content.

---

# 22. Verified source notes from this research pass

## SessionLab

Why it matters:
- one of the strongest references for what a usable method record needs;
- public method pages include duration, participant count and full instructions;
- submission guidance explicitly calls for materials, preparation, room setup, steps, debrief questions, variations and references.

Raw Draft use:
- borrow the completeness standard;
- use as discovery source;
- link to original authors where possible;
- do not mirror the entire database.

Sources:
- https://www.sessionlab.com/library/
- https://help.sessionlab.com/en/articles/4809592-guidelines-for-adding-new-methods-into-the-library

## Stanford d.school Design Thinking Bootleg

Why it matters:
- explicit method-card model;
- five modes: Empathize, Define, Ideate, Prototype, Test;
- downloadable deck;
- current Bootleg page states Creative Commons Attribution-NonCommercial-ShareAlike 4.0.

Raw Draft use:
- link to canonical download;
- create concise method references;
- respect non-commercial/share-alike terms before adapting or reproducing;
- useful reference for card-density and method-page structure.

Source:
- https://dschool.stanford.edu/tools/design-thinking-bootleg

## IDEO.org Design Kit

Why it matters:
- clear HCD method records with suggested time, difficulty, materials, participants and steps;
- useful source for interview, analogous inspiration, co-creation, role play, storyboard, prototyping, synthesis and framing methods;
- several methods explicitly use sticky notes and workshop artifacts.

Raw Draft use:
- curate selected methods;
- add Raw Draft commentary and cross-links;
- verify reuse/licence terms before reproducing instructions.

Source:
- https://www.designkit.org/methods.html

## Design Council

Why it matters:
- Double Diamond and Systemic Design Framework are strong public framework references;
- both pages identify CC BY 4.0 licensing.

Raw Draft use:
- include framework pages;
- adapt visuals only with proper attribution/licence compliance;
- add critique about when these models are useful and when they are too generic.

Sources:
- https://www.designcouncil.org.uk/resources/the-double-diamond/
- https://www.designcouncil.org.uk/resources/systemic-design-framework/

## LUMA Institute

Why it matters:
- publishes a clear inventory of 36 HCD methods;
- organizes them into Looking, Understanding and Making;
- strong coverage of ethnographic research, participatory research, evaluation, mapping, prioritisation, framing, ideation and prototyping.

Raw Draft use:
- source pages and method references;
- canonical links for commercial book/cards/training;
- do not recreate commercial cards.

Source:
- https://www.luma-institute.com/about-luma/luma-system-explore-methods/

## Liberating Structures

Why it matters:
- official menu currently presents 43 interaction structures;
- unusually strong source for inclusion, participation and room mechanics.

Raw Draft use:
- one Methodology page;
- curate the most useful structures;
- show where each fits inside a larger workshop;
- verify licence for any icon/artwork before reproducing.

Sources:
- https://www.liberatingstructures.com/
- https://www.liberatingstructures.com/ls-menu-1

## Gamestorming

Why it matters:
- broad catalogue of collaborative games;
- useful provenance information for many well-known workshop games;
- helps separate games from frameworks and Sprints.

Raw Draft use:
- Methodology / source page;
- curate individual games;
- link to canonical pages/book;
- do not copy book content.

Source:
- https://gamestorming.com/

## Service Design Tools

Why it matters:
- strong information architecture for service-design resources;
- filters by stage, participants, design target and representation;
- includes journey maps, service blueprints, stakeholder maps, system maps, signal cards, service prototypes, backcasting and more.

Raw Draft use:
- source hub;
- cross-link to Service Design and Experience Sprints;
- use as a taxonomy reference, not as a UI to copy.

Source:
- https://servicedesigntools.org/tools.html

## Strategyzer

Why it matters:
- canonical home for Business Model Canvas, Value Proposition Canvas and related tools;
- current library connects tools to guided playbooks and ready-to-run sessions;
- Experiment Library advertises 44 experiments.

Raw Draft use:
- link official tools;
- summarize purpose and when to use;
- connect to Raw Draft Playbooks;
- never duplicate paid playbook content.

Sources:
- https://www.strategyzer.com/library/the-business-model-canvas
- https://www.strategyzer.com/library/the-value-proposition-canvas
- https://www.strategyzer.com/library/experiment-library

## Character

Why it matters:
- public, detailed guides for Foundation Sprint, Design Sprint, Name Sprint and Note and Vote;
- Character Labs publicly identifies Foundation, Message, Leads, Demo, Design, recurring Customer Sprints and Pitch;
- Foundation + Design Sprint Miro template is publicly linked.

Raw Draft use:
- preserve creator attribution;
- source-link public methods;
- mark named but undocumented Sprints as OBSERVED;
- do not invent missing Character methods.

Sources:
- https://www.character.vc/guide/foundation-sprint
- https://www.character.vc/guide/design-sprint
- https://www.character.vc/guide/name-sprint
- https://www.character.vc/guide/note-and-vote
- https://www.character.vc/labs
- https://www.character.vc/guide/foundation-sprint-design-sprint-template
- https://www.jakepod.com/p/rough-guide-the-pitch-sprint

## LEGO Serious Play

Why it matters:
- should be modeled as a methodology, not a one-off activity;
- official LEGO page states it moved to a community-based model under Creative Commons in 2010;
- independent providers now offer facilitator training.

Raw Draft use:
- canonical methodology page;
- link to official open-source/background materials;
- verify exact Creative Commons terms before reproducing the full methodology;
- distinguish official LEGO Serious Play from generic construction-block workshops.

Source:
- https://www.lego.com/en-us/themes/serious-play/background

## UK Government Futures Toolkit

Why it matters:
- updated toolkit includes 12 futures tools;
- resource collection includes facilitator guides, worksheets/templates and exemplars for many tools.

Tools to index:
1. Delphi
2. Seven Questions
3. Horizon Scanning
4. Three Horizons
5. Driver Mapping
6. SWOT
7. Scenarios
8. Visioning
9. Futures Wheels
10. Policy Stress-testing
11. Roadmapping
12. Backcasting

Raw Draft use:
- one of the strongest public Futures source families;
- link to supporting worksheets;
- build Raw Draft commentary around method choice.

Sources:
- https://www.gov.uk/government/publications/futures-toolkit-for-policy-makers-and-analysts/the-futures-toolkit-html
- https://www.gov.uk/government/collections/futures-toolkit-resources-for-government-officials

## Policy Horizons Canada

Why it matters:
- modular public foresight training;
- framing, assumptions, scanning, system mapping, change drivers, scenarios and results;
- includes facilitator-ready presentation/speaking materials.

Raw Draft use:
- cornerstone Learn Foresight source;
- index assumptions, scanning, system mapping, cascade diagrams, cross-impact and scenario work.

Source:
- https://horizons.service.canada.ca/en/resources/

## UNDP Foresight Strategy Toolkit

Why it matters:
- modular foresight for strategic planning;
- chapters can be used independently.

Raw Draft use:
- Toolkit resource;
- connect chapters to Foresight, Scenario and Opportunity Sprints.

Source:
- https://www.undp.org/future-development/foresight-strategy-toolkit

## OECD OPSI Toolkit Navigator

Why it matters:
- a meta-library for hundreds of freely available public-sector innovation toolkits;
- includes editable source files where publishers permit.

Raw Draft use:
- discovery source for public-sector, policy, behavioural, service-design and innovation methods;
- link back to original publishers.

Source:
- https://oecd-opsi.org/toolkit-navigator/

## Nesta DIY Toolkit

Why it matters:
- 30 social innovation tools;
- individual printable templates;
- useful global/development context.

Raw Draft use:
- source hub;
- selectively surface tools that fill taxonomy gaps;
- check individual reuse rights before rehosting.

Source:
- https://www.nesta.org.uk/toolkit/diy-toolkit/

## IAF

Why it matters:
- six Core Competency areas provide a professional facilitation benchmark;
- Methods Library is hosted with SessionLab and much detailed content is member-gated.

Core competency areas:
1. Create collaborative client relationships
2. Plan appropriate group processes
3. Create and sustain a participatory environment
4. Guide the group toward useful outcomes
5. Build and maintain professional knowledge
6. Model a positive professional attitude

Raw Draft use:
- backbone of Learn Facilitation;
- link to IAF certification and knowledge resources;
- never duplicate member-only methods.

Sources:
- https://iaf-world.org/the-iaf-core-competencies/
- https://iaf-world.org/iaf-knowledge-centre/

## Miro and FigJam

Why they matter:
- asset repositories rather than methodology authorities;
- strong availability of brainstorm, strategy, journey, retrospective, design-sprint and icebreaker boards;
- FigJam supports community duplication.

Raw Draft use:
- link to high-quality boards when creator/source is clear;
- record platform, creator, duplicate URL, access requirement and last-verified date;
- prefer Raw Draft-created boards for core Raw Draft methods;
- do not use third-party board screenshots as site artwork without permission.

Sources:
- https://miro.com/templates/workshops/
- https://miro.com/templates/icebreaker-games/
- https://www.figma.com/templates/brainstorming/
- https://help.figma.com/hc/en-us/articles/1500004414082-Find-and-use-FigJam-templates

---

# 23. Suggested first public release

Do not launch with hundreds of thin records.

A stronger first release:

## 15 Sprints
- Foundation Sprint
- Opportunity Sprint
- Research Sprint
- Product Strategy Sprint
- Design Sprint
- Experience Strategy Sprint
- Service Design Sprint
- Positioning Sprint
- Brand Strategy Sprint
- AI Product Strategy Sprint
- GTM Sprint
- Decision Sprint
- Foresight Sprint
- Futures Thinking Sprint
- Scenario Sprint

## 20 Frameworks
- Cycle of Creation
- Assumption Mapping
- Opportunity Mapping
- Stakeholder Mapping
- Ecosystem Mapping
- Customer Journey Map
- Service Blueprint
- Jobs to Be Done
- Opportunity Solution Tree
- Business Model Canvas
- Value Proposition Canvas
- Decision Matrix
- Impact / Effort
- Competitive Alternatives
- System Map
- Futures Wheel
- Three Horizons
- Scenario Matrix
- Backcasting
- Message Hierarchy

## 25 Activities
- Note and Vote
- How Might We
- Affinity Mapping
- Dot Voting
- Silent Ideation
- Structured Critique
- Crazy 8s
- Four-Step Sketch
- Lightning Demos
- Expert Interview
- Five-Act Interview
- Concept Test
- Prototype Test
- Premortem
- 1-2-4-All
- What, So What, Now What?
- TRIZ
- Impromptu Networking
- Parking Lot
- Start / Stop / Continue
- Horizon Scanning
- Signal Clustering
- Driver Mapping
- Wind Tunnelling
- Backcasting

## 8 Playbooks
- Define an MVP
- Explore AI Opportunities
- Position a New Product
- Build a Brand Foundation
- Leadership Team Can't Agree
- Turn Research Into Decisions
- Explore the Future of a Category
- Rethink a Customer Experience

## 5 Methodology pages
- Design Thinking
- Liberating Structures
- Gamestorming
- LEGO Serious Play
- Strategic Foresight

## 15–20 external resource pages
Start with the strongest source families in section 22.

---

# 24. First Raw Draft downloadable pack

A strong first asset pack:

1. Workshop Brief
2. Facilitator Run Sheet
3. Participant Pre-read
4. Decision Log
5. Assumption Map
6. Experiment / Attempt Card
7. Research Question Canvas
8. Interview Guide
9. Research Synthesis Board
10. Opportunity Map
11. Product Strategy Board
12. Positioning Board
13. Brand Strategy Board
14. AI Opportunity Map
15. Horizon Scan Board
16. Scenario Matrix
17. Backcasting Board
18. Workshop Summary Report
19. Retrospective Sheet
20. Agent Prompt Pack

For high-frequency methods, provide:
- printable PDF;
- Miro or FigJam version;
- optional agent prompt.

---

# 25. Sticky-note card-art backlog

Create original card art for a subset of records so the Library feels tactile without becoming decorative.

1. Note and Vote: five notes with vote dots
2. Affinity Mapping: scattered notes resolving into three clusters
3. Assumption Mapping: four-quadrant sticky matrix
4. Impact / Effort: matrix with a few selected notes
5. Magic Lenses: repeated 2×2 mini-matrices
6. Opportunity Mapping: clusters becoming named territories
7. Stakeholder Mapping: actor notes around a centre
8. Customer Journey: horizontal note sequence
9. Service Blueprint: stacked note layers
10. 1-2-4-All: one → two → four → whole-group notes
11. Crazy 8s: eight rough paper frames
12. How Might We: question note plus generated responses
13. Premortem: failure notes around a future point
14. Horizon Scanning: scattered signal notes across categories
15. Three Horizons: notes distributed along three curves
16. Scenario Matrix: four quadrants containing future fragments
17. Futures Wheel: centre signal with cascading effects
18. Backcasting: future note with milestones moving backward
19. Retrospective: three/four note columns
20. Raw Draft Cycle: particles/stickies forming systems and cadence

Do not use sticky visuals for:
- books;
- courses;
- certifications;
- source libraries;
- methodology overview pages;
- serious games where boards/cards/tokens are more accurate.

---

# 26. Additional research passes to run later

1. Icebreakers and energisers: provenance, accessibility, cultural suitability.
2. Brand strategy: specialist sources, category/positioning/semiotic methods.
3. Cultural strategy: semiotics, subcultures, rituals, tensions, emerging behaviour.
4. Systems thinking: system dynamics, Soft Systems, complexity and mapping.
5. Serious games and wargaming: professional sources, game design and debrief practice.
6. Public-sector facilitation: OECD, Policy Lab, UNDP, participatory governance.
7. Research methods: current UX, market and behavioural research.
8. AI workshop methods: distinguish Raw Draft-tested patterns from trend-driven templates.
9. Inclusive facilitation: accessibility, neurodiversity, hybrid/remote participation, power.
10. Cross-cultural facilitation: use room conditions and power dynamics instead of national stereotypes.
11. Manufacturing / physical-product workshops.
12. Government / policy strategy.
13. Healthcare and regulated industries.
14. Financial services.
15. Hospitality and service operations.
16. Defence / scenario / resilience facilitation.

---

# 27. Canonical URLs collected

- SessionLab: https://www.sessionlab.com/library/
- SessionLab method guidelines: https://help.sessionlab.com/en/articles/4809592-guidelines-for-adding-new-methods-into-the-library
- Stanford d.school Bootleg: https://dschool.stanford.edu/tools/design-thinking-bootleg
- IDEO.org Design Kit: https://www.designkit.org/methods.html
- Design Council Double Diamond: https://www.designcouncil.org.uk/resources/the-double-diamond/
- Design Council Systemic Design: https://www.designcouncil.org.uk/resources/systemic-design-framework/
- LUMA methods: https://www.luma-institute.com/about-luma/luma-system-explore-methods/
- Liberating Structures: https://www.liberatingstructures.com/ls-menu-1
- Gamestorming: https://gamestorming.com/
- Service Design Tools: https://servicedesigntools.org/tools.html
- Strategyzer Business Model Canvas: https://www.strategyzer.com/library/the-business-model-canvas
- Strategyzer Value Proposition Canvas: https://www.strategyzer.com/library/the-value-proposition-canvas
- Strategyzer Experiment Library: https://www.strategyzer.com/library/experiment-library
- Character Foundation Sprint: https://www.character.vc/guide/foundation-sprint
- Character Design Sprint: https://www.character.vc/guide/design-sprint
- Character Name Sprint: https://www.character.vc/guide/name-sprint
- Character Note and Vote: https://www.character.vc/guide/note-and-vote
- Character Labs: https://www.character.vc/labs
- Character Foundation + Design Sprint template: https://www.character.vc/guide/foundation-sprint-design-sprint-template
- Jake Knapp Pitch Sprint: https://www.jakepod.com/p/rough-guide-the-pitch-sprint
- LEGO Serious Play: https://www.lego.com/en-us/themes/serious-play/background
- UK Futures Toolkit: https://www.gov.uk/government/publications/futures-toolkit-for-policy-makers-and-analysts/the-futures-toolkit-html
- UK Futures resources: https://www.gov.uk/government/collections/futures-toolkit-resources-for-government-officials
- Policy Horizons Canada: https://horizons.service.canada.ca/en/resources/
- UNDP Foresight Strategy Toolkit: https://www.undp.org/future-development/foresight-strategy-toolkit
- OECD OPSI Toolkit Navigator: https://oecd-opsi.org/toolkit-navigator/
- Nesta DIY Toolkit: https://www.nesta.org.uk/toolkit/diy-toolkit/
- IAF Core Competencies: https://iaf-world.org/the-iaf-core-competencies/
- IAF Knowledge Centre: https://iaf-world.org/iaf-knowledge-centre/
- Atlassian Team Health Monitor: https://www.atlassian.com/team-playbook/health-monitor
- Product Talk Opportunity Solution Tree: https://www.producttalk.org/opportunity-solution-trees/
- Christensen Institute JTBD: https://www.christenseninstitute.org/resources/theory/jobs-to-be-done/
- Amplitude North Star Framework: https://www.amplitude.com/books/north-star/about-north-star-framework
- Board of Innovation Concept Card: https://www.boardofinnovation.com/tools/concept-card/
- Miro workshops: https://miro.com/templates/workshops/
- Miro icebreakers: https://miro.com/templates/icebreaker-games/
- FigJam brainstorming templates: https://www.figma.com/templates/brainstorming/
- FigJam templates help: https://help.figma.com/hc/en-us/articles/1500004414082-Find-and-use-FigJam-templates
- Laws of UX: https://lawsofux.com/

---

# 28. Final principle

Raw Draft should not try to own every method.

The Library becomes valuable by doing four things well:

1. **Curate** the best original sources.
2. **Explain when a method is actually useful and when it is not.**
3. **Show how methods combine into Workshops, Sprints and Playbooks.**
4. **Add Raw Draft's own field-tested assets, failure modes, adaptations, boards and commentary.**

The value is the connected system and editorial judgment, not a pile of copied templates.
