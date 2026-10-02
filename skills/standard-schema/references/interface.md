# The v1 interfaces

Copied from `packages/spec/src/index.ts` at tag `v1.1.0`, which is the same file on `main` as of 2026-10-02. The spec pages say libraries may copy the code verbatim or import it from `@standard-schema/spec` on npm or JSR, and that there will be no breaking changes without a major version bump (Standard Schema FAQ "Do I need to add `@standard-schema/spec` as a dependency?").

## Three interfaces, one property

| Interface              | Adds                         | Purpose                                                    |
| ---------------------- | ---------------------------- | ---------------------------------------------------------- |
| `StandardTypedV1`      | `version`, `vendor`, `types` | The base that the other two extend.                        |
| `StandardSchemaV1`     | `validate`                   | Validate unknown input and return a typed value or issues. |
| `StandardJSONSchemaV1` | `jsonSchema`                 | Convert the schema's input or output type to JSON Schema.  |

Each puts its members under the single `~standard` property. The design goals give the reasons: one property avoids conflicts with a library's own API, and the tilde sorts it after alphanumeric names in editor autocompletion (Standard Schema "Design goals" and FAQ "Why did you prefix the `~standard` property with `~`?"). A symbol key was rejected because inline symbols collapse to the plain `symbol` type in TypeScript (FAQ "Why not use a symbol key?").

## StandardTypedV1

```ts
/** The Standard Typed interface. This is a base type extended by other specs. */
export interface StandardTypedV1<Input = unknown, Output = Input> {
  /** The Standard properties. */
  readonly "~standard": StandardTypedV1.Props<Input, Output>;
}

export declare namespace StandardTypedV1 {
  /** The Standard Typed properties interface. */
  export interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }

  /** The Standard Typed types interface. */
  export interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }

  /** Infers the input type of a Standard Typed. */
  export type InferInput<Schema extends StandardTypedV1> = NonNullable<
    Schema["~standard"]["types"]
  >["input"];

  /** Infers the output type of a Standard Typed. */
  export type InferOutput<Schema extends StandardTypedV1> = NonNullable<
    Schema["~standard"]["types"]
  >["output"];
}
```

- `version` is the literal `1`.
- `vendor` names the schema library. Nothing in the spec gives it behavior; treat every vendor alike.
- `types` exists only so external tools can extract the inferred types (Standard Schema "Design goals"). At runtime it is usually absent.

## StandardSchemaV1

```ts
/** The Standard Schema interface. */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
}

export declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  export interface Props<
    Input = unknown,
    Output = Input,
  > extends StandardTypedV1.Props<Input, Output> {
    /** Validates unknown input values. */
    readonly validate: (
      value: unknown,
      options?: StandardSchemaV1.Options | undefined,
    ) => Result<Output> | Promise<Result<Output>>;
  }

  /** The result interface of the validate function. */
  export type Result<Output> = SuccessResult<Output> | FailureResult;

  /** The result interface if validation succeeds. */
  export interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** A falsy value for `issues` indicates success. */
    readonly issues?: undefined;
  }

  export interface Options {
    /** Explicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }

  /** The result interface if validation fails. */
  export interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }

  /** The issue interface of the failure output. */
  export interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }

  /** The path segment interface of the issue. */
  export interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
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

### The validate result

| Case    | Shape                                               | How to detect               |
| ------- | --------------------------------------------------- | --------------------------- |
| Success | `{ value: Output }`, `issues` absent or `undefined` | `!result.issues`            |
| Failure | `{ issues: readonly Issue[] }`                      | `result.issues` is truthy   |
| Async   | a `Promise` of either                               | `result instanceof Promise` |

- `value` is the output, which may differ from the input when the schema transforms data. That is why `Input` and `Output` are separate type parameters.
- `validate` accepts `unknown`, so it can be called on untrusted data directly.
- `PropertyKey` is `string | number | symbol`, so a path segment can be a symbol. Convert before serializing.
- `Issue` has no code or severity field; `message` is the only required member.

## StandardJSONSchemaV1

The full interface and its rules are in [`json-schema.md`](json-schema.md).

## Version history

- `1.0.0`, published to npm on 2025-01-27: `StandardSchemaV1` only, with `validate(value)` taking a single argument. The package changelog dates the release January 26, 2025.
- `1.1.0`, published to npm on 2025-12-15: adds `StandardTypedV1` as the shared base, `StandardJSONSchemaV1`, and the optional second argument `validate(value, options?)` with `StandardSchemaV1.Options` (`libraryOptions`). `StandardSchemaV1.Props` now extends `StandardTypedV1.Props`; the other members are unchanged. The package changelog at tag `v1.1.0` has no 1.1.0 entry, so this summary comes from comparing `src/index.ts` at tags `v1.0.0` and `v1.1.0`.

A library built against 1.0.0 still satisfies the 1.1.0 `StandardSchemaV1` type, because a function with fewer parameters is assignable to one with more. It will ignore `options`, so a consumer cannot rely on `libraryOptions` having any effect.
