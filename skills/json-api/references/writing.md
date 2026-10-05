# Creating, updating and deleting

Read this when implementing `POST`, `PATCH` and `DELETE` on resources or relationship links, or a client that sends them. Source: the JSON:API v1.1 specification, Creating, Updating and Deleting Resources, listed in [Sources](../SKILL.md#sources). Citations name the heading.

## General rules

- A server MAY allow resources of a type to be created, modified or deleted (Creating, Updating and Deleting Resources).
- A request MUST completely succeed or fail, as one transaction; no partial updates.
- `type` is required in every resource object in requests and responses, even where the endpoint implies it.
- Every "Other Responses" section says the same: other status codes MAY be used, error details MAY be included, and servers and clients MUST follow HTTP semantics.
- `include` and sparse fieldsets also apply to write responses that return primary data (Inclusion of Related Resources; Sparse Fieldsets).

## Creating resources

`POST` to a collection URL with a single resource object as primary data; it MUST contain at least `type`. A relationship in `relationships` MUST be a relationship object with `data`, which gives the new resource's linkage (Creating Resources).

```http
POST /photos HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "photos",
    "attributes": { "title": "Ember Hamster", "src": "http://example.com/images/productivity.png" },
    "relationships": { "photographer": { "data": { "type": "people", "id": "9" } } }
  }
}
```

### Client-generated IDs

A server MAY accept an `id` from the client. It MUST be a universally unique identifier, and the client SHOULD use a properly generated UUID (RFC 4122). A server that does not support client IDs MUST answer `403 Forbidden` (Client-Generated IDs).

### Create responses

| Outcome                                                                  | Response                                                                                     |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Created, and the server changed the resource (for example assigned `id`) | MUST be `201 Created` with the resource as primary data; SHOULD send `Location`.             |
| Created, and the server changed nothing                                  | `201 Created` with the document (or with no primary data, only `meta`), or `204 No Content`. |
| Accepted, not yet processed                                              | MUST be `202 Accepted`.                                                                      |
| Unsupported create                                                       | MAY be `403 Forbidden`.                                                                      |
| A referenced related resource does not exist                             | MUST be `404 Not Found`.                                                                     |
| Client-generated ID already exists                                       | MUST be `409 Conflict`.                                                                      |
| `type` is not a type of the target collection                            | MUST be `409 Conflict`.                                                                      |

Sources: 201 Created, 202 Accepted, 204 No Content, 403 Forbidden, 404 Not Found and 409 Conflict under Creating Resources. When both a `Location` header and `links.self` on the returned resource are present, they MUST match (201 Created). A `409` SHOULD include error details that identify the source of the conflict (409 Conflict). Only servers that accept client-generated IDs can avoid assigning an `id` (201 Created).

## Updating resources

`PATCH` the resource URL (its `self` link, or the URL that returned it as a single resource) with a single resource object containing `type` and `id` (Updating Resources).

- Any subset of attributes MAY be sent. Missing attributes MUST be treated as their current values, never as `null` (Updating a Resource's Attributes).
- Any subset of relationships MAY be sent. Missing relationships keep their current values. A sent relationship MUST be a relationship object with `data`, and its value replaces the relationship (Updating a Resource's Relationships).
- A server MAY refuse full replacement of a to-many relationship; it then MUST reject the whole update with `403 Forbidden` (Updating a Resource's Relationships).

| Outcome                                                                    | Response                                                       |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Accepted, and the server changed more than requested (`updatedAt`)         | MUST be `200 OK` with the updated resource as primary data.    |
| Accepted, and nothing else changed                                         | `200 OK` (document, possibly only `meta`) or `204 No Content`. |
| Accepted, not yet processed                                                | MUST be `202 Accepted`.                                        |
| Unsupported update                                                         | MUST be `403 Forbidden`.                                       |
| Resource, or a referenced related resource, does not exist                 | MUST be `404 Not Found`.                                       |
| `type` or `id` does not match the endpoint                                 | MUST be `409 Conflict`.                                        |
| Violates another server constraint, such as uniqueness of a non-`id` field | MAY be `409 Conflict`.                                         |

Sources: the Responses subsections under Updating Resources.

## Updating relationships

Relationship links (`self` in a relationship object) let clients change linkage without exposing foreign keys or touching the related resources. A server may delete the underlying resource when a relationship is removed, as garbage collection (Updating Relationships).

### To-one

`PATCH` the relationship URL with a top-level `data` that is a resource identifier object, or `null` to clear it. On success the server MUST return a successful response (Updating To-One Relationships).

```http
PATCH /articles/1/relationships/author HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{ "data": { "type": "people", "id": "12" } }
```

### To-many

The body MUST contain `data` with `[]` or an array of resource identifier objects, for every method (Updating To-Many Relationships).

- `PATCH`: the server MUST replace every member, return an error if some resources cannot be found or accessed, or return `403 Forbidden` if full replacement is not allowed. `"data": []` clears the relationship.
- `POST`: the server MUST add the members unless already present, and MUST NOT add a `type` and `id` twice. If every member is added or already present, the response MUST be successful.
- `DELETE`: the server MUST remove the members or return `403 Forbidden`. If every member is removed or already absent, the response MUST be successful.

### Relationship update responses

| Outcome                                                         | Response                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| Accepted, and the server changed the relationship in other ways | MUST be `200 OK` with the updated linkage as primary data.     |
| Accepted, and nothing else changed                              | `200 OK` (document, possibly only `meta`) or `204 No Content`. |
| Accepted, not yet processed                                     | MUST be `202 Accepted`.                                        |
| Unsupported relationship update                                 | MUST be `403 Forbidden`.                                       |

`204 No Content` is the appropriate response to a `POST` of members already present and a `DELETE` of members already absent (204 No Content, under Updating Relationships).

## Deleting resources

`DELETE` the resource URL (Deleting Resources).

| Outcome                     | Response                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------ |
| Deleted                     | `200 OK` with a document without primary data (`meta` allowed), or `204 No Content`. |
| Accepted, not yet processed | MUST be `202 Accepted`.                                                              |
| Resource does not exist     | SHOULD be `404 Not Found`.                                                           |

## Common mistakes

- Treating a `PATCH` without an attribute as clearing it (Updating a Resource's Attributes).
- Returning `204` after the server assigned an `id` or set `createdAt`; that requires `201` with the resource (201 Created; 204 No Content).
- Rejecting a relationship `POST` because a member already exists, or a `DELETE` because one is already gone; both MUST succeed (Updating To-Many Relationships).
- Returning `422` instead of `409` for a `type` or `id` mismatch with the endpoint (409 Conflict).
- Applying half of a multi-field update when one field fails validation (Creating, Updating and Deleting Resources).
