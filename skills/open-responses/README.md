# open-responses

An agent skill for Open Responses: build, call or test an LLM API that follows the open, multi-provider specification based on the OpenAI Responses API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill open-responses
```

Then ask your agent to "make our model gateway Open Responses compliant" or "add WebSocket mode to our /v1/responses endpoint".

## What it covers

- `POST /v1/responses`: request and response fields, items as typed state machines, content, reasoning and errors.
- The agentic loop: function calls and outputs, hosted tools, `tool_choice`, `allowed_tools`, `previous_response_id` and `truncation`.
- Semantic streaming events over server-sent events, with item and content-part ordering and the `[DONE]` terminator.
- WebSocket mode: `response.create`, sequential turns, connection-local continuation, reconnects and error envelopes.
- `POST /v1/responses/compact` and assistant `phase`.
- Slug-prefixed extension items, hosted tools, events and fields, and the browser and CLI compliance tests.

## Versions

| Line                      | Status    |
| ------------------------- | --------- |
| Open Responses 2026-04-24 | current   |
| Open Responses 2026-01-15 | supported |

`references/versions.md` lists what 2026-04-24 added and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Open Responses Specification 2026-04-24](https://www.openresponses.org/specification/2026-04-24) and [API Reference 2026-04-24](https://www.openresponses.org/reference/2026-04-24).
- [OpenAPI 2026-04-24](https://www.openresponses.org/openapi/2026-04-24/openapi.json) and [OpenAPI 2026-01-15](https://www.openresponses.org/openapi/2026-01-15/openapi.json).
- [Open Responses Specification 2026-01-15](https://www.openresponses.org/specification/2026-01-15).
- [Acceptance Tests](https://www.openresponses.org/compliance).
- [Changelog](https://github.com/openresponses/openresponses/blob/main/CHANGELOG.md) and the [openresponses/openresponses](https://github.com/openresponses/openresponses) repository.

## License

MIT
