# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                                  | Line                                            | Status  | Revision                                                                                                | Posture | Publisher                             |
| ----------------------------------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------- |
| `wot-architecture11`                | Web of Things (WoT) Architecture 1.1            | current | wot-architecture11 REC-wot-architecture-20200409 (Recommendation, 2023-12-05)                           |         | Recommendation 2023-12-05             |
| `wot-architecture10`                | Web of Things (WoT) Architecture Level 1.0      | legacy  | wot-architecture10 CR-wot-architecture-20190516 (Recommendation, 2020-04-09)                            |         | Recommendation 2020-04-09             |
| `wot-thing-description11`           | Web of Things (WoT) Thing Description 1.1       | current | wot-thing-description11 REC-wot-thing-description-20200409 (Recommendation, 2023-12-05)                 |         | Recommendation 2023-12-05             |
| `wot-thing-description-2.0-preview` | Web of Things (WoT) Thing Description 2.0       | preview | wot-thing-description-2.0 REC-wot-thing-description11-20231205 (First Public Working Draft, 2025-11-04) | track   | First Public Working Draft 2025-11-04 |
| `wot-thing-description10`           | Web of Things (WoT) Thing Description Level 1.0 | legacy  | wot-thing-description10 REC-wot-thing-description-20200409 (Recommendation, 2020-04-09)                 |         | Recommendation 2020-04-09             |
| `wot-discovery`                     | Web of Things (WoT) Discovery                   | current | wot-discovery REC-wot-discovery-20231205 (Recommendation, 2023-12-05)                                   |         | Recommendation 2023-12-05             |
| `wot-profile`                       | Web of Things (WoT) Profiles                    | current | wot-profile WD-wot-profile-20251104 (Working Draft, 2025-11-04)                                         | track   | Working Draft 2025-11-04              |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Web of Things (WoT) Architecture 1.1

- Publisher status on 2026-10-06: Recommendation (2023-12-05).
- Pinned text: https://www.w3.org/TR/wot-architecture11/
- Revision token: wot-architecture11 REC-wot-architecture-20200409 (Recommendation, 2023-12-05)

### Web of Things (WoT) Architecture Level 1.0

- Publisher status on 2026-10-06: Recommendation (2020-04-09).
- Pinned text: https://www.w3.org/TR/wot-architecture10/
- Revision token: wot-architecture10 CR-wot-architecture-20190516 (Recommendation, 2020-04-09)

### Web of Things (WoT) Thing Description 1.1

- Publisher status on 2026-10-06: Recommendation (2023-12-05).
- Pinned text: https://www.w3.org/TR/wot-thing-description11/
- Revision token: wot-thing-description11 REC-wot-thing-description-20200409 (Recommendation, 2023-12-05)

### Web of Things (WoT) Thing Description 2.0

- Publisher status on 2026-10-06: First Public Working Draft (2025-11-04).
- Pinned text: https://www.w3.org/TR/wot-thing-description-2.0/
- Revision token: wot-thing-description-2.0 REC-wot-thing-description11-20231205 (First Public Working Draft, 2025-11-04)

### Web of Things (WoT) Thing Description Level 1.0

- Publisher status on 2026-10-06: Recommendation (2020-04-09).
- Pinned text: https://www.w3.org/TR/wot-thing-description10/
- Revision token: wot-thing-description10 REC-wot-thing-description-20200409 (Recommendation, 2020-04-09)

### Web of Things (WoT) Discovery

- Publisher status on 2026-10-06: Recommendation (2023-12-05).
- Pinned text: https://www.w3.org/TR/wot-discovery/
- Revision token: wot-discovery REC-wot-discovery-20231205 (Recommendation, 2023-12-05)

### Web of Things (WoT) Profiles

- Publisher status on 2026-10-06: Working Draft (2025-11-04).
- Pinned text: https://www.w3.org/TR/wot-profile/
- Revision token: wot-profile WD-wot-profile-20251104 (Working Draft, 2025-11-04)

## Upgrading

### wot-architecture10 to wot-architecture11

1. Treat documents that cite Web of Things (WoT) Architecture Level 1.0 (wot-architecture10 CR-wot-architecture-20190516 (Recommendation, 2020-04-09)) as input.
2. Re-read Web of Things (WoT) Architecture 1.1 at https://www.w3.org/TR/wot-architecture11/.
3. Keep behavior that Web of Things (WoT) Architecture 1.1 still requires, and replace behavior that only Web of Things (WoT) Architecture Level 1.0 required.
4. Record the target revision on the artifact.

### wot-thing-description10 to wot-thing-description11

1. Treat documents that cite Web of Things (WoT) Thing Description Level 1.0 (wot-thing-description10 REC-wot-thing-description-20200409 (Recommendation, 2020-04-09)) as input.
2. Re-read Web of Things (WoT) Thing Description 1.1 at https://www.w3.org/TR/wot-thing-description11/.
3. Keep behavior that Web of Things (WoT) Thing Description 1.1 still requires, and replace behavior that only Web of Things (WoT) Thing Description Level 1.0 required.
4. Record the target revision on the artifact.

## Preview: Web of Things (WoT) Thing Description 2.0

`wot-thing-description-2.0-preview` is a First Public Working Draft dated 2025-11-04, pinned at https://www.w3.org/TR/wot-thing-description-2.0/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
