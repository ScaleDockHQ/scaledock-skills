# Repo standard report

<!-- The PR body at the end of a run. Keep every heading; write "None." under a heading that has nothing. Drop manual steps the repo kind or inputs exclude. -->

## Summary

Mode, repo kind, surfaces, framework and the other inputs, in one or two sentences.

## Gap table or created tree

- `upgrade` and `align`: the gap table from `references/audit.md`, with the final status of every row, including the CLI contract and scaffolding rows when the repo has a CLI.
- `new`: the created tree, and the packages and surfaces it contains.

## Changes

What was created and what was changed, grouped by area, with the commits that did it.

## Deviations kept

One line per ADR: number, title, and why it stays.

## Pre-release pins

One line per pin: package, version, why, and what moves it to stable.

## Baselines

One row per baseline from `references/performance.md`: what was measured, the value before the run, the value after it, and the commit that moved it. A CLI gets one row each for the `--version`, `--help` and heaviest leaf `--help` medians.

| Baseline | Before | After | Commit |
| -------- | ------ | ----- | ------ |

## Lint rules

One row per rule the run measured or turned on (see `references/lint-tightening.md`): the finding count before, the count after, and whether it is now on.

| Rule | Before | After | On  |
| ---- | ------ | ----- | --- |

## Verify

The `pnpm verify` result, and any check that cannot run locally.

## Manual steps

Steps an agent cannot do. Tick the ones already done.

- [ ] `vercel link`
- [ ] Marketplace installs and Connect connectors
- [ ] `pnpm self-update <version>` on every machine, after a pnpm bump
- [ ] macOS: add each GUI git client (Cursor, SourceTree) to Developer Tools in System Settings, Privacy and Security, so Gatekeeper lets the hooks run pnpm; repeat after `pnpm self-update`
- [ ] Remove `ENABLE_EXPERIMENTAL_COREPACK` from the Vercel project, when it was set
- [ ] Turn on the Dependency graph (Settings, then Code security) so `dependency-review-action` runs on a private repo
- [ ] `REUI_LICENSE_KEY` and `TURBO_REMOTE_CACHE_SIGNATURE_KEY` as team Shared Environment Variables, and `TURBO_REMOTE_CACHE_SIGNATURE_KEY` as a GitHub secret
- [ ] The `TURBO_TEAM` variable, then a CI run whose Remote Cache step is not `outcome=skipped`
- [ ] Web Analytics and Speed Insights
- [ ] After the first production deploy, `curl -I` an optimized image URL (`/_next/image?...`) on each web surface behind Services, and expect a `200`
- [ ] Branch protection (PR required, required checks, squash only) and the Supabase GitHub integration
- [ ] Stripe Data Pipeline connected to each Supabase project from the Stripe Dashboard
- [ ] The Google OAuth client
- [ ] The OAuth server settings, plus the Scalar and CLI clients for each environment
- [ ] npm trusted publishing
- [ ] Publishing `server.json` to the MCP Registry
- [ ] Creating `develop` at launch
- [ ] Expo: `eas init`, and the EAS environment variables for each environment
- [ ] Expo: the Apple team, the App Store Connect app and Sign in with Apple
- [ ] Expo: the Play Console app and its service account for EAS Submit
- [ ] Expo: APNs and FCM push credentials
- [ ] Expo: the `EXPO_TOKEN` GitHub secret
- [ ] Offline: the PowerSync instance connected to each Supabase project
