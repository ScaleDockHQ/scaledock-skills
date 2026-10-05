# Versions and upgrades

Read this when choosing the `openapi` value, reading a description written for an older line, upgrading, or deciding what to do with OpenAPI 3.3. Sources: OAS 3.2.1, 3.1.2 and 3.0.4, the OpenAPI (Swagger) 2.0 text, the OAS 3.2.0 and 3.2.1 release notes, the OAI upgrade guides for 3.0 to 3.1 and 3.1 to 3.2, the OAI index of versions and schema iterations, the Extension Registry, and the `v3.3-dev` branch text, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line        | Status    | Revision                               | Posture | Summary                                                                                  |
| ------------- | ----------- | --------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `3.3-preview` | OpenAPI 3.3 | preview   | `v3.3-dev` commit aa2f6c0 (2026-09-24) | track   | Development line; Path Item `security` so far. No schema, no release date.               |
| `3.2`         | OpenAPI 3.2 | current   | 3.2.1 (2026-09-10)                     |         | The default target: nested tags, `query`, streaming media types, device authorization.   |
| `3.1`         | OpenAPI 3.1 | supported | 3.1.2 (2025-09-19)                     |         | JSON Schema 2020-12 alignment and webhooks. Use for consumers that cannot read 3.2 yet.  |
| `3.0`         | OpenAPI 3.0 | supported | 3.0.4 (2024-10-24)                     |         | First OAI version: servers, components, request bodies. Use for consumers stuck on 3.0.  |
| `2.0`         | Swagger 2.0 | legacy    | 2.0 (2014-09-08)                       |         | The Swagger Specification, donated to the OAI on 2015-12-31. Read and upgrade from only. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Published versions, from the OAI index and each text's revision history (Appendix A):

| Version | Date       | Notes                                      |
| ------- | ---------- | ------------------------------------------ |
| 3.2.1   | 2026-09-10 | Patch: text corrections only               |
| 3.2.0   | 2025-09-19 | Minor release                              |
| 3.1.2   | 2025-09-19 | Patch                                      |
| 3.1.1   | 2024-10-24 | Patch                                      |
| 3.1.0   | 2021-02-15 | Minor release                              |
| 3.0.4   | 2024-10-24 | Patch                                      |
| 3.0.3   | 2020-02-20 | Patch                                      |
| 3.0.0   | 2017-07-26 | First release of the OpenAPI Specification |
| 2.0     | 2014-09-08 | Release of Swagger 2.0 (`swagger: "2.0"`)  |

## Which version to use

- Default to OpenAPI 3.2 at the latest patch, `openapi: 3.2.1`. `major.minor` designates the feature set; patch versions fix or clarify the text, and tooling SHOULD NOT distinguish them (3.2.1 § 2.1).
- Target OpenAPI 3.1 for a named consumer that cannot read 3.2 yet, and carry 3.2 information through the registered `x-oai-*` fallbacks ([Writing for 3.1 consumers](#writing-for-31-consumers)).
- Target OpenAPI 3.0 only for a named consumer that cannot read 3.1. Write Schema Objects in the 3.0 subset (`nullable`, boolean `exclusiveMinimum`), and use none of the 3.1 or 3.2 fields.
- Treat a Swagger 2.0 document (`swagger: "2.0"`) as input to an upgrade. Never write a new one.
- Never emit OpenAPI 3.3 ([Preview: OpenAPI 3.3](#preview-openapi-33)).
- Cite the section of the version the document targets. OAS 3.0.4 lists the objects under § 4.7 and extensions in § 4.8; OAS 3.1.2 under § 4.8 and extensions in § 4.9; OAS 3.2.1 under § 4 (for example Operation Object § 4.10, Security Scheme Object § 4.27) and extensions in § 5; Swagger 2.0 under § 6.4.
- Pick the validation schema from the `openapi` (or `swagger`) field ([`validation.md`](validation.md)). Each minor's schema rejects documents of other minors by its version pattern.

## What changed

### OpenAPI 3.2

From the 3.2.0 release notes, with the 3.2.1 section that defines each field. The OAI upgrade guide states that 3.2 introduces no breaking changes for 3.1 documents; a minor version may still include a low-impact incompatible change (3.2.1 § 2.1).

| Area              | Change                                                                                                                                                         | Section          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tags              | `summary`, `parent` (nesting) and `kind` on the Tag Object; a Tag Kind registry for `kind` values                                                              | § 4.22           |
| HTTP methods      | `query` operation; `additionalOperations` map for other methods (never for a method that has its own field)                                                    | § 4.9.1          |
| Document identity | `$self` as the document's URI and base URI                                                                                                                     | § 4.1.1          |
| Streaming         | Sequential media types such as `text/event-stream`, `application/jsonl` and `application/json-seq`; `itemSchema` describes each item                           | § 4.14           |
| Parameters        | `in: querystring` for the whole query string, described with `content`                                                                                         | § 4.12.1         |
| Cookies           | `style: cookie`                                                                                                                                                | § 4.12.3         |
| Multipart         | `prefixEncoding` and `itemEncoding` as alternatives to `encoding`                                                                                              | § 4.14.1         |
| XML               | `nodeType`; `attribute: true` and `wrapped: true` deprecated in its favour                                                                                     | § 4.26           |
| Examples          | `dataValue` and `serializedValue` on the Example Object                                                                                                        | § 4.19           |
| Security          | OAuth 2.0 device authorization flow (`deviceAuthorization`, `deviceAuthorizationUrl`), `oauth2MetadataUrl`, `deprecated` on schemes, schemes referenced by URI | § 4.27 to § 4.30 |
| Servers           | `name` on the Server Object                                                                                                                                    | § 4.5            |
| Discriminator     | optional `propertyName`, `defaultMapping`                                                                                                                      | § 4.25           |
| Responses         | `description` optional; `summary` added                                                                                                                        | § 4.17           |
| Components        | `mediaTypes` for reusable Media Type Objects                                                                                                                   | § 4.7.1          |

The 3.2.1 release notes list no significant changes, only text corrections: the Style Examples table, prohibited `in`/`style`/`explode` combinations (for example `in: cookie, style: form, explode: false` with arrays or objects), Encoding Object usage, path matching when a template value contains `/`, and an ABNF for `encoding/<name>/contentType`. It also cites RFC 10008 for the QUERY method (§ 4.9.1), where 3.2.0 cited the IETF draft.

### OpenAPI 3.1

From OAS 3.1.2 and the OAI 3.0 to 3.1 upgrade guide. The guide says 3.1 has breaking changes, limited to the Schema Object, made to reach full compatibility with JSON Schema Draft 2020-12.

- The Schema Object is a superset of JSON Schema Draft 2020-12, and the empty schema can be written as `true` (§ 4.8.24). OAS 3.0 used an extended subset of JSON Schema Wright-00 (3.0.4 § 4.7.24).
- `$schema` in a Schema Object, and `jsonSchemaDialect` on the OpenAPI Object, select the dialect; the default is the OAS dialect `https://spec.openapis.org/oas/3.1/dialect/base` (§ 4.8.24.1, § 4.8.24.5, § 4.8.1.1).
- `nullable` is gone; use `type` arrays with `"null"`. `exclusiveMinimum` and `exclusiveMaximum` take numbers instead of booleans, and the schema `example` keyword gives way to `examples` (upgrade guide).
- Binary data is described with `contentMediaType` and `contentEncoding`, or by omitting the schema for raw binary, instead of `format: binary` and `format: byte` (§ 4.4.2, upgrade guide).
- `webhooks` on the OpenAPI Object describes requests the API provider initiates (§ 4.8.1.1).
- `paths` is no longer REQUIRED; an OAD MUST contain at least one of `paths`, `components` or `webhooks` (§ 3.1, § 4.8.1.1).
- The License Object takes an SPDX `identifier`, mutually exclusive with `url` (§ 4.8.4.1).
- Security schemes add `type: mutualTLS` (§ 4.8.27).
- Reference Objects may carry `summary` and `description` (§ 4.8.23).

### OpenAPI 3.0

From OAS 3.0.4, against the Swagger 2.0 text.

- `openapi` replaces `swagger` as the version field (3.0.4 § 4.7.1.1, 2.0 § 6.4.1.1).
- `servers`, an array of Server Objects with URL templates and variables, replaces `host`, `basePath` and `schemes`; with no `servers` the default URL is `/` (§ 4.7.1.1, § 4.7.5).
- `components` holds reusable `schemas`, `responses`, `parameters`, `examples`, `requestBodies`, `headers`, `securitySchemes`, `links` and `callbacks`, replacing the top-level `definitions`, `parameters`, `responses` and `securityDefinitions`; component keys match `^[a-zA-Z0-9\.\-_]+$` (§ 4.7.7).
- The Request Body Object replaces `in: body` and `in: formData` parameters; its `content` maps media types to Media Type Objects (§ 4.7.13, § 4.7.14). Parameter `in` is one of `query`, `header`, `path` or `cookie` (§ 4.7.12.1).
- Media Type Objects in `content` replace the global and per-operation `consumes` and `produces` lists, and Response Objects describe their bodies through `content` (§ 4.7.14, § 4.7.17).
- `style` and `explode` replace `collectionFormat`: `form` replaces `csv` and `multi`, `spaceDelimited` replaces `ssv`, `pipeDelimited` replaces `pipes` (§ 4.7.12.3).
- Security scheme types are `apiKey`, `http`, `oauth2` and `openIdConnect`; OAuth 2.0 flows sit in an OAuth Flows Object with `implicit`, `password`, `clientCredentials` and `authorizationCode` (§ 4.7.27, § 4.7.28).
- Callbacks and Links are new (§ 4.7.18, § 4.7.20). The Schema Object adds `nullable`, `oneOf`, `anyOf`, `not` and `discriminator` as an object (§ 4.7.24, § 4.7.25).

### Swagger 2.0

The legacy line. Its root is the Swagger Object with `swagger: "2.0"`, `host`, `basePath`, `schemes`, `consumes`, `produces`, `paths`, `definitions`, `parameters`, `responses` and `securityDefinitions` (2.0 § 6.4.1.1). Parameters are `in` one of `query`, `header`, `path`, `formData` or `body` (§ 6.4.9). Security schemes are `basic`, `apiKey` or `oauth2` with one `flow` of `implicit`, `password`, `application` or `accessCode` (§ 6.4.24).

## Upgrading

Keep the API itself unchanged during every upgrade: an upgraded document that validates but describes different operations is a regression. Upgrade one line at a time, validating in between.

### 2.0 to 3.0

The OAI publishes no upgrade guide for this step; these steps map the Swagger 2.0 fields to their OAS 3.0.4 replacements. The OAI 3.0 to 3.1 guide points to the `swagger2openapi` converter for this step; review its output against the list below.

1. Replace `swagger: "2.0"` with `openapi: 3.0.4`.
2. Replace `host`, `basePath` and `schemes` with one `servers` entry per scheme, for example `url: https://api.example.com/v1` (3.0.4 § 4.7.5).
3. Move `definitions` to `components.schemas`, `parameters` to `components.parameters`, `responses` to `components.responses` and `securityDefinitions` to `components.securitySchemes`, and rewrite every `$ref` from `#/definitions/X` to `#/components/schemas/X` (§ 4.7.7).
4. Replace each `in: body` parameter with a `requestBody` whose `content` has one entry per media type from `consumes`, and each set of `in: formData` parameters with one `requestBody` whose `application/x-www-form-urlencoded` or `multipart/form-data` schema lists them as properties (§ 4.7.13, § 4.7.14). Describe `type: file` as a binary string (§ 4.7.14.3).
5. Wrap every response `schema` in `content`, with one entry per media type from `produces`, and move response `examples` into the Media Type Objects (§ 4.7.17, § 4.7.14).
6. Move non-body parameter `type`, `format`, `items` and `enum` into a `schema`, and replace `collectionFormat` with `style` and `explode` (§ 4.7.12.2.2, § 4.7.12.3).
7. Rewrite security schemes: `type: basic` becomes `type: http` with `scheme: basic`; each OAuth 2.0 scheme gets a `flows` object, with `application` renamed `clientCredentials` and `accessCode` renamed `authorizationCode` (§ 4.7.27, § 4.7.28).
8. Rename `x-` extensions only if a native 3.0 field now carries the same meaning.
9. Validate against the 3.0 schema ([`validation.md`](validation.md)).

### 3.0 to 3.1

From the OAI upgrade guide, with the OAS 3.1.2 sections.

1. Change `openapi` to a 3.1 version, for example `openapi: 3.1.2`.
2. Replace `nullable: true` with a `type` array that includes `"null"`, for example `type: [string, "null"]` (§ 4.8.24).
3. Replace boolean `exclusiveMinimum`/`exclusiveMaximum` with the numeric bound, and drop the sibling `minimum`/`maximum` it modified.
4. Replace the schema `example` keyword with `examples` as an array.
5. Rewrite file uploads: omit the schema (or `format: binary`) for raw binary bodies, use `contentEncoding: base64` for encoded ones, and `contentMediaType` for multipart parts (§ 4.4.2).
6. Optionally declare `$schema` on external schema files, and adopt `webhooks`, `license.identifier`, `mutualTLS` and Reference Object `summary`/`description` where they fit (§ 4.8.1.1, § 4.8.4.1, § 4.8.27, § 4.8.23).
7. Validate against the 3.1 schema, using `schema-base` to check Schema Objects too ([`validation.md`](validation.md)).

### 3.1 to 3.2

From the OAI upgrade guide.

1. Change `openapi` to a 3.2 version, for example `openapi: 3.2.1`.
2. Replace `x-displayName` on tags with `summary`, and `x-tagGroups` with `parent` plus `kind: nav` (guide examples).
3. Replace the `x-oai-*` fallbacks in [Writing for 3.1 consumers](#writing-for-31-consumers) with the native fields.
4. Add `name` to servers, `defaultMapping` to discriminators that should fall back to a default schema, and `dataValue`/`serializedValue` to examples, as needed.
5. Consider the device authorization flow for limited-input clients, and sequential media types for streaming responses.
6. Validate with 3.2 tooling against the 3.2 schema ([`validation.md`](validation.md)).

### Swagger 2.0 to 3.2

Run the three upgrades above in order, validating after each one: 2.0 to 3.0, then 3.0 to 3.1, then 3.1 to 3.2. Skipping the intermediate validations hides which step changed the meaning of the description.

### Writing for 3.1 consumers

When a consumer cannot read 3.2, target 3.1 and carry 3.2 information through extensions registered for exactly that purpose. The Extension Registry lists these fallbacks "used when targeting OpenAPI versions prior to 3.2":

| 3.2 field                        | Fallback                                     | Allowed on                                                       |
| -------------------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `$self`                          | `x-oai-$self`                                | OpenAPI Object                                                   |
| `additionalOperations`           | `x-oai-additionalOperations`                 | Path Item Object                                                 |
| `dataValue`, `serializedValue`   | `x-oai-dataValue`, `x-oai-serializedValue`   | Example Object                                                   |
| `deprecated` on a scheme         | `x-oai-deprecated`                           | Security Scheme Object                                           |
| `deviceAuthorization` flow       | `x-oai-deviceAuthorization`                  | OAuth Flows Object                                               |
| `deviceAuthorizationUrl`         | `x-oai-deviceAuthorizationUrl`               | OAuth Flow Object                                                |
| `itemSchema`                     | `x-oai-itemSchema`                           | Media Type Object                                                |
| `prefixEncoding`, `itemEncoding` | `x-oai-prefixEncoding`, `x-oai-itemEncoding` | Media Type Object (and Encoding Object for `x-oai-itemEncoding`) |
| nested `encoding`                | `x-oai-encoding`                             | Encoding Object                                                  |
| Server `name`                    | `x-oai-name`                                 | Server Object                                                    |
| Response `summary`               | `x-oai-summary`                              | Response Object                                                  |

The registry has no fallback for `oauth2MetadataUrl`, Tag `summary`/`parent`/`kind`, the `query` operation, `querystring` parameters or URI-referenced security schemes. On a 3.1 target, inline a URI-referenced scheme into `components.securitySchemes`, and carry anything else in your own namespace ([`registries.md`](registries.md)), never as a new `x-oai-*` name.

## Preview: OpenAPI 3.3

`3.3-preview` is the `v3.3-dev` branch of `OAI/OpenAPI-Specification`, pinned at commit aa2f6c0 (2026-09-24). Its text is headed "Version 3.3.0", with release date "TBD", and the OAI index publishes no 3.3 schema. At the pin it adds `security` on the Path Item Object, a 3.3 dialect URI form, and more multipart guidance. The Security Profiles proposal (`type: profile`) is tracked alongside it but is not in the branch text.

- **Posture: track.** Follow it; do not build or name anything that depends on it.
- **Never emit** `openapi: 3.3.x`, a Path Item `security` field, `type: profile`, `profileMetadata` or `securityProfileRequirements`. In 3.2, repeat `security` on each operation instead.
- **Detail:** the change table, the proposal's shape and objections, and what to do today are in [`drafts.md`](drafts.md).
- **When 3.3 ships:** re-pin to the released text on the OAI index, make it current and 3.2 supported, add a "3.2 to 3.3" upgrade section and its schema to [`validation.md`](validation.md), and keep the Security Profiles proposal in [`drafts.md`](drafts.md) until it lands in a text.
