# `format` and output formats

Read this for workflow step 5. `format` sections cite JSON Schema Validation 2020-12 (draft-bhutton-json-schema-validation-01); output sections cite JSON Schema Core 2020-12 (draft-bhutton-json-schema-01).

## `format`: annotation or assertion

The value is a string called a format attribute. Instances of a type the attribute does not cover SHOULD pass (§ 7.1). Two vocabularies define its behaviour:

| Vocabulary        | URI                                                             | Support required | Behaviour                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Format-Annotation | `https://json-schema.org/draft/2020-12/vocab/format-annotation` | REQUIRED         | `format` is collected as an annotation. Implementations MAY also assert, but only behind an option that MUST be off by default (§ 7.2.1).                    |
| Format-Assertion  | `https://json-schema.org/draft/2020-12/vocab/format-assertion`  | OPTIONAL         | `format` MUST be evaluated as an assertion with syntactic validation for every defined format; implementations that cannot MUST refuse the schema (§ 7.2.2). |

- The default 2020-12 meta-schema declares Format-Annotation, so by default `format` never fails validation (2020-12 meta-schema; § 7.2.1).
- With the assertion option on under Format-Annotation, validation is best effort and MAY be a no-op per attribute; this is not equivalent to declaring Format-Assertion (§ 7.2.1).
- Declaring both vocabularies equals declaring only Format-Assertion (§ 7.1).
- Format-Assertion requires syntactic checks only: no sending email or connecting to URLs (§ 7.2.2).
- Unknown formats MUST still be collected as annotations; under Format-Assertion, unknown formats MUST fail (§ 7.2.3). For interoperable custom checks, define a keyword in a custom vocabulary rather than a custom format attribute (§ 7.2.3).
- The recommended practice is to rely on the annotation and validate semantics in the application (§ 7.2.1). If the schema must reject malformed values with any validator, add a `pattern` too, as Core Appendix D.2 does for its `minDate` example.

Checklist for a schema author who needs format validation:

1. Prefer validating in the application from the `format` annotation.
2. Otherwise declare a dialect with Format-Assertion set to `true` ([`core-and-refs.md`](core-and-refs.md#dialects-schema-and-vocabulary)) and use a validator that supports it.
3. Or document that the validator's format assertion option must be on, and accept best-effort results.

## Defined formats (§ 7.3)

All apply to strings.

| Group                  | Attributes                                             | Defined by                                                                                    |
| ---------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Dates, times, duration | `date-time`, `date`, `time`, `duration`                | RFC 3339 `date-time`, `full-date`, `full-time`; `duration` from RFC 3339 Appendix A (§ 7.3.1) |
| Email                  | `email`, `idn-email`                                   | RFC 5321 § 4.1.2 Mailbox; RFC 6531 § 3.3 (§ 7.3.2)                                            |
| Hostnames              | `hostname`, `idn-hostname`                             | RFC 1123 § 2.1 with Punycode; RFC 5890 § 2.3.2.3 (§ 7.3.3)                                    |
| IP addresses           | `ipv4`, `ipv6`                                         | RFC 2673 § 3.2 dotted-quad; RFC 4291 § 2.2 (§ 7.3.4)                                          |
| Resource identifiers   | `uri`, `uri-reference`, `iri`, `iri-reference`, `uuid` | RFC 3986; RFC 3987; RFC 4122 (§ 7.3.5)                                                        |
| URI templates          | `uri-template`                                         | RFC 6570, any level (§ 7.3.6)                                                                 |
| JSON Pointers          | `json-pointer`, `relative-json-pointer`                | RFC 6901 § 5; Relative JSON Pointer draft (§ 7.3.7)                                           |
| Regular expressions    | `regex`                                                | ECMA-262 (§ 7.3.8)                                                                            |

- `uri` requires an absolute URI with a scheme; use `uri-reference` for relative references and fragments (§ 7.3.5; Draft-06 Release Notes).
- `uuid` is a plain UUID such as `f81d4fae-7dec-11d0-a765-00a0c91e6bf6`. For `urn:uuid:` values use `uri` with `"pattern": "^urn:uuid:"` (§ 7.3.5).
- `json-pointer` is the string form (`/foo/bar`), not a URI fragment (`#/foo/bar`) (§ 7.3.7).
- Other RFC 3339 names are reserved; do not define extension formats with those names unless they follow RFC 3339 (§ 7.3.1).

## Output formats (Core § 12)

Implementations SHOULD support at least one of flag, basic or detailed, MAY support verbose, and MUST support flag if they support detailed or verbose (§ 12.2).

| Format   | Shape                                                                                                       | Section  |
| -------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| Flag     | `{ "valid": false }` only; implementations SHOULD short-circuit                                             | § 12.4.1 |
| Basic    | flat list of output units under `errors` or `annotations`                                                   | § 12.4.2 |
| Detailed | hierarchy following the schema; applicators get nodes, empty nodes are dropped, single-child nodes collapse | § 12.4.3 |
| Verbose  | full hierarchy matching the schema, including passing nodes; each node SHOULD carry `valid`                 | § 12.4.4 |

Every output is an object with a boolean `valid`, plus `errors` (failure) or `annotations` (success) when detail is requested (§ 12.4). Each output unit SHOULD contain (§ 12.3):

| Key                       | Content                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `keywordLocation`         | JSON Pointer along the evaluation path, including `$ref` and `$dynamicRef` segments, for example `/items/$ref/required`                                                  |
| `absoluteKeywordLocation` | canonical URI of the keyword with a JSON Pointer fragment, without by-reference segments; MAY be omitted if no reference was crossed or the schema has no absolute `$id` |
| `instanceLocation`        | JSON Pointer into the instance                                                                                                                                           |
| `error` or `annotation`   | the error message (wording is implementation-defined) or the annotation value                                                                                            |
| `errors` or `annotations` | nested results in the hierarchical formats                                                                                                                               |

Basic output for the § 12.4 polygon example, where the second point lacks `y` and has an extra `z`, and the array has two items instead of three:

```json
{
  "valid": false,
  "errors": [
    {
      "keywordLocation": "",
      "instanceLocation": "",
      "error": "A subschema had errors."
    },
    {
      "keywordLocation": "/items/$ref/required",
      "absoluteKeywordLocation": "https://example.com/polygon#/$defs/point/required",
      "instanceLocation": "/1",
      "error": "Required property 'y' not found."
    },
    {
      "keywordLocation": "/items/$ref/additionalProperties",
      "absoluteKeywordLocation": "https://example.com/polygon#/$defs/point/additionalProperties",
      "instanceLocation": "/1/z",
      "error": "Additional property 'z' found but was invalid."
    },
    {
      "keywordLocation": "/minItems",
      "instanceLocation": "",
      "error": "Expected at least 3 items but found 2"
    }
  ]
}
```

(The specification's example also includes a unit for `/items/$ref` itself.) Validate output with `https://json-schema.org/draft/2020-12/output/schema` (§ 12.4.5).

Guidance for consumers:

- Key on `instanceLocation` to map errors to fields, and on `keywordLocation` or `absoluteKeywordLocation` to know which rule failed; do not parse `error` text (§ 12.3.4 leaves wording to implementations).
- Implementations SHOULD tailor error messages to their audience or allow templating (§ 12.4).
- To turn errors into an HTTP API error response, map each unit to a field-level entry; see the `problem-details` skill (`npx skills add ScaleDockHQ/scaledock-skills --skill problem-details`).

Output formats are among the features the v1 work plans to extract into a separate specification; see the v1 preview in [`versions.md`](versions.md#preview-json-schema-v12026).
