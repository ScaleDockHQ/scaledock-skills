# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line | Status  | Revision                             | Posture | Summary                                                                                                         |
| ----- | ---- | ------- | ------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `aip` | AIPs | current | master at commit 23e176e, 2026-08-17 |         | The AIPs are living documents with no release numbers; each AIP carries its own state (approved) and changelog. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The AIP collection has no numbered releases. Each AIP is pinned at the repository commit in [Sources](../SKILL.md#sources); check its `state` front matter (only `approved` AIPs are pinned here) and its changelog when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
