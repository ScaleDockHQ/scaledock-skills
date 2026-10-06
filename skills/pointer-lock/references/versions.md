# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                      | Line             | Status  | Revision                                                            | Posture | Publisher                 |
| ----------------------- | ---------------- | ------- | ------------------------------------------------------------------- | ------- | ------------------------- |
| `pointerlock`           | Pointer Lock     | current | pointerlock WD-pointerlock-2-20260225 (Recommendation, 2016-10-27)  |         | Recommendation 2016-10-27 |
| `pointerlock-2-preview` | Pointer Lock 2.0 | preview | pointerlock-2 WD-pointerlock-2-20260225 (Working Draft, 2026-02-25) | track   | Working Draft 2026-02-25  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Pointer Lock

- Publisher status on 2026-10-06: Recommendation (2016-10-27).
- Pinned text: https://www.w3.org/TR/pointerlock/
- Revision token: pointerlock WD-pointerlock-2-20260225 (Recommendation, 2016-10-27)

### Pointer Lock 2.0

- Publisher status on 2026-10-06: Working Draft (2026-02-25).
- Pinned text: https://www.w3.org/TR/pointerlock-2/
- Revision token: pointerlock-2 WD-pointerlock-2-20260225 (Working Draft, 2026-02-25)

## Upgrading

There is no older line to upgrade from.

## Preview: Pointer Lock 2.0

`pointerlock-2-preview` is a Working Draft dated 2026-02-25, pinned at https://www.w3.org/TR/pointerlock-2/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
