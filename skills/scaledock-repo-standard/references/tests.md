# Tests

The test runners per layer, and the rules every test follows.

- **Vitest** for unit, integration and `expectTypeOf` tests, run from a root `vitest.config.ts` with projects. Expo apps keep jest-expo with React Native Testing Library.
- **Playwright** with `@axe-core/playwright` and `@next/playwright` `instant()`, at mobile and desktop viewports.
- **pgTAP** for RLS, grants and the audit triggers.
- **In-process tests** for MCP and the CLI (see [`mcp.md`](mcp.md) and [`cli.md`](cli.md)). An OpenAPI snapshot test for the API.
- **Rules:**
  - Mock at the feature hook or service boundary, never the transport.
  - No `.only` or `.skip`.
  - Fix code, not tests.
  - No PII in fixtures.
