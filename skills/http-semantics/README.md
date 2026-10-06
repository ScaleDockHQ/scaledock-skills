# http-semantics

An agent skill for IETF HTTP Semantics (RFC 9110) and HTTP Caching (RFC 9111) for API and server authors, with the extension fields APIs use, and upgrades from RFC 7230-7235.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics
```

Then ask your agent to "add ETags and If-Match to our update endpoints", "pick the right status codes for this API" or "set Cache-Control for our CDN".

## What it covers

- Methods and their safety, idempotency and cacheability, including QUERY (RFC 10008).
- Status codes and their required fields: Allow, Location, Content-Location, Retry-After.
- Validators and conditional requests: ETag, Last-Modified, If-Match, If-None-Match, 304, 412 and the evaluation order.
- Range requests: Range, If-Range, 206, 416 and multipart/byteranges.
- Content negotiation, Vary and caching: storage, freshness, validation, invalidation, every Cache-Control directive, and `stale-while-revalidate` and `stale-if-error` (RFC 5861).
- Structured Field Values (RFC 9651) for defining new header fields.
- Link (RFC 8288), Deprecation (RFC 9745), Sunset (RFC 8594), api-catalog (RFC 9727) and Prefer (RFC 7240), and the expired Idempotency-Key draft as a tracked preview.

## Versions

| Line                                      | Status                |
| ----------------------------------------- | --------------------- |
| RFC 9110 and RFC 9111                     | current               |
| RFC 7230-7235                             | legacy (upgrade from) |
| Idempotency-Key draft-07                  | preview (track)       |
| RFC 10008 QUERY                           | current               |
| RFC 9651 Structured Fields                | current               |
| RFC 8941 Structured Fields                | legacy (upgrade from) |
| RFC 8288 Web Linking                      | current               |
| RFC 9745 Deprecation                      | current               |
| RFC 8594 Sunset                           | current               |
| RFC 9727 api-catalog                      | current               |
| RFC 7240 Prefer                           | current               |
| RFC 7838 Alt-Svc                          | current               |
| RFC 8297 Early Hints                      | current               |
| RFC 8942 Client Hints                     | current               |
| RFC 9211 Cache-Status                     | current               |
| RFC 9209 Proxy-Status                     | current               |
| RFC 9213 Targeted Cache-Control           | current               |
| RFC 9218 Priority                         | current               |
| RFC 5789 PATCH                            | current               |
| RFC 7578 multipart/form-data              | current               |
| RFC 9652 Link-Template                    | current               |
| RFC 9842 Compression Dictionary Transport | current               |
| Resumable Uploads draft-12                | current (track)       |

`references/versions.md` says which line to use per family, what changed from RFC 7230-7235 and RFC 8941, how to upgrade and how to adopt QUERY, and what the Idempotency-Key preview means.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): RFC (Internet Standard, STD 97).
- [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111): RFC (Internet Standard, STD 98).
- [RFC 9112](https://www.rfc-editor.org/rfc/rfc9112): RFC (Internet Standard, STD 99), for what replaced RFC 7230.
- [RFC 7230](https://www.rfc-editor.org/rfc/rfc7230), [RFC 7231](https://www.rfc-editor.org/rfc/rfc7231), [RFC 7232](https://www.rfc-editor.org/rfc/rfc7232), [RFC 7233](https://www.rfc-editor.org/rfc/rfc7233), [RFC 7234](https://www.rfc-editor.org/rfc/rfc7234) and [RFC 7235](https://www.rfc-editor.org/rfc/rfc7235): RFCs, obsoleted by RFC 9110, RFC 9111 and RFC 9112.
- [RFC 10008](https://www.rfc-editor.org/rfc/rfc10008): RFC (Proposed Standard), published from [draft-ietf-httpbis-safe-method-w-body-14](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/).
- [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861): RFC (Informational).
- [RFC 9651](https://www.rfc-editor.org/rfc/rfc9651): RFC (Proposed Standard); [RFC 8941](https://www.rfc-editor.org/rfc/rfc8941): RFC, obsoleted by RFC 9651.
- [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288), [RFC 9745](https://www.rfc-editor.org/rfc/rfc9745) and [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727): RFCs (Proposed Standard).
- [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594): RFC (Informational).
- [RFC 7240](https://www.rfc-editor.org/rfc/rfc7240): RFC (Proposed Standard), updated by [RFC 8144](https://www.rfc-editor.org/rfc/rfc8144).
- [draft-ietf-httpapi-idempotency-key-header-07](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-07): Internet-Draft, expired.

## License

MIT
