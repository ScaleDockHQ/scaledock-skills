# Federation endpoints, errors and draft endpoints

Sources: OpenID Federation 1.1 (Federation) § 8; OpenID Federation Subordinate Events Endpoint 1.0 Implementer's Draft 1 (Subordinate Events); OpenID Federation Extended Subordinate Listing 1.0 Implementer's Draft 1 (Extended Listing). Federation 1.0 contains the same Final rules.

## Common rules (Federation § 8, § 8.8)

- Endpoint locations come from the entity's `federation_entity` metadata (see [`entity-statements.md`](entity-statements.md)).
- Unknown request parameters MUST be ignored.
- Without client authentication, requests are GET with query parameters. With client authentication, requests MUST be POST, with parameters in the body.
- Client authentication is off by default. Federations can make it optional, required or not allowed per endpoint. When used, `private_key_jwt` is the default: the JWT is signed with a Federation Entity Key, its audience MUST be the endpoint owner's Entity Identifier, and the endpoint MUST NOT accept other audience values (Federation § 8.8).
- Per-endpoint `*_auth_methods` metadata parameters say which methods each endpoint supports (Federation § 8.8.1).

## Fetch (Federation § 8.1)

- An entity with Subordinates MUST expose a fetch endpoint and MUST publish its Subordinate Statements through it.
- The endpoint is needed before metadata and policies can be applied, so it MUST be published directly in the Entity Configuration, not in Subordinate Statements.
- Request: `sub` (REQUIRED), the Subordinate's Entity Identifier.
- Response: HTTP 200, `application/entity-statement+jwt`. Errors are JSON (§ 8.9).

```http
GET /federation_fetch_endpoint?sub=https%3A%2F%2Fsunet%2Ese HTTP/1.1
Host: edugain.org
```

## Subordinate listing (Federation § 8.2)

- Exposed by Trust Anchors, Intermediates and Trust Mark Issuers, and published directly in the Entity Configuration.
- Optional filters:
  - `entity_type`, repeatable.
  - `trust_marked=true`: only Subordinates with at least one valid trust mark.
  - `trust_mark_type`: only Subordinates with a valid trust mark of that type.
  - `intermediate=true`: only Intermediates.
- A responder that does not support a filter MUST return HTTP 400 with `unsupported_parameter`.
- Response: HTTP 200, `application/json`, an array of Entity Identifiers.

## Resolve (Federation § 8.3)

- Request:
  - `sub` (REQUIRED).
  - `trust_anchor` (REQUIRED, repeatable). The resolver MAY answer using any one of them.
  - `entity_type` (OPTIONAL, repeatable). Without it, all types are returned.
- The resolver fetches the subject's Entity Configuration, builds and verifies a chain to the Trust Anchor, and applies its policies. It MUST verify that recognized trust marks are active and return only verified ones.
- Response: HTTP 200, `application/resolve-response+jwt`, signed with a Federation Entity Key. `typ: resolve-response+jwt` is required and MUST be checked, and `kid` MUST be present (Federation § 8.3.2).
  - Claims: `iss`, `sub`, `iat`, `exp`, `metadata` (the Resolved Metadata), `trust_chain` (REQUIRED, from the subject to the Trust Anchor), and optional `trust_marks`, holding only valid trust marks from issuers the Trust Anchor trusts for that type.
  - `exp` MUST be the minimum of the chain's `exp` and the `exp` of included trust marks.
  - `aud` SHOULD be present only for an authenticated requester, and then contains only its Entity Identifier.
  - The response MAY also carry the resolver's own chain in the `trust_chain` header. Its Trust Anchor MUST match the requested one.
- Using a resolver means trusting it to validate correctly (Federation § 8.3.3).

## Historical keys (Federation § 8.7)

- An entity MAY publish its retired Federation Entity Keys so that old statements stay verifiable after rotation, unless a key was revoked.
- Response: HTTP 200, `application/jwk-set+jwt`. It is a signed JWT with `typ: jwk-set+jwt`, which MUST be checked, and `kid`.
- Claims: `iss`, `iat`, and `keys`. Each key has `kid` (REQUIRED), `exp` (REQUIRED, after which the key MUST NOT be considered valid) and optional `iat`.
- A revoked key carries `revoked`, with `revoked_at` (REQUIRED) and an optional `reason`: `unspecified`, `compromised`, `superseded`, or federation-defined values (§ 8.7.3).

## Trust mark endpoints

Status, Trust Marked Entities Listing and issuance are covered in [`trust-marks.md`](trust-marks.md).

## Errors (Federation § 8.9)

Error bodies SHOULD be `application/json` with `error` and `error_description`, both REQUIRED.

| `error`                   | HTTP status (SHOULD) | Meaning                                                       |
| ------------------------- | -------------------- | ------------------------------------------------------------- |
| `invalid_request`         | 400                  | The request is incomplete or malformed.                       |
| `invalid_client`          | 401                  | The client is not authorized or not a federation participant. |
| `invalid_issuer`          | 404                  | The endpoint cannot serve this issuer.                        |
| `invalid_subject`         | 404                  | The endpoint cannot serve this subject.                       |
| `invalid_trust_anchor`    | 404                  | The Trust Anchor cannot be found or used.                     |
| `invalid_trust_chain`     | 400                  | The chain cannot be validated.                                |
| `invalid_metadata`        | 400                  | Metadata or policy values are invalid or conflict.            |
| `not_found`               | 404                  | The Entity Identifier cannot be found.                        |
| `unsupported_parameter`   | 400                  | The parameter is not supported.                               |
| `server_error`            | 5xx                  | Unexpected condition.                                         |
| `temporarily_unavailable` | 503                  | Overload or maintenance.                                      |

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": "invalid_request", "error_description": "Required request parameter [sub] was missing."}
```

Error responses are unsigned. TLS often ends at a reverse proxy, so an attacker on that path can inject errors for denial of service (Federation § 18.2).

## Draft: Subordinate Events Endpoint (Implementer's Draft, posture: track)

Pinned to ID1 (the document reads draft 01, 3 July 2026, from the individual workgroup). Do not build on it unless asked, and re-read the source first.

- Trust Anchors and Intermediates MAY publish `federation_subordinate_events_endpoint` in `federation_entity` metadata. It MUST use `https` and MUST NOT have a fragment (Subordinate Events § 2.1, § 2.1.1).
- Request: GET with `sub` (REQUIRED). With client authentication, POST (Subordinate Events § 2.2.1).
- Response: HTTP 200, `application/entity-events-statement+jwt`, a signed JWT with `typ: entity-events-statement+jwt` (Subordinate Events § 2.3.1).
  - Claims: `iss`, `sub`, `iat`, optional `exp`, and `federation_registration_events`, an array of `{iat, event, event_description?, information_uri?}` (Subordinate Events § 2.3.2).
- Event types: `registration`, `metadata_update`, `metadata_policy_update`, `jwks_update`, `revocation`, `suspension`. A `registration` event MUST NOT be provided together with update events (Subordinate Events § 2.3.3).

## Draft: Extended Subordinate Listing (Implementer's Draft, posture: track)

Pinned to ID1 (the document reads draft 03, 2 July 2026, from the OpenID Connect Working Group). Do not build on it unless asked, and re-read the source first.

- Exposed by Trust Anchors and Intermediates at `federation_extended_list_endpoint`. It adds pagination, per-entity details and filters to the standard list endpoint (Extended Listing § 3).
- The issuer MUST keep a consistent order across pages (§ 3.1.1). It is RECOMMENDED to define a practical upper limit on page size (§ 3.1.2).
- Request (§ 3.2): all standard list parameters, plus:
  - `from`: an opaque cursor from `next`. Implementations MUST understand it. An unknown value gets HTTP 404 with `page_not_found`.
  - `limit`: implementations MUST understand it.
  - `updated_after` and `updated_before`: NumericDate filters.
  - `audit_timestamps`: when `true`, include `registered` and `updated`.
  - `claims`: extra Subordinate Statement claims to return, for example `subordinate_statement` or `trust_marks`.
  - `trust_mark_type` becomes repeatable.
  - An unsupported optional filter gets HTTP 400 with `unsupported_parameter`.
- Response (§ 3.3): HTTP 200, `application/json`, with `immediate_subordinate_entities` (REQUIRED) and `next`, which is present when more results exist. Each item has `id` (REQUIRED), plus optional `subordinate_statement`, `registered`, `updated` and the requested claims.
