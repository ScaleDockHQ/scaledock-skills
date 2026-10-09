# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line         | Status  | Revision                                    | Posture | Summary                                                                                       |
| ------------- | ------------ | ------- | ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `attack-19.2` | ATT&CK v19.2 | current | Tag v19.2, commit 6cda5ad8462c (2026-08-05) |         | Current release of the Enterprise, Mobile and ICS domains, published as STIX 2.1 collections. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

ATT&CK publishes a major version roughly twice a year and minor versions in between. The version history page lists the v19 line as current from April 28, 2026; the v19.2 STIX bundles in attack-stix-data are dated August 5, 2026. Cite the version (for example `enterprise-attack-19.2.json`), because technique ids, names and relationships change between versions, and objects are deprecated or revoked rather than deleted.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
