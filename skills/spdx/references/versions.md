# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the spec text of each line, the `spdx/spdx-spec` and `spdx/spdx-3-model` changelogs and release notes, and the SPDX "Differences from previous editions" document, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                   | Status    | Revision                                       | Posture | Summary                                                                              |
| ----------------- | ---------------------- | --------- | ---------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `3.1-preview`     | SPDX 3.1               | preview   | 3.1-RC1 (2026-01-24)                           | track   | Adds Hardware, Service, SupplyChain, Operations and FunctionalSafety profiles.       |
| `3.0`             | SPDX 3.0               | current   | 3.0.1 (2024-12-17)                             |         | RDF model with profiles, JSON-LD serialization. The default target.                  |
| `2.3`             | SPDX 2.3               | supported | 2.3 (2022-11-03); 2.3.1 text dated 2026-10-30  |         | Document-centric format: tag:value, JSON, YAML, RDF/XML, spreadsheet.                |
| `2.2`             | SPDX 2.2               | legacy    | 2.2.2 (2022-04-27); 2.2.1 is ISO/IEC 5962:2021 |         | Superseded by 2.3, which adds fields without deprecating any.                        |
| `2.1-and-earlier` | SPDX 2.1 and earlier   | legacy    | 2.1 (2016), 2.0 (2015), 1.0 to 1.2 (2011-2013) |         | Superseded; read and upgrade through 2.3.                                            |
| `license-list-3`  | SPDX License List 3.29 | current   | 3.29.0 (2026-09-16)                            |         | Family `license-list`: the identifiers that license expressions use. Released apart. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The License List is versioned separately from the specification (family `license-list`). Any SPDX line can use any License List version; record the one you used in `licenseListVersion` (3.0, SemVer such as `3.29.0`) or `LicenseListVersion` (2.3, `M.N` such as `3.29`).

## Which version to use

- Default to SPDX 3.0 at 3.0.1: `specVersion` `3.0.1`, `@context` `https://spdx.org/rdf/3.0.1/spdx-context.jsonld`.
- The spdx.dev specifications index still lists "3.0" as the current version; the published 3.0.1 text is the patch of that line.
- Drop to SPDX 2.3 only for a named consumer that cannot read 3.0, for example one that needs tag:value, YAML or spreadsheet, which 3.0 does not support (Differences, Serialization Formats). SPDX 3.0 data can be written in any RDF serialization, with JSON-LD and the SPDX context as the exchange form (3.0.1 Serializations).
- When writing 2.3, follow the 2.3.1 corrections (they add no fields) but keep `SPDXVersion: SPDX-2.3`; the version field holds only major and minor (2.3 § 6.1).
- Treat SPDX 2.2 and SPDX 2.1 and earlier as input to an upgrade.
- Never emit `specVersion` `3.1` or the 3.1 namespace while 3.1 is a release candidate.

## What changed

### SPDX 3.1 (preview, 3.1-RC1)

From the model CHANGELOG (3.1-RC1) and the 3.1-RC1 conformance clause:

- Thirteen compliance points: adds Hardware, Service, SupplyChain, Operations and FunctionalSafety profiles to the nine of 3.0.
- RDF IRIs use two-level versions: `https://spdx.org/rdf/3.1/terms/...` instead of `.../3.0.1/terms/...`.
- Adds `/Core/ElementMap`, `/Core/inLanguage`, `/Core/intendedUse`, `/Core/isoAutomationLevel`, `/SimpleLicensing/customIdToLicense` and `/Software/artifactSize`; `RelationshipType` grows from 59 to 76 entries.
- Deprecates `/AI/autonomyType`, `/Dataset/datasetSize`, `/Dataset/intendedUse` and `/SimpleLicensing/customIdToUri`.
- Calls the format "SPDX 3 JSON", a strict subset of JSON-LD.

### SPDX 3.0 (3.0.1)

From the "Differences from previous editions" A.1 and the 3.0.1 changelogs:

- SPDX now means "System Package Data Exchange".
- Everything is an Element with its own `spdxId` URI and `creationInfo`; elements can exist outside any SpdxDocument, and identifiers need not share the document's namespace.
- Relationships and Annotations are standalone Elements (`from`, `to`, `relationshipType`; `subject`, `statement`) instead of properties on an element.
- Creators, suppliers and originators are Agents (`createdBy`, `createdUsing`, `suppliedBy`, `originatedBy`) instead of parsed strings.
- `completeness` (`complete`, `incomplete`, `noAssertion`) complements `NoneElement` and `NoAssertionElement`.
- License expressions gain `AdditionRef-`, lowercase `and`, `or` and `with`, and the SimpleLicensing and ExpandedLicensing profiles.
- `specVersion` and `licenseListVersion` are SemVer with a patch number.
- Removed: `filesAnalyzed` and `licenseInfoInFile` (Package), the LicenseException `example`, and the tag:value, YAML and spreadsheet formats; JSON-LD with the SPDX context replaces the 2.x JSON format.
- 3.0.1 over 3.0: removes `Software/contentType` in favour of `Core/contentType`; renames `imports` to `import`, `hasInputs` and `hasOutputs` to `hasInput` and `hasOutput`, and `hasPrerequsite` to `hasPrerequisite`; adds `adler32` back to `HashAlgorithm`; adds the `IndividualElement` class and the `SpdxOrganization` individual; moves "getting started", "differences" and `SPDX-License-Identifier` guidance out of the spec into `spdx/using`.

### SPDX 2.3

From 2.3 Annex I.1 and the 2.3.1 changelog:

- Adds Primary Package Purpose, Release Date, Built Date and Valid Until Date to packages (§ 7.24 to § 7.27).
- Adds hash algorithms SHA3-256, SHA3-384, SHA3-512, BLAKE2b-256, BLAKE2b-384, BLAKE2b-512, BLAKE3 and ADLER32 (§ 7.10, § 8.4).
- Makes several licensing fields optional instead of requiring `NOASSERTION` (Clauses 7, 8, 9).
- Adds `REQUIREMENT_DESCRIPTION_FOR` and `SPECIFICATION_FOR` relationships (§ 11.1).
- Extends Annex F with advisory, fix, url and swid security references and the gitoid persistent identifier.
- Adds the NTIA minimum-elements mapping (Annex K in 2.3, Annex L in 2.3.1).
- 2.3.1 (maintenance, no new fields): optional fields that are omitted mean `NOASSERTION` (§ 4.3); Package verification code is no longer required (§ 7.9); external document references are `0..*` and primary package purpose is `0..1`; the JSON schema fixes `OPERATING-SYSTEM`, requires `documentNamespace`, adds identifier, checksum and date patterns, and marks `revieweds`, `documentDescribes`, `hasFiles` and `fileDependencies` deprecated; Annex L adds the CISA 2026 minimum elements.

### SPDX 2.2

- 2.2 (2020): more relationship types, PURL and container image references, SPDX Lite, File Tags, attribution text, `LicenseRef-` in short identifiers, `NONE` and `NOASSERTION` as relationship targets, YAML, JSON and spreadsheet formats, no multi-line license expressions (spec CHANGELOG 2.2).
- 2.2.1 (2021): the 2.2 text reformatted for ISO, published as ISO/IEC 5962:2021; no technical changes (2.3 Annex I.3).
- 2.2.2 (2022): editorial fixes, JSON schema fixes, no new fields (2.3 Annex I.2).

### SPDX 2.1 and earlier

- 2.1 (2016): snippets, external package references, the short-identifiers-in-source-files appendix.
- 2.0 (2015): relationships, multiple packages per document, annotations, the license expression syntax.
- 1.0 to 1.2 (2011-2013): single-package documents; 1.2 added the license list version field and flexible local license names.

## Upgrading

### 2.3 to 3.0

From "Differences from previous editions" A.1. Translate field by field:

1. **Change the version marker.** Add `"@context": "https://spdx.org/rdf/3.0.1/spdx-context.jsonld"`, one CreationInfo with `specVersion` `3.0.1`, and an SpdxDocument element. Append a patch `.0` to any carried `licenseListVersion` (`3.29` becomes `3.29.0`).
2. **Creators.** Parse each `Creator:` string: `Person:` and `Organization:` become Person and Organization Agents in `createdBy`; `Tool:` becomes a Tool in `createdUsing`. If only a Tool is given, create a SoftwareAgent with the tool's details for `createdBy`. An email becomes an `externalIdentifier` of type `email`.
3. **Supplier and originator.** `PackageSupplier` becomes `suppliedBy` (Agent); extra suppliers use `availableFrom` relationships. `PackageOriginator` and `FileContributor` become `originatedBy`.
4. **Identifiers.** Give every element a unique URI `spdxId` (for example the 2.3 document namespace plus `#` plus the `SPDXRef-` id).
5. **External document references.** Each `ExternalDocumentRef` becomes a `namespaceMap` entry (prefix `DocumentRef-x`, namespace the referenced document namespace plus `#`) and `import` (ExternalMap) entries: one for `DocumentRef-x:SPDXRef-DOCUMENT` with a Hash in `verifiedUsing`, and one per referenced element with `definingArtifact` pointing to that document entry.
6. **Package fields.** `PackageName` and `FileName` become `name`; `PackageVersion` becomes `software_packageVersion`; `PackageHomePage` becomes `software_homePage`; `ReleaseDate`, `BuiltDate` and `ValidUntilDate` become `releaseTime`, `builtTime` and `validUntilTime`; `PrimaryPackagePurpose` becomes `software_primaryPurpose`; checksums become `verifiedUsing` Hash entries with lowercase algorithm names such as `sha256`.
7. **Package file name.** Create a File with that name and the package checksum, and a `hasDistributionArtifact` relationship from the Package to it.
8. **External references.** `cpe22Type`, `cpe23Type`, `swid` and `purl` become `externalIdentifier`; `gitoid` and `swh` become content identifiers; `url` becomes `securityOther`; the rest stay `externalRef`. A single `purl` reference without a comment goes into `software_packageUrl`.
9. **File type.** Replace `FileType` with `contentType` (an IANA media type) and `software_primaryPurpose`.
10. **Relationships.** Make each relationship a Relationship element with `from` set to the element that held it and `to` to the related element. Rename the type and swap `from` and `to` where the table says so. `NONE` becomes `NoneElement` with `completeness: complete`; `NOASSERTION` becomes `NoAssertionElement` with `completeness: noAssertion`.
11. **Annotations.** Each annotation becomes an Annotation element with `subject` set to the annotated element, its annotator and date in its own CreationInfo, and the comment in `statement`.
12. **Snippets.** Offset ranges become `byteRange`, line ranges `lineRange`; add a `contains` relationship from the file to the snippet.
13. **Licensing.** Concluded and declared licenses become `hasConcludedLicense` and `hasDeclaredLicense` relationships to a `simplelicensing_LicenseExpression`. Extracted licensing info becomes `SimpleLicensingText` (or `CustomLicense` with ExpandedLicensing); `LicenseName`, `LicenseComment` and `LicenseID` become `name`, `comment` and `spdxId`. Record the dropped package `licenseInfoInFile` values as an Annotation `SPDX 2.X LicenseInfoInFile: <expr>, <expr>`. `FilesAnalyzed` has no 3.0 equivalent.
14. **Validate** against the 3.0.1 JSON Schema and SHACL, and check that every package, license and relationship of the input is still present.

Relationship type mapping (swap means `from` and `to` change places):

| 2.3 type                                                                           | 3.0 type                                                                         | Swap      | Lifecycle scope                   |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------- | --------------------------------- |
| `DESCRIBES` / `DESCRIBED_BY`                                                       | `describes`                                                                      | - / Y     |                                   |
| `CONTAINS` / `CONTAINED_BY`                                                        | `contains`                                                                       | - / Y     |                                   |
| `DEPENDS_ON` / `DEPENDENCY_OF`                                                     | `dependsOn`                                                                      | - / Y     | as known                          |
| `BUILD_`, `DEV_`, `TEST_`, `RUNTIME_DEPENDENCY_OF`                                 | `dependsOn`                                                                      | Y         | build, development, test, runtime |
| `OPTIONAL_DEPENDENCY_OF` / `PROVIDED_DEPENDENCY_OF`                                | `hasOptionalDependency` / `hasProvidedDependency`                                | Y         | as known                          |
| `BUILD_TOOL_OF` / `DEV_TOOL_OF` / `TEST_TOOL_OF`                                   | `usesTool`                                                                       | Y         | build / development / test        |
| `GENERATES` / `GENERATED_FROM`                                                     | `generates`                                                                      | - / Y     |                                   |
| `ANCESTOR_OF` / `DESCENDANT_OF` / `VARIANT_OF`                                     | `ancestorOf` / `descendantOf` / `hasVariant`                                     | - / - / Y |                                   |
| `DYNAMIC_LINK` / `STATIC_LINK`                                                     | `hasDynamicLink` / `hasStaticLink`                                               | Y / -     | build, runtime / as known         |
| `PATCH_FOR`, `PATCH_APPLIED`                                                       | `patchedBy`                                                                      | Y         |                                   |
| `COPY_OF` / `FILE_MODIFIED`                                                        | `copiedTo` / `modifiedBy`                                                        | Y / -     |                                   |
| `FILE_ADDED` / `FILE_DELETED`                                                      | `hasAddedFile` / `hasDeletedFile`                                                | Y         |                                   |
| `EXPANDED_FROM_ARCHIVE`                                                            | `expandsTo`                                                                      | Y         |                                   |
| `DISTRIBUTION_ARTIFACT`                                                            | `hasDistributionArtifact`                                                        | -         |                                   |
| `DATA_FILE_OF` / `DEPENDENCY_MANIFEST_OF` / `DOCUMENTATION_OF` / `METAFILE_OF`     | `hasDataFile` / `hasDependencyManifest` / `hasDocumentation` / `hasMetadata`     | Y         |                                   |
| `EXAMPLE_OF` / `TEST_CASE_OF` / `TEST_OF` / `OPTIONAL_COMPONENT_OF` / `PACKAGE_OF` | `hasExample` / `hasTestCase` / `hasTest` / `hasOptionalComponent` / `packagedBy` | Y         |                                   |
| `PREREQUISITE_FOR` / `HAS_PREREQUISITE`                                            | `hasPrerequisite`                                                                | Y / -     | as known                          |
| `REQUIREMENT_DESCRIPTION_FOR` / `SPECIFICATION_FOR`                                | `hasRequirement` / `hasSpecification`                                            | Y         | as known                          |
| `AMENDS`                                                                           | `amendedBy`                                                                      | Y         |                                   |
| `OTHER`                                                                            | `other`                                                                          | -         |                                   |

Keep behaviour unchanged: a dependency that was a runtime dependency in 2.3 stays a runtime-scoped `dependsOn`, and an unknown stays `NoAssertionElement`, never `NoneElement`.

### 2.2 to 2.3

1. Change `SPDXVersion: SPDX-2.2` to `SPDX-2.3`.
2. No field was removed or deprecated (2.3 § 4.2). Optionally add the new package fields, hash algorithms and relationship types listed above.
3. Licensing fields that held `NOASSERTION` only because they were required may be omitted; omission means `NOASSERTION`.
4. Validate the JSON form against the 2.3 schema.

### 2.1 and earlier to 2.3

1. From 1.x: wrap the single package in a 2.x document, give each element an `SPDXRef-` identifier, add `DESCRIBES` from `SPDXRef-DOCUMENT`, and rewrite license fields as license expressions.
2. Replace deprecated License List identifiers (for example `GPL-2.0` with `GPL-2.0-only`, `GPL-2.0+` with `GPL-2.0-or-later`; License List deprecated identifiers).
3. Then apply 2.2 to 2.3, and 2.3 to 3.0 if the target is 3.0.

### License List updates

SPDX endeavors never to change License List identifiers; a replaced identifier is deprecated, stays valid, and should no longer be used (License List, Deprecated License Identifiers). When you raise the recorded list version, re-check every identifier against the deprecated table on spdx.org/licenses.

## Preview: SPDX 3.1

`3.1-preview` is SPDX 3.1-RC1, published 2026-01-24 at `https://spdx.github.io/spdx-spec/v3.1-RC1/` with model release `3.1-rc1`. Posture: **track**. The model changelog says the RC "may contain changes that could be modified or reverted before the final release". Do not emit `specVersion` 3.1, the `https://spdx.org/rdf/3.1/` IRIs, or the new profiles. Do avoid the four properties deprecated in 3.1 when a 3.0.1 alternative exists, so the later upgrade is small. Watch the `spdx/spdx-spec` and `spdx/spdx-3-model` releases for 3.1 final. When it ships: make 3.1 current, move 3.0 to supported, and add a 3.0 to 3.1 upgrade section covering the IRI change and the deprecations.
