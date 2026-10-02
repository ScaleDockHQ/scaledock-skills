# Evaluation context, hooks, tracking and telemetry

Sources: Evaluation Context (section 3), Hooks (section 4), Tracking (section 6) and Appendix D: Observability, OpenFeature specification v0.9.0. Requirement numbers are cited in parentheses.

## Evaluation context

The evaluation context is ambient data for targeting: rules, per-subject overrides and fractional evaluation (3, Overview).

- An optional string `targeting key` identifies the subject of the evaluation (3.1.1). Fractional evaluation, such as a 50/50 split, pseudorandomly resolves values using a context property such as the targeting key (glossary).
- Custom fields have string keys and values of type boolean, string, number, datetime or structure (3.1.2). Fields can be fetched by key or all together (3.1.3), and keys are unique (3.1.4). Field casing follows language idioms.
- Dynamic context: the API, the client and each invocation accept context (3.2.1.1).
- Static context: the API sets a global context and a per-domain context; clients and invocations do not accept context (3.2.2.1 to 3.2.2.4). Setting the context runs the provider's `on context changed`, only on the associated provider when set per domain (3.2.4.1, 3.2.4.2).

### Merge order (3.2.3)

API (global, lowest) -> transaction -> client -> invocation -> before hooks (highest). Later levels overwrite duplicate fields. Not every level exists in every paradigm.

### Transaction context propagation (Experimental, 3.3)

Transaction context holds per-transaction context, such as user ID, user agent or IP, and applies it to every evaluation within a request or thread. Dynamic-context SDKs should let the API set a **transaction context propagator** (3.3.1.1); a propagator sets and gets the current transaction's context (3.3.1.2.1 to 3.3.1.2.3). Static-context SDKs must not have one (3.3.2.1).

```ts
import { AsyncLocalStorage } from "node:async_hooks";

type EvaluationContext = { targetingKey?: string } & Record<string, unknown>;

const storage = new AsyncLocalStorage<EvaluationContext>();

export const transactionContext = {
  get: (): EvaluationContext => storage.getStore() ?? {},
  run: <T>(context: EvaluationContext, fn: () => T): T =>
    storage.run(context, fn),
};

// In a request handler:
// transactionContext.run({ targetingKey: user.id, ipAddress: clientIp }, () => handle(request));
```

This mirrors the AsyncLocalStorage example in section 3.3; wire it to the SDK's propagator interface.

## Hooks

Hooks add behavior at four stages: `before` (immediately before evaluation), `after` (after success), `error` (after failure) and `finally` (unconditionally) (4, Overview). A hook specifies at least one stage (4.3.1).

| Stage     | Parameters                                   | Returns                                                                                                   |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `before`  | hook context, hook hints                     | Dynamic context: an evaluation context or nothing (4.3.2.1). Static context: nothing (4.3.3.1).           |
| `after`   | hook context, evaluation details, hook hints | Nothing (4.3.6).                                                                                          |
| `error`   | hook context, exception, hook hints          | Nothing; runs on errors in `before`, `after` or resolution (4.3.7).                                       |
| `finally` | hook context, evaluation details, hook hints | Nothing; runs after the other stages (4.3.8). Named `finallyAfter` where `finally` is reserved (4.3.9.1). |

- **Hook context** provides the flag key, flag value type, evaluation context, default value and hook data (4.1.1), and should give client and provider metadata (4.1.2). Key, type and default are immutable (4.1.3); in dynamic context the evaluation context is mutable only in `before` (4.1.4.1).
- Context returned by a `before` hook is passed to later `before` hooks and then merged (4.3.4, 4.3.5).
- **Hook hints** come from evaluation options, are passed to each hook and must not be altered (4.5.1 to 4.5.3); keys are strings and values boolean, string, number, datetime or structure (4.2.1).
- **Hook data** is a mutable per-hook, per-evaluation structure with string keys and values of any type, shared across that hook's stages but not between hooks (4.1.5, 4.3.2, 4.6.1). Use it, for example, to carry a span from `before` to `finally`.

### Registration and ordering

- The API, client, provider and invocation can register hooks (4.4.1).
- `before`: API -> client -> invocation -> provider, each in order added. `after`, `error`, `finally`: provider -> invocation -> client -> API, each in reverse order added (4.4.2).
- An error in `before` or `after` runs the `error` hooks (4.4.5) and skips the remaining hooks of that stage (4.4.6); an error in `before` returns the default value (4.4.7).
- A failing `error` or `finally` hook does not stop the remaining hooks of that stage or the evaluation (4.4.3, 4.4.4).

## Tracking (Experimental, section 6)

Tracking links flag evaluations to later user actions or application states, for experimentation (6, Overview).

- The client defines `track(eventName, context?, details?)` in dynamic context, or `track(eventName, details?)` in static context, returning nothing (6.1.1.1, 6.1.2.1).
- The context passed to the provider merges API -> transaction -> client -> invocation (6.1.3).
- If the provider does not implement tracking, `track` is a no-op (6.1.4).
- Tracking event details have an optional numeric `value` and custom fields of type boolean, string, number or structure (6.2.1, 6.2.2).

## Telemetry mapping (Appendix D)

For hooks that emit OpenTelemetry feature flag event records:

| Attribute                     | Source                                            | Level                  |
| ----------------------------- | ------------------------------------------------- | ---------------------- |
| `feature_flag.key`            | flag key                                          | Required               |
| `feature_flag.result.variant` | variant                                           | Conditionally Required |
| `feature_flag.result.value`   | value                                             | Conditionally Required |
| `feature_flag.result.reason`  | reason                                            | Recommended            |
| `error.type`                  | error code                                        | Conditionally Required |
| `error.message`               | error message                                     | Conditionally Required |
| `feature_flag.context.id`     | flag metadata `contextId`, else the targeting key | Recommended            |
| `feature_flag.set.id`         | flag metadata `flagSetId`                         | Recommended            |
| `feature_flag.version`        | flag metadata `version`                           | Recommended            |
| `feature_flag.provider.name`  | provider metadata `name`                          | Recommended            |

- Convert error codes and reasons to lowercase snake_case for OpenTelemetry.
- Span events are the recommended emission pattern; event logging and standalone spans (named `feature_flag.evaluation`, created in `before`) are alternatives. Emit the record in `finally`.
- Flag values can be large or sensitive: make inclusion configurable and support redaction and size limits.
- Telemetry hooks should never throw in a way that interrupts evaluation.
