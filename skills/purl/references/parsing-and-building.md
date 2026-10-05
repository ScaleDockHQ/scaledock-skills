# Parsing, building and testing

Read this when implementing or reviewing a purl parser, builder or validator. The algorithms come from the purl-spec "How to parse a PURL" and "How to build a PURL" documents, which support ECMA-427 but are not part of it; the lenient grammar and the test suite come from purl-spec too. Sources in [Sources](../SKILL.md#sources).

## Parse a purl string (right to left)

Type-specific normalization is applied where noted.

1. **Subpath.** Split once from the right on `#`. The left side is the remainder. Split the right side on `/`, percent-decode and UTF-8-decode each segment, discard empty, `.` and `..` segments, and report an error if a decoded segment contains `/`. The segment list is the subpath.
2. **Qualifiers.** Split the remainder once from the right on `?`. Split the right side on `&`; split each pair once from the left on `=`. The key is the lowercased left side; the value is the percent-decoded and UTF-8-decoded right side. Discard pairs with an empty value. If the key is `checksum`, split the value on `,` into a list.
3. **Scheme.** Split the remainder once from the left on `:`. The left side, lowercased, is the scheme; it must be `pkg`.
4. **Type.** Strip all leading `/` from the remainder, split once from the left on `/`; the left side, lowercased, is the type.
5. **Version.** Split the remainder once from the right on `@`. The right side, percent-decoded and UTF-8-decoded, is the version.
6. **Name.** Strip all trailing `/`, split once from the right on `/`. The right side, decoded and type-normalized, is the name.
7. **Namespace.** Split the rest on `/`, discard empty segments, decode and type-normalize each, and join them with `/`.

Then validate: the scheme is `pkg`, the type and keys follow § 5.6.2 and § 5.6.6, keys are unique, the name is present, and the registered type's definition is satisfied (required or prohibited namespace, `permitted_characters`, required qualifiers).

## Build a purl string (left to right)

1. Start with `pkg:` and the type as unencoded lowercase ASCII, then `/`.
2. If the namespace is not empty: strip leading and trailing `/`, split on `/`, type-normalize, UTF-8-encode and percent-encode each segment, join with `/`, append it and a `/`.
3. Strip leading and trailing `/` from the name, type-normalize, UTF-8-encode, percent-encode, and append.
4. If the version is not empty: append `@` and the percent-encoded version.
5. If any qualifier has a non-empty value: append `?`. For each pair, discard empty values, join a `checksum` list with `,`, and form `lowercased-key=percent-encoded-value`. Sort the pairs lexicographically and join them with `&`.
6. If the subpath has any segment that is not empty, `.` or `..`: append `#`, split it with your environment's path delimiter, discard empty, `.` and `..` segments, percent-encode each, and join with `/`.

The 2nd Edition draft Annex B says builders should sort qualifiers by key, and that parsers and validators are not expected to enforce the order.

## Lenient input

purl-spec's lenient grammar describes what a parser should try to accept: slashes after `pkg:`, uppercase types, unencoded characters, empty components or qualifiers, keys without values, duplicate keys. It is "not a second conformance class": a string matching it is not thereby valid. Parsers normalize such input with the parse rules and reject it only when no meaningful interpretation exists; emitters "shall never produce lenient PURL strings". Decoding happens in two steps per component, percent-decoding then UTF-8 decoding; a component whose decoded octets are not valid UTF-8 has no valid interpretation.

The FAQ adds: a scheme separator that is not a literal `:` straight after `pkg` is a parse error (tools may recover); a type containing `/`, `:` or another prohibited character is an error; read `checksum` or `checksums` but always write `checksum`.

## Equivalence

ECMA-427 Clause 2 requires that equivalent purls resolve to the same canonical representation. Compare purls by parsing both, applying the core and type normalizations, and comparing the components (or the rebuilt canonical strings), never by comparing raw strings. The version is opaque to the core spec (§ 5.6.5); when you need version ordering or equivalence, use the type's comparison rules through VERS.

## Test suite

- `tests/spec/specification-test.json` holds core cases; `tests/types/<type>-test.json` holds one file per registered type. Files follow `purl-test.schema-0.2.json` on main (v1.0.1 is the reference tag for schema 0.1).
- Each case has `description`, `test_group` (`required` or `recommended`), `test_type` (`build`, `parse` or `validate`), `input` (a string or a component object, not necessarily canonical), `expected_output` (a canonical string or decoded components, `null` on failure), `expected_failure` and `expected_message`.
- `required` matches "shall" in ECMA-427 plus the registered type definitions; `recommended` matches "should" and covers normalization of non-canonical input. A `required` case with non-canonical input must fail unless ECMA-427 has a normalization exception.
- Tools should return different error types for a syntactically invalid purl and for one that fails type-specific validation.

Example cases (pypi, maven and specification tests):

| Test                  | Input                                                                 | Expected                                                                  |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| validate, recommended | `pkg:PYPI/Django_package@1.11.1.dev1`                                 | `pkg:pypi/django-package@1.11.1.dev1`                                     |
| validate, recommended | `pkg://maven/org.apache.commons/io`                                   | `pkg:maven/org.apache.commons/io`                                         |
| validate, required    | `pkg:maven/groovy/groovy@1.0?repository_url=https://maven.google.com` | `pkg:maven/groovy/groovy@1.0?repository_url=https:%2F%2Fmaven.google.com` |
| build, required       | generic `openssl@1.1.10g`, `checksum` `sha1:ad95…,sha256:41bf…`       | `pkg:generic/openssl@1.1.10g?checksum=sha1:ad95…%2Csha256:41bf…`          |
| parse, required       | `pkg:npm/myartifact@1.0.0?in%20production=true`                       | failure: invalid qualifier key                                            |
