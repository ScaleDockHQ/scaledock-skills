---
name: openapi-overlay
description: "OpenAPI Overlay 1.2: describe repeatable changes to OpenAPI documents as ordered JSONPath actions (update, copy, remove, reusable actions), kept separate from the source document. Use when writing, applying or reviewing an overlay file, adding vendor extensions, descriptions or examples to a generated OpenAPI description without editing it, removing internal operations before publishing to partners, renaming or moving paths, sharing one change across many operations with components.actions, upgrading an overlay from 1.0 or 1.1 to 1.2, validating against the official Overlay JSON Schema, or checking RFC 9535 JSONPath targets. Triggers: OpenAPI Overlay, overlay.yaml, overlay: 1.2.0, extends, actions, target, update, remove, copy, $ref components/actions, x-oai-traits."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenAPI Overlay Specification

The Overlay Specification, published by the OpenAPI Initiative (OAI), defines a JSON or YAML document of ordered actions that change an existing OpenAPI description while staying separate from its source documents (§ 2, § 3.1). Each action selects nodes with an RFC 9535 JSONPath query. With this skill the agent writes, applies, upgrades and reviews Overlay documents.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Section numbers are those of Overlay 1.2.0 unless a rule says otherwise. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: author (writes the overlay), applier (a tool or pipeline step that applies it), or reviewer.
- Target: the OpenAPI description the overlay applies to, and its `$self` if it has one.
- Version: Overlay 1.2 (default) or 1.1, when the applying tool does not support 1.2 yet.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check [spec.openapis.org/overlay](https://spec.openapis.org/overlay/) for a newer version and for a published 1.2 schema iteration, and update the pins.

## Invariants

1. **`overlay`, `info` and `actions` are REQUIRED**, and `actions` holds at least one entry (§ 4.5.1.1). `info` needs `title` and `version` (§ 4.5.2.1).
2. **Actions apply in order, each to the result of the previous one** (§ 4.5.1.1).
3. **`target` is an RFC 9535 JSONPath query.** Interoperable overlays MUST NOT use tool-specific JSONPath extensions, and tools MUST implement RFC 9535 fully (§ 4.5.4.1, § 4.9).
4. **`update` matches the kind of node selected**: an object merges into objects, an array concatenates to arrays (an object or primitive appends), a primitive replaces primitives (§ 4.5.4.1). Several selected nodes MUST all be the same kind (§ 4.5.4.1).
5. **Merging is recursive**: primitives replace, arrays concatenate, objects merge, and any other combination is an error (§ 4.5.4.1).
6. **`remove: true` wins**: `update` and `copy` have no effect when `remove` is `true`; `copy` selects a single node (§ 4.5.4.1).
7. **A target that selects nothing succeeds without changing anything** (§ 4.5.4.1). Verify match counts yourself.
8. **`$self` and `extends` identify whole documents and MUST NOT contain fragments** (§ 4.4.2). When the target defines `$self`, `extends` SHOULD match it (§ 4.3).
9. **A reusable action's `fields` never contains `target`**; the Reusable Action Reference Object supplies it, and its `$ref` points under `#/components/actions/` with RFC 6901 escaping (§ 4.5.5.1, § 4.5.6.1, § 4.5.3.1).
10. **Extensions start with `x-`; `x-oai-` and `x-oas-` are reserved for the OAI** (§ 4.7).

## Workflow

1. **Decide whether an overlay is the right tool.** Use one when the change must be re-applied to a document you do not edit by hand, such as a generated or third-party description (§ 2).
   ✓ The source of truth for each change is clear: the source document or the overlay, not both.
2. **Choose the version and target.** Default to 1.2; use 1.1 only for a tool that cannot apply 1.2. Set `extends` to the target's `$self`, or to its URI.
   -> [`references/versions.md`](references/versions.md)
   ✓ `overlay` is set, and `extends` has no fragment.
3. **Write the actions.** Prefer targets by stable keys (path names, `operationId`, parameter `name` plus `in`) over array indexes, which shift when items are removed (§ 4.6.4).
   -> [`references/objects.md`](references/objects.md), [`references/examples.md`](references/examples.md)
   ✓ Each action has one purpose and a `description`; invariants 3 to 6 hold.
4. **Factor repeated changes into reusable actions** (1.2 only) when several targets need the same `update`, `copy` or `remove`.
   -> [`references/objects.md`](references/objects.md)
   ✓ Every `components.actions` entry is referenced at least once, and keys are escaped in `$ref`.
5. **Apply and inspect.** Apply the overlay with a tool that implements RFC 9535, diff the result against the input, and confirm every action selected the nodes you meant.
   -> [`references/safety.md`](references/safety.md)
   ✓ No action matched zero nodes unexpectedly; no security requirement, scheme or operation was removed unless intended.
6. **Validate.** Validate the overlay against the Overlay schema for its version, then validate the resulting OpenAPI document against the OAS schema for its version.
   -> [`references/versions.md`](references/versions.md)
   ✓ Both validations pass.

## Verify before done

- [ ] The overlay validates against its schema: the published 1.1 schema iteration, or for 1.2 the work-in-progress schema at the pinned commit until a 1.2 iteration is published ([`references/versions.md`](references/versions.md)).
- [ ] Every `target` is plain RFC 9535 JSONPath with no tool-specific syntax (§ 4.9).
- [ ] Every action selected at least one node on the current target document, unless a no-op is intended (§ 4.5.4.1).
- [ ] `extends` and `$self` have no fragment (§ 4.4.2), and `extends` matches the target's `$self` when it has one (§ 4.3).
- [ ] The result validates against the OpenAPI schema and still contains every security requirement and scheme it should.
- [ ] The file follows `purpose.overlay.yaml` naming, or a documented local convention (§ 4.8).

## Reference index

- **`references/objects.md`**: every Overlay object and field, the merge rules, and JSONPath notes. Load for steps 3 and 4.
- **`references/examples.md`**: common recipes in YAML (add extensions, remove internal operations, add a parameter everywhere, move a path, reusable error responses, traits). Load for step 3.
- **`references/versions.md`**: 1.0, 1.1 and 1.2 differences, upgrading to 1.2, the schemas, and the 1.3 milestone. Load for steps 2 and 6.
- **`references/safety.md`**: what can go wrong when applying overlays, and the checks that catch it. Load for step 5.

## Related skills

- `openapi` for the OpenAPI descriptions an overlay changes: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`.
- `openapi-arazzo` for workflows that run against the resulting description: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi-arazzo`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Overlay Specification v1.2.0](https://spec.openapis.org/overlay/v1.2.0.html): Released, 1.2.0 (2026-09-22), checked 2026-10-02.
- [Overlay 1.2.0 release](https://github.com/OAI/Overlay-Specification/releases/tag/1.2.0): Released, 1.2.0, checked 2026-10-02.
- [Overlay Specification v1.1.0](https://spec.openapis.org/overlay/v1.1.0.html): Released, 1.1.0 (2026-01-14), checked 2026-10-02.
- [Overlay versions and schema iterations](https://spec.openapis.org/overlay/): OAI index, latest v1.2.0, checked 2026-10-02.
- [Overlay 1.1 JSON Schema](https://spec.openapis.org/overlay/1.1/schema/2026-04-01): Published schema, iteration 2026-04-01, checked 2026-10-02.
- [Overlay 1.2 JSON Schema, work in progress](https://raw.githubusercontent.com/OAI/Overlay-Specification/5f387a745a5d275ff07c58fd040ced3142e74580/src/schemas/validation/schema.yaml): Unpublished work-in-progress schema on the `v1.2-dev` branch, commit 5f387a7 (2026-09-22), checked 2026-10-02.
- [Publish Overlay schema iterations (spec.openapis.org pull request 141)](https://github.com/OAI/spec.openapis.org/pull/141): Open pull request, state on 2026-09-29, checked 2026-10-02.
- [Overlay: upgrading between versions 1.1 and 1.2](https://learn.openapis.org/upgrading/overlay-v1.1-to-v1.2.html): OAI guide (non-normative), page as published, checked 2026-10-02.
- [Overlay Specification milestones](https://github.com/OAI/Overlay-Specification/milestones): Planning (Release 1.3 has three open issues and no specification text), as listed, checked 2026-10-02. Draft posture: track.
- [RFC 9535: JSONPath: Query Expressions for JSON](https://www.rfc-editor.org/rfc/rfc9535): RFC (Proposed Standard), RFC 9535, checked 2026-10-02.
