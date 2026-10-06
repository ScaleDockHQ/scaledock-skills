# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line             | Status  | Revision                  | Posture | Summary                                                                         |
| ------------------ | ---------------- | ------- | ------------------------- | ------- | ------------------------------------------------------------------------------- |
| `tr-03183-1-1-0-0` | TR-03183-1 1.0.0 | current | Version 1.0.0, 2025-07-31 |         | General requirements and the risk-assessment controls (RH_RA).                  |
| `tr-03183-2-2-1-0` | TR-03183-2 2.1.0 | current | Version 2.1.0, 2025-08-20 |         | SBOM in CycloneDX 1.6+ or SPDX 3.0.1+, required and additional data fields.     |
| `tr-03183-2-2-0-0` | TR-03183-2 2.0.0 | legacy  | Version 2.0.0, 2024-09-20 |         | Earlier SBOM line; § 7 allows it only for six months after 2.1.0.               |
| `tr-03183-2-1-1`   | TR-03183-2 1.1   | legacy  | Version 1.1, 2023-11-28   |         | First English SBOM text.                                                        |
| `tr-03183-3-1-0-0` | TR-03183-3 1.0.0 | current | Version 1.0.0, 2025-08-20 |         | security.txt, PSIRT and CSIRT roles, CVD policy, response times and disclosure. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Each Part is versioned on its own, so each has its own current line (family `part-1`, `part-2`, `part-3`).

The BSI download page also links a file named `BSI-TR-03183-2_v2_2_0.pdf`, but on 2026-10-06 that URL served the version 1.1 text. This skill pins Part 2 at 2.1.0, the newest text that could be read. Re-check that link when refreshing: Part 2 § 7 requires the most recent version, and allows the one before it only for six months.

## Upgrading

- **Part 2, 1.1 or 2.0.0 to 2.1.0:** regenerate the SBOM in CycloneDX 1.6 or later or SPDX 3.0.1 or later, check every required data field in § 5.2.1 and § 5.2.2, and express licences as SPDX identifiers or expressions per § 6.1.
- **Parts 1 and 3:** 1.0.0 is the first published version. Earlier 0.9.0 and 0.10.0 drafts are superseded; do not author against them.
