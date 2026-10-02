# Validating AsyncAPI documents

Read this before calling a document done.

## Official JSON Schemas

The AsyncAPI Initiative publishes JSON Schemas in the spec-json-schemas repository and as the npm package `@asyncapi/specs` (spec-json-schemas README).

| Document `asyncapi` | Schema                                                                                    | Notes                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `3.1.0`             | `https://raw.githubusercontent.com/asyncapi/spec-json-schemas/v6.11.1/schemas/3.1.0.json` | `$id` `http://asyncapi.com/definitions/3.1.0/asyncapi.json`, JSON Schema draft-07. |
| `3.0.0`             | `https://raw.githubusercontent.com/asyncapi/spec-json-schemas/v6.11.1/schemas/3.0.0.json` | Same release.                                                                      |

- Each schema fixes the version with `const`, so the 3.1.0 schema rejects a document that says `asyncapi: 3.0.0`. Pick the schema by the document's exact `asyncapi` value.
- The repository has schemas with and without `$id`, because tools differ in how they resolve `$ref` against `$id` (README, "Two types of schemas").
- Use only schemas for official releases; schemas for release candidates are unstable pre-releases (README, "Releases and pre-releases").

```ts
const schemaBase =
  "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/v6.11.1/schemas/";

export function asyncApiSchemaFor(doc: { asyncapi?: unknown }): string {
  if (typeof doc.asyncapi !== "string") {
    throw new Error("Missing asyncapi version string");
  }
  const version = doc.asyncapi.split("-")[0];
  if (version !== "3.1.0" && version !== "3.0.0") {
    throw new Error(`No pinned schema for AsyncAPI ${doc.asyncapi}`);
  }
  return `${schemaBase}${version}.json`;
}
```

Load the returned schema into a draft-07 JSON Schema validator and validate the document parsed from YAML or JSON.

## What the schemas cannot check

The README states that the schemas do not mirror the specification 1:1 and should not be the only validation, and recommends the AsyncAPI JavaScript parser, which adds custom validations. Check these 3.x rules by hand or with a parser:

- A root operation's `channel` points into root `channels`, and a root channel's `servers` point into root `servers` (§ Operation Object, § Channel Object).
- An operation's or reply's `messages` are a subset of the referenced channel's messages (§ Operation Object, § Operation Reply Object).
- Every `{name}` in a channel address has a parameter, and every parameter key appears in the address (§ Parameters Object).
- A reply with `address` references a channel whose `address` is `null` or absent (§ Operation Reply Object).
- References inside a Multi Format Schema Object point to the same `schemaFormat` (§ Multi Format Schema Object).
- Everything outside `components` is used by the application (§ File Structure).
- Runtime expressions follow `$message.header#/...` or `$message.payload#/...` (§ Runtime Expression).
