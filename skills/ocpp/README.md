# ocpp

An agent skill for OCPP (Open Charge Point Protocol): building OCPP charging stations and CSMSs.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ocpp
```

Then ask your agent to apply OCPP (Open Charge Point Protocol).

## What it covers

- The Open Charge Point Protocol from the Open Charge Alliance (OCA) carries JSON messages over WebSocket between a Charging Station and a Charging Station Management System (CSMS). This skill reads the JSON schemas that ship with each OCPP release and quotes their normative descriptions.
- The Open Charge Alliance hands out the OCPP specification only after registration. This skill pins only the JSON schemas, taken at a fixed commit from the MIT-licensed `mobilityhouse/ocpp` library, which ships the OCA schema files unchanged (OCPP 2.1 schemas carry the OCA's CC BY-ND 4.0 notice). Use cases, sequence rules, the OCPP-J RPC framework and security profiles live in the OCA documents and are out of scope.

## Versions

| Line       | Status    |
| ---------- | --------- |
| OCPP 2.1   | current   |
| OCPP 2.0.1 | supported |
| OCPP 1.6   | supported |
| OCPP 2.0   | legacy    |
| OCPP 1.5   | legacy    |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCPP 2.1 TransactionEventRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v21/schemas/TransactionEventRequest.json): OCA OCPP 2.1 Edition 1 schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 BootNotificationResponse.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/BootNotificationResponse.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 TransactionEventRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/TransactionEventRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 RequestStartTransactionRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/RequestStartTransactionRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 SetChargingProfileRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SetChargingProfileRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 SetVariablesRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SetVariablesRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 2.0.1 SignCertificateRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SignCertificateRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.
- [OCPP 1.6 BootNotification.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v16/schemas/BootNotification.json): OCA OCPP 1.6 JSON schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04.

## License

MIT
