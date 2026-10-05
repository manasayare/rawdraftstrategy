# Connectors and the import API

Raw Draft is where a workshop is designed, run and reviewed. Connectors only bring context in. Every
path ends in the same place: the person reviews what was understood on the Import screen, then builds.

## The model

```
source (ChatGPT, Claude, Drive, Notion, Slack, paste…)
  → createWorkshopFromContext(input)            src/builder/import/ingest.ts  (pure, server or browser)
      parseContext()   brief + key facts + agenda  src/builder/import/parse.ts
      matchAgenda()    agenda lines → Library     src/builder/import/match.ts
  → workshop draft with context attached
  → Import review in Builder → Build → Run → Review
```

Nothing in the core knows which assistant or tool sent the text. `sourceType` is recorded on the
source for reference only.

## POST /api/import

Creates a draft and returns a link. Opening the link shows the Import review screen with everything
prefilled; nothing is built until the person confirms.

```json
{
  "sourceType": "chatgpt",            // chatgpt | claude | paste | notes | agenda | google-drive | notion | slack | miro | figjam | linear | jira | confluence | other
  "sourceUrl": "https://chatgpt.com/c/…",
  "rawText": "the conversation, brief or notes",
  "structuredContext": { "title": "Leadership Alignment Workshop", "goal": "…", "problem": "…", "participants": "…", "constraints": "…", "decisions": "…", "evidence": "…", "assumptions": "…", "output": "…" },
  "attachments": [{ "name": "PRD.md", "text": "…" }],
  "requestedOutcome": "Agreed priorities for H2",
  "timeConstraint": "3 hours",
  "participants": 8,
  "agenda": ["9:00 Welcome", "9:15 Hopes and Fears", { "title": "Note and Vote", "mins": 20 }]
}
```

At least one of `rawText`, `structuredContext`, `agenda` or `attachments` is required. Structured
fields win over what is parsed from text.

Response `201`:

```json
{
  "workshopId": "J0kYluNoRd",
  "url": "https://rawdraftstrategy.vercel.app/builder?w=J0kYluNoRd",
  "name": "Leadership Alignment Workshop",
  "brief": { "problem": "…", "goal": "…", "…": "…" },
  "facts": { "time": "Half day", "people": "6 to 10", "owner": "Yes", "format": "In person", "outcome": "Alignment" },
  "suggestedStructure": [{ "kind": "library", "title": "Note & Vote", "mins": 20, "libraryId": "note-and-vote", "libraryTitle": "Note and Vote", "confidence": "exact" }],
  "matchedLibraryResources": [{ "id": "note-and-vote", "title": "Note and Vote", "line": "Note & Vote", "confidence": "exact" }],
  "missingInformation": ["Who makes the final decision"]
}
```

Errors: `401` wrong key, `422` nothing to import, `503` Sanity not connected.

### Security

- Set `RAW_DRAFT_IMPORT_KEY` in Vercel to require `Authorization: Bearer <key>`. Without it the
  endpoint is open, which is fine for testing and not for a published connector.
- Drafts are stored as `sharedWorkshop` documents in the private dataset. Their edit key is random
  and never returned, so a link can be opened and copied but not overwritten.
- Text is capped at 200 KB per request.

## A ChatGPT or Claude connector

Both platforms call tools over HTTP with a JSON schema. The tool is one action:

- name: `create_raw_draft_workshop`
- description: "Turn this conversation into a workshop in Raw Draft. Returns a link the user opens to review, edit and run it."
- input: the body above. The assistant fills `rawText` with the relevant conversation, and
  `structuredContext` with what it already knows (goal, participants, constraints, decisions).
- output: show the user `url`, and mention anything in `missingInformation`.

The assistant does not design the workshop. Raw Draft matches what was proposed to its Library and the
person adjusts and runs it here.

## Adding a source later (Drive, Notion, Slack, Miro…)

1. Fetch the document or thread with that service's API and turn it into text (or `attachments`).
2. Call `createWorkshopFromContext` (server) or `POST /api/import` with the right `sourceType`.
3. To add context to an existing workshop instead of starting one, the Import screen already offers
   "Add context to …"; an API for that would accept a workshop id and append to `context.sources`.
