# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. The TLS Encrypted Client Hello entry is quoted from a working-group Internet-Draft, a preview line that is tracked but not emitted.

## RFC 9846 The Transport Layer Security (TLS) Protocol Version 1.3

Source: https://www.rfc-editor.org/rfc/rfc9846

- **RFC 9846 § 4.2.3.** TLS 1.3 servers which negotiate TLS 1.2 or below in response to a ClientHello MUST set the last 8 bytes of their Random value specially in their ServerHello.
- **RFC 9846 § 4.3.** Implementations MUST NOT send extension responses (i.e., in the ServerHello, EncryptedExtensions, HelloRetryRequest, and Certificate messages) if the remote endpoint did not send the corresponding extension requests, with the exception of the "cookie" extension in the HelloRetryRequest.
- **RFC 9846 § 4.3.** There MUST NOT be more than one extension of the same type in a given extension block.
- **RFC 9846 § 4.3.3.** TLS 1.3 servers MUST NOT offer a SHA-1 signed certificate unless no valid certificate chain can be produced without it (see Section 4.5.1.2).
- **RFC 9846 § 4.3.8.** Clients and Servers MUST NOT reuse a key share for multiple connections.
- **RFC 9846 § 4.3.11.** Prior to accepting PSK key establishment, the server MUST validate the corresponding binder value (see Section 4.3.11.2 below).
- **RFC 9846 § 4.5.2.** The receiver of a CertificateVerify message MUST verify the signature field.
- **RFC 9846 § 4.5.3.** Recipients of Finished messages MUST verify that the contents are correct and if incorrect MUST terminate the connection with a "decrypt_error" alert.
- **RFC 9846 § 4.7.1.** Clients MUST NOT use tickets for longer than 7 days after issuance, regardless of the ticket_lifetime, and MAY delete tickets earlier based on local policy.
- **RFC 9846 § 6.** Upon receiving an error alert, the TLS implementation SHOULD indicate an error to the application and MUST NOT allow any further data to be sent or received on the connection.
- **RFC 9846 § 6.** Peers which receive a message which cannot be parsed according to the syntax (e.g., have a length extending beyond the message boundary or contain an out-of-range length) MUST terminate the connection with a "decode_error" alert.
- **RFC 9846 § 7.4.2.** Implementations MUST check whether the computed Diffie-Hellman shared secret is the all-zero value and abort if so, as described in Section 6 of [RFC7748].
- **RFC 9846 § 8.** The server MUST ensure that any instance of it (be it a machine, a thread, or any other entity within the relevant serving infrastructure) would accept 0-RTT for the same 0-RTT handshake at most once; this limits the number of replays to the number of server instances in the deployment.
- **RFC 9846 § 9.1.** A TLS-compliant application MUST support key exchange with secp256r1 (NIST P-256) and SHOULD support key exchange with X25519 [RFC7748].
- **RFC 9846 § 9.3.** A server receiving a ClientHello MUST correctly ignore all unrecognized cipher suites, extensions, and other parameters.

## RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2

Source: https://www.rfc-editor.org/rfc/rfc5246.html

- **RFC 5246 § 7.4.7.1.** In any case, a TLS server MUST NOT generate an alert if processing an RSA-encrypted premaster secret message fails, or the version number is not as expected.

## RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)

Source: https://www.rfc-editor.org/rfc/rfc9325.html

- **RFC 9325 § 3.1.1.** Implementations MUST NOT negotiate TLS version 1.1 [RFC4346].
- **RFC 9325 § 3.1.1.** Implementations SHOULD support TLS 1.3 [RFC8446] and, if implemented, MUST prefer to negotiate TLS 1.3 over earlier versions of TLS.
- **RFC 9325 § 3.5.** TLS 1.2 clients and servers MUST implement the renegotiation_info extension, as defined in [RFC5746].
- **RFC 9325 § 4.1.** Implementations MUST support and prefer to negotiate cipher suites offering forward secrecy.
- **RFC 9325 § 4.5.** When using RSA, servers MUST authenticate using certificates with at least a 2048-bit modulus for the public key.

## RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens

Source: https://www.rfc-editor.org/rfc/rfc8705.html

- **RFC 8705 § 2.** The authorization server MUST enforce the binding between client and certificate, as described in either Section 2.1 or 2.2 below.
- **RFC 8705 § 3.** The protected resource MUST obtain, from its TLS implementation layer, the client certificate used for mutual TLS and MUST verify that the certificate matches the certificate associated with the access token.

## TLS Encrypted Client Hello

Source: https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25

- **draft-ietf-tls-esni-25 § 6.1.7.** In verifying the client-facing server certificate, the client MUST interpret the public name as a DNS-based reference identity [RFC6125].
