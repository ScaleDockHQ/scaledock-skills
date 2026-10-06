---
name: microsoft-rest-api-guidelines
description: >-
  Microsoft REST API Guidelines: design consistent REST APIs by the Microsoft guidelines. Covers Microsoft REST API Guidelines. Use when designing a REST API. Triggers: REST API Guidelines.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Microsoft REST API Guidelines

> This document has been deprecated and has been moved to the Microsoft REST API Guidelines deprecated. Please refer to the notes below for the latest guidance.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when designing a REST API.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Microsoft REST API Guidelines (default). See `references/versions.md`.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "> > ## **Guidance for Azure service teams** > Azure service teams should use the companion documents, Azure REST API Guidelines and Considerations for Service Design, when building or modifying their services."
2. **document.** "> > ## **Guidance for Microsoft Graph service teams** > Graph service teams should reference the companion document, Microsoft Graph REST API Guidelines when building or modifying their services."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> `references/versions.md`
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in `references/requirements.md` and implement each one that applies to the role.
   -> `references/requirements.md`
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> `references/versions.md`
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in `references/requirements.md` holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Microsoft REST API Guidelines](https://raw.githubusercontent.com/microsoft/api-guidelines/vNext/Guidelines.md): Guidelines, Microsoft REST API Guidelines, fetched 2026-10-06 (Guidelines, 2026-10-06), checked 2026-10-06.
