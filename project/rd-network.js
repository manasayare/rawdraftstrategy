// Raw Draft network. Structured records for /network. CMS-ready.
// IMPORTANT: every record below is a clearly marked PLACEHOLDER. Replace with real, confirmed people and organisations only.
// relationshipType "advisory" renders under Advisors; every other type renders under Collaborators. Partners are organisations.
// Placeholders render on /network (labelled) but are never shown on Sprint or Work pages.
window.RDN = {
  people: [
    // { name, slug, portrait (url or null), role, expertise: [], shortBio, relationshipType: advisory|expert|facilitator|specialist|collaborator,
    //   preferredSocial: linkedin|website|substack|instagram|x, preferredSocialUrl, featured, order, relatedSprints: [], relatedMethods: [], relatedDomains: [], placeholder }
    { name: "Placeholder person", slug: "placeholder-1", portrait: null, role: "Advisory", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "advisory", preferredSocial: "linkedin", preferredSocialUrl: null, featured: true, order: 1, relatedSprints: [], relatedMethods: [], relatedDomains: ["strategy"], placeholder: true },
    { name: "Placeholder person", slug: "placeholder-2", portrait: null, role: "Expert Facilitator / Futures", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "facilitator", preferredSocial: "website", preferredSocialUrl: null, featured: true, order: 2, relatedSprints: ["foresight-sprint", "scenario-sprint"], relatedMethods: [], relatedDomains: ["futures"], placeholder: true },
    { name: "Placeholder person", slug: "placeholder-3", portrait: null, role: "Research", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "specialist", preferredSocial: "linkedin", preferredSocialUrl: null, featured: true, order: 3, relatedSprints: ["research-sprint"], relatedMethods: [], relatedDomains: ["research"], placeholder: true },
    { name: "Placeholder person", slug: "placeholder-4", portrait: null, role: "Brand / Strategy", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "advisory", preferredSocial: "substack", preferredSocialUrl: null, featured: true, order: 4, relatedSprints: ["brand-strategy-sprint", "positioning-sprint"], relatedMethods: [], relatedDomains: ["brand"], placeholder: true },
    { name: "Placeholder person", slug: "placeholder-5", portrait: null, role: "AI / Technology", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "specialist", preferredSocial: "x", preferredSocialUrl: null, featured: true, order: 5, relatedSprints: ["ai-product-strategy-sprint"], relatedMethods: [], relatedDomains: ["ai"], placeholder: true },
    { name: "Placeholder person", slug: "placeholder-6", portrait: null, role: "Service Design", expertise: [], shortBio: "Replace with a one-line description of what this person brings.", relationshipType: "collaborator", preferredSocial: "linkedin", preferredSocialUrl: null, featured: true, order: 6, relatedSprints: ["service-design-sprint"], relatedMethods: [], relatedDomains: ["service"], placeholder: true }
  ],
  partners: [
    // { name, logo, capability, shortDescription, website, relationship, featured, placeholder }
    { name: "Placeholder studio", logo: null, capability: "Development", shortDescription: "Replace with one line on what this partner builds.", website: null, relationship: "execution", featured: true, placeholder: true },
    { name: "Placeholder studio", logo: null, capability: "Visual identity", shortDescription: "Replace with one line on what this partner builds.", website: null, relationship: "execution", featured: true, placeholder: true },
    { name: "Placeholder studio", logo: null, capability: "AI implementation", shortDescription: "Replace with one line on what this partner builds.", website: null, relationship: "execution", featured: true, placeholder: true }
  ],
  // Organisations where work or collaboration has actually happened. Leave empty until confirmed.
  workedWith: [
    // { name, logo, url, kind: client|institution|collaborator }
  ],
  // Contributors per Work entry: { [workId]: [{ person: slug | partner: name, role }] }
  contributors: {}
};
