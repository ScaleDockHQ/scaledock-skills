# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8785 JSON Canonicalization Scheme (JCS)

Source: https://www.rfc-editor.org/rfc/rfc8785.html

- **RFC 8785 § 3.1.** Irrespective of the method used, the data to be serialized MUST be adapted for I-JSON [RFC7493] formatting, which implies the following:
- **RFC 8785 § 3.1.** * JSON objects MUST NOT exhibit duplicate property names.
- **RFC 8785 § 3.1.** * JSON number data MUST be expressible as IEEE 754 [IEEE754] double-precision values.
- **RFC 8785 § 3.1.** For applications needing higher precision or longer integers than offered by IEEE 754 double precision, it is RECOMMENDED to represent such numbers as JSON strings; see Appendix D for details on how this can be performed in an interoperable and extensible way.
- **RFC 8785 § 3.1.** An additional constraint is that parsed JSON string data MUST NOT be altered during subsequent serializations.
- **RFC 8785 § 3.2.1.** Whitespace between JSON tokens MUST NOT be emitted.
- **RFC 8785 § 3.2.2.1.** In accordance with JSON [RFC8259], the literals "null", "true", and "false" MUST be serialized as null, true, and false, respectively.
- **RFC 8785 § 3.2.2.2.** * If the Unicode value falls within the traditional ASCII control character range (U+0000 through U+001F), it MUST be serialized using lowercase hexadecimal Unicode notation (\uhhhh) unless it is in the set of predefined JSON control characters U+0008, U+0009, U+000A, U+000C, or U+000D, which MUST be serialized as \b, \t, \n, \f, and \r, respectively.
- **RFC 8785 § 3.2.2.2.** * If the Unicode value is outside of the ASCII control character range, it MUST be serialized "as is" unless it is equivalent to U+005C (\) or U+0022 ("), which MUST be serialized as \\ and \", respectively.
- **RFC 8785 § 3.2.2.2.** Since invalid Unicode data like "lone surrogates" (e.g., U+DEAD) may lead to interoperability issues including broken signatures, occurrences of such data MUST cause a compliant JCS implementation to terminate with an appropriate error.
- **RFC 8785 § 3.2.2.3.** Since Not a Number (NaN) and Infinity are not permitted in JSON, occurrences of NaN or Infinity MUST cause a compliant JCS implementation to terminate with an appropriate error.
- **RFC 8785 § 3.2.3.** * JSON object properties MUST be sorted recursively, which means that JSON child Objects MUST have their properties sorted as well.
- **RFC 8785 § 3.2.3.** * JSON array data MUST also be scanned for the presence of JSON objects (if an object is found, then its properties MUST be sorted), but array element order MUST NOT be changed.
- **RFC 8785 § 3.2.4.** Finally, in order to create a platform-independent representation, the result of the preceding step MUST be encoded in UTF-8.
