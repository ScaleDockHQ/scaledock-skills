# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id         | Line     | Status  | Revision                 | Posture | Summary                                                                               |
| ---------- | -------- | ------- | ------------------------ | ------- | ------------------------------------------------------------------------------------- |
| `gbfs-3.0` | GBFS 3.0 | current | GBFS v3.0 (git tag v3.0) |         | Current MAJOR release; adds manifest.json, localized strings and RFC 3339 timestamps. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

GBFS publishes MAJOR.MINOR releases as git tags. The specification says supported versions do not span more than two MAJOR versions, and producers should move to a new MAJOR release within 180 days. Feeds still on 2.x are read and upgraded, not authored, by this skill.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
