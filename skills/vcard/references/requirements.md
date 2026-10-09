# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 6350 vCard Format Specification

Source: https://www.rfc-editor.org/rfc/rfc6350.html

- **RFC 6350 § 3.2.** Content lines SHOULD be folded to a maximum width of 75 octets, excluding the line break.
- **RFC 6350 § 3.2.** Multi-octet characters MUST remain contiguous.
- **RFC 6350 § 3.3.** A vCard object MUST include the VERSION and FN properties.
- **RFC 6350 § 3.3.** Based on experience with vCard 3 interoperability, it is RECOMMENDED that property and parameter names be upper-case on output.
- **RFC 6350 § 3.4.** Compound properties allowing multiple instances MUST NOT be encoded in a single content line.
- **RFC 6350 § 3.4.** Finally, BACKSLASH characters in values MUST be escaped with a BACKSLASH character.
- **RFC 6350 § 3.4.** NEWLINE (U+000A) characters in values MUST be encoded by two characters: a BACKSLASH followed by either an 'n' (U+006E) or an 'N' (U+004E).
- **RFC 6350 § 5.** Property parameter value elements that contain the COLON (U+003A), SEMICOLON (U+003B), or COMMA (U+002C) character separators MUST be specified as quoted-string text values.
- **RFC 6350 § 5.** Applications MUST ignore x-param and iana-param values they don't recognize.
- **RFC 6350 § 6.3.1.** When a component value is missing, the associated component separator MUST still be specified.
- **RFC 6350 § 3.3.** VERSION MUST come immediately after BEGIN:VCARD.
- **RFC 6350 § 6.7.9.** The value MUST be "4.0" if the vCard corresponds to this specification.
- **RFC 6350 § 7.1.1.** vCard instances for which the UID properties (Section 6.7.6) are equivalent MUST be matched.
- **RFC 6350 § 10.1.** "charset": as defined for text/plain [RFC2046]; encodings other than UTF-8 [RFC3629] MUST NOT be used.

## RFC 7095 jCard: The JSON Format for vCard

Source: https://www.rfc-editor.org/rfc/rfc7095.html

- **RFC 7095 § 3.1.** When converting from vCard to jCard, first vCard lines MUST be unfolded.
- **RFC 7095 § 3.2.** Although [RFC6350] defines BEGIN and END to be properties, they MUST NOT appear as properties of the jCard.
- **RFC 7095 § 3.3.1.1.** Also in accordance to [RFC6350], the "version" property MUST be the first element of the array containing the properties of a jCard.
- **RFC 7095 § 3.4.** The name of the parameter MUST be in lowercase; the original case of the parameter value MUST be preserved.
- **RFC 7095 § 4.** Character escaping and line folding MUST be applied to the resulting vCard data as required by [RFC6350] and [RFC6868].

## RFC 9553 JSContact: A JSON Representation of Contact Data

Source: https://www.rfc-editor.org/rfc/rfc9553.html

- **RFC 9553 § 1.3.** All JSContact data MUST be valid according to the constraints given in I-JSON [RFC7493].
- **RFC 9553 § 1.4.3.** Implementations MUST reject a PatchObject in its entirety if any of its patches are invalid.
- **RFC 9553 § 1.7.1.** Implementations MUST handle a JSContact object as invalid if a type name, property name, or enumerated value only differs in case from one defined for any JSContact version known to that implementation.
- **RFC 9553 § 1.8.1.** Implementations MUST preserve vendor-specific properties in JSContact data, irrespective if they know their use.
- **RFC 9553 § 1.9.** Implementations MUST be prepared for property definitions and other JSContact elements that differ in a backwards-incompatible manner.
- **RFC 9553 § 1.8.1.** Vendor-specific property names MUST start with a vendor-specific prefix followed by a name, as produced by the "v-extension" ABNF below.
