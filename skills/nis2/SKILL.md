---
name: nis2
description: >-
  NIS2: Directive (EU) 2022/2555 sets cybersecurity risk-management and reporting duties. Covers Directive (EU) 2022/2555. Use when applying the NIS2 Directive. Triggers: NIS2, 2022/2555.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIS2 Directive

Directive (EU) 2022/2555 of 14 December 2022 on measures for a high common level of cybersecurity across the Union, published in Official Journal L 333 of 27 December 2022.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text when applying the NIS2 cybersecurity duties.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: an essential or important entity, or a Member State authority.
- Target version: Directive (EU) 2022/2555 (current) — default. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **text.** "Article 3(4) of the Annex to that Recommendation shall not apply for the purposes of this Directive."
2. **Article 9.** "Each Member State shall identify capabilities, assets and procedures that can be deployed in the case of a crisis for the purposes of this Directive."
3. **text.** "Member States shall simplify the reporting through technical means for notifications referred to in Articles 23 and 30."

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

- `dora`, when the entity is a financial entity under Regulation (EU) 2022/2554: `npx skills add ScaleDockHQ/scaledock-skills --skill dora`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Directive (EU) 2022/2555](https://publications.europa.eu/resource/celex/32022L2555.ENG): Official Journal, OJ L 333, 27 December 2022, checked 2026-10-06.
