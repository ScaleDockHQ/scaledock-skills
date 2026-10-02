# Implementing Standard Schema in a schema library

Citations name the interface member in `@standard-schema/spec` 1.1.0, the spec page section, or the official examples in `packages/examples` at tag `v1.1.0`.

## What to add

Add a `~standard` property to every schema. The interface is structural, so any value whose `~standard` property has the right shape satisfies it. Declare your schema type as extending `StandardSchemaV1`, as the official example does, or check values with `satisfies`, so the compiler confirms agreement with the interface.

The official example (`packages/examples/implement.ts`):

```ts
import type { StandardSchemaV1 } from "@standard-schema/spec";

// Step 1: Define the schema interface
interface StringSchema extends StandardSchemaV1<string> {
  type: "string";
  message: string;
}

// Step 2: Implement the schema interface
function string(message = "Invalid type"): StringSchema {
  return {
    type: "string",
    message,
    "~standard": {
      version: 1,
      vendor: "valizod",
      validate(value) {
        return typeof value === "string"
          ? { value }
          : { issues: [{ message, path: [] }] };
      },
    },
  };
}
```

## Rules

- `version` is the literal `1`; `vendor` is your library's name (`StandardTypedV1.Props`).
- `validate` receives `unknown` and returns `{ value }` on success or `{ issues }` on failure (`StandardSchemaV1.Props.validate`, `StandardSchemaV1.Result`).
- Each issue has a `message`; add a `path` of keys or `{ key }` segments when the issue is inside a nested value (`StandardSchemaV1.Issue`).
- Validate synchronously whenever possible; return a `Promise` only when the schema needs it, because some consumers reject async results (FAQ "How to only allow synchronous validation?").
- Accept `options.libraryOptions` for any vendor-specific parameters rather than adding arguments (`StandardSchemaV1.Options`).
- Set the `Input` and `Output` type parameters so `InferInput` and `InferOutput` work for consumers. `types` itself can stay absent at runtime (`StandardTypedV1.Types`).
- Implement `~standard.validate` in terms of your existing validation functions, so the spec costs only a few lines (Standard Schema "Design goals": minimal).

## Packaging

The interface is types only. Copy it into your library or depend on `@standard-schema/spec` (FAQ "Do I need to add `@standard-schema/spec` as a dependency?"). If your public types reference it, it must be a regular dependency (FAQ "Can I add it as a dev dependency?").

## JSON Schema as well

To let tools generate JSON Schema from your schemas, also implement `StandardJSONSchemaV1`. See [`json-schema.md`](json-schema.md).

## Getting listed

The spec page invites maintainers of implementing libraries to open a pull request against the repository to add themselves to the implementer table (Standard Schema "What schema libraries implement the spec?").
