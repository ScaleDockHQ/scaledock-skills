# SBOM minimum elements in SPDX

Read this when an SBOM must cover a published set of minimum elements. Sources: SPDX 2.3.1 Annex L (Compliance with regulatory frameworks), which maps the 2021 NTIA and the 2026 CISA minimum elements to SPDX 2.3 fields; the SPDX 3.0.1 Annex SPDX Lite; and the 2.3 to 3.0 translation in "Differences from previous editions", listed in [Sources](../SKILL.md#sources). The 3.0 column below is derived by applying that translation to SPDX's own 2.3 mapping; SPDX has not published a 3.0 mapping in the sources read.

## 2026 CISA minimum elements (2.3.1 Annex L.2)

CISA published "2026 Minimum Elements for a Software Bill of Materials" in July 2026; it updates and replaces the 2021 NTIA minimum elements (L.2.1).

### SBOM metadata

| Element                  | SPDX 2.3 field (L.2.2)                                                                | SPDX 3.0 equivalent                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| SBOM Author              | Creator (6.8)                                                                         | CreationInfo `createdBy` (Person or Organization)                                         |
| SBOM Author signature    | none: put it in an external document                                                  | none in the model: sign the serialized document externally                                |
| SBOM Data Format Name    | SPDX version (6.1)                                                                    | `@context` and `specVersion`                                                              |
| SBOM Data Format Version | SPDX version (6.1)                                                                    | CreationInfo `specVersion`                                                                |
| SBOM Generation Context  | Creator Comment (6.10) with one of Design, Source, Build, Analyzed, Deployed, Runtime | Sbom `software_sbomType` (`design`, `source`, `build`, `analyzed`, `deployed`, `runtime`) |
| SBOM Timestamp           | Created (6.9)                                                                         | CreationInfo `created`                                                                    |
| SBOM Tool Name           | Creator `Tool: name-version` (6.8)                                                    | CreationInfo `createdUsing` Tool `name`                                                   |
| SBOM Tool Version        | Creator `Tool: name-version` (6.8)                                                    | the Tool element (name and version as the tool reports them)                              |
| SBOM Version             | SPDX Document Namespace (6.5), best approximation                                     | a new SpdxDocument `spdxId` per document version                                          |

### Component data

| Element                           | SPDX 2.3 field (L.2.2)                                                                      | SPDX 3.0 equivalent                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Component Producer                | Package Originator (7.6)                                                                    | `originatedBy` (Agent)                                                               |
| Component Dependency Relationship | Relationship `DEPENDS_ON` (11.1)                                                            | Relationship `dependsOn`                                                             |
| Component Hash Value              | Package Checksum value (7.10)                                                               | `verifiedUsing` Hash `hashValue`                                                     |
| Component Hash Algorithm          | Package Checksum algorithm (7.10)                                                           | `verifiedUsing` Hash `algorithm`                                                     |
| Component Identifiers             | External reference (7.21): `PACKAGE-MANAGER purl`; `OTHER` for SWID or gitoid               | `software_packageUrl`; `externalIdentifier` (SWID); content identifier (gitoid)      |
| Component License                 | Concluded License (7.13) or Declared License (7.15); at least one must not be `NOASSERTION` | `hasConcludedLicense` or `hasDeclaredLicense`; at least one not `NoAssertionLicense` |
| Component Name                    | Package Name (7.1)                                                                          | Package `name`                                                                       |
| Component Version                 | Package Version (7.3)                                                                       | `software_packageVersion`                                                            |

Notes from L.2.2: the "Tool Name" and "Tool Version" share the Creator field, separated by `-`; SPDX 2.3.1 has no field for the author signature.

## 2021 NTIA minimum elements (2.3.1 Annex L.1; 2.3 Annex K.2)

| Element           | SPDX 2.3 field                                                           | SPDX 3.0 equivalent                             |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| Author Name       | Creator (6.8)                                                            | CreationInfo `createdBy`                        |
| Supplier Name     | Package Supplier (7.5)                                                   | `suppliedBy`                                    |
| Component Name    | Package Name (7.1)                                                       | Package `name`                                  |
| Version String    | Package Version (7.3)                                                    | `software_packageVersion`                       |
| Component Hash    | Package Checksum (7.10), listed in 2.3 Annex K only                      | `verifiedUsing` Hash                            |
| Unique Identifier | Package SPDX Identifier (7.2) with Document Namespace (6.5)              | `spdxId` (a URI)                                |
| Relationship      | `CONTAINS`, `DESCRIBES`; the document must describe at least one package | `contains`; SpdxDocument and Sbom `rootElement` |
| Timestamp         | Created (6.9)                                                            | CreationInfo `created`                          |

## Producing a compliant SBOM

1. Decide which set applies; the 2026 CISA document updates and replaces the 2021 NTIA one (L.2.1).
2. For every component, fill name, version, supplier or producer, a hash of the shipped artifact, a Package URL or other identifier, and the declared or concluded license.
3. Record dependencies with `dependsOn` (3.0) or `DEPENDS_ON` (2.3); say `NoAssertionElement` or `NOASSERTION` where the dependency list is unknown, rather than leaving it to look complete.
4. Record the generation context (`software_sbomType` or the Creator Comment keyword), the tool name and version, and the timestamp.
5. Sign the serialized document outside SPDX, and keep the signature with it.
6. For SPDX 3.0, the Lite profile's mandatory set (see [`spdx3-model.md`](spdx3-model.md)) already covers name, version, supplier, copyright, download location or Package URL, and both license relationships; add hashes, dependencies and the Sbom type on top.
