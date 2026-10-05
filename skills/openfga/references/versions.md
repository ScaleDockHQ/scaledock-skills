# Versions and upgrades

Read this when choosing which schema version to write a model in, reading a model written for an older schema, splitting a model into modules, upgrading a server, or deciding whether to use an experimental server feature. Sources: the OpenFGA CHANGELOG and v1.21.0 release, the `openfga/language` README, grammar and validators, the Modular Models page and the `openfga/api` protos, listed in [Sources](../SKILL.md#sources).

## Version lines

OpenFGA versions two things separately: the authorization model schema (`schema_version`, the value after `schema` in the DSL) and the server, which implements the API. The API accepts `schema_version` values `1.0`, `1.1` and `1.2` (openfga_service.proto, `WriteAuthorizationModelRequest.schema_version`). Schema 1.2 is used by modular models only, so it is its own family; the server is a third family.

| Id            | Line                                | Status  | Revision                                                 | Posture | Summary                                                                                                     |
| ------------- | ----------------------------------- | ------- | -------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `schema-1.1`  | OpenFGA schema 1.1                  | current | `schema 1.1`, language main at f558baa                   |         | Type restrictions on assignable relations, `type:*` as type-bound public access, conditions. The default.   |
| `schema-1.0`  | OpenFGA schema 1.0                  | legacy  | deprecated in server v0.3.0, off by default since v0.4.0 |         | No type restrictions; `*` and `type:*` meant different things. Not supported by the current language tools. |
| `schema-1.2`  | OpenFGA schema 1.2 (modular models) | current | `fga.mod` `schema: '1.2'`, GA since server v1.5.3        |         | Modular models: `module` files, `extend type`, combined into one model through `fga.mod`.                   |
| `server-1.21` | OpenFGA server v1.21                | current | v1.21.0 (2026-09-20)                                     |         | Latest server release. The API in `openfga/api` at c0650ce.                                                 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

No preview line is listed. Experimental server features (below) sit behind flags in released servers and have no separate version text.

## Which version to use

- Write single-file models as `model` / `schema 1.1`. Every example on the Configuration Language, Conditions and Testing Models pages uses it.
- Use schema 1.2 only through modular models; it is the only schema version for which the language tooling allows modules (schema_version.ts, `checkSchemaVersionSupportsModules`). In `fga.mod`, `schema` must be `'1.2'`, and the language tooling rejects any other value there ("unsupported schema version, fga.mod only supported in version `1.2`", mod-to-json.go). The combined model the language transformer produces has `"schema_version": "1.2"` (language test data, `tests/data/transformer-module`).
- Treat a schema 1.0 model as input to an upgrade. The server stopped writing and evaluating 1.0 models by default in v0.4.0, and the current Go, JS and Java language packages do not support it: "1.0 has been deprecated and is no longer supported" (CHANGELOG 0.4.0, Removed; language README; schema_version.ts).
- Run the latest server line, v1.21. The changelog lists security fixes in recent releases, for example a ListUsers exclusion fix in v1.20.0 and a BatchCheck enforcement fix in v1.14.0 (CHANGELOG 1.20.0 Security; 1.14.0 Fixed).
- Do not rely on an experimental server feature in production. Each is behind a flag and disabled by default.

## What changed

### OpenFGA schema 1.1

- Assignable relations list the user types they accept in `[...]` (JSON `metadata.relations.<relation>.directly_related_user_types`), and the server validates written tuples against them (CHANGELOG 0.3.0, Added; 0.2.3, tuple validation against type restrictions in Write).
- `type:*` means "every object of that type". In 1.0 it meant an object of type `type` with id `*` (CHANGELOG 0.3.0).
- Bare `*` as a user is not supported; it is rejected in checks and writes and ignored in evaluation (CHANGELOG 0.3.0).
- A `WriteAuthorizationModel` request with no `schema_version` is read as 1.1 (CHANGELOG 0.4.3, Changed, "Default model schema versions to 1.1"). The current proto marks `schema_version` as required.
- Later 1.1 additions, all in server releases rather than a new schema: conditions on type restrictions (`with`), official in v1.4.0 after the v1.3.8 experiment (CHANGELOG 1.3.8 and 1.4.0); grouping and nesting with parentheses (Configuration Language, Grouping and nesting operators).

### OpenFGA schema 1.2 (modular models)

- A `module <name>` header replaces `model` / `schema` in each file, and `extend type <name>` adds relations to a type defined in another module (OpenFGAParser.g4, `moduleHeader` and `typeDef`).
- `fga.mod` lists the files (`contents`) and the combined schema (`schema`) (Modular Models, `fga.mod`).
- Experimental in server v1.5.1 behind `enable-modular-models`, enabled by default with the flag dropped in v1.5.3 (CHANGELOG 1.5.1 and 1.5.3).

### OpenFGA server v1.21

Changes in recent minor releases that affect API users (CHANGELOG):

- v1.21.0: "Dynamic Conditions" added as an experimental feature (PR #3313).
- v1.20.0: ListUsers fixes, including a security fix for nested exclusion on type-bound public access.
- v1.10.0: `on_duplicate: "ignore"` and `on_missing: "ignore"` on Write (Update Relationship Tuples, 05).
- v1.8.0: the BatchCheck API, contextual tuples in Expand, and `start_time` on ReadChanges.
- v1.6.0: per-request consistency (`MINIMIZE_LATENCY`, `HIGHER_CONSISTENCY`) enabled by default.
- v1.5.x: modular models enabled by default (v1.5.3), and ListUsers, experimental in v1.5.4 with the flag removed in v1.5.6.

### Experimental server features

These are in released servers but off by default. Name them in a design only to say they are not used:

- **Dynamic conditions** (`inline_expressions` flag, v1.21.0): a type restriction `[user with $expression]` lets each tuple carry its own CEL expression and parameter types in `condition.context` (PR #3313; OpenFGALexer.g4, `DOLLAR_EXPRESSION`; language pkg/go v0.3.2). A missing or mistyped parameter makes the whole Check an error.
- **AuthZEN 1.0** endpoints (CHANGELOG 1.12.0 and 1.13.0, "Add AuthZen 1.0 experimental support"). See the `authzen` skill.
- **`weighted_graph_check`** and **`pipeline_list_objects`**: alternative resolution algorithms that recent releases keep refining (CHANGELOG, "experimental" entries).

## Upgrading

### OpenFGA schema 1.0 to OpenFGA schema 1.1

1. Change the version marker: write `model` / `schema 1.1` in the DSL, or `"schema_version": "1.1"` in JSON.
2. Replace removed or renamed behaviour:
   - Add type restrictions to every relation that accepts tuples: list each user type, `type#relation` userset and `type:*` that existing tuples use. Relations without them become non-assignable (Configuration Language, Direct Relationship Type Restrictions).
   - Replace tuples whose user is bare `*` with `<type>:*` for each type that should be public, and add `<type>:*` to the restrictions.
   - Re-read tuples whose user is `<type>:*`: in 1.0 that was a single object with id `*`; in 1.1 it means every object of the type (CHANGELOG 0.3.0).
   - Make every tupleset in `X from Y` a directly assignable relation with only concrete types (Invariant 3 in `SKILL.md`).
3. Validate against the target: write the model with `WriteAuthorizationModel` and run the `.fga.yaml` tests.
4. Keep behaviour unchanged: tuples that the new model's restrictions reject are ignored at evaluation (Model Migrations), so a model that validates can still drop access. Run Read over the store and compare the results of checks before and after.

### OpenFGA schema 1.1 to OpenFGA schema 1.2 (modular models)

1. Change the version marker: create `fga.mod` with `schema: '1.2'` and the list of files in `contents`.
2. Replace removed or renamed behaviour:
   - Replace `model` / `schema 1.1` in each file with `module <name>`; one module per file, and a module may span several files (Modular Models, Modules).
   - Move each relation that belongs to another team's type into that team's module with `extend type <type>`. The type must exist, a file extends a type at most once, and an extension may not add an existing relation (Modular Models, Type Extensions).
   - Point every `.fga.yaml` at `model_file: fga.mod` (Testing Models, Testing with Modular Models).
3. Validate against the target: `fga model write --file fga.mod` and the existing tests.
4. Keep behaviour unchanged: the combined types and relations must be the same as before; only the source annotations differ (`fga model get` shows `# module:` and `# extended by:` comments).

### Changing a model on any schema

Models are immutable, so every change is a migration to a new model id (Immutable Authorization Models; Model Migrations):

- Add a type or relation: write the model (new id), write tuples for it, update the application, then switch the application to the new id.
- Delete a type or relation: write the model, stop using it in the application, switch the id, then delete its tuples (they are ignored but slow evaluation).
- Rename a relation: write the model with the new name, update the application, copy the tuples to the new relation, then deploy the application on the new id.
- For a large change, run shadow checks against the old and new ids before switching.

### Server upgrades within OpenFGA server v1.21 and earlier v1 releases

Read the CHANGELOG entries between the running version and v1.21.0, apply any datastore migration the release notes call for, and re-run the model tests against the new server.

## Preview

None. Watch `openfga/openfga` releases for experimental features that lose their flag, and the `openfga/language` grammar and the `schema_version` enum in `openfga/api` for a new schema version. When a new schema version ships: add it as a line, make the current line of its family supported, and add an upgrade section.
