---
name: swid
description: >-
  SWID tags: identify installed software with ISO/IEC 19770-2 tags, following NIST IR 8060. Covers NIST IR 8060. Use when tagging software with SWID. Triggers: SWID.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# SWID

Willie May, Under Secretary of Commerce for Standards and Technology and Director

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when tagging software with SWID.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: NIST IR 8060 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this report are to be interpreted as described in Request for Comment (RFC) 2119 [RFC 2119]."
2. **document.** "When these words appear in regular case, such as “should” or “may”, they are not intended to be interpreted as RFC 2119 key words."
3. **document.** "A key requirement of the labeling process is that when the same unit of software is discovered on different devices, it must be assigned the same label."
4. **document.** "This report helps software consumers understand the benefits of software NISTIR 8060 GUIDELINES FOR THE CREATION OF INTEROPERABLE SWID TAGS 5 products that are delivered with SWID tags, and why they should encourage software providers to deliver products with SWID tags that meet their anticipated usage scenarios."
5. **document.** "In all cases, an installation procedure must be run to cause the software contained in an installation package to be unpacked and deployed on a target device."
6. **document.** "Patch 2 has @rel=requires Patch 1, since Patch 1 must be installed before Patch 2."
7. **document.** "Section 2.3.1 describes how and where SWID tags should be deployed as the result of installing new software, applying a patch, or performing an update to existing software."
8. **document.** "Any NISTIR 8060 GUIDELINES FOR THE CREATION OF INTEROPERABLE SWID TAGS 15 payload information provided must reference files using a relative path of the location where the SWID tag is stored."

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

- [NIST IR 8060](https://nvlpubs.nist.gov/nistpubs/ir/2016/NIST.IR.8060.pdf): NIST IR, NIST IR 8060, fetched 2026-10-06 (NIST IR, 2026-10-06), checked 2026-10-06.
