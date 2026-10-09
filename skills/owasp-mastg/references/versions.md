# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line        | Status  | Revision                | Posture | Summary                                                                                                                                                                                                                                                            |
| ------- | ----------- | ------- | ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mastg` | OWASP MASTG | current | Tag v2.0.0 (2026-06-30) |         | MASTG v2: atomic tests (MASTG-TEST-0200 and later) under `tests-beta/`, each with overview, steps, observation and evaluation, a MASVS category and a MASWE weakness. The v1 tests under `tests/` are marked deprecated and point to the v2 tests that cover them. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The website renders the guide from the GitHub repository. In v2.0.0 the v1 test cases (MASTG-TEST-0001 to 0087) carry `status: deprecated` and a `covered_by` list; use the atomic tests instead. Pin the release tag in [Sources](../SKILL.md#sources).

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
