---
name: language-tags
description: >-
  BCP 47 language tags (RFC 5646, RFC 4647): build, validate and match language tags. Covers RFC 5646 Tags for Identifying Languages, RFC 4647 Matching of Language Tags. Use when matching BCP 47 language tags. Triggers: BCP 47, RFC 5646, language tag.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Tags for Identifying Languages

Tags for Identifying Languages

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when matching BCP 47 language tags.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 5646 Tags for Identifying Languages (default); RFC 4647 Matching of Language Tags (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
2. **document.** "Formatting of Language Tags At all times, language tags and their subtags, including private use and extensions, are to be treated as case insensitive: there exist conventions for the capitalization of some of the subtags, but these MUST NOT be taken to carry meaning."
3. **document.** "Implementers SHOULD specify a locale-neutral casing operation to ensure that case folding of subtags does not produce this value, which is illegal in language tags."
4. **document.** "Sequences of private use and extension subtags MUST occur at the end of the sequence of subtags and MUST NOT be interspersed with subtags defined elsewhere in this document."
5. **document.** "Future registrations of this type are discouraged: an attempt to register any new proposed primary language MUST be made to the ISO 639 registration authority."
6. **document.** "Other values MUST NOT be assigned to the primary subtag except by revision or update of this document."
7. **document.** "In order to avoid instability in the canonical form of tags, if a two-character code is added to ISO 639-1 for a language for which a three-character code was already included in either ISO 639-2 or ISO 639-3, the two-character code MUST NOT be registered."
8. **document.** "Extended language subtag records MUST include exactly one 'Prefix' field indicating an appropriate subtag or sequence of subtags for that extended language subtag."

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

- [RFC 5646 Tags for Identifying Languages](https://www.rfc-editor.org/rfc/rfc5646.html): BEST CURRENT PRACTICE, RFC 5646 (BEST CURRENT PRACTICE, September ), checked 2026-10-06.
- [RFC 4647 Matching of Language Tags](https://www.rfc-editor.org/rfc/rfc4647.html): BEST CURRENT PRACTICE, RFC 4647 (BEST CURRENT PRACTICE, September ), checked 2026-10-06.
