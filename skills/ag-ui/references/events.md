# Events

AG-UI 1.0. Page titles in parentheses refer to the specification pages listed in the skill's Sources.

## Envelope and identifiers (The Event Model)

Every event is a JSON object with:

| Field           | Rule                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `type`          | Required. One of the 31 `EventType` values.                                                               |
| `timestamp`     | Optional, informational (by convention milliseconds since the Unix epoch). Must not be used for ordering. |
| `rawEvent`      | Optional. The provider-native source event, verbatim. No protocol behaviour may derive from it.           |
| `metadata`      | Optional. Open by key; merged key by key, last write wins, no recursion (Metadata).                       |
| `subagentRunId` | Optional on events that can belong to a subagent's work; not on `RUN_*` or `MESSAGES_SNAPSHOT`.           |

- Optional fields without a value are omitted, never `null`. A `null` inside open data (metadata values, state) is data and is preserved.
- `threadId` (conversation, minted by the application), `runId` (never reused on a thread), `messageId` (unique within the thread), `toolCallId` and `subagentRunId` (one invocation) are opaque strings; never parse them.

## The eight families (The Event Model, Event Streams)

| Family         | Events                                                                                                                                                                | Pattern            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Runs and steps | `RUN_STARTED` `RUN_FINISHED` `RUN_ERROR` `STEP_STARTED` `STEP_FINISHED`                                                                                               | lifecycle          |
| Text messages  | `TEXT_MESSAGE_START` `TEXT_MESSAGE_CONTENT` `TEXT_MESSAGE_END` `TEXT_MESSAGE_CHUNK`                                                                                   | streaming          |
| Tool calls     | `TOOL_CALL_START` `TOOL_CALL_ARGS` `TOOL_CALL_END` `TOOL_CALL_CHUNK` `TOOL_CALL_RESULT`                                                                               | streaming          |
| Reasoning      | `REASONING_START` `REASONING_END` `REASONING_MESSAGE_START` `REASONING_MESSAGE_CONTENT` `REASONING_MESSAGE_END` `REASONING_MESSAGE_CHUNK` `REASONING_ENCRYPTED_VALUE` | streaming          |
| State          | `STATE_SNAPSHOT` `STATE_DELTA` `MESSAGES_SNAPSHOT`                                                                                                                    | snapshot and delta |
| Activity       | `ACTIVITY_SNAPSHOT` `ACTIVITY_DELTA`                                                                                                                                  | snapshot and delta |
| Subagents      | `SUBAGENT_STARTED` `SUBAGENT_FINISHED` `SUBAGENT_ERROR`                                                                                                               | lifecycle          |
| Passthrough    | `RAW` `CUSTOM`                                                                                                                                                        | standalone         |

All implementations support the event model and patterns; only the run lifecycle is mandatory, the other families are features.

## Run lifecycle (Runs and Steps)

- A stream begins with `RUN_STARTED` or `RUN_ERROR` (a run can fail before it starts). Anything else first is a protocol violation.
- `RUN_STARTED` carries `threadId`, `runId`, the producer's own `protocolVersion`, optionally `parentRunId` (when an agent starts another agent as a separate run) and optionally `input` (an echo of the run input).
- `RUN_FINISHED` closes a run that did not fail. `outcome` is optional; absent means success:
  - `{"type":"success"}`, optionally with `pendingToolCallIds` (frontend tool calls left unanswered);
  - `{"type":"interrupt","interrupts":[...]}` (at least one; see `human-in-the-loop.md`);
  - `{"type":"cancelled"}`: stopped on purpose, not a failure. Close everything first; `result` should be absent; no interrupts; never report it as success, and a consumer presents it as neither success nor failure.
- `result` is optional (the run's return value); `usage` is optional, one `TokenUsage` entry per provider and model.
- `RUN_ERROR` ends a failed run with `message` and optional `code` (open string) and `usage`. A consumer surfaces it to application code and never reports success.
- After close: no further events for that run except a new `RUN_STARTED`, or a late `RUN_ERROR` after `RUN_FINISHED` (treat the run as failed). Nothing but `RUN_STARTED` follows `RUN_ERROR`.
- Several runs may share one stream (for example a replayed thread). Close the current run before opening the next. Restate history as `MESSAGES_SNAPSHOT` and `STATE_SNAPSHOT`, never by re-streaming.
- Steps (`STEP_STARTED` / `STEP_FINISHED`, matched by `stepName`) label phases; they may overlap; all must close before the run finishes.
- Keep apart a stream the consumer rejects (producer violation) and a run that reports its own failure with `RUN_ERROR`.

Token usage: `inputTokens` and `outputTokens` are totals; `cachedInputTokens`, `cacheWriteInputTokens` and `reasoningTokens` are parts of them; `totalTokens` is input plus output. An absent count means "not reported", never zero. Subagent calls count in the run; separate child runs and resumed runs report their own.

## Streaming pattern (Streaming Messages)

- `*_START` opens an item, content events append a `delta`, `*_END` closes it, matched by `messageId` or `toolCallId`.
- Never open an item that is already open, never continue or close one that is not open, and close everything before the run finishes.
- Messages, tool calls, reasoning and steps may interleave freely. Standalone events (`STATE_*`, `MESSAGES_SNAPSHOT`, `ACTIVITY_*`, `CUSTOM`, `RAW`, `REASONING_ENCRYPTED_VALUE`) may appear anywhere within an open run.
- A closed message or tool call may be reopened with the same id; the reopening start must agree with the original (Text Messages, Tool Calls).

Chunked form (`TEXT_MESSAGE_CHUNK`, `TOOL_CALL_CHUNK`, `REASONING_MESSAGE_CHUNK`):

- Consumers expand chunks into start, content and end before verification and application code.
- The first chunk must carry `messageId` (and may carry `role`) for text, `messageId` for reasoning, and `toolCallId` plus `toolCallName` for tool calls. A missing field is a violation, not something to invent.
- A continuation may repeat an opener field only with the same value; a conflicting repeat is fatal.
- The two forms never mix within one item. The `*_END` of a chunked item is synthesized when a different item opens in the same lane, when most other events arrive in that lane, or when a run-level event arrives.

## Text messages (Text Messages)

`TEXT_MESSAGE_START` carries `messageId`, optional `role` (`developer`, `system`, `assistant`, `user`; absent means `assistant`) and optional `name`. `TEXT_MESSAGE_CONTENT` carries `delta`.

## Tool calls (Tool Calls)

`TOOL_CALL_START` carries `toolCallId`, `toolCallName` and optional `parentMessageId`. `TOOL_CALL_ARGS` streams argument text, which the protocol does not validate. `TOOL_CALL_END` means the text is complete, not valid. `TOOL_CALL_RESULT` is a new tool message with its own `messageId`, the `toolCallId` it answers, and `content` as a string or a list of content parts (`text`, `image`, `audio`, `video`, `document`). See `human-in-the-loop.md` for frontend tools.

## Reasoning (Reasoning)

Spans (`REASONING_START` / `REASONING_END`) bracket thinking; reasoning messages stream with role `reasoning`. `REASONING_ENCRYPTED_VALUE` carries a provider artefact: consumers store it opaquely with the message or tool call it names, return it on later runs, never parse it, and never feed it to anything but the agent. The 0.x `THINKING_*` events are retired in favour of this family (Key Changes).

## State and conversation (State, Snapshots and Deltas)

- `STATE_SNAPSHOT` replaces state wholesale. `STATE_DELTA` applies an RFC 6902 JSON Patch against the current value (the input's `state` at run start, or `{}` if absent).
- Patches apply atomically. A malformed patch is fatal; a well-formed patch that fails to apply is warned about and skipped, the prior value kept. The producer should resynchronise with a snapshot; the consumer must adopt the next snapshot.
- Unknown members inside patch operations are legal and must be preserved.
- `MESSAGES_SNAPSHOT` is the producer's complete message set: messages replace by id in place, new ones append, and consumer-held messages absent from it are dropped, except activity and reasoning messages unless the snapshot carries some of that role.
- State persists across runs on a thread; the next input carries it back.

```http
data: {"type":"STATE_SNAPSHOT","snapshot":{"draft":{"sections":[]}}}

data: {"type":"STATE_DELTA","delta":[{"op":"add","path":"/draft/sections/0","value":{"title":"Intro","status":"draft"}}]}
```

## Activity (Activity)

`ACTIVITY_SNAPSHOT` and `ACTIVITY_DELTA` carry structured progress as activity messages whose `content` is an object, with an open `activityType`. A delta needs a prior snapshot for that message. Activity messages stay on the consumer: strip them from outgoing `messages`.

## Subagents (Subagents)

`subagentRunId` attributes work to one invocation. `SUBAGENT_STARTED` (optionally with `parentSubagentRunId`) announces it, `SUBAGENT_FINISHED` (outcome `success` or `suspended`) or `SUBAGENT_ERROR` ends it; announced invocations close before the run finishes. Continuations must agree with their opener's attribution. Parallel subagents must attribute their chunk continuations. State stays run-scoped.

## Passthrough (Raw and Custom Events)

- `RAW` carries a provider-native `event` (and optional `source`). Emit it alongside standard events, never instead of them; derive no protocol behaviour from it.
- `CUSTOM` carries `name` and `value`. Unknown names are ignored silently. Prefix invented names with a vendor or application identifier; unprefixed names are reserved. Never use `CUSTOM` for semantics a standard event already has.
- Both are untrusted input: never rendered as markup, executed or granted authority.
