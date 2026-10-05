---
name: openfga
description: >-
  OpenFGA schema 1.1: write, test and review relationship-based authorization models in the OpenFGA DSL and JSON, and call the OpenFGA API. Targets the OpenFGA modeling language schema 1.1, OpenFGA schema 1.2 (modular models with fga.mod, module and extend type) and the OpenFGA server v1.21 API; upgrades from legacy schema 1.0. Use when designing or reviewing a Zanzibar-style ReBAC model: types, relations, direct relationship type restrictions, usersets (type#relation), type-bound public access (user:*), or, and, but not, X from Y tupleset rewrites, conditions with CEL expressions and typed parameters, relationship tuples and conditional tuples, contextual tuples, Check, BatchCheck, ListObjects, StreamedListObjects, ListUsers, Read, Write, Expand, ReadChanges, authorization_model_id pinning, MINIMIZE_LATENCY and HIGHER_CONSISTENCY, .fga.yaml store files and fga model test, and modeling roles, groups, parent-child hierarchies, custom roles and blocklists.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenFGA

OpenFGA is a CNCF project for fine-grained, relationship-based access control (ReBAC) inspired by Google's Zanzibar paper. An authorization model, written in the OpenFGA DSL or JSON, defines types and relations; relationship tuples stored in a store say who is related to what; the API answers "does user U have relation R with object O?". This skill produces models, tuples, `.fga.yaml` tests and API calls that the OpenFGA language tooling and server accept.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). OpenFGA pages have no section numbers, so rules cite the page and heading name; grammar and API rules cite the file and the rule, message or field name. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: model author, model reviewer, or application integrator calling the API (writing tuples and running queries).
- Target version: OpenFGA schema 1.1 (current, the default for a single-file model). OpenFGA schema 1.2 (modular models) is the current line of the modular family: use it when the model is split into modules with an `fga.mod`. OpenFGA schema 1.0 is legacy: read it and upgrade from it, never author it. The server and API target is OpenFGA server v1.21 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Requirements: the feature to model in plain language ("a user can share a document if they are its owner or an editor"), the object types, and which checks the application will make.
- Runtime data: attributes only known at request time (time, IP address, token claims), which decide between conditions and contextual tuples.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check `openfga/openfga` releases and the `openfga/language` grammar for a newer server release or schema version, and update the pins.

## Invariants

1. **Every model starts with a schema header.** A single-file DSL model begins `model` then `schema 1.1`; a module file begins `module <name>` instead (OpenFGAParser.g4, `modelHeader` and `moduleHeader`). The API's `schema_version` is required and must be `1.0`, `1.1` or `1.2` (openfga_service.proto, `WriteAuthorizationModelRequest.schema_version`).
2. **Direct assignment needs type restrictions.** A relation accepts tuples only if its definition starts with `[...]`; each entry is `type`, `type:*` or `type#relation`, optionally `with <condition>`. Without them, direct relationships are disallowed (Configuration Language, Direct Relationship Type Restrictions).
3. **A tupleset is a plain, concrete relation.** In `X from Y`, `Y` must be a relation on the same type that is directly assignable, not a rewrite, and whose type restrictions contain no `type:*` and no `type#relation`; otherwise `WriteAuthorizationModel` fails validation (Configuration Language, Referencing Relations On Related Objects; validate-dsl.ts, `TupleToUserset`).
4. **`type:*` is not a wildcard.** It means every object of that type and is valid only in a tuple's `user` field, never in `object`, never in `relation`, and never inside a userset such as `org:*#member` (Concepts, What Is Type Bound Public Access; Public Access).
5. **Every relation needs an entry point.** A relation that can never be satisfied by a tuple (for example one that only references itself) is rejected (validate-dsl.ts, `raiseNoEntryPoint` and `raiseNoEntryPointLoop`).
6. **Names follow the rules.** Relations use alphanumerics, `_` and `-`; `self` and `this` are reserved type and relation names; type names are at most 254 characters and relation names at most 50 (Get Started with Modeling, 03; validate-dsl.ts; openfga.proto `TupleKey`).
7. **Conditions are declared, typed and used.** A condition has typed parameters and a CEL expression of at most 512 bytes; a model has at most 25 conditions; an unused condition is a validation error; a tuple for a `with` restriction must carry that condition (Conditions; authzmodel.proto `Condition`; validate-dsl.ts `raiseUnusedCondition`).
8. **Models are immutable; pin the id.** Every write creates a new `authorization_model_id`; omitting it makes the server use the latest model. Pass it on Check, ListObjects, ListUsers, Expand and Write in production (Immutable Authorization Models; Managing Tuples and Invoking API Best Practices).
9. **Write is transactional and bounded.** One Write holds at most 100 unique tuples across writes and deletes, all succeed or fail together, and a tuple cannot appear twice in one request (Update Relationship Tuples, 04).
10. **No personal data in identifiers.** Do not put personal or regulated data in user or object ids (Managing Tuples and Invoking API Best Practices).
11. **Test before deploying.** Every model is tested with a `.fga.yaml` file covering every relation the application will query (Testing Models).

## Workflow

1. **Pick the version.** Target schema 1.1 for a single file, schema 1.2 when the model is split into modules, and server v1.21 for API behaviour.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target schema and server line are recorded, and neither is legacy.
2. **Write the requirements as relations.** Start from the objects, phrase each permission as "a user can {action} a {type} if …", list the types (groups and containers first), and name permissions `can_{action}`.
   -> [`references/modeling-language.md`](references/modeling-language.md)
   ✓ Every application check maps to one `type#relation`.
3. **Define the relations.** Use type restrictions for assignable relations, `or` / `and` / `but not` for set logic, `X from Y` for hierarchies, and keep permissions non-assignable.
   -> [`references/modeling-language.md`](references/modeling-language.md), [`references/testing-and-patterns.md`](references/testing-and-patterns.md)
   ✓ The model parses and validates: every tupleset is concrete, every relation has an entry point.
4. **Add conditions or contextual tuples for runtime data.** Use a condition for attributes compared at request time, and contextual tuples for relationships known only for one request.
   -> [`references/conditions-and-modules.md`](references/conditions-and-modules.md)
   ✓ Every condition is used, its parameters are typed, and every check that hits it supplies the request context.
5. **Split into modules if several teams own the model.** Write `fga.mod` with `schema: '1.2'`, one `module` per file, and `extend type` for relations added to another module's type.
   -> [`references/conditions-and-modules.md`](references/conditions-and-modules.md)
   ✓ `fga model write --file fga.mod` succeeds and no relation is defined twice.
6. **Test the model.** Write `.fga.yaml` with tuples and `check`, `list_objects` and `list_users` assertions, positive and negative, and run `fga model test`.
   -> [`references/testing-and-patterns.md`](references/testing-and-patterns.md)
   ✓ `fga model test --tests <file>.fga.yaml` reports every test passing.
7. **Integrate the API.** Write tuples with Write, answer access with Check or BatchCheck, filter with ListObjects, list subjects with ListUsers, and debug with Expand; pin the model id and choose consistency per request.
   -> [`references/tuples-and-api.md`](references/tuples-and-api.md)
   ✓ Each call passes `authorization_model_id`, and `HIGHER_CONSISTENCY` is used only where a just-written tuple must be seen.
8. **Upgrade** (only when asked). Upgrade a schema 1.0 model to 1.1, a single file to modules, or a model change through a migration with a new model id.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded model passes the same `.fga.yaml` tests as before, plus tests for the change.

## Verify before done

- [ ] The model has a `model` / `schema 1.1` header (or `module` files plus `fga.mod` with `schema: '1.2'`) and no schema 1.0 constructs.
- [ ] Every relation the application writes tuples for has type restrictions; every `can_*` permission has none.
- [ ] No tupleset in `X from Y` has a rewrite, `type:*` or `type#relation` in its type restrictions.
- [ ] No tuple has `type:*` in `object`, or `type:*#relation` as `user`.
- [ ] Every condition is referenced by a `with` restriction, and tests pass a context that makes it both true and false.
- [ ] `.fga.yaml` covers every relation with at least one `true` and one `false` assertion, and `fga model test` passes.
- [ ] API calls pass `authorization_model_id`; writes stay at or under 100 tuples; contextual tuples stay at or under 100.
- [ ] No identifier contains personal data.

## Reference index

- **`references/versions.md`**: schema 1.0, 1.1 and 1.2 and the server line, what changed, upgrade steps (1.0 to 1.1, single file to modules, model migrations), and experimental server features. Load for steps 1 and 8.
- **`references/modeling-language.md`**: the DSL grammar, types, relations, type restrictions, usersets, type-bound public access, the operators, `from`, nesting, the JSON mapping, naming and validation errors. Load for steps 2 and 3.
- **`references/conditions-and-modules.md`**: conditions, parameter types, CEL limits, conditional tuples and context merging, contextual tuples, modules, `fga.mod` and `extend type`. Load for steps 4 and 5.
- **`references/tuples-and-api.md`**: tuple format and limits, Write semantics, Check, BatchCheck, ListObjects, StreamedListObjects, ListUsers, Read, Expand, ReadChanges, model ids and consistency. Load for step 7.
- **`references/testing-and-patterns.md`**: the `.fga.yaml` store file, test assertions, the CLI and CI action, and the patterns for roles, groups, hierarchies, public access, multiple restrictions, custom roles and blocklists. Load for steps 3 and 6.

## Related skills

- `authzen`, for the AuthZEN Authorization API that OpenFGA supports experimentally: `npx skills add ScaleDockHQ/scaledock-skills --skill authzen`
- `cel`, for the Common Expression Language used in condition expressions: `npx skills add ScaleDockHQ/scaledock-skills --skill cel`
- `rego`, for policy-as-code with Open Policy Agent instead of relationship tuples: `npx skills add ScaleDockHQ/scaledock-skills --skill rego`
- `cedar`, for the Cedar policy language as another way to express authorization: `npx skills add ScaleDockHQ/scaledock-skills --skill cedar`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenFGA Configuration Language](https://openfga.dev/docs/configuration-language): Documentation, openfga.dev main at fb53597 (2026-09-29), checked 2026-10-05.
- [OpenFGA Concepts](https://openfga.dev/docs/concepts): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [OpenFGA Modeling Guides](https://openfga.dev/docs/modeling/): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Get Started with Modeling](https://openfga.dev/docs/modeling/getting-started): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Conditions](https://openfga.dev/docs/modeling/conditions): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Modular Models](https://openfga.dev/docs/modeling/modular-models): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Testing Models](https://openfga.dev/docs/modeling/testing): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Store File Format](https://openfga.dev/docs/modeling/store-file-format): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Modeling patterns: User Groups](https://openfga.dev/docs/modeling/user-groups), [Roles and Permissions](https://openfga.dev/docs/modeling/roles-and-permissions), [Parent-Child Objects](https://openfga.dev/docs/modeling/parent-child), [Public Access](https://openfga.dev/docs/modeling/public-access), [Multiple Restrictions](https://openfga.dev/docs/modeling/multiple-restrictions), [Custom Roles](https://openfga.dev/docs/modeling/custom-roles), [Blocklists](https://openfga.dev/docs/modeling/blocklists) and [Usersets](https://openfga.dev/docs/modeling/building-blocks/usersets): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Model Migrations](https://openfga.dev/docs/modeling/migrating/migrating-models): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Relationship Queries](https://openfga.dev/docs/interacting/relationship-queries): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Contextual Tuples](https://openfga.dev/docs/interacting/contextual-tuples): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Query Consistency Modes](https://openfga.dev/docs/interacting/consistency): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Update Relationship Tuples](https://openfga.dev/docs/getting-started/update-tuples): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Immutable Authorization Models](https://openfga.dev/docs/getting-started/immutable-models): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [Managing Tuples and Invoking API Best Practices](https://openfga.dev/docs/getting-started/tuples-api-best-practices): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [OpenFGA CLI](https://openfga.dev/docs/getting-started/cli): Documentation, openfga.dev main at fb53597, checked 2026-10-05.
- [OpenFGA API](https://openfga.dev/api/service): API reference rendered from `openfga/api`, checked 2026-10-05.
- [openfga/api: openfga_service.proto](https://github.com/openfga/api/blob/c0650ce/openfga/v1/openfga_service.proto), [openfga.proto](https://github.com/openfga/api/blob/c0650ce/openfga/v1/openfga.proto), [authzmodel.proto](https://github.com/openfga/api/blob/c0650ce/openfga/v1/authzmodel.proto) and [openfga_service_consistency.proto](https://github.com/openfga/api/blob/c0650ce/openfga/v1/openfga_service_consistency.proto): API definition, main at c0650ce (2026-09-28), checked 2026-10-05.
- [openfga/language: OpenFGAParser.g4](https://github.com/openfga/language/blob/f558baa/OpenFGAParser.g4) and [OpenFGALexer.g4](https://github.com/openfga/language/blob/f558baa/OpenFGALexer.g4): ANTLR grammar, main at f558baa (2026-10-01), checked 2026-10-05.
- [openfga/language: README](https://github.com/openfga/language/blob/f558baa/README.md), [validate-dsl.ts](https://github.com/openfga/language/blob/f558baa/pkg/js/validator/validate-dsl.ts), [schema_version.ts](https://github.com/openfga/language/blob/f558baa/pkg/js/util/schema_version.ts), [mod-to-json.go](https://github.com/openfga/language/blob/f558baa/pkg/go/transformer/mod-to-json.go) and [module-to-model.go](https://github.com/openfga/language/blob/f558baa/pkg/go/transformer/module-to-model.go): Language tooling, main at f558baa, checked 2026-10-05.
- [openfga/language release pkg/go/v0.3.2](https://github.com/openfga/language/releases/tag/pkg/go/v0.3.2): Released, 2026-10-01, checked 2026-10-05.
- [OpenFGA v1.21.0](https://github.com/openfga/openfga/releases/tag/v1.21.0): Released, 2026-09-20 (latest), checked 2026-10-05.
- [OpenFGA CHANGELOG](https://github.com/openfga/openfga/blob/main/CHANGELOG.md): Changelog, through v1.21.0 and Unreleased, checked 2026-10-05.
- [openfga/openfga PR #3313: dynamic conditions (experimental)](https://github.com/openfga/openfga/pull/3313): Merged 2026-09-20, experimental flag `inline_expressions`, checked 2026-10-05.
