# Sanity (CMS)

- Project: **rawdraftstrategy** (`ckol8a2n`), dataset `production` (private).
- Studio: **https://rawdraft.sanity.studio**. Sign in with the same account you use for Vercel.
- Content model: `src/sanity/schema.mjs`. Collections: Library items, Source organisations, Work case studies, Notes, Network people, Partners, Builder templates, Suggestions.

## Connect it to the site (once)

The site reads Sanity on the server with a token, and uses the same token to store suggestions.
Until it has one, the site keeps showing the content bundled with it, and suggestions say they
aren't connected yet.

1. Create a token: https://www.sanity.io/manage/project/ckol8a2n/api → **Tokens → Add API token**.
   Name it `vercel`, permission **Editor**. Copy it; Sanity shows it once.
2. In Vercel → project **rawdraftstrategy** → **Settings → Environment Variables**, for Production
   and Preview, make sure these exist (the Sanity integration may already have added the first):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `ckol8a2n`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_API_WRITE_TOKEN` = the token
3. Redeploy. The build log shows `[seed-sanity] seeding 1180 documents…`: the first build with a
   token copies all bundled content (1,134 Library items, sources, work, notes, network, templates)
   into the empty dataset. Later builds see content and skip.

## Day to day

- Edit in the Studio and **Publish**. The site picks changes up within 5 minutes.
- For instant updates, add a webhook: https://www.sanity.io/manage/project/ckol8a2n/api → **Webhooks →
  Create**. URL `https://rawdraftstrategy.vercel.app/api/revalidate`, dataset `production`, trigger on
  create/update/delete, HTTP method POST, and a secret. Put the same secret in Vercel as
  `SANITY_REVALIDATE_SECRET` and redeploy.
- **Suggestions** arrive in Studio → Suggestion with status *New*. To publish one: create a Library item
  (or edit an existing one), fill **Source & credit → Contributed by** with their name and link, publish,
  then set the suggestion's status to *Accepted* and link it under *Published as*. The item page shows
  "Contributed by <name>".
- **Advanced fields (JSON)** on a Library item holds rarely used structures (agendas, blueprints, game
  rules). Keep it valid JSON; if it isn't, the page ignores those fields rather than breaking.
- **Shared workshops** are Builder share links (`/builder?w=<id>`), written by `/api/workshops`. Each holds a
  JSON snapshot of the agenda and brief; run notes are never uploaded. Only the creator's browser holds
  the edit key, so posting again updates the same link. Delete one in the Studio to kill its link.

## Changing the content model

Edit `src/sanity/schema.mjs`, then deploy the schema through Sanity's MCP `deploy_schema` with the output of
`node scripts/sanity-schema.mjs` and re-run `deploy_studio` (appHost `rawdraft`). Add matching fields to
`src/sanity/map.mjs` and run `npm run check:content`, which checks that bundled content survives a round
trip unchanged.

## Testing locally without Sanity

`node scripts/sanity-mock.mjs 4566` runs a stand-in API. Start the site with
`SANITY_API_BASE=http://localhost:4566 NEXT_PUBLIC_SANITY_PROJECT_ID=test SANITY_API_WRITE_TOKEN=x`,
run `node scripts/seed-sanity.mjs` with the same variables, and the site reads from the mock.

## Re-seeding

Seeding only runs into an empty dataset. To start over, delete every Library item, source, work, note,
person, partner and template, plus the `seed-lock` document, then redeploy.
