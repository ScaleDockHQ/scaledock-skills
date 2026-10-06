---
name: openpgp
description: >-
  OpenPGP: This document specifies the message formats used in OpenPGP. Covers RFC 9580 OpenPGP. Use when signing or encrypting with OpenPGP. Triggers: OpenPGP, RFC 9580.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenPGP

This document specifies the message formats used in OpenPGP. OpenPGP provides encryption with public key or symmetric cryptographic algorithms, digital signatures, compression, and key management. ¶ This document is maintained in order to publish all necessary information needed to develop interoperable applications based on the OpenPGP format. It is not a step-by-step cookbook for writing an application. It describes only the format and methods needed to read, check, generate, and write conforming packets crossing any network. It does not deal with storage and implementation questions. It does, however, discuss implementation issues necessary to avoid security flaws. ¶ This document obsolet

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when signing or encrypting with OpenPGP.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 9580 OpenPGP (default); RFC 4880 OpenPGP Message Format (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **abstract.** "This document specifies the message formats used in OpenPGP. OpenPGP provides encryption with public key or symmetric cryptographic algorithms, digital signatures, compression, and key management. ¶ This document is maintained in order to publish all necessary information needed to develop interoperable applications based on the OpenPGP format. It is not a step-by-step cookbook for writing an application. It describes only the format and methods needed to read, check, generate, and write conforming packets crossing any network. It does not deal with storage and implementation questions. It does, however, discuss implementation issues necessary to avoid security flaws. ¶ This document obsolet"

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

- [RFC 9580 OpenPGP](https://www.rfc-editor.org/rfc/rfc9580.html): PROPOSED STANDARD, RFC 9580 (PROPOSED STANDARD, July 2024), checked 2026-10-06.
- [RFC 4880 OpenPGP Message Format](https://www.rfc-editor.org/rfc/rfc4880.html): PROPOSED STANDARD, RFC 4880 (PROPOSED STANDARD, November 2), checked 2026-10-06.
