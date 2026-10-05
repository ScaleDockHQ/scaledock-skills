# Versions and upgrades

Read this when choosing the `overlay` value, reading an overlay written for an older line, upgrading one, validating one, or asking what comes after 1.2. Sources: Overlay 1.2.0, 1.1.0 and 1.0.0, the GitHub release notes for 1.1.0 and 1.2.0, the OAI upgrade guides for 1.0 to 1.1 and 1.1 to 1.2, the OAI index of schema iterations, and the Overlay milestones, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line        | Status    | Revision           | Posture | Summary                                                                                                    |
| ----- | ----------- | --------- | ------------------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| `1.2` | Overlay 1.2 | current   | 1.2.0 (2026-09-22) |         | The default target: reusable actions, `$self`, no fragments in `extends`. Its schema is not yet published. |
| `1.1` | Overlay 1.1 | supported | 1.1.0 (2026-01-14) |         | `copy`, primitive updates and RFC 9535 compliance. Use for applying tools that cannot read 1.2.            |
| `1.0` | Overlay 1.0 | legacy    | 1.0.0 (2024-10-17) |         | First release: `update` and `remove` on objects and arrays only. Read and upgrade from only.               |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. There is no preview line ([Preview](#preview)).

The 1.1.0 text dates the release 2026-01-14; the GitHub release was published on 2026-01-16.

## Which version to use

- Default to Overlay 1.2, `overlay: 1.2.0`. `major.minor` designates the feature set; `patch` versions fix or clarify the text and SHOULD NOT be considered by tooling (§ 4.1). The specification advises checking what each tool supports (§ 4.1).
- Target Overlay 1.1 only for an applying tool that cannot read 1.2. Then use no `$self`, `components` or Reusable Action Reference Objects.
- Treat an Overlay 1.0 document as input to an upgrade; never write a new one.
- Cite sections from the version the overlay declares: the objects are under § 4.4 in 1.0.0 and 1.1.0, and under § 4.5 in 1.2.0.
- Pick the schema from the `overlay` field. Each schema rejects other minors by its `overlay` pattern.

### Schema for each line

| Version | Schema                                                                                                                                    | State                                                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1.2.x   | `https://raw.githubusercontent.com/OAI/Overlay-Specification/5f387a745a5d275ff07c58fd040ced3142e74580/src/schemas/validation/schema.yaml` | Not published. The `$id` is `https://spec.openapis.org/overlay/1.2/schema/WORK-IN-PROGRESS`; `overlay` pattern `^1\.2\.\d+$`. |
| 1.1.x   | `https://spec.openapis.org/overlay/1.1/schema/2026-04-01`                                                                                 | Published iteration; `overlay` pattern `^1\.1\.\d+$`                                                                          |
| 1.0.x   | `https://spec.openapis.org/overlay/1.0/schema/2026-04-01`                                                                                 | Published iteration; use it only to check the input of an upgrade                                                             |

The OAI index lists schema iterations for 1.1 and 1.0 only. The pull request that publishes 1.2 iterations on spec.openapis.org (pull request 141) was still open when checked, and the URL it proposes did not resolve. Until it merges:

- Validate 1.2 overlays against the work-in-progress schema at the pinned commit, and say in the result that the schema is unpublished.
- When refreshing this skill, check the index for a `1.2/schema/YYYY-MM-DD` entry; once it exists, pin it and drop the work-in-progress source.

All three schemas are JSON Schema Draft 2020-12. A schema checks shape only. It does not check that targets are valid RFC 9535, that they select anything, or that the result is a valid OpenAPI document. Check those by applying the overlay ([`safety.md`](safety.md)).

## What changed

### Overlay 1.2

From the 1.2.0 release notes and the 1.2.0 text:

| Feature                                     | 1.1.0                                                         | 1.2.0                                             |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| Overlay Object fields                       | `overlay`, `info`, `extends`, `actions` (§ 4.4.1)             | adds `$self`, `components` (§ 4.5.1)              |
| Action Object                               | `target`, `description`, `update`, `copy`, `remove` (§ 4.4.3) | unchanged (§ 4.5.4)                               |
| `actions` items                             | Action Object                                                 | Action Object or Reusable Action Reference Object |
| Reusable actions                            | none                                                          | `components.actions` (§ 4.5.3, § 4.5.5, § 4.5.6)  |
| Fragments in `extends`                      | not prohibited                                                | MUST NOT be used (§ 4.4.2)                        |
| Matching `extends` to the target's `$self`  | not specified                                                 | SHOULD match (§ 4.3)                              |
| Extensions, file naming, RFC 9535, comments | § 4.6 to § 4.9                                                | § 4.7 to § 4.10                                   |

### Overlay 1.1

From the 1.1.0 release notes and the 1.1.0 text, against 1.0.0:

- A `copy` field on the Action Object copies a single node, selected by JSONPath, into the target nodes; `remove: true` overrides it (1.1.0 § 4.4.3.1, examples § 4.5.6).
- `update` can select primitive nodes, which it replaces. 1.0.0 required the target to select objects or arrays, so a primitive was changed by updating its parent object (1.1.0 § 4.4.3.1, 1.0.0 § 4.4.3.1).
- An array `update` value is concatenated with each selected array, and an object or primitive value is appended. 1.0.0 said the value is "an entry to append" (1.1.0 § 4.4.3.1, 1.0.0 § 4.4.3.1).
- The merge rules are spelled out: primitives replace, arrays concatenate, objects merge recursively, and other combinations are errors. A target that selects nothing succeeds without change, and several selected nodes MUST all be the same kind (1.1.0 § 4.4.3.1).
- `target` is an RFC 9535 JSONPath query; tools MUST implement RFC 9535 fully, and interoperable overlays MUST NOT use tool-specific JSONPath extensions (1.1.0 § 4.4.3.1, § 4.8).
- `description` on the Info Object (1.1.0 § 4.4.2.1).
- The `purpose.overlay.yaml` file naming convention (1.1.0 § 4.7) and a note that applying an overlay may lose comments in YAML or JSONC (1.1.0 § 4.9).
- Implementations MUST support JSON and YAML overlays on JSON and YAML descriptions, and YAML follows the constraints of RFC 9512 § 3.4 (1.1.0 § 4.2, § 4.2.1).

### Overlay 1.0

The first release. An Overlay Object with `overlay`, `info`, `extends` and `actions` (1.0.0 § 4.4.1), an Info Object with `title` and `version` (§ 4.4.2), and Action Objects with `target`, `description`, `update` and `remove` (§ 4.4.3).

## Upgrading

Keep the result unchanged during every upgrade: apply the old and the upgraded overlay to the same target and diff the results. An upgraded overlay that validates but produces a different document is a regression.

### 1.0 to 1.1

From the OAI upgrade guide, with the 1.1.0 sections.

1. Change `overlay: 1.0.0` to `overlay: 1.1.0`.
2. Rewrite targets that rely on JSONPath outside RFC 9535 (§ 4.8). The guide's examples: select extension names with brackets, `@['x-oai-traits']` rather than `@.x-oai-traits`, and replace the undefined `in` operator with a filter, `@.tags[?(@ == 'Enterprise-Only')]`.
3. Check every `update` whose target is an array and whose value is an array: 1.0.0 defined the value as one entry to append, while 1.1.0 concatenates an array value (§ 4.4.3.1). Tools that implemented 1.0 may differ here. Wrap the value in another array if the old result is wanted.
4. Optionally simplify actions that updated a parent object only to change a primitive: target the primitive directly (§ 4.4.3.1).
5. Optionally add `info.description` (§ 4.4.2.1), replace duplicated definitions with `copy` (§ 4.4.3.1), and rename the file to `purpose.overlay.yaml` (§ 4.7).
6. Validate against the 1.1 schema, apply the overlay with an RFC 9535 tool, and diff the result against the 1.0 result.

### 1.1 to 1.2

From the OAI upgrade guide.

1. Change `overlay: 1.1.0` to `overlay: 1.2.0`.
2. Remove any fragment from `extends`. `extends` identifies the whole target document (§ 4.4.2).
3. Add `$self` when the overlay uses relative references and may be loaded from different locations; relative `extends` values resolve against it.
4. If the target OpenAPI description has `$self`, set `extends` to that URI (§ 4.3).
5. Optionally move repeated action fields into `components.actions`. Existing one-off actions stay valid; keep simple overlays simple.
6. Validate against the 1.2 schema at the pinned commit, apply the overlay, and diff the result against the 1.1 result.

### 1.0 to 1.2

Run the two upgrades above in order: 1.0 to 1.1, then 1.1 to 1.2, diffing the result after each.

## Preview

No preview line is listed. The `OAI/Overlay-Specification` repository has no development branch for a version after 1.2 (its branches are `main`, `dev`, `v1.2-dev` and a patch branch), and the `dev` branch's `versions/` folder holds only the 1.0.0 and 1.1.0 texts. The "Release 1.3" milestone holds three open issues and no specification text: dynamic node creation, string interpolation for update values, and environment variables in the definition. A "Release 2.0" milestone also exists, with three issues open, and no text. Draft posture for both: **track**.

Do not rely on any of them; express such needs with several ordinary actions or with a pre-processing step outside the overlay. When a `v1.3-dev` branch with specification text appears, list it as `1.3-preview` with posture track, and add its source.
