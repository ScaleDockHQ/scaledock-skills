# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line       | Status  | Revision                                                      | Posture | Summary                                                                          |
| ------------------ | ---------- | ------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `oasf-1.1.0`       | OASF 1.1.0 | current | Tag v1.1.0 (commit f510be0, 2026-07-10), schema version 1.1.0 |         | Released schema; records with skills, domains and modules.                       |
| `oasf-1.2-preview` | OASF 1.2   | preview | main at commit a2c7e16 (2026-10-06), schema version 1.2.0-dev | track   | Development line on main; read it to anticipate the next schema, do not emit it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

OASF does not follow semantic versioning: the major and minor version track the schema, and the patch version covers server and API changes only (see the changelog on main). Server-only patch releases on the 1.1 line, such as v1.1.1, do not change the 1.1.0 schema. The OASF schema server and its MCP server are tooling and are not pinned here.

## Upgrading

From 1.1.0 to the 1.2 development line: compare `schema/version.json` and the changelog's Unreleased section on main, then re-validate records against the target schema version. Do not set `schema_version` to a `-dev` value in published records.
