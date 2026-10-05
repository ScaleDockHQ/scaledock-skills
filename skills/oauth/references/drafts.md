# Drafts and their postures

Internet-Drafts change between revisions. Each entry names the pinned revision and a posture:

- **build**: implement the pinned revision's current shape.
- **name**: reserve the identifiers only.
- **track**: follow it; nothing depends on it.

Re-check the IETF datatracker for a newer revision before relying on any of these.

## OAuth 2.1 (draft-ietf-oauth-v2-1-16)

Posture: **build**. A working group draft that consolidates OAuth 2.0 with its security updates. Most of its rules already apply through RFC 9700, so building to it now costs little. OAuth 2.1 is a version line of OAuth, not an extension: its differences from OAuth 2.0 (§ 10), the RFC 9700 section behind each, and the 2.0 to 2.1 upgrade checklist are in [`versions.md`](versions.md).

A resource server MUST check that a token is not expired, is authorized for the resource, has the right scope, and meets any other policy (§ 5.2).

## OAuth Client ID Metadata Document (draft-ietf-oauth-client-id-metadata-document-02)

Posture: **build**. A working group draft that lets a client use an HTTPS URL as its `client_id`, with the client's metadata served at that URL. No prior registration is needed.

The client ID URL (§ 3):

- MUST use `https`, MUST have a path, and MUST NOT have userinfo, dot segments or a fragment. It SHOULD NOT have a query.
- Is compared by simple string comparison.

The document (§ 4):

- Is served with status 200 and MUST contain `client_id` equal to its own URL.
- MUST NOT use shared-secret client authentication: no `client_secret`, and no private keys in the document (§ 4.1).
- Lists redirect URIs, which the AS matches exactly (§ 4.2).

The AS:

- Fetches the document and MUST NOT follow redirects (§ 5). It aborts the authorization if the fetch fails or the document is invalid (§ 5.1).
- May cache the document following HTTP caching rules, but never caches errors or invalid documents (§ 5.2).
- Advertises support with `client_id_metadata_document_supported` in its metadata (§ 6).
- MUST NOT fetch documents from special-use IP addresses (RFC 6890) to prevent server-side request forgery. Development setups may allow loopback when the AS itself runs on loopback (§ 8.6).
- Limits how much it reads; the draft suggests 5 kilobytes (§ 8.7).

```json
{
  "client_id": "https://app.example.com/oauth/client.json",
  "client_name": "Example App",
  "redirect_uris": ["https://app.example.com/callback"],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://app.example.com/oauth/jwks.json"
}
```

## OAuth Identity and Authorization Chaining Across Domains (draft-ietf-oauth-identity-chaining-17)

Posture: **build**. Approved and in the RFC Editor queue, intended as a Proposed Standard.

The flow (§ 2):

1. The client exchanges its token at AS A with RFC 8693 token exchange. `resource` or `audience` names AS B, and one of them is REQUIRED (§ 2.3.1). AS A refuses targets it does not know (§ 2.3.2).
2. AS A returns a JWT authorization grant.
3. The client presents that JWT at AS B using the JWT bearer grant (RFC 7523).
4. AS B validates the JWT as RFC 7523 requires, checks that `aud` identifies AS B, and MUST refuse the request if it cannot identify the subject (§ 2.4.2). It then issues an access token for its own resource.

AS A may transcribe claims for the other domain, for example mapping identifiers (§ 2.5). AS A advertises support with `identity_chaining_requested_token_types_supported` (§ 3). Keep the JWT grant short-lived and single use, and require client authentication at AS B, to limit replay (§ 5.5).

## Transaction Tokens (draft-ietf-oauth-transaction-tokens-11)

Posture: **track**. The working group has reached consensus and is waiting for the write-up.

Transaction tokens carry the identity and context of one request between workloads inside a single trust domain:

- A transaction token is a short-lived JWT, valid for minutes or less (§ 6), with `typ` `txntoken+jwt` (§ 9.1).
- Required claims: `iat`, `aud` (the trust domain), `exp`, `txn`, `sub` (unique within the trust domain), `scope` and `req_wl` (the requesting workload). `tctx` and `rctx` are RECOMMENDED, and `iss` is OPTIONAL (§ 9.2).
- A workload requests one with RFC 8693 token exchange, with `requested_token_type=urn:ietf:params:oauth:token-type:txn_token` and the trust domain as `audience` (§ 11.1).
- It travels in the `Txn-Token` HTTP header, which carries exactly one token (§ 12.1).
- A receiving workload MUST check the signature, that `aud` is its own trust domain, and that the token has not expired. It passes the token on unchanged (§ 12.2).
- A transaction token MUST NOT be used as an OAuth access token (§ 13.13), and MUST NOT be accepted outside the trust domain named in `aud` (§ 9.2).

`tctx`, `rctx` and `req_wl` are not yet in the IANA JWT claims registry.

## OAuth 2.0 RAR Metadata and Error Remediation (draft-ietf-oauth-rar-metadata-remediation-00)

Posture: **track**. A new working group draft (-00); expect changes.

- Adds the `WWW-Authenticate` error `insufficient_authorization`, which a resource server SHOULD return when the token's authorization details are missing or insufficient (§ 4).
- The challenge can carry `authorization_remediation`: a base64url-encoded JSON object with `authorization_details` (what the client should ask for) and `authorization_reference` (an opaque reference with no sensitive data), both RECOMMENDED (§ 4).
- Adds the AS metadata parameter `authorization_details_types_metadata_endpoint`, which returns a JSON object keyed by type with a schema for each (§ 5).
- Suggests the AS consider leaving `authorization_details` out of JWT access tokens and serving them through introspection (§ 6).
- Orders the resource server's errors (§ 7.2): `invalid_token` for a bad token, then `insufficient_scope`, then `insufficient_user_authentication`, then `insufficient_authorization`.
