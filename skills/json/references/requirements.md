# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8259 The JavaScript Object Notation (JSON) Data Interchange Format

Source: https://www.rfc-editor.org/rfc/rfc8259.html

- **document.** Conventions Used in This Document The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Values A JSON value MUST be an object, array, number, or string, or one of the following three literal names: false null true The literal names MUST be lowercase.
- **document.** The names within an object SHOULD be unique.
- **document.** All Unicode characters may be placed within the quotation marks, except for the characters that MUST be escaped: quotation mark, reverse solidus, and the control characters (U+0000 through U+001F).
- **document.** Character Encoding JSON text exchanged between systems that are not part of a closed ecosystem MUST be encoded using UTF-8 [ RFC3629 ].
- **document.** Implementations MUST NOT add a byte order mark (U+FEFF) to the beginning of a networked-transmitted JSON text.
- **document.** A JSON parser MUST accept all texts that conform to the JSON grammar.
- **document.** The resulting text MUST strictly conform to the JSON grammar.

## RFC 7493 The I-JSON Message Format

Source: https://www.rfc-editor.org/rfc/rfc7493.html

- **document.** Requirements Language The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** Encoding and Characters I-JSON messages MUST be encoded using UTF-8 [ RFC3629 ].
- **document.** Object member names, and string values in arrays and object members, MUST NOT include code points that identify Surrogates or Noncharacters as defined by [ UNICODE ].
- **document.** I-JSON messages SHOULD NOT include numbers that express greater magnitude or precision than an IEEE 754 double precision number provides, for example, 1E400 or 3.141592653589793238462643383279.
- **document.** Object Constraints Objects in I-JSON messages MUST NOT have members with duplicate names.
- **document.** Designers of protocols that use I-JSON messages SHOULD provide a way, in this case, for the receiver of the erroneous data to signal the problem to the sender.
- **document.** For maximum interoperability with such implementations, protocol designers SHOULD NOT use top-level JSON texts that are neither objects nor arrays.
- **document.** This can be referred to as a "Must-Ignore" policy, meaning that when an implementation encounters a protocol element that it does not recognize, it should treat the rest of the protocol transaction as if the new element simply did not appear, and in particular, the implementation MUST NOT treat this as an error condition.
