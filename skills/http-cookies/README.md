# http-cookies

An agent skill for HTTP cookies (RFC 6265, HTTP State Management Mechanism) on the server side: writing `Set-Cookie`, reading `Cookie`, and hardening cookies with `Secure`, `HttpOnly`, `SameSite` and the `__Host-` and `__Secure-` prefixes from RFC 6265bis.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill http-cookies
```

Then ask your agent to "review our session cookie's Set-Cookie header" or "why isn't this cookie sent in the cross-site iframe?".

## What it covers

- The `Set-Cookie` grammar and every attribute: `Expires`, `Max-Age`, `Domain`, `Path`, `Secure`, `HttpOnly` and `SameSite`.
- Reading the `Cookie` header, deleting cookies, and serialization pitfalls.
- Same-site and cross-site requests, `Strict`, `Lax` and `None`, Lax-by-default, and the `__Secure-` and `__Host-` prefixes.
- The user agent storage model, why cookies are rejected or evicted, size limits and the 400-day lifetime cap.
- Security and privacy: CSRF defense in depth, session fixation, weak integrity across subdomains and paths, clear text, and third-party cookies.
- Upgrading from RFC 2109 and RFC 2965 (`Set-Cookie2`) and from RFC 6265 to the RFC 6265bis profile.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| RFC 6265bis | preview (build)       |
| RFC 6265    | current               |
| RFC 2965    | legacy (upgrade from) |
| RFC 2109    | legacy (upgrade from) |

`references/versions.md` says which line to use, what RFC 6265bis changes, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265.html): RFC (Proposed Standard), RFC 6265.
- [draft-ietf-httpbis-rfc6265bis-22](https://www.ietf.org/archive/id/draft-ietf-httpbis-rfc6265bis-22.txt): Internet-Draft, revision 22, in the RFC Editor queue.
- [Datatracker entry for draft-ietf-httpbis-rfc6265bis](https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/): latest revision 22, not yet an RFC.
- [RFC 2965](https://www.rfc-editor.org/rfc/rfc2965.txt): RFC (Historic), obsoleted by RFC 6265.
- [RFC 2109](https://www.rfc-editor.org/rfc/rfc2109.txt): RFC (Historic), obsoleted by RFC 2965.
- [HTML Living Standard, same site](https://html.spec.whatwg.org/multipage/browsers.html#same-site): WHATWG Living Standard.

## License

MIT
