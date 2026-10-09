# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                    | Line                | Status  | Revision                                                            | Posture | Summary                                                                                                                                      |
| --------------------- | ------------------- | ------- | ------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `openchain-iso-5230`  | OpenChain ISO 5230  | current | ISO/IEC 5230:2020 (OpenChain 2.1), commit 968092c97da8 (2025-01-08) |         | License compliance program: policy, competence, awareness, scope, bill of materials, compliance artifacts and contributions.                 |
| `openchain-iso-18974` | OpenChain ISO 18974 | current | ISO/IEC 18974:2023, commit 5bb0a024ce96 (2024-11-08)                |         | Security assurance program: policy, competence, standard practices for known vulnerabilities, SBOM and security assurance of each component. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The two lines are separate families, not successive versions: ISO/IEC 5230 covers license compliance and ISO/IEC 18974 covers security assurance, and an organization can conform to either or both. The public Markdown texts are the OpenChain Project's own renderings; the project notes they may differ in formatting from the ISO publications but contain the same requirements. Conformance under either lasts 18 months.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
