# trace-context

An agent skill for W3C Trace Context and W3C Baggage: parsing, validating, generating and propagating the `traceparent`, `tracestate` and `baggage` headers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill trace-context
```

Then ask your agent to "propagate W3C trace context through our proxy" or "review our traceparent and baggage handling".

## What it covers

- `traceparent`: version, `trace-id`, `parent-id` and `trace-flags`, invalid values, higher-version parsing, the allowed mutations and ID generation.
- `tracestate`: keys and values, combining multiple header fields, the 32-member and 512-character limits, truncation and mutation order.
- `baggage`: grammar, percent-encoding, properties, the 64-member and 8192-byte limits, and mutation.
- The processing model for tracers, pass-through proxies and message buses, with a decision table.
- Privacy and security: no personal data in trace headers, restarts at trust boundaries, sampling abuse, and CORS.
- The random trace-id flag and other Level 2 changes, and an upgrade checklist from Level 1.

## Versions

| Line                  | Status                                          |
| --------------------- | ----------------------------------------------- |
| Trace Context Level 2 | preview (build), Candidate Recommendation Draft |
| Trace Context Level 1 | current, W3C Recommendation                     |
| W3C Baggage           | current (build), Candidate Recommendation       |

`references/versions.md` says which line to use, what Level 2 and the editor's drafts change, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Trace Context (latest version)](https://www.w3.org/TR/trace-context/): W3C Recommendation, Level 1.
- [Trace Context Level 1](https://www.w3.org/TR/trace-context-1/): W3C Recommendation, 23 November 2021.
- [Trace Context Level 2](https://www.w3.org/TR/trace-context-2/): W3C Candidate Recommendation Draft, 28 March 2024.
- [Baggage](https://www.w3.org/TR/baggage/): W3C Candidate Recommendation Snapshot, 30 May 2024.
- [Trace Context editor's draft](https://w3c.github.io/trace-context/): commit `acab820`.
- [Baggage editor's draft](https://w3c.github.io/baggage/): commit `bfe9a3b`.
- [Trace Context Protocols Registry](https://www.w3.org/TR/trace-context-protocols-registry/): W3C Working Group Note, 19 November 2019.

## License

MIT
