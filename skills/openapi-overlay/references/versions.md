# Versions, upgrades and schemas

Read this when choosing the `overlay` value, upgrading an overlay, or validating one. Sources: Overlay 1.2.0 and 1.1.0, the GitHub release notes, the OAI upgrade guide, the OAI index of schema iterations, and the Overlay milestones.

## Version numbers

`major.minor` designates the feature set; `patch` versions fix or clarify the text and SHOULD NOT be considered by tooling (§ 4.1). The specification notes that tool support varies and advises checking what each tool supports (§ 4.1).

| Version | Release                        | What it added (release notes)                                                                                                                                       |
| ------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.2.0   | 2026-09-22                     | Reusable actions (`components.actions` and reusable action references); `$self`; clearer `extends` and base URI rules; no fragments in document-identifying fields. |
| 1.1.0   | 2026-01-14 (tagged 2026-01-16) | `copy` action; `description` on Info; better update and delete of primitive values; RFC 9535 compliance; file naming convention.                                    |
| 1.0.0   | 2024-10-17                     | First release.                                                                                                                                                      |

## 1.1 and 1.2 side by side

| Feature                                     | 1.1.0                                                         | 1.2.0                                             |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| Overlay Object fields                       | `overlay`, `info`, `extends`, `actions` (§ 4.4.1)             | adds `$self`, `components` (§ 4.5.1)              |
| Action Object                               | `target`, `description`, `update`, `copy`, `remove` (§ 4.4.3) | unchanged (§ 4.5.4)                               |
| `actions` items                             | Action Object                                                 | Action Object or Reusable Action Reference Object |
| Fragments in `extends`                      | not prohibited                                                | MUST NOT be used (§ 4.4.2)                        |
| Matching `extends` to the target's `$self`  | not specified                                                 | SHOULD match (§ 4.3)                              |
| Extensions, file naming, RFC 9535, comments | § 4.6 to § 4.9                                                | § 4.7 to § 4.10                                   |

Cite sections from the version the overlay declares.

## Upgrading 1.1 to 1.2

From the OAI upgrade guide:

1. Change `overlay: 1.1.0` to `overlay: 1.2.0`.
2. Remove any fragment from `extends`. `extends` identifies the whole target document.
3. Add `$self` when the overlay uses relative references and may be loaded from different locations; relative `extends` values resolve against it.
4. If the target OpenAPI description has `$self`, set `extends` to that URI.
5. Optionally move repeated action fields into `components.actions`. Existing one-off actions stay valid; keep simple overlays simple.

## Schemas

| Version | Schema                                                                                                                                    | State                                                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1.1.x   | `https://spec.openapis.org/overlay/1.1/schema/2026-04-01`                                                                                 | Published iteration; `overlay` pattern `^1\.1\.\d+$`                                                                          |
| 1.2.x   | `https://raw.githubusercontent.com/OAI/Overlay-Specification/5f387a745a5d275ff07c58fd040ced3142e74580/src/schemas/validation/schema.yaml` | Not published. The `$id` is `https://spec.openapis.org/overlay/1.2/schema/WORK-IN-PROGRESS`; `overlay` pattern `^1\.2\.\d+$`. |

The OAI index lists schema iterations for 1.1 and 1.0 only. The pull request that publishes 1.2 iterations on spec.openapis.org (pull request 141) was still open when checked, and the URL it proposes did not resolve. Until it merges:

- Validate 1.2 overlays against the work-in-progress schema at the pinned commit, and say in the result that the schema is unpublished.
- When refreshing this skill, check the index for a `1.2/schema/YYYY-MM-DD` entry; once it exists, pin it and drop the work-in-progress source.

Both schemas are JSON Schema Draft 2020-12. A 1.1 schema rejects a 1.2 document by its `overlay` pattern, and the reverse, so pick the schema from the `overlay` field.

A schema checks shape only. It does not check that targets are valid RFC 9535, that they select anything, or that the result is a valid OpenAPI document. Check those by applying the overlay ([`safety.md`](safety.md)).

## After 1.2

No development branch for a later version exists. The "Release 1.3" milestone holds three open issues and no specification text: dynamic node creation, string interpolation for update values, and environment variables in the definition. Draft posture: **track**. Do not rely on any of them; express such needs with several ordinary actions or with a pre-processing step outside the overlay.
