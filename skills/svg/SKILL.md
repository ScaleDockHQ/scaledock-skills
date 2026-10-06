---
name: svg
description: >-
  Scalable Vector Graphics (SVG): This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 2. Covers Scalable Vector Graphics (SVG) 2 (build), SVG Accessibility API Mappings Level 1.0 (track). Use when authoring or processing SVG. Triggers: SVG, SVG 2.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Scalable Vector Graphics (SVG)

This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 2. SVG is a language based on XML for describing two-dimensional vector and mixed vector/raster graphics. SVG content is stylable, scalable to different display resolutions, and can be viewed stand-alone, mixed with HTML content, or embedded using XML namespaces within other XML languages. SVG also supports dynamic changes; script can be used to create interactive documents, and animations can be performed using declarative animation features or by using script.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when authoring or processing SVG.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Scalable Vector Graphics (SVG) 2 (default, posture build); Scalable Vector Graphics (SVG) 1.1 (Second Edition) (legacy: read and upgrade, never author); SVG Accessibility API Mappings Level 1.0 (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **abstract.** "This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 2. SVG is a language based on XML for describing two-dimensional vector and mixed vector/raster graphics. SVG content is stylable, scalable to different display resolutions, and can be viewed stand-alone, mixed with HTML content, or embedded using XML namespaces within other XML languages. SVG also supports dynamic changes; script can be used to create interactive documents, and animations can be performed using declarative animation features or by using script."

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

- [Scalable Vector Graphics (SVG) 2](https://www.w3.org/TR/SVG2/): Candidate Recommendation Snapshot, SVG2 CR-SVG2-20181004 (Candidate Recommendation Snapshot, 2018-10-04), checked 2026-10-06.
- [Scalable Vector Graphics (SVG) 1.1 (Second Edition)](https://www.w3.org/TR/SVG11/): Recommendation, SVG11 REC-SVG11-20110816 (Recommendation, 2011-08-16), checked 2026-10-06.
- [SVG Accessibility API Mappings](https://www.w3.org/TR/svg-aam-1.0/): Working Draft, svg-aam-1.0 WD-svg-aam-1.0-20260923 (Working Draft, 2026-09-24), checked 2026-10-06.
