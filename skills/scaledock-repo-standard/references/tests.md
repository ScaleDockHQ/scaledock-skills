# Tests

The test runners per layer, and the rules every test follows.

Applies to every repo kind that has code.

- **Focus:** unit and integration tests (Vitest, pgTAP, the in-process MCP and CLI tests) are the required layers. e2e and UI tests are slow to run and rarely catch what those layers miss, so they are not required.
- **Vitest** for unit, integration and `expectTypeOf` tests, run from a root `vitest.config.ts` with projects:
  - `test.projects` references each workspace's `vitest.config.ts`. A referenced config may declare its own nested projects, for example `unit` and `integration`.
  - Inline projects inherit the root config and share one Vite server, so shared options live once in the root. Set `extends: false` only for a project that must not inherit, with a comment saying why.
  - Vitest no longer looks for configs in parent folders, so always run from the root (`pnpm test`, or `vitest -p <project>` for one project).
  - Coverage thresholds use `autoUpdate: !process.env.CI && <condition>`, so CI never rewrites them. Raise thresholds only from a run of the same test set CI runs; a local run that adds integration tests raises them past what CI reaches, and `main` fails after the merge.
  - Keep the threshold about one point under the measured number. V8 coverage on Linux CI and on macOS differs by a fraction of a point, so a threshold set to the exact local value fails in CI.
  - A floor only goes up. Never lower a threshold or add a coverage exclude to get a green run: add the test, or extract the logic so it can be tested. An exclude is for an entry point that only wires process state, or UI, and needs an ADR (Lienlink ADR 0012). A file no test imports still counts: a `load-sources` test imports every source file.
  - Suites that share one database or one process restore every global they change (env, `fetch`, timers, singletons) in `afterAll`, so the next file starts clean.
  - Build file paths with `import.meta.dirname`, never `process.cwd()` or a `new URL(..., import.meta.url)` chain, so a test runs the same from the root and from its workspace.
  - Dates in tests are `Temporal` values, and fake time goes through `vi.setSystemTime`, never a hand-rolled clock.
- **jest-expo** for Expo component tests (`test:components`), because it is the first-party preset that transforms the Expo SDK outside Metro. Switching to `vitest-native` needs an ADR.
  - Two Jest projects: `native` (`preset: "jest-expo"`, the `react-native` export condition) and `web` (`preset: "jest-expo/web"`, the `browser` condition, `*.web.test.tsx`).
  - React Native Testing Library for `native`, Testing Library for `web`. RNTL 14 follows the React 19 model: `render`, `fireEvent`, `renderHook` and `act` return promises, and `screen` is empty until the render resolves, so every component test is `async` and awaits them.
  - Native-only modules (`@expo/ui`, keyboard-controller, Sentry) are mocked in `tests/components/mocks/` through `moduleNameMapper`, never with `jest.mock` in a test.
  - Pure logic in Expo apps still runs on Vitest.
- **App config test** (with Expo): asserts the `app.config.ts` variants, plugin options, `ios`/`android` scripts and any native patch, so a config regression fails before a native build.
- **Playwright** (optional): add it only for a few critical journeys that lower layers cannot cover, such as sign-in or checkout across the real stack, and keep it out of `pnpm verify`.
  - When present, it runs with `@axe-core/playwright` at mobile and desktop viewports, and `@next/playwright` `instant()` for Next apps.
  - A universal Expo app runs Playwright against its exported web build.
  - On docs and marketing, URL-backed tabs, the copy button and dialogs count as critical journeys, because no lower layer runs them on a prerendered page.
- **Web surface e2e** (docs, marketing and app, when Playwright is present). Run against `next build` and `next start`, never `next dev`:
  - axe in light and dark mode, and no horizontal scroll at a 360px viewport (`document.documentElement.scrollWidth <= innerWidth`).
  - Clipboard: wait for hydration before clicking, grant clipboard permissions, and assert on the clipboard contents and the "Copied" status. Never locate by text that also appears in the copied value, or the locator matches the code block.
  - URL state on a prerendered page: open a URL with `?tab=` (or `?platform=`, `&package=`), check the selected tab, switch tabs, and check both the URL and the panel.
  - Dialogs: the "Get code" dialog opens from the keyboard, and axe passes while it is open.
- **`lib/` unit tests.** Every helper in a web app's `lib/` has a Vitest test: parsers (a SQL schema parser runs against rendered fixtures, never a live database), graph layouts, prompt builders, the entity icon map, and the integration list's completeness against the docs content (see [`web-design.md`](web-design.md)).
- **pgTAP** for RLS, grants and the audit triggers.
- **No containers in tests.** Integration suites and e2e servers that need Postgres use the checkout's native Supabase stack, and a suite that needs a clean database creates and drops one there. Testcontainers and `docker` calls are not used, so `pnpm verify` runs without a container engine (see [`data-permissions.md`](data-permissions.md)).
- **Conformance suites.** Every standard the repo claims to follow (in docs, AGENTS.md or a standards page) has a conformance suite in `tests/conformance/` of the workspace that serves it, and a row that links the suite. A claim without a suite is removed. When a suite fails, fix the server, not the assertion.
- **In-process tests** for MCP and the CLI (see [`mcp.md`](mcp.md) and [`cli.md`](cli.md)). An OpenAPI snapshot test for the API.
- **CLI tests:**
  - Call `run()` in-process with fake IO: stdout, stderr, env, `readStdin` and `fetch`.
  - Snapshot every leaf's help (`tests/cli/__snapshots__/help/<leaf>.txt`), and the completion scripts.
  - Validate real envelopes and `--help --json` output against `schemas/cli-result-v1.json` and `cli-commands-v1.json`.
  - Keep one smoke test that spawns the built bin and checks the usage line and an envelope error.
  - A startup-imports test fails when `--help` or `--version` reaches a command module.
  - **Docs drift from the manifest** (`tests/cli/docs-flags.test.ts`): every global flag is on the CLI index page, every leaf flag is on its command's page, no table lists a flag the command does not take (whole-word match), and each page's `## Side effects` table equals `entry.effects` (`None` when empty).
  - Integration tests that read CLI JSON run in CI, because a local `verify` skips them. That is where an envelope change breaks a redirected `--json` consumer.
- **CLI coverage.** Aim high on the CLI folder (PermDock: 96% branches and 98% statements on `src/cli/**`). Unreachable defensive branches are what make that expensive, so write code without them:
  - Type AST nodes from the parser with required `type` and `start`.
  - Use `for (const [i, x] of xs.entries())` when the loop does not skip.
  - Use `beforeFirst(text, sep)` instead of `split(sep)[0] ?? x`.
  - Use one shared `byCodeUnit` or `byKey` comparator instead of inline ternaries.
  - Leave no guards for flags the strict parser already rejects.
  - Read a required positional once.
- **Rules:**
  - Mock at the feature hook or service boundary, never the transport.
  - No `.only` or `.skip`.
  - Fix code, not tests.
  - No PII in fixtures.
