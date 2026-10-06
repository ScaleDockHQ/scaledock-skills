# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3

Source: https://www.rfc-editor.org/rfc/rfc8446.html

- **document.** Conventions and Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** If (EC)DHE key establishment is in use, then the ServerHello contains a "key_share" extension with the server's ephemeral Diffie-Hellman share; the server's share MUST be in the same group as one of the client's shares.
- **document.** Application Data MUST NOT be sent prior to sending the Finished message, except as specified in Section 2.3 .
- **document.** If no common cryptographic parameters can be negotiated, the server MUST abort the handshake with an appropriate alert.
- **document.** When a client offers resumption via a PSK, it SHOULD also supply a "key_share" extension to the server to allow the server to decline resumption and fall back to a full handshake, if needed.
- **document.** Rescorla Standards Track [Page 16] RFC 8446 TLS August 2018 When PSKs are provisioned out of band, the PSK identity and the KDF hash algorithm to be used with the PSK MUST also be provisioned.
- **document.** A peer which receives a handshake message in an unexpected order MUST abort the handshake with an "unexpected_message" alert.
- **document.** If there is no overlap between the received "supported_groups" and the groups supported by the server, then the server MUST abort the handshake with a "handshake_failure" or an "insufficient_security" alert.

## RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2

Source: https://www.rfc-editor.org/rfc/rfc5246.html

- **document.** Requirements Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ REQ ].
- **document.** Dierks & Rescorla Standards Track [Page 5] RFC 5246 TLS August 2008 - Alerts MUST now be sent in many cases.
- **document.** - After a certificate_request, if no certificates are available, clients now MUST send an empty certificate list.
- **document.** - Support for the SSLv2 backward-compatible hello is now a MAY, not a SHOULD, with sending it a SHOULD NOT.
- **document.** Support will probably become a SHOULD NOT in the future.
- **document.** As discussed in [ PKCS1 ], the DigestInfo MUST be DER-encoded [ X680 ] [ X690 ].
- **document.** For hash algorithms without parameters (which includes SHA-1), the DigestInfo.AlgorithmIdentifier.parameters field MUST be NULL, but implementations MUST accept both without parameters and
- **document.** New cipher suites MUST explicitly specify a PRF and, in general, SHOULD use the TLS PRF with SHA-256 or a stronger standard hash function.

## RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)

Source: https://www.rfc-editor.org/rfc/rfc9325.html

Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) are used to protect data exchanged over a wide range of application protocols and can also form the basis for secure transport protocols. Over the years, the industry has witnessed several serious attacks on TLS and DTLS, including attacks on the most commonly used cipher suites and their modes of operation. This document provides the latest recommendations for ensuring the security of deployed services that use TLS and DTLS. These recommendations are applicable to the majority of use cases. ¶ RFC 7525, an earlier version of the TLS recommendations, was published when the industry was transitioning to TLS 1.2. Years

- **abstract.** Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) are used to protect data exchanged over a wide range of application protocols and can also form the basis for secure transport protocols. Over the years, the industry has witnessed several serious attacks on TLS and DTLS, including attacks on the most commonly used cipher suites and their modes of operation. This document provides the latest recommendations for ensuring the security of deployed services that use TLS and DTLS. These recommendations are applicable to the majority of use cases. ¶ RFC 7525, an earlier version of the TLS recommendations, was published when the industry was transitioning to TLS 1.2. Years

## RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens

Source: https://www.rfc-editor.org/rfc/rfc8705.html

This document describes OAuth client authentication and certificate-bound access and refresh tokens using mutual Transport Layer Security (TLS) authentication with X.509 certificates. OAuth clients are provided a mechanism for authentication to the authorization server using mutual TLS, based on either self-signed certificates or public key infrastructure (PKI). OAuth authorization servers are provided a mechanism for binding access tokens to a client's mutual-TLS certificate, and OAuth protected resources are provided a method for ensuring that such an access token presented to it was issued to the client presenting the token. ¶

- **abstract.** This document describes OAuth client authentication and certificate-bound access and refresh tokens using mutual Transport Layer Security (TLS) authentication with X.509 certificates. OAuth clients are provided a mechanism for authentication to the authorization server using mutual TLS, based on either self-signed certificates or public key infrastructure (PKI). OAuth authorization servers are provided a mechanism for binding access tokens to a client's mutual-TLS certificate, and OAuth protected resources are provided a method for ensuring that such an access token presented to it was issued to the client presenting the token. ¶

## TLS Encrypted Client Hello

Source: https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25

This document describes a mechanism in Transport Layer Security (TLS) for encrypting a ClientHello message under a server public key. ¶

- **abstract.** This document describes a mechanism in Transport Layer Security (TLS) for encrypting a ClientHello message under a server public key. ¶
