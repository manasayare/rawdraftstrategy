// Sanity content model for Raw Draft. Plain data (no functions) so the same file can be sent to
// Sanity's managed schema deploy and, later, imported by a code-based Studio.
// Deploy: scripts/sanity-schema.mjs prints the declaration; see docs/sanity.md.

const str = (name, title, extra) => ({ name, title, type: "string", ...extra });
const text = (name, title, rows = 3, extra) => ({ name, title, type: "text", rows, ...extra });
const strings = (name, title, extra) => ({ name, title, type: "array", of: [{ type: "string" }], ...extra });
const tags = (name, title, extra) => strings(name, title, { options: { layout: "tags" }, ...extra });
const list = (name, title, values, extra) => ({ name, title, type: "string", options: { list: values.map(([value, t]) => ({ value, title: t })) }, ...extra });
const listMany = (name, title, values, extra) => ({ name, title, type: "array", of: [{ type: "string" }], options: { list: values.map(([value, t]) => ({ value, title: t })) }, ...extra });
const refs = (name, title, to, extra) => ({ name, title, type: "array", of: [{ type: "reference", to: to.map(type => ({ type })), weak: true }], ...extra });
const bool = (name, title, extra) => ({ name, title, type: "boolean", ...extra });
const slug = (source, extra) => ({ name: "slug", title: "URL id", type: "slug", options: { source }, description: "Used in the page address. Keep it stable once published.", ...extra });

export const TYPES = [["sprint", "Sprint"], ["workshop", "Workshop"], ["playbook", "Playbook"], ["framework", "Framework"], ["activity", "Activity"], ["icebreaker", "Icebreaker"], ["energiser", "Energiser"], ["reflection", "Reflection"], ["game", "Game"], ["methodology", "Methodology"], ["resource", "Resource"]];
const ORIGINS = [["rawdraft", "Raw Draft original"], ["adapted", "Adapted"], ["external", "External"]];
const STATUSES = [["tested", "Tested"], ["adapted", "Adapted"], ["reference", "Reference"], ["observed", "Observed"], ["draft", "Draft"]];
const GOALS = [["start", "Start"], ["understand", "Understand"], ["explore", "Explore"], ["create", "Create"], ["align", "Align"], ["prioritise", "Prioritise"], ["decide", "Decide"], ["test", "Test"], ["plan", "Plan"], ["anticipate", "Anticipate"], ["reflect", "Reflect"], ["learn", "Learn"]];
const SESSION_STAGES = [["open", "Open"], ["explore", "Explore"], ["makesense", "Make sense"], ["create", "Create"], ["decide", "Decide"], ["commit", "Commit"], ["close", "Close"], ["energise", "Energise"], ["reflect", "Reflect"]];
const PRODUCT_STAGES = [["idea", "Idea"], ["definition", "Definition"], ["prototype", "Prototype"], ["live", "Live"], ["scaling", "Scaling"]];
const PRACTICES = ["Strategy", "Product", "UX", "User Research", "Service Design", "Facilitation", "Innovation", "Brand", "Futures", "Systems", "Organization", "Operations", "AI", "Consulting"].map(p => [p, p]);
const FORMATS = ["mapping", "discussion", "writing", "prototyping", "digital", "field", "making", "lego", "tabletop", "game", "cards", "simulation", "roleplay"].map(f => [f, f.charAt(0).toUpperCase() + f.slice(1)]);
const SIZES = [["solo", "Solo"], ["2-4", "2 to 4"], ["5-8", "5 to 8"], ["9-15", "9 to 15"], ["16-30", "16 to 30"], ["30+", "30+"], ["variable", "Variable"]];

const contributor = { name: "contributor", title: "Contributed by", type: "object", group: "source", description: "Credit shown on the page when someone suggested or wrote this.", fields: [str("name", "Name"), { name: "url", title: "Link", type: "url" }, str("note", "Credit line", { description: "Optional, e.g. 'Suggested from their work at Acme'." })] };
const extra = group => text("extra", "Advanced fields (JSON)", 6, { ...(group ? { group } : {}), description: "Rarely used structured fields (agendas, blueprints, game rules). Must stay valid JSON." });

const libraryItem = {
  name: "libraryItem", title: "Library item", type: "document",
  groups: [{ name: "main", title: "Main", default: true }, { name: "guide", title: "Guide" }, { name: "tags", title: "Tags" }, { name: "relations", title: "Relations" }, { name: "source", title: "Source & credit" }, { name: "admin", title: "Admin" }],
  fields: [
    str("title", "Title", { group: "main" }), slug("title", { group: "main" }), list("kind", "Type", TYPES, { group: "main" }),
    text("short", "Summary", 3, { group: "main" }), list("origin", "Origin", ORIGINS, { group: "main" }), list("status", "Status", STATUSES, { group: "main" }), bool("featured", "Featured", { group: "main" }),
    text("question", "Question it answers", 2, { group: "guide" }), text("purpose", "Purpose", 2, { group: "guide" }), text("situation", "Situation", 2, { group: "guide" }), text("outcome", "Outcome", 2, { group: "guide" }),
    strings("useWhen", "Use when", { group: "guide" }), strings("avoidWhen", "Avoid when", { group: "guide" }), strings("inputs", "Inputs", { group: "guide" }), strings("outputs", "Outputs", { group: "guide" }),
    { name: "steps", title: "Steps", type: "array", group: "guide", of: [{ type: "object", name: "step", fields: [str("name", "Step"), text("purpose", "Purpose", 2), refs("methods", "Methods", ["libraryItem"]), str("artifact", "Artifact")] }] },
    strings("materials", "Materials", { group: "guide" }), strings("failures", "Watch out for", { group: "guide" }), strings("adaptations", "Adaptations", { group: "guide" }), strings("beforeYouStart", "Before you start", { group: "guide" }),
    strings("facilitatorNotes", "Facilitator notes", { group: "guide" }), strings("debrief", "Debrief", { group: "guide" }), strings("limitations", "Limitations", { group: "guide" }), strings("goodFor", "Good for", { group: "guide" }),
    strings("principles", "Principles", { group: "guide" }), strings("flow", "Flow", { group: "guide" }), strings("decision", "Decision", { group: "guide" }), strings("notes", "Notes", { group: "guide" }),
    listMany("goals", "Goals", GOALS, { group: "tags" }), listMany("practices", "Practices", PRACTICES, { group: "tags" }), tags("areas", "Areas", { group: "tags" }), listMany("stages", "Product stages", PRODUCT_STAGES, { group: "tags" }),
    list("stage", "Session stage", SESSION_STAGES, { group: "tags" }), listMany("formats", "Formats", FORMATS, { group: "tags" }), listMany("sizes", "Group sizes", SIZES, { group: "tags" }), tags("tags", "Tags", { group: "tags" }),
    str("duration", "Duration", { group: "tags" }), str("timeKey", "Time bucket", { group: "tags" }), str("groupSize", "Group size", { group: "tags" }), str("participants", "Participants", { group: "tags" }), str("level", "Facilitation level", { group: "tags" }),
    str("delivery", "Delivery", { group: "tags" }), str("format", "Format", { group: "tags" }), str("energy", "Energy", { group: "tags" }), str("vulnerability", "Vulnerability", { group: "tags" }), str("remote", "Remote", { group: "tags" }), str("horizon", "Horizon", { group: "tags" }),
    refs("related", "Related", ["libraryItem"], { group: "relations" }), refs("uses", "Uses", ["libraryItem"], { group: "relations" }), refs("resources", "Resources", ["libraryItem"], { group: "relations" }),
    refs("before", "Comes before", ["libraryItem"], { group: "relations" }), refs("after", "Comes after", ["libraryItem"], { group: "relations" }), refs("alternative", "Alternatives", ["libraryItem"], { group: "relations" }), refs("sprints", "Sprints", ["libraryItem"], { group: "relations" }),
    str("creator", "Creator", { group: "source" }), text("attribution", "Attribution", 2, { group: "source" }), str("rights", "Rights", { group: "source" }), { name: "source", title: "Source organisation", type: "reference", to: [{ type: "source" }], weak: true, group: "source" },
    { name: "sourceUrl", title: "Source link", type: "url", group: "source" }, contributor,
    str("priority", "Priority", { group: "admin" }), str("publicTreatment", "Public treatment", { group: "admin" }), str("subtype", "Subtype", { group: "admin" }), { name: "number", title: "Library number", type: "number", group: "admin" }, { name: "section", title: "Backlog section", type: "number", group: "admin" },
    bool("summaryOnly", "Summary only", { group: "admin" }), bool("indexOnly", "Index only (no guide yet)", { group: "admin" }), bool("backlog", "From backlog", { group: "admin" }), bool("incomplete", "Incomplete", { group: "admin" }), bool("undocumented", "Undocumented", { group: "admin" }), bool("template", "Template", { group: "admin" }), bool("principlesRef", "Principles reference", { group: "admin" }),
    str("visualReference", "Visual", { group: "admin" }), str("visualVariant", "Visual variant", { group: "admin" }), str("vis", "Visual (sprint format)", { group: "admin" }), str("methodology", "Methodology", { group: "admin" }), str("gameKind", "Game kind", { group: "admin" }),
    str("familiarity", "Familiarity", { group: "admin" }), str("movement", "Movement", { group: "admin" }), str("recommendedFor", "Recommended for", { group: "admin" }), str("synonyms", "Synonyms", { group: "admin" }), str("distinct", "Distinct from", { group: "admin" }), str("skip", "Skip when", { group: "admin" }), str("say", "Say", { group: "admin" }), str("principle", "Principle", { group: "admin" }), str("time", "Time label", { group: "admin" }),
    extra("admin")
  ],
  orderings: [{ title: "Library number", name: "number", by: [{ field: "number", direction: "asc" }] }, { title: "Title", name: "title", by: [{ field: "title", direction: "asc" }] }]
};

const source = { name: "source", title: "Source organisation", type: "document", fields: [str("name", "Name"), slug("name"), str("kind", "Kind"), { name: "url", title: "Website", type: "url" }, text("note", "Note", 2)] };

const work = {
  name: "work", title: "Work case study", type: "document",
  fields: [
    str("title", "Title"), slug("title"), str("descriptor", "Descriptor"), { name: "date", title: "Date", type: "date" }, str("workType", "Type"), str("sector", "Sector"), str("clientName", "Client"), bool("anonymous", "Anonymised"), str("confidentiality", "Confidentiality"),
    list("status", "Status", [["demo", "Demo placeholder"], ["draft", "Draft"], ["published", "Published"]]), str("format", "Format"), tags("topics", "Topics"),
    text("question", "Question", 2), text("context", "Context", 4), strings("constraints", "Constraints"), text("approach", "Approach", 4), text("decisions", "Decisions", 4),
    { name: "artifacts", title: "Artifacts", type: "array", of: [{ type: "object", name: "artifact", fields: [str("kind", "Kind"), text("caption", "Caption", 2)] }] },
    text("whatHappened", "What happened", 4), text("whatIWouldChange", "What I would change", 4), { name: "cover", title: "Cover", type: "image" }, { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] },
    refs("relatedSprints", "Sprints", ["libraryItem"]), refs("relatedMethods", "Methods", ["libraryItem"]), refs("relatedFrameworks", "Frameworks", ["libraryItem"]), refs("relatedPlaybooks", "Playbooks", ["libraryItem"]), refs("relatedNotes", "Notes", ["note"]), extra()
  ]
};

const note = {
  name: "note", title: "Note", type: "document",
  fields: [
    str("title", "Title"), slug("title"), { name: "date", title: "Date", type: "date" }, str("topic", "Topic"), tags("topics", "Topics"), str("format", "Format"), text("dek", "Standfirst", 2), list("status", "Status", [["draft", "Draft"], ["published", "Published"]]), str("read", "Reading time"),
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] }, { name: "cover", title: "Cover", type: "image" }, { name: "images", title: "Images", type: "array", of: [{ type: "image" }] },
    { name: "sourceLinks", title: "Sources", type: "array", of: [{ type: "object", name: "sourceLink", fields: [str("title", "Title"), str("publisher", "Publisher"), { name: "url", title: "Link", type: "url" }] }] },
    refs("related", "Related library items", ["libraryItem"]), refs("relatedSprints", "Sprints", ["libraryItem"]), refs("relatedFrameworks", "Frameworks", ["libraryItem"]), refs("relatedMethods", "Methods", ["libraryItem"]), refs("relatedWork", "Work", ["work"]), extra()
  ]
};

const person = {
  name: "person", title: "Network person", type: "document",
  fields: [
    str("name", "Name"), slug("name"), str("role", "Role"), text("shortBio", "Short bio", 2), list("relationshipType", "Relationship", [["advisory", "Advisor"], ["collaborator", "Collaborator"]]), { name: "portrait", title: "Portrait", type: "image" },
    tags("expertise", "Expertise"), list("preferredSocial", "Main link type", [["linkedin", "LinkedIn"], ["website", "Website"], ["substack", "Substack"], ["instagram", "Instagram"], ["x", "X"]]), { name: "preferredSocialUrl", title: "Main link", type: "url" },
    bool("featured", "Featured"), { name: "order", title: "Order", type: "number" }, refs("relatedSprints", "Sprints", ["libraryItem"]), refs("relatedMethods", "Methods", ["libraryItem"]), tags("relatedDomains", "Domains"), bool("placeholder", "Placeholder record")
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }]
};

const partner = {
  name: "partner", title: "Partner", type: "document",
  fields: [str("name", "Name"), str("capability", "Capability"), text("shortDescription", "Description", 2), { name: "logo", title: "Logo", type: "image" }, { name: "website", title: "Website", type: "url" }, str("relationship", "Relationship"), bool("featured", "Featured"), bool("placeholder", "Placeholder record")]
};

const builderTemplate = {
  name: "builderTemplate", title: "Builder template", type: "document",
  fields: [
    str("name", "Name"), text("description", "Description", 2), { name: "order", title: "Order", type: "number" },
    { name: "brief", title: "Brief", type: "object", fields: [str("outcome", "Outcome"), str("time", "Time")] },
    { name: "sequence", title: "Sequence", type: "array", of: [{ type: "object", name: "templateRow", fields: [
      list("kind", "Row", [["block", "Library block"], ["section", "Section heading"], ["day", "New day"], ["break", "Break"], ["lunch", "Lunch"]]),
      str("title", "Section title"), { name: "item", title: "Library item", type: "reference", to: [{ type: "libraryItem" }], weak: true }, { name: "minutes", title: "Minutes", type: "number" }] }] }
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }]
};

const submission = {
  name: "submission", title: "Suggestion", type: "document",
  fields: [
    list("status", "Status", [["new", "New"], ["reviewing", "Reviewing"], ["accepted", "Accepted"], ["declined", "Declined"]], { initialValue: "new" }), { name: "submittedAt", title: "Submitted", type: "datetime", readOnly: true },
    str("resourceTitle", "Resource"), list("resourceType", "Type", TYPES), { name: "resourceUrl", title: "Link", type: "url" }, text("description", "What it is", 4), text("howUsed", "How they use it", 3),
    str("creditName", "Credit as"), { name: "creditUrl", title: "Credit link", type: "url" }, str("email", "Email (private)"), bool("isAuthor", "They made it"), bool("consent", "Agreed to publish with credit"),
    { name: "publishedItem", title: "Published as", type: "reference", to: [{ type: "libraryItem" }], weak: true }, text("reviewNotes", "Review notes", 3)
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }]
};

export const schemaTypes = [libraryItem, source, work, note, person, partner, builderTemplate, submission];
