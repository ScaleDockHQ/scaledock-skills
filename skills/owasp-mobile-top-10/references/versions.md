# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line                | Status  | Revision                                    | Posture | Summary                                                                                                                             |
| --------------- | ------------------- | ------- | ------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `mobile-top-10` | OWASP Mobile Top 10 | current | Commit f2dc2d6607f3 (2025-10-08), 2023 list |         | The 2023 list: ten risks, M1 to M10, each with threat agents, weakness, impacts and prevention guidance. It replaces the 2016 list. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The project keeps the 2023 list as one Markdown page per risk under `2023-risks/`. The 2016 list is superseded and is not covered here. Pin the repository commit in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
