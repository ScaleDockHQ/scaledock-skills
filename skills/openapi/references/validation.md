# Validating against the official JSON Schemas

Read this before saying an OpenAPI Description is valid. Source: the OAI index of versions and schema iterations at spec.openapis.org/oas, and the schemas it links.

## Which schema

| Target | Structure only                                                               | Structure and Schema Objects                               | Dialect and vocabulary                                          |
| ------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| 3.2.x  | `https://spec.openapis.org/oas/3.2/schema/2026-08-30`                        | `https://spec.openapis.org/oas/3.2/schema-base/2026-08-30` | `.../oas/3.2/dialect/2026-02-26`, `.../oas/3.2/meta/2026-02-26` |
| 3.1.x  | `https://spec.openapis.org/oas/3.1/schema/2026-08-03`                        | `https://spec.openapis.org/oas/3.1/schema-base/2026-08-03` | `.../oas/3.1/dialect/2024-11-10`, `.../oas/3.1/meta/2024-11-10` |
| 3.0.x  | `https://spec.openapis.org/oas/3.0/schema/2024-10-18` (JSON Schema draft-04) | n/a                                                        | n/a                                                             |
| 2.0    | `https://spec.openapis.org/oas/2.0/schema/2017-08-27` (JSON Schema draft-04) | n/a                                                        | n/a                                                             |

Rules from the index page:

- All schemas for a minor release apply to every patch release within it; the date only identifies the iteration and is not a release date.
- The latest date within a minor release is the most correct schema, and earlier iterations are obsolete. Re-check the index when refreshing.
- The 3.1+ `schema/` schemas do not validate Schema Objects, because they make no assumption about the JSON Schema dialect.
- The 3.1+ `schema-base/` schemas do validate Schema Objects, and require that `jsonSchemaDialect` and `$schema`, if present, use that minor's `dialect/` URI.
- Schemas catch many errors but not all. When a schema and the specification text disagree, the text is presumed correct.

The 3.2 and 3.1 schemas are JSON Schema Draft 2020-12 and use `$dynamicAnchor`, so the validator must support Draft 2020-12, including dynamic references. `schema-base` references the dialect and meta schemas; preload them by their `$id`, or let the validator fetch them.

The `openapi` pattern in the 3.2 schema is `^3\.2\.[0-9]+(-.+)?$`, so a 3.2 schema rejects a 3.1 document outright. Pick the schema from the `openapi` field. A Swagger 2.0 document carries `swagger: "2.0"` instead; validate it against the 2.0 schema only to check the input of an upgrade ([`versions.md`](versions.md)).

## Selecting the schema in code

```ts
type OasSchemaChoice = { structure: string; withSchemas?: string };

const OAS_SCHEMAS: Record<string, OasSchemaChoice> = {
  "3.2": {
    structure: "https://spec.openapis.org/oas/3.2/schema/2026-08-30",
    withSchemas: "https://spec.openapis.org/oas/3.2/schema-base/2026-08-30",
  },
  "3.1": {
    structure: "https://spec.openapis.org/oas/3.1/schema/2026-08-03",
    withSchemas: "https://spec.openapis.org/oas/3.1/schema-base/2026-08-03",
  },
  "3.0": { structure: "https://spec.openapis.org/oas/3.0/schema/2024-10-18" },
};

export function oasSchemaFor(doc: { openapi?: unknown }): OasSchemaChoice {
  const match =
    typeof doc.openapi === "string"
      ? /^(\d+\.\d+)\.\d+/.exec(doc.openapi)
      : null;
  const choice = match ? OAS_SCHEMAS[match[1]] : undefined;
  if (!choice) {
    throw new Error(`No official schema for openapi: ${String(doc.openapi)}`);
  }
  return choice;
}
```

Use `withSchemas` whenever it exists and the document uses the default dialect. Fall back to `structure` when Schema Objects declare another dialect through `$schema` or `jsonSchemaDialect`, and validate those schemas with a validator for that dialect.

## What a schema cannot check

Check these by hand or with a linter after schema validation passes:

- `operationId` uniqueness across the whole OAD, including other documents (§ 4.10.1, § 4.1.2.3).
- Every path template expression has a path parameter, and no two templated paths differ only in names (§ 4.8.1, § 4.8.2).
- Path parameter names match a template expression, and `required: true` (§ 4.12.2.1).
- `querystring` is not combined with `query` across the operation and its path item (§ 4.12.1).
- Security Requirement names resolve to a declared scheme or a scheme URI (§ 4.30).
- Tag `parent` names exist and contain no cycles (§ 4.22.1).
- `additionalOperations` does not repeat a method that has its own field (§ 4.9.1).
- References resolve after all documents are parsed (§ 4.1.2.1).

## No 3.3 schema yet

No 3.3 schema is published on the index. Do not validate a document against a schema taken from a development branch and call it valid OpenAPI; see [`drafts.md`](drafts.md).
