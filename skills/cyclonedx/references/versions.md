# Versions and upgrades

Read this when choosing a target version, reading a BOM written for an older line, upgrading, or deciding whether to use the 2.0 draft. Sources: the GitHub release notes of each version, the schema files at each tag, the README release history, and the ECMA-424 page and editions, listed in [Sources](../SKILL.md#sources). "Schema diff" means a comparison of the `bom-1.x.schema.json` files at tag 1.7.2.

## Version lines

| Id            | Line                | Status    | Revision                                                  | Posture | Summary                                                                                                             |
| ------------- | ------------------- | --------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `2.0-preview` | CycloneDX 2.0 draft | preview   | `2.0-dev` branch at 7a3ab08 (2026-10-05)                  | track   | Modular JSON Schema 2020-12 rewrite; new root names; release date "to be announced".                                |
| `1.7`         | CycloneDX 1.7       | current   | 1.7.2 (2026-09-17); 1.7 released 2025-10-21               |         | ECMA-424 2nd edition. Citations, patents, TLP, external components, CBOM rework.                                    |
| `1.6`         | CycloneDX 1.6       | supported | 1.6.2 (2026-06-02); 1.6 released 2024-04-09               |         | ECMA-424 1st edition. CBOM, attestations (CDXA), definitions, OmniBOR and SWHID, `provides`.                        |
| `1.5`         | CycloneDX 1.5       | legacy    | 1.5.1 (2026-06-02); 1.5 released 2023-06-26               |         | ML-BOM, formulation, lifecycles, annotations, BOM-Link types, tools as components and services.                     |
| `1.4`         | CycloneDX 1.4       | legacy    | 1.4 (2022-01-12)                                          |         | Vulnerabilities and VEX in the core, release notes, JSF signatures, `$schema`.                                      |
| `1.0-1.3`     | CycloneDX 1.0-1.3   | legacy    | 1.3 (2021-05-04), 1.2 (2020-05-26), 1.1, 1.0 (2018-03-26) |         | 1.0 and 1.1 are XML only; 1.2 adds JSON, services and dependencies; 1.3 adds compositions, properties and Protobuf. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Patch releases (1.7.1, 1.7.2, 1.6.1, 1.6.2, 1.5.1) keep `specVersion` at the minor (`1.7`, `1.6`, `1.5`) and fix schema alignment between JSON, XML and Protobuf; always validate against the latest patch of a line. The 1.6.2 and 1.5.1 releases are backports of the 1.7.1 fixes (release notes).

ECMA-424 editions: the 1st edition (June 2024) states "This standard defines the CycloneDX v1.6 Bill of materials specification" (1st edition, § 1). The 2nd edition (December 2025) "defines the CycloneDX v1.7 Bill of Materials (BOM) specification" (2nd edition, § 1). The ECMA-424 page lists the 2nd edition as current and the 1st edition under Archives.

## Which version to use

- Author CycloneDX 1.7 and validate against schema 1.7.2. It is the version the overview page lists as current and the one ECMA-424 2nd edition defines.
- Author CycloneDX 1.6 only for a named consumer that rejects 1.7. Leave out what 1.6 cannot express (see "1.6 to 1.7" below, read backwards).
- Treat CycloneDX 1.5, CycloneDX 1.4 and CycloneDX 1.0-1.3 BOMs as input to an upgrade. They are released and still parse, but new work targets 1.7.
- Follow the CycloneDX 2.0 draft only to see what is coming. Its posture is **track**: emit nothing from it.

## What changed

### CycloneDX 1.7

From the 1.7 release notes and the 1.6-to-1.7 schema diff:

- Added top-level `citations`: who or which process supplied a field, located by JSON Pointer or path expression (release notes, "Support for citations"; schema `citation`).
- Added patents: `definitions.patents` and `patentAssertions` on components and services, plus `patent`, `patent-family`, `patent-assertion` and `citation` external reference types (release notes; schema diff).
- Added `metadata.distributionConstraints.tlp` with the TLP values `CLEAR` (default), `GREEN`, `AMBER`, `AMBER_AND_STRICT` and `RED` (schema `tlpClassification`).
- Added external components: `component.isExternal` and `component.versionRange` (vers syntax), mutually exclusive with `version` (release notes; schema `component`).
- `licenses` may mix several SPDX expressions with named or SPDX licenses, and expressions gain `expressionDetails`, `licensing` and `properties` (release notes; schema `licenseChoice`).
- Added `properties` on external references, and the Streebog-256 and Streebog-512 hash algorithms (release notes; schema `hash-alg`).
- Formulation may describe any referencable object, not only components and services (release notes, Changed).
- CBOM: added `relatedCryptographicAssets`, `ellipticCurve`, `certificateFileExtension` and IKEv2 types. Deprecated `algorithmProperties.curve`, `certificateProperties.signatureAlgorithmRef`, `subjectPublicKeyRef`, `certificateExtension`, `relatedCryptoMaterialProperties.algorithmRef`, `protocolProperties.cryptoRefArray` and the `cryptoRefArray` definition (release notes, Deprecated; schema descriptions).
- The `platform` component type explicitly includes just-in-time compilers and interpreters (release notes, Documentation).
- 1.7.1 and 1.7.2 align the XML and Protobuf schemas with JSON for `modelCard` and CBOM protocol relationships (release notes).

### CycloneDX 1.6

From the 1.6 release notes and the 1.5-to-1.6 schema diff:

- Added CBOM: component type `cryptographic-asset` and `cryptoProperties`; `dependencies[].provides` for components that implement a standard or algorithm (release notes; schema `dependency`).
- Added attestations (CDXA): top-level `declarations` and `definitions.standards` (release notes; schema diff).
- Added `component.omniborId`, `component.swhid`, `component.authors`, `component.manufacturer`, `metadata.manufacturer`, `tags`, license `acknowledgement`, `postalAddress`, ML environmental considerations, and `source-distribution`, `rfc-9116`, `electronic-signature` and `digital-signature` external reference types (release notes; schema diff).
- `evidence.identity` became an array; the single object is deprecated (schema `componentEvidence`).
- Deprecated `component.author` (use `authors` or `manufacturer`) and `metadata.manufacture` (use `metadata.component.manufacturer`) (release notes, Deprecated).
- `$schema` accepts any string; in 1.4 and 1.5 it was an enum of the schema URL (release notes, Changed; schema diff).

### CycloneDX 1.5

From the 1.5 release notes and the 1.4-to-1.5 schema diff:

- Added ML-BOM (`machine-learning-model`, `data`, `modelCard`, `componentData`), formulation (MBOM), `metadata.lifecycles`, top-level `annotations` and `properties`, and component types `platform` and `device-driver` (release notes; schema diff).
- Added `bomLink`, `bomLinkDocumentType`, `bomLinkElementType` and `refLinkType`, so references can cross BOMs (schema diff).
- `metadata.tools` and `vulnerabilities[].tools` became an object with `components` and `services`; the array of `tool` objects is deprecated (release notes; schema `tool`).
- Vulnerabilities gained `workaround`, `proofOfConcept`, `rejected`, `analysis.firstIssued` and `analysis.lastUpdated`, CVSSv4 and SSVC rating methods (release notes).
- Many new external reference types such as `attestation`, `exploitability-statement`, `vulnerability-assertion`, `threat-model` and `security-contact` (schema diff).
- 1.5.1 made the root `version` optional in JSON because it has a default (1.5.1 release notes).

### CycloneDX 1.4

- Added `vulnerabilities` (with `analysis` for VEX), `releaseNotes`, the JSF `signature`, and the optional `$schema` root property (1.4 release notes; schema diff).
- Component `version` became optional (1.4 release notes) and `modified` was deprecated in favour of `pedigree` (schema).
- Root `version` is required in JSON (1.4 schema `required`).

### CycloneDX 1.0-1.3

- 1.0 and 1.1 exist only as XSD files; JSON starts at 1.2 (schema directory; 1.2 release notes).
- 1.2 added `firmware` and `container` component types, SWID tags, `services`, `dependencies` and `metadata` (1.2 release notes).
- 1.3 added `compositions`, `properties`, license and copyright evidence, BOM-level licenses, hashes on external references, and the Protobuf format (1.3 release notes).

## Upgrading

### 1.6 to 1.7

1. Change the version marker: `specVersion` to `"1.7"`, `$schema` (if set) to `http://cyclonedx.org/schema/bom-1.7.schema.json`, the XML namespace to `http://cyclonedx.org/schema/bom/1.7`, or the Protobuf package to `cyclonedx.v1_7`.
2. Replace deprecated CBOM fields: move `curve` to `ellipticCurve`, `certificateExtension` to `certificateFileExtension`, and `signatureAlgorithmRef`, `subjectPublicKeyRef`, `algorithmRef` and `cryptoRefArray` to `relatedCryptographicAssets` (1.7 schema descriptions).
3. Optionally adopt the new fields: `citations`, `distributionConstraints.tlp`, `isExternal` with `versionRange` for runtime-provided components, multiple license expressions, patents.
4. Validate against schema 1.7.2. Nothing else breaks: every other 1.6 structure is still valid in 1.7 (schema diff shows no removed definitions or root properties).
5. Keep behaviour unchanged: the same components, graph and analysis states; a new `version` for the same `serialNumber` only if the content changed.

### 1.5 to 1.6

1. Change the version marker to `1.6` (and the XML namespace `http://cyclonedx.org/schema/bom/1.6`).
2. Replace deprecated fields: `component.author` with `authors` or `manufacturer`; `metadata.manufacture` with `metadata.component.manufacturer`; a single-object `evidence.identity` with an array (1.6 release notes; schema).
3. Validate against schema 1.6.2.
4. Keep behaviour unchanged: each identity object keeps its `field`, `confidence`, `methods` and `tools`; 1.6 only adds the optional `concludedValue`.

### 1.4 to 1.5

1. Change the version marker to `1.5`; if `$schema` is set it must equal `http://cyclonedx.org/schema/bom-1.5.schema.json` (1.5 schema).
2. Convert `metadata.tools` and `vulnerabilities[].tools` from an array of `{vendor, name, version}` to `{"components": [...], "services": [...]}`, with each tool as a full component or service (1.5 schema: the `tool` definition is deprecated).
3. Add `metadata.lifecycles` if the phase is known.
4. Validate against schema 1.5.1.

### 1.0-1.3 to 1.4

1. A 1.0 or 1.1 BOM is XML; convert it to the 1.2+ structure (JSON or XML) before upgrading further.
2. Change the version marker to `1.4` and keep the root `version`, which the 1.4 JSON schema requires.
3. Move vulnerability data written with the vulnerability extension (`schema/ext/vulnerability-1.0.xsd` or `vulnerability-1.0-SNAPSHOT.schema.json`) into core `vulnerabilities`; replace `modified: true` with `pedigree`.
4. Validate against the 1.4 schema, then continue with the steps above.

### Any legacy line to 1.7

Apply the checklists above in order. The steps that change the most are tools as components (1.5), deprecated authorship fields (1.6) and deprecated CBOM fields (1.7). Validate the result against schema 1.7.2 and the Verify list in `SKILL.md`. To downgrade from 1.7 to 1.6 for a consumer, drop `citations`, patents, `distributionConstraints`, `isExternal` and `versionRange`, and reduce `licenses` to either a list of licenses or exactly one expression.

## Preview: CycloneDX 2.0 draft

The `2.0-dev` branch of `CycloneDX/specification` holds `schema/2.0/cyclonedx-2.0.schema.json`, a modular JSON Schema 2020-12 document with 30+ module schemas and a separate API schema. Its README lists CycloneDX 2.0 with release date "to be announced". As of 7a3ab08 (2026-10-05) the root differs from 1.7: `specFormat` replaces `bomFormat`, `signatures` replaces `signature`, `services` is no longer a root property, and `threats`, `risks`, `controls`, `blueprints`, `profiles` and `perspectives` are new. The branch changes daily and many `2.0-dev_*` feature branches are open.

Posture: **track**. Do not emit `specVersion` `2.0`, `specFormat`, or any 2.0 module shape, and do not reserve names from it. Watch the releases list and the ECMA-424 page. When 2.0 ships: make it current, make 1.7 supported, consider moving 1.6 to legacy, and add a "1.7 to 2.0" upgrade section.
