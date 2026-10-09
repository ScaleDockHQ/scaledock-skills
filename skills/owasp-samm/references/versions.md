# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line       | Status  | Revision                    | Posture | Summary                                                                                                          |
| ------ | ---------- | ------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `samm` | OWASP SAMM | current | Release v2.2.0 (2026-07-06) |         | SAMM v2 core model: 5 business functions, 15 security practices, 2 streams per practice, maturity levels 1 to 3. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

SAMM v2 releases are versioned as tags of the `owaspsamm/core` model repository; pin the tag in [Sources](../SKILL.md#sources). SAMM 1.x (2009 to 2017) used a different practice structure and is not covered here. Activity ids read as practice, level and stream: `G-SM-1-A` is Strategy and Metrics, level 1, stream A.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
