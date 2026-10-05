# Versions and upgrades

Read this when choosing the `$schema` dialect, reading a schema written for an older line, upgrading, or deciding what to do with the IETF draft or the v1 work. Sources: the 2020-12, 2019-09, draft-07 and draft-04 specification texts, the 2020-12, 2019-09, draft-07 and draft-06 release notes, the Specification and Specification Links pages, the meta-schemas, the IETF datatracker entry and -03 text, and the `json-schema-org/json-schema-spec` repository, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                                      | Status    | Revision                                                                      | Posture | Summary                                                                                                  |
| ----------------- | ----------------------------------------- | --------- | ----------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `v1-2026-preview` | JSON Schema v1/2026 (work in progress)    | preview   | `json-schema-spec` `main` at 4f56a99 (2026-09-04); not released               | track   | The org's planned first stable release. Unpublished: its `$schema` URI returns 404.                      |
| `ietf-preview`    | IETF draft-ietf-jsonschema-json-schema-03 | preview   | -03 (2026-08-26), WG Document, expires 2027-02-27                             | track   | IETF jsonschema WG consolidation of 2020-12 Core and Validation; still uses the 2020-12 URIs.            |
| `2020-12`         | JSON Schema 2020-12                       | current   | draft-bhutton-json-schema-01 and -validation-01 (2022-06-16)                  |         | The default target: `prefixItems`, `$dynamicRef`, Unevaluated and split `format` vocabularies, bundling. |
| `2019-09`         | JSON Schema 2019-09                       | supported | draft-handrews-json-schema-02 and -validation-02 (2019-09-17)                 |         | Vocabularies, `$defs`, `$anchor`, `unevaluated*`, `$recursiveRef`. Use for consumers stuck on 2019-09.   |
| `draft-07`        | JSON Schema draft-07                      | legacy    | draft-handrews-json-schema-01 and -validation-01 (2018-03-19)                 |         | `if`/`then`/`else`, `$comment`, `readOnly`/`writeOnly`. `$ref` siblings ignored.                         |
| `draft-06`        | JSON Schema draft-06                      | legacy    | draft-wright-json-schema-01 and -validation-01 (2017-04-21)                   |         | `$id`, numeric `exclusiveMinimum`/`exclusiveMaximum`, `const`, `contains`, `propertyNames`.              |
| `draft-04`        | JSON Schema draft-04                      | legacy    | draft-zyp-json-schema-04 and draft-fge-json-schema-validation-00 (2013-01-31) |         | `id`, boolean exclusive bounds, JSON Reference `$ref`.                                                   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The `$schema` value identifies each line. 2019-09 and later use date-based meta-schema identifiers over `https`; earlier drafts used `http` and a trailing `#` (Specification Links; each meta-schema's own `$schema`):

| Line     | `$schema` value                                |
| -------- | ---------------------------------------------- |
| 2020-12  | `https://json-schema.org/draft/2020-12/schema` |
| 2019-09  | `https://json-schema.org/draft/2019-09/schema` |
| draft-07 | `http://json-schema.org/draft-07/schema#`      |
| draft-06 | `http://json-schema.org/draft-06/schema#`      |
| draft-04 | `http://json-schema.org/draft-04/schema#`      |

Draft 5 is not a line: it was a cleanup of draft-04 and kept the draft-04 meta-schemas, and implementers should not advertise "draft-05" support (Specification Links; Draft-06 Release Notes). OpenAPI 3.0 Schema Objects are an extended subset of that Draft 5 text (Wright-00), while OpenAPI 3.1 Schema Objects are a superset of 2020-12 (OAS 3.1.1, Schema Object).

## Which version to use

- Default to JSON Schema 2020-12 with `"$schema": "https://json-schema.org/draft/2020-12/schema"`. Updated meta-schema URIs dated between releases mean the same syntax and semantics (Core § 8.1.3).
- Target JSON Schema 2019-09 only for a named validator or consumer that cannot read 2020-12; it has `$defs`, `$anchor` and `unevaluated*`, but `items` takes an array for tuples and recursion uses `$recursiveRef`.
- Treat draft-07, draft-06 and draft-04 schemas as input to an upgrade. Never write a new one.
- Inside OpenAPI 3.1 or later, use the OpenAPI dialect, which builds on 2020-12; see the `openapi` skill.
- Never emit a preview `$schema` URI ([Preview: IETF draft-ietf-jsonschema-json-schema-03](#preview-ietf-draft-ietf-jsonschema-json-schema-03), [Preview: JSON Schema v1/2026](#preview-json-schema-v12026)).
- Always set `$schema` at the root: without it the behaviour is implementation-defined (Core § 8.1.1, § 8.1.2.1). Embedded resources without `$schema` use the enclosing resource's dialect (Core § 9.3.2).

## What changed

### JSON Schema 2020-12

From the 2020-12 release notes and the Core and Validation change logs (Core Appendix G, Validation Appendix C):

| Area         | Change                                                                                                                             | Section                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Arrays       | Array form of `items` becomes `prefixItems`; `items` takes over `additionalItems`                                                  | Core § 10.3.1.1, § 10.3.1.2 |
| Recursion    | `$recursiveRef`/`$recursiveAnchor` replaced by `$dynamicRef`/`$dynamicAnchor`; a dynamic anchor is a named fragment like `$anchor` | Core § 8.2.2, § 8.2.3.2     |
| `contains`   | Items that pass `contains` count as evaluated for `unevaluatedItems`                                                               | Core § 10.3.1.3, § 11.2     |
| Vocabularies | `unevaluatedItems`/`unevaluatedProperties` move to their own Unevaluated vocabulary                                                | Core § 11                   |
| `format`     | Split into Format-Annotation (required, default) and Format-Assertion (optional) vocabularies                                      | Validation § 7.1, § 7.2     |
| Bundling     | Compound Schema Documents defined; embedded resources may declare a different `$schema`                                            | Core § 9.3                  |
| Media type   | The `schema` media type parameter removed                                                                                          | Core Appendix G             |
| Annotations  | Unknown keywords collected as annotations                                                                                          | Core § 4.3.1, § 6.5         |
| Regex        | ECMA-262 11th edition; patterns SHOULD support Unicode (`u` flag)                                                                  | Core § 6.4                  |

The -01 revision (16 June 2022) only clarified text and examples; it did not change meta-schemas (Specification Links; Core Appendix G).

### JSON Schema 2019-09

From the 2019-09 release notes:

- Incompatible: `format` is no longer an assertion by default; plain-name fragments move from `$id` to the new `$anchor`; `$id` cannot contain a fragment (except a discouraged empty one).
- Semi-incompatible (old forms still pass the meta-schema): `definitions` becomes `$defs`; `dependencies` splits into `dependentSchemas` and `dependentRequired`.
- `$ref` allows other keywords next to it; `$vocabulary`, `$recursiveRef`/`$recursiveAnchor`, `unevaluatedItems`/`unevaluatedProperties`, `minContains`/`maxContains`, `deprecated` and `contentSchema` are new; formats `duration` and `uuid` are added; `hostname` moves to RFC 1123.
- Standard output formats (flag, basic, detailed, verbose) are recommended.

### JSON Schema draft-07

From the draft-07 release notes: fully backwards-compatible with draft-06 for validation. Added `$comment`, `if`/`then`/`else`, `writeOnly`; moved `readOnly`, `contentMediaType` and `contentEncoding` from Hyper-Schema; added formats `iri`, `iri-reference`, `idn-email`, `idn-hostname`, `relative-json-pointer`, and restored `regex`, `date` and `time`. In draft-07, all other properties in a `$ref` object MUST be ignored (draft-07 Core § 8.3) and `$schema` MUST NOT appear in subschemas (draft-07 Core § 7).

### JSON Schema draft-06

From the draft-06 release notes: `id` becomes `$id`; `$ref` is only a reference where a schema is expected; `exclusiveMinimum` and `exclusiveMaximum` become numbers; `integer` means "zero fractional part", so `1.0` is an integer in draft-06 and later but not in draft-04. Added boolean schemas everywhere, `propertyNames`, `contains`, `const`, `examples`, and formats `uri-reference`, `uri-template` and `json-pointer`.

## Upgrading

Upgrade one line at a time; each step below assumes the previous one.

### draft-04 to draft-06

1. Change `$schema` to `http://json-schema.org/draft-06/schema#`.
2. Rename every `id` keyword to `$id` (draft-06 notes). Only rename schema keywords: a property named `id` inside `properties` is instance data.
3. Replace boolean exclusive bounds: where `"exclusiveMinimum": true` sat next to `"minimum": n`, write `"exclusiveMinimum": n` and drop `minimum`; same for maximum. Drop `false` values (draft-06 notes; draft-04 Validation § 5.1.2, § 5.1.3).
4. Check `"format": "uri"`: keep it only where an absolute URI is required; use `uri-reference` for relative references and fragments (draft-06 notes).
5. Note the `integer` change: `1.0` now passes `"type": "integer"`. The data model does not tell `1.0` from `1` (Core § 4.2.1), so if `1.0` must still fail, check the raw JSON text in the application.
6. Validate against the draft-06 meta-schema.

### draft-06 to draft-07

1. Change `$schema` to `http://json-schema.org/draft-07/schema#`. Nothing else is required; validation outcomes are unchanged (draft-07 notes).
2. Optionally replace `oneOf`/`not` constructions that emulate conditionals with `if`/`then`/`else`, and move maintainer notes from `description` to `$comment`.

### draft-07 to 2019-09

1. Change `$schema` to `https://json-schema.org/draft/2019-09/schema` (note `https` and no `#`).
2. Rename `definitions` to `$defs` and update `$ref` pointers (`#/definitions/x` to `#/$defs/x`).
3. Split `dependencies`: property-array values go to `dependentRequired`, schema values to `dependentSchemas`.
4. Replace `"$id": "#name"` plain-name fragments with `"$anchor": "name"`, and remove any other fragment from `$id`.
5. Review every object that has `$ref` with siblings: draft-07 ignored the siblings, 2019-09 evaluates them. Delete siblings that were never meant to apply, or keep them deliberately.
6. Decide on `format`: if the schema relied on validators asserting `format`, enable assertion in the validator or declare a dialect that requires the format vocabulary, or validate in the application (2019-09 notes).
7. Validate against the 2019-09 meta-schema.

### 2019-09 to 2020-12

1. Change `$schema` to `https://json-schema.org/draft/2020-12/schema`.
2. Rewrite tuples: array-valued `items` becomes `prefixItems`, and `additionalItems` becomes `items` (2020-12 notes). Schema-valued `items` without a tuple stays as is.
3. Replace `"$recursiveAnchor": true` with `"$dynamicAnchor": "<name>"`, and `"$recursiveRef": "#"` with `"$dynamicRef": "#<name>"`, using the same name in every schema that should extend the recursion (2020-12 notes; Core Appendix C).
4. Re-check `contains` with `unevaluatedItems`: items matching `contains` now count as evaluated, so `["a", "b", "ccc"]` may start to pass. Where it must still fail, replace `contains` with `"not": { "items": { "not": <schema> } }` (2020-12 notes).
5. In custom meta-schemas, replace the 2019-09 `format` vocabulary with `format-annotation` or `format-assertion`, and add the Unevaluated vocabulary if the dialect uses `unevaluated*` (Validation § 7.1; Core § 11).
6. Validate against the 2020-12 meta-schema, then run the same positive and negative instances as before: an upgrade that validates but accepts different instances is a regression.

### draft-04 to 2020-12

Apply the four checklists above in order. The changes that alter behaviour most are the exclusive bounds and `integer` (draft-06), sibling keywords of `$ref` becoming active and `format` turning into an annotation (2019-09), and tuple `items` becoming `prefixItems` (2020-12).

## Preview: IETF draft-ietf-jsonschema-json-schema-03

The IETF jsonschema working group adopted the specification as `draft-ietf-jsonschema-json-schema`; revision -03 was published on 2026-08-26, intended status Standards Track (Proposed Standard), datatracker state "I-D Exists" and "WG Document", expiring 2027-02-27. Posture: **track**.

Its change log (Appendix H) consolidates 2020-12 Core and Validation into one document, reorders and renames sections (for example `$schema` is § 4.1.1, applicators § 5, Unevaluated § 6, Validation § 7, `format` § 8), separates "input" from "instance", adds examples and moves annotation implementation advice to an appendix while keeping it "functionally the same". It still uses the 2020-12 vocabulary and meta-schema URIs, so there is no new dialect to name or build. New normative text to watch includes "Keywords MUST NOT modify the input during evaluation" and that a validation keyword MUST NOT accept or reject based on factors other than the schema and the input (-03 § 3.5.3).

Do not cite -03 section numbers as if they were 2020-12, and do not emit anything new from it. Watch the datatracker for -04 and for a change of dialect URI. When it becomes an RFC with its own URIs: add it as current, make 2020-12 supported, and add an upgrade section.

## Preview: JSON Schema v1/2026

The `json-schema-org/json-schema-spec` repository's `main` branch holds the work in progress toward the first stable release, versioned as "v" plus number plus release year, with the example `v1/2026`; schemas for a version stay compatible with later releases of the same version (work-in-progress Core, "Specification Versioning and Compatibility"). The repository says it contains the work in progress, json-schema.org/specification still names 2020-12 as current, there is no GitHub release, and `https://json-schema.org/v1/2026` returns 404 as of 2026-10-05. Posture: **track**.

Breaking changes in the current text, which may still move:

- Implementations MUST refuse to evaluate schemas with keywords they do not know how to process or choose not to process, and an empty schema no longer allows unrecognized keywords.
- Keywords starting with `x-` are implicit annotation keywords, and extension keywords MUST NOT use that prefix.
- `$id` MUST be an absolute IRI without any fragment, even an empty one; IRIs replace URIs.
- `minContains` and `maxContains` move to the applicator vocabulary.
- ADRs in the repository extract `$vocabulary` and output formats for a later proposal process (2024-05-08, accepted) and propose making `format` an assertion (2024-11-02, status proposed).

Do not write `"$schema": "https://json-schema.org/v1/2026"`. Writing 2020-12 schemas without unknown keywords and with absolute, fragment-free `$id`s keeps the move cheap. When v1 ships: add it as current, make 2020-12 supported, and add an upgrade section.
