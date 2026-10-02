# OpenID Connect Back-Channel Logout as a revocation input

OpenID Connect Back-Channel Logout 1.0 (Final, incorporating errata set 1, 15 December 2023) is not part of SSF. Its logout token is SET-compatible, and it often feeds the same session-revocation logic as CAEP `session-revoked`. Section numbers refer to Back-Channel Logout.

## Logout token (§2.4)

The logout token is a signed JWT with these claims:

| Claim                             | Requirement                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `iss`, `aud`, `iat`, `exp`, `jti` | REQUIRED.                                                                                                        |
| `events`                          | REQUIRED. It contains the member `http://schemas.openid.net/event/backchannel-logout` with an empty object `{}`. |
| `sub`, `sid`                      | At least one is REQUIRED.                                                                                        |
| `nonce`                           | PROHIBITED, so a logout token cannot be confused with an ID token.                                               |

The `typ` header `logout+jwt` is RECOMMENDED. Unlike an SSF SET, a logout token has `exp`, uses `sub` or `sid` instead of `sub_id`, and uses a different event URI.

```json
{
  "iss": "https://op.example.org",
  "aud": "s6BhdRkqt3",
  "iat": 1759400000,
  "exp": 1759400120,
  "jti": "bWJq",
  "sid": "08a5019c-17e1-4977-8f42-65a12843ea02",
  "events": { "http://schemas.openid.net/event/backchannel-logout": {} }
}
```

## Delivery (§2.5)

- The OP POSTs `logout_token=<JWT>` as `application/x-www-form-urlencoded` to the RP's `backchannel_logout_uri`.
- The OP may retransmit when delivery fails, as in RFC 8935.

## RP validation (§2.6)

1. Validate the signature, using the same algorithm rules as ID tokens. The default is RS256, and `none` is never accepted.
2. Check `iss`, `aud` and `iat` as for ID tokens, and that `exp` has not passed.
3. Check that the token has `sub`, `sid` or both.
4. Check that `events` contains the back-channel logout member.
5. Check that there is no `nonce`.
6. Optionally:
   - Reject a `jti` that was already seen.
   - Check that `iss` and `sub` or `sid` match a known session.
7. On any failure, answer 400.

## RP actions and response (§2.7, §2.8)

- End the sessions identified by `sub` or `sid`.
- Refresh tokens issued without the `offline_access` scope SHOULD be revoked. Those with `offline_access` normally SHOULD NOT be.
- On success, the RP MUST respond 200, and OPs should also accept 204. On failure, respond 400, optionally with an `error` body.
- The response SHOULD carry `Cache-Control: no-store`.

## Metadata

- OP: `backchannel_logout_supported` and `backchannel_logout_session_supported`.
- RP: `backchannel_logout_uri` and `backchannel_logout_session_required`.

## Mapping to SSF

When a service is both an OpenID Connect RP and an SSF receiver, route both inputs into one session-termination function. Keep the validation paths separate:

- The logout token is checked per §2.6.
- The SET is checked per SSF and RFC 8935.

The two token types have different `typ` values, event URIs, subject claims and expiry rules.

## Checklist

- [ ] Logout tokens with a `nonce`, without `sub` or `sid`, or without the logout event member are rejected with 400.
- [ ] Replayed `jti` values are rejected if replay protection is enabled.
- [ ] Matching sessions end, and refresh tokens without `offline_access` are revoked.
- [ ] Responses carry `Cache-Control: no-store`.
