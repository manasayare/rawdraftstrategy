<!-- Copied from the master backlog v4, sections 132 and 133. Reference for the CMS data model. -->
# 132. Complete resource-record YAML specification

Use this for a fully filled Level 4 record.

```yaml
identity:
  title:
  slug:
  resource_type:
  subtype:
  aliases:
  practice_family:

provenance:
  origin:
  creator:
  organization:
  canonical_source:
  secondary_sources:
  first_known_use:
  rights_status:
  rights_note:
  trademarks:
  last_verified:

editorial:
  one_line_purpose:
  primary_question:
  summary:
  raw_draft_commentary:
  strongest_part:
  watch_for:
  limitations:
  common_misuse:

selection:
  goals:
  problems_it_solves:
  use_when:
  avoid_when:
  alternatives:
  complements:
  prerequisites:

metadata:
  duration:
    minimum:
    typical:
    maximum:
    unit:
  group_size:
    minimum:
    ideal_minimum:
    ideal_maximum:
    maximum:
  facilitator_level:
  participant_difficulty:
  preparation_load:
  format:
  session_stage:
  interaction_mode:
  cognitive_mode:
  energy_profile:
  vulnerability_level:
  evidence_maturity:

people:
  sponsor:
  decision_owner:
  required_roles:
  optional_roles:
  participant_profile:
  user_or_customer_participation:

inputs:
  required_inputs:
  helpful_inputs:
  evidence_required:
  prework:
  existing_artifacts:

setup:
  physical_materials:
  digital_tools:
  room_setup:
  board_setup:
  remote_setup:
  accessibility:

run:
  framing:
  steps:
    - name:
      time:
      purpose:
      facilitator_does:
      participants_do:
      prompt:
      materials:
      output:
      transition:
      watch_for:
      can_shorten:
      never_skip:
  gates:
  decision_mechanism:
  debrief:

outputs:
  primary_output:
  secondary_outputs:
  decision_created:
  evidence_created:
  artifact_quality:
  owner:
  storage:

after:
  immediate:
  within_24_hours:
  within_one_week:
  next_test:
  follow_on_methods:
  documentation:

facilitation:
  notes:
  failure_modes:
    - symptom:
      cause:
      intervention:
      prevention:
  difficult_room_patterns:
  executive_adaptation:
  large_group_adaptation:
  low_time_adaptation:
  remote_adaptation:
  hybrid_adaptation:

assets:
  raw_draft_downloads:
  raw_draft_boards:
  external_resources:
  prompt_assets:
  examples:
  source_material:

visual:
  visual_reference:
  concept:
  density:
  accent:
  motion:
  accessibility_alt:

relationships:
  contains:
  uses:
  precedes:
  follows:
  alternative_to:
  complements:
  creates_input_for:
  consumes_output_of:
  part_of_methodology:
  asset_for:
  used_in_work:

publishing:
  completeness_level:
  launch_priority:
  content_status:
  reviewer:
  verified_date:
  version:
  version_notes:
```

---

# 133. Instructions for future automatic filling

When an agent fills this Library from this master file:

1. **Do not replace specific source material with generic methodology copy.**
2. **Do not compress multiple methods into one record simply because they sound similar.**
3. **Preserve external creators and organizations.**
4. **Separate source-derived instructions from Raw Draft adaptations.**
5. **If a canonical method has detailed public steps, capture the structure and link to source, but respect copyright limits.**
6. **If the method is only named in a source and details are absent, keep it OBSERVED.**
7. **Do not invent timings, participant numbers or materials as source facts.**
8. Planning ranges can be added only if clearly labeled as Raw Draft planning guidance.
9. **Do not invent client outcomes or “field-tested” claims.**
10. **Do not present popularity as evidence of effectiveness.**
11. **Do not label practitioner frameworks as scientifically validated unless actual research supports that.**
12. **Do not remove rights notes for convenience.**
13. **Do not convert private uploaded material into public templates without explicit permission.**
14. **Do not remove “avoid when”, limitations or failure modes.**
15. **Do not write every page to the same length.**
16. **Do not make every item a card.**
17. **Do not turn the Library into a marketplace.**
18. **Do not put an email gate in front of public assets unless Raw Draft explicitly chooses that later.**
19. **Keep original-source links visible.**
20. **Prefer a thinner accurate record to a detailed invented one.**

---
