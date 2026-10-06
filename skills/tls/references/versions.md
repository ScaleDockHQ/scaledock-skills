# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id            | Line                                                                                                                   | Status    | Revision                                      | Posture | Publisher                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------- | ------- | -------------------------------- |
| `rfc8446`     | RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3                                                       | current   | RFC 8446 (PROPOSED STANDARD, August 201)      |         | PROPOSED STANDARD August 201     |
| `rfc5246`     | RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2                                                       | supported | RFC 5246 (PROPOSED STANDARD, August 200)      |         | PROPOSED STANDARD August 200     |
| `rfc9325`     | RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) | current   | RFC 9325 (BEST CURRENT PRACTICE, November 2)  |         | BEST CURRENT PRACTICE November 2 |
| `rfc8705`     | RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens                                | current   | RFC 8705 (PROPOSED STANDARD, February 2)      |         | PROPOSED STANDARD February 2     |
| `ech-preview` | TLS Encrypted Client Hello                                                                                             | preview   | draft-ietf-tls-esni-25 (WG draft, 2026-10-06) | track   | WG draft 2026-10-06              |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3

- Publisher status on 2026-10-06: PROPOSED STANDARD (August 201).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8446.html
- Revision token: RFC 8446 (PROPOSED STANDARD, August 201)

### RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2

- Publisher status on 2026-10-06: PROPOSED STANDARD (August 200).
- Pinned text: https://www.rfc-editor.org/rfc/rfc5246.html
- Revision token: RFC 5246 (PROPOSED STANDARD, August 200)

### RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)

- Publisher status on 2026-10-06: BEST CURRENT PRACTICE (November 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9325.html
- Revision token: RFC 9325 (BEST CURRENT PRACTICE, November 2)

### RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens

- Publisher status on 2026-10-06: PROPOSED STANDARD (February 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8705.html
- Revision token: RFC 8705 (PROPOSED STANDARD, February 2)

### TLS Encrypted Client Hello

- Publisher status on 2026-10-06: WG draft (2026-10-06).
- Pinned text: https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25
- Revision token: draft-ietf-tls-esni-25 (WG draft, 2026-10-06)

## Upgrading

### rfc5246 to rfc8446

1. Treat documents that cite RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2 (RFC 5246 (PROPOSED STANDARD, August 200)) as input.
2. Re-read RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3 at https://www.rfc-editor.org/rfc/rfc8446.html.
3. Keep behavior that RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3 still requires, and replace behavior that only RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2 required.
4. Record the target revision on the artifact.

## Preview: TLS Encrypted Client Hello

`ech-preview` is a WG draft dated 2026-10-06, pinned at https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
