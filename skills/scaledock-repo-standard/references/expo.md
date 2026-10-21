# Expo (iOS, Android and universal web)

The two Expo shapes, the SDK version policy, app config and variants, EAS, the dev-client loop, native UI, styling and platform twins, data, auth, push, monitoring, env, and universal web on Vercel. The installed Expo skills and the docs for the installed SDK are the source of truth for API details.

Applies to product repos with the `mobile` surface or with Framework `expo`.

## Shapes

| Shape            | App           | Platforms                       | UI package                           | Vercel                   |
| ---------------- | ------------- | ------------------------------- | ------------------------------------ | ------------------------ |
| `mobile` surface | `apps/mobile` | iOS, Android                    | `packages/ui-native`                 | none                     |
| Framework `expo` | `apps/app`    | iOS, Android, web SSR at `/app` | `packages/ui`, with `.web.tsx` twins | a Node service at `/app` |

- With the `mobile` surface, the Next.js `app` and its references stay as they are, and the two apps share `domain`, `contract` and the `services` read functions, never UI.
- With Framework `expo`, `nextjs.md`, `ui.md`, `app-shell.md` and the next-intl part of `i18n.md` apply only to `docs` and `marketing`. This is the standard, not a deviation, so it needs no ADR.

## SDK and versions

- The latest Expo SDK, and a new SDK in beta as soon as it installs (rule 2). Upgrade with the `expo-upgrade` skill.
- Every Expo package and `react-native` is at the version the installed SDK bundles. `expo install --check` and `expo-doctor` must pass.
- `expo.install.exclude` in the app's `package.json` lists only packages deliberately ahead of the SDK, each with the reason in a catalog comment.
- New Architecture, Hermes and the React Compiler stay on. Never add `useMemo`, `useCallback` or `React.memo` by hand.
- Hermes has no `Temporal`, so Expo code imports it from `@{{SCOPE}}/domain/temporal` like every other workspace (see [`architecture.md`](architecture.md)).

## App config

`app.config.ts`, typed with `ExpoConfig` and checked with `satisfies`:

- **Variants.** `APP_VARIANT` is `development` (default) or `production`. Each has its own `name`, bundle ID, Android package and `scheme` (`{{app}}-dev` and `{{app}}`), so both install side by side. An unknown variant throws.
  - An `assertVariantEnv` check stops a production-variant build whose `EXPO_PUBLIC_*` URLs are empty or relative. A local `APP_VARIANT=production` build reads `.env.production.local`, which `vercel env pull` fills with empty origins for a same-origin web app, and every native command then fails.
- **Version** comes from the app's `package.json`. EAS owns build numbers (`appVersionSource: "remote"`).
- **Env.** The config loads the root `.env*` files, validates the client env, and checks that the variant's URLs point where that variant should before EAS uploads anything.
- **Experiments:** `typedRoutes` and `reactCompiler`. A universal app adds `baseUrl: "/app"`.
- **Plugins** for everything native: `expo-router`, `expo-build-properties` (deployment targets, ccache), `expo-font`, `expo-splash-screen` (light and dark), `expo-localization` (supported locales), `expo-notifications`, `expo-apple-authentication`, `@sentry/react-native/expo`, and a permission string for every permission the app asks for. Never edit generated native files by hand; write a local config plugin in `plugins/`.
- **Generated native folders.** `ios/` and `android/` are gitignored and come from `expo prebuild` (Continuous Native Generation).

## EAS

`eas.json`:

- `cli.appVersionSource: "remote"`.
- `development`: `developmentClient: true`, `distribution: "internal"`, `env.APP_VARIANT: "development"`.
- `production`: `autoIncrement: true`, Android `app-bundle`, `env.APP_VARIANT: "production"`, and the latest macOS and Xcode image.
- Every profile pins `node` and `pnpm` to the repo's versions and names its EAS `environment`.
- `submit.production` holds the App Store Connect app and the Play `internal` track. Promotion to public tracks happens in the stores.
- CI only queues builds (see [`ci.md`](ci.md)). Production builds come only from a release tag on `main`.

## Dev loop

- `expo-dev-client`, never Expo Go. Build it with `expo run:ios` or `expo run:android`, then `expo start` and `i` or `a`.
- Rebuild the dev client only after adding a native module or config plugin, and run `expo prebuild -p <platform>` first so an existing native folder picks the plugin up.
- `native:prepare` (`expo prebuild --clean`) is for a stale generated project only, never a routine step.
- Patches to native packages are pnpm patches with a test that fails when the upstream fix lands. After patching a native module, run `pod install` before trusting an iOS build.
- After an Expo, Reanimated or worklets bump, restart Metro. A Metro still serving the previous JS crashes on first layout (`undefined is not a function` in `NativeWorklets`), which is not an app bug. After a Metro, Babel or linker change, start with `expo start --clear`.
- Metro watches the workspace root. Every generated output directory (`.next`, `dist`, `.turbo`, `ios/`, `android/`, `supabase/`) goes in `resolver.blockList`, or the write flood drops Fast Refresh. A block pattern is a workspace-relative prefix, not a path segment: `supabase` alone also hides `packages/supabase`.
- Keep `org.gradle.configuration-cache` off on SDK 58: Gradle 9.4 then fails the stock `execute()` lookups and the Sentry copy tasks. The task output cache (`org.gradle.caching`) stays on.
- Keep the Android dev-client network inspector off (`android.networkInspector` in `expo-build-properties`). Its OkHttp interceptor buffers up to 1 MiB of each response, so a streaming response that never ends (PowerSync `/sync/stream`, server-sent events) never resolves on debug builds. An app config test asserts the option.
- Signing. `expo run:ios` needs an Apple Development certificate even for the Simulator once the app has the Sign in with Apple or associated-domains entitlement. A device build signs against the team in the gitignored `ios/` project, so `expo prebuild --clean` drops it; set it once in Xcode, and never override `PRODUCT_BUNDLE_IDENTIFIER` on the command line, because it applies to every Pod target too.
- `@expo/agent-cli` (experimental) runs through `pnpm dlx @expo/agent-cli@latest` from the app folder, never as a dependency or a script. Its `status` says whether a change needs a dev client rebuild. Never run its `agents:setup` or `skills:sync`; skills come from the lock ([`skills.md`](skills.md)).
- Toolchain and agent rules are in [`local-dev-env.md`](local-dev-env.md).

## Hermes

Node and web tests run on V8, so they never catch a Hermes gap. Hermes lacks:

- `globalThis.crypto`. Install a Web Crypto polyfill (`expo-crypto` through a `.native.ts` twin) in the app's entry file, before anything imports supabase-js, so PKCE works. Patching only the session storage does not cover it.
- `Array.prototype.toSorted`, `toReversed` and `toSpliced`. Copy, then `.sort()`, and ban the methods with a lint rule ([`lint-format.md`](lint-format.md)).
- `Intl.RelativeTimeFormat`. Relative times are catalog plurals.
- `require` in the polyfill prelude. Never put an ES module in Metro `getPolyfills`; install polyfills from the entry file.

The app config test or a smoke test on a dev build is the gate for these.

## Layout

```
src/app/            Expo Router routes only; each route composes features and keeps its loader
src/features/<name>/  keys.ts, types.ts, hooks/use-<name>.ts (+ .native.ts twin), components/, <name>-form.ts
src/lib/            env.ts, orpc.ts (contract client), monitoring, analytics, supabase client
src/server/         SSR loaders, reachable only from routes (universal app)
global.css          the Uniwind tokens, once
tests/              node and component tests, never beside the source
```

Features never import `@/app/*`. A feature scaffold script keeps the shape the same.

## Native UI

The platform's own components are the base, and brand tokens paint them:

- **Navigation:** Expo Router native stack and `NativeTabs`. A universal app renders headless `expo-router/ui` tabs with a sidebar on web.
  - Expo Router 58 seeds each navigator from the route tree, shortest route name first, so screen order does not pick the first screen. Every layout with more than one child exports `unstable_settings = { anchor: "<overview route>" }` in both platform twins, and a test enforces it.
  - A bottom `Stack.Toolbar` and the native tab bar share one place, so hide the tab bar on iOS while the toolbar shows. On Android a hidden Compose tab bar still swallows touches, so keep it and place the bar above it. Android drops SF Symbol names and label-less toolbar buttons; give each item a Material icon and a visible label.
- **Controls:** `@expo/ui` first for sheets, menus, switches, pickers, segmented controls and grouped settings rows. Route-level sheets use `presentation: "formSheet"`.
  - Render an `@expo/ui` bottom sheet at the screen root, next to the list, never inside a list header or a row of siblings: its host is absolutely positioned and its content stays mounted over the siblings. Never unmount it while presented, and never present an RN `Modal` from inside it.
- **Motion and input:** Reanimated, gesture-handler and keyboard-controller.
- **Media and icons:** `expo-image` and `expo-symbols`.
- **Lists:** Legend List.
- **Banned:** JS stacks, JS tab bars, JS bottom sheets, `TouchableOpacity`, `StyleSheet.create`, inline style colors and hex literals.
- **Accessibility:** every `Pressable` has a role and an accessible name. Hide decoration with `aria-hidden`. Touch targets are at least 44pt (`min-h-11`), and contrast pairs are tested.

## Styling and platform twins

- **Uniwind** compiles Tailwind v4 classes at build time. Tokens live once in `global.css`: every color is a full value and every radius a px value, in light and dark.
  - The `*-safe` classes start at 0 on native. The root layout feeds `Uniwind.updateInsets` from `useSafeAreaInsets`, or bars sit on the home indicator.
- **Class names** are literal strings, composed with `tv()` and `cn()`; never build them dynamically. Web-only utilities go behind `web:`. Shared primitives never use `grid`, because Yoga has none.
- **`packages/ui`** (or `ui-native`) has per-file exports and no barrel. A primitive that differs by platform has a `react-native` and a `default` export condition, pointing at `<name>.tsx` and `<name>.web.tsx`. The web twin may use Base UI.
- **Twins** share one props type from `types.ts`, so both compile against one contract.
- **SSR safety** (universal app): nothing the server renders may resolve classes against the DOM or mint IDs with `useId`; pass stable IDs.
- A dev-only gallery route shows every primitive in light and dark.

## Data and commands

- Reads go to Supabase under RLS through query functions in `services`, which the universal app's SSR loaders share, so each read has one select. With Offline set to yes, native hooks read PowerSync instead (see [`offline-sync.md`](offline-sync.md)).
- TanStack Query owns client caching. Query keys live in each feature's `keys.ts`.
- Commands and cross-cutting reads go to `apps/api` through the oRPC contract client in `src/lib/orpc.ts`, with the user's bearer token. Never `+api.ts` routes for commands.

## Auth, push and monitoring

- **Auth** is in [`auth.md`](auth.md): PKCE through `expo-web-browser`, the exchange in `.native.ts` twins, Sign in with Apple on iOS, and an optional `expo-local-authentication` unlock.
- **Push.** The app asks for permission in context, never at launch, and registers its `expo-notifications` token through the API. `apps/api` sends through `expo-server-sdk` and removes tokens Expo reports as invalid. The client never talks to APNs or FCM.
- **Monitoring.** `@sentry/react-native` behind `src/lib/monitoring`, with source maps uploaded by the EAS build. A universal app's web build uploads its own source maps.
- **Analytics** stays behind `src/lib/analytics` and identifies users by `sub` only.

## Env

- `src/lib/env.ts` uses t3-env core with Valibot for `EXPO_PUBLIC_*` keys, read literally so Metro inlines them. Server-only keys never get an `EXPO_PUBLIC_` copy.
- Values live in Vercel for web and in the matching EAS environment for native builds. Never commit them to `eas.json`.

## Universal web

With Framework `expo`:

- `web.output: "server"` and `web.bundler: "metro"`. `expo export --platform web` builds `dist/`.
- `server.mts` (ESM, so the Node builder emits it as written) serves the static assets and `expo-server` SSR, and is the Vercel Service entrypoint at `/app` (see [`vercel.md`](vercel.md)).
- `experiments.baseUrl` keeps every asset and link under `/app`, in development too, so `/` stays free for marketing.
- Web reads Supabase directly, never PowerSync.
- Portless serves it at `https://app.localhost/app`. Playwright and axe run against the exported build.
