# Runtime expressions, criteria and selectors

Read this when passing data between steps or deciding whether a step succeeded. Section numbers are from Arazzo 1.1.0.

## Runtime expressions (§ 5.9)

| Expression                                                                                             | Value                                                                                              |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `$url`, `$method`, `$statusCode`                                                                       | The request URL, HTTP method and response status of the current step.                              |
| `$request.header.<name>`, `$request.query.<name>`, `$request.path.<name>`, `$request.body#/<pointer>`  | Parts of the request sent. Request parameters must be declared on the operation.                   |
| `$response.header.<name>`, `$response.body#/<pointer>`                                                 | Parts of the response. Single header values only.                                                  |
| `$message.header.<name>`, `$message.payload#/<pointer>`                                                | Parts of an AsyncAPI message.                                                                      |
| `$inputs.<name>`                                                                                       | A workflow input.                                                                                  |
| `$outputs.<name>`                                                                                      | A workflow output.                                                                                 |
| `$steps.<stepId>.outputs.<name>#/<pointer>`                                                            | A step output, optionally a part of it.                                                            |
| `$workflows.<workflowId>.inputs.<name>`, `$workflows.<workflowId>.outputs.<name>`                      | Another workflow's inputs or outputs.                                                              |
| `$sourceDescriptions.<name>.<reference>`                                                               | An `operationId` or `workflowId` in that source, or else a Source Description field such as `url`. |
| `$components.parameters.<key>`, `$components.successActions.<key>`, `$components.failureActions.<key>` | A component.                                                                                       |
| `$self`                                                                                                | The description's `$self` URI.                                                                     |

Rules:

- `stepId`, `workflowId` and source names use the strict identifier `[A-Za-z0-9_\-]+` (no dots); input, output and component names may contain dots (§ 5.9 ABNF).
- JSON Pointers follow RFC 6901: `/` as `~1`, `~` as `~0` (§ 5.9 ABNF).
- `$sourceDescriptions.<name>.<reference>` matches an `operationId` (OpenAPI) or `workflowId` (Arazzo) first, then a Source Description field; an `operationId` named `url` wins over the field (§ 5.9.2).
- Expressions keep the type of the referenced value. Embedded in a string as `{$expr}`, scalars become strings, parsed objects and arrays are serialized as JSON, and values already stored as strings (for example XML) are inserted as-is (§ 5.9.1).
- Header names (`token`) are case-insensitive; other names are case-sensitive (§ 5.9).

## Criterion Object (§ 5.8.11)

| Field       | Rule                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| `context`   | A runtime expression giving the value to test. MUST be set when `type` is set.  |
| `condition` | REQUIRED. The condition.                                                        |
| `type`      | `simple` (default), `regex`, `jsonpath`, `xpath`, or an Expression Type Object. |

Several criteria in one list are ANDed (§ 5.8.11.4.6). A condition that cannot be evaluated (syntax error, wrong context, runtime error) MUST fail, and implementations SHOULD report the error (§ 5.8.11.4.5).

### Simple conditions (§ 5.8.11.4.1)

- Literals: `true`, `false`, `null`, numbers, and strings in single quotes (`'it''s'` escapes a quote) (§ 5.8.11.1).
- Operators: `<`, `<=`, `>`, `>=`, `==`, `!=`, `!`, `&&`, `||`, `()`, `[]` (0-based index), `.` (property) (§ 5.8.11.2).
- String comparisons MUST be case-insensitive. Numeric strings SHOULD be coerced for numeric comparisons. `null` equals only `null`.
- Runtime expressions appear directly: `$statusCode == 200 && $response.body.data != null`.

### Regex, JSONPath and XPath conditions

- Runtime expressions inside the condition MUST be wrapped in `{}`. They are evaluated and substituted first, then the condition is evaluated; quote the whole condition in YAML (§ 5.8.11.3).
- `regex`: passes when the pattern matches the context; a `null` context fails (§ 5.8.11.4.2).
- `jsonpath`: an RFC 9535 query; passes on a non-empty nodelist, fails on an empty one (§ 5.8.11.4.3).
- `xpath`: XPath 3.1 by default; passes on `true`, a non-zero number, a non-empty string or a non-empty node-set, following the version's Effective Boolean Value rules (§ 5.8.11.4.4).

```yaml
successCriteria:
  - condition: $statusCode == 200
  - context: $response.body
    condition: $.items[*]
    type: jsonpath
  - context: $response.header.Content-Type
    condition: "^application/json"
    type: regex
```

## Expression Type Object (§ 5.8.12)

| `type`        | `version` values                                 | Default    |
| ------------- | ------------------------------------------------ | ---------- |
| `jsonpath`    | `rfc9535`, `draft-goessner-dispatch-jsonpath-00` | `rfc9535`  |
| `xpath`       | `xpath-31`, `xpath-30`, `xpath-20`, `xpath-10`   | `xpath-31` |
| `jsonpointer` | `rfc6901`                                        | `rfc6901`  |

Use it only to pin an older JSONPath or XPath; implementations MUST apply that version's semantics.

## Selector Object (§ 5.8.13)

Picks a value out of structured data, for outputs, parameter values or payloads. `context` (a runtime expression that MUST evaluate to structured data), `selector` and `type` are all REQUIRED.

```yaml
outputs:
  userEmail:
    context: $response.body
    selector: $.user.profile.email
    type: jsonpath
```

## Request Body Object (§ 5.8.14)

| Field          | Rule                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `contentType`  | The request `Content-Type`; when omitted, use the operation's.                                                    |
| `payload`      | Literal, runtime expressions or Selector Objects, evaluated before the call. Non-JSON media types go in a string. |
| `replacements` | Payload Replacement Objects applied to the payload.                                                               |

## Payload Replacement Object (§ 5.8.15)

| Field                | Rule                                                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`             | REQUIRED. Location in the payload.                                                                                                             |
| `targetSelectorType` | `jsonpath`, `xpath`, `jsonpointer` or an Expression Type Object. When omitted: JSON Pointer for `application/json`, XPath for XML media types. |
| `value`              | REQUIRED. Constant, runtime expression or Selector Object.                                                                                     |

```yaml
requestBody:
  contentType: application/json
  payload:
    petId: 0
    quantity: 1
  replacements:
    - target: /petId
      value: $steps.findPet.outputs.petId
```
