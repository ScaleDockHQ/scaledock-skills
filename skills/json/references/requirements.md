# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8259 The JavaScript Object Notation (JSON) Data Interchange Format

Source: https://www.rfc-editor.org/rfc/rfc8259.html

- **RFC 8259 § 3.** A JSON value MUST be an object, array, number, or string, or one of the following three literal names:
- **RFC 8259 § 3.** The literal names MUST be lowercase.
- **RFC 8259 § 4.** The names within an object SHOULD be unique.
- **RFC 8259 § 7.** All Unicode characters may be placed within the quotation marks, except for the characters that MUST be escaped: quotation mark, reverse solidus, and the control characters (U+0000 through U+001F).
- **RFC 8259 § 8.1.** JSON text exchanged between systems that are not part of a closed ecosystem MUST be encoded using UTF-8 [RFC3629].
- **RFC 8259 § 8.1.** Implementations MUST NOT add a byte order mark (U+FEFF) to the beginning of a networked-transmitted JSON text.
- **RFC 8259 § 9.** A JSON parser MUST accept all texts that conform to the JSON grammar.
- **RFC 8259 § 10.** The resulting text MUST strictly conform to the JSON grammar.

## RFC 7493 The I-JSON Message Format

Source: https://www.rfc-editor.org/rfc/rfc7493.html

- **RFC 7493 § 2.1.** I-JSON messages MUST be encoded using UTF-8 [RFC3629].
- **RFC 7493 § 2.1.** Object member names, and string values in arrays and object members, MUST NOT include code points that identify Surrogates or Noncharacters as defined by [UNICODE].
- **RFC 7493 § 2.2.** I-JSON messages SHOULD NOT include numbers that express greater magnitude or precision than an IEEE 754 double precision number provides, for example, 1E400 or 3.141592653589793238462643383279.
- **RFC 7493 § 2.2.** For applications that require the exact interchange of numbers with greater magnitude or precision, it is RECOMMENDED to encode them in JSON string values.
- **RFC 7493 § 2.3.** Objects in I-JSON messages MUST NOT have members with duplicate names.
- **RFC 7493 § 4.1.** For maximum interoperability with such implementations, protocol designers SHOULD NOT use top-level JSON texts that are neither objects nor arrays.
- **RFC 7493 § 4.3.** It is RECOMMENDED that all such data items be expressed as string values in ISO 8601 format, as specified in [RFC3339], with the additional restrictions that uppercase rather than lowercase letters be used, that the timezone be included not defaulted, and that optional trailing seconds be included even when their value is "00".
- **RFC 7493 § 4.4.** When it is required that an I-JSON protocol element contain arbitrary binary data, it is RECOMMENDED that this data be encoded in a string value in base64url; see Section 5 of [RFC4648].
