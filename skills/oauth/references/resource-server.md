# Resource server

A resource server (RS) accepts an access token, decides whether the request is allowed, and answers with a precise challenge when it is not. Section numbers refer to the sources pinned in the skill's `## Sources`.

## Read the token

- Take the token from the `Authorization` header. Use the `Bearer` scheme (RFC 6750 § 2.1) or the `DPoP` scheme for DPoP-bound tokens (RFC 9449 § 7.1).
- Ignore tokens in the URI query. OAuth 2.1 (draft -16 § 5.1) says clients MUST NOT send them there and resource servers MUST ignore them. RFC 6750 § 2.3 already says the query method SHOULD NOT be used.
- Treat the token as a secret: accept it only over TLS, and never put it in page URLs (RFC 6750 § 5.3).

## Validate the token

OAuth 2.1 (draft -16 § 5.2) lists what the RS MUST check: the token is not expired, it is authorized for this resource, it carries the scope the request needs, and it meets any other policy the RS applies.

Get the token's facts in one of two ways:

| Token kind       | How to validate                                                                                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JWT access token | Follow RFC 9068 § 4: check `typ` is `at+jwt` (or `application/at+jwt`), `iss` matches the AS exactly, `aud` contains this resource, the signature verifies with the AS keys from its RFC 8414 metadata, `alg` is not `none`, and `exp` has not passed. The `jwt` skill has the full checklist. |
| Opaque token     | Call the AS introspection endpoint (RFC 7662). POST a form with `token` and an optional `token_type_hint` (§ 2.1). Authenticate the call, because the endpoint MUST require authorization to prevent token scanning (§ 2.1). Accept the token only when `active` is `true` (§ 2.2).            |

Then apply the RS-side rules from the Security BCP:

- **Audience.** Refuse any token that was not issued for this RS (RFC 9700 § 2.3). With RFC 8707, the client asked for the token with `resource` set to this RS's identifier, so the audience should name it.
- **Least privilege.** Check the scope or `authorization_details` against the exact operation, not just "has a token" (RFC 9700 § 2.3).
- **Sender constraint.** If the token is bound to a key or certificate, check the proof on every request. See [sender-constraint.md](sender-constraint.md). A DPoP-bound token sent with the `Bearer` scheme MUST be rejected (RFC 9449 § 7.2).
- **Caching introspection.** The RS MAY cache an introspection result, but MUST NOT keep it past the token's `exp`. Every cached second is a window in which a revoked token still works (RFC 7662 § 4).

## Authorization details

When the AS uses Rich Authorization Requests (RFC 9396), the details reach the RS in the token or the introspection response:

- In a JWT access token, `authorization_details` is a top-level claim, filtered to what this audience needs (§ 9.1).
- In an introspection response, it is a top-level member (§ 9.2).

Each object has a `type`. The common fields `locations`, `actions`, `datatypes`, `identifier` and `privileges` combine as a product within one object (§ 2.2). Compare strings exactly, with no normalization (§ 12). Reject the request when no object covers the type, location and action it needs.

## Delegated tokens

A token from RFC 8693 token exchange can carry an `act` claim. The outermost `act` is the current actor, and nested `act` claims are earlier actors. Make access decisions only on the top-level claims and the current actor. Earlier actors are informational (§ 4.1).

## Answer with a challenge

RFC 6750 § 3 requires a `WWW-Authenticate` header when the request has no usable credentials or they are insufficient. Pick the error code from the failure:

| Situation                                           | Status | Challenge                                                                     | Source         |
| --------------------------------------------------- | ------ | ----------------------------------------------------------------------------- | -------------- |
| No credentials at all                               | 401    | `Bearer` with no `error`                                                      | RFC 6750 § 3.1 |
| Malformed request                                   | 400    | `error="invalid_request"`                                                     | RFC 6750 § 3.1 |
| Expired, revoked, malformed or wrong-audience token | 401    | `error="invalid_token"`                                                       | RFC 6750 § 3.1 |
| Token valid, scope too small                        | 403    | `error="insufficient_scope"`, optional `scope`                                | RFC 6750 § 3.1 |
| Authentication too weak or too old                  | 401    | `error="insufficient_user_authentication"` with `acr_values` and/or `max_age` | RFC 9470 § 3   |
| DPoP proof missing a required nonce                 | 401    | `DPoP error="use_dpop_nonce"` plus a `DPoP-Nonce` header                      | RFC 9449 § 9   |
| DPoP proof invalid                                  | 401    | `DPoP error="invalid_dpop_proof"`                                             | RFC 9449 § 7.1 |

Add `resource_metadata="<URL>"` to the challenge so clients can discover the AS (RFC 9728 § 5.1). It works with both `Bearer` and `DPoP`, and combines with the RFC 9470 parameters.

A DPoP challenge SHOULD carry `algs` with the accepted proof algorithms (RFC 9449 § 7.1). A resource that supports both schemes and receives no credentials SHOULD send both challenges without an error code (RFC 9449 § 7.2):

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://api.example.com/.well-known/oauth-protected-resource", DPoP algs="ES256 PS256"
```

```http
HTTP/1.1 403 Forbidden
WWW-Authenticate: Bearer error="insufficient_scope", scope="invoices:write", resource_metadata="https://api.example.com/.well-known/oauth-protected-resource"
```

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="insufficient_user_authentication", error_description="A different authentication level is required", acr_values="myACR"
```

For missing or insufficient authorization details, the RAR remediation draft adds `error="insufficient_authorization"` with an `authorization_remediation` parameter. Its posture is track; see [drafts.md](drafts.md).

## Publish protected resource metadata

RFC 9728 lets clients learn which AS protects the resource:

- Serve JSON at `/.well-known/oauth-protected-resource`, inserted between the host and any path of the resource identifier (§ 3). For `https://api.example.com/v1` the URL is `https://api.example.com/.well-known/oauth-protected-resource/v1`.
- `resource` is REQUIRED and MUST equal the resource identifier (§ 2, § 3.3). Common members: `authorization_servers`, `jwks_uri`, `scopes_supported` (RECOMMENDED), `bearer_methods_supported`, `resource_name`, `resource_documentation`, `resource_policy_uri`, `resource_tos_uri`, `tls_client_certificate_bound_access_tokens`, `authorization_details_types_supported`, `dpop_signing_alg_values_supported` and `dpop_bound_access_tokens_required` (§ 2).
- Clients MUST check that `resource` equals the identifier they used, or the request URL when they found the metadata through `WWW-Authenticate`, and MUST validate signed metadata (§ 3.3).

```json
{
  "resource": "https://api.example.com",
  "authorization_servers": ["https://as.example.com"],
  "scopes_supported": ["invoices:read", "invoices:write"],
  "bearer_methods_supported": ["header"],
  "dpop_signing_alg_values_supported": ["ES256", "PS256"]
}
```

## Example: JWT access token check

Framework-neutral TypeScript with the `jose` library. It validates a JWT access token, rejects a key-bound token sent as `Bearer`, and builds the challenges above.

```ts
import { createRemoteJWKSet, jwtVerify } from "jose";

const ISSUER = "https://as.example.com";
const RESOURCE = "https://api.example.com";
const METADATA = `${RESOURCE}/.well-known/oauth-protected-resource`;
const jwks = createRemoteJWKSet(new URL(`${ISSUER}/jwks`));

type Decision =
  | { allow: true; subject: string; scopes: Set<string> }
  | { allow: false; status: 400 | 401 | 403; challenge: string };

const deny = (status: 400 | 401 | 403, params: string): Decision => ({
  allow: false,
  status,
  challenge: `Bearer ${params ? `${params}, ` : ""}resource_metadata="${METADATA}"`,
});

export async function authorize(
  header: string | null,
  requiredScope: string,
): Promise<Decision> {
  if (!header) return deny(401, "");
  const match = /^Bearer\s+([A-Za-z0-9\-._~+/]+=*)$/i.exec(header);
  if (!match) return deny(400, 'error="invalid_request"');

  try {
    const { payload } = await jwtVerify(match[1], jwks, {
      issuer: ISSUER,
      audience: RESOURCE,
      algorithms: ["RS256", "ES256"],
      typ: "at+jwt",
    });
    if (payload.cnf !== undefined) return deny(401, 'error="invalid_token"');
    const scopes = new Set(
      typeof payload.scope === "string" ? payload.scope.split(" ") : [],
    );
    if (!scopes.has(requiredScope)) {
      return deny(403, `error="insufficient_scope", scope="${requiredScope}"`);
    }
    return { allow: true, subject: String(payload.sub), scopes };
  } catch {
    return deny(401, 'error="invalid_token"');
  }
}
```

The `cnf` check implements RFC 9449 § 7.2 and RFC 8705 § 3 for a resource that accepts only bearer tokens: a token that names a key must arrive with its proof. If the resource supports DPoP, route `DPoP` requests to the checks in [sender-constraint.md](sender-constraint.md) instead.
