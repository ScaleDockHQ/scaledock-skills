---
name: nist-privacy-framework
description: >-
  NIST Privacy Framework: manage privacy risk with the Identify-P, Govern-P, Control-P, Communicate-P and Protect-P functions. Covers Privacy Framework 1.0, Privacy Framework 1.1 (track preview). Use when applying the Privacy Framework. Triggers: Privacy Framework.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# NIST Privacy Framework

For more than two decades, the Internet and associated information technologies have driven

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying the Privacy Framework.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Privacy Framework 1.0 (default); Privacy Framework 1.1 (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Like building a house, where homeowners make layout and design choices while relying on a well-engineered foundation, privacy protection should allow for individual choices, as long as effective privacy risk mitigations are already engineered into products and services."
2. **document.** "When selecting Tiers, an organization should consider its Target Profile(s) and how achievement may be supported or hampered by its current risk management practices, the degree of integration of privacy risk into its enterprise risk management portfolio, its data"
3. **document.** "Once an organization can identify the likelihood of any given problem arising from the data processing, which the Privacy Framework refers to as a problematic data action, it can assess the impact should the problematic data action occur."
4. **document.** "Rather, the Functions should be performed concurrently and continuously to form or enhance an operational culture that addresses the dynamic nature of privacy risk."
5. **document.** "The variety of ways in which the Privacy Framework can be used by organizations should discourage the notion of “compliance with the Privacy Framework” as a uniform or externally referenceable concept."
6. **document.** "The privacy outcomes determined by using the Privacy Framework should then serve as a basis for ongoing operation of the system."
7. **document.** "For example, if a device is being purchased for environmental monitoring of a forest, manageability may be important to support capabilities for minimizing the processing of data about people using the forest and should drive a manufacturer evaluation against applicable Subcategories in the Core (e.g., CT.DP-P4: system or device configurations permit selective collection or disclosure of data elements)."
8. **document.** "the objective should be to make the best buying decision among multiple suppliers, given a carefully determined list of privacy requirements."

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

- [Privacy Framework 1.0](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.01162020.pdf): NIST CSWP, Privacy Framework 1.0, fetched 2026-10-06 (NIST CSWP, 2026-10-06), checked 2026-10-06.
- [Privacy Framework 1.1](https://www.nist.gov/system/files/documents/2024/06/18/Privacy%20Framework%201.1%20Concept%20Paper%20%286.18.24%29.pdf): Concept paper, Privacy Framework 1.1 concept paper, fetched 2026-10-06 (Concept paper, 2026-10-06), checked 2026-10-06.
