# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id         | Line     | Status  | Revision                                                                           | Posture | Summary                                                                                                                                                  |
| ---------- | -------- | ------- | ---------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cisa-kev` | CISA KEV | current | KEV schema at kev-data Commit b244ed1a6403 (2026-10-04); BOD 26-04 (June 10, 2026) |         | The live catalog, its JSON schema, and the BOD 26-04 remediation timelines. Entries now carry `forensicTriage` and `cwes` alongside the original fields. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The catalog is a live feed, not a versioned standard: each JSON release carries `catalogVersion` and `dateReleased`. Pin the kev-data commit for the schema. BOD 26-04 (June 10, 2026) supersedes and revokes BOD 22-01 (November 3, 2021) and BOD 19-02; the old BOD 22-01 rule of a two-week or six-month due date per entry is replaced by the Table 1 timelines, which depend on KEV status, public exposure, automatability and technical impact.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
