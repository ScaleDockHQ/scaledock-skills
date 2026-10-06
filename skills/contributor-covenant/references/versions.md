# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                         | Line                     | Status    | Revision                                                                   | Posture | Publisher                  |
| -------------------------- | ------------------------ | --------- | -------------------------------------------------------------------------- | ------- | -------------------------- |
| `contributor-covenant-3.0` | Contributor Covenant 3.0 | current   | Contributor Covenant 3.0, fetched 2026-10-06 (Code of conduct, 2026-10-06) |         | Code of conduct 2026-10-06 |
| `contributor-covenant-2.1` | Contributor Covenant 2.1 | supported | Contributor Covenant 2.1, fetched 2026-10-06 (Code of conduct, 2026-10-06) |         | Code of conduct 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Contributor Covenant 3.0

- Publisher status on 2026-10-06: Code of conduct (2026-10-06).
- Pinned text: https://www.contributor-covenant.org/version/3/0/code_of_conduct/
- Revision token: Contributor Covenant 3.0, fetched 2026-10-06 (Code of conduct, 2026-10-06)

### Contributor Covenant 2.1

- Publisher status on 2026-10-06: Code of conduct (2026-10-06).
- Pinned text: https://www.contributor-covenant.org/version/2/1/code_of_conduct/
- Revision token: Contributor Covenant 2.1, fetched 2026-10-06 (Code of conduct, 2026-10-06)

## Upgrading

### contributor-covenant-2.1 to contributor-covenant-3.0

1. Treat documents that cite Contributor Covenant 2.1 (Contributor Covenant 2.1, fetched 2026-10-06 (Code of conduct, 2026-10-06)) as input.
2. Re-read Contributor Covenant 3.0 at https://www.contributor-covenant.org/version/3/0/code_of_conduct/.
3. Keep behavior that Contributor Covenant 3.0 still requires, and replace behavior that only Contributor Covenant 2.1 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
