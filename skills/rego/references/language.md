# The Rego language

Read this when writing or reviewing Rego rules. Rules cite the OPA page and heading, from OPA Policy Language, OPA Policy Reference and the keyword pages in [Sources](../SKILL.md#sources). All examples are Rego v1.

## Modules, packages and imports

- A module has exactly one `package`, zero or more `import`s, and zero or more rules, in UTF-8 (Policy Language, Modules). Comments start with `#` (Comments).
- Rules are exported automatically under `data.<package path>`; `package opa.examples` with `pi := 3.14159` is served at `GET /v1/data/opa/examples/pi` (Packages). Modules of one package may live in different directories.
- Package names are variables or references with only string operands: `package foo.bar` and `package foo["bar.baz"].qux` are valid; `package 1foo` and `package foo[1].bar` are not (Packages).
- Every module implicitly imports `data` and `input`. `import data.example.servers` and `import input.user` bring names into scope; `as` renames (`import data.package1 as p1`) (Imports; Rego Keyword: import).
- Imports also switch syntax: `future.keywords.not`, `future.keywords.and`, `future.keywords.or` (or `future.keywords` for all). In v1 the `in`, `every`, `if` and `contains` imports are no-ops (Rego Keyword: import, Importing Future Keywords).
- Reserved names, not usable as variables or rule names: `and`, `as`, `contains`, `data`, `default`, `else`, `every`, `false`, `if`, `in`, `import`, `input`, `package`, `not`, `null`, `or`, `some`, `true`, `with` (Policy Reference, Reserved Names & Keywords). A local may shadow a built-in name such as `count`, which then cannot be called in that rule; avoid it (Policy Language, Variables).

## Values and references

- Scalars: strings, numbers, booleans, `null`. Raw strings use backticks and interpret no escapes, which suits regular expressions (Strings).
- String interpolation: `$"Hello {username}!"` and `` $`...` ``. Each `{...}` holds one expression; an undefined expression renders as `"<undefined>"` instead of making the whole string undefined, unlike `sprintf`. Escape a literal brace as `\{` (Strings, String Interpolation). Needs OPA v1.12.0 or later.
- Composites: arrays (ordered, zero-indexed), objects (any value can be a key; non-string keys become strings in JSON), and sets (unordered, unique). `{}` is an empty object; an empty set is `set()` (Composite Values).
- References use dot or bracket access. Brackets are required for keys with characters outside `[A-Za-z0-9_]`, non-string keys, variable keys and composite keys (References).
- A variable key iterates: `sites[i].servers[j].hostname`. `_` is an anonymous iterator; each `_` is a new variable (Variable Keys). Composite keys work only on references into sets defined by rules, not base data (Composite Keys).
- A variable used in several expressions must bind to the same value in all of them, which gives implicit joins (Multiple Expressions; Self-Joins).

## Rules

General form: `<name> <key>? <value>? <body>?`; the value defaults to `true` and the body defaults to true (Rules, Generating Sets; Complete Definitions). The grammar is in Policy Reference, Grammar.

| Kind               | Example                                                                 | Notes                                                                          |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Constant           | `max_height := 42`                                                      | No body, no `if` needed.                                                       |
| Complete (boolean) | `allow if input.user == "bob"`                                          | Value `true`; undefined if no body holds.                                      |
| Complete (value)   | `max_memory := 32 if power_users[user]`                                 | Two different values at once are an error (Complete Definitions).              |
| Partial set        | `hostnames contains name if { ... }`                                    | Each definition adds members (Generating Sets).                                |
| Partial object     | `apps_by_hostname[hostname] := app if { ... }`                          | Keys must not conflict (Generating Objects).                                   |
| Ref head           | `fruit.apple.seeds := 12`, `users_by_role[role][id] := user if { ... }` | Any term after the first may be a variable (Rule Heads containing References). |
| Default            | `default allow := false`                                                | Used when every rule of that name is undefined (Default Keyword).              |
| Function           | `trim_and_split(s) := x if { ... }`                                     | One output; conflicts if a call yields two values (Functions).                 |
| Else chain         | `authorize := "allow" if { ... } else := "deny" if { ... }`             | Evaluated in order until one matches (Else Keyword).                           |

- Incremental definitions: several rules with one name are OR-ed; the result is their union (Incremental Definitions).
- `default` takes a term without variables or references (comprehensions are allowed): `default <name> := <term>` (Default Keyword). Default functions need the same arity as the other definitions, plain variable arguments and no repeated argument names, and still fail if any argument is undefined.
- Functions may be defined incrementally; a call runs every matching definition, which must agree, and is undefined if none match (Functions). Rego has no overloading by arity: two arities under one name are a compile error (Function overloading).
- Ref-head conflicts: rules may overlap the dynamic part of another rule's ref, but a conflict found at evaluation is an `eval_conflict_error`, and rules may not inject keys into an object value another rule defines (Conflicts).
- Use `else` sparingly: it couples rules (Else Keyword).

## Keywords and operators

- `some`: `some x in xs`, `some k, v in obj`, `some i, x in arr`; or `some i, j` to declare locals for references and unification so a later package rule named `i` cannot capture them (Some Keyword; Membership and iteration).
- `in`: membership, always `true` or `false`, including on non-collections (`3 in "three"` is false). `"foo" in {"foo": 1}` checks values, not keys; `k, v in obj` checks a key-value pair. In function arguments and array or set literals, wrap the two-operand form in parentheses (Membership and iteration).
- `every`: `every k, v in domain { body }` holds when the body holds for every element; an empty domain is true; it binds nothing outside; it cannot be negated (Every Keyword).
- `not`: a variable in a negated expression must be bound elsewhere in the rule; OPA orders negations after the expressions that bind their variables (Negation). Use `not` to check absence (`not p["foo"]`); `p[_] != "foo"` means "some element differs" (Negation).
- Improved negation (`import future.keywords.not`, OPA v1.17.0 or later): `not f(g(input.x))` succeeds when any sub-expression is undefined, and `not { ... }` takes a body whose locals stay inside. Without the import, an undefined sub-expression fails the whole rule. Assignments inside the single-expression form are rejected (Rego Keyword: not). The documentation recommends this import whenever `not` is used.
- `and`/`or` (import required, OPA v1.20.0 or later): control-flow only, producing no value, so not assignable, not a function argument, not a comprehension head or `every` domain. Precedence, tightest first: other expressions, `not`, `and`, `or`, `with`. Short-circuited, no branching. Operands may read outer variables but only a `{ ... }` explicit body may bind new ones, and those stay local. `not (a or b)` also needs `future.keywords.not` (Rego Keywords: and, or). Use incremental rules when the alternatives must produce a value.
- Assignment `:=` makes a rule-local variable that shadows globals; it may not be repeated or appear after use. Destructuring: `[_, _, city, country] := address` (Assignment).
- Comparison `==` needs both sides bound; unification `=` binds variables to make both sides equal and is order-independent. Prefer `:=` and `==` (Equality: Comparison, and Unification).
- `!=`, `<`, `<=`, `>`, `>=` bind nothing; their variables must be bound elsewhere (Comparison Operators).
- `with`: `<expr> with <target> as <value>` replaces `input`, a path under `data`, or a function (built-in or user) for that expression only. A function replacement is a value, another function of the same arity, or a rule; it may call the replaced function without recursion. A `data` target must not partially define a virtual document (With Keyword).

## Comprehensions

- Array `[term | body]`, set `{term | body}`, object `{key: term | body}`. The body may read outer variables; OPA reorders the outer body so they are bound first (Comprehensions).
- Object comprehensions may not produce conflicting keys (Object Comprehensions).
- A comprehension is never undefined, so `count({x | ...}) == 0` expresses "none" in one rule (Universal Quantification; Default Keyword).

## Metadata annotations

- A `# METADATA` comment block in YAML annotates a package or rule with `title`, `description`, `related_resources`, `authors`, `organizations`, `schemas`, `entrypoint`, `compile`, `labels` and `custom`; `scope` is `rule`, `document`, `package` or `subpackages` (Metadata; Annotations; Metadata Scope).
- `entrypoint: true` marks decision rules; `opa build` and `opa eval` pick them up without `--entrypoint`, and it forces `document` scope (Metadata entrypoint).
- `schemas` attaches JSON Schemas to `input` or `data` paths for the type checker; pass schema files with `opa check -s` (Schema; Metadata schemas).
- `rego.metadata.rule()` reads the active rule's annotations from Rego (Accessing annotations).

## Common mistakes

| Mistake                                                | Fix                                               | Source                                     |
| ------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------ |
| `no_miners if { app := apps[_]; app.name != "miner" }` | `every app in apps { app.name != "miner" }`       | Universal Quantification                   |
| `p[x] { ... }` (v0 set) rewritten as `p[x] if { ... }` | `p contains x if { ... }`; `p[x] if` is an object | Upgrading to v1.0                          |
| No `default` on `allow`                                | `default allow := false`                          | Default Keyword                            |
| Two `max_memory := ...` rules that can both match      | Make conditions exclusive, or use `else`          | Complete Definitions                       |
| `contains(list, x)` on an array                        | `x in list`; `contains` is for strings            | Rego Built-ins, Strings                    |
| `x = y` as a check                                     | `x == y`                                          | Best Practices for Equality and Assignment |
| `not every x in xs { p(x) }`                           | `some x in xs; not p(x)`                          | Every Keyword                              |
| Rule named `input` or `data`                           | Rename; they are reserved                         | Upgrading to v1.0                          |
