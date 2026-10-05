// Two-way mapping between the site's content shape (window.RD, RDN, RDB.TPL, which the Library and
// Builder engines read) and Sanity documents. Used by scripts/seed-sanity.mjs (shape → documents)
// and by the content loader (documents → shape), so the two stay in step.

const ITEM_STRINGS = ["title", "short", "origin", "status", "question", "purpose", "situation", "outcome", "creator", "attribution", "rights", "sourceUrl", "duration", "groupSize", "participants", "level",
  "delivery", "format", "timeKey", "stage", "horizon", "energy", "vulnerability", "remote", "priority", "publicTreatment", "subtype", "visualReference", "visualVariant", "vis", "methodology", "familiarity",
  "movement", "gameKind", "recommendedFor", "synonyms", "distinct", "skip", "say", "principle", "time"];
const ITEM_LISTS = ["goals", "areas", "practices", "stages", "formats", "sizes", "tags", "useWhen", "avoidWhen", "inputs", "outputs", "materials", "failures", "adaptations", "notes", "beforeYouStart",
  "facilitatorNotes", "debrief", "limitations", "goodFor", "principles", "flow", "decision"];
const ITEM_REFS = ["related", "uses", "resources", "before", "after", "alternative", "sprints"];
const ITEM_BOOLS = ["featured", "summaryOnly", "indexOnly", "backlog", "incomplete", "undocumented", "template", "principlesRef"];
// Fields every record had in the original data, restored as [] when empty so engine code can rely on them.
const ITEM_ALWAYS = ["goals", "areas", "outputs", "related", "uses", "resources", "before", "after", "alternative", "stages", "practices"];
const ITEM_HANDLED = new Set([...ITEM_STRINGS, ...ITEM_LISTS, ...ITEM_REFS, ...ITEM_BOOLS, "id", "type", "org", "steps", "_n", "section", "lastVerified", "contributor"]);

const isStrList = v => Array.isArray(v) && v.every(x => typeof x === "string");
const present = v => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && !v.length);
let keyN = 0;
const key = () => "k" + (keyN++).toString(36) + Math.random().toString(36).slice(2, 6);
const ref = id => ({ _type: "reference", _ref: id, _weak: true, _key: key() });
const slug = s => ({ _type: "slug", current: s });

// ---------- shape → documents ----------
export function toDocuments({ RD, RDN, TPL }, newId) {
  const ids = {}; // `${type}:${legacyId}` → Sanity _id
  const idFor = (type, legacy) => (ids[type + ":" + legacy] = ids[type + ":" + legacy] || newId());
  RD.items.forEach(it => idFor("libraryItem", it.id));
  RD.sources.forEach(s => idFor("source", s.id));
  RD.work.forEach(w => idFor("work", w.id));
  RD.notes.forEach(n => idFor("note", n.id));
  const itemRefs = list => (list || []).filter(x => typeof x === "string" && ids["libraryItem:" + x]).map(x => ref(ids["libraryItem:" + x]));
  const docs = [];

  for (const it of RD.items) {
    const d = { _id: ids["libraryItem:" + it.id], _type: "libraryItem", slug: slug(it.id), kind: it.type }, extra = {};
    for (const k of ITEM_STRINGS) if (present(it[k])) typeof it[k] === "string" ? (d[k] = it[k]) : (extra[k] = it[k]);
    for (const k of ITEM_LISTS) if (Array.isArray(it[k])) isStrList(it[k]) ? (d[k] = it[k]) : (extra[k] = it[k]);
    for (const k of ITEM_REFS) if (Array.isArray(it[k])) isStrList(it[k]) ? (d[k] = itemRefs(it[k])) : (extra[k] = it[k]);
    for (const k of ITEM_BOOLS) if (typeof it[k] === "boolean") d[k] = it[k];
    if (typeof it._n === "number") d.number = it._n;
    if (typeof it.section === "number") d.section = it.section;
    if (it.org && ids["source:" + it.org]) d.source = { _type: "reference", _ref: ids["source:" + it.org], _weak: true };
    if (present(it.steps)) d.steps = it.steps.map(s => typeof s === "string" ? { _type: "step", _key: key(), name: s }
      : { _type: "step", _key: key(), name: s.name || "", purpose: s.purpose || undefined, methods: s.methods ? itemRefs(s.methods) : undefined, artifact: s.artifact || undefined });
    for (const [k, v] of Object.entries(it)) if (!ITEM_HANDLED.has(k) && present(v)) extra[k] = v;
    if (Object.keys(extra).length) d.extra = JSON.stringify(extra);
    docs.push(d);
  }

  for (const s of RD.sources) docs.push(clean({ _id: ids["source:" + s.id], _type: "source", slug: slug(s.id), name: s.name, kind: s.kind, url: s.url, note: s.note }));

  for (const w of RD.work) docs.push(clean({
    _id: ids["work:" + w.id], _type: "work", slug: slug(w.id), title: w.title, descriptor: w.descriptor, date: w.date, workType: w.type, sector: w.sector, clientName: w.clientName,
    anonymous: w.anonymous, confidentiality: w.confidentiality, status: w.status, format: w.format, topics: w.topics, question: w.question, context: w.context, constraints: w.constraints,
    approach: w.approach, decisions: w.decisions, whatHappened: w.whatHappened, whatIWouldChange: w.whatIWouldChange,
    artifacts: (w.artifacts || []).map(a => ({ _type: "artifact", _key: key(), kind: a.kind, caption: a.caption })),
    relatedSprints: itemRefs(w.relatedSprints), relatedMethods: itemRefs(w.relatedMethods), relatedFrameworks: itemRefs(w.relatedFrameworks), relatedPlaybooks: itemRefs(w.relatedPlaybooks),
    relatedNotes: (w.relatedNotes || []).filter(x => ids["note:" + x]).map(x => ref(ids["note:" + x]))
  }));

  for (const n of RD.notes) docs.push(clean({
    _id: ids["note:" + n.id], _type: "note", slug: slug(n.id), title: n.title, date: n.date, topic: n.topic, topics: n.topics, format: n.format, dek: n.dek, status: n.status, read: n.read,
    body: (n.body || []).map(p => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: p, marks: [] }] })),
    sourceLinks: (n.sourceLinks || []).map(s => ({ _type: "sourceLink", _key: key(), title: s.title, publisher: s.publisher, url: s.url })),
    related: itemRefs(n.related), relatedSprints: itemRefs(n.relatedSprints), relatedFrameworks: itemRefs(n.relatedFrameworks), relatedMethods: itemRefs(n.relatedMethods),
    relatedWork: (n.relatedWork || []).filter(x => ids["work:" + x]).map(x => ref(ids["work:" + x]))
  }));

  for (const p of RDN.people) docs.push(clean({
    _id: newId(), _type: "person", slug: slug(p.slug), name: p.name, role: p.role, shortBio: p.shortBio, relationshipType: p.relationshipType, expertise: p.expertise, preferredSocial: p.preferredSocial,
    preferredSocialUrl: p.preferredSocialUrl, featured: p.featured, order: p.order, relatedSprints: itemRefs(p.relatedSprints), relatedMethods: itemRefs(p.relatedMethods), relatedDomains: p.relatedDomains, placeholder: p.placeholder
  }));
  for (const p of RDN.partners) docs.push(clean({ _id: newId(), _type: "partner", name: p.name, capability: p.capability, shortDescription: p.shortDescription, website: p.website, relationship: p.relationship, featured: p.featured, placeholder: p.placeholder }));

  TPL.forEach((t, i) => docs.push(clean({
    _id: newId(), _type: "builderTemplate", name: t.name, description: t.d, order: i, brief: { outcome: t.brief && t.brief.outcome, time: t.brief && t.brief.time },
    sequence: t.seq.map(r => {
      const row = { _type: "templateRow", _key: key() };
      if (r[0] === "§") return Object.assign(row, { kind: "section", title: r[1] });
      if (r[0] === "day") return Object.assign(row, { kind: "day" });
      if (ids["libraryItem:" + r[0]] && r[0] !== "break") return Object.assign(row, { kind: "block", item: { _type: "reference", _ref: ids["libraryItem:" + r[0]], _weak: true }, minutes: r[1] });
      return Object.assign(row, { kind: r[0], minutes: r[1] });
    })
  })));
  return docs;
}

function clean(o) {
  for (const k of Object.keys(o)) if (!present(o[k])) delete o[k];
  return o;
}

// ---------- documents → shape ----------
// GROQ projections return references as legacy ids (slug.current) so the result matches the old shape.
const R = name => `"${name}": ${name}[]->slug.current`;
export const CONTENT_QUERY = `{
  "items": *[_type == "libraryItem" && defined(slug.current) && !(_id in path("drafts.**"))] | order(number asc) {
    ..., "id": slug.current, "type": kind, "org": source->slug.current,
    ${ITEM_REFS.map(R).join(", ")},
    "steps": steps[]{ name, purpose, artifact, "methods": methods[]->slug.current }
  },
  "sources": *[_type == "source" && !(_id in path("drafts.**"))] | order(name asc) { "id": slug.current, name, kind, url, note },
  "work": *[_type == "work" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    ..., "id": slug.current, "type": workType, "cover": cover.asset->url, "gallery": gallery[].asset->url,
    ${["relatedSprints", "relatedMethods", "relatedFrameworks", "relatedPlaybooks", "relatedNotes"].map(R).join(", ")}
  },
  "notes": *[_type == "note" && !(_id in path("drafts.**"))] | order(date desc) {
    ..., "id": slug.current, "cover": cover.asset->url, "images": images[].asset->url,
    ${["related", "relatedSprints", "relatedFrameworks", "relatedMethods", "relatedWork"].map(R).join(", ")}
  },
  "people": *[_type == "person" && !(_id in path("drafts.**"))] | order(order asc) { ..., "slug": slug.current, "portrait": portrait.asset->url, ${["relatedSprints", "relatedMethods"].map(R).join(", ")} },
  "partners": *[_type == "partner" && !(_id in path("drafts.**"))] { ..., "logo": logo.asset->url },
  "templates": *[_type == "builderTemplate" && !(_id in path("drafts.**"))] | order(order asc) { name, description, brief, "sequence": sequence[]{ kind, title, minutes, "item": item->slug.current } }
}`;

const SYS = ["_id", "_type", "_rev", "_createdAt", "_updatedAt", "_key", "slug", "kind", "workType", "number", "source", "extra", "contributor"];
const strip = o => { const out = {}; for (const [k, v] of Object.entries(o)) if (!SYS.includes(k) && v !== null && v !== undefined) out[k] = v; return out; };
const blocksToText = blocks => (blocks || []).map(b => (b.children || []).map(c => c.text || "").join("")).filter(Boolean);

export function fromContent(c) {
  const items = (c.items || []).map(d => {
    const it = strip(d);
    it.id = d.id; it.type = d.type; it._n = d.number;
    if (d.org) it.org = d.org;
    for (const k of ITEM_ALWAYS) if (!Array.isArray(it[k])) it[k] = [];
    for (const k of ITEM_REFS) if (Array.isArray(it[k])) it[k] = it[k].filter(Boolean);
    if (Array.isArray(d.steps)) it.steps = d.steps.map(s => (!s.purpose && !s.artifact && !(s.methods && s.methods.length)) ? s.name : Object.assign({ name: s.name }, s.purpose ? { purpose: s.purpose } : {}, s.methods ? { methods: s.methods.filter(Boolean) } : {}, s.artifact ? { artifact: s.artifact } : {}));
    if (d.extra) { try { Object.assign(it, JSON.parse(d.extra)); } catch (e) { /* invalid JSON in the Studio; skip the advanced fields */ } }
    if (d.contributor && d.contributor.name) it.contributor = { name: d.contributor.name, url: d.contributor.url || null, note: d.contributor.note || "" };
    return it;
  });
  const work = (c.work || []).map(d => Object.assign(strip(d), { id: d.id, type: d.type, cover: d.cover || null, gallery: d.gallery || [], constraints: d.constraints || [], artifacts: (d.artifacts || []).map(a => ({ kind: a.kind, caption: a.caption })),
    relatedSprints: d.relatedSprints || [], relatedMethods: d.relatedMethods || [], relatedFrameworks: d.relatedFrameworks || [], relatedPlaybooks: d.relatedPlaybooks || [], relatedNotes: d.relatedNotes || [], topics: d.topics || [] }));
  const notes = (c.notes || []).map(d => Object.assign(strip(d), { id: d.id, body: blocksToText(d.body), images: d.images || [], cover: d.cover || null, sourceLinks: (d.sourceLinks || []).map(s => ({ title: s.title, publisher: s.publisher, url: s.url })),
    related: d.related || [], relatedSprints: d.relatedSprints || [], relatedFrameworks: d.relatedFrameworks || [], relatedMethods: d.relatedMethods || [], relatedWork: d.relatedWork || [], topics: d.topics || [d.topic].filter(Boolean), read: d.read || "" }));
  const people = (c.people || []).map(d => Object.assign(strip(d), { slug: d.slug, portrait: d.portrait || null, expertise: d.expertise || [], relatedSprints: d.relatedSprints || [], relatedMethods: d.relatedMethods || [], relatedDomains: d.relatedDomains || [] }));
  const partners = (c.partners || []).map(d => Object.assign(strip(d), { logo: d.logo || null }));
  const templates = (c.templates || []).map(t => ({ name: t.name, d: t.description || "", brief: t.brief || {}, seq: (t.sequence || []).map(r => r.kind === "section" ? ["§", r.title || ""] : r.kind === "day" ? ["day"] : r.kind === "block" ? [r.item, r.minutes || 0] : [r.kind, r.minutes || 0]).filter(r => r[0]) }));
  return { items, sources: c.sources || [], work, notes, people, partners, templates };
}
