# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id          | Line                        | Status    | Revision                                                               | Posture | Publisher                    |
| ----------- | --------------------------- | --------- | ---------------------------------------------------------------------- | ------- | ---------------------------- |
| `mds-3.1.1` | FIDO Metadata Service 3.1.1 | current   | MDS 3.1.1 Proposed Standard 2026-01-05 (Proposed Standard, 2026-01-05) |         | Proposed Standard 2026-01-05 |
| `mds-3.1`   | FIDO Metadata Service 3.1   | supported | MDS 3.1 Proposed Standard 2025-05-21 (Proposed Standard, 2025-05-21)   |         | Proposed Standard 2025-05-21 |
| `mds-3.0`   | FIDO Metadata Service 3.0   | legacy    | MDS 3.0 Proposed Standard 2021-05-18 (Proposed Standard, 2021-05-18)   |         | Proposed Standard 2021-05-18 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### FIDO Metadata Service 3.1.1

- Publisher status on 2026-10-06: Proposed Standard (2026-01-05).
- Pinned text: https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1.1-ps-20260105.html
- Revision token: MDS 3.1.1 Proposed Standard 2026-01-05 (Proposed Standard, 2026-01-05)

### FIDO Metadata Service 3.1

- Publisher status on 2026-10-06: Proposed Standard (2025-05-21).
- Pinned text: https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1-ps-20250521.html
- Revision token: MDS 3.1 Proposed Standard 2025-05-21 (Proposed Standard, 2025-05-21)

### FIDO Metadata Service 3.0

- Publisher status on 2026-10-06: Proposed Standard (2021-05-18).
- Pinned text: https://fidoalliance.org/specs/mds/fido-metadata-service-v3.0-ps-20210518.html
- Revision token: MDS 3.0 Proposed Standard 2021-05-18 (Proposed Standard, 2021-05-18)

## Upgrading

### mds-3.1 to mds-3.1.1

1. Treat documents that cite FIDO Metadata Service 3.1 (MDS 3.1 Proposed Standard 2025-05-21 (Proposed Standard, 2025-05-21)) as input.
2. Re-read FIDO Metadata Service 3.1.1 at https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1.1-ps-20260105.html.
3. Keep behavior that FIDO Metadata Service 3.1.1 still requires, and replace behavior that only FIDO Metadata Service 3.1 required.
4. Record the target revision on the artifact.

### mds-3.0 to mds-3.1.1

1. Treat documents that cite FIDO Metadata Service 3.0 (MDS 3.0 Proposed Standard 2021-05-18 (Proposed Standard, 2021-05-18)) as input.
2. Re-read FIDO Metadata Service 3.1.1 at https://fidoalliance.org/specs/mds/fido-metadata-service-v3.1.1-ps-20260105.html.
3. Keep behavior that FIDO Metadata Service 3.1.1 still requires, and replace behavior that only FIDO Metadata Service 3.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
