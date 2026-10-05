# Versions and upgrades

Read this when choosing which language definition to target, reading an expression or implementation written against an older cel-spec release, upgrading one, or checking unreleased changes on the master branch. Sources: the cel-spec release notes, the language definition at v0.25.3, v0.24.0, v0.6.0 and master, listed in [Sources](../SKILL.md#sources). The repository moved from `google/cel-spec` to `cel-expr/cel-spec` (v0.25.3 release notes, "Update README with repository relocation notice"); old links redirect.

## Version lines

cel-spec is released as `v0.MINOR.PATCH` tags; there has been no 1.0. Most releases only add conformance tests, protos or wording. The lines below are the points where the language's meaning changed.

| Id             | Line          | Status  | Revision                                | Posture | Summary                                                                                                               |
| -------------- | ------------- | ------- | --------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `main-preview` | CEL spec main | preview | master at 40a3c90 (2026-09-16)          | track   | Unreleased: specifies how the type checker types type values (`type(T)`) and their generalization.                    |
| `0.25`         | CEL v0.25     | current | v0.25.3 (2026-08-13)                    |         | The default target. No `int(enum)` overload; comprehension scoping spelled out in v0.25.2.                            |
| `0.24`         | CEL v0.24     | legacy  | v0.24.0 (2025-05-09); v0.7.0 to v0.24.0 |         | Heterogeneous runtime equality; `int(enum E)` still listed; before v0.23.0, keywords and reserved words were one set. |
| `0.6`          | CEL v0.6      | legacy  | v0.6.0 (2021-09-01) and earlier         |         | Homogeneous runtime equality (`2 == 2.0` is an error), NaN equal to NaN, strongly typed enums.                        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

No line is **supported**: cel-spec publishes one living language definition, revised in place by each release, so there is no older line still maintained as a target.

## Which version to use

- Default to CEL v0.25 at its latest patch (v0.25.3).
- An implementation that passes an older conformance suite may still differ on the points listed under What changed; check the implementation's cel-spec dependency before relying on them.
- Treat a v0.24 or v0.6 implementation or expression as input to an upgrade.
- Do not depend on master-only text (posture track).

## What changed

### CEL v0.25 (v0.25.0 to v0.25.3)

- `int(enum E) -> int` is removed from the standard definitions, and the "Enums as Ints" appendix entry goes with it; enum values are plain `int` (v0.25.0 release notes, PR #483; langdef v0.24.0 vs v0.25.0, Types and Conversions).
- Conformance tests cover selector, function and field names formerly treated as reserved (v0.25.0, PR #480).
- An initial policy specification proto (`proto/cel/policy/policy.proto`) is added (v0.25.0, PR #477). It is not part of the language definition and this skill does not teach it.
- v0.25.2 adds a note on comprehension scoping: comprehension variables shadow outer and package names, and a leading `.` bypasses them (langdef, Name Resolution; PR #506). It also adds conformance tests for the networking extension and for null assignability around repeated and map fields.
- v0.25.3 adds tests for out-of-range epoch-to-timestamp conversion and the lists extension, and relocates the repository.

### CEL v0.24 (v0.7.0 to v0.24.0)

- v0.7.0 introduces heterogeneous runtime equality: values of different types compare unequal instead of erroring, numbers compare across `int`, `uint` and `double`, NaN is unequal to itself, and protobuf equality is defined uniformly (v0.7.0 release notes; langdef, Equality and Appendix 1). It also adds trailing commas in list, map and message literals (PR #202) and documents duration strings (PR #200).
- v0.14.0 removes strongly typed enums: enums become `int` (v0.14.0 release notes, PR #321). v0.6.0 described each enum as its own type (langdef v0.6.0, Enumerations).
- v0.16.0 adds identity conversions and `bool(string)` to the standard definitions, and `iter_var2` to the AST for two-variable comprehensions (v0.16.0 release notes).
- v0.23.0 splits keywords from reserved words: `true false null in` stay forbidden everywhere, while `package`, `if`, `as` and the others become legal as selectors, field names and receiver-style function names (v0.23.0 release notes, PR #437; langdef v0.22.1 vs v0.24.0, Syntax). v0.23.1 restores the documented duration suffixes and reverts a change to Unicode space handling in `trim()` (v0.23.1 release notes).

### CEL v0.6 (v0.6.0 and earlier)

- Equality is homogeneous: comparing different runtime types is an error, so `2 == 2.0` errors, and all NaN values compare equal (langdef v0.6.0, Equality and Ordering).
- List and map equality can return an error when some element comparison errors and none is `false` (langdef v0.6.0, Equality and Ordering).
- Enums are their own types, convertible to `int` and from `int` or `string` (langdef v0.6.0, Enumerations).
- Double-to-int conversion truncates (v0.6.0, PR #192); timestamp and duration string conversion is added (PR #195).

## Upgrading

### 0.24 to 0.25

1. Point the implementation or conformance runner at cel-spec v0.25.3, and update module paths from `google/cel-spec` to `cel-expr/cel-spec` where they are pinned by URL.
2. Replace `int(enumValue)` calls only where a checker rejects them: the enum value is already an `int`, so drop the call.
3. Review identifiers in comprehensions: a variable named like a package or global now clearly shadows it inside the body; use `.name` to reach the global.
4. Run the v0.25.3 `tests/simple/testdata` suite and keep results unchanged for existing expressions.

### 0.6 to 0.25

1. Apply the 0.24 to 0.25 steps.
2. Review every equality on mixed types. Expressions such as `json.number == 2u`, `json.struct['key'] != null` and `json.number in [1, 2, 3]` that used to error now return a value (v0.7.0 release notes). If a policy depended on that error to deny, add an explicit type test such as `type(x) == int`.
3. Review NaN handling: `x == x` is now `false` for NaN.
4. Replace typed-enum operations: enum values are `int`, so comparisons against enum constants still work, but conversions from `string` to an enum type are gone.
5. Keep behaviour unchanged: re-run every expression against representative allow, deny and malformed inputs, and compare results before and after.

## Preview: CEL spec main

The master branch at 40a3c90 (2026-09-16) has two commits after v0.25.3 (PRs #529 and #530), both conformance tests, and one change to the language definition: a new "Type-Checking Type Values" subsection. It says the checker types `type(1)` as `type(int)` and `type([1])` as `type(list(int))`; every `type(T)` is compatible where `type` is expected; `==` and `!=` between any two type values are well-typed; and combining different type values in a list or ternary yields `type(dyn)`. Runtime behaviour is unchanged: `type([1]) == list` is `true`.

Posture: **track**. Do not rely on a checker accepting or rejecting type-value expressions according to this text until a release ships it. Watch the cel-spec releases page. When a release ships it: make it current (a new line only if language semantics change, otherwise update the `0.25` revision), and add an upgrade section.
