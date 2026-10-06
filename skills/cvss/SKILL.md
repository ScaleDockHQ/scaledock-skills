---
name: cvss
description: >-
  CVSS: score vulnerability severity with Common Vulnerability Scoring System vectors. Covers CVSS 4.0, CVSS 3.1 (supported). Use when scoring vulnerability severity. Triggers: CVSS.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# CVSS

Building a CTI program and team Program maturity stages CTI Maturity model - Stage 1

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when scoring vulnerability severity.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: CVSS 4.0 (default); CVSS 3.1 (supported); CVSS 2.0 (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Introduction.** "Consumers of CVSS should enrich the Base metrics with Threat and Environmental metric values specific to their use of the vulnerable system to produce a score that provides a more comprehensive input to risk assessment specific to their organization."
2. **Assessment.** "This vector string is a specifically formatted text string that contains each value assigned to each metric, and should be displayed with the vulnerability score."
3. **Assessment.** "Note that all metrics should be assessed under the assumption that the attacker has perfect knowledge of the vulnerability."
4. **Nomenclature.** "Therefore, numerical CVSS scores should be labeled using nomenclature that communicates the metrics used in its generation."
5. **Nomenclature.** "CVSS Nomenclature CVSS Metrics Used CVSS-B Base metrics CVSS-BE Base and Environmental metrics CVSS-BT Base and Threat metrics CVSS-BTE Base, Threat, Environmental metrics Additional Notes: This nomenclature should be used wherever a numerical CVSS value is displayed or communicated."
6. **Exploitability Metrics.** "Therefore, each of the Exploitability metrics listed below should be assessed relative to the vulnerable system, and reflect the properties of the vulnerability that lead to a successful attack."
7. **Exploitability Metrics.** "When assessing Base metrics, it should be assumed that the attacker has advanced knowledge of the target system, including general configuration and default defense mechanisms (e.g., built-in firewalls, rate limits, traffic policing)."
8. **Exploitability Metrics.** "For example, exploiting a vulnerability that results in repeatable, deterministic success should still be considered a Low value for Attack Complexity, independent of the attacker's knowledge or capabilities."

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

- [CVSS 4.0](https://www.first.org/cvss/v4.0/specification-document): Specification, CVSS 4.0, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
- [CVSS 3.1](https://www.first.org/cvss/v3.1/specification-document): Specification, CVSS 3.1, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
- [CVSS 2.0](https://www.first.org/cvss/v2/guide): Guide, CVSS 2.0 guide, fetched 2026-10-06 (Guide, 2026-10-06), checked 2026-10-06.
