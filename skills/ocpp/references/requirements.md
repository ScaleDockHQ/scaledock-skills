# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## OCPP 2.0.1 schemas

Source: https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v201/schemas/TransactionEventRequest.json

- **BootNotificationResponse `interval`.** When <<cmn_registrationstatusenumtype,Status>> is Accepted, this contains the heartbeat interval in seconds. If the CSMS returns something other than Accepted, the value of the interval field indicates the minimum wait time before sending a next BootNotification request.
- **BootNotificationResponse `StatusInfoType.reasonCode`.** A predefined code for the reason why the status is returned in this response. The string is case-insensitive.
- **TransactionEventRequest `TransactionEventEnumType`.** The first TransactionEvent of a transaction SHALL contain: "Started" The last TransactionEvent of a transaction SHALL contain: "Ended" All others SHALL contain: "Updated"
- **TransactionEventRequest `seqNo`.** Incremental sequence number, helps with determining if all messages of a transaction have been received.
- **TransactionEventRequest `offline`.** Indication that this transaction event happened when the Charging Station was offline.
- **TransactionEventRequest `numberOfPhasesUsed`.** If the Charging Station is able to report the number of phases used, then it SHALL provide it.
- **TransactionEventRequest `UnitOfMeasureType.unit`.** This field SHALL use a value from the list Standardized Units of Measurements in Part 2 Appendices.
- **TransactionEventRequest `ReasonEnumType`.** This contains the reason why the transaction was stopped. MAY only be omitted when Reason is "Local".
- **RequestStartTransactionRequest `evseId`.** Number of the EVSE on which to start the transaction. EvseId SHALL be > 0
- **SetChargingProfileRequest `ChargingProfileType.transactionId`.** SHALL only be included if ChargingProfilePurpose is set to TxProfile.
- **SetVariablesRequest `VariableType.name`.** Name of the variable. Name should be taken from the list of standardized variable names whenever possible. Case Insensitive. strongly advised to use Camel Case.
- **SignCertificateRequest `csr`.** The Charging Station SHALL send the public key in form of a Certificate Signing Request (CSR) as described in RFC 2986 [22] and then PEM encoded, using the <<signcertificaterequest,SignCertificateRequest>> message.

## OCPP 2.1 schemas

Source: https://raw.githubusercontent.com/mobilityhouse/ocpp/b39291d6ae769649062ec73fcb5e471b8eaed51c/ocpp/v21/schemas/TransactionEventRequest.json

- **TransactionEventRequest `PriceType`.** Price with and without tax. At least one of _exclTax_, _inclTax_ must be present.
- **TransactionEventRequest `UnitOfMeasureType.multiplier`.** The _multiplier_ only multiplies the value of the measurand. It does not specify a conversion between units
