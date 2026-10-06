# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CACAO 2.0

Source: https://docs.oasis-open.org/cacao/security-playbooks/v2.0/security-playbooks-v2.0.html

https://docs.oasis-open.org/cacao/security-playbooks/v2.0/cs01/security-playbooks-v2.0-cs01.docx (Authoritative)

- **document.** Key words: The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " NOT RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
- **2.1 Vocabularies.** However, if a similar value is already in the vocabulary, that value MUST be used.
- **2.1 Vocabularies.** A closed vocabulary is effectively an enumeration and MUST be used as defined.
- **2.2 Playbook Creator.** � Entities that re-publish an object from another entity without making any changes to the object, and thus maintaining the original value in the id property, are not considered the object creator and MUST NOT change the created_by property.
- **2.2 Playbook Creator.** An entity that accepts objects and republishes them with modifications, additions, or omissions MUST create a new id and MUST change the created_by property for the object as they are now considered the object creator of the new object for purposes of versioning (see section 2.3 versioning for more information).
- **2.3 Versioning.** The first version of a playbook MUST have the same timestamp for both the created and modified properties.
- **2.3 Versioning.** Implementations MUST consider the version of the playbook with the most recent modified value to be the most recent version of the playbook.
- **2.3 Versioning.** For every new version of a playbook, the modified property MUST be updated to represent the time that the new version was created.
