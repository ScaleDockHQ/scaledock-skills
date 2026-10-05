# openfeature

An agent skill for the OpenFeature specification (0.9.0 current, 0.8.0 supported, upgrades from older 0.x releases): vendor-neutral feature flag evaluation with providers, clients, evaluation context, hooks, events and tracking, plus a summary of the OpenFeature Remote Evaluation Protocol (OFREP).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openfeature
```

Then ask your agent to "add OpenFeature flags to this service" or "review this OpenFeature provider against the spec".

## What it covers

- The evaluation API: provider mutator, domains, clients, typed and detailed evaluation, error codes and reasons.
- The dynamic-context and static-context paradigms, evaluation context, the targeting key and merge order.
- Hooks, their stages and ordering, hook hints and hook data, and the telemetry mapping from Appendix D.
- Providers, resolution details, lifecycle, provider status and events.
- Tracking (Experimental) and OFREP (no release yet, tracked at a commit).
- Section statuses: which parts are Stable, Hardening or Experimental.

## Versions

| Line                               | Status                |
| ---------------------------------- | --------------------- |
| OpenFeature 0.9                    | current               |
| OpenFeature 0.8                    | supported             |
| OpenFeature 0.1 to OpenFeature 0.7 | legacy (upgrade from) |

No 1.0 and no preview exist. OFREP is a separate protocol, tracked at a commit. `references/versions.md` says which release to target and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenFeature specification v0.9.0](https://github.com/open-feature/spec/releases/tag/v0.9.0): Released, 2026-07-29, with sections 1 to 6, types, glossary and Appendix D at that tag.
- [OpenFeature specification releases](https://github.com/open-feature/spec/releases): v0.1.0 to v0.9.0 with release notes, including [v0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0) and [v0.7.0](https://github.com/open-feature/spec/releases/tag/v0.7.0).
- [OpenFeature Remote Evaluation Protocol](https://github.com/open-feature/protocol): no release, OpenAPI 0.4.0 at commit 98c4e0d.
- [OpenFeature at CNCF](https://www.cncf.io/projects/openfeature/): Incubating since November 21, 2023.

## License

MIT
