# Performance and caching

Baselines, caching for agent routes, the client bundle, library runtime cost, and generated code. CLI startup rules are in [`cli.md`](cli.md).

Applies to every repo kind that ships code. A tooling repo applies only the baselines and the CLI startup rules.

## Baselines

Record these before changing anything, and again at the end of the run. Put both sets in the report's Baselines table.

- The bundle baseline (`size`, or the library bundle gate below).
- The type-instantiation benchmark (`typecheck:perf`), when the repo has one.
- `time <bin> --help` and `time <bin> --version`, for every CLI.
- `next analyze` per Next app. Check the command name against the installed Next.

A change that moves a baseline names the before and after numbers in its commit.

## Web routes for agents

- `/llms.txt`, `/llms-full.txt`, the per-page `.md` routes and the search route set `Cache-Control: public, max-age=<seconds>, stale-while-revalidate=<seconds>`.
- The Markdown routes send `Content-Type: text/markdown; charset=utf-8`.
- Their builders run in `"use cache"` with `cacheLife`, so a request never rebuilds the whole corpus.
- Schema conversions, such as JSON Schema for MCP tools, are built once at module scope, never per request.

## Client bundle

- Static marketing and docs sections stay Server Components. An FAQ, a feature grid or a pricing table never carries `"use client"`.
- Link-styled buttons render `<a className={buttonVariants(...)}>` from a server-only component, so tailwind-merge, cva and the headless Button never reach the client. Record each such primitive in `DESIGN.md` (see [`ui.md`](ui.md)).
- Heavy client features (chat panels, editors, command palettes) load through `next/dynamic` when opened, and prefetch on pointer enter.

## Library runtime

Applies to library repos and to shared runtime packages in product repos. better-supabase is the reference implementation.

- **Build only what a request reads.**
  - Create a lightweight client by default, and put the full SDK client behind a lazy getter.
  - Middleware exposes request-scoped values such as `db` through a getter, never through an eager read.
- **Per-schema work runs once.**
  - Cache derived data in a `WeakMap` keyed by the schema metadata object: default selections, reverse column maps, unique keys and plugin column sets.
  - `connect()` and similar per-request factories have constant cost. They share one prototype and never define getters per call.
- **Hot paths.**
  - Plugin pipelines are arrays precomputed at setup. Await a hook's result only when it is a thenable.
  - Build event payloads only when a listener exists.
- **Network.**
  - Every network call passes `AbortSignal.timeout(<ms>)`.
  - In-flight dedupe maps delete their entry in `finally`, so a failure never pins a rejected promise.
- **Auth** resolves once per request scope (`cache()` in React), and the memo stores the state after validation, so later reads in the same scope skip the check.
- **Optional executors.** A heavy executor that few adapters use is injected through a subpath factory, never statically imported by every adapter.
- **Tree shaking.**
  - tsdown sets `treeshake.moduleSideEffects` so unused modules drop.
  - Module-level `new TextEncoder()` and `new RegExp()` carry `/* @__PURE__ */`.
- **Bundle gate.** The gate measures realistic consumer fixtures (min and gzip, tree-shaken, with externals) alongside each entry's closure.

## Generated code

- Large generated metadata is emitted as `.js` plus a `.d.ts` that declares its type, never as one large literal inside a `.ts` file. A literal in `.ts` is type-checked by every consumer program and costs check time in all of them.
- The type benchmark runs on the current compiler and gates on check time as well as instantiation count.
