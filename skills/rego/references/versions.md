# Versions and upgrades

Read this when choosing a target version, reading a policy written for OPA 0.x, upgrading, or deciding whether to use a preview. Sources: Upgrading to v1.0, v0 Backwards Compatibility, Rego Keyword: import, the OPA releases page and the OPA CHANGELOG, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                        | Status  | Revision                                         | Posture | Summary                                                                 |
| ----------------- | --------------------------- | ------- | ------------------------------------------------ | ------- | ----------------------------------------------------------------------- |
| `rego-v2-preview` | Rego v2 import (unreleased) | preview | OPA CHANGELOG "Unreleased", `main` at 2026-10-05 | track   | `import rego.v2` enables `and`, `or` and improved `not` in one import.  |
| `v1`              | Rego v1 (OPA 1.x)           | current | OPA v1.21.1 (2026-09-29)                         |         | The default syntax since OPA v1.0.0 (2024-12-20). The default target.   |
| `v0`              | Rego v0 (OPA 0.x)           | legacy  | OPA v0.70.0 (2024-10-31), the last 0.x release   |         | Pre-1.0 syntax with opt-in `future.keywords`. Read and upgrade from it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

OPA 1.x releases add opt-in syntax inside the `v1` line without changing the default syntax. These are released features of the current line, not previews, but each one needs a consumer at or after the release that introduced it:

| Feature                                           | Enabled by                                | Since   | Source                                     |
| ------------------------------------------------- | ----------------------------------------- | ------- | ------------------------------------------ |
| String interpolation `$"..."`                     | always on (capability `template_strings`) | v1.12.0 | CHANGELOG 1.12.0; Policy Language, Strings |
| Improved `not` semantics and `not { ... }` bodies | `import future.keywords.not`              | v1.17.0 | CHANGELOG 1.17.0; Rego Keyword: not        |
| `and` and `or` keywords                           | `import future.keywords.and` / `.or`      | v1.20.0 | CHANGELOG 1.20.0; Rego Keywords: and, or   |
| `rule_labels` in Data API responses               | `rule_labels` query parameter             | v1.21.0 | CHANGELOG 1.21.0; REST API, Data API       |

## Which version to use

- Write Rego v1 for OPA 1.x, at the latest patch (v1.21.1 at the pin).
- Before using an opt-in feature from the table above, confirm every consumer runs that OPA release or later; `opa check --capabilities <version>` checks this (CLI Reference, check).
- Treat a Rego v0 module as input to an upgrade. Run OPA 1.x with `--v0-compatible` only while third-party or customer Rego cannot be upgraded yet; the docs say this mode is not recommended for most users (v0 Backwards Compatibility, When to use v0.x compatibility mode).
- Do not emit `import rego.v2` (preview, posture track).

## What changed

### Rego v1 (OPA 1.0)

From the 1.0.0 CHANGELOG and Upgrading to v1.0, Changes to Rego in OPA v1.0:

- `in`, `every`, `if` and `contains` are keywords without an import; importing them is a no-op.
- `if` is required before every rule body, and `contains` is required for multi-value (partial set) rules. Rules are single-value by default; a body-less constant like `p := 1` needs no `if`. A solitary reference such as `p.a` is no longer a rule.
- Checks that were in 0.x strict mode are now always on: duplicate or shadowing imports are prohibited, `input` and `data` are reserved names, and the deprecated built-ins `any`, `all`, `re_match`, `net.cidr_overlap`, `set_diff`, `cast_array`, `cast_set`, `cast_string`, `cast_boolean`, `cast_null` and `cast_object` are prohibited.
- What `opa check --strict` still adds in v1: unused local assignments and unused imports are errors (Policy Language, Strict Mode).
- `opa run --server` binds to `localhost` by default instead of all interfaces; use `--addr 0.0.0.0:8181` to restore it, which containers need (Upgrading to v1.0, Upgrading OPA Instances).
- Bundles carry `rego_version` in `.manifest` (since OPA v0.64.0), which takes precedence over `--v0-compatible` (Upgrading to v1.0, Rego-versioned bundles; Bundles, Bundle File Format).
- Go integrations move to the `github.com/open-policy-agent/opa/v1/...` packages; the v0 packages are deprecated (Upgrading to v1.0, Upgrading for Go Integrations).

Why `if` became mandatory, from the table in Upgrading to v1.0:

| Rule              | Output in v0.x         | Output in v1.0       |
| ----------------- | ---------------------- | -------------------- |
| `p { true }`      | `{"p": true}`          | compile error        |
| `p.a { true }`    | `{"p": {"a"}}` (a set) | compile error        |
| `p.a if { true }` | `{"p": {"a": true}}`   | `{"p": {"a": true}}` |
| `p contains "a"`  | `{"p": {"a"}}`         | `{"p": {"a"}}`       |

### Within OPA 1.x

- v1.21.0: YAML is parsed with the YAML 1.2 core schema, so bare `yes`, `no`, `on`, `off`, `y` and `n` are strings, not booleans, in `--data`, bundles, config files and `yaml.unmarshal`. Quote and use `true`/`false` if a policy relied on them (CHANGELOG 1.21.0).
- v1.21.0: rules with general refs no longer collide in the recursion check (CHANGELOG 1.21.0).
- v1.21.1: fixes a compiler regression for `some ... in` and `every` inside comprehensions nested in object and set literals (CHANGELOG 1.21.1). Use v1.21.1, not v1.21.0.

## Upgrading

### Rego v0 to Rego v1

Use an OPA 1.x binary for every command below (Upgrading to v1.0, Upgrading Rego).

1. Upgrade the OPA instances first, producers before consumers. Bundle producers (`opa build`) on 1.x write `rego_version` into the manifest, so 1.x consumers then load v0 bundles without flags. While any consumer is still 0.x, run 1.x producers with `--v0-compatible` or keep `import rego.v1` in modules (Upgrading to v1.0, General Upgrade Approach; Scenarios 2, 3 and 6).
2. Find parse and compile errors: `opa check --v0-v1 <path>`. On an unconverted v0 module, OPA v1.21.1 reports each rule body without `if` and each set rule without `contains`; those are fixed in step 4, so look here for other errors, and run `opa check --v0-compatible <path>` to confirm the module is valid v0 at all.
3. Find strict-mode issues such as deprecated built-ins and duplicate imports: `opa check --v0-v1 --strict <path>`. Replace each deprecated built-in reported there.
4. Rewrite the syntax: `opa fmt --write --v0-v1 <path>`. This formats v0 modules to be valid in both v0 and v1, replacing `future.keywords.*` imports with `import rego.v1`, adding `if` and `contains` (v0 Backwards Compatibility; CLI Reference, fmt).
5. Lint: `regal lint <path>` (Upgrading to v1.0, Upgrading Rego).
6. When every consumer runs OPA 1.x, drop the compatibility imports: `opa fmt --write --drop-v0-imports <path>`. Plain `opa fmt` neither adds nor removes `rego.v1` and `future.keywords` imports (CLI Reference, fmt).
7. Remove `--v0-compatible` from every `opa` command and stop setting `rego_version: 0` in manifests. Only `file_rego_versions` entries for files you still cannot upgrade may stay (Bundles, Bundle File Format).
8. Check the server bind address: add `--addr` only where remote callers need it (Upgrading to v1.0, Upgrading OPA Instances).
9. Validate: `opa check --strict` and `opa test` pass without compatibility flags.
10. Keep behaviour unchanged: the same inputs produce the same decisions. Watch rules that were partial sets in v0 because they had no `if` (`p[x] { ... }`): they must become `p contains x if { ... }`, not `p[x] if { ... }`, which would make an object.

Mixing v0 and v1 Go packages in one program is unsupported (v0 Backwards Compatibility).

### Adopting opt-in syntax within Rego v1

1. Confirm the oldest consumer's OPA version against the feature table above.
2. Add the import (`future.keywords.not`, `future.keywords.and`, `future.keywords.or`) to the modules that use the feature.
3. Run `opa check --capabilities <oldest consumer version>` and `opa test`.
4. With `future.keywords.not`, re-test every rule that uses `not` over a composite expression: an undefined sub-expression now makes the `not` succeed instead of failing the rule (Rego Keyword: not, Improved Negation Semantics). For a deny rule this can add denials; for an allow rule it can grant access, so review those first.

## Preview: Rego v2 import

The OPA CHANGELOG "Unreleased" section (on `main` as of 2026-10-05) adds `import rego.v2`, which enables the `and` and `or` keywords and the improved `not` semantics in one import, in place of the three `future.keywords` imports. In a v0 module it also implies `rego.v1`. It is gated by a new `rego_v2_import` capability feature, which the v1.21.1 capabilities file does not have. The documentation (Rego Keyword: import, Importing `rego.v2`) already describes it.

Posture: **track**. Do not emit `import rego.v2`: no released OPA accepts it. Use the released `future.keywords.and`, `future.keywords.or` and `future.keywords.not` imports instead; they give the same behaviour. Watch the OPA releases page and the CHANGELOG. When a release ships it: record that release as the minimum consumer version, add it to the opt-in feature table, and allow replacing the three imports with `import rego.v2` in modules whose consumers are all on that release. It is an import inside the current line, not a new default syntax, so it does not become a new current line unless OPA makes it the default.
