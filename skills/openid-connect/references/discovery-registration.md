# Discovery and client registration

Sources: OpenID Connect Discovery 1.0 incorporating errata set 2 (Discovery), OpenID Connect Dynamic Client Registration 1.0 incorporating errata set 2 (Registration), OpenID Connect Relying Party Metadata Choices 1.0 (RP Metadata Choices), OpenID Connect Core 1.0 incorporating errata set 2 (Core).

## Fetching the configuration (Discovery § 4)

- The document lives at the issuer plus `/.well-known/openid-configuration`. It MUST be returned as `application/json`, and the endpoint SHOULD support CORS (Discovery § 4). A successful response uses HTTP 200 (Discovery § 4.2).
- The RP MUST retrieve it with an HTTP GET (Discovery § 4.1).
- If the issuer has a path, any trailing `/` MUST be removed before appending the suffix (Discovery § 4.1). For example, the issuer `https://example.com/issuer1` gives `GET /issuer1/.well-known/openid-configuration`.
- The RP MUST check the TLS server certificate, and the configuration URL, the `issuer` value and the ID token `iss` MUST all match exactly (Discovery § 7.2).

```ts
function configurationUrl(issuer: string): string {
  return issuer.replace(/\/$/, "") + "/.well-known/openid-configuration";
}

async function discover(issuer: string): Promise<Record<string, unknown>> {
  const res = await fetch(configurationUrl(issuer), {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`discovery failed: ${res.status}`);
  const doc = (await res.json()) as Record<string, unknown>;
  if (doc.issuer !== issuer)
    throw new Error("issuer mismatch: do not use this document");
  return doc;
}
```

Pass the issuer exactly as configured. The comparison is exact, so do not normalize a trailing slash on the issuer value itself.

## Validation (Discovery § 4.3)

- If any validation fails, every operation that needs the failed information MUST be aborted, and that information MUST NOT be used.
- `issuer` MUST be identical to the URL used as the prefix to `/.well-known/openid-configuration`. It MUST also be identical to `iss` in ID tokens from this issuer.

## Metadata (Discovery § 3)

| Parameter                               | Status                                         | Rule                                                                                                                                        |
| --------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `issuer`                                | REQUIRED                                       | `https` URL with no query or fragment. Identical to the `iss` in ID tokens.                                                                 |
| `authorization_endpoint`                | REQUIRED                                       | `https` URL.                                                                                                                                |
| `token_endpoint`                        | REQUIRED unless only the implicit flow is used |                                                                                                                                             |
| `userinfo_endpoint`                     | RECOMMENDED                                    | `https` URL.                                                                                                                                |
| `jwks_uri`                              | REQUIRED                                       | `https` URL of the OP's JWK Set. When signing and encryption keys are both present, every key MUST have `use`.                              |
| `registration_endpoint`                 | RECOMMENDED                                    |                                                                                                                                             |
| `scopes_supported`                      | RECOMMENDED                                    | The server MUST support the `openid` scope.                                                                                                 |
| `response_types_supported`              | REQUIRED                                       | Dynamic OPs MUST support `code`, `id_token` and `id_token token`.                                                                           |
| `subject_types_supported`               | REQUIRED                                       | `public`, `pairwise`.                                                                                                                       |
| `id_token_signing_alg_values_supported` | REQUIRED                                       | MUST include RS256. `none` MAY be listed but MUST NOT be used unless the response type returns no ID token from the authorization endpoint. |
| `claims_supported`                      | RECOMMENDED                                    |                                                                                                                                             |

Logout and session extensions add `end_session_endpoint`, `check_session_iframe`, `frontchannel_logout_supported` and `backchannel_logout_supported`. See [`logout-and-sessions.md`](logout-and-sessions.md). prompt=create adds `prompt_values_supported`; see [`authentication-request.md`](authentication-request.md).

## Dynamic Client Registration

### Client metadata (Registration § 2)

- `redirect_uris` is REQUIRED. Each authorization request MUST use one of them, compared exactly as simple strings.
- `application_type` is `web` (the default) or `native`.
  - Web clients that use the implicit flow MUST register only `https` redirect URIs, and MUST NOT use `localhost` as the host.
  - Native clients MUST register only custom URI schemes or loopback URLs on `http` with `localhost`, `127.0.0.1` or `[::1]`.
  - The OP MUST verify that all registered redirect URIs follow these constraints. It MAY reject `http` redirect URIs other than native loopback URLs.
- Other common metadata: `response_types`, `grant_types`, `subject_type`, `id_token_signed_response_alg` (default RS256), `token_endpoint_auth_method`, `jwks_uri` or `jwks`, `sector_identifier_uri`, `initiate_login_uri`, `post_logout_redirect_uris`.

### Registration endpoint (Registration § 3)

- The registration endpoint is an OAuth 2.0 protected resource. It MAY require an initial access token. For open registration, the OP SHOULD accept requests without one and MAY rate-limit them.
- Request: an HTTP POST with an `application/json` body of client metadata (Registration § 3.1).
- Success: HTTP 201 with the registered metadata (Registration § 3.2).
  - The OP MUST NOT assign the same `client_secret` to more than one client.
  - `registration_access_token` and `registration_client_uri` are returned together or not at all.
  - `client_secret_expires_at` is REQUIRED when a `client_secret` is issued. The value 0 means it never expires.
- Errors: HTTP 400 with `invalid_redirect_uri` or `invalid_client_metadata` (Registration § 3.3).
- The Client Configuration Endpoint at `registration_client_uri` reads the current registration with the `registration_access_token` (Registration § 4).

```http
POST /connect/register HTTP/1.1
Content-Type: application/json
Host: server.example.com

{
  "application_type": "web",
  "redirect_uris": ["https://client.example.org/callback"],
  "subject_type": "pairwise",
  "sector_identifier_uri": "https://client.example.org/sector.json",
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://client.example.org/jwks.json"
}
```

### Sector identifier (Registration § 5, Core § 8.1)

- `sector_identifier_uri` is an `https` URL that returns a JSON array of redirect URIs.
- Every value in `redirect_uris` MUST be in that array, or registration MUST fail. The OP validates this at registration time.
- The host of this URL becomes the Sector Identifier for pairwise `sub` values.

### Impersonation (Registration § 9.1)

A rogue client can copy a legitimate client's logo. The OP needs to mitigate this phishing risk, for example by warning when the site of the logo does not match the site of the registered redirect URIs, and by warning about untrusted or dynamically registered clients.

## RP Metadata Choices (RP Metadata Choices § 2, § 3)

These plural parameters let an RP list every value it supports, so the OP can pick one. They are input-only: they MUST be used only in registration requests, never in registration or read responses. Responses use the matching single-valued parameter. When both are present in a request, the single value MUST be in the list.

The defined parameters are `subject_types_supported`, `id_token_signing_alg_values_supported`, `id_token_encryption_alg_values_supported`, `id_token_encryption_enc_values_supported`, `userinfo_signing_alg_values_supported`, `userinfo_encryption_alg_values_supported`, `userinfo_encryption_enc_values_supported`, `request_object_signing_alg_values_supported`, `request_object_encryption_alg_values_supported`, `request_object_encryption_enc_values_supported`, `token_endpoint_auth_methods_supported`, `token_endpoint_auth_signing_alg_values_supported`, `introspection_signing_alg_values_supported`, `introspection_encryption_alg_values_supported`, `introspection_encryption_enc_values_supported`, `authorization_signing_alg_values_supported`, `authorization_encryption_alg_values_supported`, `authorization_encryption_enc_values_supported` and `backchannel_authentication_request_signing_alg_values_supported`.

The main use is OpenID Federation Automatic Registration, where the OP sends no registration response (RP Metadata Choices § 2). `token_endpoint_auth_methods_supported` describes the client authentication methods at every authorization server endpoint, not only the token endpoint. The same methods MUST be supported at the revocation, introspection and pushed authorization request endpoints when they exist (RP Metadata Choices § 3).
