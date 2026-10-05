# osv

An agent skill for the OSV (Open Source Vulnerability) schema 1.9: writing, validating, publishing and consuming OSV vulnerability records, and upgrading older ones.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill osv
```

Then ask your agent to "export our advisories as OSV 1.9 records", "check whether this package version is affected by these OSV records" or "review this OSV record's ranges".

## What it covers

- Every record field: `schema_version`, `id`, `modified`, `published`, `withdrawn`, `aliases`, `upstream`, `related`, `summary`, `details`, `severity` (CVSS v2, v3, v4 and Ubuntu, with `source`), `references`, `credits` and the `*_specific` objects.
- `affected` packages with `ecosystem`, `name`, `purl` and the wildcard name, `versions`, and `SEMVER`, `ECOSYSTEM` and `GIT` ranges with `introduced`, `fixed`, `last_affected` and `limit` events.
- The `IsVulnerable` evaluation algorithm and worked range examples.
- The defined ecosystems with their naming and suffix rules, and the database id prefixes.
- JSON Schema validation, publishing as a home database, contributing to OSV.dev, and consuming through the OSV.dev API and data dumps.

## Versions

| Line                         | Status                |
| ---------------------------- | --------------------- |
| OSV schema main (unreleased) | preview (track)       |
| OSV schema 1.9               | current               |
| OSV schema 1.7 to 1.8        | legacy (upgrade from) |
| OSV schema 1.2 to 1.6        | legacy (upgrade from) |
| OSV schema 1.0               | legacy (upgrade from) |

`references/versions.md` says which line to use, what each release changed, and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OSV schema specification](https://ossf.github.io/osv-schema/): Released (stable), version 1.9.1.
- [`docs/schema.md`](https://github.com/ossf/osv-schema/blob/v1.9.1/docs/schema.md), [`validation/schema.json`](https://github.com/ossf/osv-schema/blob/v1.9.1/validation/schema.json) and the [CHANGELOG](https://github.com/ossf/osv-schema/blob/v1.9.1/CHANGELOG.md) at tag v1.9.1.
- [`docs/schema.md` on main](https://github.com/ossf/osv-schema/blob/main/docs/schema.md): unreleased, at 2780d2a.
- Earlier `docs/schema.md` tags (1.0.0, 1.1.0, 1.2.0, v1.6.7, v1.7.0, v1.8.0, v1.9.0) for the legacy lines.
- [OSV.dev documentation](https://google.github.io/osv.dev/api/): API 1.0, data dumps, new data sources, and the record quality bar.

## License

MIT
