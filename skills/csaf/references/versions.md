# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, converting CVRF XML, or deciding what to do with the CSAF 2.1 draft. Sources: the CSAF 2.0 OASIS Standard and its Errata 01, CSAF 2.1 Committee Specification Draft 03, CVRF 1.2 Committee Specification 01, and the TC repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line     | Status  | Revision                                                          | Posture | Summary                                                                                                    |
| ------------- | -------- | ------- | ----------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `2.1-preview` | CSAF 2.1 | preview | Committee Specification Draft 03 (2026-09-11)                     | track   | New profiles, `metrics` with CVSS v4, EPSS and SSVC, `product_paths`, TLP 2.0, extensions, test presets.   |
| `2.0`         | CSAF 2.0 | current | OASIS Standard (2022-11-18), with Approved Errata 01 (2024-01-26) |         | The default target. JSON, five profiles, mandatory, optional and informative tests, 23 distribution rules. |
| `cvrf-1.2`    | CVRF 1.2 | legacy  | Committee Specification 01 (2017-09-13)                           |         | The XML predecessor (`cvrf:cvrfdoc`). Convert it to CSAF 2.0.                                              |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

OASIS stages, lowest to highest: Committee Specification Draft (CSD), Committee Specification (CS), OASIS Standard. As of 2026-10-05 the `v2.1/` folder holds `csd01` (2025-05-28), `csd02` (2026-02-25) and `csd03` (2026-09-11), and its "latest stage" files are CSD03. There is no CSAF 2.1 CS or OASIS Standard, so CSAF 2.0 stays current.

CVRF 1.1 (ICASI, 2012) came before CVRF 1.2, and CVRF 1.2 is not backward compatible with it (CVRF 1.2 §2). It has no line in this skill.

## Which version to use

- Write CSAF 2.0: `"csaf_version": "2.0"`, validated against `https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json`.
- Use the Errata 01 aggregator schema. The original 2.0 aggregator schema required a field named `mirror` that does not exist (the property is `mirrors`), which blocked every valid `aggregator.json` (Errata 01 §1.1). The prose and the CSAF and provider schemas are unchanged.
- Read the CSAF 2.0 known issues list in the TC repository before relying on an ambiguous test; for example, tests 6.1.1 and 6.1.4 do not list the `flags` paths, and the CPE pattern is not anchored correctly.
- Treat CVRF 1.2 XML as input to a CVRF CSAF converter (CSAF 2.0 §9.1.5).
- CSAF 2.1 posture is **track**: do not emit `"csaf_version": "2.1"`, the 2.1 `$schema` value, 2.1-only fields or 2.1-only profile values. Reading 2.1 documents to prepare a parser is fine; they are drafts and can change.

## What changed

### CSAF 2.1 (CSD03, draft)

From CSAF 2.1 CSD03. These may change before a Committee Specification.

- A mandatory `$schema` property with the single value `https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json`, and `csaf_version` `2.1` (2.1 §3.2.1, §3.2.2.4).
- CSAF Base now also requires `$schema` and `document.distribution.tlp.label` (2.1 §4.1).
- TLP 2.0 labels: `CLEAR`, `GREEN`, `AMBER`, `AMBER+STRICT`, `RED`; `WHITE` is gone. `distribution` gains `sharing_group` (2.1 §3.2.2.5; §9.1.18).
- New profiles: `csaf_deprecated_security_advisory` (the CSAF 2.0 Security Advisory rules), `csaf_withdrawn`, `csaf_superseded` and `csaf_vulnerability_report`. The `csaf_security_advisory` profile now also requires `cve` or `ids` on each vulnerability and `product_status.known_affected`, and each `fixed` product needs its affected counterpart (2.1 §4.4 to §4.9).
- `scores` becomes `metrics`, with `content` holding `cvss_v2`, `cvss_v3`, `cvss_v4`, `epss`, `qualitative_severity_rating` and `ssvc_v2` (2.1 §3.2.4.9).
- `cwe` becomes `cwes` (a list), `release_date` becomes `disclosure_date`, `first_known_exploitation_dates` is added, and `involvements` move to `document.involvement` (2.1 §3.2.2.6, §3.2.4.3 to §3.2.4.6).
- `product_tree.relationships` becomes `product_paths` with `beginning_product_reference` and `subpaths` (2.1 §3.2.3.4).
- Branch category `legacy` is removed and `platform` is added (2.1 §3.1.3.2). `purl` becomes the list `purls`. Model numbers, serial numbers and SKUs are exact unless they end in `*` (2.1 §9.1.18).
- Remediation categories add `fix_planned` and `optional_patch` (2.1 §3.2.4.13.1). Publisher category adds `multiplier`; `contact_details` becomes a `contact` object (2.1 §9.1.18).
- `document.license_expression` (SPDX) and extensions (`x_extensions`, with their own schemas) are added (2.1 §2.4, §3.2.2.8).
- Leap seconds are prohibited, and `T` and `Z` are upper case in date-times (2.1 §2.3).
- "Optional tests" are renamed "Recommended tests", many tests are added (62 mandatory, 55 recommended, 24 informative), and named test presets (`schema`, `basic`, `extended`, `full`, and others) are defined (2.1 §6).
- Distribution adds requirement 24 (no User-Agent blocking) and requirement 25 (`Access-Control-Allow-Origin`), caps redirects, adds `maintained_from` and `maintained_until` to `provider-metadata.json`, and defines a 2.0 to 2.1 transition (2.1 §7.1.6, §7.1.7, §7.1.24, §7.1.25, §7.4).
- New conformance targets include the CSAF 2.0 to CSAF 2.1 Converter, CSAF Library, CSAF Downloader, CSAF Withdrawer and CSAF Superseder (2.1 §9.1.18 to §9.1.36).

### CSAF 2.0

From CSAF 2.0 §2.1 and §9.1.5, compared with CVRF 1.2:

- JSON with a JSON Schema (draft 2020-12) replaces XML with XSD.
- Profiles selected by `document.category`, mandatory, optional and informative tests, distribution requirements and roles, and conformance targets are new.
- Branch types `Realm` and `Resource` are not in CSAF; the CVRF CSAF converter maps them to `product_name`.
- Product identification helpers (CPE, hashes, model numbers, purl, SBOM URLs, serial numbers, SKUs, generic URIs) are added to `full_product_name_t` (§3.1.3.3).
- `product_version_range` with `vers` or `vls` is added (§3.1.2.3.2), and the VEX profile with the justification `flags` (§3.2.3.5, §4.5).
- Enumerations become lowercase snake_case tokens. For example, CVRF 1.2 remediation types are `Workaround`, `Mitigation`, `Vendor Fix`, `None Available` and `Will Not Fix` (CVRF 1.2 §2.2.17), and CSAF 2.0 remediation categories are `workaround`, `mitigation`, `vendor_fix`, `none_available` and `no_fix_planned` (§3.2.3.12.1). §9.1.5 gives no value-by-value table, so map by the definitions and review the result.
- Versions follow semantic versioning (preferred) or integers; CVRF used `nn` up to `nn.nn.nn.nn` (CVRF 1.2 §2.2.9; CSAF 2.0 §3.1.11).

### CVRF 1.2

An XML format rooted at `cvrf:cvrfdoc`, with the namespaces `.../csaf-cvrf/v1.2/cvrf`, `.../prod` and `.../vuln`. It requires `cvrf:DocumentTitle`, `cvrf:DocumentType`, `cvrf:DocumentPublisher` and `cvrf:DocumentTracking`, and may carry notes, distribution, aggregate severity, references, acknowledgments, `prod:ProductTree` and `vuln:Vulnerability` elements (CVRF 1.2 §2). It supports both CVSS v2 and CVSS v3.0.

## Upgrading

### CVRF 1.2 to CSAF 2.0

Follow the CVRF CSAF converter conformance clause (CSAF 2.0 §9.1.5):

1. Change the format: parse the XML and emit JSON with `document.csaf_version` `2.0`. Take `publisher.name` and `publisher.namespace` from configuration or arguments (prefer the argument), never from hard-coded values.
2. Replace removed or renamed elements:
   - Branch types `Realm` and `Resource` become `product_name`, with a warning.
   - If any version is not semantic, replace every version with integers: sort `revision_history` by the CVRF number, number them from 1, set `tracking.version` to the matching item, and keep each original `cvrf:Number` as `legacy_version`.
   - Keep only the first `cvrf:Organization` in acknowledgments, the first `prod:FullProductName` in a relationship and the first `vuln:CWE`, each with a warning about lost information.
   - Set `document.lang` only when all `xml:lang` values agree; otherwise warn and list them.
   - Strip line breaks and leading or trailing white space from `cvrf:ID`, with a warning.
   - Move `vuln:ID` to the first item of `ids`.
   - Give remediations and scores without products the Product IDs from `known_affected`, `first_affected` and `last_affected`, or report an error if there are none.
   - For CVSS v3: compute `baseSeverity` from `baseScore`; error on a missing `vectorString`; keep only v3.1 when v3.0 and v3.1 exist for the same product; take the minor version from the vector, then the element namespace, then the root namespace, then a configured default of `3.0`, warning when guessed.
3. Validate against the CSAF 2.0 schema and run the mandatory tests; choose the profile in `document.category` and fill any elements it requires that CVRF did not have.
4. Keep behaviour unchanged: the same products, statuses, scores and remediations, and the same tracking ID.

### CSAF 2.0 to CSAF 2.1 (when 2.1 is final)

Do not run this for production documents while CSAF 2.1 is a draft. When it reaches CS or OASIS Standard, the CSAF 2.0 to CSAF 2.1 Converter clause (2.1 CSD03 §9.1.18) gives the steps; in CSD03 they are:

1. Set `$schema` and `csaf_version` `2.1`.
2. Map TLP `WHITE` to `CLEAR` (and default to `CLEAR` with a warning when no label was set); move `relationships` to `product_paths`; `purl` to `purls[0]`; `release_date` to `disclosure_date`; `cwe` to `cwes` with a CWE version; `contact_details` into `contact.details`; turn branch `legacy` into `product_name`; add a trailing `*` to partial model numbers, serial numbers and SKUs; replace leap seconds with `59.999999`; and recategorise remediations (`vendor_fix` for not affected or fixed products becomes `optional_patch`; `none_available` with a future fix becomes `fix_planned`).
3. A `csaf_security_advisory` that cannot meet the stricter 2.1 profile becomes `csaf_deprecated_security_advisory`; titles starting "Withdrawn" or "Superseded" go to those profiles.
4. Distribute both versions during a transition: `/.well-known/csaf/v2.0/provider-metadata.json` and `/.well-known/csaf/v2.1/provider-metadata.json`, the unversioned path switching at the roll-over date, and a `v2.0` archive (2.1 §7.4).

## Preview: CSAF 2.1

CSAF 2.1 is at Committee Specification Draft 03 (11 September 2026), with schemas under `https://docs.oasis-open.org/csaf/csaf/v2.1/schema/` and the TC release tag `csaf-2.1-csd-03-20260911-rc1`. Posture: **track**. Do not emit 2.1 documents, profiles, `metrics` or `product_paths`, and do not serve a 2.1 `provider-metadata.json` in production. Watch the `v2.1/` index for a `cs01` folder or an OASIS Standard. When it ships as a CS or OASIS Standard: make CSAF 2.1 current, make CSAF 2.0 supported (consumers and aggregators keep reading it through the transition), re-pin the 2.1 sources, and turn the section above into a tested upgrade checklist.
