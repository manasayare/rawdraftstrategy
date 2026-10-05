# Continuation request

_Started 2026-10-04 11:55 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Font selection for design"
Project currently has 22 file(s)
User is viewing file: Raw Draft.dc.html
Current date is now October 4, 2026
</system-info>

<attached aesthetic_system_instructions>
A design system or theme is attached to this project. That attachment already answers the visual-style question: apply it. Do NOT ask the user which visual style to use — no questions about vibe, colors or palette directions (including color-swatch svg-options questions), typography, mood, or art direction, and skip the "divergent visuals" question from the question-asking tips; offer divergent visual directions only if the user themselves asks for alternatives. This rule bans asking the user to pre-pick a style in the abstract — swatches, mood words, palette pickers. It does not ban asking them to choose among candidates you have already built: putting built candidates on a file-options board for the user to pick from is encouraged. Treat the attachment as the confirmed starting point and product context — the "confirm the starting point" tip is already satisfied, so do not ask the user to confirm or re-pick it. Spend your questions on everything else you need: audience, purpose, content, structure, scope, interactions, tone of copy.
</attached aesthetic_system_instructions>

<pasted_text name="Pasted text (1372 lines)">
Continue working on the existing Raw Draft Strategy website.

Do not redesign the rest of the site.

This pass is about turning the Sprint / Workshop Builder into a genuinely useful AI-native product that sits on top of the Raw Draft Library.

The goal is larger than “generate a workshop agenda”.

I want visitors to be able to come to Raw Draft with a problem, describe some of it naturally, select some constraints, and have the system assemble a useful Sprint or workshop from the massive Raw Draft Library without them needing to know which frameworks, exercises, research methods, facilitation techniques, or workshop formats they should search for.

This should become a real product and a major traffic / utility layer for the site.

The product should make the Library easier to use, not hide it.

==================================================
CORE PRODUCT IDEA
==================================================

The user should be able to start with:

“What are you trying to figure out?”

They can either:

1. type naturally
2. choose from structured options
3. combine both

Example:

“I need to figure out whether our onboarding should use AI agents. We have the founders, product lead and engineering lead for half a day.”

The system should understand that input and progressively convert it into structured context.

It should not immediately respond with a long AI-generated workshop.

Instead, it should create a structured working brief and ask only for missing information.

The experience should feel like:

AI + structured selection + workshop design canvas

Not:

chatbot + generated text

==================================================
ENTRY POINT
==================================================

Create a dedicated product route:

/builder

Possible public name for now:

Builder

Do not over-brand the name yet.

From the Library, Sprint pages, Methods, Frameworks and Playbooks, users should also be able to enter Builder contextually.

Examples:

Build a workshop with this

Use this in a Sprint

Add to Builder

Adapt this method

Build around this

The Builder should therefore become an execution layer on top of the Library.

==================================================
FIRST SCREEN
==================================================

Keep the first screen extremely simple.

Large question:

What are you trying to figure out?

Below it:

a large natural-language input

The input should support examples such as:

“We need to decide which customer segment to focus on.”

“We have a new AI product idea but do not know whether people actually need it.”

“Our leadership team cannot agree on the positioning.”

“We need to redesign a public service.”

“We want to explore how our category might change over the next five years.”

Below the input, provide optional starting cards:

Build a Sprint

Build a Workshop

Adapt an existing Sprint

Start from a Playbook

Start from a Method

Fix an agenda I already have

These cards should use the Raw Draft workshop-card visual system.

Do not require the user to understand the difference before starting.

If they simply type, Builder can recommend the format.

==================================================
STRUCTURED SELECTION + NATURAL LANGUAGE
==================================================

The Builder should combine typing and selection throughout the experience.

Do not use a giant form.

Instead, progressively create a structured brief.

Example:

QUESTION
What are you trying to figure out?

OUTCOME
What needs to exist at the end?

Options:
Decision
Direction
Ideas
Prototype
Research evidence
Plan
Alignment
Priorities
Strategy
Something else

TIME AVAILABLE
90 min
Half day
1 day
2 days
3–5 days
Multiple sessions
Not sure

PEOPLE
1
2–5
6–10
11–20
20+

WHO IS IN THE ROOM?
Founders
Leadership
Product
Design
Engineering
Research
Sales
Marketing
Operations
Customers
External stakeholders
Other

DECISION OWNER
Yes
No
Not sure

FORMAT
In person
Remote
Hybrid
Not sure

EVIDENCE AVAILABLE
Customer research
Analytics
Market research
Internal data
Existing strategy
Prototype
Nothing yet
Other

The user should be able to select cards OR type additional context.

Example:

TIME
Half day

Additional context:
“CEO can only join for the last hour.”

The AI should understand both.

==================================================
AI SHOULD BUILD THE BRIEF AS THE USER GOES
==================================================

As information is added, show a live structured brief.

Example:

QUESTION
Should AI agents become part of onboarding?

OUTCOME
Product direction + next test

TIME
4 hours

PARTICIPANTS
Founders
Product
Engineering

DECISION OWNER
CEO
Joins final hour

EVIDENCE
8 customer interviews

FORMAT
In person

The user should be able to edit any item directly.

Do not ask questions Builder can infer confidently.

If something important is missing, ask one focused question.

Example:

“Who can make the final decision?”

Do not run the user through an unnecessary wizard.

==================================================
AI RECOMMENDATION
==================================================

Once enough context exists, Builder should propose a format.

Example:

Recommended

PRODUCT STRATEGY WORKSHOP

4 hours

Why this format:
You already have customer evidence and need a product decision rather than broad discovery.

Then show:

FRAME
20 min

EVIDENCE
30 min

ASSUMPTIONS
35 min

OPTIONS
45 min

BREAK
10 min

MODEL
45 min

DECIDE
35 min

NEXT TEST
25 min

The important point:

AI is composing this from the Raw Draft Library.

It should not invent random workshop activities.

==================================================
THE RAW DRAFT LIBRARY IS THE INTELLIGENCE LAYER
==================================================

The Builder should use the structured Library records already being created.

The Library contains:

Sprints
Workshops
Frameworks
Methods
Research methods
UX methods
Service-design tools
Facilitation methods
Exercises
Icebreakers
Energisers
Decision methods
Serious games
Simulations
Playbooks
Templates
Boards
Prompts
Books
External resources

Every usable method should eventually contain structured information such as:

purpose
use when
avoid when
inputs
outputs
time
group size
facilitator difficulty
session stage
interaction mode
prerequisites
materials
remote suitability
failure modes
source
rights
related methods
related Sprints
assets

Builder should compose from this structured information.

It should never need to ask the user:

“Which framework would you like?”

unless the user explicitly wants to choose.

The system should know what fits.

==================================================
MAIN BUILDER EXPERIENCE
==================================================

Once the initial brief is ready, enter the actual Builder.

Do NOT make this a chat page.

Create a workbench.

Desktop layout:

LEFT
Brief / constraints

CENTER
Workshop or Sprint canvas

RIGHT
Contextual AI assistance

This can adapt responsively on tablet/mobile.

==================================================
LEFT PANEL
==================================================

Show the current structured constraints:

Question

Outcome

Time

Participants

Decision owner

Evidence

Format

Stage

Constraints

Each should be editable.

Changing one should update the workshop intelligently.

Example:

Time:
5 hours → 3 hours

Builder should not completely regenerate the workshop.

It should detect the impact and propose specific changes.

==================================================
CENTER: WORKSHOP CANVAS
==================================================

The main canvas contains draggable workshop blocks.

Use the same visual language as the post-it cards currently appearing throughout Raw Draft.

But here they are functional.

Example:

FRAME
20 min
Decision Statement

EVIDENCE
30 min
Evidence Review

ASSUMPTIONS
40 min
Assumption Mapping

OPTIONS
45 min
Alternative Directions

BREAK
10 min

DECIDE
35 min
Decision Matrix

NEXT TEST
30 min
Experiment Card

Blocks can be:

dragged
reordered
removed
duplicated
expanded
locked
replaced

Do not make the canvas childish.

It should feel like a sophisticated digital facilitation board.

==================================================
ACTIVITY BLOCK DETAIL
==================================================

Opening a block should show enough information to actually run it.

Example:

ASSUMPTION MAPPING

Purpose
Find assumptions that are both important and weakly evidenced.

TIME
30–60 min

PEOPLE
3–10

INPUT
Proposed product direction

OUTPUT
Prioritized assumptions

HOW TO RUN
1.
2.
3.
4.

FACILITATOR NOTES

WATCH FOR

ASSETS
Open FigJam
Download worksheet
Copy prompt

SOURCE

RELATED METHODS

This information should come from the Library record.

==================================================
REPLACE METHOD
==================================================

Every block should have:

Replace

When selected, AI should suggest alternatives based on the current context.

Example:

Replace Assumption Mapping

Suggested:

Critical Assumptions
20 min
Better if time is limited.

Premortem
30 min
Better if a direction is already selected and you need to expose failure risks.

Evidence Matrix
45 min
Better if substantial research already exists.

Show why each alternative fits.

This should feel like expert method selection, not search results.

==================================================
CONSTRAINT-AWARE AI
==================================================

Builder must reason about the workshop as a system.

Example:

User changes:

6 participants
→
22 participants

Builder should understand this changes facilitation architecture.

It might suggest:

Add breakouts

Change whole-group discussion to 1-2-4-All

Increase synthesis time

Add a co-facilitator

Use silent voting before discussion

Do not simply regenerate the same workshop with “22 participants” in the title.

==================================================
TIME CHANGES
==================================================

Example:

Current agenda:
5h 15m

Available:
4h

Builder should show:

75 minutes need to be removed.

Suggested changes:

MOVE ASYNC
Competitive Review
Save 30 min

COMPRESS
Evidence Review
40 → 20 min

REMOVE
Secondary Ideation Round
Save 25 min

Do not silently destroy the agenda.

Allow the user to approve changes.

==================================================
CONTEXTUAL AI
==================================================

The AI should appear as contextual intelligence, not as a chatbot dominating the screen.

It can surface observations such as:

“No decision owner is currently present for the final decision.”

“This activity requires customer evidence, but none is attached.”

“You have 70 minutes of divergence and only 15 minutes of convergence.”

“This agenda contains three high-energy activities without a break.”

“The output of this exercise is not used by the next block.”

“This method usually works better with smaller groups. Consider breakouts.”

“This workshop ends with prioritisation but no explicit decision.”

These should appear only when relevant.

==================================================
AI COMMANDS
==================================================

Provide useful contextual actions.

Examples:

Cut 60 minutes

Make this remote

Adapt for 20 people

Make this executive-friendly

Add customer evidence

Add a decision gate

Stress-test this Sprint

Make the output more concrete

Add more divergence

Improve convergence

Replace this exercise

Turn this into 2 half-days

Make it easier to facilitate

Add a break

Create pre-work

Then allow freeform:

Ask Builder...

But freeform AI should be secondary.

==================================================
STRESS TEST
==================================================

Create a major action:

Stress test

This should evaluate the actual structure.

Check:

QUESTION
Is the question specific enough?

OUTCOME
Does the workshop produce something tangible?

DECISION
Is there a decision?

AUTHORITY
Will the decision owner be present?

EVIDENCE
Where does reality enter?

SEQUENCE
Do outputs feed later activities?

DIVERGENCE
Are alternatives actually generated?

CONVERGENCE
Is there enough time to choose?

PARTICIPATION
Can everyone contribute?

LOAD
Is the agenda cognitively realistic?

TIMING
Does it fit?

FOLLOW THROUGH
Who owns what happens next?

Do not produce a meaningless numeric score.

Instead show specific issues.

Example:

HIGH PRIORITY

No decision owner

The workshop currently ends with a recommendation. Nobody present has authority to choose.

Suggested fix:
Add CEO to the final 45 minutes.

Another:

EVIDENCE GAP

The first three activities rely entirely on internal assumptions.

Suggested fix:
Move customer interview synthesis before Opportunity Mapping.

==================================================
LIBRARY RELATIONSHIPS
==================================================

Builder should understand method dependencies.

Example:

Customer Interviews
produce
EVIDENCE

Affinity Mapping
uses
EVIDENCE
produces
PATTERNS

Opportunity Mapping
uses
PATTERNS
produces
OPPORTUNITIES

Decision Matrix
uses
OPTIONS + CRITERIA
produces
SELECTED DIRECTION

Experiment Card
uses
SELECTED DIRECTION + ASSUMPTIONS
produces
TEST PLAN

This dependency graph is a major part of the product.

If the user puts something in the wrong sequence, Builder should notice.

==================================================
ASSET GENERATION
==================================================

A finished Workshop or Sprint should generate a complete working pack.

PREPARE

Sprint / Workshop Brief

Participant invitation

Pre-read

Pre-work

Materials checklist

Room setup

Remote setup

RUN

Minute-by-minute agenda

Facilitator run sheet

Instructions

Transitions

Decision gates

Breaks

Boards

WORK

FigJam / Miro structure

Worksheets

Canvases

Voting areas

Decision log

Parking lot

RESEARCH

Interview guide

Research plan

Recruitment screener

Testing protocol

AFTER

Summary template

Decision memo

Action tracker

Follow-up plan

NEXT TEST

Experiment plan

Relevant Library resources

Do not generate every asset automatically if it is not relevant.

Generate based on the structure.

==================================================
LIBRARY DISCOVERY THROUGH BUILDER
==================================================

This product should drive people deeper into the Raw Draft Library.

Every activity block should link to its full Library page.

Users can inspect:

What is this?

Why is Builder recommending it?

Where did it come from?

How do I run it?

What does Raw Draft think about it?

What usually goes wrong?

What assets are available?

What alternatives exist?

This is important for organic traffic and long-term value.

Builder should not hide the Library behind AI.

It should make the Library more discoverable.

==================================================
START FROM THE LIBRARY
==================================================

Every useful Library record should eventually support:

ADD TO BUILDER

Example:

User is reading:

Assumption Mapping

They click:

Add to Builder

Then choose:

Existing workshop

New workshop

Builder can ask:

“What are you trying to use Assumption Mapping for?”

and compose around it.

Similarly:

Start with this Sprint

Adapt this Workshop

Build around this Framework

Use this Playbook

==================================================
NO LOGIN FIRST
==================================================

Do not put authentication before the initial experience.

Visitors should be able to:

describe a problem

select constraints

generate a workshop

inspect it

change it

explore methods

without creating an account.

Only introduce account creation when they want to do something persistent or collaborative, such as:

Save

Duplicate

Collaborate

Export project

Maintain multiple workshops

Use Run Mode later

Do not interrupt the initial utility.

==================================================
TRAFFIC / SHAREABILITY
==================================================

The product should also create useful indexable/shareable objects where appropriate.

Examples:

Public Sprint templates

Workshop templates

Method combinations

Playbooks

Example builds

Do not expose users’ private Builder content publicly by default.

But Raw Draft can publish curated Builder templates.

Examples:

90-minute Product Decision Workshop

Half-Day Positioning Workshop

2-Day AI Product Strategy Sprint

Leadership Alignment Workshop

Scenario Stress-Test Workshop

These should link back into Builder:

Use this template

==================================================
FUTURE PRODUCT ARCHITECTURE
==================================================

Design the current Builder so it can eventually support three modes:

BUILD

Design the Sprint or Workshop.

RUN

Facilitate it live.

REVIEW

Capture decisions, evidence and follow-through.

Do not build every advanced Run/Review feature right now unless useful for architecture.

But structure the product so these can exist later.

==================================================
RUN MODE FUTURE
==================================================

Eventually:

CURRENT

Assumption Mapping

07:32 remaining

NEXT

Break
10 min

Actions:

Finish

+5 min

Skip

Capture decision

Parking lot

Builder could dynamically respond when the workshop is running late.

This is future direction.

Do not let this distract from getting Builder right first.

==================================================
VISUAL LANGUAGE
==================================================

The Builder should feel native to Raw Draft.

Use:

near-black board

subtle structural grid

grey outlines

off-white type

Raw Draft orange for selection, active state and important changes

workshop cards

post-it logic

visible structure

Avoid:

generic SaaS dashboard

rounded white cards everywhere

purple AI gradients

sparkles

magic-wand icons

chat bubbles everywhere

glowing AI borders

copilot aesthetic

The intelligence should be visible through what the system does.

Not through “AI-looking” decoration.

==================================================
AI CHANGE VISUALIZATION
==================================================

When AI changes the workshop, show structural transformation.

Example:

OLD

Assumption Mapping
60 min

changes to:

NEW

Critical Assumptions
30 min

Show:

what changed

why

time saved

impact downstream

Let the user:

Accept

Reject

Edit

Do not silently regenerate large parts of the workshop.

==================================================
POST-IT LANGUAGE
==================================================

Use the card language already appearing elsewhere in Raw Draft.

However:

public site cards
feel like workshop artifacts

Builder cards
are actual manipulable workshop objects

This should feel like the natural evolution of the website’s visual language into a product.

==================================================
MOBILE
==================================================

Do not try to fit the desktop workbench into a tiny three-column layout.

Mobile Builder:

Brief collapses into a top summary.

Canvas becomes a vertical sequence.

AI insights appear contextually between blocks or in a drawer.

Cards remain draggable/reorderable if reliable.

Editing should use bottom sheets or full-screen panels.

Primary use must remain possible on mobile.

No horizontal overflow.

==================================================
ACCESSIBILITY
==================================================

The visual board must remain semantically usable.

Support:

keyboard navigation

reordering without drag

proper button labels

focus states

screen reader descriptions

reduced motion

high enough contrast

dragging cannot be the only interaction method.

==================================================
DATA MODEL
==================================================

Do not hardcode generated agendas.

Builder should operate against structured records.

At minimum:

Project

Brief

Sprint / Workshop

Blocks

Library Resources

Constraints

Assets

Relationships

Builder Suggestions

Version history

The existing Raw Draft Library schema should remain the content source.

==================================================
IMPORTANT PRODUCT PRINCIPLE
==================================================

Do not build:

“AI generates an agenda from a prompt.”

Build:

“A constraint-aware workshop design environment powered by a structured library of real methods.”

That distinction is central.

The value is that users do not need to know:

which framework

which exercise

which sequence

which facilitation method

which workshop format

which research method

which decision mechanic

Builder should make those choices legible and editable.

==================================================
INITIAL VERSION TO BUILD NOW
==================================================

For this pass, create the strongest usable V1.

V1 should include:

1. /builder landing screen

2. hybrid natural-language + card-based brief creation

3. AI extraction into structured constraints

4. AI recommendation of Sprint vs Workshop and initial format

5. visual workshop canvas

6. reusable Library activity blocks

7. drag / reorder / remove / replace

8. block-detail view

9. contextual AI recommendations

10. time recalculation

11. basic Stress Test

12. links back to full Library resources

13. ability to start Builder from a Library item

14. no login required for initial build

15. responsive mobile behavior

Do not overbuild account management, collaboration or Run Mode yet.

==================================================
FINAL TEST
==================================================

A visitor with no facilitation background should be able to arrive and say:

“We need to figure out our positioning with the founding team in half a day.”

They should not need to search:

Which workshop do I run?

Which framework should I use?

How long should each activity take?

What order should they go in?

Who needs to be present?

What should the output be?

Builder should help resolve those questions using the actual Raw Draft Library.

At the same time, an experienced facilitator should be able to override, inspect and manipulate everything.

The result should feel useful enough that somebody would return to Raw Draft specifically to design their next workshop or Sprint.

Build this as a real product surface, not a marketing demo.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.

    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/019e1cd3-40f5-7da5-9267-056db89340cd/`. Before producing any visuals, explore it: call `list_files("/projects/019e1cd3-40f5-7da5-9267-056db89340cd/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/019e1cd3-40f5-7da5-9267-056db89340cd/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/019e1cd3-40f5-7da5-9267-056db89340cd/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: run_script]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

I rebuilt Builder at `#/builder` as a workbench on top of the Library. It's out for review now. Every block is a real Library record, and the agenda only changes when you accept a proposal.

- **Start:** you can type the problem, pick one of the six starting cards, or open one of five curated Raw Draft templates (each opens as an editable build). Builder pulls a structured brief out of what you type and marks those values "Inferred". It then asks one question at a time and shows the format it's leaning towards.
- **Time strip:** across the top, a bar shows divergent, convergent and break time, with a marker for the time available. Going over is flagged in orange.
- **Canvas:** blocks are workshop cards whose height grows with their duration. Each card shows what it needs, which inputs are missing and what it produces. You can drag, nudge minutes, lock, duplicate, remove, replace or move blocks up and down without dragging. Undo is available.
- **Sequence warnings:** problems appear right next to the block they affect (no decision owner, missing inputs, output nobody uses, too long without a break), each with a "Propose fix" button.
- **Block detail:** why it's here, purpose, time, people, inputs and outputs, how to run, facilitator notes for this context, what to watch for, assets, source and rights, related methods, and a link to the full Library page.
- **Proposals:** editing the brief (time, group size, remote), using a command, typing in "Ask Builder…" or picking a stress-test fix all produce a proposal. It shows old and new side by side, the effect on later blocks and the time change, and you tick which parts to accept.
- **Commands:** I added executive-friendly, more divergence, improve convergence, make the output concrete, create pre-work and follow-through. Activities moved async go into a separate pre-work lane rather than disappearing.
- **Stress test:** results are grouped into High priority, Worth fixing and Holding up. There's no score.
- **Mobile:** the brief collapses into a summary line, and block details and proposals open as bottom sheets.

Caveats:
- The Run and Review tabs are placeholders.
- Save only stores the build in this browser and shows a note about what an account would add.
- Typed requests are matched to commands by keyword first; the AI is only used when nothing matches.
- The previous version is kept as `RD Builder v1.dc.html` and `rd-builder-v1.js`.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

I've fixed both problems the review found, and the updated version is out for review again.

- **Button labels:** buttons and chips keep their text on one line now. When space runs out, whole chips move to the next row instead of their labels breaking.
- **Cut and fit:** after the usual compressions, Builder now trims short blocks by up to 10 minutes each. If that's still not enough, it proposes removing the blocks that matter least for the outcome. Locked blocks and the Decide block are never touched.
- **When it still falls short:** the title says so honestly, for example "Cut 60 minutes · found 45". A note explains that you'd need to remove another block by hand to save the rest.

## User

<pasted_text name="Pasted text (988 lines)">
Update the Raw Draft Builder direction.

The Builder must be genuinely drag-and-drop.

Do not make AI-generated workshops the primary interaction.

The product should allow someone to create a workshop manually from the Raw Draft Library, while AI helps recommend, validate, adapt and improve what they build.

The core product model is:

LIBRARY
→ DRAG RESOURCES
→ BUILD WORKSHOP
→ ADJUST
→ STRESS TEST
→ EXPORT / RUN

AI should assist this process, not replace it.

==================================================
1. PRIMARY BUILDER EXPERIENCE
==================================================

The main Builder should open directly into a workshop-design workspace.

Desktop structure:

LEFT
Resource Library

CENTER
Workshop Canvas / Timeline

RIGHT
Workshop Context + AI Assistance

The central interaction is:

drag a resource from the Library
drop it into the workshop
reorder it
resize/change time
configure it
continue building

A user should be able to build an entire workshop without typing a prompt if they want.

==================================================
2. LEFT PANEL: RESOURCE LIBRARY
==================================================

The left side contains searchable / filterable resources from the Raw Draft Library.

Include resource types such as:

- Activities
- Exercises
- Frameworks
- Research Methods
- Facilitation Methods
- Icebreakers
- Energisers
- Decision Methods
- Synthesis Methods
- Ideation Methods
- UX Methods
- Service Design Methods
- Serious Games
- Simulations
- Breaks
- Reflection
- Closing Activities

Do not show everything at once.

Use search and useful filters.

Examples:

PURPOSE
Open
Explore
Make sense
Create
Decide
Commit
Close
Reflect

TIME
5 min
10 min
15 min
30 min
45 min
60+ min

PEOPLE
Solo
2–5
6–10
11–20
20+

FORMAT
In person
Remote
Hybrid

OUTPUT
Decision
Ideas
Evidence
Map
Prototype
Priorities
Plan
Alignment

Users should be able to search naturally too:

“decision making”
“icebreaker for 12 people”
“research synthesis”
“30 minute ideation”

==================================================
3. RESOURCE CARDS
==================================================

Each Library resource should appear as a compact draggable workshop card.

Example:

ASSUMPTION MAPPING

30–60 min

Find assumptions that are important and weakly evidenced.

OUTPUT
Prioritized assumptions

The card can also show a small type label:

FRAMEWORK
ACTIVITY
RESEARCH
DECISION
etc.

Do not overload the card.

The full detail appears after the user opens it.

==================================================
4. DRAG AND DROP
==================================================

Dragging must feel extremely smooth.

The user should be able to:

- drag from Library into workshop
- reorder existing blocks
- move blocks between sections
- duplicate blocks
- remove blocks
- drag blocks between days
- insert a block between two existing blocks
- move blocks into breakouts
- create parallel activities
- move items into pre-work or follow-up

Show a clear insertion indicator while dragging.

Do not use clumsy browser-style drag visuals.

Cards should feel like physical workshop cards moving around a blackboard.

Use the existing Raw Draft post-it / workshop-card language.

==================================================
5. WORKSHOP CANVAS
==================================================

The central canvas is the actual workshop.

It should support multiple views.

DEFAULT:
Timeline / agenda

Example:

09:30
Welcome
10 min

09:40
Hopes and Fears
15 min

09:55
Evidence Review
30 min

10:25
Assumption Mapping
45 min

11:10
Break
10 min

11:20
Crazy 8s
20 min

11:40
Gallery Walk
20 min

12:00
Decision Matrix
40 min

12:40
Next Actions
20 min

Also allow:

BLOCK VIEW
larger visual sequence of cards

DAY VIEW
Day 1
Day 2
Day 3

The user should be able to switch views without changing the underlying workshop.

==================================================
6. SECTIONS / PHASES
==================================================

Allow users to create named sections.

Examples:

OPEN
UNDERSTAND
EXPLORE
CREATE
DECIDE
COMMIT

or custom labels.

Users can drag blocks into these phases.

Do not force Raw Draft’s recommended sequence.

Let the user build any structure they want.

AI can warn them if something seems structurally weak.

==================================================
7. BLANK WORKSHOP
==================================================

A user must be able to click:

New Workshop

and start from completely blank.

Do not force them through the AI brief first.

Initial canvas can simply say:

Drag something here.

Then show suggested starting categories:

Open
Explore
Create
Decide
Close

But these should be optional.

==================================================
8. AI-ASSISTED START
==================================================

Also provide:

Build with AI

This uses the natural-language + selection flow already designed.

Example:

“We need to choose a positioning direction with 6 people in 3 hours.”

AI creates a first workshop.

Then the user lands in the exact same drag-and-drop Builder.

The AI-created workshop is just a starting point.

Nothing should become locked.

The user can:
- reorder
- replace
- delete
- add
- change timing
- ignore AI

So there are two equally valid entry paths:

START BLANK

or

BUILD WITH AI

==================================================
9. START FROM TEMPLATE
==================================================

Third option:

Start from template

Examples:

90-minute Decision Workshop
Half-Day Positioning Workshop
Research Synthesis Workshop
Leadership Alignment Workshop
2-Day Product Strategy Sprint
Scenario Workshop
Design Sprint
Retrospective

Opening a template should create an editable copy in Builder.

The template is never read-only.

==================================================
10. BLOCK CONFIGURATION
==================================================

Clicking any block opens a detail panel.

Allow editing:

TITLE

TIME
Example:
30 min

PURPOSE

INSTRUCTIONS

PARTICIPANT MODE
Individual
Pair
Small group
Whole group

MATERIALS

OUTPUT

FACILITATOR NOTES

BREAKOUT SETTINGS

ASSETS

The user should also be able to override the Library defaults.

Example:

Library recommends:
45 min

User changes:
25 min

Builder should allow it.

AI may warn:

“25 minutes is tight for 18 participants.”

But do not block the change.

==================================================
11. RESIZE TIME DIRECTLY
==================================================

Workshop timing should be manipulable visually.

Ideally:

- drag bottom edge of block to increase/decrease duration
- or edit duration directly
- timeline updates immediately
- later blocks shift automatically
- total workshop duration recalculates live

Example:

Assumption Mapping
45 min

drag shorter

Assumption Mapping
30 min

The workshop ending time updates instantly.

==================================================
12. BREAKS
==================================================

Break should be a draggable object too.

Examples:

BREAK
10 min

LUNCH
45 min

Users can:
- drag in
- resize
- rename
- remove

AI can suggest breaks based on workshop length and cognitive load.

==================================================
13. PARALLEL BREAKOUTS
==================================================

Support parallel activity blocks.

Example:

10:30–11:00

GROUP A
Customer Journey

GROUP B
Service Blueprint

GROUP C
Assumption Mapping

Then:

11:00
Whole-group synthesis

The interface should visually show the parallel branches.

This is important for larger workshops.

==================================================
14. PRE-WORK AND AFTER
==================================================

The workshop should have areas outside the live agenda.

PRE-WORK

Examples:
Read research
Complete survey
Watch video
Prepare examples

LIVE WORKSHOP

Main timeline

AFTER

Examples:
Decision memo
Research follow-up
Prototype test
Action review

Users can drag resources into all three zones.

==================================================
15. CUSTOM BLOCKS
==================================================

Users are not limited to Library methods.

Provide:

+ Custom block

They can create:

Presentation
Discussion
Client update
Demo
Coffee
Lunch
CEO introduction
Custom exercise
Anything else

Fields:

Title
Duration
Instructions
Output

This is essential.

The product should not imply that every minute of a workshop needs to come from the Raw Draft Library.

==================================================
16. AI SHOULD WATCH THE CANVAS
==================================================

AI should understand what the user builds.

Example:

User manually builds:

Welcome
Brainstorm
Brainstorm
Brainstorm
Vote
Close

AI can surface:

“You have 90 minutes of idea generation but no evidence review.”

or:

“The vote produces a preference, but there is no explicit decision owner.”

or:

“This activity expects synthesized research, but no synthesis step appears earlier.”

or:

“Your workshop runs 37 minutes over.”

The user remains in control.

==================================================
17. AI ACTIONS ON SELECTED BLOCKS
==================================================

Select one or several blocks.

Then offer contextual actions:

Replace

Shorten

Expand

Adapt for remote

Adapt for 20 people

Turn into breakout

Move to pre-work

Find a simpler alternative

Add a follow-up activity

What should come before this?

What should come after this?

AI actions should manipulate the canvas directly after user approval.

==================================================
18. MULTI-SELECT
==================================================

Allow users to select multiple workshop blocks.

Then:

Move
Duplicate
Delete
Group
Change format
Move to another day
Ask AI

Example:

Select 4 blocks

Ask:
“Compress these into 90 minutes.”

AI proposes changes across only those blocks.

==================================================
19. CREATE FROM LIBRARY PAGE
==================================================

Every relevant resource page in the Library should have:

Add to Builder

Clicking it should allow:

New workshop

Existing workshop

The selected resource appears in the workshop canvas.

This is important.

The Library should behave like a component library for workshops.

==================================================
20. RESOURCE RECOMMENDATIONS
==================================================

When the user is building manually, the Library panel can recommend contextually relevant resources.

Example:

Current canvas ends with:
Crazy 8s

Suggested next:

Gallery Walk
20 min
Review concepts silently.

Note and Vote
15 min
Create directional preference.

Decision Matrix
30 min
Compare options using criteria.

Do not automatically add them.

The user chooses.

==================================================
21. CONNECT BLOCKS THROUGH INPUTS AND OUTPUTS
==================================================

Each structured Library resource should understand:

INPUT

OUTPUT

Example:

Customer Interviews
OUTPUT:
Evidence

Affinity Mapping
INPUT:
Evidence

OUTPUT:
Patterns

Opportunity Mapping
INPUT:
Patterns

OUTPUT:
Opportunities

When blocks connect properly, subtly communicate the relationship.

Do not turn this into a technical node graph by default.

But AI should understand the dependencies.

==================================================
22. EMPTY STATES
==================================================

Blank canvas:

Build your workshop.

Drag something from the Library or describe what you need.

Actions:

Start blank
Build with AI
Use a template

Keep this simple.

==================================================
23. SAVE / EXPORT PRODUCT MODEL
==================================================

The free first-use experience should allow people to actually build.

Do not put login in front of drag-and-drop.

Eventually account-gated features can include:

Save permanently
Multiple workshops
Version history
Team collaboration
Private templates
Run Mode
Workspace
Exports

But users should experience the actual Builder first.

For V1, provide a temporary local/session workshop even without account.

==================================================
24. EXPORT
==================================================

Eventually workshop should export into:

PDF agenda
Facilitator guide
Participant agenda
Word / document
Spreadsheet
Miro / FigJam structure
Calendar blocks

Do not build every export now if scope becomes too large.

But architect the Builder data so exports are possible.

==================================================
25. VISUAL DIRECTION
==================================================

The existing Raw Draft post-it visual system is ideal for this.

Builder should feel like:

a black strategy wall
+
a method library
+
a precise timeline
+
an intelligent facilitator sitting beside you

Not:

Notion
Miro clone
Trello
generic project management tool
AI chatbot
SaaS dashboard

Use:

black / charcoal
grey grid
thin outlines
off-white
Raw Draft orange for active selection
slight taped-note feeling
visible card movement
subtle texture
sharp typography

==================================================
26. DRAG MOTION
==================================================

Dragging should feel physical but restrained.

When picked up:
- card lifts slightly
- small scale change
- stronger border
- subtle shadow
- optional slight rotation straightens

While moving:
- insertion positions animate open
- downstream blocks shift smoothly

When dropped:
- card settles
- timeline recalculates
- no bounce

No exaggerated physics.

==================================================
27. MOBILE
==================================================

Mobile must still allow actual workshop creation.

Use:

top:
workshop name + time

middle:
vertical agenda

bottom:
Add block

Tapping Add block opens the Library as a searchable bottom sheet.

Users can:
- tap to add
- long press / handle to reorder
- edit time
- replace
- delete

Do not depend exclusively on desktop drag-and-drop.

==================================================
28. ACCESSIBILITY
==================================================

Drag-and-drop must never be the only control.

Every block needs keyboard-accessible actions:

Move up
Move down
Move to section
Move to day
Duplicate
Delete

Support:
- keyboard
- screen readers
- visible focus
- reduced motion

==================================================
29. PRODUCT POSITIONING
==================================================

The Builder should now be understood as:

A workshop-building environment powered by the Raw Draft Library.

Not:

An AI workshop generator.

Users can:

build manually

use AI

start from templates

mix all three

This is important.

Experienced facilitators should feel they have control.

Inexperienced users should feel guided.

==================================================
30. FINAL V1
==================================================

The V1 should now prioritize:

1. Blank workshop
2. Drag-and-drop Library
3. Search/filter methods
4. Add custom block
5. Reorder
6. Time editing
7. Timeline recalculation
8. Sections/phases
9. Pre-work/live/after
10. Block configuration
11. Library detail
12. AI-assisted start
13. Contextual AI suggestions
14. Replace method
15. Basic Stress Test
16. Templates
17. Start from Library resource
18. Mobile editing

Do not let account systems, collaboration, Run Mode, or complex exports delay this core interaction.

==================================================
FINAL TEST
==================================================

A facilitator should be able to open Builder and create this manually:

09:30
Welcome

09:40
Hopes and Fears

10:00
Customer Evidence Review

10:30
Assumption Mapping

11:15
Break

11:30
Crazy 8s

11:50
Gallery Walk

12:10
Note and Vote

12:30
Decision

12:50
Next Actions

by dragging Library resources into a blank workshop.

At the same time, a founder who does not know these methods should be able to describe their problem and let AI create a sensible first draft.

Both users end up in the same editable Builder.

That is the product.
</pasted_text>

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: run_script]_

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: run_script]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: dc_js_str_replace]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: ready_for_verification]_

I rebuilt Builder as a drag-and-drop workspace (Library on the left, workshop in the middle, context and Builder's checks on the right). AI now only suggests, checks and proposes. It's out for review now. In a quick test, dragging a block opened a gap where it would land, the drop worked, and the start times below updated.

**Starting and building**
- **Three ways in:** "Start blank", "Build with AI" (the earlier describe-it flow, which now produces a first draft on the same canvas) or "Use a template". Templates open as editable copies. There are eight, including Design Sprint and Retrospective.
- **Library panel:** you can search in plain language, so "icebreaker for 12 people" is read as 12 people plus a text search. Filters cover purpose, time, people, format, output and type. Cards drag in, or tap "+ Add".
- **Workshop formats from the Library:** these add all of their blocks at once.
- **Suggestions:** the panel suggests what could come next, or before or after a block you pick. Nothing is added unless you choose it.
- **Structure pieces:** Break, Lunch, Custom block, Section and Day are all draggable too.

**Editing the canvas**
- **Moving things:** blocks move within or between sections and days, and into pre-work or after. Dropping a block on the right edge of another card runs them as a parallel breakout.
- **Timing:** drag a card's bottom edge or type the minutes. Start times and the end time update live, and the Library default never blocks your change.
- **Views:** Timeline, Blocks and Days all show the same underlying workshop.
- **Block settings:** title, time, purpose, instructions, participant mode, breakout groups, materials, output, notes and Replace. Each block also shows its Library details: why it fits, use/avoid when, watch for, source and a link to the full page.
- **Multi-select:** duplicate, delete, group as a breakout, move, or ask for changes to only those blocks, such as "compress these into 90 minutes". Every change is shown as a proposal you accept or reject.
- **Keyboard:** every drag has a button alternative (up/down, move to section, day or zone). Alt+arrow keys reorder, Delete removes, and moves are announced to screen readers.
- **Mobile:** a fixed bottom bar with "+ Add block" (the Library as a searchable sheet, tap to add) and "Assist". Cards reorder by their handle or the arrows.

**Watching and checking**
- The checks from the last version still run as you build, plus two new warnings: running over the time available, and lots of idea generation with no evidence step. The stress test still works.

**Library and export**
- I added four Library records so the facilitator test agenda can be built entirely by dragging: Welcome and framing, Evidence Review, Gallery Walk and Next Actions. Hopes and concerns now also comes up when you search "hopes and fears".
- Export covers copying the agenda as text, a spreadsheet file and a workshop file for later exports.

Caveats:
- Workshops are stored only in this browser.
- Run mode, saving with an account, and PDF, Miro or calendar exports aren't built yet.
- The previous version is kept as `RD Builder v2.dc.html`.

## User

<pasted_text name="Pasted text (962 lines)">
Continue refining the Raw Draft Builder.

Important product-direction change:

The Builder should now be CHAT FIRST.

However, the final product is still the structured drag-and-drop workshop Builder described previously.

The flow should be:

CHAT
→ STRUCTURED BRIEF
→ SIGN UP WHEN NECESSARY
→ DRAG-AND-DROP BUILDER
→ AI CONTINUES TO ASSIST

Do not turn the entire product into a chatbot.

Chat is how the user enters and shapes the problem.

The Builder canvas is where the workshop actually gets created.

==================================================
1. PRIMARY ENTRY EXPERIENCE
==================================================

When someone opens:

/builder

do not immediately show the full three-column Builder.

Start with a focused conversational interface.

Primary heading:

What are you trying to figure out?

Large conversational input.

Possible examples underneath:

We need to decide which market to enter.

I need to run a 3-hour positioning workshop with our founders.

Our leadership team cannot agree on product priorities.

I need to make sense of 20 customer interviews.

We want to explore how AI could change our workflow.

Keep examples as clickable starters.

No giant setup form.

No requirement to choose a Sprint type first.

==================================================
2. CHAT SHOULD FEEL LIKE A WORKING CONVERSATION
==================================================

The AI should behave like someone helping design the work.

Not:

“What kind of workshop do you want?”

Instead, begin with the actual problem.

Example:

USER

We need to figure out whether we should add AI agents to onboarding.

BUILDER

What needs to exist by the end?

[Decision]
[Product direction]
[Ideas to test]
[Prototype]
[Not sure]

USER

Product direction and probably something we can test.

BUILDER

How much time do you have with the team?

[90 min]
[Half day]
[1 day]
[2 days]
[Multiple sessions]

USER

Half a day. CEO can only join for the last hour.

The user should be able to:
- type
- select cards
- combine both

Do not force every response through buttons.

==================================================
3. CHAT SHOULD EXTRACT STRUCTURE
==================================================

As the conversation progresses, Builder should quietly create a structured brief.

Examples:

QUESTION
Should AI agents become part of onboarding?

OUTCOME
Product direction + test

TIME
4 hours

TEAM
Founder
Product
Engineering

DECISION OWNER
CEO
Present final hour

EVIDENCE
Unknown

FORMAT
In person

Do not show the full brief immediately.

Gradually surface it in a compact panel or expandable summary.

The user should feel:

“I am talking normally, and the system understands what matters.”

==================================================
4. ASK ONLY HIGH-VALUE QUESTIONS
==================================================

Do not turn chat into a disguised questionnaire.

Builder should infer what it can.

Only ask questions that materially affect workshop design.

Important things include:

- the actual question
- desired output
- available time
- participants
- decision authority
- evidence available
- in-person / remote
- major constraints

Do not ask:

industry
company size
revenue
job title
team size

unless they are genuinely relevant to the workshop being designed.

==================================================
5. USE CARDS INSIDE CHAT
==================================================

Chat should not be text-only.

Use Raw Draft cards inside the conversation.

Example:

What needs to exist at the end?

┌──────────────────────┐
│ A decision           │
└──────────────────────┘

┌──────────────────────┐
│ A direction          │
└──────────────────────┘

┌──────────────────────┐
│ Ideas to test        │
└──────────────────────┘

┌──────────────────────┐
│ A prototype          │
└──────────────────────┘

Cards use the same Raw Draft workshop-card visual language.

Users can select a card and still type:

“Mostly a decision, but I also want 2 ideas we can test.”

AI should understand both.

==================================================
6. AI SHOULD NOT ASK THE USER FOR METHODS
==================================================

Never ask:

Which framework would you like to use?

Which facilitation exercise do you prefer?

Which workshop structure do you want?

Most visitors do not know.

That is the point of the product.

Builder should use the Raw Draft Library to make those recommendations.

==================================================
7. EARLY VALUE BEFORE SIGNUP
==================================================

Do not require signup before the first message.

Allow the visitor to:

- describe the problem
- answer a few clarifying questions
- receive a structured understanding of the problem
- see the recommended format
- see a high-level workshop outline

Example:

Based on what you've told me:

HALF-DAY PRODUCT STRATEGY WORKSHOP

4 people
4 hours
CEO joins final hour

Suggested structure:

Frame
Evidence
Assumptions
Options
Decision
Next test

Then introduce signup.

==================================================
8. SIGNUP MOMENT
==================================================

Require signup when the user wants to turn the recommendation into an editable workshop.

Primary transition:

Open this in Builder

When clicked:

Create your Raw Draft workspace to build and save this workshop.

Actions:

Continue with Google

Continue with email

Sign in

Keep this minimal.

Do not use:

Start your journey

Unlock the power of AI

Create your free account today

or other SaaS marketing language.

==================================================
9. WHAT SIGNUP UNLOCKS
==================================================

After signup, users can:

- open the full Builder
- drag and drop methods
- edit timing
- save workshops
- return later
- create more workshops
- maintain versions
- add custom blocks
- use AI edits
- save their own templates

Later paid functionality could include:
- collaboration
- advanced exports
- Run Mode
- team workspace
- organization Library
- larger usage limits
- custom resources
- private method libraries

Do not build all of this now.

But architect for it.

==================================================
10. DO NOT LOSE PRE-SIGNUP WORK
==================================================

This is critical.

When signup appears, preserve everything from the conversation.

After authentication, the user should land directly in the generated workshop.

No repeated questions.

No blank Builder.

No lost chat.

The session should migrate into the account.

==================================================
11. AFTER SIGNUP: TRANSITION INTO BUILDER
==================================================

Do not abruptly replace the conversation with a completely different product.

Animate the structured outline into the Builder.

For example:

CHAT OUTPUT

FRAME
EVIDENCE
ASSUMPTIONS
OPTIONS
DECIDE

smoothly becomes:

WORKSHOP CANVAS

09:30
Frame the decision

09:50
Evidence review

10:20
Assumption Mapping

11:00
Break

11:10
Generate options

12:00
Decision

12:30
Next test

This transition should feel like:

conversation becoming structure.

That is one of the strongest moments in the product.

==================================================
12. BUILDER AFTER SIGNUP
==================================================

Once inside Builder, preserve the previous drag-and-drop architecture.

Desktop:

LEFT
Raw Draft Library

CENTER
Workshop Canvas

RIGHT
AI / Context

The user can manually build and edit everything.

AI no longer dominates the interface.

==================================================
13. CHAT REMAINS AVAILABLE
==================================================

Inside Builder, retain a compact:

Ask Builder

interaction.

It can live:
- in the right panel
- as a bottom command input
- or as an expandable panel

Examples:

“Make this fit into 3 hours.”

“CEO leaves at 12. Move the decision earlier.”

“I want more customer input.”

“Replace Crazy 8s with something less design-heavy.”

“Make this work for 18 people.”

“Split this across two mornings.”

AI should translate natural-language instructions into structured Builder changes.

==================================================
14. AI SHOULD PROPOSE CHANGES
==================================================

Do not silently rewrite the canvas.

Example:

USER

Make this 90 minutes shorter.

BUILDER

I can save 95 minutes by:

MOVE TO PRE-WORK
Competitive Review
30 min

SHORTEN
Evidence Review
40 → 20 min

REMOVE
Second ideation round
25 min

SHORTEN
Report back
30 → 10 min

[Apply all]

or allow individual approval.

This is important.

Chat should operate the Builder.

==================================================
15. CHAT + DRAG-AND-DROP SHOULD WORK TOGETHER
==================================================

The product should support both interaction models equally.

Example:

User manually drags:

Premortem

into the agenda.

Then asks:

“Where should this go?”

Builder can recommend:

Before final decision.

Reason:
It will expose failure risks while there is still time to modify the option.

[Move it]

Another example:

User types:

“Add an icebreaker for 15 people that isn't embarrassing.”

Builder searches the Library and suggests:

Impromptu Networking
15 min

One-word Check-in
8 min

Hopes and Fears
20 min

User drags one into the workshop.

This is the experience.

==================================================
16. CHAT HISTORY
==================================================

Once signed in, save the Builder conversation as part of the workshop.

But do not make chat history the primary artifact.

Primary artifact:
the workshop.

Chat is supporting context.

Allow:
View conversation

rather than showing the entire history permanently.

==================================================
17. FIRST-TIME USER EXPERIENCE
==================================================

A new user should be able to experience this journey:

1.

What are you trying to figure out?

2.

“We're launching a B2B SaaS product and cannot agree which customer segment to target.”

3.

Builder asks 2–4 useful questions.

4.

Builder produces:

Recommended:
HALF-DAY OPPORTUNITY WORKSHOP

5.

Visitor clicks:

Open in Builder

6.

Signup

7.

Workshop opens as editable cards.

8.

User drags:
Customer Evidence Review
Assumption Mapping
Opportunity Mapping
Decision Matrix

9.

AI watches the structure.

10.

Workshop can be saved.

This entire journey should feel coherent.

==================================================
18. RETURNING USER
==================================================

Signed-in users going to /builder should get:

What are you working on?

Input

and perhaps:

RECENT

AI Onboarding Workshop
Edited yesterday

Positioning Sprint
Edited 4 days ago

Leadership Offsite
Edited last week

Also:

Start blank

Build with AI

Use template

Do not build a heavy dashboard.

Keep the product immediate.

==================================================
19. ACCOUNT MODEL
==================================================

Builder may require an account for persistent work.

Design basic account concepts:

USER

WORKSPACE

WORKSHOPS

TEMPLATES

SAVED LIBRARY ITEMS

Do not build enterprise administration now.

A personal workspace is enough for V1.

==================================================
20. ANONYMOUS VS SIGNED-IN ACCESS
==================================================

ANONYMOUS

Can:
- use Library
- start Builder chat
- describe problem
- answer questions
- see recommended format
- see initial workshop structure

Cannot persist:
- workshop
- edits
- versions
- custom resources

SIGNED IN

Can:
- open Builder canvas
- save
- edit
- create workshops
- return later
- maintain personal library
- use AI against saved workshops

This gives visitors real value before asking for identity.

==================================================
21. OPTIONAL USAGE GATE
==================================================

Architect the product so usage limits can be introduced later.

Possible future model:

FREE

Limited AI builds per month
Full manual drag-and-drop
Public Library
Basic save

PAID

More AI usage
Advanced workshop generation
Exports
Run Mode
Private templates
Collaboration
Custom Library

Do not put pricing into the current experience unless it already exists.

Just avoid architecture that assumes unlimited anonymous AI use forever.

==================================================
22. WHY CHAT FIRST
==================================================

The product should solve the blank-canvas problem.

People often know:

the problem

the team

the time

but not:

the workshop type

the methodology

the exercises

the sequence

Chat lets them describe what they know.

Raw Draft's structured Library supplies what they do not know.

Then the drag-and-drop Builder gives them control.

That is the product model.

==================================================
23. VISUAL DIRECTION FOR CHAT
==================================================

Do not make it look like ChatGPT.

No:
- bubbles everywhere
- avatars
- assistant robot
- gradient AI input
- sparkle icon
- huge conversation transcript

Use Raw Draft's design language.

Think:
a working session being assembled.

The user's text can appear as clean statements.

Builder responses can include:
- cards
- structured summaries
- selections
- method recommendations
- timelines

The chat area can feel like an intelligent working document rather than messaging software.

==================================================
24. DESKTOP ENTRY COMPOSITION
==================================================

Possible desktop layout:

LEFT / MAIN

What are you trying to figure out?

[large input]

conversation

RIGHT / QUIET PANEL

CURRENT BRIEF

Question
...

Outcome
...

Time
...

Participants
...

As the conversation evolves, the right panel fills itself.

This visually demonstrates that AI is turning conversation into structure.

==================================================
25. MOBILE CHAT
==================================================

Mobile:

Question/chat uses full width.

Brief is accessible through:
View brief

or collapsible top summary.

Cards become one per row.

Input stays reachable.

Signup transition must not lose progress.

After signup, transition into the vertical mobile Builder previously specified.

==================================================
26. FINAL PRODUCT PRINCIPLE
==================================================

The product is now:

CHAT
for understanding the problem

LIBRARY
for supplying trusted methods

AI
for reasoning about the structure

DRAG AND DROP
for control

BUILDER
for creating the actual workshop

ACCOUNT
for persistence

This should not become:

chatbot → one generated agenda → export.

The user should feel that the conversation creates the initial architecture, and then they own the workshop.

==================================================
27. V1 FLOW TO BUILD NOW
==================================================

Build this path:

/builder

↓

Chat-first problem input

↓

AI asks minimal clarifying questions using text + cards

↓

Structured brief forms automatically

↓

AI recommends format

↓

Show high-level workshop structure

↓

OPEN IN BUILDER

↓

Signup / sign in

↓

Preserve conversation and brief

↓

Open generated workshop on drag-and-drop canvas

↓

Library panel + manual editing + contextual AI

Do not let advanced workspace administration, billing, collaboration or Run Mode distract from this core path.

==================================================
FINAL TEST
==================================================

A first-time user should be able to type:

“I have six leadership team members for half a day. We have three possible new product directions and keep arguing about which one to fund.”

Builder should understand enough to ask only useful missing questions.

It should eventually propose something like:

Decision workshop
Half day
6 people
Decision owner required

Then show a credible high-level structure.

Only when the user chooses to actually build, edit and save it should signup become necessary.

After signup, the exact same work should become an editable drag-and-drop workshop.

No restart.

No lost context.

No generic chatbot experience.
</pasted_text>

<pasted_text name="Pasted text (1064 lines)">
Continue working on the existing Raw Draft Strategy website.

This is a major positioning and simplification pass.

Do not throw away the visual system we have built, but simplify the site architecture, homepage, messaging and hierarchy around one primary product:

THE RAW DRAFT BUILDER

The website should now feel product-first.

Raw Draft is still a strategy and innovation practice, but the primary way people experience the site should be through the product, Library and method of working.

The central proposition is simple:

Describe what you are trying to solve.
Build the right workshop or Sprint.
Run it yourself, or bring Raw Draft in to design and facilitate it.

The website should explain why this structured way of working is better than endless meetings, generic brainstorming and immediately jumping into execution.

IMPORTANT CTA CHANGE:

The global primary CTA remains:

Talk to me

Do NOT use:
Let’s build
Work with Raw Draft
Book a consultation
Get started

The Builder can have its own product CTA such as:

Build a workshop

or

Open Builder

But the global commercial CTA is:

Talk to me

==================================================
1. CORE POSITIONING
==================================================

The website currently tries to explain too many things at once.

Simplify it.

Raw Draft should now primarily communicate:

We help people structure important work.

The product lets people do this themselves.

The Library provides the methods.

Raw Draft can design or facilitate the work when the problem needs more support.

The visitor should understand this almost immediately.

Do not lead with a long explanation of:

strategy
innovation
futures
facilitation
consulting
design
research

Those capabilities can still exist deeper in the site.

The homepage should lead with the actual product and behavior.

==================================================
2. THE PRODUCT MODEL
==================================================

The basic product loop is:

DESCRIBE

What are you trying to figure out?

↓

DESIGN

Builder creates a structured workshop or Sprint from the Raw Draft Library.

↓

ADJUST

Drag, drop, reorder, change time, replace activities, add your own blocks.

↓

RUN

Use the facilitator guide, assets and agenda.

↓

LEARN

Capture decisions, evidence and what happens next.

For V1, Build is the primary functioning product.

Run and Review can be presented as the direction of the product without overbuilding them.

==================================================
3. THE SIMPLEST POSSIBLE PROMISE
==================================================

The homepage should make this immediately understandable:

You have a problem.

Raw Draft helps you design the work required to solve it.

You can:

DO IT YOURSELF

Use Builder + Library.

or

DO IT WITH US

Talk to me and I can design and/or facilitate the workshop or Sprint.

This should become the fundamental commercial structure of the entire site.

==================================================
4. HOMEPAGE HERO
==================================================

Make the hero product-first.

Do not begin with abstract strategy-practice language.

Possible headline directions:

Build the workshop you actually need.

or

Turn the problem into a working session.

or

Figure out what to do before you start doing it.

or

Design better ways to work through hard problems.

Choose the strongest direction based on the current design.

Supporting copy should communicate:

Describe the problem, constraints and people involved. Builder uses the Raw Draft Library to create a workshop or Sprint you can edit, run and adapt.

Keep this extremely concise.

Primary product CTA:

Build a workshop

Secondary commercial CTA:

Talk to me

Do not add three or four competing CTAs.

==================================================
5. HERO PRODUCT INTERACTION
==================================================

Instead of treating Builder as something visitors discover later, expose the beginning of Builder directly on the homepage.

Include the actual product input:

What are you trying to figure out?

Large input.

Example placeholder:

“We need to decide which customer segment to focus on.”

Below it, a few small example starters.

Examples:

Choose a product direction

Align a leadership team

Make sense of research

Explore an opportunity

Plan a strategy session

Test an idea

The user can type directly from the homepage.

Submitting should take them into /builder with their text preserved.

This is more useful than a decorative product mockup.

==================================================
6. HERO VISUAL
==================================================

Keep the structural / architectural visual language we have been developing, but make it secondary to the product.

The visual can still contain:

wireframe
structural drawing
unfinished architecture
nodes
lines
systems

But it should no longer dominate the hero.

The product input and proposition come first.

The structural visual can live in the background or edge of the composition.

==================================================
7. HOMEPAGE STRUCTURE
==================================================

Simplify the homepage to approximately these sections:

1. Hero + Builder input
2. Why work this way
3. How Builder works
4. Build it yourself
5. Or bring us in
6. Library
7. Example workshop / Sprint formats
8. Work / evidence
9. Talk to me

Do not turn the homepage into a catalogue.

==================================================
8. WHY WORK THIS WAY
==================================================

This section is important.

Explain why structured workshops and Sprints are useful.

Do not use abstract consultancy language.

The problem:

Most difficult work gets handled through:

meetings
opinions
slides
open-ended discussion
premature execution
one loud person deciding
weeks of circular debate

The alternative:

make the question explicit

bring the right people into the room

use evidence

work independently before debating

make alternatives tangible

test assumptions

make the decision

leave with something usable

Do not write this as a manifesto wall of text.

Make it visually simple.

Possible structure:

THE QUESTION
What actually needs to be decided?

↓

THE ROOM
Who needs to contribute and who decides?

↓

THE WORK
What evidence, exercises and methods get us there?

↓

THE OUTPUT
What physically exists at the end?

This should make Raw Draft’s philosophy practical.

==================================================
9. A SIMPLE CORE STATEMENT
==================================================

Introduce something like:

A good workshop is not a meeting with sticky notes.

It is a deliberately designed path from a question to an outcome.

This is the idea the entire site should demonstrate.

You can refine the wording, but keep the meaning.

Do not add a long paragraph underneath.

==================================================
10. HOW BUILDER WORKS
==================================================

Show the product in 3 or 4 steps.

STEP 1

Describe the problem.

Type naturally or select what you need.

STEP 2

Builder structures it.

It identifies the outcome, people, time, evidence and decision requirements.

STEP 3

Build the workshop.

Drag methods from the Library, reorder them, change timing and add custom blocks.

STEP 4

Run it.

Use the agenda, instructions, assets and facilitator notes.

If Run Mode is not implemented yet, make it clear that this is the intended workflow without faking functionality.

==================================================
11. SHOW THE ACTUAL PRODUCT
==================================================

Use a real Builder product preview.

Not a generic dashboard mockup.

Show:

LEFT
Library

CENTER
Workshop timeline

RIGHT
AI recommendations

Example workshop:

09:30
Frame the decision

09:50
Evidence Review

10:20
Assumption Mapping

11:00
Break

11:10
Generate Options

12:00
Decision

12:30
Next Test

Demonstrate:

dragging
reordering
changing timing
replacing a method
AI warning
adding custom block

The visitor should understand the product without reading a long feature list.

==================================================
12. DIY VS RAW DRAFT
==================================================

Create one very clear section:

RUN IT YOURSELF
or
BRING US IN

This is the commercial model.

LEFT:

DO IT YOURSELF

Use Builder and the Library to design and run your own workshop.

Possible items:
- build from scratch
- start with AI
- use a template
- drag in methods
- download assets
- adapt timing
- run the workshop yourself

CTA:

Open Builder

RIGHT:

BRING US IN

If the question is consequential, complex or difficult to facilitate internally, I can design and/or run the work with you.

Possible items:
- workshop design
- Sprint design
- research and preparation
- facilitation
- synthesis
- decision support
- follow-through

CTA:

Talk to me

Do not call the right side consulting.

Do not make one option look inferior.

The product should genuinely work without hiring Raw Draft.

==================================================
13. COMMERCIAL POSITIONING
==================================================

Raw Draft should not feel like a consultancy using a free tool as lead generation.

The product must have standalone value.

The commercial relationship should feel like:

You can use everything yourself.

If the problem needs an experienced facilitator or a more custom process, talk to me.

This makes the expertise credible rather than artificially gated.

==================================================
14. LIBRARY POSITIONING
==================================================

Simplify how the Library is described.

Do not say:

A massive repository of frameworks.

Say something closer to:

The building blocks behind Builder.

The Library contains:

Sprints
Workshops
Exercises
Research methods
Facilitation methods
Strategy tools
UX methods
Service design tools
Games
Templates
Boards
Prompts

The user should understand:

Builder chooses and combines these.

They can also browse them directly.

CTA:

Browse the Library

==================================================
15. LIBRARY AND BUILDER RELATIONSHIP
==================================================

Make this relationship explicit visually.

LIBRARY

Individual building blocks.

↓

BUILDER

Combine them into a workshop.

↓

WORKSHOP

Something you can actually run.

This should be one of the clearest system diagrams on the site.

No complicated technical graphic.

==================================================
16. TEMPLATE DISCOVERY
==================================================

Show a few concrete things people can build.

Examples:

90-minute Decision Workshop

Half-Day Positioning Workshop

Research Synthesis Workshop

Leadership Alignment Workshop

2-Day Product Strategy Sprint

Scenario Stress Test

Customer Journey Workshop

AI Opportunity Workshop

Each can have:

duration
people
output

and:

Use template

Do not show 30 examples on the homepage.

Use 4–6.

==================================================
17. PRACTICE PAGE
==================================================

Simplify Practice heavily.

Practice should now explain:

why Raw Draft works this way

the Cycle of Creation

what a Raw Draft is

how structured working sessions fit into that philosophy

what kinds of problems I can help design/facilitate

Do not make Practice another services catalogue.

==================================================
18. WHAT IS A RAW DRAFT?
==================================================

Keep the branded term.

Definition direction:

A Raw Draft is a structured cycle for turning uncertainty into something you can test, learn from and decide on.

Then explain:

A workshop might be one Raw Draft.

A Sprint may contain several.

A prototype can be one.

A research cycle can be one.

The principle is:

make the question tangible enough to expose it to reality.

Keep this concise.

==================================================
19. MANIFESTO
==================================================

Keep:

Creation
Chaos
Clarity
Cadence

But connect it back to the practical product.

Do not leave it as a separate philosophical art piece.

After the animation, make the connection simple:

This is why we work in drafts.

You make something.
Reality pushes back.
You structure what survives.
Eventually the system can run.

Then move on.

Do not add another long paragraph about cosmology.

==================================================
20. “WHAT WE WORK ON”
==================================================

Keep the post-it board we have been designing.

But position it as examples of the questions Builder and Raw Draft can help structure.

Cards:

Strategy

Products

Brands

Services and experiences

Research

Futures and foresight

AI and emerging technology

Go-to-market

Strategic decisions

Each should include the concise explanation already requested.

This is supporting breadth.

It should not be the homepage's main proposition.

==================================================
21. WORK
==================================================

Keep Work as applied evidence.

But simplify its role.

It should answer:

What has this way of working actually been used for?

Use:

projects
workshop artifacts
decisions
research
prototypes
strategic outputs

Avoid generic case-study marketing.

==================================================
22. NETWORK
==================================================

Keep Network as a top-level navigation item.

Network remains:

Advisors

Collaborators

Partners

using the post-it / workshop-card visual system already specified.

Do not let Network compete with Builder on the homepage.

A small reference is enough.

==================================================
23. NAVIGATION
==================================================

Simplify the primary navigation around the product.

Recommended:

Builder
Library
Work
Network

Then:
Practice

can either remain as a top-level item if space permits:

Practice
Builder
Library
Work
Network

or live as a secondary/footer route.

Preferred if the header remains clean:

Builder
Library
Work
Network

CTA:
Talk to me

Logo:
Raw Draft.

Use judgment based on the actual current header width.

Builder should be highly visible.

==================================================
24. GLOBAL CTA SYSTEM
==================================================

GLOBAL COMMERCIAL CTA:

Talk to me

PRODUCT CTA:

Build a workshop

or

Open Builder

LIBRARY CTA:

Use this

Add to Builder

Browse Library

WORK CTA:

Read

See the work

NETWORK:

View network

Do not use Talk to me for product interactions.

Do not use Build a workshop as the commercial CTA.

==================================================
25. TALK TO ME FLOW
==================================================

Talk to me should open the simplified qualification form already defined.

Keep it lightweight and card-based.

The form should help determine whether I should:

design the workshop

facilitate it

help structure the problem first

or point them toward the DIY product/resources

Do not make the form feel like enterprise sales qualification.

Keep it direct.

==================================================
26. SITE COPY STYLE
==================================================

Make the entire site easier to understand.

Use shorter sentences.

Prefer:

You have a question.

We design the work needed to answer it.

over:

Raw Draft helps organizations navigate complex strategic ambiguity through structured collaborative processes.

Avoid:
innovation consultancy
transformation partner
facilitation-led strategy
collaborative problem-solving ecosystem
AI-powered methodology platform

even if technically true.

The user should not have to decode the business.

==================================================
27. HOMEPAGE MESSAGE HIERARCHY
==================================================

A visitor should understand these ideas in order:

1.
I can build a workshop here.

2.
It will help me figure out which methods and structure I need.

3.
I can edit everything myself.

4.
The methods come from a large structured Library.

5.
There is a reason this way of working is better than another meeting.

6.
I can run it myself.

7.
If the problem is important, I can ask Raw Draft to design or facilitate it.

That is the homepage story.

==================================================
28. REMOVE DISTRACTIONS
==================================================

Reduce or remove homepage material that does not support this story.

Examples:

long consultancy descriptions

too much manifesto copy

large capability catalogs

decorative system language

multiple competing philosophy sections

excessive personal biography

too many CTAs

The site can still contain depth.

The landing page should remain simple.

==================================================
29. PRODUCT SEO / DISCOVERY
==================================================

Architect the site so the product and Library can generate useful public pages such as:

Workshop Builder

Workshop Templates

Sprint Templates

Decision Workshop

Strategy Workshop

Facilitation Methods

Icebreakers

Research Methods

Service Design Workshop

Product Strategy Sprint

AI Workshop

Leadership Workshop

Do not create keyword-stuffed landing pages.

Use the actual Library and Builder templates as useful indexable content.

The product should create traffic because people can genuinely use it.

==================================================
30. THE BUSINESS MODEL SHOULD BE VISIBLE WITHOUT BEING SALESY
==================================================

The site essentially offers two routes:

DIY

Builder + Library

DONE WITH YOU / FACILITATED

Talk to me

Do not create:
Basic
Pro
Enterprise
consulting packages

on the homepage right now.

The model is simpler than that.

==================================================
31. MOBILE
==================================================

Homepage on mobile should still lead with:

headline

short explanation

“What are you trying to figure out?” input

Build a workshop

Talk to me

Do not allow the structural hero visual to push the actual product below the fold.

Product comprehension comes first.

==================================================
32. FINAL HOMEPAGE TEST
==================================================

A visitor who has never heard of Raw Draft should be able to understand within roughly 10 seconds:

This helps me design a workshop for a real problem.

I can describe what I need instead of knowing which methods to search for.

I can edit the workshop myself.

There is a large Library behind it.

I can run it myself.

If I want help, I can talk to the person behind Raw Draft to design or facilitate it.

If those six things are not immediately obvious, simplify further.

==================================================
FINAL PRODUCT POSITIONING
==================================================

The site should feel like:

PRODUCT FIRST

Builder is the useful thing people come to use.

LIBRARY SECOND

The Library gives Builder depth and also works independently.

PRACTICE BEHIND IT

The philosophy and expertise explain why the product works this way.

SERVICE AVAILABLE

Talk to me if you want the workshop designed or facilitated for you.

Do not make the site feel like a consultancy website with a Builder attached.

Make it feel like a useful product created from an actual practice.
</pasted_text>

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: copy_files]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

_[tool: run_script]_

_[tool: delete_file]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: run_script]_

_[tool: save_screenshot]_

_[tool: run_script]_

_[tool: save_screenshot]_

_[tool: ready_for_verification]_

Both passes are done and out for review. I ran your test sentence through the whole path: chat, recommendation, signup, then the editable canvas.

**Builder, chat first**
- **Chat:** `/builder` now opens on "What are you trying to figure out?" with clickable starters. Answers read as plain statements, and Builder replies with questions plus card options. You can pick a card, type, or do both.
- **Questions:** Builder asks at most four, and only about what's missing: outcome, time, people, who decides, and existing evidence. It never asks which method to use.
- **Your test sentence:** "Six leadership team members for half a day… three product directions…" filled in time, people and outcome on its own. Builder then asked only who decides and what evidence exists, and recommended a **Decision Workshop** (half day, 6–10 people), with the decision-owner point flagged in orange and a seven-block outline.
- **Brief panel:** a "Current brief" panel fills in as you talk. On mobile it's behind "View brief".
- **Signup:** "Open in Builder" brings up a short workspace prompt (Google, email, or sign in). After signing in, nothing is asked again: the outline animates into the timed timeline and the conversation is saved with the workshop ("View conversation").
- **Returning users** get "What are you working on?", a list of recent workshops, and Start blank / Build with AI / Use a template.
- **Ask Builder** inside the canvas now also handles:
  - "fit into 3 hours" proposes cuts.
  - "Replace X with…" opens alternatives for that block.
  - "Where should this go?" proposes a position for the selected block.
  - "Add an icebreaker for 15 people" runs the Library search.

**Site repositioning**
- **CTA:** the global button is now "Talk to me" everywhere; the old "Let's build" label is gone across all pages.
- **Navigation:** Builder · Library · Work · Network. Practice moved to the footer.
- **Homepage, in order:**
  - Hero with the real input box (it hands your text straight to Builder)
  - "A good workshop is not a meeting with sticky notes."
  - How Builder works, with a static illustration of the product
  - Run it yourself, or bring me in
  - Library → Builder → Workshop
  - Six templates that open in Builder
  - Why we work in drafts (the cycle animation, with the new closing line)
  - Work
  - Talk to me
- **Removed from the homepage:** the old step-by-step wizard, the Sprints row and the Notes row.

**Caveats**
- Accounts are simulated and stored only in this browser; the signup dialog says so. Real sign-in needs a backend.
- My test left a signed-out account and one "Decision Workshop" in your browser's Builder data. You'll see it if you sign in.
- I didn't touch the Practice page or the "What we work on" board in this pass.

Backups of the previous versions are in `RD Builder v3.dc.html` and `RD Builder v2.dc.html`.

## User

Found issues — fixing…

## Assistant

_[tool: snip]_

_[tool: run_script]_

_[tool: ready_for_verification]_

## Assistant

_[tool: update_todos]_

I fixed the chips in the homepage Library section ("Research methods", "Service design tools" and the rest). Their text no longer breaks out of the border, and each chip now drops to the next row whole. The page loads without errors; I didn't re-run the full review for this small fix.

Both passes from before are in place: the chat-first Builder and the product-first homepage.

The Practice page simplification and the "What we work on" board haven't been started. I've stopped here because the usage limit is nearly reached; ask and I'll continue with those.

## User

continue

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

I've simplified the Practice page (`#/practice`, linked from the footer). It's out for review now.

- **Opening:** "Figure out what to do before you start doing it." It explains the two routes in one short paragraph: build it yourself with Builder and the Library, or bring me in.
- **Why work this way:** now in plain language. Meetings, opinions and jumping straight to execution on one side; what a designed session does on the other.
- **What is a Raw Draft:** keeps the definition, then four small cards (a workshop might be one, a Sprint may contain several, a prototype can be one, a research cycle can be one), then the principle: "make the question tangible enough to expose it to reality."
- **Cycle of creation:** the animation stays, now ending with "This is why we work in drafts. You make something. Reality pushes back…"
- **How a session fits:** a new short section linking the question, the room, the work and the output to Builder and the Library.
- **What we work on:** now framed as example questions Builder and Raw Draft help structure. When you open a card's typical question, a "Build a workshop for this →" link starts Builder with that question filled in.
- **Removed:** the "Structure, left visible" and "Values" sections.
- **Kept:** your bio and the FAQ.
- **Closing:** "If it matters, bring me in." with the "Talk to me" button.

## User

change practice to about us, put it under work  and include everything insluding network inside the same heading. cycle of creation doesnt need a nav link. 

also change talk to me to book a workshop which leets to a qualification quiz.

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

_[tool: grep]_

Edits persisted. Fixing the top strip copy and checking the qualification flow's entry label.

_[tool: run_script]_

_[tool: ready_for_verification]_

Practice is now "About us", with the network included on the same page, and "Talk to me" is now "Book a workshop" everywhere. It's out for review.

- **Navigation:** Builder · Library · Work · About us. "About us" sits right after Work, and Network no longer has its own nav item.
- **About us page:** the former Practice content comes first, then a Network section on the same page (advisors, collaborators, partners, worked with, how the network works). The page ends with one closing button.
- **Network links:** the old `#/network` address and the footer "Network" link open About us and scroll down to that section.
- **Footer:** the "About us" column has About us, Network and Sources. "The cycle of creation" link is gone.
- **Book a workshop:**
  - Replaces "Talk to me" in the header, mobile menu, homepage, About us, Library item pages and the footer.
  - Every one of these goes to the existing qualification quiz, whose heading now also reads "Book a workshop".
  - The top strip now reads "…Run it yourself, or book a workshop with us."

The homepage hero now has "Build a workshop" (opens Builder) right next to "Book a workshop" (the quiz). The two labels are very close; if that feels confusing, the Builder one could become "Open Builder".

## User

qualificaiotn quiz??

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

"Book a workshop" was opening the old quiz, whose questions were about a general strategy project, not booking a workshop. I've rewritten it as a workshop booking quiz. It's out for review.

It's still one card question at a time (`#/work-with-us`):
1. **What do you need help with?** Designing it, facilitating on the day, structuring the problem first, research, synthesis, or not sure.
2. **What is the session about?** A decision, what to build, positioning, aligning leadership, research, AI, the future, go-to-market.
3. **How long?** 90 minutes up to a multi-day Sprint, or several sessions.
4. **How many people?**
5. **Who makes the final call?** And will they be there.
6. **When?**
7. **Is there budget for outside facilitation?**
8. **Type of organisation** (optional).

The answers send people to one of three endings:
- **Run it yourself:** for no budget, or design-only help while still exploring. It shows "You can build this yourself", with "Build it in Builder" (your answers are carried over as the description), a matching template, and Library recommendations.
- **Book a call:** "Let's talk it through", with a summary of their answers, a short form, and a calendar link.
- **Good fit:** a clear question, someone who decides attending, and either a date soon or approved budget. It shows "This looks like a good fit", with the reasons and a short form.

The two booking endings also offer "Or build it yourself in Builder". Anyone partway through the old quiz starts fresh.

## User

why the fuck does book a workshop take me to build it outeslef

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Sorry, that ending shouldn't have existed. I'd added a "build it yourself" ending to the quiz for people with no budget or who were only exploring. It's gone now.

"Book a workshop" now always ends in booking:
- **Every answer path** ends on "Let's book your workshop." with a short details form, then the calendar.
- **Strong fits** (clear question, someone who decides attends, a date soon or budget approved) get "Request the workshop". Everyone else gets "Book a call".
- **No more Builder links** in the quiz: the "Or build it yourself in Builder" link and the first question's "you can still build it yourself" line are both removed.

I checked that the page loads without errors, but didn't click through the quiz again after this change.

## User

after they click on book a workshop, a typeform like qualificaiton quiz with different outcomes should be there

## Assistant

_[tool: dc_write]_

_[tool: ready_for_verification]_

"Book a workshop" now opens a Typeform-style quiz. It's out for review.

- **Flow:** an intro screen ("Tell me about the session."), then one full-screen question at a time with an orange progress bar at the top.
- **Controls:** letter keys A, B, C… pick an option, and Enter continues. Single-choice answers move on by themselves; multi-choice questions get an OK button. ↑ and ↓ arrows in the corner go back and forward.
- **Questions:** the 8 workshop questions from before, then contact details one per screen (name, work email, organisation, anything to know). Organisation and notes can be skipped.
- **Outcomes:** each ending shows a recommended format card (the format, what it covers, the session details and what's included) plus a booking action.
  - **Strong fit:** "Let's get it in the calendar" with a link to pick a 30-minute planning call.
  - **Good fit:** "Let's book a short call" with a link to book a 20-minute call.
  - **No date or budget yet:** "I'll send you a proposal" with a "Send me the proposal" button.
- **Recommended format** depends on the answers: a problem structuring session, a designed and facilitated Sprint, a facilitated workshop, a workshop with research and synthesis, or workshop design only.

Answers are saved locally when the quiz is submitted. Nothing is sent to you yet, because no submission address is set. The "Send me the proposal" button only shows a confirmation for now. To make it real, give me a form address and I'll wire the submissions to it.

## User

give me 3 types of fits. and restart the route. i want to answer questions etc to prototype

## Assistant

_[tool: run_script]_

_[tool: show_to_user]_

_[tool: eval_js_user_view]_

The booking quiz now ends in one of three named fits, and it's open in your preview at the intro screen, ready to answer. I haven't run through it myself since this change.

1. **Strong fit:** "Let's get it in the calendar" and a link to pick a 30-minute planning call. You get this with a clear question, someone who decides attending, either a date within two months or approved budget, and a score of 70 or more.
2. **Good fit:** "Let's book a short call" and a link to book a 20-minute call. This is the default when nothing points to an early fit.
3. **Early fit:** "I'll send you a proposal" and a "Send me the proposal" button. You land here if the decision maker is unlikely to attend, budget is "Not yet" or "No budget", there's no date yet, or the score is under 40.

Every ending shows the recommended format, the reasons for that fit, and "Start over".

For prototyping, a small panel in the bottom-left shows which fit your answers currently lead to and the score. It updates as you answer and has a "Restart from the beginning" button. Turning off the `showRouting` setting hides it.

To hit each fit quickly:
- **Strong:** "A difficult decision", "I do", "Within 2 to 4 weeks", "Yes, it is approved".
- **Good:** the same, but "This quarter" and "We are comparing options".
- **Early:** "No budget. We will run it ourselves" or "No date yet".

## User

ask about a bidget range approved so they know how much it would cost in $

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: ready_for_verification]_

_[tool: eval_js_user_view]_

The budget question now asks for an approved range in US dollars, and every result shows the typical price. It's out for review, and the quiz is open in your preview from the start.

**The question:** "What budget range is approved for this?"
- Under $2,500
- $2,500 to $7,500
- $7,500 to $15,000
- $15,000 to $30,000
- $30,000 or more
- A budget exists but isn't approved yet
- No budget yet

**On the result:** the recommended format card now shows a **typical investment** in USD, marked "confirmed in the proposal". Under it is a note comparing that price with the range they picked: "Your approved range covers this", or, in orange, that it's below the typical range and a smaller version can be scoped.

These price ranges are placeholders I made up. Please swap in your real ones:

| Format | Typical price |
|---|---|
| Problem structuring session | $1,500 to $3,000 |
| Workshop design (you run it) | $2,500 to $5,000 |
| Facilitated workshop, 90 minutes | $2,500 to $4,500 |
| Facilitated workshop, half day | $4,000 to $8,000 |
| Facilitated workshop, full day | $7,000 to $12,000 |
| Facilitated workshop, several sessions | $9,000 to $18,000 |
| Workshop with research and synthesis | $10,000 to $20,000 |
| Designed and facilitated Sprint | $15,000 to $40,000 |

**How the budget answer affects the fit:**
- **Early fit:** picking "isn't approved yet" or "No budget yet" now leads here.
- **Strong fit:** an approved $7,500 or more, together with a clear question and the decision maker attending, can reach strong fit even without an urgent date.
- **Reasons:** the "Why this fit" list now names the approved range.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

I fixed both problems the review found; the update is out for another check.

- **Budget note:** it now compares the approved range with the whole typical price, not just the low end:
  - **Below the typical range:** offers a smaller scope (shown in orange).
  - **Reaches only the lower end:** "fits the lower end. I'll scope it to stay within it."
  - **Covers the top of the typical price:** "covers this."
  - **Whole range above the price:** says there is room for research or follow-through.
- **Prototype panel:** it no longer covers the answer cards. It's now a small "Prototype · Good fit" tag in the top-right, under the progress bar. Click it to see the current fit, the score and "Restart from the beginning".

