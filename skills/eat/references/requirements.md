# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9711 The Entity Attestation Token (EAT)

Source: https://www.rfc-editor.org/rfc/rfc9711.html

- **RFC 9711 § 3.** An EAT MUST contain a Claims-Set.
- **RFC 9711 § 3.** An EAT MUST have authenticity and integrity protection.
- **RFC 9711 § 4.** However, in the absence of such requirements, all claims that are not understood by implementations MUST be ignored.
- **RFC 9711 § 4.** All claims in an EAT MUST use the same encoding except where otherwise explicitly stated (e.g., in a CBOR-encoded token, all claims must be encoded with CBOR).
- **RFC 9711 § 4.** CBOR-encoded tokens MUST only use the integer for claim keys.
- **RFC 9711 § 4.** JSON-encoded tokens MUST only use the text string for claim names.
- **RFC 9711 § 4.1.** A claim named "nonce" was defined for JWT and registered with IANA in the "JSON Web Token Claims" registry, but it MUST NOT be used because it does not support multiple nonces.
- **RFC 9711 § 4.1.** An EAT nonce MUST have at least 64 bits of entropy.
- **RFC 9711 § 4.2.1.** UEIDs MUST be universally and globally unique across manufacturers and countries, as described in Section 4.2.1.1.
- **RFC 9711 § 4.2.1.2.** All implementations MUST be able to receive UEIDs up to 33 bytes long.
- **RFC 9711 § 4.2.1.2.** The consumer of a UEID MUST treat it as a completely opaque string of bytes and MUST NOT make any use of its internal structure.
- **RFC 9711 § 4.2.4.** The "hwmodel" claim MUST only be present if an "oemid" claim described in Section 4.2.3 is present.
- **RFC 9711 § 4.2.9.** The receiver of an EAT MUST NOT assume that debug is turned off in a submodule because there is a claim indicating it is turned off in a superior module.
- **RFC 9711 § 4.2.18.1.** The encoding of a submodule Claims-Set MUST be the same as the encoding of the surrounding EAT, e.g., all submodule Claims-Sets in a CBOR-encoded token must be CBOR encoded.
- **RFC 9711 § 4.3.1.** An EAT token MUST NOT contain an "iat" claim in floating-point format.
- **RFC 9711 § 4.3.1.** Any recipient of a token with a floating-point format "iat" claim MUST consider it an error.
- **RFC 9711 § 6.2.** Full profiles MUST be complete such that a complying receiver can decode, verify, and check for freshness for every EAT created by a complying sender.
- **RFC 9711 § 6.2.** The "eat_profile" claim MUST NOT be used to identify partial profiles.
- **RFC 9711 § 9.3.** All EAT use MUST provide a freshness mechanism to prevent replay and related attacks.
- **RFC 9711 § 9.4.** Since any COSE encryption will be removed by the receiving consumer, the communication of claim subsets to any downstream consumer MUST leverage an equivalent communication security protocol (e.g., TLS).
