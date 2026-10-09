# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line               | Status  | Revision                         | Posture | Summary                                                                                                       |
| ------------- | ------------------ | ------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `cicd-top-10` | OWASP CI/CD Top 10 | current | Commit 74b2c790d551 (2025-11-03) |         | The first and only edition: ten risks, CICD-SEC-1 to CICD-SEC-10, each with a definition and recommendations. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The project publishes the list as one Markdown page per risk and does not number editions. Pin the repository commit in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
