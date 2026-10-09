# notary-project

An agent skill for Notary Project: signing and verifying OCI artifacts with Notary Project signatures, trust stores and trust policies.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill notary-project
```

Then ask your agent to apply Notary Project.

## What it covers

- The Notary Project specifications for signing OCI artifacts: the signature specification (envelope, signed and unsigned attributes, signature manifest, certificate requirements), the trust store and trust policy specification, and the signing and verification workflow, read from the notaryproject/specifications repository at release v1.1.0.

## Versions

| Line                             | Status  |
| -------------------------------- | ------- |
| Notation signature specification | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Notary Project Signature Specification](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signature-specification.md): Specification, Release v1.1.0 (2024-08-13).
- [Notary Project Trust Store and Trust Policy Specification](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/trust-store-trust-policy.md): Specification, Release v1.1.0 (2024-08-13).
- [Notary Project Signing and Verification Workflow](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signing-and-verification-workflow.md): Specification, Release v1.1.0 (2024-08-13).

## License

MIT
