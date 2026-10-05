# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether a newer draft exists. Sources: `OPENVEX-SPEC.md` at `main` and at tag `v0.0.2`, the v0.2.0 release notes, the git history of `openvex/spec`, and OPEV-0014 and OPEV-0015, listed in [Sources](../SKILL.md#sources).

## Version lines

OpenVEX is pre-1.0, so each `0.x` release is its own line. The repository README still calls the specification a draft, but v0.2.0 and v0.0.2 are tagged GitHub releases. The repository has no CHANGELOG file; the Revisions table at the end of `OPENVEX-SPEC.md` and the release notes are the change record.

| Id       | Line           | Status  | Revision                                                          | Posture | Summary                                                                                          |
| -------- | -------------- | ------- | ----------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `v0.2.0` | OpenVEX v0.2.0 | current | v0.2.0 (released 2023-08-22); text at `main` 61b5f88 (2026-09-09) |         | Product and vulnerability become structs; versioned `@context`; JSON Schema and JSON-LD context. |
| `v0.0.2` | OpenVEX v0.0.2 | legacy  | v0.0.2 (tagged 2023-07-18, released 2023-07-19)                   |         | Aligned with the CISA minimum requirements; string `vulnerability`, `products`, `subcomponents`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Before v0.0.2 there were untagged drafts from January to July 2023 (the file was headed "v0.0.0"). v0.2.0 says an `@context` without a version means v0.0.1 (Spec, Document Struct Fields). Read any such document as v0.0.2 and upgrade it the same way; the differences are listed under "OpenVEX v0.0.2" below.

## Which version to use

- Author OpenVEX v0.2.0 with `"@context": "https://openvex.dev/ns/v0.2.0"`.
- No supported line exists: v0.0.2 is not a valid target, because its string `products` and `vulnerability` fail the v0.2.0 schema.
- Treat a document with `"@context": "https://openvex.dev/ns"` (v0.0.1 or v0.0.2) as input to an upgrade.
- There is no preview. As of 2026-10-05, `main` holds the v0.2.0 text with editorial fixes, the JSON Schema and the completed v0.2.0 JSON-LD context; the open pull requests (#58, #64) only touch the schema. The README says the project hoped for a 1.0 release, but no 1.0 text exists. When a new spec heading, tag or `ns/` directory appears, add it here as a `-preview` line with posture `track`.

## What changed

### OpenVEX v0.2.0

From the v0.2.0 release notes, the Revisions table and the diff between the `v0.0.2` and `v0.2.0` tags:

- `vulnerability` changes from a string to a struct with `@id`, `name` (required), `description` and `aliases` (OPEV-0015; Spec, Vulnerability Data Structure). The statement field `vuln_description` is gone; use `vulnerability.description`.
- `products` changes from a list of strings to a list of product structs with `@id`, `identifiers`, `hashes` and `subcomponents` (OPEV-0014; Spec, Product Data Structure).
- The statement-level `subcomponents` string list is gone; subcomponents move inside each product as component structs (Spec, Component Fields; OPEV-0014, subcomponents).
- New catalogs: hash names (Spec, Appendix A) and identifier types `purl`, `cpe22`, `cpe23` (Spec, Appendix B).
- The release notes call this "the first major revision" with "breaking changes".

Added on `main` after the tag, without a new version number:

- `@context` is versioned as `https://openvex.dev/ns/v[version]`; unversioned means v0.0.1 (commit cdc0a88, 2023-08-28). At the tag, the field still read "Fixed to `https://openvex.dev/ns`".
- `statements` is listed as a required document field (commit 5adfab8).
- `openvex_json_schema.json` (JSON Schema 2020-12, `$id` `.../openvex_json_schema_0.2.0.json`) and `ns/v0.2.0/context.json`, completed on 2026-09-09.

### OpenVEX v0.0.2

From the Revisions table and the diff from the January 2023 drafts:

- Updated to the CISA Minimum Requirements for VEX (2023-05-29): statement `@id`, `version` and `last_updated`, document `last_updated`, statement `supplier`.
- `role` became optional; document-level `supplier` was removed (2023-06-01).
- `author` MUST be an individual or organization (Spec v0.0.2, Document Struct Fields).

## Upgrading

### v0.0.2 to v0.2.0

1. Change the version marker: set `"@context": "https://openvex.dev/ns/v0.2.0"`.
2. Replace removed or renamed fields in each statement:
   - `"vulnerability": "CVE-…"` becomes `"vulnerability": {"name": "CVE-…"}`. Move `vuln_description` into `vulnerability.description`. Add other ids as `aliases`; keep an IRI value as `vulnerability.@id`.
   - Each string in `products` becomes `{"@id": "<string>"}`. When the string is a purl, also set `identifiers.purl`; for a CPE, set `cpe22` or `cpe23`.
   - Statement `subcomponents` strings become `{"@id": "<string>"}` entries in the `subcomponents` list of every product the statement names, then remove the statement-level field.
   - From pre-v0.0.2 drafts: remove document-level `supplier`. If it named the product's supplier, set the statement `supplier` instead; if it named who issued the document, it belongs in `author`.
   - Make `version` an integer.
3. Validate against the target: run `openvex_json_schema.json` and the Verify list in `SKILL.md`. Do not copy the OPEV-0014 list shapes for `hashes` and `identifiers`; the released spec uses maps.
4. Keep behaviour unchanged: each statement keeps its status, justification and statement timestamp, and covers the same products. The upgrade changes content, so increment the document `version`, set `last_updated`, and write the old document `timestamp` into statements that inherited it (Spec, Updating Statements with Inherited Data).

## Preview

None. Watch the `openvex/spec` releases page, the heading of `OPENVEX-SPEC.md` on `main`, and new directories under `ns/`. When a draft appears, add a `-preview` line with posture `track`; when it ships, make it current, move v0.2.0 to supported or legacy, and add an upgrade section.
