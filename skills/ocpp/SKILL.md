---
name: ocpp
description: >-
  OCPP: build and validate Open Charge Point Protocol messages between a charging station and a CSMS from the published JSON schemas. Covers OCPP 2.1 Edition 1 (current), 2.0.1 and 1.6 (supported), with 2.0 and 1.5 as legacy; only the JSON message schemas are pinned, not the use cases in Part 2. Use when writing or reviewing an OCPP-J charging station, a CSMS or a test harness: BootNotification, Heartbeat, Authorize, TransactionEvent, MeterValues, SetVariables, SetChargingProfile or SignCertificate payloads. Triggers: OCPP, OCPP-J, OCPP 2.0.1, OCPP 2.1, OCPP 1.6, CSMS, charge point, EV charging protocol, TransactionEvent.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OCPP (Open Charge Point Protocol)

The Open Charge Point Protocol from the Open Charge Alliance (OCA) carries JSON messages over WebSocket between a Charging Station and a Charging Station Management System (CSMS). This skill reads the JSON schemas that ship with each OCPP release and quotes their normative descriptions.

**Scope.** The Open Charge Alliance hands out the OCPP specification only after registration. This skill pins only the JSON schemas, taken at a fixed commit from the MIT-licensed `mobilityhouse/ocpp` library, which ships the OCA schema files unchanged (OCPP 2.1 schemas carry the OCA's CC BY-ND 4.0 notice). Use cases, sequence rules, the OCPP-J RPC framework and security profiles live in the OCA documents and are out of scope.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Charging Station (charge point) firmware, CSMS (central system), or a test tool for either.
- Target version: OCPP 2.1 (current); OCPP 2.0.1 (supported); OCPP 1.6 (supported); OCPP 2.0 (legacy); OCPP 1.5 (legacy). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **BootNotificationResponse `interval`.** "When <<cmn_registrationstatusenumtype,Status>> is Accepted, this contains the heartbeat interval in seconds. If the CSMS returns something other than Accepted, the value of the interval field indicates the minimum wait time before sending a next BootNotification request."
2. **TransactionEventRequest `TransactionEventEnumType`.** "The first TransactionEvent of a transaction SHALL contain: "Started" The last TransactionEvent of a transaction SHALL contain: "Ended" All others SHALL contain: "Updated""
3. **TransactionEventRequest `seqNo`.** "Incremental sequence number, helps with determining if all messages of a transaction have been received."
4. **TransactionEventRequest `UnitOfMeasureType.unit`.** "This field SHALL use a value from the list Standardized Units of Measurements in Part 2 Appendices."
5. **RequestStartTransactionRequest `evseId`.** "Number of the EVSE on which to start the transaction. EvseId SHALL be > 0"
6. **SetChargingProfileRequest `ChargingProfileType.transactionId`.** "SHALL only be included if ChargingProfilePurpose is set to TxProfile."
7. **SignCertificateRequest `csr`.** "The Charging Station SHALL send the public key in form of a Certificate Signing Request (CSR) as described in RFC 2986 [22] and then PEM encoded, using the <<signcertificaterequest,SignCertificateRequest>> message."
8. **TransactionEventRequest `PriceType`.** "Price with and without tax. At least one of _exclTax_, _inclTax_ must be present."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Every outgoing and incoming payload validates against the JSON schema of the negotiated OCPP version before it is sent or acted on.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `websocket`, `json-schema`, `ocpi`, `x509-pkix`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OCPP 2.1 TransactionEventRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v21/schemas/TransactionEventRequest.json): OCA OCPP 2.1 Edition 1 schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 BootNotificationResponse.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/BootNotificationResponse.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 TransactionEventRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/TransactionEventRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 RequestStartTransactionRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/RequestStartTransactionRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 SetChargingProfileRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SetChargingProfileRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 SetVariablesRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SetVariablesRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 2.0.1 SignCertificateRequest.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/SignCertificateRequest.json): OCA OCPP 2.0.1 FINAL schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
- [OCPP 1.6 BootNotification.json](https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v16/schemas/BootNotification.json): OCA OCPP 1.6 JSON schema, library copy, mobilityhouse/ocpp commit b39291d, 2026-10-04, checked 2026-10-06.
