---
name: nist-csf
description: >-
  NIST CSF: This publication is available free of charge from: https://doi.org/10.6028/NIST.CSWP.29 Covers CSF 2.0. Use when applying the Cybersecurity Framework. Triggers: NIST CSF.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIST CSF

This publication is available free of charge from: https://doi.org/10.6028/NIST.CSWP.29

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying the Cybersecurity Framework.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: CSF 2.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The CSF does not prescribe how outcomes should be achieved."
2. **document.** "Available through the NIST CSF website, the CSF and these supplementary resources from NIST and others should be viewed as a “CSF portfolio” to help manage and reduce risks."
3. **document.** "Cybersecurity risks are expanding constantly, and managing those risks must be a continuous process."
4. **document.** "The CSF should be used in conjunction with other resources (e.g., frameworks, standards,"
5. **document.** "CSF Functions The Functions should be addressed concurrently."
6. **document.** "Actions that support GOVERN, IDENTIFY, PROTECT, and DETECT should all happen continuously, and actions that support RESPOND and RECOVER should be ready at all times and happen when cybersecurity incidents occur."
7. **document.** "Determine what types of information the Profile should include for the selected CSF outcomes, and document the needed information."
8. **document.** "CSF Tiers for cybersecurity risk governance and management Tiers should complement an organization’s cybersecurity risk management methodology rather than replace it."

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

- [CSF 2.0](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf): NIST CSWP, CSF 2.0, fetched 2026-10-06 (NIST CSWP, 2026-10-06), checked 2026-10-06.
