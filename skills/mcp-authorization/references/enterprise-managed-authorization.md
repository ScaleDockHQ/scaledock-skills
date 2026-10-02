# Enterprise-Managed Authorization

Load this when an enterprise identity provider (IdP) must control which users can use which MCP clients with which MCP servers. Enterprise-Managed Authorization is an MCP authorization extension in the `modelcontextprotocol/ext-auth` repository, marked **Status: Stable**, pinned at main commit e5eef54 (2026-06-18). Extensions are optional, additive and versioned separately from the core specification (Authorization, MCP Authorization Extensions). Section numbers below are the extension's own, unless they name the ID-JAG draft.

The extension profiles the Identity Assertion JWT Authorization Grant (ID-JAG), pinned at draft-ietf-oauth-identity-assertion-authz-grant-04, which is the latest revision on 2026-10-02. It is an IETF working group draft, so expect changes before it becomes an RFC.

## Roles (§1.2)

- **Client**: the MCP client.
- **Resource Server**: the MCP server.
- **Resource Authorization Server**: the authorization server that issues tokens for the MCP server, as listed in its Protected Resource Metadata.
- **IdP Authorization Server (IdP)**: the enterprise identity provider used for single sign-on.

## The three steps (§2)

1. Single sign-on to the MCP client with OpenID Connect or SAML. With SAML, the client can first exchange the assertion for a refresh token.
2. Token exchange at the IdP (RFC 8693): ID Token (or refresh token) in, ID-JAG out.
3. JWT authorization grant at the Resource Authorization Server (RFC 7523 §2.1): ID-JAG in, access token out.

## Token exchange at the IdP (§4)

The request follows ID-JAG -04 §4.3. In this profile:

- `audience` MUST be the issuer identifier of the Resource Authorization Server.
- `resource` is OPTIONAL. If set, it MUST be the RFC 9728 resource identifier of the MCP server.
- If the IdP requires client authentication for single sign-on, it is also required for the token exchange.

```http
POST /oauth2/token HTTP/1.1
Host: acme.idp.example
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&requested_token_type=urn:ietf:params:oauth:token-type:id-jag
&audience=https://auth.chat.example/
&resource=https://mcp.chat.example/
&scope=chat.read+chat.history
&subject_token=eyJraWQiOiJzMTZ0cVNtODhwREo4VGZCXzdrSEtQ...
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&client_id=2ec954a1d60620116d36d9ceb7
&client_secret=a26d84873504215a34a86d52ef5cd64f4b76
```

The IdP applies its administrator policy (§4.1, ID-JAG -04 §4.3.3) and, if access is granted, returns (§4.2):

```json
{
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
  "access_token": "eyJhbGciOiJIUzI1NiIsI...",
  "token_type": "N_A",
  "scope": "chat.read chat.history",
  "expires_in": 300
}
```

The ID-JAG is in `access_token`, but it is not an access token for the MCP server; `token_type` is `N_A`. Errors are OAuth token error responses (RFC 6749 §5.2).

## The ID-JAG (§4.3)

The ID-JAG is a JWT signed by the IdP with header `typ: oauth-id-jag+jwt` and the claims of ID-JAG -04 §3.1. In this profile, a `resource` claim, if present, MUST be the MCP server's resource identifier.

```json
{
  "jti": "9e43f81b64a33f20116179",
  "iss": "https://acme.idp.example",
  "sub": "U019488227",
  "email": "user@example.com",
  "aud": "https://auth.chat.example/",
  "resource": "https://mcp.chat.example/",
  "client_id": "f53f191f9311af35",
  "exp": 1311281970,
  "iat": 1311280970,
  "scope": "chat.read chat.history"
}
```

## Access token request at the Resource Authorization Server (§5)

The client sends the ID-JAG as an RFC 7523 JWT bearer grant (ID-JAG -04 §4.4) and authenticates with the credentials it has at the Resource Authorization Server. Without pre-registration, it can use a Client ID Metadata Document as its `client_id`, optionally with `private_key_jwt`.

```http
POST /oauth2/token HTTP/1.1
Host: auth.chat.example
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
&assertion=eyJhbGciOiJIUzI1NiIsI...
&client_id=https://client.example.com/client.json
```

Validation by the Resource Authorization Server (§5.1, ID-JAG -04 §4.4.1):

- Check the JWT `typ` is `oauth-id-jag+jwt`.
- `aud` MUST contain this authorization server's issuer identifier, as a single string or an array with exactly one element; otherwise reject with `invalid_grant`.
- The `client_id` claim MUST match the authenticated client; otherwise reject with `invalid_grant`.
- Process `resource` per RFC 8707 §2, `scope` per RFC 6749 §3.3 and `authorization_details` per RFC 9396; the granted set MAY be a subset of what the ID-JAG carries.
- The general RFC 7523 §3 rules also apply: `iss`, `sub`, `aud` and `exp` are required, the signature MUST be valid, and expired JWTs are rejected.
- The issued access token MUST be audience-restricted to the MCP server named in the ID-JAG `resource` claim (§5.1).

The response is a normal OAuth token response with `token_type: Bearer` (§5.2). The client then calls the MCP server as in the core flow.

## Discovery (§6)

A Resource Authorization Server supports this profile when its metadata has `urn:ietf:params:oauth:grant-profile:id-jag` in `authorization_grant_profiles_supported` (ID-JAG -04 §7.2). ID-JAG -04 §7.2 also requires that a server listing this profile lists `urn:ietf:params:oauth:grant-type:jwt-bearer` in `grant_types_supported`.

## Security considerations (§7)

- **Client registration (§7.1)**: most IdPs let users sign in only to pre-registered clients, so the MCP client is usually pre-registered with the IdP. ID-JAG -04 §5 defines how the IdP picks the `client_id` it puts in the ID-JAG.
- **Visibility (§7.2)**: the IdP takes part in issuing the access token but does not see MCP traffic. It can enforce which users may use which clients with which servers, and, depending on the server's scopes, which scopes they get.

## TypeScript SDK

The SDK's `CrossAppAccessProvider` implements this flow; see `typescript-sdk.md`.
