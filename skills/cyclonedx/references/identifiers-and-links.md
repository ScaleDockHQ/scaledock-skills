# Identifiers, references and links

Read this when identifying components, referencing objects inside or across BOMs, or naming and serving BOM files. Sources: the 1.7 JSON Schema at tag 1.7.2, the BOM-Link capability page, the specification README and overview page, and ECMA-424 2nd edition, listed in [Sources](../SKILL.md#sources).

## Component identity

A component can assert its identity in several ways; give at least one that consumers can match, and back any of them with `evidence.identity` (schema `component`).

| Field                        | Rule (schema `component.*`)                                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `purl`                       | Must be valid and conform to the Package URL specification. The most widely matchable identifier for packages; use the `purl` skill to build and parse it.                                                 |
| `cpe`                        | Must conform to CPE 2.2 or 2.3.                                                                                                                                                                            |
| `swid`                       | ISO/IEC 19770-2 SWID tag data: `tagId` and `name` required; `version` (default `0.0`), `tagVersion`, `patch`, `text`, `url` optional (schema `swid`).                                                      |
| `omniborId`                  | OmniBOR Artifact ID (gitoid URI scheme). Added in 1.6.                                                                                                                                                     |
| `swhid`                      | Software Heritage persistent identifier. Added in 1.6.                                                                                                                                                     |
| `group` + `name` + `version` | Always present; not a unique identifier on its own.                                                                                                                                                        |
| `hashes[]`                   | `alg` from `MD5`, `SHA-1`, `SHA-256`, `SHA-384`, `SHA-512`, `SHA3-256`, `SHA3-384`, `SHA3-512`, `BLAKE2b-256`, `BLAKE2b-384`, `BLAKE2b-512`, `BLAKE3`, `Streebog-256`, `Streebog-512` (schema `hash-alg`). |

`evidence.identity[]` records how an identity was found: `field` (`group`, `name`, `version`, `purl`, `cpe`, `omniborId`, `swhid`, `swid`, `hash`), `confidence` (0 to 1), `concludedValue`, and `methods[]` with `technique` such as `manifest-analysis`, `binary-analysis`, `hash-comparison` or `source-code-analysis` (schema `componentIdentityEvidence`).

For external components (1.7), `versionRange` uses the vers syntax from the Package URL project and replaces `version` (schema `component.versionRange`). Vulnerability `affects[].versions[].range` uses the same syntax (schema `versionRange`).

## `bom-ref`

- Identifies a referable object: components, services, vulnerabilities, compositions, licenses, annotations, formulas, workflows, assessors, claims, evidence, standards, requirements, citations and more (schema `refType` and every `bom-ref` property).
- "Every `bom-ref` must be unique within the BOM", and the value SHOULD NOT start with `urn:cdx:`, so it cannot be mistaken for a BOM-Link (schema `refType`).
- Minimum length 1; no other format. Because a BOM-Link element addresses an object by its `bom-ref`, keep `bom-ref` values stable across versions of a BOM if other BOMs link to them.
- Inside a BOM, references (`ref`, `dependsOn`, `provides`, `subjects`, `assessor`, `target`, `attributedTo`, ...) are `refLinkType`: a `bom-ref` in the same document.

## BOM-Link

BOM-Link is an IANA-registered URN, compliant with RFC 8141, that references a BOM or an object in a BOM (BOM-Link page; ECMA-424 § 5.3).

```text
urn:cdx:<serialNumber>/<version>
urn:cdx:<serialNumber>/<version>#<bom-ref>
```

- `serialNumber` is the UUID part of the target BOM's `serialNumber` (without `urn:uuid:`); `version` is its BOM version, `[1-9][0-9]*`; the fragment is a `bom-ref` in that BOM (schema `bomLinkDocumentType`, `bomLinkElementType` patterns).
- A document link matches `^urn:cdx:<uuid>/<version>$`; an element link adds `#.+`.
- Where it is allowed: `externalReferences[].url` (document or element), `compositions[].assemblies`, `vulnerabilities[].affects[].ref`, and `annotations[].subjects` (element) (schema).
- A BOM-Link pins a version. When the target BOM gets a new version, links to the old version still point to the old content; regenerate dependent BOMs (such as a VEX) when you want them to follow.

Example: an SBOM points to its separate VEX and MBOM.

```json
"externalReferences": [
  { "type": "exploitability-statement", "url": "urn:cdx:f08a6ccd-4dce-4759-bd84-c626675d60a7/3" },
  { "type": "formulation", "url": "urn:cdx:5e2b9c1a-0d7f-4a3e-9b61-2c8d4f0a7e15/1" }
]
```

## External references

`externalReferences[]` needs `url` (an IRI reference or a BOM-Link) and `type`; `comment`, `hashes` and (1.7) `properties` are optional (schema `externalReference`). Types include `vcs`, `issue-tracker`, `website`, `advisories`, `bom`, `documentation`, `source-distribution`, `distribution`, `distribution-intake`, `license`, `build-meta`, `build-system`, `release-notes`, `security-contact`, `model-card`, `log`, `configuration`, `evidence`, `formulation`, `attestation`, `threat-model`, `adversary-model`, `risk-assessment`, `vulnerability-assertion`, `exploitability-statement`, `pentest-report`, `static-analysis-report`, `dynamic-analysis-report`, `runtime-analysis-report`, `component-analysis-report`, `maturity-report`, `certification-report`, `codified-infrastructure`, `quality-metrics`, `poam`, `electronic-signature`, `digital-signature`, `rfc-9116`, `patent`, `patent-family`, `patent-assertion`, `citation` and `other`.

- If a license has a `url`, also add a `license` external reference "for completeness" (schema `externalReference.type`).
- `security-contact` may be a disclosure URL, `mailto:`, `tel:` or a `dns:` URI for security.txt records (ECMA-424 Table 499).

## Media types and file names

| Format   | Media type                             | IANA           |
| -------- | -------------------------------------- | -------------- |
| JSON     | `application/vnd.cyclonedx+json`       | registered     |
| XML      | `application/vnd.cyclonedx+xml`        | registered     |
| Protobuf | `application/x.vnd.cyclonedx+protobuf` | not registered |

Add the version as a parameter, for example `application/vnd.cyclonedx+json; version=1.7` (README, Media Types; overview page).

File names: `bom.json` and `bom.xml` by convention, or the patterns `*.cdx.json` and `*.cdx.xml` (README, Recognized file patterns).

In-toto and similar attestation frameworks use the predicate type `https://cyclonedx.org/bom` for every CycloneDX BOM variety (overview page, "Recognized predicate type"). See the `slsa` skill for wrapping a BOM in an attestation.

## Common mistakes

- A `bom-ref` that starts with `urn:cdx:`, or duplicated across nested components.
- A BOM-Link built from the full `urn:uuid:...` serial number instead of the bare UUID.
- A `purl` that does not parse under the Package URL specification, or a `cpe` that is neither CPE 2.2 nor 2.3.
- Using `group` + `name` + `version` alone as the match key when a purl is available.
