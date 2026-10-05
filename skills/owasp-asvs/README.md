# owasp-asvs

An agent skill for the OWASP Application Security Verification Standard (ASVS) 5.0.0, with upgrades from 4.0.3: choosing a level, picking the requirements that apply to an application, citing them with versioned ids, and verifying, reporting or contracting against them.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-asvs
```

Then ask your agent to "build an ASVS 5.0.0 Level 2 requirement list for our API" or "map our ASVS 4.0.3 report to 5.0.0".

## What it covers

- The three priority-based levels and how 5.0 redefined them (L1 is now about 20% of the standard).
- Scope rules, documented security decisions, and the citation format `v5.0.0-<chapter>.<section>.<requirement>`.
- Filtering chapters and sections by application profile and building a requirement list from the official JSON.
- Summaries of chapters V1 to V17 with section names, level counts and key requirement ids, plus Appendix C (cryptography) and Appendix D (recommendations).
- Verification methods, report contents, procurement and forks, and why OWASP certifies no one.
- The 4.0.3 to 5.0.0 mapping files, where each 4.0.3 chapter went, and an upgrade procedure.

## Versions

| Line               | Status                |
| ------------------ | --------------------- |
| ASVS bleeding edge | preview (track)       |
| ASVS 5.0.0         | current               |
| ASVS 4.0.3         | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP ASVS releases](https://github.com/OWASP/ASVS/releases): 5.0.0 (2025-05-30) latest stable, 4.0.3 (2021-10-28), and the bleeding-edge `latest` release.
- [ASVS 5.0.0 markdown](https://github.com/OWASP/ASVS/tree/v5.0.0_release/5.0/en), including "What is the ASVS?", "Assessment and Certification" and "Changes Compared to v4.x", and the [5.0.0 flat JSON](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.flat.json).
- [Mapping files between 4.0.3 and 5.0.0](https://github.com/OWASP/ASVS/tree/master/5.0/mappings): master at 9b5da31.
- [ASVS 4.0.3 markdown](https://github.com/OWASP/ASVS/tree/v4.0.3_release/4.0/en): 4.0.3.
- [ASVS master branch](https://github.com/OWASP/ASVS/tree/master/5.0/en): bleeding edge at 9b5da31 (2026-10-05).
- [OWASP ASVS project page](https://owasp.org/www-project-application-security-verification-standard/): Flagship Project.

## License

MIT
