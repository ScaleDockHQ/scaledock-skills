# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## KMIP 3.0

Source: https://docs.oasis-open.org/kmip/kmip-spec/v3.0/kmip-spec-v3.0.html

https://docs.oasis-open.org/kmip/kmip-spec/v3.0/csd02/kmip-spec-v3.0-csd02.docx (Authoritative)

- **1.2 Terminology.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [ RFC2119 ].
- **2.** All objects within the key management system SHALL have a minimum set of attributes.
- **2.** Attribute REQUIRED Unique Identifier Yes Short Unique Identifier Yes Object Class Yes Object Type Yes Initial Date Yes Table SEQ Table \* ARABIC 2 : Minimum required Object attributes
- **2.1 System Objects.** All System Objects SHALL have an Object Class of System.
- **2.1 System Objects.** Special authentication and authorization SHOULD be enforced when creating or destroying System Objects or when setting, modifying or deleting attributes of System Objects.
- **2.1.1 User.** Attribute REQUIRED Unique Identifier Yes Short Unique Identifier Yes Object Class Yes Object Type Yes Initial Date Yes Name Yes Credential Link Yes Table SEQ Table \* ARABIC 3 : Required User Aattributes
- **2.1.2 Group.** Attribute REQUIRED Unique Identifier Yes Short Unique Identifier Yes Object Class Yes Object Type Yes Initial Date Yes Name Yes Table SEQ Table \* ARABIC 4 : Required Group Attributes
- **2.1.3.1 Password Credential.** · The Salted Password and Password Salt Algorithm combined with the optional Password Salt provides an algorithm-based comparison mechanism One of the above methods SHALL be specified.
