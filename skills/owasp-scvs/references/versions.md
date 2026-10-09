# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line       | Status  | Revision             | Posture | Summary                                                                                      |
| ------ | ---------- | ------- | -------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `scvs` | OWASP SCVS | current | Tag 1.0 (2020-06-25) |         | SCVS 1.0: six control families, V1 to V6, each requirement assigned to levels L1, L2 and L3. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

SCVS 1.0 is the only release; the repository's `master` branch has not changed the requirements since. Each requirement lists the levels (L1, L2, L3) it applies to; pick the level before assessing. Pin the release tag in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
