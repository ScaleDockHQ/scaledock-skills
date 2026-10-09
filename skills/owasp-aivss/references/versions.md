# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line        | Status  | Revision                               | Posture | Summary                                                                                                                                                                                                                      |
| ------- | ----------- | ------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aivss` | OWASP AIVSS | current | v0.8, commit 84856b290f62 (2026-09-09) |         | v0.8, the AIVSS-Agentic scoring system: CVSS v4.0 base plus an Agentic Uplift (AARS) from ten amplification factors and a threat multiplier, times a mitigation factor, reported as a single score with CVSS severity bands. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

AIVSS is a pre-1.0 draft and v0.8 is the newest publication on the project site; it replaces v0.5, which the same repository still hosts. The repository README describes an earlier, generic AI scoring draft with different metrics; do not mix it with v0.8 scores. Pin the repository commit and the PDF version in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
