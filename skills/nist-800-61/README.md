# nist-800-61

An agent skill for NIST SP 800-61.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nist-800-61
```

Then ask the agent to apply NIST SP 800-61.

## What it covers

- when handling computer security incidents
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line            | Status                |
| --------------- | --------------------- |
| SP 800-61 Rev 3 | current               |
| SP 800-61 Rev 2 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SP 800-61 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf): NIST SP, SP 800-61 Rev 3, fetched 2026-10-06 (NIST SP, 2026-10-06).
- [SP 800-61 Rev 2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf): NIST SP, SP 800-61 Rev 2, fetched 2026-10-06 (NIST SP, 2026-10-06).

## License

MIT
