# Document and statements (OpenVEX v0.2.0)

Read this when building or parsing an OpenVEX document. Sources: `OPENVEX-SPEC.md`, `openvex_json_schema.json` and `ns/v0.2.0/context.json` on `main`, listed in [Sources](../SKILL.md#sources). "Spec" cites a heading of `OPENVEX-SPEC.md`; "Schema" cites the JSON Schema.

## The model

A statement joins products, a vulnerability and a status at a point in time (Spec, The VEX Statement). A document groups one or more statements and carries metadata that statements can inherit (Spec, VEX Documents). OpenVEX documents are JSON-LD and MUST be UTF-8 (Spec, Document).

## Document fields

| Field          | Required | Rule                                                                                                                                                 |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`     | yes      | `https://openvex.dev/ns/v0.2.0`. Without a version it means v0.0.1 (Spec, Document Struct Fields).                                                   |
| `@id`          | yes      | IRI identifying the document (Spec, Document Struct Fields).                                                                                         |
| `author`       | yes      | Individual or organization; ideally machine-readable (IRI, email). SHOULD be cryptographically tied to the signature (Spec, Document Struct Fields). |
| `role`         | no       | Role of the author.                                                                                                                                  |
| `timestamp`    | yes      | When the document was issued. A document MUST define it (Spec, Definitions, Document).                                                               |
| `last_updated` | no       | Last modification of the document.                                                                                                                   |
| `version`      | yes      | Incremented on any content change, statements included (Spec, Document Struct Fields). Integer, minimum 1 (Schema).                                  |
| `tooling`      | no       | Tools or automated processes that generated the document or statements.                                                                              |
| `statements`   | yes      | The statements. At least one, unique items (Schema).                                                                                                 |

Timestamps are `date-time` strings (Schema), for example `2023-01-08T18:02:03.647787998-06:00` (Spec, Document).

### Document `@id`

The `@id` is an IRI (RFC 3987); OpenVEX extends the VEX document identifier this way, and adds `@context`, so JSON-LD processors can parse documents (Spec, VEX Extensions). Authors MAY mint IRIs under `https://openvex.dev/docs/[name]`. Two names are reserved: `public`, for demos or experiments where collisions do not matter, and `example`, for documentation. OpenVEX runs no registry, hosting or redirection for these IRIs (Spec, Public IRI Namespaces). Outside demos and documentation, use a project name of your own under the shared namespace, or any other IRI.

## Statement fields

| Field                        | Required    | Rule                                                                                                                                                            |
| ---------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@id`                        | no          | IRI that makes the statement referenceable.                                                                                                                     |
| `version`                    | no          | Statement version. "Defaults to zero, required when incremented" (Spec, Statement Fields); the Schema sets minimum 1, so omit it until it is first incremented. |
| `vulnerability`              | yes         | Vulnerability struct, below.                                                                                                                                    |
| `timestamp`                  | no          | When the statement was known to be true. Inherited from the document when absent.                                                                               |
| `last_updated`               | no          | When the statement was last updated.                                                                                                                            |
| `products`                   | no          | Product structs. Optional in the struct only because they can come from the encapsulating document; a complete statement needs them.                            |
| `status`                     | yes         | `not_affected`, `affected`, `fixed` or `under_investigation`.                                                                                                   |
| `supplier`                   | no          | Supplier of the product or subcomponent.                                                                                                                        |
| `status_notes`               | no          | MAY say how the status was determined and MAY reference other VEX information.                                                                                  |
| `justification`              | conditional | For `not_affected`: this or `impact_statement` MUST be present.                                                                                                 |
| `impact_statement`           | conditional | For `not_affected`: free text on why the vulnerability cannot be exploited. Highly discouraged for automation.                                                  |
| `action_statement`           | conditional | For `affected`: MUST be present, SHOULD describe remediation or mitigation.                                                                                     |
| `action_statement_timestamp` | no          | When the action statement was issued.                                                                                                                           |

All rows: Spec, Statement Fields. The Schema enforces `vulnerability` and `status` as required, forbids other fields, and encodes the `not_affected` and `affected` conditions.

## Product and component

A product MUST be addressable through one of the mechanisms OpenVEX offers; each mechanism is optional, but a valid statement MUST identify a product (Spec, Product Data Structure). Products and subcomponents share the abstract `Component` type; a product adds `subcomponents` (Spec, Product Data Structure).

| Field           | On                    | Rule                                                                                                                                                                                                |
| --------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@id`           | product, subcomponent | IRI. A purl is a valid IRI, so `@id` can be a purl.                                                                                                                                                 |
| `identifiers`   | product, subcomponent | Map from identifier type to identifier: `purl`, `cpe22`, `cpe23` (Spec, Appendix B). Purl is favoured.                                                                                              |
| `hashes`        | product, subcomponent | Map from hash name to value. Names: `md5`, `sha1`, `sha-256`, `sha-384`, `sha-512`, `sha3-224`, `sha3-256`, `sha3-384`, `sha3-512`, `blake2s-256`, `blake2b-256`, `blake2b-512` (Spec, Appendix A). |
| `subcomponents` | product               | Component structs for the parts where the vulnerability originates (Spec, Component Fields).                                                                                                        |

The Schema requires `@id` or `identifiers` on every product and subcomponent, at least one key in `identifiers`, and no keys outside the tables above.

List as many identifiers as possible so processors can match the product; purls are recommended (Spec, Product Data Structure). Subcomponents SHOULD list software identifiers and SHOULD also appear in the product SBOM; they are most often dependencies (Spec, Definitions, Subcomponent).

```json
{
  "@id": "pkg:apk/wolfi/product@1.23.0-r1?arch=armv7",
  "identifiers": { "purl": "pkg:apk/wolfi/product@1.23.0-r1?arch=armv7" },
  "hashes": {
    "sha-256": "402fa523b96591d4450ace90e32d9f779fcfd938903e1c5bf9d3701860b8f856"
  },
  "subcomponents": [
    {
      "@id": "pkg:maven/org.apache.logging.log4j/log4j-core@2.4",
      "identifiers": {
        "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.4",
        "cpe23": "cpe:2.3:a:apache:log4j:2.4:*:*:*:*:*:*:*"
      }
    }
  ]
}
```

(Spec, Example Product Struct.)

## Vulnerability

| Field         | Required | Rule                                                                   |
| ------------- | -------- | ---------------------------------------------------------------------- |
| `@id`         | no       | IRI for the vulnerability, for example its NVD page.                   |
| `name`        | yes      | The main identifier, such as `CVE-2019-17571`.                         |
| `description` | no       | Free text.                                                             |
| `aliases`     | no       | Other names in other databases. Repeating `name` here is not an error. |

(Spec, Vulnerability Struct Fields.) Documents SHOULD use global, well-known identifiers; a private id is allowed only if everyone in the supply chain understands it (Spec, Definitions, Vulnerability).

## Inheritance

A complete statement has products, a status, a vulnerability and a timestamp; products and timestamps can be defined outside the statement, but a document with incomplete statements is not valid (Spec, Data Inheritance).

- Timestamps: statement overrides document, which overrides the encapsulating document (Spec, Inheritance Flow, Timestamps). Statements issued together can drop their own timestamp and inherit the document's (Spec, Data Economy).
- Products: a statement's products override product data from the encapsulating document (Spec, Inheritance Flow, Product ID). In an in-toto attestation the subjects become the products of statements that list none (Attesting, The VEX Product and the Attestation's Subject). In CSAF, product identification can be left to the CSAF product tree (Spec, Encapsulating Format).

## JSON-LD

The v0.2.0 context maps fields to `https://openvex.dev/ns/v0.2.0#` terms and types `timestamp`, `last_updated` and `action_statement_timestamp` as `xsd:dateTime` and `version` as `xsd:integer` (context.json). The context also lets OpenVEX reference resources in other JSON-LD formats such as SPDX 3 (Spec, OpenVEX and JSON-LD).

## Full example

```json
{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://openvex.dev/docs/example/vex-9fb3463de1b57",
  "author": "Wolfi J Inkinson",
  "role": "Document Creator",
  "timestamp": "2023-01-08T18:02:03.647787998-06:00",
  "version": 1,
  "statements": [
    {
      "vulnerability": { "name": "CVE-2023-12345" },
      "products": [
        { "@id": "pkg:apk/wolfi/git@2.39.0-r1?arch=armv7" },
        { "@id": "pkg:apk/wolfi/git@2.39.0-r1?arch=x86_64" }
      ],
      "status": "fixed"
    }
  ]
}
```

(Spec, Document.)

## Where the sources disagree

- Several spec examples are not valid JSON (trailing commas, missing commas in the Spring Boot example). Copy the shapes, not the punctuation.
- The Status Labels table says `not_affected` requires a `justification`; the Statement Fields table and the Schema accept a `justification` or an `impact_statement`. Write a justification and the check passes either way.
- `ATTESTING.md` shows `"version": "1"` as a string; the Schema and context require an integer.
- Statement `version` "defaults to zero" in the text but has minimum 1 in the Schema.
