# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Agent Protocol

Source: https://raw.githubusercontent.com/langchain-ai/agent-protocol/main/README.md

Agent Protocol is our attempt at codifying the framework-agnostic APIs that are needed to serve LLM agents in production. This document explains the purpose of the protocol and makes the case for each of the endpoints in the spec. We finish by listing some roadmap items for the future.

- **document.** - Able to reconnect to output stream if disconnected - Handling edge cases - Failures should be handled gracefully, and retried if desired - Bursty traffic should be queued up Base Endpoints: - [`GET /threads/{thread_id}/runs`](https://langchain-ai.github.io/agent-protocol/api.html#tag/background-runs/GET/threads/{thread_id}/runs) - List runs for a thread.
- **document.** This should give you a good sense of how the protocol can be used in practice.
- **document.** - Add Store endpoint to perform a vector search over memory entries - Add param for `POST /threads/{thread_id}/runs/{run_id}/stream` to replay events since `event-id` before streaming new events - Add param to `POST /threads/{thread_id}/runs` to optionally allow concurrent runs on the same thread (current spec makes this forbidden) - (Open an issue and let us know what else should be here!)
