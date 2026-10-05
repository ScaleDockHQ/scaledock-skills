# OAuth Client Credentials

Load this when an MCP client must reach an HTTP MCP server with no user present: a background service, a CI/CD pipeline, a server-to-server integration or a daemon. OAuth Client Credentials is an MCP authorization extension in the `modelcontextprotocol/ext-auth` repository, listed under **Draft** and marked **Protocol Revision: draft**, pinned at main commit fb374c7 (2026-06-18; the file last changed in ce15435, 2025-10-14). Its extension identifier is `io.modelcontextprotocol/oauth-client-credentials` (OAuth Client Credentials docs page; Extensions Overview). Extensions are optional, additive and versioned separately from the core specification (Authorization, MCP Authorization Extensions). Section numbers below are the extension's own, unless they name another document.

The extension is a draft, so build to the pinned text and expect changes. Draft posture: build at fb374c7.

## When to use it

- Use it when no human is in the loop: background services on a schedule or event, CI/CD pipelines, server-to-server integrations, and daemons or long-running workers (OAuth Client Credentials docs page, When to use it; Authorization Extensions, Choosing the right extension).
- When a human user should explicitly authorize access, use the core authorization code flow instead. When an enterprise IdP must control access for employees, use Enterprise-Managed Authorization (`enterprise-managed-authorization.md`) (Authorization Extensions, Choosing the right extension).
- It applies to HTTP-based transports only (§1.2).

## Requirements (§1.2, §1.3)

- The extension is OPTIONAL. An implementation that adopts it MUST conform to all of its requirements and MUST also conform to the baseline MCP authorization requirements.
- It builds on OAuth 2.1 (draft-ietf-oauth-v2-1-13), RFC 8414, RFC 9728 and RFC 7523.

## How it differs from the core flow

| Topic                           | Core authorization code flow                                                                | Client Credentials extension                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Who is authorized               | A user who approves access in a browser (docs page, What it is)                             | The client itself, with application-level credentials (docs page, What it is)                                                                 |
| User interaction                | Browser redirect and consent                                                                | None (§2.1)                                                                                                                                   |
| Registration                    | Pre-registration, CIMD, then DCR (Client Registration)                                      | Pre-registered credentials only, set up out of band; DCR is not used (§2.1)                                                                   |
| Token request                   | Authorization code with PKCE, after an authorization response checked for `state` and `iss` | `grant_type=client_credentials` with client authentication at the token endpoint (§2.5); there is no authorization request or response (§2.4) |
| Discovery                       | 401, Protected Resource Metadata, authorization server metadata                             | The same steps (§2.4)                                                                                                                         |
| Step-up on `insufficient_scope` | Clients acting for a user SHOULD step up                                                    | `client_credentials` clients MAY step up or abort (Authorization, Step-Up Authorization Flow)                                                 |

## Discovery and flow (§2.4)

1. The client sends an MCP request without a token and gets `401` with `WWW-Authenticate`.
2. It takes the `resource_metadata` URL from the header and fetches the Protected Resource Metadata.
3. It picks an authorization server from the metadata and fetches its metadata, trying the OAuth 2.0 and OpenID Connect discovery endpoints in priority order (the same order as the core flow, `client-flow.md`).
4. It prepares client authentication (JWT assertion or client secret) and POSTs to the token endpoint.
5. It receives an access token and sends it on MCP requests as `Authorization: Bearer <access_token>`.

The examples in §2.5 carry `resource` (the MCP server URI) and `scope` in the token request. Because the extension requires the baseline rules, the core rule that clients MUST send `resource` in the token request applies (Authorization, Resource Parameter Implementation).

## Client authentication (§2.2)

Clients MUST authenticate with one of:

- **JWT authentication (RECOMMENDED)**: RFC 7523 §2.2, `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and a single JWT in `client_assertion`. Omit `client_id` from the body: the client is identified by the `sub` claim of the assertion (§2.5, citing RFC 7523 §3).
- **Client secret**: transmitted in the request content, as OAuth 2.1 §2.4.1 defines.

```http
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyIn0.eyJpc3Mi...cC4hiUPo...
&resource=https%3A%2F%2Fmcp.example.com
&scope=mcp%3Aread
```

```http
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=s6BhdRkqt3
&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw
&resource=https%3A%2F%2Fmcp.example.com
&scope=mcp%3Aread
```

The assertion follows RFC 7523 §3: `iss`, `sub` (MUST be the `client_id`), `aud` (identifies the authorization server; the token endpoint URL MAY be used) and `exp` are required, `iat` and `jti` are optional, and the JWT MUST be signed. An invalid client JWT gets `invalid_client` (RFC 7523 §3.2). The docs page lists the same typical claims, with `iss` and `sub` both set to the client ID (docs page, JWT Bearer Assertions).

The extension does not define how to fill the JWT beyond RFC 7523 or how the authorization server finds the client's keys; SEP-1046 left both open, pending the WIMSE headless JWT authentication and Client ID Metadata Document drafts (SEP-1046, Rationale).

## Authorization server metadata (§2.3)

When the authorization server supports this flow, its metadata MUST include:

- `token_endpoint_auth_methods_supported` with at least one of `private_key_jwt` or `client_secret_basic`.
- `token_endpoint_auth_signing_alg_values_supported` when it supports JWT authentication.

Note the mismatch in the pinned text: §2.2 and its example send the secret in the request body, while §2.3 names `client_secret_basic` (HTTP Basic), and SEP-1046 describes client secrets "via HTTP Basic authentication". Read `token_endpoint_auth_methods_supported` and use a method the authorization server lists.

## Negotiation (docs page, Implementation guide)

- Client: declare the extension in each request's `_meta["io.modelcontextprotocol/clientCapabilities"].extensions` as `"io.modelcontextprotocol/oauth-client-credentials": {}`.
- Server: optionally, and recommended for discoverability, advertise it in `capabilities.extensions` of the `server/discover` result.
- Extensions are opt-in and never active by default (docs page, Client support). A server that requires an authentication extension can reject clients that do not support it (Extensions Overview, Negotiation).

## Server side (docs page, For MCP servers)

Validate the token on every request and check its scopes, as for any token (`resource-server.md`). Audience validation and the ban on token passthrough still apply through the baseline rules.

## Token lifetime (docs page, For MCP clients)

Client credentials tokens typically live shorter than user-delegated tokens. Get a new token before expiry by running the grant again.

## Security considerations (§3)

- Follow OAuth 2.1 §7 security considerations, with attention to client authentication, token storage and handling, communication security and client credential protection.
- For JWT authentication, the extension points to "RFC 7523 Section 5 Security Considerations"; in RFC 7523, §5 is Interoperability Considerations and §6 is Security Considerations. Read both.
- Client secrets are long-lived: keep them in a secrets manager, never in source control; rotate them on a schedule and after any suspected compromise; scope them to the minimum; prefer JWT assertions (docs page, Client Secrets).

## Docs page versus specification

The docs page diagram for JWT assertions shows `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer` with `assertion` (an RFC 7523 §2.1 authorization grant). The normative extension text uses `grant_type=client_credentials` with `client_assertion` (RFC 7523 §2.2 client authentication). Follow the extension text.

## SDKs

The docs page shows the TypeScript `ClientCredentialsProvider` (client secret) and `PrivateKeyJwtProvider` (JWT), and the Python `ClientCredentialsOAuthProvider` and `PrivateKeyJWTOAuthProvider`; both SDKs get and refresh tokens themselves (docs page, SDK examples). For the TypeScript providers, see `typescript-sdk.md`.
