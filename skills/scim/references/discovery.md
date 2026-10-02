# SCIM discovery endpoints

Load this when publishing or reading `/ServiceProviderConfig`, `/ResourceTypes` and `/Schemas`. Endpoint rules are in RFC 7644 §4; the schemas are in RFC 7643 §5, §6 and §7.

## Endpoint rules (RFC 7644 §4)

- **Single resource.** A specific ResourceType or Schema is returned like a single resource (RFC 7644 §3.4.1).
- **Lists.** Multiple results SHALL use `ListResponse`.
- **Query parameters.** Filtering, sorting and pagination SHALL be ignored on these endpoints. If a `filter` is sent, the service provider SHOULD answer `403`, so clients do not assume the filter was applied.
- **Individual schemas.** These are addressed by URI: `/Schemas/urn:ietf:params:scim:schemas:core:2.0:User`.
- **Message schemas.** Schemas under `urn:ietf:params:scim:api:` SHALL NOT be listed in `/Schemas` (RFC 7644 §3.1).

## /ServiceProviderConfig (RFC 7643 §5)

- **Schema.** `urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig`. All attributes are `readOnly`, and `id` is not required.
- **Unauthenticated access.** The service provider SHOULD make `authenticationSchemes` readable without prior authentication.

| Attribute               | Content                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `documentationUri`      | Optional help URL.                                                                                                                                                                                                                               |
| `patch`                 | `supported`. REQUIRED.                                                                                                                                                                                                                           |
| `bulk`                  | `supported`, `maxOperations`, `maxPayloadSize`. REQUIRED.                                                                                                                                                                                        |
| `filter`                | `supported`, `maxResults`. REQUIRED.                                                                                                                                                                                                             |
| `changePassword`        | `supported`. REQUIRED.                                                                                                                                                                                                                           |
| `sort`                  | `supported`. REQUIRED.                                                                                                                                                                                                                           |
| `etag`                  | `supported`. REQUIRED.                                                                                                                                                                                                                           |
| `authenticationSchemes` | List of `type` (`oauth`, `oauth2`, `oauthbearertoken`, `httpbasic`, `httpdigest`), `name`, `description`, optional `specUri` and `documentationUri`. REQUIRED.                                                                                   |
| `pagination`            | RFC 9865 §4: `cursor` and `index` (both REQUIRED in the object), optional `defaultPaginationMethod` (`cursor` or `index`), `defaultPageSize`, `maxPageSize`, `cursorTimeout` in seconds. A cursor-supporting service provider SHOULD include it. |
| `securityEvents`        | RFC 9967 §4: `asyncRequest` (`none`, `long` or `request`) and `eventUris`. Absent means events are not supported or not configured.                                                                                                              |

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],
  "patch": { "supported": true },
  "bulk": {
    "supported": true,
    "maxOperations": 1000,
    "maxPayloadSize": 1048576
  },
  "filter": { "supported": true, "maxResults": 200 },
  "changePassword": { "supported": false },
  "sort": { "supported": false },
  "etag": { "supported": true },
  "pagination": {
    "cursor": true,
    "index": true,
    "defaultPaginationMethod": "index",
    "maxPageSize": 1000
  },
  "authenticationSchemes": [
    {
      "type": "oauthbearertoken",
      "name": "OAuth Bearer Token",
      "description": "Authentication using an OAuth 2.0 bearer token"
    }
  ]
}
```

## /ResourceTypes (RFC 7643 §6)

- **Schema.** `urn:ietf:params:scim:schemas:core:2.0:ResourceType`. All attributes are REQUIRED unless marked otherwise.
- **`id` and `description`.** OPTIONAL.
- **`name`.** REQUIRED, and referenced by `meta.resourceType`.
- **`endpoint`.** REQUIRED, relative to the base URI, for example `/Users`.
- **`schema`.** REQUIRED. It MUST equal the `id` of the base Schema resource.
- **`schemaExtensions`.** OPTIONAL. A list of `schema` (equal to a Schema `id`) and `required`. When `required` is true, resources of the type MUST include that extension and its required attributes.

Clients SHOULD discover endpoints through `/ResourceTypes` instead of guessing plural names (RFC 7644 §3.2).

## /Schemas (RFC 7643 §7)

- **Content.** `GET /Schemas` SHALL return all supported schemas as a `ListResponse` (RFC 7644 §4). Each Schema resource has `id` (the schema URI), `name`, `description` and `attributes`, with the characteristics listed in `schema.md`.
- **Differences between providers.** Clients should expect schemas to differ between service providers (RFC 7644 §3.1). The service provider interprets each request against its own schema.
