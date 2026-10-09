---
name: fhir
description: >-
  FHIR: exchange healthcare data as HL7 FHIR resources over a RESTful API. Covers FHIR R5, FHIR R4 (supported), FHIR R4B (supported), FHIR draft (track preview). Use when exchanging healthcare data. Triggers: FHIR.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# FHIR

HL7 FHIR (Fast Healthcare Interoperability Resources): the RESTful API, resource identity and metadata, references between resources, the JSON representation, base conformance rules and search, read from the FHIR R5 (v5.0.0) pages published by HL7.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: FHIR server, FHIR client, or an application producing or consuming FHIR resources.
- Target version: FHIR R5 (current); FHIR R4 (supported); FHIR R4B (supported); FHIR draft (preview, posture: track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **§ 3.2.0 RESTful API.** "Servers SHALL provide a Capability Statement that specifies which interactions and resources are supported."
2. **§ 3.2.0.1.10 Content Types and encodings.** "UTF-8 encoding SHALL be used for FHIR instances."
3. **§ 3.2.0.4 update.** "If no id element is provided, or the id disagrees with the id in the URL, the server SHALL respond with an HTTP 400 Bad Request error code, and SHOULD provide an OperationOutcome identifying the issue."
4. **§ 3.2.0.5 Managing Resource Contention.** "If provided, the value of the ETag SHALL match the value of the version id for the resource."
5. **§ 2.1.27.5.3.3 Logical ID.** "A logical id SHALL always be represented in the same way in resource references and URLs."
6. **§ 2.1.3.0.1 Reference (ref-2).** "At least one of reference, identifier and display SHALL be present (unless an extension is provided)."
7. **§ 2.1.3.0.3 Literal References.** "References SHALL be a reference to an actual FHIR resource, and SHALL be resolvable (given that access control works, there is no temporary unavailability, etc.)."
8. **§ 2.1.3.0.10 Contained Resources.** "Contained resources SHALL NOT contain additional contained resources."
9. **§ 2.1.6.4 JSON Representation of Resources.** "While // is legal in Javascript, it is not legal in JSON, and comments SHALL not be in JSON instances irrespective of whether particular applications ignore them"
10. **§ 2.1.1.0.3 Cardinality.** "Note that when present, elements cannot be empty - they SHALL have a value attribute, child elements, or extensions."
11. **§ 3.2.1.3.2 Self Link - Understanding a Performed Search.** "In order to allow the client to be confident about what search parameters were used as criteria by a server, servers SHALL return the parameters that were actually used to process a search."
12. **§ 3.2.1.5.5 Modifiers.** "Since modifiers change the meaning of a search parameter, a server SHALL reject any search request that contains a search parameter with an unsupported modifier."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `smart-on-fhir`, `cds-hooks`, `json`, `http-semantics`, `json-patch`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [FHIR R5: RESTful API](https://hl7.org/fhir/R5/http.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R5: Resource](https://hl7.org/fhir/R5/resource.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R5: References](https://hl7.org/fhir/R5/references.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R5: JSON Representation](https://hl7.org/fhir/R5/json.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R5: Conformance Rules](https://hl7.org/fhir/R5/conformance-rules.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R5: Search](https://hl7.org/fhir/R5/search.html): Standard, FHIR v5.0.0 (R5), checked 2026-10-06.
- [FHIR R4](https://www.hl7.org/fhir/R4/): Standard, FHIR v4.0.1 (R4, mixed Normative and STU), checked 2026-10-06.
- [FHIR R4B](https://www.hl7.org/fhir/R4B/): Standard, FHIR v4.3.0 (R4B, STU), checked 2026-10-06.
- [FHIR draft](https://build.fhir.org/): Continuous build, FHIR continuous integration build (build.fhir.org), checked 2026-10-06.
