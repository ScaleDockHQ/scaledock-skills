# Delegation, token exchange and fine-grained authorization

How one service gets a token to call another, and how to express exactly what a token allows. Section numbers refer to the sources pinned in the skill's `## Sources`.

## Token exchange (RFC 8693)

A service that received a token can exchange it at the AS for a new token aimed at a downstream resource.

### Request (§ 2.1)

| Parameter                             | Use                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------- |
| `grant_type`                          | `urn:ietf:params:oauth:grant-type:token-exchange`                                     |
| `subject_token`, `subject_token_type` | REQUIRED. The token that represents the party on whose behalf the request is made.    |
| `actor_token`, `actor_token_type`     | Optional. The token of the acting party; the type is REQUIRED when the token is sent. |
| `resource`, `audience`                | Where the new token will be used.                                                     |
| `scope`                               | The narrower scope wanted downstream.                                                 |
| `requested_token_type`                | The kind of token wanted.                                                             |

Token type identifiers are URNs such as `urn:ietf:params:oauth:token-type:access_token`, `…:refresh_token`, `…:id_token`, `…:jwt`, `…:saml1` and `…:saml2` (§ 3).

```http
POST /token HTTP/1.1
Host: as.example.com
Authorization: Basic cnMwODpsb25nLXNlY3VyZS1yYW5kb20tc2VjcmV0
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Atoken-exchange
&subject_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjE2In0…
&subject_token_type=urn%3Aietf%3Aparams%3Aoauth%3Atoken-type%3Aaccess_token
&resource=https%3A%2F%2Fbackend.example.com%2Fapi
&scope=orders%3Aread
```

### Response and errors

- The response MUST include `access_token`, `issued_token_type` and `token_type` (§ 2.2.1).
- An invalid request or an unacceptable `subject_token` or `actor_token` gives `invalid_request`. A target the AS will not serve SHOULD give `invalid_target` (§ 2.2.2).

### Delegation and impersonation

- With impersonation, the new token simply represents the subject. With delegation, it represents the subject and also names the actor (§ 1.1).
- The `act` claim names the actor. The outermost `act` is the current actor; nested `act` objects are earlier actors in the chain. Only the top-level claims and the current actor are used for access control (§ 4.1).
- The `may_act` claim in a subject token says which party may act for the subject. The AS can use it to decide whether to allow the exchange (§ 4.4).
- Limit delegated tokens with `scope` and a short lifetime (§ 5).

```json
{
  "iss": "https://as.example.com",
  "aud": "https://backend.example.com/api",
  "sub": "user-4711",
  "scope": "orders:read",
  "act": {
    "sub": "https://frontend.example.com",
    "act": { "sub": "https://gateway.example.com" }
  }
}
```

Here `https://frontend.example.com` is the current actor. The gateway is an earlier actor and is informational only.

## Resource indicators (RFC 8707)

`resource` names the protected resource the token is for: an absolute URI with no fragment that SHOULD NOT include a query (§ 2). Send it in authorization, token and token exchange requests so the AS can restrict the audience. A refused value gives `invalid_target`.

## Rich Authorization Requests (RFC 9396)

Use `authorization_details` when a scope string cannot say what is allowed, for example "pay 45 EUR to this account".

- The value is a JSON array of objects. Each object MUST have `type`; the type decides which other fields are allowed (§ 2).
- The common fields `locations`, `actions`, `datatypes`, `identifier` and `privileges` combine as a product within one object. Use several objects for combinations that differ (§ 2.2).
- `scope` and `authorization_details` can be combined; the AS processes both (§ 3.1). The `resource` parameter does not change how details are processed (§ 3.2).
- Unknown types or fields are refused with `invalid_authorization_details` (§ 5).
- The resource server gets the granted details in the access token or through introspection (§ 9).

```json
[
  {
    "type": "https://api.example.com/payment_initiation",
    "actions": ["initiate"],
    "locations": ["https://api.example.com/payments"],
    "instructedAmount": { "currency": "EUR", "amount": "45.00" },
    "creditorAccount": { "iban": "DE02100100109307118603" }
  }
]
```

GNAP (RFC 9635) uses the same structure for its access rights. The `gnap` skill covers it.

## Across trust domains

- **Identity and authorization chaining** combines token exchange at the first AS with the JWT bearer grant at the second AS, so a service can call a resource in another trust domain.
- **Transaction tokens** carry the user and request context between workloads inside one trust domain.

Both are drafts; [drafts.md](drafts.md) has the details and postures.
