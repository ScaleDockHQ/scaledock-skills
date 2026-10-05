# SPDX 3.0 model and JSON-LD

Read this when producing or consuming an SPDX 3.0.1 document. Sources: the SPDX 3.0.1 specification (Conformance, Serializations, Annex SPDX Lite), the `spdx-3-model` 3.0.1 class pages, the 3.0.1 JSON-LD context, and the informative "Getting started writing SPDX 3", listed in [Sources](../SKILL.md#sources). Model citations name the class page, for example `Core/Classes/Element`.

## Profiles

A profile is a compliance point: a namespace that adds classes and properties to Core and may restrict existing ones (Conformance, Introduction to Profiles; `Core/Vocabularies/ProfileIdentifierType`).

| Profile (`profileConformance` value) | What it covers                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core (`core`)                        | Mandatory. Element, Agent, CreationInfo, Relationship, Annotation, SpdxDocument, Bom, Hash, ExternalMap, NamespaceMap.                                                                                              |
| Software (`software`)                | Package, File, Snippet, Sbom, purposes, `packageUrl`, `downloadLocation`, `copyrightText`.                                                                                                                          |
| Security (`security`)                | Vulnerabilities, severity, and how a vulnerability affects an element, including whether a fix exists (VEX).                                                                                                        |
| Licensing                            | Split into SimpleLicensing (`simpleLicensing`: license expression strings and license text) and ExpandedLicensing (`expandedLicensing`: the parsed expression as license objects). Both carry the same information. |
| Dataset (`dataset`)                  | Datasets used by AI systems and other applications.                                                                                                                                                                 |
| AI (`ai`)                            | AI and ML models and systems and their components.                                                                                                                                                                  |
| Build (`build`)                      | Build inputs, outputs, steps, environment and actors.                                                                                                                                                               |
| Lite (`lite`)                        | The minimum set for license compliance in the supply chain.                                                                                                                                                         |
| Extension (`extension`)              | The abstract Extension class for non-standard, tailored content between cooperating parties.                                                                                                                        |

- Core conformance is mandatory for every other profile; the other profiles are independent of each other (Conformance).
- Listing a profile in `profileConformance` claims that every contained element meets that profile's restrictions (`ProfileIdentifierType`). An ElementCollection always conforms to Core, which is the default when `profileConformance` is absent (`Core/Classes/ElementCollection`).

## Core classes

### Element (abstract)

Every SPDX class that represents a thing derives from Element (`Core/Classes/Element`):

| Property                                    | Cardinality | Notes                                                             |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `spdxId`                                    | 1..1        | `xsd:anyURI`; unique; can be referenced from other documents.     |
| `creationInfo`                              | 1..1        | A CreationInfo.                                                   |
| `name`, `summary`, `description`, `comment` | 0..1 each   | Strings.                                                          |
| `verifiedUsing`                             | 0..*        | IntegrityMethod, usually a Hash (`algorithm`, `hashValue`).       |
| `externalRef`                               | 0..*        | References to related information.                                |
| `externalIdentifier`                        | 0..*        | Identifiers for the same thing elsewhere (CPE, SWID, email, ...). |
| `extension`                                 | 0..*        | Extension profile objects.                                        |

### CreationInfo

Who created the element data, when and how (`Core/Classes/CreationInfo`):

- `specVersion` 1..1, SemVer (`3.0.1`); `created` 1..1, DateTime; `createdBy` 1.._, Agent; `createdUsing` 0.._, Tool; `comment` 0..1.
- `created` is often the date of last change, such as a commit date, rather than the generation time, to support reproducible builds.
- CreationInfo is not an Element and has no `spdxId`. Give it a blank node `@id` such as `_:creationinfo` and reference it from every element; it may only have a blank node identifier (Getting started).

### Agent, Person, Organization, SoftwareAgent, Tool

An Agent is anything that can act on a system; Person, Organization and SoftwareAgent are its subclasses. A Tool is not an Agent (`Core/Classes/Agent`). Agents are referenced from `createdBy`, `suppliedBy` and `originatedBy`.

### SpdxDocument

- A collection of elements that could be serialized as a unit, independent of the format (`Core/Classes/SpdxDocument`). The serialized bytes are an Artifact linked by `serializedInArtifact` (Serializations).
- A serialization must not contain more than one SpdxDocument (Serializations; `SpdxDocument`).
- Properties: inherited `element`, `rootElement` and `profileConformance`; `import` (ExternalMap) for elements defined elsewhere; `namespaceMap` (prefix to namespace); `dataLicense` 0..1.
- Constraints from ElementCollection: with at least one `element`, at least one `rootElement`; neither may be an SpdxDocument.
- In JSON-LD, every element in `@graph` is implicitly part of `element` (Getting started). The Lite profile still requires `element` to include at least one Sbom.

### Relationship

- `from` 1..1, `to` 1..*, `relationshipType` 1..1, optional `completeness`, `startTime`, `endTime` (`Core/Classes/Relationship`).
- Read the type as "`from` (is) (a) TYPE `to`" (`RelationshipType`).
- `to` = `NoneElement` alone asserts there are none; `NoneElement` with other elements is invalid. `to` = `NoAssertionElement` makes no assertion either way.
- `completeness`: `complete`, `incomplete` or `noAssertion` (`RelationshipCompleteness`).
- LifecycleScopedRelationship is a Relationship with a `scope` (0..1): `design`, `development`, `build`, `test`, `runtime` or `other` (`LifecycleScopedRelationship`, `LifecycleScopeType`). Use it for scoped types such as `dependsOn`.

Common types (`Core/Vocabularies/RelationshipType`): `contains`, `dependsOn`, `hasOptionalDependency`, `hasProvidedDependency`, `hasPrerequisite`, `hasStaticLink`, `hasDynamicLink`, `describes`, `generates`, `hasDistributionArtifact`, `hasDeclaredLicense`, `hasConcludedLicense`, `availableFrom`, `ancestorOf`, `descendantOf`, `hasVariant`, `patchedBy`, `usesTool`, `hasInput`, `hasOutput`, `trainedOn`, `testedOn`, `affects`, `fixedIn`, `serializedInArtifact`, `other`. `affects`, `doesNotAffect`, `fixedIn` and `underInvestigationFor` are reserved for the matching Security VEX relationship classes.

## Software classes

| Class              | Required beyond Element  | Main optional properties                                                                                                                                                                    |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `software_Package` | `name`                   | `packageVersion`, `downloadLocation`, `homePage`, `packageUrl`, `sourceInfo`, `copyrightText`, `primaryPurpose`, `suppliedBy`, `originatedBy`, `releaseTime`, `builtTime`, `validUntilTime` |
| `software_File`    | `name`                   | `contentType` (IANA media type), `fileKind` (`file` or `directory`), `primaryPurpose`                                                                                                       |
| `software_Snippet` | `snippetFromFile` (1..1) | `byteRange`, `lineRange` (PositiveIntegerRange)                                                                                                                                             |
| `software_Sbom`    | (Bom)                    | `sbomType`: `design`, `source`, `build`, `deployed`, `runtime`, `analyzed`                                                                                                                  |

- A Package is any unit of content associated with a software distribution: an archive, a directory, a library or module, a container image or layer, a repository snapshot (`Software/Classes/Package`).
- An Sbom is a collection of elements describing a single package (`Software/Classes/Sbom`). `sbomType` values follow the CISA "Types of SBOM Documents" definitions (`SbomType`).
- In JSON-LD, profile-specific names are prefixed: `software_Package`, `software_packageVersion`, `software_packageUrl`, `software_downloadLocation`, `software_copyrightText`, `software_sbomType` (JSON-LD context).

## Licensing in 3.0

- Licenses attach through relationships, not properties: `hasDeclaredLicense` (what the artifact was found to contain) and `hasConcludedLicense` (what the SPDX creator concluded governs it) from a software artifact to an AnyLicenseInfo (`RelationshipType`).
- SimpleLicensing: `simplelicensing_LicenseExpression` holds `simplelicensing_licenseExpression` (1..1, must match the license expression grammar), optional `simplelicensing_licenseListVersion` and `simplelicensing_customIdToUri`; `simplelicensing_SimpleLicensingText` holds `simplelicensing_licenseText` for text not on the License List (`SimpleLicensing/Classes/LicenseExpression`, `SimpleLicensing`).
- ExpandedLicensing represents the parsed expression as license objects; use it when consumers need structured licenses.
- No license: `expandedlicensing_NoneLicense`. Not determined: `expandedlicensing_NoAssertionLicense` (ExpandedLicensing individuals).
- `dataLicense` on SpdxDocument gives the license of the SPDX data itself; the SPDX metadata is placed under CC0 1.0 (`Core/Properties/dataLicense`).

## SPDX Lite requirements (3.0.1 Annex SPDX Lite)

Use these when claiming `lite`, and as a sensible floor otherwise:

- SpdxDocument: `creationInfo`, `spdxId`, `element` with at least one Sbom, `rootElement` (should be Sbom).
- Sbom: `creationInfo`, `spdxId`, `element` with at least one Package, `rootElement` (should be Package); recommended `sbomType`.
- Package: `name`, `packageVersion`, `copyrightText`, `suppliedBy` (Agent), `creationInfo`, `spdxId`, and a `downloadLocation` or `packageUrl`; exactly one `hasConcludedLicense` and exactly one `hasDeclaredLicense` relationship from it. Recommended: `verifiedUsing` Hash, `packageUrl`, `homePage`, `releaseTime`, `builtTime`, `originatedBy`, `supportLevel`, `validUntilTime`, `attributionText`.
- CreationInfo: `created`, `createdBy`, and `specVersion` `3.0.*`.
- Agent: `name`, `spdxId`, `creationInfo`.
- LicenseExpression: `licenseExpression`; recommended `licenseListVersion`.

## Serialization

- The model is RDF; any RDF serialization works (JSON-LD, Turtle, N-Triples, RDF/XML). JSON-LD with the SPDX context is the exchange form (Serializations, RDF serialization).
- Top-level `"@context": "https://spdx.org/rdf/3.0.1/spdx-context.jsonld"` is required in JSON-LD. The context aliases `spdxId` to `@id` and `type` to `@type` (Serializations, JSON-LD context file).
- Conformant JSON-LD passes structural validation against `https://spdx.org/schema/3.0.1/spdx-json-schema.json` and semantic validation against the OWL ontology `https://spdx.org/rdf/3.0.1/spdx-model.ttl` with its SHACL shapes (Serializations, JSON-LD validation).
- Canonical serialization: JSON with no line breaks or whitespace outside strings, names sorted, integers without leading zeros, UTF-8 strings (Serializations, Canonical serialization). Use it when hashing a document.
- Native features may replace model properties, for example `@context` prefixes instead of `namespaceMap`; everything else goes in the SpdxDocument element (Serializations, Serialization information).
- `spdxId` values are URIs used as identifiers, not necessarily resolvable; use a namespace you control plus a unique suffix (Getting started).

## Example

A minimal SBOM for one package with licenses, following the shapes in "Getting started" and the context names:

```json
{
  "@context": "https://spdx.org/rdf/3.0.1/spdx-context.jsonld",
  "@graph": [
    {
      "type": "CreationInfo",
      "@id": "_:creationinfo",
      "specVersion": "3.0.1",
      "createdBy": ["https://example.com/spdx/Organization/example-corp"],
      "created": "2026-10-05T00:00:00Z"
    },
    {
      "type": "Organization",
      "spdxId": "https://example.com/spdx/Organization/example-corp",
      "creationInfo": "_:creationinfo",
      "name": "Example Corp"
    },
    {
      "type": "SpdxDocument",
      "spdxId": "https://example.com/spdx/widget-1.0/Document",
      "creationInfo": "_:creationinfo",
      "profileConformance": ["core", "software", "simpleLicensing"],
      "rootElement": ["https://example.com/spdx/widget-1.0/Sbom"]
    },
    {
      "type": "software_Sbom",
      "spdxId": "https://example.com/spdx/widget-1.0/Sbom",
      "creationInfo": "_:creationinfo",
      "rootElement": ["https://example.com/spdx/widget-1.0/Package"],
      "element": ["https://example.com/spdx/widget-1.0/Package"],
      "software_sbomType": ["build"]
    },
    {
      "type": "software_Package",
      "spdxId": "https://example.com/spdx/widget-1.0/Package",
      "creationInfo": "_:creationinfo",
      "name": "widget",
      "software_packageVersion": "1.0.0",
      "software_packageUrl": "pkg:npm/widget@1.0.0",
      "software_copyrightText": "Copyright 2026 Example Corp",
      "suppliedBy": "https://example.com/spdx/Organization/example-corp",
      "verifiedUsing": [
        {
          "type": "Hash",
          "algorithm": "sha256",
          "hashValue": "f3f60ce8615d1cfb3f6d7d149699ab53170ce0b8f24f841fb616faa50151082d"
        }
      ]
    },
    {
      "type": "simplelicensing_LicenseExpression",
      "spdxId": "https://example.com/spdx/widget-1.0/License-MIT-OR-Apache",
      "creationInfo": "_:creationinfo",
      "simplelicensing_licenseExpression": "MIT OR Apache-2.0",
      "simplelicensing_licenseListVersion": "3.29.0"
    },
    {
      "type": "Relationship",
      "spdxId": "https://example.com/spdx/widget-1.0/Rel-declared",
      "creationInfo": "_:creationinfo",
      "relationshipType": "hasDeclaredLicense",
      "from": "https://example.com/spdx/widget-1.0/Package",
      "to": ["https://example.com/spdx/widget-1.0/License-MIT-OR-Apache"]
    },
    {
      "type": "Relationship",
      "spdxId": "https://example.com/spdx/widget-1.0/Rel-concluded",
      "creationInfo": "_:creationinfo",
      "relationshipType": "hasConcludedLicense",
      "from": "https://example.com/spdx/widget-1.0/Package",
      "to": ["https://example.com/spdx/widget-1.0/License-MIT-OR-Apache"]
    }
  ]
}
```

Validate it with the 3.0.1 JSON Schema and SHACL shapes before relying on it; the example is illustrative, not normative.

## Common mistakes

- Two SpdxDocument elements in one file, or an SpdxDocument listed in `element` or `rootElement`.
- `specVersion` `3.0` without a patch number, or a 3.0.1 document with the 3.1 context.
- Licenses as Package properties (2.x habit) instead of `hasDeclaredLicense` and `hasConcludedLicense` relationships.
- `NoneElement` used for "not checked"; use `NoAssertionElement` or `completeness: noAssertion`.
- Unprefixed Software names such as `Package` or `packageVersion` in JSON-LD; the context defines `software_Package` and `software_packageVersion`.
- Reusing one `spdxId` for different elements, or giving CreationInfo a URI instead of a blank node.
