# SPDX 2.3 documents

Read this when writing an SPDX 2.3 document for a consumer that cannot read 3.0, or when reading any 2.x document. Sources: the SPDX 2.3 specification and the 2.3.1 maintenance text, listed in [Sources](../SKILL.md#sources). Clause numbers are the same in both.

## Structure (Clause 5)

| Section                              | Cardinality  | Clause |
| ------------------------------------ | ------------ | ------ |
| Document creation information        | exactly one  | 6      |
| Package information                  | zero or more | 7      |
| File information                     | zero or more | 8      |
| Snippet information                  | zero or more | 9      |
| Other licensing information detected | zero or more | 10     |
| Relationships                        | zero or more | 11     |
| Annotations                          | zero or more | 12     |

- Files need not sit inside a package (§ 5.2.2, § 5.2.3).
- In tag:value, order is significant: a `PackageName:` starts a package; all package fields come before its files; the package's files follow it immediately; sub-packages are separate packages linked by relationships, never nested (§ 5.2.2).
- Formats: tag:value (`*.spdx`), JSON (`*.spdx.json`), YAML (`*.spdx.yaml` or `*.spdx.yml`), RDF/XML (`*.spdx.rdf`), and spreadsheet; XML is in development. All must be UTF-8 and translatable without loss. Tags and format properties are case-sensitive (§ 4.4).
- An omitted optional field signals `NOASSERTION` unless specified otherwise (2.3.1 § 4.3).

## Document creation information (Clause 6)

| Field (tag)                                    | Required  | Format                                                                       | §          |
| ---------------------------------------------- | --------- | ---------------------------------------------------------------------------- | ---------- |
| SPDX version (`SPDXVersion`)                   | yes, 1    | `SPDX-2.3`                                                                   | 6.1        |
| Data license (`DataLicense`)                   | yes, 1    | `CC0-1.0`                                                                    | 6.2        |
| SPDX identifier (`SPDXID`)                     | yes, 1    | `SPDXRef-DOCUMENT`                                                           | 6.3        |
| Document name (`DocumentName`)                 | yes, 1    | text                                                                         | 6.4        |
| Namespace (`DocumentNamespace`)                | yes, 1    | absolute URI with a scheme and no `#`; unique per document version           | 6.5        |
| External document refs (`ExternalDocumentRef`) | no        | `DocumentRef-<id> <document namespace> <checksum>`                           | 6.6        |
| License list version (`LicenseListVersion`)    | no, 0..1  | `M.N`, for example `3.29`                                                    | 6.7        |
| Creator (`Creator`)                            | yes, 1..* | `Person: name (email)`, `Organization: name (email)` or `Tool: name-version` | 6.8        |
| Created (`Created`)                            | yes, 1    | `YYYY-MM-DDThh:mm:ssZ` (UTC)                                                 | 6.9        |
| Creator comment, document comment              | no        | text                                                                         | 6.10, 6.11 |

- A new version of the document gets a new namespace URI; one URI per document and one document per URI (§ 6.5). The suggested pattern is `https://<creator site>/<path>/<document name>-<UUID>`; the URI need not resolve.
- Person or organization names may be `anonymous` (§ 6.8).

## Package information (Clause 7)

Required: Package name (`PackageName`, § 7.1), Package SPDX identifier (`SPDXID`, `SPDXRef-` plus letters, digits, `.` and `-`, § 7.2), Package download location (`PackageDownloadLocation`, § 7.7).

| Field (tag)                                  | Format and rules                                                                                                                                        | §            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `PackageVersion`                             | text                                                                                                                                                    | 7.3          |
| `PackageFileName`                            | file or directory name                                                                                                                                  | 7.4          |
| `PackageSupplier`                            | `Person: ...`, `Organization: ...` or `NOASSERTION`; the actual distributor, an organization or author, not a website                                   | 7.5          |
| `PackageOriginator`                          | same format; where the package originally came from                                                                                                     | 7.6          |
| `PackageDownloadLocation`                    | URL, VCS location `<vcs>+<transport>://<host>[/<path>][@<rev>][#<sub_path>]`, `NONE` or `NOASSERTION`; no credentials in the host                       | 7.7          |
| `FilesAnalyzed`                              | boolean, default `true`; `false` means the package lists no files                                                                                       | 7.8          |
| `PackageVerificationCode`                    | only when files were analyzed; omit when `FilesAnalyzed` is `false`; not required as of 2.3.1                                                           | 7.9          |
| `PackageChecksum`                            | `<ALGORITHM>: <lowercase hex>`; algorithms SHA1, SHA224, SHA256, SHA384, SHA512, SHA3-_, BLAKE2b-_, BLAKE3, MD2, MD4, MD5, MD6, ADLER32                 | 7.10         |
| `PackageHomePage`                            | URL, `NONE` or `NOASSERTION`                                                                                                                            | 7.11         |
| `PackageSourceInfo`                          | text                                                                                                                                                    | 7.12         |
| `PackageLicenseConcluded`                    | license expression, `NONE` or `NOASSERTION`; explain differences from declared in `PackageLicenseComments`                                              | 7.13         |
| `PackageLicenseInfoFromFiles`                | only when files were analyzed                                                                                                                           | 7.14         |
| `PackageLicenseDeclared`                     | license expression, `NONE` or `NOASSERTION`; only what the package authors declared                                                                     | 7.15         |
| `PackageCopyrightText`                       | free text, `NONE` or `NOASSERTION`                                                                                                                      | 7.17         |
| `ExternalRef`                                | `<category> <type> <locator>`; categories `SECURITY`, `PACKAGE-MANAGER`, `PERSISTENT-ID`, `OTHER`; types from Annex F (for example `purl`, `cpe23Type`) | 7.21         |
| `PrimaryPackagePurpose`                      | `APPLICATION`, `FRAMEWORK`, `LIBRARY`, `CONTAINER`, `OPERATING-SYSTEM`, `DEVICE`, `FIRMWARE`, `SOURCE`, `ARCHIVE`, `FILE`, `INSTALL`, `OTHER`           | 7.24         |
| `ReleaseDate`, `BuiltDate`, `ValidUntilDate` | `YYYY-MM-DDThh:mm:ssZ`                                                                                                                                  | 7.25 to 7.27 |

`NONE` versus `NOASSERTION` (§ 7.7, § 7.13, § 7.15, § 7.17): `NONE` is a positive finding that there is none. `NOASSERTION` means the creator tried and could not decide, did not try, or chose not to say; no meaning is implied. An absent concluded or declared license, or copyright text, means `NOASSERTION`.

## File information (Clause 8)

- Required: File name (`FileName`, a path relative to the package root, in general preceded by `./`, for example `./package/foo.c`, § 8.1), File SPDX identifier (§ 8.2), and a SHA1 file checksum (`FileChecksum: SHA1: <hex>`, exactly one SHA1, other algorithms optional, § 8.4).
- Optional: file type (§ 8.3), concluded license (§ 8.5), license information in file (§ 8.6), license comments, copyright text (§ 8.8), comment, notice, contributor, attribution text.
- Artifact-of-project fields (§ 8.9 to § 8.11) and file dependencies (§ 8.16) are deprecated; use relationships.

## Snippet information (Clause 9)

- Required: Snippet SPDX identifier (§ 9.1), the containing file's identifier (`SnippetFromFileSPDXID`, § 9.2), and a byte range (§ 9.3).
- Optional: line range, concluded license, license information in snippet, copyright text, comment, name, attribution text. The name is optional; the 2.3.1 schema no longer requires it.

## Other licensing information detected (Clause 10)

For each license not on the SPDX License List:

- `LicenseID: LicenseRef-<id>`, unique in the document, letters, digits, `.` and `-` (§ 10.1).
- `ExtractedText:` with the full text, required when a License Identifier is assigned (§ 10.2).
- Optional `LicenseName`, `LicenseCrossReference` (URLs), `LicenseComment` (§ 10.3 to § 10.5).

## Relationships (Clause 11)

- Format: `Relationship: [DocumentRef-x:]SPDXRef-A <TYPE> [DocumentRef-y:]SPDXRef-B | NONE | NOASSERTION`, with an optional `RelationshipComment` (§ 11.1, § 11.2).
- `DESCRIBES` from `SPDXRef-DOCUMENT` is mandatory when more than one package or set of files is present; the NTIA mapping requires the document to describe at least one package (§ 11.1 Table 68; Annex L).
- No relationship of a type means nothing is asserted; listing some does not assert they are all. `NONE` asserts no related elements, `NOASSERTION` asserts nothing (§ 11.1).
- Dependency types: `DEPENDS_ON`, `DEPENDENCY_OF`, `BUILD_DEPENDENCY_OF`, `DEV_DEPENDENCY_OF`, `OPTIONAL_DEPENDENCY_OF`, `PROVIDED_DEPENDENCY_OF`, `TEST_DEPENDENCY_OF`, `RUNTIME_DEPENDENCY_OF`, `DEPENDENCY_MANIFEST_OF`. Composition: `CONTAINS`, `CONTAINED_BY`, `PACKAGE_OF`, `OPTIONAL_COMPONENT_OF`, `EXPANDED_FROM_ARCHIVE`. Build and provenance: `GENERATES`, `GENERATED_FROM`, `BUILD_TOOL_OF`, `DEV_TOOL_OF`, `STATIC_LINK`, `DYNAMIC_LINK`, `DISTRIBUTION_ARTIFACT`, `PATCH_FOR`, `PATCH_APPLIED`, `COPY_OF`, `FILE_ADDED`, `FILE_DELETED`, `FILE_MODIFIED`, `ANCESTOR_OF`, `DESCENDANT_OF`, `VARIANT_OF`. Other: `DESCRIBED_BY`, `AMENDS`, `PREREQUISITE_FOR`, `HAS_PREREQUISITE`, `EXAMPLE_OF`, `DATA_FILE_OF`, `TEST_CASE_OF`, `TEST_OF`, `TEST_TOOL_OF`, `DOCUMENTATION_OF`, `METAFILE_OF`, `REQUIREMENT_DESCRIPTION_FOR`, `SPECIFICATION_FOR`, `OTHER` (describe it in the comment).

## Annotations (Clause 12)

Each annotation has an annotator, a date, a type, the annotated element's SPDX identifier and a comment, all mandatory when an annotation exists (§ 12.1 to § 12.5).

## Example (tag:value)

```text
SPDXVersion: SPDX-2.3
DataLicense: CC0-1.0
SPDXID: SPDXRef-DOCUMENT
DocumentName: widget-1.0.0
DocumentNamespace: https://example.com/spdxdocs/widget-1.0.0-0b1c7e0e-4d2a-4a8e-9c1e-3f0e6b9f2a11
LicenseListVersion: 3.29
Creator: Organization: Example Corp (sbom@example.com)
Creator: Tool: example-sbom-generator-2.4.0
Created: 2026-10-05T00:00:00Z
CreatorComment: Build

PackageName: widget
SPDXID: SPDXRef-Package-widget
PackageVersion: 1.0.0
PackageSupplier: Organization: Example Corp
PackageDownloadLocation: https://example.com/downloads/widget-1.0.0.tgz
FilesAnalyzed: false
PackageChecksum: SHA256: f3f60ce8615d1cfb3f6d7d149699ab53170ce0b8f24f841fb616faa50151082d
PackageLicenseConcluded: MIT OR Apache-2.0
PackageLicenseDeclared: MIT OR Apache-2.0
PackageCopyrightText: Copyright 2026 Example Corp
ExternalRef: PACKAGE-MANAGER purl pkg:npm/widget@1.0.0
PrimaryPackagePurpose: LIBRARY

Relationship: SPDXRef-DOCUMENT DESCRIBES SPDXRef-Package-widget
```

## SPDX Lite in 2.3 (Annex G)

An implementation may conform to SPDX Lite only (§ 4.6). Lite uses the mandatory creation fields (6.1 to 6.5, 6.8, 6.9), the package fields 7.1 to 7.5, 7.7, 7.8, 7.11, 7.13, 7.15 to 7.17, 7.20, 7.21, and the other-licensing fields 10.1 to 10.3 and 10.5, with unchanged cardinalities; `FilesAnalyzed` is `false` (Annex G.2, Table G.1).
