# iab-tcf

An agent skill for IAB TCF: encoding a TCF consent string.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill iab-tcf
```

Then ask your agent to apply IAB TCF.

## What it covers

- The IAB Europe Transparency and Consent Framework (TCF) lets Consent Management Platforms (CMPs) record a user's transparency and consent choices in a TC String that vendors in the ad supply chain read. IAB Tech Lab publishes the technical specifications on GitHub; this skill quotes the TCF v2 "Consent string and vendor list formats" and "CMP API" documents.
- The TCF Policies from IAB Europe (purposes, legal bases, CMP and vendor obligations) are a separate legal document and are not pinned here; the quotes are the technical specifications only.

## Versions

| Line    | Status  |
| ------- | ------- |
| TCF 2.2 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [IAB Tech Lab - Consent string and vendor list formats v2](https://raw.githubusercontent.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/703fc2964ba8fe1086b18a3c509c46a48c1aee1c/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md): IAB Tech Lab Final specification, Document revision 2.4 (May 2026), commit 703fc29, 2026-07-28.
- [IAB Tech Lab - CMP API v2](https://raw.githubusercontent.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/703fc2964ba8fe1086b18a3c509c46a48c1aee1c/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md): IAB Tech Lab Final specification, Version 2.2 (February 2026 update), commit 703fc29, 2026-07-28.

## License

MIT
