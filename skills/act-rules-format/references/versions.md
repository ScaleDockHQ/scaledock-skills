# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                     | Line                                                     | Status  | Revision                                                                            | Posture | Publisher                 |
| ---------------------- | -------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- | ------- | ------------------------- |
| `act-rules-format-1.1` | Accessibility Conformance Testing (ACT) Rules Format 1.1 | current | act-rules-format-1.1 REC-act-rules-format-1.1-20260205 (Recommendation, 2026-02-05) |         | Recommendation 2026-02-05 |
| `act-rules-format-1.0` | Accessibility Conformance Testing (ACT) Rules Format 1.0 | legacy  | act-rules-format-1.0 REC-act-rules-format-1.0-20191031 (Recommendation, 2019-10-31) |         | Recommendation 2019-10-31 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Accessibility Conformance Testing (ACT) Rules Format 1.1

- Publisher status on 2026-10-06: Recommendation (2026-02-05).
- Pinned text: https://www.w3.org/TR/act-rules-format-1.1/
- Revision token: act-rules-format-1.1 REC-act-rules-format-1.1-20260205 (Recommendation, 2026-02-05)

### Accessibility Conformance Testing (ACT) Rules Format 1.0

- Publisher status on 2026-10-06: Recommendation (2019-10-31).
- Pinned text: https://www.w3.org/TR/act-rules-format-1.0/
- Revision token: act-rules-format-1.0 REC-act-rules-format-1.0-20191031 (Recommendation, 2019-10-31)

## Upgrading

### act-rules-format-1.0 to act-rules-format-1.1

1. Treat documents that cite Accessibility Conformance Testing (ACT) Rules Format 1.0 (act-rules-format-1.0 REC-act-rules-format-1.0-20191031 (Recommendation, 2019-10-31)) as input.
2. Re-read Accessibility Conformance Testing (ACT) Rules Format 1.1 at https://www.w3.org/TR/act-rules-format-1.1/.
3. Keep behavior that Accessibility Conformance Testing (ACT) Rules Format 1.1 still requires, and replace behavior that only Accessibility Conformance Testing (ACT) Rules Format 1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
