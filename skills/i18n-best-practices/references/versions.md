# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                     | Line                                                     | Status  | Revision                                                                       | Posture | Publisher                             |
| ---------------------- | -------------------------------------------------------- | ------- | ------------------------------------------------------------------------------ | ------- | ------------------------------------- |
| `charmod`              | Character Model for the World Wide Web 1.0: Fundamentals | current | charmod REC-charmod-20050215 (Recommendation, 2005-02-15)                      |         | Recommendation 2005-02-15             |
| `charmod-norm-preview` | Character Model for the World Wide Web: String Matching  | preview | charmod-norm WD-charmod-norm-20260716 (First Public Working Draft, 2026-07-16) | track   | First Public Working Draft 2026-07-16 |
| `string-meta`          | Strings on the Web: Language and Direction Metadata      | current | string-meta WD-string-meta-20260716 (First Public Working Draft, 2026-07-16)   | track   | First Public Working Draft 2026-07-16 |
| `its20`                | Internationalization Tag Set (ITS) Version 2.0           | current | its20 REC-its20-20131029 (Recommendation, 2013-10-29)                          |         | Recommendation 2013-10-29             |
| `ruby`                 | Ruby Annotation                                          | current | ruby REC-ruby-20010531 (Recommendation, 2001-05-31)                            |         | Recommendation 2001-05-31             |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Character Model for the World Wide Web 1.0: Fundamentals

- Publisher status on 2026-10-06: Recommendation (2005-02-15).
- Pinned text: https://www.w3.org/TR/charmod/
- Revision token: charmod REC-charmod-20050215 (Recommendation, 2005-02-15)

### Character Model for the World Wide Web: String Matching

- Publisher status on 2026-10-06: First Public Working Draft (2026-07-16).
- Pinned text: https://www.w3.org/TR/charmod-norm/
- Revision token: charmod-norm WD-charmod-norm-20260716 (First Public Working Draft, 2026-07-16)

### Strings on the Web: Language and Direction Metadata

- Publisher status on 2026-10-06: First Public Working Draft (2026-07-16).
- Pinned text: https://www.w3.org/TR/string-meta/
- Revision token: string-meta WD-string-meta-20260716 (First Public Working Draft, 2026-07-16)

### Internationalization Tag Set (ITS) Version 2.0

- Publisher status on 2026-10-06: Recommendation (2013-10-29).
- Pinned text: https://www.w3.org/TR/its20/
- Revision token: its20 REC-its20-20131029 (Recommendation, 2013-10-29)

### Ruby Annotation

- Publisher status on 2026-10-06: Recommendation (2001-05-31).
- Pinned text: https://www.w3.org/TR/ruby/
- Revision token: ruby REC-ruby-20010531 (Recommendation, 2001-05-31)

## Upgrading

There is no older line to upgrade from.

## Preview: Character Model for the World Wide Web: String Matching

`charmod-norm-preview` is a First Public Working Draft dated 2026-07-16, pinned at https://www.w3.org/TR/charmod-norm/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
