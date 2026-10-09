# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line  | Status  | Revision                                              | Posture | Summary                                                         |
| ------- | ----- | ------- | ----------------------------------------------------- | ------- | --------------------------------------------------------------- |
| `json5` | JSON5 | current | Version 1.0.0 (json5-spec commit d77331d, 2023-05-15) |         | JSON5 1.0.0, a superset of JSON based on ECMAScript 5.1 syntax. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

JSON5 1.0.0 is the only published version; the repository keeps a 0.5.0 draft tag that predates it. The specification text is normative except for examples and notes, and its RFC 2119 key words are written in lower case.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
