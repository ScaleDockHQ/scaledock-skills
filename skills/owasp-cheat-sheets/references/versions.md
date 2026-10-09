# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id             | Line                     | Status  | Revision                         | Posture | Summary                                                                                                                            |
| -------------- | ------------------------ | ------- | -------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `cheat-sheets` | OWASP Cheat Sheet Series | current | Commit 29994dd8a2e6 (2026-10-06) |         | The series is edited continuously and has no numbered editions; the pinned commit fixes the text of every cheat sheet quoted here. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The Cheat Sheet Series has no editions or version numbers: each cheat sheet changes by pull request. Pin the repository commit in [Sources](../SKILL.md#sources) and re-read the cheat sheets when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
