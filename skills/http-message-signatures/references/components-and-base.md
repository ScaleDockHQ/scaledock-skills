# Components and the signature base

Read this when choosing what a signature covers, computing component values, or building the signature base. Source: RFC 9421 § 2 (sections cited bare), RFC 9651 for Structured Fields serialization, and the IANA HTTP Message Signature registries.

## Component identifiers

- A component identifier is a component name plus parameters. The name is either a lowercased HTTP field name or a registered derived component name starting with `@` (§ 2, § 2.1, § 2.2).
- Each identifier MUST occur only once in a covered component list. `"foo";bar` and `"foo";baz` are distinct; `"foo";bar;baz` and `"foo";baz;bar` are the same identifier, and a processor MUST keep the order it received (§ 2).
- Component values MUST NOT contain newlines (§ 2). Derived values are printable characters and spaces only, with no leading or trailing whitespace (§ 2.2).
- The signature context (the target message plus anything else the signer or verifier knows, such as the external target URI or the related request) MUST be the same for every component of one signature and available to both sides (§ 2).

## HTTP fields

- The value is the field value from the header section of the target message (§ 2.1). Non-ASCII values MUST be encoded to ASCII before use; `bs` wraps them (§ 2.1).
- Multiple field lines MUST be combined with `", "` (a comma and one space) in message order (§ 2.1). If the combined value is not available, strip leading and trailing whitespace from each line, replace obs-fold with one space, and join with `", "` (§ 2.1).
- An empty field is signed as an empty value: `"x-empty-header": ` with a single trailing space (§ 2.1).
- Send a covered field as a single line where possible (RECOMMENDED, § 2.1). Order of lines with the same name is significant; reordering them breaks the signature, while reordering different fields does not (Appendix B.4).
- Fields whose values are case-insensitive or otherwise have several equivalent serializations need an agreed handling between signer and verifier (§ 2.1, § 7.5.2).

Example message fragment and its base lines (§ 2.1):

```text
Cache-Control: max-age=60
Cache-Control:    must-revalidate
X-Obs-Fold-Header: Obsolete
    line folding.

"cache-control": max-age=60, must-revalidate
"x-obs-fold-header": Obsolete line folding.
```

### Field parameters

| Parameter | Meaning                                                                                                                                                                                                                      | Section |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `sf`      | Re-serialize the field strictly as its known Structured Field type. Multiple lines are combined into one List or Dictionary first. Using it on a field of unknown type is an error.                                          | § 2.1.1 |
| `key`     | Select one member of a Dictionary field by key (a String). The member value and its parameters are strictly serialized, without the key. An absent key MUST be an error. Each `key` for a field appears at most once.        | § 2.1.2 |
| `bs`      | Wrap each field line as a Byte Sequence, then serialize the List. SHOULD be used for fields whose lines cannot be safely combined, such as `Set-Cookie`. Not compatible with `sf` or `key`.                                  | § 2.1.3 |
| `tr`      | Take the value from the trailer section. MUST be set for any trailer. A header and a trailer of the same name are signed separately, never combined. Covering trailers is NOT RECOMMENDED unless the verifier will see them. | § 2.1.4 |
| `req`     | In a response signature, take the value from the request that triggered the response. Applies to fields and request-targeted derived components. MUST NOT be used in a signature on a request.                               | § 2.4   |
| `name`    | Used with `@query-param` only: the name of the query parameter.                                                                                                                                                              | § 2.2.8 |

`sf` and `key` examples for `Example-Dict:  a=1,    b=2;x=1;y=2,   c=(a   b   c)` (§ 2.1.1, § 2.1.2):

```text
"example-dict": a=1,    b=2;x=1;y=2,   c=(a   b   c)
"example-dict";sf: a=1, b=2;x=1;y=2, c=(a b c)
"example-dict";key="b": 2;x=1;y=2
"example-dict";key="c": (a b c)
```

`bs` keeps two lines distinguishable from one combined line (§ 2.1.3):

```text
"example-header";bs: :dmFsdWUsIHdpdGgsIGxvdHM=:, :b2YsIGNvbW1hcw==:
```

Unknown parameters are an error (§ 2.5). New parameters come from the IANA HTTP Signature Component Parameters registry; on 2026-10-05 it lists only `sf`, `key`, `bs`, `tr`, `req` and `name`.

## Derived components

All are Active in the IANA HTTP Signature Derived Component Names registry, which on 2026-10-05 still matches the RFC 9421 initial contents.

| Name                | Target   | Value                                                                                                                                                                                                             | Section |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `@method`           | request  | The method as sent, case-sensitive, not normalized: `POST`.                                                                                                                                                       | § 2.2.1 |
| `@target-uri`       | request  | The full target URI: `https://www.example.com/path?param=value`.                                                                                                                                                  | § 2.2.2 |
| `@authority`        | request  | Host and optional port, normalized per RFC 9110 § 4.2.3: lowercase host, default port omitted. SHOULD be used instead of `host`.                                                                                  | § 2.2.3 |
| `@scheme`           | request  | The scheme, lowercased: `https`.                                                                                                                                                                                  | § 2.2.4 |
| `@request-target`   | request  | The HTTP/1.1 request-target as on the request line (origin, absolute, authority or asterisk form). NOT RECOMMENDED when other HTTP versions might be in use.                                                      | § 2.2.5 |
| `@path`             | request  | The absolute path without query or `?`; empty becomes `/`; percent-encoding is not decoded.                                                                                                                       | § 2.2.6 |
| `@query`            | request  | The whole query with its leading `?`, not decoded. No query gives `?`.                                                                                                                                            | § 2.2.7 |
| `@query-param`      | request  | One parameter, selected by the REQUIRED `name` parameter. Name and value are parsed as `application/x-www-form-urlencoded`, then re-encoded. An absent name MUST be an error; a repeated name MUST NOT be signed. | § 2.2.8 |
| `@status`           | response | The three-digit status code: `200`. MUST NOT be used in a request.                                                                                                                                                | § 2.2.9 |
| `@signature-params` | both     | Reserved for the last line of the base (below). Never a covered component.                                                                                                                                        | § 2.3   |

`@query-param` examples (§ 2.2.8); the `qux` line ends in a single space before the empty value:

```text
GET /path?param=value&foo=bar&baz=batman&qux= HTTP/1.1

"@query-param";name="baz": batman
"@query-param";name="qux":
"@query-param";name="param": value

GET /parameters?var=this%20is%20a%20big%0Amultiline%20value&bar=with+plus+whitespace HTTP/1.1

"@query-param";name="var": this%20is%20a%20big%0Amultiline%20value
"@query-param";name="bar": with%20plus%20whitespace
```

If a parameter name repeats in the application, sign `@query` instead (RECOMMENDED, § 2.2.8). If a framework rewrites query parameters, sign selected `@query-param` values instead of `@query` (§ 7.2.3).

## Signature parameters

The `@signature-params` value is the covered component list as a Structured Fields Inner List of Strings, followed by the signature parameters (§ 2.3):

| Parameter | Type    | Meaning                                                                               |
| --------- | ------- | ------------------------------------------------------------------------------------- |
| `created` | Integer | Creation time, UNIX seconds, no sub-second precision. RECOMMENDED.                    |
| `expires` | Integer | Expiration time, UNIX seconds. A signer hint; verifiers can reject earlier (§ 3.2.1). |
| `nonce`   | String  | A random unique value for this signature.                                             |
| `alg`     | String  | A value from the HTTP Signature Algorithms registry.                                  |
| `keyid`   | String  | Identifier for the key material.                                                      |
| `tag`     | String  | Application-specific tag that helps a verifier find the signatures meant for it.      |

- Order of components and of parameters is chosen once and cannot change; the serialization MUST match the base exactly (§ 2.3).
- Parameters not used are skipped. The IANA HTTP Signature Metadata Parameters registry lists only these six on 2026-10-05.
- Example (§ 2.3): `("@target-uri" "@authority" "date" "cache-control");keyid="test-key-rsa-pss";alg="rsa-pss-sha512";created=1618884475;expires=1618884775`

## Building the signature base

The base is an ASCII string (§ 2.5):

```text
signature-base = *( signature-base-line LF ) signature-params-line
signature-base-line = component-identifier ":" SP
    ( derived-component-value / *field-content )
signature-params-line = DQUOTE "@signature-params" DQUOTE ":" SP inner-list
```

Algorithm (§ 2.5). Any error fails at once, with no base:

1. For each covered component, in order: error if the identifier was already added; append the identifier serialized as a Structured Fields String with its parameters (`"@authority"`, `"example-dict";key="foo"`), then `: `.
2. Compute the value: error on an unknown or incompatible parameter, on `req` in a request; with `req` in a response, read from the related request. A name starting with `@` is derived per § 2.2 (unknown name or underivable value is an error); otherwise canonicalize the field per § 2.1 (missing or malformed field is an error).
3. Append the value and one LF.
4. Append `"@signature-params": ` and the § 2.3 value. No LF after it.
5. Error if the output contains non-ASCII characters.

Errors also include: `sf` on a field that is not, or not known to be, a Structured Field; `key` on a field that is absent, not a Dictionary or malformed; a `key` or `name` that is not present (§ 2.5).

Example base for a request (§ 2.5, Figure 1):

```text
"@method": POST
"@authority": example.com
"@path": /foo
"content-digest": sha-512=:WZDPaVn/7XgHaAy8pmojAkGWoRx2UFChF41A2svX+TaPm+AbwAgBWnrIiYllu7BNNyealdVLvRwEmTHWXvJwew==:
"content-length": 18
"content-type": application/json
"@signature-params": ("@method" "@authority" "@path" "content-digest" "content-length" "content-type");created=1618884473;keyid="test-key-rsa-pss"
```

## Signing parts of the request in a response

- Add `req` to pull a component from the request: `"@method";req`, `"content-digest";req` (§ 2.4). The same name MAY appear with and without `req`.
- The requester MUST keep the request component values until it has verified the response (§ 2.4).
- A response to a signed request SHOULD cover all the components of the request signature (§ 2.4, § 7.3.7). Covering the request's `Signature` and `Signature-Input` is NOT RECOMMENDED (§ 2.4).
- A response can only cover request content if the request carried a digest field (§ 2.4, § 7.2.8).

Example response base (§ 2.4):

```text
"@status": 503
"content-digest": sha-512=:0Y6iCBzGg5rZtoXS95Ijz03mslf6KAMCloESHObfwnHJDbkkWWQz6PhhU9kxsTbARtY2PTBOzq24uJFpHsMuAg==:
"content-type": application/json
"@authority";req: example.com
"@method";req: POST
"@path";req: /foo
"content-digest";req: sha-512=:WZDPaVn/7XgHaAy8pmojAkGWoRx2UFChF41A2svX+TaPm+AbwAgBWnrIiYllu7BNNyealdVLvRwEmTHWXvJwew==:
"@signature-params": ("@status" "content-digest" "content-type" "@authority";req "@method";req "@path";req "content-digest";req);created=1618884479;keyid="test-key-ecc-p256"
```

## Choosing what to cover

- Cover as much as the deployment allows; the verifier should trust only covered components (§ 7.2.1).
- Request signers SHOULD cover control data such as `@method`, `@authority` or `@target-uri` (§ 3.1), and SHOULD include `created` (§ 3.1).
- Prefer derived components to fields that vary across HTTP versions: `@authority` rather than `host` (§ 7.2.4, § 7.5.4).
- Avoid `Via` and `Forwarded` except in tightly coupled setups, because proxies rewrite them (§ 7.2.3).
- An empty component list signs no part of the message and can be moved to another message; it is discouraged (Appendix B.2.1).
- With form bodies, `@query-param` only reads the URI query; sign the content too so a form parameter cannot shadow a signed query parameter (§ 7.5.8).

## Common mistakes

- Uppercase field names in identifiers, or `Host` instead of `@authority`.
- Adding a trailing LF after `@signature-params`, or using CRLF.
- Re-serializing a field value (for example normalizing whitespace) without `sf` on both sides.
- Reading a header called `@method` sent by a lax HTTP stack instead of deriving it (§ 7.5.1).
- Combining multiple lines with `","` instead of `", "`, or not combining them at all (§ 2.1, § 7.5.5).
