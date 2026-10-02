# Transports

A transport is a binding: it defines input delivery, framing and termination, never what events mean (Transports).

## Binding contract (Transports)

A binding must provide:

- ordered, complete delivery of a run's events in emission order;
- delivery of the `RunAgentInput` before any events (replayed runs on the same stream get no further input);
- a termination signal distinguishable from truncation;
- an error path that refuses invalid input before `RUN_STARTED`, outside the stream.

AG-UI defines no credential. Authentication and authorization belong to the binding and the application (HTTP authentication, ambient process identity, or nothing).

An implementation that speaks HTTP must support HTTP + SSE; HTTP + Protobuf is optional.

## HTTP + Server-Sent Events (HTTP + Server-Sent Events)

Request:

- `POST` to the agent endpoint, body the `RunAgentInput` as one UTF-8 JSON object, `Content-Type: application/json`.
- `Accept: text/event-stream` (plus the protobuf media type if the client can consume it).

Response:

- `200` with `Content-Type: text/event-stream`.
- Each SSE `data` payload is exactly one event as a JSON object.
- Producers frame with LF line endings. Consumers ignore `event:`, `id:` and `retry:` and tolerate comment lines such as `: keep-alive`.
- The producer closes the body after the last run's terminal event.

Errors:

- Input rejected before the run (malformed JSON, failed validation, refused auth) is an HTTP error status with no event stream.
- Failures after the stream opens travel as `RUN_ERROR`. Never infer success from `200` alone.
- There is no stream resumption: `Last-Event-ID` is not used; re-running is a new run with a new `runId`.

```http
POST /agent HTTP/1.1
Content-Type: application/json
Accept: text/event-stream

{"threadId":"thr-1","runId":"run-1","protocolVersion":"1.0","messages":[{"id":"msg-0","role":"user","content":"Hi"}]}

HTTP/1.1 200 OK
Content-Type: text/event-stream

data: {"type":"RUN_STARTED","threadId":"thr-1","runId":"run-1","protocolVersion":"1.0"}

data: {"type":"TEXT_MESSAGE_START","messageId":"msg-1","role":"assistant"}

data: {"type":"TEXT_MESSAGE_CONTENT","messageId":"msg-1","delta":"Hello."}

data: {"type":"TEXT_MESSAGE_END","messageId":"msg-1"}

data: {"type":"RUN_FINISHED","threadId":"thr-1","runId":"run-1"}
```

## HTTP + Protobuf (HTTP + Protobuf)

- Same JSON POST. The client opts in by admitting `application/vnd.ag-ui.event+proto` in `Accept` (wildcards admit it too, so a client that cannot consume protobuf sends an explicit `Accept`). Quality values between the two types are not consulted.
- A supporting producer should answer with it whenever admitted, and must answer SSE otherwise; clients must always be ready for SSE.
- Response `Content-Type` is exactly `application/vnd.ag-ui.event+proto`. Each frame is a 4-byte unsigned big-endian length followed by one encoded event; frames abut and may split across chunks.
- The wire schema is generated from the JSON Schema; first-party encoders must reproduce a shared byte corpus.
- Decoded events enter the same processing pipeline. Undecodable frames are fatal; a body ending mid-frame is a truncated run.

## Truncation (Transports)

A stream that ends without a terminal event is a truncated run: no outcome, no synthesized `RUN_FINISHED`, never reported as success. What it delivered stays delivered. Retrying is a new run with a new `runId`.

## Custom transports (Transports)

WebSockets, message buses or in-process pipes may carry AG-UI if they preserve the event model, patterns and processing rules and meet the binding contract. They should document framing, input delivery, termination and errors, and JSON transports should frame one event object per frame as SSE does.

## Endpoint sketch

Framework-neutral TypeScript using the Fetch API `Request` and `Response`. `runAgent` stands for your agent or framework bridge, yielding protocol events.

```ts
type AgUiEvent = { type: string; [key: string]: unknown };

declare function runAgent(
  input: RunAgentInput,
  signal: AbortSignal,
): AsyncIterable<AgUiEvent>;

interface RunAgentInput {
  threadId: string;
  runId: string;
  messages: unknown[];
  protocolVersion?: string;
  tools?: unknown[];
  context?: unknown[];
  state?: unknown;
  forwardedProps?: unknown;
  resume?: unknown[];
}

export async function handleAgUi(req: Request): Promise<Response> {
  let input: RunAgentInput;
  try {
    input = await req.json();
  } catch {
    return new Response("invalid JSON", { status: 400 });
  }
  if (
    typeof input.threadId !== "string" ||
    typeof input.runId !== "string" ||
    !Array.isArray(input.messages)
  ) {
    return new Response("invalid RunAgentInput", { status: 422 });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AgUiEvent) =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      send({
        type: "RUN_STARTED",
        threadId: input.threadId,
        runId: input.runId,
        protocolVersion: "1.0",
      });
      try {
        for await (const event of runAgent(input, req.signal)) send(event);
        send({
          type: "RUN_FINISHED",
          threadId: input.threadId,
          runId: input.runId,
        });
      } catch (error) {
        send({
          type: "RUN_ERROR",
          message: error instanceof Error ? error.message : "agent failed",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}
```

The sketch assumes `runAgent` closes every message, tool call and step it opens before returning, as `RUN_FINISHED` requires. The status codes for rejected input are this sketch's choice; the binding only requires an HTTP error status. Authenticate the request before parsing it.
