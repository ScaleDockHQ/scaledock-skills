# Security and privacy considerations

Read this when reviewing session cookies, CSRF defenses, a multi-subdomain deployment, or any cookie that carries authority. Section numbers without a prefix are draft-ietf-httpbis-rfc6265bis-22 § 7 and § 8; RFC 6265 § 7 and § 8 have the same subsections without SameSite.

## Ambient authority and CSRF (§ 8.2, § 8.8)

- User agents attach cookies to requests that remote parties trigger (redirects, forms), so a cookie that authenticates is ambient authority: an attacker designates the URL and the browser supplies the authorization. This is cross-site request forgery, also called confused deputy (§ 8.2).
- `SameSite=Strict` is a robust CSRF defense where supported, but not the only one you need: same-site navigations and submissions can be combined with cross-site scripting or open redirects (§ 8.8.1).
- Also deploy server-side defenses: CSRF tokens, and safe methods that are idempotent (§ 8.8.1).
- `Lax` blocks cross-site unsafe methods but not attacker-triggered top-level `GET` navigations (§ 5.6.7.1). Never change state on `GET`.
- An alternative is to entangle designation and authorization, treating URLs as capabilities that carry the secret (§ 8.2).

## Clear text (§ 8.3)

- Without TLS, cookies are visible to eavesdroppers and can be altered by intermediaries.
- Servers SHOULD encrypt and sign cookie contents, even over TLS. That still does not stop transplanting a cookie to another user agent or replaying it later.
- Servers needing higher security SHOULD use cookies only over a secure channel and SHOULD set `Secure` on every cookie. Without `Secure`, an active attacker redirects any HTTP request to your host and reads the cookie, even if nothing listens on port 80.

## Session identifiers and fixation (§ 8.4)

- Store a nonce, the session identifier, in the cookie and keep session state on the server. A stolen identifier is then only useful against your server, and an attacker cannot splice together contents of two interactions.
- Servers SHOULD avoid session fixation. The attack: the attacker plants their own identifier in the victim's user agent; the victim logs in or enters data under it; the attacker then uses the same identifier. So the identifier in use before authentication must not be the one that carries the authenticated session. For the concrete controls (rotation, invalidation, timeouts), use the `owasp-asvs` skill.
- Planting is easiest where cookies have weak integrity (next section): a sibling subdomain, or an HTTP response injected by a network attacker. `__Host-` closes both (§ 4.1.3.2).

## Weak confidentiality (§ 8.5)

- No isolation by port: a service on another port of the same host reads and writes the same cookies.
- No isolation by scheme: cookies for a host may be available to other schemes.
- No reliable isolation by path: non-HTTP APIs such as `document.cookie` expose cookies across paths in browsers.
- Servers SHOULD NOT run mutually distrusting services on different ports of one host while using cookies for security-sensitive data.

## Weak integrity and subdomain attacks (§ 8.6)

- Sibling domains: `foo.site.example` can set a cookie with `Domain=site.example`, possibly overwriting one set by `bar.site.example`, which then cannot tell it apart from its own. This is the basis of cookie tossing and of session fixation from a subdomain.
- Paths: any response on the host may set any `Path`. Servers SHOULD NOT run mutually distrusting services on different paths of one host while using cookies for security-sensitive data.
- Network attackers: an active attacker can impersonate `http://site.example/` and inject a `Set-Cookie` that the HTTPS site receives later, even if the site uses HTTPS exclusively. RFC 6265bis stops HTTP responses from setting or shadowing `Secure` cookies (§ 5.7 steps 13 and 16), and HSTS removes the HTTP response (see the `hsts` skill).
- Mitigations: encrypt and sign cookie contents, or use the `__Secure-` prefix; this is partial, because the attacker can still replay a genuine cookie (§ 8.6). Prefer `__Host-` for anything that authenticates.
- Cookie jar overflow: an attacker who can set many cookies forces eviction of yours. Servers SHOULD NOT rely on user agents retaining cookies.
- Never give an untrusted party a subdomain under a registrable domain whose `Domain` cookies carry authority.

## Reliance on DNS (§ 8.7) and public suffixes (§ 8.9)

Cookie scope relies on DNS. A compromised DNS breaks the cookie security model. Scope also relies on the user agent's public suffix list; a stale list can leak cookies between registrable domains.

## HttpOnly and script

`HttpOnly` keeps a cookie out of non-HTTP APIs (§ 4.1.2.6), which limits what injected script can read. It does not stop that script from sending same-site requests that carry the cookie (§ 8.8.1). Reduce script injection with a content security policy (see the `content-security-policy` skill).

## Privacy (§ 7)

- Cookies' main privacy risk is correlating user activity, especially across unrelated sites (§ 7).
- Third-party cookies are limited by most user agents: some block them, some partition them by the first-party site, some apply policies or user controls. User agents are RECOMMENDED to be as restrictive as compatibility allows, so resources "cannot rely upon third-party cookies being treated consistently" (§ 7.1). Design cross-site features to work when the cookie is absent.
- Users can delete or disable cookies; when disabled, no `Cookie` is sent and no `Set-Cookie` is processed (§ 7.3).
- Choose expiry by purpose, not decades (§ 7.4).

## Review checklist

- [ ] Every authenticating cookie is `__Host-`, `Secure`, `HttpOnly`, with an explicit `SameSite`.
- [ ] State-changing endpoints reject cross-site requests by a server-side CSRF defense, not by SameSite alone.
- [ ] No state change happens on a safe method.
- [ ] The session identifier is an opaque nonce, and a pre-login identifier never becomes an authenticated one.
- [ ] Cookie contents that are not opaque identifiers are encrypted and signed.
- [ ] No mutually distrusting service shares the host (any port or path) or the parent domain of an authenticating `Domain` cookie.
- [ ] The site is HTTPS-only, and HSTS is considered.
- [ ] Cross-site features degrade gracefully without third-party cookies.
