# Consuming Standard Schemas

A consumer is any tool that accepts a user's schema: a form library, a router, an RPC framework, an MCP tool registry, an environment-variable loader. Citations name the interface member in `@standard-schema/spec` 1.1.0 or the FAQ question on the spec page.

## Add the types

Either copy the interfaces into your code, or install the package and import it with `import type` (FAQ "Do I need to add `@standard-schema/spec` as a dependency?"). The package contains no runtime code.

If `StandardSchemaV1` appears in your public API, install it as a regular dependency, not a dev dependency, so it is present in production installs (FAQ "Can I add it as a dev dependency?").

```bash
npm install @standard-schema/spec
```

## Validate, with async support

This is the official integration example (`packages/examples/integrate.ts` at tag `v1.1.0`):

```ts
import type { StandardSchemaV1 } from "@standard-schema/spec";

export async function standardValidate<T extends StandardSchemaV1>(
  schema: T,
  input: StandardSchemaV1.InferInput<T>,
): Promise<StandardSchemaV1.InferOutput<T>> {
  let result = schema["~standard"].validate(input);
  if (result instanceof Promise) result = await result;

  // if the `issues` field exists, the validation failed
  if (result.issues) {
    throw new Error(JSON.stringify(result.issues, null, 2));
  }

  return result.value;
}
```

Points to keep:

- The generic `T extends StandardSchemaV1` preserves the caller's schema type, so `InferInput<T>` and `InferOutput<T>` give exact types.
- Success is detected by a falsy `issues`, as the `SuccessResult` comment states ("A falsy value for `issues` indicates success"). Do not test `value` instead: `Output` is generic, so a valid output can itself be `undefined` or another falsy value.
- For untrusted data, type the input parameter as `unknown`; `validate` accepts `unknown` (`StandardSchemaV1.Props.validate`).

## Sync-only consumers

If your API cannot await, throw when `validate` returns a `Promise` (FAQ "How to only allow synchronous validation?"):

```ts
import type { StandardSchemaV1 } from "@standard-schema/spec";

export function validateSync<T extends StandardSchemaV1>(
  schema: T,
  data: unknown,
): StandardSchemaV1.Result<StandardSchemaV1.InferOutput<T>> {
  const result = schema["~standard"].validate(data);
  if (result instanceof Promise) {
    throw new TypeError("Schema validation must be synchronous");
  }
  return result;
}
```

Document this restriction: the spec allows `validate` to return a `Promise`, so a schema that validates asynchronously is still compliant, and your tool will reject it.

## Normalize issue paths

A path segment is either a `PropertyKey` or an object `{ key }` (`StandardSchemaV1.Issue`, `StandardSchemaV1.PathSegment`). Normalize both forms before you display or serialize them:

```ts
import type { StandardSchemaV1 } from "@standard-schema/spec";

export function issueKeys(issue: StandardSchemaV1.Issue): PropertyKey[] {
  return (issue.path ?? []).map((segment) =>
    typeof segment === "object" ? segment.key : segment,
  );
}

export function toJsonPointer(issue: StandardSchemaV1.Issue): string {
  return issueKeys(issue)
    .map((key) =>
      String(typeof key === "symbol" ? (key.description ?? "") : key),
    )
    .map((key) => "/" + key.replace(/~/g, "~0").replace(/\//g, "~1"))
    .join("");
}
```

The escaping of `~` and `/` follows JSON Pointer (RFC 6901), which is what an RFC 9457 `errors[].pointer` member in the RFC's own example uses. A missing or empty `path` refers to the root value.

## Issues in an HTTP response

RFC 9457 § 3 shows a validation problem with an `errors` extension: an array of objects with `detail` and a JSON Pointer `pointer`. Standard Schema issues map onto it directly:

```ts
import type { StandardSchemaV1 } from "@standard-schema/spec";

export function validationProblem(
  issues: ReadonlyArray<StandardSchemaV1.Issue>,
) {
  return {
    type: "https://api.example.com/problems/validation-error",
    title: "Your request is not valid.",
    status: 422,
    errors: issues.map((issue) => ({
      detail: issue.message,
      pointer: "#" + toJsonPointer(issue),
    })),
  };
}
```

The type URI is illustrative. See the `problem-details` skill for the response rules.

## Inference without validation

Tools that only need types can accept `StandardTypedV1` and use `StandardTypedV1.InferInput` and `StandardTypedV1.InferOutput` (`StandardTypedV1`). Both `StandardSchemaV1` and `StandardJSONSchemaV1` extend it.

## Do not

- Do not branch on `vendor` to change behavior; the point of the spec is that tools need no library-specific logic (Standard Schema introduction).
- Do not rely on `libraryOptions` having an effect: it is vendor-specific and was added in 1.1.0 (`StandardSchemaV1.Options`; see [`interface.md`](interface.md)).
- Do not read `~standard.types` at runtime; it exists for type inference.
