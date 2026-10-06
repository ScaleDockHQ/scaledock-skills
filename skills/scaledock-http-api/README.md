# scaledock-http-api

An agent skill that builds or reviews a ScaleDock HTTP API whose contract, OpenAPI document, errors and limits follow open specs, with PermDock guarding every procedure and writing the document's security.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-http-api
```

It asks you to install the spec skills it builds on: `http-semantics`, `openapi`, `json-schema`, `openapi-overlay`, `problem-details`, `ratelimit-headers`, `standard-schema`, `json`, `json-patch`, `jsonpath`, `uuid`, `well-known-uris`, `tls` and `sarif` (optionally `openapi-arazzo`, `asyncapi`, `typespec`, `standard-webhooks`, `http-message-signatures`, `http-cookies`, `owasp-api-security` and `owasp-asvs`), plus PermDock's skills (`npx skills add ScaleDockHQ/PermDock`).

Then ask your agent to "add an endpoint to the API", "publish our OpenAPI document with security schemes", or "make our API errors and 429s standard".

## Rules

- The spec skills decide format details; this skill maps them onto Hono, oRPC and PermDock.
- Contract first, with Valibot as the one schema library.
- PermDock guards every procedure and is the only writer of OpenAPI `security`.
- Methods, status codes and caching follow HTTP Semantics; schemas are JSON Schema 2020-12.
- Errors are RFC 9457 Problem Details; exhausted limits are 429 with `Retry-After`.
- The committed OpenAPI snapshot is validated and checked for drift in CI.

## References

- [`references/stack.md`](references/stack.md): each spec requirement mapped to the ScaleDock stack and PermDock.

## License

MIT
