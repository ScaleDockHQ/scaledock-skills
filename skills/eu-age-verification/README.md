# eu-age-verification

An agent skill for EU Age Verification: issuing, holding and verifying EU proof-of-age attestations.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill eu-age-verification
```

Then ask your agent to apply EU Age Verification.

## What it covers

- The European Commission's age verification solution: the Operational, Security, Product, and Architecture Specifications and Annex A, the Age Verification Profile, published in the `eu-digital-identity-wallet/av-doc-technical-specification` repository. It defines enrolment, batch issuance of Proof of Age attestations, presentation with zero-knowledge proofs or plain ISO mDoc, and the trusted list of Attestation Providers.

## Versions

| Line                           | Status  |
| ------------------------------ | ------- |
| EU Age Verification 2026-09-02 | current |
| EU Age Verification v1.0.6     | legacy  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Age verification: Operational, Security, Product, and Architecture Specifications](https://raw.githubusercontent.com/eu-digital-identity-wallet/av-doc-technical-specification/8b9728752bd8d8eede6077ade4be8900949de2d9/docs/architecture-and-technical-specifications.md): European Commission technical specification, commit 8b97287, 2026-09-02.
- [Age verification Annex A: Age Verification Profile](https://raw.githubusercontent.com/eu-digital-identity-wallet/av-doc-technical-specification/8b9728752bd8d8eede6077ade4be8900949de2d9/docs/annexes/annex-A/annex-A-av-profile.md): European Commission technical specification, commit 8b97287, 2026-09-02.

## License

MIT
