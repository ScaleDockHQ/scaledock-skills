# Fetching data

Read this when implementing `GET` endpoints, `include`, sparse fieldsets, sorting, pagination or filtering, or when parsing JSON:API query strings. Source: the JSON:API v1.1 specification, Fetching Data, Query Parameters and Appendix, listed in [Sources](../SKILL.md#sources). Citations name the heading.

## Fetching resources

A server MUST support fetching every URL it provides as a top-level `self` link, a resource-level `self` link, or a relationship's `related` link (Fetching Resources).

| Outcome                                                   | Response                                                         |
| --------------------------------------------------------- | ---------------------------------------------------------------- |
| Collection found                                          | `200 OK`; primary data is an array of resource objects, or `[]`. |
| Single resource found                                     | `200 OK`; primary data is a resource object.                     |
| URL could hold one resource but holds none (empty to-one) | `200 OK` with `"data": null`.                                    |
| Single resource does not exist                            | `404 Not Found`, except the `null` case above.                   |
| Anything else                                             | Other status codes MAY be used, following HTTP semantics.        |

Sources: 200 OK, 404 Not Found and Other Responses under Fetching Resources. A server MAY include error details with any error response.

## Fetching relationships

A server MUST support fetching every relationship `self` link (Fetching Relationships).

- Success is `200 OK`, and the primary data MUST be the resource linkage: a resource identifier object or `null` for to-one, an array or `[]` for to-many (200 OK). The top-level `links` MAY contain `self` and `related`.
- A relationship URL that does not exist, for example because the parent resource does not exist, gets `404 Not Found`. An existing but empty relationship gets `200 OK` (404 Not Found).

```http
GET /articles/1/relationships/tags HTTP/1.1
Accept: application/vnd.api+json

HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": { "self": "/articles/1/relationships/tags", "related": "/articles/1/tags" },
  "data": [{ "type": "tags", "id": "2" }, { "type": "tags", "id": "3" }]
}
```

## Inclusion of related resources

- An endpoint MAY include related resources by default, and MAY support an `include` query parameter (Inclusion of Related Resources).
- If the endpoint does not support `include`, it MUST answer `400 Bad Request` to any request that has it.
- If it supports `include` and the client sends it, the response MUST be a compound document with an `included` key, even `[]`, and MUST NOT include unrequested resource objects.
- The value is a comma-separated list of relationship paths; a path is a dot-separated list of relationship names, for example `comments.author`. An empty value means no related resources.
- An unknown path, or one the server will not include, gets `400 Bad Request`.
- Because of full linkage, `include=comments.author` returns the comments as well as their authors. A server may expose a nested path as a direct relationship such as `commentAuthors` to avoid intermediate resources.
- `include` applies to any endpoint that returns primary data, including relationship endpoints and `POST` responses.

## Sparse fieldsets

- A client MAY ask for specific fields per type with `fields[TYPE]`, a comma-separated list of field names; an empty value means no fields (Sparse Fieldsets).
- When a client restricts a type's fields, the endpoint MUST NOT return additional fields for that type.
- When it does not, the server MAY send all, some or no fields for that type.
- Applies to resources in primary or included data, for any request type.

```http
GET /articles?include=author&fields%5Barticles%5D=title,body&fields%5Bpeople%5D=name HTTP/1.1
Accept: application/vnd.api+json
```

## Sorting

- A server MAY support `sort`. Its value is one or more comma-separated sort fields, which SHOULD be applied in the order given (Sorting).
- Each sort field is ascending unless prefixed with `-`, which MUST mean descending: `sort=-created,title`.
- Sort fields need not be attribute names, though that is recommended; dot-separated fields such as `author.name` are recommended for sorting by related attributes.
- If the server does not support the requested sort, it MUST return `400 Bad Request`.
- If it supports it, the top-level `data` array MUST be ordered accordingly. Without `sort`, the server MAY apply a default order.

## Pagination

- A server MAY return a page of a collection and MAY provide pagination links (Pagination).
- Pagination links MUST be in the links object of the collection they paginate: top-level `links` for primary data, the relationship's `links` for an included collection.
- The keys MUST be `first`, `last`, `prev` and `next`. An unavailable link MUST be omitted or `null`.
- The order implied by the link names MUST stay consistent with the sorting rules.
- The `page` query parameter family is reserved for pagination, and servers and clients SHOULD use it. The strategy is up to the server: `page[number]` and `page[size]`, `page[offset]` and `page[limit]`, or `page[cursor]`.
- The Cursor Pagination profile at `https://jsonapi.org/profiles/ethanresnick/cursor-pagination` is listed on the Extensions and Profiles page as one shared strategy (Extensions and Profiles, Profiles).

## Filtering

The `filter` query parameter family is reserved for filtering, and servers and clients SHOULD use it. The strategy is up to the server (Filtering); a profile may define it (Rules for Profiles). Dot-separated names allow relationship paths, for example `filter[author.status]=active` (Query Parameter Families).

## Query parameter naming

- **Families.** A family is every parameter whose name is a base name followed by zero or more `[]`, `[member]` or `[dot.separated.members]`. `page[offset]` and `page[limit]` are two parameters of the `page` family. `filter[_]` is not in the family, because `_` is not a legal member name (Query Parameter Families).
- **Specification parameters.** `include`, `sort`, and the `fields`, `page` and `filter` families.
- **Extension parameters.** The base name MUST be the extension namespace, a colon, and only `a-z` characters (Extension-Specific Query Parameters).
- **Implementation parameters.** The base name MUST be a legal member name with at least one character outside `a-z`. A capital letter (camelCase) is RECOMMENDED, for example `includeDeleted` (Implementation-Specific Query Parameters).
- **Unknown parameters.** A parameter that breaks these rules, or that the server cannot process as a specification parameter, MUST get `400 Bad Request` (Implementation-Specific Query Parameters). All-lowercase names are reserved for future versions of the spec.
- **Profiles** MUST NOT define query parameters other than implementation-specific ones, though they may define rules for reserved families such as `filter` (Rules for Profiles).

## Parsing and serialization

- Extract parameters by running the query string, without `?`, through the `application/x-www-form-urlencoded` parser; the defining specification may parse a value differently, and the result might not be a string (Parsing/Serialization).
- Serialize with the `application/x-www-form-urlencoded` serializer; a value (never a name) may be serialized differently as long as it parses back (Parsing/Serialization).
- Compliant producers percent-encode `[` and `]`. Servers SHOULD accept unencoded brackets in names and, if they do, MUST treat the request the same as the encoded form (Square Brackets in Parameter Names).
