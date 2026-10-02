# Security Event Tokens and subject identifiers

## SET claims (RFC 8417 §2.2), as profiled by SSF 1.0 §4

| Claim    | RFC 8417        | SSF 1.0                                                                |
| -------- | --------------- | ---------------------------------------------------------------------- |
| `iss`    | REQUIRED        | Matches the stream's `iss` and the issuer used for discovery (§4.1.6). |
| `iat`    | REQUIRED        |                                                                        |
| `jti`    | REQUIRED        | Unique per SET; poll acknowledgements use it (RFC 8936).               |
| `aud`    | RECOMMENDED     | A string or array naming the receiver (§4.1.8).                        |
| `sub`    | OPTIONAL        | Not used. Subjects go in `sub_id` (§4.1.2).                            |
| `exp`    | NOT RECOMMENDED | Not used (§4.1.7).                                                     |
| `events` | REQUIRED        | Exactly one event per SET (§4.2.1). Each value is a JSON object.       |
| `txn`    | OPTIONAL        | SHOULD be set to correlate SETs from one transaction (§4.1.9).         |
| `toe`    | OPTIONAL        | Time of event; CAEP uses `event_timestamp` inside the event instead.   |

Other rules:

- **Typing (RFC 8417 §2.3, SSF §4.1.1).** The JOSE header `typ` is `secevent+jwt`. This stops a SET from being accepted as an ID token or access token (RFC 8417 §4).
- **Signing (SSF §4.1.3, §4.1.4).** SETs are signed. Receivers get the transmitter keys from the `jwks_uri` in its metadata.
- **Unknown members (SSF §4.2.3).** Receivers ignore unknown fields.
- **Ordering and timing (RFC 8417 §5.3, §5.4).** SET order is not guaranteed. Use `iat`, `txn` and event timestamps to sequence events, not arrival order.

## Subject identifiers (RFC 9493)

A subject identifier is a JSON object with a `format` member (§3). The formats are:

| Format         | Members                                      | Example                                                                          |
| -------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| `account`      | `uri`, an `acct:` URI                        | `{ "format": "account", "uri": "acct:jane@example.com" }`                        |
| `email`        | `email`                                      | `{ "format": "email", "email": "jane@example.com" }`                             |
| `iss_sub`      | `iss`, `sub`                                 | `{ "format": "iss_sub", "iss": "https://idp.example.com/", "sub": "145234573" }` |
| `opaque`       | `id`                                         | `{ "format": "opaque", "id": "11112222333344445555" }`                           |
| `phone_number` | `phone_number`, in E.164                     | `{ "format": "phone_number", "phone_number": "+12065550100" }`                   |
| `did`          | `url`                                        | `{ "format": "did", "url": "did:example:123456" }`                               |
| `uri`          | `uri`                                        | `{ "format": "uri", "uri": "https://user.example.com/" }`                        |
| `aliases`      | `identifiers`, an array of other identifiers | `{ "format": "aliases", "identifiers": [ ... ] }`                                |

- Email addresses are compared after the canonicalization in RFC 9493 §3.2.2.1.
- The `sub_id` JWT claim carries a subject identifier (RFC 9493 §4.1). If both `sub` and `sub_id` are present, they must identify the same subject.

## SSF additions (SSF §3)

- **`sub_id` is mandatory** (§3.1). Every SSF SET has a top-level `sub_id`.
- **Legacy `subject` member** (§3.1.1, §3.1.2). Existing CAEP and RISC event types may also carry `subject` inside the event, but transmitters MUST still include `sub_id`. New event types MUST NOT use `subject`.
- **Simple subjects** (§3.2) are any RFC 9493 identifier.
- **Complex subjects** (§3.3) have `"format": "complex"` and one or more of `user`, `device`, `session`, `application`, `tenant`, `org_unit` and `group`. Each member is itself a subject identifier. All members describe one principal (§3.3.1).
- **SSF-defined formats** (§3.5):
  - `jwt_id`, with `iss` and `jti`, for a specific JWT.
  - `saml_assertion_id`, with `issuer` and `assertion_id`.
  - `ip-addresses`, with an `ip-addresses` array of IPv4 or IPv6 addresses.
- **Other formats** (§3.4). Formats come from the IANA registry, from §3.5, or are proprietary.
- **Critical members** (§3.6). If a complex subject member listed in the transmitter's `critical_subject_members` cannot be processed, the receiver MUST discard the event.

## Example SET payload (SSF §5, Figure 10)

```json
{
  "iss": "https://idp.example.com/",
  "jti": "756E69717565206964656E746966696572",
  "iat": 1520364019,
  "txn": "8675309",
  "aud": "636C69656E745F6964",
  "sub_id": {
    "format": "complex",
    "user": {
      "format": "iss_sub",
      "iss": "https://idp.example.com/3957ea72-1b66-44d6-a044-d805712b9288/",
      "sub": "jane.smith@example.com"
    },
    "device": {
      "format": "iss_sub",
      "iss": "https://idp.example.com/3957ea72-1b66-44d6-a044-d805712b9288/",
      "sub": "e9297990-14d2-42ec-a4a9-4036db86509a"
    }
  },
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/session-revoked": {
      "initiating_entity": "policy",
      "reason_admin": { "en": "Policy Violation: C076E82F" },
      "reason_user": {
        "en": "Land speed violation.",
        "es": "Violacion de velocidad en tierra."
      },
      "event_timestamp": 1600975810
    }
  }
}
```

The JOSE header is `{ "typ": "secevent+jwt", "alg": "...", "kid": "..." }`.
