# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                       | Line                   | Status  | Revision                                 | Posture | Summary                                                                               |
| ------------------------ | ---------------------- | ------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| `peppol-bis-billing-3.0` | Peppol BIS Billing 3.0 | current | Peppol BIS Billing 3.0, May 2026 release |         | Current BIS; OpenPeppol updates its rules and code lists in scheduled 3.0.x releases. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

OpenPeppol keeps BIS Billing at 3.0 and publishes scheduled releases (named by month) that change rules and code lists. Re-read the BIS document and its section 16 rules on each release, and validate with the matching Schematron.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
