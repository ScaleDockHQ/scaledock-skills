# Content negotiation, errors, extensions and profiles

Read this when implementing media type handling, error responses, an extension such as Atomic Operations, or a profile. Sources: the JSON:API v1.1 specification (The JSON:API Media Type, Content Negotiation, Errors), the Atomic Operations extension page and the Extensions and Profiles page, listed in [Sources](../SKILL.md#sources). Citations name the heading.

## Content negotiation

### Both sides

- Send every JSON:API payload with `Content-Type: application/vnd.api+json` (Universal Responsibilities).
- When one or more extensions are applied, `Content-Type` MUST carry `ext`; when one or more profiles are applied, it MUST carry `profile` (Universal Responsibilities).
- The only allowed parameters are `ext` and `profile`. Each value is a space-separated list of URIs; HTTP requires quoting it (Rules for Media Type Parameters).

```http
Content-Type: application/vnd.api+json;ext="https://jsonapi.org/ext/atomic";profile="https://example.com/resource-timestamps"
```

### Client

- Ignore every `Content-Type` parameter other than `ext` and `profile` in responses (Client Responsibilities).
- `ext` in `Accept` requires the server to apply all listed extensions; `profile` in `Accept` requests profiles (Client Responsibilities).
- `Accept` may list several JSON:API instances with different `ext` and `profile` combinations, with quality values to rank them (Client Responsibilities, note).

### Server

| Request                                                                                   | Response       |
| ----------------------------------------------------------------------------------------- | -------------- |
| `Content-Type` is the JSON:API media type with a parameter other than `ext` or `profile`  | MUST be `415`. |
| `Content-Type` `ext` contains an unsupported extension URI                                | MUST be `415`. |
| Every JSON:API instance in `Accept` has a parameter other than `ext` or `profile`         | MUST be `406`. |
| Every JSON:API instance in `Accept` has `ext` with at least one unsupported extension URI | MUST be `406`. |

Sources: Server Responsibilities. Also:

- `Accept` instances with other parameters MUST be ignored (Server Responsibilities).
- A server SHOULD try to apply requested profiles and MUST ignore profiles it does not recognize. Extensions need strict agreement; profiles are at the server's discretion (Server Responsibilities).
- A server that supports `ext` or `profile` SHOULD send `Vary: Accept` on every response, with or without extensions applied; some intermediaries ignore `Vary` unless configured (Server Responsibilities).
- `jsonapi.ext` and `jsonapi.profile` describe what was applied, but MUST NOT be used for negotiation (JSON:API Object).

## Errors

### Processing

A server MAY stop at the first problem or MAY collect several, for example several validation errors. With several problems, the most generally applicable status SHOULD be used: `400` for several 4xx errors, `500` for several 5xx errors (Processing Errors).

### Error objects

Error objects MUST be an array under top-level `errors`. Each MUST contain at least one of these members (Error Objects):

| Member             | Meaning                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | Unique identifier for this occurrence.                                                                                                                    |
| `links.about`      | Link to details about this occurrence; SHOULD resolve to a human-readable description.                                                                    |
| `links.type`       | Link identifying the error type; SHOULD resolve to a human-readable explanation of the general error.                                                     |
| `status`           | HTTP status code as a **string**, for example `"422"`. SHOULD be provided.                                                                                |
| `code`             | Application-specific error code, as a string.                                                                                                             |
| `title`            | Short summary that SHOULD NOT change between occurrences, except for localization.                                                                        |
| `detail`           | Explanation specific to this occurrence; may be localized.                                                                                                |
| `source.pointer`   | JSON Pointer (RFC 6901) into the request document, such as `/data/attributes/title`. MUST point to a value that exists; clients ignore one that does not. |
| `source.parameter` | The query parameter that caused the error.                                                                                                                |
| `source.header`    | The name of a single request header that caused the error.                                                                                                |
| `meta`             | Non-standard meta-information.                                                                                                                            |

`source` SHOULD contain one of `pointer`, `parameter` or `header`, or be omitted (Error Objects).

```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/vnd.api+json

{
  "errors": [{
    "status": "422",
    "source": { "pointer": "/data/attributes/firstName" },
    "title": "Invalid Attribute",
    "detail": "First name must contain at least two characters."
  }]
}
```

The spec fixes some statuses and leaves others to HTTP: `400` for unsupported `include`, `sort` or query parameters; `403`, `404` and `409` in the write sections; `415` and `406` for negotiation. Elsewhere a server MAY use other codes, following HTTP semantics (Other Responses sections).

## Extensions

- An extension adds specification semantics. It cannot alter or remove specification semantics, nor specify implementation semantics (Extensions).
- It MAY add processing rules, restrictions, document members and query parameters, but MUST NOT lessen or remove any rule of the spec or of another extension (Rules for Extensions).
- It MUST define exactly one namespace of one or more `a-zA-Z0-9` characters, and use it for all its members (`namespace:member`) and query parameters (`namespace:name`, with `a-z` after the colon) (Rules for Extensions; Extension Members; Extension-Specific Query Parameters).
- An extension is identified by a URI that SHOULD return documentation (Rules for Media Type Parameters).
- An extension must be understood by both client and server; a profile can be safely ignored (Extensions and Profiles page).

## Profiles

- A profile shares a usage of the spec. It can specify implementation semantics, but cannot alter, add to or remove specification semantics (Profiles).
- Rules follow RFC 6906. A profile MAY define document members and processing rules reserved for implementors, MUST NOT define query parameters other than implementation-specific ones, and MUST NOT alter or remove rules of the spec or an extension; it MAY define rules for reserved parameters such as `filter` (Rules for Profiles).
- Profile members need no namespace, but profiles can conflict with each other; implementors must not support conflicting profiles (Rules for Profiles).
- Anyone can host an extension or profile on their own domain; the editors encourage reusing listed ones over creating near-duplicates (Extensions and Profiles page).

## Atomic Operations extension

URI `https://jsonapi.org/ext/atomic`, namespace `atomic`. It performs several operations in order, atomically (Atomic Operations, URI and Namespace).

### Document structure

- A document using it MUST NOT contain `data` or `included`. It MAY contain either `atomic:operations` (one or more operation objects) or `atomic:results` (one or more result objects), not both. With either present, `errors` MUST NOT be included (Document Structure).
- An operation object MUST contain `op`: `"add"`, `"update"` or `"remove"`. It MAY contain one target, `ref` or `href`, not both, and MAY contain `data` and `meta` (Operation Objects).
- `ref` MUST contain `type` with `id` or `lid`, and optionally `relationship` to target a relationship. `lid` refers to a local identity assigned in a prior operation (Operation Objects).
- `href` is a URI-reference to the target (Operation Objects).
- A result object MAY contain `data` and `meta`; `{}` is valid when no data is required (Result Objects).

### Processing

- Requests MUST use `POST` (Processing).
- Operations MUST run in array order, atomically: any failure MUST undo the effects of earlier operations (Processing).
- On success with a body: `200 OK` with `atomic:results` of the same length as the operations, matched by position. If no operation needs to return `data`, the server MAY answer `204 No Content` (Processing).
- On failure, respond as the base spec says, with error objects whose `source.pointer` SHOULD point into the request. A malformed or incomplete operation MUST get `400`; a well-formed one the server cannot process gets `400` or a more appropriate code such as `409` or `422` (Processing Errors).

### Operations

| Operation           | `op`       | Target                                          | `data`                               | Result                                                                                          |
| ------------------- | ---------- | ----------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Create resource     | `"add"`    | optional `href` to a collection                 | resource object with at least `type` | MUST return the created resource, unless a client ID made it identical (then data is optional). |
| Update resource     | `"update"` | optional `ref` or `href`                        | resource object                      | MUST return the resource if the server changed other fields; otherwise data is optional.        |
| Delete resource     | `"remove"` | MUST have `ref` or `href`                       | none                                 | MUST have no `data`.                                                                            |
| Set or clear to-one | `"update"` | MUST have `ref` (with `relationship`) or `href` | resource identifier object or `null` | MUST have no `data`.                                                                            |
| Add to to-many      | `"add"`    | MUST have `ref` (with `relationship`) or `href` | array of resource identifier objects | MUST have no `data`.                                                                            |
| Replace to-many     | `"update"` | MUST have `ref` (with `relationship`) or `href` | array of resource identifier objects | MUST have no `data`.                                                                            |
| Remove from to-many | `"remove"` | MUST have `ref` (with `relationship`) or `href` | array of resource identifier objects | MUST have no `data`.                                                                            |

Sources: Processing Specific Operations and its Responses subsections. Whenever every result would be empty, the server MAY answer `204 No Content`.

```http
POST /operations HTTP/1.1
Content-Type: application/vnd.api+json;ext="https://jsonapi.org/ext/atomic"
Accept: application/vnd.api+json;ext="https://jsonapi.org/ext/atomic"

{
  "atomic:operations": [
    { "op": "add", "data": { "type": "authors", "lid": "a1", "attributes": { "name": "dgeb" } } },
    { "op": "add", "data": {
        "type": "articles",
        "attributes": { "title": "JSON API paints my bikeshed!" },
        "relationships": { "author": { "data": { "type": "authors", "lid": "a1" } } }
    } }
  ]
}
```

Local identities (`lid`) let later operations refer to resources that have no `id` yet (Processing Multiple Operations).
