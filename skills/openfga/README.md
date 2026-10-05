# openfga

An agent skill for OpenFGA, the CNCF relationship-based access control system inspired by Google's Zanzibar: authorization models in the OpenFGA modeling language (schema 1.1, and schema 1.2 for modular models), relationship tuples, `.fga.yaml` tests and the OpenFGA server v1.21 API, with upgrades from schema 1.0.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openfga
```

Then ask your agent to "model our document sharing permissions in OpenFGA" or "review our OpenFGA model and write tests for it".

## What it covers

- The DSL and JSON forms: types, relations, direct relationship type restrictions, usersets (`type#relation`), type-bound public access (`type:*`), `or`, `and`, `but not`, `X from Y` and nesting, with the validation rules and limits.
- Conditions with typed parameters and CEL expressions, conditional tuples and context merging, and contextual tuples.
- Modular models: `module`, `extend type` and `fga.mod`.
- Relationship tuples and the API: Write, Read, ReadChanges, Check, BatchCheck, Expand, ListObjects, StreamedListObjects and ListUsers, model id pinning and consistency preferences.
- `.fga.yaml` store files with `check`, `list_objects` and `list_users` tests, the `fga` CLI and the GitHub Action.
- Modeling patterns: roles and permissions, user groups, parent-child hierarchies, public access, multiple restrictions, custom roles and blocklists.
- What changed between schema versions and server releases, and how to migrate models.

## Versions

| Line                                | Status                   |
| ----------------------------------- | ------------------------ |
| OpenFGA schema 1.1                  | current                  |
| OpenFGA schema 1.0                  | legacy (upgrade from)    |
| OpenFGA schema 1.2 (modular models) | current (modular family) |
| OpenFGA server v1.21                | current (server family)  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenFGA documentation](https://openfga.dev/docs/configuration-language): Configuration Language, Concepts, Modeling (getting started, conditions, modular models, testing, store file format, patterns, migrations) and Interacting pages, at openfga.dev main fb53597.
- [OpenFGA API](https://openfga.dev/api/service) and the [openfga/api](https://github.com/openfga/api/blob/c0650ce/openfga/v1/openfga_service.proto) protos at c0650ce.
- The [openfga/language](https://github.com/openfga/language/blob/f558baa/OpenFGAParser.g4) grammar and validators at f558baa, and release pkg/go/v0.3.2.
- [OpenFGA v1.21.0](https://github.com/openfga/openfga/releases/tag/v1.21.0) and the [CHANGELOG](https://github.com/openfga/openfga/blob/main/CHANGELOG.md).

## License

MIT
