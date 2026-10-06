# content-security-policy

An agent skill for W3C Content Security Policy Level 3 and its companion headers: strict CSP with nonces, hashes and `'strict-dynamic'`, Trusted Types, `Permissions-Policy` and a Fetch Metadata resource isolation policy, with upgrades from CSP Level 2, CSP 1.0 and `Feature-Policy`.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill content-security-policy
```

Then ask your agent to "add a strict Content-Security-Policy to our HTML responses", "roll out Trusted Types in report-only" or "reject cross-site requests with Fetch Metadata".

## What it covers

- CSP headers and `meta` delivery, every directive, source expressions and matching, and the fallback chains.
- Strict CSP with nonces or hashes and `'strict-dynamic'`, `'unsafe-hashes'`, `frame-ancestors`, `base-uri`, `upgrade-insecure-requests`, and the nonce attacks the spec describes.
- Report-only rollout, `report-to` with `Reporting-Endpoints`, deprecated `report-uri`, and both report formats.
- Trusted Types: the three types, policies, the default policy, `require-trusted-types-for 'script'` and `trusted-types`.
- Permissions Policy: the Structured Fields header, allowlists, the iframe `allow` attribute, report-only and reports.
- Fetch Metadata Request Headers (`Sec-Fetch-Site`, `-Mode`, `-Dest`, `-User`) and a server-side resource isolation policy, with TypeScript sketches.

## Versions

| Line                           | Status                |
| ------------------------------ | --------------------- |
| CSP Level 3                    | current (build)       |
| CSP Level 2                    | supported             |
| CSP 1.0 and `X-` headers       | legacy (upgrade from) |
| Trusted Types                  | current (build)       |
| Permissions Policy             | current (build)       |
| Feature Policy                 | legacy (upgrade from) |
| Fetch Metadata Request Headers | current (build)       |
| CSP Embedded Enforcement       | current (track)       |
| Mixed Content                  | current (build)       |
| Reporting API                  | current (track)       |
| Upgrade Insecure Requests      | current (build)       |

The current lines are W3C Working Drafts that browsers implement, so they carry the build posture. `references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/): W3C Working Draft, 16 September 2026, and its [Editor's Draft](https://w3c.github.io/webappsec-csp/).
- [Content Security Policy Level 2](https://www.w3.org/TR/CSP2/): W3C Recommendation, 15 December 2016.
- [Content Security Policy 1.0](https://www.w3.org/TR/CSP1/): W3C Working Group Note, 19 February 2015, and its [2012 Candidate Recommendation](https://www.w3.org/TR/2012/CR-CSP-20121115/).
- [Trusted Types](https://www.w3.org/TR/trusted-types/): W3C Working Draft, 23 June 2026.
- [Permissions Policy](https://www.w3.org/TR/permissions-policy/): W3C Working Draft, 22 September 2026, with the [Policy Controlled Features](https://github.com/w3c/webappsec-permissions-policy/blob/10d8736ea4f13e38410fe0b7424ae04e513b528c/features.md) list.
- [Feature Policy](https://www.w3.org/TR/2019/WD-feature-policy-1-20190416/): W3C First Public Working Draft, 16 April 2019.
- [Fetch Metadata Request Headers](https://www.w3.org/TR/fetch-metadata/): W3C Working Draft, 21 September 2026.
- [Upgrade Insecure Requests](https://www.w3.org/TR/upgrade-insecure-requests/): W3C Candidate Recommendation, 8 October 2015.
- [Mixed Content](https://www.w3.org/TR/mixed-content/): W3C Candidate Recommendation Draft, 23 February 2023.
- [Reporting API](https://www.w3.org/TR/reporting-1/): W3C Working Draft, 11 June 2025.

## License

MIT
