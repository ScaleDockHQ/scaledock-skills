# Object model

Read this when writing or reviewing the structure of a CycloneDX 1.7 BOM. Sources: ECMA-424 2nd edition § 5.3 and § 6, and the 1.7 JSON Schema at tag 1.7.2 (cited as "schema `definition`"), listed in [Sources](../SKILL.md#sources). Property names are the JSON names; XML uses the same names as elements or attributes under the namespace `http://cyclonedx.org/schema/bom/1.7`, and Protobuf uses snake_case fields.

## Root

| Property                                                                                                                                                                                                           | Rule                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `$schema`                                                                                                                                                                                                          | Optional; any string in 1.6 and 1.7. Use `http://cyclonedx.org/schema/bom-1.7.schema.json`. |
| `bomFormat`                                                                                                                                                                                                        | Required, `"CycloneDX"` (§ 6.1).                                                            |
| `specVersion`                                                                                                                                                                                                      | Required, `"1.7"` (§ 6.2).                                                                  |
| `serialNumber`                                                                                                                                                                                                     | Optional but recommended; `urn:uuid:` + RFC 4122 UUID, new for every generated BOM (§ 6.3). |
| `version`                                                                                                                                                                                                          | Optional integer ≥ 1, default 1; increment on every modification (§ 6.4).                   |
| `metadata`, `components`, `services`, `externalReferences`, `dependencies`, `compositions`, `vulnerabilities`, `annotations`, `formulation`, `declarations`, `definitions`, `citations`, `properties`, `signature` | All optional (§ 6, Table 2).                                                                |

`serialNumber` plus `version` is the BOM's identity, and a BOM-Link expresses it as a URN (§ 5.3, "BOM Identity").

## Metadata

`metadata` (§ 6.5; schema `metadata`):

- `timestamp`: RFC 3339 date-time when the BOM was created.
- `lifecycles`: phases the data comes from (see [`bom-types.md`](bom-types.md)).
- `tools`: an object with `components` and `services` that created, enriched or validated the BOM. The array form is deprecated since 1.5.
- `manufacturer` (organization that created the BOM, common for automated BOMs) or `authors` (persons, common for manual BOMs).
- `component`: the subject the BOM describes. Make it the root of the dependency graph.
- `supplier`: who supplied the subject; may be the manufacturer, a distributor or a repackager.
- `licenses`: the license of the BOM document itself, which may differ from the subject's license.
- `distributionConstraints.tlp` (1.7): TLP classification, default `CLEAR`.
- Do not use `manufacture` (deprecated in 1.6; use `metadata.component.manufacturer`).

## Components

`components[]` (§ 6.6; schema `component`). Required: `type`, `name`.

- `type`: `application`, `framework`, `library`, `container`, `platform`, `operating-system`, `device`, `device-driver`, `firmware`, `file`, `machine-learning-model`, `data`, `cryptographic-asset`. For software, use `application` when nothing more specific fits; prefer `library` over `framework` when unsure.
- `bom-ref`: unique within the BOM; required in practice for anything referenced elsewhere.
- `group`, `name`, `version` (or `versionRange` with `isExternal: true`), `description`, `mime-type`.
- `supplier`, `manufacturer`, `authors`, `publisher`. Not `author` (deprecated in 1.6).
- `hashes[]` (`alg`, `content`), `licenses`, `copyright`, `patentAssertions` (1.7).
- Identity: `purl`, `cpe`, `swid`, `omniborId`, `swhid` (see [`identifiers-and-links.md`](identifiers-and-links.md)).
- `scope`: `required` (default assumption), `optional`, `excluded`.
- `isExternal` (1.7): the component is expected to be provided by the environment rather than bundled; only for runtime components.
- `pedigree`: `ancestors` (for example the original of a fork), `descendants`, `variants`, `commits`, `patches`, `notes`. Use it instead of the deprecated `modified`.
- `evidence`: `identity[]` (with `field`, `confidence`, `concludedValue`, `methods[].technique`), `occurrences[]`, `callstack`, `licenses`, `copyright`. Use an array for `identity`.
- `components[]`: nested parts. "This is not a dependency tree"; it is an assembly hierarchy.
- `externalReferences`, `releaseNotes`, `modelCard`, `data`, `cryptoProperties`, `properties`, `tags`, `signature`.

## Services

`services[]` (§ 6.7; schema `service`). Required: `name`. Fields: `bom-ref`, `provider`, `group`, `version`, `description`, `endpoints[]` (IRI references), `authenticated`, `x-trust-boundary`, `trustZone`, `data[]` (each with required `flow` and `classification`), `licenses`, `patentAssertions`, `externalReferences`, nested `services[]` (assembly, not dependencies), `releaseNotes`, `properties`, `tags`, `signature`.

## Dependencies

`dependencies[]` (§ 6.9; schema `dependency`). Each entry: `ref` (required), `dependsOn[]` and `provides[]`, all `bom-ref` values in the same BOM, unique within each array.

- Each entry "defines the direct dependencies" of its `ref` (schema `dependency`); transitive relationships come from following the entries of those dependencies, which is how the graph represents both direct and transitive relationships (§ 5.3).
- "Components or services that do not have their own dependencies must be declared as empty elements within the graph." A component not in the graph "may have unknown dependencies"; consumers should treat that as opaque, not dependency-free (schema `dependency`).
- `provides` lists what the subject implements, for example an algorithm a crypto library implements; it does not mean the implementation is in use.
- Components can depend on services, and services on services (§ 5.3).

Minimal graph:

```json
"dependencies": [
  { "ref": "pkg:npm/acme-app@1.0.0", "dependsOn": ["pkg:npm/lodash@4.17.21"] },
  { "ref": "pkg:npm/lodash@4.17.21" }
]
```

(Using the purl as `bom-ref` is common but not required; any unique string works.)

## Compositions

`compositions[]` (§ 6.10; schema `compositions`). Required: `aggregate`. Optional: `bom-ref`, `assemblies[]` (refs or BOM-Link elements), `dependencies[]`, `vulnerabilities[]`, `signature`.

`aggregate` values: `complete`, `incomplete`, `incomplete_first_party_only`, `incomplete_first_party_proprietary_only`, `incomplete_first_party_opensource_only`, `incomplete_third_party_only`, `incomplete_third_party_proprietary_only`, `incomplete_third_party_opensource_only`, `unknown`, `not_specified` (the default).

- `assemblies` describe nested parts and `dependencies` describe dependency relationships; in both, "references do not cascade" to children or transitive dependencies. List every part you vouch for.
- `complete` means "no further relationships ... are known to exist". Use `unknown` for a best-effort scan whose completeness is inconclusive.
- `vulnerabilities` describes how complete the vulnerability data is (useful for a VDR).

## Formulation

`formulation[]` (§ 6.13; schema `formula`): each formula has `bom-ref`, `components` (transient components used by the tasks, such as build tools), `services`, `workflows[]` and `properties`. Workflows and tasks require `bom-ref`, `uid` and `taskTypes`, and hold `steps`, `inputs`, `outputs`, `trigger`, `workspaces`, `timeStart`, `timeEnd` and `runtimeTopology`. In 1.7 a formula may describe any referencable object, including the BOM itself (1.7 release notes). Declared formulas describe how to reproduce; observed formulas record what happened (§ 5.3).

## Annotations

`annotations[]` (§ 6.12; schema `annotations`). Required: `subjects[]` (refs or BOM-Link elements), `annotator` (exactly one of `organization`, `individual`, `component`, `service`), `timestamp`, `text`. Optional `bom-ref` and `signature`. Annotations may hold opinions, unlike inventory data, and may be inline or in a separate BOM linked by BOM-Link (§ 6, Table 2).

## Declarations and definitions (CDXA)

`definitions` (§ 6.15): `standards[]` (each with `bom-ref`, `name`, `version`, `owner`, `requirements[]`, `levels[]`, `externalReferences`, `signature`) and, in 1.7, `patents[]`. Requirements have `identifier`, `title`, `text`, `openCre` and `parent`; levels group requirements.

`declarations` (§ 6.14):

- `assessors[]`: `bom-ref`, `thirdParty` (false means self-assessment), `organization`.
- `attestations[]`: `summary`, `assessor` (ref), `map[]` linking a `requirement` to `claims`, `counterClaims`, `conformance` (`score` 0 to 1, `rationale`, `mitigationStrategies`) and `confidence` (`score` 0 to 1, `rationale`).
- `claims[]`: `bom-ref`, `target` (ref to what the claim is about), `predicate`, `mitigationStrategies`, `reasoning`, `evidence`, `counterEvidence`.
- `evidence[]`: `bom-ref`, `propertyName`, `description`, `data`, `created`, `expires`, `author`, `reviewer`.
- `targets`: the `organizations`, `components` and `services` claims refer to.
- `affirmation`: `statement` and `signatories[]`, each with either a JSF `signature` or an `organization` plus `externalReference` (for analogue signatures).

## Citations (1.7)

`citations[]` (§ 6.16; schema `citation`). Required: `timestamp`; exactly one of `pointers[]` (RFC 6901 JSON Pointers, used for every serialization) or `expressions[]` (JSONPath for JSON, XPath for XML); at least one of `attributedTo` (ref to a component, service, organization or person) or `process` (ref to a formula, workflow, task or step). Optional `note` and `signature`.

## Properties and extensions

- `properties[]`: name-value pairs (`name` required). Duplicate names are allowed. Register public names in the CycloneDX Property Taxonomy; registration is optional (§ 6.17).
- XML allows elements from other namespaces and extra attributes on `bom` (XSD `xs:any namespace="##other"`, `xs:anyAttribute`). JSON objects use `additionalProperties: false`, so JSON extensions go in `properties`.

## Minimal 1.7 SBOM

```json
{
  "$schema": "http://cyclonedx.org/schema/bom-1.7.schema.json",
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "serialNumber": "urn:uuid:3e671687-395b-41f5-a30f-a58921a69b79",
  "version": 1,
  "metadata": {
    "timestamp": "2026-10-05T12:00:00Z",
    "lifecycles": [{ "phase": "build" }],
    "tools": {
      "components": [
        {
          "type": "application",
          "name": "example-sbom-generator",
          "version": "2.1.0"
        }
      ]
    },
    "component": {
      "type": "application",
      "bom-ref": "acme-app",
      "name": "acme-app",
      "version": "1.0.0",
      "purl": "pkg:npm/acme-app@1.0.0"
    }
  },
  "components": [
    {
      "type": "library",
      "bom-ref": "pkg:npm/lodash@4.17.21",
      "name": "lodash",
      "version": "4.17.21",
      "purl": "pkg:npm/lodash@4.17.21",
      "licenses": [{ "license": { "id": "MIT" } }],
      "scope": "required"
    }
  ],
  "dependencies": [
    { "ref": "acme-app", "dependsOn": ["pkg:npm/lodash@4.17.21"] },
    { "ref": "pkg:npm/lodash@4.17.21" }
  ],
  "compositions": [
    {
      "aggregate": "complete",
      "assemblies": ["acme-app"],
      "dependencies": ["acme-app"]
    }
  ]
}
```

## Common mistakes

- Using nested `components` as the dependency graph. It is an assembly hierarchy; use `dependencies`.
- Leaving leaf components out of `dependencies`, which a consumer must read as "unknown", not "none".
- Reusing a `serialNumber` for a new build, or changing content without incrementing `version`.
- Marking a composition `complete` after a scan that cannot see vendored or statically linked code.
- Emitting deprecated fields (`tools` array, `author`, `manufacture`, `modified`).
