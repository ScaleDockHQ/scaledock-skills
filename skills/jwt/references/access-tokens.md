# JWT access tokens and the claims registry

RFC 9068 profiles JWTs as OAuth 2.0 access tokens. Section numbers refer to the sources pinned in the skill's `## Sources`.

## Issuing (RFC 9068 § 2)

- The token MUST be signed and MUST NOT use `none`. Issuers and resource servers MUST support `RS256` (§ 2.1).
- The header `typ` is `at+jwt` (§ 2.1).
- Required claims: `iss`, `exp`, `aud`, `sub`, `client_id`, `iat` and `jti` (§ 2.2).
- Authentication claims `auth_time`, `acr` and `amr` may be added when the user authenticated (§ 2.2.1).
- `scope` SHOULD be present when the request asked for scopes (§ 2.2.3).
- Sign with an asymmetric algorithm, and advertise `jwks_uri` and `issuer` in RFC 8414 metadata (§ 4).
- Use a distinct `aud` for each resource, so a token for one resource fails validation at another (§ 5).

```json
{ "typ": "at+jwt", "alg": "ES256", "kid": "2026-09-ec" }
```

```json
{
  "iss": "https://as.example.com",
  "sub": "5ba552d67",
  "aud": "https://api.example.com",
  "client_id": "s6BhdRkqt3",
  "iat": 1790000000,
  "exp": 1790000600,
  "jti": "dbe39bf3a3ba4238a513f51d6e1691c4",
  "scope": "invoices:read invoices:write",
  "roles": [{ "value": "invoice-approver" }],
  "groups": [
    { "value": "e9e30dba-f08f-4109-8486-d5c6a331660a", "display": "Finance" }
  ]
}
```

## Roles, groups and entitlements (RFC 9068 § 2.2.3.1)

- An AS that puts role, group or entitlement data in access tokens SHOULD use the claim names `roles`, `groups` and `entitlements`, taken from the SCIM User schema (RFC 7643 § 4.1.2), and SHOULD encode values as SCIM does.
- SCIM defines these as multi-valued attributes. RFC 7643 § 8.2 shows `groups` as objects with `value`, `$ref` and `display`.
- Neither RFC defines a vocabulary for `roles` or `entitlements` (RFC 9068 § 2.2.3.1; RFC 7643 § 4.1.2). Document your own values.
- All three are registered in the IANA JWT claims registry with RFC 9068 § 2.2.3.1 as the reference.
- A resource server SHOULD use these claims together with the token's scopes when it makes the access decision (RFC 9068 § 4).

## Validating (RFC 9068 § 4)

A resource server MUST:

1. Check that `typ` is `at+jwt` or `application/at+jwt`, and reject anything else.
2. Decrypt the token if encryption was agreed with the AS. It SHOULD reject an unencrypted token in that case.
3. Check that `iss` exactly matches the AS's issuer identifier.
4. Check that `aud` contains this resource's identifier.
5. Verify the signature with the AS's keys, using the `alg` in the header, and reject `alg: none`.
6. Check that the current time is before `exp`, allowing a few minutes of leeway at most.

Any failure returns `invalid_token` as in RFC 6750 § 3.1. The full checklist is in [verification.md](verification.md).

The explicit `typ` is what keeps an ID token from being accepted as an access token when one AS issues both (§ 5).

## Claims registry

The IANA "JSON Web Token Claims" registry lists every registered claim name and the document that defines it. Look a claim up there before inventing one:

| Claim                                           | Defined in                              |
| ----------------------------------------------- | --------------------------------------- |
| `iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti` | RFC 7519 § 4.1                          |
| `cnf`                                           | RFC 7800 § 3.1                          |
| `scope`, `client_id`                            | RFC 8693 § 4.2, § 4.3                   |
| `act`, `may_act`                                | RFC 8693 § 4.1, § 4.4                   |
| `authorization_details`                         | RFC 9396 § 9.1                          |
| `roles`, `groups`, `entitlements`               | RFC 7643 § 4.1.2 and RFC 9068 § 2.2.3.1 |

For a new claim, register the name or make it collision-resistant, for example a URI you control (RFC 7519 § 4.2). Unregistered short names are private claims and can collide (RFC 7519 § 4.3).
