# Lint and format (Ultracite on Oxlint and Oxfmt)

Lint and format with [Ultracite](https://www.ultracite.ai) 8 on Oxlint and Oxfmt: the root config, the workspace configs, the scripts, the house rules, the `anti-slop` preset, and oxfmt.

Applies to every repo kind with JS or TS code. Pin `ultracite`, `oxlint`, `oxfmt` and `oxlint-tsgolint` exactly in the catalog, and check preset paths and option names against the installed package before changing a config.

## Root `oxlint.config.ts`

One root config holds every repo rule. It extends the Ultracite presets, then adds the house rules after them.

```ts
import { defineConfig, type OxlintConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import shadcn from "ultracite/oxlint/shadcn";
import vitest from "ultracite/oxlint/vitest";

const jsPlugins = selectJsPlugins(["react-doctor", "tsdoc"]);

export default defineConfig({
  extends: [core, vitest, shadcn, antiSlop, jsPlugins],
  jsPlugins: [
    ...jsPlugins.jsPlugins,
    ...shadcn.jsPlugins,
    "eslint-plugin-turbo",
    // eslint-plugin-testing-library and eslint-plugin-playwright through require.resolve
  ],
  options: {
    denyWarnings: true,
    reportUnusedDisableDirectives: "error",
    typeAware: true,
  },
  ignorePatterns: [
    ...core.ignorePatterns,
    ".agents/**",
    ".claude/**",
    ".cursor/**" /* generated and vendored paths */,
  ],
  rules: {
    // house rules, below
  },
  settings: { ...jsPluginSettings, shadcn: { ui: "@workspace/ui/components" } },
}) satisfies OxlintConfig;
```

- `typeAware`, `denyWarnings` and `reportUnusedDisableDirectives` go only in the root config; workspace configs never set them.
- Drop presets the repo has no use for (`shadcn` without shadcn, `vitest` without Vitest), and add the Ultracite preset for each test runner or framework it does use.
- Do not add `eslint-plugin-github`: it loads `typescript-eslint`, which rejects TypeScript 7.
- When lint gets slow, run `oxlint --debug timings` and fix or document the expensive rule before turning anything off.

## Workspace configs

Each workspace has an `oxlint.config.ts` that extends the root and only the framework presets it needs:

- Next.js apps: `extends: [root, react, next, nextJsPlugins]`, from `ultracite/oxlint/react`, `ultracite/oxlint/next` and `ultracite/oxlint/next/js-plugins`.
- Other React workspaces: `extends: [root, react]`.
- Everything else: `extends: [root]`.

Every workspace config sets `ignorePatterns: root.ignorePatterns` and `settings: root.settings`, and imports the root through a relative path with a `// @boundaries-ignore` comment, because Turborepo boundaries reject imports outside the package. Its `lint` script is `oxlint`.

## Scripts

| Script      | Command                                                                          |
| ----------- | -------------------------------------------------------------------------------- |
| `check`     | `ultracite check`                                                                |
| `fix`       | `ultracite fix`                                                                  |
| `lint`      | `turbo run lint && pnpm lint:root`                                               |
| `lint:root` | `oxlint --disable-nested-config` with `--ignore-pattern` for each workspace glob |
| `format`    | `oxfmt`                                                                          |

`lint:root` lints root tooling (configs, scripts) without linting the workspaces twice. The pre-commit hook runs `ultracite fix` on staged files (see [`git-workflow.md`](git-workflow.md)).

## House rules

These go in the root `rules` after the presets, so they win:

- `no-restricted-imports`: the one-library-per-concern bans, and `date-fns`, `@date-fns/*`, `dayjs`, `luxon` and `moment`; dates use `Temporal` (see [`architecture.md`](architecture.md)). Export the path and pattern arrays so a workspace that adds its own bans can spread them.
- `node/no-process-env` at error, with an override that allows it in `env.ts` modules, config files, scripts, `bin/` and tests.
- `turbo/no-undeclared-env-vars`, and `import/no-unassigned-import` with an allow list for CSS and side-effect entries.
- Playwright and Testing Library rules scoped to test files with `overrides`.
- `switch-exhaustiveness-check` and the other type-aware `typescript/` rules stay at error. Ultracite's `core` turns them on; never turn one off to get a green run.

A rule that is turned off carries a comment with the reason and the measured finding count. Fix the code when a rule fires. A disable comment is only for a case the code cannot change, and it names the rule and the reason. Every `as T` carries a `SAFETY:` comment.

Bump `typescript` and `oxlint-tsgolint` in the same commit; tsgolint runs the type-aware rules.

## `react-native` and `expo`

Expo apps extend the root and `react`, then add:

- The react-doctor `rn-*` rules (`rn-prefer-pressable`, `rn-prefer-expo-image`, raw text outside `<Text>`).
- `no-restricted-imports` bans: `TouchableOpacity` and the other `Touchable*` components, `StyleSheet.create`, core `Image`, JS stack and tab navigators, and JS bottom-sheet libraries.
- `process.env.EXPO_OS` and `EXPO_PUBLIC_*` reads allowed only in `env.ts` and platform-branching modules, and no imports of `@/app/*` from features.
- Uniwind generates its types before `lint` and `typecheck` (`uniwind generate-artifacts`), so class names are checked.

## `anti-slop`

`ultracite/oxlint/anti-slop` turns on all 15 rules at error:

- Type assertions and widening: `no-chained-type-assertions`, `require-safety-comment-for-type-assertion`, `no-widen-then-assert`, `no-known-value-widening`.
- `unknown` and loose types: `no-unknown-parameters`, `no-unknown-returns`, `no-unknown-type-aliases`, `no-unsafe-dictionary-type`.
- Shape and style: `no-object-parameters`, `no-conditional-empty-object-spread`, `no-shape-in-symbol-names`, `no-runtime-typeof`.
- Reflection and mocks: `no-reflect-apply`, `no-reflect-get`, `no-module-mocking`.

## `oxfmt.config.ts`

```ts
import type { OxfmtConfig } from "oxfmt";

import ultracite from "ultracite/oxfmt";

import root from "./oxlint.config.ts";

export default {
  ...ultracite,
  ignorePatterns: root.ignorePatterns,
  // sortImports, sortPackageJson, sortTailwindcss
} satisfies OxfmtConfig;
```

- Keep Ultracite's defaults: `printWidth: 80`, double quotes, semicolons, `trailingComma: "all"`.
- `sortImports` with type imports first and an `internalPattern` for `@/` and `@{{SCOPE}}/`.
- `sortPackageJson` with `sortScripts`.
- `sortTailwindcss` with `functions: ["cn", "cva", "tv"]` and the app stylesheet.
- oxfmt formats JS, TS, JSON, CSS and TOML natively, and Markdown, MDX and YAML through its bundled Prettier. Never install Prettier or Biome alongside it.
- oxfmt reuses the lint ignores, so agent folders and generated files stay byte-identical to upstream. This is a formatter ignore only; they are still committed.

## Migrating from `packages/ox-config`

Repos on 1.9 or earlier have a `packages/ox-config` workspace with their own presets. To move to Ultracite:

1. Add `ultracite` to the catalog and the root `devDependencies`.
2. Move the repo-specific rules (restricted imports, env reads, overrides, documented off-list entries) from `ox-config` into the root `oxlint.config.ts`, after the presets.
3. Point each workspace config at the root and the Ultracite framework presets, and `oxfmt.config.ts` at `ultracite/oxfmt`.
4. Delete `packages/ox-config`, remove it from every `package.json`, and drop its Turbo boundary tag.
5. Run `pnpm check`, fix what it reports, and record the move in the changeset or commit note.
