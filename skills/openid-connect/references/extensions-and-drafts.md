# Extensions and drafts: Identity Assurance, Key Binding, IPSIE SL1

Sources: OpenID Connect for Identity Assurance 1.0 incorporating errata set 1 (IDA), OpenID Connect Key Binding 1.0 Implementer's Draft 1 (Key Binding), IPSIE SL1 OpenID Connect Profile editor's draft (IPSIE SL1).

Identity Assurance is Final. Key Binding and IPSIE SL1 are drafts and are applied only at the posture below.

| Document                                    | Status              | Posture                                       | Meaning                                                                                                     |
| ------------------------------------------- | ------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Identity Assurance 1.0 errata set 1         | Final               | Build when verified identity data is in scope | Implement as specified.                                                                                     |
| Key Binding 1.0, ID1 (draft 03)             | Implementer's Draft | Track                                         | Follow the draft. Nothing in a production design depends on it. Build against ID1 only on explicit request. |
| IPSIE SL1, 29 September 2026 editor's draft | Draft               | Track                                         | Use as a checklist on request. Do not claim conformance; the profile can still change.                      |

## Identity Assurance (summary)

- Verified data travels in a `verified_claims` container. It holds `verification`, which names a `trust_framework`, and `claims`, which holds the verified claims. Keeping them separate stops an RP from treating unverified claims as verified (IDA § 5.1). The full schema lives in a separate document that IDA references.
- `verified_claims` can be returned in the ID token, at UserInfo, or both (IDA § 5.2).
- The RP requests verified claims with the `claims` parameter (Core § 5.5) or with scopes that map to predefined claim sets (Core § 5.4) (IDA § 7, § 5.8). The OP shall not provide data the RP did not request, and may omit claims at its discretion (IDA § 7).
- Errors use the standard authentication error response of Core § 3.1.2.6 (IDA § 5.7.6).
- OP metadata (IDA § 8):
  - `trust_frameworks_supported` and `claims_in_verified_claims_supported` are required. Claims missing from the second list shall not be returned inside `verified_claims`.
  - `evidence_supported` is required when the OP supports any evidence type. `documents_supported` is required when it includes `document`, and `electronic_records_supported` when it includes `electronic_record`.
  - `documents_check_methods_supported` is optional.
- Implementers shall combine IDA with an appropriate security profile for OpenID Connect, and shall authenticate End-Users with appropriately strong methods (IDA § 10.1). Strong identification with weak authentication gives a false sense of security (IDA § 10.2).

```json
{
  "userinfo": {
    "verified_claims": {
      "verification": { "trust_framework": null },
      "claims": { "given_name": null, "family_name": null }
    }
  }
}
```

## Key Binding (Implementer's Draft, posture: track)

Pinned to ID1 (the document reads draft 03, 8 September 2026). Re-read the source before building; section numbers and parameters can change between drafts.

- The RP asks for a key-bound ID token with the scope `bound_key` in the authentication request (Key Binding § 1.4). The OP advertises support with `bound_key` in `scopes_supported` and lists `dpop_signing_alg_values_supported` (Key Binding § 1.3).
- Only the authorization code flow and the device authorization flow are covered. The implicit and hybrid flows MUST NOT be used (Key Binding § 1.4).
- Authentication request: `dpop_jkt` carries the JWK SHA-256 thumbprint of the End-User's public key (Key Binding § 2.1).
- Token request: a DPoP proof whose payload has `c_s256`, the base64url SHA-256 of the authorization code, with `typ: dpop+jwt`. The OP MUST validate the proof per RFC 9449 § 5 and check `c_s256`. If the RP sends a DPoP header without an earlier `dpop_jkt`, the OP MUST NOT include `cnf` in the ID token (Key Binding § 2.3). For the device flow, `c_s256` hashes the `device_code` (Key Binding § 3).
- Token response: the OP MUST return an ID token with `cnf.jwk` set to the End-User's public key and `typ: dpop+id_token` in the protected header. A refresh token, if returned, MUST be bound to the same key (Key Binding § 4, § 5).
- The RP MUST NOT present the key-bound ID token outside its trust boundary. A consuming component MUST verify that `aud` is one of the `client_id` values it accepts (Key Binding § 6).
- A consuming component MUST NOT trust an ID token with `cnf` without a proof of possession, and MUST independently validate the ID token (Key Binding § 9.2, § 9.3). How that proof is made between components is out of scope (Key Binding § 7).
- The ID token MUST NOT be used as an access token (Key Binding § 9.5).

## IPSIE SL1 OpenID Connect profile (Draft, posture: track)

Pinned to the editor's draft published 29 September 2026 (`draft-openid-ipsie-sl1-profile-latest`, after -01). It profiles Core, Discovery, OAuth 2.0 and PKCE for enterprise login, and requires the IPSIE Common Requirements profile (IPSIE SL1 § 3.1), which this skill does not cover.

### OP requirements (IPSIE SL1 § 3.2.1)

- Publish discovery metadata. Reject the resource owner password credentials grant. Support public clients. Expose no open redirectors.
- Accept only the OP's issuer identifier, as a string, in the `aud` of client authentication assertions.
- Require pre-registered clients and pre-registered redirect URIs. Do not support unauthenticated Dynamic Client Registration.
- Access tokens are only for retrieving identity claims at the OP. The OP SHOULD issue only DPoP sender-constrained access tokens.
- ID tokens:
  - `aud` is the RP's client ID as a single string.
  - `acr` reflects the class actually satisfied, even when a requested class was not met.
  - `amr` uses IANA-registered values.
  - `auth_time` is present.
  - `session_expiry` is at least 300 seconds after `iat`. This claim is defined in a separate Connect working group draft that this skill does not pin.
- Code flow:
  - Require `response_type=code` and PKCE with S256, and match registered redirect URIs exactly.
  - Codes live at most 60 seconds and are rejected on reuse.
  - Return `iss` in the authorization response (RFC 9207).
  - Do not allow `http` redirect URIs. Do not use HTTP 307 for redirects that carry credentials; use 303 when redirecting with a status code (SHOULD).
  - Support `nonce` values up to 64 characters and `max_age`, and support `acr_values`.
  - Be able to satisfy a two-factor authentication context class. When `acr_values` is present, satisfy one of the values or return an error.

### RP requirements (IPSIE SL1 § 3.2.2)

- Support login initiated by a third party (Core § 4).
- Put the OP's issuer identifier in the `aud` of client authentication assertions, as a string.
- Expose no open redirectors.
- Use only metadata from the discovery document. Get the issuer URL from an authoritative source over a secure channel, and check it matches the metadata `issuer`.
- For resource requests to the OP, support DPoP, including the server-provided nonce, and send access tokens in the HTTP header.
- Code flow:
  - Use the authorization code grant, with PKCE S256 generated per request and bound to the client and user agent.
  - Check `iss` in the authorization response (RFC 9207).
  - Use `nonce` values of at most 64 characters (SHOULD). Send `max_age` (SHOULD). `acr_values` MAY be used.
- In addition to Core § 3.1.3.7:
  - `aud` is a single string equal to the client ID.
  - Validate `auth_time` against `max_age`.
  - Re-authenticate after `session_expiry`.
