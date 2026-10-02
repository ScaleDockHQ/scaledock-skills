# FAPI 2.0 Message Signing and JARM

FAPI 2.0 Message Signing (MS, Final, 25 September 2025) adds application-level signatures for non-repudiation on top of the FAPI 2.0 Security Profile. JARM (Final, 9 November 2022; errata set 1, 17 August 2025) defines the signed authorization response it uses.

## What is signed (MS §5.1, §5.2)

Non-repudiation means the holder of a signing key cannot convincingly deny having signed the data (MS §5.2). The MS profile covers five messages:

| Id  | Message                              | Mechanism                                                 | Section |
| --- | ------------------------------------ | --------------------------------------------------------- | ------- |
| NR1 | Pushed authorization requests        | Signed request object (JAR, RFC 9101) at the PAR endpoint | §5.3    |
| NR2 | Front-channel authorization requests | Achieved by NR1, because FAPI 2.0 uses PAR                | §5.3    |
| NR3 | Authorization responses              | JARM                                                      | §5.4    |
| NR4 | Introspection responses              | RFC 9701 JWT introspection responses                      | §5.5    |
| NR5 | ID tokens                            | Signed ID tokens, verified by the client                  | §5.6    |

Each mechanism is a separate conformance option. The profile gives non-repudiation for individual messages, not for a sequence of messages (MS §6.3).

## Signed request objects (MS §5.3)

Authorization server (§5.3.1):

- Supports, requires and verifies JAR request objects at the PAR endpoint.
- Requires `aud` to be, or to be an array containing, its issuer identifier URL.
- Requires an `nbf` no more than 60 minutes in the past.
- Requires an `exp` no more than 60 minutes after `nbf`.
- Accepts request objects with `typ` `oauth-authz-req+jwt`.

Client (§5.3.2):

- Sends all authorization parameters to the PAR endpoint inside a signed JAR request object.
- Sets `aud` to the issuer identifier URL.
- Sends `nbf`, and an `exp` no more than 60 minutes later.
- Should send `typ` `oauth-authz-req+jwt`.

The client metadata `response_modes` (§5.3.3) lists the response modes a client may use. When it is omitted, the client may use any mode the AS supports.

Example request object payload:

```json
{
  "iss": "s6BhdRkqt3",
  "aud": "https://as.example.com",
  "client_id": "s6BhdRkqt3",
  "response_type": "code",
  "response_mode": "jwt",
  "redirect_uri": "https://client.example.org/cb",
  "scope": "payments",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  "code_challenge_method": "S256",
  "nbf": 1759400000,
  "exp": 1759400300
}
```

It is sent as `request=<signed JWT>` in the authenticated PAR request.

## JARM responses (MS §5.4, JARM §2 to §4)

- The AS supports, requires and issues JARM responses (MS §5.4.1). It should place the RFC 9207 `iss` only inside the JWT, because JARM §4.1 requires all response parameters to be inside it.
- The client sets `response_mode=jwt` and verifies the response per JARM (MS §5.4.2).

The JARM response JWT (JARM §2.1) contains:

- `iss`: the issuer.
- `aud`: the `client_id`.
- `exp`: the expiry. A lifetime of 10 minutes at most is recommended.
- All authorization response parameters, such as `code` and `state`, or `error`.

The JWT is signed, or signed and then encrypted (§2.2).

Response modes (JARM §2.3):

- `query.jwt`, `fragment.jwt` and `form_post.jwt`.
- `jwt`, which means the default for the response type: `query.jwt` for `code`.
- `query.jwt` must not be used with response types that include `token` or `id_token`, unless the response is encrypted.

Client processing (JARM §2.4), in order:

1. Decrypt the JWT if it is encrypted.
2. Check that `iss` is the expected AS.
3. Check that `aud` is the client's own `client_id`.
4. Check that `exp` has not passed.
5. Verify the signature with the AS key, and never accept `none`.
6. Only after all checks pass, process the contained parameters.

Metadata:

- The client registers `authorization_signed_response_alg`, which defaults to RS256 (JARM §3), so a FAPI client registers PS256, ES256 or Ed25519. It can also register `authorization_encrypted_response_alg` and `authorization_encrypted_response_enc`.
- The AS publishes `authorization_signing_alg_values_supported` and `response_modes_supported` (JARM §4).

MS §6.1: FAPI 2.0 authorization responses carry no confidential information, so encrypting them is not required. It is not recommended, for interoperability. PKCE already covers the code-leakage threat in JARM §5.4.

## Signed introspection (MS §5.5, §6.2)

- The AS signs JWT-format introspection responses per RFC 9701.
- The caller requests signed responses and verifies them.
- RFC 9701 treats the resource server as a client of the introspection endpoint. The AS must make sure a regular client cannot call introspection and harvest token data (MS §6.2).

## ID tokens (MS §5.6)

The FAPI 2.0 SP already requires the AS to sign ID tokens. A client that receives ID tokens verifies their signature.

## Checklist

- [ ] PAR requests carry a signed request object with `aud` set to the issuer, `nbf`, and `exp` within 60 minutes of `nbf`.
- [ ] The AS rejects unsigned PAR requests when request signing is enabled.
- [ ] Authorization responses are JARM JWTs; the client checks `iss`, `aud`, `exp` and the signature before reading `code`.
- [ ] The JARM signing algorithm is registered explicitly, not left at the RS256 default.
- [ ] Introspection callers are authorized resource servers, and signed responses are verified.
