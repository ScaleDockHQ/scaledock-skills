# spdx

An agent skill for SPDX, the Linux Foundation's open standard for bills of materials and licensing (SPDX 2.2.1 is ISO/IEC 5962:2021): write, validate and upgrade SPDX 3.0 and 2.3 documents, license expressions and `SPDX-License-Identifier` tags.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill spdx
```

Then ask your agent to "generate an SPDX 3.0 SBOM for this package", "add SPDX-License-Identifier headers to these files", or "convert this SPDX 2.3 document to SPDX 3.0".

## What it covers

- The SPDX 3.0 model: the Core, Software, Security, Licensing (SimpleLicensing and ExpandedLicensing), Dataset, AI, Build, Lite and Extension profiles; Element, CreationInfo, SpdxDocument, Sbom, Package, File, Snippet and Relationship; JSON-LD with the SPDX context and its validation.
- SPDX 2.3 documents: creation information, packages, files, snippets, other licensing information, relationships and annotations, with the 2.3.1 corrections.
- SPDX license expressions (`AND`, `OR`, `WITH`, `+`, `LicenseRef-`, `AdditionRef-`, `DocumentRef-`), the SPDX License List and its deprecated identifiers, and `SPDX-License-Identifier` tags in source files.
- SBOMs that cover the 2021 NTIA and 2026 CISA minimum elements, using SPDX's own field mappings.
- The 2.3 to 3.0 upgrade, with the relationship type translation table.

## Versions

| Line                   | Status                        |
| ---------------------- | ----------------------------- |
| SPDX 3.1               | preview (track), 3.1-RC1      |
| SPDX 3.0               | current, 3.0.1                |
| SPDX 2.3               | supported                     |
| SPDX 2.2               | legacy (ISO/IEC 5962:2021)    |
| SPDX 2.1 and earlier   | legacy                        |
| SPDX License List 3.29 | current (license-list family) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SPDX Specification 3.0.1](https://spdx.github.io/spdx-spec/v3.0.1/): Released, 3.0.1 (2024-12-17).
- [SPDX 3 model releases](https://github.com/spdx/spdx-3-model/releases): 3.0.1 and 3.1-rc1.
- [SPDX 3.0.1 JSON-LD context](https://spdx.org/rdf/3.0.1/spdx-context.jsonld): 3.0.1.
- [SPDX Specification 2.3](https://spdx.github.io/spdx-spec/v2.3/) and [2.3.1](https://spdx.github.io/spdx-spec/v2.3.1/): Released 2.3 (2022-11-03); 2.3.1 maintenance text.
- [SPDX specifications index](https://spdx.dev/use/specifications/) and [spdx/spdx-spec releases](https://github.com/spdx/spdx-spec/releases).
- [SPDX Specification 3.1-RC1](https://spdx.github.io/spdx-spec/v3.1-RC1/): Release candidate (2026-01-24).
- [Differences from previous editions](https://github.com/spdx/using/blob/main/docs/diffs-from-previous-editions.md) and [Getting started writing SPDX 3](https://github.com/spdx/using/blob/main/docs/getting-started.md): informative.
- [SPDX License List](https://spdx.org/licenses/) and [license-list-data releases](https://github.com/spdx/license-list-data/releases): 3.29.0 (2026-09-16).

## License

MIT
