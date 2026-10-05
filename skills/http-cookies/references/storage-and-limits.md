# Storage model, eviction and limits

Read this when planning how many cookies to set and how long they live, or debugging a cookie that the user agent dropped, replaced or evicted. Section numbers without a prefix are draft-ietf-httpbis-rfc6265bis-22; "6265 §" marks RFC 6265.

## What the user agent stores

Each cookie has: name, value, expiry-time, domain, path, creation-time, last-access-time, persistent-flag, host-only-flag, secure-only-flag, http-only-flag and same-site-flag (§ 5.7). RFC 6265 has the same fields without same-site-flag (6265 § 5.3).

- **Persistent or session.** `Max-Age` (or else `Expires`) makes the cookie persistent; with neither, it is removed when the session is over, as the user agent defines it (§ 5.7 step 6). A user agent in a no-persistence mode, such as private browsing, treats every cookie as a session cookie (§ 7.3).
- **Last one wins.** When an attribute repeats, the last `Max-Age`, `Expires`, `Domain`, `Path` or `SameSite` is used (§ 5.7). Do not send duplicates (§ 4.1.1).
- **Identity.** A cookie is identified by name, domain, host-only-flag and path (§ 5.7 step 23). RFC 6265 used name, domain and path (6265 § 5.3 step 11). A new cookie with the same identity replaces the old one and keeps its creation-time.

## Why a cookie is rejected

Under RFC 6265bis, the user agent ignores a received cookie when (§ 5.6, § 5.7):

- it contains a control character other than tab (§ 5.6 step 1, § 5.7 step 3);
- name and value are both empty (§ 5.7 step 2);
- name plus value exceed 4096 octets (§ 5.6 step 5, § 5.7 step 4);
- `Domain` contains a non-ASCII character, is a public suffix other than the request host, or does not domain-match the request host (§ 5.7 steps 8 to 10);
- it has `Secure` but arrived over a non-secure connection (§ 5.7 step 13);
- it has `HttpOnly` and came from a non-HTTP API, or would overwrite an `HttpOnly` cookie from a non-HTTP API (§ 5.7 steps 15 and 23);
- it lacks `Secure`, arrived over a non-secure connection, and would shadow a `Secure` cookie with the same name, an overlapping domain and a matching path (§ 5.7 step 16);
- it is `Strict`, `Lax` or default and was set by a cross-site subresource or nested navigation (§ 5.7 step 18);
- it is `SameSite=None` without `Secure` (§ 5.7 step 19);
- it fails its `__Secure-` or `__Host-` rules (§ 5.7 steps 20 to 22);
- the user agent's cookie policy blocks it, for example third-party cookie blocking (§ 5.3, § 7.1, § 7.2).

An attribute value longer than 1024 octets is ignored, but the cookie is kept (§ 5.6 step 6). That can silently drop a long `Domain` or `Path`.

## Limits

| Limit                | RFC 6265bis                                                                        | RFC 6265                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Name plus value      | Rejected above 4096 octets (§ 5.6, § 5.7)                                          | User agents should support at least 4096 bytes for name, value and attributes (6265 § 6.1) |
| One attribute value  | Ignored above 1024 octets (§ 5.6)                                                  | No limit                                                                                   |
| Cookies per domain   | User agents should support at least 50 (§ 6.1)                                     | At least 50 (6265 § 6.1)                                                                   |
| Cookies in total     | At least 3000 (§ 6.1)                                                              | At least 3000 (6265 § 6.1)                                                                 |
| Lifetime             | Capped by the user agent; SHOULD NOT exceed 400 days, 400 days recommended (§ 5.5) | No cap                                                                                     |
| `Cookie` header size | Many servers limit a field to 8192 octets by default (§ 4.2.1)                     | Not stated                                                                                 |

Server rules (§ 6.1, § 7.4; 6265 § 6.1, § 7.3):

- Use as few and as small cookies as possible: every cookie travels on every matching request.
- Degrade gracefully when a cookie is missing; user agents may evict any cookie at any time.
- Pick expiry by purpose rather than "gratuitously long" periods; the specification's example is two weeks for a session identifier.

## Eviction

- Expired cookies MUST be evicted (§ 5.7).
- A user agent MAY remove excess cookies when a domain exceeds a bound (such as 50) or the store exceeds one (such as 3000). It removes, in order: expired cookies; non-`Secure` cookies of over-full domains (RFC 6265bis only); other cookies of over-full domains; then any cookie. Ties go to the earliest last-access-time (§ 5.7; 6265 § 5.3).
- An attacker who can set cookies for your domain can therefore push yours out by setting many (§ 8.6). Under RFC 6265bis, `Secure` cookies survive non-`Secure` ones in the same over-full domain.

## Public suffixes

The cookie boundary depends on the registrable domain, which depends on the public suffix list. User agents SHOULD use an up-to-date list, such as the one the Mozilla project maintains; otherwise cookies can leak between registrable domains (§ 8.9). If a list update turns a cookie's domain into a public suffix, the user agent stops sending that cookie (§ 5.8.3). A service that hosts customer content on subdomains of one registrable domain shares cookie scope across customers unless that domain is a public suffix.
