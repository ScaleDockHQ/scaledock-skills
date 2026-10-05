# Versions and upgrades

Read this when choosing a target version, reading purls written for an older text, upgrading stored purls, or deciding what to do with the ECMA-427 2nd Edition draft. Sources: the ECMA-427 1st Edition text (tag v1.0), the 2nd Edition draft and its release notes, the purl-spec and vers-spec releases, and the pre-ECMA `PURL-SPECIFICATION.rst`, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line                 | Status  | Revision                                                       | Posture | Summary                                                                                                        |
| -------------------- | -------------------- | ------- | -------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `ecma-427-2-preview` | ECMA-427 2nd Edition | preview | draft dated 2026-12-08; Ecma-TC54 main at 33b680c (2026-09-30) | track   | Minor update: registered-type rules (§ 5.7), schema 1.1, Annex B qualifiers, Annex C ABNF, `pkg://` to should. |
| `ecma-427-1`         | ECMA-427 1st Edition | current | 1st edition, December 2025 (tag v1.0); purl-spec v1.0.1        |         | The standard. Type definitions on schema 1.0 and the test suite live in purl-spec.                             |
| `pre-ecma`           | purl-spec pre-ECMA   | legacy  | `PURL-SPECIFICATION.rst` "v1.0.X" at 4f7d28e (2024-11-21)      |         | The community README-era text most libraries first implemented. Looser encoding rules.                         |
| `vers-1`             | VERS 1.2             | current | vers-spec v1.2.0 (2026-09-09)                                  | build   | Family `vers`: version range specifier, submitted to TC54 as the VERS 1st Edition draft.                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

ECMA-427 numbers editions; purl-spec numbers repository releases with SemVer. purl-spec v1.0.0 (2025-12-19) was cut "in alignment with the publication of ECMA-427 Standard 1st Edition / December 2025", and v1.0.1 (2026-08-03) added seven types (`brew`, `chrome-extension`, `opam`, `otp`, `vcpkg`, `vscode-extension`, `yocto`), the `git` type, made the `cpan` namespace optional, and is "the reference release tag for the current test suite based on `purl-test.schema-0.1.json`" (v1.0.1 release notes). The `tests/` folder on main has since moved to `purl-test.schema-0.2.json`. Both releases carry the 1st Edition text; neither is a separate line.

VERS is a separate specification from the same publisher with its own releases (v1.0.0 on 2026-08-04 to v1.2.0 on 2026-09-09), so it is its own family. ECMA-427 says it "does not cover ecosystem-specific types or extensions such as PURL Version Ranges (VERS)" (§ 4). VERS used to live in purl-spec as `VERSION-RANGE-SPEC.rst`; that file is now a pointer to the vers-spec repository.

## Which version to use

- Build and validate purls to ECMA-427 1st Edition, with the type definitions and tests from purl-spec v1.0.1 or later.
- Read pre-ECMA purls with a lenient parser and re-emit them in 1st Edition canonical form (see Upgrading).
- Follow the 2nd Edition draft only to see what is coming. Its posture is **track**: do not make conformance depend on schema 1.1 fields or on rules only the draft states. Where the draft relaxes a rule (`pkg://` acceptance from shall to should), keep the 1st Edition behaviour.
- Write version ranges as VERS 1.2. Its posture is **build**: the text is released by the project and submitted for Ecma approval in December 2026.

## What changed

### ECMA-427 2nd Edition (draft)

From the 2nd Edition release notes and a comparison of the v1.0 and main `spec.html`:

- § 3 adds RFC 3629 (UTF-8) and RFC 5234 (ABNF) as normative references.
- § 5.1: a default repository location "may be defined" for a type (was: each type has one), and a PURL "should be a locator" through a type's default repository, a `repository_url` or `download_url` qualifier, or an ecosystem mechanism.
- § 5.6.1: parsers "should" (was "shall") accept and remove slashes after `pkg:`.
- "Canonical" wording goes: § 5.2 says "A valid PURL is composed of" (was "A canonical PURL"), § 5.6.2 "The form is lowercase", and slashes "should be stripped" without "in the canonical form".
- Type definitions may only narrow components: "unless the package's type definition further restricts the allowed characters" (was "provides otherwise").
- § 5.6.7: subpath "may contain one or more segments" (was "zero or more").
- New § 5.7: a registered type's rules are mandatory; an unregistered but well-formed type is valid with a warning. Registered types live at packageurl.org/purl-types.
- Clause 6 moves to `purl-type-definition.schema-1.1.json`: namespace `registered_values` (warn on unregistered values) and a `recommended` qualifier requirement (warn when missing).
- New informative Annex B (recommended qualifiers) and Annex C (ABNF grammar).

### ECMA-427 1st Edition

Compared with the pre-ECMA text:

- Type: `+` is no longer allowed; a type "shall start with an ASCII letter" (was "cannot start with a number") (§ 5.6.2).
- Character encoding is defined precisely: UTF-8 then RFC 3986 § 2.1 percent-encoding with an "allowed set" of alphanumerics and `.-_~`; those and `:` are never encoded, everything else is (§ 5.4). The old text only required encoding `@`, `?`, `#` and non-ASCII "elsewhere", said `/` "must NOT be percent-encoded … everywhere", and called other encoding "OK".
- Qualifier keys "shall be composed only of lowercase" characters and start with a letter (was case-insensitive with lowercase canonical form, "cannot start with a number") (§ 5.6.6).
- Namespace, name and version may contain any Unicode character after decoding unless the type says otherwise (§ 5.6.3 to § 5.6.5); case folding is the Unicode culture-invariant full case mapping (§ 5.5).
- Type definitions become JSON documents validated by the Clause 6 schema (Annex A), replacing the prose `PURL-TYPES.rst`.
- The parse and build algorithms and the qualifier list move out of the standard into purl-spec documentation; `vers` joins the common qualifiers.
- The test suite moves from `test-suite-data.json` (`purl`, `canonical`, `is_invalid`) to per-type files with `test_group` (`required`, `recommended`) and `test_type` (`build`, `parse`, `validate`).

## Upgrading

### pre-ECMA to ECMA-427 1st Edition

1. Change the version marker: nothing in a purl string names its version, so record in your tool or SBOM metadata that purls now follow ECMA-427 1st Edition and purl-spec v1.0.1 types.
2. Replace removed or renamed behaviour:
   - Strip slashes after `pkg:` and lowercase the scheme and type; reject types containing `+` or starting with a non-letter.
   - Decode every component, then re-encode it with the § 5.4 rules: `/` inside qualifier values becomes `%2F` (`repository_url=https:%2F%2Frepo.spring.io%2Frelease`), `+` becomes `%2B`, a space becomes `%20`, and `%3A` becomes `:`.
   - Lowercase qualifier keys, drop empty values, and sort by key.
   - Rename `checksums` to `checksum` (the FAQ says to accept both and always emit the singular) and encode the comma between checksums as `%2C`.
   - Re-apply the current type definitions: for example `cpan` namespace is now optional and new types such as `git`, `brew` or `vscode-extension` may replace `generic` purls.
3. Validate against the target: parse and rebuild every purl and compare with the input; run the `required` cases of the purl-spec `tests/`.
4. Keep behaviour unchanged: an upgraded purl must decode to the same components. Store the old string alongside if other systems still key on it.

## Preview: ECMA-427 2nd Edition

The 2nd Edition is a draft in `Ecma-TC54/ECMA-427` main with `status: draft` and `date: 2026-12-08`; the purl-spec `docs/specification/standard/` files are its working copy. Posture: **track**. Do not emit or require schema 1.1 `registered_values` or `recommended` qualifier requirements, and do not drop 1st Edition behaviour the draft relaxes. Annex B and Annex C are informative and describe rules that already follow from Clause 5, so they are safe to use as explanations. Watch the Ecma ECMA-427 page and the `v1.0` tag series of `Ecma-TC54/ECMA-427`. When it ships: make it current, make ECMA-427 1st Edition supported, update the type definitions to schema 1.1, and add an upgrade section.
