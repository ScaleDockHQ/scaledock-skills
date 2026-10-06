---
name: nist-800-190
description: >-
  NIST SP 800-190: Kent Rochford, Acting Under Secretary of Commerce for Standards and Technology and Acting Director Covers SP 800-190. Use when securing application containers. Triggers: SP 800-190.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIST SP 800-190

Kent Rochford, Acting Under Secretary of Commerce for Standards and Technology and Acting Director

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when securing application containers.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: SP 800-190 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority."
2. **document.** "Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official."
3. **document.** "Figure 1: Container Technology Architecture Tiers and Components Organizations should follow these recommendations to help ensure the security of their container technology implementations and usage: Tailor the organization’s operational culture and technical processes to support the new way of developing, running, and supporting applications made possible by containers."
4. **document.** "be encouraged to embrace the recommended practices for securely building and operating apps within containers, as covered in this guide, and the organization should be willing to rethink existing procedures to take advantage of containers."
5. **document.** "Education and training covering both the technology and the operational approach should be offered to anyone involved in the software development lifecycle."
6. **document.** "Accordingly, whenever possible, organizations should use container-specific host OSs to reduce their risk."
7. **document.** "In larger-scale environments with hundreds of hosts and thousands of containers, this grouping must be automated to be practical to operationalize."
8. **document.** "Organizations should use tools that take the declarative, step-by-step build approach and immutable nature of containers and images into their design to provide more actionable and reliable results."

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

- [SP 800-190](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf): NIST SP, SP 800-190, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
