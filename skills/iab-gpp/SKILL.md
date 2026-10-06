---
name: iab-gpp
description: >-
  IAB GPP: This document is one of the IAB Tech Lab Global Privacy Protocol Specifications. Covers Global Privacy Platform. Use when encoding a Global Privacy Platform string. Triggers: GPP.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# IAB GPP

This document is one of the IAB Tech Lab Global Privacy Protocol Specifications. It defines the technical implementation of the structure and encoding for a Global Privacy Protocol String (GPP String).

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when encoding a Global Privacy Platform string.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Global Privacy Platform (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME."
2. **document.** "Participants in the Global Privacy Working group must be members of IAB Tech Lab."
3. **document.** "This document specifies how that string must be formatted and how it must be used."
4. **document.** "Vendors or any other third-party service providers must neither create nor alter GPP Strings."
5. **document.** "#### Table from RFC 4648 Value Encoding Value Encoding Value Encoding Value Encoding 0 A 17 R 34 i 51 z 1 B 18 S 35 j 52 0 2 C 19 T 36 k 53 1 3 D 20 U 37 l 54 2 4 E 21 V 38 m 55 3 5 F 22 W 39 n 56 4 6 G 23 X 40 o 57 5 7 H 24 Y 41 p 58 6 8 I 25 Z 42 q 59 7 9 J 26 a 43 r 60 8 10 K 27 b 44 s 61 9 11 L 28 c 45 t 62 + 12 M 29 d 46 u 63 / 13 N 30 e 47 v 14 O 31 f 48 w (pad) = 15 P 32 g 49 x 16 Q 33 h…"
6. **document.** "The string must contain a header and applicable discrete section(s): [Header]~[Discrete Section] #### **Header** The header is always required and comes first."
7. **document.** "The IDs must be represented in the order the related sections appear in the string."
8. **document.** "For example, if TCF needs a version 3 and eliminates the concept of “out of band” vendors—which would result in the removal of DisclosedVendors and AllowedVendors—that should not require a version bump to the GPP string specification."

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

- [Global Privacy Platform](https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/main/Core/Consent%20String%20Specification.md): Specification, GPP consent string specification, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
