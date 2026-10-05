# Operators, macros and functions

Read this when choosing an operator or standard function, checking an overload, or using a macro. Source: the CEL Language Definition (langdef) v0.25.3, sections Functions, Macros, Field Selection and Standard Definitions, plus the Strings extension doc, listed in [Sources](../SKILL.md#sources).

## How functions work (langdef, Functions)

- A function is a set of overloads, each with argument types, a result type and an opaque computation. Argument types may use type variables (`list(A)`). At runtime the overload is chosen from the argument values' types; with no match the result is `no_matching_overload`.
- Overloads of one function must not overlap after type-variable erasure.
- Operators are calls to specially named functions: `e1 + e2` is `_+_(e1, e2)`, `!e` is `!_`, `a[b]` is `_[_]`, `c ? x : y` is `_?_:_`. Operators cannot be overloaded by extensions (langdef, Extension Functions).
- Receiver style (`e1.f(e2)`) and global style (`f(e1, e2)`) are separate overloads; a function declared in one style is called only in that style (langdef, Receiver Call Style). `size`, `matches` and others are declared in both.
- Functions have no observable side effects, and extension functions must not either, because the order of sub-expression evaluation is not guaranteed (langdef, Extension Functions).

## Equality and ordering

- `==` and `!=` are defined for all types; `a != b` is `!(a == b)` (langdef, Equality).
- **Check time:** both sides must have the same type unless one is `dyn`. **Runtime:** heterogeneous equality. Values of different non-numeric types are unequal (`false`, not an error), and `int`, `uint` and `double` compare on one number line, so `dyn(3.0) == 3` is `true` (langdef, Equality; Numbers).
- NaN is unequal to everything, itself included: `0.0/0.0 == 0.0/0.0` is `false` (langdef, Numbers; conformance `comparisons.textproto`). The older sentence in Numeric Values saying NaNs compare equal describes pre-v0.7 behaviour (langdef, Appendix 1: Legacy Behavior).
- Lists are equal when they have the same length and pairwise-equal elements; maps when they have the same key set and equal values per key (langdef, Lists and Maps).
- Messages use `MessageDifferencer::Equals` semantics in every runtime: same type, same set fields, field-by-field equality, NaN fields unequal, and `Any` unpacked before comparing unless its `type_url` cannot be resolved (langdef, Protocol Buffers).
- `<`, `<=`, `>`, `>=` are defined for `bool`, `int`, `uint`, `double`, `string`, `bytes`, timestamp and duration, and at runtime across `int`, `uint` and `double` (`-1 < dyn(1u)` is `true`). Strings and bytes order lexicographically by bytes, which for UTF-8 strings is code-point order (langdef, Ordering).

## Arithmetic (langdef, Arithmetic Operators; Overflow)

| Operator  | Overloads                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| unary `-` | `int`, `double`                                                                                                                      |
| `+`       | `int`, `uint`, `double`; `string`, `bytes`, `list(A)` concatenation; timestamp + duration, duration + timestamp, duration + duration |
| `-`       | `int`, `uint`, `double`; timestamp − timestamp → duration; timestamp − duration; duration − duration                                 |
| `*` `/`   | `int`, `uint`, `double`                                                                                                              |
| `%`       | `int`, `uint`                                                                                                                        |

- Integer results that exceed `int` or `uint`, and timestamp or duration results out of range, are errors. Integer division by zero is an error (conformance `logic.textproto`, "division by zero").
- Conversions that exceed the target's range are errors. Durations fit one int64 of nanoseconds, about ±290 years; timestamps run from `0001-01-01T00:00:00Z` to `9999-12-31T23:59:59.999999999Z`; `int(double)` requires the value strictly inside (minInt, maxInt).
- Unary `-` has no `uint` overload.

## Logical operators (langdef, Logical Operators)

- `!` takes `bool`. `&&` and `||` take `bool` and are commutative with respect to errors: see [`errors-and-evaluation.md`](errors-and-evaluation.md).
- `c ? a : b` requires a `bool` condition and evaluates only the taken branch.

## Lists and maps (langdef, List Operators; Map Operators)

- `list[int]` indexes in constant time. An out-of-range index is an error (conformance `lists.textproto`, `index_out_of_bounds`).
- `x in list` scans the list; `k in map` tests key membership.
- `map[key]` and `map.key` read a value; a missing key is `no_such_field` (langdef, Runtime Errors). `e.f` on a map is `e['f']` (langdef, Field Selection).
- `size()` (global or receiver) works on `string` (code points), `bytes` (octets), `list` and `map`.

## Strings and bytes (langdef, String Functions; Regular Expressions)

| Function                           | Notes                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `s.contains(t)`                    | substring test                                                              |
| `s.startsWith(t)`, `s.endsWith(t)` | prefix and suffix tests                                                     |
| `s.matches(re)`, `matches(s, re)`  | RE2 syntax; matches any substring, so anchor with `^...$` for a full match  |
| `size(s)`                          | code points: `"fiance\u0301".size()` is 7, because no normalization is done |

## Timestamps and durations (langdef, Date/Time Functions; Timezones)

- Build them with `timestamp("2023-08-26T12:39:00-07:00")` (RFC 3339) and `duration("1h30m")`. Duration strings use `h`, `m`, `s`, `ms`, `us`, `ns`; they may be `"0"`, negative, fractional or compound. There are no day or week units.
- Timestamp accessors `getFullYear`, `getMonth` (0-based), `getDate` (1-based), `getDayOfMonth` (0-based), `getDayOfWeek` (0 = Sunday), `getDayOfYear` (0-based), `getHours`, `getMinutes`, `getSeconds`, `getMilliseconds` take an optional timezone argument and use UTC without it. Timezones are `"UTC"`, a long name like `"Europe/Paris"`, or a fixed offset like `"+05:30"`.
- On durations, `getHours`, `getMinutes` and `getSeconds` convert the whole duration (`duration("1m30s").getSeconds()` is 90), while `getMilliseconds` returns only the millisecond part (`duration("1.234s").getMilliseconds()` is 234).

## Types and conversions (langdef, Types and Conversions)

| Function      | Accepts                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bool()`      | `bool`, `string`: `1 t true TRUE True` and `0 f false FALSE False`; other spellings such as `TrUe` are errors (conformance `conversions.textproto`) |
| `bytes()`     | `bytes`, `string` (UTF-8)                                                                                                                           |
| `double()`    | `double`, `int`, `uint`, `string`                                                                                                                   |
| `int()`       | `int`, `uint`, `double` (truncates toward zero, errors out of range), `string`, timestamp (Unix seconds)                                            |
| `uint()`      | `uint`, `int`, `double` (truncates, errors out of range), `string`                                                                                  |
| `string()`    | `string`, `bool`, `int`, `uint`, `double`, `bytes` (errors on invalid UTF-8), timestamp (RFC 3339), duration (seconds with `s`)                     |
| `timestamp()` | timestamp, RFC 3339 `string`                                                                                                                        |
| `duration()`  | duration, duration `string`                                                                                                                         |
| `dyn()`       | anything; type-checker hint only                                                                                                                    |
| `type()`      | anything; returns its runtime type                                                                                                                  |

`list`, `map` and `null_type` are type denotations with no conversion overloads. Since v0.25.0 there is no `int(enum)` overload: enum values already are `int`.

## Macros (langdef, Macros; Presence and Comprehension Macros)

Macros look like calls but are expanded by the parser and have their own typing and error rules. An application chooses which macros it enables.

| Macro                | Result                                                                    | Errors                                                  |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `has(e.f)`           | `bool` presence test                                                      | see below                                               |
| `e.all(x, p)`        | `true` when `p` holds for every list element or map key                   | combined with `&&`: any `false` wins over errors        |
| `e.exists(x, p)`     | `true` when `p` holds for at least one                                    | combined with `\|\|`: any `true` wins over errors       |
| `e.exists_one(x, p)` | `true` when exactly one element or key satisfies `p`                      | does not short-circuit; any predicate error is an error |
| `e.map(x, t)`        | list of `t` per element (or per key of a map)                             | any error is an error                                   |
| `e.map(x, p, t)`     | list of `t` for elements where `p` holds                                  | any error is an error                                   |
| `e.filter(x, p)`     | sublist of elements (or list of map keys) where `p` holds; `[]` when none | any error is an error                                   |

- On a map, every macro iterates over keys, and `map` and `filter` return lists, not maps: `{'one': 1, 'two': 2}.filter(k, k == 'one')` is `['one']`.
- The macro variable shadows outer names inside the macro body; see Name resolution in [`syntax-and-types.md`](syntax-and-types.md).

### has() (langdef, Field Selection)

- The argument must syntactically be a field selection `e.f`; `f` must be an identifier, so `has(m['k'])` is not valid. Use `'k' in m` for keys that are not identifiers.
- On a map, `has(e.f)` tests whether key `"f"` exists; the value may be `null`, which is still present.
- On a message where `f` is not declared, `has` raises `no_such_field`.
- On a declared field: repeated and map fields are present when non-empty; proto2 singular and oneof fields when set; proto3 message and oneof fields when set; other proto3 scalars when they hold a non-default value.
- On anything else, `has` is an error.

Selection without `has`: a declared but unset message field gives its default; an undeclared field is `no_such_field`; a missing map key is an error.

## Strings extension: format (doc/extensions/strings.md)

The spec repository documents one extension, `string.format(list) -> string`, which is available only where the application enables it.

- Verbs: `%s` (any value; lists as `[a, b]`, maps sorted by formatted key as `{k: v}`, timestamps as RFC 3339 UTC, durations as decimal seconds with `s`), `%d` (`int`, `uint`), `%f` and `%e` with optional `.precision` (default 6, round half to even), `%x`/`%X` (`int`, `uint`, `string`, `bytes`), `%o` (`int`, `uint`) and `%b` (`int`, `uint`, `bool`).
- NaN formats as `NaN` and infinity as `[-]Infinity` wherever `double` is accepted.
- Examples: `"%.1f".format([3.14])` is `"3.1"`, `'%.3f'.format([123.4999])` is `"123.500"`, `"%e".format([1])` is `"1.000000e+00"`.

The conformance data also has files for other extensions (`bindings_ext`, `block_ext`, `encoders_ext`, `lists_ext`, `math_ext`, `network_ext`, `string_ext`, `proto2_ext`, two-variable comprehensions in `macros2`), but the spec repository has no prose definition for them. Treat them as implementation features and check the implementation's documentation before using them.
