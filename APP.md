# Raw Draft — Next.js app

Live on Vercel from `main` of github.com/manasayare/rawdraftstrategy.

The site from `project/Raw Draft.dc.html` (Claude Design export), built as a Next.js 16 / React 19 app.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## How it is put together

- `project/` is the design export, untouched. It is the source of truth for markup, styles and logic.
- `scripts/dc-to-jsx.mjs` compiles each `.dc.html` page into a React component in `src/generated/`, and copies the engine and data scripts (`rd-*.js`) into `src/rd/`. Inline styles, hover/focus states and the logic classes are carried over as written, so the app renders pixel for pixel like the prototype.
- `project/` is now edited directly (the no-login, no-AI changes live there). Edit it, then run `npm run generate`. Don't edit `src/generated/` or `src/rd/` by hand; they are overwritten. A fresh Claude Design export would replace these edits, so merge rather than overwrite.
- `src/lib/dc.js` is the small runtime the generated components use.
- `src/components/App.jsx` is the shell. It is mounted once in the root layout and persists across navigations.

## Routing

The prototype routed on the hash (`#/library?q=x`). The app uses real paths (`/library?q=x`). Every path goes to one catch-all route, and the shell picks the page from the path, as the prototype did. `#/…` links in the design and data are rewritten to paths at render time. The few places where the logic wrote to `location.hash` or `history` are patched in `PATCHES` in the converter, which fails loudly if a patch stops matching after a new export.

## Known limits

- Pages render in the browser only (`ssr: false`), because the engine scripts read `window` when they load. Search engines get the shell, not the page content. Server rendering the Library, Work and Notes pages is the next step if SEO matters.
- Fonts load from Fontshare and Google Fonts, as in the prototype.
- There are no accounts. Builder saves workshops in the visitor's browser (localStorage), so they don't follow someone to another device. Export (Agenda PDF, CSV, JSON) is how a workshop leaves the browser.
- Nothing calls an AI model. The checks and one-click adjustments in Builder are local rules.
