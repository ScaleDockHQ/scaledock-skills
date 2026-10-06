---
name: backstage-catalog
description: >-
  Backstage catalog: Descriptor Format of Catalog Entities | Backstage Software Catalog and Developer Platform Covers Backstage catalog descriptor. Use when describing a Backstage catalog entity. Triggers: Backstage, catalog-info.yaml.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Backstage catalog

Descriptor Format of Catalog Entities | Backstage Software Catalog and Developer Platform

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when describing a Backstage catalog entity.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Backstage catalog descriptor (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **apiVersion and kind [required] ​.** "The version is used for being able to evolve the format, and the tuple of apiVersion and kind should be enough for a parser to know how to interpret the contents of the rest of the data."
2. **name [required] ​.** "Names must be unique per kind, within a given namespace (if specified), at any point in time."
3. **namespace [optional] ​.** "Namespaces must be sequences of [a-zA-Z0-9] , possibly separated by - , at most 63 characters in total."
4. **uid [output] ​.** "Note that uid values are not to be seen as stable, and should not be used as external references to an entity."
5. **uid [output] ​.** "If you want to refer to an entity by some form of an identifier, you should always use string-form entity reference instead."
6. **description [optional] ​.** "More detailed explanations and documentation should be placed elsewhere."
7. **labels [optional] ​.** "The prefix, if present, must be a valid lowercase domain name, at most 253 characters in total."
8. **labels [optional] ​.** "The name part must be sequences of [a-zA-Z0-9] separated by any of [-_.] , at most 63 characters in total."

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

- [Backstage catalog descriptor](https://backstage.io/docs/features/software-catalog/descriptor-format/): Documentation, Backstage catalog descriptor format, fetched 2026-10-06 (Documentation, 2026-10-06), checked 2026-10-06.
