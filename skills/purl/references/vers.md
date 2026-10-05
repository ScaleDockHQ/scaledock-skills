# VERS version ranges

Read this when expressing a range of package versions, for example the versions affected by a vulnerability or allowed by a dependency. Sources: vers-spec v1.2.0 Clause 5, "How to parse and validate VERS" and "VERS types", listed in [Sources](../SKILL.md#sources). VERS is versioned separately from ECMA-427; see [`versions.md`](versions.md).

## Syntax (§ 5, § 5.2)

```text
vers:<type>/<constraint>|<constraint>|…
vers:npm/1.2.3|>=2.0.0|<5.0.0
vers:gem/>=2.2.0|!=2.2.1|<2.3.0
vers:deb/*
```

- `:` separates scheme and type, `/` separates type and constraints, `|` separates constraints.
- A VERS is a valid URI (RFC 3986) (§ 5.1).

## Components (§ 5.3)

**Scheme.** Constant `vers`, followed by an unencoded `:`.

**Type.** ASCII letters, digits, `.` and `-`; starts with a letter; never percent-encoded; lowercase; followed by `/`. A type defines the range notation, how native ranges convert to VERS, and how versions compare. By convention it equals the PURL type; general types such as `semver` are allowed. A registered type's rules are mandatory; an unregistered but well-formed type is valid with a warning.

**Constraints.** One or more, separated by unencoded `|` with no other meaning: the sequence describes intervals on the package's version timeline, not "and" or "or". No limit on their number.

**Comparators (§ 5.3.3.1).** A comparator immediately precedes its version.

| Comparator | Meaning                                                                               |
| ---------- | ------------------------------------------------------------------------------------- |
| none       | Equal to the version. A constraint starting with `=` is an error.                     |
| `!=`       | Excludes the version.                                                                 |
| `<`, `<=`  | Less than, less than or equal.                                                        |
| `>`, `>=`  | Greater than, greater than or equal.                                                  |
| `*`        | Any version, past, current or future. Alone, with no version and no other constraint. |

**Version (§ 5.3.3.2).** Printable ASCII. Percent-encode `>`, `<`, `=`, `!`, `*`, `|` and `%` inside a version; a literal `%` is `%25`. The only whitespace allowed is an encoded space `%20`; a literal space, tab or line feed is an error, as is an invalid triplet. Equality uses the type's normalization (plain string equality for most types; PEP 440 for `pypi`).

## Validation (§ 5.4)

- Constraints are sorted by version using the type's ordering; wrong order is an error.
- Each version appears once, whatever its comparator; duplicates are an error.
- `*` appears at most once and alone.
- On the sorted list, ignoring `!=`: an equality constraint is followed only by equality, `>` or `>=`; ignoring `!=` and equality, `<`/`<=` and `>`/`>=` alternate. Any other sequence is an error.
- Tools shall not correct or normalize invalid input while parsing (how-to-parse).

## Parsing (how-to-parse)

1. Reject literal whitespace. Split once on `:`; the scheme must be `vers`.
2. Split once on `/`; the left side is the lowercase type (warn if unregistered), the right side the constraints, which must not be empty.
3. If the constraints are exactly `*`, stop. Reject leading, trailing or consecutive `|`.
4. Split on `|`. For each constraint, match the comparator in the order `>=`, `<=`, `!=`, `<`, `>`, else none; reject a leading `=`; reject an empty version; percent-decode the version exactly once.
5. Sort and validate the list with the § 5.4 rules.

## Containment (how-to-parse)

To test whether a version is in a range, using the type's comparison throughout:

1. A lone `*`: in range.
2. Equal to a version whose comparator is none, `<=` or `>=`: in range. Equal to a `!=` version: not in range.
3. Take the constraints whose comparator is `<`, `<=`, `>` or `>=`, and walk them pairwise:
   - first constraint `<`/`<=` and the version is below it: in range;
   - last constraint `>`/`>=` and the version is above it: in range;
   - current `>`/`>=`, next `<`/`<=`, and the version lies between: in range;
   - current `<`/`<=`, next `>`/`>=`: a gap, continue.
4. Otherwise: not in range.

Comparing versions across VERS types is an error.

## Types (VERS types)

- Registered as JSON in vers-spec `types/` at v1.2.0: `npm` and `pypi`.
- Ecosystem types reuse the PURL type name (`deb`, `rpm`, `maven`, `nuget`, `gem`, `golang`, `cargo`, …). Native range notations convert to VERS; for Debian, `<<` becomes `<` and `>>` becomes `>`.
- General types for special cases: `all` (only `vers:all/*`), `none` (only `vers:none/*`), `semver` (SemVer 2.0.0), `intdot` (dot-separated non-negative integers), `lexicographic` (byte-wise UTF-8 comparison), `datetime` (RFC 3339 timestamps, uppercase `T` and `Z`, `:` not encoded), and `generic` (comparison not yet specified).

## VERS inside a purl

The `vers` qualifier carries a range instead of a single version and is mutually exclusive with the version component. Its value is percent-encoded like any qualifier value: `pkg:pypi/django?vers=vers:pypi%2F%3E%3D1.11.0%7C%21%3D1.11.1%7C%3C2.0.0` (qualifiers guidance; 2nd Edition draft Annex B.3.6).
