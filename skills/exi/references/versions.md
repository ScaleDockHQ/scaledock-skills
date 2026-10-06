# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id            | Line                                                                         | Status  | Revision                                                          | Posture | Publisher                 |
| ------------- | ---------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------- | ------- | ------------------------- |
| `exi`         | Efficient XML Interchange (EXI) Format 1.0 (Second Edition)                  | current | exi REC-exi-20140211 (Recommendation, 2014-02-11)                 |         | Recommendation 2014-02-11 |
| `exi-profile` | Efficient XML Interchange (EXI) Profile for limiting usage of dynamic memory | current | exi-profile REC-exi-profile-20140909 (Recommendation, 2014-09-09) |         | Recommendation 2014-09-09 |
| `exi-c14n`    | Canonical EXI                                                                | current | exi-c14n REC-exi-c14n-20180607 (Recommendation, 2018-06-07)       |         | Recommendation 2018-06-07 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Efficient XML Interchange (EXI) Format 1.0 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2014-02-11).
- Pinned text: https://www.w3.org/TR/exi/
- Revision token: exi REC-exi-20140211 (Recommendation, 2014-02-11)

### Efficient XML Interchange (EXI) Profile for limiting usage of dynamic memory

- Publisher status on 2026-10-06: Recommendation (2014-09-09).
- Pinned text: https://www.w3.org/TR/exi-profile/
- Revision token: exi-profile REC-exi-profile-20140909 (Recommendation, 2014-09-09)

### Canonical EXI

- Publisher status on 2026-10-06: Recommendation (2018-06-07).
- Pinned text: https://www.w3.org/TR/exi-c14n/
- Revision token: exi-c14n REC-exi-c14n-20180607 (Recommendation, 2018-06-07)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
