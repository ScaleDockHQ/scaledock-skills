# standard-schema

An agent skill for Standard Schema: accept or implement validators through the shared `~standard` interface, and generate JSON Schema with Standard JSON Schema.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill standard-schema
```

Then ask your agent to "accept any Standard Schema validator in this function" or "make our schema library Standard Schema compliant".

## What it covers

- The `StandardTypedV1`, `StandardSchemaV1` and `StandardJSONSchemaV1` interfaces in `@standard-schema/spec` 1.1.0.
- Consuming schemas: the `{ value }` or `{ issues }` result, sync-only handling, issue paths, and type inference.
- Implementing the interface in a schema library.
- Generating JSON Schema for the `draft-2020-12`, `draft-07` and `openapi-3.0` targets.
- Which libraries implement each spec, and from which version.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Standard Schema specification](https://standardschema.dev/schema): Released, v1 in `@standard-schema/spec` 1.1.0.
- [Standard JSON Schema specification](https://standardschema.dev/json-schema): Released, v1 in `@standard-schema/spec` 1.1.0.
- [Project overview](https://standardschema.dev/): Released, 1.1.0.
- [Source at tag v1.1.0](https://github.com/standard-schema/standard-schema/tree/v1.1.0/packages/spec): tag v1.1.0.
- [npm registry entry](https://registry.npmjs.org/@standard-schema/spec): 1.1.0, published 2025-12-15.

## License

MIT
