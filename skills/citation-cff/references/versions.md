# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id             | Line                 | Status  | Revision                                        | Posture | Summary                                                  |
| -------------- | -------------------- | ------- | ----------------------------------------------- | ------- | -------------------------------------------------------- |
| `citation-cff` | Citation File Format | current | CFF 1.2.0 (commit 396f738, released 2021-08-09) |         | Schema version 1.2.0; files declare it in `cff-version`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Files written for CFF 1.0.3 and 1.1.0 use older schemas; the `cff-version` key says which one a file follows. Write `cff-version: 1.2.0` for new files.

## Upgrading

From a 1.0.x or 1.1.0 file: set `cff-version` to 1.2.0, make sure the required keys `authors`, `cff-version`, `message` and `title` are present, and validate the file against the 1.2.0 `schema.json`.
