---
name: json-schema
description: >-
  JSON Schema 2020-12: write, review, bundle and upgrade schemas with the Core and Validation
  vocabularies. Covers JSON Schema 2020-12 (current), JSON Schema 2019-09 (supported),
  draft-07, draft-06 and draft-04 (legacy, upgrade from), and tracks two previews: the IETF
  draft-ietf-jsonschema-json-schema-03 and the unreleased JSON Schema v1/2026. Use when
  authoring or reviewing a schema, picking a $schema dialect, using $id, $ref, $anchor,
  $dynamicRef and $defs, composing with allOf, anyOf, oneOf, not and if/then/else, closing
  objects with additionalProperties or unevaluatedProperties, writing tuples with
  prefixItems, deciding whether format asserts or only annotates, producing basic or
  detailed output, bundling into a Compound Schema Document, declaring a dialect
  with $vocabulary, or upgrading from older drafts (definitions to $defs, dependencies
  split, $recursiveRef to $dynamicRef, array items to prefixItems). Triggers: JSON Schema,
  $schema, meta-schema, application/schema+json, OpenAPI 3.1 Schema Object.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# JSON Schema

JSON Schema, published by the JSON Schema organization at json-schema.org, is a JSON-based format for describing JSON data: keywords assert constraints on an instance, annotate it, or apply subschemas to parts of it (Core § 3). The specification is split into Core (identifiers, references, applicators, output) and Validation (assertions, `format`, content and meta-data annotations). With this skill the agent writes, reviews, bundles and upgrades schemas, and configures validators so they evaluate them as the dialect intends.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. "Core" and "Validation" mean the 2020-12 documents (draft-bhutton-json-schema-01 and draft-bhutton-json-schema-validation-01) unless a rule names another line. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: schema author, validator or tooling implementer, or reviewer.
- Target version: JSON Schema 2020-12 (current, default). JSON Schema 2019-09 is supported: use it only for a named consumer that cannot read 2020-12. JSON Schema draft-07, JSON Schema draft-06 and JSON Schema draft-04 are legacy: read them and upgrade from them, never author them. IETF draft-ietf-jsonschema-json-schema-03 and JSON Schema v1/2026 (work in progress) are previews (posture: track): never emit their dialect URIs. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Consumer: plain validator, OpenAPI 3.1 or later document (Schema Objects are a superset of 2020-12), code generator, or form or UI renderer. This decides which annotations matter.
- `format` behaviour: annotation only (default) or assertion (needs a dialect that declares the Format-Assertion vocabulary, or an explicit validator option).
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check json-schema.org/specification for a newer release, check the IETF datatracker for a newer revision of the WG draft, check `json-schema-org/json-schema-spec` for a v1 release, and update the pins.

## Invariants

1. **A schema is an object or a boolean** (Core § 4.3). `true` passes everything like `{}`; `false` fails everything like `{ "not": {} }` (Core § 4.3.2).
2. **Declare the dialect with `$schema` at the document root.** Its value is a normalized URI with a scheme, and the schema MUST validate against that meta-schema (Core § 8.1.1). It MUST NOT appear in a subschema that is not a resource root; without it, behaviour is implementation-defined.
3. **`$id` is an absolute URI with no fragment.** It MUST NOT contain a non-empty fragment, SHOULD NOT contain an empty one, and the root schema SHOULD have one (Core § 8.2.1, § 8.2.1.1). Plain-name fragments come from `$anchor` (Core § 8.2.2).
4. **References are identifiers, not downloads.** Resolve `$ref` against the current base URI; implementations SHOULD NOT assume a network fetch (Core § 8.2.3, § 9.1.2). Keywords next to `$ref` are evaluated too (Core § 8.2.3.1).
5. **Reusable subschemas live in `$defs`** (Core § 8.2.4); `definitions` is kept only for transition in the default meta-schema (Validation Appendix A).
6. **Assertions only constrain their own type** (Core § 7.6.1). `maxLength` passes a number; restrict the type with `type`.
7. **Regular expressions are ECMA-262 and never implicitly anchored** (Core § 6.4, Validation § 6.3.3). Write `^…$` when the whole string must match.
8. **`additionalProperties` sees only adjacent `properties` and `patternProperties`** (Core § 10.3.2.3). To close an object across `allOf`, `$ref` or conditionals, use `unevaluatedProperties` (Core § 11.3).
9. **`format` is an annotation by default.** Implementations MUST disable format assertion by default; only the Format-Assertion vocabulary makes it a required assertion (Validation § 7.2.1, § 7.2.2). Never rely on `format` alone to reject bad input.
10. **Content keywords never fail validation.** A malformed string-encoded document MUST NOT make the instance invalid, and implementations MUST NOT decode it by default (Validation § 8.1, § 8.2).
11. **A bundled schema behaves exactly like the unbundled one.** Embed each external resource with its `$id` (RECOMMENDED under `$defs`) and do not change any `$ref` (Core § 9.3.1).
12. **Validators MUST NOT loop forever** and SHOULD bound resource use; servers MUST ensure an uploaded schema with a pre-existing or very similar `$id` cannot change existing schemas (Core § 13). Patterns can backtrack catastrophically (Validation § 10).
13. **`$comment` is never shown to end users and never collected as an annotation** (Core § 8.3).

## Workflow

1. **Pick the version.** Use 2020-12 unless a named consumer needs 2019-09; set `"$schema": "https://json-schema.org/draft/2020-12/schema"`.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy or preview line.
2. **Identify the resources.** Give the root an absolute `$id`, put reusable parts in `$defs`, add `$anchor` where a location-independent name helps, and decide how external schemas are supplied to the validator.
   -> [`references/core-and-refs.md`](references/core-and-refs.md)
   ✓ Every `$ref` resolves against a known `$id` without a network fetch, and no two schemas share a URI (Core § 9.1.2).
3. **Write the structure.** Use `type`, `properties`, `required`, `prefixItems`, `items`, bounds and `enum` or `const`, choosing keywords per instance type.
   -> [`references/validation-keywords.md`](references/validation-keywords.md)
   ✓ Every assertion that should restrict a type sits next to a matching `type`, and every `pattern` is anchored on purpose.
4. **Compose and close.** Combine with `allOf`, `anyOf`, `oneOf`, `not`, `if`/`then`/`else` and `dependentSchemas`; close objects and arrays with `unevaluatedProperties` or `unevaluatedItems` when subschemas contribute properties.
   -> [`references/unevaluated-and-composition.md`](references/unevaluated-and-composition.md)
   ✓ Valid and invalid sample instances behave as intended, including an instance with a misspelled property.
5. **Decide on `format` and output.** Treat `format` as an annotation and validate in the application, or declare a dialect with Format-Assertion; pick the output format consumers need.
   -> [`references/output-and-formats.md`](references/output-and-formats.md)
   ✓ The validator's `format` setting is documented, and error consumers read `instanceLocation` and `keywordLocation`.
6. **Bundle or extend** (when needed). Bundle external resources into `$defs` of the root, or write a meta-schema with `$vocabulary` for a custom dialect.
   -> [`references/core-and-refs.md`](references/core-and-refs.md)
   ✓ The bundle gives the same results and output locations as the separate files, and each embedded resource validates against its own meta-schema (Core § 9.3.3).
7. **Upgrade** (only when asked). Follow the upgrade section for each step from the source version to the target, one line at a time.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded schema validates against the target meta-schema and accepts and rejects the same instances as before.

## Verify before done

- [ ] The root has `$schema` set to the target meta-schema URI and an absolute `$id` with no fragment.
- [ ] The schema validates against its meta-schema; each embedded resource in a bundle validates against its own (Core § 9.3.3).
- [ ] No `definitions`, `dependencies`, array-form `items`, `additionalItems`, `$recursiveRef` or `$recursiveAnchor` remains in a 2020-12 schema.
- [ ] Every `$ref` and `$dynamicRef` resolves offline; every `$dynamicRef` to a dynamic anchor has a matching `$dynamicAnchor`.
- [ ] Objects that must be closed across composition use `unevaluatedProperties: false`, not `additionalProperties: false` inside each branch.
- [ ] Nothing depends on `format` rejecting input unless the dialect declares Format-Assertion or the validator option is documented as on.
- [ ] Positive and negative sample instances were run through a 2020-12 validator.
- [ ] Nothing from a preview line is emitted: no `https://json-schema.org/v1/2026` `$schema`, and no reliance on draft-only rules such as `x-` keywords as implicit annotations.

## Reference index

- **`references/versions.md`**: every version line with its `$schema` URI and status, which to use, what changed per release, upgrade checklists from draft-04 to 2020-12, and the two previews. Load for steps 1 and 7.
- **`references/core-and-refs.md`**: `$schema`, `$vocabulary` and dialects, `$id`, `$anchor`, `$ref`, `$dynamicRef`, `$defs`, `$comment`, base URIs, dereferencing, Compound Schema Documents and bundling, security. Load for steps 2 and 6.
- **`references/validation-keywords.md`**: every Validation assertion by instance type, content and meta-data annotations, and common mistakes. Load for step 3.
- **`references/unevaluated-and-composition.md`**: in-place and child applicators, conditionals, `additionalProperties` versus `unevaluatedProperties`, `contains` with `unevaluatedItems`, and recursive extension with `$dynamicRef`. Load for step 4.
- **`references/output-and-formats.md`**: Format-Annotation and Format-Assertion, the defined formats, custom formats, and the flag, basic, detailed and verbose output structures. Load for step 5.

## Related skills

- `openapi` for OpenAPI 3.1 and later, whose Schema Object is a superset of JSON Schema 2020-12 with its own dialect and `jsonSchemaDialect`: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`.
- `standard-schema` for generating JSON Schema (draft-2020-12, draft-07) from validator libraries through Standard JSON Schema: `npx skills add ScaleDockHQ/scaledock-skills --skill standard-schema`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [JSON Schema Specification page](https://json-schema.org/specification): json-schema.org index, states "The current version is 2020-12! The previous version was 2019-09.", checked 2026-10-05.
- [JSON Schema Core 2020-12](https://json-schema.org/draft/2020-12/json-schema-core): Released (Internet-Draft draft-bhutton-json-schema-01, 16 June 2022), checked 2026-10-05.
- [JSON Schema Validation 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation): Released (Internet-Draft draft-bhutton-json-schema-validation-01, 16 June 2022), checked 2026-10-05.
- [2020-12 meta-schema](https://json-schema.org/draft/2020-12/schema): Released, vocabularies as of 2026-10-05, checked 2026-10-05.
- [2020-12 Release Notes](https://json-schema.org/draft/2020-12/release-notes): release notes, checked 2026-10-05.
- [2019-09 Release Notes](https://json-schema.org/draft/2019-09/release-notes): release notes, checked 2026-10-05.
- [2019-09 meta-schema](https://json-schema.org/draft/2019-09/schema): Released (17 September 2019), checked 2026-10-05.
- [Draft-07 Release Notes](https://json-schema.org/draft-07/json-schema-release-notes): release notes, checked 2026-10-05.
- [JSON Schema Core draft-07](https://json-schema.org/draft-07/draft-handrews-json-schema-01.html): Released (draft-handrews-json-schema-01, 19 March 2018), checked 2026-10-05.
- [Draft-06 Release Notes](https://json-schema.org/draft-06/json-schema-release-notes): release notes (draft-04 to draft-06 migration), checked 2026-10-05.
- [JSON Schema Core draft-04](https://json-schema.org/draft-04/draft-zyp-json-schema-04.html): Released (draft-zyp-json-schema-04, 31 January 2013), checked 2026-10-05.
- [JSON Schema Validation draft-04](https://json-schema.org/draft-04/draft-fge-json-schema-validation-00.html): Released (draft-fge-json-schema-validation-00, 31 January 2013), checked 2026-10-05.
- [Specification Links](https://json-schema.org/specification-links): json-schema.org index of every draft, its IETF names and dates, checked 2026-10-05.
- [draft-ietf-jsonschema-json-schema (datatracker)](https://datatracker.ietf.org/doc/draft-ietf-jsonschema-json-schema/): IETF jsonschema WG Document, I-D Exists, intended Proposed Standard, revision -03 (26 August 2026), checked 2026-10-05.
- [draft-ietf-jsonschema-json-schema datatracker API](https://datatracker.ietf.org/api/v1/doc/document/draft-ietf-jsonschema-json-schema/): rev 03, expires 2027-02-27, checked 2026-10-05.
- [draft-ietf-jsonschema-json-schema-03 text](https://www.ietf.org/archive/id/draft-ietf-jsonschema-json-schema-03.txt): WG draft, -03, checked 2026-10-05.
- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec): work in progress toward v1/2026, `main` at 4f56a99 (2026-09-04), no release published, checked 2026-10-05.
- [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html): OAI Released, 3.1.1, cited for the Schema Object's 2020-12 base, checked 2026-10-05.
