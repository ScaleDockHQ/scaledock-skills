# Versions and upgrades

Read this when choosing which `@standard-schema/spec` release to depend on, reading code written against 1.0.0, or checking whether a newer interface version exists. Sources: the `@standard-schema/spec` source at tags v1.0.0 and v1.1.0, the v1.1.0 release, the npm registry entry, and the Standard Schema and Standard JSON Schema pages, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id  | Line               | Status  | Revision                                   | Posture | Summary                                                                                      |
| --- | ------------------ | ------- | ------------------------------------------ | ------- | -------------------------------------------------------------------------------------------- |
| `1` | Standard Schema v1 | current | `@standard-schema/spec` 1.1.0 (2025-12-15) |         | The only line: `~standard` with `version: 1`, `StandardSchemaV1` and `StandardJSONSchemaV1`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The line is the interface version, the `version: 1` literal in `~standard` (`StandardTypedV1.Props`), and the `V1` suffix of every interface name. The npm package version is separate: packages 1.0.0 and 1.1.0 both publish the v1 interfaces.

## Which version to use

- Use v1, from `@standard-schema/spec` 1.1.0 or by copying its `src/index.ts`.
- Depend on 1.1.0 or later when you use `StandardJSONSchemaV1`, `StandardTypedV1` or the `options` argument of `validate`; 1.0.0 does not have them.
- Code written against 1.0.0 keeps working with 1.1.0; there is nothing to downgrade to.

## What changed

### Standard Schema v1

Within the line, comparing `packages/spec/src/index.ts` at v1.0.0 and v1.1.0:

- 1.1.0 (2025-12-15) adds the Standard JSON Schema specification as `StandardJSONSchemaV1`, with `~standard.jsonSchema.input` and `.output` (v1.1.0 release; `StandardJSONSchemaV1.Converter`).
- 1.1.0 adds `StandardTypedV1`, the shared base with `version`, `vendor` and `types`, which `StandardSchemaV1.Props` and `StandardJSONSchemaV1.Props` now extend (`StandardTypedV1.Props`).
- 1.1.0 adds an optional second argument to `validate`, `options?: StandardSchemaV1.Options`, whose `libraryOptions` carries vendor-specific parameters (`StandardSchemaV1.Props.validate`, `StandardSchemaV1.Options`).
- `InferInput` and `InferOutput` accept any `StandardTypedV1` in 1.1.0, not only `StandardSchemaV1` (`StandardTypedV1.InferInput`, `StandardTypedV1.InferOutput`).
- 1.0.0 (2025-01-27) was the first stable release, after 1.0.0-beta.0 to beta.4 and 1.0.0-rc.0 (npm registry). It defined `StandardSchemaV1` with `version`, `vendor`, `validate(value)` and `types`, and the `Result`, `Issue` and `PathSegment` shapes that 1.1.0 keeps.

## Upgrading

### 1.0.0 to 1.1.0 (within v1)

1. Change the version marker: bump `@standard-schema/spec` to 1.1.0, or replace copied types with the v1.1.0 `src/index.ts`. `version: 1` in `~standard` stays the same.
2. Replace removed or renamed fields: none were removed or renamed. A `validate` implementation may now accept the optional `options` argument.
3. Validate: type-check implementations with `satisfies StandardSchemaV1<Input, Output>` and consumers against the official examples at tag v1.1.0.
4. Keep behaviour unchanged: results are still `{ value }` or `{ issues }`, and consumers that never pass `options` behave as before.

## Preview

No preview is listed, and there is no other line. On 2026-10-05 the npm registry has only the `latest` dist-tag, at 1.1.0, and no interface version other than v1 is published; the repository's releases list nothing after v1.1.0. When a v2 interface is published as a pre-release, add it here as `2-preview` with posture track.
