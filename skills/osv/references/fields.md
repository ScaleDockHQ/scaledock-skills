# Fields

Read this when writing or reviewing any field outside `affected`. Sources: `docs/schema.md` and `validation/schema.json` at tag `v1.9.1`. Section names are the headings of the rendered specification. `affected` is in [`affected-and-ranges.md`](affected-and-ranges.md); prefixes and ecosystems are in [`ecosystems-and-ids.md`](ecosystems-and-ids.md).

## Record shape

```json
{
  "schema_version": "1.9.1",
  "id": "GHSA-r9p9-mrjm-926w",
  "modified": "2021-03-08T16:02:43Z",
  "published": "2021-03-08T16:06:50Z",
  "withdrawn": "…",
  "aliases": ["CVE-2020-28498"],
  "upstream": ["…"],
  "related": ["…"],
  "summary": "…",
  "details": "…",
  "severity": [{ "type": "CVSS_V3", "score": "CVSS:3.1/…", "source": "NVD" }],
  "affected": [
    {
      "package": { "ecosystem": "npm", "name": "elliptic" },
      "ranges": [],
      "versions": []
    }
  ],
  "references": [{ "type": "ADVISORY", "url": "https://…" }],
  "credits": [{ "name": "…", "contact": ["https://…"], "type": "FINDER" }],
  "database_specific": {}
}
```

All strings are UTF-8 (§ Format Overview). The schema defines only the fields that must be shared; customizations go in `ecosystem_specific` and `database_specific` (§ Format Overview). The JSON Schema sets `additionalProperties: false` at the top level, so any other top-level key fails validation.

## Field rules

| Field               | Required                      | Rule                                                                                                                                 | Section                   |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `schema_version`    | yes, for versions above 1.0.0 | SemVer 2.0.0 string, no leading `v`. Missing means `1.0.0`. The JSON Schema types it as a string but does not list it in `required`. | § schema_version field    |
| `id`                | yes                           | `<DB>-<ENTRYID>`; prefix from the defined table or `x_`.                                                                             | § id, modified fields     |
| `modified`          | yes                           | RFC 3339 UTC timestamp ending in `Z`. The later `modified` wins between two records with the same `id`.                              | § id, modified fields     |
| `published`         | no                            | RFC 3339 UTC timestamp, when the entry should be considered published.                                                               | § published field         |
| `withdrawn`         | no                            | RFC 3339 UTC timestamp. Absent means not withdrawn. Put the reason in `summary`.                                                     | § withdrawn field         |
| `aliases`           | no                            | Ids of the same vulnerability in other databases. Symmetric and transitive.                                                          | § aliases field           |
| `upstream`          | no                            | Ids of upstream vulnerabilities this entry refers to. Transitive, not symmetric.                                                     | § upstream field          |
| `related`           | no                            | Ids of closely related but different vulnerabilities. Symmetric, not transitive.                                                     | § related field           |
| `summary`           | no                            | One line of plain English text, recommended at most about 120 characters.                                                            | § summary, details fields |
| `details`           | no                            | English CommonMark. Avoid raw HTML and links that are not `http://` or `https://`.                                                   | § summary, details fields |
| `severity`          | no                            | Array of `{type, score, source?}`. Forbidden at top level if any `affected[].severity` is set.                                       | § severity field          |
| `affected`          | no                            | See [`affected-and-ranges.md`](affected-and-ranges.md).                                                                              | § affected fields         |
| `references`        | no                            | Array of `{type, url}`; `url` is fully qualified, including the scheme.                                                              | § references field        |
| `credits`           | no                            | Array of `{name, contact?, type?}`; `name` is required in each entry.                                                                | § credits fields          |
| `database_specific` | no                            | Object whose meaning the database defines; applies to the whole vulnerability.                                                       | § database_specific field |

An entry with only `id` and `modified` (plus `schema_version`) is valid and could stand for a reserved id with no public information (§ id, modified fields). The JSON Schema timestamp pattern is `[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?Z`, so fractional seconds are allowed.

## aliases, upstream and related

- **`aliases`**: two vulnerabilities are aliases if they affect any software component the same way, and a patch that fixes one fixes the other and no others (§ aliases field).
- Do **not** use `aliases` for vulnerabilities upstream or downstream in the supply chain. A distribution's record for a library CVE must not list that CVE as an alias; it lists it in `upstream` (§ aliases field; § upstream field).
- **`upstream`**: if B is upstream of A and C upstream of B, C is upstream of A; A cannot be upstream of B (§ upstream field).
- **`related`**: similar but different vulnerabilities, and cases that meet neither the `aliases` nor the `upstream` definition (§ related field).

## severity

Each item has a required `type` and `score`, and an optional `source` (§ severity field; JSON Schema `$defs/severity`).

| `type`    | `score`                                                                                                         | JSON Schema check                                        |
| --------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `CVSS_V2` | CVSS v2.0 vector, for example `AV:L/AC:M/Au:N/C:N/I:P/A:C`                                                      | v2 metric pattern, no `CVSS:` prefix                     |
| `CVSS_V3` | CVSS vector `>= 3.0` and `< 4.0`, for example `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:N/A:N`                    | starts with `CVSS:3.0/` or `CVSS:3.1/`                   |
| `CVSS_V4` | CVSS vector `>= 4.0` and `< 5.0`, for example `CVSS:4.0/AV:N/AC:L/AT:N/PR:H/UI:N/VC:L/VI:L/VA:N/SC:N/SI:N/SA:N` | `CVSS:4.0/` with all base metrics in order               |
| `Ubuntu`  | lowercase Ubuntu priority                                                                                       | one of `negligible`, `low`, `medium`, `high`, `critical` |

The score is the vector string, not a number (§ severity[].score field). New types need a PR to the schema.

`source` (since 1.8.0) says who produced the rating (§ severity[].source field):

- omitted: attributed to the home database named by the `id`, as author or endorser;
- `NVD`: the National Vulnerability Database;
- `CNA`: the CVE Numbering Authority that assigned the CVE;
- `SELF`: the home database, stated explicitly.

Use `affected[].severity` when packages in one record have different severities; then leave the top-level `severity` out (§ affected[].severity field). The JSON Schema enforces this: with a top-level `severity`, each `affected[].severity` must be `null`.

## references

`type` values (§ references field):

| Type         | Meaning                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `ADVISORY`   | A published security advisory.                                                                   |
| `ARTICLE`    | An article or blog post.                                                                         |
| `DETECTION`  | A tool, script, scanner or rule that detects the vulnerability (YARA rules, hashes, signatures). |
| `DISCUSSION` | A social media discussion thread.                                                                |
| `REPORT`     | A report, typically on a bug or issue tracker.                                                   |
| `FIX`        | A source browser link to the fix, for people. Programs use `GIT` ranges instead.                 |
| `INTRODUCED` | A source browser link to the change that introduced it, for people.                              |
| `PACKAGE`    | The package's home page.                                                                         |
| `EVIDENCE`   | A demonstration of the validity of the claim.                                                    |
| `WEB`        | A web page of some unspecified kind.                                                             |

The JSON Schema enum also accepts `GIT`, which the prose does not define; do not emit it. `url` has `format: uri`.

## credits

`name` is required in every entry and uses the notation the credited party prefers; `contact[]` entries should be fully qualified plain-text URLs, such as `https://` or `mailto:` (§ credits fields). `type`, if present, is one of `FINDER`, `REPORTER`, `ANALYST`, `COORDINATOR`, `REMEDIATION_DEVELOPER`, `REMEDIATION_REVIEWER`, `REMEDIATION_VERIFIER`, `TOOL`, `SPONSOR` or `OTHER`, matching the MITRE CVE credit types (§ credits[].type field).

## database_specific and ecosystem_specific

- Top-level `database_specific`: data an aggregator applies to the whole vulnerability (§ database_specific field).
- `affected[].ecosystem_specific`: defined by the ecosystem, for example affected functions in the Go ecosystem (§ affected[].ecosystem_specific field).
- `affected[].database_specific`: defined by the database that produced the record. The canonical database for an ecosystem uses `ecosystem_specific`, leaving `database_specific` to aggregators (§ affected[].database_specific field).
- `affected[].ranges[].database_specific`: context for converting back to the original format; never affects evaluation (§ affected[].ranges[].database_specific field).

Each is a single JSON object with unspecified keys.

## Common mistakes

- Listing the upstream CVE in `aliases` of a distribution advisory instead of `upstream`.
- A numeric CVSS score in `score` instead of the vector string.
- A local timezone offset such as `+02:00` instead of `Z`.
- Setting both top-level and per-package `severity`.
- Putting machine-readable data in `details` instead of a `*_specific` object.
- Withdrawing a record without setting `withdrawn`, or putting the reason anywhere but `summary` (§ withdrawn field).
