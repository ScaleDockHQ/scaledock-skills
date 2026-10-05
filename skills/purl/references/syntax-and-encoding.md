# Syntax, encoding and component rules

Read this when building or validating a purl string, or when reviewing encoding bugs. Section numbers are ECMA-427 1st Edition (tag v1.0) unless marked "2nd Edition draft". Sources in [Sources](../SKILL.md#sources).

## Components (§ 5, § 5.1)

```text
pkg:type/namespace/name@version?qualifiers#subpath
```

| Component  | Required | URL part | Notes                                                                          |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------ |
| scheme     | yes      | scheme   | Constant `pkg`.                                                                |
| type       | yes      | path     | Package type or protocol: `maven`, `npm`, `pypi`, …                            |
| namespace  | no       | path     | Name prefix such as a Maven groupId, npm scope or GitHub owner. Type-specific. |
| name       | yes      | path     | Package name.                                                                  |
| version    | no       | path     | Opaque version string.                                                         |
| qualifiers | no       | query    | `key=value` pairs such as arch, OS or repository. Type-specific.               |
| subpath    | no       | fragment | Path inside the package, relative to its root.                                 |

- Components run from most significant on the left to least significant on the right.
- A PURL is a valid URL and URI. It has no authority: no username, password, host or port. A namespace may look like a host; its meaning is type-specific.
- `http`, `https`, `file`, `ftp` and VCS schemes such as `git` or `svn` are not PURL types. Such URLs may appear in qualifiers (`repository_url`, `download_url`, `vcs_url`) or in attributes outside the purl.

## Characters (§ 5.2, § 5.3)

- Alphanumeric: `A-Z`, `a-z`, `0-9`.
- Punctuation: `.` `-` `_` `~`.
- Percent: `%`.
- Separators: `:` (scheme/type), `/` (type/namespace/name and between subpath segments), `@` (name/version), `?` (before qualifiers), `=` (key/value), `&` (between qualifiers), `#` (before subpath).

A canonical purl uses only these ASCII characters (§ 5.2; the 2nd Edition draft says "valid" instead of "canonical").

## Percent-encoding (§ 5.4)

- Each component says whether it is encoded. When it is, the string is first encoded as UTF-8, then each data octet outside the "allowed set" is replaced by a `%XX` triplet using the RFC 3986 § 2.1 mechanism.
- The allowed set is the alphanumerics plus `.-_~`; the delimiters are the separator characters.
- Never percent-encode: alphanumerics, punctuation, separators used as separators, the colon `:` anywhere, or `%` when it starts a triplet.
- A permitted space is `%20` (never `+`).
- Apart from the encoding mechanism, the standard alone defines the encoding rules, not a URL library's defaults.

Consequences shown by the test suite:

- `/` inside a qualifier value is `%2F`: `repository_url=https:%2F%2Frepo.spring.io%2Frelease` (maven tests).
- `:` stays literal everywhere: `pkg:docker/customer/dockerimage@sha256:244fd47e07d10`. Inputs with `sha256%3A…` are accepted by parsers and re-emitted with `:` (docker and oci tests). Some type-definition examples still show `%3A`; the § 5.4 rule wins.
- `@` in an npm scope is `%40`: `pkg:npm/%40angular/animation@12.3.1`; a parser given `@babel` unencoded recovers it only as a `recommended` (lenient) case (npm tests).
- `,` between checksums is `%2C` (specification tests, Annex B draft).
- `+` is always encoded as `%2B` in a canonical purl; decoded components may contain `+` (FAQ, Plus character).
- The test outputs use uppercase hexadecimal in triplets (`%2F`, `%40`, `%2C`, `%20`).

## Case folding (§ 5.5)

"Lowercase" means the culture-invariant full case mapping of Unicode § 3.13.2; for ASCII it maps `A-Z` to `a-z` and changes nothing else.

## Rules per component (§ 5.6)

Unless a rule says otherwise, every component may use the permitted characters and is encoded per § 5.4.

**Scheme (§ 5.6.1)**

- Constant `pkg`, followed by an unencoded `:`. `pkg%3Amaven/…` fails to parse (specification tests).
- Parsers shall accept one or more `/` after `pkg:` (`pkg://`, `pkg:///`) and remove them; the 2nd Edition draft lowers this to should. The FAQ explains why builders never emit `pkg://`: a URI without an authority cannot have a path starting with `//` (RFC 3986 § 3.3).

**Type (§ 5.6.2)**

- Only ASCII letters, digits, `.` and `-`; starts with a letter; never percent-encoded; case-insensitive with lowercase as the canonical form.
- `pkg:3nginx/…`, `pkg:nginx:a/…` and `pkg:n&g?inx/…` are invalid; a missing type (`pkg:EnterpriseLibrary.Common@6.0.1304`) is invalid (specification tests).

**Namespace (§ 5.6.3)**

- Optional unless the type requires it. One or more segments separated by a single unencoded `/`.
- Leading and trailing slashes are not significant and should be stripped.
- Each segment is percent-encoded; decoded, it is non-empty, has no `/`, and may hold any Unicode character other than `/` unless the type restricts it.
- A URL host or authority shall not be used as a namespace; use `repository_url`. Some types' namespaces look like hosts (`golang`, `swift`, `git`).

**Name (§ 5.6.4)**

- Prefixed by one `/` when the namespace is not empty. Leading and trailing slashes are not significant and should be stripped.
- Percent-encoded; decoded, any Unicode character unless the type restricts it. Required: `pkg:maven/@1.3.4` fails.

**Version (§ 5.6.5)**

- Prefixed by `@` when not empty; the `@` is not part of it. Percent-encoded; decoded, any Unicode character unless the type restricts it.
- A plain, opaque string. A type may define comparison, but there is no uniform way to compare versions (FAQ, Version); use VERS for ranges.

**Qualifiers (§ 5.6.6)**

- Prefixed by an unencoded `?` when not empty; one or more `key=value` pairs joined by unencoded `&`, key and value joined by unencoded `=`.
- An empty value is the same as no pair for that key.
- Keys: only lowercase ASCII letters, digits, `.`, `-`, `_`; start with a letter; never encoded; unique. `in%20production=true` fails (specification tests).
- Values: any Unicode character, encoded per § 5.4.

**Subpath (§ 5.6.7)**

- Prefixed by `#` when not empty. Segments separated by a single unencoded `/`; leading and trailing slashes are not significant and should be stripped.
- Each segment is percent-encoded; decoded, it is non-empty, has no `/`, and is not `.` or `..`.
- Interpreted relative to the package root, for example a Go package inside a module: `pkg:golang/google.golang.org/genproto#googleapis/api/annotations`.

## ABNF (2nd Edition draft, Annex C, informative)

```abnf
PURL = scheme ":" type
       [ "/" namespace ] "/" name
       [ "@" version ] [ "?" qualifiers ] [ "#" subpath ]
scheme = %x70.6B.67 ; "pkg", lowercase only
type = alpha-lc *( alpha-lc / DIGIT / "." / "-" )
qualifier-key = alpha-lc *( alpha-lc / DIGIT / "." / "-" / "_" )
unreserved = ALPHA / DIGIT / "." / "-" / "_" / "~" / ":"
```

Namespace and subpath segments may not contain `%2F`; the grammar excludes encodings of unreserved characters (`%41` for `A`, `%3A` for `:`, …), so a canonical purl never encodes a character that does not need it. Conformance to the grammar is necessary but not sufficient: keys must be unique, decoded octets must be valid UTF-8, and types may restrict further. The full grammar is in Annex C; it describes rules that already follow from § 5.4 and § 5.6.

## Common mistakes

- Running the whole purl through a URL encoder or decoder. Encode and decode each component separately, after splitting on separators.
- Encoding `:` (`sha256%3A…`) or leaving `/` raw inside a qualifier value.
- Emitting `pkg://`, uppercase types (`pkg:Maven/…`) or mixed-case keys (`repositorY_url`); these are accepted only by lenient parsers.
- Putting a registry host in the namespace instead of `repository_url`.
- Encoding a space as `+`, which decodes back as a literal `+`.
- Treating the version as SemVer for every type.
