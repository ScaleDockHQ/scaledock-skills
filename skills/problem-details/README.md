# problem-details

An agent skill for RFC 9457 Problem Details for HTTP APIs: standard `application/problem+json` error responses.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill problem-details
```

Then ask your agent to "return RFC 9457 problem details for our API errors" or "review our 401 and 403 responses".

## What it covers

- The problem details object: `type`, `title`, `status`, `detail`, `instance` and extension members.
- Defining problem types, `about:blank`, and the IANA HTTP Problem Types registry.
- Which status and `WWW-Authenticate` challenge go with each authentication failure (RFC 9110, RFC 6750, RFC 9470).
- Producer and consumer examples in framework-neutral TypeScript.
- Security considerations, and migrating from RFC 7807.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457): RFC (Proposed Standard), RFC 9457.
- [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807): RFC, obsoleted by RFC 9457.
- [IANA HTTP Problem Types registry](https://www.iana.org/assignments/http-problem-types): last updated 2026-06-26.
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): RFC (Internet Standard), RFC 9110.
- [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750): RFC (Proposed Standard), RFC 6750.
- [RFC 9470](https://www.rfc-editor.org/rfc/rfc9470): RFC (Proposed Standard), RFC 9470.

## License

MIT
