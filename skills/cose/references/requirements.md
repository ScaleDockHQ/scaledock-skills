# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9052 CBOR Object Signing and Encryption (COSE): Structures and Process

Source: https://www.rfc-editor.org/rfc/rfc9052.html

- **RFC 9052 § 1.5.** Applications can either fail processing or process messages by ignoring incorrect labels; however, they MUST NOT create messages with incorrect labels.
- **RFC 9052 § 3.** Recipients MUST accept both a zero-length byte string and a zero-length map encoded in a byte string.
- **RFC 9052 § 3.** When processing messages, if a label appears multiple times, the message MUST be rejected as malformed.
- **RFC 9052 § 3.** If the message is not rejected as malformed, attributes MUST be obtained from the protected bucket, and only if an attribute is not found in the protected bucket can that attribute be obtained from the unprotected bucket.
- **RFC 9052 § 3.1.** When present, the "crit" header parameter MUST be placed in the protected-header-parameters bucket.
- **RFC 9052 § 3.1.** Applications MUST NOT assume that "kid" values are unique.
- **RFC 9052 § 3.1.** The "Initialization Vector" and "Partial Initialization Vector" header parameters MUST NOT both be present in the same security layer.
- **RFC 9052 § 7.1.** Implementations MUST verify that the key type is appropriate for the algorithm being processed.
- **RFC 9052 § 7.1.** If the algorithms do not match, then this key object MUST NOT be used to perform the cryptographic operation.
- **RFC 9052 § 8.3.** The message content MUST NOT be used if the decryption does not validate.
- **RFC 9052 § 9.** Encoding MUST be done using definite lengths, and the length of the (encoded) argument MUST be the minimum possible length.
- **RFC 9052 § 9.** Applications MUST NOT parse and process messages with the same label used twice as a key in a single map.

## RFC 9053 CBOR Object Signing and Encryption (COSE): Initial Algorithms

Source: https://www.rfc-editor.org/rfc/rfc9053.html

- **RFC 9053 § 2.1.** Implementations SHOULD use a deterministic version of ECDSA such as the one defined in [RFC6979].
- **RFC 9053 § 4.1.1.** The key and nonce pair MUST be unique for every message encrypted.
- **RFC 9053 § 4.1.1.** The total number of messages encrypted for a single key MUST NOT exceed 2^32 [SP800-38D].
- **RFC 9053 § 6.3.1.** When using ephemeral keys, the sender MUST generate a new ephemeral key for every key agreement operation.
- **RFC 9053 § 7.1.** Applications MUST check that the curve and the key type are consistent and reject a key if they are not.

## RFC 9360 CBOR Object Signing and Encryption (COSE): Header Parameters for Carrying and Referencing X.509 Certificates

Source: https://www.rfc-editor.org/rfc/rfc9360.html

The first two quotes apply to the x5bag and x5chain header parameters; the SHA-256 quote applies to x5t.

- **RFC 9360 § 2.** The trust mechanism MUST process any certificates in this parameter as untrusted input.
- **RFC 9360 § 2.** The presence of a self-signed certificate in the parameter MUST NOT cause the update of the set of trust anchors without some out-of-band confirmation.
- **RFC 9360 § 2.** For interoperability, applications that use this header parameter MUST support the hash algorithm 'SHA-256' but can use other hash algorithms.
- **RFC 9360 § 5.** In any event, both the signature validation and the certificate validation MUST be completed successfully before acting on any requests.

## RFC 9964 ML-DSA for JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and Encryption (COSE)

Source: https://www.rfc-editor.org/rfc/rfc9964.html

- **RFC 9964 § 3.** The priv parameter contains private information and MUST NOT be present in public keys.
- **RFC 9964 § 4.** For the ML-DSA private keys described in this document, the priv parameter MUST be the seed and MUST have a length of 32 bytes.
- **RFC 9964 § 5.** The ctx parameter MUST be the empty string for ML-DSA-44, ML-DSA-65, and ML-DSA-87.
