---
name: rego
description: >-
  Rego v1 (OPA 1.x, pinned at OPA v1.21.1): write, test and review Open Policy Agent policies in Rego and call
  them through OPA's documented interfaces. Covers modules, packages and imports; complete, partial set, partial
  object, default, else and function rules; the if, contains, in, every, some, not and with keywords, opt-in
  and/or and improved not; comprehensions; verified built-ins; the input and data documents; opa test with
  mocking through with; opa check, strict mode, opa fmt and capabilities; bundles, .manifest roots, rego_version
  and signing; the /v1/data Data API; rule indexing and early exit; and deny-by-default authorization. Use when
  writing or reviewing .rego files, an allow or deny rule, a policy test, an OPA bundle or a decision call.
  Triggers: Rego, OPA, Open Policy Agent, policy as code, opa eval, opa test, opa build, POST /v1/data, rego.v1,
  future.keywords. Targets Rego v1 (OPA 1.x), upgrades from Rego v0 (OPA 0.x) with opa fmt --v0-v1, and tracks
  the unreleased import rego.v2 as a preview.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Rego

Rego is the declarative policy language of Open Policy Agent (OPA), a CNCF graduated project. Rego rules compute decisions as JSON-compatible documents from the `input` document and the `data` document. This skill pins OPA v1.21.1 and its documentation, and helps the agent write, test, package and query Rego policies that follow the documented language and OPA interfaces.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). OPA pages have no section numbers, so each rule cites the page and heading it comes from, for example (Policy Language, Default Keyword). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: policy author, reviewer, test author, bundle producer (`opa build`), or decision caller (an app that queries OPA).
- Decision shape: a boolean `allow`, a set of `deny` messages, or a structured object. This decides the rule kinds you use.
- Runtime: the OPA version of every consumer that loads the policy (OPA server, sidecar, `opa eval`, Go SDK, Wasm). Opt-in syntax such as `and`/`or` or `$"..."` strings needs a recent enough consumer.
- Target version: Rego v1 (OPA 1.x) is current and the default, at OPA v1.21.1. Rego v0 (OPA 0.x) is legacy: read it and upgrade from it, never author it. Rego v2 import (unreleased) is a preview (posture: track): never emit `import rego.v2`. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, check the OPA releases page for a newer release and read its CHANGELOG entry, re-read every URL in [Sources](#sources), and update the pins.

## Invariants

1. **Rule bodies use `if`; multi-value rules use `contains`.** In Rego v1 a rule with a body without `if` is a compile error, and a partial set rule needs `contains` (Upgrading to v1.0, Enforce use of `if` and `contains` keywords).
2. **Undefined is not false.** A rule whose body never succeeds is undefined, and so is any expression that refers to it, including `!=` (Policy Language, The Basics). Give every decision rule a `default` (Policy Language, Default Keyword). A deny rule written with `!=` or a positive check on a missing `input` field never fires, so write deny conditions as `not <required condition>`.
3. **Legacy `not` fails on undefined sub-expressions.** Without `import future.keywords.not`, `not "x" in input.missing` fails the whole rule instead of succeeding. Import it (OPA v1.17.0 or later) in modules whose `not` guards a denial (Rego Keyword: not, Improved Negation Semantics).
4. **A complete rule has one value.** Two definitions of a complete rule or function that produce different values are a conflict error (Policy Language, Complete Definitions; Functions).
5. **Bodies are AND, rule definitions are OR.** Expressions in a body must all hold; rules with the same name are unioned (Policy Language, The Basics; Incremental Definitions).
6. **Variables are existential.** `x := xs[_]; x != "a"` holds if some element differs. Express FOR ALL with `every`, or with `not` over a helper rule (Policy Language, Universal Quantification).
7. **Safety.** Every variable in a rule head, in a negated expression, or used as a built-in input must be bound by a non-negated expression in the same rule (Policy Language, Variables; Negation; Built-in Functions).
8. **Use `:=` and `==`, not `=`, unless you need unification.** `:=` declares a local and may not be repeated or used before assignment; `==` requires both sides to be bound (Policy Language, Assignment; Best Practices for Equality and Assignment).
9. **`input` and `data` are reserved.** No rule or variable may be named `input` or `data`; duplicate or shadowing imports are compile errors (Upgrading to v1.0, `input` and `data` keywords are reserved; Prohibit duplicate imports).
10. **Built-in errors are undefined by default.** A failing built-in call evaluates to undefined and does not halt evaluation unless strict built-in errors are on (Policy Language, Built-in Functions, Errors).
11. **Negating `every` is forbidden.** Write `some x in xs; not p(x)` instead (Policy Language, Every Keyword).
12. **`and` and `or` produce no value** and need `import future.keywords.and`/`or`; `rego.v1` does not enable them (Rego Keywords: and, or, Enabling; Expressions, not values).
13. **An undefined decision returns 200 with no `result`.** `POST /v1/data/{path}` answers an undefined document with HTTP 200 and omits `result`; callers must treat a missing `result` as no decision (REST API, Get a Document (with Input)).
14. **Bundles own their roots.** Without `roots` in `.manifest`, the bundle owns all of `data`; policies and data in a bundle must sit under its roots (Bundles, Bundle File Format; Multiple Sources of Policy and Data).
15. **Signed bundles activate only after verification.** OPA activates a signed bundle only if `.signatures.json` verifies with a key configured out of band (Bundles, Signing).

## Workflow

1. **Pick the version.** Write Rego v1. If the code has rule bodies without `if`, `p[x] { ... }` set rules, or `import rego.v1`, it is Rego v0 or written for both: plan the upgrade (step 9).
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is Rego v1, and the OPA version of every consumer is known.
2. **Lay out modules and packages.** One `package` per module, imports at the top, policy at `data.<package path>`. Put tests in a `<package>_test` package.
   -> [`references/language.md`](references/language.md)
   ✓ Every module has exactly one package, no unused or duplicate imports, and package paths match the decision paths callers query.
3. **Design the decision.** Choose deny-by-default: `default allow := false` with `allow if` rules, or a `deny contains msg if` set with `allow if count(deny) == 0`. Return structured decisions as an object rule.
   -> [`references/authorization-patterns.md`](references/authorization-patterns.md)
   ✓ Every decision rule queried by a caller has a `default`, and no path yields allow when `input` is missing a field.
4. **Write the rules.** Use the right rule kind (complete, partial set, partial object, function, `else` chain), `some ... in` for iteration, `in` for membership, `every` for FOR ALL, comprehensions for aggregation.
   -> [`references/language.md`](references/language.md)
   ✓ `opa check` passes, and no complete rule can produce two values.
5. **Use built-ins and data deliberately.** Use only built-ins in the reference index, and keep external data in `data` (bundles or the Data API) rather than `http.send` on the hot path.
   -> [`references/builtins-and-data.md`](references/builtins-and-data.md)
   ✓ Every built-in exists in the target OPA's capabilities, and failing built-ins cannot turn into allow.
6. **Test.** Write `test_` rules that mock `input`, `data` and functions with `with`; cover allow and deny for each rule; run `opa test` with coverage.
   -> [`references/testing-and-tooling.md`](references/testing-and-tooling.md)
   ✓ `opa test . -v` passes, `--fail-on-empty` is set in CI, and coverage meets the agreed `--threshold`.
7. **Check, format and tune.** Run `opa fmt`, `opa check --strict`, and `opa check --capabilities` for the oldest consumer. Apply the performance basics where latency matters.
   -> [`references/testing-and-tooling.md`](references/testing-and-tooling.md)
   ✓ `opa fmt --fail` and `opa check --strict` pass, and hot rules use indexable statements.
8. **Package and serve.** Build a bundle with `opa build`, declare `roots`, sign it when consumers verify, and query the decision through `POST /v1/data/<path>`.
   -> [`references/builtins-and-data.md`](references/builtins-and-data.md)
   ✓ The manifest has `revision` and `roots`, and the caller denies on a missing `result` or any non-200 response.
9. **Upgrade** (only when asked). Follow the Rego v0 to Rego v1 steps: upgrade bundle producers before consumers, run `opa check --v0-v1`, then `opa fmt --write --v0-v1`, then remove the v0 imports once every consumer is OPA 1.x.
   -> [`references/versions.md`](references/versions.md)
   ✓ `opa check` passes without `--v0-compatible`, and the tests give the same results as before.

## Verify before done

- [ ] Every rule with a body has `if`, and every multi-value rule has `contains` (Upgrading to v1.0).
- [ ] Every decision rule a caller queries has a `default`; the default for an authorization decision denies (Policy Language, Default Keyword).
- [ ] No FOR ALL is written as `x := xs[_]; x != v` (Policy Language, Universal Quantification).
- [ ] Evaluating every decision with `input` `{}` denies; deny conditions use `not` rather than `!=`, and modules that negate composite expressions import `future.keywords.not` (Rego Keyword: not).
- [ ] `opa fmt --fail`, `opa check --strict` and `opa test --fail-on-empty` pass (CLI Reference; Policy Language, Strict Mode).
- [ ] `opa check --capabilities` passes for the oldest consumer when opt-in syntax or newer built-ins are used (CLI Reference, check).
- [ ] Tests cover both outcomes of each `allow` and `deny` rule, and mocks use `with` (Policy Testing).
- [ ] The caller treats a missing `result`, an error, or a timeout as deny (REST API, Data API).
- [ ] Bundle `.manifest` declares `roots`, and signed bundles have a verification key configured (Bundles).
- [ ] Nothing emits `import rego.v2` (preview, posture track).

## Reference index

- **`references/versions.md`**: Rego v1, Rego v0 and the `rego.v2` preview, what OPA 1.0 changed, the producer-before-consumer upgrade and the `opa check`/`opa fmt` upgrade commands. Load for steps 1 and 9.
- **`references/language.md`**: modules, packages, imports, values, references, every rule kind, the keywords and operators, comprehensions, `with`, metadata annotations, and common mistakes. Load for steps 2 and 4.
- **`references/authorization-patterns.md`**: deny-by-default, deny sets, RBAC over `data`, structured decisions, `else` ordering, and decision-call handling. Load for step 3.
- **`references/builtins-and-data.md`**: the base and virtual document model, verified built-ins with the OPA version that introduced them, built-in errors, the Data and Policy APIs, bundles, manifests and signing. Load for steps 5 and 8.
- **`references/testing-and-tooling.md`**: `opa test`, test results, parameterized tests, mocking, coverage, `opa check`, strict mode, `opa fmt`, capabilities, and performance basics. Load for steps 6 and 7.

## Related skills

- `cedar` for the Cedar policy language: `npx skills add ScaleDockHQ/scaledock-skills --skill cedar`.
- `openfga` for relationship-based authorization models: `npx skills add ScaleDockHQ/scaledock-skills --skill openfga`.
- `cel` for the Common Expression Language: `npx skills add ScaleDockHQ/scaledock-skills --skill cel`.
- `authzen` for the AuthZEN authorization API between enforcement and decision points: `npx skills add ScaleDockHQ/scaledock-skills --skill authzen`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OPA Policy Language](https://www.openpolicyagent.org/docs/policy-language): Documentation (latest), docs source at `main` as of 2026-10-05, checked 2026-10-05.
- [OPA Policy Reference](https://www.openpolicyagent.org/docs/policy-reference): Documentation (latest), grammar and reserved names as of 2026-10-05, checked 2026-10-05.
- [Rego Keyword: import](https://www.openpolicyagent.org/docs/policy-reference/keywords/import): Documentation (latest), includes the unreleased `rego.v2` section, checked 2026-10-05.
- [Rego Keyword: not](https://www.openpolicyagent.org/docs/policy-reference/keywords/not): Documentation (latest), improved negation semantics since OPA v1.17.0, checked 2026-10-05.
- [Rego Keywords: and, or](https://www.openpolicyagent.org/docs/policy-reference/keywords/logical): Documentation (latest), keywords since OPA v1.20.0, checked 2026-10-05.
- [Rego Built-ins](https://www.openpolicyagent.org/docs/policy-reference/builtins): Documentation (latest), generated from built-in metadata, checked 2026-10-05.
- [OPA built-in metadata](https://github.com/open-policy-agent/opa/blob/v1.21.1/builtin_metadata.json): Released, v1.21.1, checked 2026-10-05.
- [OPA capabilities](https://github.com/open-policy-agent/opa/blob/v1.21.1/capabilities.json): Released, v1.21.1 (features `rego_v1`, `template_strings`, `keywords_in_refs`; future keywords `and`, `not`, `or`), checked 2026-10-05.
- [OPA Policy Testing](https://www.openpolicyagent.org/docs/policy-testing): Documentation (latest), checked 2026-10-05.
- [Upgrading to v1.0](https://www.openpolicyagent.org/docs/v0-upgrade): Documentation (latest), checked 2026-10-05.
- [v0 Backwards Compatibility](https://www.openpolicyagent.org/docs/v0-compatibility): Documentation (latest), checked 2026-10-05.
- [OPA REST API](https://www.openpolicyagent.org/docs/rest-api): Documentation (latest), Data API with `rule_labels` since OPA v1.21.0, checked 2026-10-05.
- [OPA Bundles](https://www.openpolicyagent.org/docs/management-bundles): Documentation (latest), manifest schema v1, checked 2026-10-05.
- [OPA Policy Performance](https://www.openpolicyagent.org/docs/policy-performance): Documentation (latest), checked 2026-10-05.
- [OPA CLI Reference](https://www.openpolicyagent.org/docs/cli): Documentation (latest), generated from the `opa` command help, checked 2026-10-05.
- [OPA Philosophy: The OPA Document Model](https://www.openpolicyagent.org/docs/philosophy): Documentation (latest), checked 2026-10-05.
- [OPA releases](https://github.com/open-policy-agent/opa/releases): Released, v1.21.1 (2026-09-29) latest; v1.0.0 (2024-12-20); v0.70.0 (2024-10-31) last 0.x, checked 2026-10-05.
- [OPA CHANGELOG](https://github.com/open-policy-agent/opa/blob/main/CHANGELOG.md): Changelog, `main` as of 2026-10-05 (Unreleased section adds `import rego.v2`), checked 2026-10-05. Preview posture: track.
