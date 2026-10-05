---
name: openapi
description: "OpenAPI 3.0 to 3.2: write, validate and upgrade API descriptions (OpenAPI Specification 3.2.1 current, 3.1 and 3.0 supported, Swagger 2.0 upgraded from, 3.3 preview tracked). Use when creating or reviewing an openapi.yaml or openapi.json, picking the openapi version, upgrading from Swagger 2.0, OpenAPI 3.0 or 3.1 to 3.2, describing security (securitySchemes, OAuth 2.0 flows including the device authorization flow, oauth2MetadataUrl, security requirements), adding nested tags, the QUERY method, additionalOperations, querystring parameters, server-sent events and other streaming media types with itemSchema, or $self, naming x- extensions from the OAI Extension and Namespace registries, validating against the official OAS JSON Schemas, or tracking the OpenAPI 3.3 development line and the Security Profiles proposal. Triggers: OpenAPI, OAS, Swagger, openapi: 3.2.0, swagger: 2.0, operationId, securitySchemes, x-oai-, spec.openapis.org."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.1"
  kind: standard
---

# OpenAPI Specification

The OpenAPI Specification (OAS), published by the OpenAPI Initiative (OAI), defines a language-agnostic description of HTTP APIs (§ 2). With this skill the agent writes, reviews, upgrades and validates OpenAPI Descriptions (OADs) for 3.2, keeps them readable by 3.1 or 3.0 tooling when needed, upgrades Swagger 2.0 documents, and names extensions without colliding with anyone else.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Section numbers are those of OAS 3.2.1 unless a rule says otherwise; on another target, cite that version's sections, which [`references/versions.md`](references/versions.md) maps. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: author (writes or generates the OAD), consumer (reads it: client generator, gateway, docs, agent), or reviewer.
- Target version: OpenAPI 3.2 (current, default). OpenAPI 3.1 and OpenAPI 3.0 are supported: use them only for a named consumer that cannot read the newer line. Swagger 2.0 is legacy: read it and upgrade from it, never author it. OpenAPI 3.3 is a preview (posture: track): never emit it. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check [spec.openapis.org/oas](https://spec.openapis.org/oas/) for a newer version or schema iteration, check the `v3.3-dev` branch and the Security Profiles discussion for movement, and update the pins.

## Invariants

These cite OAS 3.2.1. Most hold in 3.1 and 3.0 under other section numbers; the exceptions (for example `paths` is REQUIRED in 3.0, and `querystring` and `$self` are 3.2 only) are in [`references/versions.md`](references/versions.md).

1. **`openapi` names the specification version.** It is REQUIRED and tooling interprets the document by it (§ 4.1.1). Tooling SHOULD NOT distinguish patch versions, so 3.2.0 and 3.2.1 mean the same feature set (§ 2.1).
2. **A document has `info` and at least one of `paths`, `webhooks` or `components`** (§ 4.1.1).
3. **`operationId` is unique among all operations in the API** and case-sensitive (§ 4.10.1).
4. **Every path template expression has a matching path parameter**, defined on the Path Item or on each of its operations (§ 4.8.2), and templated paths that differ only in parameter names MUST NOT both exist (§ 4.8.1).
5. **A parameter has either `schema` or `content`, never both** (§ 4.12.2), is unique by `name` plus `in` (§ 4.10.1), and an `in: querystring` parameter never sits next to `in: query` parameters (§ 4.12.1).
6. **Component keys match `^[a-zA-Z0-9\.\-_]+$`** (§ 4.7.1).
7. **Security requirements mean OR across the array and AND within one object.** Each name is a declared scheme or a scheme URI; `{}` allows anonymous access; an operation's `security: []` removes the top-level requirement (§ 4.30, § 4.10.1).
8. **Extensions start with `x-`, and `x-oai-` and `x-oas-` are reserved for the OAI** (§ 5).
9. **A Reference Object carries only `$ref`, `summary` and `description`**; other properties are ignored (§ 4.23.1).
10. **When a document sets `$self`, references to it use that URI** (§ 4.1.1).

## Workflow

1. **Pick the version and schema.** Default to 3.2 at the latest patch; drop to 3.1 or 3.0 only for a named consumer that cannot read the newer line. A `swagger: "2.0"` input goes to step 5.
   -> [`references/versions.md`](references/versions.md)
   ✓ `openapi` is set to a current or supported line, and you know which official schema validates the document.
2. **Lay out the document.** Write `info`, `servers`, `paths` with one Operation Object per method, `components` for reuse, and `tags`. Give every operation an `operationId`, because Arazzo steps and Overlay targets join on it.
   -> [`references/objects.md`](references/objects.md)
   ✓ Invariants 2 to 6 and 9 hold.
3. **Describe security.** Declare schemes under `components.securitySchemes`, set the root `security` default, and override per operation. Use the 3.2 fields for device authorization, server metadata and deprecation; on a 3.1 target use the registered `x-oai-*` fallbacks.
   -> [`references/security.md`](references/security.md)
   ✓ Every requirement name resolves, every OAuth scope used is declared on its flow, and public operations say so explicitly.
4. **Name extensions.** Reuse a registered extension when one fits its documented purpose; otherwise use your own registered or registrable namespace prefix.
   -> [`references/registries.md`](references/registries.md)
   ✓ No invented `x-oai-` or `x-oas-` names, and no writes into another party's namespace.
5. **Upgrade an existing description** (only when asked, or for a Swagger 2.0 input). Follow the upgrade section for each step from the source line to the target (2.0 to 3.0, 3.0 to 3.1, 3.1 to 3.2), validating after each.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded document validates against the target schema and still describes the same API.
6. **Validate.** Run the document through the official JSON Schema for its minor version, and fix what it reports. Then check the rules a schema cannot see (invariants 3, 4 and 7).
   -> [`references/validation.md`](references/validation.md)
   ✓ Schema validation passes with the latest iteration for the minor version.
7. **Track 3.3, do not emit it.** Read what the `v3.3-dev` branch and the Security Profiles proposal contain today; record anything you plan around.
   -> [`references/drafts.md`](references/drafts.md)
   ✓ No `openapi: 3.3.x` document, `type: profile` scheme or Path Item `security` field is produced.

## Verify before done

- [ ] The document validates against the official schema for its minor version, latest iteration ([`references/validation.md`](references/validation.md)); use `schema-base` when Schema Objects must be checked too.
- [ ] Every `operationId` is unique (§ 4.10.1) and every path template has its parameter (§ 4.8.2).
- [ ] Every Security Requirement name resolves to a declared scheme or a scheme URI (§ 4.30), and the OAuth scopes listed are among the available scopes of that scheme's flows (§ 4.29.1, § 4.30.1).
- [ ] Operations that need no authentication say so with `security: []` or an `{}` entry, rather than by omission (§ 4.10.1).
- [ ] Every extension is registered for the object it sits on, or lives under your own namespace (§ 5, Extension Registry).
- [ ] A 3.1 target uses no 3.2-only field; the `x-oai-*` fallback is used where the registry defines one ([`references/security.md`](references/security.md)). A 3.0 target uses no 3.1 or 3.2 field and keeps 3.0 Schema Objects (`nullable`, boolean `exclusiveMinimum`).
- [ ] No Swagger 2.0 document is written.
- [ ] Nothing from the 3.3 development line is emitted.

## Reference index

- **`references/versions.md`**: every version line from Swagger 2.0 to the 3.3 preview with its status, which one to use, what changed in each, the 2.0 to 3.0, 3.0 to 3.1 and 3.1 to 3.2 upgrades, and the registered fallbacks for 3.2 fields. Load for steps 1 and 5.
- **`references/objects.md`**: document structure, paths, operations, parameters, tags, references and schema dialects, with a minimal 3.2 example. Load for step 2.
- **`references/security.md`**: Security Scheme, OAuth Flows, OAuth Flow and Security Requirement Objects, 3.1 fallbacks, and the security considerations. Load for step 3.
- **`references/registries.md`**: the OAI Extension and Namespace registries, the reserved prefixes, and how to register. Load for step 4.
- **`references/validation.md`**: the official JSON Schemas, `schema` versus `schema-base`, iteration rules, and what a schema cannot check. Load for step 6.
- **`references/drafts.md`**: the 3.3 development line and the Security Profiles proposal, with draft posture. Load for step 7.

## Related skills

- `openapi-overlay` to change an OAD repeatably without editing it: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi-overlay`.
- `openapi-arazzo` to describe multi-step workflows over OpenAPI operations: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi-arazzo`.
- `typespec` to design an API in TypeSpec and emit the OAD from it: `npx skills add ScaleDockHQ/scaledock-skills --skill typespec`.
- `asyncapi` for event-driven and message-based APIs: `npx skills add ScaleDockHQ/scaledock-skills --skill asyncapi`.
- `json-schema` for writing and reviewing the JSON Schema dialects that Schema Objects use: `npx skills add ScaleDockHQ/scaledock-skills --skill json-schema`.
- `http-semantics` for the methods, status codes, conditional requests and caching behind each operation: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenAPI Specification v3.2.1](https://spec.openapis.org/oas/v3.2.1.html): Released, 3.2.1 (2026-09-10), checked 2026-10-02.
- [OAS 3.2.0 release notes](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.2.0): Released, 3.2.0 (2025-09-19), checked 2026-10-02.
- [OpenAPI Specification v3.1.2](https://spec.openapis.org/oas/v3.1.2.html): Released, 3.1.2 (2025-09-19), checked 2026-10-05.
- [OpenAPI Specification v3.0.4](https://spec.openapis.org/oas/v3.0.4.html): Released, 3.0.4 (2024-10-24), checked 2026-10-05.
- [OpenAPI Specification v2.0](https://spec.openapis.org/oas/v2.0.html): Released (Swagger 2.0, superseded), 2.0 (2014-09-08), checked 2026-10-05.
- [Upgrading from OpenAPI 3.1 to 3.2](https://learn.openapis.org/upgrading/v3.1-to-v3.2.html): OAI guide (non-normative), page as published, checked 2026-10-02.
- [Upgrading from OpenAPI 3.0 to 3.1](https://learn.openapis.org/upgrading/v3.0-to-v3.1.html): OAI guide (non-normative), page as published, checked 2026-10-05.
- [OpenAPI Specification versions and schema iterations](https://spec.openapis.org/oas/): OAI index, latest v3.2.1, checked 2026-10-05.
- [OAS 3.2 JSON Schema](https://spec.openapis.org/oas/3.2/schema/2026-08-30): Published schema, iteration 2026-08-30, checked 2026-10-02.
- [OAS 3.2 JSON Schema with Schema Object validation](https://spec.openapis.org/oas/3.2/schema-base/2026-08-30): Published schema, iteration 2026-08-30, checked 2026-10-02.
- [OAS 3.1 JSON Schema](https://spec.openapis.org/oas/3.1/schema/2026-08-03): Published schema, iteration 2026-08-03, checked 2026-10-02.
- [OAS 3.1 JSON Schema with Schema Object validation](https://spec.openapis.org/oas/3.1/schema-base/2026-08-03): Published schema, iteration 2026-08-03, checked 2026-10-02.
- [OAS 3.0 JSON Schema](https://spec.openapis.org/oas/3.0/schema/2024-10-18): Published schema, iteration 2024-10-18, checked 2026-10-05.
- [OAS 2.0 JSON Schema](https://spec.openapis.org/oas/2.0/schema/2017-08-27): Published schema, iteration 2017-08-27, checked 2026-10-05.
- [OAS `v3.3-dev` branch text](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/aa2f6c0975ef85e24fd05ab2d7b8b57b04f108c4/src/oas.md): In development, commit aa2f6c0 (2026-09-24), checked 2026-10-05. Draft posture: track.
- [Proposal: Supporting Loose-Coupling in Security Schemes and Security Requirements Objects (Security Profiles)](https://github.com/OAI/sig-security/discussions/50): Proposal under discussion (moved from OpenAPI-Specification discussion #5304), expanded design notes 2026-05-05, checked 2026-10-02. Draft posture: track.
- [OpenAPI Initiative newsletter, June 2026](https://www.openapis.org/blog/2026/06/09/openapi-initiative-newsletter-june-2026): OAI announcement, 2026-06-09, checked 2026-10-02.
- [OAI registries](https://spec.openapis.org/registry/): Living registries, as published, checked 2026-10-02.
- [Extension Registry](https://spec.openapis.org/registry/extension/): Living registry, as published, checked 2026-10-02.
- [Namespace Registry](https://spec.openapis.org/registry/namespace/): Living registry, as published, checked 2026-10-02.
- [Registry contribution guide](https://raw.githubusercontent.com/OAI/spec.openapis.org/main/CONTRIBUTING.md): OAI repository guide, main branch, checked 2026-10-02.
