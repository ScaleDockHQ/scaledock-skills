# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences the extractor found (shall or must). Apply the ones that match the role. Section headings are the nearest article, section or clause marker in the published document.

## Dataspace Protocol 2025-1

Source: https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/

- **Status of this document.** This version (2025-1) of the Dataspace Protocol specification is a release of the specification and considered to be stable. Further changes shall not affect conformity.

## Scope

Source: https://raw.githubusercontent.com/eclipse-dataspace-protocol-base/DataspaceProtocol/2025-1/specifications/common/scope.md

- **Scope.** This document specifies how Datasets are advertised via Catalogs.
- **Scope.** This document specifies how data usage requirements are expressed as Policies.
- **Scope.** This document specifies how Agreements that govern data usage are syntactically expressed and electronically negotiated during a Contract Negotiation.
- **Scope.** This document specifies how Datasets are accessed using Transfer Process Protocols.
- **Scope.** This document does not apply to the Data Transfer Protocol.

## Catalog protocol

Source: https://raw.githubusercontent.com/eclipse-dataspace-protocol-base/DataspaceProtocol/2025-1/specifications/catalog/catalog.protocol.md

Dataspace Protocol 2025-1, a stable release published 12 August 2025. The scope says it specifies how datasets are advertised in catalogs, how usage requirements are expressed as policies, how agreements are negotiated, and how datasets are accessed. It does not apply to the data transfer protocol.

- **text.** The [=Catalog Service=] MUST respond with a [Catalog](#ack-catalog) that adheres to the schema linked above.
- **text.** The [=Catalog Service=] MUST respond with a [Dataset](#ack-dataset) that adheres to the schema linked above.
- **text.** (_NOTE: Since a Catalog may be dynamically generated for a request based on the requesting [=Participant=]'s credentials, it is possible for it to contain 0 matching [=Datasets=]._) - A [=Catalog=] MUST have one to many [=Data Services=] that reference a [=Connector=] where [=Datasets=] MAY be obtained.
- **text.** Each `DataService` object MUST have at least one `DataService` which specifies where the distribution is obtained.
- **text.** The endpoint's [=Dataspace Protocol=] version MUST be consistent with the version the `Catalog` object was served through.
- **text.** An [=Offer=] MUST be unique to a [=Dataset=] since the target of the [=Offer=] is derived from its enclosing context.

## Contract negotiation protocol

Source: https://raw.githubusercontent.com/eclipse-dataspace-protocol-base/DataspaceProtocol/2025-1/specifications/negotiation/contract.negotiation.protocol.md

Dataspace Protocol 2025-1, a stable release published 12 August 2025. The scope says it specifies how datasets are advertised in catalogs, how usage requirements are expressed as policies, how agreements are negotiated, and how datasets are accessed. It does not apply to the data transfer protocol.

- **text.** In case the states differ, the [=Contract Negotiation=] MUST be terminated and a new [=Contract Negotiation=] MAY be initiated.
- **text.** If the message includes a `providerPid` property, the request MUST be associated with an existing [=Contract Negotiation=] and a [=Consumer=] [=Offer=] MUST be created using either the `offer` or `offer.@id` properties.
- **text.** Different to a [=Catalog=] or [=Dataset=], the [=Offer=] inside a [Contract Request Message](#contract-request-message) MUST have a `target` attribute.
- **text.** Different to a [=Dataset=], the [=Offer=] inside a [Contract Offer Message](#contract-offer-message) MUST have a `target` attribute.
- **text.** An [=Agreement=] MUST contain a `timestamp` property defined as an [XSD DateTime](https://www.w3schools.com/XML/schema_dtypes_date.asp) type.
- **text.** When the message is sent by a [=Consumer=] with an `eventType` set to `ACCEPTED`, the state machine MUST be placed in the `ACCEPTED` state.

## Transfer process protocol

Source: https://raw.githubusercontent.com/eclipse-dataspace-protocol-base/DataspaceProtocol/2025-1/specifications/transfer/transfer.process.protocol.md

Dataspace Protocol 2025-1, a stable release published 12 August 2025. The scope says it specifies how datasets are advertised in catalogs, how usage requirements are expressed as policies, how agreements are negotiated, and how datasets are accessed. It does not apply to the data transfer protocol.

- **text.** The `consumerPid` property MUST refer to the transfer identifier of the [=Consumer=] side.
- **text.** The `agreementId` property MUST refer to an existing [=Agreement=] between the [=Consumer=] and [=Provider=].
- **text.** The `dataAddress` MUST contain a transport-specific set of properties for pushing the data.
- **text.** `callbackAddress` MUST be a URI indicating where messages to the [=Consumer=] should be sent.
- **text.** Once a [=Transfer Process=] has been created, all associated callback messages MUST include a `consumerPid` and `providerPid`.
- **text.** [=Providers=] MUST include a `consumerPid` and a `providerPid` property in the object.

## Common protocol

Source: https://raw.githubusercontent.com/eclipse-dataspace-protocol-base/DataspaceProtocol/2025-1/specifications/common/common.protocol.md

Dataspace Protocol 2025-1, a stable release published 12 August 2025. The scope says it specifies how datasets are advertised in catalogs, how usage requirements are expressed as policies, how agreements are negotiated, and how datasets are accessed. It does not apply to the data transfer protocol.

- **text.** Each [=Connector=] MUST provide a version metadata endpoint ending with Uniform Resource Identifier (URI) segments `/.well-known/dspace-version`.
- **1.1.** A [=Connector=] MUST respond to a respective HTTPS request by returning a [`VersionResponse`](#VersionResponse-table) with at least one item.
- **text.** <p data-include="message/table/auth.html" data-include-format="html"> </p> This data object MUST comply to the [JSON schema](message/schema/protocol-version-schema.json).
- **text.** If the [=Connector=] cannot identify a matching [=Dataspace Protocol=] version, it MUST terminate the communication.
- **text.** In this case, the Participant MUST add at least one entry to the DID document's `service` array adhering to the corresponding [JSON schema](message/schema/did-service-schema.json).
