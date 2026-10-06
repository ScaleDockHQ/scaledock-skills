---
name: open-graph
description: >-
  Open Graph: og:image:alt - A description of what is in the image (not a caption). Covers Open Graph. Use when adding Open Graph metadata. Triggers: Open Graph.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Open Graph

og:image:alt - A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt .

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when adding Open Graph metadata.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Open Graph (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Basic Metadata.** "The four required properties for every page are: og:title - The title of your object as it should appear within the graph, e.g., "The Rock"."
2. **Basic Metadata.** "og:image - An image URL which should represent your object within the graph."
3. **Optional Metadata.** "If auto is chosen, the consumer of your data should choose between "a" or "an"."
4. **Optional Metadata.** "og:site_name - If your object is part of a larger web site, the name which should be displayed for the overall site."
5. **Structured Properties.** "If the page specifies an og:image it should specify og:image:alt ."
6. **No Vertical.** "Any non-marked up webpage should be treated as og:type website."

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

- [Open Graph](https://ogp.me/): Protocol, Open Graph protocol, fetched 2026-10-06 (Protocol, 2026-10-06), checked 2026-10-06.
