# Lint and format (one package, maximum strictness)

The `ox-config` package, the oxlint presets and pinned rules, the JS plugins, the `anti-slop` plugin, and oxfmt.

## `packages/ox-config`

It exports:

- The presets `core`, `react`, `node`, `library`, `test` and `playwright`.
- `ignores`, the `oxfmt` config and the local `anti-slop` plugin.

The root `oxlint.config.ts` covers root tooling. Each workspace extends only the presets it needs.

## `core` preset

- Plugins: `eslint`, `typescript`, `oxc`, `unicorn`, `import`, `node`, `promise`.
- The `correctness` and `suspicious` categories at error.
- `typeAware: true`, `denyWarnings`, and `reportUnusedDisableDirectives: "error"`.

## Pinned rules

- General: `eqeqeq`, `no-empty`, `import/no-cycle`, `import/no-unassigned-import`, `turbo/no-undeclared-env-vars`, `node/no-process-env`, `no-restricted-imports`.
- `typescript/`: `switch-exhaustiveness-check`, `only-throw-error`, `return-await`, `unbound-method`, `await-thenable`, `consistent-type-imports`, `no-explicit-any`, `no-misused-promises`, `no-floating-promises`, `no-deprecated`, `no-non-null-assertion`, `prefer-optional-chain`, `prefer-nullish-coalescing`, `no-unsafe-*`, `no-unnecessary-condition`, `strict-boolean-expressions`.

## `react` preset

`react`, `jsx-a11y` with every rule at error, the react-doctor effect rules, and `@shadcn/lint`.

## JS plugins

`eslint-plugin-turbo`, `oxlint-plugin-react-doctor`, `@shadcn/lint`, `eslint-plugin-playwright` and `anti-slop`.

## `anti-slop`

All 15 rules at error:

- Type assertions and widening: `no-chained-type-assertions`, `require-safety-comment-for-type-assertion`, `no-widen-then-assert`, `no-known-value-widening`.
- `unknown` and loose types: `no-unknown-parameters`, `no-unknown-returns`, `no-unknown-type-aliases`, `no-unsafe-dictionary-type`.
- Shape and style: `no-object-parameters`, `no-conditional-empty-object-spread`, `no-shape-in-symbol-names`, `no-runtime-typeof`.
- Reflection and mocks: `no-reflect-apply`, `no-reflect-get`, `no-module-mocking`.

A rule that is turned off carries the reason and the measured finding count.

## `oxfmt`

The same file in every repo. Check the option names against the installed docs.

- `printWidth: 80`, double quotes, semicolons, `trailingComma: "all"`.
- `sortImports` with type imports first and an `internalPattern` for `@/` and `@{{SCOPE}}/`.
- `sortPackageJson` with sorted scripts.
- Tailwind class sorting for `cn`, `cva` and `tv`.
- Agent folders and generated files are ignored.
