# Versions and upgrades

Read this when choosing which Trace Context level to build to, reading code written for one level, upgrading from Level 1 to Level 2, or checking the Baggage status. Sources: the W3C technical reports, their publication history pages, and the editor's drafts, listed in [Sources](../SKILL.md#sources).

## Version lines

Two families: `trace-context` (the `traceparent` and `tracestate` headers) and `baggage` (the `baggage` header), published separately by the W3C Distributed Tracing Working Group.

| Id                | Line                  | Status                    | Revision                                       | Posture | Summary                                                                                              |
| ----------------- | --------------------- | ------------------------- | ---------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `level-2-preview` | Trace Context Level 2 | preview (`trace-context`) | Candidate Recommendation Draft, 28 March 2024  | build   | Adds the random trace-id flag, simplifies `tracestate` keys, tightens mutation and truncation rules. |
| `level-1`         | Trace Context Level 1 | current (`trace-context`) | W3C Recommendation, 23 November 2021           |         | `traceparent` version `00` with the sampled flag, and `tracestate`. The default target.              |
| `baggage`         | W3C Baggage           | current (`baggage`)       | Candidate Recommendation Snapshot, 30 May 2024 | build   | The `baggage` header for application-defined properties.                                             |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Notes on the lines:

- `https://www.w3.org/TR/trace-context/` (the undated "latest" URL) resolves to the same Level 1 Recommendation as `/TR/trace-context-1/`, as of 2026-10-05.
- The Level 1 Recommendation of 23 November 2021 "includes editorial updates since the 6 February 2020 W3C Recommendation" (Level 1, Status). The 2020 text is the same line; there is nothing to upgrade.
- Both Trace Context levels define `traceparent` version `00`. The version byte does not tell you which level a peer implements; the flags it sets and preserves do.
- Baggage has no level number. Its publication history goes from Working Drafts (2022 to 2024) to the Candidate Recommendation Snapshot of 30 May 2024, which is the latest publication. It is not yet a Recommendation, so its posture is **build**: build it as the only Baggage line, and watch for a Recommendation.
- No Trace Context Level 3 exists (`/TR/trace-context-3/` returns 404 on 2026-10-05).

## Which version to use

- Build `traceparent` and `tracestate` to Trace Context Level 1. It is the only Recommendation and what every compliant peer understands.
- Trace Context Level 2 has posture **build**: implement it now behind a flag or configuration switch. Its flag is additive: a Level 1 peer forwards an unchanged header, and a Level 1 participant clears the random bit when it rewrites flags (Level 1 § 3.2.2.5.2), which only loses information.
- Accept Level 2 `tracestate` keys (with `@` anywhere) when parsing even in Level 1 mode if you can; Level 1 lets you discard invalid entries, but dropping other vendors' entries breaks their correlation (Level 1 § 3.5, § 4.3).
- Build `baggage` to the Candidate Recommendation Snapshot. Encode property values like values, as the editor's draft now requires; it is valid under both.
- Do not emit anything from the editor's drafts that is not in the published CRD or CR (see the preview section).

## What changed

### Trace Context Level 2 (Candidate Recommendation Draft, 28 March 2024)

The Status section says: "This new version adds considerations for the generation of the trace-id and span-id fields, and adds the random trace ID flag." Compared clause by clause with Level 1:

- **Random trace-id flag**, bit `0x02` (L2 § 3.2.2.5.2). When set on a new trace, the right-most 7 bytes of `trace-id` MUST be uniformly random over `[0..2^56-1]`. When continuing a trace, the flag MUST be copied unchanged. Implementers SHOULD generate at least those 7 bytes randomly and then SHOULD set the flag (L2 § 3.2.2.3). A left-padded short ID that does not meet the constraint MUST carry the flag as `0` (L2 § 8.4).
- **Starting traces**: a vendor receiving a request without `traceparent` SHOULD generate one for outbound requests, even when not sampling (L2 § 3.4). It MAY mint IDs with no trace data behind them to carry a not-sampled decision (L2 § 4.1.1).
- **`tracestate` keys**: one rule, `( lcalpha / DIGIT ) 0*255 keychar` with `@` allowed as a key character; the tenant-id and system-id split is gone (L2 § 3.3.2.2.1).
- **`tracestate` values**: leading spaces MUST be preserved; trailing spaces are optional whitespace and MAY be dropped (L2 § 3.3.2.2.2).
- **32-member limit**: adding past 32 removes the right-most member (L2 § 3.3.2).
- **Truncation**: alternative strategies go from "MAY ... highly discouraged" to SHOULD NOT (L2 § 3.3.3.1).
- **Mutation**: modified keys MUST (was SHOULD) move to the left in the § 3.5 intro; adding MUST NOT create a duplicate key; vendors MAY discard duplicate keys they did not generate (L2 § 3.5).
- **Scope of `tracestate`**: it MUST NOT carry properties a tracing system did not define; use Baggage for those (L2 § 3.3).
- **Privacy**: `traceparent` MUST NOT contain PII (L2 § 6.1).
- **span-id generation**: SHOULD be unique within a trace and random (L2 § 9, non-normative).
- **Editorial**: header names are "ASCII case-insensitive"; HTTP references move from RFC 7230 to RFC 9110; § 2.3 "CAN" becomes "MAY"; § 2.2 says browsers and user agents are not target implementations; section 4 is renumbered (§ 4.2 becomes § 4.1.1, § 4.3 becomes § 4.1.2, § 4.4 becomes § 4.1.3) and `tracestate` subsections shift.

### Trace Context Level 1 (Recommendation, 23 November 2021)

The baseline: `traceparent` version `00` with `trace-id`, `parent-id` and the sampled flag; `tracestate` with simple and multi-tenant keys; the mutation rules; the processing model; privacy and security considerations. Editorial updates only since the 6 February 2020 Recommendation (Level 1, Status). The errata process tracks errata as GitHub issues labelled `Errata`; `w3c/trace-context` had no open issue with that label on 2026-10-05.

### W3C Baggage (Candidate Recommendation Snapshot, 30 May 2024)

The first CR. The Working Group plans to audit the OpenTelemetry Baggage implementations and test suites during CR (Baggage, Status). The editor's draft at `w3c/baggage` commit `bfe9a3b` (2026-06-30) adds one normative change: property values in key/value form follow the value rules, so they MUST be percent-encoded outside `baggage-octet` and decoded with U+FFFD for invalid UTF-8.

## Upgrading

### Trace Context Level 1 to Trace Context Level 2 (`level-1` to `level-2-preview`)

Do this behind a switch while Level 2 is a Candidate Recommendation Draft.

1. Change the version marker: there is none. `traceparent` stays version `00`; record the target level in configuration.
2. Replace removed or renamed behaviour:
   - Flags: stop clearing bit `0x02`. When continuing a trace, copy it from the incoming header to every outgoing header with the same `trace-id`. When starting or restarting, generate at least the right-most 7 bytes of `trace-id` from a uniform random source and set the bit (L2 § 3.2.2.5.2, § 3.2.2.3).
   - ID conversion: when left-padding a shorter ID, clear the bit unless the right-most 7 bytes are random (L2 § 8.4).
   - `tracestate` parser: accept the Level 2 key grammar; preserve leading spaces in values; treat trailing spaces as optional whitespace (L2 § 3.3.2.2).
   - `tracestate` writer: always move modified keys to the left; never create a duplicate key; at 32 members, drop the right-most when adding; drop the allow-list, block-list or size-based truncation strategies (L2 § 3.3.2, § 3.3.3.1, § 3.5).
   - Application data: move anything in `tracestate` that is not tracing data to `baggage` (L2 § 3.3).
   - Outbound: generate `traceparent` on outbound requests even when the inbound request had none and you are not sampling (L2 § 3.4).
3. Validate against the target: run the Verify list in `SKILL.md` with the Level 2 items, and check that a header with flags `03` keeps bit `0x02` across your component.
4. Keep behaviour unchanged: sampling decisions, `trace-id` values and other vendors' `tracestate` entries must come out the same as under Level 1.

### Older Baggage drafts to W3C Baggage

Baggage has no earlier released line. If code follows a Working Draft, compare it with the CR grammar and limits in [`baggage.md`](baggage.md): the `token` key rule, percent-encoding of `%` and everything outside `baggage-octet`, U+FFFD decoding, the 64-member and 8192-byte minimums on all headers combined, and no partial list-members.

## Preview: Trace Context Level 2

The published Level 2 text is the Candidate Recommendation Draft of 28 March 2024 (history: First Public Working Draft 29 September 2022, Working Draft 6 April 2023, Candidate Recommendation Snapshot 18 April 2023, Candidate Recommendation Draft 28 March 2024). Posture: **build**, behind a switch. Its exit criterion is at least two implementations using it with a test suite (Level 2, Status).

The editor's draft at `w3c/trace-context` commit `acab820` (2026-06-29) goes further and is not a published version:

- It adds a "Trace Context Server Timing Metric Format" section: a `server-timing: trace;desc=00-<trace-id>-<span-id>-<flags>` metric that returns the server's trace context in the response.
- Its processing model still describes a `traceresponse` response header for the same purpose, and its Status says "This specification is in early stage."

Treat that response-side work as **track**: do not emit `traceresponse` or the `trace` Server-Timing metric as a W3C format. When a new Level 2 CR Snapshot or Recommendation is published: re-read it, update the pin, and if it becomes a Recommendation make it `current` and Level 1 `supported`, with this upgrade section kept.
