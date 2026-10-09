# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 8610 has almost no BCP 14 sentences, so its group quotes the defining rules for the root rule, rule assignment and sockets.

## RFC 8949 Concise Binary Object Representation (CBOR)

Source: https://www.rfc-editor.org/rfc/rfc8949.html

The three Section 4.2.1 quotes apply when producing the core deterministic encoding.

- **RFC 8949 § 3.** An encoder MUST produce only well-formed encoded data items.
- **RFC 8949 § 3.** A decoder MUST NOT return a decoded data item when it encounters input that is not a well-formed encoded CBOR data item (this does not detract from the usefulness of diagnostic and recovery tools that might make available some information from a damaged encoded CBOR data item).
- **RFC 8949 § 2.2.** For example, in the generic data model, a valid map MAY have both "0" and "0.0" as keys, and an encoder MUST NOT encode "0.0" as an integer (major type 0, Section 3.1).
- **RFC 8949 § 3.3.** An encoder MUST NOT issue two-byte sequences that start with 0xf8 (major type 7, additional information 24) and continue with a byte less than 0x20 (32 decimal).
- **RFC 8949 § 3.4.3.** Decoders that understand these tags MUST be able to decode bignums that do have leading zeroes.
- **RFC 8949 § 3.4.4.** The exponent e MUST be represented in an integer of major type 0 or 1, while the mantissa can also be a bignum (Section 3.4.3).
- **RFC 8949 § 4.2.1.** Floating-point values also MUST use the shortest form that preserves the value, e.g., 1.5 is encoded as 0xf93e00 (binary16) and 1000000.5 as 0xfa49742408 (binary32).
- **RFC 8949 § 4.2.1.** Indefinite-length items MUST NOT appear.
- **RFC 8949 § 4.2.1.** The keys in every map MUST be sorted in the bytewise lexicographic order of their deterministic encodings.
- **RFC 8949 § 5.** CBOR-based protocols MUST specify how their decoders handle invalid and other unexpected data.
- **RFC 8949 § 5.** Encoders for CBOR-based protocols MUST produce only valid items, that is, the protocol cannot be designed to make use of invalid items.
- **RFC 8949 § 5.6.** A CBOR-based protocol MUST define what to do when a receiving application sees multiple identical keys in a map.
- **RFC 8949 § 5.6.** Thus, a CBOR-based protocol MUST NOT specify that changing the key/value pair order in a map changes the semantics, except to specify that some orders are disallowed, for example, where they would not meet the requirements of a deterministic encoding (Section 4.2).

## RFC 8610 Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures

Source: https://www.rfc-editor.org/rfc/rfc8610.html

- **RFC 8610 § 2.2.4.** There is no special syntax to identify the root of a CDDL data structure definition: that role is simply taken by the first rule defined in the file.
- **RFC 8610 § C.** A plain equals sign defines the rule name as the equivalent of the expression to the right; it is an error if the name was already defined with a different expression.
- **RFC 8610 § 3.9.** As a convention, all definitions (plugs) for socket names must be augmentations, i.e., they must be using "/=" and "//=", respectively.
- **RFC 8610 § 3.8.3.1.** Similar considerations apply to Unicode character classes; where these are used, the specification that employs CDDL SHOULD identify which Unicode versions are addressed.

## RFC 9165 Additional Control Operators for the Concise Data Definition Language (CDDL)

Source: https://www.rfc-editor.org/rfc/rfc9165.html

Section 2.1 defines the .plus control, Section 2.2 the .cat control, and Section 3 the .abnf and .abnfb controls.

- **RFC 9165 § 2.1.** The target and controller both MUST be numeric.
- **RFC 9165 § 2.2.** The target and controller both MUST be strings.
- **RFC 9165 § 2.2.** If the target is a text string, the result of that concatenation MUST be valid UTF-8.
- **RFC 9165 § 3.** The controller string MUST be a string.
