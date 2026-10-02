# Local dev with Portless, env and secrets

Portless URLs and scripts, Google OAuth locally, agent rules for local dev, the Expo dev loop, env sources in order of preference, and the env files.

Applies to product repos, and to library repos that run a docs site.

## Portless

- **Per app:** `"dev:portless": "portless run --force --name <name> <dev command>"`. Names: `app`, `api`, `mcp`, `docs`, and `www` for marketing, each at `https://<name>.localhost`.
- **Root scripts:**
  - `dev:portless` runs `dotenv -e .env.development.local -e .env.local -- turbo run dev:portless`.
  - `dev:<app>` for each app.
  - `dev:cleanup` runs `portless prune`.
- **`portless.json`** lists every app with `"proxy": false`.
- **URLs:**
  - `NEXT_PUBLIC_SITE_URL=https://localhost`.
  - Supabase stays at `http://127.0.0.1:54321`. Its `site_url` is the Portless app, and the redirect list includes every Portless callback (app, Scalar) and the CLI loopback.
  - `allowedDevOrigins` includes the Portless hosts.
- **Google OAuth (`dev:oauth`):**
  - A separate proxy on `localtest.me`: `PORTLESS_STATE_DIR` in a temp dir, `PORTLESS_PORT=1355`, `portless proxy start --tld me`.
  - `portless alias supabase.localtest 54321 --force`.
  - `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SUPABASE_URL` point at those hosts.
- **Agents:**
  - Use only Portless URLs, with `agent-browser`.
  - Reuse the user's running `dev:portless`. Never restart it without asking.
  - Write these rules into `.agents/rules/local-dev-portless-agent-browser.mdc` and `AGENTS.md`.

## Expo

- **Web.** A universal Expo app's `dev:portless` is `portless run --force --name app expo start --web`, served under its base path at `https://app.localhost/app`.
- **Native.** Build the dev client once with `pnpm --filter <app> ios` or `android` (`expo run:*`), then run `pnpm dev` and press `i` or `a`. Rebuild only after adding a native module.
  - The native app reaches the local stack through Metro's host, never through a hard-coded `localhost`.
  - The developer's shell profile owns the native toolchain (`JAVA_HOME`, `ANDROID_HOME`, CocoaPods from Homebrew, ccache, Watchman). Never add repo scripts that wrap the toolchain, boot emulators, start Metro or launch the dev client.
  - After Metro, Babel or linker changes, start once with `expo start --clear`.
- **Agents** drive simulators and devices through the argent skills, and never run `native:prepare` as a routine step.

## Env and secrets

**Sources, in order of preference:**

1. A Marketplace integration (Supabase, Sentry, Resend, Stripe).
2. Vercel Connect for third parties without an integration: `vercel connect create`, then `attach`. Tokens are fetched at runtime through `@vercel/connect`. Never print connector tokens or trigger URLs.
3. Vercel OIDC for Vercel services.
4. Only then `vercel env add <KEY> <env> --sensitive`, in all three environments. Team-wide values are Shared Environment Variables.

**Files.** They follow Next's own precedence: `.env.development.local` beats `.env.local`.

| File                     | Written by                                                              | Holds                                      |
| ------------------------ | ----------------------------------------------------------------------- | ------------------------------------------ |
| `.env.local`             | `pnpm env:pull` (`vercel env pull --environment=development`)           | Hosted development keys                    |
| `.env.development.local` | `pnpm env:local` (from `supabase status`, plus the local OAuth clients) | Local stack overrides                      |
| `.env.production.local`  | `pnpm env:pull:production`                                              | Production keys, only for debugging builds |

- Root scripts load `dotenv -e .env.development.local -e .env.local --`; the first file wins. `dev:hosted` loads only `.env.local`.
- Adding a key updates the t3-env schema, all three Vercel environments, `turbo.json` and `.env.example`. A key an EAS build reads also goes into the matching EAS environment.
- Expo apps load the root `.env*` files from `app.config.ts` before Metro runs, so `EXPO_PUBLIC_*` inlining sees the same values. Never keep a second `.env` in the app folder.
- Secrets never go in `NEXT_PUBLIC_*` variables or in git.
