# Schemas and validation

Read this when validating a description. Sources: the OAI index of schema iterations and Arazzo 1.1.0. For which `arazzo` value to declare, see [`versions.md`](versions.md).

## Schemas

| Version | Schema                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------- |
| 1.1.x   | `https://spec.openapis.org/arazzo/1.1/schema/2026-04-15` (`arazzo` pattern `^1\.1\.\d+(-.+)?$`) |
| 1.0.x   | `https://spec.openapis.org/arazzo/1.0/schema/2025-10-15`                                        |

Rules from the index: every schema for a minor release applies to all its patch releases; the latest dated iteration is the most correct and earlier ones are obsolete; schemas do not catch every violation, and the specification text wins when they disagree. Both schemas are JSON Schema Draft 2020-12. No schema is published for the 1.2 development line.

## What a schema cannot check

- `workflowId` uniqueness and `stepId` uniqueness per workflow (§ 5.8.4.1, § 5.8.5.1).
- That `operationId`, `operationPath`, `channelPath` and `workflowId` resolve in the listed sources (§ 5.8.5.1).
- That runtime expressions follow the ABNF and point at existing inputs, outputs and components (§ 5.9).
- That step output references are satisfied by order or `dependsOn` (§ 5.8.5.2).
- That `goto` and `retry` targets exist, and `stepId` targets are in the same workflow (§ 5.8.7.1, § 5.8.8.1).
- That parameters match the target operation's parameters, and that `querystring` is not mixed with `query` (§ 5.8.6).
