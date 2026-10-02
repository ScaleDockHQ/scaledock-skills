# Toolchain

Node, pnpm, TypeScript, the workspace file, the shared tsconfig presets, Knip, and the exact root script names.

Applies to every repo kind. A tooling repo without TypeScript skips the tsconfig presets and Knip, and a repo without workspaces drops `packages` from the workspace file.

## Runtime and package manager

- **Node:** the highest major that Vercel supports. Check the Vercel runtime docs when you run, and never use a higher one.
  - `.node-version` and `.nvmrc` contain that major.
  - `engines.node` and `devEngines.runtime` are `"<major>.x"` (`devEngines` with `onFail: "download"`).
  - `@types/node` is the latest release on that major.
  - Node strips TypeScript types natively, so never pass `--experimental-strip-types`.
- **pnpm:** the latest release, as an exact version in `packageManager`, `engines` and `devEngines.packageManager` (`onFail: "error"`), never a range.
- **Root `package.json`:** `"private": true`, `"type": "module"`, `"license": "MIT"`.
- **TypeScript:** the latest `typescript` release, which is the native Go compiler from 7.0 on.
  - Never install `@typescript/native-preview` (retired) or `@typescript/typescript6`. Nothing in the standard needs the JS compiler API: Knip parses with oxc, Next runs the project-local `tsc`, and oxlint type-checks through tsgolint.
  - `typecheck` is `tsc --noEmit`. Leave `--checkers` and `--builders` at their defaults; use `--singleThreaded` only on a memory-constrained runner, with a comment.
  - `typescript` and `oxlint-tsgolint` move together, because tsgolint tracks the TypeScript version.

## `pnpm-workspace.yaml`

```yaml
packages: [apps/*, packages/*, tests/*]
catalog: {} # every dependency at its resolved latest version, written exactly
catalogMode: strict
nodeLinker: isolated
saveExact: true
savePrefix: ""
strictPeerDependencies: true
strictDepBuilds: true
engineStrict: true
minimumReleaseAge: 1440
minimumReleaseAgeExcludePrune: true # drop excludes the lockfile no longer resolves
trustPolicy: no-downgrade
trustPolicyExcludePrune: true # same for trustPolicyExclude
allowBuilds: { lefthook: true, supabase: true, esbuild: true } # each entry reviewed and commented
nodeOptions: "${NODE_OPTIONS:- } --disable-warning=MODULE_TYPELESS_PACKAGE_JSON"
overrides:
  {
    typescript: "catalog:",
    react: "catalog:",
    react-dom: "catalog:",
    next: "catalog:",
  }
```

Every workspace dependency is `catalog:` or `workspace:*`. Every override, `minimumReleaseAgeExclude` entry, `allowBuilds` entry and patch has a comment explaining why.

- pnpm fails on a key it does not recognize when the pinned version is running, so check every key against the installed `pnpm-workspace.yaml` docs.
- An explicit `minimumReleaseAge` makes `minimumReleaseAgeStrict` true, so a too-young version stops with an approval prompt instead of being excluded silently. Never approve it to get around the policy.

With Expo (see [`expo.md`](expo.md)):

- `overrides` adds `react-native: "catalog:"`, so `apps/*` and `packages/ui` resolve one copy. Two copies break the Uniwind `className` types.
- `react-native` is the version the installed Expo SDK bundles, even when that is an rc. It is a pre-release pin for as long as it is one.
- `minimumReleaseAgeExclude` lists `expo`, `expo-*`, `@expo/*`, `jest-expo` and `babel-preset-expo` only in the days after an SDK release, with a comment and a removal date, because Expo publishes the whole SDK at once.

## TypeScript config

`packages/typescript-config/base.json`:

- **Output:**
  - `target` and `lib`: the newest ECMAScript year that both the installed TypeScript and the Node runtime support.
  - `module: Preserve`. `esModuleInterop` is always on and can no longer be set.
  - `moduleResolution: bundler`, `moduleDetection: force`, `noEmit`.
  - `types: []`, so each package lists its own `types` (`["node"]` for anything that touches Node globals).
  - Never `baseUrl`; it is removed. Write the full prefix into each `paths` entry.
- **Defaults to keep explicit.** TypeScript 7 already defaults to `strict`, `types: []`, `noUncheckedSideEffectImports`, `libReplacement: false` and `rootDir: "./"`, and `stableTypeOrdering` is always on. List the strictness options anyway, so the preset reads the same to people and agents and a default change cannot loosen it.
- **Strictness:** `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `allowUnreachableCode: false`, `allowUnusedLabels: false`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`, `useUnknownInCatchVariables`, `noUncheckedSideEffectImports`.
- **Modules and syntax:** `verbatimModuleSyntax`, `allowImportingTsExtensions`, `isolatedModules`, `erasableSyntaxOnly`, `resolveJsonModule`, `forceConsistentCasingInFileNames`, `skipLibCheck`.

Also:

- `library.json` adds `isolatedDeclarations`. Published packages build with tsdown.
- `react-library.json` extends `library.json` and adds `jsx: "react-jsx"` and the `DOM` and `DOM.Iterable` libs, for `packages/ui` and other React packages.
- `next.json` extends `base.json` and adds `jsx: "preserve"`, the `DOM` libs, `allowJs` with `checkJs` and the `next` TypeScript plugin, for every Next app.
- `Temporal` types come from `temporal-polyfill` until the `lib` of the installed TypeScript declares them (see [`architecture.md`](architecture.md)).
- `expo.json` (with Expo) extends `expo/tsconfig.base` and adds this repo's strictness options, for Expo apps. `packages/ui` uses it instead of `react-library.json` when it targets React Native.
- The root `tsconfig.json` covers tooling files through `typecheck:tooling`.

## Knip

`knip.mts` lists workspaces explicitly and sets `treatConfigHintsAsErrors: true`, `tags: ["-internal"]`, `ignoreExportsUsedInFile` for types, and `ignoreBinaries: ["vercel"]`.

## Root script names (exact)

- **Dev:** `dev`, `dev:<app>`, `dev:portless`, `dev:oauth`, `dev:hosted`, `dev:cleanup`, `email:dev`.
- **Quality:**
  - `build`, `format`, `format:check`, `lint`, `lint:root`, `typecheck`, `typecheck:tooling`, `knip`, `boundaries`, `audit:high`, `docs:drift`, `openapi:check`, `i18n:check`, `doctor`, `check:publish` (libraries only), and `analyze` (`next analyze`, with Next apps; not part of `verify`).
  - `check` is `format:check`, `lint` and `typecheck`: the fast gate.
  - `verify` is `check`, `knip`, `test`, `boundaries`, `audit:high`, `openapi:check`, `i18n:check`, `docs:drift` and `doctor`, skipping the scripts the repo does not have. It runs every gate CI runs, so a green `verify` means a green CI.
  - `doctor` runs every installed doctor: `better-supabase doctor`, `permdock doctor`, and `expo-doctor` with Expo.
- **Tests:** `test`, `test:e2e`, `test:integration`, and `test:components` with Expo.
- **Expo:** `ios`, `android` (`expo run:*`), `native:prepare` (`expo prebuild --clean --no-install`, never part of the daily loop).
- **Offline:** `sync:start`, `sync:stop`, `sync:reset`, `sync:logs`.
- **Releases:** `changeset`, `version-packages`, `release`.
- **Env:** `env:pull`, `env:pull:production`, `env:local`.
- **Database:** `supabase:start`, `supabase:stop`, `supabase:reset`, `supabase:diff` (`supabase db schema declarative sync`), `supabase:pull` (`supabase config pull`), `supabase:types`, `supabase:test`, `supabase:signing-key`, `db:gen`.
- **Other:** `openapi:generate`, `prepare`.
