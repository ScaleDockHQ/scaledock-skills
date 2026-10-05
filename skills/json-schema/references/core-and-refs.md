# Core: dialects, identifiers, references and bundling

Read this for workflow steps 2 and 6. Sections cite JSON Schema Core 2020-12 (draft-bhutton-json-schema-01).

## Schema documents and keywords

- A schema is an object or a boolean (§ 4.3). `true` behaves like `{}`, `false` like `{ "not": {} }`; boolean schemas never produce annotations (§ 4.3.2).
- Keywords are identifiers, assertions, annotations, applicators or reserved locations (§ 4.3.1). Unknown keywords SHOULD be treated as annotations whose value is the keyword's value (§ 4.3.1, § 6.5).
- A missing keyword MUST NOT produce a false assertion, MUST NOT produce annotations and MUST NOT cause another schema to be evaluated (§ 7.3).
- A schema object that fails produces no annotations, from itself or its subschemas (§ 7.7.1.2).
- Integers SHOULD NOT be encoded with a fractional part (§ 6.3). The data model has no integer type: numbers are equal when mathematically equal (§ 4.2.1, § 4.2.2).
- Extension keywords SHOULD NOT start with `$` (§ 8). Authors SHALL NOT expect implementations to support extension keywords without explicit agreement (§ 6.5).

## Dialects: `$schema` and `$vocabulary`

- `$schema` identifies the dialect and its meta-schema. The value MUST be a normalized URI with a scheme, and the schema MUST validate against it (§ 8.1.1).
- `$schema` SHOULD be in the document root and MAY be in the root of embedded resources; it MUST NOT appear in other subschemas (§ 8.1.1). Without it at the root, behaviour is implementation-defined.
- `$vocabulary` appears only in meta-schemas, in the root, never in subschemas, and is ignored in schemas not processed as meta-schemas (§ 8.1.2). Keys are vocabulary URIs; `true` means implementations that do not recognize it MUST refuse to process the schema, `false` means they SHOULD proceed (§ 8.1.2).
- A meta-schema that uses `$vocabulary` MUST list Core with `true` (§ 8). Vocabulary declarations are not inherited through `$ref`; repeat them in every meta-schema root (§ 8.1.2.2).
- The 2020-12 default meta-schema `https://json-schema.org/draft/2020-12/schema` declares, all `true`: `core`, `applicator`, `unevaluated`, `validation`, `meta-data`, `format-annotation` and `content`, under `https://json-schema.org/draft/2020-12/vocab/`. It also keeps `definitions`, `dependencies`, `$recursiveAnchor` and `$recursiveRef` as deprecated transitional keywords (2020-12 meta-schema).
- Meta-schemas combine vocabulary meta-schemas with `allOf`, set `"$dynamicAnchor": "meta"`, and may forbid keywords, for example `"patternProperties": { "^unevaluated": false }` (Appendix D.2).
- Meta-schemas intended only for local use can omit `$vocabulary` (Appendix D.1).

Custom dialect skeleton (Appendix D.2, with `format-assertion` from Validation § 7.1):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/meta/strict-format",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-assertion": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/meta/core" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/applicator" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/unevaluated" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/validation" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/meta-data" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/format-assertion" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/content" }
  ]
}
```

A validator that cannot fully validate formats MUST refuse schemas using this dialect (Validation § 7.2.2).

## Identifiers: `$id`, `$anchor`, `$dynamicAnchor`

- `$id` gives a schema resource its canonical URI. It MUST be a URI-reference that resolves to an absolute URI; it MUST NOT have a non-empty fragment and SHOULD NOT have an empty one (§ 8.2.1). It is an identifier, not necessarily a download location.
- A relative `$id` in a subschema resolves against the parent resource and makes the subschema an embedded resource (§ 8.2.1). The root SHOULD have an absolute `$id` (§ 8.2.1.1).
- Without `$id`, the base URI is the retrieval URI, or an implementation default the implementation SHOULD document (§ 9.1.1).
- `$anchor` creates a plain-name fragment on the current resource's URI. Names start with a letter or `_`, then letters, digits, `-`, `_` or `.` (§ 8.2.2). Use `$anchor` unless you need `$dynamicAnchor`. Duplicate fragment names in one resource are undefined (§ 8.2.2).
- Fragments matching JSON Pointer syntax (including empty) are JSON Pointers; all others are plain names (§ 5).
- Do not address inside an embedded resource with a JSON Pointer from the enclosing resource's URI; use the embedded resource's own `$id` (§ 9.2.1). Implementations may not support the other form.
- When two schemas claim the same URI, validators SHOULD raise an error (§ 9.1.2).

Appendix A example: in `https://example.com/root.json`, a subschema with `"$id": "other.json"` is `https://example.com/other.json`, and an `"$anchor": "bar"` inside it is `https://example.com/other.json#bar`.

## References: `$ref`, `$dynamicRef`, `$defs`

- `$ref` is an applicator whose result is the referenced schema's result; other keywords may appear next to it and are evaluated (§ 8.2.3.1). The value is a URI-reference resolved against the current base; this is safe at load time.
- `$dynamicRef` resolves like `$ref` first. If the initial target is a fragment created by `$dynamicAnchor`, it is replaced by the outermost resource in the dynamic scope that defines the same dynamic anchor; otherwise it behaves exactly like `$ref` (§ 8.2.3.2). See [`unevaluated-and-composition.md`](unevaluated-and-composition.md#recursive-extension-with-dynamicref) for the tree example.
- `$defs` reserves a place for reusable schemas; each value MUST be a schema; it does not affect validation itself (§ 8.2.4).
- Implementations SHOULD know ahead of time which schemas they use, and SHOULD NOT assume a network fetch for a network-addressable URI (§ 8.2.3, § 9.1.2). Preload external schemas by URI.
- A reference target inside an unknown keyword, or under a known keyword whose value is not a schema, is undefined behaviour (§ 9.4.2). Put referenced schemas under `$defs` or a known applicator.
- Schemas MUST NOT be evaluated into an infinite loop; mutually recursive `allOf` references without consuming instance depth are undefined (§ 9.4.1).

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/order",
  "type": "object",
  "properties": {
    "id": { "$ref": "#/$defs/positiveInteger" },
    "customer": { "$ref": "customer" }
  },
  "$defs": {
    "positiveInteger": { "type": "integer", "exclusiveMinimum": 0 }
  }
}
```

Here `customer` resolves to `https://example.com/schemas/customer`, which must be supplied to the validator or bundled.

## `$comment`

A string for maintainers. Implementations MUST NOT show it to end users, MUST NOT collect it as an annotation and MUST NOT act on its contents; they MAY strip it (§ 8.3, § 13).

## Compound Schema Documents and bundling

- A Compound Schema Document embeds several schema resources in one document; each embedded resource is processed as its own resource, with its own dialect (§ 9.3).
- Bundling copies each externally referenced resource into the referring document. Each embedded resource MUST have `$id` and SHOULD have `$schema`; an absolute `$id` is RECOMMENDED (§ 9.3.1).
- Put embedded resources under `$defs` at the root (RECOMMENDED); the key MAY be the `$id` and is not meant to be referenced (§ 9.3.1).
- References MUST NOT be changed, and a resource MUST NOT be bundled by replacing the referencing schema object or by wrapping it in other applicators, so that results, annotations and error locations stay identical (§ 9.3.1).
- An embedded resource without `$schema` uses the enclosing resource's dialect; one with a different `$schema` uses its own (§ 9.3.2).
- Validate each embedded resource against its own meta-schema rather than validating the whole document against one meta-schema, unless every resource uses the same dialect (§ 9.3.3).
- Bundling is safe and reversible when all static references resolve against canonical resource URIs and every resource root has an absolute `$id`. Removing references altogether is not always safe (Appendix B).

The 2020-12 release notes example bundles `https://example.com/schema/address` and `https://example.com/schema/common` into the `customer` schema's `$defs` under keys equal to their `$id`s, with no `$ref` modified and the `common` resource keeping its own 2019-09 `$schema`.

## Linking and HTTP

- Instances SHOULD link to their schema with `rel="describedby"`, for example `Link: <https://example.com/my-schema>; rel="describedby"` (§ 9.5.1.1).
- Servers SHOULD send long-lived caching headers on schemas; clients SHOULD honour them and send a specific `User-Agent` (§ 9.5.1.2).
- Media types: `application/schema+json` for schemas, `application/schema-instance+json` for instances needing JSON Pointer fragments (§ 4.3, § 14).

## Security (§ 13)

- Treat schemas and instances as untrusted. Validators MUST NOT fall into an infinite loop and SHOULD guard against excessive resource use, including repeated collection of very large annotation values.
- Servers MUST ensure an uploaded schema cannot change existing schemas by claiming a pre-existing or very similar `$id`.
- Implementations MUST NOT parse or act on `$comment`.
