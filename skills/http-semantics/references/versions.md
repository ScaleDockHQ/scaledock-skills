# Versions and upgrades

Read this when choosing which RFC to build to, reading an API, server or field definition that cites RFC 7230-7235 or RFC 8941, moving POST-based queries to QUERY, or deciding what to do with the Idempotency-Key draft. Sources: the RFC text of each line, the change appendices (RFC 9110 Appendix B, RFC 9111 Appendix B, RFC 9651 Appendix D, RFC 8288 Appendix C), the RFC Editor metadata for obsoletes and updates, and the datatracker entries for the drafts, listed in [Sources](../SKILL.md#sources).

## Version lines

The skill covers several separately published IETF specifications, so each one is its own family with its own current line: `core` (RFC 9110 and RFC 9111, taught together because RFC 9111 defines the caching that RFC 9110 refers to as [CACHING]), `query`, `structured-fields`, `web-linking`, `deprecation`, `sunset`, `api-catalog` and `prefer`. The Idempotency-Key preview has no released line of its own, so it is filed under the `core` family; that is bookkeeping only, not a claim that it is the next version of RFC 9110.

| Id                        | Line                                      | Status  | Revision                                                                                          | Posture | Summary                                                                                                  |
| ------------------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `idempotency-key-preview` | Idempotency-Key draft-07                  | preview | draft-ietf-httpapi-idempotency-key-header-07 (15 October 2025), expired 18 April 2026             | track   | A request field that lets a server recognise retries of POST or PATCH. WG document, no newer revision.   |
| `rfc9110`                 | RFC 9110 and RFC 9111                     | current | RFC 9110 (STD 97) and RFC 9111 (STD 98), Internet Standard, June 2022                             |         | The default target for methods, status codes, conditionals, negotiation, ranges and caching.             |
| `rfc9112`                 | RFC 9112 HTTP/1.1                         | current | RFC 9112, Internet Standard, June 2022. Obsoletes portions of RFC 7230.                           |         | HTTP/1.1 message syntax, message parsing and connection management.                                      |
| `rfc7230-7235`            | RFC 7230-7235                             | legacy  | RFC 7230 to RFC 7235, Proposed Standard, June 2014                                                |         | HTTP/1.1 in six parts. Obsoleted by RFC 9110, RFC 9111 and RFC 9112.                                     |
| `rfc10008`                | RFC 10008 QUERY                           | current | RFC 10008, Proposed Standard, June 2026 (published from draft-ietf-httpbis-safe-method-w-body-14) |         | The safe, idempotent QUERY method with request content, and the Accept-Query field.                      |
| `rfc9651`                 | RFC 9651 Structured Fields                | current | RFC 9651, Proposed Standard, September 2024                                                       |         | Lists, Dictionaries and Items for new fields; adds Date and Display String. Obsoletes RFC 8941.          |
| `rfc8941`                 | RFC 8941 Structured Fields                | legacy  | RFC 8941, Proposed Standard, February 2021                                                        |         | The first Structured Fields RFC, without Date or Display String. Still cited by older field definitions. |
| `rfc8288`                 | RFC 8288 Web Linking                      | current | RFC 8288, Proposed Standard, October 2017                                                         |         | The link model and the Link header field. Obsoletes RFC 5988.                                            |
| `rfc9745`                 | RFC 9745 Deprecation                      | current | RFC 9745, Proposed Standard, March 2025                                                           |         | The Deprecation response field (a Structured Date) and the `deprecation` link relation.                  |
| `rfc8594`                 | RFC 8594 Sunset                           | current | RFC 8594, Informational, May 2019                                                                 |         | The Sunset response field (an HTTP-date) and the `sunset` link relation.                                 |
| `rfc9727`                 | RFC 9727 api-catalog                      | current | RFC 9727, Proposed Standard, June 2025                                                            |         | The `/.well-known/api-catalog` URI and the `api-catalog` link relation, served as a Linkset.             |
| `rfc7240`                 | RFC 7240 Prefer                           | current | RFC 7240, Proposed Standard, June 2014, updated by RFC 8144                                       |         | The Prefer and Preference-Applied fields with `return`, `respond-async`, `wait` and `handling`.          |
| `rfc7838`                 | RFC 7838 Alt-Svc                          | current | Standards Track, April 2016                                                                       |         | Alternative Services at a separate network location.                                                     |
| `rfc8297`                 | RFC 8297 Early Hints                      | current | Experimental, December 2017                                                                       |         | The 103 status for hints before the final response.                                                      |
| `rfc8942`                 | RFC 8942 Client Hints                     | current | Experimental, February 2021                                                                       |         | Request hints for proactive content negotiation.                                                         |
| `rfc9211`                 | RFC 9211 Cache-Status                     | current | Standards Track, June 2022                                                                        |         | How caches handled the response.                                                                         |
| `rfc9209`                 | RFC 9209 Proxy-Status                     | current | Standards Track, June 2022                                                                        |         | Why an intermediary generated the response.                                                              |
| `rfc9213`                 | RFC 9213 Targeted Cache-Control           | current | Standards Track, June 2022                                                                        |         | Cache directives aimed at a named cache.                                                                 |
| `rfc9218`                 | RFC 9218 Priority                         | current | Standards Track, June 2022                                                                        |         | Urgency and incremental prioritization.                                                                  |
| `rfc5789`                 | RFC 5789 PATCH                            | current | Standards Track, March 2010                                                                       |         | Partial modification of an existing resource.                                                            |
| `rfc7578`                 | RFC 7578 multipart/form-data              | current | Standards Track, July 2015                                                                        |         | The multipart/form-data media type. Obsoletes RFC 2388.                                                  |
| `rfc9652`                 | RFC 9652 Link-Template                    | current | Standards Track, September 2024                                                                   |         | A URI template in a link field.                                                                          |
| `rfc9842`                 | RFC 9842 Compression Dictionary Transport | current | Standards Track, September 2025                                                                   |         | Dictionary-based HTTP compression.                                                                       |
| `resumable-upload`        | Resumable Uploads draft-12                | current | draft-12, 6 July 2026, expires 7 January 2027                                                     | track   | The only line is a draft, so it is current with posture track.                                           |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The QUERY method was expected here as a preview (draft-ietf-httpbis-safe-method-w-body). The datatracker shows revision -14 as the last one and the document as "RFC Published", and the RFC Editor lists it as RFC 10008 (June 2026), so it is a current line, not a preview. RFC 2616, which RFC 7230-7235 obsoleted, has no line of its own: upgrade anything that still cites it with the RFC 7230-7235 checklist below.

## Which version to use

- Cite RFC 9110 for semantics and RFC 9111 for caching in all new API documentation and code. Both are Internet Standards; the RFC Editor lists no RFC that updates or obsoletes either.
- Use QUERY (RFC 10008) when a safe query needs request content. Keep GET when the query fits in the URI and caching by URI matters.
- Define new fields against RFC 9651. A field already defined against RFC 8941 stays on RFC 8941 types: it cannot start using Date or Display String, because RFC 8941 parsers reject them (RFC 9651 § 2.4).
- Use RFC 8288, RFC 9745, RFC 8594, RFC 9727 and RFC 7240 as published; each is the only line of its family.
- Use RFC 7838 Alt-Svc, RFC 8297 Early Hints, RFC 8942 Client Hints, RFC 9211 Cache-Status, RFC 9209 Proxy-Status, RFC 9213 Targeted Cache-Control, RFC 9218 Priority, RFC 5789 PATCH, RFC 7578 multipart/form-data, RFC 9652 Link-Template and RFC 9842 Compression Dictionary Transport as published. Each is the only line of its family.
- Resumable Uploads draft-12 is current with posture track: do not add resumable upload procedures until it is an RFC.
- Treat RFC 7230-7235 and RFC 8941 as legacy: read them, upgrade from them, never cite them in new work.
- Idempotency-Key is **track**: do not add it to a new API on the strength of the draft. See [Preview: Idempotency-Key draft-07](#preview-idempotency-key-draft-07).

## What changed

### RFC 9110 and RFC 9111

From RFC 9110 Appendix B and RFC 9111 Appendix B, compared with RFC 7230-7235:

- Structure: semantics for every HTTP version now live in RFC 9110; HTTP/1.1 message syntax moved to RFC 9112; caching is RFC 9111. RFC 9110 also obsoletes RFC 2818, RFC 7538 (308), RFC 7615 and RFC 7694 (RFC Editor metadata; Appendix B.1, B.7 to B.9).
- Terms: "payload" and "payload body" are now "content", and "effective request URI" is now "target URI" (§ 6.4, § 7.1; B.3).
- Status codes: 308 Permanent Redirect, 421 Misdirected Request and 422 Unprocessable Content now live in RFC 9110; 421 is no longer heuristically cacheable (§ 15.4.9, § 15.5.20, § 15.5.21; B.3). 413 is now named "Content Too Large" (RFC 7231 § 6.5.11 called it "Payload Too Large"; RFC 9110 § 15.5.14).
- Methods: request content on GET, HEAD and DELETE is stated to be non-interoperable; client retry rules were loosened to match practice; Content-Range on PUT (partial PUT) is allowed (§ 9.2.2, § 9.3, § 14.5; B.3, B.5).
- Negotiation: Accept and Accept-Encoding may appear in responses; `accept-ext` parameters after `q` are removed; Accept-Charset is deprecated (§ 12.3, § 12.5.1, § 12.5.2; B.3).
- Conditionals: the 60-second rule for treating Last-Modified as strong is relaxed to "reasonable discretion"; preconditions may be evaluated before the request content is processed; the rule forbidding a validator in a 2xx after an already-applied change was removed (§ 8.8.2.2, § 13.2; B.4).
- Ranges: range units are case-insensitive, the grammar is generic over units, and range handling can be defined for extension methods (§ 14.1, § 14.2; B.5).
- Caching: duplicate and conflicting directives are clarified; invalidating Location and Content-Location URIs is now optional and forbidden across origins; `max-age`, `s-maxage`, `max-stale` and `min-fresh` must not be generated in quoted form; `public` and `private` were clarified; `must-understand` is new; Warning is obsoleted and Pragma deprecated (RFC 9111 § 4.2.1, § 4.4, § 5.2, § 5.2.2.3, § 5.4, § 5.5; Appendix B).

### RFC 10008 QUERY

New method, no predecessor. QUERY is safe and idempotent, carries the query as request content, is cacheable with the content in the cache key, and adds the Accept-Query response field (RFC 10008 § 2, § 2.7, § 3).

### RFC 9651 Structured Fields

From RFC 9651 Appendix D, compared with RFC 8941: adds the Date type (§ 3.3.7) and the Display String type (§ 3.3.8); stops encouraging ABNF in new field definitions and moves the ABNF to an informative appendix (§ 2, Appendix C); adds a "Structured Type" column to the HTTP Field Name Registry (§ 5); refines parse failure handling, so a failure now means ignoring the field or treating the whole message as malformed (§ 4.2; RFC 8941 § 4.2 only allowed ignoring the field).

### RFC 8288 Web Linking

From Appendix C, compared with RFC 5988: clarified link and target attribute cardinality, a default link context tied to the representation, a suggested parsing algorithm (Appendix B), token or quoted-string for any parameter, valueless parameters, and the `type` parameter now needs quoting because a token cannot contain `/`.

### RFC 9745, RFC 8594, RFC 9727, RFC 7240

Each is the first and only RFC for its field or URI. RFC 8144 updates RFC 7240 by defining Prefer for WebDAV and the `depth-noroot` preference (RFC 8144 Abstract); it does not change the four core preferences.

## Upgrading

### RFC 7230-7235 to RFC 9110 and RFC 9111

1. Change the version marker: replace citations of RFC 7231, RFC 7232, RFC 7233 and RFC 7235 with the matching RFC 9110 sections, RFC 7234 with RFC 9111, and RFC 7230 with RFC 9110 (architecture, URIs, fields, routing) or RFC 9112 (HTTP/1.1 wire syntax). Rename "payload" to "content" and "effective request URI" to "target URI" in documentation.
2. Replace removed or renamed behaviour:
   - Status names: say "413 Content Too Large" and "422 Unprocessable Content"; cite RFC 9110 for 308, 421 and 422.
   - Stop generating Warning; stop relying on Pragma (RFC 9111 § 5.4, § 5.5). Use Cache-Control.
   - Emit `max-age`, `s-maxage`, `max-stale` and `min-fresh` in token form only (`max-age=60`, never `max-age="60"`) (RFC 9111 § 5.2.1, § 5.2.2).
   - Stop sending Accept-Charset from clients and stop depending on it on servers (§ 12.5.2). Drop `accept-ext` parameters after `q` (§ 12.5.1).
   - Caches: invalidate Location and Content-Location URIs only when they share the target URI's origin (RFC 9111 § 4.4).
   - If a new status code must be cached only by caches that understand it, send `must-understand` together with `no-store` (RFC 9111 § 5.2.2.3).
3. Validate against the target: run the Verify list in `SKILL.md`, check the precondition order against RFC 9110 § 13.2.2, and check every 304, 206 and 416 against the header lists in [`conditional-and-range.md`](conditional-and-range.md).
4. Keep behaviour unchanged: entity tags, Cache-Control values, status codes and redirects stay the same. An upgrade that changes an ETag format or a freshness lifetime invalidates every client cache and is a separate change.

### RFC 8941 to RFC 9651

1. Change the version marker: field definitions and parser documentation cite RFC 9651 instead of RFC 8941.
2. Replace removed or renamed behaviour: none on the wire; every RFC 8941 value parses under RFC 9651 (§ 2.4). Upgrade the parser library to one that implements Date (`@` prefix) and Display String (`%"` prefix), and decide per field whether a parse failure ignores the field or rejects the message (§ 4.2).
3. Validate against the target: run the community test suite named in RFC 9651 Appendix B against the parser.
4. Keep behaviour unchanged: an existing field defined against RFC 8941 keeps its RFC 8941 types; do not start sending a Date in it (§ 2.4). Values that used to fail parsing and now succeed (for example a stray Date in an ignored parameter) must still be rejected by the field's own checks (§ 2.4).

### POST queries to QUERY (RFC 10008)

This is an adoption, not a version upgrade: POST stays valid.

1. Change the version marker: advertise QUERY in `Allow` and list the accepted query media types in `Accept-Query` (RFC 10008 § 3, Appendix A.2, A.3).
2. Replace behaviour: accept the same request content under QUERY; require `Content-Type` and fail with 4xx when it is missing or inconsistent (§ 2, § 2.1); add QUERY to the CORS preflight allow-list (§ 4).
3. Validate against the target: two identical QUERY requests return the same result without side effects; caches in front of the API include the request content in the cache key (§ 2.7).
4. Keep behaviour unchanged: keep the POST endpoint for existing clients until they move; do not change result shapes.

## Preview: Idempotency-Key draft-07

The draft is draft-ietf-httpapi-idempotency-key-header-07, an HTTPAPI working group document dated 15 October 2025. The datatracker shows it as Expired (18 April 2026) with no newer revision as of 2026-10-05. Posture: **track**.

What it contains today: `Idempotency-Key` is an Item Structured Header whose value is a String, defined against RFC 8941 (§ 2.1); keys are unique per request content and should be UUIDs or similar random values (§ 2.2); the resource publishes its key format and expiry policy (§ 2.3, § 2.5.2); a repeat of a completed request gets the original result, a repeat during processing gets 409, a key reused with different content gets 422, and a missing required key gets 400 (§ 2.6, § 2.7). See [`api-lifecycle-fields.md`](api-lifecycle-fields.md).

What not to do: do not add Idempotency-Key to a new API because of this draft, and do not describe it as a standard. Where an API already uses it, or the user explicitly requires it, follow the -07 shape, cite it as an expired Internet-Draft, and keep RFC 9110 retry rules as the baseline (§ 9.2.2). Do not copy the draft's JSON examples literally: they contain trailing commas.

Where to watch: the datatracker page and the HTTPAPI working group. When it is published as an RFC: give it its own family with the RFC as current, move the field rules into the main workflow, and add an upgrade section from draft-07.
