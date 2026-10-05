# ratelimit-headers

An agent skill for the IETF RateLimit header fields draft: advertise HTTP API quotas with `RateLimit` and `RateLimit-Policy`, and answer throttled requests with 429 and `Retry-After`.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ratelimit-headers
```

Then ask your agent to "add RateLimit headers to our API" or "make our client back off on 429".

## What it covers

- The `RateLimit-Policy` and `RateLimit` fields, their parameters and their Structured Fields syntax.
- Throttled responses: 429 or 503, `Retry-After`, and the draft's problem types.
- Server, client and intermediary rules, caching, and security and privacy considerations.
- Upgrading from earlier drafts and `X-RateLimit-*` headers.
- A framework-neutral TypeScript serializer, parser and back-off helper.

The draft is unfinished. The skill builds against the pinned revision, `draft-ietf-httpapi-ratelimit-headers-11`.

## Versions

| Line                 | Status                |
| -------------------- | --------------------- |
| draft-11             | current (build)       |
| draft-07             | legacy (upgrade from) |
| draft-06 and earlier | legacy (upgrade from) |
| X-RateLimit headers  | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade from each older header design.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [draft-ietf-httpapi-ratelimit-headers-11](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-11): WG draft, revision 11 (2026-05-23).
- [Datatracker history](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) and revisions [08](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-08), [07](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-07), [06](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-06) and [00](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-00), with [draft-polli-ratelimit-headers-00](https://datatracker.ietf.org/doc/html/draft-polli-ratelimit-headers-00): superseded drafts, for the legacy lines.
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): RFC (Internet Standard), for `Retry-After`.
- [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585): RFC (Proposed Standard), for 429.
- [RFC 9651](https://www.rfc-editor.org/rfc/rfc9651): RFC (Proposed Standard), for Structured Fields.
- [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457): RFC (Proposed Standard), for the response body.
- [IANA HTTP Problem Types registry](https://www.iana.org/assignments/http-problem-types) and [IANA HTTP Field Name registry](https://www.iana.org/assignments/http-fields), read 2026-10-02.

## License

MIT
