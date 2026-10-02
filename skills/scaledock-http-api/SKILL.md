---
name: scaledock-http-api
description: Build or review a ScaleDock HTTP API that follows OpenAPI 3.2, OpenAPI Overlay, RFC 9457 Problem Details, the RateLimit header fields and Standard Schema, with PermDock guarding every procedure and writing the OpenAPI security. Use when adding or changing the api surface, publishing an OpenAPI document, adding security schemes or scopes to it, standardising API errors or 429 responses, or reviewing an API against these specs.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
---

# ScaleDock HTTP API

An API whose contract, document, errors and limits all follow open specs, with PermDock as the one place that decides access and writes the security part of the OpenAPI document. The spec skills carry the rules of each standard; this skill says how they fit the ScaleDock stack.

**Follow the workflow below step by step.** Read the installed oRPC, Hono and PermDock docs before you configure anything.

## Inputs (fill in, or ask before starting)

- Repo: an existing ScaleDock repo with an `api` surface, or a new one (then run `scaledock-repo-standard` first).
- Authorization server: Supabase Auth's OAuth 2.1 server (default), or another issuer the user names.
- Quotas: which procedures have rate or usage limits, if any.
- Event-driven APIs or design-first specs: whether the repo also publishes AsyncAPI documents or authors in TypeSpec.

## Skills to install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi --skill openapi-overlay --skill problem-details --skill ratelimit-headers --skill standard-schema
npx skills add ScaleDockHQ/PermDock
```

Optional companions: `openapi-arazzo` (multi-step workflows), `asyncapi` (event-driven APIs), `typespec` (design-first authoring). `scaledock-repo-standard` (its `references/api.md` and `references/architecture.md`) owns the app layout: Hono shell, oRPC contract in `packages/contract`, Scalar, the committed OpenAPI snapshot.

## Invariants

1. **The spec skills win on format details.** Document structure follows `openapi`; Overlay shape follows `openapi-overlay`; error bodies follow `problem-details`; 429 responses follow `ratelimit-headers`.
2. **Contract first, one schema library.** Every procedure lives in `packages/contract` with Valibot schemas, which are Standard Schema; the OpenAPI document is generated from the contract, never written by hand.
3. **PermDock guards every procedure.** oRPC procedures use `protect` from `permdock/orpc`; plain Hono routes use `permdock/hono`. A denial is a 403 Problem Details object; an anonymous call is a 401 with `WWW-Authenticate`.
4. **PermDock owns `security`.** `permdock openapi emit` writes the security schemes, scopes and per-operation `security` from the permission catalog. No other tool writes `security` on the same operations.
5. **Quotas spend through `decide` or `assert`.** A `limit` grant needs a `LimitStore`; an exhausted limit becomes a 429 with `Retry-After` and the RateLimit fields.
6. **The document is a checked artifact.** The committed snapshot validates against the official OpenAPI schema, and CI fails on drift in the document or in `permdock openapi emit --check`.

## Workflow

1. **Set the inputs and read the docs.** Read `scaledock-repo-standard` `references/api.md`, the installed oRPC OpenAPI docs, and the PermDock `orpc` and `openapi` pages through the PermDock docs MCP (`https://permdock.dev/mcp`).
   ✓ You know which OpenAPI version the installed oRPC emits.
2. **Contract and validation.** Define inputs and outputs with Valibot in `packages/contract`, following `standard-schema` for anything that consumes a schema generically.
   ✓ Every procedure has typed input and output, and invalid input is a 400 Problem Details object.
3. **Permissions.** Define permissions and grants with `wire-permdock`, then guard each procedure with `protect`.
   -> [`references/stack.md`](references/stack.md) (adapter and CLI mapping)
   ✓ A call without a grant returns 403 Problem Details, and `permdock collect --check` passes.
4. **Errors and limits.** Route every error through the Hono `onError` that builds Problem Details as `problem-details` describes. For limits, configure the `LimitStore` and emit the headers `ratelimit-headers` describes.
   ✓ Every error response is `application/problem+json`; a 429 carries `Retry-After`.
5. **Document.** Generate the document, then run `permdock openapi emit` (in place, or `--format overlay` when the generator's output must stay untouched). Validate the result as `openapi` and `openapi-overlay` describe.
   ✓ The snapshot validates and `permdock openapi emit --check` exits 0.
6. **Test and audit.** Add a policy matrix with `permdock/testing`, a contract test per error type, then run `audit-permissions` from `ScaleDockHQ/PermDock`.
   ✓ Tests pass and the audit has no blocker.

## Verify before done

- [ ] Every item in the `openapi` and `problem-details` Verify lists passes.
- [ ] Every procedure has a PermDock guard and appears in `permdock usage`.
- [ ] The OpenAPI `security` comes only from `permdock openapi emit`.
- [ ] Every limited procedure returns 429 with `Retry-After` when exhausted.
- [ ] The committed OpenAPI snapshot matches the generated document, and `pnpm verify` passes.

## Reference index

- **[`references/stack.md`](references/stack.md)**: each spec requirement mapped to the ScaleDock stack and PermDock.
