# The `tracestate` header

Read this when parsing, writing, truncating or forwarding `tracestate`. Section numbers are from Trace Context Level 1 unless marked "L2" (the Level 2 Candidate Recommendation Draft). Level 2 renumbers the subsections; both numbers are given where they differ.

## Purpose and coupling to `traceparent`

- `tracestate` carries vendor-specific trace identification and the request's position in several tracing systems' graphs; it companions `traceparent` (§ 3.3).
- If `traceparent` failed to parse, vendors MUST NOT parse `tracestate`. A `tracestate` parse failure MUST NOT affect `traceparent` (§ 3.3).
- A `tracestate` without an accompanying `traceparent` is invalid and MUST be discarded (§ 4.2).
- Level 2: `tracestate` MUST NOT carry properties that a tracing system did not define; application properties belong in Baggage (L2 § 3.3). See [`baggage.md`](baggage.md).
- Name: `tracestate`, case-insensitive on receipt, lowercase on send (§ 3.3.1).

## Multiple header fields

`tracestate` MAY be sent or received as several header fields. Senders SHOULD use one field when possible. Splitting and combining MUST follow the HTTP field-order rule: RFC 7230 § 3.2.2 in Level 1 (§ 3.3.1.1), RFC 9110 § 5.3 in Level 2 (L2 § 3.3.2). In practice: join the field values in order with commas.

## Grammar

List (§ 3.3.1.2; L2 § 3.3.2.1):

```abnf
list        = list-member 0*31( OWS "," OWS list-member )
list-member = (key "=" value) / OWS
```

- At most 32 list-members (§ 3.3.1.1). Level 2 adds: if adding an entry would exceed 32, the right-most member should be removed (L2 § 3.3.2).
- Empty and whitespace-only members are allowed. Vendors MUST accept an empty `tracestate` but SHOULD avoid sending one (§ 3.3.1.1).
- Spaces and tabs around members are ignored. Callers SHOULD generate optional whitespace as a single space, or not at all (§ 3.3.1.1).

### Key: Level 1 (§ 3.3.1.3.1)

```abnf
key              = simple-key / multi-tenant-key
simple-key       = lcalpha 0*255( lcalpha / DIGIT / "_" / "-"/ "*" / "/" )
multi-tenant-key = tenant-id "@" system-id
tenant-id        = ( lcalpha / DIGIT ) 0*240( lcalpha / DIGIT / "_" / "-"/ "*" / "/" )
system-id        = lcalpha 0*13( lcalpha / DIGIT / "_" / "-"/ "*" / "/" )
lcalpha          = %x61-7A ; a-z
```

A multi-tenant system finds all its entries by searching for `@<system-id>=`, for example `@xyz=` (§ 3.3.1.3.1).

### Key: Level 2 (L2 § 3.3.2.2.1)

```abnf
key     = ( lcalpha / DIGIT ) 0*255 ( keychar )
keychar = lcalpha / DIGIT / "_" / "-"/ "*" / "/" / "@"
lcalpha = %x61-7A ; a-z
```

Level 2 drops the tenant and system split: a key MUST begin with a lowercase letter or digit and may contain `@` anywhere after that. Every Level 1 key is a valid Level 2 key; the reverse is not true (for example `a@b@c`, or a 20-character part after `@`). A Level 1 parser that rejects such keys may discard those entries (§ 4.3 allows it).

### Value (§ 3.3.1.3.2; L2 § 3.3.2.2.2)

```abnf
value    = 0*255(chr) nblk-chr
nblk-chr = %x21-2B / %x2D-3C / %x3E-7E
chr      = %x20 / nblk-chr
```

Up to 256 printable ASCII characters (`0x20` to `0x7E`) except `,` and `=`, not ending in a space. No tabs or newlines. Values are opaque: only the vendor that wrote one can interpret it (L2 Glossary). Level 2 adds: leading spaces MUST be preserved as part of the value; trailing spaces are optional whitespace and MAY be dropped when propagating (L2 § 3.3.2.2.2).

## One entry per key

Only one entry per key is allowed; a vendor overwrites its entry when the trace re-enters its system (§ 3.3.1.4; L2 § 3.3.3):

```text
wrong: congo=congosFirstPosition,rojo=rojosFirstPosition,congo=congosSecondPosition
right: congo=congosSecondPosition,rojo=rojosFirstPosition
```

Level 2 makes it explicit that adding a pair MUST NOT result in a duplicate key, and that vendors MAY discard duplicate keys they did not generate (L2 § 3.5).

## Limits and truncation (§ 3.3.1.5; L2 § 3.3.3.1)

- Vendors SHOULD propagate at least 512 characters of the combined header, counting commas and optional whitespace.
- A system that propagates less SHOULD document and explain its maximum.
- When truncating, vendors MUST remove whole entries, never cut one. Entries longer than 128 characters SHOULD go first, then entries from the end (right) of the list.
- Other strategies (allow lists, block lists, size-based truncation): Level 1 says MAY, but highly discouraged; Level 2 says SHOULD NOT.

## Mutations (§ 3.5)

Vendors receiving `tracestate` MUST send it on outgoing requests and MAY mutate it. If `traceparent` was not changed, `tracestate` MUST NOT be changed either (§ 3.4).

| Mutation       | Rule                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Add            | New pair SHOULD go at the beginning (left). The processing model says MUST (§ 4.3).                                        |
| Update         | Modified key SHOULD move to the left (§ 3.5); MUST in the processing model (§ 4.3) and in Level 2's § 3.5 intro.           |
| Delete         | Any pair MAY be deleted, but vendors SHOULD NOT delete keys they did not generate: it breaks correlation in other systems. |
| Keep the order | The order of unmodified pairs MUST be preserved.                                                                           |

The left-most entry tells the next hop which system wrote the current `traceparent` (§ 3.1). Reasons to delete foreign keys: a proxy blocking keys for privacy or security, and truncation (§ 3.5).

## Worked example (§ 3.1)

```http
# Congo client
traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01
tracestate: congo=t61rcWkgMzE

# Rojo server, new parent-id, own entry on the left
traceparent: 00-0af7651916cd43dd8448eb211c80319c-00f067aa0ba902b7-01
tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE

# Congo again, entry rewritten and moved left
traceparent: 00-0af7651916cd43dd8448eb211c80319c-b9c7c989f97918e1-01
tracestate: congo=ucfJifl5GOE,rojo=00f067aa0ba902b7
```

## Versioning (§ 3.3.3)

The version of `tracestate` is the version prefix of `traceparent`. With a higher version, vendors attempt to parse `tracestate` as best they can and decide whether to use partially parsed pairs.

## Common mistakes

- Parsing `tracestate` after `traceparent` was rejected, or rejecting a good `traceparent` because `tracestate` was malformed (§ 3.3).
- Appending your entry on the right, or leaving an old entry of yours in place.
- Cutting an entry in half to fit a size limit (§ 3.3.1.5).
- Modifying `tracestate` in a pass-through component that leaves `traceparent` unchanged (§ 3.4).
- Putting user identifiers or application data in a value (§ 6.2; L2 § 3.3).
