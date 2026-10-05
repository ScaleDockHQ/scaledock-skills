# purl

An agent skill for Package URL (purl), standardized as ECMA-427: building, parsing, validating and normalizing `pkg:` identifiers, the registered PURL types, and VERS version ranges.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill purl
```

Then ask your agent to "generate canonical purls for our SBOM components" or "review our purl parser against ECMA-427".

## What it covers

- The seven components, permitted characters, percent-encoding and case rules of ECMA-427.
- The parse and build algorithms, lenient parsing, equivalence, and the purl-spec test suite.
- The type definition schema and the registered types (npm, pypi, maven, golang, cargo, nuget, gem, docker, oci, github, git, deb, rpm, generic and more) with their normalizations.
- The recommended qualifiers: `repository_url`, `download_url`, `vcs_url`, `file_name`, `checksum` and `vers`.
- VERS version ranges: syntax, validation and containment checks.
- Upgrading purls written to the pre-ECMA purl-spec text.

## Versions

| Line                 | Status                    |
| -------------------- | ------------------------- |
| ECMA-427 2nd Edition | preview (track)           |
| ECMA-427 1st Edition | current (purl-spec 1.0.1) |
| purl-spec pre-ECMA   | legacy (upgrade from)     |
| VERS 1.2             | current (VERS family)     |

`references/versions.md` says which line to use, what changed, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ECMA-427](https://ecma-international.org/publications-and-standards/standards/ecma-427/): Ecma Standard, 1st edition, December 2025, with its [source text](https://github.com/Ecma-TC54/ECMA-427/blob/v1.0/spec.html) at tag v1.0.
- [ECMA-427 2nd Edition draft](https://github.com/Ecma-TC54/ECMA-427/blob/main/spec.html): draft, main at 33b680c.
- [purl-spec v1.0.1](https://github.com/package-url/purl-spec/releases/tag/v1.0.1) and the purl-spec documentation, [types](https://github.com/package-url/purl-spec/tree/main/types) and [tests](https://github.com/package-url/purl-spec/blob/main/docs/tests/test-suite.md) at main 7cd2d34.
- [Pre-ECMA purl specification](https://github.com/package-url/purl-spec/blob/4f7d28e1d1343a38bc8d7537ac60d390ae64a772/PURL-SPECIFICATION.rst): superseded, commit 4f7d28e.
- [vers-spec v1.2.0](https://github.com/package-url/vers-spec/releases/tag/v1.2.0): Released.

## License

MIT
