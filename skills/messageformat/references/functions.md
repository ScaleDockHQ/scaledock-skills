# Default functions and the `u:` namespace

Read this when choosing a function or option for a placeholder or selector, or when implementing the default functions. Source: UTS #35 Part 9 MessageFormat, LDML 48.2, sections Default Functions and Unicode Namespace, listed in [Sources](../SKILL.md#sources).

## Contents

- [Stable and Draft](#stable-and-draft)
- [Conformance rules for functions](#conformance-rules-for-functions)
- [`:string`](#string)
- [Numeric operands and digit size options](#numeric-operands-and-digit-size-options)
- [`:number` and `:integer`](#number-and-integer)
- [`:offset`](#offset)
- [`:currency`](#currency)
- [`:percent`](#percent)
- [`:unit` (Draft)](#unit-draft)
- [`:datetime`, `:date`, `:time` (Draft)](#datetime-date-time-draft)
- [`u:id` and `u:dir`](#uid-and-udir)
- [Custom functions](#custom-functions)

## Stable and Draft

Functions not marked Draft are Stable and covered by the stability policy; Draft functions and options can be renamed, changed or removed before they become Stable (Stability Policy).

| Function    | LDML 48.2 status | Selects                               | Formats |
| ----------- | ---------------- | ------------------------------------- | ------- |
| `:string`   | Stable           | yes, by string equality               | yes     |
| `:number`   | Stable           | yes, plural, ordinal or exact         | yes     |
| `:integer`  | Stable           | yes, plural, ordinal or exact         | yes     |
| `:offset`   | Stable           | yes, as `:number`                     | yes     |
| `:currency` | Stable           | no selection section defined          | yes     |
| `:percent`  | Stable           | yes, plural on the value times 100    | yes     |
| `:unit`     | Draft            | no                                    | yes     |
| `:datetime` | Draft            | no (date/time selection not required) | yes     |
| `:date`     | Draft            | no                                    | yes     |
| `:time`     | Draft            | no                                    | yes     |

`:offset` became Stable in LDML 48 (it was the Draft `:math` in LDML 47). `:currency` and `:percent` became Stable in LDML 48.2. The date/time functions are Draft and based on Semantic Skeletons, which are themselves a technical preview (Date and Time Value Formatting). A message that must be stable across implementations and releases uses only Stable functions; when you use a Draft function, say so in the review.

## Conformance rules for functions

- To **accept** a function means never emitting Unknown Function for it; to accept an option means never emitting Bad Option for it or its defined values. Accepting does not fix the output (Default Functions).
- Implementations MAY emit Unsupported Operation for options or values they cannot support (Default Functions).
- Options not defined by the specification for a default function MUST use an implementation-specific namespace. Implementation-specific values for defined options are NOT RECOMMENDED, and so is writing messages that use undefined options (Default Functions).
- Implementations SHOULD let users register their own functions (Default Functions).
- When the operand is the resolved value of another numeric expression, its options carry over and options on the outer expression win. For example, `.input {$n :number minimumFractionDigits=2 signDisplay=always}` then `{$n :number minimumFractionDigits=1}` resolves to `minimumFractionDigits=1, signDisplay=always` (`:number` Options).

## `:string`

- Operand: a string, anything the implementation can convert to a string, or any literal. Other values give Bad Operand (`:string` Operands).
- No options of its own; `u:` options still apply, for example `{$s :string u:dir=ltr u:id=my-string}` (`:string` Options).
- Selection: a key matches when it equals the NFC form of the operand's string value. No key is better than another (Selection with `:string`).
- Formatting returns the string value and does not normalize it (`:string` Formatting).

```
.input {$platform :string}
.match $platform
windows {{Settings}}
*       {{Preferences}}
```

## Numeric operands and digit size options

- A numeric operand is an implementation-defined numeric type, or a literal matching `number-literal = ["-"] (%x30 / (%x31-39 *DIGIT)) ["." 1*DIGIT] [%i"e" ["-" / "+"] 1*DIGIT]`. A string variable whose content matches `number-literal` also works. Anything else gives Bad Operand (Numeric Operands).
- A digit size option is a non-negative small integer, as a string matching `"0" / (("1"-"9") [DIGIT])`. A bad value gives Bad Option and the option is ignored; an implementation MAY instead clamp a value outside its limits (Digit Size Options).
- Option names and values come from JavaScript's `Intl.NumberFormat` (`:number` Options, note).

## `:number` and `:integer`

REQUIRED options on `:number` (defaults in bold):

| Option                     | Values                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| `select`                   | **`plural`**, `ordinal`, `exact` (literal only, see below)                                             |
| `signDisplay`              | **`auto`**, `always`, `exceptZero`, `negative`, `never`                                                |
| `useGrouping`              | **`auto`**, `always`, `never`, `min2`                                                                  |
| `minimumIntegerDigits`     | digit size, default **1**                                                                              |
| `minimumFractionDigits`    | digit size                                                                                             |
| `maximumFractionDigits`    | digit size                                                                                             |
| `minimumSignificantDigits` | digit size                                                                                             |
| `maximumSignificantDigits` | digit size                                                                                             |
| `trailingZeroDisplay`      | **`auto`**, `stripIfInteger`                                                                           |
| `roundingPriority`         | **`auto`**, `morePrecision`, `lessPrecision`                                                           |
| `roundingIncrement`        | **1**, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000                                |
| `roundingMode`             | `ceil`, `floor`, `expand`, `trunc`, `halfCeil`, `halfFloor`, **`halfExpand`**, `halfTrunc`, `halfEven` |

`:integer` has only `select`, `signDisplay`, `useGrouping`, `minimumIntegerDigits` and `maximumSignificantDigits`, and discards `minimumFractionDigits`, `maximumFractionDigits` and `minimumSignificantDigits` inherited from its operand (`:integer` Options).

- `select` MUST be set with a literal. A variable value, or a `select` carried in by an operand, gives Bad Option and the value cannot be used as a selector. `select` does not change formatting (Number Selection).
- There is no `style=percent` on `:number` since LDML 47; use `:percent`.

```
.input {$n :number maximumFractionDigits=1}
{{Average: {$n}, rounded down {$n :integer}}}
```

## `:offset`

Shifts a numeric value by a small integer, for compatibility with ICU `PluralFormat` offsets (`:offset`, note).

- Exactly one of `add` or `subtract` (digit size) is REQUIRED. None, both, or a bad value gives Bad Option and a fallback value (`:offset` Options).
- The `:offset` options are not carried in the resolved options; the operand's numeric options are (`:offset` Resolved Value).
- Selection works as for `:number` (Selection with `:offset`).

```
.input {$like_count :integer}
.local $others_count = {$like_count :offset subtract=1}
.match $like_count $others_count
0 *   {{Your post has no likes.}}
1 *   {{{$name} liked your post.}}
* one {{{$name} and {$others_count} other user liked your post.}}
* *   {{{$name} and {$others_count} other users liked your post.}}
```

## `:currency`

- Operand: an implementation-defined currency amount (value plus currency), or a numeric operand plus the `currency` option. A plain number with no `currency` option gives Bad Operand. The `currency` option MUST NOT override the currency of a currency-amount operand; doing so gives Bad Option (`:currency` Operands).
- Currency codes are well-formed `3ALPHA` Unicode Currency Identifiers and case-insensitive; validity is not required (`:currency` Operands).
- REQUIRED options: `currency`; `currencySign` (**`standard`**, `accounting`); `currencyDisplay` (`narrowSymbol`, **`symbol`**, `name`, `code`, `never`); `useGrouping`; `minimumIntegerDigits`; `fractionDigits` (**`auto`**, the currency's digits, or a digit size); `minimumSignificantDigits`; `maximumSignificantDigits`; `trailingZeroDisplay`; `roundingPriority`; `roundingIncrement`; `roundingMode` (`:currency` Options).
- `trailingZeroDisplay=stripIfInteger` shows `$5` for 5.00 USD and `$5.01` for 5.01 USD in `en-US` (`:currency` Options).

```
The special price is {$price :currency trailingZeroDisplay=stripIfInteger}.
```

## `:percent`

- The operand is multiplied by 100 for formatting and selection; options apply to the multiplied value. The resolved numeric value is not multiplied (`:percent` Operands; Options; Resolved Value).
- REQUIRED options: `signDisplay`, `useGrouping`, `minimumFractionDigits` (default 0), `maximumFractionDigits` (default 0), `minimumSignificantDigits`, `maximumSignificantDigits`, `trailingZeroDisplay`, `roundingPriority`, `roundingMode`. It discards `minimumIntegerDigits`, `roundingIncrement` and `select` from its operand (`:percent` Options).
- Selection always uses plural mode on the value times 100: with `{1 :percent}`, key `100` matches (Selection with `:percent`).

```
{0.1234 :percent maximumFractionDigits=1}
```

This might format as "12.3%" in English.

## `:unit` (Draft)

Proposed as a RECOMMENDED formatter for a value with a unit of measurement. The operand is an implementation-defined measure or a number plus the `unit` option; a number without `unit` gives Bad Operand. Conversion through `usage` is optional; implementations MUST NOT change the unit without converting, and SHOULD emit Unsupported Operation for an unsupported conversion (`:unit`; Unit Conversion).

## `:datetime`, `:date`, `:time` (Draft)

All three accept an implementation-defined date/time type or a date/time literal: an ISO 8601 date, or a datetime with an optional offset. Without a time, implementations SHOULD use `00:00:00`; without an offset, a floating local time (Date and Time Operands). The syntax does not define date/time literals, so a well-formed message can still give Bad Operand at runtime.

| Function    | Defaults                                         | REQUIRED options                                                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `:datetime` | `dateFields=year-month-day timePrecision=minute` | `dateFields` (`weekday`, `day-weekday`, `month-day`, `month-day-weekday`, `year-month-day`, `year-month-day-weekday`), `dateLength` (`long`, `medium`, `short`), `timePrecision` (`hour`, `minute`, `second`), `timeZoneStyle` (`long`, `short`) |
| `:date`     | `fields=year-month-day length=medium`            | `fields` (same values as `dateFields`), `length` (`long`, `medium`, `short`)                                                                                                                                                                     |
| `:time`     | `precision=minute`                               | `precision` (`hour`, `minute`, `second`), `timeZoneStyle` (`long`, `short`)                                                                                                                                                                      |

- These style options MUST be literals; a variable gives Bad Option and the option is ignored (`:datetime`, `:date`, `:time` Options).
- Without `timeZoneStyle`, no time zone is shown (`:datetime` Options; `:time` Options).
- Override options on all three: `timeZone` (REQUIRED: a time zone identifier, or `input` for the operand's own zone; `input` without a zone in the operand gives Bad Operand), `hour12` (REQUIRED on `:datetime` and `:time`), `calendar` (RECOMMENDED, a Unicode Calendar Identifier) (Date and Time Override Options).
- `{$d :datetime}` always shows both date and time, unlike `{d,date}` in ICU MessageFormat 1 and JavaScript `Intl.DateTimeFormat` (`:datetime`, note).
- Date/time selection is not required in this release (Date and Time Value Formatting, note).
- Time zone serializations are expected to follow the Temporal and IETF SEDATE work later (Date and Time Operands, note). For Temporal values, see the `ecmascript-temporal` skill.

```
Today is {$now :date length=long}!
It is now {$now :time precision=second timeZoneStyle=short}.
```

## `u:id` and `u:dir`

`u:` options apply to every function and to markup, including custom functions (Unicode Namespace Options).

- `u:id`: a string id for the placeholder in structured (parts) output; ignored when formatting to a string. Implementations with non-string output SHOULD support it (`u:id`).
- `u:dir`: `ltr`, `rtl`, `auto` or **`inherit`**. It replaces the expression's base direction and applies isolation. It is removed from the options before the function handler is called, and is a Bad Option on markup. Implementations SHOULD support it (`u:dir`).
- `u:locale` was a Draft option in LDML 47 and 48 and was removed in LDML 48.2 (LDML 48.2 release notes). Set the locale in the formatting context instead.

## Custom functions

- Name custom functions with a namespace, for example `:ns:person` (Default Functions; Names and Identifiers).
- Function handlers get only minimal, read-only access to the formatting context, and SHOULD be time-limited (Function Handler).
- Handlers SHOULD NOT mutate external state; such a handler can be a remote execution hazard (Formatting, Important).
- If users can install third-party functions or markup, sandbox them (Security Considerations).
- A handler SHOULD emit Bad Operand for operand types it does not support (Function Handler).
- An implementation that lets users define functions MUST let handlers return values usable as operands and option values of later expressions (Function Handler).
