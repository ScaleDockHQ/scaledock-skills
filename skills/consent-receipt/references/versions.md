# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                      | Line                  | Status  | Revision                                        | Posture | Summary                                                                               |
| ----------------------- | --------------------- | ------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| `consent-receipt-1-1-0` | Consent Receipt 1.1.0 | current | Consent Receipt Specification 1.1.0, 2018-02-20 |         | Field set, JSON schema (draft-04) and presentation rules; version value KI-CR-v1.1.0. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Kantara has published no later revision of this specification. A receipt's `version` field names the line it was written for; this skill only produces `KI-CR-v1.1.0`.

## Upgrading

This skill has one published line. A receipt with another `version` value is outside this skill: read it, but issue new receipts as KI-CR-v1.1.0.
