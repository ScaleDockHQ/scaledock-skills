# Errors, unknowns, evaluation and cost

Read this when reasoning about what an expression returns on bad input, how `&&`, `||` and macros absorb errors, how partial evaluation reports unknowns, or how expensive an expression can get. Sources: the CEL Language Definition (langdef) v0.25.3 sections Evaluation and Performance, `proto/cel/expr/eval.proto`, and the conformance files `logic.textproto` and `lists.textproto`, listed in [Sources](../SKILL.md#sources).

## Evaluation model (langdef, Evaluation)

- For a given environment, an expression deterministically evaluates to a value or an error.
- Literals evaluate to themselves. An unbound variable is an error. A list, map or message literal is an error if any element is an error or has the wrong type.
- Normal functions are strict: all arguments are evaluated, and any error argument makes the call an error. Only the logical operators and macros are exceptions.
- The order of sub-expression evaluation is not guaranteed. When several sub-expressions fail, one or more of their errors propagate, and which ones is not specified.

## Environment (langdef, Evaluation Environment)

- The environment is a container (protobuf package) for name resolution and a binding context mapping identifiers to values, errors or functions. Every implementation binds at least the standard functions.
- Implementations should make variable values and custom function results conform to their declared CEL type. Where nonconforming values (for example strings with invalid code points) can get in, the embedding application must enforce conformance.
- The environment may declare an expected result type. If it is a protobuf wrapper message, the result is converted to it, and a failed conversion is an error.
- The cel.dev overview describes the usual lifecycle: the service declares variables and functions, expressions are parsed and checked once at configuration time, the checked AST is stored, and it is evaluated many times with the same function bindings it was checked against. Do not parse and check in latency-critical paths (cel.dev, CEL overview, Phases of expression processing).

## Runtime errors (langdef, Runtime Errors)

- Built-in error kinds: `no_matching_overload` (no overload for the argument types) and `no_such_field` (a map or message lacks the field). Overflow, division by zero, failed conversions and out-of-range indexes are also errors (langdef, Overflow; conformance `logic.textproto`, `lists.textproto`).
- Errors have no in-language value. There is no way to raise, catch or test for one; the only ways around an error are the logical operators and macros.
- An error ends evaluation of the expression, except where `&&`, `||`, `?:` and macros absorb it.

## Commutative logical operators (langdef, Logical Operators)

- In `&&` and `||`, an operand that alone decides the result (`false` for `&&`, `true` for `||`) wins, and an error or non-boolean on the other side is ignored, whichever side it is on. The other operand may or may not be evaluated.
- The result is an error only when no operand decides it:

| Expression         | Result  |
| ------------------ | ------- |
| `error \|\| true`  | `true`  |
| `error \|\| false` | error   |
| `error && false`   | `false` |
| `error && true`    | error   |
| `!error`           | error   |

- Conformance confirms both orders: `false && (2 / 0 > 3 ? false : true)` and `(2 / 0 > 3 ? false : true) && false` are both `false`, and with the type check disabled `false && 32` is `false` (`logic.textproto`).
- This is deliberate, so that the operators can map to indexed queries and match SQL. For C-style left-to-right short-circuiting, write `e1 ? e2 : false` instead of `e1 && e2`, and `e1 ? true : e2` instead of `e1 || e2`.
- In `c ? a : b`, an error in `c` is an error; an error in the branch not taken is not observed: `('hello'.size() > 10) ? 1 / 0 : 42` is `42` (langdef, Logical Operators; Conditional Operator).

## Errors in macros (langdef, Macros)

- `all` folds with `&&`: one `false` predicate makes the result `false` even if other predicates fail.
- `exists` folds with `||`: one `true` predicate makes the result `true` even if other predicates fail.
- `exists_one`, `map` and `filter` raise an error if any predicate or transform fails.

## Unknowns and partial evaluation (eval.proto, ExprValue)

The language definition names unknown values only as valid inputs to `&&` and `||`. The result protos in `eval.proto` define how they behave: an `ExprValue` is a value, an `ErrorSet` or an `UnknownSet` (the ids of the expressions whose values are unknown).

- Unknowns propagate exactly like errors: only those on the critical path are kept, and an unknown caused by another unknown is not added.
- `(<unknown[1]> || true) && <unknown[2]>` is `<unknown[2]>`; `<unknown[1]> || <unknown[2]>` is `<unknown[1,2]>`; `<unknown[1]>.foo` and `foo(<unknown[1]>)` are `<unknown[1]>`; `<unknown[1]> + <unknown[2]>` is one or the other.
- Where a value could still decide the result, an unknown beats an error: `<error> || <unknown>` and `<error> && <unknown>` are `<unknown>`.
- Everywhere else, an error beats an unknown: `<unknown> + <error>` and `foo(<unknown>, <error>)` are `<error>`.
- Errors follow the same critical-path rule: `(<error1> || true) && <error2>` reports only `<error2>`; `<error1> || <error2>` reports both.

So an evaluation with some inputs marked unknown resolves to a value when those inputs did not matter, or to an error set or unknown set by the rules above. The conformance file `unknowns.textproto` has no test cases at v0.25.3, so behaviour beyond these rules is implementation-specific.

## Performance and limits (langdef, Performance)

CEL is meant for running untrusted expressions with reliable containment, so the spec fixes the time and space complexity of each construct, not absolute costs. Extension functions must document their own complexity.

### Abstract sizes

- A string's size is its code points plus a constant; bytes, its octets plus a constant; a list, the sum of its elements; a map, the sum of keys and values; a message, the sum of its fields. Other values are constant.
- A program's size is bounded by its source length or its proto-encoded AST.

### Time

- By default an expression costs the sum of its sub-expressions plus the sizes of their values plus a constant.
- Cheaper: `?:` evaluates one branch; `size()` on lists and maps is linear in length; list indexing and message field selection are constant.
- Costlier, proportional to the product of input sizes: map indexing and selection, `in`, and `contains`, `startsWith`, `endsWith`, `matches`. (A hashing map implementation may do better, but this is not required.)
- `matches` is bounded by RE2's linear-time guarantee (langdef, String Functions).

### Space

- Literals for lists, maps and messages, and `+` on lists and strings, allocate new space; everything else is constant plus sub-expressions.

### Macros

- `all`, `exists`, `exists_one`, `map` and `filter` cost the sum of their body over the elements; `map` also allocates per element, and `filter` up to the size of its input.
- Nested or chained macros can be exponential: nested `[0,1].all(x, ...)` is exponential in time, and chained `.map(x, [x+x, x+x])` is exponential in time and space.

### Bounds (langdef, Performance Limits)

With `P` the non-literal size of the program, `L` the literal size, `B` the bindings size and `I = B + L`:

- Macros other than `has()` are the only path to exponential behaviour. Implementations can let applications limit macro recursion or chaining, or disable macros.
- `_+_` is the only operator that sharply increases space: `x + x + ... + x` costs `O(B * P^2)`.
- String tests return `bool`, so they cannot be nested to compound: at most `O(B^2 * P)`.
- With only default-cost functions and literals, time and space are `O(P * I)`.

The spec defines no numeric cost budget. Limits such as maximum cost, maximum expression size or macro depth are set by the implementation and the embedding application.
