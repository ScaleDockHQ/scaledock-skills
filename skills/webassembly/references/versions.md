# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                       | Line                                       | Status  | Revision                                                                                | Posture | Publisher                                 |
| ------------------------ | ------------------------------------------ | ------- | --------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `wasm-core-1`            | WebAssembly Core Specification Level 1     | current | wasm-core-1 REC-wasm-core-1-20191205 (Recommendation, 2019-12-05)                       |         | Recommendation 2019-12-05                 |
| `wasm-core-2-preview`    | WebAssembly Core Specification Level 2.0   | preview | wasm-core-2 CRD-wasm-core-2-20261003 (Candidate Recommendation Draft, 2026-10-03)       | build   | Candidate Recommendation Draft 2026-10-03 |
| `wasm-js-api-1`          | WebAssembly JavaScript Interface Level 1   | current | wasm-js-api-1 REC-wasm-js-api-1-20191205 (Recommendation, 2019-12-05)                   |         | Recommendation 2019-12-05                 |
| `wasm-js-api-2-preview`  | WebAssembly JavaScript Interface Level 2.0 | preview | wasm-js-api-2 CRD-wasm-js-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03)   | build   | Candidate Recommendation Draft 2026-10-03 |
| `wasm-web-api-1`         | WebAssembly Web API Level 1                | current | wasm-web-api-1 REC-wasm-web-api-1-20191205 (Recommendation, 2019-12-05)                 |         | Recommendation 2019-12-05                 |
| `wasm-web-api-2-preview` | WebAssembly Web API Level 2.0              | preview | wasm-web-api-2 CRD-wasm-web-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03) | build   | Candidate Recommendation Draft 2026-10-03 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WebAssembly Core Specification Level 1

- Publisher status on 2026-10-06: Recommendation (2019-12-05).
- Pinned text: https://www.w3.org/TR/wasm-core-1/
- Revision token: wasm-core-1 REC-wasm-core-1-20191205 (Recommendation, 2019-12-05)

### WebAssembly Core Specification Level 2.0

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-10-03).
- Pinned text: https://www.w3.org/TR/wasm-core-2/
- Revision token: wasm-core-2 CRD-wasm-core-2-20261003 (Candidate Recommendation Draft, 2026-10-03)

### WebAssembly JavaScript Interface Level 1

- Publisher status on 2026-10-06: Recommendation (2019-12-05).
- Pinned text: https://www.w3.org/TR/wasm-js-api-1/
- Revision token: wasm-js-api-1 REC-wasm-js-api-1-20191205 (Recommendation, 2019-12-05)

### WebAssembly JavaScript Interface Level 2.0

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-10-03).
- Pinned text: https://www.w3.org/TR/wasm-js-api-2/
- Revision token: wasm-js-api-2 CRD-wasm-js-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03)

### WebAssembly Web API Level 1

- Publisher status on 2026-10-06: Recommendation (2019-12-05).
- Pinned text: https://www.w3.org/TR/wasm-web-api-1/
- Revision token: wasm-web-api-1 REC-wasm-web-api-1-20191205 (Recommendation, 2019-12-05)

### WebAssembly Web API Level 2.0

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-10-03).
- Pinned text: https://www.w3.org/TR/wasm-web-api-2/
- Revision token: wasm-web-api-2 CRD-wasm-web-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03)

## Upgrading

There is no older line to upgrade from.

## Preview: WebAssembly Core Specification Level 2.0

`wasm-core-2-preview` is a Candidate Recommendation Draft dated 2026-10-03, pinned at https://www.w3.org/TR/wasm-core-2/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: WebAssembly JavaScript Interface Level 2.0

`wasm-js-api-2-preview` is a Candidate Recommendation Draft dated 2026-10-03, pinned at https://www.w3.org/TR/wasm-js-api-2/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: WebAssembly Web API Level 2.0

`wasm-web-api-2-preview` is a Candidate Recommendation Draft dated 2026-10-03, pinned at https://www.w3.org/TR/wasm-web-api-2/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
