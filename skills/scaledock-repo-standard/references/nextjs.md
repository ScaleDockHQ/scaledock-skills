# Next.js

The shared Next config every web surface spreads, and the app architecture rules. The installed `nextjs-app-architecture` skill is the source of truth for architecture.

Applies to every Next.js surface: `app` when Framework is `next`, `docs` and `marketing` always.

## `createNextConfig()`

`packages/next-config` exports `createNextConfig()`, and every Next app spreads it. Check each flag against the installed docs:

```ts
{
  reactCompiler: true,
  typedRoutes: true,
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: true, // the default; keeps the managed AGENTS.md block current
  serverExternalPackages: [/* native or heavy server-only deps */],
  compiler: { removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false },
  experimental: {
    // only while the installed version still lists them
    varyParams: true, optimisticRouting: true,
    prefetchInlining: true,
    useOffline: true,
    globalNotFound: true,
    appNewScrollHandler: true,
    requestInsights: true, // dev-only spans for /_next/mcp audits
    authInterrupts: true, typedEnv: true,
    taint: true, blockingSSR: true, // both opt into react@experimental; taint also covers process.env
    turbopackRustReactCompiler: true,
    serverComponentsHmrCancellation: true, // dev only
    optimizePackageImports: [/* icon packages */],
    webVitalsAttribution: ["CLS", "LCP"],
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
  },
  typescript: { ignoreBuildErrors: true }, // `pnpm typecheck` is the gate
  headers: documentSecurityHeaderRules, // no nonce CSP: it forces dynamic rendering and breaks PPR shells
}
```

- Do not set `experimental.instantInsights`: instant validation already defaults to `"warning"`. Opt a route out only with `export const instant = false` and a comment saying why.
- Do not set flags that are now defaults: the Turbopack build cache (`turbopackFileSystemCacheForBuild`), and `cachedNavigations` and `appShells`, which `cacheComponents` turns on. Keep `.next/cache/**` out of Turbo outputs; Vercel and the CI cache restore it.
- Do not set `useTypeScriptCli`: `next build` type-checks with the project-local TypeScript.
- Do not set `supportsImmutableAssets`. The Vercel adapter turns immutable static assets on; the option exists only to opt out while debugging an adapter.
- Measured opt-ins, never blanket: `experimental.generateComponentChunks`, `turbopackSharedRuntime` and `turbopackCjsTreeShaking`. Turn one on only with a `next analyze` comparison on a real navigation path, and record the numbers in the commit.
- Keep `gestureTransition` and `transitionIndicator` off; they break back and forward. Use `<ViewTransition>` and `addTransitionType` (both stable), and respect reduced motion.

## Architecture (`nextjs-app-architecture`, latest)

The installed skill is the source of truth. Where it differs from this list, follow the skill and update this list.

- **Pages compose and never fetch.** Pages are synchronous. They resolve `params` and `searchParams` with `.then(...)` and pass IDs and normalized filters into features. Features receive IDs, not data, and their props are never named `params` or `searchParams`. Pages never import queries or create services.
- **Async server components by default.**
  - Each component fetches its own data through `cache()`-wrapped queries (deduped per request), so composition never builds prop chains.
  - When a client component needs server data, split it into an async server half and a client leaf that receives plain props.
- **Suspense.**
  - The page owns `<Suspense>`, and the feature owns its skeleton, exported from the same file at the end (`CustomerList` and `CustomerListSkeleton`).
  - Independent fetches get sibling boundaries, and each section that can fail on its own gets a `catchError` boundary from `next/error` whose fallback offers `retry()`. It re-renders the failed Server Components and leaves `notFound()` and `redirect()` alone.
  - Prefer page boundaries over `loading.tsx`. Keep `loading.tsx` only as the fallback for cold hard navigations, reusing the feature skeleton.
  - Never `fallback={null}` for visible UI (gates that render nothing are fine). Layouts never `await` an auth gate. Never add a `template.tsx`.
- **Feature folders** (`features/<domain>/`):
  - `<domain>-queries.ts`: `import "server-only"`, wrapped in `cache()`.
  - `<domain>-actions.ts`: `"use server"`, validated and permission-checked.
  - `<domain>-cache.ts`: pure tag and key helpers with no I/O, safe to import from client code.
  - `<domain>-query-options.ts`: TanStack Query options for client islands that poll.
  - `components/`, `hooks/`, `types/` and `providers/`.
- **Mutations.**
  - Client leaves import their feature's actions directly; actions are never drilled through server components.
  - An action validates with Valibot, checks the permission, writes, calls `updateTag` for every affected tag, and returns a discriminated union: `{ ok: true, ... } | { ok: false, code, fieldErrors, values }`.
  - Actions never show toasts. They never call `redirect()` when the caller shows feedback; the client navigates.
  - A rejected form keeps the user's draft.
- **Interaction state.** `useOptimistic` for instant feedback, `useTransition` or `useActionState` for pending state, and nuqs for shareable state. Filter forms read defaults from the URL, push inside `startTransition`, and mark stale results with `data-pending`.
- **Three scopes:**
  1. One persistent `AppShell` in the app layout.
  2. Tenant gates in Suspense islands that render nothing while pending.
  3. Page islands.
- **Caching.**
  - `"use cache: private"` for cookie-derived data, with `cacheTag` and `cacheLife`.
  - Use `cacheLife("max")` when every write path calls `updateTag`. Use `minutes` or `seconds` when something outside Server Actions writes the data (webhooks, workflows, other services).
  - Tag by write frequency: one list tag (`organization-customers`) and one record tag (`organization-customer:{id}`), both scoped by organization.
  - Public `"use cache"` only for URL-keyed public data. `"use cache: remote"` only when the hit rate justifies it.
  - Webhooks and workflows use `revalidateTag(tag, "max")`. `refresh()` only re-runs uncached dynamic reads.
  - Pass normalized primitives into cached functions; never default or clamp values inside them.
- **Request-time work.**
  - Prefer `await io()` over `connection()`. A `connection()` call needs a comment that names the user-request wait.
  - When the installed Next exports `unstable_prefetch()` or `unstable_navigation()`, await them in the component before the query, never inside a cache scope.
- **Prefetch tiers:**
  - Default `Link` prefetch for ordinary routes.
  - `IntentPrefetchLink` (hover, focus or touch) for unbounded lists.
  - `prefetch={true}` only for a bounded, tested set.
- **Routing details.** Route aliases are `redirects()` in `next.config`. Omit `export const runtime`. Read root-level params such as `[locale]` with `next/root-params` instead of passing them down.
- **React.** `<Activity>` keeps hidden UI mounted with its state (side panels, inactive tabs). Fragment refs replace wrapper `div`s that exist only to hold a ref. The React Compiler memoizes, so code never adds `useMemo`, `useCallback` or `memo` by hand.
- **Tests.** `@next/playwright` `instant()` covers key navigations. A route-table test asserts every route ships a prerendered shell.

## Agent loop

- Before running `next build`, ask the dev server's `/_next/mcp` endpoint (`get_compilation_issues`, `compile_route`). It answers in seconds and covers the same errors.
- Verify every UI edit with the `next-dev-loop` skill and `agent-browser` with `--enable react-devtools`.
- Error IDs link to `nextjs.org/docs/messages/<id>`, and those pages are written for agents. Read the page before guessing a fix.
