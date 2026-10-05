# API extension fields: Link, Deprecation, Sunset, api-catalog, Prefer, Idempotency-Key

Read this when adding links between resources, announcing a deprecation or retirement, publishing an API catalog, honouring client preferences, or handling retries of unsafe requests. Sources: RFC 8288, RFC 9745, RFC 8594, RFC 9727, RFC 7240 and draft-ietf-httpapi-idempotency-key-header-07, listed in [Sources](../SKILL.md#sources). For RateLimit fields use the `ratelimit-headers` skill; for error bodies use the `problem-details` skill.

## Link (RFC 8288)

```text
Link       = #link-value
link-value = "<" URI-Reference ">" *( OWS ";" OWS link-param )
link-param = token BWS [ "=" BWS ( token / quoted-string ) ]
```

- **Target** (§ 3.1): the URI between angle brackets. Parsers MUST resolve a relative reference against the link context's base per RFC 3986; a base URI in the response content is not applied.
- **Context** (§ 3.2): by default, the URL of the representation the header is associated with. The `anchor` parameter overrides it; a link application MUST NOT process a link with an anchor it does not apply, and relative anchors are resolved the same way.
- **Relation type** (§ 3.3): `rel` MUST be present, and MUST NOT appear more than once in a link-value; parsers ignore later occurrences. One `rel` can hold several space-separated types, which creates one link per type. Relation types are compared case-insensitively, so extension types SHOULD be all-lowercase URIs (§ 2.1.1, § 2.1.2). Extension types MUST be absolute URIs in Link and MUST be quoted when they contain characters not allowed in a token, such as `;` or `,`, for example `rel="https://example.net/rel/other"`. `rev` is deprecated (§ 3.3).
- **Parameters** (§ 3, § 3.4): token and quoted-string forms are equivalent (`x=y` and `x="y"`), and recipients MUST parse both. `hreflang`, `media`, `title`, `title*` and `type` are hints about the target; `media`, `title`, `title*` and `type` MUST NOT appear more than once per link-value. Prefer `title*` over `title` when both are present. `type` must be quoted because a media type contains `/` (Appendix C).
- Several links in one field and several Link fields are equivalent: `Link: <https://example.org/>; rel="start", <https://example.org/index>; rel="index"` (§ 3.5).
- Appendix B gives a parsing algorithm; use it, or a library that implements it, instead of splitting on commas.
- **Security** (§ 5): Link content is not secure, private or integrity-protected without TLS. Links whose `anchor` points to another resource are third-party assertions; discard them unless a relationship between the resources is established, for example the same authority.

## Deprecation (RFC 9745)

- **Syntax** (§ 2.1): an Item Structured Header whose value MUST be a Date (RFC 9651 § 3.3.7). The date can be in the past (already deprecated) or the future (will be deprecated). Example: `Deprecation: @1688169599` (30 June 2023, 23:59:59 UTC).
- **Scope** (§ 2.2): the resource identified by the response. A resource may document a wider scope (for example, Deprecation only on an API's home document, meaning the whole API), but clients unaware of that documentation will read it as applying to the one resource.
- **Documentation link** (§ 3, § 3.1): point to human-readable deprecation information with the `deprecation` link relation: `Link: <https://developer.example.com/deprecation>; rel="deprecation"; type="text/html"`.
- **Sunset** (§ 4): to also announce when the resource stops responding, add a Sunset field (RFC 8594). The Sunset time MUST NOT be earlier than the Deprecation time.
- **Behaviour** (§ 5): deprecation alone does not change how the resource behaves.
- **Clients** (§ 7): treat the field as a hint. Verify linked documentation, and treat links as untrustworthy unless served over HTTPS. Once the date has passed, clients MUST NOT assume the resource keeps behaving as before; for a future date they SHOULD plan their migration.
- The RFC's own Sunset example (§ 4) writes the zone as "UTC"; an HTTP-date uses "GMT" (RFC 9110 § 5.6.7), so write `Sunset: Sun, 30 Jun 2024 23:59:59 GMT`.

## Sunset (RFC 8594)

- **Syntax** (§ 3): `Sunset = HTTP-date`, which SHOULD be in the future. Example: `Sunset: Sat, 31 Dec 2018 23:59:59 GMT`. Treat a past timestamp as "now". The timestamp is a hint: the resource may stay up longer or go away earlier.
- **Purpose** (§ 1, § 1.4): the resource is expected to become unresponsive at that time. Uses include temporary resources, migrations, retention limits, and the final stage of an API deprecation (after the "no longer preferred" stage that Deprecation announces).
- **Caching** (§ 4): Sunset is unrelated to freshness; set Cache-Control separately.
- **Scope** (§ 5): the resource that returns it. As with Deprecation, a wider documented scope (such as a whole API announced on its home resource) is invisible to clients that do not know the documentation, and clients must work without Sunset information.
- **Policy link** (§ 6): `Link: <http://example.net/sunset>;rel="sunset";type="text/html"` points to the sunset policy. Clients SHOULD verify that linked policy information is authentic and applies only to resources within its scope (§ 8).
- **Security** (§ 8): an upcoming sunset can leak information (for example when a registration expires); leave it out where it would.

Typical retirement sequence: send `Deprecation` and a `deprecation` link, then add `Sunset` with a date no earlier than the deprecation date, and keep behaviour unchanged until the sunset (RFC 9745 § 4, § 5; RFC 8594 § 3).

## api-catalog (RFC 9727)

- **Well-known URI** (§ 2): a publisher supporting it SHALL answer an HTTPS `GET /.well-known/api-catalog` with the catalog document, and an HTTPS `HEAD` with a Link header carrying the `api-catalog` relation.
- **Link relation** (§ 3): `api-catalog` points to a list of the publisher's APIs, so any resource can link to its catalog: `Link: </.well-known/api-catalog>; rel="api-catalog"`. Inside a catalog, the `item` relation identifies each API (§ 3.1).
- **Contents** (§ 4.1): the catalog MUST link to the API endpoints. It is RECOMMENDED to include metadata such as usage policies, version information and links to OpenAPI descriptions; otherwise make that metadata available at the endpoint URIs.
- **Format** (§ 4.2, § 6.2): the catalog MUST be served as Linkset JSON, `application/linkset+json` (RFC 9264), and SHOULD carry `profile="https://www.rfc-editor.org/info/rfc9727"`. Other formats MAY be offered by content negotiation, but a Linkset with at least the endpoint links is always required.
- **Nesting** (§ 4.3): a catalog can link to other catalogs with `api-catalog`.
- **Operations** (§ 5.1, § 5.3, § 5.4): with APIs on several domains, publish the well-known URI on each and redirect to one canonical catalog; use caching and compression for large catalogs; monitor availability and remove retired APIs.
- **Security** (§ 8): serve it only over HTTPS; review it for leaked internal or sensitive metadata before publishing; keep it read-only for external requests; rate-limit it; protect internal catalogs with access controls and CORS policies.

Example response (Appendix A.2):

```http
HTTP/1.1 200 OK
Content-Type: application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"

{ "linkset": [
    { "anchor": "https://www.example.com/.well-known/api-catalog",
      "item": [
        { "href": "https://developer.example.com/apis/foo_api" },
        { "href": "https://developer.example.com/apis/bar_api" }
      ] } ] }
```

## Prefer and Preference-Applied (RFC 7240)

```text
Prefer     = "Prefer" ":" 1#preference
preference = token [ BWS "=" BWS word ] *( OWS ";" [ OWS parameter ] )
parameter  = token [ BWS "=" BWS word ]
```

- **Optional by design** (§ 2): preferences are requests for optional behaviour. A server that does not recognise or cannot honour a preference MUST ignore it and continue, never fail the request.
- **Parsing** (§ 2): names are case-insensitive and values case-sensitive; an empty value equals no value. Several Prefer fields equal one comma-joined field. If a preference repeats, only the first counts and later ones SHOULD be ignored. Parameter order has no meaning.
- **Intermediaries** (§ 2): Prefer is end-to-end; a proxy MUST forward it unless Connection marks it hop-by-hop.
- **Caching** (§ 2): do not use Prefer for content negotiation. If honouring a preference can change a cacheable response, the response MUST include `Vary: Prefer`, whether or not this request sent Prefer (or `Vary: *`, which defeats proxy caching).
- **Preference-Applied** (§ 3): a response MAY list the preferences that were applied, without parameters, for example `Preference-Applied: return=representation`. Send it when the client cannot tell from the response alone.
- **Defined preferences** (§ 4):

| Preference                             | Meaning                                                                                                                    | Section |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| `respond-async`                        | The client can handle an asynchronous reply; the server may answer 202 with a Location for the status                      | § 4.1   |
| `return=representation`                | Include the current representation of the resource in a success response; use Content-Location when it is another resource | § 4.2   |
| `return=minimal`                       | Send a minimal success response, typically 204, or 201 with only Location                                                  | § 4.2   |
| `wait=N`                               | The client expects processing to take at most N seconds; past that, the server may go asynchronous (for example 202)       | § 4.3   |
| `handling=strict` / `handling=lenient` | Reject a request with minor errors, or try to process it anyway                                                            | § 4.4   |

- `return=minimal` with `return=representation`, or `handling=strict` with `handling=lenient`, in one request can be treated as if neither was sent (§ 4.2, § 4.4).
- RFC 8144 updates RFC 7240 with Prefer for WebDAV, including the `depth-noroot` preference.

Example (§ 3):

```http
PATCH /my-document HTTP/1.1
Content-Type: application/example-patch
Prefer: return=representation

HTTP/1.1 200 OK
Content-Type: application/json
Preference-Applied: return=representation
Content-Location: /my-document
```

## Idempotency-Key (draft-ietf-httpapi-idempotency-key-header-07, preview, track)

The draft expired on 18 April 2026 and has no newer revision. Under the **track** posture, do not add this field to a new API on the strength of the draft. When an API already uses it, or the user explicitly requires it, follow the -07 shape below, cite it as an expired Internet-Draft, and keep RFC 9110 § 9.2.2 retry rules as the baseline. See [`versions.md`](versions.md#preview-idempotency-key-draft-07).

- **Syntax** (§ 2.1): an Item Structured Header defined against RFC 8941, whose value MUST be a String: `Idempotency-Key: "8e03978e-40d5-43e8-bc93-6894a57f9324"`. Because it references RFC 8941, it cannot carry RFC 9651-only types (RFC 9651 § 2.4).
- **Keys** (§ 2.2): a key MUST be unique and MUST NOT be reused for a request with different content; the resource owner defines uniqueness and clients implement it. A UUID or similar random value is RECOMMENDED.
- **Expiry** (§ 2.3): the resource MAY expire keys and SHOULD document the expiry policy.
- **Fingerprint** (§ 2.4): the resource MAY combine the key with a fingerprint of the request content (for example a checksum) to detect reuse with different content.
- **Publication** (§ 2.5.2): a resource that uses idempotency keys MUST publish its idempotency specification, including any expiry policy.
- **Enforcement** (§ 2.6): a first request is processed normally; a retry after completion SHOULD get the original result, success or error; a retry while the original is still running SHOULD get a conflict.
- **Errors** (§ 2.7):

| Situation                                                 | Status | Notes                                                         |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| Key missing on an operation that documents it as required | 400    | Body or `Link: <...>; rel="describedby"` to the documentation |
| Key reused with different request content                 | 422    | Same                                                          |
| Original request still being processed                    | 409    | Same; the client may retry unchanged later                    |

- Clients MUST correct the request before retrying after a 400 or 422; otherwise the resource MUST fail it again (§ 2.7). For the body format use the `problem-details` skill; the draft's JSON examples contain trailing commas and are not valid JSON.
- **Security** (§ 5): fix and publish a key format and validate every key against it before processing (injection); use a composite lookup key that combines the client's key with client-specific attributes known only to the resource, so that guessed low-entropy keys cannot fetch another client's stored results (data leaks).
