# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id               | Line                                                                  | Status    | Revision                                                                 | Posture | Publisher                                    |
| ---------------- | --------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ | ------- | -------------------------------------------- |
| `ttml2`          | Timed Text Markup Language 2 (TTML2) (2nd Edition)                    | current   | ttml2 REC-ttml2-20181108 (Candidate Recommendation Snapshot, 2021-03-09) | build   | Candidate Recommendation Snapshot 2021-03-09 |
| `ttml1`          | Timed Text Markup Language 1 (TTML1) (Third Edition)                  | current   | ttml1 REC-ttml1-20181108 (Recommendation, 2018-11-08)                    |         | Recommendation 2018-11-08                    |
| `ttml-imsc1.3`   | IMSC Text Profile 1.3                                                 | current   | ttml-imsc1.3 REC-ttml1-20181108 (Recommendation, 2026-05-21)             |         | Recommendation 2026-05-21                    |
| `ttml-imsc1.2`   | TTML Profiles for Internet Media Subtitles and Captions 1.2           | supported | ttml-imsc1.2 REC-ttml1-20181108 (Recommendation, 2020-08-04)             |         | Recommendation 2020-08-04                    |
| `ttml-imsc1.1`   | TTML Profiles for Internet Media Subtitles and Captions 1.1           | supported | ttml-imsc1.1 REC-ttml2-20181108 (Recommendation, 2018-11-08)             |         | Recommendation 2018-11-08                    |
| `ttml-imsc1.0.1` | TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1) | supported | ttml-imsc1.0.1 REC-ttml-imsc1.0.1-20180424 (Recommendation, 2018-04-24)  |         | Recommendation 2018-04-24                    |
| `dapt`           | Dubbing and Audio description Profiles of TTML2                       | current   | dapt CRD-dapt-20260626 (Candidate Recommendation Draft, 2026-06-26)      | build   | Candidate Recommendation Draft 2026-06-26    |
| `imsc-hrm`       | IMSC Hypothetical Render Model                                        | current   | imsc-hrm REC-ttml2-20181108 (Recommendation, 2024-04-25)                 |         | Recommendation 2024-04-25                    |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Timed Text Markup Language 2 (TTML2) (2nd Edition)

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2021-03-09).
- Pinned text: https://www.w3.org/TR/ttml2/
- Revision token: ttml2 REC-ttml2-20181108 (Candidate Recommendation Snapshot, 2021-03-09)

### Timed Text Markup Language 1 (TTML1) (Third Edition)

- Publisher status on 2026-10-06: Recommendation (2018-11-08).
- Pinned text: https://www.w3.org/TR/ttml1/
- Revision token: ttml1 REC-ttml1-20181108 (Recommendation, 2018-11-08)

### IMSC Text Profile 1.3

- Publisher status on 2026-10-06: Recommendation (2026-05-21).
- Pinned text: https://www.w3.org/TR/ttml-imsc1.3/
- Revision token: ttml-imsc1.3 REC-ttml1-20181108 (Recommendation, 2026-05-21)

### TTML Profiles for Internet Media Subtitles and Captions 1.2

- Publisher status on 2026-10-06: Recommendation (2020-08-04).
- Pinned text: https://www.w3.org/TR/ttml-imsc1.2/
- Revision token: ttml-imsc1.2 REC-ttml1-20181108 (Recommendation, 2020-08-04)

### TTML Profiles for Internet Media Subtitles and Captions 1.1

- Publisher status on 2026-10-06: Recommendation (2018-11-08).
- Pinned text: https://www.w3.org/TR/ttml-imsc1.1/
- Revision token: ttml-imsc1.1 REC-ttml2-20181108 (Recommendation, 2018-11-08)

### TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1)

- Publisher status on 2026-10-06: Recommendation (2018-04-24).
- Pinned text: https://www.w3.org/TR/ttml-imsc1.0.1/
- Revision token: ttml-imsc1.0.1 REC-ttml-imsc1.0.1-20180424 (Recommendation, 2018-04-24)

### Dubbing and Audio description Profiles of TTML2

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-06-26).
- Pinned text: https://www.w3.org/TR/dapt/
- Revision token: dapt CRD-dapt-20260626 (Candidate Recommendation Draft, 2026-06-26)

### IMSC Hypothetical Render Model

- Publisher status on 2026-10-06: Recommendation (2024-04-25).
- Pinned text: https://www.w3.org/TR/imsc-hrm/
- Revision token: imsc-hrm REC-ttml2-20181108 (Recommendation, 2024-04-25)

## Upgrading

### ttml-imsc1.2 to ttml-imsc1.3

1. Treat documents that cite TTML Profiles for Internet Media Subtitles and Captions 1.2 (ttml-imsc1.2 REC-ttml1-20181108 (Recommendation, 2020-08-04)) as input.
2. Re-read IMSC Text Profile 1.3 at https://www.w3.org/TR/ttml-imsc1.3/.
3. Keep behavior that IMSC Text Profile 1.3 still requires, and replace behavior that only TTML Profiles for Internet Media Subtitles and Captions 1.2 required.
4. Record the target revision on the artifact.

### ttml-imsc1.1 to ttml-imsc1.3

1. Treat documents that cite TTML Profiles for Internet Media Subtitles and Captions 1.1 (ttml-imsc1.1 REC-ttml2-20181108 (Recommendation, 2018-11-08)) as input.
2. Re-read IMSC Text Profile 1.3 at https://www.w3.org/TR/ttml-imsc1.3/.
3. Keep behavior that IMSC Text Profile 1.3 still requires, and replace behavior that only TTML Profiles for Internet Media Subtitles and Captions 1.1 required.
4. Record the target revision on the artifact.

### ttml-imsc1.0.1 to ttml-imsc1.3

1. Treat documents that cite TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1) (ttml-imsc1.0.1 REC-ttml-imsc1.0.1-20180424 (Recommendation, 2018-04-24)) as input.
2. Re-read IMSC Text Profile 1.3 at https://www.w3.org/TR/ttml-imsc1.3/.
3. Keep behavior that IMSC Text Profile 1.3 still requires, and replace behavior that only TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1) required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
