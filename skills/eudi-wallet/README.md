# eudi-wallet

An agent skill for the EU Digital Identity Wallet Architecture and Reference Framework (ARF), targeting ARF 3.0.0 with upgrades from ARF 2.x and 1.x: Wallet Units, PID and attestation issuers, and Relying Parties built and reviewed against the ARF trust model and its High-Level Requirements.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill eudi-wallet
```

Then ask your agent to "review our EUDI Wallet Relying Party against ARF 3.0.0" or "list the HLRs our PID Provider must meet".

## What it covers

- The roles: Wallet Providers and Wallet Units, PID Providers, QEAA, PuB-EAA and non-qualified EAA Providers, Relying Parties and intermediaries, Registrars, Access CAs and Providers of registration certificates.
- Trusted Lists and LoTEs, access certificates and registration certificates, Relying Party Services and intended uses.
- Wallet Unit components (WSCA/WSCD, keystores), Wallet Instance Attestations and Key Attestations, and Wallet Unit revocation.
- ISO/IEC 18013-5 mdoc and SD-JWT VC, the PID identifiers, Attestation Rulebooks and device binding.
- Issuance with OpenID4VCI and HAIP, including the Wallet Unit and issuer checks and embedded disclosure policies.
- Presentation over ISO/IEC 18013-5 proximity, OpenID4VP or ISO/IEC 18013-7 over redirects or the W3C Digital Credentials API, User approval and the Relying Party verification steps.
- Revocation with status lists, unlinkability methods A to D, and pseudonyms.
- How Annex 2 and its HLR CSV are organised, with starting points per role.
- Regulation (EU) 2024/1183 Articles 5a and 5b where the ARF relies on them.

## Versions

| Line            | Status                |
| --------------- | --------------------- |
| ARF main branch | preview (track)       |
| ARF 3.0.0       | current               |
| ARF 2.9.0       | legacy (upgrade from) |
| ARF 1.10.0      | legacy (upgrade from) |

`references/versions.md` says which release to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ARF repository at v3.0.0](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/tree/v3.0.0) and its [HLR CSV](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/v3.0.0/hltr/high-level-requirements.csv): Released, v3.0.0 (21 July 2026).
- [ARF releases](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases) and [changelog](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/CHANGELOG.md): 1.0.0 to 3.0.0.
- ARF repository at [v2.9.0](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/tree/v2.9.0) and [v1.10.0](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/tree/v1.10.0): Released.
- [ARF main branch](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/tree/main): commit f5789a7 (2 October 2026).
- [ARF published site](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/): shows v3.0.0.
- [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): in force, OJ L 2024/1183 of 30 April 2024.

## License

MIT
