---
name: nist-key-management
description: >-
  NIST key management: Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology Covers SP 800-57 Part 1 Rev 5, SP 800-131A Rev 2, SP 800-132. Use when managing cryptographic keys. Triggers: SP 800-57, SP 800-131A, SP 800-132.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIST key management

Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when managing cryptographic keys.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: SP 800-57 Part 1 Rev 5 (default); SP 800-131A Rev 2 (default); SP 800-132 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority."
2. **document.** "Nor should these guidelines be interpre ted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official."
3. **document.** "Consequently, organizations must ensure that clear guidance and oversight is provided for the proper management of keys , as well as controls to ensure that the guidance is being properly followed and implemented."
4. **document.** "Shall: This term is used to indicate a requirement of a FIPS or a requirement that must be fulfilled to claim conformance to this Recommendation."
5. **document.** "Note that should may be coupled with not to become should not."
6. **document.** "The reader should be aware that the terms used in this Recommendation might be defined differently in other documents."
7. **document.** "5 RECOMMENDATION FOR KEY MANAGEMENT: PART 1 – GENERAL 5 This publication is available free of charge from: https://doi.org/10.6028/NIST.SP.800-57pt1r5 protection requirements should be of particular interest to cryptographic module vendors and application implementers."
8. **document.** "This section should be of particular interest to cryptographic module vendors and developers of cryptographic infrastructure services."

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

- [SP 800-57 Part 1 Rev 5](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf): NIST SP, SP 800-57 Part 1 Rev 5, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-131A Rev 2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf): NIST SP, SP 800-131A Rev 2, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-132](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf): NIST SP, SP 800-132, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
