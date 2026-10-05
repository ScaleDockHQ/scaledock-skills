# Composition, conditionals and unevaluated locations

Read this for workflow step 4. Sections cite JSON Schema Core 2020-12 (draft-bhutton-json-schema-01): the Applicator vocabulary (§ 10) and the Unevaluated vocabulary (§ 11).

## In-place applicators (§ 10.2)

They apply subschemas to the same instance location. Sibling subschemas MUST NOT affect each other, so order does not matter (§ 10.2).

| Keyword | Value                      | Passes when                                                                     |
| ------- | -------------------------- | ------------------------------------------------------------------------------- |
| `allOf` | non-empty array of schemas | every subschema passes                                                          |
| `anyOf` | non-empty array of schemas | at least one passes; with annotation collection, all are evaluated (§ 10.2.1.2) |
| `oneOf` | non-empty array of schemas | exactly one passes                                                              |
| `not`   | a schema                   | the subschema fails                                                             |

`oneOf` fails when two branches both match. Make branches mutually exclusive (for example with a `const` discriminator property) or use `anyOf`.

## Conditionals (§ 10.2.2)

- `if` decides which of `then` and `else` applies; its own result does not affect the outcome (§ 10.2.2.1).
- Without `if`, `then` and `else` are ignored; absent keywords are not treated as empty schemas (§ 10.2.2).
- `if`, `then` and `else` never interact across subschema boundaries: an `if` in one `allOf` branch does not control a `then` in another (§ 10.2.2).
- `dependentSchemas`: when the instance has the property named by a key, the whole instance must validate against that key's schema (§ 10.2.2.4).

```json
{
  "type": "object",
  "properties": {
    "country": { "enum": ["US", "NL"] },
    "postalCode": { "type": "string" }
  },
  "if": {
    "properties": { "country": { "const": "US" } },
    "required": ["country"]
  },
  "then": {
    "properties": { "postalCode": { "pattern": "^[0-9]{5}(-[0-9]{4})?$" } }
  },
  "else": {
    "properties": { "postalCode": { "pattern": "^[0-9]{4} ?[A-Z]{2}$" } }
  }
}
```

The `required` inside `if` matters: without it an object with no `country` matches `if`, because `properties` passes when the property is absent (§ 10.3.2.1).

## Child applicators (§ 10.3)

Arrays:

- `prefixItems`: a non-empty array of schemas applied by position. It does not constrain length (§ 10.3.1.1).
- `items`: one schema for every element after the `prefixItems` (or for all elements if there is no `prefixItems`). `"items": false` closes a tuple (§ 10.3.1.2).
- `contains`: at least one element matches, unless `minContains` is 0. It evaluates every element to collect annotations (§ 10.3.1.3).

```json
{
  "type": "array",
  "prefixItems": [{ "type": "number" }, { "type": "number" }],
  "items": false,
  "minItems": 2
}
```

Objects:

- `properties`: each named property present in the instance must match its schema (§ 10.3.2.1).
- `patternProperties`: each property whose name matches a regex (unanchored) must match the schema (§ 10.3.2.2).
- `additionalProperties`: applies to properties not matched by `properties` or `patternProperties` in the same schema object only (§ 10.3.2.3).
- `propertyNames`: every property name, as a string, must match (§ 10.3.2.4).

## Why `additionalProperties: false` breaks reuse

`additionalProperties` only sees adjacent `properties` and `patternProperties` (§ 10.1, § 10.3.2.3). Combining two closed schemas with `allOf` rejects every non-empty object, because each branch rejects the other's properties (Draft-06 Release Notes). The fix since 2019-09 is `unevaluatedProperties`.

## `unevaluatedProperties` (§ 11.3)

- It applies to properties not successfully evaluated by `properties`, `patternProperties`, `additionalProperties` or `unevaluatedProperties`, both adjacent and from all adjacent in-place applicators, including `$ref`, `allOf`, `anyOf`, `oneOf`, `if`/`then`/`else` and `dependentSchemas` (§ 11, § 11.3).
- Only successful evaluations count: a property evaluated inside a failing `anyOf` branch is still unevaluated (§ 11).
- All those keywords MUST be evaluated first (§ 11.3).

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "named": {
      "properties": { "name": { "type": "string" } },
      "required": ["name"]
    },
    "aged": { "properties": { "age": { "type": "integer", "minimum": 0 } } }
  },
  "allOf": [{ "$ref": "#/$defs/named" }, { "$ref": "#/$defs/aged" }],
  "unevaluatedProperties": false
}
```

`{ "name": "a", "age": 3 }` passes; `{ "name": "a", "agee": 3 }` fails on `agee`.

Put `unevaluatedProperties: false` on the outermost schema that defines the closed shape, not in the reusable parts, so extensions can still add properties; Appendix C does the same, with the lenient `tree` and the closing `strict-tree`.

## `unevaluatedItems` (§ 11.2)

- It applies to array positions not covered by `prefixItems`, `items`, `contains` or `unevaluatedItems` annotations from adjacent keywords and in-place applicators. If any of them annotates `true` (all items evaluated), it is ignored (§ 11.2).
- Since 2020-12, elements that match `contains` count as evaluated (2020-12 Release Notes).

```json
{
  "type": "array",
  "contains": { "type": "string" },
  "unevaluatedItems": { "type": "number" }
}
```

This array needs at least one string; every other element must be a number.

## Recursive extension with `$dynamicRef`

`$dynamicRef` lets an extending schema take over recursion in a base schema (§ 8.2.3.2, Appendix C):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/tree",
  "$dynamicAnchor": "node",
  "type": "object",
  "properties": {
    "data": true,
    "children": { "type": "array", "items": { "$dynamicRef": "#node" } }
  }
}
```

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/strict-tree",
  "$dynamicAnchor": "node",
  "$ref": "tree",
  "unevaluatedProperties": false
}
```

Evaluating `strict-tree` against `{ "children": [{ "daat": 1 }] }`: `#node` in `tree` resolves to `tree#node`, a dynamic anchor, so the outermost resource in the dynamic scope that defines `node` wins, which is `strict-tree`. The children are evaluated against `strict-tree`, and `daat` fails `unevaluatedProperties` (Appendix C). With `$ref` instead of `$dynamicRef`, the children would only see the lenient `tree`.

Use `$anchor` and `$ref` unless you need this extension point (§ 8.2.2).

## Common mistakes

- `additionalProperties: false` in each `allOf` branch (see above).
- Expecting `unevaluatedProperties` to see properties of a sibling schema that is not an adjacent in-place applicator, such as a property schema of a parent object (§ 11.3 "adjacent").
- Array-valued `items` from 2019-09 or earlier; in 2020-12 `items` MUST be a schema (§ 10.3.1.2).
- `oneOf` with overlapping branches that should have been `anyOf`.
- `then` or `else` without `if`: silently ignored (§ 10.2.2).
- Unbounded recursion through `allOf` references that never descend into the instance (§ 9.4.1).
