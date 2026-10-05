# Affected packages, ranges and evaluation

Read this when writing `affected` entries or deciding whether a package version or commit is affected. Sources: `docs/schema.md` and `validation/schema.json` at tag `v1.9.1`, sections § affected fields through § Examples.

## affected entries

```json
"affected": [ {
  "package": { "ecosystem": "PyPI", "name": "pikepdf", "purl": "pkg:pypi/pikepdf" },
  "severity": [ { "type": "CVSS_V3", "score": "CVSS:3.1/…" } ],
  "ranges": [ { "type": "ECOSYSTEM", "events": [ { "introduced": "2.8.0" }, { "fixed": "2.10.0" } ] } ],
  "versions": [ "2.8.0", "2.8.0.post1", "2.8.0.post2", "2.9.0", "2.9.1", "2.9.2" ],
  "ecosystem_specific": { },
  "database_specific": { }
} ]
```

- Usually one `affected` entry per package describes all affected versions. A second entry for the same package is for rare cases such as `ecosystem_specific` platform data that does not apply to all versions (§ affected fields).
- **A version is affected if it lies in any range or is listed in `versions`** (§ affected fields).
- `versions` is generally recommended, so software can answer "is this version affected?" without ecosystem code. Non-overlapping ranges may stand in as a compact form. Products whose versions cannot be expressed as ranges must enumerate `versions` (§ affected fields).
- Each `versions` string is a single version in the ecosystem's own syntax (§ affected[].versions field). For `GIT` entries they are typically tags and follow no package manager's syntax; match those by commit with the `GIT` ranges instead.

## package

- `ecosystem` and `name` are both required; `purl` is optional but recommended (§ affected[].package field).
- `ecosystem` is one of the defined ecosystems, with a `:suffix` only where that ecosystem defines one. The JSON Schema pattern also accepts `GIT` here. See [`ecosystems-and-ids.md`](ecosystems-and-ids.md).
- The same `name` in two ecosystems is two different packages: `{"ecosystem": "npm", "name": "zlib"}` is not `{"ecosystem": "PyPI", "name": "zlib"}` (§ affected[].package field).
- `name` `*` means every package in that `ecosystem`, for example an end-of-life release with no further security support (§ affected[].package field, since 1.9.0).
- `purl` follows the Package URL specification and has no `@version` (§ affected[].package field).

### Several ecosystems and Git data in one record

- A record covers several ecosystems with one `affected` entry per `package.ecosystem` (§ Depicting multiple ecosystems in the same record).
- When you have both strict-ecosystem versions and commit hashes, use two entries: a strict entry with the ecosystem name and `versions`, `ECOSYSTEM` or `SEMVER` ranges; and a Git entry with **no `package`** and a `GIT` range (§ Separating Git and Strict Ecosystems).
- For Git entries, `versions` is typically filled with tags from `ranges[].repo` that fall in the commit ranges; OSV.dev can do this during ingestion (§ Version Enumeration for Git Entries).

## Range types

`type` is required and defines how `introduced`, `fixed` and the other events are read (§ affected[].ranges[].type field). The JSON Schema enum is `GIT`, `SEMVER`, `ECOSYSTEM`.

| Type        | Event values                                            | Ordering                                                   | Needs `versions`?                                                         |
| ----------- | ------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `SEMVER`    | SemVer 2.0.0 versions, no leading `v`                   | SemVer § 11 precedence                                     | No: one or more `SEMVER` ranges remove the requirement.                   |
| `ECOSYSTEM` | Uninterpreted strings in the ecosystem's version syntax | The ecosystem's own rules                                  | Recommended, because ecosystem-independent tools cannot order the values. |
| `GIT`       | Full-length commit hashes                               | `u < v` when `u` is an ancestor of `v` in the commit graph | Yes: answering needs a copy of the repository.                            |

- `SEMVER` ranges should not overlap; SemVer is a strict linear order, so they can always be simplified (§ affected[].ranges[].type field).
- Ecosystems that recommend SemVer without enforcing it use `ECOSYSTEM`, not `SEMVER` (§ affected[].ranges[].type field).
- `GIT` ranges require `repo`, a URL usable directly with `git clone` (§ affected[].ranges[].repo field). The JSON Schema restricts `GIT` event values to `0` or a 40- or 64-character lowercase hex hash.
- Event values may be normalized or stripped of build metadata, so they need not match the registry's version strings exactly (§ affected[].ranges[].events fields).

## Events

Each event object holds exactly one key (§ affected[].ranges[].events fields, Requirements):

- `{"introduced": v}`: the vulnerability starts at `v`. `"0"` means before every version.
- `{"fixed": v}`: `v` contains the fix and is not affected.
- `{"last_affected": v}`: `v` is the last affected version; later versions are unaffected.
- `{"limit": v}`: an upper limit on the range. `"*"` means infinity; with no `limit` events an implicit `{"limit": "*"}` applies. Several `limit` events are allowed.

Requirements (§ Requirements):

1. One key per object: `{"introduced": "1.0.0", "fixed": "1.0.2"}` is invalid.
2. At least one `introduced` per `events` array. The JSON Schema also needs `minItems: 1`.
3. `fixed` and `last_affected` never appear in the same range. Prefer `fixed`: `last_affected` is the ceiling known at publication and risks false negatives.
4. Prefer `fixed` to `limit`. For `GIT` ranges, `fixed` must list every cherry-picked fix commit on every branch, or other branches show false positives; `limit` restricts affected commits to those reachable from it and can cause false negatives.
5. Keep `events` sorted by the range type's order (recommended).

`limit` is generally not needed for linear version ranges and should not be used there (§ Limit events).

## Evaluation

The `IsVulnerable` algorithm from § Evaluation, restated:

```text
IsVulnerable(pkg, v, osv):
  for affected in osv.affected:
    if affected.package == pkg:
      if v in affected.versions or IncludedInRanges(v, affected.ranges):
        return true
  return false

IncludedInRanges(v, ranges):
  for range in ranges:
    if BeforeLimits(v, range):
      vulnerable = false
      for evt in sorted(range.events):
        if evt.introduced and v >= evt.introduced:       vulnerable = true
        else if evt.fixed and v >= evt.fixed:            vulnerable = false
        else if evt.last_affected and v > evt.last_affected: vulnerable = false
      if vulnerable: return true
  return false

BeforeLimits(v, range):
  if no limit events: return true        # implicit "*"
  for evt in range.events:
    if evt.limit and v < evt.limit: return true
  return false
```

Notes for implementers:

- Comparisons use the range type's order: SemVer precedence, the ecosystem's comparator, or commit ancestry (§ affected[].ranges[].type field).
- `introduced: "0"` sorts before everything; `limit` values containing `*` sort after everything (§ Special values).
- `database_specific` has no effect on the result (§ affected[].ranges[].database_specific field).
- For `GIT`, evaluate on the commit graph of `repo`; a version string cannot be compared with a hash.

## Worked examples

All from § Examples.

| Events                                                               | Affected                                                                                                          |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `introduced 0`                                                       | every version                                                                                                     |
| `introduced 0`, `fixed 1.0.2`                                        | everything before `1.0.2`                                                                                         |
| `introduced 1.0.0`, `fixed 1.0.2`, `introduced 3.0.0`, `fixed 3.2.5` | `[1.0.0, 1.0.2)` and `[3.0.0, 3.2.5)`                                                                             |
| `ECOSYSTEM`: `introduced 0`, `last_affected 2.1.214`                 | up to and including `2.1.214`; later assumed unaffected                                                           |
| `SEMVER`: `introduced 0`, `fixed 2.1.214`                            | everything before `2.1.214`; no false-negative risk                                                               |
| `GIT`: `introduced X`, `fixed Y`                                     | commits descending from X that do not descend from Y, on every branch; cherry-picked fixes need their own `fixed` |
| `GIT`: `introduced X`, `limit Y`                                     | like `git rev-list X..Y`, including X and excluding Y                                                             |

A Git entry from the specification's OSS-Fuzz example:

```json
{
  "package": { "ecosystem": "OSS-Fuzz", "name": "icu" },
  "ranges": [
    {
      "type": "GIT",
      "repo": "https://github.com/unicode-org/icu.git",
      "events": [
        { "introduced": "6e5755a2a833bc64852eae12967d0a54d7adf629" },
        { "fixed": "c43455749b914feef56b178b256f29b3016146eb" }
      ]
    }
  ]
}
```

## Common mistakes

- Two keys in one event object.
- A range with `fixed` and `last_affected`, or with no `introduced`.
- `SEMVER` for an ecosystem that only recommends SemVer (the specification's npm example uses `ECOSYSTEM`), or a leading `v` in a `SEMVER` value.
- Abbreviated commit hashes in a `GIT` range, or a `GIT` range without `repo`.
- A `GIT` range with a single `fixed` when the fix was cherry-picked to release branches.
- Mixing commit ranges and strict versions in one `affected` entry instead of two.
- Comparing `ECOSYSTEM` values as strings or as SemVer.
- A `purl` with `@version`.
