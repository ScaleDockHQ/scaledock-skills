# Validators, conditional requests and range requests

Read this when generating ETag or Last-Modified, preventing lost updates with If-Match, answering 304 or 412, or adding Range support. Sources: RFC 9110 § 8.8, § 13, § 14, § 15.3.7, § 15.4.5, § 15.5.13, § 15.5.17 and § 17.14 to § 17.15, listed in [Sources](../SKILL.md#sources). Cache-side validation is in [`caching.md`](caching.md).

## Validators

- **Strong vs weak** (§ 8.8.1): a strong validator changes whenever the representation data changes in a way observable in a 200 to GET. A weak validator may stay the same across changes the origin considers insignificant. Strong validators work for every conditional request; weak ones only where a byte-for-byte match is not needed (cache validation, If-None-Match), never for If-Match or range combination.
- Different content codings of the same resource (for example gzip and identity) are different representations and need different strong ETags (§ 8.8.3.3).
- **ETag** (§ 8.8.3) syntax:

  ```text
  ETag       = entity-tag
  entity-tag = [ weak ] opaque-tag
  weak       = %s"W/"
  opaque-tag = DQUOTE *etagc DQUOTE
  ```

  - The quotes are part of the value: `ETag: "xyzzy"`, `ETag: W/"xyzzy"`, `ETag: ""`. `W/` is case-sensitive.
  - An origin MUST mark a tag that is not strong with `W/`. Avoid backslashes in tags; they cause interoperability problems (§ 8.8.3).
  - An origin SHOULD send an ETag for any selected representation whose changes can be detected reasonably and consistently (§ 8.8.3.1). Typical sources are a revision number, a hash of the content, or a modification timestamp with sub-second precision (§ 8.8.3).

- **Last-Modified** (§ 8.8.2): an origin SHOULD send it when it can determine a modification date. It MUST NOT send a Last-Modified later than its own Date; a modification time in the future MUST be replaced with the message origination date (§ 8.8.2.1). A Last-Modified date is implicitly weak unless the origin can determine it is strong, for example because it was at least a reasonable time before Date (§ 8.8.2.2).
- Send both validators in a 200 to GET when they exist: a strong ETag and Last-Modified (§ 8.8.2.1, § 8.8.3.1, § 15.3.1).
- A successful PUT response carries a validator only when the content was stored without transformation (§ 9.3.4).

Comparison (§ 8.8.3.2): strong comparison matches only when both tags are strong and their opaque-tags are identical character by character; weak comparison matches when the opaque-tags are identical, ignoring `W/`.

| ETag 1  | ETag 2  | Strong comparison | Weak comparison |
| ------- | ------- | ----------------- | --------------- |
| `W/"1"` | `W/"1"` | no match          | match           |
| `W/"1"` | `W/"2"` | no match          | no match        |
| `W/"1"` | `"1"`   | no match          | match           |
| `"1"`   | `"1"`   | match             | match           |

## Preconditions

| Field                 | Value                     | Comparison | Typical use                                              | When false                                                                |
| --------------------- | ------------------------- | ---------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `If-Match`            | `*` or a list of ETags    | strong     | Lost-update prevention on PUT, PATCH, DELETE, POST       | MUST NOT perform the method; 412, or a 2xx if the change already happened |
| `If-None-Match`       | `*` or a list of ETags    | weak       | Cache revalidation on GET; `*` prevents overwrite on PUT | 304 for GET and HEAD; 412 otherwise                                       |
| `If-Modified-Since`   | HTTP-date                 | date       | Cache revalidation when no ETag is known                 | SHOULD send 304                                                           |
| `If-Unmodified-Since` | HTTP-date                 | date       | Lost-update prevention when no ETag is known             | MUST NOT perform the method; 412, or a 2xx if already done                |
| `If-Range`            | one strong ETag or a date | strong     | Resuming a download                                      | Ignore Range and send the full 200                                        |

Rules per field:

- **If-Match** (§ 13.1.1): an origin MUST use strong comparison. `*` is true when the target has a current representation. A list that mixes `*` and tags is invalid. When false, the origin MUST NOT apply the method; it can send 412, or a 2xx when it can tell that the requested change was already made (for example, a repeated request whose result already has the current ETag). Caches and intermediaries MAY ignore If-Match.
- **If-None-Match** (§ 13.1.2): a recipient MUST use weak comparison. `*` is false when any current representation exists, which makes `If-None-Match: *` on PUT a "create only, never overwrite" request. When false, the server MUST NOT perform the method; it MUST answer 304 for GET and HEAD and 412 for every other method.
- **If-Modified-Since** (§ 13.1.3): a recipient MUST ignore it when the request has If-None-Match, when the date is invalid, when the method is not GET or HEAD, or when the resource has no modification date. When the representation has not changed since the date, the origin SHOULD send 304.
- **If-Unmodified-Since** (§ 13.1.4): a recipient MUST ignore it when the request has If-Match, when the date is invalid, or when the resource has no modification date. When false, the origin MUST NOT perform the method; it can send 412, or a 2xx when the change was already made.
- **If-Range** (§ 13.1.5): a client MUST NOT send it without Range, MUST NOT send a weak ETag in it, and SHOULD send a date only when it has no ETag and the date is strong (§ 8.8.2.2). The server compares the ETag strongly or the date for an exact match; when false, it MUST ignore Range and send the full representation.

When and in what order to evaluate (§ 13.2):

1. Do the normal request checks first (authentication, routing, method, syntax). A server MUST ignore all preconditions when the response without them would have been anything other than 2xx or 412: redirects, 401, 403, 404 and validation errors win over preconditions (§ 13.2.1).
2. Evaluate preconditions just before processing the content or performing the method (§ 13.2.1).
3. Evaluate in this order (§ 13.2.2):
   1. If-Match, at the origin: false gives 412, unless the change already succeeded.
   2. If-Unmodified-Since, at the origin and only without If-Match: false gives 412, unless already done.
   3. If-None-Match: false gives 304 for GET and HEAD, 412 for other methods.
   4. If-Modified-Since, for GET and HEAD without If-None-Match: false gives 304.
   5. If-Range, for GET with Range: true and applicable gives 206; otherwise ignore Range and send 200.
   6. Perform the method.

- A server that is neither the origin nor a cache for the target MUST NOT evaluate these fields and MUST forward them. Every server MUST ignore them on CONNECT, OPTIONS and TRACE (§ 13.2.1).

## Lost-update pattern

1. The client GETs the resource and keeps its strong ETag.
2. The client sends `PUT` (or another unsafe method) with `If-Match: "<etag>"`.
3. The origin evaluates If-Match strongly against the current representation. If it matches, apply the change and return 200 or 204 with the new ETag (only if the stored content is exactly what was sent, § 9.3.4). If not, return 412 and do not change anything (§ 13.1.1).
4. On 412, the client fetches the current state, merges or asks the user, and retries with the new ETag.

For a create-only PUT, send `If-None-Match: *` instead; a 412 then means the resource already exists (§ 13.1.2). RFC 9110 does not require a server to reject unconditional unsafe requests and defines no status code for "precondition required"; if an API wants that, its own documentation has to define it.

## 304 and 412 responses

- **304 Not Modified** (§ 15.4.5): the server MUST send any of Content-Location, Date, ETag and Vary, and any of Cache-Control and Expires, that it would have sent in a 200 for the same request. It SHOULD NOT send other representation metadata unless that metadata helps caches update. A 304 has no content.
- **412 Precondition Failed** (§ 15.5.13): one or more conditions in the request header fields evaluated to false. Send it for a failed If-Match or If-Unmodified-Since, and for a failed If-None-Match on a non-GET method. For the body, use the `problem-details` skill.

## Range requests

Range support is optional: a server MAY ignore Range, but origins and caches ought to support byte ranges where possible (§ 14.2).

- **Units** (§ 14.1): range units are compared case-insensitively. `bytes` is the only unit defined by RFC 9110.

  ```text
  ranges-specifier = range-unit "=" range-set
  range-set        = 1#range-spec
  range-spec       = int-range / suffix-range / other-range
  int-range        = first-pos "-" [ last-pos ]
  suffix-range     = "-" suffix-length
  ```

- **Byte ranges** (§ 14.1.2): positions are zero-based and inclusive, and refer to the bytes of the selected representation after any content coding. `bytes=0-499` is the first 500 bytes; `bytes=500-` is everything from byte 500; `bytes=-500` is the last 500 bytes. A range-set is satisfiable when it has an int-range whose first-pos is less than the representation length, or a suffix-range with a non-zero length. Recipients MUST anticipate very large numbers and guard against integer overflow.
- **Range** (§ 14.2):
  - Range handling is defined only for GET in RFC 9110; a server MUST ignore Range on other or unknown methods. An origin MUST ignore Range with a unit it does not understand.
  - A server MAY ignore or reject invalid range-specifiers, more than two overlapping ranges, or many small ranges out of order (a denial-of-service pattern, § 17.15). It MAY ignore Range on a zero-length representation.
  - Range is applied only after all preconditions are true and only when the response without Range would be 200; it is ignored when a conditional GET would result in 304.
  - When the range is satisfiable, the server SHOULD send 206; when it is not, it SHOULD send 416.
- **Accept-Ranges** (§ 14.3): `Accept-Ranges: bytes` advertises support; `Accept-Ranges: none` discourages range requests. A client MUST NOT assume that a server which sent `bytes` will honour every range request.
- **Content-Range** (§ 14.4):
  - Single range in a 206: `Content-Range: bytes 42-1233/1234`, or `bytes 42-1233/*` when the length is unknown.
  - In a 416: `Content-Range: bytes */1234`, so the client learns the current length (§ 15.5.17).
  - A recipient MUST NOT combine a part whose Content-Range is invalid with other parts. A server MUST ignore Content-Range in a request with a method that does not define its meaning; RFC 9110 defines none except partial PUT (§ 14.4, § 14.5).
- **206 Partial Content** (§ 15.3.7):
  - The server MUST send any of Date, Cache-Control, ETag, Expires, Content-Location and Vary that it would have sent in a 200 for the same request.
  - One range: MUST send Content-Range (§ 15.3.7.1).
  - Several ranges: send `multipart/byteranges`, each part with its own Content-Range; there MUST NOT be a Content-Range field in the top-level header section, and the server MUST NOT use multipart for a single range (§ 15.3.7.2, § 14.6).
  - A client combines partial responses only when they have matching strong validators (§ 15.3.7.3).
- **Partial PUT** (§ 14.4, § 14.5): some origins accept Content-Range on PUT to update part of a representation, based on a private agreement with the client. An origin SHOULD answer 400 when it receives Content-Range on a PUT to a resource that does not support partial PUT. PATCH is the alternative for partial updates.

## Security

- Validators do not ensure the validity of a representation, guard against malicious changes or detect on-path attacks (§ 17.14).
- A per-user entity tag in a long-lived cacheable response works as a persistent tracking identifier (§ 17.14); derive tags from the representation, not from the client.
- Many small or overlapping ranges can be used for denial of service; coalesce or reject them (§ 14.2, § 17.15).
