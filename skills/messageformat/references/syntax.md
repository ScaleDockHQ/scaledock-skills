# Syntax and the interchange data model

Read this when writing, parsing, serializing or reviewing a Unicode MessageFormat message, or when exchanging messages as JSON. Source: UTS #35 Part 9 MessageFormat, LDML 48.2 (tr35-78), listed in [Sources](../SKILL.md#sources). The part has no section numbers, so citations name the heading, for example (Syntax › Matcher).

## Contents

- [Simple and complex messages](#simple-and-complex-messages)
- [Declarations](#declarations)
- [Patterns, text and escaping](#patterns-text-and-escaping)
- [Expressions, functions and options](#expressions-functions-and-options)
- [Matcher, selectors, variants and keys](#matcher-selectors-variants-and-keys)
- [Markup and attributes](#markup-and-attributes)
- [Literals, names and identifiers](#literals-names-and-identifiers)
- [Whitespace and bidi controls in the source](#whitespace-and-bidi-controls-in-the-source)
- [Well-formed and valid](#well-formed-and-valid)
- [Interchange data model](#interchange-data-model)
- [Common mistakes](#common-mistakes)

## Simple and complex messages

```abnf
message         = simple-message / complex-message
simple-message  = o [simple-start pattern]
complex-message = o *(declaration o) complex-body o
complex-body    = quoted-pattern / matcher
quoted-pattern  = "{{" pattern "}}"
```

- A **simple message** is a single pattern. The empty string is a valid simple message. Its first non-whitespace character cannot be `.` (the `simple-start-char` production omits U+002E), and whitespace at its start and end is significant text (The Message; Text).
- A **complex message** contains declarations, a matcher, or both. It begins with a keyword with a `.` prefix or with a quoted pattern `{{…}}`. Whitespace at its start or end is not significant (The Message).
- Whitespace inside a pattern is always significant and MUST be preserved (The Message; Text).
- To keep leading or trailing spaces safe from a container format that trims, quote the pattern: `{{   Hello   }}` (Text, the `.properties` example).

```
Hello, {$name}!
```

```
.input {$count :number}
{{You have {$count} new messages.}}
```

## Declarations

```abnf
declaration       = input-declaration / local-declaration
input-declaration = input o variable-expression
local-declaration = local s variable o "=" o expression
```

- `.input {$var :fn opts}` binds an external variable and may apply a function to it. Only an external variable can be the operand of an input declaration (The Message; Declarations).
- `.local $name = {expression}` binds a local variable to the resolved value of an expression (Declarations).
- Variables MUST NOT be redeclared. A declaration MUST NOT bind a variable that appears in a previous declaration, an `.input` MUST NOT bind a variable that appears in its own function, and a `.local` MUST NOT bind a variable that appears in its own expression. An input variable is implicitly declared when first used, so declaring it later is also an error (Declarations; Errors › Duplicate Declaration).
- A `.local` MAY shadow an external input value if that value did not appear in a previous declaration (Declarations).
- A placeholder may apply a different function to a declared variable than its declaration did (Declarations, note).
- The keywords are exactly `.input`, `.local` and `.match`, lowercase and case-sensitive (Keywords).

## Patterns, text and escaping

- In text, `\`, `{` and `}` MUST be escaped as `\\`, `\{` and `\}`. Any code point except U+0000 is allowed (Text).
- In a quoted literal, `\` and `|` MUST be escaped as `\\` and `\|` (Literals).
- The only escapes are `\\`, `\{`, `\|` and `\}` (Escape Sequences). There is no `\n` or `\u` escape: MessageFormat leaves line breaks and other characters to the container format's own escaping (Design Goals).
- When generating a message, escape only where required: `|` inside literals, `{` and `}` inside patterns (Escape Sequences).
- Apostrophes, quotes, `#` and `%` are plain text. They need no quoting (The Message, note).

```
Use \{braces\} and a backslash \\ in text.
```

## Expressions, functions and options

```abnf
expression          = literal-expression / variable-expression / function-expression
literal-expression  = "{" o literal [s function] *(s attribute) o "}"
variable-expression = "{" o variable [s function] *(s attribute) o "}"
function-expression = "{" o function *(s attribute) o "}"
function            = ":" identifier *(s option)
option              = identifier o "=" o (literal / variable)
```

- An expression is wrapped in single braces, is never empty, and cannot contain another expression (Expressions).
- A function starts with `:`; options follow it, separated by whitespace. Option order is not significant (Function; Options; Option Resolution).
- Option identifiers MUST be unique within a function, otherwise Duplicate Option Name (Options).
- An option value is a literal or a variable. The resolved value records whether it was a literal, because some options (such as `select`) MUST be literals (Resolved Values).
- A literal with no function always resolves to a string. To get a number or date from a literal, add a function: `{42 :number}`, `{|2023-08-30| :datetime}` (Expression Resolution, note).
- `foo=42` and `foo=|42|` are identical: quoted and unquoted literals with the same code points MUST NOT be distinguished (Literals; Literal Resolution).
- A bare `{$date}` MAY be formatted by the implementation as if a function were applied based on the value's type (Expression Resolution).

## Matcher, selectors, variants and keys

```abnf
matcher         = match-statement s variant *(o variant)
match-statement = match 1*(s selector)
selector        = variable
variant         = key *(s key) o quoted-pattern
key             = literal / "*"
```

- `.match` takes one or more selectors and at least one variant (Matcher).
- Each selector is a **variable** that directly or indirectly references a declaration with a function. `.match {$count :number}` is not valid syntax in LDML 48 (Matcher; Selector).
- Each variant has exactly as many keys as there are selectors; keys are separated by whitespace (Variant).
- At least one variant has only `*` keys (Matcher).
- No two variants use the same key list. Literal keys compare by string value, so `foo` and `|foo|` are the same key (Matcher; Duplicate Variant).
- Literal keys are compared after NFC normalization (Key).
- To match the string `*`, quote it: `|*|` (Key, note). To match a string with spaces, quote it: `| space key |` (`:string` Selection, note).

```
.input {$numLikes :integer}
.input {$numShares :integer}
.match $numLikes $numShares
0   0   {{Your item has no likes and has not been shared.}}
0   one {{Your item has no likes and has been shared {$numShares} time.}}
0   *   {{Your item has no likes and has been shared {$numShares} times.}}
one 0   {{Your item has {$numLikes} like and has not been shared.}}
one one {{Your item has {$numLikes} like and has been shared {$numShares} time.}}
one *   {{Your item has {$numLikes} like and has been shared {$numShares} times.}}
*   0   {{Your item has {$numLikes} likes and has not been shared.}}
*   one {{Your item has {$numLikes} likes and has been shared {$numShares} time.}}
*   *   {{Your item has {$numLikes} likes and has been shared {$numShares} times.}}
```

## Markup and attributes

```abnf
markup    = "{" o "#" identifier *(s option) *(s attribute) o ["/"] "}"  ; open and standalone
          / "{" o "/" identifier *(s option) *(s attribute) o "}"        ; close
attribute = "@" identifier [o "=" o literal]
```

- Markup has three forms: open `{#b}`, standalone `{#img src=|a.png| /}` and close `{/b}` (Markup).
- Open and close markup need not pair or nest; specifications that define markup may add pairing rules (Markup).
- When formatting to a string, markup formats to the empty string by default (Formatting of the Selected Pattern).
- Attributes such as `@translate=no` or `@can-copy` have no effect on formatting and MUST NOT be passed to function handlers; treat them like comments for tools and translators (Attributes; Formatting). Attribute values are literals only. With a repeated attribute identifier, only the last is used (Attributes).

```
In French, "{|bonjour| @translate=no}" is a greeting
{#button}Submit{/button} or {#img alt=Cancel src=|../cancel.jpg| /}.
```

## Literals, names and identifiers

- A quoted literal is `|…|`. An unquoted literal is `1*name-char`: no whitespace and no syntax characters (Literals).
- Variables are `$name`. Functions are `:identifier`, markup `#identifier` or `/identifier`, options have no prefix (Names and Identifiers).
- `identifier = [namespace ":"] name`. Default functions and their options have no namespace. Use a namespace for any custom function, markup or attribute, and for custom options on default functions, for example `:ns:hasCase` or `ns:option=value` (Names and Identifiers; Default Functions).
- The namespace `u` is reserved; `u:id` and `u:dir` are defined (Names and Identifiers; Unicode Namespace).
- A `name` cannot start with a digit, `-` or `.`: `name-start` omits ASCII digits and most ASCII punctuation (Names and Identifiers, ABNF). So `$0` is not a valid variable.
- Names compare after NFC normalization (Names and Identifiers).
- An external variable whose name is not a valid name can be passed but cannot be referenced (Names and Identifiers, note).
- Choose names that follow Unicode Default Identifier Syntax and the General Security Profile; linters SHOULD warn otherwise (Names and Identifiers).

## Whitespace and bidi controls in the source

- Outside text and quoted literals, whitespace is limited to tab, LF, CR, U+3000 IDEOGRAPHIC SPACE and SPACE (Whitespace).
- Both whitespace productions allow the bidi marks and isolates ALM U+061C, LRM U+200E, RLM U+200F and LRI/RLI/FSI/PDI U+2066 to U+2069 (Whitespace). Names may be wrapped in them, and they are ignored when matching names (Names and Identifiers).
- Messages with RTL characters SHOULD use LRI…PDI isolates inside `{ }`, outside `{{ }}`, and around a variable, function, markup or attribute including its sigil, or LRM/RLM/ALM marks next to names and literals (Whitespace).
- Do not put controls inside a literal or quoted pattern unless they are part of the value, and do not put them outside placeholders: put them inside, `{<LRI>$foo :number<PDI>}` (Whitespace, Important).
- Tools and editors are strongly encouraged to insert paired isolates around RTL syntax for the user (Whitespace, note).

## Well-formed and valid

- **Well-formed** means the message matches the ABNF; otherwise a Syntax Error (Well-formed vs. Valid Messages).
- **Valid** means well-formed and meeting the declaration, matcher and option rules; otherwise a Data Model Error (Well-formed vs. Valid Messages).
- The grammar is `message.abnf`, written in ABNF with RFC 7405 case-sensitive strings (Complete ABNF).

## Interchange data model

The data model lets tools exchange the logical form of a message, including messages converted from other syntaxes such as ICU MessageFormat, without reparsing (Interchange Data Model). Implementations are not required to use it internally.

```ts
type Message = PatternMessage | SelectMessage;
interface PatternMessage {
  type: "message";
  declarations: Declaration[];
  pattern: Pattern;
}
interface SelectMessage {
  type: "select";
  declarations: Declaration[];
  selectors: VariableRef[];
  variants: Variant[];
}
type Declaration = InputDeclaration | LocalDeclaration;
interface InputDeclaration {
  type: "input";
  name: string;
  value: VariableExpression;
}
interface LocalDeclaration {
  type: "local";
  name: string;
  value: Expression;
}
interface Variant {
  keys: Array<Literal | CatchallKey>;
  value: Pattern;
}
interface CatchallKey {
  type: "*";
  value?: string;
}
type Pattern = Array<string | Expression | Markup>;
interface Literal {
  type: "literal";
  value: string;
}
interface VariableRef {
  type: "variable";
  name: string;
}
interface FunctionRef {
  type: "function";
  name: string;
  options: Options;
}
type Options = Map<string, Literal | VariableRef>;
interface Markup {
  type: "markup";
  kind: "open" | "standalone" | "close";
  name: string;
  options: Options;
  attributes: Attributes;
}
type Attributes = Map<string, Literal | true>;
```

Expressions are `{ type: "expression", arg?, function?, attributes }` with at least one of `arg` and `function` (Pattern Model; Expression Model).

- Names carry no sigils: no `$`, `:`, `#` or `/` (Message Model; Expression Model; Markup Model).
- `Literal.value` is the unescaped value; quoting is not preserved (Expression Model).
- An `InputDeclaration`'s `name` MUST equal the name of its `VariableRef` (Message Model).
- Every string element in a `Pattern` MUST be non-empty (Pattern Model).
- Consumers MUST NOT assume the `Expression` and `Markup` shapes are exhaustive, and MUST ignore unknown fields (Pattern Model; Model Extensions).
- For JSON or YAML, validate against the JSON Schema `message.json`, which makes `declarations`, `options` and `attributes` optional (Interchange Data Model; `message.json`).

```json
{
  "type": "select",
  "declarations": [
    {
      "type": "input",
      "name": "count",
      "value": {
        "type": "expression",
        "arg": { "type": "variable", "name": "count" },
        "function": { "type": "function", "name": "number" }
      }
    }
  ],
  "selectors": [{ "type": "variable", "name": "count" }],
  "variants": [
    {
      "keys": [{ "type": "literal", "value": "one" }],
      "value": [
        "You have ",
        {
          "type": "expression",
          "arg": { "type": "variable", "name": "count" }
        },
        " notification."
      ]
    },
    {
      "keys": [{ "type": "*" }],
      "value": [
        "You have ",
        {
          "type": "expression",
          "arg": { "type": "variable", "name": "count" }
        },
        " notifications."
      ]
    }
  ]
}
```

## Common mistakes

| Mistake                                                     | Fix                                                        |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `.match {$count :number}`                                   | `.input {$count :number}` then `.match $count` (Selector)  |
| Simple message that starts with `.`, such as `.5 seconds`   | Quote the pattern: `{{.5 seconds}}`                        |
| `{42}` expected to format as a number                       | `{42 :number}` (Expression Resolution)                     |
| `.match $x` with no `*` variant                             | Add `* {{…}}` (Missing Fallback Variant)                   |
| `.match $x` where `$x` has no function in any declaration   | Declare `.input {$x :string}` or another selector function |
| Writing `\n` for a newline                                  | Put a real newline, or use the container format's escape   |
| Unquoted key with a space or `*`                            | `\| two words \|` and `\|*\|` as quoted literals           |
| Custom function without a namespace, such as `:uppercase`   | `:ns:uppercase` (Default Functions; Names and Identifiers) |
| Bidi marks placed outside `{…}`, which leak into the output | Put them inside the placeholder braces (Whitespace)        |
