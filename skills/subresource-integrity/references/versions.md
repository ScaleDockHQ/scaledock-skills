# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id              | Line                          | Status  | Revision                                             | Posture | Publisher                 |
| --------------- | ----------------------------- | ------- | ---------------------------------------------------- | ------- | ------------------------- |
| `sri-1`         | Subresource Integrity Level 1 | current | sri-1 WD-sri-2-20260320 (Recommendation, 2016-06-23) |         | Recommendation 2016-06-23 |
| `sri-2-preview` | Subresource Integrity Level 2 | preview | sri-2 WD-sri-2-20260320 (Working Draft, 2026-03-20)  | track   | Working Draft 2026-03-20  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Subresource Integrity Level 1

- Publisher status on 2026-10-06: Recommendation (2016-06-23).
- Pinned text: https://www.w3.org/TR/SRI/
- Revision token: sri-1 WD-sri-2-20260320 (Recommendation, 2016-06-23)

### Subresource Integrity Level 2

- Publisher status on 2026-10-06: Working Draft (2026-03-20).
- Pinned text: https://www.w3.org/TR/sri-2/
- Revision token: sri-2 WD-sri-2-20260320 (Working Draft, 2026-03-20)

## Upgrading

There is no older line to upgrade from.

## Preview: Subresource Integrity Level 2

`sri-2-preview` is a Working Draft dated 2026-03-20, pinned at https://www.w3.org/TR/sri-2/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
