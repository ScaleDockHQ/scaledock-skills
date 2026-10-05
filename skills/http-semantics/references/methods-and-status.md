# Methods, status codes and response fields

Read this when choosing a method for an operation, choosing the status code for an outcome, or setting Allow, Location, Content-Location and Retry-After. Sources: RFC 9110 § 9, § 10.2, § 8.7, § 15, § 16.3, § 17 and RFC 10008 for QUERY, listed in [Sources](../SKILL.md#sources). Error bodies are out of scope here: use the `problem-details` skill for `application/problem+json`.

## Method properties

| Method  | Safe | Idempotent | Cacheable                                                                   | Source               |
| ------- | ---- | ---------- | --------------------------------------------------------------------------- | -------------------- |
| GET     | yes  | yes        | yes                                                                         | RFC 9110 § 9.3.1     |
| HEAD    | yes  | yes        | yes                                                                         | RFC 9110 § 9.3.2     |
| QUERY   | yes  | yes        | yes, with the request content in the cache key                              | RFC 10008 § 2, § 2.7 |
| POST    | no   | no         | only with explicit freshness and a Content-Location equal to the target URI | RFC 9110 § 9.3.3     |
| PUT     | no   | yes        | no                                                                          | RFC 9110 § 9.3.4     |
| DELETE  | no   | yes        | no                                                                          | RFC 9110 § 9.3.5     |
| OPTIONS | yes  | yes        | no                                                                          | RFC 9110 § 9.3.7     |
| TRACE   | yes  | yes        | no                                                                          | RFC 9110 § 9.3.8     |

- Safe means the client does not request, and does not expect, any state change (§ 9.2.1). Logging, billing or other side effects may happen, but the client is not responsible for them. A resource owner MUST disable or forbid an unsafe action reached through a safe method, such as `GET /items?delete=7` (§ 9.2.1).
- Idempotent means repeating the request has the same intended effect as sending it once (§ 9.2.2). A client SHOULD NOT automatically retry a non-idempotent request unless it knows the request is idempotent by other means or that the original was never applied; a proxy MUST NOT automatically retry non-idempotent requests (§ 9.2.2).
- An origin server MUST support GET and HEAD for any resource. It answers 501 for a method it does not recognise or implement, and 405 for a method it knows but the target resource does not allow (§ 9.1).
- New methods: a definition needs to say whether the method is safe, idempotent and cacheable, and what request content means; it cannot change message parsing (§ 16.1.2).

## GET, HEAD, POST, PUT, DELETE, OPTIONS

- **GET** content has no generally defined semantics and cannot change the meaning of the request; a client SHOULD NOT send content in a GET unless it talks directly to an origin that has said, in or out of band, it has a purpose and support for it. Intermediaries may reject or mis-handle it (request smuggling) (§ 9.3.1). For a query that needs a body, use QUERY.
- **HEAD**: the server MUST NOT send content and SHOULD send the same header fields it would send for GET, though it may omit fields that are only known while generating content (§ 9.3.2).
- **POST** processes the content according to the resource's own semantics (§ 9.3.3).
  - When it creates one or more resources, the server SHOULD send 201 with a Location that identifies the primary new resource.
  - A POST response is cacheable only with explicit freshness and a Content-Location equal to the target URI; the cached response then answers later GET and HEAD requests.
  - A server can answer 303 with a Location pointing at an existing resource that is equivalent to what the POST would create.
  - 206, 304 and 416 are never valid responses to POST.
- **PUT** replaces the state of the target resource with the enclosed representation (§ 9.3.4).
  - If the target had no current representation and PUT creates one, the origin MUST send 201. If it modifies an existing one, the origin MUST send 200 or 204.
  - A representation that conflicts with the target's constraints gets 409 (for example a document version mismatch) or 415 (for example a media type the resource does not accept).
  - The origin SHOULD ignore unrecognised header fields and MUST NOT send a validator (ETag, Last-Modified) in a successful response unless the content was stored without transformation and the validator reflects the new representation. Clients use this to tell whether their in-memory copy is still current.
  - When the server picks the URI of the new resource, the operation SHOULD be POST, not PUT. When the server wants the change applied to a different resource (for example one that moved), it MUST send a 3xx instead (§ 9.3.4). Partial updates are not PUT: see partial PUT in [`conditional-and-range.md`](conditional-and-range.md) and PATCH, which RFC 9110 names as the alternative (§ 14.5).
  - PUT responses are not cacheable; a successful PUT invalidates cached responses for the target (§ 9.3.4, RFC 9111 § 4.4).
- **DELETE** removes the association between the target resource and its current functionality (§ 9.3.5). Success is 202 (the action will likely succeed but has not yet been enacted), 204 (enacted, no further information), or 200 (enacted, with a status representation). DELETE content has no generally defined semantics; DELETE responses are not cacheable and invalidate the target URI.
- **OPTIONS** asks about communication options for the target resource, or for the server when the target is `*` (§ 9.3.7). A server generating a successful response SHOULD send Allow and any header fields that describe optional features. Not cacheable.
- **TRACE**: the client MUST NOT send content, and MUST NOT send fields containing sensitive data such as credentials (§ 9.3.8).

## QUERY (RFC 10008)

QUERY asks the target resource to process the enclosed content as a query and return the result, safely and idempotently (RFC 10008 § 2). Use it instead of POST when a read-only query does not fit in a URI.

- The request content and its media type define the query. A server MUST fail the request when the Content-Type is missing or inconsistent with the content (§ 2).
- Status codes (§ 2.1):
  - 400 when the media type is missing or does not match the content; the server must not sniff a type.
  - 415 when the media type is not supported for queries; include Accept-Query.
  - 422 when the query is syntactically valid and its type is supported but it cannot be processed (for example it references unknown fields).
  - 406 when no result format satisfies Accept.
- A 2xx response with Content-Location identifies a resource holding these query results, which the client can GET later (§ 2.3). A Location identifies an "equivalent resource": a URI that repeats the same query when fetched with GET (§ 2.2, § 2.4). Neither URI should contain sensitive content from the query (§ 4).
- Redirects: 301, 302, 307 and 308 repeat the request as QUERY with the same content; the historical POST-to-GET rewrite does not apply. 303 means fetch the Location with GET (§ 2.5).
- Conditional requests apply as for any method (§ 2.6). Range requests work as for GET, but query formats are expected to page with their own features (such as SQL `FETCH FIRST ... ROWS ONLY`) instead (§ 2.8).
- Caching: responses are cacheable. The cache key MUST include the request content and its related metadata; caches MAY normalise the content (for example remove encodings or reorder semantically insignificant parts) but should not when `no-transform` is present (§ 2.7).
- Accept-Query (§ 3) is a response field listing accepted query media types as a Structured Field List of Tokens or Strings, processed per RFC 9651 § 4. Token and String are equivalent there, and recipients MUST NOT treat them differently. It applies to every URI with the same path, ignoring the query component. Example: `Accept-Query: "application/jsonpath", application/sql;charset="UTF-8"`.
- Discovery: list QUERY in Allow, for example in an OPTIONS response (Appendix A.2). Browsers send a CORS preflight for QUERY, so the server must allow it there (§ 4).

## Response context fields

- **Allow** lists the methods the target supports (§ 10.2.1). An origin MUST send it in 405 and SHOULD send it with a successful OPTIONS. An empty Allow means the resource allows no methods, for example while it is temporarily disabled.
- **Location** is a URI-reference, resolved against the target URI (§ 10.2.2). In 201 it identifies the primary resource created; in 3xx it is the preferred redirect target. If it has no fragment, a user agent applies the original target URI's fragment.
- **Content-Location** identifies a resource that corresponds to the enclosed representation (§ 8.7):
  - When it equals the target URI in a GET or HEAD response, the content is a representation of the target.
  - In a response to a state-changing method (for example PUT or POST) where Content-Location equals the target URI, the content is the new representation of the target, which saves a follow-up GET.
  - In a GET or HEAD response where it differs from the target URI, it is the more specific URI of the negotiated representation.
  - In a 201 where Content-Location equals Location, the content is the new resource's representation.
  - Otherwise, in a 2xx, the content is a status report about the action, available later with GET at that URI (for example a receipt).
  - A Content-Location in a request only says where the client got the content; the origin MUST treat it as transitory context and MUST NOT use it to alter the request semantics.
- **Retry-After** is either an HTTP-date or a number of seconds (§ 10.2.3). Send it with 503 to say how long the service will be unavailable, with 3xx to ask the client to wait before following the redirect, and with 413 when the condition is temporary (§ 15.5.14). Example: `Retry-After: 120`. For request quotas use the `ratelimit-headers` skill.

## Status codes

General rules (§ 15):

- A client MUST understand the class of any status code and treat an unrecognised code as the `x00` of its class (for example an unknown 471 as 400). Values outside 100 to 599 are invalid (§ 15).
- Heuristically cacheable codes, which caches may store without explicit freshness: 200, 203, 204, 206, 300, 301, 308, 404, 405, 410, 414 and 501 (§ 15.1).

Success (§ 15.3):

| Code | Use                                            | Rules                                                                                                        |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 200  | Success with a representation or status report | A 200 to GET SHOULD carry the validators (strong ETag, Last-Modified) when they exist (§ 15.3.1)             |
| 201  | One or more resources created                  | The primary resource is identified by Location, or by the target URI when there is no Location (§ 15.3.2)    |
| 202  | Accepted for processing that is not complete   | Noncommittal; the representation should describe the current status and point to a status monitor (§ 15.3.3) |
| 204  | Success with no content                        | Header fields refer to the target resource after the action; no content follows (§ 15.3.5)                   |
| 206  | Partial content for a Range request            | See [`conditional-and-range.md`](conditional-and-range.md) (§ 15.3.7)                                        |

Redirection (§ 15.4):

- A user agent following a redirect removes the header fields it generated itself (including resource-specific ones such as Referer, Origin, Authorization and Cookie), and considers removing caller-supplied Authorization and Cookie where there are security implications (§ 15.4).
- 301 and 302 allow a user agent to change POST to GET; 307 and 308 were added as the method-preserving redirects, and a user agent MUST NOT change the method on 307. Use 307 or 308 when an API redirect must keep the method and content (§ 15.4, § 15.4.2, § 15.4.3, § 15.4.8).
- 303 points the client to a different resource, fetched with GET, for example a status resource after a POST (§ 15.4.4).
- 304: see [`conditional-and-range.md`](conditional-and-range.md) (§ 15.4.5).

Client errors (§ 15.5):

| Code | Use                                                                                                      | Rules                                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 400  | Malformed syntax, invalid framing or deceptive routing; a request the server cannot or will not process  | § 15.5.1                                                                                                   |
| 401  | Missing or invalid authentication credentials                                                            | MUST carry WWW-Authenticate with at least one challenge (§ 15.5.2)                                         |
| 403  | Understood but refused; new credentials will not help                                                    | A server that wants to hide the resource's existence MAY send 404 instead (§ 15.5.4)                       |
| 404  | No current representation, or the server will not disclose one                                           | § 15.5.5                                                                                                   |
| 405  | Method known but not supported by this resource                                                          | MUST carry Allow (§ 15.5.6)                                                                                |
| 406  | No acceptable representation, and the server will not send a default                                     | SHOULD list the available representations; sending a default instead is allowed (§ 15.5.7, § 12.4.1)       |
| 409  | Conflict with the resource's current state, for example a PUT version conflict                           | Include enough information for the client to resolve the conflict (§ 15.5.10)                              |
| 410  | Gone, and likely permanent                                                                               | Use 404 when unsure whether the condition is permanent (§ 15.5.11)                                         |
| 412  | A precondition in the request evaluated to false                                                         | § 15.5.13, see [`conditional-and-range.md`](conditional-and-range.md)                                      |
| 413  | Content Too Large                                                                                        | The server MAY close the connection; if the condition is temporary, it SHOULD send Retry-After (§ 15.5.14) |
| 415  | Content format or encoding not supported                                                                 | Use Accept or Accept-Encoding in the response to say what is supported (§ 15.5.16, § 12.5.3)               |
| 416  | None of the requested ranges can be satisfied                                                            | § 15.5.17                                                                                                  |
| 421  | Request reached a server that cannot answer for this origin                                              | § 15.5.20                                                                                                  |
| 422  | Content type and syntax are fine but the instructions cannot be processed, for example failed validation | § 15.5.21                                                                                                  |
| 426  | The server requires a protocol upgrade                                                                   | MUST carry Upgrade (§ 15.5.22)                                                                             |

Server errors (§ 15.6): 500 for unexpected conditions; 501 for an unrecognised method; 502 and 504 from gateways when the upstream response is invalid or late; 503 for temporary overload or maintenance, optionally with Retry-After (§ 15.6.1 to § 15.6.5).

## Designing new fields

When an API defines its own header fields (RFC 9110 § 16.3.2):

- Choose a short but descriptive name, prefixed with the application's name when the field is limited to one application (`Foo-Desc`, not `Description`) (§ 16.3.2.1).
- New field names SHOULD use only letters, digits, `-` and `.`, and SHOULD start with a letter. Avoid `_`, which some gateways mangle (§ 16.3.2.1, § 17.10). Do not prefix new names with `X-` (§ 16.3.2.1, BCP 178).
- Define the value as a Structured Field and say whether it is a List, Dictionary or Item: see [`structured-fields.md`](structured-fields.md). Values must survive field-line combination with commas, so delimit or encode commas inside values (§ 16.3.2.2).
- For a singleton field, document what a recipient does when several values arrive; ignoring the field is a sensible default (§ 16.3.2.2).

## Security notes

- Do not put credentials, tokens or other sensitive data in URIs; they leak through logs, Referer and history (§ 17.9).
- Limit the size of every protocol element you parse (URIs, field names and values, numbers, content); reject long URIs with 414 and large content with 413 (§ 17.5).
- Server, Via and User-Agent reveal software details; proxies at a firewall should not leak internal host names (§ 17.12).
