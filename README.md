# scaledock-skills

Agent skills we use across ScaleDock projects. Each skill is a folder with a `SKILL.md` that teaches coding agents (Cursor, Claude Code, Codex, and others) how to handle a specific task the ScaleDock way.

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

Every skill name starts with `scaledock-`, so it never collides with a skill from another publisher in your `.agents/skills` folder.

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or update a skill.

## License

[MIT](LICENSE)
