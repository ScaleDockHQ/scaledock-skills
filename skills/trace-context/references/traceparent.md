# The `traceparent` header

Read this when parsing, validating, generating or mutating `traceparent`. Section numbers are from Trace Context Level 1 (the W3C Recommendation of 23 November 2021) unless marked "L2", which means the Level 2 Candidate Recommendation Draft of 28 March 2024. Both are listed in [Sources](../SKILL.md#sources).

## Header name

- The name is `traceparent`, one word with no hyphen (§ 3.2.1).
- Receivers MUST accept the name in any case; senders SHOULD send it lowercase (§ 3.2.1). L2 says the same thing as "ASCII case-insensitive", and tracing systems SHOULD encode it as ASCII lowercase (L2 § 3.2.1).

## Grammar (version `00`)

ABNF from § 3.2.2 and § 3.2.2.2:

```abnf
HEXDIGLC       = DIGIT / "a" / "b" / "c" / "d" / "e" / "f" ; lowercase hex character
value          = version "-" version-format
version        = 2HEXDIGLC   ; this document assumes version 00. Version ff is forbidden
version-format = trace-id "-" parent-id "-" trace-flags
trace-id       = 32HEXDIGLC  ; 16 bytes array identifier. All zeroes forbidden
parent-id      = 16HEXDIGLC  ; 8 bytes array identifier. All zeroes forbidden
trace-flags    = 2HEXDIGLC   ; 8 bit flags
```

A version `00` value is therefore exactly 55 characters: `2 + 1 + 32 + 1 + 16 + 1 + 2`. Every hex digit is lowercase.

| Field         | Size                | Invalid values                                                                                    | Section     |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `version`     | 1 byte, 2 hex chars | `ff`                                                                                              | § 3.2.2.1   |
| `trace-id`    | 16 bytes, 32 hex    | all zeros; any character outside `0-9a-f`. Vendors MUST ignore the `traceparent`.                 | § 3.2.2.3   |
| `parent-id`   | 8 bytes, 16 hex     | all zeros; non-lowercase-hex characters. Vendors MUST ignore the `traceparent`.                   | § 3.2.2.4   |
| `trace-flags` | 8 bits, 2 hex       | Unknown bits are not invalid on receipt, but vendors MUST set them to zero when they write flags. | § 3.2.2.5.2 |

`parent-id` is the ID of this request as known by the caller; some systems call it the span ID (§ 3.2.2.4).

## Valid and invalid examples

Valid, sampled and not sampled (§ 3.2.3):

```http
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-00
```

Invalid, derived from the grammar and the field rules above:

| Value                                                       | Why it is invalid                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------- |
| `00-00000000000000000000000000000000-00f067aa0ba902b7-01`   | all-zero `trace-id` (§ 3.2.2.3)                                 |
| `00-4bf92f3577b34da6a3ce929d0e0e4736-0000000000000000-01`   | all-zero `parent-id` (§ 3.2.2.4)                                |
| `00-4BF92F3577B34DA6A3CE929D0E0E4736-00f067aa0ba902b7-01`   | uppercase hex is not `HEXDIGLC` (§ 3.2.2)                       |
| `ff-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`   | version `ff` is forbidden (§ 3.2.2.1)                           |
| `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01-x` | version `00` has no further fields (§ 3.2.2.2)                  |
| `0-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`    | version prefix is not 2 hex chars and a dash; restart (§ 3.2.4) |

## `trace-flags`

- It is a bit field: test bits with a mask, never compare the whole byte (§ 3.2.2.5). `01` and `09` both mean sampled.
- The flags are recommendations from the caller, not strict rules, because of trust and abuse, caller bugs and different load (§ 3.2.2.5).

```ts
const FLAG_SAMPLED = 0x01;
const FLAG_RANDOM = 0x02; // Level 2 only (L2 § 3.2.2.5.2)
const sampled = (flags & FLAG_SAMPLED) === FLAG_SAMPLED;
```

### Sampled flag (bit 0)

- Set means the caller may have recorded trace data; unset means it did not record trace data out-of-band (§ 3.2.2.5.1).
- It may only change when `parent-id` is updated (§ 3.2.2.5.1, § 3.4).
- SHOULD-level suggestions (§ 3.2.2.5.1): a definitive recording decision SHOULD be reflected in the flag; a component that needs to decide SHOULD respect it, with security considerations applied against abuse. A component that defers or delays the decision propagates the flag unchanged, and sets it to `0` by default when it starts the trace.
- MAY options (§ 3.2.2.5.1): a deferred decision can signal priority by setting `1` on a subset of requests, or fall back to probability sampling.

### Random trace-id flag (bit 1, Level 2 only)

Level 1 has only the sampled flag: bit 1 is one of the "other flags" that vendors MUST set to zero (§ 3.2.2.5.2). Level 2 defines it (L2 § 3.2.2.5.2):

- Starting or restarting a trace (a new `trace-id`): if the flag is set, at least the right-most 7 bytes of `trace-id` MUST be random or pseudo-random, uniform over `[0..2^56-1]`. If those bytes are random, the flag SHOULD be set. If it is unset, the `trace-id` MAY be generated any way the format allows.
- Continuing a trace with the same `trace-id`: the flag MUST be copied unchanged from the incoming `traceparent` to every outgoing one, set or unset.
- Downstream consumers can then sample or shard on those bytes.

### Other flags

Bits other than those defined are reserved; vendors MUST set them to zero (§ 3.2.2.5.2; L2 § 3.2.2.5.3). Per the processing model, unparsed or unknown flags are set to `0` on outgoing requests (§ 4.3).

## Versioning and higher versions

Future versions are assumed to be additive (§ 3.2.4). Vendors MUST follow these rules when a header has an unexpected format (§ 3.2.4):

1. Pass-through services should not analyze the version, and should only reject prohibitively large headers.
2. If the version prefix is not 2 hex characters followed by a dash, restart the trace.
3. If the version is higher than the implementation knows, it SHOULD try to parse:
   - shorter than 55 characters: do not parse; restart the trace;
   - `trace-id`: the 32 characters after the first dash MUST be hex and be followed by a dash;
   - `parent-id`: the 16 characters after the second dash (position 35) MUST be hex and be followed by a dash;
   - flags: the 2 characters after the third dash MUST be at the end of the string or be followed by a dash.
4. If all three parse, use them. Vendors MUST NOT parse or assume anything about unknown fields, and MUST write the outgoing `traceparent` in the highest version they know (`00` here). That is the "downgrade the version" mutation (§ 3.4).

A parser sketch that follows § 3.2.2 and § 3.2.4:

```ts
type TraceParent = { traceId: string; parentId: string; flags: number };

const HEX = /^[0-9a-f]+$/;
const isZero = (s: string) => /^0+$/.test(s);

export function parseTraceparent(raw: string): TraceParent | null {
  const value = raw.trim();
  const version = value.slice(0, 2);
  if (!/^[0-9a-f]{2}$/.test(version) || value[2] !== "-") return null; // restart
  if (version === "ff") return null;
  if (version === "00" && value.length !== 55) return null;
  if (value.length < 55) return null;
  const traceId = value.slice(3, 35);
  const parentId = value.slice(36, 52);
  const flags = value.slice(53, 55);
  if (value[35] !== "-" || value[52] !== "-") return null;
  if (value.length > 55 && value[55] !== "-") return null;
  if (!HEX.test(traceId) || isZero(traceId)) return null;
  if (!HEX.test(parentId) || isZero(parentId)) return null;
  if (!HEX.test(flags)) return null;
  return { traceId, parentId, flags: parseInt(flags, 16) };
}
```

`null` means: ignore the header, start a new trace, and drop `tracestate` (§ 4.3). When writing, keep only the flags you support (§ 4.3). Trimming surrounding whitespace is an implementation choice, not a spec rule.

## Mutations

A vendor that receives `traceparent` MUST send it on outgoing requests and MAY mutate it (§ 3.4). Only these mutations are allowed; vendors MUST NOT make any other (§ 3.4):

| Mutation           | Rule                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Update `parent-id` | Set it to the ID of the current operation. The default mutation.                                                                                                                                     |
| Update `sampled`   | Toggle in either direction to reflect recording; `parent-id` MUST be set to a new value with it.                                                                                                     |
| Restart trace      | Regenerate `trace-id`, `parent-id` and `trace-flags`, for example at a front gate into a secure network. Vendors SHOULD clean up `tracestate` on restart, unless keeping it is an explicit decision. |
| Downgrade version  | Rewrite a higher version as `00`; other mutations may be combined with it.                                                                                                                           |

If `traceparent` is forwarded unchanged, `tracestate` MUST NOT be modified either (§ 3.4).

Level 2 adds: a vendor receiving a request without `traceparent` SHOULD generate one for outbound requests, even when not sampling, so the sampling decision travels downstream (L2 § 3.4).

## Generating IDs

- `trace-id` SHOULD be globally unique, and random generation SHOULD be preferred (§ 8.1, § 8.2, non-normative). L2 makes this normative text in § 3.2.2.3: implementers SHOULD randomly generate at least the right-most 7 bytes and then SHOULD set the random flag.
- Random number generators MUST NOT rely on any information that can be user-identifiable, such as an IP address as seed (§ 6.1).
- Systems with shorter internal IDs: put the internal ID in the right-most part of `trace-id`, or carry it in `tracestate` (§ 8.3). When widening a short ID, left-pad with zeros: `53ce929d0e0e4736` becomes `000000000000000053ce929d0e0e4736`; when narrowing, use the right-most part (§ 8.4). In Level 2, a padded value that does not meet the random flag's constraint MUST carry the flag as `0` (L2 § 8.4).
- Level 2 adds span-id guidance: `span-id` (that is, `parent-id` values you mint) SHOULD be unique within the trace and SHOULD be random (L2 § 9.1, § 9.2, non-normative).
