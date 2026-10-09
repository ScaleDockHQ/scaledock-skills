# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                          | Status  | Revision                            | Posture | Summary                                                                                                                                                    |
| ----------------- | ----------------------------- | ------- | ----------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rest-guidelines` | Microsoft REST API Guidelines | current | vNext at commit a7022a2, 2026-08-05 |         | Living guidelines with no release numbers: the Azure and Microsoft Graph documents on the vNext branch. The original combined Guidelines.md is deprecated. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The guidelines have no numbered releases; the Azure document keeps a dated change history at its top. Pin the vNext commit in [Sources](../SKILL.md#sources). Pick the Azure document for Azure services and the Graph document for Microsoft Graph workloads; the older combined Guidelines.md is deprecated and is not a target.

## Upgrading

From the deprecated combined Guidelines.md: move to the Azure or the Microsoft Graph document, whichever matches the service, and re-check the rules quoted in [`requirements.md`](requirements.md), in particular API versioning (Azure § API Versioning) and the error model (Graph § Error handling).
