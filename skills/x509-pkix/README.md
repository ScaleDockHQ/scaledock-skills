# x509-pkix

An agent skill for Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill x509-pkix
```

Then ask the agent to apply Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.

## What it covers

- when issuing or checking X.509 certificates
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                                                        | Status                |
| ----------------------------------------------------------------------------------------------------------- | --------------------- |
| RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile | current               |
| RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP                 | current               |
| RFC 9162 Certificate Transparency Version 2.0                                                               | current               |
| RFC 6962 Certificate Transparency                                                                           | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile](https://www.rfc-editor.org/rfc/rfc5280.html): PROPOSED STANDARD, RFC 5280 (PROPOSED STANDARD, May 2008).
- [RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP](https://www.rfc-editor.org/rfc/rfc6960.html): PROPOSED STANDARD, RFC 6960 (PROPOSED STANDARD, June 2013).
- [RFC 9162 Certificate Transparency Version 2.0](https://www.rfc-editor.org/rfc/rfc9162.html): EXPERIMENTAL, RFC 9162 (EXPERIMENTAL, December 2).
- [RFC 6962 Certificate Transparency](https://www.rfc-editor.org/rfc/rfc6962.html): EXPERIMENTAL, RFC 6962 (EXPERIMENTAL, June 2013).

## License

MIT
