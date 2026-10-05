# Versions and upgrades

Read this when choosing the compiler version, reading a project written for a pre-1.0 compiler, upgrading, or deciding whether to use a `next` build. Sources: the TypeSpec 1.0.0, 1.0.0-rc.0 and 0.67 release notes, the TypeSpec 1.0 GA blog post, the Cadl to TypeSpec migration notes, the compiler and openapi3 changelogs, and the npm registry entries for `@typespec/compiler` and `@typespec/versioning`, listed in [Sources](../SKILL.md#sources). TypeSpec documentation has no numbered sections, so citations name the page and heading.

## Version lines

| Id    | Line         | Status  | Revision                                   | Posture | Summary                                                                           |
| ----- | ------------ | ------- | ------------------------------------------ | ------- | --------------------------------------------------------------------------------- |
| `1.x` | TypeSpec 1.x | current | 1.16.0 (2026-09-09)                        |         | The default target. The compiler, http, openapi and openapi3 packages are stable. |
| `0.x` | TypeSpec 0.x | legacy  | 0.67.2 (2025-03-24), the last 0.x compiler |         | Pre-1.0 compilers, including the Cadl releases. Read and upgrade from only.       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The line is the major version of `@typespec/compiler`. 1.0.0 was published on 2025-05-06, after 1.0.0-rc.0 (2025-04-02) and 1.0.0-rc.1 (2025-04-22) (npm registry). 1.x minors add features; the openapi3 additions per minor, such as OpenAPI 3.2.0 emission from 1.6.0, are listed in [`openapi3-emitter.md`](openapi3-emitter.md).

Not every package follows the compiler. The 1.0 GA blog post lists `@typespec/compiler`, `@typespec/http`, `@typespec/openapi`, `@typespec/openapi3`, `@typespec/json-schema` and the VS Code extension as 1.0 components, and keeps `@typespec/versioning`, `@typespec/rest`, `@typespec/events`, `@typespec/sse`, `@typespec/streams`, `@typespec/xml`, `@typespec/protobuf` and the client and server emitters in preview. `@typespec/versioning` is at 0.86.0 alongside compiler 1.16.0; it is part of the 1.x line, not a line of its own, and its draft posture is build: use it, pin it exactly, and read its changelog on every upgrade, because a 0.x package can break in a minor release.

## Which version to use

- Default to the latest 1.x release of `@typespec/compiler` and the matching 1.x versions of `http`, `openapi` and `openapi3`, as their peer dependencies require ([`openapi3-emitter.md`](openapi3-emitter.md)).
- Keep a project's pinned 1.x versions unless the user asks to upgrade; read the changelogs between the two versions before changing them.
- Treat a project on a 0.x compiler, or with `.cadl` files or `cadl-project.yaml`, as input to an upgrade.
- Do not depend on `next` builds ([Preview](#preview)).

## What changed

### TypeSpec 1.x

From the 1.0.0-rc.0 and 1.0.0 release notes:

- `@typespec/compiler`: the `@typespec/compiler/emitter-framework` export is removed in favour of `@typespec/asset-emitter`; `context`, `sym`, `prop`, `property` and `scenario` are reserved keywords (1.0.0-rc.0, Breaking Changes).
- `@typespec/http`: implicit multipart bodies are removed; use `@multipartBody` with `HttpPart<T>` (1.0.0-rc.0, Breaking Changes).
- `@typespec/http`: `@patch` no longer applies implicit optionality. Use `MergePatchUpdate<T>` for JSON Merge Patch, or `@patch(#{ implicitOptionality: true })` for the old behaviour (1.0.0, Breaking Changes).
- `@service` no longer accepts a `version` option; use `@OpenAPI.info` from `@typespec/openapi` (1.0.0, Bug Fixes).
- Typekits moved from `@typespec/compiler/experimental/typekit` to `@typespec/compiler/typekit` (1.0.0, Features).

### TypeSpec 0.x

The pre-1.0 releases. 0.67 was the last before 1.0.0-rc.0 and removed most deprecated features (0.67 release notes, Breaking Changes):

- Node.js 20 became the minimum for all packages.
- `@deprecated` became the `#deprecated` directive; `@knownValues` was removed in favour of a union with a `string` variant; `@projectedName` became `@encodedName`; `@discriminator` on a union became `@discriminated`.
- Model expressions and tuples where values are expected became errors; use object values `#{}` and array values `#[]`, for example `@service(#{ title: "My service" })`.
- `@service({ version })` was removed; use `@OpenAPI.info(#{ version })` or the versioning library.
- `@header` and `@query` lost `format` in favour of `explode`, and `@route(..., { shared: true })` became `@sharedRoute`.
- The `output-path` configuration became `output-dir`, `cadlMain` in `package.json` became `exports["."].tsp`, and `.cadl` files no longer compile.
- Default content types changed: `bytes` defaults to `application/octet-stream`, other scalars to `text/plain`.

Earlier, the 2023-03-13 release renamed Cadl to TypeSpec: `@cadl-lang/*` packages became `@typespec/*`, `.cadl` became `.tsp`, `cadl-project.yaml` became `tspconfig.yaml`, and `npx cadl` became `npx tsp`; `@typespec/migrate` automates the rename (Cadl to TypeSpec migration notes).

## Upgrading

### 0.x to 1.x

1. Change the version marker: set `@typespec/compiler`, `http`, `openapi` and `openapi3` to the same 1.x version in `package.json`, and the preview libraries (such as `@typespec/versioning`) to the versions those packages declare as peers. For a Cadl project, run `npx @typespec/migrate` first.
2. Replace removed or renamed constructs with the lists above: `#deprecated`, unions instead of `@knownValues`, `@encodedName`, `@discriminated`, `#{}` and `#[]` values, `@OpenAPI.info` instead of `@service({ version })`, `explode`, `@sharedRoute`, `output-dir`, `@multipartBody` with `HttpPart<T>`, and `MergePatchUpdate<T>` or `implicitOptionality` on `@patch` operations.
3. Validate: `tsp compile . --warn-as-error` exits with code zero, and each emitted OpenAPI file validates against the official schema for its version.
4. Keep behaviour unchanged: diff the emitted OpenAPI before and after the upgrade. Expect and review differences in content types and in `@patch` request bodies; any other difference is a regression to fix in the TypeSpec source.

### Within 1.x

1. Bump the 1.x packages together, and the 0.x preview libraries to the matching versions.
2. Read the compiler and openapi3 changelogs between the two versions for breaking changes in preview libraries and for new emitter behaviour.
3. Compile with `--warn-as-error` and validate the emitted files.
4. Diff the emitted OpenAPI against the previous output, and keep only intended changes.

## Preview

No preview line is listed. On 2026-10-05 the npm `next` dist-tag of `@typespec/compiler` points to 1.17.0-dev.10 (published 2026-09-21), a development build of the next 1.x minor, not a new major line (npm registry). No 2.x version is published. Do not depend on `-dev` builds; wait for the 1.17.0 release. When a 2.0 pre-release appears, add it here as `2.x-preview` with posture track.
