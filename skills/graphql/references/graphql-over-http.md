# GraphQL over HTTP

Read this when serving GraphQL over HTTP, writing an HTTP client for it, or reviewing status codes and media types. Source: the GraphQL over HTTP Current Working Draft (Stage 2: Draft), cited as "GoH". It extends the GraphQL spec; where they conflict, the GraphQL spec wins (GoH Introduction). Subscriptions are out of scope (GoH § 1).

## Roles and URLs

- A server hosts one or more GraphQL services; each schema is served at one or more URLs, and the schema at a URL may differ per client (GoH § 1, § 2). Ending the path in `/graphql` is a common convention (GoH § 2).
- A server may refuse requests (for example to require authentication or payment) with a `4xx` or `5xx`, but should not base that on the contents of a well-formed request. Authorization belongs in the schema during ExecuteRequest(), which allows partial responses (GoH § 2).

## Media types

| Media type                          | Use                    |
| ----------------------------------- | ---------------------- |
| `application/json`                  | GraphQL JSON requests  |
| `application/graphql-response+json` | GraphQL JSON responses |

Servers and clients must support JSON and may support other formats (GoH § 3). Without a charset, these media types are UTF-8 (GoH § 3.1).

## Request parameters

A GraphQL-over-HTTP request encodes (GoH § 4.1):

- `query` (required, string): the document source text. It may hold several operations, including mutations; it need not parse or validate to be well-formed.
- `operationName` (optional, string).
- `variables` (optional, map).
- `extensions` (optional, map) reserved for implementers.

Wrong types or a missing `query` make the request not well-formed (GoH § 4.1). The schema and initial value come from the URL, not the request (GoH § 4.1).

## Accept

- Clients must send `Accept` and must include `application/graphql-response+json` (GoH § 4.2).
- When the client does not know the server supports it, send `Accept: application/graphql-response+json, application/json;q=0.9` (GoH § 4.2).
- A client that cannot accept `application/graphql-response+json` is a legacy client and does not conform (GoH § 4.2).

## GET

- Parameters go in the URL query component, encoded as `application/x-www-form-urlencoded` per WHATWG URLSearchParams; `variables` and `extensions` are JSON strings (GoH § 4.3).
- An empty string equals an absent optional parameter; `operationName=null` names an operation called `"null"` (GoH § 4.3).
- GET must not execute a mutation. The server must respond with a `4xx` and halt; `405 Method Not Allowed` with an `Allow` header is recommended (GoH § 4.3).
- Servers may support GET; they must support POST (GoH § 4).

```http
GET /graphql?query=query(%24id%3A%20ID!)%7Buser(id%3A%24id)%7Bname%7D%7D&variables=%7B%22id%22%3A%22QVBJcy5ndXJ1%22%7D HTTP/1.1
Accept: application/graphql-response+json
```

## POST

- The body holds the parameters in a recognized or server-supported media type; the client must send `Content-Type` (GoH § 4.4).
- Servers must accept `application/json` in UTF-8 (GoH § 4.4). A POST without `Content-Type` should be rejected with a `4xx` (GoH § 4.4). Clients that do not know what the server supports should send JSON (GoH § 4.4).
- JSON body: an object with `query`, `operationName`, `variables`, `extensions`. Implementers must not add other properties (use HTTP headers or a scoped `extensions` entry instead); servers must ignore properties they do not understand; `null` equals absent for optional parameters (GoH § 4.4.1).

```http
POST /graphql HTTP/1.1
Content-Type: application/json
Accept: application/graphql-response+json

{"query":"query ($id: ID!) { user(id: $id) { name } }","variables":{"id":"QVBJcy5ndXJ1"}}
```

## Response body and negotiation

- The body is a GraphQL execution result or request error result in the chosen media type; the server must send `Content-Type` and should include the charset, for example `application/graphql-response+json; charset=utf-8` (GoH § 5.1).
- Servers must support `application/graphql-response+json`; a server that does not is a legacy server (GoH § 5.1).
- With `Accept`, the server must use the highest priority supported type. If none is acceptable it must either return `406` or ignore `Accept` (GoH § 5.1).
- Legacy clients: if `Accept` allows `application/json` but not a preferred type, the server should process the request as if it asked for `application/graphql-response+json`, but use `Content-Type: application/json` on any `2xx` response (GoH § 5.1).
- Validation should apply all GraphQL validation rules, and may add rules such as depth or complexity limits (GoH § 5.2). Execution follows ExecuteRequest(); previously validated persisted operations may skip validation (GoH § 5.3).

## Status codes

With `application/graphql-response+json`, clients should read the body regardless of the status (GoH § 5.4). The status is for intermediaries, logs and observability.

| GraphQL result or condition                                               | Status (GoH § 5.4)                                                            |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| No well-formed GraphQL response can be produced                           | Appropriate `4xx`/`5xx`, and must not use `application/graphql-response+json` |
| `data` present and not null                                               | Must be `2xx`                                                                 |
| `data` present, no `errors`                                               | Should be `200`                                                               |
| `data` (even null) and `errors` both present                              | Should be `294` (Partial Success)                                             |
| No `data` (request error result)                                          | Must be `4xx` or `5xx`                                                        |
| Mutation via GET, or unsupported method                                   | `405` (with `Allow`)                                                          |
| Unsupported request `Content-Type`                                        | `415`                                                                         |
| No supported `Accept` type and no `application/json`                      | `406`                                                                         |
| Request timeout, URI too long, headers too large, body too large          | `408`, `414`, `431`, `413`                                                    |
| Body is not valid JSON, or the document does not parse                    | `400`                                                                         |
| Not a well-formed GraphQL-over-HTTP request (for example `"qeury"`)       | `422`                                                                         |
| Validation fails, operation cannot be determined, variables fail coercion | `422`                                                                         |
| Client not permitted                                                      | `401`, `403` or similar                                                       |
| Server is the cause (maintenance, load shedding)                          | `5xx`, for example `503`                                                      |

The example section says a request that executes without a request error should get `200 OK` even when execution errors occur (GoH § 5.4.1, Field errors encountered during execution), while § 5.4 recommends `294` when both `data` and `errors` are present. `294` is not registered with IANA; RFC 9110 makes unknown `2xx` codes equivalent to `200`, so recommend `294` only with `application/graphql-response+json`, and check that caches, proxies and clients treat it as intended (GoH § 6.1). For `application/json` legacy responses, keep `200`.

## Security notes (non-normative)

- HTTP hygiene is the implementer's job: HTTPS, size limits, rate limits, safe logging, no side effects on GET (GoH § 6.2.1).
- GraphQL hygiene: limit document size and token count, validate documents, limit the number of errors and what they reveal, enforce timeouts and pagination limits, add depth and complexity limits, authenticate and authorize, and rate limit critical logic (GoH § 6.2.2).
- `multipart/form-data` and `application/x-www-form-urlencoded` bodies can be browser "simple requests" with no CORS preflight, which opens CSRF; `application/json` requires a preflight cross-origin. A required custom header (for example `GraphQL-Require-Preflight`, a community pattern, not a standard) forces a preflight (GoH § 6.2.3).
- Multipart uploads may reference one large value many times, so the work can exceed the HTTP request size (GoH § 6.2.3).
- Stick to the recognized formats to stay compatible with future versions (GoH § 6.3).

## Common mistakes

- Returning `400` for validation errors: `400` is for unparsable JSON or documents; validation failures get `422` (GoH § 5.4).
- Returning `500` for partial data: non-null `data` must be `2xx` (GoH § 5.4).
- Executing mutations from GET links (GoH § 4.3).
- Rejecting a request because of its GraphQL contents at the HTTP layer instead of in execution (GoH § 2).
