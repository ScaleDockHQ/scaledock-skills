# typespec

An agent skill for TypeSpec 1.x: design HTTP APIs in the TypeSpec language and emit OpenAPI 3.0, 3.1 or 3.2, with upgrades from pre-1.0 TypeSpec and Cadl.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill typespec
```

Then ask your agent to "model this API in TypeSpec and emit OpenAPI 3.2" or "add a v2 to our TypeSpec service".

## What it covers

- Language basics: namespaces, models, scalars, enums, unions, templates, operations and interfaces.
- `@typespec/http`: routes, verbs, parameters, body and status code rules, files, visibility and `@useAuth`.
- The `@typespec/openapi3` emitter: the `openapi-versions` option, other options, the TypeSpec to OpenAPI mapping, and `tsp-openapi3` conversion.
- `@typespec/versioning`: `@versioned`, `@added`, `@removed`, `@renamedFrom` and related decorators.
- Project setup, `tspconfig.yaml` and the `tsp` CLI.
- Upgrading a 0.x or Cadl project to 1.x.

## Versions

| Line         | Status                |
| ------------ | --------------------- |
| TypeSpec 1.x | current               |
| TypeSpec 0.x | legacy (upgrade from) |

No preview line exists; `@typespec/versioning` 0.86 is a pre-1.0 library within 1.x. `references/versions.md` says which line to use and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [TypeSpec documentation](https://typespec.io/docs/): the published docs for the latest release.
- [@typespec/openapi3 1.16.0 README](https://unpkg.com/@typespec/openapi3@1.16.0/README.md): Released, 1.16.0.
- [@typespec/openapi3 changelog](https://raw.githubusercontent.com/microsoft/typespec/843c089f3050f46e7428d51401298825570ed3a5/packages/openapi3/CHANGELOG.md): entries through 1.16.0.
- [TypeSpec 1.0.0 release notes](https://typespec.io/release-notes/typespec-1-0-0/) and [1.0.0-rc.0 release notes](https://typespec.io/release-notes/typespec-1-0-0-rc-0/): what changed at 1.0.
- [TypeSpec 0.67 release notes](https://typespec.io/release-notes/typespec-0-67/): the last 0.x release.
- [@typespec/compiler on npm](https://registry.npmjs.org/@typespec/compiler): latest 1.16.0, next 1.17.0-dev.10.
- [@typespec/versioning 0.86.0](https://unpkg.com/@typespec/versioning@0.86.0/package.json): Released, 0.86.0.

## License

MIT
