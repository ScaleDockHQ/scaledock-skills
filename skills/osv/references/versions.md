# Versions and upgrades

Read this when choosing a target version, reading a record written for an older schema version, upgrading records, or deciding whether to follow unreleased text on `main`. Sources: `docs/schema.md` and `validation/schema.json` at each release tag, `CHANGELOG.md`, `RELEASING.md` and the GitHub releases of `ossf/osv-schema`, listed in [Sources](../SKILL.md#sources).

## Version lines

The OSV schema has had one major version, 1, since 2021-09-08 (CHANGELOG). Minor and patch releases only add fields and values: a client that reads 1.2.0 can read 1.3.0 data by ignoring unexpected fields (§ schema_version field). `RELEASING.md` says new ecosystems get a patch bump and non-breaking field changes a minor bump. The lines below group the 1.x releases at the points where the model changed in a way that matters to producers or consumers.

| Id             | Line                         | Status  | Revision                                 | Posture | Summary                                                                                                 |
| -------------- | ---------------------------- | ------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `main-preview` | OSV schema main (unreleased) | preview | `main` at 2780d2a (2026-10-01)           | track   | Documents an `id` character set and semantically neutral ids; `validation/schema.json` is unchanged.    |
| `1.9`          | OSV schema 1.9               | current | 1.9.1 (2026-09-24); 1.9.0 (2026-08-06)   |         | Wildcard package name `*`, CVE-derived id guidance, separate Git and strict-ecosystem entries.          |
| `1.7-1.8`      | OSV schema 1.7 to 1.8        | legacy  | 1.7.0 (2025-03-05) to 1.8.0 (2026-07-09) |         | `upstream` field and `Ubuntu` severity (1.7.0); `severity[].source` and the `x_` local prefix (1.8.0).  |
| `1.2-1.6`      | OSV schema 1.2 to 1.6        | legacy  | 1.2.0 (2022-01-19) to 1.6.7 (2024-09-16) |         | `schema_version`, `severity`, `credits`, `last_affected`; upstream ids still go in `related`.           |
| `1.0`          | OSV schema 1.0               | legacy  | 1.0.0 (2021-09-08)                       |         | No `schema_version`, `severity`, `credits` or `last_affected`; `versions` or a `SEMVER` range required. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Tag `1.1.0` (2021-12-15) has no CHANGELOG entry or GitHub release. Its text adds `schema_version` and relaxes the 1.0 `versions` rule, but has no `severity` or `credits`; read a `"schema_version": "1.1.0"` record like the `1.2-1.6` line. Before 1.0 the format used `affects` and per-record `packages`; the 2021-08-17 change moved them into `affected` with `events` (CHANGELOG). Treat any pre-1.0 document as a conversion source, not an OSV record.

## Which version to use

- Write OSV schema 1.9 records with `"schema_version": "1.9.1"`, the latest release.
- Read every 1.x record: new minor and patch versions only add fields (§ schema_version field). A record with no `schema_version` is `1.0.0`.
- Validate each record against the JSON Schema of the version it declares, or 1.0.0 if it declares none (Properties of a High Quality OSV Record, Valid). The current schema rejects unknown top-level fields, so a newer record can fail an older schema.
- Treat 1.0, 1.2 to 1.6 and 1.7 to 1.8 records as input to an upgrade when you republish them.
- Follow `main` only to see what is coming. Its posture is **track**: emit nothing that only `main` defines.

## What changed

### OSV schema 1.9

From the CHANGELOG and the diff of `docs/schema.md` between tags:

- 1.9.0 adds the wildcard package name `*`: an advisory affects every package in the `ecosystem`, for example when an ecosystem release reaches end of life (§ affected[].package field).
- 1.9.0 replaces the list of "databases operating without custom identifier prefixes" with guidance: publish within your scope, and derive an id from a CVE by adding your home prefix, for example `DEBIAN-CVE-2000-0001` (§ id, modified fields).
- 1.9.0 adds the `WordPress` and `Homebrew` ecosystems and the `BREW` prefix; 1.9.1 adds `Red Hat Lightwell` and the `RHLW` prefix, and documents the `Echo` suffixes (`Echo:PyPI`, `Echo:Maven`, `Echo:npm`, `Echo:NuGet`).
- 1.9.1 adds "Depicting multiple ecosystems in the same record": use separate `affected` entries for a strict ecosystem and for Git-level data, the Git entry having no `package` (§ Separating Git and Strict Ecosystems; § Version Enumeration for Git Entries).

### OSV schema 1.7 to 1.8

- 1.7.0 adds `upstream`: ids of upstream vulnerabilities, transitive but not symmetric. Bundled upstream vulnerabilities move out of `related`, whose definition drops "a similar OSV entry that bundles multiple distinct vulnerabilities" (§ upstream field; § related field).
- 1.7.0 adds the `Ubuntu` severity type, the `V8` prefix and the `Kubernetes` ecosystem, and says `purl` excludes the `@version` component (CHANGELOG; § affected[].package field).
- 1.7.2 to 1.7.5 add ecosystems and prefixes only (CHANGELOG).
- 1.8.0 adds the optional `severity[].source` (`NVD`, `CNA`, `SELF`); without it the rating is attributed to the home database (§ severity[].source field).
- 1.8.0 adds the `x_` prefix for local databases not aggregated by OSV.dev, and the `Azure Linux`, `TuxCare` and `vcpkg` ecosystems (§ id, modified fields).

### OSV schema 1.2 to 1.6

- 1.1.0/1.2.0 add `schema_version` (required above 1.0.0, assumed `1.0.0` when missing), top-level `severity` with `CVSS_V3`, top-level `database_specific` and `credits`, and relax the 1.0 rule that every `affected` entry needs `versions` or a `SEMVER` range (CHANGELOG; 1.2.0 § schema_version field).
- 1.3.0 adds the `last_affected` event and `affected[].ranges[].database_specific` (CHANGELOG).
- 1.4.0 adds per-package `affected[].severity` and `credits[].type`; 1.5.0 adds reference types (CHANGELOG).
- 1.6.0 clarifies `aliases` and `related`; 1.6.2 adds `CVSS_V4`; 1.6.3 adds the Maven registry suffix; 1.6.4 to 1.6.7 add ecosystems, prefixes and JSON Schema changes (CHANGELOG). In 1.6.7, upstream vulnerabilities bundled in a distribution record are listed in `related` (1.6.7 § aliases field).

### OSV schema 1.0

- The first stable release (CHANGELOG 2021-09-08). Fields: `id`, `modified`, `published`, `withdrawn`, `aliases`, `related`, `summary`, `details`, `affected` (with `package`, `ranges` of `introduced`/`fixed`/`limit` events, `versions`, `ecosystem_specific`, `database_specific`) and `references` (1.0.0 § Format Overview).
- Each `affected` entry must contain a non-empty `versions` list or at least one `SEMVER` range; `ECOSYSTEM` and `GIT` ranges only add context (1.0.0 § affected fields).

## Upgrading

### OSV schema 1.7 to 1.8 to OSV schema 1.9

1. Change the version marker: set `schema_version` to `"1.9.1"`.
2. Replace removed or renamed fields: none were removed. Optionally replace per-package entries that list every package of an end-of-life ecosystem release with one entry named `*`, and split an `affected` entry that mixes strict-ecosystem versions with `GIT` commit ranges into a strict entry and a Git entry with no `package`.
3. Validate against the 1.9.1 `validation/schema.json`.
4. Keep behaviour unchanged: the same versions and commits evaluate as affected.

### OSV schema 1.2 to 1.6 to OSV schema 1.9

1. Change the version marker: set `schema_version` to `"1.9.1"`.
2. Replace removed or renamed fields:
   - Move ids of upstream vulnerabilities that a downstream record bundles from `related` (or `aliases`) to `upstream` (§ upstream field; § aliases field).
   - Strip any `@version` from `affected[].package.purl` (§ affected[].package field).
   - Add `severity[].source` where the score came from NVD or the CNA rather than your database (§ severity[].source field).
   - Apply the 1.9 Git separation and wildcard steps above where they fit.
3. Validate against the 1.9.1 schema.
4. Keep behaviour unchanged: `aliases` should now name only the same vulnerability, so alias-based deduplication downstream changes only where the old record was wrong.

### OSV schema 1.0 to OSV schema 1.9

1. Change the version marker: add `"schema_version": "1.9.1"` (1.0 records have none).
2. Replace removed or renamed fields: none were renamed between 1.0 and 1.9. Add `severity`, `credits`, `upstream` and `last_affected` only where you have the data; prefer `fixed` to `last_affected` (§ Requirements). Then apply the 1.2 to 1.6 steps above.
3. Validate against the 1.9.1 schema; check that every `id` prefix is still in the defined table.
4. Keep behaviour unchanged: 1.0 records already list `versions` or `SEMVER` ranges, which still evaluate the same.

## Preview: OSV schema main (unreleased)

As of 2026-10-05, `main` at 2780d2a differs from tag `v1.9.1` only in `docs/schema.md`; `CHANGELOG.md`, `ecosystems.json` and `validation/schema.json` are unchanged. The new text under § id, modified fields:

- A "Character set constraints" section: `id` must match `^[a-zA-Z0-9:_.-]+$`.
- A "Semantically neutral ids" section: new id schemes should not encode the weakness type, the package name or the severity, and should start with the scoped prefix (or `x_`) followed ideally by `-`.

Posture: **track**. Do not cite these rules as 1.9.1 requirements and do not reject 1.9.1 records over them. Ids that already meet them are fine to mint. Watch the CHANGELOG and the releases. When the next release ships: make it current, add a line or widen `1.9` depending on its version number, and add an upgrade section.
