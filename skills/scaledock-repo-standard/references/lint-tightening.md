# Lint tightening

How a run turns disabled lint rules back on: the inventory, the method, the order of the rule groups, the rules that stay off, and how the run records the result.

Applies to every repo kind with JS or TS code, after the toolchain bumps in [`lint-format.md`](lint-format.md). Rule names below are the oxlint names; check each one and its options against the installed oxlint, Ultracite and plugin versions before configuring it.

## Inventory

1. List every rule that is `off` in the root `oxlint.config.ts`, the presets it extends (or `packages/ox-config`), the workspace configs, and every `overrides` entry, test overrides included.
2. Measure each count again by removing the `off` line and running `oxlint`, so the preset's own options apply. The count in an old comment is out of date after a bump.
3. Sort the rules into the groups below, and mark the ones the keep-off table or an ADR covers.

Before the first commit, ask the user about any group that conflicts with an ADR or an invariant in the repo.

## Method

- One commit series per group, in the order below. A large rule gets its own commits, split by source folder.
- Run the autofix where the rule has one (`oxlint --fix`, then `--fix-suggestions` after reading them), and fix the rest by hand.
- Use an inline disable only for a site that is deliberate. It names the rule and the reason, and `reportUnusedDisableDirectives` keeps it honest.
- Never put a blanket `off` back. A rule that a run does not fully clear stays off, with its comment updated to the new count. The PR never lands a rule that is on for part of the code with no stated reason.
- Run `pnpm check` after each commit, and that folder's tests after each commit that changes behavior-adjacent code.

## Groups, in order

1. **Small, mostly autofix.** Every rule with fewer than about 150 findings and an autofix.
2. **Medium, and rules that need reading.** These include `require-unicode-regexp` (the `u` or `v` flag changes what some patterns match, so read each one) and `typescript/no-base-to-string`.
3. **Stricter types.** `typescript/method-signature-style` and `vitest/prefer-strict-equal`. Fix the real failures that `toStrictEqual` surfaces (`undefined` properties, class instances, sparse arrays); never go back to `toEqual`.
4. **Bug finders.** `no-accumulating-spread`, `no-map-spread`, the `promise/*` rules, `no-useless-spread`, `prefer-add-event-listener`, and `typescript/no-floating-promises` and `typescript/no-misused-promises` in test overrides.
5. **Anti-slop without a backlog.** `no-object-parameters`, `no-unknown-returns` and `no-known-value-widening`. Leave the anti-slop rules that depend on a decoder or schema backlog for an ADR.
6. **UI.** `shadcn/no-restyle` (style through variants, not class overrides; see [`ui.md`](ui.md)), and every `react/*` and react-doctor rule with 5 or fewer findings.
7. **Test structure.**
   - `import/consistent-type-specifier-style`, set to match the oxfmt `sortImports` groups so lint and format never fight.
   - `vitest/prefer-import-in-mock`, `vitest/require-top-level-describe`, the padding rules, `vitest/prefer-describe-function-title`, `vitest/prefer-expect-type-of`, `vitest/consistent-test-filename` and `vitest/prefer-importing-vitest-globals`.
8. **Large style codemods.** Configure each to match the repo before measuring:
   - `func-style`: `["error", "declaration", { allowArrowFunctions: true }]`. Convert the rest by hand, because a declaration is hoisted and an expression is not.
   - `sort-keys`: off in an override for serializers, generators and spec fixtures, where key order reaches output.
   - `unicorn/no-await-expression-member` and `vitest/prefer-expect-resolves`.
   - `vitest/max-expects`: measure the current maximum per test, then set the threshold at the level the run reaches after splitting outliers.
   - `react/function-component-definition`: `function-declaration` for named and unnamed components.
9. **Large type-safety backlogs.**
   - `typescript/no-non-null-assertion` first, then `typescript/strict-boolean-expressions` with `allowString: false` and `allowNullableObject: true`.
   - Rewrite each check so behavior stays exactly the same: `if (name)` on a `string` becomes `if (name !== "")`, and on `string | undefined` it becomes `if (name !== undefined && name !== "")`.
   - Go one source folder at a time, and run that folder's tests after each commit.

## Keep off

These stay off, each with its reason in the comment beside the `off` line:

| Rule                                                      | Reason                                                                                                                                                          |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `consistent-return`, `no-useless-return`                  | Conflict with `noImplicitReturns`, which the compiler already enforces.                                                                                         |
| `no-conditional-empty-object-spread`                      | Conflicts with `exactOptionalPropertyTypes`, where `...(x ? { key } : {})` is how an optional key is left out.                                                  |
| `typescript/promise-function-async`                       | Making a function `async` turns its synchronous throws into rejections, so it changes when errors throw.                                                        |
| `typescript/prefer-readonly-parameter-types`              | Fires on almost every library type, with no fix the code can apply.                                                                                             |
| `no-await-in-loop`, `unicorn/consistent-function-scoping` | Off only where the code does it on purpose (ordered writes, rate limits, closures over scope), with an inline disable per site, or an override for that folder. |
| `vitest/prefer-to-be-truthy`, `vitest/prefer-to-be-falsy` | Weaken assertions: `toBe(true)` checks the exact value.                                                                                                         |

Rules that an ADR marks as off by design, or ties to an architectural backlog, stay off until the user agrees to take them on.

## Record the result

- Update the comment beside every `off` line with the new count, and remove the lines for rules now on.
- Update the ADR or AGENTS.md deviation that lists the lint backlogs and off-by-design rules: new counts, removed rows.
- Put a table of every rule touched in the PR body: rule, count before, count after, and whether it is now on (see [`assets/report.md`](../assets/report.md)).
