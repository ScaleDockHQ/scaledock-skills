# Document model

Read this when writing or parsing the `document`, `product_tree` and `vulnerabilities` properties of a CSAF 2.0 document, assigning versions, or naming the file. Section numbers are CSAF 2.0 (OASIS Standard). The JSON schema `https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json` (JSON Schema draft 2020-12) is normative where the prose has a gap (§2, §3).

## Top level

A CSAF document is a JSON object with three properties: `document` (mandatory), and `product_tree` and `vulnerabilities` (optional) (§3). Product and vulnerability data are linked by IDs rather than repeated; the producer is responsible for consistency of those links (§2.1).

Additional properties and custom keywords are not forbidden by the schema but are strongly discouraged; propose new fields through the TC's GitHub (§2.1). Optional test 6.2.20 flags them.

## `document`

Mandatory: `category`, `csaf_version`, `publisher`, `title`, `tracking` (§3.2.1).

| Property              | Rule                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category`            | Pattern `^[^\s\-_\.](.*[^\s\-_\.])?$`; selects the profile (§3.2.1.3, §4). See [`profiles-and-vex.md`](profiles-and-vex.md).                                                                                                |
| `csaf_version`        | Enum with the single value `2.0` (§3.2.1.4).                                                                                                                                                                                |
| `publisher`           | `category` (`coordinator`, `discoverer`, `other`, `translator`, `user`, `vendor`), `name`, `namespace` (a normalized URL under the issuer's control) mandatory; `contact_details`, `issuing_authority` optional (§3.2.1.8). |
| `title`               | SHOULD be a canonical name, unique enough to tell it apart from similar documents (§3.2.1.11).                                                                                                                              |
| `tracking`            | See below.                                                                                                                                                                                                                  |
| `distribution`        | At least one of `text` and `tlp`; `tlp.label` is `WHITE`, `GREEN`, `AMBER` or `RED`, `tlp.url` defaults to `https://www.first.org/tlp/`. Prefer TLP when both exist (§3.2.1.5).                                             |
| `lang`, `source_lang` | BCP 47 language tags (`lang_t`). `source_lang` MUST be set when `publisher.category` is `translator`, and SHALL NOT be present otherwise (§3.1.4, §3.2.1.6, §3.2.1.10).                                                     |
| `aggregate_severity`  | `text` mandatory, `namespace` optional; a document-level urgency in the issuer's own scale, separate from CVSS (§3.2.1.2).                                                                                                  |
| `notes`               | `notes_t`: each note has `category` (`description`, `details`, `faq`, `general`, `legal_disclaimer`, `other`, `summary`) and `text`; `title` SHOULD be set for `other` (§3.1.5).                                            |
| `references`          | `references_t`: each has `url` and `summary`; `category` is `external` (default) or `self` (§3.1.10).                                                                                                                       |
| `acknowledgments`     | `names`, `organization`, `summary`, `urls` (§3.1.1).                                                                                                                                                                        |

The pair `publisher.namespace` + `tracking.id` identifies a document globally. An issuer SHOULD NOT change its namespace; if it does, it SHOULD reissue every document as a patch version whose only changes are the publisher, revision history and references (§3.2.1.8.5).

### `tracking`

Mandatory: `current_release_date`, `id`, `initial_release_date`, `revision_history`, `status`, `version`. Optional: `aliases`, `generator` (§3.2.1.12).

- `id`: pattern `^[\S](.*[\S])?$`, no leading or trailing white space and no line break, unique within the issuing organization (§3.2.1.12.4).
- `status`: `draft` (pre-release), `interim` (rapid updates expected; MUST change to `final` once updates slow down) or `final` (unlikely to change) (§3.2.1.12.7).
- `revision_history`: one item per version including the first, each with `date`, `number` and `summary`, optionally `legacy_version`. Items numbered `0` or `0.y.z` MUST be removed when the status is `final`; pre-release versions do not get their own item; build metadata SHOULD NOT appear in `number` (§3.2.1.12.6).
- `version` equals the `number` of the last revision item when sorted by `date`, ignoring build metadata (and the pre-release part while `draft`) (test 6.1.16).
- `generator.engine.name` names the tool that produced the document; `generator.date` is when it was generated (§3.2.1.12.3).

### Versioning (`version_t`)

A document uses one scheme only, semantic (preferred) or integer (§3.1.11, test 6.1.30).

Both schemes: a released version MUST NOT be modified; version `0` or `0.y.z` is for work before `initial_release_date` and MUST have status `draft`; the first public release is `1` or `1.0.0` (§3.1.11.1, §3.1.11.2).

Semantic versioning rules specific to CSAF (§3.1.11.2):

- **Major** MUST increase when consumers need a new comparison with their asset database: any change under `/product_tree`, adding or removing a vulnerability, adding or removing entries in `first_affected`, `known_affected` or `last_affected`, or removing entries from `first_fixed`, `fixed` or `known_not_affected`.
- **Minor** MUST increase when existing content changes otherwise, or substantial new information or elements are added.
- **Patch** MUST increase for backwards compatible fixes such as spelling.
- A pre-release suffix (`-…`) is allowed only with status `draft` and MUST NOT be present when status is `final`. Build metadata (`+…`) is ignored for precedence.

Integer versioning increments by one for each `final` version; a `draft` pre-release carries the next number (§3.1.11.1).

## `product_tree`

A container with at least one of `branches`, `full_product_names`, `product_groups`, `relationships` (§3.2.2).

### Branches

Each branch has `category`, `name`, and either `branches` or `product` (§3.1.2). Categories: `architecture`, `host_name`, `language`, `legacy`, `patch_level`, `product_family`, `product_name`, `product_version`, `product_version_range`, `service_pack`, `specification`, `vendor` (§3.1.2.2). Use the hierarchy `vendor` → `product_name` → `product_version` when possible (§3.1.2).

- `product_version` names one version and MUST NOT contain a range of any kind (`8.0.0 - 8.0.1`, `<= 2`, `prior to 4.2` are invalid) (§3.1.2.3.1).
- `product_version_range` names a range and MUST use either canonical `vers` (for example `vers:npm/1.2.3|>=2.0.0|<5.0.0`, and `vers:all/*` for all versions) or `vls`, the bare `vers` constraint without scheme, which is a fallback that SHOULD NOT be used unless necessary (§3.1.2.3.2). Prefer enumerating versions.
- A leading `v` or `V` SHOULD appear only in version categories, and only when the vendor's version has it (§3.1.2.3).

### Full product names and identification helpers

`full_product_name_t` has `name` (the full canonical name including version) and `product_id`, and optionally `product_identification_helper` with at least one of (§3.1.3):

| Helper           | Rule                                                                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cpe`            | CPE 2.3 formatted string or CPE 2.2 URI, matching the schema pattern (§3.1.3.3.1).                                                                                                       |
| `hashes`         | Items of `filename` and `file_hashes[]` (`algorithm`, default `sha256`, OpenSSL digest names; `value` hex, 32+ characters). A matching hash wins over a differing filename (§3.1.3.3.2). |
| `model_numbers`  | Full or partial; partial values start at the first character; `?` matches one character, `*` zero or more; two `*` MUST NOT follow each other (§3.1.3.3.3).                              |
| `purl`           | Canonical package URL starting `pkg:`; `pkg://` is invalid (§3.1.3.3.4, test 6.1.13).                                                                                                    |
| `sbom_urls`      | URLs of SBOMs for the product (SPDX, CycloneDX or SWID) (§3.1.3.3.5).                                                                                                                    |
| `serial_numbers` | Same wildcard rules as model numbers (§3.1.3.3.6).                                                                                                                                       |
| `skus`           | Same wildcard rules; use with relationships to separate hardware from software (§3.1.3.3.7).                                                                                             |
| `x_generic_uris` | `namespace` and `uri`, for vendor-specific or not-yet-supported identifiers, such as a CycloneDX BOM-Link or an SPDX element (§3.1.3.3.8).                                               |

Product IDs (`product_id_t`) and Product Group IDs (`product_group_id_t`) have no required format but are unique in the document; use different prefixes for the two, such as `CSAFPID-` and `CSAFGID-` (§3.1.6, §3.1.8).

### Product groups and relationships

- `product_groups[]` has `group_id`, `product_ids` (2 or more unique) and optional `summary` (§3.2.2.3).
- `relationships[]` has `category`, `product_reference`, `relates_to_product_reference` and `full_product_name`, and defines a new product from two existing ones. Categories: `default_component_of`, `external_component_of`, `installed_on`, `installed_with`, `optional_component_of`. The two references SHOULD NOT be identical (§3.2.2.4).

```json
"product_tree": {
  "full_product_names": [
    { "product_id": "CSAFPID-0001", "name": "Example Client 4.9.04053" },
    { "product_id": "CSAFPID-0002", "name": "Example OS" }
  ],
  "relationships": [
    {
      "category": "installed_on",
      "product_reference": "CSAFPID-0001",
      "relates_to_product_reference": "CSAFPID-0002",
      "full_product_name": { "product_id": "CSAFPID-0003", "name": "Example Client 4.9.04053 installed on Example OS" }
    }
  ]
}
```

## `vulnerabilities`

An array of vulnerability objects, each with at least one property (§3.2.3).

| Property         | Rule                                                                                                                                                                                                                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cve`            | `^CVE-[0-9]{4}-[0-9]{4,}$` (§3.2.3.2). Use one CVE once per document (test 6.1.23).                                                                                                                                                                            |
| `ids`            | `system_name` and `text`, for other tracking IDs; not for CVE IDs (§3.2.3.6, optional test 6.2.17).                                                                                                                                                            |
| `cwe`            | One object with `id` (`^CWE-[1-9]\d{0,5}$`) and `name` exactly as in CWE (§3.2.3.3, test 6.1.11).                                                                                                                                                              |
| `notes`          | `notes_t` for this vulnerability (§3.2.3.8).                                                                                                                                                                                                                   |
| `product_status` | Lists of Product IDs: `first_affected`, `known_affected`, `last_affected`, `known_not_affected`, `first_fixed`, `fixed`, `recommended`, `under_investigation` (§3.2.3.9).                                                                                      |
| `remediations`   | `category` and `details` mandatory, plus `product_ids` or `group_ids` (at least one MUST be present); optional `date`, `entitlements`, `restart_required`, `url` (§3.2.3.12).                                                                                  |
| `scores`         | `products` plus `cvss_v2` and/or `cvss_v3` (FIRST CVSS JSON schemas for v2.0, v3.0, v3.1). One score per CVSS version per product (§3.2.3.13, test 6.1.7).                                                                                                     |
| `threats`        | `category` (`exploit_status`, `impact`, `target_set`) and `details`; optional `date`, `product_ids`, `group_ids` (§3.2.3.14).                                                                                                                                  |
| `flags`          | `label` (a VEX justification) plus `product_ids` or `group_ids` (at least one MUST be present); optional `date` (§3.2.3.5). See [`profiles-and-vex.md`](profiles-and-vex.md).                                                                                  |
| `involvements`   | `party` (`coordinator`, `discoverer`, `other`, `user`, `vendor`) and `status` (`open`, `in_progress`, `completed`, `disputed`, `contact_attempted`, `not_contacted`); optional `date`, `summary`. The pair `party` + `date` is unique (§3.2.3.7, test 6.1.24). |
| Dates            | `discovery_date`, `release_date` (§3.2.3.4, §3.2.3.11).                                                                                                                                                                                                        |
| Others           | `acknowledgments`, `references`, `title` (§3.2.3.1, §3.2.3.10, §3.2.3.15).                                                                                                                                                                                     |

### Product status groups

Contradiction groups MUST be pairwise disjoint within one vulnerability (test 6.1.6):

- Affected: `first_affected`, `known_affected`, `last_affected`
- Not affected: `known_not_affected`
- Fixed: `first_fixed`, `fixed`
- Under investigation: `under_investigation`

`recommended` may list a product from any group (§6.1.6 note). `known_affected` means action is recommended; `known_not_affected` means no remediation is required; `under_investigation` means the answer will come in a later release (§3.2.3.9).

### Remediation categories

`workaround`, `mitigation`, `vendor_fix`, `none_available`, `no_fix_planned` (§3.2.3.12.1). `vendor_fix` contradicts `none_available` and `no_fix_planned` for the same product, so that combination can't be used; `details` SHOULD explain why for `none_available` and `no_fix_planned` (§3.2.3.12.1).

`restart_required.category`: `none`, `vulnerable_component`, `service`, `parent`, `dependencies`, `connected`, `machine`, `zone`, `system` (§3.2.3.12.7).

### Scores

A fixed product SHOULD have no score or a CVSS of 0 (§3.2.3.13; optional test 6.2.19). CVSS JSON MUST be valid and its computed values consistent with the vector (tests 6.1.8 to 6.1.10).

## Conventions

- **Filename** (§5.1): lowercase `tracking.id`, then replace each run of characters outside `[+\-a-z0-9]` with one `_`, then append `.json`. `RHBA-2019:0024` becomes `rhba-2019_0024.json`. Insert `_invalid` before `.json` to mark an invalid document.
- **Streams** (§5.2): separate consecutive documents in a stream with the RFC 7464 record separator.
- **Sorting** (§5.3): keys SHOULD be sorted alphabetically.
- **Size** (Appendix C): guidance on file size, array and string lengths for consumers that set limits.

## Common mistakes

- Using `product_version` for "all versions before 3.0"; use `product_version_range` with `vers` (§3.1.2.3.1).
- A remediation or flag with no `product_ids` or `group_ids` (tests 6.1.29, 6.1.32).
- Keeping a `0` or `0.y.z` revision item once the status is `final` or `interim` (test 6.1.18).
- Putting the CVE ID in `ids` instead of `cve` (optional test 6.2.17).
- Translating a document without setting `source_lang`, `lang`, `publisher.category` `translator` and a new `tracking.id` (§9.1.9).
- Using a value starting with `csaf_` for a category that is not a defined profile (test 6.1.26).
