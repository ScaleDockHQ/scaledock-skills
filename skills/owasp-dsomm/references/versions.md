# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line        | Status  | Revision                    | Posture | Summary                                                                                                                        |
| ------- | ----------- | ------- | --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `dsomm` | OWASP DSOMM | current | Release v5.1.0 (2026-09-21) |         | Model data release 5.1.0: activities by dimension and sub-dimension, levels 1 to 5, each with a description, risk and measure. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The model content is released as tags of the `DevSecOps-MaturityModel-data` repository; the DSOMM web application renders the same YAML. Pin the data tag in [Sources](../SKILL.md#sources). Activity names, levels and their `samm2` and ISO 27001 cross-references can change between data releases, so re-read the pinned YAML when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
