# Publishing and consuming OSV data

Read this when validating records, publishing them as a home database, contributing them to OSV.dev, or querying and evaluating OSV data as a consumer. Sources: `docs/schema.md`, `validation/schema.json` and `validation/README.md` at tag `v1.9.1`, and the OSV.dev documentation pages listed in [Sources](../SKILL.md#sources). The OSV.dev pages describe one aggregator's service, not the schema.

## Validate

1. Validate against `validation/schema.json` (JSON Schema draft 2020-12) of the version the record declares. Any JSON Schema validator works; `validation/README.md` shows `go run github.com/neilpa/yajsv@latest -s schema.json osv.json` and `check-jsonschema --schemafile schema.json osv.json`.
2. Check what the JSON Schema does not:
   - `schema_version` is present (the schema does not list it in `required`, the prose requires it above 1.0.0; § id, modified fields).
   - A `SEMVER` range uses real SemVer and does not overlap other `SEMVER` ranges (§ affected[].ranges[].type field).
   - At most one key per event object is enforced, but the schema does not check event order or that `introduced` sorts before `fixed`.
   - `aliases`, `upstream` and `related` follow their definitions.
3. OSV.dev's quality bar, for records it imports (Properties of a High Quality OSV Record): the record passes JSON Schema validation for its declared `schema_version` (or 1.0.0); `introduced` is defined; `fixed` is preferred over `last_affected`; `introduced` and `fixed` differ and `introduced` sorts first; versions exist in the ecosystem and commits exist in the named repository (not a fork); the ecosystem and prefix are defined in the schema; the package name exists and is normalized; purls conform; reference URLs return 2xx or 3xx at publication; a CVE alias is present where relevant; upstream ids are present for downstream records.

## Publish as a home database

- Serve the JSON encoding only (§ Format Overview). You may store records in another format internally.
- Register a prefix (and, if needed, an ecosystem) by pull request to `ossf/osv-schema`; use `x_` for records that stay local (§ id, modified fields).
- Bump `modified` on every change: of two records with the same `id`, consumers treat the later `modified` as authoritative (§ id, modified fields).
- Withdraw by setting `withdrawn` and giving the reason in `summary` (§ withdrawn field).
- Put the canonical ecosystem data in `ecosystem_specific`; aggregators use `database_specific` (§ affected[].database_specific field).
- Each database in the prefix table lists the URL where it serves OSV JSON per id, for example `https://vuln.go.dev/ID/<ID>.json` (§ id, modified fields).

### Contribute to OSV.dev

From "Contributing A New Data Source" (OSV.dev documentation):

1. Open an issue with the "new data source" template.
2. Format the data per the OSV schema.
3. Open a pull request to `ossf/osv-schema` reserving the id prefix and, if new, the ecosystem.
4. Publish the records through a public Git repository (preferred), a REST endpoint listing at least every id and modified date, or a public GCS bucket.
5. For a new ecosystem, add purl mappings and version ordering logic to OSV.dev so API queries work.
6. Import into the test instance first, then review linter findings at `https://api.test.osv.dev/v1experimental/importfindings/{source_name}` before production import.

## Consume

- Read any 1.x record and ignore fields you do not know (§ schema_version field). Treat a missing `schema_version` as `1.0.0`.
- Deduplicate by `id`, keeping the later `modified` (§ id, modified fields). Group the same vulnerability across databases through `aliases`, which are symmetric and transitive; do not merge through `upstream` or `related` (§ aliases field; § upstream field; § related field).
- Treat a record with `withdrawn` set as withdrawn from that time; a record without it has not been withdrawn (§ withdrawn field).
- Match a package by `ecosystem` and `name`; the ecosystem defines how the name is read (§ affected[].package field). A `name` of `*` matches every package in that ecosystem.
- Evaluate with `IsVulnerable`: listed in `versions`, or inside any range (§ Evaluation). See [`affected-and-ranges.md`](affected-and-ranges.md).
- If you have no comparator for an `ECOSYSTEM` range, fall back to the `versions` list; for `GIT`, you need the repository (§ affected[].ranges[].type field).
- Sanitize `details` before display: it is CommonMark and may contain raw HTML or non-`http(s)` links (§ summary, details fields).
- Prefer a `severity[].source` you trust; an omitted `source` means the home database (§ severity[].source field).

### OSV.dev API

From the OSV.dev API documentation (API 1.0):

| Endpoint              | Purpose                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `POST /v1/query`      | Vulnerabilities for one package and version, or one commit hash.                          |
| `POST /v1/querybatch` | Many queries at once; returns only `id` and `modified` per vulnerability, in input order. |
| `GET /v1/vulns/{id}`  | The full OSV record for an id.                                                            |

Further endpoints under `/v1experimental/` (import findings, determine version, Ubuntu binary-to-source) are marked experimental.

`POST /v1/query` request (base URL `https://api.osv.dev`):

```json
{ "package": { "name": "jinja2", "ecosystem": "PyPI" }, "version": "3.1.4" }
```

- Identify the package by `name` and `ecosystem`, or by `purl`, not both.
- Give the version in `version` or in a versioned purl (`pkg:pypi/jinja2@3.1.4`), never both; both returns 400 Bad Request.
- `commit` queries by commit hash; then `version` must not be set and `package` is optional.
- Git tags: set `ecosystem` to `GIT`, `name` to the full repository URL and `version` to the tag.
- Requests are case-sensitive (`PyPI`, `GHSA`).
- Results paginate above 1,000 vulnerabilities or 20 seconds: repeat the query with `page_token` set to the returned `next_page_token` until none is returned, even when a page holds only a token.
- Responses over HTTP/1.1 are limited to 32 MiB; HTTP/2 has no limit and is recommended for large results. The page states there are currently no rate limits.

`POST /v1/querybatch` takes `{"queries": [ … ]}` with the same per-query rules; fetch full records with `GET /v1/vulns/{id}`.

### OSV.dev data dumps

From "Data sources" (OSV.dev documentation):

- Everything, including withdrawn records: `gs://osv-vulnerabilities/all.zip`.
- Per ecosystem: `gs://osv-vulnerabilities/<ECOSYSTEM>/all.zip` and `<ECOSYSTEM>/<ID>.json`, also over HTTPS at `https://storage.googleapis.com/osv-vulnerabilities/<ECOSYSTEM>/all.zip`. Records with no ecosystem go to `[EMPTY]/`.
- Ecosystems with a `:` suffix are exported under the base name only (all `Alpine:*` under `Alpine`). The list is at `gs://osv-vulnerabilities/ecosystems.txt`.
- Incremental sync: `modified_id.csv` (top level: `<iso modified>,<ecosystem_dir>/<id>`; per ecosystem without the directory), sorted newest first, so stop reading at the first timestamp you have already seen.

## Common mistakes

- Validating a newer record against an older schema, or the reverse, and treating the failure as a broken record.
- Merging records through `related` or `upstream` as if they were `aliases`.
- Ignoring `last_affected` or `limit` in a home-grown evaluator.
- Calling `/v1/query` with both `version` and a versioned purl.
- Lowercasing ecosystem names in API calls.
- Reading only the first page of a paginated response.
