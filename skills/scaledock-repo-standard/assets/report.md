# Repo standard report

<!-- The PR body at the end of a run. Keep every heading; write "None." under a heading that has nothing. Drop manual steps the repo kind or inputs exclude. -->

## Summary

Mode, repo kind, surfaces, framework and the other inputs, in one or two sentences.

## Gap table or created tree

- `upgrade` and `align`: the gap table from `references/audit.md`, with the final status of every row.
- `new`: the created tree, and the packages and surfaces it contains.

## Changes

What was created and what was changed, grouped by area, with the commits that did it.

## Deviations kept

One line per ADR: number, title, and why it stays.

## Pre-release pins

One line per pin: package, version, why, and what moves it to stable.

## Verify

The `pnpm verify` result, and any check that cannot run locally.

## Manual steps

Steps an agent cannot do. Tick the ones already done.

- [ ] `vercel link`
- [ ] Marketplace installs and Connect connectors
- [ ] `REUI_LICENSE_KEY` and `TURBO_REMOTE_CACHE_SIGNATURE_KEY` as team Shared Environment Variables
- [ ] The `TURBO_TEAM` variable
- [ ] Web Analytics and Speed Insights
- [ ] Branch protection (PR required, required checks, squash only) and the Supabase GitHub integration
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
