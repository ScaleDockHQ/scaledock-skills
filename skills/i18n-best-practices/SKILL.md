---
name: i18n-best-practices
description: >-
  Internationalization best practices: This Architectural Specification provides authors of specifications, software developers, and content developers with a common reference for interoperable text manipulation on the World Wide Web, building on the Universal Character Set, defined jointly by the Unicode Standard and ISO/IEC 10646. Covers Character Model for the World Wide Web 1.0: Fundamentals, Character Model for the World Wide Web: String Matching (track preview), Strings on the Web: Language and Direction Metadata (track), Internationalization Tag Set (ITS) Version 2.0, Ruby Annotation. Use when internationalizing web content or specifications. Triggers: Character Model, ITS, ruby.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Internationalization best practices

This Architectural Specification provides authors of specifications, software developers, and content developers with a common reference for interoperable text manipulation on the World Wide Web, building on the Universal Character Set, defined jointly by the Unicode Standard and ISO/IEC 10646. Topics addressed include use of the terms ' character ', ' encoding ' and ' string ', a reference processing model, choice and identification of character encodings, character escaping, and string indexing. For normalization and string identity matching, see the companion document Character Model for the World Wide Web 1.0: Normalization [CharNorm] . For resource identifiers, see the companion documen

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when internationalizing web content or specifications.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Character Model for the World Wide Web 1.0: Fundamentals (default); Character Model for the World Wide Web: String Matching (preview, posture track: emit only when the user opts in and the posture is build); Strings on the Web: Language and Direction Metadata (default, posture track); Internationalization Tag Set (ITS) Version 2.0 (default); Ruby Annotation (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **2 Conformance.** "The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY " and " OPTIONAL " in this document are to be interpreted as described in RFC 2119 [RFC 2119] ."
2. **2 Conformance.** "NOTE: RFC 2119 makes it clear that requirements that use SHOULD are not optional and must be complied with unless there are specific reasons not to: " This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course."
3. **2 Conformance.** "A specification conforms to this document if it: does not violate any conformance criteria preceded by [S], documents the reason for any deviation from criteria where the imperative is SHOULD , SHOULD NOT , or RECOMMENDED , where applicable, requires implementations conforming to the specification to conform to this document, where applicable, requires content conforming to the specification to…"
4. **3.2 Units of aural rendering.** "C001 [S] [I] [C] Specifications, software and content MUST NOT require or depend on a one-to-one correspondence between characters and the sounds of a language."
5. **3.3 Units of visual.** "C002 [S] [I] [C] Specifications, software and content MUST NOT require or depend on a one-to-one mapping between characters and units of displayed text."
6. **3.3.1 Visual Rendering and Logical Order.** "C003 [S] [I] [C] Protocols, data formats and APIs MUST store, interchange or process text data in logical order."
7. **3.3.1 Visual Rendering and Logical Order.** "C075 [I] Independent of whether some implementation uses logical selection or visual selection, characters selected MUST be kept in logical order in storage."
8. **3.3.1 Visual Rendering and Logical Order.** "C004 [S] Specifications of protocols and APIs that involve selection of ranges SHOULD provide for discontiguous logical selections, at least to the extent necessary to support implementation of visual selection on screen on top of those protocols and APIs."

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

- [Character Model for the World Wide Web 1.0: Fundamentals](https://www.w3.org/TR/charmod/): Recommendation, charmod REC-charmod-20050215 (Recommendation, 2005-02-15), checked 2026-10-06.
- [Character Model for the World Wide Web: String Matching](https://www.w3.org/TR/charmod-norm/): First Public Working Draft, charmod-norm WD-charmod-norm-20260716 (First Public Working Draft, 2026-07-16), checked 2026-10-06.
- [Strings on the Web: Language and Direction Metadata](https://www.w3.org/TR/string-meta/): First Public Working Draft, string-meta WD-string-meta-20260716 (First Public Working Draft, 2026-07-16), checked 2026-10-06.
- [Internationalization Tag Set (ITS) Version 2.0](https://www.w3.org/TR/its20/): Recommendation, its20 REC-its20-20131029 (Recommendation, 2013-10-29), checked 2026-10-06.
- [Ruby Annotation](https://www.w3.org/TR/ruby/): Recommendation, ruby REC-ruby-20010531 (Recommendation, 2001-05-31), checked 2026-10-06.
- [Working with Time and Timezones](https://www.w3.org/TR/timezone/): Draft Note, timezone (Draft Note, 2025-07-26), checked 2026-10-06.
- [Developing Localizable Manifests](https://www.w3.org/TR/localizable-manifests/): Note, localizable-manifests (Note, 2025-02-14), checked 2026-10-06.
