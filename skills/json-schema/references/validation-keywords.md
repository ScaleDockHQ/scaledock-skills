# Validation keywords

Read this for workflow step 3. Sections cite JSON Schema Validation 2020-12 (draft-bhutton-json-schema-validation-01) unless marked Core.

Assertions only constrain instances of their own type; other types pass (Core § 7.6.1). Pair assertions with `type` when the type itself must be restricted:

```json
{ "type": ["string", "null"], "maxLength": 255 }
```

## Any instance type (§ 6.1)

| Keyword | Value                                    | Passes when                                                                    |
| ------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `type`  | a string or an array of unique strings   | the instance is one of the types; `integer` is any number with a zero fraction |
| `enum`  | an array, SHOULD be non-empty and unique | the instance equals one element (Core § 4.2.2 equality)                        |
| `const` | any value                                | the instance equals the value; same as a one-element `enum`                    |

Type names are `null`, `boolean`, `object`, `array`, `number`, `string` and `integer` (§ 6.1.1).

## Numbers (§ 6.2)

- `multipleOf`: a number greater than 0; the instance divided by it is an integer (§ 6.2.1).
- `maximum` and `minimum` are inclusive; `exclusiveMaximum` and `exclusiveMinimum` are numbers and exclusive (§ 6.2.2 to § 6.2.5). They are independent keywords: write `"exclusiveMinimum": 0`, not a boolean.
- Numbers may be arbitrarily large or precise; JSON Schema adds no bounds (§ 4.2).

## Strings (§ 6.3)

- `maxLength` and `minLength` count characters as defined by RFC 8259, that is code points, not bytes (§ 6.3.1, § 6.3.2). `minLength` defaults to 0.
- `pattern` is an ECMA-262 regular expression and is not anchored: `"es"` matches `"expression"` (§ 6.3.3; Core § 6.4). Write `"^[a-z]+$"` for a full match.
- For portability, use only the regex subset in Core § 6.4: literal characters, character classes and their complements, `+ * ?` and `{x,y}` quantifiers (and lazy forms), `^`, `$`, grouping and alternation. Build patterns with Unicode support.
- The NUL character is valid in a JSON string and may appear in instances (§ 4.1).

## Arrays (§ 6.4)

- `maxItems`, `minItems`: non-negative integers; `minItems` defaults to 0.
- `uniqueItems`: `true` requires all elements to be unique by instance equality; defaults to `false`.
- `minContains`, `maxContains`: only apply when `contains` is in the same schema object. `minContains` defaults to 1; `0` makes `contains` always pass, leaving only `maxContains` (§ 6.4.4, § 6.4.5).

```json
{
  "type": "array",
  "contains": { "const": "admin" },
  "minContains": 1,
  "maxContains": 1
}
```

## Objects (§ 6.5)

- `maxProperties`, `minProperties`: non-negative integers; `minProperties` defaults to 0.
- `required`: an array of unique strings; every name must be present. Listing a name in `properties` does not make it required.
- `dependentRequired`: an object of string arrays; when the key is present, the listed names must be present too (§ 6.5.4).

```json
{
  "type": "object",
  "properties": {
    "creditCard": { "type": "string" },
    "billingAddress": { "type": "string" }
  },
  "dependentRequired": { "creditCard": ["billingAddress"] }
}
```

## Content of string-encoded data (§ 8)

- `contentEncoding` names the binary encoding, for example `base64` (RFC 4648 unless the value is meant for MIME). It is unrelated to HTTP `Content-Encoding` (§ 8.3).
- `contentMediaType` is the media type of the (decoded) string (§ 8.4).
- `contentSchema` describes the decoded content and SHOULD be ignored without `contentMediaType` (§ 8.5).
- These are annotations only: a malformed embedded document MUST NOT make the instance invalid, and implementations MUST NOT decode, parse or validate the contents by default (§ 8.1, § 8.2). Validate decoded content in the application.

```json
{
  "type": "string",
  "contentEncoding": "base64",
  "contentMediaType": "image/png"
}
```

## Meta-data annotations (§ 9)

| Keyword                 | Value   | Meaning                                                                                                                           |
| ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `title`, `description`  | strings | Short title and longer explanation for UIs and documentation (§ 9.1)                                                              |
| `default`               | any     | A default value; RECOMMENDED to be valid against the schema (§ 9.2). Validators do not act on it for the application (Core § 7.7) |
| `deprecated`            | boolean | Applications SHOULD refrain from using the location; any `true` wins (§ 9.3)                                                      |
| `readOnly`, `writeOnly` | boolean | Managed by the owning authority, or never returned by it; any `true` wins (§ 9.4)                                                 |
| `examples`              | array   | Sample values, RECOMMENDED to be valid; multiple occurrences are flattened (§ 9.5)                                                |

Annotations attach only when the schema object and all its parents validate (Core § 7.7). The application decides how to merge several values at one location, using the schema location to tell them apart (Core § 7.7.1.1).

## Common mistakes

- `pattern` without `^` and `$` when the whole string must match (§ 6.3.3).
- `maxLength`, `minimum` or `required` without `type`, so other types slip through (Core § 7.6.1).
- Expecting `default` to fill in missing values: it is an annotation that the application may use (§ 9.2; Core § 7.7).
- Boolean `exclusiveMinimum` from draft-04: in 2020-12 it MUST be a number (§ 6.2.5).
- Expecting `contentSchema` to validate: it is only an annotation (§ 8.2).
- Using `definitions` or `dependencies`: renamed to `$defs`, and split into `dependentRequired` (here) and `dependentSchemas` (Core) (Appendix A).

## Security (§ 10)

- Regex implementations that allow embedding arbitrary code MUST NOT permit it, and crafted patterns can cause catastrophic backtracking: treat patterns in untrusted schemas as a denial-of-service risk.
- Decoding content based on `contentEncoding` or `contentMediaType` risks unsafe processing; only do it when schema and instance share a trust relationship.
