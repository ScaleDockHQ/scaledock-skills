# Tests

The test runners per layer, and the rules every test follows.

Applies to every repo kind that has code.

- **Vitest** for unit, integration and `expectTypeOf` tests, run from a root `vitest.config.ts` with projects.
- **jest-expo** for Expo component tests (`test:components`), because it is the preset that transforms the Expo SDK outside Metro:
  - Two Jest projects: `native` (`preset: "jest-expo"`, the `react-native` export condition) and `web` (`preset: "jest-expo/web"`, the `browser` condition, `*.web.test.tsx`).
  - React Native Testing Library for `native`, Testing Library for `web`.
  - Native-only modules (`@expo/ui`, keyboard-controller, Sentry) are mocked in `tests/components/mocks/` through `moduleNameMapper`, never with `jest.mock` in a test.
  - Pure logic in Expo apps still runs on Vitest.
- **App config test** (with Expo): asserts the `app.config.ts` variants, plugin options, `ios`/`android` scripts and any native patch, so a config regression fails before a native build.
- **Playwright** with `@axe-core/playwright` at mobile and desktop viewports, and `@next/playwright` `instant()` for Next apps. A universal Expo app runs Playwright against its exported web build.
- **pgTAP** for RLS, grants and the audit triggers.
- **In-process tests** for MCP and the CLI (see [`mcp.md`](mcp.md) and [`cli.md`](cli.md)). An OpenAPI snapshot test for the API.
- **Rules:**
  - Mock at the feature hook or service boundary, never the transport.
  - No `.only` or `.skip`.
  - Fix code, not tests.
  - No PII in fixtures.
