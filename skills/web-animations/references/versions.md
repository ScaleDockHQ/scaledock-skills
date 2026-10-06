# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                 | Line                          | Status  | Revision                                                                  | Posture | Publisher                |
| ------------------ | ----------------------------- | ------- | ------------------------------------------------------------------------- | ------- | ------------------------ |
| `web-animations-2` | Web Animations Module Level 2 | current | web-animations-2 WD-web-animations-2-20251120 (Working Draft, 2025-11-20) | track   | Working Draft 2025-11-20 |
| `web-animations-1` | Web Animations Level 1        | legacy  | web-animations-1 WD-web-animations-1-20230605 (Working Draft, 2023-06-05) |         | Working Draft 2023-06-05 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Web Animations Module Level 2

- Publisher status on 2026-10-06: Working Draft (2025-11-20).
- Pinned text: https://www.w3.org/TR/web-animations-2/
- Revision token: web-animations-2 WD-web-animations-2-20251120 (Working Draft, 2025-11-20)

### Web Animations Level 1

- Publisher status on 2026-10-06: Working Draft (2023-06-05).
- Pinned text: https://www.w3.org/TR/web-animations-1/
- Revision token: web-animations-1 WD-web-animations-1-20230605 (Working Draft, 2023-06-05)

## Upgrading

### web-animations-1 to web-animations-2

1. Treat documents that cite Web Animations Level 1 (web-animations-1 WD-web-animations-1-20230605 (Working Draft, 2023-06-05)) as input.
2. Re-read Web Animations Module Level 2 at https://www.w3.org/TR/web-animations-2/.
3. Keep behavior that Web Animations Module Level 2 still requires, and replace behavior that only Web Animations Level 1 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
