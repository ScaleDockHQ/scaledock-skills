# Producing and consuming OpenVEX

Read this when updating or merging documents, embedding VEX in an attestation, signing, consuming VEX in a scanner, or checking OpenVEX against the CISA minimum elements. Sources: `OPENVEX-SPEC.md`, `ATTESTING.md`, the repository README and the CISA Minimum Requirements for VEX, listed in [Sources](../SKILL.md#sources).

## VEX is a timeline

VEX is a sequence of statements, each overriding and enriching the previous ones, so it matters when a statement was made (Spec, The VEX Statement). The typical flow for one CVE is `under_investigation`, then `affected` with an action, then `fixed` once the patch ships, each published as new VEX data (Spec, A Sample Scenario).

## Updating a document

1. Add a new statement rather than editing the old one, so the history stays readable.
2. Increment `version`; any content change requires it (Spec, Document Struct Fields).
3. Set the new document `timestamp` (and `last_updated`).
4. Preserve untouched statements: if a statement inherited the old document timestamp, write that timestamp into the statement before changing the document's. The new statement can inherit the new document timestamp (Spec, Updating Statements with Inherited Data).

```json
{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://openvex.dev/docs/example/vex-9fb3463de1b57",
  "author": "Wolfi J Inkinson",
  "role": "Document Creator",
  "timestamp": "2023-01-09T09:08:42-06:00",
  "version": 2,
  "statements": [
    {
      "timestamp": "2023-01-08T18:02:03-06:00",
      "vulnerability": { "name": "CVE-2023-12345" },
      "products": [{ "@id": "pkg:apk/wolfi/git@2.39.0-r1?arch=armv7" }],
      "status": "under_investigation"
    },
    {
      "vulnerability": { "name": "CVE-2023-12345" },
      "products": [{ "@id": "pkg:apk/wolfi/git@2.39.0-r1?arch=armv7" }],
      "status": "fixed"
    }
  ]
}
```

(Spec, Updating Statements with Inherited Data, with the trailing commas removed.)

## Merging documents

The specification does not define a merge algorithm. The project's `vexctl` CLI creates, merges and attests VEX documents (README, A Set of Tools). What the sources do fix:

- Resolve inheritance before merging: give every statement its effective timestamp and products, because the target document's metadata will differ.
- A statement detached from its document needs a new document that copies the appropriate document metadata from the original (CISA § 3.2).
- The merged document is new content under a new or existing `@id`: its `version` follows the rules above, and its `author` is responsible for every statement in it (CISA § 2.2.3).
- When the merged document is signed, the signer vouches for third-party statements in it (Attesting, Digital Signatures).

## Embedding in an in-toto attestation

OpenVEX does not need an encapsulating document, but it was designed to be an in-toto predicate (Attesting, Embedding and Inheritance). The attestation's `subject` list plays the role of the products.

- Only the product cascades from the attestation; subjects become the products of statements that list none (Attesting, Embedding and Inheritance; The VEX Product and the Attestation's Subject).
- Products SHOULD move from the statements to the attestation subjects. Products MAY stay in a statement, but then they MUST be repeated and matched in `subject`. The attestation SHOULD stay complete when composed with the predicate (Attesting, The VEX Product and the Attestation's Subject).
- The predicate type is set to the OpenVEX context (Attesting, The VEX Product and the Attestation's Subject). The `ATTESTING.md` examples are older than v0.2.0: one uses `https://openvex.dev/ns`, the complete example uses `text/vex`, and both use in-toto Statement `v0.1` and a string `version`. Confirm the predicate type with the verifier, and use the `in-toto` skill for the current Statement layout.

How a processor reads statements for an attested subject (Attesting, Handling Product/Subject Granularity):

1. Statements without products count as attested for every subject.
2. Statements whose products do not include the subject are ignored.
3. Statements that list the subject apply only to that identifier and others that match.
4. A statement that lists one subject but not another MUST be considered for the first but not for the second.

## Signing and identity

- `author` identity SHOULD be cryptographically associated with the signature (Spec, Document Struct Fields). Attestations SHOULD be signed with the identity in `author` when possible (Attesting, Digital Signatures).
- CISA asks that VEX documents and statements SHOULD be signed, that a signature MUST cover all document metadata and all statements, and that a statement MAY rely on the containing document's signature (CISA § 3.3).
- VEX authors SHOULD use their identity as a namespace for document and statement ids (CISA § 3.5).

## Consuming

1. Validate the document against the JSON Schema for its `@context` version. Upgrade v0.0.2 input first.
2. Resolve inheritance: statement timestamp, else document timestamp, else the encapsulating document's; statement products, else the encapsulating document's (Spec, Inheritance Flow). Reject statements that are still incomplete (Spec, Data Inheritance).
3. Match a scanner finding to a statement by product (`@id`, `identifiers`, `hashes`) and by vulnerability `name` or any of its `aliases` (Spec, Product Data Structure; Spec, Vulnerability Data Structure). Subcomponent identifiers let scanners match the component they flagged (Spec v0.0.2, Statement Fields).
4. For each product and vulnerability pair, order matching statements by timestamp and apply the newest status; later statements override earlier ones (Spec, The VEX Statement).
5. Act on the status: suppress or annotate the finding for `not_affected` and `fixed`, keep it for `affected` and show the `action_statement`, keep it as pending for `under_investigation`. Scanners can stop alerting on a CVE that VEX says no longer affects the product (Spec, A Sample Scenario; Spec, Example). Key automated policies on `justification`, not on `impact_statement` text (Spec, Status Justifications; Spec, Note on `justification` and `impact_statement`).
6. Decide whose VEX to trust: check the signature and that the signer matches `author`.

## CISA minimum elements and OpenVEX

OpenVEX states that it meets all requirements of a valid VEX implementation as defined in the CISA Minimum Requirements for VEX of April 2023 (Spec, Overview). The mapping, from the CISA element names (CISA, Annex A) to the OpenVEX fields:

| CISA element                                    | OpenVEX field                                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `[doc_id]` (§ 2.2.1)                            | document `@id`                                                                                                  |
| `[doc_version]` (§ 2.2.2)                       | document `version`                                                                                              |
| `[author]`, `[author_role]` (§ 2.2.3–2.2.4)     | `author`, `role`                                                                                                |
| `[tooling]` (§ 2.2.5)                           | `tooling`                                                                                                       |
| `[doc_time_first_issued]` (§ 2.2.6)             | document `timestamp`                                                                                            |
| `[doc_time_last_updated]` (§ 2.2.7)             | document `last_updated`                                                                                         |
| `[statement_id]`, `[statement_version]` (§ 2.4) | statement `@id`, `version`                                                                                      |
| `[statement_time_*]` (§ 2.4.3–2.4.4)            | statement `timestamp`, `last_updated`                                                                           |
| `[product_id]`, `[subcomponent_id]` (§ 2.5)     | `products`, `subcomponents`                                                                                     |
| `[supplier]` (§ 2.5.3)                          | statement `supplier`                                                                                            |
| `[vul_id]`, `[vul_description]` (§ 2.6)         | `vulnerability.name`, `vulnerability.description`                                                               |
| `[status]` and its children (§ 2.7)             | `status`, `justification`, `impact_statement`, `action_statement`, `action_statement_timestamp`, `status_notes` |

CISA makes some of these MUST where OpenVEX makes them optional: a last-updated time on the document and each statement (§ 2.2.7, § 2.4.4), a statement version (§ 2.4.2), and a vulnerability description included or referenced (§ 2.6.2). When a consumer checks against the CISA elements, set `last_updated`, give `vulnerability` an `@id` that resolves to a description or fill `description`, and set statement `@id` so each statement can be referenced (§ 2.4.1).

## Common mistakes

- An unversioned `@context` (`https://openvex.dev/ns`) on a v0.2.0 document: it means v0.0.1.
- String `vulnerability` or string `products`: that is v0.0.2.
- `hashes` or `identifiers` as lists of objects, copied from the OPEV-0014 proposal: v0.2.0 uses maps.
- `not_affected` with only an `impact_statement`: valid, but automation cannot act on it.
- `affected` without `action_statement`: invalid.
- One statement for products with different statuses.
- Editing a statement in place without bumping `version`, or changing the document `timestamp` so that older statements silently inherit the new time.
- `author` set to a tool name: tools go in `tooling` (CISA § 2.2.3).
- Using the `public` IRI namespace for production documents.
