# WebMCP API

Pinned to the WebMCP Draft Community Group Report of 30 September 2026 (commit `d61d0e6`). Section names refer to that draft.

Availability at the pin (implementation status page): an origin trial in Chrome 149 and in Edge 150, support in ChatGPT Desktop, experimental support in Brave's Leo, and open standards-position requests for Firefox and Safari. For local development, Chrome has the `chrome://flags/#enable-webmcp-testing` flag (Chrome WebMCP overview).

## WebIDL (§ API)

```webidl
partial interface Document {
  [SecureContext, SameObject] readonly attribute ModelContext modelContext;
};

[Exposed=Window, SecureContext]
interface ModelContext : EventTarget {
  Promise<undefined> registerTool(ModelContextTool tool, optional ModelContextRegisterToolOptions options = {});
  Promise<sequence<RegisteredTool>> getTools(optional ModelContextGetToolOptions options = {});
  Promise<DOMString> executeTool(RegisteredTool tool, optional object inputObject, optional ModelContextExecuteToolOptions options = {});

  attribute EventHandler ontoolchange;
  attribute EventHandler ontoolactivated;
  attribute EventHandler ontoolcancel;
};

dictionary ModelContextTool {
  required DOMString name;
  USVString title;
  required DOMString description;
  object inputSchema;
  required ToolExecuteCallback execute;
  ToolAnnotations annotations;
};

dictionary ToolAnnotations {
  boolean readOnlyHint = false;
  boolean untrustedContentHint = false;
  boolean consequentialHint = false;
  boolean debugging = false;
};

dictionary ToolExecuteCallbackOptions {
  required AbortSignal signal;
};

callback ToolExecuteCallback = Promise<any> (object inputObject, ToolExecuteCallbackOptions options);

dictionary ModelContextRegisterToolOptions {
  sequence<USVString> exposedTo;
  AbortSignal signal;
};

dictionary ModelContextGetToolOptions {
  sequence<USVString> fromOrigins;
};

dictionary ModelContextExecuteToolOptions {
  AbortSignal signal;
};

dictionary RegisteredTool {
  required DOMString name;
  DOMString title;
  required DOMString description;
  object inputSchema;
  required Window window;
  required USVString origin;
  ToolAnnotations annotations;
};
```

Each `Document` has its own `ModelContext` (§ Extensions to Document). Earlier drafts exposed the API as `navigator.modelContext`; pull request #184 (May 2026) moved the getter to `Document`. Code written for the old entry point needs to be updated.

## Tool definition (§ ModelContextTool Dictionary)

| Member        | Meaning                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `name`        | Unique identifier agents use in tool calls.                                                |
| `title`       | Label for user interfaces; should be localized to the user's language.                     |
| `description` | Natural language description of what the tool does, so agents know when and how to use it. |
| `inputSchema` | JSON Schema object for the input parameters.                                               |
| `execute`     | Callback invoked with `(inputObject, { signal })`; may return a promise.                   |
| `annotations` | Optional `ToolAnnotations`.                                                                |

Annotations (§ ModelContextTool Dictionary; Chrome imperative API guide):

| Hint                   | When true                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `readOnlyHint`         | The tool only reads data and modifies no state.                                                                                            |
| `untrustedContentHint` | The output contains data that is untrusted from the registering author's perspective, such as user-generated content or external web data. |
| `consequentialHint`    | Executing the tool has significant, real-world or non-reversible effects, such as booking a flight or transferring money.                  |
| `debugging`            | The tool is for debugging and developer tooling, not end-user interactions. Chrome documents it as available from Chrome 156.              |

All four default to `false`.

## Registration rules (§ ModelContext Interface, registerTool steps)

`registerTool()` rejects:

- with `InvalidStateError` if the document is not fully active;
- with `NotAllowedError` if the document is not allowed to use the `tools` feature;
- with `InvalidStateError` if a tool with the same name is already registered in this document;
- with `InvalidStateError` if the name is empty, longer than 128 characters, or contains a code point other than ASCII alphanumerics, `_`, `-` or `.`;
- with `InvalidStateError` if `description` is empty;
- with the serialization exception if `inputSchema` cannot be serialized to a JSON string (for example a circular reference);
- with the abort reason if `signal` is already aborted;
- with `SecurityError` if an `exposedTo` entry does not parse as a URL or its origin is not potentially trustworthy.

On success the tool is stored in the document's tool map, other documents are notified of the change (`toolchange`), and the promise resolves with `undefined`.

## Unregistration (§ unregister a tool)

- Aborting the registration `signal` unregisters the tool and notifies documents of the change.
- Unregistering does not cancel an execution whose callback already started, including when the callback unregisters its own tool. The registration signal controls availability; the execution signal controls one invocation.
- There is no in-place update. To change a tool's name, description or schema, unregister it and register it again; each step produces a `toolchange` event (explainer, Best Practices). The `execute` implementation itself can change without re-registration.
- The draft notes a race: unregistering and quickly re-registering a tool with the same name but a new schema can apply old arguments to the new schema (§ issue #92 note). Validate inputs in `execute`.

## Execution (§ imperative execute steps)

1. The input arrives as a JSON string and is parsed into an object; if parsing fails or the result is not an object, the call fails.
2. A `toolactivated` event (`ToolActivatedEvent`, with `toolName`) fires at the document's `ModelContext`.
3. `execute(inputObject, { signal })` runs. `signal` aborts when the execution is canceled; a `toolcancel` event (`ToolCancelEvent`) is dispatched when that happens.
4. If the promise fulfills, the value is serialized to a JSON string and returned to the caller. If serialization throws, or the promise rejects, the call fails (a rejection may be reported to the console).

`executeTool()` called with no input passes an empty object (§ ModelContext Interface, domintro). Chrome documents that `executeTool()` returns `null` when the tool triggers a navigation, and that JSON-stringified input arguments are deprecated from Chrome 155 (Chrome imperative API guide).

## Discovery for in-page agents (§ ModelContext Interface)

- `getTools()` resolves to the tools registered by this document and its descendants that are exposed to it. Without `fromOrigins`, only same-origin documents are queried.
- `fromOrigins` adds cross-origin documents to the query; a cross-origin tool is returned only if its owner also listed the caller's origin in `exposedTo` (§ ModelContextGetToolOptions; Chrome imperative API guide).
- `RegisteredTool.origin` is the registering document's origin, useful for cross-origin tools; `window` is its `Window`.
- The browser's own agent retrieves tools through an internal mechanism, not `getTools()` (§ ModelContext Interface, domintro).

## Events (§ Events)

| Handler           | Event           | Fires when                          |
| ----------------- | --------------- | ----------------------------------- |
| `ontoolchange`    | `toolchange`    | The set of available tools changed. |
| `ontoolactivated` | `toolactivated` | Execution of a tool begins.         |
| `ontoolcancel`    | `toolcancel`    | Execution of a tool is canceled.    |

## Declarative API

The draft's "Declarative WebMCP" section is marked as a TODO that points to the declarative API explainer in the repository. Chrome documents a declarative API that annotates HTML forms (Chrome WebMCP overview). Treat it as less settled than the imperative API.

## Examples

Feature detection, registration with a lifetime, annotations and cancellation:

```ts
type Order = { id: string; status: string };

declare function fetchOrders(
  range: string,
  signal: AbortSignal,
): Promise<Order[]>;
declare function cancelOrder(orderId: string): Promise<void>;
declare function currentUserCanCancel(orderId: string): boolean;

export async function registerOrderTools(): Promise<
  AbortController | undefined
> {
  if (!("modelContext" in document)) return undefined;
  const lifetime = new AbortController();

  await document.modelContext.registerTool(
    {
      name: "get_order_status",
      title: "Get order status",
      description:
        "Returns order number and shipping status for orders in a timeframe.",
      inputSchema: {
        type: "object",
        properties: {
          timeframe: {
            type: "string",
            enum: ["today", "last_7_days", "last_30_days"],
            description: "Timeframe for the order lookup.",
          },
        },
        required: ["timeframe"],
      },
      annotations: { readOnlyHint: true },
      execute: async ({ timeframe }, { signal }) =>
        fetchOrders(String(timeframe), signal),
    },
    { signal: lifetime.signal },
  );

  await document.modelContext.registerTool(
    {
      name: "cancel_order",
      title: "Cancel order",
      description: "Cancels one order that has not shipped yet.",
      inputSchema: {
        type: "object",
        properties: {
          orderId: {
            type: "string",
            description: "Order number, for example A-1042.",
          },
        },
        required: ["orderId"],
      },
      annotations: { consequentialHint: true },
      execute: async ({ orderId }) => {
        if (typeof orderId !== "string")
          return { error: "orderId must be a string." };
        if (!currentUserCanCancel(orderId))
          return { error: `Order ${orderId} cannot be canceled.` };
        await cancelOrder(orderId);
        return { canceled: orderId };
      },
    },
    { signal: lifetime.signal },
  );

  return lifetime;
}

// When the page state no longer offers these actions:
// lifetime.abort();
```

Without the browser's type definitions the `document.modelContext` access needs a local declaration or a typings package; Chrome mentions the `webmcp-types` npm package for this (Chrome imperative API guide).

Listening for changes from an in-page agent:

```ts
document.modelContext.addEventListener("toolchange", async () => {
  const tools = await document.modelContext.getTools();
  console.log(tools.map((tool) => tool.name));
});
```
