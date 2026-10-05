# BOM types and lifecycles

Read this when deciding what kind of BOM to produce and which elements it needs. Sources: ECMA-424 2nd edition § 5 (Overview, "xBOM Capabilities") and § 5.3, the specification README, and the 1.7 JSON Schema, listed in [Sources](../SKILL.md#sources).

CycloneDX has one document format for every BOM type. The 1.7 schema has no field that names the type: a BOM is an SBOM, a SaaSBOM or a VEX because of what it contains. ECMA-424 lists these capabilities: SBOM, SaaSBOM, HBOM, ML-BOM, CBOM, OBOM, MBOM, Bill of Vulnerabilities (BOV), VDR, VEX, CycloneDX Attestations (CDXA) and the Common Release Notes Format (§ 5, "xBOM Capabilities").

## Types and the elements they use

| Type          | What it inventories (ECMA-424 § 5)                                                                                            | Elements to fill                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| SBOM          | Software components and services and the dependency relationships between them; ideally all direct and transitive components. | `metadata.component`, `components`, `dependencies`, `compositions`                                                     |
| SaaSBOM       | Services, endpoints, data flows and classifications behind cloud-native apps; optionally the components of each service.      | `services` with `endpoints`, `authenticated`, `x-trust-boundary`, `trustZone`, `data`; `dependencies` between services |
| HBOM          | Hardware devices, for consumer electronics, IoT, ICS and embedded devices.                                                    | components of type `device`, with a separate `firmware` or `operating-system` component for the software on it         |
| ML-BOM        | Machine learning models and datasets, with model cards.                                                                       | components of type `machine-learning-model` with `modelCard`, and type `data` with `data`                              |
| CBOM          | Cryptographic assets and their dependencies, as the first step toward quantum-safe migration.                                 | components of type `cryptographic-asset` with `cryptoProperties`; `dependencies[].provides`                            |
| OBOM          | A full-stack inventory of runtime environments, configurations and additional dependencies.                                   | hardware, firmware, container, OS, application and library components; lifecycle `operations`                          |
| MBOM          | Declared and observed formulation: how components were made, models trained, services deployed.                               | `formulation` with formulas, workflows, tasks and steps; can live in a separate BOM linked by BOM-Link                 |
| BOV           | Vulnerabilities only, for sharing vulnerability data between systems.                                                         | `vulnerabilities`, nothing else required                                                                               |
| VDR           | Known and unknown vulnerabilities affecting components and services; exceeds ISO/IEC 29147:2018 fields.                       | `vulnerabilities` with `affects`, `ratings`, `recommendation`; `compositions[].vulnerabilities` for completeness       |
| VEX           | Exploitability of vulnerable components in the context of the product. "VEX is a subset of VDR."                              | `vulnerabilities` with `analysis`                                                                                      |
| CDXA          | Standards, claims, evidence and attestations: "compliance as code".                                                           | `definitions.standards`, `declarations`                                                                                |
| Release notes | A machine-readable release notes format, usable without the BOM features.                                                     | `releaseNotes` on a component or service (`type` required)                                                             |

Details per type:

- **SBOM.** Use `scope` on each component: `required` (needed at runtime; the default a consumer SHOULD assume), `optional` (not callable because not installed or accessible), or `excluded` (test and other non-runtime use; not reachable at runtime) (schema `component.scope`).
- **SaaSBOM.** Each `services[].data[]` entry needs `flow` (`inbound`, `outbound`, `bi-directional`, `unknown`) and `classification` (schema `serviceData`, `dataFlowDirection`). Nested `services[].services` is an assembly hierarchy, not a dependency tree (schema `service.services`).
- **HBOM.** "A hardware device containing firmware SHOULD include a component for the physical hardware itself and another component of type 'firmware' or 'operating-system'" (schema `component.type`, `device`).
- **ML-BOM.** `modelCard` has `modelParameters` (approach, task, architecture, datasets, inputs, outputs), `quantitativeAnalysis` and `considerations` (users, use cases, limitations, trade-offs, ethical, environmental and fairness). `component.data` SHOULD be present for type `data` and must not be present for other types; `data[].type` is `source-code`, `configuration`, `dataset`, `definition` or `other` (schema `modelCard`, `componentData`).
- **CBOM.** `cryptoProperties.assetType` is `algorithm`, `certificate`, `protocol` or `related-crypto-material`; algorithms carry `primitive` (for example `signature`, `hash`, `kem`, `ae`), `parameterSetIdentifier`, `ellipticCurve`, `classicalSecurityLevel` and `nistQuantumSecurityLevel`. In 1.7 link related assets with `relatedCryptographicAssets` (`type`, `ref`), not the deprecated `*Ref` fields (schema `cryptoProperties`). A library that implements an algorithm lists it in `dependencies[].provides`; "a component which implements another component does not imply that the implementation is in use" (schema `dependency.provides`).
- **MBOM.** Externalizing formulation into a dedicated MBOM lets SBOMs link to it while access is controlled separately, because MBOM data may be more sensitive (ECMA-424 § 5). Workflows and tasks need `bom-ref`, `uid` and `taskTypes` (`copy`, `clone`, `lint`, `scan`, `merge`, `build`, `test`, `deliver`, `deploy`, `release`, `clean`, `other`) (schema `workflow`, `task`, `taskType`).
- **CDXA.** See the declarations section of [`object-model.md`](object-model.md).

## Lifecycle phases

Set `metadata.lifecycles` to the phase(s) in which the data was captured (schema `metadata.lifecycles`). Each entry is either `{"phase": ...}` or a custom `{"name": ..., "description": ...}`:

| Phase          | Meaning (schema `meta:enum`)                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `design`       | Planned or proposed components and services, early in development.                             |
| `pre-build`    | Source files, development artifacts and manifests before a build; may need resolving.          |
| `build`        | Captured during a build; precise resolved versions and where they came from are usually known. |
| `post-build`   | Captured after a build from the resulting artifacts, installed systems or devices.             |
| `operations`   | Running inventory, often several SBOMs and HBOMs together; the OBOM case.                      |
| `discovery`    | Observed through network discovery: services, devices, microservices, serverless functions.    |
| `decommission` | Inventory that will be, or has been, retired.                                                  |

A CI pipeline that generates the BOM from the resolved build normally records `build`; a scan of a container image or binary after the fact records `post-build`.

## Choosing and splitting

- One BOM can combine types: an SBOM can carry `services`, `vulnerabilities` and `formulation` at once (ECMA-424 § 5.3).
- Split when audiences or sensitivity differ: an SBOM for customers, a VEX that changes more often, an MBOM with restricted access. Link them with BOM-Link and `externalReferences` of type `bom`, `exploitability-statement` or `formulation` (see [`identifiers-and-links.md`](identifiers-and-links.md)).
- Set `metadata.distributionConstraints.tlp` (1.7) when sharing is restricted; the default is `CLEAR` (schema `tlpClassification`).
