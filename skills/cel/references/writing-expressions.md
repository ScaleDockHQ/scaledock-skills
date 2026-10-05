# Writing safe expressions

Read this when writing or reviewing a CEL expression that guards something: an authorization condition, a validation rule, an admission check or a filter. It turns the language rules into habits. Every rule cites the language definition (langdef) v0.25.3, the conformance data or cel.dev, listed in [Sources](../SKILL.md#sources). Host-specific rules (which variables exist, which extensions are enabled, what cost budget applies) come from the host's documentation, not from CEL.

## Know the environment first

- The host declares the variables, their types and the extra functions; the expression only uses them (cel.dev, CEL overview, Environments). Ask for, or read, the declarations before writing anything.
- Macros are opt-in per application (langdef, Macros) and extensions such as `string.format` exist only where enabled (doc/extensions/strings.md). Use only what the host lists.
- Type-check whenever the host allows it. The checker catches `no_matching_overload` and `no_such_field` before deployment, and it never changes results (langdef, Gradual Type Checking).

## Make the result a boolean, always

- A guard that returns an error is neither allow nor deny inside CEL; what happens next is the host's choice. Write the expression so that every input yields `true` or `false`.
- Test presence before reading optional data: `has(obj.spec.replicas) && obj.spec.replicas <= 5`. On a map, `has(m.f)` tests key `"f"`; for non-identifier keys use `'my-key' in m && m['my-key'] == 'x'` (langdef, Field Selection).
- Remember that `&&` and `||` are commutative with respect to errors: `has(x.f) && x.f > 0` is safe because `false` from `has` decides the result even if `x.f > 0` fails. When the guard must run strictly first (for example around a custom function with a precondition), use `cond ? expr : false` (langdef, Logical Operators).
- Guard divisions and indexes: integer division by zero and an out-of-range list index are errors (conformance `logic.textproto`, `lists.textproto`). Check `size(l) > i` or `d != 0` first.
- Guard conversions: `int("abc")`, `timestamp("bad")`, `string(invalidUtf8Bytes)` and out-of-range `int(double)` or `uint(-1)` are errors (langdef, Types and Conversions; Overflow).

## Get the types right

- No implicit numeric conversion at check time: compare `int` with `int`, or convert explicitly (`double(count) / double(total)`). Use `u` for `uint` literals (langdef, Numeric Values).
- JSON numbers are `double`, and values read from `Struct` or `Value` are `dyn` to the checker. Runtime equality and ordering put all numbers on one line, so `json.number == 2` and `json.number in [1, 2, 3]` work without conversion (langdef, Equality; Numbers). Statically typed values of different numeric types still need `dyn()` or an explicit conversion to pass the checker.
- Unset proto fields read as their default, so `obj.count == 0` is `true` for both "unset" and "set to zero". Use `has()` when the difference matters. Unset wrapper fields read as `null` (langdef, Protocol Buffer Data Conversion; Dynamic Values).
- `null` is a distinct type. A map entry whose value is `null` is present for `has()` (langdef, Booleans and Null; Presence and Comprehension Macros).
- `type()` sees only coarse runtime types: `type([1]) == list` (langdef, Type Values).

## Strings, patterns and time

- `matches` uses RE2 and succeeds on any substring match. Anchor allow-lists: `name.matches('^[a-z0-9-]{1,63}$')`. Write patterns as raw strings (`r'^\d+$'`) so escapes are not processed twice (langdef, Regular Expressions; String and Bytes Values).
- `size()` counts code points, and strings are not normalized, so visually equal strings can differ in size and equality (langdef, String and Bytes Values; String Functions).
- Compare times with typed values: `timestamp(claims["exp"]) < now`, with `now` supplied by the host (cel.dev, CEL overview, Expressions). Durations have no day unit; write `duration("24h")` (langdef, duration).
- Timestamp accessors default to UTC. Pass a timezone when local calendar fields matter: `t.getDayOfWeek("Europe/Paris")` (langdef, Date/Time Functions).

## Keep cost bounded

- Prefer `in` on a map or a direct index over scanning a list with `exists` when the host gives a map (langdef, Time Complexity).
- Avoid nested or chained comprehensions over input-sized collections; they are the only route to exponential cost (langdef, Macro Performance; Performance Limits).
- Avoid repeated concatenation of input-sized strings or lists; `_+_` is the operator that grows space fastest (langdef, Performance Limits).
- Stay within the guaranteed nesting limits (32 `&&` terms, 12 nested calls and so on) for portability (langdef, Syntax).

## Review checklist

- [ ] Every variable, function and macro used is declared or enabled by the host.
- [ ] The expression type-checks against the host's declarations, and its result type is what the host expects (usually `bool`).
- [ ] Every optional field or map key is guarded with `has()` or `in`.
- [ ] No division, index, conversion or regular expression can fail on attacker-controlled input without a guard.
- [ ] Regular expressions are anchored and written as raw strings.
- [ ] Numeric comparisons use one type, or explicit conversions.
- [ ] No nested macro iterates over two input-sized collections without a size bound.
- [ ] The expression was evaluated on at least one allow case, one deny case, and one malformed input.

## Common mistakes

| Mistake                                       | Why it fails                                      | Fix                                   |
| --------------------------------------------- | ------------------------------------------------- | ------------------------------------- |
| `x.count + 1u`                                | `int + uint` has no overload                      | `x.count + 1` or `uint(x.count) + 1u` |
| `has(m['key'])`                               | `has` needs a field selection                     | `'key' in m`                          |
| `name.matches('[a-z]+')` as an allow-list     | matches any substring                             | `name.matches('^[a-z]+$')`            |
| `{'a': 1}.filter(k, k == 'a')` expected a map | `filter` and `map` on a map return a list of keys | read values with `m[k]` in the body   |
| `1 in [1.0]` rejected by the checker          | the checker requires one type                     | use one numeric type, or `dyn()`      |
| Relying on `a && b` to stop before `b`        | `&&` is commutative; `b` may run first            | `a ? b : false`                       |
| `duration("1d")`                              | no day unit                                       | `duration("24h")`                     |

## Related languages

CEL is an expression language embedded in a host. For a policy model with its own relationship or rule semantics, see the related skills listed in `SKILL.md` (`openfga`, `rego`, `cedar`), and for validating JSON documents structurally, `json-schema`.
