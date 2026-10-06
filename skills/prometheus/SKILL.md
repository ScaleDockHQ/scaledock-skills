---
name: prometheus
description: >-
  Prometheus: expose metrics in the Prometheus exposition formats and send them with remote write 2.0. Covers Prometheus exposition formats, Prometheus remote write 2.0. Use when exposing Prometheus metrics or using remote write. Triggers: Prometheus, remote write.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Prometheus

Exposition formats | Prometheus Join PromCon EU 2026 , the Prometheus users conference, on October 7–8, 2026 in Munich. PromCon EU 2026 — Oct 7–8, Munich. Prometheus

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when exposing Prometheus metrics or using remote write.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Prometheus exposition formats (default); Prometheus remote write 2.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Exposition formats.** "As of Prometheus version 2.0, all processes that expose metrics to Prometheus must use a text format, by default."
2. **Details.** "The last line must end with a line feed character."
3. **Line format.** "Within a line, tokens can be separated by any number of blanks and/or tabs (and must be separated by at least one if they would otherwise merge with the previous token)."
4. **Comments, help text, and type information.** "The TYPE line for a metric name must appear before the first sample is reported for that metric name."
5. **Comments, help text, and type information.** "Metric names not corresponding to the legacy Prometheus metric name character set must be quoted and escaped."
6. **Comments, help text, and type information.** "escaped_string consists of any UTF-8 characters, but backslash, double-quote, and line feed must be escaped."
7. **Comments, help text, and type information.** "Metric and label names not corresponding to the usual Prometheus expression language restrictions must use the quoted syntaxes."
8. **Grouping and sorting.** "All lines for a given metric must be provided as one single group, with the optional HELP and TYPE lines first (in no particular order)."

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

- [Prometheus exposition formats](https://prometheus.io/docs/instrumenting/exposition_formats/): Documentation, Prometheus exposition formats, fetched 2026-10-06 (Documentation, 2026-10-06), checked 2026-10-06.
- [Prometheus remote write 2.0](https://prometheus.io/docs/specs/remote_write_spec_2_0/): Specification, Prometheus remote write 2.0, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
