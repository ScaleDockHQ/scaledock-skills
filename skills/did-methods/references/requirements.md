# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## did:web

Source: https://w3c-ccg.github.io/did-method-web/

"@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/secp256k1recovery-2020/v2"],

- **document.** A DID that uses this method MUST begin with the following prefix: did:web .
- **document.** Per the DID specification, this string MUST be in lowercase.
- **document.** The method specific identifier MUST match the common name used in the SSL/TLS certificate, and it MUST NOT include IP addresses.
- **document.** A port MAY be included and the colon MUST be percent encoded to prevent a conflict with paths.
- **document.** Read (Resolve) The following steps MUST be executed to resolve the DID document from a Web DID: Replace ":" with "/" in the method specific identifier to obtain the fully qualified domain name and optional path.
- **document.** When performing the DNS resolution during the HTTP GET request, the client SHOULD utilize [[RFC8484]] in order to prevent tracking of the identity being resolved.
- **document.** 2 or superceding, MUST be followed for delivery of a `did:web` document.
- **document.** TLS configuration MUST use at least SHA256, and SHOULD use SHA384, POLY1305, or stronger, depending on the needs of your operating environment.

## did:key

Source: https://raw.githubusercontent.com/w3c-ccg/did-method-key/main/README.md

issues and Pull Requests in the GitHub repository, discussions often occur on the

- **abstract.** issues and Pull Requests in the GitHub repository, discussions often occur on the

## did:jwk

Source: https://raw.githubusercontent.com/quartzjer/did-jwk/main/spec.md

The `base64url-value` is a [base64url](https://datatracker.ietf.org/doc/html/rfc4648#section-5) encoded [JSON Web Key](https://datatracker.ietf.org/doc/html/rfc7517) (JWK).

- **document.** { "id": "did:jwk:eyJrdHkiOiJPS1AiLCJjcnYiOiJYMjU1MTkiLCJ1c2UiOiJlbmMiLCJ4IjoiM3A3YmZYdDl3YlRUVzJIQzdPUTFOei1EUThoYmVHZE5yZngtRkctSUswOCJ9#0", "type": "JsonWebKey2020", "controller": "did:jwk:eyJrdHkiOiJPS1AiLCJjcnYiOiJYMjU1MTkiLCJ1c2UiOiJlbmMiLCJ4IjoiM3A3YmZYdDl3YlRUVzJIQzdPUTFOei1EUThoYmVHZE5yZngtRkctSUswOCJ9", "publicKeyJwk": { "kty":"OKP", "crv":"X25519", "use":"enc",…
- **document.** This is a design choice, implementations should always store the fully serialized `did:jwk:` URI and not the underlying JWK.
- **document.** There is no provided means of cryptographically verifying possession of the public key material, any such verification must be performed separately by applications using a sufficient challenge-response protocol.

## did:webvh

Source: https://identity.foundation/didwebvh/v1.0/

This is the specification of the did:webvh DID Method, Version 1.0. Please note that we continue to make cleanups (e.g., fixing typos, broken links, missing references, etc.) and making wording clarifications in this version of the specification. With that work there will be no changes to the meaning of the specification.

- **§ Method Name.** A DID that uses this method MUST begin with the following prefix: did:webvh .
- **§ Method Name.** Per the DID specification, this string MUST be in lowercase.
- **§ Method-Specific Identifier.** Every did:webvh DID MUST first conform to the DID Syntax ABNF Rules in [ DID-CORE ] Section 3.1.
- **§ Method-Specific Identifier.** When the DID Core method-name is webvh , the DID Core method-specific-id MUST additionally conform to the webvh-method-specific-id rule below.
- **§ Method-Specific Identifier.** Producers MUST use the uppercase form %3A in the canonical representation.
- **§ Method-Specific Identifier.** The {SCID} value used temporarily during DID creation is a placeholder and is not a conforming scid ; it MUST be replaced before the DID is published or resolved.
- **§ Method-Specific Identifier.** After percent-decoding and applying the IDNA processing defined in The DID to HTTPS Transformation : the result MUST be a fully qualified domain name conforming to [ RFC1035 ], [ RFC1123 ], and [ RFC2181 ]; the domain name MUST match the applicable TLS server identity requirements in [ RFC9525 ]; the domain MUST NOT be an IPv4 or IPv6 address, including a non-canonical textual representation that…
- **§ Method-Specific Identifier.** A percent-encoded colon ( %3A or %3a ) MUST NOT appear within encoded-domain-name .
