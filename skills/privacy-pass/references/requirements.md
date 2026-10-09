# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9576 The Privacy Pass Architecture

Source: https://www.rfc-editor.org/rfc/rfc9576.html

- **RFC 9576 § 3.5.** The issuance protocol MUST NOT reveal anything about the Client's private input, including the challenge and nonce, to the Attester or Issuer, regardless of the hardness assumptions of the underlying cryptographic protocol(s).
- **RFC 9576 § 3.5.** The issuance protocol MUST NOT allow malicious Clients or Attesters (acting as Clients) to forge tokens offline or otherwise without interacting with the Issuer directly.
- **RFC 9576 § 3.5.2.** In general, Clients SHOULD minimize or remove identifying information where possible when invoking the issuance protocol.
- **RFC 9576 § 6.2.** Moreover, Clients SHOULD employ some form of consistency mechanism to ensure that they receive the same configuration information and are not being actively partitioned into smaller anonymity sets.

## RFC 9577 The Privacy Pass HTTP Authentication Scheme

Source: https://www.rfc-editor.org/rfc/rfc9577.html

- **RFC 9577 § 2.1.1.** All token challenges MUST begin with a 2-octet integer that defines the token type, in network byte order.
- **RFC 9577 § 2.1.1.** Clients MUST ignore challenges with token types they do not support.
- **RFC 9577 § 2.1.1.** Challenges with redemption_context values of invalid lengths MUST be ignored.
- **RFC 9577 § 2.1.2.** This document follows the default padding behavior described in Section 3.2 of [RFC4648], so the base64url value MUST include padding.
- **RFC 9577 § 2.1.3.** If validation fails, the Client MUST NOT fetch or redeem a token based on the challenge.
- **RFC 9577 § 2.2.1.** A token is a structure that begins with a 2-octet field that indicates a token type, which MUST match the token_type in the TokenChallenge structure.
- **RFC 9577 § 2.2.2.** All unknown or unsupported parameters to "PrivateToken" authentication credentials MUST be ignored.
- **RFC 9577 § 2.2.2.** Origins SHOULD implement some form of double-spend prevention that prevents a token with the same nonce from being redeemed twice.
- **RFC 9577 § 4.1.** In order to prevent Clients from becoming incompatible with new token challenges, Origins SHOULD include random token types, from the reserved list of "greased" types (defined in Section 6.2), with some non-trivial probability.
- **RFC 9577 § 5.1.** All random values in the challenge and token MUST be generated using a cryptographically secure source of randomness [RFC4086].
- **RFC 9577 § 5.6.** As discussed in Section 2.1, Clients SHOULD discard any context-bound tokens upon flushing cookies or changing networks, to prevent an Origin from using the redemption context state as a cookie to recognize Clients.

## RFC 9578 Privacy Pass Issuance Protocols

Source: https://www.rfc-editor.org/rfc/rfc9578.html

- **RFC 9578 § 4.** If an Issuer wants to service multiple different Issuer directories, they MUST create unique subdomains for each directory so the TokenChallenge defined in Section 2.1 of [AUTHSCHEME] can be differentiated correctly.
- **RFC 9578 § 5.2.** If any of these conditions are not met, the Issuer MUST return an HTTP 422 (Unprocessable Content) error to the Client.
- **RFC 9578 § 5.5.** These keys MUST NOT be reused in other protocols.
- **RFC 9578 § 5.5.** Since Clients truncate token_key_id in each TokenRequest, Issuers SHOULD ensure that the truncated forms of new key IDs do not collide with other truncated key IDs in rotation.
- **RFC 9578 § 6.5.** The saltLength MUST match the output size of the hash function associated with the public key and token type.
