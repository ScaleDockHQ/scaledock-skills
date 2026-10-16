# 0007. Release watch lists per opinionated skill

- Status: accepted
- Date: 2026-10-16

## Context

Opinionated skills name packages, CLIs and platform features that change quickly. Supabase alone shipped a stable `@supabase/server` 1.x, a stable `@supabase/middleware`, a native local runtime and a new diff engine within weeks, and the skills kept describing the older APIs until someone happened to read the blog. Spec skills already have `sources` and `pnpm sources:check`, but those pin documents, not releases, and opinionated skills have no equivalent.

## Decision

- Each opinionated skill lists what it depends on in `metadata.json` `watch`: npm packages (with the `seen` version and an optional dist-tag), GitHub repositories (releases) and RSS or Atom feeds, each with a `checked` date.
- The list lives in the skill, next to its `version` and `references`, so the skill that would change owns the trigger, and `pnpm watch:check <skill>` can refresh one skill at a time.
- `pnpm validate` checks the shape. `pnpm watch:check` fetches the registry, GitHub and the feeds and reports what is newer. It needs the network and reports rather than gates, so it stays out of `pnpm verify`, like `pnpm sources:check`.
- npm reports `latest` (or the entry's `tag`) past `seen`, and other tags only when they preview a new major, matching the "new majors first" rule without reporting every canary.

## Consequences

- Reviewing a watch item always ends with a bumped `checked` (and `seen`), so the next run starts from there, even when the skill did not change.
- Adding a dependency to an opinionated skill adds a watch entry; AGENTS.md lists it in "When you change X".
- The report is only as good as the list. Feeds cover features that ship without a package release, such as platform defaults.
