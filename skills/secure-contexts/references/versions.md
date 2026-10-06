# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                          | Line                      | Status  | Revision                                                                                                        | Posture | Publisher                                    |
| --------------------------- | ------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `secure-contexts`           | Secure Contexts           | current | secure-contexts CRD-secure-contexts-20231110 (Candidate Recommendation Draft, 2023-11-10)                       | build   | Candidate Recommendation Draft 2023-11-10    |
| `mixed-content`             | Mixed Content             | current | mixed-content CRD-mixed-content-20230223 (Candidate Recommendation Draft, 2023-02-23)                           | build   | Candidate Recommendation Draft 2023-02-23    |
| `upgrade-insecure-requests` | Upgrade Insecure Requests | current | upgrade-insecure-requests CR-upgrade-insecure-requests-20151008 (Candidate Recommendation Snapshot, 2015-10-08) | build   | Candidate Recommendation Snapshot 2015-10-08 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Secure Contexts

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2023-11-10).
- Pinned text: https://www.w3.org/TR/secure-contexts/
- Revision token: secure-contexts CRD-secure-contexts-20231110 (Candidate Recommendation Draft, 2023-11-10)

### Mixed Content

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2023-02-23).
- Pinned text: https://www.w3.org/TR/mixed-content/
- Revision token: mixed-content CRD-mixed-content-20230223 (Candidate Recommendation Draft, 2023-02-23)

### Upgrade Insecure Requests

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2015-10-08).
- Pinned text: https://www.w3.org/TR/upgrade-insecure-requests/
- Revision token: upgrade-insecure-requests CR-upgrade-insecure-requests-20151008 (Candidate Recommendation Snapshot, 2015-10-08)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
