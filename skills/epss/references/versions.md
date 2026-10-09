# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line | Status  | Revision                                           | Posture | Summary                                                                           |
| ------ | ---- | ------- | -------------------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `epss` | EPSS | current | EPSS v5 (v2026.06.15), publishing since 2026-06-15 |         | The daily EPSS score and percentile for every scored CVE, from the current model. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

EPSS publishes one score feed and replaces the model in place. Model versions so far: v1 (scores from 2021-04-14), v2 (v2022.01.01), v3 (v2023.03.01), v4 (v2025.03.14) and v5 (v2026.06.15, publishing since 2026-06-15). Scores from different model versions are not comparable; the daily CSV header comment names the model version. The FIRST pages are not versioned, so record the model version and the date you read them.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
