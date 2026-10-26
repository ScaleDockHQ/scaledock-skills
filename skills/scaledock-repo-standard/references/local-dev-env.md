# Local dev with Portless, env and secrets

Portless URLs and scripts, Google OAuth locally, agent rules for local dev, the Expo dev loop, env sources in order of preference, and the env files.

Applies to product repos, and to library repos that run a docs site.

## Portless

- **Per app:** the app's own `package.json` holds a `"portless": { "name": "<name>" }` key, and its script is `"dev:portless": "portless"`, which runs the app's `dev` script under that name. Names: `app`, `api`, `mcp`, `docs`, and `www` for marketing, each at `https://<name>.localhost`.
  - The `dev` script reads the port Portless assigns: `next dev -p ${PORT:-3001}`, with a different fallback per app so a plain `pnpm dev` of two apps does not collide.
  - `portless run --force --name <name> <dev command>` is the older form; replace it in upgrade mode.
- **Root scripts:**
  - `dev:portless` runs `dotenv -e .env.development.local -e .env.local -- turbo run dev:portless`.
  - `dev:<app>` for each app.
  - `dev:cleanup` runs `portless prune`.
- **No root `portless.json`.** The names live in each app's `package.json`, so a moved or added app carries its own.
- **URLs:**
  - `NEXT_PUBLIC_SITE_URL=https://localhost`.
  - Supabase stays on `127.0.0.1`, on the API port the CLI picked for this checkout. Its `site_url` is the Portless app, and the redirect list includes every Portless callback (app, Scalar) and the CLI loopback.
  - Each worktree or agent sandbox starts its own Supabase project on the native runtime (see [`data-permissions.md`](data-permissions.md)). Read its URLs and keys from `supabase start --output-format json`, as `pnpm env:local` does; never assume port `54321`, Docker, or a project shared with another checkout.
  - `allowedDevOrigins` is `["127.0.0.1", "localhost", "**.localhost"]` in the shared Next config, so every Portless name and worktree prefix passes without a list per app.
- **Worktrees.** A new git worktree has none of the gitignored local secrets, such as the Supabase signing key. Generate them in each checkout with the repo's scripts (`pnpm supabase:signing-key`, `pnpm env:local`); never copy them between checkouts. Each worktree runs its own Supabase project and Portless names, so two branches never share ports.
  - Portless prefixes a worktree's hosts with its branch name (`my-branch.app.localhost`); a detached HEAD gets no prefix. Scripts that register extra aliases use the same prefix, and host-based code (brand or tenant lookup from the host) accepts prefixed `.localhost` hosts.
  - Never pass `--force` to `portless alias` inside a worktree. It takes over another worktree's hosts.
- **Google OAuth (`dev:oauth`):**
  - A separate proxy on `localtest.me`: `PORTLESS_STATE_DIR` in a temp dir, `PORTLESS_PORT=1355`, `portless proxy start --tld me`.
  - `portless alias supabase.localtest <api port> --force`, with the port from `supabase start --output-format json`.
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
2. Vercel Connect for third parties without an integration: `vercel connect create <provider> --name <name>`, then `attach`, with one connector per environment. Code reads tokens at runtime with `getToken("<provider>/<name>", { subject })` from `@vercel/connect`; locally the OIDC identity comes from `vercel link` and `pnpm env:pull`. Revoke a leaked token with `vercel connect revoke-tokens`. Never print connector tokens or trigger URLs.
3. Vercel OIDC for Vercel services.
4. Only then `vercel env add <KEY> <env> --sensitive`, in all three environments. Team-wide values are Shared Environment Variables.

**Files.** They follow Next's own precedence: `.env.development.local` beats `.env.local`.

| File                     | Written by                                                                                  | Holds                                      |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `.env.local`             | `pnpm env:pull` (`vercel env pull --environment=development`)                               | Hosted development keys                    |
| `.env.development.local` | `pnpm env:local` (from `supabase start --output-format json`, plus the local OAuth clients) | Local stack overrides                      |
| `.env.production.local`  | `pnpm env:pull:production`                                                                  | Production keys, only for debugging builds |

- Root scripts load `dotenv -e .env.development.local -e .env.local --`; the first file wins. `dev:hosted` loads only `.env.local`.
- Adding a key updates the t3-env schema, all three Vercel environments, `turbo.json` and `.env.example`. A key an EAS build reads also goes into the matching EAS environment.
- Expo apps load the root `.env*` files from `app.config.ts` before Metro runs, so `EXPO_PUBLIC_*` inlining sees the same values. Never keep a second `.env` in the app folder.
- Secrets never go in `NEXT_PUBLIC_*` variables or in git.
- `FLAGS_SECRET` (Flags precompute and Flags Explorer) is 32 random bytes in Base64, with a different value in each environment, and Sensitive in Preview and Production.
