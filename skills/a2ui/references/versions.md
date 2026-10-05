# Versions and upgrades

Read this when choosing which A2UI version to emit or render, reading messages written for an older version, upgrading an agent, renderer or catalog, or deciding how far to go with the v1.0 release candidate. Sources: the repository README, each `specification/<version>/README.md`, the roadmap, a2ui.org, the protocol documents and the three evolution guides, listed in [Sources](../SKILL.md#sources).

## Version lines

The repository keeps one folder per version under `specification/`: `v0_8`, `v0_9`, `v0_9_1` and `v1_0`. The README says: "A2UI's current production release is **v0.9.1**, a patch release in the stable v0.9 protocol family. The v1.0 specification is a release candidate, while v0.8 is legacy." The roadmap and a2ui.org list the same statuses. There are no proposals with a version folder beyond v1.0.

| Id            | Line      | Status  | Revision                                                           | Posture | Summary                                                                                       |
| ------------- | --------- | ------- | ------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| `1.0-preview` | A2UI v1.0 | preview | Candidate, spec last updated 2026-06-08, schemas at main 3db3b41   | build   | Release candidate: bidirectional function calls, mixable catalogs, `@path`/`@call`, no theme. |
| `0.9`         | A2UI v0.9 | current | v0.9.1 "Current Production", last updated 2025-12-03; accepts v0.9 |         | The default target. Prompt-first schemas; v0.9.1 is a compatible patch of v0.9.               |
| `0.8`         | A2UI v0.8 | legacy  | v0.8.2, closed, protocol doc updated 2025-11-12                    |         | Structured-output-first design with `beginRendering`. Upgrade from it.                        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Why v0.9 and v0.9.1 are one line: the v0.9.1 evolution guide calls it "a minor refinement of the v0.9 specification" and says "v0.9.1 is fully compatible with v0.9 payloads (the version fields in schemas accept both `"v0.9"` and `"v0.9.1"`)" (Evolution Guide v0.9.1 § 1, § 3). The v0.9.1 schemas still use `$id`s under `https://a2ui.org/specification/v0_9/` and the capabilities key `v0.9`.

Why v1.0 is a preview and not current: its README says "This specification is currently a candidate for becoming stable", it will become stable "once a sufficient number of renderers are ported", and "there is a high bar for accepting breaking changes to a candidate specification". It was previously called v0.10. It is still changing: the reserved `@` prefix for `@path` and `@call` landed on 2026-10-02.

## Which version to use

- Default to A2UI v0.9 and write `"version": "v0.9.1"` on every message. A v0.9.1 renderer also accepts `"v0.9"`.
- Posture build for A2UI v1.0: implement it behind a flag, alongside v0.9, and send v1.0 only to a renderer that advertises a `v1.0` capabilities object or the `https://a2ui.org/a2a-extension/a2ui/v1.0` extension. Renderers route each payload by its `version` field to a version-specific handler (Evolution Guide v1.0 § 3, For renderers).
- Treat any A2UI v0.8 message (`beginRendering`, `surfaceUpdate`, `dataModelUpdate`, `userAction`, `literalString`) as input to an upgrade. The v0.8 folder says "This specification is closed."
- Never mix versions inside one surface; in v1.0 all catalogs mixed in a surface must use the same specification version (Protocol v1.0, Mixable catalogs and component resolution logic).

## What changed

### A2UI v0.9 (from v0.8.1)

Evolution Guide v0.9 § 1 to § 8:

- Philosophy changed from "Structured Output First" to "Prompt First": the schema is meant to be embedded in the system prompt (§ 1).
- `beginRendering` was replaced by `createSurface`, which requires `catalogId`, carries `theme` instead of `styles`, and drops the `root` attribute; the tree's root is the component with id `root` (§ 3.1).
- `surfaceUpdate` became `updateComponents`, and components changed from a key wrapper `{"component": {"Text": {...}}}` to a discriminator `{"component": "Text", ...}` (§ 4.1).
- `dataModelUpdate` with a `contents` array of typed key-value entries became `updateDataModel` with a plain JSON `value` (§ 4.2).
- Bound values changed from `{"literalString": "foo"}` to plain literals or `{"path": "/foo"}`; `dataBinding` became `path` (§ 5.1, § 5.2).
- `formatString` with `${...}` interpolation was added, and interpolation works only inside it (§ 5.3).
- `sendDataModel` on `createSurface` added explicit renderer-to-agent data sync (§ 5.4).
- Button `context` changed from a key-value array to a JSON object, and `primary: true` became `variant: "primary"` (§ 6.1, § 6.2).
- TextField `textFieldType` became `variant`, `validationRegexp` gave way to `checks`, and `text` became `value`; `MultipleChoice` became `ChoicePicker`; Slider `minValue`/`maxValue` became `min`/`max` (§ 6.3 to § 6.5).
- The `VALIDATION_FAILED` error format was added (§ 7). The rename table in § 8 also lists `distribution` to `justify`, `alignment` to `align`, Modal `entryPointChild`/`contentChild` to `trigger`/`content`, Tabs `tabItems` to `tabs`, `usageHint` to `variant`, and `userAction` to `action`.

### A2UI v0.9.1 (patch of v0.9)

Evolution Guide v0.9.1 § 2:

- The MIME type is `application/a2ui+json`, replacing the legacy `application/json+a2ui` (§ 2.1).
- `surfaceId` no longer has to be unique for the renderer's lifetime, only among active surfaces; `createSurface` on an existing id without deleting it is still an error (§ 2.2).
- The A2A extension URI is `https://a2ui.org/a2a-extension/a2ui/v0.9.1` (A2A Extension v0.9.1, Extension URI); v0.9 used `https://a2ui.org/a2a-extension/a2ui/v0.9`.

### A2UI v1.0 (release candidate)

Evolution Guide v1.0 § 1 and § 2:

- Bidirectional function calls: `callRendererFunction` and `agentFunctionResponse` from the agent, `callAgentFunction` and `rendererFunctionResponse` from the renderer, with `allowedCallers` (`rendererOnly` by default, `agentOnly`, `rendererOrAgent`) and `returnType` declared in the catalog (§ 1, § 2.1, § 2.4).
- `createSurface` may carry `components` and `dataModel`, `catalogId` becomes an optional surface default, and `theme` (with `primaryColor`) is removed (§ 1, § 2.1).
- Components and function calls may set their own `catalogId`; catalogs are mixable within one surface; resolution is explicit `catalogId`, then the surface default, then an error, with no fallback to capabilities (§ 1, § 2.7).
- Data bindings are `{"@path": ...}` and function calls are `{"@call": ...}`; plain `path` and `call` keys are literal data; unknown single-`@` keys are rejected; a literal leading `@` is escaped by doubling (`"@@type"`) (§ 1).
- `@index` returns the template iteration index, optionally with `offset`, and only inside a collection scope (§ 2.6, § 2.7).
- `updateDataModel.value` is required; `null` deletes the key (§ 2.6).
- `CheckRule.condition` evaluates to a `ValidationResult` (`valid`, `code`, `message`, `severity`), and `CheckRule.message` becomes an optional fallback (§ 1, § 2.6).
- Catalogs gain `protocolVersion`, `instructions`, a function map, `allowedParents`/`allowedChildren`, `requiresUserActivation`, the reserved `Surface` component, UAX #31 identifiers, `deprecated` with `x-deprecated-reason`, and `metadata.extensions` (§ 2.1).
- "Client" is renamed _renderer_ and "server" _agent_, including schema files (`server_to_client.json` to `agent_to_renderer.json`, `client_capabilities.json` to `renderer_capabilities.json`, and so on), and metadata keys become `a2uiRendererCapabilities` and `a2uiRendererDataModel` (§ 2.8; A2A Extension v1.0).
- The A2A extension moved to `specification/v1_0/extensions/a2a/` with URI `https://a2ui.org/a2a-extension/a2ui/v1.0` (§ 2.5).

## Upgrading

### 0.8 to 0.9

1. Replace each `beginRendering` with a `createSurface` sent before the surface's first update, with `surfaceId`, a `catalogId` from the renderer's capabilities, and `styles` moved to `theme`. Make sure the tree's top component has `"id": "root"` (Evolution Guide v0.9 § 3.1).
2. Rename `surfaceUpdate` to `updateComponents` and flatten each component: `{"id": "x", "component": {"Text": {"text": ...}}}` becomes `{"id": "x", "component": "Text", "text": ...}` (§ 4.1).
3. Replace `{"literalString": "Hello"}` and other `literal*` wrappers with plain JSON values, keep `{"path": ...}` bindings, and replace `explicitList` children with an array of ids and `template` children with `{"componentId": ..., "path": ...}` (§ 5.2, § 8).
4. Rewrite each `dataModelUpdate` `contents` array of `key`/`value*` entries as `updateDataModel` with a plain JSON `value` at `path` (§ 4.2).
5. Rewrite Button `action` as `{"event": {"name": ..., "context": {...}}}` with `context` as an object, and apply the component renames in § 6 and § 8.
6. Add `"version": "v0.9.1"` to every message, rename the renderer's `userAction` to `action`, and switch the MIME type to `application/a2ui+json` and the A2A extension URI to `https://a2ui.org/a2a-extension/a2ui/v0.9.1`.
7. Move any formatting that v0.8 did on the agent side into `formatString` or catalog functions only if the catalog defines them; v0.8 had no transformers (Protocol v0.8.2 § 4.2).
8. Validate every message against the v0.9.1 `server_to_client.json` with the catalog mapped in, and check that the rendered UI and the `action` payloads are the same as before.

### 0.9 to 1.0

Only behind the A2UI v1.0 flag (Evolution Guide v1.0 § 3):

1. Set `"version": "v1.0"` and validate against `agent_to_renderer.json` and `renderer_to_agent.json`.
2. Rewrite only `DataBinding` and `FunctionCall` positions: `{"path": "/x"}` becomes `{"@path": "/x"}` and `{"call": "f", ...}` becomes `{"@call": "f", ...}`. Do not find-and-replace: `ChildList` templates (`{"componentId": ..., "path": ...}`), the `updateDataModel` envelope `path`, and data that happens to contain `call` keep their spelling. Escape literal keys that start with `@` by doubling the prefix.
3. Remove `theme` from `createSurface`; optionally inline `components` and `dataModel`; set `catalogId` per component or function call when mixing catalogs.
4. Replace `updateDataModel` messages that omit `value` to delete a key with `"value": null`.
5. Catalog authors: set `"protocolVersion": "1.0"`, turn `functions` into a map keyed by name, remove `$defs/theme`, keep only `anyComponent` and `anyFunction` under `$defs`, give every component a `component` const, declare `returnType` and `allowedCallers` on functions (and `requiresUserActivation` on `openUrl`), make check functions return `ValidationResult`, use relative `common_types.json#/$defs/...` references, and check names against UAX #31. A v0.9 catalog cannot be used directly with v1.0.
6. Renderers: implement catalog resolution, `callRendererFunction` with `allowedCallers` checks and `INVALID_FUNCTION_CALL`, `callAgentFunction` and `agentFunctionResponse`, `@index`, `ValidationResult` checks, and `functionCallId` on errors.
7. Rename capability and data model metadata to `a2uiRendererCapabilities` (with a `v1.0` key) and `a2uiRendererDataModel`, and switch the A2A extension URI to `https://a2ui.org/a2a-extension/a2ui/v1.0`.
8. Keep the v0.9 path working for renderers that do not advertise v1.0, and confirm both paths render the same UI.

## Preview: A2UI v1.0

A2UI v1.0 is a release candidate with full spec text, schemas, a basic catalog (`catalogs/basic/v1/catalog.json`, `catalogId` `https://a2ui.org/specification/v1_0/catalogs/basic/catalog.json`) and an A2A extension. Posture: build. Implement it behind a flag next to v0.9, and do not make it the default or drop v0.9 support until the README or a2ui.org marks v1.0 as stable.

Known rough edges at main 3db3b41: several prose examples in the v1.0 protocol document still use unprefixed `{"path": ...}` and `{"call": ...}` and describe `updateComponents` `surfaceId` as unique for the renderer's lifetime. The schemas (`common_types.json` `DataBinding` requires `@path`, `FunctionCommon` requires `@call`) and the evolution guide are the newer text; follow them.

Watch the `specification/v1_0/` folder, the README status note and the a2ui.org version list. When v1.0 becomes stable: make it current, decide with the README whether v0.9 becomes supported or legacy, update the description, both READMEs and `metadata.json`, and turn the 0.9 to 1.0 steps above into the default upgrade path.
