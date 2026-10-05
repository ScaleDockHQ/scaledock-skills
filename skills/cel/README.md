# cel

An agent skill for the Common Expression Language (CEL) language definition: writing, reviewing and reasoning about CEL expressions, and upgrading from older cel-spec releases.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cel
```

Then ask your agent to "write a CEL expression that only allows replicas up to 5" or "review this CEL policy for errors and cost".

## What it covers

- Syntax, precedence, literals, reserved words and name resolution.
- Values and types: `int`, `uint`, `double`, `bool`, `string`, `bytes`, `list`, `map`, `null_type`, messages, `type`, `dyn`, timestamps and durations, and the protobuf and JSON mappings.
- Gradual type checking and heterogeneous runtime equality.
- Operators, standard functions and overloads, the `has`, `all`, `exists`, `exists_one`, `map` and `filter` macros, and the `string.format` extension.
- Error and unknown semantics: commutative `&&` and `||`, macro error absorption, and partial evaluation.
- The performance model and how to keep expressions bounded.
- Habits, a checklist and common mistakes for safe guard expressions.

## Versions

| Line          | Status                |
| ------------- | --------------------- |
| CEL spec main | preview (track)       |
| CEL v0.25     | current               |
| CEL v0.24     | legacy (upgrade from) |
| CEL v0.6      | legacy (upgrade from) |

`references/versions.md` says which line to use, what changed in each, and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CEL Language Definition](https://github.com/cel-expr/cel-spec/blob/v0.25.3/doc/langdef.md): Released, v0.25.3.
- [CEL Introduction](https://github.com/cel-expr/cel-spec/blob/v0.25.3/doc/intro.md): Released, v0.25.3.
- [CEL Strings extension](https://github.com/cel-expr/cel-spec/blob/v0.25.3/doc/extensions/strings.md): Released, v0.25.3.
- [eval.proto](https://github.com/cel-expr/cel-spec/blob/v0.25.3/proto/cel/expr/eval.proto): Released, v0.25.3.
- [Conformance tests](https://github.com/cel-expr/cel-spec/blob/v0.25.3/tests/README.md) and [test data](https://github.com/cel-expr/cel-spec/tree/v0.25.3/tests/simple/testdata): Released, v0.25.3.
- [cel-spec releases](https://github.com/cel-expr/cel-spec/releases): v0.0.1 to v0.25.3.
- [Language Definition on master](https://github.com/cel-expr/cel-spec/blob/master/doc/langdef.md): unreleased, 40a3c90.
- Language Definition [v0.24.0](https://github.com/cel-expr/cel-spec/blob/v0.24.0/doc/langdef.md) and [v0.6.0](https://github.com/cel-expr/cel-spec/blob/v0.6.0/doc/langdef.md): superseded.
- [cel.dev](https://cel.dev) and its [CEL overview](https://cel.dev/overview/cel-overview): project website.

## License

MIT
