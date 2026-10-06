# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                     | Line                     | Status  | Revision                                                                            | Posture | Publisher                                 |
| ---------------------- | ------------------------ | ------- | ----------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `epub-33`              | EPUB 3.3                 | current | epub-33 REC-epub-33-20260113 (Recommendation, 2026-01-13)                           |         | Recommendation 2026-01-13                 |
| `epub-34-preview`      | EPUB 3.4                 | preview | epub-34 CRD-epub-34-20261002 (Candidate Recommendation Draft, 2026-10-02)           | build   | Candidate Recommendation Draft 2026-10-02 |
| `epub-rs-33`           | EPUB Reading Systems 3.3 | current | epub-rs-33 REC-epub-rs-33-20241017 (Recommendation, 2024-10-17)                     |         | Recommendation 2024-10-17                 |
| `epub-rs-34-preview`   | EPUB Reading Systems 3.4 | preview | epub-rs-34 CRD-epub-rs-34-20260721 (Candidate Recommendation Draft, 2026-07-21)     | build   | Candidate Recommendation Draft 2026-07-21 |
| `epub-a11y-11`         | EPUB Accessibility 1.1   | current | epub-a11y-11 REC-epub-a11y-11-20241017 (Recommendation, 2024-10-17)                 |         | Recommendation 2024-10-17                 |
| `epub-a11y-12-preview` | EPUB Accessibility 1.2   | preview | epub-a11y-12 CRD-epub-a11y-12-20260912 (Candidate Recommendation Draft, 2026-09-12) | build   | Candidate Recommendation Draft 2026-09-12 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### EPUB 3.3

- Publisher status on 2026-10-06: Recommendation (2026-01-13).
- Pinned text: https://www.w3.org/TR/epub-33/
- Revision token: epub-33 REC-epub-33-20260113 (Recommendation, 2026-01-13)

### EPUB 3.4

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-10-02).
- Pinned text: https://www.w3.org/TR/epub-34/
- Revision token: epub-34 CRD-epub-34-20261002 (Candidate Recommendation Draft, 2026-10-02)

### EPUB Reading Systems 3.3

- Publisher status on 2026-10-06: Recommendation (2024-10-17).
- Pinned text: https://www.w3.org/TR/epub-rs-33/
- Revision token: epub-rs-33 REC-epub-rs-33-20241017 (Recommendation, 2024-10-17)

### EPUB Reading Systems 3.4

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-07-21).
- Pinned text: https://www.w3.org/TR/epub-rs-34/
- Revision token: epub-rs-34 CRD-epub-rs-34-20260721 (Candidate Recommendation Draft, 2026-07-21)

### EPUB Accessibility 1.1

- Publisher status on 2026-10-06: Recommendation (2024-10-17).
- Pinned text: https://www.w3.org/TR/epub-a11y-11/
- Revision token: epub-a11y-11 REC-epub-a11y-11-20241017 (Recommendation, 2024-10-17)

### EPUB Accessibility 1.2

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-09-12).
- Pinned text: https://www.w3.org/TR/epub-a11y-12/
- Revision token: epub-a11y-12 CRD-epub-a11y-12-20260912 (Candidate Recommendation Draft, 2026-09-12)

## Upgrading

There is no older line to upgrade from.

## Preview: EPUB 3.4

`epub-34-preview` is a Candidate Recommendation Draft dated 2026-10-02, pinned at https://www.w3.org/TR/epub-34/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: EPUB Reading Systems 3.4

`epub-rs-34-preview` is a Candidate Recommendation Draft dated 2026-07-21, pinned at https://www.w3.org/TR/epub-rs-34/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: EPUB Accessibility 1.2

`epub-a11y-12-preview` is a Candidate Recommendation Draft dated 2026-09-12, pinned at https://www.w3.org/TR/epub-a11y-12/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
