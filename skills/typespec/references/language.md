# TypeSpec language basics

Read this when modeling data or operations. Source: the Language basics overview, plus the OpenAPI v3 emitter guide for how each construct is emitted.

## Declarations, imports and namespaces

Declaration names are unique within a scope across kinds; `model Dog {}` and `namespace Dog {}` together are an error.

| Feature                | Example                      |
| ---------------------- | ---------------------------- |
| Import a TypeSpec file | `import "./models.tsp";`     |
| Import a library       | `import "@typespec/http";`   |
| File namespace         | `namespace PetStore;`        |
| Nested namespace       | `namespace PetStore.Models;` |
| Use a namespace        | `using PetStore.Models;`     |

The first file-level `namespace X;` needs no braces; namespaces declared inside it do (Getting started, Organizing with Namespaces).

## Decorators and documentation

| Feature                                   | Example                                                               |
| ----------------------------------------- | --------------------------------------------------------------------- |
| Decorator                                 | `@tag("abc")`                                                         |
| Augment decorator, applied from elsewhere | `@@tag(MyType, "abc");`                                               |
| Doc comment                               | `/** Retrieves a user. */`, equivalent to `@doc("Retrieves a user.")` |
| Parameter doc                             | `@param id The user's identifier.` inside the doc comment             |
| Summary                                   | `@summary("Get a user")`                                              |
| Deprecation                               | `#deprecated "Use getUser instead"`                                   |

## Types

| Feature                         | Example                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------- |
| Scalar                          | `scalar Password extends string;`                                             |
| Model                           | `model Pet { name: string; owner?: string; }`                                 |
| Default value                   | `model Dog { name?: string = "Rex" }`                                         |
| Inheritance                     | `model Dog extends Pet {}`                                                    |
| Spread                          | `model Dog { ...Animal }`                                                     |
| Copy                            | `model ShippingDetails is Address { zipCode: string; }`                       |
| Template                        | `model Page<T> { items: T[]; nextLink?: url; }`                               |
| Template default and constraint | `model Response<T extends string = ""> { value: T }`                          |
| Enum                            | `enum Direction { Up: "up", Down: "down" }`                                   |
| Enum composition                | `enum Direction2D { ...Direction, Left, Right }`                              |
| Union                           | `"cat" \| "dog"` or `union Pet { cat: Cat, dog: Dog }`                        |
| Intersection                    | `Pet & Animal`                                                                |
| Alias                           | `alias Options = "one" \| "two";`                                             |
| Literals                        | `"text"`, a multi-line string between `"""` delimiters, `10`, `10.0`, `false` |

## Operations and interfaces

| Feature                 | Example                                       |
| ----------------------- | --------------------------------------------- |
| Operation               | `op health(): HealthStatus;`                  |
| Multiple return types   | `op health(): HealthStatus \| ErrorResponse;` |
| Operation template      | `op getter<T>(id: string): T;`                |
| Operation from template | `op getPet is getter<Pet>;`                   |
| Interface               | `interface PetStore { list(): Pet[]; }`       |
| Interface composition   | `interface PetStore extends Store {}`         |
| Interface template      | `interface Restful<T> { list(): T[]; }`       |

## How constructs reach OpenAPI (OpenAPI v3 emitter guide)

| TypeSpec                                          | OpenAPI                                                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------- |
| Named model                                       | Schema in `components/schemas`.                                                  |
| Inline model or template instance                 | Inline schema, unless the template instance has `@friendlyName`.                 |
| `extends`                                         | `allOf` referencing the base schema.                                             |
| `@discriminator("kind")` on a base model          | A discriminator with a mapping to the derived schemas.                           |
| Spread or `is`                                    | A flat, independent schema.                                                      |
| Union                                             | `anyOf`; `oneOf` with `@oneOf` on a named union.                                 |
| Enum or union of literals                         | `enum`; `oneOf` of `const` with `enum-strategy: annotated` on 3.1 and later.     |
| `int32`, `int64`                                  | `integer` with format `int32`, `int64`.                                          |
| `float32`, `float64`                              | `number` with format `float`, `double`.                                          |
| `bytes`                                           | `string` with format `byte` for JSON or text, `binary` for binary content types. |
| `plainDate`                                       | `string`, format `date`.                                                         |
| `utcDateTime`, `offsetDateTime`                   | `string`, format `date-time`.                                                    |
| `@minValue`, `@maxValue`                          | `minimum`, `maximum`.                                                            |
| `@format`, `@minLength`, `@maxLength`, `@pattern` | `format`, `minLength`, `maxLength`, `pattern`.                                   |
| `@secret`                                         | `format: password`.                                                              |
| `@minItems`, `@maxItems`                          | `minItems`, `maxItems`.                                                          |
| `@encode("unixTimestamp", int64) _: utcDateTime`  | `integer`, format `unixtime`.                                                    |
| `@encode("rfc7231", string) _: utcDateTime`       | `string`, format `http-date`.                                                    |
| `@encode("seconds", int32) _: duration`           | `integer`, format `int32`.                                                       |

```typespec
/** A pet in the store. */
@discriminator("kind")
model Pet {
  @minLength(1) name: string;
  kind: string;
}

model Dog extends Pet {
  kind: "dog";
  breed: string;
}

model Cat extends Pet {
  kind: "cat";
  whiskerCount: int32;
}
```

Derived models in a discriminated hierarchy set the discriminator property to a string literal.
