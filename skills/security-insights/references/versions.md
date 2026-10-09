# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                    | Line                  | Status  | Revision                    | Posture | Summary                                                                                                                                                                |
| --------------------- | --------------------- | ------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `security-insights`   | Security Insights     | current | Release v2.2.0 (2026-01-31) |         | Schema 2.x: `header`, `project` and `repository` objects, a `security-insights.yml` file, and inheritance through `header.project-si-source`.                          |
| `security-insights-1` | Security Insights 1.0 | legacy  | Release v1.0.0 (2023-10-02) |         | Schema 1.0.0: a `SECURITY-INSIGHTS.yml` file with a header and sections such as project lifecycle, contribution policy, security contacts and vulnerability reporting. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Releases are tags of the `ossf/security-insights` repository. The README states that differences between the latest release and the main branch are non-authoritative previews of the next release, so pin a tag, not `main`. The 2.x file is named `security-insights.yml`; the 1.0.0 file was named `SECURITY-INSIGHTS.yml`.

## Upgrading

From 1.0.0 to 2.x: rename the file to `security-insights.yml`, set `header.schema-version` to the 2.x version, and rewrite the content against the 2.2.0 schema's `header`, `project` and `repository` objects. Field names and nesting changed between the major versions, so rebuild the file from the 2.x schema instead of renaming fields one by one.
