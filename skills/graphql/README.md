# graphql

An agent skill for the GraphQL specification (September 2025 edition) and GraphQL over HTTP: schemas, operations, validation, execution, responses and HTTP serving, with upgrades from older editions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill graphql
```

Then ask your agent to "review this GraphQL schema against the spec", "add a @oneOf input", or "fix the status codes on our GraphQL endpoint".

## What it covers

- The language: documents, operations, selection sets, fields, arguments, aliases, fragments, variables, directives, descriptions and schema coordinates.
- The type system: scalars, objects, interfaces, unions, enums, input objects and OneOf input objects, lists, non-null, the schema definition, `@deprecated`, `@specifiedBy` and `@oneOf`.
- Introspection, every validation rule, and execution: field collection, serial mutations, value completion and non-null error propagation.
- The response format: `data`, `errors`, `extensions`, request errors versus execution errors, response paths and serialization.
- GraphQL over HTTP: GET and POST, `application/graphql-response+json`, `Accept` negotiation, status codes and security notes.

## Versions

| Line                             | Status                |
| -------------------------------- | --------------------- |
| GraphQL working draft            | preview (track)       |
| GraphQL September 2025           | current               |
| GraphQL October 2021             | supported             |
| GraphQL June 2018                | legacy (upgrade from) |
| GraphQL October 2016 and earlier | legacy (upgrade from) |
| GraphQL over HTTP draft          | current (build)       |

`references/versions.md` says which edition to use, what each changed, and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [GraphQL Specification Versions](https://spec.graphql.org/): the GraphQL Foundation index.
- [GraphQL, September 2025 Edition](https://spec.graphql.org/September2025/): Latest Release.
- [GraphQL, October 2021 Edition](https://spec.graphql.org/October2021/) and [June 2018 Edition](https://spec.graphql.org/June2018/): previous editions.
- [GraphQL, Current Working Draft](https://spec.graphql.org/draft/): prerelease, Mon, Sep 28, 2026.
- [graphql-spec releases](https://github.com/graphql/graphql-spec/releases) and the [September 2025](https://github.com/graphql/graphql-spec/blob/main/changelogs/September2025.md) and [October 2021](https://github.com/graphql/graphql-spec/blob/main/changelogs/October2021.md) changelogs.
- [GraphQL over HTTP, Current Working Draft](https://graphql.github.io/graphql-over-http/draft/) and its [repository](https://github.com/graphql/graphql-over-http): Stage 2, Draft.

## License

MIT
