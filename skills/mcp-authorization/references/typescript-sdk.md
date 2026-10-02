# MCP TypeScript SDK authorization support

Load this when the server or client uses the official MCP TypeScript SDK. The v2 line implements MCP 2026-07-28; this file pins the docs and source at tag v2.2.0 (packages released 2026-09-28). Documentation: <https://ts.sdk.modelcontextprotocol.io/v2/>. Each heading below names the SDK doc page it comes from.

The SDK is a convenience layer. The invariants in `SKILL.md` still apply, and the sections below list what the app must still do itself.

## Server: Require authorization (`docs/serving/authorization.md`)

- **The gate.** `requireBearerAuth({ verifier, requiredScopes, resourceMetadataUrl })` exists in `@modelcontextprotocol/express` (middleware) and `@modelcontextprotocol/server` (web-standard `fetch` hosts). The web-standard gate resolves to the verified `AuthInfo` or to a ready-to-return challenge `Response`.
- **Responses.** A missing, malformed or expired token gets `401` with `invalid_token`. A token missing a `requiredScopes` entry gets `403` with `insufficient_scope`. Both carry `WWW-Authenticate: Bearer` with `resource_metadata`.
- **Your verifier.** You supply `verifyAccessToken(token): Promise<AuthInfo>`, returning `{ token, clientId, scopes, expiresAt }`. It can verify a JWT, call RFC 7662 introspection, or call the IdP. Throw `OAuthError` with `OAuthErrorCode.InvalidToken` to reject; any other exception becomes `500 server_error`. A token without `expiresAt` gets `401`, so always set it.
- **Metadata.** `mcpAuthMetadataRouter({ oauthMetadata, resourceServerUrl })` (Express) and `oauthMetadataResponse(request, { … })` (web-standard) serve `/.well-known/oauth-protected-resource/mcp` and mirror the authorization server metadata at `/.well-known/oauth-authorization-server`. `getOAuthProtectedResourceMetadataUrl(url)` builds the URL the challenge points to.
- **Handlers.** Tool handlers read the caller as `ctx.http.authInfo`. `ctx.http` is undefined over stdio.
- **Per-operation scopes.** Set `scopeChallenge` on `registerTool`, `registerResource` or `registerPrompt`, either `requireScopes('notes:write')` for a fixed all-of check or a callback that returns the complete scope set. The SDK then sends `403 insufficient_scope` before invocation. Throwing in the callback fails closed.
- **Authorization server helpers.** The v1 helpers (`mcpAuthRouter`, `ProxyOAuthServerProvider`) are frozen in `@modelcontextprotocol/server-legacy/auth`; the page recommends a dedicated identity provider for new servers.

What the app still owns on the server:

- **Audience validation.** The documented verifier example maps `sub`, `scopes` and `exp` and does not check the audience. Your `verifyAccessToken` must reject tokens not issued for this server (Authorization, Token Handling).
- **Scope hierarchies.** The SDK does not infer hierarchies, alternatives or missing scopes; your callback must, because servers MUST account for hierarchies (Authorization, Step-Up Authorization Flow).
- **Validating arguments.** The `scopeChallenge` callback runs before input schema validation and sees raw JSON values. Validate any argument whose meaning the schema would change.
- **No-token challenges.** The SDK sends `invalid_token` even when no token was sent. RFC 6750 §3 says a server SHOULD NOT include an error code when the request had no authentication. Clients still find `resource_metadata` either way.

## Client: Authenticate a user with OAuth (`docs/clients/oauth.md`)

- **Provider.** Pass an `OAuthClientProvider` as the transport's `authProvider` (`@modelcontextprotocol/client`). On a server that requires authorization, the SDK runs discovery, registers or looks up the client, calls `redirectToAuthorization(url)`, and `connect()` throws `UnauthorizedError`.
- **Per-issuer credentials.** The provider stores client information, tokens, the PKCE verifier and discovery state. `clientInformation(ctx)` and `saveClientInformation(info, ctx)` receive `ctx.issuer`; key credentials by it (Client Registration, Authorization Server Binding). `saveDiscoveryState` records what discovery resolved, so the code is exchanged at the same authorization server.
- **Application type.** For a loopback redirect the SDK defaults `application_type` to `native`; set it explicitly when that is wrong.
- **CIMD.** The provider's optional `clientMetadataUrl` is used as the `client_id` when the authorization server metadata has `client_id_metadata_document_supported: true`. It must be an HTTPS URL with a non-root path, or the SDK throws (v2.2.0 `packages/client/src/client/auth.ts`).
- **Callback.** `finishAuth(params)` with the whole callback `URLSearchParams` validates RFC 9207 `iss` and exchanges the code. It throws `IssuerMismatchError` with `kind: 'authorization_response'`; the same check during discovery against the RFC 8414 `issuer` throws with `kind: 'metadata'`. The positional form `finishAuth(code, iss)` is rejected when it drops `iss` and the authorization server advertises RFC 9207 support.
- **State.** The SDK does not validate `state`. MCP says clients SHOULD use and verify it (Authorization Security Considerations, Open Redirection), so compare it before calling `finishAuth`, then reconnect on a fresh transport.

```ts
const params = new URL(callbackUrl).searchParams;
if (params.get("state") !== provider.lastState)
  throw new Error("state mismatch");
await transport.finishAuth(params);
```

## Client: Authenticate without a user (`docs/clients/machine-auth.md`)

- **Client credentials.** `ClientCredentialsProvider` runs the `client_credentials` grant with a client secret. `PrivateKeyJwtProvider` runs the same grant with `private_key_jwt` (RFC 7523). It signs a fresh assertion per request, with a 300-second default lifetime.
- **Issuer pinning.** Both take `expectedIssuer`. If discovery resolves a different issuer, the SDK throws `AuthorizationServerMismatchError` instead of sending the credential. Omitting `expectedIssuer` is deprecated; always set it.
- **External tokens.** An `AuthProvider` with only `token()` covers tokens managed outside the SDK. Add `onUnauthorized(ctx)` to refresh on 401.
- **Enterprise-Managed Authorization (SEP-990).** `CrossAppAccessProvider` exchanges the ID-JAG for an access token. Its `assertion` callback supplies the ID-JAG, for example from `discoverAndRequestJwtAuthGrant({ idpUrl, audience: ctx.authorizationServerUrl, resource: ctx.resourceUrl, idToken, … })`. Pass `ctx.authorizationServerUrl` as `audience` and `ctx.resourceUrl` as `resource` so the grant is bound correctly. The standalone functions are `requestJwtAuthorizationGrant`, `discoverAndRequestJwtAuthGrant` and `exchangeJwtAuthGrant`.
