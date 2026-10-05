# SCRAPI: the SCITT Reference API (draft-ietf-scitt-scrapi-11)

Read this when building a Transparency Service HTTP API or a client for one. Section numbers are draft-ietf-scitt-scrapi-11 unless another document is named. SCRAPI realizes RFC 9943 § 6.3 (registration), § 7 (Receipts) and TS key discovery; it does not define the VDS internals, Registration Policy contents, the message formats, or non-HTTP transports (§ 1.1).

## Resources (§ 2)

| Method | Path                                  | Request                                                 | Success response                                        |
| ------ | ------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/.well-known/scitt-keys`             | `Accept: application/cbor` (MUST)                       | 200, COSE Key Set (RFC 9052 § 7) as `application/cbor`  |
| GET    | `/.well-known/scitt-keys/{kid_value}` | `Accept: application/cbor` (MUST)                       | 200, one COSE Key as `application/cbor`; 404 if unknown |
| POST   | `/entries`                            | `Content-Type: application/cose`, body Signed Statement | 201 with Receipt, or 202 with no body                   |
| GET    | `/entries/{EntryID}` (the `Location`) | `Accept: application/cose`                              | 200 Receipt, 204 still running, 404 none or failed      |

These four are the mandatory-to-implement resources (§ 1.1). The paths under `/entries` are shown in examples; clients follow the `Location` header the TS returns.

## Errors (§ 2)

- Any request the TS cannot process gets a 4xx or 5xx with a Concise Problem Details body, `application/concise-problem-details+cbor` (RFC 9290). It MUST contain `title` (-1) and `detail` (-2), as text or language-tagged text (tag 38); untagged text with no language context is `en`.
- Status codes in the examples are illustrative. Clients MUST handle any status by falling back to its class, and MUST rely on the problem details (when present) rather than the status code for the application-level cause (§ 2, RFC 9205 § 4.6).
- Clients handle 5xx per RFC 9110 § 15.6 and § 9.2.2. Any error MAY carry `Retry-After`.
- A request that does not comply with SCRAPI gets the "malformed" error: title "Malformed request".

Defined errors (implementations SHOULD use them unless another RFC 9290 error fits better):

| Where              | Status | Title                   | Condition                                                                     |
| ------------------ | ------ | ----------------------- | ----------------------------------------------------------------------------- |
| Individual key     | 404    | No such key             | No key for this kid value (§ 2.2)                                             |
| Register           | 400    | Bad Signature Algorithm | Unsupported algorithm (§ 2.3.3)                                               |
| Register           | 400    | Confirmation Missing    | No proof of possession (§ 2.3.3)                                              |
| Register           | 400    | Payload Missing         | Payload required but absent (§ 2.3.3)                                         |
| Register           | 400    | Rejected                | Not accepted by the current Registration Policy (§ 2.3.3)                     |
| Register           | 400    | Invalid locator         | Operation locator not in a valid form (§ 2.3.3)                               |
| Register / polling | 429    | Too Many Requests       | Polling too often or rate limit exceeded; with `Retry-After` (§ 2.3.4, § 5.3) |
| Resolve Receipt    | 404    | Not Found               | Unknown EntryID (§ 2.4.3)                                                     |
| Resolve Receipt    | 404    | Registration Failed     | Asynchronous registration failed; MAY add detail (§ 2.4.3)                    |

```text
HTTP/1.1 400 Bad Request
Content-Type: application/concise-problem-details+cbor

{
  / title /  -1: "Rejected",
  / detail / -2: "Signed Statement not accepted by the current Registration Policy"
}
```

## Transparency Service keys (§ 2.1, § 2.2, § 6.1)

- `/.well-known/scitt-keys` is a well-known URI (RFC 8615) that IANA is requested to register (§ 6.1). It returns every public key Relying Parties can use to verify the TS's Receipts.
- The TS MAY stop listing keys it no longer uses after a reasonable delay, long enough for Relying Parties to fetch keys for earlier Receipts. Retired keys SHOULD stay available for as long as Receipts signed with them may need verifying, unless another archival mechanism preserves verifiability; the TS then serves them from the individual key resource (§ 2.1).
- The TS MAY send `Expires` or `Cache-Control: max-age` (max-age wins) as a caching hint. A Relying Party holding a Receipt MUST keep its verification key as long as it may need it, regardless of cache lifetime (§ 2.1, RFC 9111).
- If a key is retired early (compromise, algorithm deprecation), a Relying Party can ask for a fresh Receipt for the same Signed Statement at the same VDS position, signed with a current key (§ 2.1).
- `{kid_value}`: the resource MUST accept the unpadded base64url form of every kid. If the raw kid is safe as a path segment without percent-encoding, it MUST also accept the raw form, and both identify the same key. The TS MUST NOT use kids whose raw and base64url forms would make one URL identify different keys (§ 2.2).
- Assigning kids with COSE Key Thumbprint (RFC 9679) is RECOMMENDED (§ 2.2).

```text
GET /.well-known/scitt-keys HTTP/1.1
Host: transparency.example
Accept: application/cbor

HTTP/1.1 200 OK
Content-Type: application/cbor

[ { -1:1, -2:h'65eda5a1...', -3:h'1e52ed75...', 1:2, 2:'kid1' }, ... ]
```

## Register a Signed Statement (§ 2.3)

```text
POST /entries HTTP/1.1
Host: transparency.example
Accept: application/cbor
Accept: application/cose
Content-Type: application/cose

<COSE_Sign1 Signed Statement>
```

- The TS MUST apply the Registration Policy before any additional processing (§ 2.3).
- **201 Created** when the TS can produce the Receipt in reasonable time: body is the Receipt (`application/cose`), and the response MUST have a `Location` with the URL of the Receipt resource. Fresh Receipts can be requested there (§ 2.3.1).
- **202 Accepted** when it cannot: no body, a `Location` that MUST point to the eventual Receipt resource, and MAY carry `Retry-After` (§ 2.3.2).
- A TS that supports both modes MUST return the same `Location` URL for the same registered Signed Statement regardless of mode (§ 2.3.1).

## Resolve a Receipt (§ 2.4)

`GET` the `Location` URL with `Accept: application/cose`. Used to poll an asynchronous registration and, later, to get a fresh Receipt.

- **200 OK**: the Receipt, `Content-Type: application/cose`, with `Location` (§ 2.4.1).
- **204 No Content**: still running. SHOULD carry `Retry-After` and SHOULD carry `Cache-Control: no-store` (§ 2.4.2).
- **404 Not Found** (MUST be 4xx, typically 404) with problem details: no Receipt for the EntryID, including a failed registration (§ 2.4.3).

```text
Client --- POST /entries (Signed Statement) --> TS
Client <-- 202 Location: .../entries/123     --- TS
Client --- GET .../entries/123              --> TS   (zero or more times)
Client <-- 204 Retry-After: <seconds>       --- TS
Client --- GET .../entries/123              --> TS
Client <-- 200 (Receipt)                    --- TS
```

## Retries and rate limiting (§ 5, § 4.3)

- Clients that retry MUST honor `Retry-After` as a minimum interval (RFC 9110 § 10.2.3). Without it, they MUST use exponential backoff with jitter, cap retries, and avoid synchronized retries (§ 5.1).
- Operators SHOULD set a minimum retry interval and send it in `Retry-After` on 202, 204, 429 and 503 where polling or retries apply (§ 5.2).
- Authentication is out of scope and MAY be used. Without authentication, rate limiting or other denial-of-service mitigations MUST be implemented (§ 4.3). A client over the limit MUST get 429 with `Retry-After` (§ 5.3).

## Security (§ 4)

- Implementers MUST protect against man-in-the-middle and eavesdropping, for example with TLS (§ 4.4.1.2).
- Clients that need to detect delayed or lost registrations MUST check that Receipts become available for what they submitted (§ 4.4.1.1). TS implementers MUST defend against flooding, including rate limiting.
- Unauthenticated HTTP signals (request headers, distinct endpoints) MAY route a Signed Statement to profile-specific processing, but MUST NOT be authoritative inputs to the registration decision. Outcome-affecting decisions must be fully determined by authenticated inputs or captured in the VDS so Auditors can replay them. The authoritative profile is in the protected header or payload and MUST be verified after signature authentication (§ 4.4.2.3).
- Replays of the same Statement are not a SCITT concern; time-dependent payloads carry signed timestamps (§ 4.4.2.1, see `signed-statements-and-receipts.md`).

## Common mistakes

- Returning `application/problem+json`. SCRAPI errors are CBOR `application/concise-problem-details+cbor` (§ 2).
- Switching on the status code alone instead of the problem details title (§ 2).
- Using the draft-10 and earlier 303 and 302 polling flow; -11 uses 202 and 204 (see `versions.md`).
- Different `Location` URLs for synchronous and asynchronous registration of the same statement (§ 2.3.1).
- Dropping retired keys from discovery while their Receipts are still in use (§ 2.1).
