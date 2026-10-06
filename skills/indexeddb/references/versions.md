# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                    | Line                     | Status  | Revision                                                          | Posture | Publisher                 |
| --------------------- | ------------------------ | ------- | ----------------------------------------------------------------- | ------- | ------------------------- |
| `indexeddb-2`         | Indexed Database API 2.0 | current | IndexedDB-2 REC-IndexedDB-2-20180130 (Recommendation, 2018-01-30) |         | Recommendation 2018-01-30 |
| `indexeddb`           | Indexed Database API     | legacy  | IndexedDB WD-IndexedDB-3-20250813 (Recommendation, 2015-01-08)    |         | Recommendation 2015-01-08 |
| `indexeddb-3-preview` | Indexed Database API 3.0 | preview | IndexedDB-3 WD-IndexedDB-3-20250813 (Working Draft, 2025-08-13)   | track   | Working Draft 2025-08-13  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Indexed Database API 2.0

- Publisher status on 2026-10-06: Recommendation (2018-01-30).
- Pinned text: https://www.w3.org/TR/IndexedDB-2/
- Revision token: IndexedDB-2 REC-IndexedDB-2-20180130 (Recommendation, 2018-01-30)

### Indexed Database API

- Publisher status on 2026-10-06: Recommendation (2015-01-08).
- Pinned text: https://www.w3.org/TR/IndexedDB/
- Revision token: IndexedDB WD-IndexedDB-3-20250813 (Recommendation, 2015-01-08)

### Indexed Database API 3.0

- Publisher status on 2026-10-06: Working Draft (2025-08-13).
- Pinned text: https://www.w3.org/TR/IndexedDB-3/
- Revision token: IndexedDB-3 WD-IndexedDB-3-20250813 (Working Draft, 2025-08-13)

## Upgrading

### indexeddb to indexeddb-2

1. Treat documents that cite Indexed Database API (IndexedDB WD-IndexedDB-3-20250813 (Recommendation, 2015-01-08)) as input.
2. Re-read Indexed Database API 2.0 at https://www.w3.org/TR/IndexedDB-2/.
3. Keep behavior that Indexed Database API 2.0 still requires, and replace behavior that only Indexed Database API required.
4. Record the target revision on the artifact.

## Preview: Indexed Database API 3.0

`indexeddb-3-preview` is a Working Draft dated 2025-08-13, pinned at https://www.w3.org/TR/IndexedDB-3/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
