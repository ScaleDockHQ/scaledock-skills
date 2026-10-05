# rego

An agent skill for Rego, the policy language of Open Policy Agent (OPA), targeting Rego v1 at OPA v1.21.1 with upgrades from Rego v0: writing, testing, packaging and querying policies, with deny-by-default authorization patterns.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill rego
```

Then ask your agent to "write a Rego policy that only lets owners delete orders, with tests" or "upgrade our OPA 0.x policies to Rego v1".

## What it covers

- Modules, packages and imports; complete, partial set, partial object, default, else and function rules; rule heads with references.
- The `if`, `contains`, `in`, `every`, `some`, `not` and `with` keywords, the opt-in `and`/`or` keywords and improved `not` semantics, comprehensions and string interpolation.
- How undefined values make deny rules fail open, and how to write deny conditions that hold on missing input.
- Built-in functions checked against OPA v1.21.1, built-in error handling, and the `input` and `data` documents.
- `opa test` with `test_` rules, parameterized tests, mocking with `with`, and coverage; `opa check`, strict mode, `opa fmt` and capabilities.
- Bundles, `.manifest` roots and `rego_version`, bundle signing, and the `/v1/data` Data API.
- Performance basics: objects over arrays, rule indexing and early exit.
- What OPA 1.0 changed, and the producer-before-consumer upgrade with `opa check --v0-v1` and `opa fmt --v0-v1`.

## Versions

| Line                        | Status                |
| --------------------------- | --------------------- |
| Rego v2 import (unreleased) | preview (track)       |
| Rego v1 (OPA 1.x)           | current               |
| Rego v0 (OPA 0.x)           | legacy (upgrade from) |

`references/versions.md` says which line to use, which opt-in features need which OPA release, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- OPA documentation: [Policy Language](https://www.openpolicyagent.org/docs/policy-language), [Policy Reference](https://www.openpolicyagent.org/docs/policy-reference) and its keyword pages, [Built-ins](https://www.openpolicyagent.org/docs/policy-reference/builtins), [Policy Testing](https://www.openpolicyagent.org/docs/policy-testing), [Upgrading to v1.0](https://www.openpolicyagent.org/docs/v0-upgrade), [v0 Backwards Compatibility](https://www.openpolicyagent.org/docs/v0-compatibility), [REST API](https://www.openpolicyagent.org/docs/rest-api), [Bundles](https://www.openpolicyagent.org/docs/management-bundles), [Policy Performance](https://www.openpolicyagent.org/docs/policy-performance), [CLI Reference](https://www.openpolicyagent.org/docs/cli) and [Philosophy](https://www.openpolicyagent.org/docs/philosophy): latest, checked 2026-10-05.
- `builtin_metadata.json` and `capabilities.json` at OPA v1.21.1.
- [OPA releases](https://github.com/open-policy-agent/opa/releases) (v1.21.1, 2026-09-29) and the [CHANGELOG](https://github.com/open-policy-agent/opa/blob/main/CHANGELOG.md).

## License

MIT
