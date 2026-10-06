# dns-over-https

An agent skill for DNS Queries over HTTPS (DoH).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dns-over-https
```

Then ask the agent to apply DNS Queries over HTTPS (DoH).

## What it covers

- when resolving DNS over HTTPS
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                                               | Status  |
| -------------------------------------------------------------------------------------------------- | ------- |
| RFC 8484 DNS Queries over HTTPS (DoH)                                                              | current |
| RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records) | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 8484 DNS Queries over HTTPS (DoH)](https://www.rfc-editor.org/rfc/rfc8484.html): PROPOSED STANDARD, RFC 8484 (PROPOSED STANDARD, October 20).
- [RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)](https://www.rfc-editor.org/rfc/rfc9460.html): PROPOSED STANDARD, RFC 9460 (PROPOSED STANDARD, November 2).

## License

MIT
