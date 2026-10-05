# Caching, content negotiation and Vary

Read this when setting Cache-Control on API responses, deciding what shared caches (CDNs, proxies) may store, adding content negotiation, or implementing a cache. Sources: RFC 9111, RFC 9110 § 12 and RFC 5861, listed in [Sources](../SKILL.md#sources). Conditional requests and validators are in [`conditional-and-range.md`](conditional-and-range.md).

## Content negotiation (RFC 9110 § 12)

- **Proactive** negotiation: the server picks a representation from request fields such as Accept, Accept-Encoding and Accept-Language (§ 12.1). **Reactive** negotiation: the server sends 300 or 406 with a list of choices and the client picks (§ 12.2). **Request content** negotiation: a server says which formats it accepts by sending Accept or Accept-Encoding in a response, for example in a 415 (§ 12.3).
- When none of the available representations is acceptable, the server either sends 406 or ignores the negotiation field and sends a default representation (§ 12.4.1).
- Quality values run from 0 to 1 with at most three decimals; a sender MUST NOT generate more than three. The default is 1, and 0 means "not acceptable" (§ 12.4.2).
- **Accept** (§ 12.5.1): the most specific media range wins (`text/plain;format=flowed` over `text/plain` over `text/*` over `*/*`). Senders SHOULD send `q` last, after the media type parameters; recipients SHOULD treat any parameter named `q` as the weight, and the media type registry disallows parameters named `q`. Extension parameters after the weight were removed. Example: `Accept: application/json, application/problem+json;q=0.9, */*;q=0.1`.
- **Accept-Charset** is deprecated, because UTF-8 is nearly ubiquitous and the field aids fingerprinting (§ 12.5.2). Do not build APIs that depend on it.
- **Accept-Encoding** (§ 12.5.3): `identity` is acceptable unless excluded by `identity;q=0` or `*;q=0`. A 415 caused by an unsupported content coding SHOULD include Accept-Encoding listing the supported codings; a 415 for other reasons MUST NOT.
- **Vary** (§ 12.5.5):
  - Lists the request fields (or `*`) that influenced the choice of representation, for example `Vary: Accept-Encoding, Accept-Language`.
  - An origin SHOULD send Vary on a cacheable response when it wants the response reused only for matching requests, which is generally the case when the content was tailored to request fields (§ 12.5.5).
  - `Vary: *` means the response depends on more than request fields, such as the client's network address; a proxy MUST NOT generate `*` (§ 12.5.5). In a cache, `*` always fails to match, so the response is effectively not reused without validation (RFC 9111 § 4.1).
  - Authorization does not need to be listed: its effect on caching is already defined by RFC 9111 § 3.5 (§ 12.5.5).
  - A response whose content depends on Prefer needs `Vary: Prefer` (RFC 7240 § 2; see [`api-lifecycle-fields.md`](api-lifecycle-fields.md)).

## What a cache may store (RFC 9111 § 3)

A cache MUST NOT store a response unless all of these hold:

- the request method is understood by the cache;
- the status code is final (not 1xx);
- for 206, 304, or a response with `must-understand`, the cache understands that status code's caching requirements;
- neither the request nor the response has `no-store`;
- in a shared cache: the response has no `private`, and a request with Authorization is cacheable only as allowed by § 3.5;
- the response has at least one of: `public`; `private` (private caches only); Expires; `max-age`; `s-maxage` (shared caches); an extension directive that allows caching; or a heuristically cacheable status code (RFC 9110 § 15.1).

More storage rules:

- Store all received header fields, including unrecognised ones, except connection-specific and proxy-specific fields (Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization). Trailers are stored separately or discarded, never merged into headers (§ 3.1).
- **Authenticated requests** (§ 3.5): a shared cache MUST NOT reuse a response to a request with Authorization unless the response carries `must-revalidate`, `public` or `s-maxage`. If a response to an authenticated request must stay out of shared caches, send `private` or `no-store` explicitly rather than relying on defaults.
- Incomplete or partial responses may be stored only by caches that understand Range and the unit used (§ 3.3, § 3.4).

## Reusing a stored response (RFC 9111 § 4)

- The cache key is at least the request method and the target URI (§ 2). A stored response is reusable only when the target URI matches, the method allows it, the Vary-nominated request fields match, no `no-cache` applies, and the response is fresh, allowed to be served stale, or successfully validated (§ 4).
- A response served from cache without validation MUST carry an Age with the current age (§ 4).
- Requests with unsafe methods MUST be written through to the origin (§ 4).
- With several stored responses, use the most recent by Date (§ 4).
- Vary matching (§ 4.1): fields are compared after combining field lines, and a cache MAY normalise them (whitespace, case where the field is case-insensitive). A stored response with `Vary: *` never matches.

## Freshness (RFC 9111 § 4.2)

A response is fresh while `freshness_lifetime > current_age`.

`freshness_lifetime` is the first that applies (§ 4.2.1):

1. `s-maxage`, in a shared cache.
2. `max-age`.
3. `Expires` minus `Date`.
4. A heuristic lifetime, only when no explicit lifetime exists and the status is heuristically cacheable or the response is marked cacheable (for example `public`). A typical heuristic is 10% of the time since Last-Modified (§ 4.2.2).

When a directive appears more than once or has an invalid value, a cache uses the first occurrence or treats the response as stale; with conflicting directives, the most restrictive one wins (§ 4.2.1). Expires values that are invalid, including `0`, mean "already expired" (§ 5.3). Expires is ignored when `max-age` is present, and by shared caches when `s-maxage` is present (§ 5.3).

Age (§ 4.2.3):

```text
apparent_age          = max(0, response_time - date_value)
response_delay        = response_time - request_time
corrected_age_value   = age_value + response_delay
corrected_initial_age = max(apparent_age, corrected_age_value)
resident_time         = now - response_time
current_age           = corrected_initial_age + resident_time
```

Delta-seconds that overflow are treated as 2147483648 (2^31) (§ 1.2.2). Heuristics used to be forbidden for URIs with a query (RFC 2616 § 13.9); that is not widely implemented, so send explicit directives such as `no-cache` on query responses that must not be cached (§ 4.2.2).

Serving stale (§ 4.2.4): a cache MUST NOT send a stale response when a directive forbids it (`must-revalidate`, `proxy-revalidate`, `s-maxage`, `no-cache`), and otherwise only when disconnected or when explicitly allowed (for example `max-stale`, or the RFC 5861 extensions below).

## Validation and invalidation (RFC 9111 § 4.3, § 4.4)

- When validating, a cache MUST send the stored entity tags (If-None-Match) and SHOULD send If-Modified-Since with the stored Last-Modified (§ 4.3.1).
- A cache evaluates received If-None-Match and If-Modified-Since against its stored response, and does not evaluate fields that only apply to the origin, such as If-Match and If-Unmodified-Since (§ 4.3.2).
- A 304 freshens matching stored responses: the cache updates their header fields with those in the 304 (§ 4.3.3, § 4.3.4). A full 200 replaces them. On a 5xx during validation, the cache may forward the error, serve stale if allowed, or retry (§ 4.3.3).
- A 200 to HEAD may update or invalidate stored GET responses (§ 4.3.5).
- A cache MUST invalidate the target URI after a non-error response to an unsafe method, including methods whose safety it does not know. It MAY also invalidate the Location and Content-Location URIs, but MUST NOT when their origin differs from the target URI's (§ 4.4).

## Cache-Control directives (RFC 9111 § 5.2)

Directive names are case-insensitive. A proxy MUST pass all directives through. Caches MUST ignore unrecognised directives (§ 5.2, § 5.2.3).

Response directives, which a cache MUST obey (§ 5.2.2):

| Directive          | Meaning                                                                                                                                                                 | Section    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `max-age=N`        | Fresh for N seconds. Token form only: `max-age=60`, never `max-age="60"`.                                                                                               | § 5.2.2.1  |
| `s-maxage=N`       | Overrides `max-age` and Expires for shared caches; once stale, shared caches must revalidate; allows reuse for Authorization requests. Token form only.                 | § 5.2.2.10 |
| `no-cache`         | Storable, but MUST NOT be reused without successful validation. `no-cache="Set-Cookie"` lists fields to strip instead (quoted form; often treated as plain `no-cache`). | § 5.2.2.4  |
| `no-store`         | MUST NOT store any part of the request or response. Not a privacy guarantee.                                                                                            | § 5.2.2.5  |
| `private`          | Shared caches MUST NOT store it; private caches may. `private="Field"` limits only the listed fields.                                                                   | § 5.2.2.7  |
| `public`           | Any cache may store it, even when it would otherwise be prohibited (for example with Authorization).                                                                    | § 5.2.2.9  |
| `must-revalidate`  | Once stale, MUST NOT be reused without validation; when disconnected, send an error (504). Use only when stale data would cause incorrect operation.                    | § 5.2.2.2  |
| `proxy-revalidate` | `must-revalidate` for shared caches only.                                                                                                                               | § 5.2.2.8  |
| `no-transform`     | Intermediaries MUST NOT transform the content.                                                                                                                          | § 5.2.2.6  |
| `must-understand`  | Store only if the cache understands the status code's caching rules; SHOULD be sent with `no-store`.                                                                    | § 5.2.2.3  |

Request directives are advisory; caches MAY implement them (§ 5.2.1): `max-age=N`, `max-stale[=N]`, `min-fresh=N` (all token form only), `no-cache`, `no-store`, `no-transform`, and `only-if-cached`, which gets a stored response or a 504.

Other caching fields:

- **Age** (§ 5.1): seconds since the response was generated or validated at the origin. Its presence means the response came from a cache.
- **Expires** (§ 5.3): an HTTP-date, for example `Expires: Thu, 01 Dec 1994 16:00:00 GMT`. Prefer `max-age`.
- **Pragma** is deprecated and **Warning** is obsoleted; do not generate them (§ 5.4, § 5.5).

## Stale extensions (RFC 5861)

- `stale-while-revalidate=N` (§ 3): after the response becomes stale, a cache may serve it for up to N more seconds while it revalidates in the background. Example: `Cache-Control: max-age=600, stale-while-revalidate=30`.
- `stale-if-error=N` (§ 4): when an error is encountered (any situation that would produce a 500, 502, 503 or 504), a cache MAY serve the stale response, up to N seconds stale. In a request it applies to that request; in a response it applies to every request that response could satisfy. Example: `Cache-Control: max-age=600, stale-if-error=1200`.
- Both are extensions: caches that do not implement them ignore them (RFC 9111 § 5.2.3), and RFC 9111 still forbids serving stale when `no-cache`, `must-revalidate`, `proxy-revalidate` or an applicable `s-maxage` is present (RFC 9111 § 4.2.4). RFC 5861 says stale responses carry a Warning header; RFC 9111 obsoletes Warning (§ 5.5), so only the non-zero Age remains.

## API recipes

These combine the rules above; each line cites where the behaviour comes from.

| Response                                   | Cache-Control                                            | Why                                                                               |
| ------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Per-user data, browser may keep it briefly | `private, max-age=60`                                    | Shared caches must not store it (§ 5.2.2.7)                                       |
| Per-user data, always check                | `private, no-cache` with an ETag                         | Stored, but every reuse is validated, usually with a cheap 304 (§ 5.2.2.4, § 4.3) |
| Secrets, tokens, one-time data             | `no-store`                                               | Nothing is stored (§ 5.2.2.5)                                                     |
| Public reference data behind a CDN         | `public, max-age=60, s-maxage=600` plus `Vary` as needed | Different lifetimes for browsers and shared caches (§ 5.2.2.10)                   |
| Results of a list or search query          | Explicit `max-age` or `no-cache`, never nothing          | Heuristic caching of query URIs is allowed (§ 4.2.2)                              |
| Error responses that should not stick      | Explicit `no-store` or a short `max-age`                 | 404, 405, 410, 414 and 501 are heuristically cacheable (RFC 9110 § 15.1)          |

## Security (RFC 9111 § 7)

- **Cache poisoning**: a malicious response inserted into a shared cache reaches many clients; a common vector is differences in message parsing between proxies and user agents (§ 7.1).
- **Timing attacks**: whether a resource is cached reveals that it was recently fetched; double-keying caches by the top-level site reduces this (§ 7.2).
- **Sensitive data**: Set-Cookie does not by itself stop a response from being cached; mark per-user responses `private` or `no-store` (§ 7.3).
