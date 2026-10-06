---
name: owasp-ci-cd-top-10
description: >-
  OWASP CI/CD Top 10: review build and deployment pipelines against the top CI/CD security risks. Covers OWASP CI/CD Top 10. Use when reviewing CI/CD security risks. Triggers: CI/CD Top 10.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# OWASP CI/CD Top 10

OWASP Top 10 CI/CD Security Risks | OWASP Foundation OWASP Foundation Home Projects Chapters Events Meetings News About Sign in Donate

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when reviewing CI/CD security risks.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OWASP CI/CD Top 10 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **abstract.** "OWASP Top 10 CI/CD Security Risks | OWASP Foundation OWASP Foundation Home Projects Chapters Events Meetings News About Sign in Donate"

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

- [OWASP CI/CD Top 10](https://owasp.org/www-project-top-10-ci-cd-security-risks/): Project, OWASP CI/CD Top 10, fetched 2026-10-06 (Project, 2026-10-06), checked 2026-10-06.
