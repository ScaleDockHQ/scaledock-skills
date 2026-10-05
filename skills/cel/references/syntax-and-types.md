# Syntax and types

Read this when parsing or writing CEL text, choosing literals, resolving names, or reasoning about types and the type checker. Source: the CEL Language Definition (langdef) at v0.25.3, cited by heading, listed in [Sources](../SKILL.md#sources).

## Grammar

The EBNF grammar (langdef, Syntax), with `|` for alternatives, `[]` optional, `{}` repeated:

```grammar
Expr           = ConditionalOr ["?" ConditionalOr ":" Expr] ;
ConditionalOr  = [ConditionalOr "||"] ConditionalAnd ;
ConditionalAnd = [ConditionalAnd "&&"] Relation ;
Relation       = [Relation Relop] Addition ;
Relop          = "<" | "<=" | ">=" | ">" | "==" | "!=" | "in" ;
Addition       = [Addition ("+" | "-")] Multiplication ;
Multiplication = [Multiplication ("*" | "/" | "%")] Unary ;
Unary          = Member | "!" {"!"} Member | "-" {"-"} Member ;
Member         = Primary
               | Member "." SELECTOR ["(" [ExprList] ")"]
               | Member "[" Expr "]" ;
Primary        = ["."] IDENT ["(" [ExprList] ")"]
               | "(" Expr ")"
               | "[" [ExprList] [","] "]"
               | "{" [MapInits] [","] "}"
               | ["."] SELECTOR { "." SELECTOR } "{" [FieldInits] [","] "}"
               | LITERAL ;
```

List, map and message literals accept a trailing comma.

### Minimum nesting an implementation must support (langdef, Syntax)

- 32 terms in a row joined by `||`, or by `&&`; 32 call arguments; 32 list elements; 32 map or message fields.
- 24 consecutive `?:`; 24 binary arithmetic operators of one precedence in a row; 24 relations in a row.
- 12 nested calls; 12 `.` selections in a row; 12 `[_]` indexes in a row; 12 nested list, map or message literals.

An expression that goes past these may be rejected by a conforming implementation; keep portable expressions within them.

### Precedence and associativity (langdef, Syntax)

| Precedence | Operators                                                       | Associativity |
| ---------- | --------------------------------------------------------------- | ------------- |
| 1          | `()` call, `.` field or qualified name, `[]` index, `{}` fields | left-to-right |
| 2          | unary `-`, `!`                                                  | right-to-left |
| 3          | `*` `/` `%`                                                     | left-to-right |
| 4          | `+` binary `-`                                                  | left-to-right |
| 5          | `==` `!=` `<` `>` `<=` `>=` `in`                                | left-to-right |
| 6          | `&&`                                                            | left-to-right |
| 7          | `\|\|`                                                          | left-to-right |
| 8          | `?:`                                                            | right-to-left |

All relations, including `in`, share one level, so `a in b == c` parses as `(a in b) == c`. Parenthesize mixed relations.

### Lexis (langdef, Syntax)

- `IDENT ::= SELECTOR - RESERVED`, `SELECTOR ::= [_a-zA-Z][_a-zA-Z0-9]* - KEYWORD`.
- Keywords `false in null true` cannot be identifiers, function names, selectors, struct name segments or field names.
- Reserved words `as break const continue else for function if import let loop package namespace return var void while` cannot be identifiers or function names, but may be selectors and field names, and receiver-style calls such as `a.package()` are allowed.
- Whitespace is `[\t\n\f\r ]+`; the only comment form is `//` to end of line.

## Literals

- **Integers** (langdef, Numeric Values): `int` is 64-bit signed, `uint` 64-bit unsigned (`7u`), `double` IEEE 64-bit (`7.0`, `7e0`, `.700e1`). Hex is `0x...`. `7` and `7u` are different values.
- **Strings** (langdef, String and Bytes Values): single or double quotes on one line; triple quotes (`'''` or `"""`) may span lines; the closing delimiter matches the opening one. An `r`/`R` prefix makes a raw string with no escape processing, which is the right form for regular expressions.
- **Escapes**: `\\ \? \" \' \``, `\a \b \f \n \r \t \v`, `\uXXXX`(BMP),`\UXXXXXXXX`(strings only),`\xHH`or`\XHH`, and three octal digits `\000`to`\377`. A backslash outside a valid escape, an invalid code point, or any UTF-16 surrogate (even a valid pair such as `\uD83D\uDE03`) is a parse error.
- **Bytes**: `b"..."` is the UTF-8 encoding of the string, except that `\x` and octal escapes are octets: `b"\377"` is the byte 255, `"\377"` is the code point U+00FF.
- **Others**: `true`, `false`, `null`.

Strings are not Unicode-normalized and are ordered by code point; normalization or collation belongs outside CEL or in an extension function (langdef, String and Bytes Values).

## Values and types

| Type                                                    | Values (langdef, Values)                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `int`, `uint`, `double`                                 | 64-bit signed, 64-bit unsigned, IEEE 754 double                                             |
| `bool`                                                  | `true`, `false`                                                                             |
| `string`                                                | sequences of Unicode code points                                                            |
| `bytes`                                                 | sequences of octets                                                                         |
| `list`                                                  | ordered sequences of values                                                                 |
| `map`                                                   | keys of type `int`, `uint`, `bool` or `string`, any values                                  |
| `null_type`                                             | `null`                                                                                      |
| message names                                           | protocol buffer messages, each its own type named by its full name                          |
| `type`                                                  | the types themselves                                                                        |
| `google.protobuf.Timestamp`, `google.protobuf.Duration` | abstract types, built only through `timestamp()` and `duration()` (langdef, Abstract Types) |

- **No implicit numeric conversion** (langdef, Numeric Values): `1 + 1u` fails to dispatch. Write `uint(1) + 1u`.
- **Aggregates** (langdef, Aggregate Values): `[e1, e2]`, `{k1: v1}`, `M{f1: e1}`. Duplicate map keys or field names are an error. Map keys must evaluate to `int`, `uint`, `bool` or `string`.
- **null** (langdef, Booleans and Null) has its own type and is not allowed wherever some other type is expected.
- **Type values** (langdef, Type Values): `type(x)` returns a value of type `type`; `type(1) == int`, `type(type(1)) == type`. At runtime aggregate type parameters are erased (`type([1]) == list`).
- **Abstract types** (langdef, Abstract Types): an implementation can add types with no syntax; they are used only through the functions it provides. CEL programs cannot construct `google.protobuf.Timestamp` or `google.protobuf.Duration` with message syntax or read their fields.

### Protocol buffer and JSON mapping

- Proto `int32`/`int64`/`sint*`/`sfixed*` are `int`; `uint*`/`fixed*` are `uint`; `float`/`double` are `double`; enums are `int`; `repeated` is `list`; `map<K,V>` is `map`; oneof options are separate fields with at most one set (langdef, Protocol Buffer Data Conversion). Writing an out-of-range CEL value into a proto field is an error; enum fields accept any signed 32-bit value.
- An unset field reads as its default; an unset message field reads as an empty message, so deep selection does not need a presence test at every step. An unset field of a wrapper type (`google.protobuf.Int64Value` and the rest) reads as `null` (langdef, Protocol Buffer Data Conversion; Dynamic Values).
- `Any` unpacks to its message, `Struct` is `map(string, Value)`, `ListValue` is a list, `Value` becomes null, double, string, bool, map or list, and wrapper types become their primitive. These conversions happen at runtime, so the type checker cannot rule out type errors on them (langdef, Dynamic Values).
- JSON maps exactly to `null`, `bool`, `double` (no infinities or NaN), `string`, `list` and string-keyed `map`. Going the other way, `int` and `uint` outside `-(2^53-1)` to `2^53-1` become decimal strings, `bytes` become base64, and `type` has no JSON form (langdef, JSON Data Conversion). JSON numbers arrive as `double`.

## Name resolution (langdef, Name Resolution)

- An expression is parsed in a container (a protobuf package or message). In container `A.B`, the name `a.b` is tried as `A.B.a.b`, then `A.a.b`, then `a.b`. A leading dot (`.a.b`) resolves only at the root.
- When a qualified name and a field selection both fit, the longest prefix that resolves wins: if `a.b.c` names a message, it beats `(a.b).c`.
- A comprehension variable shadows every outer name, including package names and variables of enclosing comprehensions; `.x` bypasses comprehension scopes and reaches the global `x` (added in v0.25.2).
- Function and variable namespaces are separate: in `size(requests) > size`, the first `size` is the function and the second a variable (langdef, Evaluation Environment).

## Gradual type checking (langdef, Gradual Type Checking)

- The checker is optional and never changes a result; it can only reject an expression. It uses parameterized types `list(A)` and `map(K, V)` and the top type `dyn`.
- `dyn(x)` has no runtime effect; it tells the checker to treat `x` as `dyn`. Use it to build heterogeneous lists such as `dyn([1, 3.14, "foo"])` or to compare across types the checker would otherwise reject.
- The checker aims to catch `no_matching_overload` and `no_such_field` before runtime. An expression that avoids `Struct`, `Value` and `Any` can be fully checked with every overload resolved ahead of time.
- Equality and ordering require the same type at check time unless one side is `dyn` (langdef, Equality; Comparison Operators).
- At runtime, `type()` and overload dispatch see only the coarse runtime types (`list`, not `list(int)`).
