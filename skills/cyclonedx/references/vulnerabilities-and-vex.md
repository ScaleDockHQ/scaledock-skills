# Vulnerabilities, VEX and VDR

Read this when adding vulnerability data to a BOM, writing a VEX or VDR, or consuming one. Sources: the 1.7 JSON Schema at tag 1.7.2 (`vulnerability` and related definitions), ECMA-424 2nd edition § 5 and § 6.11, and the CycloneDX VEX and VDR capability pages, listed in [Sources](../SKILL.md#sources).

## Three uses of one object

- **BOV**: a BOM that consists solely of vulnerabilities, to share vulnerability data between systems (ECMA-424 § 5).
- **VDR**: known and unknown vulnerabilities affecting components and services, for disclosure programmes and internal remediation; CycloneDX "exceeds the data field requirements defined in ISO/IEC 29147:2018" (ECMA-424 § 5; VDR page). A VDR can state how complete its vulnerability intelligence is (VDR page) through `compositions[].vulnerabilities` with an `aggregate` (schema `compositions`).
- **VEX**: the exploitability of vulnerable components in the context of the product they are used in; "VEX is a subset of VDR" (ECMA-424 § 5; VEX page). In CycloneDX, VEX is the `analysis` object on each vulnerability.

## The vulnerability object

`vulnerabilities[]` (§ 6.11; schema `vulnerability`). No property is required by the schema, but a useful entry has:

| Property                                                | Content                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bom-ref`                                               | Unique reference, for compositions, annotations and links.                                                                                                                                                                                                                        |
| `id`                                                    | The identifier, for example `CVE-2021-39182` or `GHSA-35m5-8cvj-8783`.                                                                                                                                                                                                            |
| `source`                                                | `name` and `url` of the publisher, for example NVD.                                                                                                                                                                                                                               |
| `references[]`                                          | Equivalent IDs in other sources (`id` and `source` both required).                                                                                                                                                                                                                |
| `ratings[]`                                             | `source`, `score`, `severity` (`critical`, `high`, `medium`, `low`, `info`, `none`, `unknown`), `method` (`CVSSv2`, `CVSSv3`, `CVSSv31`, `CVSSv4`, `OWASP`, `SSVC`, `other`), `vector`, `justification`. Consumers SHOULD consider ratings when prioritizing; sources may differ. |
| `cwes[]`                                                | CWE IDs as integers.                                                                                                                                                                                                                                                              |
| `description`, `detail`, `recommendation`, `workaround` | Text from the source; `workaround` is a usually temporary bypass.                                                                                                                                                                                                                 |
| `proofOfConcept`                                        | `reproductionSteps`, `environment`, `supportingMaterial`.                                                                                                                                                                                                                         |
| `advisories[]`                                          | Advisories, each with a required `url` and optional `title`.                                                                                                                                                                                                                      |
| `created`, `published`, `updated`, `rejected`           | Record timestamps.                                                                                                                                                                                                                                                                |
| `credits`                                               | `organizations` and `individuals` credited with discovery.                                                                                                                                                                                                                        |
| `tools`                                                 | Object with `components` and `services` that found or scored it (the array form is deprecated).                                                                                                                                                                                   |
| `analysis`                                              | The VEX assessment (below).                                                                                                                                                                                                                                                       |
| `affects[]`                                             | What is affected (below).                                                                                                                                                                                                                                                         |
| `properties`                                            | Name-value extensions.                                                                                                                                                                                                                                                            |

## `affects`

Each entry needs `ref`: a `bom-ref` in the same BOM, or a BOM-Link element into another BOM. `versions[]` holds either a single `version` or a vers `range`, each with `status` `affected` (default), `unaffected` or `unknown` (schema `vulnerability.affects`, `affectedStatus`).

## `analysis` (VEX)

| Field                        | Values (schema)                                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`                      | `resolved` (remediated), `resolved_with_pedigree` (remediated, with commits or diffs in the component's `pedigree`), `exploitable` (may be directly or indirectly exploitable), `in_triage` (being investigated), `false_positive` (falsely identified or associated), `not_affected` (the component or service is not affected). |
| `justification`              | `code_not_present`, `code_not_reachable`, `requires_configuration`, `requires_dependency`, `requires_environment`, `protected_by_compiler`, `protected_at_runtime`, `protected_at_perimeter`, `protected_by_mitigating_control`. "Justification should be specified for all not_affected cases."                                  |
| `response[]`                 | `can_not_fix`, `will_not_fix`, `update`, `rollback`, `workaround_available`. More than one is allowed; "strongly encouraged" when the state is `exploitable`.                                                                                                                                                                     |
| `detail`                     | How the impact was assessed. If not exploitable, it "should include specific details on why".                                                                                                                                                                                                                                     |
| `firstIssued`, `lastUpdated` | When the analysis was first issued and last changed (1.5 and later).                                                                                                                                                                                                                                                              |

## Patterns

### Inline VEX

Put `vulnerabilities` with `analysis` in the SBOM itself. Simple, but every analysis change means a new BOM `version`.

### Standalone VEX linked to an SBOM

A separate BOM (its own `serialNumber`) contains only `vulnerabilities`, and each `affects[].ref` is a BOM-Link element into the SBOM. The SBOM can point back with an external reference of type `exploitability-statement`. The VEX can then change on its own schedule.

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "serialNumber": "urn:uuid:f08a6ccd-4dce-4759-bd84-c626675d60a7",
  "version": 3,
  "vulnerabilities": [
    {
      "id": "CVE-2021-44228",
      "source": {
        "name": "NVD",
        "url": "https://nvd.nist.gov/vuln/detail/CVE-2021-44228"
      },
      "analysis": {
        "state": "not_affected",
        "justification": "code_not_reachable",
        "detail": "The JNDI lookup class is removed from the shipped jar during the build.",
        "firstIssued": "2026-09-01T10:00:00Z",
        "lastUpdated": "2026-10-05T10:00:00Z"
      },
      "affects": [
        {
          "ref": "urn:cdx:3e671687-395b-41f5-a30f-a58921a69b79/1#pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
        }
      ]
    }
  ]
}
```

### VDR

List every known vulnerability with `ratings`, `recommendation` and `affects`, add `analysis` where triaged, and declare completeness with a composition such as `{"aggregate": "complete", "vulnerabilities": [<bom-refs>]}` (schema `compositions.vulnerabilities`).

## Consumer rules

- Match `affects[].ref` to the exact component (by `bom-ref`, or by following the BOM-Link to the referenced BOM version).
- Use the highest `version` of a VEX with a given `serialNumber` (ECMA-424 § 6.4); compare `analysis.lastUpdated` within it.
- Treat `in_triage` ("being investigated") and a missing `analysis` as not yet assessed, not as safe.
- Read `affects[].versions[].status` for each version or range; when it is absent the default is `affected` (schema `vulnerability.affects`).

## Common mistakes

- `not_affected` without a `justification` or `detail`.
- `resolved_with_pedigree` without commits or patches in the affected component's `pedigree`.
- A standalone VEX whose BOM-Links point to an SBOM version that no longer exists, or that uses `urn:uuid:` in the link.
- Using `false_positive` for "present but not exploitable"; that is `not_affected` with a justification.

For VEX in other formats, see the `openvex` and `csaf` skills.
