# security-txt

An agent skill for RFC 9116 security.txt: writing, serving, signing, parsing and auditing the `/.well-known/security.txt` file that tells researchers how to report vulnerabilities.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill security-txt
```

Then ask your agent to "add a security.txt to our site", "check why our security.txt is flagged as expired", or "write a parser for security.txt files".

## What it covers

- Every field in the IANA security.txt Fields registry: Contact, Expires, Encryption, Acknowledgments, Preferred-Languages, Canonical, Policy, Hiring, CSAF and Bug-Bounty, with cardinality and URI rules.
- Location at `/.well-known/security.txt`, the legacy `/security.txt` path, HTTPS, `text/plain; charset=utf-8`, and per-host scope.
- OpenPGP cleartext signing with Canonical, including how RFC 9580 meets the RFC 9116 grammar.
- The ABNF, parsing rules and size limits, and a consumer checklist.
- Every security consideration: compromised files, redirects, stale data, malformed input, no implied permission to test, multi-tenant hosts, transport and spam.
- Upgrading files written against the pre-RFC drafts, and the RFC 9116 errata.

## Versions

| Line                     | Status                |
| ------------------------ | --------------------- |
| RFC 9116                 | current               |
| draft-foudil-securitytxt | legacy (upgrade from) |

`references/versions.md` says what changed across the drafts and how to upgrade a draft-era file to RFC 9116.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116.html): RFC (Informational), April 2022.
- [RFC 9116 errata](https://www.rfc-editor.org/errata/rfc9116): 6946 verified; 7264 and 7743 reported.
- [IANA security.txt Fields registry](https://www.iana.org/assignments/security-txt-fields/): last updated 2026-03-07.
- [securitytxt.org](https://securitytxt.org): project website by the RFC authors.
- [draft-foudil-securitytxt](https://datatracker.ietf.org/doc/draft-foudil-securitytxt/): Internet-Draft, -00 to -12.
- [draft-bruhns-securitytxt-product-security](https://datatracker.ietf.org/doc/draft-bruhns-securitytxt-product-security/): Internet-Draft (individual), -00.
- [RFC 9580](https://www.rfc-editor.org/rfc/rfc9580): OpenPGP, obsoletes RFC 4880.
- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339): Internet date-time format.
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): HTTP Semantics.
- [CSAF 2.0](https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html): OASIS Standard, requirement 8.

## License

MIT
