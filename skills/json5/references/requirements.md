# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## The JSON5 Data Interchange Format 1.0.0

Source: https://raw.githubusercontent.com/json5/json5-spec/d77331d96bc6b74622703e5d009d6124072f04dd/src/index.html

The specification writes its RFC 2119 key words in lower case (Conformance section).

- **§ 2 Values.** A JSON5 value must be an object, array, string, or number, or one of the three literal names true, false, or null.
- **§ 3 Objects.** A single comma may follow the name/value pair.
- **§ 3 Objects.** The names within an object should be unique.
- **§ 3 Objects.** When the names within an object are not unique, the behavior of software that receives such an object is unpredictable.
- **§ 4 Arrays.** A single comma may follow the final element.
- **§ 5 Strings.** The same quotation mark that begins a string must also end the string.
- **§ 5 Strings.** All Unicode characters may be placed within the quotation marks, except for the characters that must be escaped: the quotation mark used to begin and end the string, reverse solidus, and line terminators.
- **§ 5.1 Escapes.** A reverse solidus followed by the lower case letter `x` must be followed by two hexadecimal digits.
- **§ 5.1 Escapes.** A reverse solidus followed by the lower case letter `u` must be followed by four hexadecimal digits.
- **§ 5.1 Escapes.** A decimal digit must not follow a reverse solidus followed by a zero.
- **§ 5.2 Paragraph and Line Separators.** JSON5 parsers should produce a warning when they are found unescaped in strings.
- **§ 5.2 Paragraph and Line Separators.** JSON5 generators should escape these code points in strings.
- **§ 6 Numbers.** Hexadecimal numbers contain the literal characters `0x` or `0X` that may be prefixed with an optional plus or minus sign, which must be followed by one or more hexadecimal digits.
- **§ 6 Numbers.** The IEEE 754 value NaN must be the literal characters `NaN` and may be prefixed with an optional plus or minus sign.
- **§ 7 Comments.** Multi-line comments cannot nest.
- **§ 10 Parsers.** A JSON5 parser must accept all texts that conform to the JSON5 grammar.
- **§ 10 Parsers.** An implementation may set limits on the size of texts that it accepts, the maximum depth of nesting, the range and precision of numbers, and the length and character contents of strings.
- **§ 11 Generators.** The resulting text must strictly conform to the JSON5 grammar.
