# refeds-profiles

An agent skill for REFEDS profiles and entity categories: signalling MFA, assurance and entity categories in R&E federations.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill refeds-profiles
```

Then ask your agent to apply REFEDS profiles and entity categories.

## What it covers

- REFEDS (Research and Education FEDerations) profiles for federated SAML and OpenID Connect: the MFA and SFA authentication context profiles, the REFEDS Assurance Framework, the Sirtfi incident response framework and the Research and Scholarship, Personalized, Pseudonymous and Anonymous Access entity categories. The texts are the versions REFEDS deposited on Zenodo.
- refeds.org refuses automated fetches, so the pinned texts are the copies REFEDS deposited on Zenodo. REFEDS MFA Profile 2.0 and Sirtfi 2.0 are published only on refeds.org: the lines are listed so you can name them, but their text is not pinned. MFA 2.0 keeps the 1.2 semantics as General MFA and adds a Phishing-Resistant MFA identifier; check refeds.org for that identifier before you emit it.

## Versions

| Line                           | Status    |
| ------------------------------ | --------- |
| REFEDS MFA Profile 2.0         | current   |
| REFEDS MFA Profile 1.2         | supported |
| REFEDS SFA Profile 1.0         | current   |
| REFEDS Assurance Framework 2.0 | current   |
| REFEDS Assurance Framework 1.0 | supported |
| Sirtfi 2.0                     | current   |
| Sirtfi 1.0                     | supported |
| Research and Scholarship 1.3   | current   |
| Access entity categories v2    | current   |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [REFEDS Multi-Factor Authentication Profile v1.2](https://zenodo.org/records/10135577): REFEDS Final, Version 1.2, 2023-11-15.
- [REFEDS MFA (wiki page naming the current profile)](https://wiki.refeds.org/spaces/PRO/pages/22544394/MFA): REFEDS wiki, Page version of 2026-06-30.
- [Consultation: MFA Profile v2.0](https://wiki.refeds.org/spaces/CON/pages/418414593/Consultation+MFA+Profile+v2.0): REFEDS wiki, Closed consultation page summarising the 2.0 changes.
- [REFEDS SFA Profile v1.0](https://zenodo.org/records/5113499): REFEDS Final, Version 1.0, 2018-08-28.
- [REFEDS Assurance Framework v2.0](https://zenodo.org/records/10277233): REFEDS Final, Version 2.0, 2023-12-05.
- [Security Incident Response Trust Framework for Federated Identity (Sirtfi) v1.0](https://zenodo.org/records/1256531): REFEDS Final, Version 1.0, 2015-12-14.
- [Consultation: Sirtfi v2](https://wiki.refeds.org/spaces/CON/pages/100270114/Consultation+Sirtfi+v2): REFEDS wiki, Consultation page with the v1 and v2 coexistence note.
- [REFEDS Research and Scholarship Entity Category v1.3](https://zenodo.org/records/4700413): REFEDS Final, Version 1.3, 2016-09-16.
- [Personalized Access Entity Category v2](https://zenodo.org/records/7684449): REFEDS Final, Version 2, 2023-02-13.
- [Pseudonymous Access Entity Category v2](https://zenodo.org/records/7684488): REFEDS Final, Version 2, 2023-02-13.
- [REFEDS Anonymous Access Entity Category v2](https://zenodo.org/records/7816828): REFEDS Final, Version 2, 2021-03-15.

## License

MIT
