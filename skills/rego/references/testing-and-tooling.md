# Testing and tooling

Read this when writing policy tests or running the `opa` CLI checks. Sources: OPA Policy Testing, OPA CLI Reference, OPA Policy Language (Strict Mode), OPA Policy Performance, listed in [Sources](../SKILL.md#sources). Flags are from the OPA v1.21.1 CLI Reference.

## Writing tests

- A test is a rule whose name starts with `test_`. Put tests in a package suffixed `_test`, which is good practice but not required (Policy Testing, Test Format).
- `opa test <paths>` runs every test in the files given; directories load recursively (Test Discovery). `--run`/`-r <re2 regex>` selects tests (Specifying Tests to Run).
- Results: undefined or non-`true` is `FAIL`; a runtime error such as division by zero is `ERROR`; a rule prefixed `todo_` is `SKIPPED`; otherwise `PASS` (Test Results). `-z`/`--exit-zero-on-skipped` makes skipped tests exit 0 (CLI Reference, test).
- Assert denial with `not`: `not authz.allow with input as {...}` (Getting Started).
- `--var-values` prints the failing expression with the values of its variables (Enriched Test Report With Variable Values).

```rego
package authz_test

import data.authz

test_post_allowed if {
    authz.allow with input as {"path": ["users"], "method": "POST"}
}

test_get_anonymous_denied if {
    not authz.allow with input as {"path": ["users"], "method": "GET"}
}
```

### Parameterized tests

Name test cases with variables in the test rule's head reference; each case reports its own result (Parameterized Tests and Data-driven Testing):

```rego
package example_test

test_concat[note] if {
    some note, tc in {
        "empty + empty": {"a": [], "b": [], "exp": []},
        "empty + filled": {"a": [], "b": [1, 2], "exp": [1, 2]},
    }
    array.concat(tc.a, tc.b) == tc.exp
}
```

Cases may come from `data.json` or YAML data files passed to `opa test`, and nest with several variables (`test_sign_token[note][alg]`).

## Mocking with `with`

`with` replaces `input`, documents under `data` (base or virtual), and functions (Policy Testing, Data and Function Mocking; Policy Language, With Keyword):

| Replace                 | Example                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| Input                   | `authz.allow with input as {"user": "alice"}`                         |
| Input field             | `authz.allow with input.headers["x-token"] as "my-jwt"`               |
| Base data               | `authz.allow with data.roles as {"admin": ["alice"]}`                 |
| A rule                  | `authz.allow1 with authz.allow2 as true`                              |
| A built-in, by function | `with io.jwt.decode_verify as mock_decode_verify`                     |
| A built-in, by value    | `with io.jwt.decode_verify as [true, {}, {}]` (every call returns it) |
| A user function         | `with replace as true`                                                |

Constraints: `internal.*`, `rego.metadata.*`, `eq` and `walk` cannot be replaced; a replacement function has the same arity as the original; it may call the original without recursion (Data and Function Mocking). Mock `http.send` and `time.now_ns` so tests are deterministic, for example `with time.weekday as "Sunday"` (Policy Language, With Keyword).

## Coverage and CI

- `opa test --coverage --format=json <paths>` reports covered and not covered lines per file. A not covered rule head means the body was never true; a not covered expression was never evaluated (Policy Testing, Coverage).
- Rule indexing and early exit can skip lines; in the JSON report, not covered ranges may carry `kinds` of `index_excluded` or `early_exit`, controlled by `--coverage-runs` (Coverage).
- `--threshold <percent>` exits non-zero below that coverage; `--fail-on-empty` fails when no test ran, which catches a misspelled `--run` or path (CLI Reference, test; Policy Testing, Failing on No Tests Run).
- `--format=json` gives machine-readable results; `--bench` benchmarks the tests (Test Results; CLI Reference, test).

A CI gate, all from the CLI Reference:

```sh
opa fmt --fail --list .
opa check --strict .
opa test --fail-on-empty --coverage --threshold 90 .
```

## Checking and formatting

- `opa check <paths>` parses and compiles, printing nothing on success and exiting non-zero on errors (CLI Reference, check).
- `-S`/`--strict` enables strict mode, which in v1 adds two checks: unused local assignments or arguments, and unused imports (Policy Language, Strict Mode). Other former strict checks are always on in v1 (Upgrading to v1.0, Compilation Constraints and Checks).
- `-s`/`--schema` type-checks against JSON Schemas for `input` and `data` (CLI Reference, check; Policy Language, Schema).
- `--capabilities <version or file>` checks against what an older OPA supports. With v1.21.1, `import future.keywords.or` fails under `--capabilities v1.19.0` and a `$"..."` string fails under `--capabilities v1.11.0`, as the feature table in [`versions.md`](versions.md) predicts.
- `opa fmt` writes the canonical format; `-w` overwrites, `-d` diffs, `-l` lists files that would change, `--fail` exits non-zero if a file would change (CLI Reference, fmt). The formatter indents with tabs. It rejects v0 modules unless run with `--v0-compatible` or `--v0-v1` (CLI Reference, fmt).
- `opa eval -d <policy> -i <input.json> 'data.pkg.rule'` evaluates a query; `--fail-defined` and `--fail-non-empty` set exit codes for scripting; `--strict-builtin-errors` makes the first built-in error fatal (CLI Reference, eval).
- Every flag can be set as an environment variable `OPA_<COMMAND>_<FLAG>`, such as `OPA_EVAL_STRICT` (CLI Reference).

## Performance basics

From OPA Policy Performance:

- **Linear fragment.** Rules with equality checks on `input` and a single binding per local evaluate in near constant time as rules are added (Linear fragment).
- **Objects over arrays.** Key data by ID and look it up (`d["a789"]`) instead of scanning (`d[i].id == "a789"`) (Use objects over arrays).
- **Indexed statements.** Rule indexing selects candidate rules from statements such as `input.x == "foo"`, `input.role in {"admin", "user"}`, `"admin" in input.roles`, `glob.match` with `*` segments, `startswith`/`endswith` with literal bases, and bare references like `input.x`. A reference with a variable before its last element (`input.x[i].y == "foo"`), or a negated expression, is not indexed (Use indexed statements).
- **`and`/`or`.** An `and` is indexed on whichever operand is indexable; an `or` only when every operand is (Logical statements).
- **Early exit.** Complete rules and functions whose value is ground (`allow if ...`, `q := 123 if ...`) stop iterating at the first match; partial sets, and rules with a variable value, do not. Mixing `allow if` with `allow := false if` for the same input defeats it (Early Exit in Rule Evaluation).
- **Measure.** `opa eval --profile` and `opa bench` show where time goes; `opa test --bench` benchmarks tests (Profiling; Benchmarking Queries).
