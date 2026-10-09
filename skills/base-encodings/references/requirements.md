# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 4648 states only four BCP 14 requirements, so the list also quotes its defining encoding rules and its lowercase security guidance.

## RFC 4648 The Base16, Base32, and Base64 Data Encodings

Source: https://www.rfc-editor.org/rfc/rfc4648.html

- **RFC 4648 § 3.1.** Implementations MUST NOT add line feeds to base-encoded data unless the specification referring to this document explicitly directs base encoders to add line feeds after a specific number of characters.
- **RFC 4648 § 3.2.** Implementations MUST include appropriate pad characters at the end of encoded data unless the specification referring to this document explicitly states otherwise.
- **RFC 4648 § 3.3.** Implementations MUST reject the encoded data if it contains characters outside the base alphabet when interpreting base-encoded data, unless the specification referring to this document explicitly states otherwise.
- **RFC 4648 § 3.5.** These pad bits MUST be set to zero by conforming encoders, which is described in the descriptions on padding below.
- **RFC 4648 § 3.5.** In some environments, the alteration is critical and therefore decoders MAY chose to reject an encoding if the pad bits have not been set to zero.
- **RFC 4648 § 4.** When fewer than 24 input bits are available in an input group, bits with value zero are added (on the right) to form an integral number of 6-bit groups.
- **RFC 4648 § 5.** This encoding may be referred to as "base64url". This encoding should not be regarded as the same as the "base64" encoding and should not be referred to as only "base64".
- **RFC 4648 § 5.** This encoding is technically identical to the previous one, except for the 62:nd and 63:rd alphabet character, as indicated in Table 2.
- **RFC 4648 § 6.** When a bit stream is encoded via the base 32 encoding, the bit stream must be presumed to be ordered with the most-significant-bit first.
- **RFC 4648 § 7.** This encoding should not be regarded as the same as the "base32" encoding and should not be referred to as only "base32".
- **RFC 4648 § 8.** Unlike base 32 and base 64, no special padding is necessary since a full code word is always available.
- **RFC 4648 § 12.** A decoder should not break on invalid input including, e.g., embedded NUL characters (ASCII 0).
- **RFC 4648 § 12.** Similarly, when the base 16 and base 32 alphabets are handled case insensitively, alteration of case can be used to leak information or make string equality comparisons fail.
