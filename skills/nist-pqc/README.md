# nist-pqc

An agent skill for NIST PQC.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nist-pqc
```

Then ask the agent to apply NIST PQC.

## What it covers

- when implementing NIST post-quantum cryptography
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line       | Status  |
| ---------- | ------- |
| FIPS 203   | current |
| FIPS 204   | current |
| FIPS 205   | current |
| SP 800-227 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [FIPS 203](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf): FIPS, FIPS 203, fetched 2026-10-06 (FIPS, 2026-10-06).
- [FIPS 204](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf): FIPS, FIPS 204, fetched 2026-10-06 (FIPS, 2026-10-06).
- [FIPS 205](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf): FIPS, FIPS 205, fetched 2026-10-06 (FIPS, 2026-10-06).
- [SP 800-227](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-227.pdf): NIST SP, SP 800-227, fetched 2026-10-06 (NIST SP, 2026-10-06).

## License

MIT
