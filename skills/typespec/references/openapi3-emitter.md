# The @typespec/openapi3 emitter

Read this when configuring OpenAPI output or checking it. Sources: the `@typespec/openapi3` 1.16.0 README and emitter options page, the emitter source (`dist/src/lib.js` and `dist/src/openapi.js` in 1.16.0), the OpenAPI v3 emitter guide, the `@typespec/openapi` decorators page, the `@typespec/openapi3` changelog, and OpenAPI3 to TypeSpec.

## Run it

```bash
tsp compile . --emit=@typespec/openapi3
```

Or list it under `emit` in `tspconfig.yaml` and set options under `options."@typespec/openapi3"`. Its 1.16.0 `package.json` declares peer dependencies on `@typespec/compiler`, `http`, `openapi` and `json-schema` 1.16.0, and on `versioning`, `sse`, `events` and `streams` 0.86.0.

## Which OpenAPI versions it emits

- `openapi-versions` is an array of unique values from `3.0.0`, `3.1.0` and `3.2.0`, with at least one entry. The default is `["3.0.0"]`.
- With more than one version, each is written to a subdirectory named after the OpenAPI version.
- The README title still says "OpenAPI 3.0 and OpenAPI 3.1", but the 1.16.0 options and changelog include 3.2.0. The emitter guide describes 3.0 behavior; output for later versions can differ.

Version-specific behavior recorded in the changelog:

| Change                                                                                                   | Version |
| -------------------------------------------------------------------------------------------------------- | ------- |
| OpenAPI 3.2.0 emission (#8828), and server-sent events for 3.2 (#8888)                                   | 1.6.0   |
| `discriminator.defaultMapping` for a default union variant in 3.2.0 (#9262)                              | 1.8.0   |
| `openapi-versions` exposes 3.1.0 and 3.2.0 (#9584)                                                       | 1.9.0   |
| Nested tags through `parent` in `@tagMetadata` for 3.2 (#9577)                                           | 1.10.0  |
| Tag `summary` and `kind`: native fields in 3.2, `x-oai-summary` and `x-oai-kind` in 3.0 and 3.1 (#10769) | 1.13.0  |
| No `allOf` wrapper around `$ref` with sibling keywords in 3.1 and 3.2 (#11185)                           | 1.14.0  |

## Options (1.16.0)

| Option                            | Values and default                                                                                                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi-versions`                | See above.                                                                                                                                                                         |
| `file-type`                       | `yaml`, `json`, or both as an array. Default `yaml`, or inferred from `output-file`.                                                                                               |
| `output-file`                     | Default `openapi.{service-name-if-multiple}.{version}.{file-type}`; gives `openapi.yaml` for one unversioned service and `openapi.v1.yaml`, `openapi.v2.yaml` for a versioned one. |
| `emitter-output-dir`              | Default `{output-dir}/@typespec/openapi3`.                                                                                                                                         |
| `new-line`                        | `lf` (default) or `crlf`.                                                                                                                                                          |
| `omit-unreachable-types`          | Emit only types an operation references. Default: all types in the service namespace.                                                                                              |
| `include-x-typespec-name`         | `never` (default) or `inline-only`; for debugging only.                                                                                                                            |
| `safeint-strategy`                | `int64` (default) or `double-int`.                                                                                                                                                 |
| `seal-object-schemas`             | Default `false`. When true, objects default to `additionalProperties: false` on 3.0 and `unevaluatedProperties: false` on 3.1.                                                     |
| `experimental-parameter-examples` | `data` or `serialized`; experimental.                                                                                                                                              |
| `operation-id-strategy`           | `parent-container` (default, joined with `_`), `fqn`, `explicit-only`, or `{ kind, separator }`.                                                                                   |
| `enum-strategy`                   | `default` (`enum`) or `annotated` (`oneOf` of `const` with titles and descriptions); `annotated` needs 3.1.0 or later and falls back with a warning on 3.0.0.                      |

## TypeSpec to OpenAPI mapping (OpenAPI v3 emitter guide)

| TypeSpec                                             | OpenAPI                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `@server(url, description)`, repeatable              | `servers` entries.                                                                    |
| `@service(#{ title })`                               | `info.title` (Getting started).                                                       |
| Verb decorator, or inferred                          | Operation method.                                                                     |
| `@route` on namespace, interface and operation       | Combined path.                                                                        |
| Doc comment or `@doc`; `@summary`                    | `description`; `summary`.                                                             |
| `@operationId("x")`                                  | `operationId`. Default: the operation name, or the interface name and operation name. |
| `@tag("Users")` on operation, interface or namespace | Combined `tags`.                                                                      |
| `#deprecated "..."`                                  | `deprecated: true`.                                                                   |
| `@externalDocs(url, description)`                    | `externalDocs`.                                                                       |
| `@extension("x-name", value)`                        | A specification extension on the operation, schema or other construct.                |
| `@useRef("common.json#/components/schemas/Sku")`     | That external `$ref` instead of the model's schema.                                   |
| `@useAuth(...)`                                      | `securitySchemes` and security requirements.                                          |

## @typespec/openapi decorators

| Decorator                                               | Use                                                                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `@defaultResponse`                                      | Mark a response model as the `default` response; unlike `@error`, it need not be an error.                                                    |
| `@extension(key, value)`                                | Add an `x-` extension.                                                                                                                        |
| `@externalDocs(url, description?)`                      | External documentation.                                                                                                                       |
| `@info(#{ ... })`                                       | Extra `info` fields.                                                                                                                          |
| `@operationId(id)`                                      | Set the operation ID.                                                                                                                         |
| `@tagMetadata(name, #{ ... })` or `@tagMetadata([...])` | Tag `description`, `externalDocs`, `x-` extensions, `parent`, `summary` and `kind`, on the service namespace. The array form keeps tag order. |

Import with `import "@typespec/openapi";` and `using OpenAPI;`. `@oneOf` and `@useRef` live in `@typespec/openapi3` (`TypeSpec.OpenAPI` namespace).

## Converting OpenAPI 3 to TypeSpec

```bash
tsp-openapi3 ./openapi.yaml --output-dir ./tsp-output --namespace MyService
```

The conversion is meant as a one-time start; its output can change between versions without counting as a breaking change. Schemas become models or scalars, component parameters become `@path`, `@query` or `@header` properties, and each path operation becomes an operation with a generated response model. Operations are not grouped into interfaces.

## Checking the output

1. Compile with `--warn-as-error`.
2. Validate every emitted file against the official OAS JSON Schema for its `openapi` value. The `openapi` skill lists the schema URLs: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`.
3. Diff the output against the previous commit to catch unintended changes to operation IDs, schema names and security.
