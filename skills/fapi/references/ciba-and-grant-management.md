# FAPI-CIBA and Grant Management (Implementer's Drafts)

Both documents are Implementer's Drafts, not Final. Label any feature built on them with the pinned revision.

| Draft                                                     | Pin                                                    | Posture                                               |
| --------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| FAPI: Client Initiated Backchannel Authentication Profile | ID1, labelled Draft-02, 15 August 2019                 | Build: the conformance suite certifies FAPI-CIBA OPs. |
| Grant Management for OAuth 2.0                            | ID1, labelled oauth-v2-grant-management-03, 9 May 2023 | Track: no conformance plan is listed for it.          |

## FAPI-CIBA ID1

FAPI-CIBA profiles OpenID Connect CIBA for decoupled flows, where the user approves on another device. ID1 refers to the FAPI 1.0 drafts of its time by their old names. Each token endpoint rule points back to FAPI 1.0 (ID1 §5.2.2 note).

Authorization server (ID1 §5.2.2):

- Supports confidential clients only.
- Ensures the request carries unique authorization context, or requires a `binding_message`.
- Does not support push mode. Supports poll mode. May support ping mode.
- Requires backchannel authentication requests to be signed (CIBA §7.1.1), with `nbf` and `exp` that limit the request lifetime to 60 minutes or less.
- Returns an `acr` claim in the ID token when it supports `acr` and the client asked for it.
- May require a `request_context` claim (§5.3): a JSON object with information for fraud and threat decisions.
- Should not use `login_hint` or `login_hint_token` to carry intent ids or other authorization metadata. Those hints only identify the user.

Client (ID1 §5.2.3.1): ensures enough authorization context, or sends a `binding_message`.

Security notes:

- Push mode is excluded because it delivers tokens to a client-owned endpoint instead of the authenticated token endpoint (ID1 §7.8).
- A ping notification carries only the `auth_req_id` (CIBA §10.2).
- Algorithms follow FAPI 1.0 Part 2 §8.6, that is PS256 or ES256 (ID1 §7.6).

Example signed authentication request payload, shortened from the ID1 example (the original also carries ecosystem-specific intent data):

```json
{
  "iss": "301183373814979",
  "aud": "https://server.example.com/",
  "iat": 1564902738,
  "nbf": 1564902738,
  "exp": 1564903038,
  "jti": "AJxZRpNqlg62UTdy37gu",
  "scope": "openid payments",
  "acr_values": "urn:mace:incommon:iap:silver urn:mace:incommon:iap:bronze",
  "client_notification_token": "_MiUOY07EOCvWR5BVuOL=",
  "login_hint": "john@example.com",
  "binding_message": "S24R",
  "user_code": "6365",
  "requested_expiry": "120",
  "request_context": { "location": { "lat": 51.17397, "lng": -1.82238 } }
}
```

Certification: all FAPI-CIBA OP submissions include poll-mode results, and ping is optional. Ping tests use the notification endpoint `https://www.certification.openid.net/test/a/ALIAS/ciba-notification-endpoint`. Both client JWKS need an `alg`, usually PS256, with ES256 also allowed (Conformance Testing for FAPI-CIBA OPs).

## Grant Management ID1

Grant Management lets a client create, extend, replace, query and revoke the grant behind its tokens.

Authorization request extensions (ID1 §5.1, §5.2):

- Restricted to confidential clients.
- `grant_id` identifies an existing grant that the AS issued to this client.
- `grant_management_action`:
  - `create` makes a new grant.
  - `merge` adds the newly consented permissions to the grant named by `grant_id`.
  - `replace` sets the grant to only the newly consented permissions.
- The parameters work with any authorization request, including PAR and CIBA.

Errors (ID1 §5.4):

- `invalid_grant_id`: the `grant_id` is unknown or invalid, or the logged-in user is not the grant's resource owner.
- `invalid_request`: one of these:
  - A `grant_id` was sent with `create`.
  - A `grant_id` was sent without an action.
  - The action is unsupported.
  - An action is required but missing.

Token response (ID1 §5.5): the AS returns `grant_id` with the tokens.

Grant Management API (ID1 §6):

- Scopes: `grant_management_query` and `grant_management_revoke`.
- The endpoint is `grant_management_endpoint`, over https. The grant resource is `/grants/{grant_id}` under it.
- `GET` returns the grant's current permissions.
- `DELETE` answers `204 No Content`. The AS MUST revoke the grant and every refresh token issued under it, and should revoke the access tokens. RFC 7009 token revocation, in contrast, need not revoke the grant.
- Errors (ID1 §6.6): 404 for an unknown grant URL, 403 when the client may not make the call, and 401 with `invalid_token` when the access token is missing or invalid.

AS metadata (ID1 §7.1):

- `grant_management_actions_supported`: any of `query`, `revoke`, `merge`, `replace`, `create`.
- `grant_management_endpoint`.
- `grant_management_action_required`: when `true`, every authorization request MUST name an action.

Privacy and security (ID1 §9, §10):

- Issue a separate `grant_id` per client and resource owner to prevent correlation, and make sure no personal data can be derived from it.
- A `grant_id` is a public identifier, not a secret. Assume it leaks, for example through authorization requests, and never grant access to grant data on the strength of the `grant_id` alone.

## Checklist

- [ ] CIBA: poll mode works, push mode is refused, and requests are signed with a lifetime of 60 minutes or less.
- [ ] CIBA: `binding_message` or unique context is enforced.
- [ ] Grant Management: only confidential clients can use `grant_id`; error codes follow ID1 §5.4.
- [ ] Grant Management: `DELETE /grants/{id}` revokes the grant and its refresh tokens.
