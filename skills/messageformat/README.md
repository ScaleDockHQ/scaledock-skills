# messageformat

An agent skill for Unicode MessageFormat (MessageFormat 2.0, UTS #35 Part 9): writing, reviewing and implementing localizable messages, and migrating ICU MessageFormat 1 patterns.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill messageformat
```

Then ask your agent to "write this plural message in MessageFormat 2", "review our MF2 formatter's error handling" or "convert these ICU MessageFormat strings to MF2".

## What it covers

- Syntax: simple and complex messages, `.input` and `.local` declarations, `.match` with variants and `*`, placeholders, markup, attributes, literals, quoting and escaping.
- The default functions, Stable and Draft: `:string`, `:number`, `:integer`, `:offset`, `:currency`, `:percent`, `:unit`, `:datetime`, `:date`, `:time`, plus `u:id` and `u:dir`.
- Pattern selection: plural, ordinal and exact numeric matching, multiple selectors, and variants translators can extend.
- Errors and fallback output, the Default Bidi Strategy, and the JSON interchange data model.
- ICU MessageFormat 1 (`plural`, `select`, `selectordinal`, `#`, `offset`, apostrophe quoting) and a mapping to Unicode MessageFormat.

## Versions

| Line                                | Status                    |
| ----------------------------------- | ------------------------- |
| Unicode MessageFormat LDML 49 draft | preview (track)           |
| Unicode MessageFormat LDML 48       | current (48.2)            |
| Unicode MessageFormat LDML 47       | supported                 |
| MessageFormat 2.0 Tech Preview      | legacy (upgrade from)     |
| ICU MessageFormat 1                 | own family (migrate from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [UTS #35 Part 9: MessageFormat](https://www.unicode.org/reports/tr35/tr35-messageFormat.html): Unicode Technical Standard, LDML 48.2.
- [UTS #35 Part 9, LDML 49 draft](https://www.unicode.org/reports/tr35/tr35-79/tr35-messageFormat.html): Proposed Update, CLDR 49 draft.
- Earlier Part 9 texts: [LDML 47](https://www.unicode.org/reports/tr35/tr35-75/tr35-messageFormat.html), [LDML 46.1](https://www.unicode.org/reports/tr35/tr35-74/tr35-messageFormat.html), [LDML 46](https://www.unicode.org/reports/tr35/tr35-73/tr35-messageFormat.html), [LDML 45](https://www.unicode.org/reports/tr35/tr35-72/tr35-messageFormat.html).
- [message-format-wg](https://github.com/unicode-org/message-format-wg): the [editor's copy](https://github.com/unicode-org/message-format-wg/tree/main/spec), [release notes](https://github.com/unicode-org/message-format-wg/releases) and [test suite](https://github.com/unicode-org/message-format-wg/tree/main/test).
- [ICU User Guide: Formatting Messages](https://unicode-org.github.io/icu/userguide/format_parse/messages/) and the ICU4J 78 API docs for [MessageFormat](https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/MessageFormat.html), [PluralFormat](https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/PluralFormat.html), [SelectFormat](https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/SelectFormat.html) and [MessagePattern.ApostropheMode](https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/MessagePattern.ApostropheMode.html).
- [BCP 47](https://www.rfc-editor.org/info/bcp47): [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646) and [RFC 4647](https://www.rfc-editor.org/rfc/rfc4647).

## License

MIT
