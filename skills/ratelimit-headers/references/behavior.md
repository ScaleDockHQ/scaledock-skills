# Server, client and intermediary behavior

Bare section numbers refer to `draft-ietf-httpapi-ratelimit-headers-11`.

## Scope of the draft (§ 1.1)

Out of scope, by the draft's own list:

- **Authorization**: the fields are not an access control mechanism.
- **Status codes**: the fields may appear on successful and unsuccessful responses. The draft does not say whether unsuccessful responses consume quota, and mandates no correlation between field values and status code.
- **Throttling algorithm**: none is mandated; values can be computed statically or dynamically.
- **Service level**: advertised quota implies no guarantee; the server may throttle clients that stay within it.

The draft's FAQ adds that it is not tied to RFC 6585: 429 is used as an example of a throttled response, and another status could be used.

## Server rules

- The server MAY return the fields regardless of status code, including on throttled responses (§ 6).
- Take care with 3xx responses: a low `r` can make a client wait before following `Location` (§ 6).
- If a response has both `Retry-After` and `RateLimit`, `Retry-After` SHOULD NOT point earlier than the end of the effective window (§ 6).
- The server MUST NOT convey values that expose an unwanted volume of requests, and SHOULD cap the ratio between available quota and effective window, especially for large windows (§ 6, § 8.5).
- The server MAY lower values between requests, for example under attack or resource saturation (§ 6, § 8.3).
- Sending the fields on every response is not required; a server might send them only when a quota is close to exhaustion (§ 6.2).
- Partition keys (§ 6.1): the server SHOULD document how keys are generated, so clients can predict them; should avoid sensitive information in keys; and SHOULD only use information present in the request.

### Status codes and Retry-After

- **429 Too Many Requests**: the user sent too many requests in a given time (RFC 6585 § 4). The representation SHOULD explain the condition, MAY include `Retry-After`, and the response MUST NOT be stored by a cache. RFC 6585 does not define how the user is identified or how requests are counted.
- Servers are not required to send 429; under attack, dropping connections may be more appropriate (RFC 6585 § 7.2).
- **503 Service Unavailable** with `Retry-After` says how long the service is expected to be unavailable (RFC 9110 § 15.6.4, § 10.2.3). The draft's `temporary-reduced-capacity` problem type uses 503 (§ 5.2).
- **`Retry-After`** is either an HTTP-date or a non-negative number of seconds (`delay-seconds`) (RFC 9110 § 10.2.3). The seconds form matches `t` and avoids clock skew, which is the reason the draft gives for `t` using seconds (§ 4.1.2).

## Client rules (§ 7)

- The fields indicate whether a request respected the policy and whether later ones may succeed, but the server can apply other criteria (§ 7).
- A client MUST NOT assume future responses carry the same fields, or any (§ 7).
- Malformed fields MUST be ignored (§ 7).
- A client SHOULD NOT exceed the available quota within the effective window (§ 7).
- `t` is computed at response time; a client aware of significant latency MAY adjust using `Date` or its own metrics (§ 7).
- `RateLimit-Policy` is informative and MAY be ignored (§ 7).
- If both `RateLimit` and `Retry-After` are present, `Retry-After` MUST take precedence and the effective window MAY be ignored (§ 7).
- A positive `r` is not a guarantee (§ 4.1.1) and not a service level agreement (§ 8.3).
- Quota is not necessarily fully restored after `t` (§ 4.1.2), and `t` says nothing about when quota increases (§ 8.4).
- Partition keys: if the server documents its algorithm, a client MAY compute a key for a future request and compare it with returned keys (§ 7.1).
- Ignore the fields on responses served from cache (those with a positive `current_age`, RFC 9111 § 4.2.3), because they may be stale (§ 7.3).
- Set thresholds for implausible values, such as a maximum request rate, and treat a very long effective window (the draft's example is over ten minutes) as a reason to retry rather than wait (§ 8.5.1). The same applies to `Retry-After`.

Acceptable strategies include slowing down as quota runs low, or using all of it and then waiting (§ 7).

## Intermediaries (§ 7.2)

- An intermediary outside the origin's infrastructure that does not understand the policy SHOULD NOT alter the fields to look more permissive, and that includes removing them.
- It MAY make them more restrictive when it understands the quota unit semantics and enforces a stricter policy itself.
- It SHOULD forward requests even when it expects them to be refused; the origin is solely responsible for enforcement.
- Proxies may retransmit requests and consume quota without telling the client.

## Security considerations (§ 8)

- The fields do not stop clients from sending requests; servers still need resource-exhaustion protection (§ 8.1).
- Do not disclose operational capacity to untrusted parties (§ 8.2).
- If 401 and 403 responses count against quota, a malicious client can probe another user's traffic (§ 8.2).
- The fields can reveal that an intermediary exists (§ 8.2).
- Partition keys that identify a client or user invite impersonation; protect them (§ 8.2).
- Many clients may return at the same instant when a window resets; add jitter to `t` (§ 8.5). The same applies to `Retry-After`.
- A large window lets a client burn most of its quota in a short interval. Return a lower `r` or a higher `t`, or pair a long-window policy with a short-window one (§ 8.5).
- Unexpected values, from a misconfigured server or a malicious intermediary, can drive clients into denial of service; clients cap what they accept (§ 8.5.1).

## Privacy considerations (§ 9)

Clients that react to rate-limit information may become re-identifiable, because they act on information given only to them. The draft notes this is rarely a concern, since rate limiting usually applies to identified clients.
