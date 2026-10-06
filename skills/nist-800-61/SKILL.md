---
name: nist-800-61
description: >-
  NIST SP 800-61: Craig Burkhardt, Acting Under Secretary of Commerce for Standards and Technology and Acting NIST Director Covers SP 800-61 Rev 3. Use when handling computer security incidents. Triggers: SP 800-61.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIST SP 800-61

Craig Burkhardt, Acting Under Secretary of Commerce for Standards and Technology and Acting NIST Director

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when handling computer security incidents.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: SP 800-61 Rev 3 (default); SP 800-61 Rev 2 (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority."
2. **document.** "Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official."
3. **document.** "Incident response life cycle model based on CSF 2.0 Functions ..................................................5 NIST SP 800-61r3 Incident Response Recommendations and April 2025 Considerations for Cyber Risk Management 1 Executive Summary Incident response is a critical part of cybersecurity risk management and should be integrated across organizational operations."
4. **document.** "Organizations should use the incident response life cycle framework or model that suits them best."
5. **document.** "Regardless of the incident response life cycle framework or model used, every organization should take incident response into consideration throughout their cybersecurity risk management activities."
6. **document.** "Incident response is now considered a critical part of cybersecurity risk management that should be integrated across organizational operations."
7. **document.** "The lessons learned during incident response should often be shared as soon as they are identified, not delayed until after recovery concludes."
8. **document.** "Previous incident response life cycle model’s phases and corresponding CSF 2.0 Functions Previous Incident Response Life Cycle Model Phase CSF 2.0 Functions Preparation Govern Identify (all Categories) Protect Detection & Analysis Detect Identify (Improvement Category) Containment, Eradication & Recovery Respond Recover Identify (Improvement Category) Post-Incident Activity Identify (Improvement…"

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

- [SP 800-61 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf): NIST SP, SP 800-61 Rev 3, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-61 Rev 2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf): NIST SP, SP 800-61 Rev 2, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
