# fido-credential-exchange

An agent skill for FIDO Credential Exchange.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fido-credential-exchange
```

Then ask the agent to apply FIDO Credential Exchange.

## What it covers

- when exchanging passkeys between providers
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                             | Status          |
| -------------------------------- | --------------- |
| Credential Exchange Format 1.0   | current         |
| Credential Exchange Protocol 1.0 | current (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Credential Exchange Format 1.0](https://fidoalliance.org/specs/cx/cxf-v1.0-ps-errata-20260309.html): Proposed Standard errata, CXF 1.0 Proposed Standard errata 2026-03-09 (Proposed Standard errata, 2026-03-09).
- [Credential Exchange Protocol 1.0](https://fidoalliance.org/specs/cx/cxp-v1.0-wd-20241003.html): Working Draft, CXP 1.0 Working Draft 2024-10-03 (Working Draft, 2024-10-03).

## License

MIT
