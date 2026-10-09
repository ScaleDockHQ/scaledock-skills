---
name: coppa
description: >-
  COPPA: collect personal information from children under 13 only with notice and verifiable parental consent. Covers COPPA Rule 2025. Use when applying the Children's Online Privacy Protection Rule. Triggers: COPPA.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# COPPA

The Children's Online Privacy Protection Rule (COPPA Rule), 16 CFR Part 312, issued by the U.S. Federal Trade Commission: notice, verifiable parental consent, parental review, data minimisation, security, retention and safe harbor programs for operators of websites and online services directed to children under 13, or that knowingly collect personal information from them. The pinned text is the codified rule as amended by the 2025 final rule (90 FR 16977).

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying the Children's Online Privacy Protection Rule.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: operator of a website or online service directed to children, or one with actual knowledge that it collects personal information from a child.
- Target version: COPPA Rule 2025 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **§ 312.4(a).** "It shall be the obligation of the operator to provide notice and obtain verifiable parental consent prior to collecting, using, or disclosing personal information from children."
2. **§ 312.5(a)(1).** "An operator is required to obtain verifiable parental consent before any collection, use, or disclosure of personal information from children, including consent to any material change in the collection, use, or disclosure practices to which the parent has previously consented."
3. **§ 312.7.** "An operator is prohibited from conditioning a child's participation in a game, the offering of a prize, or another activity on the child's disclosing more personal information than is reasonably necessary to participate in such activity."
4. **§ 312.8(b).** "At a minimum, the operator must establish, implement, and maintain a written information security program that contains safeguards that are appropriate to the sensitivity of the personal information collected from children and the operator's size, complexity, and nature and scope of activities."
5. **§ 312.10.** "An operator of a website or online service shall retain personal information collected online from a child for only as long as is reasonably necessary to fulfill the specific purpose(s) for which the information was collected."

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

- [16 CFR Part 312 (COPPA Rule)](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-16?chapter=I&subchapter=C&part=312): eCFR, current title 16 part 312, as amended at 90 FR 16977 (2025-04-22), up to date as of 2026-10-02, checked 2026-10-06.
