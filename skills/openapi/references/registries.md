# OAI registries and specification extensions

Read this before adding any `x-` field. Sources: OAS 3.2.1 § 5, the OAI registries index, the Extension and Namespace registries, and the registry contribution guide.

## Rules from the specification (§ 5)

- Extension field names MUST begin with `x-`. Names beginning with `x-oai-` or `x-oas-` are reserved for uses defined by the OAI.
- The value can be any JSON value.
- Support for any extension is OPTIONAL, and supporting one does not imply supporting another. Consumers must not depend on an extension being understood.
- The OAI maintains registries for extension keywords and for extension namespaces.

## The registries

[spec.openapis.org/registry](https://spec.openapis.org/registry/) lists the Extension, Namespace, Format, Tag Kind, Media Type, Draft Features and Alternative Schema registries. Each has a JSON listing (for example `extension.json` and `namespace.json`) and the site has an RSS feed. Entries are Markdown files under `registries/_<registryName>/` in the `OAI/spec.openapis.org` repository; the file name is the entry name.

### Extension Registry

Each entry documents a description, the objects it may appear in, and a JSON Schema for its value. Kinds of entries:

- **OAI fallbacks** (`x-oai-*`) that carry 3.2 fields in documents targeting earlier versions, such as `x-oai-$self`, `x-oai-additionalOperations`, `x-oai-deprecated`, `x-oai-deviceAuthorization` and `x-oai-itemSchema`. The full table is in [`versions.md`](versions.md). `x-oai-license-identifier` carries the License `identifier` for versions before 3.1.
- **JSON Schema keywords** (`x-jsonschema-*`) for versions that do not support a keyword directly, such as `x-jsonschema-if`, `x-jsonschema-contains` and `x-jsonschema-contentSchema`.
- **Vendor and community extensions** such as `x-codeSamples`, `x-data-classification`, `x-sensitive-data`, `x-jsonld-context`, `x-jsonld-type`, `x-agent-trust` and `x-twitter`.

Use an entry only on the objects it lists and with a value that matches its schema.

### Namespace Registry

A namespace prefix has the form `x-{namespace}-`, and namespace identifiers MUST be registered in lowercase. Registered values at the time of checking:

| Namespace    | Prefix          | Owner or purpose                     |
| ------------ | --------------- | ------------------------------------ |
| `fdx`        | `x-fdx-`        | Financial Data Exchange              |
| `jsonschema` | `x-jsonschema-` | JSON Schema keywords as extensions   |
| `ms`         | `x-ms-`         | Microsoft                            |
| `oai`        | `x-oai-`        | Reserved for the OAI                 |
| `oas-draft`  | `x-oas-draft-`  | OAI, for proposed changes to the OAS |
| `oas`        | `x-oas-`        | Reserved for the OAI                 |
| `sap`        | `x-sap-`        | SAP                                  |
| `scalar`     | `x-scalar-`     | Scalar                               |

Do not write extensions into a namespace you do not own.

## Choosing an extension name

1. Search the Extension Registry. If an entry fits its documented purpose and objects, reuse it (contribution guide: re-use existing extensions to improve interoperability).
2. If the extension is new, prefix it with your own namespace, for example `x-acme-rate-tier`, and register the namespace to avoid future collisions (contribution guide).
3. Never coin a new `x-oai-` or `x-oas-` name (§ 5), and never coin one under `x-oas-draft-`, which the OAI uses for its own proposed changes (Namespace Registry).
4. Document each extension's value schema and the objects it appears on, whether in the OAI registry or your own.

## Registering

The contribution guide describes two options for namespaced extensions: register them in the OAI Extension Registry (OAI contributors review the design and it gains visibility) or in an external registry the namespace owner runs (no OAI review, full control). Either way, registering the namespace itself is good practice.

- **Namespace:** add `registries/_namespace/<name>.md` (no `x-` prefix) with frontmatter `owner`, `issue`, `description`, `layout: default` and `registry` (an external registry URL or `../extension/index.html`), then open a pull request against `main`.
- **Extension:** add `registries/_extension/x-<name>.md` with frontmatter `owner`, `issue`, `description`, `schema` (JSON Schema in YAML), `objects` (the OAS objects where it may be used) and `layout: default`, plus a summary and an example.

Committers review the pull request; merging publishes the entry to the registry site.
