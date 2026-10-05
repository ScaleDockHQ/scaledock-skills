# Bindings and profiles

Read this when encoding or decoding SAML messages for transport, or when implementing the Web Browser SSO or Single Logout flow. Section numbers are SAML 2.0 Bindings (Bind) and Profiles (Prof); En is an item of SAML 2.0 Errata 05. Sources are in [Sources](../SKILL.md#sources).

Conformance: IdPs and SPs MUST support Web SSO with `AuthnRequest` over HTTP-Redirect, `Response` over HTTP-POST and over HTTP-Artifact, Artifact Resolution over SOAP, and Single Logout over HTTP-Redirect (Conf §3.2).

## RelayState (all HTTP bindings)

- If a request carries RelayState, the responder MUST answer with a binding that supports RelayState and return the exact value (Bind §3.1.1, §3.4.3, §3.5.3, §3.6.3.1).
- The value is at most 80 bytes. The sender SHOULD integrity-protect it with a checksum, a pseudo-random value or similar (Bind §3.5.3, §3.6.3.1). Under HTTP-Redirect the query-string signature covers it (Bind §3.4.3 via E1).
- Nothing binds a RelayState to its message under POST or Artifact. An attacker can swap the RelayState values of two valid responses, so never attach sensitive state to RelayState without extra checks against the SAML message (Bind §3.5.5.2, §3.6.5.2).
- Sanitize it. Allow only `http` or `https` schemes for any URL derived from it, and reject unencoded characters that enable XSS or CSRF. This applies to IdPs and SPs (Bind §3.1.1 via E90; Prof §4.1.6 "Use of Relay State" via E90).
- Confidentiality- and integrity-protect RelayState. Because the same entity produces and consumes it, a symmetric MAC works (Sec §6.4.6).

## HTTP-Redirect (Bind §3.4)

Binding URI: `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect`.

- The message goes in the URL query string of an HTTP GET. The sender answers with 302 or 303 (Bind §3.4.5).
- `SAMLEncoding` names the encoding and defaults to DEFLATE. Every endpoint MUST support DEFLATE (Bind §3.4.4).
- DEFLATE encoding (Bind §3.4.4.1):
  1. Remove any `<ds:Signature>` from the message root. A message containing other signed content, such as a signed assertion, SHOULD NOT use this binding.
  2. DEFLATE the XML (RFC 1951), base64 it with no line breaks, URL-encode it, and send it as `SAMLRequest` or `SAMLResponse`.
  3. URL-encode `RelayState`, if any, as its own parameter.
- Signing (Bind §3.4.4.1):
  1. Add `SigAlg`, the signature algorithm URI.
  2. Sign the octets of `SAMLRequest=value&RelayState=value&SigAlg=value` (or `SAMLResponse=…`), using the URL-encoded values. Leave `RelayState` out entirely when absent. Nothing else in the query string is signed.
  3. Send the base64 signature as `Signature`.
- Verifying (Bind §3.4.4.1): parameters may arrive in any order, so rebuild the string in the order above. Use the original URL-encoded values exactly as received; re-encoding decoded values can break verification because URL encoding is not canonical.
- RSA-SHA1 and DSA-SHA1 MUST be supported with this encoding (Bind §3.4.4.1). Any XML Signature algorithm MAY be used (E81).
- If signed, the root `Destination` MUST hold the URL the user agent was sent to, and the recipient MUST verify it (Bind §3.4.5.2).
- Do not use this binding for content the user agent must not see. URLs end up in logs and in `Referer` headers (Bind §3.4.5.2).
- Responders SHOULD send `Cache-Control: no-cache, no-store` and `Pragma: no-cache` (Bind §3.4.5.1).
- Report SAML errors in a SAML response, never as an HTTP error status. A refusal SHOULD use second-level status `RequestDenied` (Bind §3.4.6).

## HTTP-POST (Bind §3.5)

Binding URI: `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.

- The message is base64-encoded into a hidden form control named `SAMLRequest` or `SAMLResponse`, with optional `RelayState` in the same form. The form's `action` is the recipient endpoint, its `method` is `POST`, and the page is XHTML (Bind §3.5.4).
- Form values are escaped so they are safe in XHTML, and the recipient processes the message however the form was submitted (Bind §3.5.4).
- Messages MAY be signed before base64 encoding, using XML Signature inside the message. If signed, `Destination` MUST be set and verified (Bind §3.5.5.2).
- Same caching and error rules as Redirect (Bind §3.5.5.1, §3.5.6).

## HTTP-Artifact (Bind §3.6) and SOAP (Bind §3.2)

Binding URI: `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`.

- The user agent carries a short artifact as `SAMLart` in the query string or a form. The receiver resolves it over a direct channel with `<samlp:ArtifactResolve>`, usually over SOAP (Bind §3.6.3, §3.6.5).
- Format (Bind §3.6.4, §3.6.4.2): `base64(TypeCode EndpointIndex SourceID MessageHandle)`, with type code `0x0004`, a 2-byte endpoint index, a 20-byte SourceID and a 20-byte MessageHandle.
  - The SourceID is RECOMMENDED to be the SHA-1 of the issuer's entityID (Bind §3.6.4).
  - The MessageHandle is at least 16 cryptographically random bytes, padded to 20. It MUST be infeasible to guess (Bind §3.6.4, §3.6.4.2).
  - Artifact formats from earlier SAML versions MUST NOT be used (E4).
- Artifacts are single use at the issuer. Receivers are RECOMMENDED to enforce single use too, and to block an artifact whose resolution failed (Bind §3.6.5.2).
- If the message is meant for a specific recipient, the issuer MUST authenticate the sender of `ArtifactResolve` before returning it (Bind §3.6.5.2). For SSO, resolution MUST be mutually authenticated, integrity-protected and confidential, and the IdP returns the `Response` only to the SP it was issued to (Prof §4.1.4.4).
- `Destination` is unspecified for messages delivered by artifact (Bind §3.6.5.2 via E59).
- SOAP: one SAML message per SOAP body. SOAP faults SHOULD NOT be used for SAML-level errors; a SAML processing error SHOULD still return HTTP 200 with a SAML `<Status>` (Bind §3.2.2.1, §3.2.3.3 via E19).

## Web Browser SSO profile (Prof §4.1)

### AuthnRequest (Prof §4.1.4.1)

- `<Issuer>` MUST be present and hold the SP's entityID; `Format` is omitted or `…nameid-format:entity`.
- To let the IdP create a new identifier, the SP includes `<NameIDPolicy AllowCreate="true">`.
- A `<Subject>` in the request names the wanted identity and MUST NOT contain `<SubjectConfirmation>`. If the IdP does not recognize the principal as that identity, it returns an error with no assertions.
- An unauthenticated request is advisory only. Whether signed or not, the IdP MUST verify that the requested ACS URL or index belongs to the SP, or it enables a man-in-the-middle attack.

### Response (Prof §4.1.4.2, with E17, E26 and E52)

- On error, the response contains no assertions.
- The `Response` `Issuer` is required if the response is signed or an assertion is encrypted (E17). Otherwise it is optional.
- At least one assertion; each assertion's `Issuer` is the responding IdP, all assertions come from that IdP, and all `Subject`s refer to the same principal (E26).
- Every assertion issued for this profile is a bearer assertion: it has at least one `SubjectConfirmation` with `Method="urn:oasis:names:tc:SAML:2.0:cm:bearer"` (E26).
- At least one bearer `SubjectConfirmationData` has a `Recipient` equal to the SP's ACS URL and a `NotOnOrAfter` limiting when the assertion can be confirmed (E52). It may have an `Address`, has no `NotBefore`, and in reply to an `AuthnRequest` has an `InResponseTo` equal to the request's ID.
- The bearer assertions contain at least one `AuthnStatement`. If the IdP supports Single Logout, authentication statements include `SessionIndex`.
- Each bearer assertion has an `AudienceRestriction` with the SP's entityID as an `Audience`. The SP must understand and accept any other conditions.
- POST delivery: each assertion MUST be protected by a signature on the `Assertion` or on the `Response` (Prof §4.1.4.5 via E26). With an `EncryptedAssertion` and CBC encryption, the `Response` SHOULD be signed (Prof §4.1.3.5 via E93).
- IdPs SHOULD be able to send error responses to the SP when the user agent is still available and the ACS location is acceptable (Prof §4.1.3.5 via E85).

### SP processing (Prof §4.1.4.3 and §4.1.4.5)

The ordered checklist is in [`response-validation.md`](response-validation.md). The profile's own MUSTs are:

- Verify every signature on the assertions or the response.
- Bearer `Recipient` equals the ACS URL the response or artifact arrived at; bearer `NotOnOrAfter` has not passed, allowing for skew; bearer `InResponseTo` equals the original `AuthnRequest` ID, or is absent for an unsolicited response.
- Assertions are valid in every other respect, and each assertion is evaluated on its own. One valid bearer confirmation is enough (E26).
- The SP MAY check `Address` against the client address.
- Invalid assertions SHOULD be discarded and not used for a session.
- Honour `SessionNotOnOrAfter`, taking the soonest value when there are several (E26).
- Under POST, prevent replay by keeping used IDs until the bearer `NotOnOrAfter` (Prof §4.1.4.5).

### Unsolicited responses (Prof §4.1.5)

- An IdP MAY send a `Response` without a request. Then neither the `Response` nor any bearer `SubjectConfirmationData` carries `InResponseTo`. It SHOULD go to the SP's default ACS.
- Unsolicited responses enable CSRF because nothing proves the client started the transaction. SPs SHOULD be able to turn them off. Solicited flows can bind requests to the client with a cookie, but that does not help if unsolicited responses are still accepted (E90).

### Use of metadata (Prof §4.1.6, "Use of Metadata")

- The IdP publishes `<md:SingleSignOnService>`; the SP publishes indexed `<md:AssertionConsumerService>` endpoints, with `isDefault` marking the default.
- An artifact issuer MUST publish at least one `<md:ArtifactResolutionService>`.
- See [`metadata.md`](metadata.md) for signing flags and keys.

## Single Logout profile (Prof §4.4)

- `<LogoutRequest>`: `Issuer` MUST be present. The requester MUST authenticate itself and protect integrity, by signing or by a binding mechanism. The principal's identifier strongly matches the one in the session's assertion. A session participant includes at least one `SessionIndex`; a session authority MAY omit it to end all sessions (Prof §4.4.4.1).
- `<LogoutResponse>`: `Issuer` MUST be present, with the same authentication and integrity requirement (Prof §4.4.4.2).
- Endpoints are `<md:SingleLogoutService>`. An encrypted identifier uses the responder's encryption `KeyDescriptor` (Prof §4.4.5).
- Over front-channel bindings the only authentication available is a signature, so in practice sign every front-channel logout message (Bind §3.4.5.2, §3.5.5.2).
