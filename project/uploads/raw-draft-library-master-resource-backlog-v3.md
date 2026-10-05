---
title: Raw Draft Library — Master Resource Backlog
version: 0.3
date: 2026-10-04
owner: Raw Draft Strategy
status: Master inventory + content specification + expanded practice library
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


---

# 29. Detailed content architecture for filling every Library record

The tables above are the **inventory**. This section defines the depth each record can eventually contain.

The goal is to prevent two common failure modes:

1. a Library page becomes a thin definition page that tells people what a method is but not how to use it;
2. every content type gets forced into the same template even though a Sprint, framework, icebreaker and serious game require different information.

Use the structures below as the canonical fill specification.

---

## 29.1 Progressive completeness levels

Every record should have a `completeness_level`.

### LEVEL 0 — INDEX ONLY

Enough to exist in search.

Required:
- title
- type
- one-line purpose
- origin
- source
- domain
- goal
- status

Use for:
- observed methods
- long-tail external resources
- items awaiting research

Do not expose a page if it has no useful content beyond the index row unless the source link itself is valuable.

### LEVEL 1 — REFERENCE

Enough to help someone decide whether it is relevant.

Required:
- everything in Level 0
- what it is
- use when
- avoid when
- typical output
- duration if relevant
- participant count if relevant
- source / creator
- related resources

Use for:
- external frameworks
- books
- methodologies
- specialist methods

### LEVEL 2 — PRACTICAL GUIDE

Enough for a competent practitioner to use.

Required:
- everything in Level 1
- prerequisites
- materials
- preparation
- steps
- facilitator notes
- failure modes
- adaptations
- after-session actions
- at least one usable asset or canonical external resource

Use for:
- activities
- workshops
- Raw Draft frameworks
- high-frequency external methods where rights allow practical summarization

### LEVEL 3 — RUNNABLE

Someone should be able to prepare and run it without hunting elsewhere.

Required:
- everything in Level 2
- complete run-of-show
- timing per step
- exact outputs
- instructions to participants
- room or board setup
- sample prompts
- decision mechanism
- debrief
- troubleshooting
- remote adaptation
- downloadable asset
- facilitator checklist
- related sequence / what comes next

Use for:
- Raw Draft Sprints
- Raw Draft Workshops
- Raw Draft original activities
- legally reusable/open-source methods

### LEVEL 4 — FIELD-TESTED RAW DRAFT

Raw Draft has actually used it and can add operational judgment.

Required:
- everything in Level 3
- what usually works
- what usually fails
- what Raw Draft changes
- examples of adaptations
- anonymized evidence or work note
- decision points
- cuttable vs non-cuttable steps
- minimum viable version
- advanced version
- observed room dynamics
- version history

This is the ideal long-term state for core Raw Draft material.

---

# 30. Universal record fields with deeper guidance

These fields can exist across all content types.

## Identity

### `title`
Canonical public name.

Guidance:
- use the established name for external methods;
- do not rename a known methodology to make it sound proprietary;
- Raw Draft-created methods can have direct, descriptive names.

### `slug`
Stable human-readable URL.

### `type`
One primary type only.

Allowed:
- sprint
- workshop
- framework
- activity
- icebreaker
- energiser
- reflection
- serious_game
- simulation
- methodology
- playbook
- resource
- board
- prompt
- book
- course
- toolkit

Do not make a record simultaneously a framework and workshop. Use relationships instead.

### `subtype`
Optional more specific label.

Examples:
- decision method
- research method
- systems map
- prioritisation framework
- scenario game
- interview method

### `aliases`
Alternative names people may search.

Example:
```yaml
aliases:
  - affinity clustering
  - thematic clustering
  - sticky-note clustering
```

Use aliases for search. Do not create duplicate records.

---

## Provenance

### `origin`
Allowed:
- raw_draft
- adapted
- external
- observed
- private_research

### `creator`
Named individual(s), if confidently known.

### `organization`
Canonical organization or current steward.

### `source_url`
Prefer canonical creator/organization page.

### `secondary_sources`
Use only when needed for:
- historical provenance;
- practical adaptations;
- evidence;
- dead original links.

### `rights_status`
Suggested values:
- raw_draft_owned
- public_domain
- cc_by
- cc_by_sa
- cc_by_nc_sa
- open_government
- attribution_required
- link_only
- paid_resource
- private_research
- unknown

### `rights_note`
Plain-language operational rule.

Example:
> Link to the official workbook. Do not host a local copy.

### `last_verified`
Date the canonical link and rights were checked.

---

## User intent

### `one_line_purpose`
One sentence that answers:
**What does this help me do?**

Bad:
> A collaborative strategic framework.

Good:
> Rank uncertain assumptions by how important they are and how little evidence you have.

### `primary_question`
Useful for Sprints, Workshops and Frameworks.

Examples:
- What should we build?
- Which assumptions could kill this?
- What futures should this strategy survive?
- Why should someone choose this?

### `goals`
Controlled vocabulary.

Suggested:
- start
- understand
- research
- explore
- generate
- map
- align
- prioritize
- decide
- prototype
- test
- plan
- anticipate
- reflect
- learn
- energise

### `domains`
Multi-select:
- strategy
- product
- brand
- customer
- research
- experience
- service
- futures
- innovation
- ai
- technology
- culture
- gtM
- organization
- policy
- business

### `problems_it_solves`
Use recognizable situations rather than abstract labels.

Example:
- leadership has five competing directions;
- team keeps debating assumptions as facts;
- research is broad but not decision-oriented;
- product scope keeps expanding;
- category is changing faster than current strategy.

### `use_when`
3–7 concrete conditions.

### `avoid_when`
3–7 concrete conditions.

This is mandatory for serious methods.

Examples:
- decision has already been made;
- no decision-maker will participate;
- team needs execution rather than exploration;
- there is no evidence source available to validate the output;
- the exercise would create false certainty.

### `alternatives`
Methods someone could use instead.

Add:
- when alternative A is better;
- when this method is better.

This is extremely useful for Library UX.

---

## Practical metadata

### `duration`
Store:
- minimum
- typical
- maximum
- unit
- notes

Example:
```yaml
duration:
  min: 45
  typical: 90
  max: 120
  unit: minutes
  notes: Allow more time for groups above 10.
```

### `group_size`
Store:
- min
- ideal_min
- ideal_max
- max
- notes

### `facilitator_level`
Allowed:
- first_time_friendly
- practiced
- advanced
- specialist

### `participant_roles`
Examples:
- decision-maker
- founder
- product lead
- domain expert
- researcher
- frontline employee
- customer
- observer

### `decision_owner_required`
Boolean + notes.

### `format`
Multi-select:
- in_person
- remote
- hybrid
- asynchronous
- field
- tabletop
- physical_making
- digital_board

### `session_stage`
Multi-select:
- open
- explore
- make_sense
- create
- decide
- commit
- close
- energise
- reflect

### `energy_profile`
Optional:
- quiet
- analytical
- conversational
- creative
- physical
- high_energy
- reflective

### `cognitive_mode`
Optional:
- divergent
- convergent
- evaluative
- generative
- diagnostic
- reflective
- systemic

---

## Inputs and prerequisites

### `prerequisites`
Answer:
- what has to be true before this works?
- what information must already exist?
- who must be available?
- what decisions must be in scope?

Structure:
```yaml
prerequisites:
  required:
  helpful:
  not_required:
```

### `prework`
For each item:
- owner
- task
- due
- expected artifact
- time required

### `inputs`
Examples:
- research notes
- customer interviews
- strategy document
- market scan
- prototype
- existing journey
- current metrics
- known constraints
- decision statement

### `evidence_required`
Explicitly state whether the method can run on:
- opinion;
- existing research;
- customer evidence;
- quantitative data;
- expert input.

---

## Tools and setup

### `physical_materials`
Each item can have:
- item
- quantity
- required/optional
- substitute

### `digital_tools`
Each item:
- tool
- purpose
- required/optional
- alternative

Example:
```yaml
digital_tools:
  - tool: FigJam
    purpose: shared clustering
    required: false
    alternative: Miro or physical wall
```

### `room_setup`
Describe:
- seating;
- wall/board space;
- breakout requirement;
- whether participants should face a screen;
- whether movement is useful;
- accessibility considerations.

### `board_setup`
For Miro/FigJam:
- frame names;
- order;
- locked instructions;
- participant work area;
- facilitator-only area;
- parking lot;
- voting area;
- archive/reference area.

### `remote_setup`
Include:
- call tool;
- board access;
- permissions;
- backup channel;
- camera expectations;
- break cadence;
- async fallback.

---

## Outputs

### `primary_output`
One tangible thing.

Examples:
- ranked assumptions;
- chosen direction;
- service blueprint;
- scenario set;
- interview evidence;
- prototype;
- decision record.

### `secondary_outputs`
Useful but nonessential outputs.

### `decision_created`
If yes:
- what decision;
- who makes it;
- when.

### `evidence_created`
What new evidence exists afterward?

### `artifact_quality`
Suggested:
- rough
- working
- decision_ready
- stakeholder_ready
- execution_ready

Do not promise “clarity” alone.

---

# 31. Detailed page template: Sprint

A Sprint is the deepest operational content type.

## Required page sections

### 1. Header

Include:
- Sprint name
- primary question
- 1–2 sentence summary
- typical duration
- participant count
- facilitator level
- format
- output

### 2. What this Sprint is for

Explain:
- strategic problem;
- what changes after the Sprint;
- what it does not solve.

### 3. Use this when

Recognizable situations.

Target:
5–8 bullets.

### 4. Avoid this when

Target:
4–6 bullets.

Include:
- false urgency;
- absent decision rights;
- execution-only briefs;
- insufficient access to evidence;
- cases where a simpler workshop is enough.

### 5. What you need before starting

Subsections:
- decision owner;
- sponsor;
- participants;
- research/evidence;
- existing artifacts;
- constraints;
- room/digital setup;
- facilitator preparation.

### 6. Participants

For each role:
- why they are there;
- required or optional;
- which sessions they must attend;
- what happens if unavailable.

### 7. Pre-work

For facilitator:
- collect;
- review;
- prepare;
- pre-build.

For participants:
- read;
- submit;
- bring;
- decide.

### 8. Sprint map

Show the Sprint visually.

Example:
```text
Frame → Explore → Make → Test → Decide
```

Do not use generic stages if the actual Sprint has specific stages.

### 9. Detailed agenda

Every block gets:

```yaml
name:
time:
purpose:
input:
facilitator_does:
participants_do:
instructions:
materials:
output:
decision_point:
watch_for:
can_shorten:
never_skip:
```

### 10. Gates

A Sprint should have explicit gates.

For each:
- question;
- required evidence;
- decision;
- pass condition;
- fail condition;
- what happens if unresolved.

### 11. Facilitator notes

Cover:
- room dynamics;
- dominant participants;
- silent participants;
- executive participation;
- time pressure;
- conflict;
- false consensus;
- participants solving the wrong problem.

### 12. Common failure modes

For each:
```yaml
symptom:
why_it_happens:
intervention:
prevention:
```

### 13. Variations

At minimum:
- remote;
- half-time compressed;
- larger team;
- executive team;
- pre-revenue;
- enterprise;
- low research access.

### 14. After the Sprint

Include:
- what must be documented;
- what gets shared;
- what should happen in 24 hours;
- what should happen in one week;
- what gets tested;
- next recommended Sprint/method.

### 15. Resources

Buckets:
- Raw Draft assets
- boards
- prompts
- original source
- deeper reading

### 16. Used in practice

Links to Work entries.

### 17. Version history

Raw Draft-owned Sprints should show:
- current version;
- major changes;
- why the change was made.

---

# 32. Detailed page template: Workshop

Workshop pages are operational but usually shorter than Sprints.

## Required sections

1. Name + outcome
2. Use when
3. Avoid when
4. At a glance
5. Participants
6. Before
7. Agenda
8. Run it
9. Decision/output
10. Facilitator notes
11. Failure modes
12. Remote/in-person adaptation
13. After
14. Resources
15. Source/provenance

## Workshop agenda fields

```yaml
agenda_step:
  title:
  duration:
  purpose:
  participant_mode:
  prompt:
  instructions:
  material:
  output:
  transition:
  facilitator_warning:
```

## Participant modes

Useful controlled values:
- solo
- pair
- trio
- small_group
- whole_group
- silent
- discussion
- voting
- making
- presenting
- observing

This enables better search later.

---

# 33. Detailed page template: Framework

Frameworks are thinking structures, not automatically workshops.

## Required sections

### Principle
One sentence.

### What it helps you see
What relationship or distinction becomes clearer?

### Use when
Specific contexts.

### Avoid when
Where the framework oversimplifies or misleads.

### Model
Original visual or canonical external visual if rights allow.

### Parts
Explain each component.

### How to apply it
A light operational sequence.

### Example
Use a generic, non-confidential worked example.

### Interpretation
How to read the result.

### Limitations
Mandatory.

### Common misuse
Mandatory for popular frameworks.

### Related methods
What helps populate or use the framework.

### Related outputs
What it can feed into.

### Source
Creator, provenance, rights.

---

# 34. Detailed page template: Activity

Activities are atomic units.

## At a glance

Required:
- purpose;
- time;
- people;
- session stage;
- energy;
- output.

## Before

- setup;
- material;
- board;
- prompt.

## Run it

Target structure:

1. Frame
2. Individual/pair/group work
3. Share
4. Synthesize
5. Decide or close

Not every activity must use all five.

## Exact facilitator prompt

Store optional:
```yaml
say:
```

Use only where wording materially affects outcome.

## Debrief

For activities that create learning rather than decisions:
- what happened?
- what did you notice?
- what does it mean?
- what changes now?

## Variations

At minimum:
- remote;
- larger group;
- shorter version.

---

# 35. Detailed page template: Icebreaker

An Icebreaker should be evaluated by usefulness, not novelty.

## Required metadata

```yaml
purpose:
time:
group_size:
familiarity:
energy:
movement:
vulnerability:
remote_friendly:
materials:
```

### `familiarity`
- strangers
- mixed
- established_team
- any

### `vulnerability`
- very_low
- low
- moderate
- high

Avoid high-vulnerability activities with strangers unless there is a clear reason.

## Page sections

1. What it does
2. Best used for
3. Avoid when
4. Setup
5. Run it
6. How to close it
7. Accessibility/adaptation
8. Remote variation
9. Source

## Add “Why this works”

Keep it practical:
- gets every voice into the room;
- creates movement;
- lowers social friction;
- activates divergent thinking;
- surfaces context.

Do not make unsupported psychological claims.

---

# 36. Detailed page template: Energiser

Different from Icebreaker.

Required:
- energy before;
- desired energy after;
- physical movement;
- noise level;
- duration;
- accessibility;
- room requirement.

Page sections:
1. Use when
2. Avoid when
3. Run it
4. Adaptations
5. Accessibility
6. Close and transition

---

# 37. Detailed page template: Research Method

Research methods need stronger rigor than workshop activities.

## Required sections

1. Research question it can answer
2. Research question it cannot answer
3. Participant/sample requirements
4. Recruitment
5. Moderator/interviewer preparation
6. Protocol
7. Capture method
8. Analysis method
9. Evidence quality
10. Bias/failure modes
11. Ethical/privacy considerations
12. Output
13. How output feeds a decision
14. Templates
15. Source

## Evidence-quality fields

```yaml
evidence_type:
  - observed_behavior
  - self_report
  - attitudinal
  - quantitative
  - expert_judgment
  - market_signal
confidence_limitations:
```

This prevents the site from treating every research method as equivalent evidence.

---

# 38. Detailed page template: Serious Game

A Serious Game needs more than “fun workshop”.

## Required sections

### Strategic purpose
What will the game reveal?

### Learning objective
What should participants understand afterward?

### World / context
What system is being represented?

### Roles
For every role:
- objective;
- authority;
- constraints;
- private information;
- resources.

### Rules
Clear enough to run without facilitator improvisation.

### Rounds
For each:
- what time period it represents;
- decisions players make;
- information revealed;
- event introduced;
- consequence resolution.

### Resources
What players can spend, trade or control?

### Hidden information
If any.

### Win condition
Optional.

Many strategic games should not have a simplistic winner.

### End condition
When does play stop?

### Facilitator role
- referee;
- event controller;
- observer;
- resource manager;
- debrief lead.

### Observation sheet
Track:
- decisions;
- rationales;
- alliances;
- trade-offs;
- ignored information;
- emergent behaviour.

### Debrief
Mandatory.

Use:
1. What happened?
2. Why did it happen?
3. Which assumptions shaped behaviour?
4. What changed when new information entered?
5. What resembles the real system?
6. What does not?
7. What does this imply for the actual strategy?
8. What needs testing outside the game?

### Safety / limits
For conflict, geopolitical, defence, crisis or sensitive simulations:
- clarify fictionalization;
- define boundaries;
- avoid presenting game output as prediction.

---

# 39. Detailed page template: Simulation

A Simulation differs from a Serious Game when fidelity to a system or operating environment matters more than game mechanics.

Required:
- system being simulated;
- variables;
- actors;
- rules;
- state changes;
- information flows;
- time model;
- facilitator inputs;
- scenario events;
- output measures;
- debrief;
- limitations.

Add:
> What is deliberately simplified?

This is important.

---

# 40. Detailed page template: Methodology

Methodology pages explain a larger body of practice.

## Sections

1. What it is
2. What problem family it addresses
3. Core principles
4. Typical workflow
5. Core concepts
6. Methods within it
7. What it is good at
8. What it is weak at
9. Common misuse
10. Training / certification
11. Books
12. Official resources
13. Related Raw Draft Sprints
14. Raw Draft commentary
15. Provenance and licence

Do not write a fake “how to run LEGO Serious Play in 30 minutes” page if it is a specialist methodology.

---

# 41. Detailed page template: Playbook

A Playbook is a curated sequence for a recognizable situation.

## Required sections

### Situation
Describe the trigger.

Example:
> We have several product ideas but no shared definition of the MVP.

### Outcome
What should be true at the end?

### Time
Range from fast path to full path.

### Before
Evidence / people / decisions needed.

### Sequence

For each step:
```yaml
order:
resource:
why_now:
input:
output:
decision:
optional:
skip_if:
```

### Fast path
What can be done when time is constrained?

### Full path
Ideal sequence.

### Branches
Example:
- if research is weak → Research Sprint;
- if alignment is weak → Decision Workshop;
- if direction is clear → Prototype Test.

### Failure modes
What causes the playbook to fail?

### What you leave with
Tangible artifacts.

---

# 42. Detailed page template: External Resource

For books, toolkits, courses, articles and external libraries.

## Required

- title;
- creator;
- format;
- short summary;
- why Raw Draft recommends it;
- best for;
- who should skip it;
- cost/access if known;
- source link;
- rights note;
- related Library items.

## Raw Draft commentary

This is where the value is.

Use headings:
- **Useful for**
- **Strongest part**
- **Watch for**
- **Use it with**

Do not write generic book summaries.

---

# 43. Detailed page template: Board / Downloadable Asset

## Required fields

```yaml
title:
asset_type:
platform:
creator:
version:
updated:
related_resource:
purpose:
what_is_inside:
instructions:
access_requirement:
view_url:
duplicate_url:
download_url:
rights:
```

## For Miro / FigJam boards

Document frame structure.

Example:
```yaml
frames:
  - Welcome
  - Context
  - Individual work
  - Group synthesis
  - Decision
  - Parking lot
  - Outputs
```

Add:
- facilitator-only notes;
- locked elements;
- estimated board size;
- remote facilitation tips.

---

# 44. Detailed page template: Agent Prompt

Agent prompts are practical assets, not AI product features.

## Required

### Purpose
What task does the prompt support?

### Use after
Which Library resource or artifact should already exist?

### What to provide
Explicit input checklist.

### Prompt
Copyable block.

### Expected output
Structure the user should expect.

### Human verification
Mandatory.

Examples:
- verify source claims;
- check that no evidence was invented;
- check customer quotes;
- check legal/compliance implications;
- confirm decision criteria;
- validate participants/roles.

### Variants
Optional:
- Claude
- ChatGPT
- Gemini
- generic model

Only create model-specific versions where behavior meaningfully differs.

---

# 45. Search and filter metadata to add

The current inventory should be enriched with search-oriented metadata.

## Search synonyms

Examples:

| Canonical | Search synonyms |
|---|---|
| Affinity Mapping | clustering, thematic analysis, grouping stickies |
| Assumption Mapping | risk assumptions, riskiest assumption, uncertainty map |
| Service Blueprint | backstage map, service operations map |
| Horizon Scanning | signal scan, trend scan, weak signals |
| Premortem | failure exercise, imagine failure |
| Backcasting | work backward from future, reverse roadmap |
| Note and Vote | silent voting, silent brainstorming |
| Serious Game | strategy game, workshop game, simulation |
| Customer Interview | user interview, discovery interview |

Do this per record.

## Difficulty filters

Separate:
- **participant difficulty**
- **facilitator difficulty**

A method can be simple for participants and hard to facilitate.

## Evidence maturity

Suggested:
- conceptual
- widely_used
- practitioner_documented
- field_tested_raw_draft
- research_supported

Do not imply scientific validation where none exists.

## Preparation load

- none
- light
- moderate
- heavy

## Output type

Controlled:
- decision
- map
- hypothesis
- evidence
- ideas
- prioritization
- prototype
- scenario
- plan
- brief
- principles
- alignment
- learning

## Interaction mode

- silent
- discussion
- writing
- drawing
- voting
- mapping
- making
- roleplay
- gameplay
- interviewing
- observation

---

# 46. Relationship model

Relationships are a core part of the Library.

Use explicit relation types.

```yaml
relations:
  contains:
  uses:
  precedes:
  follows:
  alternative_to:
  complements:
  creates_input_for:
  consumes_output_of:
  part_of_methodology:
  source_for:
  asset_for:
  used_in_work:
```

Examples:

```text
Foundation Sprint
  uses → Note and Vote
  uses → Magic Lenses
  creates_input_for → Design Sprint
  source_for → Founding Hypothesis
```

```text
Research Sprint
  uses → Customer Interview
  uses → Affinity Mapping
  creates_input_for → Opportunity Mapping
```

```text
Scenario Sprint
  consumes_output_of → Horizon Scanning
  uses → Driver Mapping
  uses → Scenario Matrix
  precedes → Wind Tunnelling
```

Do not only use generic “related”.

---

# 47. Method-selection comparisons to create

These pages/blocks will make the Library much more useful.

## When to use Affinity Mapping vs Card Sorting

Affinity Mapping:
- synthesize material from evidence or ideas;
- clusters emerge from content.

Card Sorting:
- learn how participants categorize predefined items;
- useful for information architecture and mental models.

## Assumption Mapping vs Premortem

Assumption Mapping:
- prioritize what must be true;
- compare importance and evidence.

Premortem:
- imagine failure and surface risks not already explicit.

## Journey Map vs Service Blueprint

Journey Map:
- customer experience focus.

Service Blueprint:
- customer plus frontstage/backstage/process/system dependencies.

## Foresight Sprint vs Scenario Sprint

Foresight:
- understand wider change and uncertainty.

Scenario:
- stress-test a specific decision or strategy across plausible futures.

## Design Sprint vs Product Strategy Sprint

Design Sprint:
- test a specific solution/hypothesis rapidly.

Product Strategy Sprint:
- decide what product direction, workflow and scope are worth testing.

## Workshop vs Sprint

Workshop:
- bounded collaborative session.

Sprint:
- structured sequence of work that may include preparation, research, multiple sessions, making/testing and decisions.

Create comparison blocks for all commonly confused records.

---

# 48. Asset opportunity matrix

For every P0/P1 record, score these potential asset types:

| Asset | When to create |
|---|---|
| one-page cheat sheet | frequent method |
| facilitator run sheet | workshop/sprint |
| participant worksheet | participant writing required |
| printable canvas | framework with spatial structure |
| FigJam board | remote/collaborative sticky work |
| Miro board | complex spatial workshop |
| prompt pack | repeated text/research/synthesis work |
| card deck | prompts, signals, scenarios, games |
| checklist | preparation or quality control |
| sample output | users need to understand expected artifact |
| worked example | framework is abstract |
| debrief guide | game/reflection |
| facilitation script | wording materially affects method |
| research protocol | interview/test method |

Add `asset_opportunities` to every record.

---

# 49. Card-visual specification

Every visual reference should have an art-direction note, not just a tag.

Example:

```yaml
visual_reference:
  type: sticky_cluster
  concept: 17 scattered notes becoming 4 clear clusters
  stage: clarity
  density: medium
  motion: optional
  accent_use: one cluster only
  labels: none
```

## Visual rules

- no fake handwriting;
- no faux office-photo realism;
- no stock-photo post-it walls;
- no brand logos unless source/resource page requires them;
- no gradients;
- no 3D glossy sticky notes;
- use simple rectangles, paper, lines, dots, tokens;
- communicate the method through spatial structure.

## Suggested sticky palettes

Do not mimic the exact Post-it brand palette.

Use Raw Draft system:
- warm off-white notes;
- muted grey notes;
- single orange/red active note;
- occasional low-contrast secondary tone.

Cards can still be mostly monochrome.

---

# 50. P0 record fill blueprints

These are not full finished articles. They define the depth expected when filling high-priority records.

---

## 50.1 Foundation Sprint

### Type
Sprint

### Origin
External / Character

### Creator
Jake Knapp + John Zeratsky / Character

### Core purpose
Define what should be built before committing to building it.

### Primary output
A testable Founding Hypothesis.

### Known structure from current research
- target customer;
- important customer problem;
- advantage;
- competitors including “do nothing”;
- differentiation;
- principles;
- possible approaches;
- multiple evaluative lenses;
- primary and backup approach;
- Founding Hypothesis.

### Known mechanics
- Note and Vote;
- Decider;
- 2×2 charts;
- Magic Lenses;
- approximately two days;
- small team.

### Asset opportunities
- canonical Character guide;
- canonical Miro template;
- Raw Draft prep checklist;
- Raw Draft “when to use / avoid” commentary;
- Raw Draft Founding Hypothesis review prompt;
- source-linked facilitation notes.

### Raw Draft commentary to fill later
- when this is better than a Product Strategy Sprint;
- which clauses should be tested first;
- when the 2×2 differentiation framing creates false confidence;
- what changes for service, enterprise and AI products.

### Do not fabricate
Character's undocumented variations or internal client examples.

---

## 50.2 Product Strategy Sprint

### Type
Sprint

### Origin
Raw Draft

### Primary question
What product is worth building?

### Proposed stages
1. Product hypothesis
2. Actors and jobs
3. Value exchange
4. Experience / workflow
5. Scope
6. MVP boundary
7. Assumptions
8. Test plan

### Prerequisites
- named decision owner;
- a reasonably defined opportunity/problem;
- access to existing customer/market evidence;
- known constraints.

### Outputs
- product hypothesis;
- actor model;
- workflow;
- product principles;
- MVP boundary;
- key assumptions;
- testing roadmap.

### Gates
1. **Problem gate**: is the target problem specific enough?
2. **Value gate**: is the value exchange credible?
3. **Workflow gate**: can the critical user/system flow be described?
4. **Scope gate**: what is required to test the central hypothesis?
5. **Evidence gate**: what is still assumption?

### Methods that may appear
- JTBD;
- stakeholder/actor map;
- journey/workflow map;
- assumption mapping;
- decision matrix;
- product principles;
- prototype/test.

### Asset opportunities
- Product Strategy FigJam;
- participant pre-work;
- MVP Boundary canvas;
- Assumption Register;
- Product Principles sheet;
- AI prompt: turn workflow into candidate product assumptions.

### Failure modes to fill
- feature-listing before value is clear;
- MVP treated as smallest build rather than smallest meaningful test;
- architecture discussion overtakes strategy;
- internal stakeholder preferences presented as customer evidence.

---

## 50.3 Research Sprint

### Primary question
What do we need to know before deciding?

### Proposed flow
1. Decision to inform
2. Existing evidence
3. Assumptions
4. Research questions
5. Method selection
6. Fieldwork
7. Synthesis
8. Implications
9. Decision

### Required distinction
The Sprint begins with the decision, not with “let's do research”.

### Outputs
- evidence map;
- research questions;
- method plan;
- raw evidence;
- patterns;
- implications;
- revised assumptions;
- decision recommendations.

### Asset opportunities
- Research Question Canvas;
- interview guide;
- research plan;
- recruitment screener;
- evidence map;
- synthesis board;
- AI prompt for clustering notes with source traceability.

### Failure modes
- asking hypothetical rather than behavioural questions;
- collecting evidence with no decision in scope;
- treating five interviews as quantitative validation;
- AI synthesis losing provenance;
- selecting participants for convenience rather than relevance.

---

## 50.4 Decision Sprint

### Primary question
What decision needs to be made?

### Proposed flow
1. Frame decision
2. Separate facts / assumptions / preferences
3. Generate real options
4. Define criteria
5. Identify evidence gaps
6. Evaluate
7. Decide
8. Record commitment

### Outputs
- decision statement;
- considered options;
- criteria;
- evidence;
- decision;
- rationale;
- unresolved assumptions;
- owner;
- next actions.

### Key rules
- a vote can inform, but should not obscure decision rights;
- criteria should exist before final scoring;
- “do nothing” can be a valid option;
- decision should be documented.

### Assets
- Decision Brief;
- Criteria Matrix;
- Decision Log;
- Premortem;
- agent prompt to audit criteria for overlap/bias.

---

## 50.5 Foresight Sprint

### Primary question
What changes should we prepare for?

### Proposed flow
1. Frame focal issue
2. Scan signals
3. Cluster changes
4. Identify drivers
5. Map system
6. Surface critical uncertainties
7. Explore plausible futures
8. Derive implications
9. Define no-regret moves and watch indicators

### Inputs
- focal question;
- current strategy;
- external sources;
- stakeholder perspectives.

### Outputs
- signal landscape;
- drivers;
- system map;
- uncertainties;
- futures/scenarios;
- implications;
- opportunity/threat map;
- indicators;
- no-regret moves.

### Core external sources
- UK Futures Toolkit;
- Policy Horizons Canada;
- UNDP.

### Assets
- scanning board;
- signal card;
- driver map;
- system map;
- uncertainty matrix;
- indicator tracker;
- agent prompt for scan-source planning.

### Failure modes
- trends presented as predictions;
- only technology signals;
- no dissenting sources;
- scenarios differ only cosmetically;
- scenarios not linked back to decisions.

---

## 50.6 Scenario Sprint

### Primary question
How might different futures change this decision?

### Flow
1. Decision/focal issue
2. Relevant drivers
3. Critical uncertainties
4. Scenario logic
5. Build worlds
6. Test strategy/options
7. Identify robust moves
8. Define indicators

### Output
3–4 strategically distinct scenarios plus implications.

### Required page explanation
Scenarios are not forecasts.

### Assets
- scenario-axis board;
- scenario writing prompts;
- world-building worksheet;
- wind-tunnelling matrix;
- indicator sheet;
- speculative artifact prompt.

---

## 50.7 Assumption Mapping

### Type
Framework + activity

### Purpose
Find the assumptions that are both important and weakly evidenced.

### Inputs
- proposed direction;
- claims;
- current evidence.

### Suggested axes
- importance / consequence;
- evidence / confidence.

Be explicit that other mappings use different axes.

### Output
Prioritized assumptions + next tests.

### Run structure
1. state decision/hypothesis;
2. silently generate assumptions;
3. normalize wording;
4. place assumptions;
5. challenge placements;
6. identify highest-risk assumptions;
7. assign next evidence action.

### Failure modes
- “risk” used as a vague synonym for concern;
- teams ranking what is scary rather than what must be true;
- confidence based on seniority;
- no follow-up test.

### Asset
- printable 2×2;
- FigJam board;
- assumption register;
- test prompt.

---

## 50.8 Note and Vote

### Purpose
Collect independent thinking before social influence and use voting as input to a decision.

### Known Character mechanics
- specific question;
- silent writing;
- silent share;
- silent vote;
- brief discussion if needed;
- Decider decides.

### Important distinction
Voting does not necessarily equal the decision.

### Use when
- group input matters;
- loudest voice bias is a risk;
- question can be framed specifically.

### Avoid when
- options require deep shared understanding first;
- vote would create false legitimacy around a decision that needs expert judgment;
- anonymous input could create accountability problems.

### Asset
- one-page facilitator sheet;
- generic sticky-note visual;
- FigJam frame.

---

## 50.9 Affinity Mapping

### Purpose
Turn a large set of observations or ideas into emergent groupings.

### Inputs
- atomic observations;
- interview notes;
- ideas;
- evidence fragments.

### Run variants
- silent clustering;
- facilitated clustering;
- participant-led naming;
- researcher synthesis.

### Critical integrity rule
Preserve link to source evidence when synthesizing research.

### Output
Clusters, labels, anomalies, unresolved fragments.

### Failure modes
- clusters reflect preconceived categories;
- quotes lose participant/source IDs;
- outliers are deleted;
- group forces every note into a cluster.

### Assets
- FigJam template;
- synthesis checklist;
- AI-assisted clustering prompt with provenance constraints.

---

## 50.10 How Might We

### Purpose
Translate evidence/problems into generative questions.

### Quality criteria
A good HMW is:
- grounded in evidence;
- neither solution-disguised nor impossibly broad;
- connected to a meaningful user/system need.

### Failure modes
- “How might we build an app that…”;
- generic questions disconnected from research;
- hundreds of HMWs with no prioritisation.

### Output
Prioritized generative questions.

### Related
- Design Sprint;
- opportunity mapping;
- ideation methods.

---

## 50.11 Stakeholder Mapping

### Purpose
Understand who affects, is affected by, controls or supplies part of a system.

### Dimensions to support
- influence;
- interest;
- need;
- relationship;
- power;
- information;
- value exchange.

Do not force every map to use power/interest.

### Output
Actor map + relationship questions + research gaps.

### Failure modes
- listing stakeholders without relationships;
- confusing org chart with ecosystem;
- omitting informal actors;
- no action after mapping.

---

## 50.12 Service Blueprint

### Purpose
Connect customer experience to frontstage, backstage, process and supporting systems.

### Required layers
At minimum:
- customer actions;
- frontstage;
- backstage;
- support/process.

Optional:
- evidence;
- technology;
- policy;
- ownership;
- metrics;
- pain points.

### Inputs
A journey or observed service evidence.

### Output
Operational service model and intervention areas.

### Avoid when
Only a high-level journey is needed.

### Assets
- FigJam/Miro board;
- printable legend;
- service evidence checklist.

---

## 50.13 Jobs to Be Done

### Page should distinguish
- JTBD as theory;
- job statements;
- JTBD interviews;
- switch interviews;
- “job stories” or product-team adaptations.

Do not collapse all JTBD practices into one method.

### Useful page sections
- core idea;
- circumstances/progress;
- functional/social/emotional dimensions where appropriate;
- research approaches;
- product application;
- common oversimplifications;
- source traditions.

---

## 50.14 Horizon Scanning

### Purpose
Systematically collect evidence of change around a focal issue.

### Record fields
- focal issue;
- source categories;
- STEEP/domain;
- signal description;
- evidence URL;
- date;
- geography;
- maturity;
- uncertainty;
- possible implications.

### Output
Signal library, clusters and candidate drivers.

### Failure modes
- collection becomes trend-news scrapbook;
- no source provenance;
- no weak or contradictory signals;
- recency mistaken for importance.

### Assets
- scan spreadsheet/database;
- signal-card template;
- source plan;
- AI prompt for source-query generation.

---

## 50.15 Backcasting

### Purpose
Work backward from a desired or defined future to identify prerequisites and actions.

### Flow
1. define future state;
2. define observable conditions;
3. move backward through milestones;
4. identify capabilities/decisions;
5. find present actions;
6. identify assumptions.

### Output
Reverse roadmap.

### Avoid when
The future state is too vague or is being treated as a prediction.

---

## 50.16 LEGO Serious Play

### Type
Methodology

### Public treatment
Summary + official source.

### Page emphasis
- what it is;
- why physical construction/metaphor is used;
- individual models;
- shared models;
- system modelling;
- reflection/dialogue;
- facilitator training ecosystem;
- rights/licence notes;
- official source.

### Do not
- publish a fake 30-minute “LSP activity” and call it the full methodology;
- imply Raw Draft certification;
- use LEGO brand assets without permission.

### Related Raw Draft possibilities
- generic construction-based strategy workshop;
- physical system mapping;
- future service modelling.

These should be labelled as Raw Draft formats, not LEGO Serious Play unless actually using the methodology correctly.

---

## 50.17 Tabletop Strategy Game

### Origin
Raw Draft format to develop.

### Purpose
Create a controlled environment where teams make strategic choices under changing conditions.

### Minimum architecture
- system map;
- actor roles;
- resource model;
- turns/rounds;
- decisions;
- event deck;
- consequence rules;
- information model;
- observation sheet;
- debrief.

### Game-design questions
- What behaviour are we trying to reveal?
- Which real-system constraints must be represented?
- What can be abstracted?
- What information is public?
- What information is private?
- What changes between rounds?
- How are consequences resolved?
- Does the game reward the same thing as the real strategy?
- What biases might the game itself introduce?

### Assets
- board;
- role cards;
- event cards;
- resource tokens;
- round sheet;
- facilitator control sheet;
- debrief guide;
- printable kit;
- FigJam/Miro remote edition.

---

# 51. Content-writing prompts for filling blank fields

Use these prompts internally when creating entries.

## Purpose prompt

> In one sentence, what practical thing becomes easier, clearer or possible after using this resource? Name the tangible output or decision if possible.

## Use-when prompt

> List 5 recognizable situations in which a practitioner would actively reach for this resource. Avoid abstract phrases such as “when alignment is needed.”

## Avoid-when prompt

> List situations where this resource is unnecessary, misleading, too heavyweight, too lightweight, or requires prerequisites the team does not have.

## Prerequisite prompt

> What people, information, authority, access, evidence or preparation must exist before the method can produce a credible result?

## Failure-mode prompt

> What does a failed version of this method look like in the room? Why does it happen? What should the facilitator do in the moment? How can it be prevented?

## Output prompt

> Name the artifact, decision, evidence or next action that should physically exist at the end. Avoid “clarity” unless paired with something tangible.

## Adaptation prompt

> What changes when this is run remotely, with executives, with more than 15 people, with only 30 minutes, or with low evidence?

## Source prompt

> Who created or popularized this method? What is the canonical current source? What may Raw Draft legally reproduce, adapt or download?

## Raw Draft commentary prompt

> Based on actual use or careful research, what is this method especially good at? What does it tend to hide? What would Raw Draft change? Which part should never be skipped?

---

# 52. Editorial depth rules

Every page should contain enough information to be useful without becoming a textbook.

## Short pages
Use for:
- icebreakers;
- simple activities;
- individual resources.

Target:
500–1,000 useful words when complete.

## Medium pages
Use for:
- frameworks;
- research methods;
- methodologies summaries.

Target:
1,000–2,500 words when complete.

## Deep pages
Use for:
- Sprints;
- major Workshops;
- serious games;
- Raw Draft original playbooks.

Target:
2,000–5,000+ words if needed.

Do not hit word counts mechanically. Operational usefulness matters more.

---

# 53. Quality checklist before publishing a record

A record is publishable when a visitor can answer:

1. What is it?
2. What does it help me do?
3. When should I use it?
4. When should I not use it?
5. How much time does it take?
6. Who needs to be there?
7. What do I need beforehand?
8. What does the facilitator need to prepare?
9. How do I actually run it?
10. What comes out of it?
11. What usually goes wrong?
12. How do I adapt it?
13. What should happen next?
14. Where did this method come from?
15. What can I download/open/copy?
16. What related method might be better for my situation?

If a page cannot answer the relevant subset, it is not ready.

---

# 54. Suggested data-entry order

Do not fill the entire inventory alphabetically.

Recommended sequence:

## Wave 1: make core Sprints runnable
1. Foundation Sprint
2. Opportunity Sprint
3. Research Sprint
4. Product Strategy Sprint
5. Decision Sprint
6. Foresight Sprint
7. Scenario Sprint
8. Positioning Sprint
9. Brand Strategy Sprint
10. AI Product Strategy Sprint

## Wave 2: fill atomic methods used by those Sprints
1. Note and Vote
2. Assumption Mapping
3. Affinity Mapping
4. How Might We
5. Stakeholder Mapping
6. Opportunity Mapping
7. Decision Matrix
8. Customer Interview
9. Concept Test
10. Premortem
11. Horizon Scanning
12. Driver Mapping
13. Scenario Matrix
14. Wind Tunnelling
15. Backcasting

## Wave 3: assets
Create the downloadable/board resources attached to Waves 1 and 2.

## Wave 4: methodology/source pages
Populate:
- Design Thinking
- Liberating Structures
- Gamestorming
- LEGO Serious Play
- Strategic Foresight
- Service Design
- Systems Thinking

## Wave 5: long-tail resource expansion
Only after the core experience is strong.

---

# 55. Final content principle

The Library should not become “a page for every named framework on the internet.”

A resource belongs when at least one is true:

- Raw Draft uses it;
- it is a foundational method people need to understand;
- it fills a clear gap in a Sprint or Playbook;
- it is a strong external resource worth curating;
- it demonstrates an important alternative approach;
- it helps someone actually run better work.

Depth should increase around the methods Raw Draft believes are useful, not evenly across the entire inventory.

---

# 56. Taxonomy correction: the Library is not a framework directory

The Library should deliberately contain **different kinds of useful things**. A framework is only one content type.

A visitor may be looking for:

- a complete Sprint;
- a 90-minute Workshop;
- a 10-minute exercise;
- an icebreaker;
- a research method;
- a consulting diagnostic;
- a strategy model;
- a service-design tool;
- a UX evaluation method;
- a serious game;
- a physical making format;
- a facilitation technique;
- a conversation structure;
- a decision mechanic;
- a downloadable worksheet;
- a Miro or FigJam board;
- a checklist;
- a book;
- a course;
- a toolkit;
- an original source;
- a prompt;
- a worked example;
- a reference visual.

The public Library should therefore use **resource type** as one dimension rather than the organizing principle for the whole experience.

## Expanded canonical resource types

```yaml
resource_types:
  - sprint
  - workshop
  - playbook
  - framework
  - model
  - diagnostic
  - activity
  - exercise
  - facilitation_method
  - conversation_structure
  - decision_method
  - research_method
  - ux_method
  - service_design_tool
  - design_method
  - ideation_method
  - prototyping_method
  - evaluation_method
  - icebreaker
  - check_in
  - energiser
  - reflection
  - retrospective
  - serious_game
  - simulation
  - tabletop_exercise
  - methodology
  - toolkit
  - template
  - worksheet
  - canvas
  - board
  - checklist
  - card_deck
  - prompt
  - example
  - book
  - course
  - certification
  - article
  - source_library
```

## Add a second classification: `practice_family`

```yaml
practice_family:
  - consulting
  - business_strategy
  - product_strategy
  - ux
  - user_research
  - service_design
  - facilitation
  - innovation
  - brand
  - culture
  - go_to_market
  - organization
  - operations
  - change
  - systems
  - foresight
  - futures
  - ai
  - public_sector
```

A single record can belong to several practice families, but should still have one primary `resource_type`.

Examples:

```text
Issue Tree
resource_type: framework
practice_family: consulting, business_strategy
```

```text
Cognitive Walkthrough
resource_type: evaluation_method
practice_family: ux
```

```text
Service Safari
resource_type: research_method
practice_family: service_design, ux
```

```text
1-2-4-All
resource_type: facilitation_method
practice_family: facilitation
```

```text
Four Quadrants
resource_type: icebreaker
practice_family: facilitation
```

This is the structure the CMS should use going forward.

# 57. Consulting problem-solving methods, analyses and artifacts

Consulting content should include **ways of solving and communicating problems**, not only strategy matrices. This section contains analytical methods, diagnostic structures, work-planning techniques and executive communication artifacts.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Problem Statement | Consulting tool | Define the decision/problem, scope, constraints and success condition | Consulting practice | RAW DRAFT guide | plain_type | P0 |
| Issue Tree | Problem-solving framework | Break a broad problem into structured sub-questions | Consulting practice | RAW DRAFT guide with sources | sticky_tree | P0 |
| Hypothesis Tree | Problem-solving framework | Structure possible explanations or strategic hypotheses and what would prove/disprove them | Consulting practice | RAW DRAFT guide with sources | sticky_tree | P0 |
| MECE Structuring | Problem-solving principle | Reduce overlap and obvious gaps when decomposing a problem | Consulting practice | RAW DRAFT guide with source notes | sticky_tree | P0 |
| Hypothesis-led Problem Solving | Consulting method | Start with a testable point of view, identify required evidence, update it as evidence changes | Consulting practice | RAW DRAFT guide | sticky_sequence | P0 |
| Key Question / Sub-question Map | Consulting tool | Translate a vague brief into answerable questions | Raw Draft / consulting practice | FULL GUIDE | sticky_tree | P0 |
| Workplan by Question | Consulting planning tool | Assign analyses and evidence collection to strategic questions | Consulting practice | RAW DRAFT template | sticky_sequence | P0 |
| Evidence / Fact Base | Consulting artifact | Create a shared verified base before recommendation work | Consulting practice | RAW DRAFT template | plain_type | P0 |
| Fact / Assumption / Interpretation Split | Diagnostic exercise | Separate what is known, inferred and believed | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| 80/20 Prioritisation | Problem-solving principle | Focus analysis on the small number of questions most likely to change the decision | Consulting practice | RAW DRAFT guide | sticky_funnel | P1 |
| Pareto Analysis | Diagnostic | Identify the small number of contributors responsible for much of an outcome | Quality/operations practice | RAW DRAFT guide with sources | plain_type | P1 |
| Benchmarking | Analysis method | Compare performance, capability, offer or experience against relevant peers | Consulting practice | RAW DRAFT guide | plain_type | P0 |
| Best-practice Benchmark | Analysis method | Compare against high-performing analogues rather than only direct competitors | Consulting practice | RAW DRAFT guide | plain_type | P1 |
| Market Map | Analysis artifact | Map competitors, substitutes, segments and adjacent players | Consulting / strategy practice | RAW DRAFT guide | sticky_map | P0 |
| Competitive Landscape | Analysis method | Compare alternatives across strategically meaningful dimensions | Strategy practice | RAW DRAFT guide | sticky_matrix | P0 |
| Competitor Teardown | Analysis method | Systematically inspect proposition, product, experience, channel and business model | Product/strategy consulting | RAW DRAFT guide | plain_type | P0 |
| Market Sizing | Analysis method | Estimate market scale using explicit assumptions and triangulation | Consulting practice | RAW DRAFT guide | plain_type | P0 |
| Top-down Market Sizing | Analysis method | Estimate from macro totals and relevant shares | Consulting practice | RAW DRAFT guide | plain_type | P1 |
| Bottom-up Market Sizing | Analysis method | Estimate from units, customers, price and frequency | Consulting practice | RAW DRAFT guide | plain_type | P0 |
| TAM / SAM / SOM | Market framework | Separate theoretical, addressable and realistically obtainable markets | Startup/strategy practice | RAW DRAFT guide with caveats | sticky_layers | P1 |
| Market Segmentation | Analysis method | Group a market around meaningful differences in needs, behaviour or economics | Consulting/marketing practice | RAW DRAFT guide | sticky_cluster | P0 |
| Customer Segmentation | Analysis method | Create decision-useful customer groups from evidence | Consulting/research practice | RAW DRAFT guide | sticky_cluster | P0 |
| Value Chain Analysis | Strategy framework | Examine where activities, cost, differentiation and advantage are created | Michael Porter / strategy practice | SUMMARY + SOURCE | sticky_sequence | P1 |
| Profit Pool Analysis | Strategy analysis | Understand where economic value is created/captured across a market or value chain | Consulting practice | RAW DRAFT guide with sources | plain_type | P2 |
| Value Driver Tree | Consulting framework | Decompose financial or operating outcomes into drivers | Consulting / finance practice | RAW DRAFT guide | sticky_tree | P0 |
| KPI Tree | Performance framework | Connect strategic outcomes to leading and operational indicators | Consulting / performance practice | RAW DRAFT guide | sticky_tree | P0 |
| Sensitivity Analysis | Decision analysis | Test how conclusions change when assumptions change | Finance/consulting practice | RAW DRAFT guide | plain_type | P0 |
| Scenario Analysis | Decision analysis | Compare outcomes under distinct assumption sets | Consulting/strategy practice | RAW DRAFT guide | sticky_matrix | P0 |
| Decision Tree Analysis | Decision framework | Map choices, uncertain events and possible outcomes | Decision analysis | RAW DRAFT guide | sticky_tree | P1 |
| Cost-Benefit Analysis | Decision analysis | Compare expected costs and benefits with explicit assumptions | Economics/consulting practice | RAW DRAFT guide | plain_type | P1 |
| Business Case | Consulting artifact | Combine rationale, value, costs, risk, assumptions and implementation requirements | Consulting practice | RAW DRAFT template | plain_type | P0 |
| Option Evaluation | Consulting method | Compare strategic options against explicit criteria and evidence | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Recommendation Pyramid | Communication structure | Lead with recommendation, then support with reasons and evidence | Consulting communication practice | RAW DRAFT guide with source notes | plain_type | P0 |
| SCQA | Communication structure | Situation, Complication, Question, Answer for framing a strategic story | Consulting communication practice | RAW DRAFT guide with source notes | plain_type | P1 |
| Pyramid Principle / Top-down Storylining | Communication methodology | Organize executive communication around a governing idea and supporting logic | Barbara Minto | SUMMARY + SOURCE / book | plain_type | P1 |
| Executive Storyboard | Consulting exercise | Arrange recommendation logic before creating slides | Consulting practice | RAW DRAFT guide | paper_sketches | P0 |
| Synthesis Workshop | Workshop | Turn many analyses into a small set of implications and recommendations | Raw Draft / consulting practice | FULL GUIDE | sticky_cluster | P0 |
| So What? Test | Consulting exercise | Force every finding to connect to a decision or implication | Consulting practice | RAW DRAFT guide | single_sticky | P0 |
| Implication Ladder | Consulting exercise | Move from observation → implication → strategic consequence → action | Raw Draft | FULL GUIDE | sticky_sequence | P0 |

# 58. Strategy-consulting frameworks and portfolio tools

These are recognizable business/consulting frameworks. Many have clear owners, so Raw Draft should summarize, critique and link rather than present them as proprietary inventions. McKinsey explicitly maintains a collection of enduring frameworks including 7-S, the GE–McKinsey matrix and Three Horizons; BCG maintains canonical pages for the Growth-Share Matrix and other classic strategy concepts.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| McKinsey 7-S | Organization framework | Examine interdependent organizational factors affecting effectiveness/change | McKinsey | SUMMARY + SOURCE | sticky_map | P1 |
| GE–McKinsey Nine-Box Matrix | Portfolio framework | Prioritize business units using industry attractiveness and competitive strength | GE / McKinsey | SUMMARY + SOURCE | sticky_matrix | P2 |
| Three Horizons of Growth | Portfolio / innovation framework | Manage current business, emerging growth and future options concurrently | McKinsey lineage | SUMMARY + SOURCE | sticky_timeline | P0 |
| Business System | Strategy framework | Connect activities into an integrated business strategy | McKinsey | SUMMARY + SOURCE | sticky_sequence | P2 |
| Industry Cost Curve | Strategy analysis | Understand competitive cost positions and market economics | McKinsey / strategy practice | SUMMARY + SOURCE | plain_type | P2 |
| Structure-Conduct-Performance | Industry framework | Relate industry structure, firm conduct and performance | Industrial organization / McKinsey classic | SUMMARY + SOURCE | sticky_sequence | P2 |
| Strategic Control Map | Corporate strategy framework | Examine control and value dynamics in an industry | McKinsey | SUMMARY + SOURCE | sticky_map | P3 |
| Portfolio of Initiatives | Strategy framework | Manage a portfolio of initiatives under uncertainty | McKinsey | SUMMARY + SOURCE | sticky_matrix | P2 |
| BCG Growth-Share Matrix | Portfolio framework | Prioritize businesses based on relative share and market growth | BCG | SUMMARY + SOURCE | sticky_matrix | P1 |
| BCG Experience Curve | Strategy concept | Understand potential cost decline with accumulated experience | BCG | SUMMARY + SOURCE | plain_type | P2 |
| BCG Time-Based Competition | Strategy concept | Use speed and cycle time as competitive advantage | BCG | SUMMARY + SOURCE | sticky_timeline | P3 |
| BCG Rule of Three and Four | Industry structure hypothesis | Explore concentration and competitive structure | BCG | SUMMARY + SOURCE + limitations | plain_type | P3 |
| Strategy Palette / Your Strategy Needs a Strategy | Strategy framework | Match strategic approach to predictability, malleability and environment | BCG Strategy Institute | SUMMARY + SOURCE | sticky_matrix | P2 |
| RAPID Decision Rights | Decision framework | Assign Recommend, Agree, Perform, Input and Decide roles | Bain & Company | SUMMARY + SOURCE; trademark noted | plain_type | P1 |
| Balanced Scorecard | Performance framework | Connect strategy to financial, customer, internal-process and learning measures | Kaplan & Norton | SUMMARY + SOURCE | sticky_layers | P2 |
| VRIO | Strategy framework | Evaluate resources by value, rarity, imitability and organization | Resource-based strategy | SUMMARY + SOURCE | sticky_matrix | P2 |
| Core Competence Analysis | Strategy framework | Identify capabilities that create distinctive value across businesses | Prahalad & Hamel lineage | SUMMARY + SOURCE | sticky_cluster | P2 |
| SWOT / TOWS | Strategy framework | Use internal/external factors to derive strategic options | Strategy practice | RAW DRAFT guide with sources | sticky_matrix | P1 |
| PESTLE / STEEP | Environmental scan | Structure external change across macro domains | Strategy / foresight practice | RAW DRAFT guide | sticky_cluster | P1 |
| Porter's Five Forces | Industry framework | Assess structural forces shaping profitability and competition | Michael Porter | SUMMARY + SOURCE | plain_type | P1 |
| Generic Strategies | Strategy framework | Examine broad bases of competitive advantage | Michael Porter | SUMMARY + SOURCE | sticky_matrix | P3 |
| Ansoff Matrix | Growth framework | Explore market penetration, market development, product development and diversification | Igor Ansoff | SUMMARY + SOURCE | sticky_matrix | P2 |
| Blue Ocean Strategy Canvas | Strategy framework | Compare competing factors and value curves | Blue Ocean Strategy | SUMMARY + SOURCE | plain_type | P2 |
| ERRC Grid | Strategy exercise | Eliminate, Reduce, Raise, Create factors in an offering | Blue Ocean Strategy | SUMMARY + SOURCE | sticky_matrix | P2 |
| Playing to Win Choice Cascade | Strategy framework | Make linked choices about aspiration, arena, advantage, capability and systems | Lafley & Martin | SUMMARY + SOURCE | sticky_sequence | P1 |
| Good Strategy Kernel | Strategy framework | Diagnosis, guiding policy and coherent action | Richard Rumelt | SUMMARY + SOURCE | sticky_sequence | P1 |
| Strategic Bets Portfolio | Raw Draft framework | Define bets, assumptions, upside, downside, evidence and kill conditions | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| No-Regret / Option / Big-Bet Portfolio | Uncertainty framework | Separate actions by robustness and dependency on future conditions | Strategy/foresight practice | RAW DRAFT guide | sticky_matrix | P0 |

# 59. Organization design, operating model and transformation

This area turns strategy into organizational reality. It should include diagnostics, design artifacts, governance, change mechanics and implementation tools, rather than only conceptual models.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Target Operating Model | Operating-model framework | Describe how strategy will be delivered through capabilities, process, people, technology, governance and data | Consulting practice | RAW DRAFT guide | sticky_layers | P0 |
| Operating Model Canvas | Operating-model tool | Structure value delivery, capabilities, organization, information, locations and suppliers | Operating model practice | SUMMARY + SOURCE where applicable | sticky_map | P2 |
| Capability Map | Organization framework | Map business capabilities independent of org chart/process | Enterprise architecture/consulting | RAW DRAFT guide | sticky_map | P0 |
| Capability Maturity Assessment | Diagnostic | Assess capability maturity against explicit criteria | Consulting practice | RAW DRAFT template | sticky_matrix | P0 |
| Capability Heatmap | Diagnostic artifact | Visualize strength, strategic importance and investment need | Consulting practice | RAW DRAFT template | sticky_matrix | P0 |
| Organization Design Principles | Strategy artifact | Define constraints/rules for organizational design before boxes and lines | Org design practice | RAW DRAFT guide | single_sticky | P0 |
| Org Design Options | Workshop / analysis | Develop and compare alternative organizational configurations | Consulting practice | RAW DRAFT guide | sticky_map | P1 |
| Spans and Layers Analysis | Org diagnostic | Inspect management layers and spans of control | Organization consulting | RAW DRAFT guide with sources | plain_type | P2 |
| Decision Architecture | Organization framework | Map critical decisions, rights, inputs, forums and escalation | Raw Draft / decision practice | FULL GUIDE | sticky_map | P0 |
| Governance Map | Organization framework | Map forums, decision rights, escalation and information flow | Consulting practice | RAW DRAFT guide | sticky_map | P0 |
| Meeting Architecture | Organization design tool | Design recurring forums around decisions rather than calendars | Raw Draft | FULL GUIDE | sticky_timeline | P1 |
| Ways of Working Workshop | Workshop | Agree operating rhythms, roles, norms and decision mechanics | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Team Topology Map | Org/system mapping | Map team boundaries, interactions and ownership | Team design practice | RAW DRAFT guide with sources | sticky_map | P2 |
| Stakeholder Influence / Support Map | Change diagnostic | Map influence and current support/resistance | Change practice | RAW DRAFT guide | sticky_matrix | P0 |
| Change Impact Assessment | Change diagnostic | Identify who is affected, how, and what must change | Change management practice | RAW DRAFT guide | sticky_matrix | P0 |
| Change Readiness Assessment | Diagnostic | Assess conditions affecting adoption and transition | Change practice | RAW DRAFT guide | sticky_matrix | P1 |
| Force Field Analysis | Change framework | Map forces supporting and resisting change | Kurt Lewin lineage | SUMMARY + SOURCE | sticky_matrix | P1 |
| ADKAR | Change framework | Awareness, Desire, Knowledge, Ability, Reinforcement | Prosci | LINK / SUMMARY; proprietary framework | sticky_sequence | P2 |
| Kotter 8-Step Process | Change framework | Organizational change sequence | Kotter | LINK / SUMMARY | sticky_sequence | P2 |
| Transformation Roadmap | Consulting artifact | Sequence initiatives, dependencies, decisions and value milestones | Consulting practice | RAW DRAFT template | sticky_timeline | P0 |
| Initiative Charter | Consulting artifact | Define initiative owner, outcome, scope, measures, dependencies and risks | Consulting practice | RAW DRAFT template | plain_type | P0 |
| Benefits Map | Transformation framework | Connect initiatives to capabilities, behaviours and measurable benefits | Change/benefits-realization practice | RAW DRAFT guide | sticky_tree | P1 |
| Risk / Assumption / Issue / Dependency Log | Delivery artifact | Maintain RAID items and ownership | Program-management practice | RAW DRAFT template | plain_type | P1 |
| PMO Decision Cadence | Operating mechanism | Structure program governance around decisions and evidence | Raw Draft | FULL GUIDE | sticky_timeline | P1 |

# 60. Operations, process and value-delivery methods

Raw Draft's strategy and service work can extend into process and operating design. These resources support implementation without turning the practice into generic operations consulting.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| SIPOC | Process framework | Define suppliers, inputs, process, outputs and customers | Six Sigma / process improvement | SUMMARY + SOURCE | sticky_sequence | P1 |
| Process Map | Operations method | Represent sequence, handoffs and decisions in a process | Operations practice | RAW DRAFT guide | sticky_sequence | P0 |
| Swimlane Process Map | Operations method | Show responsibilities and cross-functional handoffs | Operations/service design | RAW DRAFT guide | sticky_layers | P0 |
| Value Stream Map | Lean method | Map material/information flow, delays and value/non-value activity | Lean manufacturing | SUMMARY + SOURCE | sticky_sequence | P1 |
| Bottleneck Analysis | Operations diagnostic | Find constraints limiting throughput/performance | Operations practice | RAW DRAFT guide | plain_type | P1 |
| Fishbone / Ishikawa Diagram | Root-cause framework | Explore categories of possible causes | Quality management | SUMMARY + SOURCE | sticky_tree | P1 |
| Root Cause Analysis | Diagnostic method | Move from symptoms to underlying causes using multiple evidence techniques | Operations/quality practice | RAW DRAFT guide | sticky_tree | P0 |
| Failure Mode and Effects Analysis | Risk method | Prioritize potential failure modes by severity/occurrence/detection | Quality engineering | SUMMARY + SOURCE | plain_type | P2 |
| Pareto Chart / Analysis | Diagnostic | Focus attention on high-contribution causes/issues | Quality practice | RAW DRAFT guide | plain_type | P1 |
| Standard Work | Operations artifact | Document best-known current sequence and conditions for repeatable work | Lean practice | SUMMARY + SOURCE | sticky_sequence | P2 |
| Service Operations Map | Service/operations framework | Connect demand, capacity, process, handoffs and service quality | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Capacity / Demand Map | Operations analysis | Compare demand patterns with operating capacity | Operations practice | RAW DRAFT guide | plain_type | P1 |
| Failure Demand Analysis | Service diagnostic | Identify demand generated because service failed or was unclear | Service operations / systems thinking | RAW DRAFT guide with sources | plain_type | P2 |
| Cost-to-Serve Analysis | Business analysis | Understand cost by segment, channel, service or journey | Consulting/finance practice | RAW DRAFT guide | plain_type | P2 |
| Process Pain-point Walkthrough | Exercise | Review process step by step with frontline staff and evidence | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Handoff Audit | Exercise | Identify information loss, delay, ambiguity and ownership gaps at transitions | Raw Draft | FULL GUIDE | sticky_layers | P0 |

# 61. UX research, evaluation and design methods

NN/g's current UX research references explicitly separate generative, formative and summative research, and include field studies, diary studies, interviews, card sorting, tree testing, usability testing, benchmarking, accessibility evaluation, analytics and surveys. The Library should therefore represent UX as a full practice, not a handful of frameworks.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| UX Research Method Selection | Framework | Choose generative, formative or summative methods based on the question and product stage | Nielsen Norman Group / UX research practice | SUMMARY + SOURCE | sticky_matrix | P0 |
| Field Study | Research method | Observe people and work in natural context | UX research | RAW DRAFT guide with sources | plain_type | P0 |
| Contextual Inquiry | Research method | Observe and ask questions while users perform real work | HCI / UX research | SUMMARY + SOURCE | plain_type | P0 |
| Diary Study | Research method | Understand behaviours and experiences over time | UX research | RAW DRAFT guide with sources | plain_type | P1 |
| User Interview | Research method | Understand behaviour, context, motivations and needs | UX research | RAW DRAFT guide | plain_type | P0 |
| Stakeholder Interview | Research method | Understand organizational goals, constraints and decision context | UX/consulting practice | RAW DRAFT guide | plain_type | P0 |
| Task Analysis | Research / modeling method | Break down user goals, steps, decisions and knowledge required | HCI / UX | RAW DRAFT guide | sticky_sequence | P0 |
| Context of Use Analysis | Research framework | Document users, goals, tasks, environment and constraints | Human factors / UX | RAW DRAFT guide | sticky_map | P1 |
| Requirements & Constraints Gathering | Discovery method | Collect functional, technical, legal, business and user constraints | UX/product practice | RAW DRAFT guide | sticky_cluster | P0 |
| Competitive UX Review | Evaluation method | Compare key journeys, interaction patterns and experience tradeoffs across alternatives | UX practice | RAW DRAFT guide | paper_sketches | P0 |
| Design Review | Evaluation method | Review design against goals, evidence, interaction logic and system consistency | UX/design practice | RAW DRAFT guide | paper_sketches | P0 |
| UX Critique | Facilitation / evaluation method | Structured peer critique focused on goals, evidence and tradeoffs | Design practice | RAW DRAFT guide | paper_sketches | P0 |
| Heuristic Evaluation | Evaluation method | Review an interface against usability heuristics | Nielsen Norman Group / Jakob Nielsen | SUMMARY + SOURCE | plain_type | P0 |
| Nielsen's 10 Usability Heuristics | UX framework | General interaction-design principles used for inspection | Jakob Nielsen / NN/g | SUMMARY + SOURCE + attribution | plain_type | P0 |
| Cognitive Walkthrough | Evaluation method | Evaluate learnability by stepping through tasks from a new-user perspective | HCI / NN/g | SUMMARY + SOURCE | sticky_sequence | P0 |
| Usability Testing | Evaluation method | Observe representative users attempting realistic tasks | UX research | RAW DRAFT guide with sources | plain_type | P0 |
| Moderated Remote Usability Test | Evaluation method | Run task-based testing with live moderator remotely | UX research | RAW DRAFT guide | plain_type | P1 |
| Unmoderated Usability Test | Evaluation method | Collect task performance at scale without live moderator | UX research | RAW DRAFT guide | plain_type | P1 |
| Benchmark Usability Test | Quantitative evaluation | Track performance metrics across versions or competitors | UX research | RAW DRAFT guide | plain_type | P1 |
| First-click Testing | Evaluation method | Test where users first click for a task | UX/IA research | RAW DRAFT guide | plain_type | P1 |
| Five-second Test | Evaluation method | Probe immediate comprehension/visual hierarchy | UX research practice | RAW DRAFT guide with caveats | paper_sketches | P2 |
| Preference Test | Evaluation method | Compare subjective preference among design alternatives | UX research | RAW DRAFT guide with caveats | paper_sketches | P2 |
| Desirability Study | Evaluation method | Understand aesthetic/brand impressions using structured adjectives | UX research / Microsoft toolkit lineage | SUMMARY + SOURCE | plain_type | P2 |
| A/B Test | Experiment | Compare behaviour between controlled variants | Experimentation practice | RAW DRAFT guide | plain_type | P1 |
| Multivariate Test | Experiment | Compare combinations of multiple interface variables | Experimentation practice | RAW DRAFT guide | plain_type | P3 |
| Accessibility Evaluation | Evaluation method | Assess experience against accessibility standards and assistive-technology needs | Accessibility / UX practice | RAW DRAFT guide + WCAG source | plain_type | P0 |
| Screen-reader Review | Accessibility method | Evaluate core tasks with screen-reader interaction | Accessibility practice | RAW DRAFT guide | plain_type | P1 |
| Keyboard-only Review | Accessibility method | Evaluate navigation and operation without pointing device | Accessibility practice | RAW DRAFT guide | plain_type | P0 |
| Content Comprehension Test | Research method | Test whether people understand critical language/instructions | Content design/UX | RAW DRAFT guide | plain_type | P0 |
| Error-state Audit | UX evaluation | Review validation, recovery, empty/error states and failure handling | Raw Draft | FULL GUIDE | paper_sketches | P0 |
| State Inventory | UX design artifact | Enumerate loading, empty, success, error, disabled and edge states | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Interaction Flow Review | UX evaluation | Trace task flows, decision points, feedback and dead ends | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| UX Debt Audit | Diagnostic | Identify accumulated usability, consistency, accessibility and design-system debt | Raw Draft | FULL GUIDE | sticky_matrix | P1 |

# 62. Information architecture and content design

This family is particularly relevant to Raw Draft's own Library. It includes research methods, structural artifacts and content-quality reviews rather than only visual design.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Content Inventory | IA method | Catalogue content, metadata, owners and quality before restructuring | Information architecture/content strategy | RAW DRAFT guide | plain_type | P1 |
| Content Audit | Evaluation method | Assess content quality, duplication, gaps and performance | Content strategy | RAW DRAFT guide | plain_type | P1 |
| Open Card Sorting | Research method | Learn how participants naturally group and label items | Information architecture | RAW DRAFT guide | cards_deck | P0 |
| Closed Card Sorting | Research method | Test fit of items into predefined categories | Information architecture | RAW DRAFT guide | cards_deck | P1 |
| Hybrid Card Sorting | Research method | Mix predefined categories with participant-created groups | Information architecture | RAW DRAFT guide | cards_deck | P2 |
| Tree Testing | IA evaluation | Test findability in a text-only hierarchy | Information architecture | RAW DRAFT guide | sticky_tree | P0 |
| Sitemap Workshop | Workshop | Create or revise a site/product information hierarchy collaboratively | Raw Draft | FULL GUIDE | sticky_tree | P0 |
| Navigation Model | UX artifact | Define global, local, contextual and utility navigation relationships | Raw Draft | FULL GUIDE | sticky_map | P1 |
| Top Tasks | Research/prioritization method | Identify tasks users most need to complete | UX/content strategy | RAW DRAFT guide with sources | sticky_vote | P1 |
| Mental Model Mapping | Research/synthesis method | Connect user goals/thinking to product capabilities | UX research | RAW DRAFT guide | sticky_sequence | P1 |
| Taxonomy Design | IA method | Create controlled categories and metadata that support findability | Information architecture | RAW DRAFT guide | sticky_tree | P0 |
| Label Testing | Research method | Test whether category/navigation labels are understood | IA/content design | RAW DRAFT guide | plain_type | P1 |
| Search Query Analysis | Research method | Use on-site search terms to understand intent and content gaps | UX analytics | RAW DRAFT guide | plain_type | P1 |
| Support-ticket Analysis | Research method | Use support/contact data to identify recurring experience failures | UX/service research | RAW DRAFT guide | sticky_cluster | P0 |
| FAQ Analysis | Research method | Use recurring questions as evidence of language, discoverability or product gaps | UX/content research | RAW DRAFT guide | sticky_cluster | P1 |
| Content Model | Information architecture artifact | Define reusable content entities, fields and relationships | Content strategy/product design | RAW DRAFT guide | sticky_map | P0 |
| Microcopy Review | UX/content evaluation | Evaluate labels, instructions, errors and actions for clarity | Content design | RAW DRAFT guide | plain_type | P0 |
| Plain-language Review | Content evaluation | Reduce unnecessary complexity and jargon | Content design | RAW DRAFT guide | plain_type | P0 |

# 63. UX measurement and evidence

A useful UX Library should also cover measurement. These records should be explicit about whether a metric captures behaviour, perception or business outcomes.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| HEART Framework | UX measurement framework | Structure metrics around Happiness, Engagement, Adoption, Retention and Task Success | Google UX research lineage | SUMMARY + SOURCE | sticky_layers | P1 |
| SUS | Questionnaire | Measure perceived usability with a standardized 10-item scale | John Brooke / usability research | SUMMARY + SOURCE | plain_type | P1 |
| UMUX-Lite | Questionnaire | Short perceived-usability measure | UX measurement research | SUMMARY + SOURCE | plain_type | P2 |
| Single Ease Question | Post-task metric | Capture perceived task difficulty after a task | Usability research | SUMMARY + SOURCE | plain_type | P1 |
| Task Success Rate | UX metric | Measure whether users complete a defined task | UX research | RAW DRAFT guide | plain_type | P0 |
| Time on Task | UX metric | Measure task duration under defined conditions | UX research | RAW DRAFT guide | plain_type | P1 |
| Error Rate | UX metric | Track errors during critical tasks | UX research | RAW DRAFT guide | plain_type | P1 |
| Conversion Funnel | Behavioural analysis | Understand stepwise completion/drop-off | Product analytics | RAW DRAFT guide | sticky_funnel | P0 |
| Retention Cohort | Behavioural analysis | Compare continued use across cohorts/time | Product analytics | RAW DRAFT guide | plain_type | P1 |
| Search Success | UX metric | Assess whether search leads to useful results/outcomes | UX/IA analytics | RAW DRAFT guide | plain_type | P1 |
| Experience KPI Map | Raw Draft framework | Connect experience principles/journeys to observable metrics | Raw Draft | FULL GUIDE | sticky_tree | P0 |
| UX Benchmark Scorecard | Asset | Combine behavioural and attitudinal measures across critical journeys | Raw Draft | FULL GUIDE / DOWNLOAD | plain_type | P1 |

# 64. Service design tools, methods and exercises

Service Design Tools currently organizes methods across Research, Ideation, Prototyping, Implementation and Evaluation, and across Context, System, Experience and Offering. Its live catalogue includes Journey Map, Service Blueprint, System Map, Ecosystem Map, Offering Map, Service Safari, Service Prototype, Service Roadmap, Experience Principles, Synthesis Wall, Research Plan, Evaluation Matrix, Success Metrics and many more. This section should be treated as an actual practice library, not as one 'Service Blueprint' page.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Service Safari | Research method | Experience a service first-hand to observe the end-to-end experience and context | Service Design Tools / service design practice | SUMMARY + SOURCE | sticky_sequence | P0 |
| Journey Map | Service design tool | Map customer/user experience across stages and touchpoints | Service design practice | RAW DRAFT guide with sources | sticky_sequence | P0 |
| Emotional Journey | Service design tool | Layer emotional experience over a journey | Service Design Tools | SUMMARY + SOURCE | sticky_sequence | P1 |
| Service Blueprint | Service design tool | Map customer actions, frontstage, backstage, support and systems | Service design practice | RAW DRAFT guide with sources | sticky_layers | P0 |
| System Map | Service design tool | Represent actors/components and exchanges involved in service delivery | Service Design Tools | SUMMARY + SOURCE | system_loops | P0 |
| Ecosystem Map | Service design tool | Map entities, relationships and value/information flows around the service | Service Design Tools | SUMMARY + SOURCE | sticky_map | P0 |
| Stakeholders Map | Service design tool | Map actors by relationship, influence, need or role | Service design practice | RAW DRAFT guide | sticky_map | P0 |
| Offering Map | Service design tool | Describe and structure what value/features a service provides | Service Design Tools | SUMMARY + SOURCE | sticky_map | P1 |
| Experience Principles | Strategy artifact | Define principles that guide service/experience choices | Service Design Tools / service design practice | RAW DRAFT guide with sources | single_sticky | P0 |
| Experience Prototype | Prototyping method | Prototype key parts of an experience rather than only interfaces | Service design practice | RAW DRAFT guide | plain_type | P0 |
| Service Prototype | Prototyping method | Simulate an orchestrated service across touchpoints and people | Service Design Tools | SUMMARY + SOURCE | plain_type | P0 |
| Role Playing | Prototyping method | Act out service interactions to uncover issues and opportunities | Service Design Tools / IDEO.org | SUMMARY + SOURCE | plain_type | P0 |
| Rough Prototyping | Prototyping method | Create fast low-fidelity service/touchpoint representations | Service Design Tools | SUMMARY + SOURCE | paper_sketches | P1 |
| Concept Walkthrough | Evaluation / prototype method | Walk stakeholders/users through a service concept step by step | Service Design Tools | SUMMARY + SOURCE | sticky_sequence | P1 |
| User Scenario | Design artifact | Describe how a user interacts with a service in a contextual scenario | Service Design Tools | SUMMARY + SOURCE | paper_sketches | P1 |
| Service Image | Communication artifact | Represent a service concept holistically | Service Design Tools | SUMMARY + SOURCE | paper_sketches | P2 |
| Service Specification | Implementation artifact | Document service behavior, touchpoints, process and requirements | Service Design Tools | SUMMARY + SOURCE | plain_type | P0 |
| Service Roadmap | Implementation artifact | Sequence MVP, service evolution, dependencies and validation | Service Design Tools | SUMMARY + SOURCE | sticky_timeline | P0 |
| Success Metrics | Measurement tool | Define success measures for a service or journey | Service Design Tools | SUMMARY + SOURCE | sticky_tree | P0 |
| Evaluation Matrix | Decision framework | Evaluate service concepts against explicit criteria | Service Design Tools | SUMMARY + SOURCE | sticky_matrix | P0 |
| Research Plan | Research artifact | Define learning goals, participants, methods and logistics | Service Design Tools | SUMMARY + SOURCE | plain_type | P0 |
| Recruiting Screener | Research asset | Define criteria/questions for recruiting suitable participants | Service Design Tools | SUMMARY + SOURCE | plain_type | P0 |
| Interview Guide | Research asset | Structure interviews around learning goals and prompts | Service Design Tools | SUMMARY + SOURCE | plain_type | P0 |
| Observation Notes | Research asset | Capture evidence systematically during field observation | Service Design Tools | SUMMARY + SOURCE | plain_type | P1 |
| Synthesis Wall | Synthesis method | Externalize evidence and cluster it into patterns/insights | Service Design Tools | SUMMARY + SOURCE | sticky_cluster | P0 |
| Hypothesis Generation | Discovery exercise | Make assumptions and initial hypotheses explicit before field research | Service Design Tools | SUMMARY + SOURCE | sticky_cluster | P0 |
| Transition Journey | Implementation / change tool | Map movement from current service state to future service state | Service Design Tools | SUMMARY + SOURCE | sticky_timeline | P1 |
| Future Backcasting | Futures / service method | Work backward from future service model to present actions | Service Design Tools | SUMMARY + SOURCE | sticky_timeline | P1 |
| System Scenario | Systems / futures tool | Represent how an ecosystem behaves under a future condition | Service Design Tools | SUMMARY + SOURCE | system_loops | P2 |
| Signal Cards | Futures/service tool | Use external signals to provoke future service implications | Service Design Tools | SUMMARY + SOURCE | cards_deck | P1 |
| Behaviour Change Wheel | Behaviour/service framework | Structure behaviour-change intervention thinking | COM-B / Behaviour Change Wheel lineage | SUMMARY + SOURCE | plain_type | P2 |
| Touchpoint Inventory | Service design exercise | Catalogue physical, digital and human touchpoints across a journey | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Channel Map | Service design framework | Map where interactions occur and how channels connect | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Moments That Matter | Service design exercise | Identify high-consequence moments within an experience | Experience strategy practice | RAW DRAFT guide | sticky_vote | P0 |
| Frontstage / Backstage Handoff Audit | Service design exercise | Inspect where customer-facing moments depend on hidden operations | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Service Recovery Map | Service design framework | Design what happens when a service fails | Raw Draft | FULL GUIDE | sticky_sequence | P1 |
| Service Evidence Inventory | Service design method | Identify physical/digital evidence through which customers perceive the service | Service design tradition | RAW DRAFT guide with sources | paper_sketches | P2 |
| Service Staging | Prototyping method | Stage a service interaction with actors, props and environment | Service design practice | RAW DRAFT guide with sources | plain_type | P1 |
| Desktop Walkthrough | Prototyping method | Use small props/figures to simulate service flow and interactions | Service design practice | RAW DRAFT guide with sources | tokens_board | P1 |
| Business Origami | Physical mapping method | Use simple physical objects to model actors, relationships and value flows | Design/service-design practice | SOURCE TO VERIFY before detailed publication | tokens_board | P2 |

# 65. Expanded facilitation methods and room mechanics

SessionLab currently indexes well over a thousand facilitation methods and explicitly groups resources around team, energiser, idea generation, issue resolution, issue analysis, action, skills and remote work. The Raw Draft Library should not try to replicate that volume, but it should cover the core interaction structures people actually need to design and run sessions.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Nominal Group Technique | Facilitation / decision method | Generate ideas independently, share, clarify and rank systematically | Delbecq/Van de Ven lineage | SUMMARY + SOURCE | sticky_vote | P1 |
| Wise Crowds | Peer consulting structure | Give each participant structured access to group advice | Liberating Structures | SUMMARY + SOURCE | plain_type | P1 |
| What I Need From You (WINFY) | Coordination structure | Make cross-functional requests and responses explicit | Liberating Structures | SUMMARY + SOURCE | sticky_sequence | P1 |
| Helping Heuristics | Facilitation structure | Practice distinct helping/listening behaviours and reflect on interaction patterns | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| Critical Uncertainties | Facilitation / strategy structure | Explore strategy under important uncontrollable uncertainties | Liberating Structures | SUMMARY + SOURCE | sticky_matrix | P1 |
| Mad Tea Party | Reflection / networking structure | Rapid paired sentence-completion rounds to surface perspectives | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| ProAction Café | Peer consulting format | Develop projects/ideas through rotating peer conversations | Art of Hosting community | SUMMARY + SOURCE | plain_type | P2 |
| Circle Practice | Conversation structure | Use a circle, turn-taking and shared agreements for deeper dialogue | Art of Hosting / circle practice | SUMMARY + SOURCE | plain_type | P2 |
| Appreciative Inquiry | Facilitation methodology | Explore strengths and desired futures through appreciative questions | Appreciative Inquiry field | SUMMARY + SOURCE | plain_type | P1 |
| Future Search | Large-group methodology | Bring a whole system into the room to examine past, present and future and find common ground | Future Search Network lineage | SUMMARY + SOURCE | sticky_timeline | P2 |
| Search Conference | Large-group methodology | Participatory strategic planning around environment and desired future | Participative design tradition | SUMMARY + SOURCE | plain_type | P3 |
| Graphic Facilitation | Facilitation method | Use live visual capture to support shared understanding and memory | Graphic facilitation practice | RAW DRAFT overview with sources | paper_sketches | P1 |
| Visual Thinking / Sketchnoting | Facilitation method | Use simple visual vocabulary to externalize thinking | Visual practice | RAW DRAFT guide | paper_sketches | P1 |
| Fishbowl | Conversation structure | Create focused inner dialogue with outer observation/rotation | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| World Café | Conversation methodology | Use rotating small-table conversations and harvest patterns | World Café community | SUMMARY + SOURCE | plain_type | P1 |
| Conversation Café | Conversation structure | Use structured rounds to create balanced dialogue | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| Open Space Technology | Self-organizing methodology | Participants create and move through an agenda around a central theme | Harrison Owen | SUMMARY + SOURCE | plain_type | P1 |
| Lean Coffee | Agenda method | Build, vote and timebox a participant-generated agenda | Lean Coffee practice | SUMMARY + SOURCE | sticky_vote | P1 |
| Dot Voting | Decision mechanic | Use limited votes to reveal directional preference | Facilitation practice | RAW DRAFT guide with caveats | sticky_vote | P0 |
| $100 Test | Prioritization exercise | Allocate a fixed budget of points/money across choices | Prioritization practice | RAW DRAFT guide | sticky_vote | P1 |
| Weighted Dot Voting | Decision mechanic | Give participants different vote weights or multiple allocations | Facilitation practice | RAW DRAFT guide with caveats | sticky_vote | P1 |
| Straw Poll | Decision mechanic | Quick non-binding preference check | Design Sprint / facilitation practice | SUMMARY + SOURCE | sticky_vote | P1 |
| Supervote | Decision mechanic | Give designated Decider final selection signal | Design Sprint | SUMMARY + SOURCE | sticky_vote | P1 |
| Gradient of Agreement | Consent/alignment technique | Express degrees of support rather than binary yes/no | Facilitation/consensus practice | RAW DRAFT guide with sources | plain_type | P1 |
| Consent Decision | Governance method | Proceed when no reasoned objection remains within defined constraints | Sociocracy/consent practice | SUMMARY + SOURCE | plain_type | P2 |
| Thumbs / Fist-to-Five | Alignment technique | Quickly gauge confidence/support | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Silent Brainwriting | Ideation mechanic | Generate ideas independently before sharing | Facilitation/creativity practice | RAW DRAFT guide | sticky_scatter | P0 |
| Think-Pair-Share | Participation structure | Individual reflection → pair discussion → whole-group sharing | Education/facilitation practice | RAW DRAFT guide | sticky_sequence | P0 |
| Round Robin | Participation structure | Take turns contributing or building on ideas | Facilitation practice | RAW DRAFT guide | sticky_sequence | P1 |
| Go-Around | Participation structure | Give each person one turn to respond to the same prompt | Facilitation practice | RAW DRAFT guide | plain_type | P0 |
| Popcorn Sharing | Participation structure | Open voluntary sharing without fixed order | Facilitation practice | RAW DRAFT guide with cautions | plain_type | P2 |
| Pair Interview | Participation activity | Pairs interview one another before synthesis/introductions | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Triad Consultation | Participation structure | Three-person advice/reflection format | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Gallery Walk | Sensemaking structure | Participants inspect outputs silently before discussion | Design/facilitation practice | RAW DRAFT guide | paper_sketches | P0 |
| Silent Gallery | Sensemaking structure | Review work without discussion to reduce social influence | Raw Draft | FULL GUIDE | paper_sketches | P0 |
| Heatmap Review | Sensemaking / selection | Mark interesting parts of an artifact before discussing | Design Sprint | SUMMARY + SOURCE | sticky_vote | P0 |
| Speed Critique | Critique structure | Fast structured critique of multiple concepts | Design Sprint | SUMMARY + SOURCE | paper_sketches | P1 |
| Parking Lot | Facilitation mechanic | Capture issues that matter but do not belong in current discussion | Facilitation practice | RAW DRAFT guide | single_sticky | P0 |
| Question Parking Lot | Facilitation mechanic | Separate unanswered questions from decisions/actions | Raw Draft | FULL GUIDE | single_sticky | P0 |
| Working Agreements | Facilitation setup | Agree behaviours and norms for a session/team | Facilitation practice | RAW DRAFT guide | sticky_cluster | P0 |
| Check for Understanding | Facilitation mechanic | Verify shared interpretation before moving forward | Raw Draft | FULL GUIDE | plain_type | P0 |
| Decision Recap | Facilitation mechanic | State what was decided, why, owner and next action before transition | Raw Draft | FULL GUIDE | plain_type | P0 |
| Energy Check | Facilitation mechanic | Quickly assess room energy/attention to adjust process | Raw Draft | FULL GUIDE | plain_type | P1 |
| Time Check / Re-contract | Facilitation mechanic | Explicitly choose what to cut or extend when time changes | Raw Draft | FULL GUIDE | plain_type | P0 |
| Breakout Design | Facilitation technique | Choose group size, roles, task, output and report-back intentionally | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Debrief Ladder | Reflection structure | Experience → observation → interpretation → implication → action | Raw Draft synthesis | FULL GUIDE | sticky_sequence | P0 |

# 66. Exercises organized by what happens in the room

This is a major addition. People often need an **exercise**, not a framework. These records should be filterable by session stage: Open, Explore, Make Sense, Create, Decide, Commit, Close and Reflect.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Hopes and Fears | Opening exercise | Surface expectations, anxieties and desired outcomes | Facilitation practice | RAW DRAFT guide | sticky_cluster | P0 |
| Expectations / Contributions | Opening exercise | Clarify what participants want and what they will contribute | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Question Burst | Exploration exercise | Generate questions before solutions | Innovation/learning practice | RAW DRAFT guide | sticky_scatter | P1 |
| Assumption Dump | Exploration exercise | Rapidly externalize assumptions before analysis | Raw Draft | FULL GUIDE | sticky_scatter | P0 |
| Facts / Beliefs / Unknowns | Exploration exercise | Separate evidence, assumptions and missing information | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Known / Unknown / Need to Know | Exploration exercise | Structure uncertainty and research needs | Problem-solving practice | RAW DRAFT guide | sticky_cluster | P0 |
| Stakeholder Brain Dump | Exploration exercise | Generate actors before structuring relationships | Raw Draft | FULL GUIDE | sticky_scatter | P0 |
| Analogous Examples Hunt | Exploration exercise | Find examples from other categories/systems for inspiration | HCD/design practice | RAW DRAFT guide | paper_sketches | P1 |
| Lightning Demos | Exploration exercise | Review relevant examples quickly | Design Sprint | SUMMARY + SOURCE | paper_sketches | P0 |
| Brainwriting | Creation exercise | Generate ideas in silence before discussion | Creativity practice | RAW DRAFT guide | sticky_scatter | P0 |
| Crazy 8s | Creation exercise | Generate eight rough alternatives quickly | Design Sprint | SUMMARY + SOURCE | paper_sketches | P0 |
| Worst Possible Idea | Creation exercise | Use deliberately bad ideas to break inhibition and reveal assumptions | Creativity practice | RAW DRAFT guide | sticky_scatter | P1 |
| Mash-up | Creation exercise | Combine unrelated elements to create new concepts | Design practice | RAW DRAFT guide | paper_sketches | P1 |
| SCAMPER | Creation exercise | Use transformation prompts to alter existing ideas | Creativity method | SUMMARY + SOURCE | cards_deck | P2 |
| Constraint Flip | Creation exercise | Change or reverse an assumed constraint to provoke alternatives | Raw Draft | FULL GUIDE | single_sticky | P1 |
| How Might We | Creation/framing exercise | Turn evidence into generative questions | Design practice | RAW DRAFT guide with sources | single_sticky | P0 |
| Idea Bundling | Synthesis exercise | Combine complementary ideas into coherent concepts | IDEO.org / HCD practice | SUMMARY + SOURCE | sticky_cluster | P1 |
| Affinity Clustering | Synthesis exercise | Group evidence/ideas into emergent themes | HCD practice | RAW DRAFT guide | sticky_cluster | P0 |
| Theme Naming | Synthesis exercise | Create useful labels for clusters without erasing nuance | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Insight Writing | Synthesis exercise | Turn evidence patterns into concise implications | HCD practice | RAW DRAFT guide | single_sticky | P0 |
| Tension Pairing | Synthesis exercise | Identify competing needs/forces that shape the problem | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| 2×2 Framing | Synthesis exercise | Explore relationships using two meaningful dimensions | Strategy/design practice | RAW DRAFT guide with caveats | sticky_matrix | P0 |
| Dot Vote | Selection exercise | Reveal preference or attention using limited votes | Facilitation practice | RAW DRAFT guide | sticky_vote | P0 |
| Impact / Effort | Selection exercise | Prioritize using expected impact and effort | Practice | RAW DRAFT guide | sticky_matrix | P0 |
| NUF | Selection exercise | Score New, Useful and Feasible | Gamestorming | SUMMARY + SOURCE | sticky_matrix | P2 |
| Criteria Ranking | Selection exercise | Rank options against explicit criteria | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Forced Ranking | Selection exercise | Require explicit ordinal trade-offs | Decision practice | RAW DRAFT guide | sticky_sequence | P1 |
| Pairwise Comparison | Selection exercise | Compare options two at a time to reveal preference | Decision analysis | RAW DRAFT guide | sticky_matrix | P1 |
| Premortem | Risk exercise | Imagine failure and identify causes | Gary Klein | SUMMARY + SOURCE | sticky_cluster | P0 |
| Red Team Challenge | Risk exercise | Assign participants to challenge assumptions/strategy | Strategy practice | RAW DRAFT guide | plain_type | P1 |
| Constraint Test | Risk exercise | Ask how direction changes under tighter constraints | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Keep / Modify / Kill | Decision exercise | Make explicit continuation decision after evidence | Raw Draft | FULL GUIDE | sticky_vote | P0 |
| 15% Solutions | Commitment exercise | Identify actions possible within current discretion | Liberating Structures | SUMMARY + SOURCE | single_sticky | P1 |
| Owner / Action / Date | Commitment exercise | Turn decisions into accountable next actions | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Commitment Round | Closing exercise | Each participant states commitment, owner or next move | Facilitation practice | RAW DRAFT guide | plain_type | P0 |
| One-word Checkout | Closing exercise | Capture final state or reflection quickly | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Plus / Delta | Reflection exercise | Identify what worked and what should change | Retrospective practice | RAW DRAFT guide | sticky_cluster | P0 |
| Start / Stop / Continue | Reflection exercise | Identify behaviours/actions to begin, end and maintain | Retrospective practice | RAW DRAFT guide | sticky_cluster | P0 |
| 4Ls | Reflection exercise | Liked, Learned, Lacked, Longed For | Retrospective practice | RAW DRAFT guide | sticky_cluster | P1 |
| What / So What / Now What | Reflection exercise | Move from observation to meaning to action | Liberating Structures | SUMMARY + SOURCE | sticky_sequence | P0 |
| After Action Review | Reflection exercise | Compare intent, outcome, causes and future change | Organizational learning | RAW DRAFT guide with sources | sticky_sequence | P1 |

# 67. Expanded icebreakers, check-ins, warm-ups and energisers

SessionLab currently has dedicated icebreaker and get-to-know collections in addition to its general method library. Raw Draft should similarly keep low-stakes room-opening and energy-management activities clearly separate from strategic methods.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Four Quadrants | Icebreaker | Participants draw/respond in four quadrants to structured prompts | SessionLab / facilitation community | SUMMARY + SOURCE | paper_sketches | P1 |
| Snowball | Icebreaker / energiser | Use crumpled written prompts/answers for random exchange and introductions | Thiagi / facilitation community | SUMMARY + SOURCE | plain_type | P2 |
| One-word Check-in | Check-in | Give everyone an immediate low-risk voice | Facilitation practice | RAW DRAFT guide | single_sticky | P0 |
| Scale Check-in | Check-in | Respond on a numeric scale and optionally explain | Facilitation practice | RAW DRAFT guide | sticky_matrix | P0 |
| Weather Check-in | Check-in | Use weather metaphor to communicate current state | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Traffic-light Check-in | Check-in | Green/amber/red confidence, energy or readiness | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Rose / Bud / Thorn Check-in | Check-in | Share positive, emerging and difficult elements | HCD/facilitation practice | RAW DRAFT guide | sticky_cluster | P1 |
| Object Introduction | Icebreaker | Introduce yourself through an object or item nearby | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Personal Map | Icebreaker | Map a few dimensions of personal context/interests | Team facilitation | RAW DRAFT guide with sources | sticky_map | P2 |
| Paired Introductions | Icebreaker | Interview a partner and introduce them | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Common Ground | Icebreaker | Small groups find non-obvious things they share | Facilitation practice | RAW DRAFT guide | sticky_cluster | P1 |
| Line-up | Icebreaker / movement | Participants position/order physically along a dimension | Facilitation practice | RAW DRAFT guide | sticky_sequence | P2 |
| Human Spectrum | Icebreaker / opinion mapping | Stand along a continuum in response to a prompt | Participatory facilitation | RAW DRAFT guide | sticky_matrix | P1 |
| Constellations | Spatial exercise | Position relative to a topic, experience or actor | Facilitation practice | RAW DRAFT guide | sticky_map | P2 |
| Mad Tea Party | Networking / reflection | Rapid rotating pair prompts | Liberating Structures | SUMMARY + SOURCE | plain_type | P2 |
| Impromptu Networking | Networking opener | Purposeful paired exchanges across several rounds | Liberating Structures | SUMMARY + SOURCE | plain_type | P0 |
| Stinky Fish | Icebreaker / disclosure | Surface a concern participants are carrying | Hyper Island / facilitation community | SUMMARY + SOURCE | paper_sketches | P1 |
| User Manual to Me | Team connection exercise | Share preferences, communication style and working needs | Team practice | RAW DRAFT guide | plain_type | P1 |
| High / Low / Learn | Check-in / reflection | Share recent high point, low point and learning | Team practice | RAW DRAFT guide | plain_type | P2 |
| Emoji / Image Check-in | Check-in | Choose an image/symbol representing current state | Remote facilitation practice | RAW DRAFT guide | paper_sketches | P2 |
| Silent Doodle | Creative warm-up | Draw quickly from a simple prompt to shift cognitive mode | Raw Draft | FULL GUIDE | paper_sketches | P1 |
| 30 Circles | Creative warm-up | Transform repeated circles into as many recognizable objects as possible | Design creativity practice | SUMMARY + SOURCE | paper_sketches | P2 |
| Squiggle Birds | Creative warm-up | Turn random squiggles into quick drawings | Creativity practice | RAW DRAFT guide with source research | paper_sketches | P2 |
| Mirroring | Energiser | Pair movement and imitation to restore attention | Facilitation/theatre practice | RAW DRAFT guide | plain_type | P2 |
| Count to 20 | Energiser / attention | Group counts collaboratively without fixed order | Facilitation practice | RAW DRAFT guide | plain_type | P2 |
| Rock-Paper-Scissors Tournament | Energiser | Fast high-energy playful tournament | Common game | RAW DRAFT guide | plain_type | P3 |
| Walk and Talk | Energiser / reflection | Pair movement with a focused conversation prompt | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Stretch Reset | Energiser | Short accessible movement reset | Facilitation practice | RAW DRAFT guide | plain_type | P1 |
| Silent Minute | Reset | Use a short quiet pause before a new cognitive mode | Raw Draft | FULL GUIDE | plain_type | P0 |
| Breathing Reset | Reset | Short guided breathing/attention reset | Facilitation practice | RAW DRAFT guide; accessibility note | plain_type | P2 |
| Category Sprint | Energiser | Rapidly name items in a category under a time limit | Facilitation practice | RAW DRAFT guide | plain_type | P2 |
| Drawing Relay | Energiser / creative | Build a shared drawing through quick turns | Facilitation practice | RAW DRAFT guide | paper_sketches | P2 |

# 68. Complete workshops and offsite formats

Some visitors will not want to assemble activities themselves. This layer packages methods into complete, outcome-driven sessions without requiring a multi-day Sprint.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Strategy Offsite | Workshop / playbook | Review context, make strategic choices and commit to actions | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Leadership Alignment Workshop | Workshop | Clarify decisions, tensions, priorities and ownership among leaders | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Vision Workshop | Workshop | Define a concrete future state and implications | Raw Draft | FULL GUIDE | paper_sketches | P1 |
| Mission / Purpose Workshop | Workshop | Clarify why an organization/team exists and for whom | Raw Draft | FULL GUIDE | single_sticky | P1 |
| Operating Model Workshop | Workshop | Translate strategy into capabilities, roles, process, governance and systems | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Ways of Working Workshop | Workshop | Agree collaboration, decision and meeting mechanics | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Decision Rights Workshop | Workshop | Map critical decisions and assign roles/owners | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Team Health Workshop | Workshop | Assess current team conditions and select improvement actions | Atlassian / Raw Draft adaptation | SUMMARY + SOURCE / Raw Draft variant | sticky_matrix | P1 |
| Working Agreements Workshop | Workshop | Create explicit team norms and expectations | Team facilitation | RAW DRAFT guide | sticky_cluster | P0 |
| Stakeholder Alignment Workshop | Workshop | Map stakeholders, tensions and engagement plan | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Transformation Kickoff | Workshop | Align on case for change, outcomes, governance, risks and immediate actions | Raw Draft | FULL GUIDE | sticky_sequence | P1 |
| Portfolio Prioritisation Workshop | Workshop | Compare initiatives/opportunities and allocate attention/resources | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Capability Prioritisation Workshop | Workshop | Identify capabilities critical to future strategy and investment | Raw Draft | FULL GUIDE | sticky_matrix | P1 |
| Customer Experience Vision Workshop | Workshop | Translate research into future experience principles and priority moments | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Service Blueprint Workshop | Workshop | Co-create cross-functional service blueprint from evidence | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Journey Mapping Workshop | Workshop | Build an evidence-grounded current/future journey | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Research Synthesis Workshop | Workshop | Turn raw qualitative evidence into patterns and implications | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Problem Framing Workshop | Workshop | Define question, system, constraints, evidence and decision scope | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Opportunity Framing Workshop | Workshop | Convert evidence and tensions into opportunity territories | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Scenario Workshop | Workshop | Build or use scenarios to stress-test choices | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Premortem Workshop | Workshop | Surface failure causes and mitigation before commitment | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Retrospective Workshop | Workshop | Reflect on process, outcomes and future changes | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Quarterly Strategy Review | Workshop / cadence | Review evidence, bets, assumptions and strategic adjustments | Raw Draft | FULL GUIDE | sticky_timeline | P1 |
| Portfolio Review Cadence | Workshop / cadence | Review portfolio decisions, evidence and resource shifts | Raw Draft | FULL GUIDE | sticky_matrix | P1 |

# 69. Consulting deliverables, templates and canvases

These are often more useful than another framework article. They let someone actually structure consulting/strategy work, prepare a client workshop or communicate a recommendation.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Engagement Brief | Template | Question, sponsor, decision, scope, evidence, participants and constraints | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Problem Definition One-pager | Template | Concise issue, context, objective, decision and boundaries | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Issue Tree Worksheet | Canvas | Structure a problem into answerable branches | Raw Draft | FULL DOWNLOAD | sticky_tree | P0 |
| Hypothesis Log | Sheet | Hypothesis, evidence for/against, confidence, owner and next test | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Analysis Plan | Sheet | Question, analysis, data/source, owner, output and deadline | Raw Draft | FULL DOWNLOAD | sticky_sequence | P0 |
| Interview Plan | Template | Stakeholders, learning questions, guide and synthesis plan | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Fact Pack Template | Slides / Doc | Organize verified facts before recommendation development | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Benchmarking Sheet | Spreadsheet | Peer, dimension, evidence, implication and caveat | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Market Sizing Model | Spreadsheet | Bottom-up assumptions, scenarios and sensitivity | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Competitive Landscape Board | FigJam / Miro | Alternatives, dimensions, evidence and whitespace | Raw Draft | FULL BOARD | sticky_matrix | P0 |
| Strategy Options Canvas | Canvas | Option, logic, upside, downside, assumptions, requirements | Raw Draft | FULL DOWNLOAD | sticky_matrix | P0 |
| Strategic Bet Card | Card | Bet, thesis, evidence, upside, kill criteria and owner | Raw Draft | FULL DOWNLOAD | single_sticky | P0 |
| Business Case Template | Spreadsheet / Doc | Value, cost, assumptions, risk, scenarios and decision | Raw Draft | FULL DOWNLOAD | plain_type | P1 |
| Value Driver Tree Template | Board / Sheet | Outcome and decomposed drivers | Raw Draft | FULL DOWNLOAD | sticky_tree | P0 |
| KPI Tree Template | Board / Sheet | Strategic goal to leading/lagging measures | Raw Draft | FULL DOWNLOAD | sticky_tree | P0 |
| Operating Model Canvas | Canvas | Capabilities, process, organization, governance, data and tech | Raw Draft | FULL DOWNLOAD | sticky_layers | P0 |
| Capability Map Template | Board | Capabilities, maturity, strategic importance and owner | Raw Draft | FULL BOARD | sticky_map | P0 |
| Governance Map Template | Board | Decisions, forums, rights, inputs and escalation | Raw Draft | FULL BOARD | sticky_map | P0 |
| RAPID Mapping Sheet | Worksheet | Critical decisions and role assignment | Raw Draft adaptation | DOWNLOAD only if rights/trademark treatment is clear | plain_type | P2 |
| Transformation Roadmap | Board / Sheet | Initiatives, milestones, dependencies, decisions, value | Raw Draft | FULL DOWNLOAD | sticky_timeline | P0 |
| Initiative Charter | Template | Outcome, scope, owner, measures, dependencies, risks | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Executive Storyboard | Worksheet | Recommendation logic before slide production | Raw Draft | FULL DOWNLOAD | paper_sketches | P0 |
| Recommendation Memo | Doc | Decision, recommendation, evidence, trade-offs and next actions | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Executive Summary Template | Doc / slide | Answer-first summary with supporting reasons and implications | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| Decision Memo | Doc | Decision required, options, criteria, evidence, recommendation | Raw Draft | FULL DOWNLOAD | plain_type | P0 |
| SteerCo Pack Structure | Slides | Decisions, changes, risks, evidence and next milestones | Raw Draft | FULL DOWNLOAD | plain_type | P1 |

# 70. Additional practical Playbooks

Playbooks let the Library connect consulting, UX, service design and facilitation into recognizable real-world jobs. They should be built from reusable Library records rather than duplicating instructions.

| Resource | Type | Primary use | Source / owner | Public treatment | Visual | Priority |
|---|---|---|---|---|---|---|
| Frame an Ambiguous Problem | Playbook | Turn vague brief into decision, questions, evidence and workplan | Raw Draft | FULL GUIDE | sticky_tree | P0 |
| Build a Strategy Fact Base | Playbook | Collect and synthesize market, customer, competitor and internal evidence | Raw Draft | FULL GUIDE | plain_type | P0 |
| Enter a New Market | Playbook | Market attractiveness → customer/competitor evidence → options → entry hypothesis | Raw Draft | FULL GUIDE | sticky_sequence | P1 |
| Prioritize a Portfolio | Playbook | Define criteria, map options, test assumptions and allocate resources | Raw Draft | FULL GUIDE | sticky_matrix | P0 |
| Design a Target Operating Model | Playbook | Strategy → capabilities → process → organization → governance → roadmap | Raw Draft | FULL GUIDE | sticky_layers | P0 |
| Redesign a Service | Playbook | Current journey → system → principles → concepts → blueprint → prototype | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Audit an Existing UX | Playbook | Critical journeys → heuristic review → analytics/evidence → user testing → priorities | Raw Draft | FULL GUIDE | paper_sketches | P0 |
| Fix an Information Architecture | Playbook | Inventory → top tasks → card sort → taxonomy → tree test → navigation | Raw Draft | FULL GUIDE | sticky_tree | P0 |
| Plan a User Research Study | Playbook | Decision → questions → method → recruitment → fieldwork → synthesis | Raw Draft | FULL GUIDE | plain_type | P0 |
| Run a Leadership Offsite | Playbook | Context → issues → choices → decisions → commitments | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Clarify Decision Rights | Playbook | Critical decisions → current friction → roles → forums → documentation | Raw Draft | FULL GUIDE | sticky_map | P0 |
| Design a Workshop | Playbook | Outcome → participants → sequence → methods → logistics → run sheet | Raw Draft | FULL GUIDE | sticky_sequence | P0 |
| Recover a Workshop That's Going Wrong | Playbook | Diagnose room issue → choose intervention → re-contract → close | Raw Draft | FULL GUIDE | plain_type | P1 |
| Prepare an Executive Recommendation | Playbook | Synthesis → recommendation → logic → evidence → storyboard → memo/deck | Raw Draft | FULL GUIDE | paper_sketches | P0 |
| Move From Research to Strategy | Playbook | Evidence → patterns → tensions → opportunities → choices → tests | Raw Draft | FULL GUIDE | sticky_cluster | P0 |
| Prototype a Service | Playbook | Critical moment → assumptions → simulation → observation → iteration | Raw Draft | FULL GUIDE | plain_type | P0 |
| Build a Serious Game | Playbook | Learning objective → system → roles → rules → rounds → events → debrief | Raw Draft | FULL GUIDE | tokens_board | P1 |
| Facilitate a Difficult Decision | Playbook | Frame → evidence → options → criteria → challenge → decide → record | Raw Draft | FULL GUIDE | sticky_vote | P0 |
| Create an Innovation Portfolio | Playbook | Opportunity spaces → bets → horizons → evidence → resource allocation | Raw Draft | FULL GUIDE | sticky_matrix | P1 |

# 71. New browse views the expanded Library should support

The larger inventory makes it even more important not to expose one giant taxonomy.

Add curated browse views that answer recognizable needs.

## By practice

- Consulting
- Strategy
- Product
- UX
- User Research
- Service Design
- Facilitation
- Innovation
- Brand
- Futures
- Systems
- Organization
- Operations
- Change
- AI

## By what I need right now

- Frame a problem
- Run research
- Make sense of evidence
- Generate ideas
- Make a decision
- Prioritize
- Run a workshop
- Open a session
- Energise a room
- Align a leadership team
- Design a service
- Evaluate a UX
- Fix navigation / IA
- Build a prototype
- Test a concept
- Plan strategy
- Design an operating model
- Plan change
- Explore the future
- Run a simulation
- Prepare a recommendation
- Create a board / worksheet
- Learn a methodology

## By time available

- 5–10 min
- 15–30 min
- 30–60 min
- 60–90 min
- 2–3 hours
- half day
- full day
- multi-day

## By output

- decision
- recommendation
- research evidence
- insight
- map
- prioritized list
- strategy
- prototype
- journey
- blueprint
- scenario
- roadmap
- operating model
- business case
- workshop plan
- team agreement
- action plan
- learning

## By interaction mode

- silent writing
- discussion
- interviewing
- observation
- voting
- mapping
- sketching
- physical making
- role play
- tabletop
- simulation
- analysis
- presentation
- reflection

## By participant context

- solo
- pair
- small team
- leadership team
- cross-functional team
- large group
- customers/users
- frontline staff
- external stakeholders
- public/community participants

This gives breadth without turning the landing page into a database UI.

---

# 72. Practice-specific page fields

Different practices need additional metadata.

## Consulting

```yaml
analysis_required:
data_required:
decision_supported:
executive_audience:
financial_model_needed:
deliverable:
storyline_required:
```

## UX

```yaml
research_phase:
  - discover
  - explore
  - test
  - listen
study_mode:
  - qualitative
  - quantitative
  - mixed
user_participation_required:
prototype_required:
ux_dimension:
  - usability
  - learnability
  - findability
  - accessibility
  - comprehension
  - desirability
  - trust
  - efficiency
```

## Service Design

```yaml
service_layer:
  - context
  - ecosystem
  - experience
  - touchpoint
  - frontstage
  - backstage
  - operations
  - offering
service_stage:
  - research
  - ideation
  - prototyping
  - implementation
  - evaluation
```

## Facilitation

```yaml
room_function:
  - open
  - connect
  - explore
  - diverge
  - synthesize
  - decide
  - commit
  - close
  - reflect
  - energise
participation_pattern:
  - individual
  - pair
  - trio
  - small_group
  - whole_group
vulnerability_level:
energy_level:
movement_level:
```

## Serious Games / Simulations

```yaml
roles_required:
rounds:
information_asymmetry:
resources_or_tokens:
event_injection:
competition:
cooperation:
debrief_required: true
system_fidelity:
```

---

# 73. Source and rights notes for newly added practice families

## Nielsen Norman Group

NN/g maintains extensive public material on UX research and evaluation. Its research-method guidance includes field studies, diary studies, user interviews, stakeholder interviews, task analysis, journey mapping, prototype testing, card sorting, tree testing, qualitative usability testing, benchmark testing, accessibility evaluation, surveys and analytics.

Important rights note:
- cite and link to canonical NN/g articles;
- Nielsen's heuristic page explicitly says the heuristics may be used in one's own work with credit to Jakob Nielsen and the source;
- do not reproduce paid course materials or full copyrighted articles.

Useful sources:
- https://www.nngroup.com/articles/ux-research-cheat-sheet/
- https://www.nngroup.com/articles/which-ux-research-methods/
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/
- https://www.nngroup.com/articles/cognitive-walkthroughs/

## Service Design Tools

The current Service Design Tools catalogue is useful because it does not treat service design as one framework. It spans Research, Ideation, Prototyping, Implementation and Evaluation, and includes tools for Context, System, Experience and Offering.

Current catalogue examples include:
- Service Safari
- Journey Map
- Emotional Journey
- Service Blueprint
- System Map
- Ecosystem Map
- Offering Map
- Experience Principles
- Experience Prototypes
- Service Prototype
- Service Roadmap
- Service Specifications
- Synthesis Wall
- Research Plan
- Recruiting Screener
- Interview Guide
- Success Metrics
- Evaluation Matrix
- Future Backcasting
- Transition Journey
- Signal Cards
- System Scenario

Use it as:
- a canonical external source;
- a taxonomy reference;
- a source of practical service-design methods;
- a place to link for methods Raw Draft has not yet rewritten.

Sources:
- https://servicedesigntools.org/tools.html
- https://servicedesigntools.org/tools/service-blueprint
- https://servicedesigntools.org/tools/service-safari
- https://servicedesigntools.org/tools/service-prototype
- https://servicedesigntools.org/tools/system-map
- https://servicedesigntools.org/tools/ecosystem-map
- https://servicedesigntools.org/tools/offering-map

## IDEO.org Design Kit

The Design Kit is useful for participatory and human-centered methods beyond standard UX:
- Co-Creation Session
- Participatory Prototyping
- Journey Map
- Rapid Prototyping
- Determine What to Prototype
- Role Play
- Storyboard
- Collaborative Synthesis
- Power Mapping
- Group Chat Workshop
- Theory of Change / Logic Model work
- participatory research.

Use:
- as external references;
- to deepen co-design and participatory practice;
- verify individual worksheet/reuse terms before hosting files.

Sources:
- https://www.designkit.org/methods.html
- https://www.designkit.org/methods/co-creation-session.html
- https://www.designkit.org/methods/participatory-prototyping.html
- https://www.designkit.org/methods/rapid-prototyping.html

## McKinsey

McKinsey maintains public "Enduring Ideas" pages for classic frameworks including:
- 7-S
- GE–McKinsey nine-box matrix
- Business System
- Industry Cost Curve
- Structure-Conduct-Performance
- Strategic Control Map
- Three Horizons of Growth
- Portfolio of Initiatives
- Consumer Decision Journey.

Use:
- as canonical sources;
- summarize and critique;
- do not copy diagrams/artwork unless rights allow.

Sources:
- https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-classic-mckinsey-frameworks-that-continue-to-inform-management-thinking
- https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-7-s-framework
- https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-ge-and-mckinsey-nine-box-matrix
- https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-three-horizons-of-growth

## BCG

BCG maintains canonical pages on:
- Growth-Share Matrix
- Experience Curve
- Time-Based Competition
- Rule of Three and Four
- strategy approaches.

Use:
- canonical source links;
- summary + Raw Draft commentary;
- no copied BCG visuals without permission.

Sources:
- https://www.bcg.com/about/overview/our-history/growth-share-matrix
- https://www.bcg.com/publications/collections/classics
- https://www.bcg.com/publications/collections/your-strategy-needs-strategy/classical

## Bain

Bain's RAPID® framework defines roles around important decisions:
- Recommend
- Agree
- Perform
- Input
- Decide.

RAPID is a trademarked Bain tool.

Use:
- summary + source;
- make trademark/source explicit;
- Raw Draft can separately publish its own generic Decision Rights framework without pretending it is RAPID.

Source:
- https://www.bain.com/contentassets/cc22bf15ebfb467094fa88c8533742b3/decision_insights-10_great_decisions.pdf

## SessionLab

SessionLab's public library currently spans a very large number of facilitation methods and templates, with distinct categories such as icebreakers, team, energisers, idea generation, issue resolution, issue analysis, action, skills and remote.

Use:
- as an activity-discovery source;
- do not ingest its entire library;
- curate methods that fit Raw Draft's practice;
- preserve author attribution.

Sources:
- https://www.sessionlab.com/library/
- https://www.sessionlab.com/library/icebreaker
- https://www.sessionlab.com/library/liberating-structures

---

# 74. New P0 content clusters to fill

The first public version should now have depth across **practice**, not only strategy.

## Consulting P0
- Problem Statement
- Issue Tree
- Hypothesis Tree
- MECE Structuring
- Hypothesis-led Problem Solving
- Fact / Assumption / Interpretation
- Benchmarking
- Market Sizing
- Competitive Landscape
- Value Driver Tree
- Business Case
- Executive Storyboard
- Recommendation Memo
- Synthesis Workshop

## UX P0
- User Interview
- Task Analysis
- Usability Testing
- Heuristic Evaluation
- Cognitive Walkthrough
- Accessibility Evaluation
- Card Sorting
- Tree Testing
- Journey Mapping
- Error-state Audit
- Content Comprehension Test
- UX Critique
- Interaction Flow Review

## Service Design P0
- Service Safari
- Journey Map
- Service Blueprint
- System Map
- Ecosystem Map
- Experience Principles
- Service Prototype
- Service Roadmap
- Service Specification
- Synthesis Wall
- Research Plan
- Evaluation Matrix
- Success Metrics
- Touchpoint Inventory
- Moments That Matter

## Facilitation P0
- Note and Vote
- 1-2-4-All
- How Might We
- Silent Brainwriting
- Think-Pair-Share
- Dot Voting
- Gallery Walk
- Parking Lot
- Working Agreements
- Breakout Design
- Decision Recap
- Debrief Ladder
- One-word Check-in
- Impromptu Networking
- Hopes and Fears
- Facts / Beliefs / Unknowns
- Commitment Round
- Start / Stop / Continue
- What / So What / Now What

## Organization / transformation P0
- Target Operating Model
- Capability Map
- Capability Maturity Assessment
- Organization Design Principles
- Decision Architecture
- Governance Map
- Change Impact Assessment
- Transformation Roadmap
- Initiative Charter

This gives the Library enough breadth to feel like a serious strategy-and-innovation field manual rather than a design-framework archive.

---

# 75. Final expanded principle

The Library's unit is **a useful piece of practice**, not a framework.

A good Library should let someone arrive with any of these questions:

- How do I structure this ambiguous problem?
- How do consultants build a fact base?
- Which analysis should I run?
- How do I evaluate this interface?
- How do I test the information architecture?
- How do I map this service?
- How do I prototype a service interaction?
- How do I run this workshop?
- I have ten minutes. What opening exercise should I use?
- The room is dead. What energiser fits?
- How do we get from discussion to a decision?
- How do I structure an executive recommendation?
- What template should I download?
- Is there already a good external board for this?
- Which methodology should I learn?
- What happens after this exercise?

If Raw Draft can answer those questions cleanly, the Library is doing its job.
