# ttml

An agent skill for Timed Text Markup Language (TTML).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ttml
```

Then ask the agent to apply Timed Text Markup Language (TTML).

## What it covers

- when authoring timed text or IMSC captions
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                  | Status          |
| --------------------------------------------------------------------- | --------------- |
| Timed Text Markup Language 2 (TTML2) (2nd Edition)                    | current (build) |
| Timed Text Markup Language 1 (TTML1) (Third Edition)                  | current         |
| IMSC Text Profile 1.3                                                 | current         |
| TTML Profiles for Internet Media Subtitles and Captions 1.2           | supported       |
| TTML Profiles for Internet Media Subtitles and Captions 1.1           | supported       |
| TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1) | supported       |
| Dubbing and Audio description Profiles of TTML2                       | current (build) |
| IMSC Hypothetical Render Model                                        | current         |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Timed Text Markup Language 2 (TTML2) (2nd Edition)](https://www.w3.org/TR/ttml2/): Candidate Recommendation Snapshot, ttml2 REC-ttml2-20181108 (Candidate Recommendation Snapshot, 2021-03-09).
- [Timed Text Markup Language 1 (TTML1) (Third Edition)](https://www.w3.org/TR/ttml1/): Recommendation, ttml1 REC-ttml1-20181108 (Recommendation, 2018-11-08).
- [IMSC Text Profile 1.3](https://www.w3.org/TR/ttml-imsc1.3/): Recommendation, ttml-imsc1.3 REC-ttml1-20181108 (Recommendation, 2026-05-21).
- [TTML Profiles for Internet Media Subtitles and Captions 1.2](https://www.w3.org/TR/ttml-imsc1.2/): Recommendation, ttml-imsc1.2 REC-ttml1-20181108 (Recommendation, 2020-08-04).
- [TTML Profiles for Internet Media Subtitles and Captions 1.1](https://www.w3.org/TR/ttml-imsc1.1/): Recommendation, ttml-imsc1.1 REC-ttml2-20181108 (Recommendation, 2018-11-08).
- [TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1)](https://www.w3.org/TR/ttml-imsc1.0.1/): Recommendation, ttml-imsc1.0.1 REC-ttml-imsc1.0.1-20180424 (Recommendation, 2018-04-24).
- [Dubbing and Audio description Profiles of TTML2](https://www.w3.org/TR/dapt/): Candidate Recommendation Draft, dapt CRD-dapt-20260626 (Candidate Recommendation Draft, 2026-06-26).
- [IMSC Hypothetical Render Model](https://www.w3.org/TR/imsc-hrm/): Recommendation, imsc-hrm REC-ttml2-20181108 (Recommendation, 2024-04-25).
- [TTML Media Type Definition and Profile Registry](https://www.w3.org/TR/ttml-profile-registry/): Note, ttml-profile-registry (Note, 2026-07-02).

## License

MIT
