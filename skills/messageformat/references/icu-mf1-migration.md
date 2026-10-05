# ICU MessageFormat 1 and migrating it to Unicode MessageFormat

Read this when reading, writing or reviewing ICU MessageFormat 1 patterns (`{count, plural, one {…} other {…}}`), or converting them to Unicode MessageFormat. Sources: the ICU User Guide page Formatting Messages, and the ICU4J 78 API docs for `MessageFormat`, `PluralFormat`, `SelectFormat` and `MessagePattern.ApostropheMode`, plus UTS #35 Part 9 for the target syntax, listed in [Sources](../SKILL.md#sources). Unicode MessageFormat is the successor to ICU MessageFormat and is deliberately not backwards-compatible with its syntax (Part 9, Introduction; Design Goals).

## Contents

- [ICU MessageFormat 1 syntax](#icu-messageformat-1-syntax)
- [Plural, selectordinal and select](#plural-selectordinal-and-select)
- [Apostrophe quoting](#apostrophe-quoting)
- [Argument formatting](#argument-formatting)
- [Authoring rules for MF1](#authoring-rules-for-mf1)
- [Mapping MF1 to Unicode MessageFormat](#mapping-mf1-to-unicode-messageformat)
- [Migration steps](#migration-steps)
- [Worked example](#worked-example)

## ICU MessageFormat 1 syntax

From the ICU4J `MessageFormat` class docs, Patterns and Their Interpretation:

```
message = messageText (argument messageText)*
argument = noneArg | simpleArg | complexArg
complexArg = choiceArg | pluralArg | selectArg | selectordinalArg

noneArg = '{' argNameOrNumber '}'
simpleArg = '{' argNameOrNumber ',' argType [',' argStyle] '}'
choiceArg = '{' argNameOrNumber ',' "choice" ',' choiceStyle '}'
pluralArg = '{' argNameOrNumber ',' "plural" ',' pluralStyle '}'
selectArg = '{' argNameOrNumber ',' "select" ',' selectStyle '}'
selectordinalArg = '{' argNameOrNumber ',' "selectordinal" ',' pluralStyle '}'

argNameOrNumber = argName | argNumber
argNumber = '0' | ('1'..'9' ('0'..'9')*)
argType = "number" | "date" | "time" | "spellout" | "ordinal" | "duration"
argStyle = "short" | "medium" | "long" | "full" | "integer" | "currency" | "percent" | argStyleText | "::" argSkeletonText
```

- Arguments can be named or numbered (`{0}`). Named arguments are more readable (`MessageFormat`, Differences from java.text.MessageFormat).
- A `noneArg` formats numbers and dates with the locale default and other values with `toString()` (`MessageFormat`).
- `choice` is deprecated: use `plural` for plurals and `select` for fixed choices (`MessageFormat`; user guide, Complex Argument Types).

## Plural, selectordinal and select

From `PluralFormat` and `SelectFormat`, Patterns and Their Interpretation:

```
pluralStyle = [offsetValue] (selector '{' message '}')+
offsetValue = "offset:" number
selector = explicitValue | keyword
explicitValue = '=' number  // adjacent, no white space in between
```

- `other` is required in every `plural`, `selectordinal` and `select`. A missing category falls back to `other` (`PluralFormat`; `SelectFormat`).
- Explicit values are tried first; otherwise the keyword comes from the plural rules applied to the number minus the offset (`PluralFormat`).
- An unquoted `#` directly in the selected sub-message (not inside a nested argument) is replaced by the number minus the offset, formatted with the locale's number format. A nested `{n, number, …}` argument formats the number without subtracting the offset (`PluralFormat`).
- `selectordinal` uses the same `pluralStyle` syntax with ordinal rules (`MessageFormat`).
- Pattern whitespace between syntax elements is ignored, except between the braces and their sub-message and between `=` and the number (`PluralFormat`). In `select`, whitespace inside a message is preserved (`SelectFormat`).
- In English, a plural with both `=0` and `=1` (up to `=offset+1`) never selects `one`, but it always needs `other` (user guide, Complex Argument Types, note).

## Apostrophe quoting

- Syntax characters in text are quoted with ASCII apostrophes. `''` always means one apostrophe, also inside quoted text: `This '{isn''t}' obvious` gives `This {isn't} obvious` (user guide, Quoting/Escaping).
- Since ICU 4.8, an apostrophe starts quoting only when it immediately precedes a character that needs quoting: `{` or `}` anywhere, `#` directly inside a `pluralStyle` sub-message, `|` directly inside a `choiceStyle` (user guide; `MessageFormat`). This is `ApostropheMode.DOUBLE_OPTIONAL`, the default; `DOUBLE_REQUIRED` is the JDK behaviour where `don't` must be written `don''t` (`MessagePattern.ApostropheMode`).
- In `argStyleText`, every apostrophe starts and ends quoting (`MessageFormat`).
- Recommendation: use U+2019 `’` in human-readable text and the ASCII apostrophe only for syntax (user guide; `MessageFormat`).

## Argument formatting

- Prefer predefined styles (`short`, `medium`, `long`, `full`; `integer`, `currency`, `percent`) or `::` skeletons, which are locale-independent. Formatting the value before passing it in is also recommended (user guide, Argument formatting).
- Pattern strings (`argStyleText` such as `#,##0.00` or `yyyy-MM-dd`) are discouraged: translators must localize them, and they bypass CLDR data (user guide, String patterns).
- Custom `Format` objects via `setFormat()` are discouraged and only reach top-level arguments (user guide, Custom Format Objects).

## Authoring rules for MF1

- Make complex arguments the outermost structure and write full sentences in each sub-message (user guide, Complex Argument Types).
- With nested `select` and `plural`, put `select` outside and at most one `plural` inside (user guide, Complex Argument Types).

## Mapping MF1 to Unicode MessageFormat

The target is Unicode MessageFormat LDML 48. Function and option names come from Part 9, Default Functions; MF1 behaviour from the ICU sources above.

| ICU MessageFormat 1                         | Unicode MessageFormat                                             | Notes                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `{name}`                                    | `{$name}`                                                         | Variables take `$`.                                                                                          |
| `{0}`                                       | `{$arg0}` (rename)                                                | A name cannot start with a digit (Names and Identifiers).                                                    |
| `{n, number}`                               | `{$n :number}`                                                    |                                                                                                              |
| `{n, number, integer}`                      | `{$n :integer}`                                                   |                                                                                                              |
| `{n, number, percent}`                      | `{$n :percent}`                                                   | Stable since LDML 48.2.                                                                                      |
| `{n, number, currency}`                     | `{$n :currency currency=EUR}`, or pass a currency amount          | MF2 needs the currency from the operand or the option; a plain number alone is a Bad Operand.                |
| `{n, number, ::skeleton}`                   | the equivalent `:number` options                                  | Skeletons are not part of the default functions; an implementation option needs a namespace.                 |
| `{d, date, short}`                          | `{$d :date length=short}`                                         | `:date` is Draft.                                                                                            |
| `{d, time, short}`                          | `{$d :time}` with `precision`                                     | `:time` is Draft; there is no direct `length` on `:time`.                                                    |
| `{d, date}` plus `{d, time}`                | `{$d :datetime}`                                                  | `:datetime` always shows date and time, unlike `{d,date}` (`:datetime`, note).                               |
| `spellout`, `ordinal`, `duration` arg types | a namespaced custom function                                      | No default function exists.                                                                                  |
| `{x, select, a {…} other {…}}`              | `.input {$x :string}` `.match $x` `a {{…}}` `* {{…}}`             | MF1 `other` becomes `*`; a key `other` on `:string` only matches the string "other".                         |
| `{n, plural, =0 {…} one {…} other {…}}`     | `.input {$n :number}` `.match $n` `0 {{…}}` `one {{…}}` `* {{…}}` | `=0` becomes the exact key `0`; `other` becomes `*` (a separate `other` key is allowed but `*` is required). |
| `{n, selectordinal, one {…} other {…}}`     | `.input {$n :number select=ordinal}` and `.match $n`              |                                                                                                              |
| `offset:1` with `#`                         | `.local $m = {$n :offset subtract=1}` and match or format `$m`    | `:offset` exists for ICU `PluralFormat` offset compatibility (`:offset`, note).                              |
| `#`                                         | `{$n}`, or `{$m}` when there is an offset                         | MF2 has no `#`; it is plain text.                                                                            |
| `'{'`, `'}'`, `'#'`                         | `\{`, `\}`, `#`                                                   | Backslash escapes only (Escape Sequences).                                                                   |
| `''`                                        | `'`                                                               | Apostrophes are plain text in MF2.                                                                           |
| nested `select` with a `plural` inside      | one `.match $x $n` with a variant per key combination             | Text outside the MF1 argument moves into every variant.                                                      |
| `choice`                                    | `:number` selection with exact or category keys                   | Deprecated in MF1; convert by meaning.                                                                       |

## Migration steps

1. Parse the MF1 pattern with the apostrophe mode it was written for (`DOUBLE_OPTIONAL` for ICU, `DOUBLE_REQUIRED` for JDK-style patterns), so that quoted text and `''` come out right.
2. Rename numbered arguments to names, and keep a map for callers.
3. Declare every selector with `.input` and the function its MF1 type implies, then put all selectors in one `.match`. Hoist nested `select`/`plural` into multiple selectors and expand the sub-messages into full-sentence variants.
4. Turn `other` into `*`. Keep `=N` as exact keys and plural keywords as keys.
5. Replace `#` with the variable, through an `:offset` local variable when the plural had an `offset`.
6. Map simple arguments with the table. Note every Draft function used, and convert pattern strings and skeletons to options.
7. Re-escape text for MF2: `\`, `{` and `}` in patterns; turn `'{'` quotes and `''` into plain characters.
8. Validate the result: no Syntax or Data Model Error, then format with the same inputs and locales and compare with the MF1 output. The MFWG test suite covers syntax and data model errors.
9. Hand the new variants to translators so they can add categories their language needs.

## Worked example

ICU MessageFormat 1, from the user guide (Complex Argument Types), shortened to two genders:

```
{gender_of_host, select,
  female {{num_guests, plural, offset:1
    =0 {{host} does not give a party.}
    =1 {{host} invites {guest} to her party.}
    =2 {{host} invites {guest} and one other person to her party.}
    other {{host} invites {guest} and # other people to her party.}}}
  other {{num_guests, plural, offset:1
    =0 {{host} does not give a party.}
    =1 {{host} invites {guest} to their party.}
    =2 {{host} invites {guest} and one other person to their party.}
    other {{host} invites {guest} and # other people to their party.}}}}
```

Unicode MessageFormat:

```
.input {$gender_of_host :string}
.input {$num_guests :integer}
.local $others = {$num_guests :offset subtract=1}
.match $gender_of_host $num_guests
female 0 {{{$host} does not give a party.}}
female 1 {{{$host} invites {$guest} to her party.}}
female 2 {{{$host} invites {$guest} and one other person to her party.}}
female * {{{$host} invites {$guest} and {$others} other people to her party.}}
*      0 {{{$host} does not give a party.}}
*      1 {{{$host} invites {$guest} to their party.}}
*      2 {{{$host} invites {$guest} and one other person to their party.}}
*      * {{{$host} invites {$guest} and {$others} other people to their party.}}
```

The MF1 plural selected keywords on the number minus the offset; here the keys are exact, so selecting on `$num_guests` is enough. If a target language needs plural categories for the "other people" count, select on `$others` instead (it supports selection like `:number`) and let the translator add `one`, `few` and so on.
