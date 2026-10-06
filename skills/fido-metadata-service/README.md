# fido-metadata-service

An agent skill for FIDO Metadata Service.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fido-metadata-service
```

Then ask the agent to apply FIDO Metadata Service.

## What it covers

- when publishing or consuming FIDO authenticator metadata
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                        | Status                |
| --------------------------- | --------------------- |
| FIDO Metadata Service 3.1.1 | current               |
| FIDO Metadata Service 3.1   | supported             |
| FIDO Metadata Service 3.0   | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [FIDO Metadata Service 3.1.1](https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1.1-ps-20260105.html): Proposed Standard, MDS 3.1.1 Proposed Standard 2026-01-05 (Proposed Standard, 2026-01-05).
- [FIDO Metadata Service 3.1](https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1-ps-20250521.html): Proposed Standard, MDS 3.1 Proposed Standard 2025-05-21 (Proposed Standard, 2025-05-21).
- [FIDO Metadata Service 3.0](https://fidoalliance.org/specs/mds/fido-metadata-service-v3.0-ps-20210518.html): Proposed Standard, MDS 3.0 Proposed Standard 2021-05-18 (Proposed Standard, 2021-05-18).

## License

MIT
