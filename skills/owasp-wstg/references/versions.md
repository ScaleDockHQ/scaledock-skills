# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line       | Status  | Revision              | Posture | Summary                                                                                                                                                                                                                          |
| ------ | ---------- | ------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wstg` | OWASP WSTG | current | Tag v4.2 (2020-12-03) |         | WSTG 4.2, the stable release: tests grouped by category (INFO, CONF, IDNT, ATHN, ATHZ, SESS, INPV, ERRH, CRYP, BUSL, CLNT, APIT), each with an id such as WSTG-INPV-05, a summary, test objectives, how to test and remediation. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The website's `stable` guide is release 4.2. The repository's default branch carries the unreleased next version; its test ids can change, so do not cite them as stable. Pin the release tag in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
