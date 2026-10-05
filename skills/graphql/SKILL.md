---
name: graphql
description: >-
  GraphQL September 2025 and GraphQL over HTTP: design, build and review
  schemas, operations, executors and HTTP endpoints. Use when writing SDL or
  executable documents (queries, mutations, subscriptions, fragments, aliases,
  variables, directives, descriptions), defining scalars, objects, interfaces,
  unions, enums, input objects, @oneOf, @deprecated or @specifiedBy, building
  introspection, validation or execution (field collection, value completion,
  non-null error propagation, request errors versus execution errors), shaping
  the data, errors and extensions response, or serving GraphQL over HTTP with
  GET and POST, application/graphql-response+json, Accept negotiation and
  status codes (200, 294, 400, 405, 406, 415, 422). Targets GraphQL September
  2025; supports GraphQL October 2021; upgrades from GraphQL June 2018 and
  earlier; tracks the GraphQL working draft; builds on the GraphQL over HTTP
  draft (Stage 2). Triggers: SDL, resolver, __typename, introspection
  query, schema coordinates, partial data.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# GraphQL

GraphQL is a query language and execution engine published by the GraphQL Foundation as dated editions at spec.graphql.org. The companion GraphQL over HTTP specification maps GraphQL requests and responses onto HTTP. With this skill the agent writes and reviews schemas and documents, implements validation and execution that match the spec's algorithms, shapes responses, and serves them over HTTP.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Section numbers are from GraphQL September 2025 unless marked; GraphQL over HTTP sections are marked "GoH". When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: schema author, service (executor) implementer, client or tooling author, HTTP server or HTTP client, or reviewer.
- Target version: GraphQL September 2025 (current, the default). GraphQL October 2021 is supported: target it only for a named consumer whose tooling does not yet read September 2025 additions such as `@oneOf` or deprecated arguments. GraphQL June 2018 and GraphQL October 2016 and earlier are legacy: read them and upgrade from them, never author against them. The GraphQL working draft is a preview (posture: track): never emit its additions. The GraphQL over HTTP draft is the only line of its family (current, posture: build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Transport: HTTP (load GraphQL over HTTP), or another transport (the core spec is transport independent, § 6).
- Operation types: which of query, mutation and subscription the schema supports. GraphQL over HTTP does not cover subscriptions (GoH § 1).
- Sources: when refreshing this skill or when a rule looks out of date, re-read https://spec.graphql.org/ for a new Latest Release, read its changelog and release notes, re-read the GraphQL over HTTP README for its stage, then every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **Executable documents carry no type system definitions.** A document containing type system definitions or extensions must not be executed (§ 2.3, § 5.1.1). With several operations, each is named and the request supplies the operation name (§ 2.3, § 6.1).
2. **Names are ASCII and `__` is reserved.** Names match `[_A-Za-z][_0-9A-Za-z]*` and are case-sensitive (§ 2.1.8). No type, field, argument, directive or enum value may start with `__` unless it is part of introspection (§ 3.3, § 4).
3. **Selections reach leaves.** Leaf (scalar or enum) fields have no subselection; object, interface and union fields have one that is not empty (§ 5.3.3). Fields sharing a response name must merge (§ 5.3.2).
4. **Built-in scalars mean what the spec says.** Int is signed 32-bit, Float is finite IEEE 754 double, ID always serializes as a String (§ 3.5.1, § 3.5.2, § 3.5.5). A service must not redefine them (§ 3.5).
5. **Coercion fails loudly.** Result coercion that would lose data raises an execution error (§ 3.5). Input that does not match a coercion rule raises a request error (§ 3.5), and a Non-Null input that is missing or null raises a request error (§ 3.12).
6. **Null and missing are different inputs.** An explicit `null` and an omitted value may mean different things, and neither is accepted for a Non-Null input (§ 2.10.5, § 3.10).
7. **OneOf input objects take exactly one non-null field.** Every field is nullable without a default; a value with zero or several entries, or a null entry, is a request error (§ 3.10, § 3.10.1). A variable used for a OneOf field must be non-nullable (§ 5.8.5).
8. **Deprecate only optional things.** `@deprecated` must not appear on a required argument or input field (§ 3.13.3). An implementing field may only be deprecated if the interface field is (§ 3.6).
9. **Mutations run serially.** The top-level fields of a mutation execute in document order, each to completion before the next; all other fields must be side-effect free (§ 6.2.2, § 6.3.4).
10. **Errors propagate to the nearest nullable position.** An execution error makes its response position null and adds one error with its `path`; at a Non-Null position the null propagates to the parent (§ 6.4.4, § 3.12).
11. **The response shape is closed.** An execution result has `data`, plus `errors` only if errors were raised, plus optional `extensions`; a request error result has `errors` and no `data` (§ 7.1.1, § 7.1.3). No other top-level entries are allowed (§ 7.1.8). Extra error data goes in the error's `extensions` (§ 7.1.6).
12. **Over HTTP, POST and JSON always work.** A server must accept POST with `application/json` and must support `application/graphql-response+json` responses (GoH § 4, § 4.4, § 5.1). GET must never execute a mutation (GoH § 4.3).
13. **Status follows the result over HTTP.** Non-null `data` means `2xx`; a request error result means `4xx` or `5xx` (GoH § 5.4).

## Workflow

1. **Pick the version.** Use GraphQL September 2025 unless a named consumer needs GraphQL October 2021. Record whether HTTP is in scope.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target edition is recorded and is not a legacy or preview line.
2. **Design the schema.** Define root operation types, types, fields, arguments, input objects, enums and directives, with descriptions; add `@specifiedBy` to custom scalars and `@deprecated` (with a reason) to retired fields.
   -> [`references/language-and-types.md`](references/language-and-types.md)
   ✓ The schema passes every type validation rule in § 3, the query root is an Object type, and no name starts with `__`.
3. **Write operations and fragments.** Name every operation, declare variables with types, alias fields that would collide, and select down to leaves.
   -> [`references/language-and-types.md`](references/language-and-types.md)
   ✓ The document is an ExecutableDocument with at least one operation (§ 2.3).
4. **Validate.** Apply every rule in § 5 before execution; only skip it for a document known to be valid and unchanged (§ 5, § 6.1.1).
   -> [`references/validation-and-execution.md`](references/validation-and-execution.md)
   ✓ Invalid documents produce a request error result and never execute.
5. **Execute.** Select the operation, coerce variables, execute the root selection set (serially for mutations), complete values and propagate errors.
   -> [`references/validation-and-execution.md`](references/validation-and-execution.md)
   ✓ Only one error is added per response position (§ 6.4.4), and null propagation stops at the nearest nullable position.
6. **Expose introspection and shape the response.** Implement `__typename`, `__schema` and `__type`, then build the execution result or request error result.
   -> [`references/introspection-and-errors.md`](references/introspection-and-errors.md)
   ✓ Introspection returns every referenced built-in scalar and every directive, and the response has no top-level entries other than `data`, `errors` and `extensions`.
7. **Serve over HTTP** (when in scope). Accept POST JSON, optionally GET for queries, negotiate the response media type and pick the status code.
   -> [`references/graphql-over-http.md`](references/graphql-over-http.md)
   ✓ Every case in GoH § 5.4 returns the status listed there, and `application/graphql-response+json` is never used when no well-formed GraphQL response exists.
8. **Review security.** Add depth, complexity, size and error-count limits; keep authorization in the schema's execution, not in HTTP routing on request contents; avoid "simple" request media types.
   -> [`references/graphql-over-http.md`](references/graphql-over-http.md)
   ✓ Each item in GoH § 6.2.2 is addressed or explicitly out of scope.
9. **Upgrade** (only when asked). Follow the upgrade section for each step from the source edition to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ Documents that were valid stay valid, and the schema passes the target edition's validation.

## Verify before done

- [ ] Every operation is valid against the schema under every rule in § 5, including Operation Type Existence (§ 5.2.1.1) and Single Root Field for subscriptions (§ 5.2.4.1).
- [ ] Custom scalars carry a stable `@specifiedBy` URL; built-in scalars carry none (§ 3.5, § 3.13.4).
- [ ] Every Non-Null field is one whose null would really break the parent, because an error there nulls the parent (§ 6.4.4).
- [ ] Errors have `message`, and `locations` and `path` where they apply; custom data is in `extensions` (§ 7.1.6).
- [ ] Request errors return no `data` key; execution errors return partial `data` (§ 7.1.3, § 7.1.6).
- [ ] Over HTTP: clients send `Accept: application/graphql-response+json, application/json;q=0.9` when unsure, and servers answer 405 with `Allow` for GET mutations (GoH § 4.2, § 4.3, § 5.4).
- [ ] Nothing added only in the GraphQL working draft (directive extensions, deprecated directives, empty selection sets) is emitted.

## Reference index

- **`references/versions.md`**: every edition with its status, which one to use, what changed in each, upgrade steps, and the working draft. Load for steps 1 and 9.
- **`references/language-and-types.md`**: documents, operations, selections, fragments, values, variables, directives, descriptions, schema coordinates, and every kind of type with its validation rules. Load for steps 2 and 3.
- **`references/validation-and-execution.md`**: the validation rules, request execution, variable and argument coercion, field collection, serial execution, value completion and error propagation. Load for steps 4 and 5.
- **`references/introspection-and-errors.md`**: the introspection schema and what each field returns, the response format, error kinds, response paths and serialization. Load for step 6.
- **`references/graphql-over-http.md`**: URLs, media types, GET and POST encoding, content negotiation, status codes, partial success, and security notes. Load for steps 7 and 8.

## Related skills

- `owasp-api-security` for API security risks such as broken object level authorization and unrestricted resource consumption: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-api-security`.
- `http-semantics` for RFC 9110 methods, status codes, content negotiation and caching: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.
- `openapi` for describing REST endpoints next to a GraphQL endpoint: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`.
- `json-api` for a JSON REST alternative with its own fetching and error conventions: `npx skills add ScaleDockHQ/scaledock-skills --skill json-api`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [GraphQL Specification Versions (index)](https://spec.graphql.org/): GraphQL Foundation index, September 2025 is the Latest Release and the Working Draft is dated Mon, Sep 28, 2026, checked 2026-10-05.
- [GraphQL, September 2025 Edition](https://spec.graphql.org/September2025/): Released (Latest Release), September 2025 edition, checked 2026-10-05.
- [GraphQL, October 2021 Edition](https://spec.graphql.org/October2021/): Released (previous edition), October 2021 edition, checked 2026-10-05.
- [GraphQL, June 2018 Edition](https://spec.graphql.org/June2018/): Released (previous edition), June 2018 edition, checked 2026-10-05.
- [GraphQL, Current Working Draft](https://spec.graphql.org/draft/): Working Draft (prerelease), Mon, Sep 28, 2026, checked 2026-10-05.
- [graphql/graphql-spec releases](https://github.com/graphql/graphql-spec/releases): GitHub release notes for every edition from July 2015 to September 2025, checked 2026-10-05.
- [September 2025 changelog](https://github.com/graphql/graphql-spec/blob/main/changelogs/September2025.md): non-normative changelog, October2021 to f29fbcd, checked 2026-10-05.
- [October 2021 changelog](https://github.com/graphql/graphql-spec/blob/main/changelogs/October2021.md): non-normative changelog, June2018 to October2021, checked 2026-10-05.
- [GraphQL over HTTP, Current Working Draft](https://graphql.github.io/graphql-over-http/draft/): Stage 2: Draft, Current Working Draft (main at e287465), checked 2026-10-05.
- [graphql/graphql-over-http repository](https://github.com/graphql/graphql-over-http): Stage 2: Draft per README, ROADMAP for version 1.0 scope, no releases or tags, checked 2026-10-05.
