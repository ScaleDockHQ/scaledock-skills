# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                          | Line                               | Status  | Revision                                                                    | Posture | Publisher                 |
| --------------------------- | ---------------------------------- | ------- | --------------------------------------------------------------------------- | ------- | ------------------------- |
| `encrypted-media-1`         | Encrypted Media Extensions Level 1 | current | encrypted-media-1 REC-encrypted-media-20170918 (Recommendation, 2017-09-18) |         | Recommendation 2017-09-18 |
| `encrypted-media-2-preview` | Encrypted Media Extensions Level 2 | preview | encrypted-media-2 REC-encrypted-media-20170918 (Working Draft, 2026-07-07)  | track   | Working Draft 2026-07-07  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Encrypted Media Extensions Level 1

- Publisher status on 2026-10-06: Recommendation (2017-09-18).
- Pinned text: https://www.w3.org/TR/encrypted-media-1/
- Revision token: encrypted-media-1 REC-encrypted-media-20170918 (Recommendation, 2017-09-18)

### Encrypted Media Extensions Level 2

- Publisher status on 2026-10-06: Working Draft (2026-07-07).
- Pinned text: https://www.w3.org/TR/encrypted-media-2/
- Revision token: encrypted-media-2 REC-encrypted-media-20170918 (Working Draft, 2026-07-07)

## Upgrading

There is no older line to upgrade from.

## Preview: Encrypted Media Extensions Level 2

`encrypted-media-2-preview` is a Working Draft dated 2026-07-07, pinned at https://www.w3.org/TR/encrypted-media-2/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
