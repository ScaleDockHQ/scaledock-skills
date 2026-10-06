---
name: openmetrics
description: >-
  OpenMetrics: expose metrics in the OpenMetrics text format for scraping. Covers OpenMetrics. Use when exposing metrics in the OpenMetrics format. Triggers: OpenMetrics.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# OpenMetrics

target: https://github.com/protocolbuffers/protobuf/blob/2f6a7546e4539499bc08abc6900dc929782f5dcd/src/google/protobuf/timestamp.proto

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when exposing metrics in the OpenMetrics format.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OpenMetrics (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Implementers MUST expose metrics in the OpenMetrics text format in response to a simple HTTP GET request to a documented URL for a given process or device."
2. **document.** "This endpoint SHOULD be called "/metrics"."
3. **document.** "# Data Model This section MUST be read together with the ABNF section."
4. **document.** "In case of disagreements between the two, the ABNF's restrictions MUST take precedence."
5. **document.** "This reduces repetition as the text wire format MUST be supported."
6. **document.** "## Data Types ### Values Metric values in OpenMetrics MUST be either floating points or integers."
7. **document.** "The non-real values NaN, +Inf and -Inf MUST be supported."
8. **document.** "NaN MUST NOT be considered a missing value, but it MAY be used to signal a division by zero."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenMetrics](https://raw.githubusercontent.com/OpenObservability/OpenMetrics/main/specification/OpenMetrics.md): Specification, OpenMetrics specification, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
