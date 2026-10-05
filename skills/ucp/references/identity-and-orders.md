# Identity linking and orders

Rules for `dev.ucp.common.identity_linking` and `dev.ucp.shopping.order` in UCP 2026-08-25. Citations name the page and heading: the Identity Linking Capability and the Order Capability.

## Identity linking

### Model

Identity linking lets a platform act for a user at a business using OAuth 2.0. The business is the authorization server and relying party (Identity Linking, Overview and Participants).

| Access level        | Authentication                                  | Example                        |
| ------------------- | ----------------------------------------------- | ------------------------------ |
| Public              | None                                            | Browse a public catalog        |
| Agent-authenticated | Platform credentials                            | Guest checkout, create a cart  |
| User-authenticated  | Platform credentials plus a user identity token | Saved addresses, order history |

Identity linking does not gate negotiation: a capability is negotiated on its own profile presence, and identity linking only declares the scopes that gate user-authenticated operations inside it (Access Levels).

Businesses MUST NOT return stored user-specific state (loyalty, saved instruments, `buyer`) unless the request is user-authenticated and authorized, and MUST return only the authenticated user's values. Platforms MUST treat returned identifiers as opaque (Business-Populated Response Values).

### Discovery

A three-step pipeline (Discovery):

1. Fetch the business's RFC 9728 protected-resource metadata and use the selected `authorization_servers` entry as the issuer, which MAY be on another origin. With no metadata, the issuer is the business domain.
2. Fetch `https://{host}/.well-known/oauth-authorization-server{path}` (RFC 8414). On `404` only, fall back to `{issuer}/.well-known/openid-configuration`. On any other error, MUST abort.
3. The metadata `issuer` MUST match the selected issuer byte for byte, with no normalization.

### Platform rules

From General Guidelines, For Platforms:

- Authenticate at the token endpoint with a method from `token_endpoint_auth_methods_supported`, choosing the strongest compatible one. Confidential clients SHOULD prefer `private_key_jwt` or `tls_client_auth`. Public clients (native, desktop, on-device agents) MUST use `none` with PKCE `S256` and MUST NOT embed a `client_secret`.
- Use the Authorization Code flow with PKCE `code_challenge_method=S256`; SHOULD send an unguessable `state`.
- MUST validate the RFC 9207 `iss` in the authorization response against the issuer, and abort on mismatch.
- Send tokens as `Authorization: Bearer <access_token>`.
- Process `WWW-Authenticate: Bearer` challenges on 401 and 403, use their `scope` parameter for the next authorization request, and SHOULD follow `resource_metadata`.
- On unlink, MUST call the business's RFC 7009 revocation endpoint.

### Business rules

From General Guidelines, For Businesses, and Security Considerations:

- Implement OAuth 2.0 and publish RFC 8414 metadata at `/.well-known/oauth-authorization-server`, with `scopes_supported` and `token_endpoint_auth_methods_supported` populated.
- Return `iss` in the authorization response.
- Enforce PKCE at the token endpoint: reject a missing or invalid `code_verifier` with `invalid_grant`; `plain` MUST NOT be used. Reject failed client authentication with `invalid_client`.
- Match `redirect_uri` exactly, and require the token request to repeat it. For `127.0.0.1` and `[::1]` redirect URIs, ignore the port.
- On every user-authenticated request, validate the token's `iss`, `aud`, `exp`, scopes and `client_id` or `azp` (RFC 9068 Section 4).
- Implement RFC 7009 revocation; revoking a refresh token MUST invalidate the access tokens issued from it, and revoked tokens MUST be rejected.
- Identity linking endpoints use HTTPS with at least TLS 1.2 (Security Considerations); REST checkout endpoints separately need TLS 1.3.

### Scopes

- Scopes are `{capability}:{scope}`, for example `dev.ucp.shopping.order:read`, `dev.ucp.shopping.order:manage` and `dev.ucp.shopping.checkout:manage`. Scope names MUST match `^[a-z][a-z0-9_]*$` (Scopes, Scope Token Format).
- `config.scopes` lists hard gates: each listed scope, well-known or custom, requires a user token for its operations. `scopes_supported` minus `config.scopes` is the optional layer (UCP and OAuth; Scopes).
- Each scope value is an open policy object (`{}` means only "user auth required"; fields such as `min_acr`, `max_token_age`, `require_mfa`, `description`). Platforms MUST ignore unknown fields, and the same policy MUST apply on every identity path (Per-Scope Policy and Metadata).
- Platforms derive scopes by reading `config.scopes`, keeping those whose capability is negotiated, picking the ones for the operations they will call, and applying each policy (Scope Derivation).

### Identity providers and the Accelerated IdP Flow

- A business MAY list trusted external providers in `config.providers` (for example `{"type": "oauth2", "auth_url": "…"}`). It MUST list only providers it trusts and MUST NOT list its own authorization server. A platform that supports no listed provider MUST fall back to direct OAuth (For Businesses; For Platforms).
- The platform obtains a JWT authorization grant from the IdP and presents it at the business's token endpoint. `aud` MUST be a single value (the business issuer), `jti` MUST be present, and `exp` SHOULD be at most 60 seconds after `iat` (JWT Authorization Grant).
- The business MUST check that `iss` matches a listed provider's `auth_url`, that `aud` equals its own issuer, and that the signature verifies against the IdP's `jwks_uri`, failing closed if the JWKS is unavailable. It MUST enforce single use (Business Token Issuance; Security Considerations).
- Failures map to `invalid_grant`, including missing required claims and needed user interaction; an unsatisfiable scope set returns `invalid_scope`. Platforms MUST NOT parse `error_description` (Chaining Errors at the Token Endpoint).
- Businesses SHOULD NOT issue refresh tokens for these grants and SHOULD NOT auto-link accounts across IdPs by email (Token Lifecycle; Business Token Issuance).

### Errors

From Error Handling:

| Case                                            | Response                                                                                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Gated operation, no or invalid token            | `401`, `WWW-Authenticate: Bearer realm="<issuer>"` (plus `error="invalid_token"` when a token was sent), body message `identity_required`      |
| Valid token missing a scope or failing a policy | `403`, `WWW-Authenticate: Bearer realm="<issuer>", error="insufficient_scope", scope="<full required set>"`, body message `insufficient_scope` |

- Both challenges SHOULD include `resource_metadata` pointing at `/.well-known/oauth-protected-resource`.
- The `scope` parameter MUST list the full required set, not only the missing scopes.
- Platforms MUST NOT answer `insufficient_scope` with a fresh linking flow; they request only the missing scopes incrementally.
- A `continue_url` MAY point to non-OAuth onboarding, and MUST NOT carry a pre-built authorization request.
- Successful responses SHOULD carry an info message `identity_optional` when signing in would unlock value (Optional Authentication).

## Orders

### Model

An order is the confirmed result of a checkout (Order Capability, Overview and Data Model):

- `line_items` MUST include every line item that ever existed on the order, with current quantities.
- Fulfillment has **expectations** (buyer-facing promises: items, `destination`, `method_type`, `description`, `fulfillable_on`) and **events**, an append-only log with an open `type` (for example `shipped`, `delivered`).
- **Adjustments** are post-order changes with an open `type` (refund, return, credit, dispute, cancellation), signed quantities and amounts; businesses SHOULD append rather than mutate.

### Get Order

- `GET /orders/{id}` returns a current-state snapshot. Businesses MUST return the full order on every response; `permalink_url` is the authoritative order page (Operations).
- The business MUST authenticate before returning order data. Platform credentials MAY reach orders the platform originated; buyer authorization through identity linking reaches the buyer's orders within the granted scopes (Get Order, Authorization).
- Errors return `ucp.status: "error"` with messages such as `not_found` or `unauthorized` (Error Responses).
- Scopes: `dev.ucp.shopping.order:read` for Get Order and `dev.ucp.shopping.order:manage` for post-purchase changes (Scopes).
- Platforms MUST send `UCP-Agent`, SHOULD use webhooks as the main update channel and Get Order for reconciliation, and SHOULD discard order data when no longer needed (Operations Guidelines).

### Webhooks

- The platform puts its URL in the order capability's `config.webhook_url` in its profile; the business POSTs the full order there (Webhook URL Configuration; Order Event Webhook).
- Headers follow Standard Webhooks (`Webhook-Timestamp`, `Webhook-Id`), except signing, which is RFC 9421 with `UCP-Agent`, `Signature-Input`, `Signature` and `Content-Digest` (Order Event Webhook; Webhook Signature Verification).
- The business signs with a key from its profile `keys`. The platform fetches the business's `/.well-known/ucp`, finds the `kid`, checks `Content-Digest`, verifies the signature, and then MUST confirm the order was created with that business, rejecting webhooks from any other profile (Signing; Verification).
- The platform MUST acknowledge with a 2xx quickly and process asynchronously. The business MUST sign every webhook, send an "order created" event with the full order, send the full order (not deltas) on updates, and retry failed deliveries (Events Guidelines).
