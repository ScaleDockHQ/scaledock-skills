# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line  | Status  | Revision                                      | Posture | Summary                                                                        |
| ------- | ----- | ------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `s2c2f` | S2C2F | current | Version 1.1, commit d0f0a7fbbc6c (2025-05-26) |         | Version 1.1 of the framework: 8 practices, 25 requirements, 4 maturity levels. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The framework's change record lists 1.0 (2022-08-01) and 1.1 (2022-10-19). Later edits on the main branch, such as the 2024 changes to SCA-5 and UPD-3, did not change the version number, so this skill pins the repository commit rather than the older `v1.1` tag. See [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
