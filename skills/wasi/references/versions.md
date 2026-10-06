# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                     | Line                        | Status  | Revision                                                                  | Posture | Publisher                |
| ---------------------- | --------------------------- | ------- | ------------------------------------------------------------------------- | ------- | ------------------------ |
| `wasi-0.2.12`          | WASI 0.2.12                 | current | WASI 0.2.12, fetched 2026-10-06 (Specification, 2026-10-06)               |         | Specification 2026-10-06 |
| `wasi-0.3.1-preview`   | WASI 0.3.1                  | preview | WASI 0.3.1, fetched 2026-10-06 (Specification, 2026-10-06)                | track   | Specification 2026-10-06 |
| `wasi-component-model` | WebAssembly Component Model | current | Component Model MVP explainer, fetched 2026-10-06 (Explainer, 2026-10-06) |         | Explainer 2026-10-06     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WASI 0.2.12

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.2.12/Overview.md
- Revision token: WASI 0.2.12, fetched 2026-10-06 (Specification, 2026-10-06)

### WASI 0.3.1

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.3.1/Overview.md
- Revision token: WASI 0.3.1, fetched 2026-10-06 (Specification, 2026-10-06)

### WebAssembly Component Model

- Publisher status on 2026-10-06: Explainer (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/WebAssembly/component-model/main/design/mvp/Explainer.md
- Revision token: Component Model MVP explainer, fetched 2026-10-06 (Explainer, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview: WASI 0.3.1

`wasi-0.3.1-preview` is a Specification dated 2026-10-06, pinned at https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.3.1/Overview.md. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
