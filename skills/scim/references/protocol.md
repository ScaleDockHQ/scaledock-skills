# SCIM protocol (RFC 7644)

Load this when implementing or calling SCIM endpoints. All section numbers are RFC 7644 unless stated. Pagination is in `pagination.md`, and discovery is in `discovery.md`.

## Base URI, media type and messages

- **Base URI.** It MUST NOT contain a query string, and it can carry any path prefix, such as `https://example.com/scim/` (§1.3).
- **Media type.** SCIM uses `application/scim+json` (§3.1, §8.1). Servers MUST accept and return UTF-8 JSON (§3.8).
- **Message URIs.** Messages carry `schemas` with a URI that MUST begin with `urn:ietf:params:scim:api:` (§3.1): `ListResponse`, `SearchRequest`, `PatchOp`, `BulkRequest`, `BulkResponse` and `Error`, each under `urn:ietf:params:scim:api:messages:2.0:`.
- **Unknown parameters.** Service providers SHOULD ignore query parameters they do not recognize (§3.4.2).
- **Versioning.** A version segment such as `/v2/Users` MAY be used. When present, the service provider MUST honor it or reject the request (§3.13).

## Endpoints (§3.2)

| Endpoint                                               | Methods                       | Notes                                                    |
| ------------------------------------------------------ | ----------------------------- | -------------------------------------------------------- |
| `/Users`, `/Groups`                                    | GET, POST, PUT, PATCH, DELETE | Other resource types are found through `/ResourceTypes`. |
| `/Me`                                                  | GET, POST, PUT, PATCH, DELETE | Alias for the authenticated subject (§3.11).             |
| `/ServiceProviderConfig`, `/ResourceTypes`, `/Schemas` | GET                           | Discovery (§4).                                          |
| `/Bulk`                                                | POST                          | Bulk operations (§3.7).                                  |
| `[prefix]/.search`                                     | POST                          | Query with a body (§3.4.3).                              |

PUT MUST NOT create resources (§3.2, §3.5.1).

## Create (§3.3)

1. **Mutability.** `readOnly` attributes in the body SHALL be ignored. Omitted `readWrite` attributes MAY be defaulted. A client clears a value with `null`, or `[]` for a multi-valued attribute.
2. **Success.** Return `201 Created` with the resource. The URI SHALL be in the `Location` header and in `meta.location`. `meta.resourceType` SHALL match the endpoint (§3.3.1).
3. **Duplicates.** A conflict with an existing resource MUST return `409` with `scimType` `uniqueness`.

```http
POST /Users HTTP/1.1
Host: example.com
Content-Type: application/scim+json
Authorization: Bearer h480djs93hd8

{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName":"bjensen","externalId":"bjensen"}
```

## Read and query (§3.4)

- **Default attributes.** Responses include attributes with `returned` `always` or `default` (§3.4).
- **Single resource.** `GET /Users/{id}` returns `200` (§3.4.1).
- **ListResponse.** Queries return `urn:ietf:params:scim:api:messages:2.0:ListResponse` (§3.4.2):
  - `totalResults` is REQUIRED;
  - `Resources` is REQUIRED when `totalResults` is non-zero;
  - `startIndex` and `itemsPerPage` are REQUIRED on partial pages.
  - No match is `200` with `totalResults: 0`.
- **Too many results.** A query from the root or a type endpoint that would return too many results SHALL get `400` `tooMany` (§3.4.2.1).
- **Attribute selection.** `attributes` and `excludedAttributes` MUST be supported (§3.4.2.5). They are mutually exclusive (§3.9). `excludedAttributes` has no effect on `returned: always` attributes.

### Filters (§3.4.2.2)

- **Support.** Filtering is OPTIONAL; check `filter.supported` in `/ServiceProviderConfig`.
- **Case.** Attribute names and operators are case insensitive. String comparison follows the attribute's `caseExact`.
- **Attribute operators.** `eq`, `ne`, `co`, `sw`, `ew`, `pr`, `gt`, `ge`, `lt`, `le`. `gt`, `ge`, `lt` and `le` on Boolean or Binary attributes SHALL fail with 400 `invalidFilter`.
- **Logical and grouping operators.** `and`, `or`, `not`, `( )`, and `[ ]` for a complex attribute's values.
- **Precedence.** Grouping first, then `not`, then `and`, then `or`, then attribute operators.
- **Multi-valued attributes.** A filter on a multi-valued attribute matches if any value matches.
- **Unrecognized operations.** These MUST be declined with 400 `invalidFilter`.
- **Mixed resource types.** In queries across resource types, an attribute that a type lacks is treated as having no value (§3.4.2.1).

```text
FILTER    = attrExp / logExp / valuePath / *1"not" "(" FILTER ")"
valuePath = attrPath "[" valFilter "]"
attrExp   = (attrPath SP "pr") / (attrPath SP compareOp SP compValue)
attrPath  = [URI ":"] ATTRNAME *1subAttr
```

Examples from §3.4.2.2:

```text
filter=userName eq "bjensen"
filter=meta.lastModified gt "2011-05-13T04:42:34Z"
filter=userType eq "Employee" and emails[type eq "work" and value co "@example.com"]
filter=schemas eq "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
```

### Sorting (§3.4.2.3)

- **Parameters.** Sorting is OPTIONAL. `sortBy` takes an attribute path. `sortOrder` is `ascending` (the default) or `descending`.
- **Missing values.** Resources without a value sort last when ascending and first when descending.
- **Multi-valued attributes.** These sort by the `primary` value, or else the first value.

### POST /.search (§3.4.3)

The body is a `SearchRequest` with `attributes`, `excludedAttributes`, `filter`, `sortBy`, `sortOrder`, `startIndex` and `count`. Use it to keep filters with personal data out of URLs (§7.5.2).

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],
  "attributes": ["displayName", "userName"],
  "filter": "displayName sw \"smith\"",
  "startIndex": 1,
  "count": 10
}
```

## Replace with PUT (§3.5.1)

- **Support.** Implementers MUST support PUT (§3.5).
- **Mutability.** `readWrite` and `writeOnly` values replace the existing values. Omitted `readWrite` attributes MAY be cleared or defaulted. `immutable` values MUST match the existing value, or 400 `mutability` SHOULD be returned. `readOnly` values SHALL be ignored.
- **Required attributes.** The client MUST include them.
- **Success.** `200` with the entire resource.

## Modify with PATCH (§3.5.2)

- **Support.** PATCH is OPTIONAL for servers but SHOULD be supported (§3.5). Check `patch.supported`.
- **Body.** It MUST have `schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]` and an `Operations` array. Each operation has exactly one `op`: `add`, `remove` or `replace`.
- **Paths.** `path` is OPTIONAL for `add` and `replace` and REQUIRED for `remove`. Its grammar is `PATH = attrPath / valuePath [subAttr]`. There is no array indexing.
- **Sequential and atomic.** Operations are applied in order, each on the result of the previous one. The whole request SHALL be atomic: if one operation fails, the original resource MUST be restored.
- **Mutability.** A client MUST NOT modify `readOnly` or `immutable` attributes, except to `add` a value to an `immutable` attribute that has none.
- **`primary`.** Setting `primary: true` on one value SHALL set `false` on the others.
- **Success.** `200` with the resource (MUST when `attributes` was requested), or `204 No Content`.

| Operation | Behavior                                                                                                                                                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `add`     | MUST have `value`. Without `path`, `value` holds attributes to add to the resource. Multi-valued attributes get a new value; singular ones are replaced. A value that is already present SHOULD cause no change and success, and SHALL NOT change the modify timestamp. |
| `remove`  | Without `path`: 400 `noTarget`. Removes a singular attribute, all values of a multi-valued attribute, or the values matched by a `valuePath` filter. Removing a required or `readOnly` attribute: 400 `mutability`.                                                     |
| `replace` | Without `path`, `value` holds attributes to replace. A path to a missing attribute is treated as `add`. A `valuePath` that matches nothing: 400 `noTarget`.                                                                                                             |

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [
    { "op": "replace", "path": "active", "value": false },
    {
      "op": "remove",
      "path": "members[value eq \"2819c223-7f76-453a-919d-413861904646\"]"
    }
  ]
}
```

## Delete (§3.6)

- **Success.** `204 No Content`.
- **After deletion.** The service provider MAY keep the data, but MUST return `404` for every operation on the deleted resource and MUST omit it from queries.
- **Conflicts.** It SHOULD NOT count the deleted resource in uniqueness checks, so a new User with the same `userName` can be created.

## Bulk (§3.7)

- **Support.** Bulk is optional; check `bulk.supported`, `bulk.maxOperations` and `bulk.maxPayloadSize`.
- **Request.** `urn:ietf:params:scim:api:messages:2.0:BulkRequest` with `Operations`, each having `method` (`POST`, `PUT`, `PATCH`, `DELETE`), `path`, `data`, an optional `version`, and `bulkId` (REQUIRED for POST). `failOnErrors` is the number of errors after which the server stops.
- **Partial failures.** Without `failOnErrors`, the service provider MUST continue past failures (§3.7).
- **Optimization.** A server that reorders operations MUST preserve the client's intent (§3.7).
- **References.** Other operations reference a new resource as `"bulkId:<id>"`, including inside extensions (§3.7.2). The service provider MUST try to resolve circular references, and MAY return 409 instead (§3.7.1).
- **Response.** `BulkResponse` MUST include every processed operation, a `location` for all but failed POSTs, and a `status` with the HTTP code; errors carry the Error body in `response` (§3.7.3).
- **Limits.** The service provider MUST define maximum operations and payload size, and MUST return `413` naming the exceeded limit (§3.7.4).

## /Me (§3.11)

- **Not supported.** The service provider SHOULD return `501`.
- **Redirect.** It MAY redirect with `308` to the subject's resource.
- **Direct processing.** It MAY process the request directly; then `Location` MUST be the aliased resource's permanent location.

## Errors (§3.12)

Error bodies MUST use `urn:ietf:params:scim:api:messages:2.0:Error`. `status` is the HTTP code as a JSON string and is REQUIRED. `scimType` and `detail` are OPTIONAL.

| Status   | Use                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------- |
| 307, 308 | Repeat the request at `Location`; keep the original URI after 307, switch to the new one after 308. |
| 400      | Unparsable, syntactically incorrect, or violates the schema.                                        |
| 401      | Authorization header missing or invalid.                                                            |
| 403      | Not permitted with the supplied authorization.                                                      |
| 404      | Resource or endpoint does not exist.                                                                |
| 409      | Version mismatch, or duplicate resource refused.                                                    |
| 412      | `If-Match` failed; the resource has changed.                                                        |
| 413      | Bulk limits exceeded, for example `{"maxOperations":1000,"maxPayloadSize":1048576}`.                |
| 500      | Internal error.                                                                                     |
| 501      | Operation not supported, for example PATCH.                                                         |

`scimType` values for 400 (Table 9): `invalidFilter`, `tooMany`, `uniqueness`, `mutability`, `invalidSyntax`, `invalidPath`, `noTarget`, `invalidValue`, `invalidVers`, `sensitive`. RFC 9865 §2.1 adds `invalidCursor`, `expiredCursor` and `invalidCount`.

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "status": "409",
  "scimType": "uniqueness",
  "detail": "userName is already in use"
}
```

## ETags (§3.14)

- **Where ETags appear.** When supported, ETags MUST be sent as an HTTP header and SHOULD also be in `meta.version`. Support is advertised in `etag.supported`.
- **Conditional GET.** `If-None-Match` returns `304 Not Modified` with an empty body when the resource is unchanged.
- **Conditional writes.** `If-Match` on PUT and PATCH makes the write succeed only if the ETag is current; otherwise the result is `412` (Table 8).

```http
PATCH /Users/2819c223-7f76-453a-919d-413861904646 HTTP/1.1
If-Match: W/"e180ee84f0671b1"
```

## Internationalized strings (§5, §7.8)

Before comparing or checking uniqueness of `userName` or `password`, service providers MUST apply the PRECIS rules of RFC 7613 §3 and §4.
