# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line                             | Status  | Revision                    | Posture | Summary                                                                                                                                                                      |
| -------------------- | -------------------------------- | ------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notation-signature` | Notation signature specification | current | Release v1.1.0 (2024-08-13) |         | The 1.1.0 specification set: signature envelope and manifest, certificate requirements, trust store and trust policy version 1.0, and the signing and verification workflow. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The specifications repository releases its documents together under one tag, and the trust policy document carries its own `version` property (`1.0`). Pin the release tag in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
