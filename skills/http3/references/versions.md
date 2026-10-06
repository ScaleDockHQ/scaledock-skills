# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                        | Status  | Revision                                | Posture | Publisher                   |
| --------- | ----------------------------------------------------------- | ------- | --------------------------------------- | ------- | --------------------------- |
| `rfc9114` | RFC 9114 HTTP/3                                             | current | RFC 9114 (PROPOSED STANDARD, June 2022) |         | PROPOSED STANDARD June 2022 |
| `rfc9000` | RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport | current | RFC 9000 (PROPOSED STANDARD, May 2021)  |         | PROPOSED STANDARD May 2021  |
| `rfc9001` | RFC 9001 Using TLS to Secure QUIC                           | current | RFC 9001 (PROPOSED STANDARD, May 2021)  |         | PROPOSED STANDARD May 2021  |
| `rfc9002` | RFC 9002 QUIC Loss Detection and Congestion Control         | current | RFC 9002 (PROPOSED STANDARD, May 2021)  |         | PROPOSED STANDARD May 2021  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 9114 HTTP/3

- Publisher status on 2026-10-06: PROPOSED STANDARD (June 2022).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9114.html
- Revision token: RFC 9114 (PROPOSED STANDARD, June 2022)

### RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2021).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9000.html
- Revision token: RFC 9000 (PROPOSED STANDARD, May 2021)

### RFC 9001 Using TLS to Secure QUIC

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2021).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9001.html
- Revision token: RFC 9001 (PROPOSED STANDARD, May 2021)

### RFC 9002 QUIC Loss Detection and Congestion Control

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2021).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9002.html
- Revision token: RFC 9002 (PROPOSED STANDARD, May 2021)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
