# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                      | Line                  | Status  | Revision                                                                            | Posture | Publisher                |
| ----------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------- | ------- | ------------------------ |
| `reporting-1`           | Reporting API Level 1 | current | reporting-1 WD-reporting-1-20250611 (Working Draft, 2025-06-11)                     | track   | Working Draft 2025-06-11 |
| `network-error-logging` | Network Error Logging | current | network-error-logging WD-network-error-logging-20250505 (Working Draft, 2025-05-05) | track   | Working Draft 2025-05-05 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Reporting API Level 1

- Publisher status on 2026-10-06: Working Draft (2025-06-11).
- Pinned text: https://www.w3.org/TR/reporting-1/
- Revision token: reporting-1 WD-reporting-1-20250611 (Working Draft, 2025-06-11)

### Network Error Logging

- Publisher status on 2026-10-06: Working Draft (2025-05-05).
- Pinned text: https://www.w3.org/TR/network-error-logging/
- Revision token: network-error-logging WD-network-error-logging-20250505 (Working Draft, 2025-05-05)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
