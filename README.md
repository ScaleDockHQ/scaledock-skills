# scaledock-skills

Agent skills for coding agents (Cursor, Claude Code, Codex, and others). Each skill is a folder with a `SKILL.md`. There are two kinds:

- **Spec skills** teach one open specification (OpenAPI, SCIM, A2A, WebMCP, the OpenID Foundation specs, and more). They are named after the spec, stay neutral, and pin the sources they were written from.
- **ScaleDock skills** (`scaledock-*`) are opinionated. They bundle spec skills, add the ScaleDock stack choices, and use [PermDock](https://github.com/ScaleDockHQ/PermDock) for permissions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills
```

The CLI lists every skill in this repo and asks which ones to install (space to toggle). To skip the picker:

```bash
# See what's available
npx skills add ScaleDockHQ/scaledock-skills --list

# Install one or more skills by name
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-repo-standard

# Same thing, shorter
npx skills add ScaleDockHQ/scaledock-skills@scaledock-repo-standard
```

Add `-g` to install globally (user level) instead of per project. Run `npx skills update` to pull the latest versions.

ScaleDock skills start with `scaledock-`, so they never collide with a skill from another publisher in your `.agents/skills` folder. Spec skills use the spec's own name; another publisher's skill with the same name covers the same specification ([ADR 0003](docs/decisions/0003-spec-skills-without-prefix.md)).

## Skills

| Skill                                                       | Description                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`scaledock-repo-standard`](skills/scaledock-repo-standard) | Create a new product, library or tooling repo, or upgrade or align existing ones, to the ScaleDock standard: latest Node on Vercel, pnpm, TypeScript, Next.js or Expo (iOS, Android and web), Supabase with better-supabase, PermDock, oRPC, MCP, CLI, Fumadocs and Vercel. |

## Development

You need the Node major in `.node-version` and the pnpm version pinned in `package.json`.

```bash
pnpm install
pnpm verify
```

| Script                      | What it does                                                        |
| --------------------------- | ------------------------------------------------------------------- |
| `pnpm validate`             | Checks every skill's frontmatter, versions, links and README entry. |
| `pnpm format`               | Formats the repo with oxfmt.                                        |
| `pnpm format:check`         | Fails when a file isn't formatted.                                  |
| `pnpm check`, `pnpm verify` | Runs `format:check` and `validate`. CI runs `pnpm verify`.          |
| `pnpm sources:check`        | Fetches every spec skill source; lists dead links and stale dates.  |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or update a skill.

## License

[MIT](LICENSE)
