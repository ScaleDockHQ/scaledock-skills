---
name: owasp-proactive-controls
description: >-
  OWASP Proactive Controls: Insecure software is undermining our financial, healthcare, defense, energy, and other critical infrastructure worldwide. Covers OWASP Proactive Controls. Use when applying proactive security controls. Triggers: Proactive Controls.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP Proactive Controls

Insecure software is undermining our financial, healthcare, defense, energy, and other critical infrastructure worldwide. As our digital, global infrastructure gets increasingly complex and interconnected, the difficulty of achieving application security increases exponentially. We can no longer afford to tolerate relatively simple security problems.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying proactive security controls.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OWASP Proactive Controls (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Aim & Objective.** "The goal of the OWASP Top 10 Proactive Controls project is to raise awareness about application security by describing the most important areas of concern that software developers must be aware of."
2. **How to Use this Document.** "To be effective, these controls should be used consistently and thoroughly throughout all applications."
3. **How to Use this Document.** "A fully secure development process should include comprehensive requirements from a standard such as the OWASP ASVS in addition to including a range of software development activities described in maturity models such as OWASP SAMM and BSIMM ."
4. **Copyright and Licence.** "For any reuse or distribution, you must make it clear to others the license terms of this work."
5. **Copyright and Licence.** "For any reuse or distribution, you must make clear to others the license terms of this work."

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

- [OWASP Proactive Controls](https://top10proactive.owasp.org/): Guide, OWASP Proactive Controls, fetched 2026-10-06 (Guide, 2026-10-06), checked 2026-10-06.
