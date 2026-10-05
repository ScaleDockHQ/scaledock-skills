# Profiles and VEX

Read this when choosing `document.category`, checking which elements a profile requires, or writing VEX statements in CSAF. Section numbers are CSAF 2.0 (OASIS Standard) unless marked 2.1.

## Profile rules

`document.category` identifies the profile (§4):

1. Every document MUST conform to CSAF Base.
2. A profile extends CSAF Base, directly or through another profile; it can add requirements but never remove or override them.
3. Any optional field may be added without breaking a profile, unless the profile forbids that field.
4. Values starting with `csaf_` are reserved for profiles in the standard.
5. A value that matches no profile in section 4 is validated against CSAF Base.
6. Local or private profiles MAY exist; when an official and a private profile both exist, tools MUST validate against the official one.

## The five CSAF 2.0 profiles

| Profile                           | `document.category`                    | Required beyond CSAF Base                                                                                                                                                                                                                                                              |
| --------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSAF Base (§4.1)                  | `csaf_base`, or any non-reserved value | `category`, `csaf_version`, `publisher.category`, `publisher.name`, `publisher.namespace`, `title`, `tracking.current_release_date`, `tracking.id`, `tracking.initial_release_date`, `tracking.revision_history[].date`, `.number`, `.summary`, `tracking.status`, `tracking.version`. |
| Security incident response (§4.2) | `csaf_security_incident_response`      | `document.notes` with an item of category `description`, `details`, `general` or `summary`; `document.references` with an `external` item.                                                                                                                                             |
| Informational Advisory (§4.3)     | `csaf_informational_advisory`          | The same notes and references as above, and `vulnerabilities` SHALL NOT exist. If `product_tree` exists, users MUST assume every product in it is affected.                                                                                                                            |
| Security Advisory (§4.4)          | `csaf_security_advisory`               | `product_tree` listing every product referenced, `vulnerabilities`, and `notes` and `product_status` in each vulnerability.                                                                                                                                                            |
| VEX (§4.5)                        | `csaf_vex`                             | See below.                                                                                                                                                                                                                                                                             |

Use each profile for its purpose (§4.2 to §4.5): incident response for a breach or incident (including one at another party); informational advisories for issues that are not vulnerabilities, such as misconfiguration; security advisories for vulnerabilities and their remediations; VEX to say whether, and why, a product is or is not affected.

### Naming a CSAF Base category

The CSAF Base value SHALL NOT equal a value reserved for another profile, or the case-insensitive name of another profile, ignoring underscores, dashes and white space. `CSAF Security Advisory` and `csaf security advisory` are therefore invalid; `csaf_base` is the explicit choice (§4.1; test 6.1.26). An issuer that cannot use `csaf_base` may prepend its publisher name and drop the string "CSAF", as in `Example Company Security Advisory` (§4.1).

## The VEX profile

A `csaf_vex` document SHALL have (§4.5):

- all CSAF Base elements;
- `product_tree` listing every product referenced;
- `vulnerabilities`;
- in each vulnerability, at least one of `product_status.fixed`, `known_affected`, `known_not_affected`, `under_investigation`;
- in each vulnerability, at least one of `cve` and `ids`;
- `notes` in each vulnerability.

And for each product:

- **`known_not_affected`**: an impact statement, either a machine-readable flag in `flags` or a human-readable threat in `threats` with `category` `impact` whose `details` say why the vulnerability cannot be exploited.
- **`known_affected`**: an action statement in `remediations`. `no_fix_planned` and `none_available` are allowed as action statements. `notes` and `threats` MAY add more.

Product Group IDs may be used in `remediations` and `threats`, but every Product ID in a status list MUST end up covered, directly or through a group (§4.5).

### Justification flags

`flags[].label` values, with the meaning the standard gives (§3.2.3.5):

| Label                                               | Meaning                                                                                   |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `component_not_present`                             | The vulnerable component is not in the product.                                           |
| `vulnerable_code_not_present`                       | The component is present, but the vulnerable code is not (for example, compiler options). |
| `vulnerable_code_cannot_be_controlled_by_adversary` | The vulnerable code is present but used in a way an attacker cannot exploit.              |
| `vulnerable_code_not_in_execute_path`               | The affected code is not reachable, including in unanticipated states.                    |
| `inline_mitigations_already_exist`                  | Built-in controls or mitigations prevent exploitation.                                    |

Every flag names `product_ids` or `group_ids` (test 6.1.32), and a product, directly or through a group, is in at most one flag with a VEX justification per vulnerability (test 6.1.33).

### Example

A minimal VEX vulnerability with one not affected and one affected product (the `document` and `product_tree` are omitted):

```json
"vulnerabilities": [
  {
    "cve": "CVE-2026-12345",
    "notes": [
      { "category": "description", "text": "Remote code execution in the example parser." }
    ],
    "product_status": {
      "known_affected": ["CSAFPID-0002"],
      "known_not_affected": ["CSAFPID-0001"]
    },
    "flags": [
      { "label": "vulnerable_code_not_in_execute_path", "product_ids": ["CSAFPID-0001"] }
    ],
    "remediations": [
      {
        "category": "vendor_fix",
        "details": "Update to version 2.4.1.",
        "product_ids": ["CSAFPID-0002"]
      }
    ]
  }
]
```

### Profile tests

Mandatory test 6.1.27 groups the profile checks; each applies only to the listed categories (§6.1.27):

| Test      | Check                                                                                                | Categories                                         |
| --------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 6.1.27.1  | `document.notes` has a `description`, `details`, `general` or `summary` item                         | informational advisory, security incident response |
| 6.1.27.2  | `document.references` has an `external` item                                                         | informational advisory, security incident response |
| 6.1.27.3  | `vulnerabilities` does not exist                                                                     | informational advisory                             |
| 6.1.27.4  | `product_tree` exists                                                                                | security advisory, VEX                             |
| 6.1.27.5  | each vulnerability has `notes`                                                                       | security advisory, VEX                             |
| 6.1.27.6  | each vulnerability has `product_status`                                                              | security advisory                                  |
| 6.1.27.7  | each vulnerability has one of `fixed`, `known_affected`, `known_not_affected`, `under_investigation` | VEX                                                |
| 6.1.27.8  | each vulnerability has `cve` or `ids`                                                                | VEX                                                |
| 6.1.27.9  | each `known_not_affected` product has an impact statement in `flags` or `threats`                    | VEX                                                |
| 6.1.27.10 | each `known_affected` product has an action statement in `remediations`                              | VEX                                                |
| 6.1.27.11 | `vulnerabilities` exists                                                                             | security advisory, VEX                             |

## CSAF 2.1 profiles (draft, track only)

CSAF 2.1 CSD03 keeps the five profiles and adds four (2.1 §4.6 to §4.9). Do not emit them while 2.1 is a draft.

- `csaf_deprecated_security_advisory`: the CSAF 2.0 Security Advisory rules, for converted or legacy documents; SHOULD NOT be used for new documents. Values starting `csaf_deprecated_` mark deprecated official profiles.
- `csaf_withdrawn`: exactly one `description` note titled `Reasoning for Withdrawal`, at least two revision items, and no `product_tree` or `vulnerabilities`.
- `csaf_superseded`: exactly one `description` note titled `Reasoning for Supersession`, at least two revision items, an `external` reference whose `summary` starts `Superseding Document`, and no `product_tree` or `vulnerabilities`.
- `csaf_vulnerability_report`: a private report exchanged during coordinated vulnerability disclosure, with `product_tree`, `cve` or `ids`, a summary or description note with a fixed title, `product_status.known_affected`, and TLP:AMBER recommended.

In 2.1 the Security Advisory profile also requires `cve` or `ids`, `known_affected`, and the affected counterpart of each `fixed` product (2.1 §4.4). The VEX profile keeps the same requirements, written with JSONPath and SHALL (2.1 §4.5).

## Other VEX formats

CSAF VEX is a full CSAF document: it needs publisher, tracking and a product tree, and it is distributed and signed like any advisory (§4.5, §7). For the OpenVEX format, see the `openvex` skill; for VEX in CycloneDX, see the `cyclonedx` skill.
