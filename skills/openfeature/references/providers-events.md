# Providers and events

Sources: Providers (section 2), Events (section 5) and Types and Data Structures, OpenFeature specification v0.9.0. Requirement numbers are cited in parentheses.

## Provider interface

- `metadata` with a string `name` identifying the implementation (2.1.1).
- Typed resolution methods for boolean, number, string and structure, taking `flag key`, `default value` and optional `evaluation context`, returning **resolution details** (2.2.1, 2.2.2.1). Resolution details are for provider authors and are not exposed to application authors (types).
- Optional provider hooks added to the evaluation lifecycle (2.3.1).

### Resolution details

| Field           | Normal execution                                                                         | Abnormal execution                                                                        |
| --------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `value`         | The resolved value (2.2.3).                                                              |                                                                                           |
| `variant`       | Should be a string identifier for the value (2.2.4).                                     |                                                                                           |
| `reason`        | Should be a resolution reason or another string (2.2.5).                                 |                                                                                           |
| `error code`    | Must be unset, null or falsy (2.2.6).                                                    | Signal the error in the language's idiom with an error code and optional message (2.2.7). |
| `error message` | Must be unset, null or falsy (2.3.2).                                                    | May add detail (2.3.3).                                                                   |
| `flag metadata` | Should be populated (2.2.9); string keys with boolean, string or number values (2.2.10). |                                                                                           |

## Lifecycle (Hardening)

- **Initialize** (2.4): optional; receives the global evaluation context and the bound domain, if any (2.4.1). If it cannot make the provider ready it should terminate abnormally (2.4.2.1). A provider may declare itself **domain-scoped**, for state such as a persistent cache that cannot be shared across domains, and then must accept the bound domain (2.4.3, 2.4.4).
- **Shutdown** (2.5): optional; afterwards the provider should return to its uninitialized state, and shutdown should be idempotent (2.5.1 to 2.5.3).
- **Context reconciliation** (2.6): optional `on context changed(oldContext, newContext)`, mainly for static-context providers that must refresh cached flags, often by re-evaluating in bulk (2.6.1).
- **Tracking** (Experimental, 2.7): optional `track(eventName, context?, details?)` returning nothing (2.7.1).

## Provider status (2.8)

The provider emits an event for every status transition, including those from `initialize`, `on context changed` and spontaneous changes (2.8.1):

- `PROVIDER_READY` before `initialize` terminates normally (2.8.2);
- `PROVIDER_ERROR` before `initialize` terminates abnormally (2.8.3);
- `PROVIDER_CONTEXT_CHANGED` when `on context changed` ends normally, `PROVIDER_ERROR` when it fails (2.8.4).

A provider without `initialize` is treated as `READY` from registration, and the SDK runs `PROVIDER_READY` handlers for it (2.8.5.1).

| Status        | Meaning                                                 |
| ------------- | ------------------------------------------------------- |
| `NOT_READY`   | Not initialized.                                        |
| `READY`       | Initialized and able to resolve reliably.               |
| `ERROR`       | Initialized but not able to resolve reliably.           |
| `STALE`       | Cached state may be out of date.                        |
| `FATAL`       | Irrecoverable error.                                    |
| `RECONCILING` | Reconciling with a context change; static context only. |

## Events (section 5)

| Event                            | Meaning                                                      |
| -------------------------------- | ------------------------------------------------------------ |
| `PROVIDER_READY`                 | Ready to evaluate.                                           |
| `PROVIDER_ERROR`                 | The provider signaled an error.                              |
| `PROVIDER_CONFIGURATION_CHANGED` | The backend flag configuration changed.                      |
| `PROVIDER_STALE`                 | Cached state may be out of date.                             |
| `PROVIDER_RECONCILING`           | Context changed and not yet reconciled; static context only. |
| `PROVIDER_CONTEXT_CHANGED`       | Context changed and reconciled; static context only.         |

- Providers signal events with a payload of `flags changed`, `message`, `error code` and `event metadata` (5.1.1; types). `PROVIDER_ERROR` should set the error message and code (5.1.4, 5.1.5).
- Handlers on the API and on the associated clients run; handlers on clients of other providers do not (5.1.2, 5.1.3).
- The API and clients register and remove handlers per event type (5.2.1, 5.2.2, 5.2.7). Handlers receive event details including the provider name (5.2.3, 5.2.4).
- A failing handler does not stop other handlers (5.2.5). Handlers persist across provider changes (5.2.6).
- A handler attached when the provider is already in the matching state runs immediately (5.3.3).
- The SDK updates the provider status before invoking handlers, so handlers see a consistent status (5.3.5).
- Static context: `RECONCILING` handlers run while `on context changed` executes; `PROVIDER_CONTEXT_CHANGED` or `PROVIDER_ERROR` handlers run when it ends, if no other invocation is still pending (5.3.4.1 to 5.3.4.3).

## Example provider shape

```ts
type ResolutionDetails<T> = {
  value: T;
  variant?: string;
  reason?: string;
  errorCode?: string;
  errorMessage?: string;
  flagMetadata?: Record<string, boolean | string | number>;
};

type EvaluationContext = { targetingKey?: string } & Record<string, unknown>;

type ProviderEvent =
  | "PROVIDER_READY"
  | "PROVIDER_ERROR"
  | "PROVIDER_CONFIGURATION_CHANGED"
  | "PROVIDER_STALE";

class FlagFileError extends Error {
  constructor(
    readonly errorCode: "FLAG_NOT_FOUND" | "TYPE_MISMATCH",
    message: string,
  ) {
    super(message);
  }
}

class StaticFileProvider {
  readonly metadata = { name: "static-file" };
  private flags = new Map<string, unknown>();

  constructor(
    private readonly load: () => Promise<Record<string, unknown>>,
    private readonly emit: (
      event: ProviderEvent,
      details?: { message?: string; errorCode?: string },
    ) => void,
  ) {}

  async initialize(_context?: EvaluationContext): Promise<void> {
    try {
      this.flags = new Map(Object.entries(await this.load()));
      this.emit("PROVIDER_READY");
    } catch (error) {
      this.emit("PROVIDER_ERROR", {
        message: String(error),
        errorCode: "GENERAL",
      });
      throw error;
    }
  }

  resolveBooleanEvaluation(
    flagKey: string,
    _defaultValue: boolean,
  ): ResolutionDetails<boolean> {
    if (!this.flags.has(flagKey)) {
      throw new FlagFileError(
        "FLAG_NOT_FOUND",
        `Flag '${flagKey}' was not found`,
      );
    }
    const value = this.flags.get(flagKey);
    if (typeof value !== "boolean") {
      throw new FlagFileError(
        "TYPE_MISMATCH",
        `Flag '${flagKey}' is not a boolean`,
      );
    }
    return { value, reason: "STATIC", variant: String(value) };
  }

  async shutdown(): Promise<void> {
    this.flags.clear();
  }
}
```

The provider throws with an error code on abnormal execution (2.2.7); the SDK, not the provider, turns that into the default value for the application (1.4.10). Emitting events before `initialize` returns follows 2.8.2 and 2.8.3.
