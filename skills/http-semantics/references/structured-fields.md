# Structured Field Values

Read this when defining a new HTTP header or trailer field, or when parsing or generating a field that is defined as a Structured Field (for example Accept-Query, Deprecation or Idempotency-Key). Sources: RFC 9651, with RFC 8941 for legacy field definitions, listed in [Sources](../SKILL.md#sources). Version differences are in [`versions.md`](versions.md).

## Defining a field (RFC 9651 § 2)

A field definition that uses Structured Fields needs to:

1. Normatively reference RFC 9651 (or RFC 8941 for an existing legacy field; see below).
2. Say whether it is a Structured Header (header section only, the common case), a Structured Trailer, or a Structured Field (both).
3. Name the top-level type: **List**, **Dictionary** or **Item**. A field defined as a bare type such as Integer is assumed to be an Item, so it can carry Parameters (§ 2.3).
4. Define the semantics, any extra constraints (ranges, formats, allowed types, cardinality), and what happens when a constraint is violated. Inner Lists are only valid when the definition allows them (§ 2).

Example from the RFC (§ 2.1): "Foo-Example is an Item Structured Header Field [RFC9651]. Its value MUST be an Integer (Section 3.3.1 of [RFC9651]). … it MUST be between 0 and 10, inclusive; other values MUST cause the entire header field to be ignored."

Rules for definitions:

- RFC 9651 applies to the whole field value only, never to part of it (§ 2).
- When parsing fails, the entire field is ignored (or the message treated as malformed, § 4.2); a definition cannot loosen that, only add constraints. When a field-specific constraint is violated, the entire field is ignored unless the definition says otherwise (§ 2.2).
- Keep fields extensible: do not make an unknown parameter an error, and for Dictionaries require unknown keys to be ignored (§ 2.3). A definition may require senders to add "grease" parameters so that recipients use full parsers (§ 2.3).
- A field defined against RFC 8941 may use only RFC 8941 types; it can never start carrying a Date or Display String, because RFC 8941 parsers will discard the field (§ 2.4).
- New fields are encouraged to use Strings rather than Tokens (§ 3.3.4).
- When using Display Strings, specify which Unicode code points are allowed, for example with a PRECIS profile (§ 2).

## Types (RFC 9651 § 3)

| Type           | Wire form                                        | Limits and rules                                                                                                             | Section |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------- |
| List           | `sugar, tea, rum`                                | Zero or more Items or Inner Lists; parsers support at least 1024 members                                                     | § 3.1   |
| Inner List     | `("foo" "bar");lvl=5`                            | Space-separated Items in parentheses; at least 256 members                                                                   | § 3.1.1 |
| Parameters     | `abc;a=1;b=2`                                    | Ordered map on an Item or Inner List; lowercase keys; at least 256 parameters with keys of at least 64 characters            | § 3.1.2 |
| Dictionary     | `rating=1.5, feelings=(joy sadness)`             | Ordered map of key to Item or Inner List; unknown keys ignored unless the definition forbids them; at least 1024 members     | § 3.2   |
| Integer        | `42`                                             | -999,999,999,999,999 to 999,999,999,999,999 (15 digits)                                                                      | § 3.3.1 |
| Decimal        | `4.5`                                            | At most 12 integer digits and 3 fractional digits; serialisers round extra precision                                         | § 3.3.2 |
| String         | `"hello world"`                                  | Printable ASCII (%x20 to %x7E) only; only `\"` and `\\` escapes, any other backslash fails parsing; at least 1024 characters | § 3.3.3 |
| Token          | `foo123/456`                                     | Starts with a letter or `*`; at least 512 characters                                                                         | § 3.3.4 |
| Byte Sequence  | `:cHJldGVuZCB0aGlzIGlzIGJpbmFyeSBjb250ZW50Lg==:` | base64 between colons; at least 16384 octets decoded                                                                         | § 3.3.5 |
| Boolean        | `?1`, `?0`                                       | True is written by omitting the value in Dictionaries and Parameters (`a` means `a=?1`)                                      | § 3.3.6 |
| Date           | `@1659578233`                                    | Integer seconds from 1970-01-01T00:00:00Z; years 1 to 9999. RFC 9651 only                                                    | § 3.3.7 |
| Display String | `%"This is intended for display to %c3%bcsers."` | Unicode text for end users, non-ASCII percent-encoded; NOT RECOMMENDED where a String or Token is adequate. RFC 9651 only    | § 3.3.8 |

- Parameters and Dictionaries with a Boolean true MUST omit the value when serialised: `Example-Integer: 1; a; b=?0` (§ 3.1.2, § 3.2).
- Integers beyond 15 digits need another encoding, such as a String, a Byte Sequence or a scaling parameter (§ 3.3.1).

## Parsing and serialising (RFC 9651 § 4)

- Parsers MUST combine all field lines with the same name in the same section into one comma-separated value before parsing (§ 4.2).
- List and Dictionary members may be split across field lines; a single member, and in particular a String, must not be (§ 3.1, § 3.2, § 4.2).
- Parsing is strict: leading and trailing spaces are discarded, but anything left over after the value fails parsing (§ 4.2).
- On parse failure, a recipient MUST either ignore the entire field or treat the whole message as malformed; RFC 8941 allowed only ignoring the field (§ 4.2, Appendix D). An intermediary that does not parse the field need not strip it.
- Generate values with the serialisation algorithms of § 4.1, which fail serialisation instead of producing an invalid value.
- Test parsers and serialisers against the community test suite referenced in Appendix B (`https://github.com/httpwg/structured-field-tests`).

## Security (RFC 9651 § 6)

- The size of most types is unlimited by the format; enforce field and header-section size limits.
- A party that can inject fields can change the meaning of a Structured Field, and parsing cannot always detect it.
- Display Strings can contain any code point, including control characters and NUL; filter or escape them before display.
