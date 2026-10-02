# Versions, schemas and the 1.2 development line

Read this when choosing the `arazzo` value, upgrading, or validating. Sources: Arazzo 1.1.0, the 1.1.0 release notes, the OAI index of schema iterations, and the `v1.2-dev` branch.

## Version numbers

`major.minor` designates the feature set; `.patch` versions fix or clarify the text, and tooling SHOULD NOT distinguish them (§ 5.1).

| Version | Date (revision history) |
| ------- | ----------------------- |
| 1.1.0   | 2026-05-17              |
| 1.0.1   | 2025-01-16              |
| 1.0.0   | 2024-05-29              |

## What 1.1.0 added

From the 1.1.0 release notes:

- AsyncAPI v3 support: `type: asyncapi` sources, `channelPath`, `action`, `correlationId`, `$message` expressions ([`asyncapi-steps.md`](asyncapi-steps.md)).
- JSONPath and XPath wherever JSON Pointer was supported (Selector Object, Expression Type Object, Payload Replacement `targetSelectorType`).
- Workflow inputs passed as `parameters` on success and failure actions.
- `querystring` parameters, compatible with OpenAPI 3.2.
- `$self` for identity-based referencing.
- Clarified Criterion condition evaluation and a clearer runtime expression ABNF.

To upgrade a 1.0 description, change `arazzo` to `1.1.0` and validate against the 1.1 schema. Adopt the new fields where they help.

## Schemas

| Version | Schema                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------- |
| 1.1.x   | `https://spec.openapis.org/arazzo/1.1/schema/2026-04-15` (`arazzo` pattern `^1\.1\.\d+(-.+)?$`) |
| 1.0.x   | `https://spec.openapis.org/arazzo/1.0/schema/2025-10-15`                                        |

Rules from the index: every schema for a minor release applies to all its patch releases; the latest dated iteration is the most correct and earlier ones are obsolete; schemas do not catch every violation, and the specification text wins when they disagree. Both schemas are JSON Schema Draft 2020-12.

## What a schema cannot check

- `workflowId` uniqueness and `stepId` uniqueness per workflow (§ 5.8.4.1, § 5.8.5.1).
- That `operationId`, `operationPath`, `channelPath` and `workflowId` resolve in the listed sources (§ 5.8.5.1).
- That runtime expressions follow the ABNF and point at existing inputs, outputs and components (§ 5.9).
- That step output references are satisfied by order or `dependsOn` (§ 5.8.5.2).
- That `goto` and `retry` targets exist, and `stepId` targets are in the same workflow (§ 5.8.7.1, § 5.8.8.1).
- That parameters match the target operation's parameters, and that `querystring` is not mixed with `query` (§ 5.8.6).

## The 1.2 development line

- **Pin:** `src/arazzo.md` on the `v1.2-dev` branch, commit 6e08955 (2026-09-30). The text is headed "Version 1.2.0" with revision date "TBD".
- **Contents at the pin:** a `wsdl` source description type (WSDL 1.1 or 2.0 for SOAP services), a step `operationName` field that names a WSDL operation, and the rule that tools resolve the HTTP method and endpoint from the WSDL binding.
- **Draft posture: track.** Do not emit `arazzo: 1.2.0`, `type: wsdl` or `operationName`; no 1.2 schema is published on the index. Re-pin when 1.2.0 is released.
