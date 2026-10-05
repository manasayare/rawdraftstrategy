# Builder

One Workshop object, four views of it: **Import → Build → Run → Review**. Route `/builder`, plus
`/present` for the participant screen.

## Where things live

| | |
|---|---|
| `src/builder/types.ts` | Workshop, Item, Context, Session, Capture. Saved in localStorage `rd-workspace`. |
| `src/builder/store.ts` | All state and actions (plain TypeScript, `useSyncExternalStore`). |
| `src/builder/import/` | `parse.ts` brief + agenda from text, `match.ts` agenda → Library, `ingest.ts` `createWorkshopFromContext()` for connectors, `toWorkshop.ts` browser-side glue. |
| `src/builder/run/` | `session.ts` run engine (wall-clock timer, schedule projection, lateness, recovery options, captures), `script.ts` facilitator script from block + Library, `present.ts` participant-screen sync. |
| `src/builder/suggest/rules.ts` | Suggestions: deterministic rules over the workshop, its context and Library metadata. |
| `src/builder/review.ts` | Stats, summary Markdown, participant recap. |
| `src/builder/mylib.ts` | My Library (localStorage `rd-mylib`): templates, own activities, saved, recent. |
| `src/builder/components/` | Views. `run/` holds the Ready screen, live facilitator view and timer dial. |
| `src/app/api/import` | Connector entry point. See `docs/connectors.md`. |
| `src/app/api/workshops` | Share links. |

The Library engines (`window.RD`, `RDL`, `RDB` from `src/rd`) are shared with the rest of the site;
`src/builder/engine.ts` types the parts Builder uses.

## Behaviour worth knowing

- **Context** imported or typed stays on the workshop (`context.brief`, `context.sources`) and feeds
  recommendations. It never appears in Run mode or on the participant screen.
- **Run timing** is wall-clock: `acc + (now - t0)`. Reloading or switching tabs never loses time; a
  reload mid-session opens straight back into Run mode.
- **Lateness** compares the projected finish with the original plan for the current day. Recovery
  options are offered, never applied automatically.
- **Optional** blocks can be skipped from the late banner. **Backups** sit outside the timeline and can be
  slotted in next during a run.
- **Participant screen** gets a public snapshot (title, timer, participant lines, next). It's
  published over BroadcastChannel and localStorage, so it works in another window of the same browser.
  A second device would need a server channel; the snapshot shape is ready for that.
- **Suggestions** recalculate on every change and are never applied silently: each action opens a
  proposal showing current and after timings, with Apply or Cancel. Levels are Needs attention, Could
  improve and Optional (behind "Review workshop"). "Keep as is" hides one until what it depends on
  changes; "Not relevant" hides it for that workshop. Run mode only shows time and break suggestions;
  Review suggests new defaults from how long activities actually took.
- **Keyboard** in Run mode: Space, N/P, = + −, D Q L F O for capture, A agenda, ? help, Esc. Nothing
  fires while typing.

## Boards, polls and slides

- A block's links (`cfg.links`, one per line) are recognised by host in `src/builder/tools.ts`: Miro, FigJam/Figma, Mentimeter, Slido, Mural, Google Slides/Forms and others. They show in Block detail, Ready → Boards & links, and as "Open {tool} ↗" in Run. Participant-facing tools (polls, boards) also appear on `/present`.
- Library records can carry `toolLinks` (Sanity field "Template links"). They show on the item page as "Ready-made boards" and in the builder under every block made from that record.
- `src/builder/exportBoards.ts`: Slides (.pptx through pptxgenjs, script in speaker notes), Board (.svg, one card per activity in section columns), Miro sticky text, Mentimeter poll questions. Miro has no open import for boards, so the SVG lands there as an image; FigJam and Figma keep it as editable shapes and text.

## Resource collections

- Library records can list what they contain (`entries`, Sanity "What's inside"): name, one line, group, time, people, optional link. The item page shows them as a credited grid; each opens a side panel with credit, a link to the original and, when the Library has a record with the same name, its full guide and "Add to Builder". Arrow keys step through, Esc closes.
- `scripts/resource-entries.mjs` holds the current contents (Liberating Structures, Gamestorming, LUMA, Design Kit, Strategyzer experiments, Laws of UX, Atlassian plays, d.school, UK Futures Toolkit, Service Design Tools, Nesta DIY). `scripts/apply-resource-entries.mjs` writes them; Studio edits after that are the source of truth.
- Footer sticker: `project/rd-peel.js`. Instagram handle, code and offer are the `CONFIG` at the top.
