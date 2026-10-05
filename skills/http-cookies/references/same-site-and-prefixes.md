# SameSite and cookie name prefixes

Read this when choosing `SameSite`, debugging a cookie that is not sent or not stored in a cross-site context, or naming a cookie with `__Secure-` or `__Host-`. Both features exist only in draft-ietf-httpbis-rfc6265bis-22 (the preview line, posture build); RFC 6265 user agents ignore `SameSite` as an unknown attribute and treat prefixes as ordinary names (6265 § 4.1.2). Section numbers are the draft's.

## Same-site and cross-site

- **Site.** For a tuple origin, the site is its scheme plus its host's registrable domain (the public suffix plus one label), or scheme plus host when there is no registrable domain (HTML Living Standard, "obtain a site"). Ports are ignored. `https://site.example` and `https://sub.site.example` are same site; `https://site.example` and `http://sub.site.example` are not, because the scheme differs (HTML Living Standard, same site example table).
- **Same-site request.** The request's current URL's origin is same-site with the request client's "site for cookies", or the request has no client; and it is not a reload started from the browser UI, which keeps the same-site status of the original navigation (§ 5.2, § 8.8.5).
- **Site for cookies** of a document is the top-level origin only when the top-level origin is same-site with the document and every ancestor document; otherwise it is an opaque origin, so any cross-site frame in the chain makes nested requests cross-site (§ 5.2.1). Dedicated and shared workers inherit from their documents; service workers follow the Service Workers specification (§ 5.2.2).
- Redirects: each hop's method decides whether it is "safe"; a `POST` changed to `GET` by a redirect counts as `GET` from then on (§ 5.6.7.1).

## The three values

| Value    | Sent on same-site requests | Sent on cross-site requests                                                                           | Can be set by a cross-site response            |
| -------- | -------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `Strict` | yes                        | no, not even on top-level navigations                                                                 | only on a top-level navigation (§ 5.7 step 18) |
| `Lax`    | yes                        | only on top-level navigations with a safe method (`GET`, `HEAD`, `OPTIONS`, `TRACE`) (§ 5.8.3)        | only on a top-level navigation (§ 5.7 step 18) |
| `None`   | yes                        | yes, subject to the user agent's third-party cookie policy (§ 7.1). Requires `Secure` (§ 5.7 step 19) | yes                                            |

- A missing or unknown value gets the "Default" enforcement, equivalent to `Lax` (§ 4.1.2.7, § 5.6.7, § 5.7 step 17). This is Lax-by-default.
- "Lax-allowing-unsafe" is not a value. A user agent MAY apply it to cookies with no `SameSite`, sending them on cross-site top-level requests with any method for a short time after creation; 2 minutes or less has worked in deployment (§ 5.6.7.2). It is a transitional measure with fewer CSRF protections (§ 8.8.6). Do not design a flow that depends on it: set `SameSite=None; Secure` on a cookie that must survive a cross-site `POST`, such as a login transaction cookie (§ 8.8.6).
- Non-HTTP APIs: script in a document whose site for cookies is not same-site with the top level cannot set a non-`None` cookie, and only gets same-site cookies back when the document is same-site with the top level (§ 5.7 step 18, § 5.8.2).

## Choosing a value

- `Strict` for cookies that authorize state changes. Expect a cross-site link to arrive without them: the draft's example is a link from webmail to a project site showing a 404 because the session cookie was withheld (§ 8.8.2).
- Two-cookie pattern: a `Lax` (or `None`) cookie granting read access, and a `Strict` cookie granting write access whose absence triggers re-authentication before any non-idempotent action (§ 8.8.2).
- `Lax` is "reasonable defense in depth against CSRF attacks that rely on unsafe HTTP methods", but attackers can still open windows or trigger top-level navigations, and prerendering can create same-site requests (§ 5.6.7.1).
- `None` for content embedded in other sites (widgets, comments) and for single sign-on that needs cookies in a cross-site context (§ 8.8.3).
- A cross-site top-level request to a sensitive page withholds `Strict` cookies, but that page's subresource requests are same-site and do carry them. Return an error for the initial page request when the expected cookies are missing (§ 8.8.1).
- Reloads that a page triggers itself (not the browser's reload button) attach all SameSite cookies, so only trigger one when, for example, a CSRF token was present on the initial request (§ 8.8.5).
- SameSite is set by the server against attacks the server worries about. It does nothing for the user's privacy, and side channels such as connection pooling can still link requests (§ 8.8.4).

## Cookie name prefixes

A server cannot see a cookie's attributes in `Cookie` (§ 4.2.2), so it cannot know how a cookie was set. A prefix makes the user agent enforce conditions at storage time, which the server can then infer from the name (§ 4.1.3). Servers SHOULD use them (§ 4.1.3).

### `__Secure-` (§ 4.1.3.1, § 5.7 step 20)

- The cookie must have `Secure`, so it is set from a secure origin (§ 5.7 step 13). `Domain` and `Path` are free.
- `Set-Cookie: __Secure-SID=12345; Domain=site.example` is rejected; adding `Secure` makes it acceptable from `https://site.example/`.

### `__Host-` (§ 4.1.3.2, § 5.7 step 21)

- The cookie must have `Secure`, must have a `Path` attribute equal to `/`, and must have no `Domain` (host-only).
- It is locked to one host and the whole host, and cannot be set or overwritten by non-secure origins. Ports are the only part of the origin it ignores.
- Rejected: `__Host-SID=12345`, `__Host-SID=12345; Secure`, `__Host-SID=12345; Domain=site.example; Path=/`, `__Host-SID=12345; Secure; Domain=site.example; Path=/`.
- Accepted from a secure origin: `__Host-SID=12345; Secure; Path=/`.

### Case and lookalikes (§ 5.4, § 5.7 step 22)

- Servers send the prefix with exact case. User agents MUST match prefixes case-insensitively, so `__SECURE-SID` and `__host-SID` get the same checks. Otherwise a server that reads names case-insensitively could accept an attacker's `__SeCuRe-SID=evil` as its own `__Secure-SID`.
- Names that differ in case are still separate cookies: `__Secure-foo` and `__secure-foo` can both exist.
- A nameless cookie whose value starts with `__Secure-` or `__Host-` is rejected, because it would serialize like a prefixed cookie.
- Read prefixed cookies by exact, case-sensitive name on the server.

### Which prefix

- Session and CSRF cookies on a single host: `__Host-`. It defeats cookie tossing from sibling subdomains and HTTP injection, because no other host can set a host-only cookie for you and no non-secure origin can set a `Secure` one (§ 4.1.3.2, § 8.6).
- A cookie that must span subdomains: `__Secure-` with `Domain`. It still blocks injection over plain HTTP, but any subdomain served over HTTPS can set it.
- An RFC 6265 user agent does not enforce either prefix, so keep the server-side checks that the prefix was meant to make cheaper.
