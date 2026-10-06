---
name: openchain
description: >-
  OpenChain: Learn More: [htttps://www.openchainproject.org](htttps://www.openchainproject.org) Covers OpenChain ISO 5230, OpenChain ISO 18974. Use when conforming to OpenChain license or security assurance. Triggers: OpenChain, ISO 5230, ISO 18974.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenChain

Learn More: [htttps://www.openchainproject.org](htttps://www.openchainproject.org)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when conforming to OpenChain license or security assurance.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OpenChain ISO 5230 (default); OpenChain ISO 18974 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Clause 3 defines the requirements that a program must satisfy to achieve conformance."
2. **document.** "A requirement consists of one or more verification materials (i.e., records) that must be produced to satisfy the requirement."
3. **document.** "Although no requirements are provided here on what should be included in the policy, other sections may impose requirements on the policy."
4. **document.** "#### Verification material(s): - 3.1.3.1 - Documented evidence of assessed awareness for the program participants - which should include the program's objectives, one's contribution within the program, and implications of program non-conformance."

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

- [OpenChain ISO 5230](https://raw.githubusercontent.com/OpenChain-Project/License-Compliance-Specification/master/ISO-5230-2020/en/ISO-5230-2020.md): Public text, OpenChain ISO 5230 public text, fetched 2026-10-06 (Public text, 2026-10-06), checked 2026-10-06.
- [OpenChain ISO 18974](https://raw.githubusercontent.com/OpenChain-Project/Security-Assurance-Specification/main/Security-Assurance-Specification/ISO-18974/en/ISO-18974.md): Public text, OpenChain ISO 18974 public text, fetched 2026-10-06 (Public text, 2026-10-06), checked 2026-10-06.
