# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9580 OpenPGP

Source: https://www.rfc-editor.org/rfc/rfc9580.html

- **RFC 9580 § 3.3.** Implementations SHOULD NOT assume that Key IDs are unique.
- **RFC 9580 § 3.7.2.** Therefore, when generating an S2K Specifier, an implementation MUST NOT use Simple S2K.
- **RFC 9580 § 3.7.2.1.** An implementation MUST NOT create and MUST reject as malformed any Secret Key packet where the S2K usage octet is not AEAD (253) and the S2K Specifier Type is Argon2.
- **RFC 9580 § 4.1.** An implementation MUST NOT interpret octets outside the range indicated in the packet header as part of the contents of the packet.
- **RFC 9580 § 4.3.** If an implementation encounters a critical packet where the packet type is unknown in a packet sequence, it MUST reject the whole packet sequence (see Section 10).
- **RFC 9580 § 4.3.** On the other hand, an unknown non-critical packet MUST be ignored.
- **RFC 9580 § 5.2.** An implementation MUST generate a version 6 signature when signing with a version 6 key.
- **RFC 9580 § 5.2.** Implementations MUST NOT create version 3 signatures; they MAY accept version 3 signatures.
- **RFC 9580 § 5.2.3.10.** An implementation that encounters multiple self-signatures on the same object MUST select the most recent valid self-signature and ignore all other self-signatures.
- **RFC 9580 § 5.2.3.10.** An implementation MUST ensure that a valid Direct Key signature is present before using a version 6 key.
- **RFC 9580 § 5.2.5.** When an implementation encounters such a malformed or unknown signature, it MUST ignore the signature for validation purposes.
- **RFC 9580 § 5.5.2.** Version 4 keys are deprecated; an implementation SHOULD NOT generate a version 4 key but SHOULD accept it.
- **RFC 9580 § 5.1.2.** A v6 PKESK packet MUST NOT precede a v1 SEIPD packet or a deprecated SED packet (see Section 10.3.2.1).
- **RFC 9580 § 9.1.** Implementations MUST implement Ed25519 (27) for signatures and X25519 (25) for encryption.
- **RFC 9580 § 9.3.** Implementations MUST implement AES-128.
- **RFC 9580 § 9.3.** Implementations MUST NOT encrypt data with IDEA, TripleDES, or CAST5.
- **RFC 9580 § 9.5.** Implementations MUST implement SHA2-256.
- **RFC 9580 § 9.5.** Implementations MUST NOT generate signatures with MD5, SHA-1, or RIPEMD-160.
- **RFC 9580 § 9.5.** Implementations MUST NOT validate any recent signature that depends on MD5, SHA-1, or RIPEMD-160.
- **RFC 9580 § 9.6.** Implementations MUST implement OCB.
- **RFC 9580 § 10.3.2.1.** An implementation processing an Encrypted Message MUST discard any preceding ESK packet with a version that does not align with the version of the payload.
- **RFC 9580 § 12.2.** An implementation MUST NOT use a symmetric algorithm that is not in the recipient's preference list.
- **RFC 9580 § 12.4.** An implementation MUST NOT generate RSA keys of a size less than 3072 bits.
- **RFC 9580 § 13.7.** In the case of AEAD encrypted data, if the authentication tag fails to verify, the implementation MUST NOT attempt to parse nor release decrypted data to the user, and it MUST halt with an error.

## RFC 4880 OpenPGP Message Format

Source: https://www.rfc-editor.org/rfc/rfc4880.html

- **RFC 4880 § 14.** An implementation MUST treat an MDC failure as a security problem, not merely a data problem.
