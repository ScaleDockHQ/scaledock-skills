# Standard JSON Schema

Standard JSON Schema is a common interface for entities that are, or can be converted to, JSON Schema. It ships in `@standard-schema/spec` from 1.1.0 alongside Standard Schema. Citations name the interface member in `@standard-schema/spec` 1.1.0 or the FAQ question on the Standard JSON Schema page.

## Why it exists

Tools need JSON Schema for API documentation such as OpenAPI, AI tool inputs and structured outputs, form generation and code generation. Converting a schema to JSON Schema used to lose its inferred TypeScript types; this interface keeps them (Standard JSON Schema "Motivation").

## The interface

```ts
/** The Standard JSON Schema interface. */
export interface StandardJSONSchemaV1<Input = unknown, Output = Input> {
  /** The Standard JSON Schema properties. */
  readonly "~standard": StandardJSONSchemaV1.Props<Input, Output>;
}

export declare namespace StandardJSONSchemaV1 {
  /** The Standard JSON Schema properties interface. */
  export interface Props<
    Input = unknown,
    Output = Input,
  > extends StandardTypedV1.Props<Input, Output> {
    /** Methods for generating the input/output JSON Schema. */
    readonly jsonSchema: StandardJSONSchemaV1.Converter;
  }

  /** The Standard JSON Schema converter interface. */
  export interface Converter {
    /** Converts the input type to JSON Schema. May throw if conversion is not supported. */
    readonly input: (
      options: StandardJSONSchemaV1.Options,
    ) => Record<string, unknown>;
    /** Converts the output type to JSON Schema. May throw if conversion is not supported. */
    readonly output: (
      options: StandardJSONSchemaV1.Options,
    ) => Record<string, unknown>;
  }

  /**
   * The target version of the generated JSON Schema.
   *
   * It is *strongly recommended* that implementers support `"draft-2020-12"` and `"draft-07"`, as they are both in wide use. All other targets can be implemented on a best-effort basis. Libraries should throw if they don't support a specified target.
   *
   * The `"openapi-3.0"` target is intended as a standardized specifier for OpenAPI 3.0 which is a superset of JSON Schema `"draft-04"`.
   */
  export type Target =
    | "draft-2020-12"
    | "draft-07"
    | "openapi-3.0"
    // Accepts any string: allows future targets while preserving autocomplete
    | ({} & string);

  /** The options for the input/output methods. */
  export interface Options {
    /** Specifies the target version of the generated JSON Schema. Support for all versions is on a best-effort basis. If a given version is not supported, the library should throw. */
    readonly target: Target;

    /** Explicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }

  /** The Standard types interface. */
  export interface Types<
    Input = unknown,
    Output = Input,
  > extends StandardTypedV1.Types<Input, Output> {}

  /** Infers the input type of a Standard. */
  export type InferInput<Schema extends StandardTypedV1> =
    StandardTypedV1.InferInput<Schema>;

  /** Infers the output type of a Standard. */
  export type InferOutput<Schema extends StandardTypedV1> =
    StandardTypedV1.InferOutput<Schema>;
}
```

`StandardTypedV1` is in [`interface.md`](interface.md).

## Targets

| Target           | Meaning                                                                                             | Support                                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `draft-2020-12`  | JSON Schema draft 2020-12                                                                           | Strongly recommended (`StandardJSONSchemaV1.Target`)                                                                                                 |
| `draft-07`       | JSON Schema draft-07                                                                                | Strongly recommended (`StandardJSONSchemaV1.Target`)                                                                                                 |
| `openapi-3.0`    | The OpenAPI 3.0 schema dialect, a superset of JSON Schema draft-04 with keywords such as `nullable` | Best effort (`StandardJSONSchemaV1.Target`; FAQ "What's `"openapi-3.0"`?")                                                                           |
| any other string | Future or library-specific targets                                                                  | Best effort; the type is widened with `{} & string` so new targets stay assignable (FAQ "Does the spec account for future versions of JSON Schema?") |

A library should throw when asked for a target it does not support (`StandardJSONSchemaV1.Options`). Supporting several targets is encouraged but not required (FAQ "Why multiple `target` values?").

## Input versus output

Schemas that transform data have different input and output types, for example a string `"123"` in and a number `123` out. `jsonSchema.input` describes what the schema accepts; `jsonSchema.output` describes what validation produces. When the two types are identical, both return the same schema (FAQ "Why both `jsonSchema.input` and `jsonSchema.output`?").

Choose deliberately:

- Request bodies, tool inputs and form fields describe what a client sends: use `input`.
- Response bodies and structured outputs describe what your code returns after parsing: use `output`.

## Errors

Both methods may throw when the entity cannot be converted, or cannot be represented soundly as JSON Schema. Integrating tools should account for this (`StandardJSONSchemaV1.Converter`; FAQ "What about error handling?").

## Consuming

From the official example (`packages/examples/json-integrate.ts` at tag `v1.1.0`), with error handling added:

```ts
import type { StandardJSONSchemaV1 } from "@standard-schema/spec";

export function toJsonSchema(
  schema: StandardJSONSchemaV1,
  direction: "input" | "output",
): Record<string, unknown> | undefined {
  try {
    return schema["~standard"].jsonSchema[direction]({
      target: "draft-2020-12",
    });
  } catch {
    return undefined;
  }
}
```

Decide what `undefined` means for your tool: skip the schema, fall back to `{}`, or fail the build.

## Combining with Standard Schema

The two specs are orthogonal: `StandardSchemaV1` validates, `StandardJSONSchemaV1` converts, and an object may implement one or both (FAQ "What's the relationship between this and Standard Schema?", "Why is this a separate spec instead of adding to `StandardSchemaV1`?"). To require both, merge the `Props` interfaces (FAQ "What if I want to accept only schemas that implement both?"):

```ts
import type {
  StandardJSONSchemaV1,
  StandardSchemaV1,
} from "@standard-schema/spec";

export interface CombinedProps<Input = unknown, Output = Input>
  extends
    StandardSchemaV1.Props<Input, Output>,
    StandardJSONSchemaV1.Props<Input, Output> {}

export interface CombinedSpec<Input = unknown, Output = Input> {
  "~standard": CombinedProps<Input, Output>;
}
```

## Implementing

Libraries either expose `~standard.jsonSchema` on the schema itself, or, for bundle size, provide a function whose result implements the interface (Standard JSON Schema "What schema libraries support this spec?"). The official example (`packages/examples/json-implement.ts`) adds the `$schema` keyword for the requested target and throws otherwise:

```ts
jsonSchema: {
  input(params) {
    const schema: Record<string, unknown> = { type: "string" };
    if (params.target === "draft-2020-12") {
      schema.$schema = "https://json-schema.org/draft/2020-12/schema";
    } else if (params.target === "draft-07") {
      schema.$schema = "http://json-schema.org/draft-07/schema#";
    } else {
      throw new Error(`Unsupported target: ${params.target}`);
    }
    return schema;
  },
  output(params) {
    return this.input(params);
  },
},
```

## OpenAPI

OpenAPI 3.0 has its own schema format, a superset of JSON Schema draft-04 with extra keywords such as `nullable`; the `openapi-3.0` target exists for it (FAQ "What's `"openapi-3.0"`?"). Which target a given OpenAPI version needs, and where the generated schemas go in the document, is covered by the `openapi` skill.
