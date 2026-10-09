# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line                     | Status  | Revision                           | Posture | Summary                                                                                                                                                            |
| -------------------- | ------------------------ | ------- | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `proactive-controls` | OWASP Proactive Controls | current | Tag v4.0.0 (2024-10-20), 2024 list |         | The 2024 list: ten controls, C1 to C10, each with a description, threats, implementation practices and the vulnerabilities it prevents. It replaces the 2018 list. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The project publishes the list as one Markdown page per control under `docs/the-top-10/`. The 2018 list is superseded and is not covered here. Pin the release tag in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
