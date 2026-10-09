# Open Responses extensions and compliance

Read this when adding provider-specific items, hosted tools, events or fields, or when testing an implementation. "Spec" is the 2026-04-24 specification; "Compliance" is the acceptance tests page; "Repository" is the openresponses/openresponses README; all in [Sources](../SKILL.md#sources).

## What counts as compliant

From Spec § Extending Open Responses: an API is Open Responses compliant if it implements the spec directly or is a proper superset of it. Features that gain broad adoption are candidates for standardization by the Technical Steering Committee.

## Extension rules

| Extension              | Rule                                                                                                                                                                                                                    | Source                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Item types             | MUST be prefixed with the implementor slug, for example `acme:search_result`; MUST carry `id`, `type`, `status`; SHOULD be treated as non-portable; schemas SHOULD be documented.                                       | Spec § Items are extensible, § Extending Items |
| Hosted tools           | Tool `type` is slug-prefixed (`implementor_slug:custom_document_search`); each hosted tool SHOULD have its own item type recording how it was invoked, its status and its result, rich enough to round-trip losslessly. | Spec § Extending tools                         |
| Streaming events       | MUST be slug-prefixed (`acme:trace_event`); MUST include `type` and a monotonically increasing `sequence_number`; MUST NOT change core semantics such as token order or item lifecycle.                                 | Spec § Extending streaming events              |
| Fields on core schemas | MAY be added; MUST NOT alter required core behavior; SHOULD be optional and documented; no cross-vendor contracts on them.                                                                                              | Spec § Extending existing schemas              |
| Statuses               | Implementors MAY add item statuses, SHOULD document them; clients treat unknown statuses conservatively.                                                                                                                | Spec § Extending Items, Required item fields   |

Clients SHOULD be prepared for unknown item types (ignore them or keep them as opaque records) and MUST be able to ignore unknown extended events without losing the canonical response (Spec § Extending Items, § Extending streaming events).

```json
{
  "type": "acme:custom_document_search",
  "id": "cdc_759bd159770647a681a6ed186843fcca",
  "status": "completed",
  "query": ["climate change"],
  "results": [{ "document_id": "result_6064c25d", "chunk": "..." }]
}
```

## Compliance tests

From Compliance and the Repository README (§ Compliance testing):

- The web tester at `https://www.openresponses.org/compliance` takes a base URL, model, API key, auth header name and Bearer prefix, and validates responses against the OpenAPI schema.
- The same suite runs from the repository CLI: `bun run test:compliance --base-url http://localhost:8000/v1 --api-key $API_KEY`, with `--filter` to pick tests and `--help` for flags.

Browser-runnable tests (10):

| Test                              | Checks                                                               |
| --------------------------------- | -------------------------------------------------------------------- |
| Basic Text Response               | A user message returns a valid `ResponseResource`.                   |
| Assistant Message Phase           | Assistant history with `phase` labels is accepted.                   |
| Response Output Phase Schema      | Output assistant messages may carry `phase`.                         |
| Streaming Response                | SSE events and the final response validate.                          |
| System Prompt                     | A `system` role message is accepted.                                 |
| Tool Calling                      | A function tool yields a `function_call` output item.                |
| Image Input                       | An image URL in user content is accepted.                            |
| Multi-turn Conversation           | Assistant and user history is accepted.                              |
| Compaction Endpoint               | `/responses/compact` with `prompt_cache_key` returns a valid schema. |
| Compaction Missing Required Model | A compact request without `model` is rejected.                       |

CLI-only tests (7), all WebSocket: WebSocket Response; Sequential Responses; Continuation (`store: false`, only new input); Store False Reconnect Recovery (`previous_response_not_found` on a new socket, then a clean restart); Missing Previous Response; Failed Continuation Evicts Cache; Compact New Chain (compacted output as base input without `previous_response_id`).

Run the browser set for every implementation and the WebSocket set when WebSocket mode is offered. A 2026-01-15 implementation without compaction or `phase` support fails the four tests that cover them; that is expected for that line, not a regression.
