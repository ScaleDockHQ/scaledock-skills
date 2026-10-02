# Toolchain

Node, pnpm, TypeScript, the workspace file, the shared tsconfig presets, Knip, and the exact root script names.

## Runtime and package manager

- **Node:** the highest major that Vercel supports. Check the Vercel runtime docs when you run, and never use a higher one.
  - `.node-version` and `.nvmrc` contain that major.
  - `engines.node` and `devEngines.runtime` are `"<major>.x"` (`devEngines` with `onFail: "download"`).
  - `@types/node` is the latest release on that major.
  - Node strips TypeScript types natively, so never pass `--experimental-strip-types`.
- **pnpm:** the latest release, as an exact version in `packageManager`, `engines` and `devEngines.packageManager` (`onFail: "error"`), never a range.
- **Root `package.json`:** `"private": true`, `"type": "module"`, `"license": "MIT"`.
- **TypeScript:** the latest release with the native compiler (`tsc` from the native line, even while that line is in pre-release).

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
trustPolicy: no-downgrade
publicHoistPattern: ["@typescript/*"]
allowBuilds: { lefthook: true, supabase: true, esbuild: true } # each entry reviewed and commented
nodeOptions: "${NODE_OPTIONS:- } --disable-warning=MODULE_TYPELESS_PACKAGE_JSON"
overrides: { typescript: "catalog:", react: "catalog:", react-dom: "catalog:", next: "catalog:" }
```

Every workspace dependency is `catalog:` or `workspace:*`. Every override, `minimumReleaseAgeExclude` entry, `allowBuilds` entry and patch has a comment explaining why.

## TypeScript config

`packages/typescript-config/base.json`:

- **Output:**
  - `target` and `lib`: the newest ECMAScript year that both the installed TypeScript and the Node runtime support.
  - `module: Preserve`. It implies `esModuleInterop`, so don't set that.
  - `moduleResolution: bundler`, `moduleDetection: force`, `noEmit`.
  - `types: []`, so each package lists its own `types`.
- **Strictness:** `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `allowUnreachableCode: false`, `allowUnusedLabels: false`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`, `useUnknownInCatchVariables`, `noUncheckedSideEffectImports`.
- **Modules and syntax:** `verbatimModuleSyntax`, `allowImportingTsExtensions`, `isolatedModules`, `erasableSyntaxOnly`, `resolveJsonModule`, `forceConsistentCasingInFileNames`, `skipLibCheck`.

Also:

- `library.json` adds `isolatedDeclarations`. Published packages build with tsdown.
- The root `tsconfig.json` covers tooling files through `typecheck:tooling`.

## Knip

`knip.mts` lists workspaces explicitly and sets `treatConfigHintsAsErrors: true`, `tags: ["-internal"]`, `ignoreExportsUsedInFile` for types, and `ignoreBinaries: ["vercel"]`.

## Root script names (exact)

- **Dev:** `dev`, `dev:<app>`, `dev:portless`, `dev:oauth`, `dev:hosted`, `dev:cleanup`, `email:dev`.
- **Quality:**
  - `build`, `format`, `format:check`, `lint`, `lint:root`, `typecheck`, `typecheck:tooling`, `knip`, `boundaries`, `audit:high`, `docs:drift`, and `check:publish` (libraries only).
  - `check` is `format:check`, `lint` and `typecheck`: the fast gate.
  - `verify` is `check`, `knip`, `test`, `boundaries`, `docs:drift` and the doctors.
- **Tests:** `test`, `test:e2e`, `test:integration`.
- **Releases:** `changeset`, `version-packages`, `release`.
- **Env:** `env:pull`, `env:pull:production`, `env:local`.
- **Database:** `supabase:start`, `supabase:stop`, `supabase:reset`, `supabase:diff`, `supabase:types`, `supabase:test`, `supabase:signing-key`, `db:gen`.
- **Other:** `openapi:generate`, `prepare`.
