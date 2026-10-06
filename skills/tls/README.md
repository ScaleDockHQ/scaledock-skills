# tls

An agent skill for The Transport Layer Security (TLS) Protocol Version 1.3.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill tls
```

Then ask the agent to apply The Transport Layer Security (TLS) Protocol Version 1.3.

## What it covers

- when configuring TLS
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                                                                   | Status          |
| ---------------------------------------------------------------------------------------------------------------------- | --------------- |
| RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3                                                       | current         |
| RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2                                                       | supported       |
| RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) | current         |
| RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens                                | current         |
| TLS Encrypted Client Hello                                                                                             | preview (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446.html): PROPOSED STANDARD, RFC 8446 (PROPOSED STANDARD, August 201).
- [RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2](https://www.rfc-editor.org/rfc/rfc5246.html): PROPOSED STANDARD, RFC 5246 (PROPOSED STANDARD, August 200).
- [RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)](https://www.rfc-editor.org/rfc/rfc9325.html): BEST CURRENT PRACTICE, RFC 9325 (BEST CURRENT PRACTICE, November 2).
- [RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html): PROPOSED STANDARD, RFC 8705 (PROPOSED STANDARD, February 2).
- [TLS Encrypted Client Hello](https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25): WG draft, draft-ietf-tls-esni-25 (WG draft, 2026-10-06).

## License

MIT
