# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                 | Line                 | Status  | Revision                                                                            | Posture | Publisher                                    |
| ------------------ | -------------------- | ------- | ----------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `geolocation-2016` | Geolocation API 2016 | legacy  | geolocation-2016 REC-geolocation-API-20161108 (Recommendation, 2016-11-08)          |         | Recommendation 2016-11-08                    |
| `geolocation`      | Geolocation          | current | geolocation CR-geolocation-20260326 (Candidate Recommendation Snapshot, 2026-03-26) | build   | Candidate Recommendation Snapshot 2026-03-26 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Geolocation API 2016

- Publisher status on 2026-10-06: Recommendation (2016-11-08).
- Pinned text: https://www.w3.org/TR/2016/REC-geolocation-API-20161108/
- Revision token: geolocation-2016 REC-geolocation-API-20161108 (Recommendation, 2016-11-08)

### Geolocation

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2026-03-26).
- Pinned text: https://www.w3.org/TR/geolocation/
- Revision token: geolocation CR-geolocation-20260326 (Candidate Recommendation Snapshot, 2026-03-26)

## Upgrading

### geolocation-2016 to geolocation

1. Treat documents that cite Geolocation API 2016 (geolocation-2016 REC-geolocation-API-20161108 (Recommendation, 2016-11-08)) as input.
2. Re-read Geolocation at https://www.w3.org/TR/geolocation/.
3. Keep behavior that Geolocation still requires, and replace behavior that only Geolocation API 2016 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
