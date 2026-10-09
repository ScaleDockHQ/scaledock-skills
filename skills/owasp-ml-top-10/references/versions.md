# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line            | Status  | Revision                                       | Posture | Summary                                                                                                                                   |
| ----------- | --------------- | ------- | ---------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ml-top-10` | OWASP ML Top 10 | current | 2023 edition, Commit b3addcd63769 (2026-09-30) |         | The 2023 edition: ten risks, ML01:2023 to ML10:2023, each with a description, How to Prevent controls, risk factors and attack scenarios. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The project has published one edition, labelled 2023 in every risk id. It is maintained as one Markdown page per risk; pin the repository commit in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
