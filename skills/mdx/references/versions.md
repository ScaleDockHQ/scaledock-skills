# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line | Status  | Revision                                        | Posture | Summary                                   |
| ----- | ---- | ------- | ----------------------------------------------- | ------- | ----------------------------------------- |
| `mdx` | MDX  | current | MDX 3.1.1 (commit 50aa8df, released 2025-08-29) |         | MDX 3, as implemented by @mdx-js/mdx 3.x. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

MDX has no separate language version; the syntax is defined by the @mdx-js/mdx major release. MDX 2 introduced the current syntax (JSX, expressions and ESM, with indented code, autolinks and HTML syntax removed); MDX 3 kept it.

## Upgrading

From MDX 1: replace HTML comments with `{/* */}` expression comments, replace autolinks with full links, escape literal `<` and `{`, and remove indented code. These are the MDX syntax rules quoted in the requirements.
