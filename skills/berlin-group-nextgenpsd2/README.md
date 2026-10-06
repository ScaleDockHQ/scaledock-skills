# berlin-group-nextgenpsd2

An agent skill for Berlin Group NextGenPSD2: implementing the NextGenPSD2 XS2A interface as an ASPSP or a TPP.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill berlin-group-nextgenpsd2
```

Then ask your agent to apply Berlin Group NextGenPSD2.

## What it covers

- The Berlin Group NextGenPSD2 XS2A interface, now published as the openFinance API Framework PSD2 Compliance V2 Suite: the XS2A API Implementation Guidelines 2.4.2 (payment initiation, account information, confirmation of funds) and the Protocol Functions and Security Measures 2.4.1 (API structure, SCA approaches, TLS, request signing and encryption).

## Versions

| Line                     | Status  |
| ------------------------ | ------- |
| PSD2 Compliance V2 Suite | current |
| NextGenPSD2 1.3.x        | legacy  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Berlin Group XS2A API Implementation Guidelines 2.4.2](https://berlin-group.org/wp-content/uploads/2026/09/11b.-Berlin-Group-openFinance-API-Framework-Core-PSD2-Compliance-V2-Suite-Compliance-Services-XS2A-API-Implementation-Guidelines-V2.4.2-20260731.pdf): Berlin Group Specification, Version 2.4.2, 31 July 2026.
- [Berlin Group Protocol Functions and Security Measures 2.4.1](https://berlin-group.org/wp-content/uploads/2026/09/11c.-Berlin-Group-openFinance-API-Framework-Core-PSD2-Compliance-V2-Suite-Protocol-Functions-and-Security-Measures-V2.4.1-20260731.pdf): Berlin Group Specification, Version 2.4.1, 31 July 2026.

## License

MIT
