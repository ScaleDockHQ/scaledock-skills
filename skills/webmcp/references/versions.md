# Versions and upgrades

Read this when choosing a target version, reading page code written against an earlier WebMCP draft, or upgrading it. Sources: the spec source `index.bs` at the pinned commit `d61d0e6` and at commit `a816d2e` (the last commit before pull request #184), pull request #184, and the commit history of `index.bs`, listed in [Sources](../SKILL.md#sources).

WebMCP has no numbered releases. The W3C Web Machine Learning Community Group publishes the editor's draft from the main branch as a Draft Community Group Report, so a line here is a range of commits with the same entry point. Section names (§ ModelContext Interface) refer to the draft of the line being discussed.

## Version lines

| Id              | Line                                 | Status  | Revision                                                                     | Posture | Summary                                                                                     |
| --------------- | ------------------------------------ | ------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `draft`         | WebMCP Draft Community Group Report  | current | Draft CG Report of 30 September 2026, commit `d61d0e6`                       | build   | `document.modelContext`, promise-returning `registerTool()`, `getTools()`, `executeTool()`. |
| `navigator-era` | WebMCP navigator.modelContext drafts | legacy  | commits from 2026-01-26 to `a816d2e` (2026-05-20), before #184 on 2026-05-27 |         | `navigator.modelContext`, synchronous `registerTool()`, `ModelContextClient`.               |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to the current draft at the pinned commit, with posture build: write against `document.modelContext` and feature-detect it with `"modelContext" in document`.
- No line is supported. Code that uses `navigator.modelContext` is input to an upgrade; the current draft defines no `Navigator` member.
- Browsers in origin trials may implement a different commit than the pin. Check the implementation status page and the browser's own documentation, and keep the tool logic behind a thin registration layer so a change of entry point touches one place.

## What changed

### WebMCP Draft Community Group Report

Changes since the navigator era, from the `index.bs` commit history and the draft at `d61d0e6`:

- The `modelContext` getter moved from `Navigator` to `Document`, with `[SecureContext, SameObject]`; each `Document` has its own `ModelContext` (§ Extensions to Document; pull request #184, 2026-05-27).
- `registerTool()` returns a promise (#200), which rejects when the `signal` is already aborted (#202) (§ ModelContext Interface).
- `ModelContextClient` and its `requestUserInteraction()` were removed (#205). The `execute` callback now receives `(inputObject, options)`, where `options.signal` is an `AbortSignal` for the execution (§ ModelContextTool Dictionary; #247).
- `getTools()` with `fromOrigins`, and `executeTool()`, were added for in-page agents (§ ModelContext Interface; #223, #226, #246, #251, #324).
- `ToolAnnotations` gained `consequentialHint` (#217) and `debugging` (#253) (§ ModelContextTool Dictionary).
- `toolactivated` and `toolcancel` events, with `ToolActivatedEvent` and `ToolCancelEvent`, sit next to `toolchange` (§ ModelContext Interface).
- Permissions Policy is documented as a security mitigation (#275). A gate on `document.domain` being disabled was added to `registerTool()` (#197) and the origin-keyed agent cluster requirement was removed again at the pinned commit (#330), so the pinned draft has no such gate.

A later commit on the main branch, `6891d0e` (2026-10-02, #327), only adds `continuations-explainer.md`; it does not change `index.bs`, so the pin stands.

### WebMCP navigator.modelContext drafts

What the navigator era looked like, from `index.bs` at `a816d2e` and earlier commits:

- `partial interface Navigator { [SecureContext] readonly attribute ModelContext modelContext; }`. The `Navigator`'s `ModelContext` was replaced the first time the getter was read after navigating away from the initial `about:blank`, so tools of the two documents did not mix (§ Extensions to the Navigator Interface, at `a816d2e`).
- `registerTool(tool, options)` returned `undefined`; `options` had `signal` and `exposedTo` (§ ModelContext Interface, at `a816d2e`).
- `execute` was called as `(input, client)`, where `client` was a `ModelContextClient` with `requestUserInteraction(callback)` (§ ModelContextTool Dictionary, at `a816d2e`).
- `ToolAnnotations` had only `readOnlyHint` and `untrustedContentHint` (at `a816d2e`).
- There was no `getTools()`, `executeTool()`, `toolactivated` or `toolcancel`.
- Earlier still, `unregisterTool(name)` removed a tool until the `signal` option replaced it (#147, 2026-03-26), and `provideContext()` and `clearContext()` existed until #132 (2026-03-05).

## Upgrading

### navigator-era to draft

1. Change the version marker: replace every `navigator.modelContext` with `document.modelContext`, and `iframe.contentWindow.navigator.modelContext` with `iframe.contentDocument.modelContext` (§ Extensions to Document). Feature-detect with `"modelContext" in document`.
2. Replace removed or renamed members:
   - `await` or `.then()` the promise from `registerTool()`, and handle its rejection (§ ModelContext Interface).
   - Replace `unregisterTool(name)` with an `AbortController` whose `signal` is passed at registration (§ ModelContextRegisterToolOptions).
   - Replace `provideContext()` and `clearContext()` with one `registerTool()` per tool and an abort per page state.
   - Change `execute(input, client)` to `execute(inputObject, options)`. Remove calls to `client.requestUserInteraction()`, and show confirmation in the page UI instead; honor `options.signal` (§ ModelContextTool Dictionary).
   - Set `consequentialHint` on tools that purchase, transfer or delete ([`security.md`](security.md)).
3. Validate against the target: every registration resolves in a secure context, names match `^[A-Za-z0-9_.-]{1,128}$`, and results are JSON-serializable (§ ModelContext Interface, registerTool steps).
4. Keep behaviour unchanged: the same tool names, descriptions, schemas and results, and the same confirmation before consequential actions, now in the page instead of through `requestUserInteraction()`.

## Preview

No preview line is listed. WebMCP's only line with text is the editor's draft itself, which is the current line with posture build; the Community Group has published no separate next version. When the draft moves to a W3C Working Group or gets a dated snapshot that browsers ship, re-read the repository, record the new line, and make the commit-pinned draft legacy or supported as the source says.
