# The Payment authentication scheme

Read this when issuing or verifying challenges, building a paying client, or reviewing error handling, caching and security. Source: draft-httpauth-payment-01 ("core §"), with RFC 9110, RFC 8785 and RFC 9457, listed in [Sources](../SKILL.md#sources).

## Flow and status codes

1. The client requests a resource. The server answers 402 with one or more `WWW-Authenticate: Payment` challenges.
2. The client picks a challenge, pays with the named method, and retries with a Payment credential.
3. The server verifies and settles, then returns the resource, normally with `Payment-Receipt`.

| Condition                                    | Status | Response                                |
| -------------------------------------------- | ------ | --------------------------------------- |
| Payment required, no credential              | 402    | Fresh challenge                         |
| Malformed credential (bad base64url or JSON) | 402    | Fresh challenge, `malformed-credential` |
| Unknown or already-used challenge `id`       | 402    | Fresh challenge, `invalid-challenge`    |
| Expired challenge                            | 402    | Fresh challenge, `payment-expired`      |
| Proof invalid or verification failed         | 402    | Fresh challenge, `verification-failed`  |
| Payment verified, access granted             | 200    | Resource, optional `Payment-Receipt`    |
| Payment verified, policy denies access       | 403    | No challenge                            |

Source: core § 4.2, Table 1.

- 402 is used for every payment barrier, including failed credentials; 401 is reserved for authentication failures unrelated to payment (core § 4.3).
- Return 402 when payment is the primary barrier and a challenge can be built; do not return it for missing authentication (401), missing authorization (403) or a missing resource (404). Never return 402 without at least one Payment challenge (core § 4.4.1, § 4.4.2).
- When a resource needs both authentication and payment, verify authentication first, return 401 if it fails, and only then return 402 (core § 4.4.3).
- `Retry-After` MAY tell clients when to retry (core § 8.3).
- Clients must expect 402 through any proxy or CDN; servers must not rely on intermediaries treating 402 like 401 (core § 11.9).

## Challenge

`WWW-Authenticate: Payment` uses the RFC 9110 auth-param syntax (core § 5.1).

| Parameter     | Required | Rule                                                                                                                                          |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | yes      | Non-empty after unquoting; clients reject a missing or empty `id`; bound to the other parameters (core § 5.1.1).                              |
| `realm`       | yes      | RFC 9110 protection space (core § 5.1.1).                                                                                                     |
| `method`      | yes      | Registered payment method, `1*LOWERALPHA`, case-sensitive (core § 5.1.1, § 6.1).                                                              |
| `intent`      | yes      | Registered in "HTTP Payment Intents", `1*( ALPHA / DIGIT / "-" )` (core § 5.1.1, § 7.1).                                                      |
| `request`     | yes      | Method-defined JSON, serialized with JCS (RFC 8785), base64url without `=` padding (core § 5.1.1).                                            |
| `expires`     | SHOULD   | RFC 3339 date-time; clients MUST NOT pay an expired challenge (core § 5.1.2).                                                                 |
| `digest`      | SHOULD   | RFC 9530 digest of the request body for POST, PUT and PATCH; the paid request's body must match (core § 5.1.2, § 5.1.3).                      |
| `description` | no       | Display only; never used for verification and not bound (core § 5.1.2, § 5.1.2.1).                                                            |
| `header`      | no       | Only the value `Payment-Authorization`; selects that field for the credential (core § 5.1.2).                                                 |
| `opaque`      | no       | Flat JSON object of string values, JCS then base64url, for server correlation such as a processor intent id; echoed unchanged (core § 5.1.2). |

- Clients MUST ignore unknown parameters. Custom parameters MUST be lowercase (core § 5.1.2, § 9.3).
- A server MAY send several challenges, one per method and intent it accepts; the client chooses one and treats unknown intents as unsupported (core § 7.3).
- Keep challenges under 8 KB. Clients must handle at least 4 KB challenges, servers at least 4 KB credentials (core § 9.4).

### Binding the id

Servers MUST bind `id` to `realm`, `method`, `intent` and `request`, and to `expires`, `digest`, `opaque` and `header` when present, and MUST reject a credential whose echoed parameters do not match. The mechanism is implementation-defined: stateful storage, HMAC or authenticated encryption (core § 5.1.2.1).

The recommended stateless binding (core § 5.1.2.1.1):

```text
input = realm | method | intent | request_b64url | expires | digest | opaque_b64url
if header is present: input = input | header
id    = base64url_nopad( HMAC-SHA256(server_secret, input) )
```

- The seven base slots are always present; an absent optional field is an empty segment, for example `...|2026-10-09T12:05:00Z||eyJ...` when `digest` is absent.
- The `header` slot is appended only when the parameter is present, so header-less challenges keep the same input as before `header` existed.
- `request` and `opaque` go in exactly as they appear on the wire. That is why JCS is mandatory: a different key order would give a different HMAC (core § 5.1.1).
- Keep the secret server-side, never log it, and when rotating keep verifying with the previous secret until its challenges expire (core § 11.2.2).

## Credential

The client sends `Payment <base64url-nopad>` in the field the challenge selected (core § 5.2):

- No `header` parameter: `Authorization`.
- `header="Payment-Authorization"`: `Payment-Authorization`, so `Authorization` can still carry, for example, a Bearer token (core § 4.4.3).
- Any other `header` value: treat the challenge as unrecognized and send nothing.

Servers accept a credential only from the selected field. The decoded JSON object:

| Field       | Required | Content                                                                                                                                                           |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `challenge` | yes      | The challenge parameters echoed unchanged: `id`, `realm`, `method`, `intent`, `request`, and `description`, `opaque`, `digest`, `expires`, `header` when present. |
| `source`    | no       | Payer identifier; a DID is RECOMMENDED.                                                                                                                           |
| `payload`   | yes      | Method-specific proof: a preimage, signed transaction, processor confirmation or ledger transaction.                                                              |

Source: core § 5.2, Tables 3 and 4; charge § 6.1. If the challenge had no `header`, the echoed object MUST NOT contain one. Send exactly one credential per request; servers SHOULD reject a request carrying several with 400 (core Appendix B.4).

## Receipt

On success, servers SHOULD add `Payment-Receipt: <base64url-nopad>` (core § 5.3):

| Field       | Content                                                  |
| ----------- | -------------------------------------------------------- |
| `status`    | Always `"success"`.                                      |
| `method`    | The payment method used.                                 |
| `timestamp` | RFC 3339 settlement time.                                |
| `reference` | Method-specific reference: transaction hash, invoice id. |

Methods MAY add fields. Receipts appear only on 2xx responses, never on errors (core § 5.3.1).

## Client preferences: Accept-Payment

```http
Accept-Payment: tempo/charge, tempo/session;q=0, stripe/charge;q=0.5, */subscription;q=0.2
```

- Ranges are `method/intent` with `*` wildcards and q-values; no q means 1 and `q=0` means "do not use" (core § 7.4).
- Servers SHOULD filter challenges to ranges with q>0, order by descending q, keep their own order on ties, and prefer the most specific range.
- Absent header: the client accepts anything. Malformed header, or nothing matches: the server MAY ignore it.
- The returned challenge is authoritative; clients still validate it before paying.

## Problem types

402 bodies SHOULD be RFC 9457 Problem Details with types under `https://paymentauth.org/problems/` (core § 8.1, § 8.2):

| Type                   | Status | Meaning                               |
| ---------------------- | ------ | ------------------------------------- |
| `payment-required`     | 402    | Resource requires payment.            |
| `payment-insufficient` | 402    | Amount too low.                       |
| `payment-expired`      | 402    | Challenge or authorization expired.   |
| `verification-failed`  | 402    | Proof invalid.                        |
| `method-unsupported`   | 400    | Method not accepted.                  |
| `malformed-credential` | 402    | Invalid credential format.            |
| `invalid-challenge`    | 402    | Challenge id unknown or already used. |

Error detail goes in the body, not in `WWW-Authenticate` parameters (core § 4.2).

## Security and caching checklist

- TLS 1.2 or later for every challenge and credential; never over plain HTTP (core § 11.2).
- Credentials are bearer tokens: never log them or put them in errors or analytics; keep them in memory only. Treat receipts as sensitive too (core § 11.2.1, § 11.8).
- Payment methods provide single-use proofs, and servers reject a reused credential (core § 11.3; charge § 6.2, § 8.3).
- The unpaid request records the challenge and nothing else. Accept `Idempotency-Key` on POST, PUT and DELETE and replay the original response for a paid retry (core § 11.4).
- Concurrent requests with one credential settle at most once and deliver once; use atomic operations or distributed locks (core § 11.5).
- Clients verify amount, recipient, currency and validity window, never `description` (core § 11.6; charge § 8.1, § 8.2, § 8.6).
- Servers MUST NOT require user accounts; methods SHOULD allow pseudonymous payment (core § 11.7).
- `Cache-Control: no-store` on 402; `private` on any response with `Payment-Receipt`; `private` or `no-store` on every response to a request carrying `Payment-Authorization`, because RFC 9111 § 3.5 only protects `Authorization` (core § 11.10).
- Browser wallets show the requesting origin, require explicit confirmation, and never answer challenges automatically (core § 11.11).
- Rate-limit challenge issuance and verification attempts (core § 11.12).
