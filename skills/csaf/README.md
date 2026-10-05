# csaf

An agent skill for the OASIS Common Security Advisory Framework (CSAF): writing, validating, converting and distributing CSAF 2.0 security advisories and VEX documents.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill csaf
```

Then ask your agent to "write a CSAF VEX document for CVE-…", "validate this CSAF advisory against the mandatory tests" or "set up provider-metadata.json and a ROLIE feed for our advisories".

## What it covers

- The document model: `document` metadata and tracking, versioning rules, `product_tree` with branches, full product names, product groups, relationships and identification helpers (purl, CPE, hashes, model and serial numbers, SKUs, SBOM URLs), and `vulnerabilities` with CVE, CWE, notes, product status, remediations, CVSS scores, threats, flags and involvements.
- The five profiles (CSAF Base, security incident response, informational advisory, security advisory, VEX), with the VEX impact and action statements and justification flags.
- Mandatory, optional and informative tests, and the 17 conformance targets, including the validator levels.
- Distribution: the 23 requirements, the publisher, provider, trusted provider, lister and aggregator roles, `provider-metadata.json`, `/.well-known/csaf/`, security.txt, ROLIE feeds, hashes, OpenPGP signatures, TLP, and retrieval.
- Converting CVRF 1.2 XML to CSAF 2.0, and what the CSAF 2.1 draft changes.

## Versions

| Line     | Status                  |
| -------- | ----------------------- |
| CSAF 2.1 | preview (track), CSD03  |
| CSAF 2.0 | current, with Errata 01 |
| CVRF 1.2 | legacy (convert from)   |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CSAF Version 2.0](https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html): OASIS Standard, 18 November 2022.
- [CSAF Version 2.0 Errata 01](https://docs.oasis-open.org/csaf/csaf/v2.0/errata01/os/csaf-v2.0-errata01-os.html): OASIS Approved Errata, 26 January 2024.
- [CSAF 2.0 latest stage](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html): OASIS Standard with Errata 01.
- [CSAF 2.0 JSON schema](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json), [provider schema](https://docs.oasis-open.org/csaf/csaf/v2.0/provider_json_schema.json) and [aggregator schema](https://docs.oasis-open.org/csaf/csaf/v2.0/aggregator_json_schema.json).
- [CSAF 2.0 known issues](https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/known_issues.md): TC repository.
- [CSAF Version 2.1 CSD03](https://docs.oasis-open.org/csaf/csaf/v2.1/csd03/csaf-v2.1-csd03.html): Committee Specification Draft 03, 11 September 2026, with its [stage index](https://docs.oasis-open.org/csaf/csaf/v2.1/) and [JSON schema](https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json).
- [oasis-tcs/csaf](https://github.com/oasis-tcs/csaf): TC repository, master at e0da5a9.
- [CSAF CVRF Version 1.2](https://docs.oasis-open.org/csaf/csaf-cvrf/v1.2/csaf-cvrf-v1.2.html): Committee Specification 01, 13 September 2017.
- [CSAF documentation site](https://oasis-open.github.io/csaf-documentation/).

## License

MIT
