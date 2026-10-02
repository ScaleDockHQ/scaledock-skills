# Evaluation API

Sources: Flag Evaluation API (section 1), Types and Data Structures, and Glossary, OpenFeature specification v0.9.0. Requirement numbers are cited in parentheses.

## Paradigms

| Paradigm        | Typical use                                       | Context                                                                                                       |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Dynamic context | Server-side; evaluations on behalf of many users. | Static context at start, plus dynamic context with each request or event.                                     |
| Static context  | Client-side; a single user.                       | Flags are evaluated in bulk for one context, cached, and evaluated against the cache without passing context. |

Several requirements differ by paradigm: the static-context client takes no evaluation context on its methods (1.3.2.1, 3.2.2.2) and has the extra `RECONCILING` status (1.7.2.1).

## The API

- The API and its state should be a global singleton (1.1.1).
- A **provider mutator** sets the default provider (1.1.2.1). It runs `initialize` on the new provider before use, passing the bound domain if any (1.1.2.2), and `shutdown` on the provider it replaces (1.1.2.3). The API should offer a variant that waits for initialization and its lifecycle event (1.1.2.4).
- A provider can be bound to one or more clients by **domain**; binding a domain again overwrites the mapping (1.1.3). A client with a domain uses that domain's provider if one exists, otherwise the default provider (1.1.6). Binding is dynamic: a client on an unbound domain moves to a provider later assigned to that domain (glossary, Domain).
- A provider that declares itself domain-scoped must not be bound to more than one domain (1.1.8.1).
- The API adds hooks without removing earlier ones (1.1.4) and exposes the provider metadata (1.1.5).
- `shutdown` propagates to all providers (1.6.1) and resets API state: hooks, event handlers, evaluation context, transaction context propagators and providers (1.6.2).
- **Isolated API instances** (Experimental, 1.8): a factory creates independent instances with the full API contract, ideally from a separate module; a provider instance should not be registered with more than one API instance (1.8.1 to 1.8.4).

## Clients

- Client creation must not throw (1.1.7). Clients add hooks (1.2.1) and expose metadata with an immutable `domain` (1.2.2).
- Typed evaluation for boolean, number, string and structure takes `flag key` and `default value`, then evaluation context (dynamic context only) and evaluation options; it returns the value (1.3.1.1, 1.3.2.1). Languages with separate integer and float types should offer both (1.3.3.1).
- The returned value should be of the expected type; a mismatched provider value is abnormal execution and the default is returned (1.3.4).
- Detailed evaluation methods take the same parameters and return **evaluation details** (1.4.1.1, 1.4.2.1).
- Client operations must not throw; evaluation returns the default value on abnormal execution. Configuration and setup functions are exempt (1.4.10).
- Client operations should not write log messages (1.4.11) and should offer asynchronous or non-blocking evaluation (1.4.12).
- Evaluation options carry `hooks`, run for that evaluation in addition to configured hooks, and `hook hints` (1.5.1; types, Evaluation Options).
- Each client exposes a `provider status`: `NOT_READY`, `READY`, `STALE`, `ERROR` or `FATAL`, plus `RECONCILING` in the static-context paradigm (1.7.1, 1.7.2.1). It shows `READY` after `PROVIDER_READY`, `ERROR` after `PROVIDER_ERROR`, `FATAL` after `PROVIDER_ERROR` with code `PROVIDER_FATAL`, and `NOT_READY` once shutdown ends (1.7.3 to 1.7.6).

## Evaluation details

| Field           | Rule                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| `flag key`      | The key passed in (1.4.5).                                                                                         |
| `value`         | The evaluated value (1.4.3).                                                                                       |
| `variant`       | The provider's variant on normal execution, if set (1.4.6).                                                        |
| `reason`        | The provider's reason on normal execution, if set (1.4.7); should indicate an error on abnormal execution (1.4.9). |
| `error code`    | Set on abnormal execution (1.4.8).                                                                                 |
| `error message` | May describe the error (1.4.13).                                                                                   |
| `flag metadata` | The provider's flag metadata, or an empty record (1.4.14); immutable where the language allows (1.4.15.1).         |

Details beyond the value are best effort, since not all providers can supply them (1.4, note).

### Reasons

`STATIC`, `DEFAULT`, `TARGETING_MATCH`, `SPLIT`, `CACHED`, `DISABLED`, `UNKNOWN`, `STALE`, `ERROR`, or any other string (types, Resolution Reason).

### Error codes

| Code                    | Meaning                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `PROVIDER_NOT_READY`    | Resolved before the provider was initialized.               |
| `FLAG_NOT_FOUND`        | The flag could not be found.                                |
| `PARSE_ERROR`           | Data such as a flag configuration could not be parsed.      |
| `TYPE_MISMATCH`         | The flag value type does not match the expected type.       |
| `TARGETING_KEY_MISSING` | The provider needs a targeting key and none was provided.   |
| `INVALID_CONTEXT`       | The evaluation context does not meet provider requirements. |
| `PROVIDER_FATAL`        | The provider is in an irrecoverable error state.            |
| `GENERAL`               | Any other reason.                                           |

## Example

A framework-neutral TypeScript shape of the API surface, not a specific SDK:

```ts
type ErrorCode =
  | "PROVIDER_NOT_READY"
  | "FLAG_NOT_FOUND"
  | "PARSE_ERROR"
  | "TYPE_MISMATCH"
  | "TARGETING_KEY_MISSING"
  | "INVALID_CONTEXT"
  | "PROVIDER_FATAL"
  | "GENERAL";

type FlagMetadata = Record<string, boolean | string | number>;

type EvaluationDetails<T> = {
  flagKey: string;
  value: T;
  variant?: string;
  reason?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
  flagMetadata: Readonly<FlagMetadata>;
};

type EvaluationContext = { targetingKey?: string } & Record<string, unknown>;

interface Client {
  getBooleanValue(
    flagKey: string,
    defaultValue: boolean,
    context?: EvaluationContext,
  ): Promise<boolean>;
  getBooleanDetails(
    flagKey: string,
    defaultValue: boolean,
    context?: EvaluationContext,
  ): Promise<EvaluationDetails<boolean>>;
}

async function showNewCheckout(
  client: Client,
  userId: string,
): Promise<boolean> {
  const details = await client.getBooleanDetails("new-checkout", false, {
    targetingKey: userId,
  });
  // details.value is the default (false) whenever details.errorCode is set.
  return details.value;
}
```
