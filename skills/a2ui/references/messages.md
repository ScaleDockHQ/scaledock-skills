# Messages

Read this when producing or parsing A2UI messages: the agent-to-renderer envelopes, the renderer-to-agent messages, the error formats and how ordering works. Sources: Protocol v0.9.1, its `server_to_client.json` and `client_to_server.json`, Protocol v1.0 and its schemas, Protocol v0.8.2, listed in [Sources](../SKILL.md#sources). Headings in citations are the protocol document's headings.

## Envelope shape (v0.9)

Every message is a JSON object with a `version` (`"v0.9"` or `"v0.9.1"`) and exactly one message key. Schemas set `additionalProperties: false` on the envelope and on each message body, so extra keys fail validation (`server_to_client.json`). Streams are commonly JSON Lines, one message per line (Protocol v0.9.1, Example Stream).

| Direction         | Message key        | Purpose                                                    |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| agent to renderer | `createSurface`    | Create a surface and begin rendering it.                   |
| agent to renderer | `updateComponents` | Add or update components in a surface.                     |
| agent to renderer | `updateDataModel`  | Insert, replace or remove data in a surface's data model.  |
| agent to renderer | `deleteSurface`    | Remove a surface and all its components and data.          |
| renderer to agent | `action`           | Report a user interaction with a component's agent action. |
| renderer to agent | `error`            | Report a validation failure or another renderer error.     |

## `createSurface`

Protocol v0.9.1, `createSurface`:

- `surfaceId` (string, required). `catalogId` (string, required): the catalog of components and functions for the surface. `theme` (object, optional): validated against the catalog's `theme` schema. `sendDataModel` (boolean, optional, default `false`).
- A surface must exist before `updateComponents` or `updateDataModel` targets it. An agent may skip `createSurface` only if it knows the surface already exists (for example, created by another agent).
- `surfaceId` and `catalogId` are fixed once created; to change them, delete and recreate the surface.
- Sending `createSurface` for a `surfaceId` that already exists without deleting it first is an error. In v0.9.1 the id need only be unique among active surfaces (Evolution Guide v0.9.1 § 2.2). The v0.9 text suggests orchestrators prevent conflicts by prefixing the sub-agent's name or requiring UUIDs (Protocol v0.9, `createSurface`).

```json
{
  "version": "v0.9.1",
  "createSurface": {
    "surfaceId": "user_profile_card",
    "catalogId": "https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json",
    "theme": { "primaryColor": "#00BFFF" },
    "sendDataModel": true
  }
}
```

## `updateComponents`

Protocol v0.9.1, `updateComponents`; `server_to_client.json`:

- `surfaceId` (string, required) and `components` (array, required, at least one item, each validated against the catalog's `anyComponent`).
- The list is flat; relationships are id references. Components may reference children or bindings that do not exist yet; renderers render placeholders (progressive rendering).
- Sending the same `id` again updates that component. One component in the surface's lists MUST have `"id": "root"`.

```json
{
  "version": "v0.9.1",
  "updateComponents": {
    "surfaceId": "user_profile_card",
    "components": [
      {
        "id": "root",
        "component": "Column",
        "children": ["user_name", "user_title"]
      },
      {
        "id": "user_name",
        "component": "Text",
        "text": { "path": "/user/name" }
      },
      { "id": "user_title", "component": "Text", "text": "Software Engineer" }
    ]
  }
}
```

## `updateDataModel`

Protocol v0.9.1, `updateDataModel` and Server to client updates:

- `surfaceId` (string, required), `path` (JSON Pointer, optional, default `/`), `value` (any, optional).
- Upsert: an existing path is updated, a missing path is created. Omitting `value` removes the key at `path`; for arrays the index is set to `undefined` and the length is kept.
- With no `path` (or `/`), `value` replaces the whole data model.

## `deleteSurface`

`surfaceId` (string, required). The renderer removes the surface and all its components and data (Protocol v0.9.1, `deleteSurface`).

## `action` (renderer to agent)

Sent when the user triggers a component's `action.event` (Protocol v0.9.1, Client-to-server messages; `client_to_server.json`). All five fields are required:

- `name`: taken from `action.event.name`.
- `surfaceId` and `sourceComponentId`: where the event came from.
- `timestamp`: ISO 8601 `date-time`.
- `context`: the `action.event.context` object after every binding is resolved.

```json
{
  "version": "v0.9.1",
  "action": {
    "name": "submit_form",
    "surfaceId": "contact_form_1",
    "sourceComponentId": "submit_button",
    "timestamp": "2026-01-15T12:00:00Z",
    "context": { "email": "user@example.com" }
  }
}
```

Capabilities and the synced data model are not A2UI messages; they travel as transport metadata (see [`transports-and-security.md`](transports-and-security.md)).

## `error` (renderer to agent)

`client_to_server.json` defines two shapes:

- **Validation failed**: `code` `"VALIDATION_FAILED"`, `surfaceId`, `path` (JSON Pointer to the failing field, for example `/components/0/text`) and `message`, with no other properties. Send it back to the LLM so it can self-correct (Protocol v0.9.1, Standard validation error format).
- **Generic error**: any other `code`, with `surfaceId` and `message` required and additional properties allowed.

## Ordering and failure handling

- The transport must deliver messages in the order they were generated; out-of-order delivery can corrupt UI state (Protocol v0.9.1, The transport contract).
- Until `root` exists, component updates are buffered and have no visible effect; after that, the renderer renders the best tree it can and skips invalid references (Protocol v0.9.1, UI composition: the adjacency list model).
- When messages arrive as a list (A2A `DataPart.data`, or the `*_list.json` schemas), the list is not a transaction: process in order, report the failing message and continue; avoid repainting until the list is processed (A2A Extension v0.9.1, Processing Rules).
- For components the renderer cannot draw, degrade gracefully: render a safe fallback or skip the node, and if the whole surface fails show a generic message rather than crash (Catalogs, Graceful Degradation).

## v1.0 additions (preview, build behind a flag)

Protocol v1.0, Envelope message structure and Renderer-to-agent event messages; `agent_to_renderer.json`, `renderer_to_agent.json`:

- `version` is the constant `"v1.0"`. Agent messages add `callRendererFunction` and `agentFunctionResponse`; renderer messages add `callAgentFunction` and `rendererFunctionResponse`.
- `createSurface`: `catalogId` is optional (the surface default); `theme` is gone; `components` and `dataModel` may be inlined; `metadata.extensions` is allowed. Creating a surface implicitly creates the reserved `Surface` component with `"child": "root"`, which `updateComponents` cannot modify.
- `updateDataModel`: `value` is required; `"value": null` deletes the key.
- `callRendererFunction`: `functionCallId` and `callFunction` (`call`, `catalogId`, `args`). The renderer reads the function's `allowedCallers` from the catalog; for `rendererOnly` or unregistered functions it MUST reply with `error` `code: "INVALID_FUNCTION_CALL"`, and otherwise it MUST always reply, even for `void` functions, copying `functionCallId` verbatim.
- `rendererFunctionResponse` and `agentFunctionResponse`: `functionCallId` plus either `value` or `error` (`code`, `message`); one of the two MUST be present.
- `callAgentFunction`: `surfaceId`, `functionCallId`, `callFunction`. A renderer sends it when a `FunctionCall` names a function not registered locally; an agent that does not know the function MUST answer with an `error` of `UNKNOWN_FUNCTION` or `INVALID_FUNCTION_CALL`.
- `error`: `code` and `message` required; `surfaceId` and `functionCallId` are mutually exclusive, and `functionCallId` MUST be set when an agent-initiated call failed. Validation codes add `UNALLOWED_PARENT` and `UNALLOWED_CHILD`.
- `action.metadata.extensions` may carry attestations or audit data (Protocol v1.0, Extensions).

In request-response transports the agent returns `callRendererFunction` in the response and the renderer posts the `rendererFunctionResponse` in a follow-up request; in streaming transports either side sends at any time and correlates by `functionCallId` (Protocol v1.0, Transport Interaction Patterns).

## v0.8 messages (legacy, read only)

Protocol v0.8.2, Introduction and § 5: `surfaceUpdate`, `dataModelUpdate` (with a `contents` array of `key` and `value*` entries), `beginRendering` (with `root`, optional `catalogId` and `styles`) and `deleteSurface` from the agent; `userAction` or `error` from the renderer. The renderer buffers everything until `beginRendering`. If `catalogId` is omitted, the renderer MUST default to the v0.8 standard catalog (§ 2.1). Upgrade these with [`versions.md`](versions.md).
