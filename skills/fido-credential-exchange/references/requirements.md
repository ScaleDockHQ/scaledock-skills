# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Credential Exchange Format 1.0

Source: https://fidoalliance.org/specs/cx/cxf-v1.0-ps-errata-20260309.html

This document defines the data structures and format of credentials being passed or referenced between two applications during credential exchange.

- **1.3. Terminology.** The exporting provider MUST ensure the data is transferred securely by either encrypting it themselves or by relying on an orchestrator’s security guarantees, see more information in section § 5.1 Orchestrating Party Requirements .
- **1.3. Terminology.** Identifiers MUST be unique for a given exchanged Account and have a maximum of 64 bytes in length.
- **1.3. Terminology.** Identifiers SHOULD NOT have any personally identifying information contained as they will be shared in clear text during any given [CXP] exchange sessions.
- **1.3. Terminology.** An identifier for a given entity SHOULD be the same across different creations of a CXF document.
- **1.3. Terminology.** This transfer protocol MUST ensure confidentiality between the providers following the § 5.1 Orchestrating Party Requirements .
- **1.3. Terminology.** The preferred transfer protocol SHOULD be [CXP] .
- **2.1. Encoding Considerations.** Conforming participants MUST support encoding the types defined in this format to [JSON] .
- **2.1.1. Enumerations as recommended.** Should the importing provider encounter an unknown enumeration value, the importing provider SHOULD follow these RECOMMENDATIONS: If the field member holding the unknown enumeration is OPTIONAL, the field member SHOULD be ignored as though the field was not provided at all.

## Credential Exchange Protocol 1.0

Source: https://fidoalliance.org/specs/cx/cxp-v1.0-wd-20241003.html

This document defines a protocol to securely move one or more credentials between two credential providing applications same or separate devices. WORKING DRAFT

- **3.1. Credential Types.** The exported credentials MUST be formatted using [CXF] in order to have interoporability.
- **3.2. Export Request.** These encryption parameters MUST have an associated public key if it is necessary for that instance of given parameters.
- **3.2. Export Request.** The version MUST correspond to a published level of the CXP standard.
- **3.2. Export Request.** The values of this list SHOULD be members of Archive Algorithm and the Exporting Provider MUST ignore any unknown values.
- **3.2. Export Request.** This list SHOULD be validated by the user before initiating the exchange.
- **3.2. Export Request.** The values in the list SHOULD be members of CredentialType and the Exporting Provider MUST ignore any unknown values.
- **3.2. Export Request.** If this member is present but the list is empty, the Exporting Provider MUST send only the Account object without any Collection information.
- **3.2. Export Request.** This list SHOULD be members of name defined in [CXF] and the Exporting Provider MUST ignore all unknown values.
