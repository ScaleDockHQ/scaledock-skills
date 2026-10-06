# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id          | Line                 | Status  | Revision                                                                                                                                                        | Posture | Publisher                         |
| ----------- | -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------- |
| `smart-2.2` | SMART App Launch 2.2 | current | SMART App Launch v2.2.0 (Standard for Trial Use, 2026-10-06). The guide page says it is based on FHIR R4; the FHIR package list's latest release edition is R5. |         | Standard for Trial Use 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### SMART App Launch 2.2

- Publisher status on 2026-10-06: Standard for Trial Use (2026-10-06).
- Pinned text: https://hl7.org/fhir/smart-app-launch/STU2.2/
- Revision token: SMART App Launch v2.2.0 (Standard for Trial Use, 2026-10-06). The guide page says it is based on FHIR R4; the FHIR package list's latest release edition is R5.

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
