# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                          | Line                        | Status  | Revision              | Posture | Summary                                                                     |
| --------------------------- | --------------------------- | ------- | --------------------- | ------- | --------------------------------------------------------------------------- |
| `gaia-x-architecture-3-1`   | Architecture Document 3.1   | current | tag 3.1, 2026-07-06   |         | Trust Framework, Trust Protocol and technical compatibility.                |
| `gaia-x-architecture-25-11` | Architecture Document 25.11 | legacy  | tag 25.11, 2025-11-11 |         | Release before the switch to 3.x numbering.                                 |
| `gaia-x-icam-25-11`         | ICAM 25.11                  | current | tag 25.11, 2025-11-11 |         | Gaia-X Credential format (VC 2.0, VC-JWT) and digital identities.           |
| `gaia-x-compliance-4-0-0`   | Compliance Document 4.0.0   | current | tag 4.0.0, 2026-09-28 |         | Compliance criteria, Trust Anchors, CAB approval and conformity assessment. |
| `gaia-x-compliance-3-1-0`   | Compliance Document 3.1.0   | legacy  | tag 3.1.0, 2026-07-09 |         | Previous criteria release.                                                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The three documents are released separately, so each has its own current line (families `architecture`, `icam`, `compliance`). Use the Compliance Document release that the Gaia-X Digital Clearing House you target says it runs.

## Upgrading

- **Architecture Document 25.11 to 3.1, or Compliance Document 3.1.0 to 4.0.0:** re-read the pinned tag, regenerate credentials against the current Gaia-X shapes in the Registry, and re-run them through a GXDCH compliance service before relying on the new label.
