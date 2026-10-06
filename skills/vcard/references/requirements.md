# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 6350 vCard Format Specification

Source: https://www.rfc-editor.org/rfc/rfc6350.html

- **document.** Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** SHOULD be folded to a maximum width of 75 octets, excluding the line break.
- **document.** Multi-octet characters MUST remain contiguous.
- **document.** The folded line MUST contain at least one character.
- **document.** For this reason, implementations SHOULD unfold lines in such a way as to properly restore the original sequence.
- **document.** vcard-entity = 1*vcard vcard = "BEGIN:VCARD" CRLF "VERSION:4.0" CRLF 1*contentline "END:VCARD" CRLF ; A vCard object MUST include the VERSION and FN properties.
- **document.** ; VERSION MUST come immediately after BEGIN:VCARD.
- **document.** ; When generating a content line, lines longer than 75 ; characters SHOULD be folded according to the folding ; procedure described in Section 3.2 .

## RFC 7095 jCard: The JSON Format for vCard

Source: https://www.rfc-editor.org/rfc/rfc7095.html

- **document.** Conventions Used in This Document The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** When converting from vCard to jCard, first vCard lines MUST be unfolded.
- **document.** Afterwards, any vCard escaping MUST be unescaped.
- **document.** Finally, JSON escaping (e.g., for control characters) MUST be applied.
- **document.** Afterwards, vCard escaping MUST be applied.
- **document.** Finally, long lines SHOULD be folded as described in [ RFC6350 ].
- **document.** Although [ RFC6350 ] defines BEGIN and END to be properties, they MUST NOT appear as properties of the jCard.
- **document.** When converting from jCard to vCard, the BEGIN and END properties MUST be added to enclose the properties of the jCard object.

## RFC 9553 JSContact: A JSON Representation of Contact Data

Source: https://www.rfc-editor.org/rfc/rfc9553.html

This specification defines a data model and JavaScript Object Notation (JSON) representation of contact card information that can be used for data storage and exchange in address book or directory applications. It aims to be an alternative to the vCard data format and to be unambiguous, extendable, and simple to process. In contrast to the JSON-based jCard format, it is not a direct mapping from the vCard data model and expands semantics where appropriate. Two additional specifications define new vCard elements and how to convert between JSContact and vCard. ¶

- **abstract.** This specification defines a data model and JavaScript Object Notation (JSON) representation of contact card information that can be used for data storage and exchange in address book or directory applications. It aims to be an alternative to the vCard data format and to be unambiguous, extendable, and simple to process. In contrast to the JSON-based jCard format, it is not a direct mapping from the vCard data model and expands semantics where appropriate. Two additional specifications define new vCard elements and how to convert between JSContact and vCard. ¶
