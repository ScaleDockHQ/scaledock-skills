# cisa-kev

An agent skill for CISA KEV: prioritizing vulnerability fixes with the CISA Known Exploited Vulnerabilities catalog and reading its JSON feed.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cisa-kev
```

Then ask your agent to apply CISA KEV.

## What it covers

- The CISA Known Exploited Vulnerabilities (KEV) catalog: the fields of each catalog entry from the KEV JSON schema in the cisagov/kev-data repository at a pinned commit, the remediation requirements of Binding Operational Directive 26-04, which now governs the catalog, and the catalog's inclusion and removal criteria.

## Versions

| Line     | Status  |
| -------- | ------- |
| CISA KEV | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [KEV catalog JSON schema (cisagov/kev-data)](https://raw.githubusercontent.com/cisagov/kev-data/b244ed1a640323565afba92100d7308d51c6614e/known_exploited_vulnerabilities_schema.json): CISA data schema, Commit b244ed1a6403 (2026-10-04).
- [BOD 26-04: Prioritizing Security Updates Based on Risk](https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk): Binding Operational Directive, Issued June 10, 2026.
- [BOD 22-01: Reducing the Significant Risk of Known Exploited Vulnerabilities (Revoked)](https://www.cisa.gov/news-events/directives/bod-22-01-reducing-significant-risk-known-exploited-vulnerabilities): Binding Operational Directive (revoked), Issued November 3, 2021; revoked June 10, 2026.

## License

MIT
