# The `baggage` header

Read this when reading, writing or forwarding `baggage`. Section numbers are from W3C Baggage, the Candidate Recommendation Snapshot of 30 May 2024 ("Baggage §"), listed in [Sources](../SKILL.md#sources).

## What it is

- Baggage represents and propagates application-defined properties for a distributed request or workflow. It is independent of Trace Context and works without distributed tracing (Baggage, Abstract).
- Libraries and platforms SHOULD propagate the header (Baggage § 2). A received header MAY be altered and SHOULD be passed on to all downstream requests (Baggage § 3).
- Browsers and user agents are not in scope as implementations (Baggage, Abstract).
- Trace Context Level 2 points here: `tracestate` MUST NOT carry non-tracing properties, and Baggage MAY carry them (L2 § 3.3).

## Header name and encoding

- Name: `baggage`. Implementations SHOULD keep it lowercase (Baggage § 3.1).
- The value is a UTF-8 string that uses only Basic Latin code points, so it is plain ASCII on the wire (Baggage § 3.2).
- Multiple `baggage` headers are allowed and can be combined into one per RFC 7230 (Baggage § 3).

## Grammar (Baggage § 3.3.1)

```abnf
baggage-string =  list-member 0*179( OWS "," OWS list-member )
list-member    =  key OWS "=" OWS value *( OWS ";" OWS property )
property       =  key OWS "=" OWS value
property       =/ key OWS
key            =  token ; as defined in RFC 7230, Section 3.2.6
value          =  *baggage-octet
baggage-octet  =  %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
                  ; US-ASCII characters excluding CTLs,
                  ; whitespace, DQUOTE, comma, semicolon,
                  ; and backslash
OWS            =  *( SP / HTAB ) ; optional white space, RFC 7230, Section 3.2.3
```

### Keys (Baggage § 3.3.1.2)

- A key is an RFC 7230 `token`: ASCII only, no percent-encoding.
- Whitespace around a key is OWS, not part of the key.
- Keys are not guaranteed unique. When mutating, the order of duplicates SHOULD be preserved; producers SHOULD avoid emitting duplicate keys (Baggage § 3.3.1.1).

### Values (Baggage § 3.3.1.3)

- Code points outside `baggage-octet` MUST be percent-encoded (RFC 3986 § 2.1), and `%` itself MUST be percent-encoded. Other characters MAY be percent-encoded.
- When decoding, percent-encoded sequences that are not valid UTF-8 MUST be replaced with U+FFFD.
- Whitespace around a value is OWS, not part of the value.
- A value MAY contain any number of `=`. Parsers MUST NOT assume `=` only separates key and value: split on the first `=`.

### Properties (Baggage § 3.3.1.4)

- Metadata MAY follow a value as a `;`-separated set of keys or key/value pairs, for example `;k1=v1;k2;k3=v3`.
- The specification gives property keys and values no meaning. OWS around them is not part of them.
- The editor's draft (not the pinned CR) adds that property values follow the same percent-encoding and U+FFFD decoding rules as values. Encoding property values that way is valid under the CR grammar too, because `%` and hex digits are `baggage-octet`s.

## Limits (Baggage § 3.3.2)

- A platform MUST propagate all list-members, including its own additions, while the result has 64 list-members or fewer and is 8192 bytes or fewer.
- Above either limit, it MAY drop list-members until both hold; which ones is up to the implementer.
- These are minimums. A platform MAY set higher limits and SHOULD propagate as much as reasonable.
- It MUST NOT propagate a partial list-member.
- With several `baggage` headers, the limits apply to all of them combined.

The grammar allows at most 180 list-members per `baggage-string` (`0*179` after the first).

## Mutations (Baggage § 3.5)

A system receiving `baggage` SHOULD send it on outgoing requests and MAY mutate it. Allowed: add a pair, update a value, delete a pair, deduplicate. Producers and consumers MAY agree on their own rules (for example, which duplicate wins) as long as they do not violate the specification. Over the limits, a system MAY drop or truncate entries in any order. An entry not in the specified format MAY be removed before propagating.

## Examples (Baggage § 3.3.3, § 3.4)

```http
baggage: userId=alice,serverNode=DF%2028,isProduction=false
baggage: userId=Am%C3%A9lie,serverNode=DF%2028,isProduction=false
baggage: key1=value1;property1;property2, key2 = value2, key3=value3; propertyKey=propertyValue
```

Split across headers, with whitespace that is not part of keys or values:

```http
baggage: userId =   alice
baggage: serverNode = DF%2028, isProduction = false
```

## Encode and decode sketch

Follows Baggage § 3.3.1.3: percent-encode everything outside `baggage-octet` (and `%`), decode with U+FFFD for invalid UTF-8, and split each member on the first `=`.

```ts
const OCTET = /[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]/;

export function encodeValue(value: string): string {
  let out = "";
  for (const byte of new TextEncoder().encode(value)) {
    const ch = String.fromCharCode(byte);
    out +=
      byte < 0x80 && ch !== "%" && OCTET.test(ch)
        ? ch
        : "%" + byte.toString(16).toUpperCase().padStart(2, "0");
  }
  return out;
}

export function decodeValue(raw: string): string {
  const bytes: number[] = [];
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.slice(i + 1, i + 3);
    if (raw[i] === "%" && /^[0-9A-Fa-f]{2}$/.test(hex)) {
      bytes.push(parseInt(hex, 16));
      i += 2;
    } else bytes.push(raw.charCodeAt(i));
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(
    new Uint8Array(bytes),
  );
}
```

`TextDecoder` with `fatal: false` substitutes U+FFFD for invalid sequences, which is what the rule asks for.

## Security and privacy

- Parse defensively: check header length and content (Baggage § 4).
- Baggage may carry sensitive data. Keep proprietary or confidential data out of it, or make sure it is not present on requests that cross trust boundaries (Baggage § 4.1).
- Systems MUST assess the risk of header abuse, and may inspect and remove sensitive information before processing or propagating, using only the allowed mutations (Baggage § 5).
- The header can contain user-identifiable data; applications should remove private information they do not want propagated (Baggage § 5.1).
- Test cross-origin code paths: a `baggage` header blocked by `Access-Control-Allow-Headers` can make the request fail (Baggage § 4.2).

## Common mistakes

- Sending raw spaces, commas, semicolons, quotes, backslashes or non-ASCII in a value instead of percent-encoding them.
- Splitting a member on every `=`, which breaks Base64 values.
- Applying the 64-member and 8192-byte limits per header instead of to all `baggage` headers together.
- Truncating a value to fit, which propagates a partial list-member.
- Copying `baggage` into `tracestate` or the reverse.
