# Versions and upgrades

Read this when choosing a target or refreshing the skill. Sources: the Final Community Group Report and the editor's draft, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line                     | Status  | Revision                                  | Posture | Summary                        |
| --------------- | ------------------------ | ------- | ----------------------------------------- | ------- | ------------------------------ |
| `cg-final-2024` | TDMRep Final Report 2024 | current | Final Community Group Report, 10 May 2024 |         | The only published final text. |

Statuses: **current** is the default target. There is no legacy line and no preview.

## Which version to use

- Implement the Final Report of 10 May 2024.
- The editor's draft at `w3c-cg.github.io` matched the Final Report in substance when checked: only headings, the status section and one typo differ. Re-compare on every refresh.

## What changed

### Final Community Group Report, 10 May 2024

- First final report of the TDM Reservation Protocol Community Group, published under the W3C Community Final Specification Agreement.
- Defines `tdm-reservation` and `tdm-policy`, five techniques (well-known file, HTTP header, HTML meta, EPUB 2 and 3 metadata, PDF XMP), processing priority, and an ODRL 2.2 policy profile.
- Marks `tdm:research` and `tdm:non-research` as experimental.

## Upgrading

There is no earlier line to upgrade from. When a new report is published: add it as current, move this line to supported or legacy, and add an upgrade section here.

## Watching for change

- A new final report from the Community Group, or a W3C Working Group adopting the work.
- Changes to the experimental purpose constraints (`tdm:research`, `tdm:non-research`).
- Any EU list of recognised machine-readable opt-out protocols that names or excludes TDMRep; record it in [Sources](../SKILL.md#sources) before relying on it.
