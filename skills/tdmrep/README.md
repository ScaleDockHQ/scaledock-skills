# tdmrep

An agent skill for the W3C TDM Reservation Protocol (TDMRep): declare and read text and data mining rights reservations, the machine-readable EU CDSM Article 4 opt-out, and the licensing policies that go with them.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill tdmrep
```

Then ask your agent to "opt our articles out of text and data mining with TDMRep" or "make our training crawler honor tdm-reservation".

## What it covers

- `tdm-reservation` and `tdm-policy`, and how unset and error values behave.
- `/.well-known/tdmrep.json` rules and path matching, HTTP headers, HTML meta tags, and EPUB and PDF metadata.
- Processing priority for TDM agents.
- The ODRL 2.2 TDM Policy profile: assigner, `tdm:mine`, consent and compensation duties, purpose constraints.

## Versions

| Line                     | Status  |
| ------------------------ | ------- |
| TDMRep Final Report 2024 | current |

`references/versions.md` explains how the editor's draft relates to the Final Report.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [TDMRep Final Community Group Report](https://www.w3.org/community/reports/tdmrep/CG-FINAL-tdmrep-20240510/): 10 May 2024.
- [TDMRep editor's draft](https://w3c-cg.github.io/tdm-reservation-protocol/spec/): Editor's Draft.
- [Directive (EU) 2019/790](https://eur-lex.europa.eu/eli/dir/2019/790/oj): Articles 3 and 4.
- [AI Act Article 53](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-53): AI Act Service Desk.

## License

MIT
