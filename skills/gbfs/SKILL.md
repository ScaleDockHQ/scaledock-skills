---
name: gbfs
description: >-
  GBFS: This document explains the types of files and data that comprise the General Bikeshare Feed Specification (GBFS) and defines the fields used in all of those files. Covers GBFS 3.0. Use when publishing bike-share data. Triggers: GBFS.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# GBFS

This document explains the types of files and data that comprise the General Bikeshare Feed Specification (GBFS) and defines the fields used in all of those files.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when publishing bike-share data.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: GBFS 3.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "## Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119), [BCP 14](https://tools.ietf.org/html/bcp14) and [RFC8174](https://tools.ietf.org/html/rfc8174) when, and only when, they appear in…"
2. **document.** "(https://geojson.org/) * REQUIRED - The field MUST be included in the dataset, and a value MUST be provided in that field for each record."
3. **document.** "* Conditionally REQUIRED - The field or file is REQUIRED under certain conditions, which are outlined in the field or file description."
4. **document.** "## Files File Name | REQUIRED | Defines ---|---|--- gbfs.json | Yes _(as of v2.0)_ | Auto-discovery file that links to the other files published for the system."
5. **document.** "To avoid circular references this file MUST NOT contain links to `manifest.json`."
6. **document.** "manifest.json _(added in v3.0)_ | Conditionally REQUIRED | Required of any GBFS dataset provider that publishes more than one GBFS dataset."
7. **document.** "For example, if you publish one set of files for Berlin and a different set for Paris, this file is REQUIRED."
8. **document.** "vehicle_types.json _(added in v2.1)_ | Conditionally REQUIRED | Describes the types of vehicles that System operator has available for rent."

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

- [GBFS 3.0](https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md): Specification, GBFS 3.0, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
