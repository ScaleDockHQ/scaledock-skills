# Status and justifications

Read this when deciding what a statement says. Sources: `OPENVEX-SPEC.md` (Status Labels, Status Justifications, Statement Fields) and the CISA Minimum Requirements for VEX § 2.7, listed in [Sources](../SKILL.md#sources). OpenVEX takes its status and justification labels from the VEX Working Group documents (Spec, Status Labels; Spec, Status Justifications).

## Status labels

| Status                | Meaning (Spec, Status Labels)                                                                  | Required with it                      |
| --------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| `not_affected`        | No remediation is required.                                                                    | `justification` or `impact_statement` |
| `affected`            | Actions are recommended to remediate or address the vulnerability.                             | `action_statement`                    |
| `fixed`               | These product versions contain a fix.                                                          | nothing extra                         |
| `under_investigation` | Not yet known whether these versions are affected. Updates should follow as knowledge evolves. | nothing extra                         |

A statement has exactly one status, and it applies to every product in the statement (Spec, Statement Fields; CISA § 2.7.1). VEX implies no default status: a product with no statement has no VEX status, and VEX information may be incomplete (CISA § 2.0). `under_investigation` is expected to change once the investigation concludes (CISA § 2.7.1.4).

## Justifications for `not_affected`

Machine-readable labels, so policies can act on them (Spec, Status Justifications):

| Justification                                       | Use when                                                                                                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `component_not_present`                             | The vulnerable component is not included. May be used preemptively for a widespread vulnerability users ask about.                               |
| `vulnerable_code_not_present`                       | The component is included, but the vulnerable code is not, typically because of how the source was configured or built.                          |
| `vulnerable_code_not_in_execute_path`               | The vulnerable code (likely in a subcomponent) is included but the product does not call or use it.                                              |
| `vulnerable_code_cannot_be_controlled_by_adversary` | The vulnerable code is present and used, but an attacker cannot control it to exploit the vulnerability. Can be hard to prove.                   |
| `inline_mitigations_already_exist`                  | Built-in protections prevent exploitation; the attacker cannot subvert them and the user cannot configure or disable them. Can be hard to prove. |

The "present and used" wording for `vulnerable_code_cannot_be_controlled_by_adversary` comes from CISA § 2.7.1.1.3.4.

### Choosing one

Walk the labels in table order and stop at the first that holds for the shipped product:

1. Is the vulnerable component in the product at all? If not, `component_not_present`.
2. Is the vulnerable code compiled or packaged in? If not, `vulnerable_code_not_present`.
3. Can the product reach the vulnerable code? If not, `vulnerable_code_not_in_execute_path`.
4. Can an attacker control the input to it? If not, `vulnerable_code_cannot_be_controlled_by_adversary`.
5. Do non-configurable built-in protections block every known attack vector? If so, `inline_mitigations_already_exist`.
6. If none holds, the status is not `not_affected`: use `affected` with an action, or `under_investigation`.

The order follows the descriptions above, from "not there" to "there but unreachable" to "reachable but blocked". The last two labels carry the spec's warning that they are hard to prove, and mitigation bypasses are common (Spec, Status Justifications).

## Impact statement

Free text explaining why the product is not affected. It is not machine-readable, and its use is highly discouraged for automated systems (Spec, Statement Fields). Issuers SHOULD use a justification and MAY enrich it with an impact statement (Spec, Note on `justification` and `impact_statement`):

```json
{
  "vulnerability": { "name": "CVE-2023-12345" },
  "products": [{ "@id": "pkg:apk/wolfi/product@1.23.0-r1?arch=armv7" }],
  "status": "not_affected",
  "justification": "component_not_present",
  "impact_statement": "The vulnerable code was removed with a custom patch"
}
```

## Action statement

For `affected`, the statement MUST include an `action_statement` that SHOULD describe how to remediate or mitigate (Spec, Statement Fields). `action_statement_timestamp` records when it was issued.

```json
{
  "vulnerability": { "name": "CVE-2023-12345" },
  "products": [{ "@id": "pkg:apk/wolfi/git@2.39.0-r1?arch=x86_64" }],
  "status": "affected",
  "action_statement": "Upgrade to git 2.39.1-r0, or disable the affected transport until then.",
  "action_statement_timestamp": "2023-01-09T10:00:00Z"
}
```

## Status notes

`status_notes` MAY say how the status was determined and MAY reference other VEX information (Spec, Statement Fields). Use it for evidence such as "reachability analysis of release 2.39.0-r1", not for the reason a product is not affected; that is the justification.

## Mixed results

When one vulnerability affects some products and not others, write one statement per status, each with its own product list. A statement may cover several products only if status and the rest of its information hold for all of them (CISA § 3.1.2). A common case is a `subcomponent` that is affected while the product is `not_affected` (CISA § 2.5.2): list the subcomponent under the product and use a justification such as `vulnerable_code_not_in_execute_path`.
