// Local stand-in for CONTENT_QUERY (src/sanity/map.mjs): resolves references to slugs the way the
// GROQ projections do. Used by the round-trip check and the mock Sanity server.
export function emulateContentQuery(docs) {
  const byId = Object.fromEntries(docs.map(d => [d._id, d]));
  const slugOf = r => (r && byId[r._ref] && byId[r._ref].slug ? byId[r._ref].slug.current : null);
  const refs = (d, keys) => Object.fromEntries(keys.filter(k => d[k]).map(k => [k, d[k].map(slugOf)]));
  const of = t => docs.filter(d => d._type === t);
  
  // Mirrors the projections in CONTENT_QUERY.
  const content = {
    items: of("libraryItem").sort((a, b) => a.number - b.number).map(d => ({ ...d, id: d.slug.current, type: d.kind, org: d.source ? slugOf(d.source) : null,
      ...refs(d, ["related", "uses", "resources", "before", "after", "alternative", "sprints"]), steps: d.steps ? d.steps.map(s => ({ name: s.name, purpose: s.purpose, artifact: s.artifact, methods: s.methods ? s.methods.map(slugOf) : null })) : null })),
    sources: of("source").map(d => ({ id: d.slug.current, name: d.name, kind: d.kind, url: d.url, note: d.note })),
    work: of("work").map(d => ({ ...d, id: d.slug.current, type: d.workType, ...refs(d, ["relatedSprints", "relatedMethods", "relatedFrameworks", "relatedPlaybooks", "relatedNotes"]) })),
    notes: of("note").map(d => ({ ...d, id: d.slug.current, ...refs(d, ["related", "relatedSprints", "relatedFrameworks", "relatedMethods", "relatedWork"]) })),
    people: of("person").map(d => ({ ...d, slug: d.slug.current, ...refs(d, ["relatedSprints", "relatedMethods"]) })),
    partners: of("partner").map(d => ({ ...d })),
    templates: of("builderTemplate").map(t => ({ name: t.name, description: t.description, brief: t.brief, sequence: t.sequence.map(r => ({ kind: r.kind, title: r.title, minutes: r.minutes, item: r.item ? slugOf(r.item) : undefined })) }))
  };
  return content;
}
