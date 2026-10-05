# Selection, errors, fallback and bidi

Read this when writing or reviewing `.match` messages, implementing pattern selection, handling errors and fallback output, or formatting messages that mix text directions. Source: UTS #35 Part 9 MessageFormat, LDML 48.2, sections Formatting and Errors, listed in [Sources](../SKILL.md#sources).

## Contents

- [Formatting context](#formatting-context)
- [Evaluation](#evaluation)
- [Pattern selection](#pattern-selection)
- [Number selection](#number-selection)
- [Authoring variants translators can use](#authoring-variants-translators-can-use)
- [Error categories](#error-categories)
- [Error handling rules](#error-handling-rules)
- [Fallback values](#fallback-values)
- [Bidirectional isolation of output](#bidirectional-isolation-of-output)
- [Security](#security)

## Formatting context

At minimum the formatting context holds the locale (possibly a fallback chain), the base direction of the message, the input mapping of variable values, the available function handlers, and optionally a fallback string for invalid messages (Formatting Context).

The specification does not define locale identifiers. Pass BCP 47 language tags (RFC 5646), treat them as case-insensitive (RFC 5646 § 2.1.1), and build the fallback chain by truncating subtags from the end, as RFC 4647 § 3.4 Lookup does (`zh-Hant-CN` to `zh-Hant` to `zh`). Plural and ordinal rules come from the locale, so a wrong tag means wrong variants.

## Evaluation

- Implementations may resolve eagerly or lazily, but each expression is evaluated at most once, and as if all earlier declarations it depends on were evaluated in order. Lazy evaluation MUST be call-by-need, never call-by-name (Formatting, Important).
- Attributes MUST NOT affect output or reach function handlers (Formatting).
- Errors in unused parts, such as placeholders in variants that were not selected, need not be reported (Error Handling).

## Pattern selection

For a message with selectors (Pattern Selection; Resolve Selectors; Compare Variants; SelectorsMatch; SelectorsCompare):

1. Resolve each selector in source order. A value that does not support selection becomes one that matches no key, and a Bad Selector error is emitted.
2. Go through the variants in source order. A variant matches when every non-`*` key, after NFC normalization, matches its selector.
3. Keep the best match so far. Comparing two matching variants, look at keys left to right: at the first position where they differ, a literal beats `*`, and between two literals the selector's BetterThan decides.
4. A variant with only `*` keys always matches, so a pattern is always selected.

Consequences:

- Earlier selectors take priority. With `$foo = foo` and `$bar = bar`, `foo *` beats `* bar`, and `foo bar` beats both (Selection Example 2).
- Variant order does not change the result, because duplicate key lists are invalid.
- An invalid message selects a single fallback: the context's fallback string, or U+FFFD `�` (Pattern Selection).
- Some `*` variants are unreachable in some locales; keep them anyway. In Polish, `.input {$num :integer}` with `0`, `one`, `few` and `many` never reaches `*` (Pattern Selection, note).

## Number selection

`:number`, `:integer`, `:offset` and `:percent` select by the `select` option (Number Selection):

| `select`           | Matching                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `plural` (default) | exact numeric key first, then the CLDR cardinal category: `zero` `one` `two` `few` `many` `other` |
| `ordinal`          | exact numeric key first, then the CLDR ordinal category                                           |
| `exact`            | exact numeric keys only                                                                           |

- An exact key such as `1` beats a category key such as `one`, which beats `*` (Number Selection; Rule Selection).
- A key that is neither a `number-literal` nor one of the six category keywords gives Bad Variant Key. `.match $answer` with key `horse` on a `:number` selector is an example (Number Selection; Bad Variant Key).
- Rule selection applies to the operand as modified by the function options, so options such as `maximumFractionDigits` can change the category (Rule Selection).
- Exact matching is well defined only for integers without leading zeros and without `minimumFractionDigits`, `minimumIntegerDigits`, `minimumSignificantDigits` or `maximumSignificantDigits`; otherwise serialization is implementation-defined. Avoid exact keys with fraction or significant-digit options (Exact Literal Match Serialization).
- `select` MUST be a literal: `select=$kind` gives Bad Option and the value cannot be selected on (Number Selection).

The categories a locale uses come from CLDR plural rules (type `cardinal` for `plural`, `ordinal` for `ordinal`); check the CLDR charts for the target locale rather than guessing (Rule Selection). The Czech example from the specification:

```
.input {$numDays :number}
.match $numDays
one  {{{$numDays} den}}
few  {{{$numDays} dny}}
many {{{$numDays} dne}}
*    {{{$numDays} dní}}
```

With CLDR 44 rules, 1 selects `one`, 2 and 22 select `few`, 5 and 27 fall to `*` (`other`), and 2.4 selects `many` (Rule Selection).

## Authoring variants translators can use

- Default to `plural`. A message that only has `1` and `*` in English still needs `one` (and in Polish or Russian also `few` and `many`) in other languages (Default Value of `select` Option).
- The translation system and the translator add the category variants each target language needs, such as `one` or `few` (ICU user guide, Complex Argument Types, note).
- Write full sentences in every variant and make the selection the outermost structure. The matcher already covers the whole message, so do not build a sentence from fragments (ICU user guide, Complex Argument Types).
- With several selectors, put each combination in its own variant rather than nesting messages (Selector, the two-selector example).
- Mark text that must not be translated with an attribute such as `@translate=no`, and give placeholders clear variable names (Attributes; Names and Identifiers).
- Keep literal keys in NFC (Literals, Important).
- Treat formatted output as opaque, for presentation only; do not parse or concatenate it (Formatting of the Selected Pattern).

## Error categories

| Category               | Errors                                                                                                                                       | When                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Syntax Error           | not well-formed                                                                                                                              | parse                     |
| Data Model Error       | Variant Key Mismatch, Missing Fallback Variant, Missing Selector Annotation, Duplicate Declaration, Duplicate Option Name, Duplicate Variant | parse or validation       |
| Resolution Error       | Unresolved Variable, Unknown Function, Bad Selector                                                                                          | formatting                |
| Message Function Error | Bad Operand, Bad Option, Bad Variant Key, Unsupported Operation, implementation-defined                                                      | formatting, from handlers |

Examples that fail (Errors):

```
{{Missing end braces
```

```
.local $var = {|no message body|}
```

```
.input {$one :ns:func}
.match $one
1 {{Value is one}}
2 {{Value is two}}
```

The last one has no `*` variant: Missing Fallback Variant.

```
.local $day = {|2024-05-01| :date}
.match $day
* {{The due date is {$day}}}
```

`:date` does not support selection: Bad Selector.

## Error handling rules

- Syntax Errors and Data Model Errors MUST be emitted as soon as possible (Error Handling).
- During selection and formatting, expression handlers MUST emit only Message Function Errors (Error Handling).
- When formatting a message with errors, an implementation MUST give the caller a way to find at least one error: an exception, an error code or an error list (Error Handling).
- For every valid message, an implementation MUST let the user get a formatted result, which may contain fallback values (Error Handling).
- An implementation that does not report every error MUST report Syntax and Data Model Errors before others (Error Handling, since LDML 48).
- A selector that errors MUST NOT match any key except `*`, and Bad Selector MUST be emitted (Error Handling).
- An option whose value falls back is left out of the options; the error is not fatal (Option Resolution).
- Markup resolution always succeeds (Markup Resolution).

## Fallback values

When an expression fails to resolve, its value is a fallback whose string form is (Fallback Resolution):

| Expression                         | Fallback string         | Formatted as     |
| ---------------------------------- | ----------------------- | ---------------- |
| variable operand, `{$var :number}` | `$var`                  | `{$var}`         |
| literal operand, `{42 :ns:func}`   | `\|42\|`                | `{\|42\|}`       |
| function only, `{:ns:func}`        | `:ns:func`              | `{:ns:func}`     |
| anything else                      | `�` U+FFFD              | `{�}`            |
| whole message not valid            | context fallback or `�` | `{�}` by default |

- A fallback in string output is wrapped in `{` and `}` (Formatting Fallback Values).
- Options and attributes are dropped from fallbacks, and fallbacks cannot be selected on (Fallback Resolution).
- A local variable bound to a failed expression falls back to its own name: in `.local $var = {|val| :ns:func} {{{$var}}}` the output is `{$var}` (Fallback Resolution).
- Text, literals and markup never fall back (Fallback Resolution).

## Bidirectional isolation of output

- The **Default Bidi Strategy** MUST be the default when formatting to a single string. Other strategies, including one that does nothing, MAY be offered (Handling Bidirectional Text).
- For each placeholder, the strategy wraps the formatted value by its direction: LTR inside an LTR message with no `u:dir` override is left as is; any other LTR value gets LRI U+2066 … PDI U+2069; RTL gets RLI U+2067 … PDI; unknown gets FSI U+2068 … PDI. Text and markup are not wrapped (Handling Bidirectional Text).
- The direction of a value SHOULD come from the function handler or the locale, not from inspecting the formatted characters (Handling Bidirectional Text, Important).
- A formatter whose own output mixes directions, such as a currency with an RTL symbol, SHOULD insert the marks it needs (Handling Bidirectional Text).
- When formatting to parts, expose each placeholder's direction to the caller (Handling Bidirectional Text).
- Use `u:dir` on a placeholder whose direction differs from the message (`u:dir`).

For accessible rendering of the result, see the `wcag` skill.

## Security

- Messages can carry invisible characters, control characters and bidi controls that change how the source looks in editors and translation tools without causing errors; see UTS #55 for source code handling (Security Considerations).
- Third-party functions, selectors and markup can be a vector for code injection, tracking or overflow; sandbox them (Security Considerations).
