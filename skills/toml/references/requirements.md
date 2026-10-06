# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## TOML 1.1.0

Source: https://toml.io/en/v1.1.0

{ name = "Baz Qux", email = "bazqux@example.com", url = "https://example.com/bazqux" }

- **TOML v1.1.0.** TOML should be easy to parse into data structures in a wide variety of languages.
- **TOML v1.1.0.** A TOML file must be a valid UTF-8 encoded Unicode document.
- **TOML v1.1.0.** Specifically this means that a file as a whole must form a well-formed code-unit sequence .
- **TOML v1.1.0.** Otherwise, it must be rejected (preferably) or have ill-formed byte sequences replaced with U+FFFD, as per the Unicode specification.
- **TOML v1.1.0.** Comments should be used to communicate between the human readers of a file.
- **TOML v1.1.0.** Parsers must not modify keys or values, based on the presence (or contents) of a comment.
- **TOML v1.1.0.** The key, equals sign, and value must be on the same line (though some values can be broken over multiple lines).
- **TOML v1.1.0.** key = "value" Values must have one of the following types.

## TOML 1.0.0

Source: https://toml.io/en/v1.0.0

{ name = "Baz Qux", email = "bazqux@example.com", url = "https://example.com/bazqux" }

- **TOML v1.0.0.** TOML should be easy to parse into data structures in a wide variety of languages.
- **TOML v1.0.0.** A TOML file must be a valid UTF-8 encoded Unicode document.
- **TOML v1.0.0.** The key, equals sign, and value must be on the same line (though some values can be broken over multiple lines).
- **TOML v1.0.0.** key = "value" Values must have one of the following types.
- **TOML v1.0.0.** key = # INVALID There must be a newline (or EOF) after a key/value pair.
- **TOML v1.0.0.** "127.0.0.1" = "value" "character encoding" = "value" "ʎǝʞ" = "value" 'key2' = "value" 'quoted "value"' = "value" A bare key must be non-empty, but an empty quoted key is allowed (though discouraged).
- **TOML v1.0.0.** All strings must contain only valid UTF-8 characters.
- **TOML v1.0.0.** Any Unicode character may be used except those that must be escaped: quotation mark, backslash, and the control characters other than tab (U+0000 to U+0008, U+000A to U+001F, U+007F).
