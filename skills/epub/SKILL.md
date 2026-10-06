---
name: epub
description: >-
  EPUB: EPUB® 3 defines a distribution and interchange format for digital publications and documents. Covers EPUB 3.3, EPUB 3.4 (build preview), EPUB Reading Systems 3.3, EPUB Reading Systems 3.4 (build preview), EPUB Accessibility 1.1, EPUB Accessibility 1.2 (build preview). Use when packaging or checking an EPUB publication. Triggers: EPUB, EPUB Accessibility.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# EPUB

EPUB® 3 defines a distribution and interchange format for digital publications and documents. The EPUB format provides a means of representing, packaging, and encoding structured and semantically enhanced web content — including HTML, CSS, SVG, and other resources — for distribution in a single-file container. This specification defines the authoring requirements for EPUB publications and represents the third major revision of the standard.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when packaging or checking an EPUB publication.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: EPUB 3.3 (default); EPUB 3.4 (preview, posture build: emit only when the user opts in and the posture is build); EPUB Reading Systems 3.3 (default); EPUB Reading Systems 3.4 (preview, posture build: emit only when the user opts in and the posture is build); EPUB Accessibility 1.1 (default); EPUB Accessibility 1.2 (preview, posture build: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.5 Conformance.** "The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **2. EPUB publication conformance.** "An EPUB publication : MUST define at least one rendering of its content as follows: MUST contain a package document that conforms to 5."
3. **2. EPUB publication conformance.** "MUST contain an EPUB navigation document that conforms to 7."
4. **2. EPUB publication conformance.** "SHOULD conform to the accessibility requirements defined in [ epub-a11y-11 ]."
5. **2. EPUB publication conformance.** "MUST be packaged in an EPUB container as defined in 4."
6. **2. EPUB publication conformance.** "In addition, all publication resources MUST adhere to the requirements in 3."
7. **2.1 Conformance checking.** "When verifying their EPUB publications, EPUB creators should ensure they do not violate the requirements of this specification (practices identified by the keywords " MUST ", " MUST NOT ", and " REQUIRED ")."
8. **2.1 Conformance checking.** "EPUB creators should also ensure that their EPUB publications do not violate the recommendations of this specification (practices identified by the keywords " SHOULD ", " SHOULD NOT ", and " RECOMMENDED ")."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [EPUB 3.3](https://www.w3.org/TR/epub-33/): Recommendation, epub-33 REC-epub-33-20260113 (Recommendation, 2026-01-13), checked 2026-10-06.
- [EPUB 3.4](https://www.w3.org/TR/epub-34/): Candidate Recommendation Draft, epub-34 CRD-epub-34-20261002 (Candidate Recommendation Draft, 2026-10-02), checked 2026-10-06.
- [EPUB Reading Systems 3.3](https://www.w3.org/TR/epub-rs-33/): Recommendation, epub-rs-33 REC-epub-rs-33-20241017 (Recommendation, 2024-10-17), checked 2026-10-06.
- [EPUB Reading Systems 3.4](https://www.w3.org/TR/epub-rs-34/): Candidate Recommendation Draft, epub-rs-34 CRD-epub-rs-34-20260721 (Candidate Recommendation Draft, 2026-07-21), checked 2026-10-06.
- [EPUB Accessibility 1.1](https://www.w3.org/TR/epub-a11y-11/): Recommendation, epub-a11y-11 REC-epub-a11y-11-20241017 (Recommendation, 2024-10-17), checked 2026-10-06.
- [EPUB Accessibility 1.2](https://www.w3.org/TR/epub-a11y-12/): Candidate Recommendation Draft, epub-a11y-12 CRD-epub-a11y-12-20260912 (Candidate Recommendation Draft, 2026-09-12), checked 2026-10-06.
- [EPUB Accessibility Techniques 1.1](https://www.w3.org/TR/epub-a11y-tech-11/): Note, epub-a11y-tech-11 (Note, 2025-03-13), checked 2026-10-06.
- [EPUB 3 Multiple-Rendition Publications 1.1](https://www.w3.org/TR/epub-multi-rend-11/): Note, epub-multi-rend-11 (Note, 2026-01-20), checked 2026-10-06.
- [EPUB Accessibility - EU Accessibility Act Mapping](https://www.w3.org/TR/epub-a11y-eaa-mapping/): Note, epub-a11y-eaa-mapping (Note, 2025-08-28), checked 2026-10-06.
