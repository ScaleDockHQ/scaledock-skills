# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id             | Line         | Status  | Revision                           | Posture | Summary                                                                                                                 |
| -------------- | ------------ | ------- | ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `compose-spec` | Compose file | current | main at commit 914ec15, 2026-09-17 |         | The Compose Specification is a single living document; the top-level version property is obsolete and informative only. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The Compose Specification has no numbered releases. Pin the repository commit in [Sources](../SKILL.md#sources) and treat a top-level `version` property as informative only.

## Upgrading

From legacy Compose file formats 2.x and 3.x: drop or ignore the top-level `version` property (04-version-and-name.md), then validate the file against the current specification; fields from the old formats that the specification no longer defines are reported as unknown.
