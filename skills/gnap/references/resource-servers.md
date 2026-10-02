# Resource servers (RFC 9767)

RFC 9635 leaves the link between the AS and the resource server (RS) open. RFC 9767 defines a common token model, RS-facing discovery, token introspection, resource registration and derived tokens. Section numbers refer to RFC 9767 unless noted.

## Token model (§ 2.1)

Every GNAP access token has these aspects, whatever its format. The JWT and introspection names come from RFC 9767:

| Aspect                                     | JWT claim           | Introspection field      | Section  |
| ------------------------------------------ | ------------------- | ------------------------ | -------- |
| Value, unique within the security domain   | —                   | `access_token` (request) | § 2.1.1  |
| Issuer                                     | `iss`               | `iss`                    | § 2.1.2  |
| Audience                                   | `aud`               | `aud`                    | § 2.1.3  |
| Key binding, including the proofing method | `cnf`               | `key`                    | § 2.1.4  |
| Flags, such as `bearer`                    | —                   | `flags`                  | § 2.1.5  |
| Access rights                              | —                   | `access`                 | § 2.1.6  |
| Validity window                            | `iat`, `nbf`, `exp` | `iat`, `nbf`, `exp`      | § 2.1.7  |
| Token identifier                           | `jti`               | `jti`                    | § 2.1.8  |
| Authorizing resource owner                 | `sub`               | `sub`                    | § 2.1.9  |
| Client instance                            | `client_id`         | `instance_id`            | § 2.1.11 |
| Label                                      | —                   | `label`                  | § 2.1.12 |

RFC 9767 gives no JWT claim for access rights, and the IANA JWT claims registry has no `access` claim. A JWT-formatted GNAP token that carries rights does so by agreement between the AS and RS (§ 2.2).

Two more rules from the model:

- The key binding includes the proofing method and its parameters. Without them, an attacker could present a valid key with a weaker method (§ 2.1.4).
- Tokens the AS uses for its own APIs, such as continuation and management tokens, MUST be kept apart from RS tokens. Introspection MUST NOT report them active (§ 2.1.14).

## Token formats (§ 2.2)

- The format is opaque to the client and agreed between AS and RS.
- Wherever a format is named explicitly, it MUST come from the IANA "GNAP Token Formats" registry, which starts with `jwt-signed` and `jwt-encrypted` (§ 5.3.2).
- The AS lists formats in discovery, the RS can require one when registering resources, and introspection can return the format.

## RS-facing discovery (§ 3.1)

The AS publishes a JSON document at `/.well-known/gnap-as-rs`, on the same scheme and authority as its grant endpoint:

| Field                            | Meaning                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `grant_request_endpoint`         | REQUIRED. The same grant endpoint clients use; an `https` URL. |
| `introspection_endpoint`         | REQUIRED if introspection is supported.                        |
| `token_formats_supported`        | Registered token formats.                                      |
| `resource_registration_endpoint` | REQUIRED if resource registration is supported.                |
| `key_proofs_supported`           | Registered proofing methods.                                   |

## RS calls to the AS (§ 3.2)

Unless stated otherwise, the RS MUST sign its calls to the AS with one of the RFC 9635 § 7 proofing methods. It identifies itself in `resource_server`, by key or by an instance identifier.

## Introspection (§ 3.3)

The RS POSTs JSON, signed with its own key (not the client's key or the token's key):

| Request member    | Meaning                                           |
| ----------------- | ------------------------------------------------- |
| `access_token`    | REQUIRED. The token value the client presented.   |
| `proof`           | RECOMMENDED. The proofing method the client used. |
| `resource_server` | REQUIRED. The RS identity, by value or reference. |
| `access`          | Optional. The minimum rights the request needs.   |

The AS MUST take every parameter into account. A token is active only if it was issued by this AS, is not revoked or expired, is bound with the stated proofing method, is meant for this RS, and covers the `access` asked about. If the AS cannot process part of the request, it MUST NOT report the token active.

The response has `active` (REQUIRED; when `false`, no other fields). When `true`, it includes `access` (REQUIRED, possibly filtered for this RS or empty), `key` (REQUIRED for bound tokens, MUST NOT appear for bearer tokens), and optionally `flags`, `exp`, `iat` and the other model fields.

```http
POST /introspect HTTP/1.1
Host: server.example.com
Content-Type: application/json
Signature-Input: sig1=…
Signature: sig1=…

{ "access_token": "OS9M2PMHKUR64TB8N6BW7OZB8CDFONP219RP1LT0", "proof": "httpsig", "resource_server": "7C7C4AZ9KHRS6X63AJAO" }
```

## Registering a resource set (§ 3.4)

The RS can POST the rights it protects to the AS's resource registration endpoint:

- `access` (REQUIRED): the rights, in the RFC 9635 § 8 format.
- `resource_server` (REQUIRED): the RS identity.
- `token_formats_supported`: formats the RS can process. The AS MUST return an error if it supports none of them.
- `token_introspection_required`: `true` when the RS expects to introspect.

The AS answers with `resource_reference` (REQUIRED), the string the RS can pass to clients as the `access` value of its challenge, and optionally `instance_id` and `introspection_endpoint`. A failed registration returns 400.

RS-facing errors include `invalid_request`, `invalid_resource_server` and `invalid_access` (§ 3.5).

## Derived tokens (§ 4)

When an RS must call another RS, it acts as a client instance:

- It sends a normal grant request to the grant endpoint, with the incoming token's value in `existing_access_token`.
- It MUST identify itself with its own key in `client` and sign the request.
- The AS MUST check that the presented token is appropriate for the RS that asks.

The derived token can be bound to the RS's own key and limited to what that RS needs. This is safer than reusing the client's token downstream (§ 6.6).

## Validating at the resource server (§ 6.2 to § 6.6)

For every request, check that the token:

1. Is intended for this RS (audience).
2. Is presented with the right key and proofing method. Validate the proof on every request; never reuse a cached proof result for another message (§ 6.4).
3. Names a subject that may access this resource.
4. Was issued by an AS this RS trusts.

Validating only the key proof is not enough: the token itself must also be validated (§ 6.2).

- For self-contained tokens, verify the signature and the fields. For opaque tokens, introspect (§ 6.2). For JWT formats, apply the format's own rules; the `jwt` skill has the checklist (§ 6.7).
- Caching validation results trades speed for a window in which a revoked token still works (§ 6.3).
- Protect token values from exfiltration. A compromised RS can replay bearer tokens and tokens bound to a shared key (§ 6.5).
- Return `WWW-Authenticate: GNAP`, optionally with `as_uri`, `referrer` and an `access` reference, when a token is missing or invalid (RFC 9635 § 9.1).
