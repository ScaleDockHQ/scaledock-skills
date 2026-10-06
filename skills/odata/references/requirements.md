# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OData 4.01

Source: https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html

https://docs.oasis-open.org/odata/odata/v4.01/os/part1-protocol/odata-v4.01-os-part1-protocol.docx

- **1.1 Terminology.** The key words �MUST�, �MUST NOT�, �REQUIRED�, �SHALL�, �SHALL NOT�, �SHOULD�, �SHOULD NOT�, �RECOMMENDED�, �MAY�, and �OPTIONAL� in this document are to be interpreted as described in [RFC2119] .
- **4.1 Entity-Ids and Entity References.** The entity-id MUST be an IRI as defined in [RFC3987] and MAY be expressed in payloads, headers, and URLs as a relative reference as appropriate.
- **4.1 Entity-Ids and Entity References.** While the client MUST be prepared to accept any IRI, services MUST use valid URIs in this version of the specification since there is currently no lossless representation of an IRI in the EntityId header.
- **5.1 Protocol Versioning.** Services SHOULD advertise supported versions of OData through the Core.ODataVersions term, defined in [OData-VocCore] .
- **5.2 Model.** Services that version their metadata MUST support version-specific requests according to the $schemaversion system query option.
- **5.2 Model.** In particular, clients SHOULD be prepared to receive properties and derived types not previously defined by the service.
- **5.2 Model.** Services SHOULD NOT change their data model depending on the authenticated user.
- **5.2 Model.** If the data model is user or user-group dependent, all changes MUST be safe changes as defined in this section when comparing the full model to the model visible to users with restricted authorizations.

## OData 4.0

Source: https://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html

http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.doc

- **1.1 Terminology.** The key words �MUST�, �MUST NOT�, �REQUIRED�, �SHALL�, �SHALL NOT�, �SHOULD�, �SHOULD NOT�, �RECOMMENDED�, �MAY�, and �OPTIONAL� in this document are to be interpreted as described in [RFC2119] .
- **4.1.** The entity-id MUST be an IRI as defined in [RFC3987] and MAY be expressed in payloads and URLs as a relative reference as appropriate.
- **4.1.** While the client MUST be prepared to accept any IRI, services MUST use valid URIs in this version of the specification since there is currently no lossless representation of an IRI in the OData-EntityId header.
- **5.2 Model Versioning.** Services SHOULD NOT change their data model depending on the authenticated user.
- **5.2 Model Versioning.** If the data model is user or user group dependent, all changes MUST be safe changes as defined in this section when comparing the full model to the model visible to users with restricted authorizations.
- **6.1 Query Option Extensibility.** Services may support additional custom query options not defined in the OData specification, but they MUST NOT begin with the " $ " or " @ " character.
- **6.1 Query Option Extensibility.** OData services SHOULD NOT require any query options to be specified in a request.
- **6.1 Query Option Extensibility.** Services SHOULD fail any request that contains query options that they not understand and MUST fail any request that contains unsupported OData query options defined in the version of this specification supported by the service.
