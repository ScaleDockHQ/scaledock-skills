# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                | Line                                                          | Status  | Revision                                                                            | Posture | Publisher                                    |
| ----------------- | ------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `mathml-core`     | MathML Core                                                   | current | mathml-core CR-mathml-core-20250624 (Candidate Recommendation Snapshot, 2025-06-24) | build   | Candidate Recommendation Snapshot 2025-06-24 |
| `mathml4-preview` | Mathematical Markup Language (MathML) Version 4.0             | preview | mathml4 WD-mathml4-20261002 (Working Draft, 2026-10-02)                             | track   | Working Draft 2026-10-02                     |
| `mathml3`         | Mathematical Markup Language (MathML) Version 3.0 2nd Edition | legacy  | MathML3 REC-MathML3-20140410 (Recommendation, 2014-04-10)                           |         | Recommendation 2014-04-10                    |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### MathML Core

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2025-06-24).
- Pinned text: https://www.w3.org/TR/mathml-core/
- Revision token: mathml-core CR-mathml-core-20250624 (Candidate Recommendation Snapshot, 2025-06-24)

### Mathematical Markup Language (MathML) Version 4.0

- Publisher status on 2026-10-06: Working Draft (2026-10-02).
- Pinned text: https://www.w3.org/TR/mathml4/
- Revision token: mathml4 WD-mathml4-20261002 (Working Draft, 2026-10-02)

### Mathematical Markup Language (MathML) Version 3.0 2nd Edition

- Publisher status on 2026-10-06: Recommendation (2014-04-10).
- Pinned text: https://www.w3.org/TR/MathML3/
- Revision token: MathML3 REC-MathML3-20140410 (Recommendation, 2014-04-10)

## Upgrading

### mathml3 to mathml-core

1. Treat documents that cite Mathematical Markup Language (MathML) Version 3.0 2nd Edition (MathML3 REC-MathML3-20140410 (Recommendation, 2014-04-10)) as input.
2. Re-read MathML Core at https://www.w3.org/TR/mathml-core/.
3. Keep behavior that MathML Core still requires, and replace behavior that only Mathematical Markup Language (MathML) Version 3.0 2nd Edition required.
4. Record the target revision on the artifact.

## Preview: Mathematical Markup Language (MathML) Version 4.0

`mathml4-preview` is a Working Draft dated 2026-10-02, pinned at https://www.w3.org/TR/mathml4/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
