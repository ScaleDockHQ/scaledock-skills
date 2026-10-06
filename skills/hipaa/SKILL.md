---
name: hipaa
description: >-
  HIPAA: 45 CFR Parts 160 and 164 are the general, privacy, security and breach notification rules. Covers 45 CFR Parts 160 and 164. Use when applying the HIPAA Rules. Triggers: HIPAA, 45 CFR 164.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HIPAA Rules

45 CFR Part 160 (general administrative requirements) and Part 164 (security, breach notification and privacy), as served by the eCFR renderer for the current title 45 text.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text when applying the HIPAA privacy, security or breach notification rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: a covered entity or a business associate.
- Target version: 45 CFR Parts 160 and 164 (current) — default. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **§ 160.102.** "1320a-7c(a)(5) , nothing in this subchapter shall be construed to diminish the authority of any Inspector General, including such authority as provided in the Inspector General Act of 1978, as amended (5 U.S.C."
2. **160.410.** "The covered entity or business associate must submit any such evidence to the Secretary within 30 days (computed in the same manner as prescribed under § 160.526 of this part ) of receipt of such notification;"
3. **§ 160.506.** "Natural persons who appear as an attorney or other representative must conform to the standards of conduct and ethics required of practitioners before the courts of the United States."
4. **164.504.** "The covered entity that is a hybrid entity must ensure that a health care component of the entity complies with the applicable requirements of this part."
5. **§ 164.502.** "In the case in which there is insufficient or out-of-date contact information that precludes written notification to the individual under paragraph (d)(1)(i) of this section, a substitute form of notice reasonably calculated to reach the individual shall be provided."
6. **§ 164.520.** "If a covered entity seeks an authorization from an individual for a use or disclosure of protected health information, the covered entity must provide the individual with a copy of the signed authorization."

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

- [45 CFR Part 160](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=160): eCFR, current title 45 part 160, fetched 2026-10-06, checked 2026-10-06.
- [45 CFR Part 164](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=164): eCFR, current title 45 part 164, fetched 2026-10-06, checked 2026-10-06.
