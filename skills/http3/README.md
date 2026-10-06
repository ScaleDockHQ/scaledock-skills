# http3

An agent skill for HTTP/3.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill http3
```

Then ask the agent to apply HTTP/3.

## What it covers

- when speaking HTTP/3 or QUIC
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                        | Status  |
| ----------------------------------------------------------- | ------- |
| RFC 9114 HTTP/3                                             | current |
| RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport | current |
| RFC 9001 Using TLS to Secure QUIC                           | current |
| RFC 9002 QUIC Loss Detection and Congestion Control         | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9114 HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html): PROPOSED STANDARD, RFC 9114 (PROPOSED STANDARD, June 2022).
- [RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport](https://www.rfc-editor.org/rfc/rfc9000.html): PROPOSED STANDARD, RFC 9000 (PROPOSED STANDARD, May 2021).
- [RFC 9001 Using TLS to Secure QUIC](https://www.rfc-editor.org/rfc/rfc9001.html): PROPOSED STANDARD, RFC 9001 (PROPOSED STANDARD, May 2021).
- [RFC 9002 QUIC Loss Detection and Congestion Control](https://www.rfc-editor.org/rfc/rfc9002.html): PROPOSED STANDARD, RFC 9002 (PROPOSED STANDARD, May 2021).

## License

MIT
