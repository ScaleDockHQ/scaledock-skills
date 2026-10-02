# Document structure and core objects

Read this when laying out or reviewing an OpenAPI Description. Section numbers are from OAS 3.2.1.

## OpenAPI Object (§ 4.1)

| Field                             | Rule                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi`                         | REQUIRED. The OAS version the document uses; tooling SHOULD use it to interpret the document. Not related to `info.version` (§ 4.1.1). |
| `$self`                           | A URI reference that is the document's own URI and its base URI. When present, references to this document MUST use it (§ 4.1.1).      |
| `info`                            | REQUIRED. Info Object (§ 4.2); `title` and `version` are required there.                                                               |
| `jsonSchemaDialect`               | Default `$schema` for Schema Objects in the document (§ 4.1.1, § 4.24.7).                                                              |
| `servers`                         | Absent or empty means one server with `url: /` (§ 4.1.1).                                                                              |
| `paths`, `webhooks`, `components` | At least one MUST be present (§ 4.1.1).                                                                                                |
| `security`                        | Default Security Requirements; see [`security.md`](security.md).                                                                       |
| `tags`                            | Tag Objects; each name MUST be unique (§ 4.1.1).                                                                                       |
| `externalDocs`                    | External Documentation Object.                                                                                                         |

An OAD can span several documents. Every document in it has an OpenAPI Object or a Schema Object at the root and MUST be parsed completely before any reference is treated as unresolvable (§ 4.1.2, § 4.1.2.1). Name the entry document `openapi.json` or `openapi.yaml` (RECOMMENDED, § 4.1.2). Fragments in references to JSON or YAML documents are JSON Pointers (§ 4.1.2.2.2).

## Paths and Path Items (§ 4.8, § 4.9)

- Path keys MUST begin with `/` and are appended to the server URL (§ 4.8.1).
- Concrete paths match before templated ones. `/pets/{petId}` and `/pets/{name}` are identical and invalid together (§ 4.8.2.1).
- Each template expression MUST have a matching path parameter on the Path Item and/or each operation, and appears at most once per path (§ 4.8.2). Template values MUST NOT contain unescaped `/`, `?` or `#` (§ 4.8.2).
- A Path Item holds one Operation Object per method: `get`, `put`, `post`, `delete`, `options`, `head`, `patch`, `trace` and, new in 3.2, `query` (RFC 10008). Other methods go in `additionalOperations`, keyed by the method with the capitalization sent on the wire; it MUST NOT repeat a method that has its own field (§ 4.9.1).
- Path Item `parameters` apply to every operation and can be overridden but not removed by an operation (§ 4.9.1).
- The Paths Object and a Path Item MAY be empty because of access control (§ 4.8, § 4.9, § 6.4).

## Operation Object (§ 4.10)

- `operationId` MUST be unique among all operations in the API and is case-sensitive; following common programming naming conventions is RECOMMENDED (§ 4.10.1).
- `parameters` MUST NOT contain duplicates; uniqueness is `name` plus `in` (§ 4.10.1).
- `requestBody` is well defined only for methods whose HTTP semantics define a body; avoid it on GET and DELETE (§ 4.10.1).
- `security` overrides the top-level `security`; `[]` removes it; an `{}` entry makes authentication optional (§ 4.10.1).
- `deprecated: true` tells consumers to stop using the operation (§ 4.10.1).

## Parameter Object (§ 4.12)

| `in`          | Rules                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`        | `required` MUST be `true`; `name` MUST match one template expression (§ 4.12.2.1).                                                                                      |
| `query`       | MUST NOT share an operation or path item with `querystring` (§ 4.12.1).                                                                                                 |
| `querystring` | The whole query string as one value, described with `content`; at most once (§ 4.12.1). `schema`, `style`, `explode` and `allowReserved` MUST NOT be used (§ 4.12.2.2). |
| `header`      | A parameter named `Accept`, `Content-Type` or `Authorization` SHALL be ignored (§ 4.12.2.1); describe those through `content` and security instead.                     |
| `cookie`      | Use `style: cookie` (SHOULD); `explode: false` is invalid for cookies (§ 4.12.2.2).                                                                                     |

A parameter has `schema` or `content`, not both, and `content` has exactly one entry (§ 4.12.2, § 4.12.2.3). `example` and `examples` are mutually exclusive (§ 4.12.2.1). Style and `in` combinations not listed in the Style Values table are not permitted (§ 4.12.3).

## Media types and streaming (§ 4.14)

- `schema` describes the complete content. `itemSchema` describes each item of a sequential media type such as `text/event-stream`, `application/jsonl` or `application/json-seq`, and MUST be applied to each item independently (§ 4.14.1, § 4.14.3.1.1).
- Implementations MUST treat a sequential media type as an array of its items (§ 4.14.3.1).
- For `text/event-stream`, schemas apply to parsed events; `data` and other fields without a defined type are strings, and `retry` is an integer (§ 4.14.4). Describe JSON inside `data` with `contentMediaType` and `contentSchema`.
- `encoding` is mutually exclusive with `prefixEncoding` and `itemEncoding` (§ 4.14.1).

## Components (§ 4.7)

Holds reusable `schemas`, `responses`, `parameters`, `examples`, `requestBodies`, `headers`, `securitySchemes`, `links`, `callbacks`, `pathItems` and `mediaTypes`. Components have no effect unless referenced from outside `components`, and every key MUST match `^[a-zA-Z0-9\.\-_]+$` (§ 4.7, § 4.7.1).

## Tags (§ 4.22)

`name` is REQUIRED. `summary` is for display, `parent` names the tag this one nests under (it MUST exist, and cycles MUST NOT be used), and `kind` is free text with registered conventional values such as `nav`, `badge` and `audience` (§ 4.22.1, Tag Kind registry).

## References and schemas

- A Reference Object has `$ref` (REQUIRED, a URI), and optional `summary` and `description` that override the target's. Other properties SHALL be ignored (§ 4.23.1). A Schema Object with `$ref` is different: it is JSON Schema and siblings apply.
- Schema Objects use JSON Schema Draft 2020-12 with the OAS dialect, identified by `https://spec.openapis.org/oas/3.2/dialect/YYYY-MM-DD` (§ 4.24.1). A `$schema` in a schema resource root MUST be honored, `jsonSchemaDialect` sets the document default, and tooling MUST support the OAS dialect (§ 4.24.7).

## Minimal 3.2 example

```yaml
openapi: 3.2.1
$self: https://api.example.com/openapi.yaml
info:
  title: Orders API
  version: 1.4.0
servers:
  - url: https://api.example.com/v1
    name: production
tags:
  - name: orders
    summary: Orders
    kind: nav
security:
  - oauth: [orders:read]
paths:
  /orders/{orderId}:
    parameters:
      - name: orderId
        in: path
        required: true
        schema:
          type: string
    get:
      operationId: getOrder
      tags: [orders]
      responses:
        "200":
          description: The order.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
  /orders/events:
    get:
      operationId: streamOrderEvents
      tags: [orders]
      responses:
        "200":
          description: Order events as server-sent events.
          content:
            text/event-stream:
              itemSchema:
                type: object
                required: [data]
                properties:
                  event:
                    type: string
                  data:
                    type: string
                    contentMediaType: application/json
  /health:
    get:
      operationId: getHealth
      security: []
      responses:
        "204":
          description: The service is up.
components:
  schemas:
    Order:
      type: object
      required: [id, status]
      properties:
        id:
          type: string
        status:
          type: string
          enum: [open, paid, shipped]
  securitySchemes:
    oauth:
      type: oauth2
      oauth2MetadataUrl: https://auth.example.com/.well-known/oauth-authorization-server
      flows:
        clientCredentials:
          tokenUrl: https://auth.example.com/token
          scopes:
            orders:read: Read orders
```
