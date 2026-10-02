# Libraries that implement or accept the specs

Copied from the tables on [standardschema.dev/schema](https://standardschema.dev/schema) and [standardschema.dev/json-schema](https://standardschema.dev/json-schema) as read on 2026-10-02. The tables are maintained by pull request and change often; re-read them before quoting a version. The tables on the site follow the repository's `main` branch, which differs from the copy at tag `v1.1.0` only in these tables.

## Standard Schema (validation) implementers

| Library                    | Minimum version | Note           |
| -------------------------- | --------------- | -------------- |
| Zod                        | 3.24.0          |                |
| Valibot                    | 1.0             |                |
| ArkType                    | 2.0             |                |
| Effect Schema              | 3.13.0          | Via an adapter |
| Arri Schema                | 0.71.0          |                |
| Formgator                  | 0.1.0           |                |
| decoders                   | 2.6.0           |                |
| Sury                       | 9.2.0           |                |
| Skunkteam Types            | 9.0.0           |                |
| DreamIt GraphQL-Std-Schema | 0.1.0           |                |
| ts.data.json               | 2.3.0           |                |
| quartet                    | 11.0.3          |                |
| unhoax                     | 0.7.0           |                |
| protovalidate-es           | 0.5.0           |                |
| remult                     | 3.1.1           |                |
| yup                        | 1.7.0           |                |
| joi                        | 18.0.0          |                |
| typia                      | 9.2.0           |                |
| regle                      | 1.9.0           |                |
| jsonv-ts                   | 0.3.0           |                |
| Evolu                      | 6.0.1           |                |
| zeed                       | 1.1.0           |                |
| GraphQL Standard Schema    | 0.2.1           |                |
| Paseri                     | 0.2.1           |                |
| VineJS                     | 4.0.0           |                |
| validate.js                | 0.1.0           |                |
| Lex SDK                    | 0.0.21          |                |
| @chrock-studio/overload    | 0.2.0           |                |
| ovr Schema                 | 6.2.0           |                |
| @cleverbrush/schema        | 2.0.0           |                |
| Raptor (Validator)         | 0.9.0           |                |
| Mongoose                   | 9.7.0           |                |
| snap-validate              | 0.4.4           |                |

TypeBox and stnl appear in the table at tag `v1.1.0` but not on the site on 2026-10-02.

## Standard JSON Schema implementers

| Library                 | Version                   | How                                                                       |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------- |
| Zod                     | 4.2 and later             | Schemas implement it directly                                             |
| Zod Mini                | 4.2 and later             | Via `z.toJSONSchema()`                                                    |
| ArkType                 | 2.1.28                    | Schemas implement it directly                                             |
| Valibot                 | 1.2                       | Via `toStandardJsonSchema()` from `@valibot/to-json-schema` 1.5 and later |
| GraphQL Standard Schema | 0.2.0 and later           | Generated fragment schemas implement it                                   |
| stnl                    | 2.1 and later             | Via `toStandardJSONSchema.v1()`                                           |
| VineJS                  | 4.3.0 and later           | Via `validator['~standard'].jsonSchema.input()`                           |
| Sury                    | 11.0.0-alpha.10 and later | After `S.enableStandardJSONSchema()`                                      |

The usage snippets on the site, for example:

```ts
import type { StandardJSONSchemaV1 } from "@standard-schema/spec";
import * as z from "zod";
import * as v from "valibot";
import { toStandardJsonSchema } from "@valibot/to-json-schema";

z.string() satisfies StandardJSONSchemaV1;
toStandardJsonSchema(v.string()) satisfies StandardJSONSchemaV1;
```

## Tools that accept Standard Schemas

The site lists many integrators. Among them, as of 2026-10-02: tRPC, TanStack Form, TanStack Router, Hono middleware, Elysia, oRPC, React Hook Form (through its resolvers), T3 Env, UploadThing, OpenAuth, Nuxt UI, next-safe-action, RTK Query, Inngest, FastMCP, Muppet, xsAI and xsMCP. Tools listed as accepting Standard JSON Schema: xsAI, GQLoom and the Restate TypeScript SDK.

Use these lists to tell users which validators work with a tool, never as a reason to special-case a vendor in code.
