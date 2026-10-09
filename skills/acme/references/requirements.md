# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8555 Automatic Certificate Management Environment (ACME)

Source: https://www.rfc-editor.org/rfc/rfc8555.html

- **RFC 8555 § 5.** All requests and responses sent via HTTP by ACME clients, ACME servers, and validation servers as well as any inputs for digest computations MUST be encoded using the UTF-8 character set [RFC3629].
- **RFC 8555 § 6.2.** All ACME requests with a non-empty body MUST encapsulate their payload in a JSON Web Signature (JWS) [RFC7515] object, signed using the account's private key unless otherwise specified.
- **RFC 8555 § 6.2.** The server MUST verify the JWS before processing the request.
- **RFC 8555 § 6.2.** An ACME server MUST implement the "ES256" signature algorithm [RFC7518] and SHOULD implement the "EdDSA" signature algorithm using the "Ed25519" variant (indicated by "crv") [RFC8037].
- **RFC 8555 § 6.3.** If a client wishes to fetch a resource from the server (which would otherwise be done with a GET), then it MUST send a POST request with a JWS body as described above, where the payload of the JWS is a zero-length octet string.
- **RFC 8555 § 6.4.** In POST requests sent to these resources, the client MUST set the "url" header parameter to the exact string provided by the server (rather than performing any re-encoding on the URL).
- **RFC 8555 § 6.5.** Every JWS sent by an ACME client MUST include, in its protected header, the "nonce" header parameter, with contents as defined in Section 6.5.2.
- **RFC 8555 § 6.5.** Once a nonce value has appeared in an ACME request, the server MUST consider it invalid, in the same way as a value it had never issued.
- **RFC 8555 § 6.5.** However, when retrying in response to a "badNonce" error, the client MUST use the nonce provided in the error response.
- **RFC 8555 § 7.1.** The server MUST provide "directory" and "newNonce" resources.
- **RFC 8555 § 7.3.** Clients SHOULD NOT automatically agree to terms by default.
- **RFC 8555 § 7.4.** The CSR MUST indicate the exact same set of requested identifiers as the initial newOrder request.
- **RFC 8555 § 7.5.2.** The server MUST verify that the request is signed by the account key corresponding to the account that owns the authorization.
- **RFC 8555 § 7.6.** Before revoking a certificate, the server MUST verify that the key used to sign the request is authorized to revoke the certificate.
- **RFC 8555 § 8.3.** This request MUST be sent to TCP port 80 on the HTTP server.
- **RFC 8555 § 10.2.** In order to make such attacks more difficult, it is RECOMMENDED that the server perform DNS queries and make HTTP connections from multiple points in the network.
- **RFC 8555 § 11.1.** Clients MUST generate a fresh account key for every account creation or rollover operation.
- **RFC 8555 § 11.1.** In particular, when a server receives a finalize request, it MUST verify that the public key in a CSR is not the same as the public key of the account key pair used to authenticate that request.

## RFC 9773 ACME Renewal Information (ARI) Extension

Source: https://www.rfc-editor.org/rfc/rfc9773.html

- **RFC 9773 § 3.** An ACME server that wishes to provide renewal information MUST include a new field, "renewalInfo", in its directory object.
- **RFC 9773 § 4.2.** Clients MUST attempt renewal at a time of their choosing based on the suggested renewal window.
- **RFC 9773 § 4.3.** Clients MUST NOT check a certificate's RenewalInfo after the certificate has expired.
- **RFC 9773 § 4.3.2.** After an initial fetch of a certificate's RenewalInfo, clients MUST fetch it again as soon as possible after the time indicated in the Retry-After header (backoff on errors takes priority, though).
- **RFC 9773 § 5.** Clients SHOULD include this field in newOrder requests if there is a clear predecessor certificate, as is the case for most certificate renewals.
- **RFC 9773 § 5.** If the server rejects the request because the identified certificate has already been marked as replaced, it MUST return an HTTP 409 (Conflict) with a problem document of type "alreadyReplaced" (see Section 7.4).
