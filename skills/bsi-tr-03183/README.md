# bsi-tr-03183

An agent skill for BSI TR-03183: meeting the German BSI's Cyber Resilience Act requirements for risk assessment, SBOMs and vulnerability reports.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill bsi-tr-03183
```

Then ask your agent to apply BSI TR-03183.

## What it covers

- BSI Technical Guideline TR-03183, Cyber Resilience Requirements for Manufacturers and Products, from the German Federal Office for Information Security. Part 1 sets general requirements and a CRA risk-assessment process, Part 2 sets the content and format of Software Bills of Materials, and Part 3 sets how manufacturers receive and handle vulnerability reports.

## Versions

| Line             | Status  |
| ---------------- | ------- |
| TR-03183-1 1.0.0 | current |
| TR-03183-2 2.1.0 | current |
| TR-03183-2 2.0.0 | legacy  |
| TR-03183-2 1.1   | legacy  |
| TR-03183-3 1.0.0 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [BSI TR-03183-1: General requirements](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v1_0_0.pdf?__blob=publicationFile): Technical Guideline, Version 1.0.0, 2025-07-31.
- [BSI TR-03183-2: Software Bill of Materials (SBOM)](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-2_v2_1_0.pdf?__blob=publicationFile): Technical Guideline, Version 2.1.0, 2025-08-20.
- [BSI TR-03183-3: Vulnerability Reports and Notifications](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-3_v1_0_0.pdf?__blob=publicationFile): Technical Guideline, Version 1.0.0, 2025-08-20.

## License

MIT
