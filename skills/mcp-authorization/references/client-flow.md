# MCP client authorization flow

Load this for the client half: from the first 401 to a working token, plus step-up. Rules cite MCP pages by name and heading, and RFCs and drafts by section. The MCP revision is 2026-07-28.

## 1. Find the Protected Resource Metadata

From Authorization Server Discovery, Protected Resource Metadata Discovery Requirements:

1. Send the MCP request without a token. On `401`, parse `WWW-Authenticate`. Clients MUST be able to parse it.
2. If the header has `resource_metadata`, fetch that URL.
3. Otherwise build the well-known URIs and try them in order: first the path form, then the root. For `https://example.com/public/mcp`:
   - `https://example.com/.well-known/oauth-protected-resource/public/mcp`
   - `https://example.com/.well-known/oauth-protected-resource`
4. Check that `resource` in the document matches (RFC 9728 §3.3). When the URL came from the header, it must be identical to the URL of the request that got the 401.

Record the `scope` from the challenge, if any. It drives the initial scope selection below.

## 2. Pick an authorization server

`authorization_servers` can list several entries. The client chooses one, following RFC 9728 §7.6 (Authorization Server Discovery, Authorization Server Location). Each listed authorization server is independent: the client MUST keep separate registration state (client credentials, tokens) per authorization server and MUST NOT assume credentials from one work at another.

## 3. Fetch the authorization server metadata

MCP uses the `oauth-authorization-server` suffix from RFC 8414 §3.1 and also tries OpenID Connect Discovery. Clients MUST try these in order (Authorization Server Discovery, Authorization Server Metadata Discovery).

For an issuer with a path, `https://auth.example.com/tenant1`:

1. `https://auth.example.com/.well-known/oauth-authorization-server/tenant1`
2. `https://auth.example.com/.well-known/openid-configuration/tenant1`
3. `https://auth.example.com/tenant1/.well-known/openid-configuration`

For an issuer without a path, `https://auth.example.com`:

1. `https://auth.example.com/.well-known/oauth-authorization-server`
2. `https://auth.example.com/.well-known/openid-configuration`

Then validate the document (RFC 8414 §3.3, OpenID Connect Discovery §4.3): `issuer` MUST be identical to the issuer used to build the URL. If it differs, do not use the metadata. A document fetched from `https://attacker.example/...` that says `"issuer": "https://honest.example"` is rejected.

Before continuing, check `code_challenge_methods_supported`. If it is absent, the client MUST refuse to proceed, whether the metadata came from RFC 8414 or OpenID Connect Discovery (Authorization Security Considerations, Authorization Code Protection).

## 4. Register the client

Client Registration lists the priority order a client that supports all options SHOULD use:

1. Pre-registered client information for this authorization server.
2. A Client ID Metadata Document (CIMD), when the authorization server metadata has `client_id_metadata_document_supported: true`.
3. Dynamic Client Registration (DCR, RFC 7591), when the metadata has `registration_endpoint`.
4. Ask the user to enter client information.

### Client ID Metadata Documents

MCP clients and authorization servers SHOULD support CIMD, pinned at draft-ietf-oauth-client-id-metadata-document-00 (Client Registration, Client ID Metadata Documents). Client rules from Client Registration, Implementation Requirements:

- Host the document at an HTTPS URL with a path, for example `https://app.example.com/oauth/client-metadata.json`. The URL is the `client_id`.
- Include at least `client_id`, `client_name` and `redirect_uris`.
- `client_id` in the document MUST match the document URL exactly.
- `private_key_jwt` with a JWKS MAY be used for token endpoint authentication (CIMD -00 §6.2).

```json
{
  "client_id": "https://app.example.com/oauth/client-metadata.json",
  "client_name": "Example MCP Client",
  "client_uri": "https://app.example.com",
  "logo_uri": "https://app.example.com/logo.png",
  "redirect_uris": [
    "http://127.0.0.1:3000/callback",
    "http://localhost:3000/callback"
  ],
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

From CIMD -00 itself: the URL MUST use `https`, MUST have a path, MUST NOT have dot segments, a fragment or userinfo, and SHOULD NOT have a query (§3); the `client_id` comparison is simple string comparison, and shared-secret authentication methods are not allowed (§4.1).

Authorization server rules (Client Registration, Implementation Requirements): it SHOULD fetch the document for a URL-formatted `client_id`, MUST check that the fetched `client_id` matches the URL exactly, SHOULD cache it according to HTTP cache headers, MUST validate redirect URIs in the request against the document, and MUST check that the document is valid JSON with the required fields. CIMD -00 §4.3 says the authorization server SHOULD abort the authorization request when the fetch fails, and §4.4 says it MUST NOT cache error responses or invalid documents.

### Pre-registration

MCP clients SHOULD support static client credentials, either built in for a given authorization server or entered by the user after they register a client themselves (Client Registration, Pre-registration).

### Dynamic Client Registration

DCR is deprecated in 2026-07-28; new implementations should use CIMD (Client Registration, Dynamic Client Registration; Key Changes). The Deprecated Features page lists DCR with CIMD as the migration path and gives the earliest removal as the first revision released on or after 2027-07-28.

When a client uses DCR, it MUST send an `application_type`: `native` for desktop apps, mobile apps, CLI tools and localhost web apps, and `web` for remote browser apps. It MUST be ready for registration failures caused by redirect URI rules under OpenID Connect (Client Registration, Application Type and Redirect URI Constraints).

### Authorization server binding

Pre-registered credentials and persisted DCR credentials MUST be keyed by the authorization server's `issuer`. When the protected resource metadata points to a different authorization server, the client MUST NOT reuse old credentials and MUST re-register. CIMD client IDs are portable and need no re-registration (Client Registration, Authorization Server Binding).

## 5. Choose scopes

During the first authorization the client SHOULD use, in order (Authorization, Scope Selection Strategy):

1. The `scope` from the 401 `WWW-Authenticate` header.
2. Otherwise every scope in `scopes_supported`, or no `scope` parameter if `scopes_supported` is undefined.

Clients MUST NOT assume any set relationship between the challenged scopes and `scopes_supported`, and MUST treat the challenged scopes as authoritative for the current operation.

## 6. Send the authorization request

Before redirecting, the client stores one record per request: the PKCE code verifier, the `state` value and the validated `issuer` (Authorization, Authorization Response Validation).

Required parameters:

- `code_challenge` and `code_challenge_method=S256`. PKCE is a MUST, and `S256` is a MUST when technically capable (Authorization Security Considerations, Authorization Code Protection).
- `resource` set to the canonical MCP server URI (Authorization, Resource Parameter Implementation).
- `state`. Clients SHOULD use and verify it and discard results with a missing or wrong `state` (Authorization Security Considerations, Open Redirection).
- A registered `redirect_uri` that is localhost or HTTPS (Authorization Security Considerations, Communication Security).

The canonical server URI (Authorization, Canonical Server URI):

- Valid: `https://mcp.example.com/mcp`, `https://mcp.example.com`, `https://mcp.example.com:8443`, `https://mcp.example.com/server/mcp`.
- Invalid: `mcp.example.com` (no scheme), `https://mcp.example.com#fragment` (fragment).
- Send the most specific URI possible, and use the form without a trailing slash unless the slash matters.
- The canonical form has a lowercase scheme and host; implementations SHOULD still accept uppercase.
- Send `resource` even when the authorization server does not advertise support for it.

RFC 8707 §2 adds that the value MUST be an absolute URI, MUST NOT include a fragment and SHOULD NOT include a query. An authorization server that refuses the value answers with `invalid_target`.

```http
GET /authorize?response_type=code
  &client_id=https%3A%2F%2Fapp.example.com%2Foauth%2Fclient-metadata.json
  &redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback
  &scope=files%3Aread
  &state=af0ifjsldkj
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256
  &resource=https%3A%2F%2Fmcp.example.com%2Fmcp HTTP/1.1
Host: auth.example.com
```

## 7. Validate the callback

On the authorization response, before sending the code to any token endpoint, the client MUST apply RFC 9207 §2.4 (Authorization, Authorization Response Validation):

| `authorization_response_iss_parameter_supported` | `iss` in response | Client action                                                |
| ------------------------------------------------ | ----------------- | ------------------------------------------------------------ |
| `true`                                           | present           | Compare with the recorded issuer by simple string comparison |
| `true`                                           | absent            | Reject the response                                          |
| `false` or absent                                | present           | Compare with the recorded issuer by simple string comparison |
| `false` or absent                                | absent            | Proceed                                                      |

Rules around the table:

- After decoding the form-encoded value, do not fold case, drop default ports, change trailing slashes or normalize percent-encoding before comparing.
- The check also applies to error responses. On a mismatch, the client MUST NOT act on or display `error`, `error_description` or `error_uri`.
- Authorization servers SHOULD send `iss`, and if they do they MUST set `authorization_response_iss_parameter_supported: true`. The page says a future revision is expected to make `iss` a MUST.

Then check `state` against the stored value.

```ts
type PendingAuth = { issuer: string; codeVerifier: string; state: string };

function checkCallback(
  params: URLSearchParams,
  pending: PendingAuth,
  issParameterSupported: boolean,
): string {
  const iss = params.get("iss");
  if (iss !== null) {
    if (iss !== pending.issuer) throw new Error("issuer mismatch");
  } else if (issParameterSupported) {
    throw new Error("missing iss");
  }
  if (params.get("state") !== pending.state) throw new Error("state mismatch");
  const error = params.get("error");
  if (error !== null) throw new Error(`authorization error: ${error}`);
  const code = params.get("code");
  if (code === null) throw new Error("missing code");
  return code;
}
```

## 8. Exchange the code

Send `code`, `code_verifier`, `redirect_uri`, `client_id` and the same `resource` value to the token endpoint (Authorization, Resource Parameter Implementation). Use the token only in `Authorization: Bearer` on every request to the MCP server, never in the query string, and only with the MCP server it was issued for (Authorization, Token Requirements and Token Handling).

```http
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback
&client_id=https%3A%2F%2Fapp.example.com%2Foauth%2Fclient-metadata.json
&resource=https%3A%2F%2Fmcp.example.com%2Fmcp
```

For refresh tokens, see `resource-server.md`. Store tokens securely (Authorization Security Considerations, Token Theft).

## 9. Step up on insufficient scope

Clients acting for a user SHOULD attempt step-up when they get `403` with `error="insufficient_scope"`. `client_credentials` clients MAY step up or abort (Authorization, Step-Up Authorization Flow). The steps:

1. Parse the challenge.
2. Compute the scopes to request as the union of the scopes previously requested and the scopes in this challenge. Servers are not required to repeat previously granted scopes, so a client that requests only the new scopes loses permissions. Security Best Practices, Scope Minimization, states the union as a SHOULD and notes that clients need not remove scopes that a broader scope already implies.
3. Re-authorize with that set.
4. Retry the original request a few times at most, then treat it as a permanent authorization failure.

Clients SHOULD set retry limits and SHOULD track scope upgrade attempts per resource and operation. SEP-2350, "Clarify client-side scope accumulation in step-up authorization" (merged 2026-03-28), is the proposal behind this client-side union.

```ts
function stepUpScopes(
  previouslyRequested: string[],
  challenged: string[],
): string[] {
  return [...new Set([...previouslyRequested, ...challenged])];
}
```
