---
name: en-301-549
description: >-
  EN 301 549: B-1040 Brussels - BELGIUM B-1040 Brussels - BELGIUM F-06921 Sophia Antipolis Cedex - FRANCE Covers EN 301 549 V4.1.1, EN 301 549 V3.2.1 (supported). Use when applying European ICT accessibility requirements. Triggers: EN 301 549.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# EN 301 549

B-1040 Brussels - BELGIUM B-1040 Brussels - BELGIUM F-06921 Sophia Antipolis Cedex - FRANCE

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying European ICT accessibility requirements.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: EN 301 549 V4.1.1 (default); EN 301 549 V3.2.1 (supported). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Users should be aware that the present document may be revised or have its status changed, this information is available in the Milestones listing."
2. **document.** "No recommendation as to products and services or vendors is made or should be implied."
3. **document.** "National transposition dates Date of adoption of this EN: 24 August 2026 Date of latest announcement of this EN (doa): 30 November 2026 Date of latest publication of new National Standard or endorsement of this EN (dop/e): 31 May 2027 Date of withdrawal of any conflicting National Standard (dow): 31 May 2028 Modal verbs terminology In the present document "shall", "shall not", "should", "should…"
4. **document.** ""must" and "must not" are NOT allowed in ETSI deliverables except when used in direct citation."
5. **document.** "When the present document is used for most purposes, including when used in ICT procurement, all of the technical requirements in clauses 5 to 13, as well as the functional performance criteria in clause 4 should be considered."
6. **document.** "This is the smallest font size - not the recommended font size for body text which should be larger ."
7. **document.** "NOTE 6: For handheld devices D should be assumed as 400 mm."
8. **document.** "The relationship between viewing distance and physical x-height for a font with an x-height of 16 CSSpx is as follows: Table 5.1 Viewing distance (mm) x-height (mm) for 16CSSpx 400 2,38 500 2,98 700 4,17 1 000 5,95 2 000 11,90 3 000 17,86 5 000 29,76 10 000 59,52 NOTE 2: This is the smallest font size - not the recommended font size for body text which should be larger."

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

- `wcag`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill wcag`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [EN 301 549 V4.1.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf): Harmonised European Standard, EN 301 549 V4.1.1 (2026-09), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06), checked 2026-10-06.
- [EN 301 549 V3.2.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf): Harmonised European Standard, EN 301 549 V3.2.1 (2021-03), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06), checked 2026-10-06.
