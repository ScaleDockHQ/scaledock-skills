# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                     | Line                               | Status  | Revision                                                    | Posture | Publisher                 |
| ---------------------- | ---------------------------------- | ------- | ----------------------------------------------------------- | ------- | ------------------------- |
| `shacl`                | Shapes Constraint Language (SHACL) | current | shacl REC-shacl-20170720 (Recommendation, 2017-07-20)       |         | Recommendation 2017-07-20 |
| `shacl12-core-preview` | SHACL 1.2 Core                     | preview | shacl12-core REC-shacl-20170720 (Working Draft, 2026-09-18) | track   | Working Draft 2026-09-18  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Shapes Constraint Language (SHACL)

- Publisher status on 2026-10-06: Recommendation (2017-07-20).
- Pinned text: https://www.w3.org/TR/shacl/
- Revision token: shacl REC-shacl-20170720 (Recommendation, 2017-07-20)

### SHACL 1.2 Core

- Publisher status on 2026-10-06: Working Draft (2026-09-18).
- Pinned text: https://www.w3.org/TR/shacl12-core/
- Revision token: shacl12-core REC-shacl-20170720 (Working Draft, 2026-09-18)

## Upgrading

There is no older line to upgrade from.

## Preview: SHACL 1.2 Core

`shacl12-core-preview` is a Working Draft dated 2026-09-18, pinned at https://www.w3.org/TR/shacl12-core/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
