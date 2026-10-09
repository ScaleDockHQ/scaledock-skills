# Requirements from the pinned text

These statements were read from the pinned sources on 2026-10-06 and are quoted as written. Agent Protocol does not use BCP 14 keywords: the README states the defining behaviour of each endpoint, and the OpenAPI document states the rules for each schema property and parameter in its descriptions (lowercase must/should). Apply the ones that match the role. README quotes are labelled with the endpoint or nearest heading; OpenAPI quotes with the schema property or operation.

## README: endpoints and behaviour

Source: https://raw.githubusercontent.com/langchain-ai/agent-protocol/fb81f3e27ee507557926ecf923d0f933a1c76d44/README.md

- **Threads: multi-turn interactions.** Ensure that only one run per thread is active at a time
- **Threads: multi-turn interactions.** Track history of past states of a thread, modelled as an append-only log of states
- **POST /threads/{thread_id}/copy.** Create an independent copy of a thread.
- **PATCH /threads/{thread_id}.** Update a thread's values or metadata. Updating values creates a new revision in the thread's history.
- **GET /agents/{agent_id}/schemas.** Get the input, output, state and config schemas for an agent. All schemas are represented in JSON Schema format.
- **POST /runs/{run_id}/cancel.** Cancel a run. If the run hasn’t started, cancel it immediately, if it’s currently running then cancel it as soon as possible.
- **DELETE /runs/{run_id}.** Delete a finished run. A pending run needs to be cancelled first, see previous endpoint.
- **GET /runs/{run_id}/wait.** Wait for a run to finish, return the final output. If the run already finished, returns its final output immediately.
- **GET /runs/{run_id}/stream.** Join the output stream of an existing run. Only output produced after this endpoint is called will be streamed.
- **Messages.** In all endpoints that expose thread values, there is also a separate `messages` field, which agents can optionally implement.
- **Streaming Primitives.** The CDDL schema is the source of truth, with generated TypeScript and Python bindings available for clients and implementations that want strongly typed protocol payloads.
- **GET /threads/{thread_id}/stream.** Upgrade to a WebSocket connection for bidirectional streaming. Once upgraded, commands, command responses, and unsolicited events share the same connection.

## OpenAPI document: schemas and parameters

Source: https://raw.githubusercontent.com/langchain-ai/agent-protocol/fb81f3e27ee507557926ecf923d0f933a1c76d44/openapi.json

- **RunCreate.thread_id.** The ID of the thread to run. If not provided, creates a stateless run. 'thread_id' is ignored unless Threads stage is implemented.
- **RunCreate.agent_id.** The agent ID to run. If not provided will use the default agent for this service. 'agent_id' is ignored unless Agents stage is implemented.
- **RunCreate.on_completion.** Whether to delete or keep the thread when run completes. Must be one of 'delete' or 'keep'. Defaults to 'delete' when thread_id not provided, otherwise 'keep'.
- **RunCreate.on_disconnect.** The disconnect mode to use. Must be one of 'cancel' or 'continue'.
- **RunCreate.if_not_exists.** How to handle missing thread. Must be either 'reject' (raise error if missing), or 'create' (create new thread).
- **ThreadCreate.if_exists.** How to handle duplicate creation. Must be either 'raise' (raise error if duplicate), or 'do_nothing' (return existing thread).
- **Thread.messages.** If messages are contained in Thread.values, implementations should remove them from values when returning messages. When this key isn't present it means the thread/agent doesn't support messages.
- **Agent.capabilities.** In addition to the standard capabilities (prefixed with ap.), implementations can declare custom capabilities, named in reverse domain notation (eg. com.example.some.capability).
- **POST /runs/{run_id}/cancel action.** `rollback` will cancel the run and delete the run and associated checkpoints afterwards.
- **POST /threads/{thread_id}/stream.** Closing the HTTP connection unsubscribes from this stream.
- **StreamingCommand.id.** Client-assigned command ID used to correlate the command response.
