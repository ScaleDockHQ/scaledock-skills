# Next.js

The shared Next config every web surface spreads, what ScaleDock adds to the `nextjs-app-architecture` skill, and the Next.js pitfalls we hit. The installed `nextjs-app-architecture` skill is the required architecture for every Next.js surface.

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
    requestInsights: true, // dev-only spans for /_next/mcp audits
    authInterrupts: true, typedEnv: true,
    turbopackRustReactCompiler: true,
    serverComponentsHmrCancellation: true, // dev only
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
  },
  typescript: { ignoreBuildErrors: true }, // `pnpm typecheck` is the gate
  headers: documentSecurityHeaderRules, // no nonce CSP: it forces dynamic rendering and breaks PPR shells
}
```

- Do not set `experimental.instantInsights`: instant validation already defaults to `"warning"`. Opt a route out only with `export const instant = false` and a comment saying why.
- Do not set flags that are now defaults: the Turbopack build cache (`turbopackFileSystemCacheForBuild`, except `!process.env.GITHUB_ACTIONS` to turn it off in CI, see [`ci.md`](ci.md)), the shared browser runtime (`turbopackSharedRuntime`), `experimental.agentUpgrade` (`"security"`), and `cachedNavigations` and `appShells`, which `cacheComponents` turns on. Remove `appNewScrollHandler`; 16.4 dropped it.
- Leave `experimental.agentFeedback` off: it needs telemetry and adds AGENTS.md instructions for sending feedback to Vercel. Keep `.next/cache/**` out of Turbo outputs; Vercel restores it.
- Do not set `useTypeScriptCli`: `next build` type-checks with the project-local TypeScript.
- Do not set `supportsImmutableAssets`. The Vercel adapter turns immutable static assets on; the option exists only to opt out while debugging an adapter.
- Measured opt-ins, never in the default block:
  - `experimental.generateComponentChunks` and `turbopackCjsTreeShaking`. Turn one on only with a `next analyze` comparison on a real navigation path, and record the numbers in the commit.
  - `experimental.taint` and `blockingSSR`. Both pull in `react@experimental`, so turn one on only when code calls the API (`taintUniqueValue`, `taintObjectReference`), with a `next analyze` comparison in the commit.
  - `webVitalsAttribution`, only while someone reads the attribution data.
  - `turbopackGc` and `turbopackLazyDynamicImports`, dev-only, when a large app's dev cache or cold compiles are measurably slow.
  - `optimizePackageImports`, only for a package that is not already in the Next default list. Most icon packages are in it.
- **Markdown negotiation** (`Accept: text/markdown`) goes through `rewrites().beforeFiles` with a `has` condition on the `accept` header to a Markdown route handler. The route handler sets `Vary: Accept` on its own response; a `headers()` rule for `Vary` on the HTML paths is not needed (PermDock ADR 0030). A `proxy.ts` is the fallback when a rewrite cannot express the rule, and it always exports a `matcher`. A proxy without a matcher runs on every request, including static assets, and is a gap.
- Keep `gestureTransition` and `transitionIndicator` off; they break back and forward. Use `<ViewTransition>` and `addTransitionType` (both stable), and respect reduced motion.

## Architecture (`nextjs-app-architecture`, latest)

Every Next.js surface follows the installed `nextjs-app-architecture` skill: the product `app`, `docs` and `marketing` alike. Install it with `pnpm dlx skills add aurorascharff/nextjs-app-architecture-skill --skill nextjs-app-architecture -y`. Read its references for the rules and the reasons; this section lists only what ScaleDock adds. Where the skill and this section disagree, follow the skill and update this section.

These invariants hold on every surface, including a marketing page whose only data is generated JSON:

| Invariant                                                              | Skill reference                    |
| ---------------------------------------------------------------------- | ---------------------------------- |
| Pages are synchronous and only compose sections.                       | `references/pages-suspense.md`     |
| Feature components own their reads.                                    | `references/components.md`         |
| Features receive plain ids, never `params` or `searchParams`.          | `references/pages-suspense.md`     |
| The page owns the `<Suspense>` boundary.                               | `references/pages-suspense.md`     |
| Each skeleton sits in the same file as its component.                  | `references/components.md`         |
| Reads go in `<domain>-queries.ts`, mutations in `<domain>-actions.ts`. | `references/queries-actions.md`    |
| `'use client'` goes only on leaf components.                           | `references/components.md`         |
| Feature folders follow product ownership.                              | `references/feature-folders.md`    |
| Which reads to cache, and how to invalidate them.                      | `references/cache-components.md`   |
| Which links prefetch, and what a navigation shows first.               | `references/instant-navigation.md` |

On docs and marketing, a read is often a pure function over generated JSON or content in `lib/`. A feature component still calls it, never the page. The folder layout for those surfaces is in [`web-design.md`](web-design.md).

ScaleDock adds:

- **Actions** validate with Valibot, check the PermDock permission, write, call `updateTag` for every affected tag, and return `{ ok: true, ... } | { ok: false, code, fieldErrors, values }`. Actions never show toasts, and never call `redirect()` when the caller shows feedback.
- **Error boundaries.** Each section that can fail on its own gets a `catchError` boundary from `next/error` whose fallback offers `retry()`. Never add a `template.tsx`, and layouts never `await` an auth gate.
- **Interaction state.** nuqs owns shareable state. [`web-design.md`](web-design.md) covers URL tabs on prerendered pages.
- **Three scopes:**
  1. One persistent `AppShell` in the app layout.
  2. Tenant gates in Suspense islands that render nothing while pending.
  3. Page islands.
- **Cache tags.** One list tag (`organization-customers`) and one record tag (`organization-customer:{id}`), both scoped by organization. Webhooks and workflows use `revalidateTag(tag, "max")`. `"use cache: remote"` only when the hit rate justifies it.
- **Request-time work.**
  - Prefer `await io()` over `connection()`. A `connection()` call needs a comment that names the user-request wait.
  - Await `prefetch()` or `navigation()` from `next/cache` in the component before a request-specific query, never inside a cache scope, to keep that subtree out of the shell or the per-link prefetch.
  - `export const ensureStatic = "navigation"` on the root layouts of `docs` and `marketing`, so a later change cannot add request-time rendering. Product routes that must keep a static shell use `"shell"`. `ensureStatic` checks static output; `instant` checks that navigation shows UI at once, and routes keep both.
- **Prefetch tiers:**
  - Default `Link` prefetch for ordinary routes.
  - `IntentPrefetchLink` (hover, focus or touch) for unbounded lists.
  - `prefetch={true}` only for a bounded, tested set.
- **Routing details.** Route aliases are `redirects()` in `next.config`. Omit `export const runtime`. Read root-level params such as `[locale]` with `next/root-params` instead of passing them down.
- **React.** `<Activity>` keeps hidden UI mounted with its state (side panels, inactive tabs). Fragment refs replace wrapper `div`s that exist only to hold a ref. The React Compiler memoizes, so code never adds `useMemo`, `useCallback` or `memo` by hand. The exception is a library that requires a stable reference: TanStack Table column definitions stay in `useMemo` (CentraKit ADR 0027).
- **Tests.** `@next/playwright` `instant()` covers key navigations. A route-table test asserts every route ships a prerendered shell.

## Pitfalls

Record each one that applies, and why, in the repo's `docs/agents/nextjs.md`.

- **`usePathname` in a root layout.** Under `cacheComponents` it lives in a small client leaf (`NavLink`, the sidebar's active link), never in the layout. A production build confirms it; `next dev` hides the failure.
- **Images behind Vercel Services.** When a Service rewrite puts an app under another app's host, `/_next/image` can return 404. Give that app its own domain, or set `images.unoptimized` with a comment. See [`vercel.md`](vercel.md), and add the image check to the report's manual steps.
- **Clock and randomness.** `Date.now()`, `new Date()` and `Math.random()` outside a cached function fail the prerender, including skeleton widths. Shiki reads the clock, so highlight inside a `"use cache"` function.
- **Ids on mount.** A client hook that creates an id on mount (`useChat`) fails the prerender. Mount it after user interaction, loaded through `next/dynamic` with `ssr: false`.
- **Link buttons.** A Base UI `Button` with `render={<Link />}` gives the link `role="button"`. Style the link with `buttonVariants()` instead.
- **Typed routes.** `typedRoutes` rejects a plain `string` href. Narrow it with a type guard that returns `href is Route`.

## Agent loop

- In upgrade mode, start a Next.js upgrade with `next upgrade --agent` (policy `latest`), then follow the agent upgrade guide in the bundled docs.
- Before running `next build`, ask the dev server's `/_next/mcp` endpoint (`get_compilation_issues`, `compile_route`). It answers in seconds and covers the same errors.
- Verify every UI edit with the `next-dev-loop` skill and `agent-browser` with `--enable react-devtools`.
- Error IDs link to `nextjs.org/docs/messages/<id>`, and those pages are written for agents. Read the page before guessing a fix.
