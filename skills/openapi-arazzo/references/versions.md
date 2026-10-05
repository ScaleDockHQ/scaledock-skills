# Versions and upgrades

Read this when choosing the `arazzo` value, reading a 1.0 description, upgrading, or deciding whether to use the 1.2 draft. Sources: the Arazzo 1.1.0 and 1.0.1 texts, the 1.1.0 and 1.0.1 release notes, the OAI index of versions and schema iterations, and `src/arazzo.md` on the `v1.2-dev` branch, listed in [Sources](../SKILL.md#sources). Section numbers are those of Arazzo 1.1.0 unless stated otherwise. Schemas and the checks a schema cannot make are in [`validation.md`](validation.md).

## Version lines

| Id            | Line       | Status    | Revision                    | Posture | Summary                                                                      |
| ------------- | ---------- | --------- | --------------------------- | ------- | ---------------------------------------------------------------------------- |
| `1.2-preview` | Arazzo 1.2 | preview   | commit 6e08955 (2026-09-30) | track   | Adds WSDL source descriptions and the step `operationName` field for SOAP.   |
| `1.1`         | Arazzo 1.1 | current   | 1.1.0 (2026-05-17)          |         | The default target. Adds AsyncAPI steps, JSONPath and XPath, and `$self`.    |
| `1.0`         | Arazzo 1.0 | supported | 1.0.1 (2025-01-16)          |         | The first release. OpenAPI and Arazzo sources only; still valid when needed. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

`major.minor` designates the feature set; `.patch` versions fix or clarify the text, and tooling SHOULD NOT distinguish them (§ 5.1). The revision history lists 1.0.0 (2024-05-29), 1.0.1 (2025-01-16) and 1.1.0 (2026-05-17) (Appendix A).

## Which version to use

- Default to `arazzo: 1.1.0`.
- Write `arazzo: 1.0.1` only for a named tool that cannot read 1.1, and then use no 1.1 feature listed below. Tooling MUST interpret the document by its `arazzo` value (§ 5.8.1.1).
- Read a 1.0 description as it is; upgrade it only when asked.
- Never emit 1.2 fields or `arazzo: 1.2.0` while its posture is track.

## What changed

### Arazzo 1.2 (draft)

From the `v1.2-dev` text at commit 6e08955, headed "Version 1.2.0" with revision date "TBD" (1.2 draft, Appendix A):

- A `wsdl` Source Description `type`, whose `url` MUST point to a WSDL 1.1 or WSDL 2.0 document (1.2 draft, Source Description Object).
- A step `operationName` field naming a `wsdl:operation`, mutually exclusive with `operationId`, `operationPath`, `channelPath` and `workflowId`; `operationId` and `operationPath` MUST NOT reference a `wsdl` source (1.2 draft, Step Object).
- Tools resolve the HTTP method and endpoint from the WSDL binding, and the draft gives SOAP 1.1 and 1.2 guidance on `SOAPAction`, content type, envelopes and faults (1.2 draft, Authoring Steps for WSDL Source Descriptions).
- `$sourceDescriptions.<name>.<reference>` matches `wsdl:operation` names for WSDL sources (1.2 draft, Runtime Expressions).

### Arazzo 1.1

From the 1.1.0 release notes and text:

- AsyncAPI v3 support: `type: asyncapi` sources (§ 5.8.3), and steps with `channelPath`, `action`, `correlationId` and `timeout` (§ 5.8.5.1), with asynchronous success rules (§ 5.8.5.3) and `$message` expressions (§ 5.9). See [`asyncapi-steps.md`](asyncapi-steps.md).
- JSONPath and XPath wherever JSON Pointer was supported: the Selector Object (§ 5.8.13), the Expression Type Object (§ 5.8.12, renamed from the 1.0 Criterion Expression Type Object), and Payload Replacement `targetSelectorType` (§ 5.8.15).
- `parameters` on Success and Failure Action Objects that reference a `workflowId`, mapped to that workflow's inputs (§ 5.8.6, § 5.8.7, § 5.8.8).
- A `querystring` Parameter `in` value, compatible with OpenAPI 3.2 (§ 5.8.6).
- A root `$self` field for identity-based referencing (§ 5.8.1.1, § 5.5.2).
- `dependsOn` guidance for ordering asynchronous work (§ 5.8.5.2).
- Clarified Criterion condition evaluation (§ 5.8.11.4) and a clearer runtime expression ABNF (§ 5.9).

### Arazzo 1.0

From the 1.0.1 release notes: 1.0.1 is a patch of 1.0.0 that removed `body` from the Parameter `in` values (leaving `path`, `query`, `header` and `cookie`), removed `$message` from the 1.0 expression syntax, clarified `workflowId` in success and failure actions, moved header and content guidance to RFC 9110, and fixed examples. A JSON Schema for 1.0 was published with it.

## Upgrading

### 1.0 to 1.1

1. Change `arazzo` to `1.1.0` (§ 5.8.1.1).
2. Replace removed or renamed fields: the 1.1.0 release notes list no removed fields. A Criterion `type` given as an object is now an Expression Type Object (§ 5.8.12); check it against that object's fields.
3. Validate against the 1.1 schema, iteration 2026-04-15 ([`validation.md`](validation.md)).
4. Keep behaviour unchanged. Adopt `$self`, AsyncAPI steps, JSONPath selectors, `querystring` or action `parameters` only as separate, deliberate changes.

### 1.1 to 1.0 (downgrade for a named tool)

1. Change `arazzo` to `1.0.1`.
2. Remove `$self`, `type: asyncapi` sources and every step that uses `channelPath`, `action`, `correlationId` or `timeout`; 1.0 has no equivalent, so stop if the workflow needs them.
3. Replace `querystring` parameters, action `parameters`, Selector Objects and JSONPath `targetSelectorType` with 1.0 constructs (JSON Pointer or XPath targets).
4. Validate against the 1.0 schema, iteration 2025-10-15, and confirm each workflow still runs the same steps with the same data.

## Preview: Arazzo 1.2

- **Pin:** `src/arazzo.md` on the `v1.2-dev` branch, commit 6e08955 (2026-09-30), the head of that branch on 2026-10-05.
- **Contents:** the WSDL and SOAP additions listed under [What changed](#arazzo-12-draft).
- **Posture: track.** Do not emit `arazzo: 1.2.0`, `type: wsdl` or `operationName`. No 1.2 schema is published on the index.
- **When 1.2.0 ships:** make `1.2` current and `1.1` supported, add a 1.1 to 1.2 upgrade section, pin the release text and its schema iteration, and update the description and READMEs.
