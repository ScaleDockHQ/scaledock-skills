# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id       | Line                                               | Status  | Revision                                                              | Posture | Publisher                 |
| -------- | -------------------------------------------------- | ------- | --------------------------------------------------------------------- | ------- | ------------------------- |
| `atag20` | Authoring Tool Accessibility Guidelines (ATAG) 2.0 | current | ATAG20 NOTE-IMPLEMENTING-ATAG20-20150924 (Recommendation, 2015-09-24) |         | Recommendation 2015-09-24 |
| `atag10` | Authoring Tool Accessibility Guidelines 1.0        | legacy  | ATAG10 REC-ATAG10-20000203 (Recommendation, 2000-02-03)               |         | Recommendation 2000-02-03 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Authoring Tool Accessibility Guidelines (ATAG) 2.0

- Publisher status on 2026-10-06: Recommendation (2015-09-24).
- Pinned text: https://www.w3.org/TR/ATAG20/
- Revision token: ATAG20 NOTE-IMPLEMENTING-ATAG20-20150924 (Recommendation, 2015-09-24)

### Authoring Tool Accessibility Guidelines 1.0

- Publisher status on 2026-10-06: Recommendation (2000-02-03).
- Pinned text: https://www.w3.org/TR/ATAG10/
- Revision token: ATAG10 REC-ATAG10-20000203 (Recommendation, 2000-02-03)

## Upgrading

### atag10 to atag20

1. Treat documents that cite Authoring Tool Accessibility Guidelines 1.0 (ATAG10 REC-ATAG10-20000203 (Recommendation, 2000-02-03)) as input.
2. Re-read Authoring Tool Accessibility Guidelines (ATAG) 2.0 at https://www.w3.org/TR/ATAG20/.
3. Keep behavior that Authoring Tool Accessibility Guidelines (ATAG) 2.0 still requires, and replace behavior that only Authoring Tool Accessibility Guidelines 1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
