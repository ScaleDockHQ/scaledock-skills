# json-schema

An agent skill for JSON Schema Core and Validation: write, review, bundle and upgrade JSON Schemas, with 2020-12 as the default dialect.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill json-schema
```

Then ask your agent to "write a JSON Schema 2020-12 for this payload", "close this object across allOf with unevaluatedProperties", or "upgrade this draft-07 schema to 2020-12".

## What it covers

- Dialects: `$schema`, `$vocabulary`, the default 2020-12 meta-schema and custom meta-schemas.
- Identifiers and references: `$id`, `$anchor`, `$ref`, `$dynamicRef`, `$dynamicAnchor`, `$defs`, base URIs and offline dereferencing.
- Applicators: `allOf`, `anyOf`, `oneOf`, `not`, `if`/`then`/`else`, `dependentSchemas`, `prefixItems`, `items`, `contains`, `properties`, `patternProperties`, `additionalProperties`, `propertyNames`.
- `unevaluatedProperties` and `unevaluatedItems`, and why `additionalProperties: false` breaks reuse.
- Validation, content and meta-data keywords, with common mistakes.
- `format` as annotation (default) or assertion, and the defined formats.
- Flag, basic, detailed and verbose output.
- Bundling into Compound Schema Documents.
- Upgrades from draft-04, draft-06, draft-07 and 2019-09.

## Versions

| Line                                      | Status                |
| ----------------------------------------- | --------------------- |
| JSON Schema v1/2026 (work in progress)    | preview (track)       |
| IETF draft-ietf-jsonschema-json-schema-03 | preview (track)       |
| JSON Schema 2020-12                       | current               |
| JSON Schema 2019-09                       | supported             |
| JSON Schema draft-07                      | legacy (upgrade from) |
| JSON Schema draft-06                      | legacy (upgrade from) |
| JSON Schema draft-04                      | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [JSON Schema Specification page](https://json-schema.org/specification): index, 2020-12 current.
- [JSON Schema Core 2020-12](https://json-schema.org/draft/2020-12/json-schema-core) and [Validation 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation): draft-bhutton-json-schema-01 and -validation-01 (16 June 2022).
- [2020-12 meta-schema](https://json-schema.org/draft/2020-12/schema) and [2019-09 meta-schema](https://json-schema.org/draft/2019-09/schema).
- Release notes for [2020-12](https://json-schema.org/draft/2020-12/release-notes), [2019-09](https://json-schema.org/draft/2019-09/release-notes), [draft-07](https://json-schema.org/draft-07/json-schema-release-notes) and [draft-06](https://json-schema.org/draft-06/json-schema-release-notes).
- [JSON Schema Core draft-07](https://json-schema.org/draft-07/draft-handrews-json-schema-01.html), [Core draft-04](https://json-schema.org/draft-04/draft-zyp-json-schema-04.html) and [Validation draft-04](https://json-schema.org/draft-04/draft-fge-json-schema-validation-00.html).
- [Specification Links](https://json-schema.org/specification-links): every draft with its IETF names and dates.
- [draft-ietf-jsonschema-json-schema](https://datatracker.ietf.org/doc/draft-ietf-jsonschema-json-schema/): IETF WG draft, -03 (26 August 2026).
- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec): v1/2026 work in progress, unreleased.
- [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html): Schema Object as a 2020-12 superset.

## License

MIT
