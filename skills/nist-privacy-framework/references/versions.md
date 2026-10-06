# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                              | Line                  | Status  | Revision                                                                            | Posture | Publisher                |
| ------------------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------- | ------- | ------------------------ |
| `privacy-framework-1.0`         | Privacy Framework 1.0 | current | Privacy Framework 1.0, fetched 2026-10-06 (NIST CSWP, 2026-10-06)                   |         | NIST CSWP 2026-10-06     |
| `privacy-framework-1.1-preview` | Privacy Framework 1.1 | preview | Privacy Framework 1.1 concept paper, fetched 2026-10-06 (Concept paper, 2026-10-06) | track   | Concept paper 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Privacy Framework 1.0

- Publisher status on 2026-10-06: NIST CSWP (2026-10-06).
- Pinned text: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.01162020.pdf
- Revision token: Privacy Framework 1.0, fetched 2026-10-06 (NIST CSWP, 2026-10-06)

### Privacy Framework 1.1

- Publisher status on 2026-10-06: Concept paper (2026-10-06).
- Pinned text: https://www.nist.gov/system/files/documents/2024/06/18/Privacy%20Framework%201.1%20Concept%20Paper%20%286.18.24%29.pdf
- Revision token: Privacy Framework 1.1 concept paper, fetched 2026-10-06 (Concept paper, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview: Privacy Framework 1.1

`privacy-framework-1.1-preview` is a Concept paper dated 2026-10-06, pinned at https://www.nist.gov/system/files/documents/2024/06/18/Privacy%20Framework%201.1%20Concept%20Paper%20%286.18.24%29.pdf. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
