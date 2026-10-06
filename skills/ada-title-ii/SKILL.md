---
name: ada-title-ii
description: >-
  ADA Title II: 28 CFR Part 35 is nondiscrimination on the basis of disability in state and local government services. Covers 28 CFR Part 35. Use when applying ADA Title II. Triggers: ADA Title II, 28 CFR 35.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# ADA Title II

28 CFR Part 35, Nondiscrimination on the Basis of Disability in State and Local Government Services, as served by the eCFR renderer for the current title 28 text.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text when applying ADA Title II to a state or local government service.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: a public entity.
- Target version: 28 CFR Part 35 (current) — default. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **§ 35.101.** "Consistent with the ADA Amendments Act's purpose of reinstating a broad scope of protection under the ADA, the definition of “disability” in this part shall be construed broadly in favor of expansive coverage to the maximum extent permitted by the terms of the ADA."
2. **4.1.6.** "Departures from particular requirements of either standard by the use of other methods shall be permitted when it is clearly evident that equivalent access to the facility or part of the facility is thereby provided."
3. **§ 35.130.** "Modified participation for persons with disabilities must be a choice, not a requirement."

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

- `section-508`, when the same service is also federal ICT under the Revised 508 Standards: `npx skills add ScaleDockHQ/scaledock-skills --skill section-508`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [28 CFR Part 35](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-28?part=35): eCFR, current title 28 part 35, fetched 2026-10-06, checked 2026-10-06.
