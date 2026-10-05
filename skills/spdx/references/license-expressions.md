# License expressions, the License List and source file tags

Read this when choosing a license identifier, writing or parsing a license expression, or adding `SPDX-License-Identifier` tags. Sources: the SPDX 3.0.1 Annex "SPDX license expressions", SPDX 2.3 Annex D and Annex E, and the SPDX License List 3.29.0, listed in [Sources](../SKILL.md#sources).

## Grammar (3.0.1 Annex SPDX license expressions)

ABNF per RFC 5234 with RFC 7405 case-sensitive strings (`%s`):

```text
idstring = 1*(ALPHA / DIGIT / "-" / "." )
license-id = <short form license identifier from SPDX License List>
license-exception-id = <short form license exception identifier from SPDX License List>
license-ref = [%s"DocumentRef-"(idstring)":"]%s"LicenseRef-"(idstring)
addition-ref = [%s"DocumentRef-"(idstring)":"]%s"AdditionRef-"(idstring)
simple-expression = license-id / license-id"+" / license-ref
addition-expression = license-exception-id / addition-ref
compound-expression = (simple-expression /
  simple-expression ( %s"WITH" / %s"with" ) addition-expression /
  compound-expression ( %s"AND" / %s"and" ) compound-expression /
  compound-expression ( %s"OR" / %s"or" ) compound-expression /
  "(" compound-expression ")" )
license-expression = (simple-expression / compound-expression)
```

Differences in SPDX 2.3 (Annex D.1): no `AdditionRef-`, and only uppercase `AND`, `OR` and `WITH`. The right side of `WITH` is a License List exception; if the exception is not listed, use one `LicenseRef-` for the whole license plus exception (Annex D.4.4).

## Rules

- No whitespace between a license id and `+`. Whitespace on both sides of `WITH`. Whitespace or parentheses on both sides of `AND` and `OR`.
- In tag:value (and in `SPDX-License-Identifier` tags), an expression is on one line with no line break inside it.
- Operators: all uppercase or all lowercase (`AND` or `and`, never `And`); match them case-sensitively.
- License and exception identifiers match case-insensitively (`MIT`, `Mit`, `mIt` are the same), but write the canonical case from the License List, because it forms the license URL and the RDF URI.
- In `LicenseRef-` and `AdditionRef-` ids, the prefix is case-sensitive and the part after it is not: `LicenseRef-Name` equals `LicenseRef-name`; `licenseref-name` is invalid.
- `DocumentRef-<id>:` qualifies a `LicenseRef-` or `AdditionRef-` defined in another SPDX document.

## Operators and precedence

| Operator | Meaning                                           | Example                                     |
| -------- | ------------------------------------------------- | ------------------------------------------- |
| `+`      | This version or any later version of the license. | `CDDL-1.0+`                                 |
| `WITH`   | A license with an exception or other addition.    | `GPL-2.0-or-later WITH Bison-exception-2.2` |
| `AND`    | Comply with all operands at once (conjunctive).   | `LGPL-2.1-only AND MIT`                     |
| `OR`     | A choice between operands (disjunctive).          | `LGPL-2.1-only OR MIT`                      |

- Precedence, tightest first: `+`, `WITH`, `AND`, `OR`. `LGPL-2.1-only OR BSD-3-Clause AND MIT` means `LGPL-2.1-only OR (BSD-3-Clause AND MIT)`.
- Use parentheses to change it: `MIT AND (LGPL-2.1-or-later OR BSD-3-Clause)`.
- `AND` and `OR` are commutative: `MIT OR LGPL-2.1-only` equals `LGPL-2.1-only OR MIT`.
- The left side of `WITH` is a simple expression (one identifier, optionally with `+`, or a `LicenseRef-`).

## The SPDX License List

- The list gives each license and exception a standardized short identifier, full name, text and canonical permanent URL (spdx.org/licenses). Version 3.29.0 was released 2026-09-16; machine-readable data is in `spdx/license-list-data` (tag `v3.29.0`).
- Exceptions are a separate list, used only after `WITH` (spdx.org/licenses/exceptions-index.html), for example `Classpath-exception-2.0`.
- Deprecated identifiers stay valid but should no longer be used. License List 3.0 replaced the bare GNU identifiers with explicit ones: write `GPL-2.0-only` or `GPL-2.0-or-later`, not `GPL-2.0` or `GPL-2.0+`; the same applies to the other GNU licenses. Licenses that embedded an exception were deprecated in favour of `WITH` (License List, Deprecated License Identifiers).
- Record the list version you validated against: `licenseListVersion` in 3.0 (SemVer, `3.29.0`) or `LicenseListVersion` in 2.3 (`3.29`).

## Custom licenses and additions

- A license not on the list gets `LicenseRef-<idstring>`, and its text must be provided. In 3.0 the text is a `simplelicensing_SimpleLicensingText` (or an ExpandedLicensing `CustomLicense`) with its own URI, and the LicenseExpression's `customIdToUri` maps the string in the expression to that URI (`SimpleLicensing/Properties/customIdToUri`). In 2.3 it is `LicenseID` plus `ExtractedText` (§ 10.1, § 10.2).
- An exception or other addition not on the list gets `AdditionRef-<idstring>` in 3.0 only, mapped the same way to a `CustomLicenseAddition` or `SimpleLicensingText`.

## SPDX-License-Identifier tags in source files

From SPDX 2.3 Annex E (informative; moved to `spdx/using` in 3.0.1):

- Put `SPDX-License-Identifier: <SPDX License Expression>` on its own line, in a comment, at or near the top of the file (E.2).
- Single license: `SPDX-License-Identifier: MIT` or `SPDX-License-Identifier: CDDL-1.0+` (E.3).
- Several licenses: `SPDX-License-Identifier: GPL-2.0-only OR MIT`, `SPDX-License-Identifier: LGPL-2.1-only AND BSD-2-Clause`, `SPDX-License-Identifier: GPL-2.0-or-later WITH Bison-exception-2.2`. The expression must be on one line (E.4).
- Unlisted license: `SPDX-License-Identifier: LicenseRef-my-special-license`, and give a way to find its text; the REUSE specification is one standard way (E.4).
- Keep the full license text in the project's LICENSE file and say that SPDX identifiers refer to it (E.1).

Example in a C file:

```c
// SPDX-License-Identifier: Apache-2.0 OR MIT
```

## Common mistakes

- `GPL-2.0` or `LGPL-2.1+` style deprecated ids in new work.
- `Apache 2.0`, `MIT License` or other names in place of identifiers.
- `GPL-2.0-only WITH Classpath-exception-2.0 OR MIT` written without checking precedence (it means `(GPL-2.0-only WITH Classpath-exception-2.0) OR MIT`).
- Mixed-case operators such as `And`, or a line break inside an expression.
- A `LicenseRef-` with no text anywhere, or an exception id used on its own without `WITH`.
- `AdditionRef-` or lowercase operators in an SPDX 2.3 document.
