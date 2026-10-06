# gaia-x

An agent skill for Gaia-X: issuing and verifying Gaia-X Credentials and meeting Gaia-X Compliance.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gaia-x
```

Then ask your agent to apply Gaia-X.

## What it covers

- Gaia-X, the European association's trust framework for data spaces: the Architecture Document (technical compatibility), the Identity, Credentials and Access Management (ICAM) specification (Gaia-X Credential format and digital identities), and the Compliance Document (criteria, Trust Anchors and conformity assessment). Each is published from its Gaia-X GitLab repository at a release tag.

## Versions

| Line                        | Status  |
| --------------------------- | ------- |
| Architecture Document 3.1   | current |
| Architecture Document 25.11 | legacy  |
| ICAM 25.11                  | current |
| Compliance Document 4.0.0   | current |
| Compliance Document 3.1.0   | legacy  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Gaia-X Architecture Document: technical compatibility specifications](https://gitlab.com/gaia-x/technical-committee/architecture-working-group/architecture-document/-/raw/3.1/docs/gaia-x_technical_compatibility_specifications.md): Gaia-X Architecture Document, tag 3.1, 2026-07-06.
- [Gaia-X ICAM: Gaia-X Credentials](https://gitlab.com/gaia-x/technical-committee/identity-credentials-and-access-management-working-group/icam/-/raw/25.11/docs/gaia-x_credentials.md): Gaia-X ICAM specification, tag 25.11, 2025-11-11.
- [Gaia-X ICAM: Digital identities](https://gitlab.com/gaia-x/technical-committee/identity-credentials-and-access-management-working-group/icam/-/raw/25.11/docs/digital_identities.md): Gaia-X ICAM specification, tag 25.11, 2025-11-11.
- [Gaia-X Compliance Document: Trust Anchors](https://gitlab.com/gaia-x/policy-rules-committee/compliance-document/-/raw/4.0.0/docs/Gaia-X_Trust_Anchors.md): Gaia-X Compliance Document, tag 4.0.0, 2026-09-28.
- [Gaia-X Compliance Document: overarching rules](https://gitlab.com/gaia-x/policy-rules-committee/compliance-document/-/raw/4.0.0/docs/overarching_rules.md): Gaia-X Compliance Document, tag 4.0.0, 2026-09-28.

## License

MIT
