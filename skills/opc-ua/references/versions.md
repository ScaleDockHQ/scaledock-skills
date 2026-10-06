# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line        | Status  | Revision                                                                       | Posture | Summary                                                                         |
| ------------- | ----------- | ------- | ------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------- |
| `opc-ua-1-05` | OPC UA 1.05 | current | Part 2 and Part 3 1.05.06 (2025-10-22), Part 4 and Part 6 1.05.07 (2026-04-15) |         | Current specification set; the Parts carry their own patch versions.            |
| `opc-ua-1-04` | OPC UA 1.04 | legacy  | OPC 10000 v1.04 (online reference)                                             |         | Previous release; read it to upgrade, do not build new applications against it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Each Part has its own 1.05.x patch number. Treat them as one 1.05 line and pin the patch versions in [Sources](../SKILL.md#sources). Security policies, profiles and conformance units are in Part 7 and are not pinned here.

## Upgrading

From 1.04 to 1.05: re-check application instance certificates against Part 6 § 6.2.2 (keyUsage, extendedKeyUsage and basicConstraints), the client nonce length check in Part 4 § 5.6.2.3, and the HostName checks in Part 4 § 5.6.2.1.
