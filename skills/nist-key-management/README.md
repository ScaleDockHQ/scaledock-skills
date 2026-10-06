# nist-key-management

An agent skill for NIST key management.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nist-key-management
```

Then ask the agent to apply NIST key management.

## What it covers

- when managing cryptographic keys
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                   | Status  |
| ---------------------- | ------- |
| SP 800-57 Part 1 Rev 5 | current |
| SP 800-131A Rev 2      | current |
| SP 800-132             | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SP 800-57 Part 1 Rev 5](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf): NIST SP, SP 800-57 Part 1 Rev 5, fetched 2026-10-06 (NIST SP, 2026-10-06).
- [SP 800-131A Rev 2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf): NIST SP, SP 800-131A Rev 2, fetched 2026-10-06 (NIST SP, 2026-10-06).
- [SP 800-132](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf): NIST SP, SP 800-132, fetched 2026-10-06 (NIST SP, 2026-10-06).

## License

MIT
