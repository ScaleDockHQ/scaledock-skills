# Performance and caching

Baselines and budgets, the cost of an authenticated request, caching for agent routes, the client bundle, library runtime cost, and generated code. CLI startup rules are in [`cli.md`](cli.md).

Applies to every repo kind that ships code. A tooling repo applies only the baselines and the CLI startup rules.

## Baselines

Record these before changing anything, and again at the end of the run. Put both sets in the report's Baselines table.

- The bundle baseline (`size`, or the library bundle gate below).
- The type-instantiation benchmark (`typecheck:perf`), when the repo has one.
  - It gates on instantiation counts. Wall-time ceilings flake under a fully parallel local `verify`: PermDock's tests project measured 8.5 to 9.8 s against an 8 s ceiling there, and 2.2 s alone. Treat wall time as advisory locally, or run the check serially.
- CLI startup for every CLI: the medians of `--version`, `--help` and the heaviest leaves' `--help` from `scripts/cli-startup.ts` (see [`cli.md`](cli.md)).
- `next analyze` per Next app. Check the command name against the installed Next.
- With docs or marketing, the gzipped size of each lazy client chunk and the HTML size of the largest prerendered page.
- With an `app` surface and a database, the [authenticated page cost](#authenticated-page-cost) below.

A change that moves a baseline names the before and after numbers in its commit.

When a feature needs a few hundred bytes or a few milliseconds more, raise the budget in the same commit and record why. Do not contort the code (inlined helpers, dropped error messages, hand-rolled parsing) to stay under a number; a small, recorded raise is the better trade, and a large one is a design question for the PR.

### Authenticated page cost

Record it for every product with an `app` surface and a database. Measure the sign-in action, the dashboard and two list pages, warm, both locally and on the deployed preview. For each one, record:

- The server render time, and the time until the page is idle.
- Data API requests per render, counted from the Supabase API logs or the local gateway logs.
- Permission version RPC calls per render, counted the same way.
- Total Postgres time per render, from `pg_stat_statements` reset before each run.
- Session verifications per request, from a dev-only counter or span around the verify call.
- The names of the sign-in round trips (see [Authenticated request cost](#authenticated-request-cost)) and each background reconcile with its reason.

Also record the app region and the database region, so a later reader can tell distance from fan-out.

Measure cold loads separately, and keep compile time and file-watcher pauses out of the warm numbers. Keep test caches and other generated folders outside the dev server's watched tree, or have the dev server ignore them. In CentraKit the first local load spent 10 s compiling, and a test cache inside the watched tree made Turbopack pause until the filesystem settled, so the early local numbers measured the tooling rather than the page.

### Authenticated page budgets

Every measured page starts with these budgets, and they are its pass line:

- 1 session verification per request.
- At most 1 permission version read per request.
- No duplicate list reads between islands.
- A recorded Data API request count, so a later jump is visible.

A budget changes only under the rule above: raise it in the same commit with the reason, and treat a large raise as a design question for the PR.

## Authenticated request cost

Applies to every product with an `app` surface and a database. A fast database does not make a fast page when every island repeats the same work. In CentraKit, Postgres spent about 46 ms per dashboard render, yet one warm render made about 66 Data API requests and 12 permission version RPC calls, its server render took 780 to 850 ms, and the page stayed busy for 2.5 s before it went idle. The [budgets](#authenticated-page-budgets) above are the pass line for these rules.

- **One session verification per request.** The proxy, the page and every island share one verified result.
  - A `use cache` boundary never repeats the cookie session read, the JWT verification or the claims setup. Inside a private cache scope, auth comes from a snapshot that the library keeps per request, or from serializable arguments such as the organization ID and slug.
  - `React.cache` runs in its own isolated scope inside each `use cache` boundary, so a per-request memo built on it starts empty there. Values reach a cache scope only as arguments. A `"use cache: private"` function is the other way to share: matching calls to it within one request reuse one result.
  - In CentraKit every `"use cache: private"` island called the request context factory again, repeating the session read, the JWT verification and the PermDock claims setup, and the proxy's verification was repeated by every island as well.
- **At most one permission version read per request.** Every cache scope that checks permissions reads through a version cache that lives for the whole request or longer, never one per instance. PermDock's claims-first freshness and PostgREST sources memoized per instance, and each cache scope built a new instance, so each scope called the version RPC again: 12 calls on one dashboard render.
- **One read per list per page.** Islands that need the same data await one shared cached loader and pick the fields they need. Never give each island its own copy of the same reads. Two CentraKit islands loaded the same task, quote, invoice, customer and inbox lists through separate cached loaders.
- **No auth or tenant reads in the static shell.** The static shell is prerendered, so Partial Prefetching and instant navigation can serve it at once.
  - Personal data stays in private islands inside `<Suspense>`, with a fallback shaped like the content it replaces.
  - Session content can still travel in the route's per-session App Shell. It joins the App Shell when its `stale` time is at least 5 minutes, and drops out of prefetching below 30 seconds. Check both numbers against the installed `cacheLife` docs.
- **Background reconciles run after paint.** A realtime first-subscribe refresh or any other catch-up request starts only after the page has painted, and each one is listed in the baseline with its reason. In CentraKit two realtime subscriptions each sent a `POST` after paint to bring cached data up to date.
- **Sign-in finishes in a fixed number of round trips.** Name each round trip in the baseline. The redirect target does not repeat a check that sign-in just did, such as verifying the new session again or reloading the memberships sign-in already read.

## Web routes for agents

- `/llms.txt`, `/llms-full.txt`, the per-page `.md` routes and the search route set `Cache-Control: public, max-age=<seconds>, stale-while-revalidate=<seconds>`.
- The Markdown routes send `Content-Type: text/markdown; charset=utf-8`.
- Their builders run in `"use cache"` with `cacheLife`, so a request never rebuilds the whole corpus.
- Schema conversions, such as JSON Schema for MCP tools, are built once at module scope, never per request.

## Client bundle

- Static marketing and docs sections stay Server Components. An FAQ, a feature grid or a pricing table never carries `"use client"`.
- Link-styled buttons render `<a className={buttonVariants(...)}>` from a server-only component, so `cn`, cva and the headless Button never reach the client. Record each such primitive in `DESIGN.md` (see [`ui.md`](ui.md)).
- Heavy client features (chat panels, editors, command palettes, diagram and graph-layout libraries) load through `next/dynamic` when opened or when their UI renders, and prefetch on pointer enter. The size baseline records each such lazy chunk's gzipped size, so a later import from a shared module shows up as a jump.
- Static graphics are server-rendered SVG, never a client diagram library. The accessibility pattern for their links is in [`web-design.md`](web-design.md).
- Shiki output rendered on the server lands in the page HTML. On pages with many files, highlight only what is shown and the rest on demand, and record the HTML size of the largest such page in the baselines.

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
- **Auth** resolves once per request scope (`cache()` in React), and the memo stores the state after validation, so later reads in the same scope skip the check. That memo does not reach into `use cache` boundaries, so the library also keeps a per-request session snapshot and a shared permission version cache for them ([Authenticated request cost](#authenticated-request-cost)).
- **Optional executors.** A heavy executor that few adapters use is injected through a subpath factory, never statically imported by every adapter.
- **Tree shaking.**
  - tsdown sets `treeshake.moduleSideEffects` so unused modules drop.
  - Module-level `new TextEncoder()` and `new RegExp()` carry `/* @__PURE__ */`.
- **Bundle gate.** The gate measures realistic consumer fixtures (min and gzip, tree-shaken, with externals) alongside each entry's closure.

## Generated code

- Large generated metadata is emitted as `.js` plus a `.d.ts` that declares its type, never as one large literal inside a `.ts` file. A literal in `.ts` is type-checked by every consumer program and costs check time in all of them.
- The type benchmark runs on the current compiler and gates on check time as well as instantiation count.
