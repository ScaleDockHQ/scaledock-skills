# Tests

The test runners per layer, and the rules every test follows.

Applies to every repo kind that has code.

- **Focus:** unit and integration tests (Vitest, pgTAP, the in-process MCP and CLI tests) are the required layers. e2e and UI tests are slow to run and rarely catch what those layers miss, so they are not required.
- **Vitest** for unit, integration and `expectTypeOf` tests, run from a root `vitest.config.ts` with projects:
  - `test.projects` references each workspace's `vitest.config.ts`. A referenced config may declare its own nested projects, for example `unit` and `integration`.
  - Inline projects inherit the root config and share one Vite server, so shared options live once in the root. Set `extends: false` only for a project that must not inherit, with a comment saying why.
  - Vitest no longer looks for configs in parent folders, so always run from the root (`pnpm test`, or `vitest -p <project>` for one project).
  - Coverage thresholds use `autoUpdate: !process.env.CI && <condition>`, so CI never rewrites them. Raise thresholds only from a run of the same test set CI runs; a local run that adds integration tests raises them past what CI reaches, and `main` fails after the merge.
  - Dates in tests are `Temporal` values, and fake time goes through `vi.setSystemTime`, never a hand-rolled clock.
- **jest-expo** for Expo component tests (`test:components`), because it is the first-party preset that transforms the Expo SDK outside Metro. Switching to `vitest-native` needs an ADR.
  - Two Jest projects: `native` (`preset: "jest-expo"`, the `react-native` export condition) and `web` (`preset: "jest-expo/web"`, the `browser` condition, `*.web.test.tsx`).
  - React Native Testing Library for `native`, Testing Library for `web`.
  - Native-only modules (`@expo/ui`, keyboard-controller, Sentry) are mocked in `tests/components/mocks/` through `moduleNameMapper`, never with `jest.mock` in a test.
  - Pure logic in Expo apps still runs on Vitest.
- **App config test** (with Expo): asserts the `app.config.ts` variants, plugin options, `ios`/`android` scripts and any native patch, so a config regression fails before a native build.
- **Playwright** (optional): add it only for a few critical journeys that lower layers cannot cover, such as sign-in or checkout across the real stack, and keep it out of `pnpm verify`.
  - When present, it runs with `@axe-core/playwright` at mobile and desktop viewports, and `@next/playwright` `instant()` for Next apps.
  - A universal Expo app runs Playwright against its exported web build.
- **pgTAP** for RLS, grants and the audit triggers.
- **In-process tests** for MCP and the CLI (see [`mcp.md`](mcp.md) and [`cli.md`](cli.md)). An OpenAPI snapshot test for the API.
- **Rules:**
  - Mock at the feature hook or service boundary, never the transport.
  - No `.only` or `.skip`.
  - Fix code, not tests.
  - No PII in fixtures.
