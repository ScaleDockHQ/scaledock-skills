# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line       | Status    | Revision                                                            | Posture | Summary                                                                                                                                         |
| ------------ | ---------- | --------- | ------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `ocpp-2-1`   | OCPP 2.1   | current   | OCPP 2.1 Edition 1 JSON schemas (mobilityhouse/ocpp commit b39291d) |         | Adds messages over 2.0.1, among them SetDERControl, SetDefaultTariff, GetTariffs, NotifySettlement, BatterySwap and the periodic event streams. |
| `ocpp-2-0-1` | OCPP 2.0.1 | supported | OCPP 2.0.1 FINAL JSON schemas (mobilityhouse/ocpp commit b39291d)   |         | Device model (GetVariables, SetVariables), TransactionEvent and SignCertificate.                                                                |
| `ocpp-1-6`   | OCPP 1.6   | supported | OCPP 1.6 JSON schemas (mobilityhouse/ocpp commit b39291d)           |         | Different message set from 2.x: StartTransaction, StopTransaction and RemoteStartTransaction instead of TransactionEvent.                       |
| `ocpp-2-0`   | OCPP 2.0   | legacy    | OCPP 2.0 (2018), replaced by 2.0.1                                  |         | Superseded by 2.0.1; do not implement.                                                                                                          |
| `ocpp-1-5`   | OCPP 1.5   | legacy    | OCPP 1.5 (SOAP)                                                     |         | SOAP-only predecessor; read it only to migrate.                                                                                                 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

OCPP 2.x and 1.6 are separate message sets: the 1.6 schemas have StartTransaction and StopTransaction, the 2.x schemas have TransactionEvent. Validate each connection against the schema set of the version it uses.

## Upgrading

1.6 to 2.0.1 or 2.1: replace StartTransaction and StopTransaction with TransactionEvent, using eventType Started, Updated and Ended as the 2.0.1 schema requires, and move configuration to SetVariables and GetVariables. 2.0.1 to 2.1: validate against the 2.1 schemas and add the new messages only where the other side supports them.
