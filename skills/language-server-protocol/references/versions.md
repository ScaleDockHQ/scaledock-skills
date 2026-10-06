# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                 | Line     | Status  | Revision                                                 | Posture | Publisher                |
| ------------------ | -------- | ------- | -------------------------------------------------------- | ------- | ------------------------ |
| `lsp-3.17`         | LSP 3.17 | current | LSP 3.17, fetched 2026-10-06 (Specification, 2026-10-06) |         | Specification 2026-10-06 |
| `lsp-3.18-preview` | LSP 3.18 | preview | LSP 3.18, fetched 2026-10-06 (Specification, 2026-10-06) | track   | Specification 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### LSP 3.17

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
- Revision token: LSP 3.17, fetched 2026-10-06 (Specification, 2026-10-06)

### LSP 3.18

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.18/specification/
- Revision token: LSP 3.18, fetched 2026-10-06 (Specification, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview: LSP 3.18

`lsp-3.18-preview` is a Specification dated 2026-10-06, pinned at https://microsoft.github.io/language-server-protocol/specifications/lsp/3.18/specification/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
