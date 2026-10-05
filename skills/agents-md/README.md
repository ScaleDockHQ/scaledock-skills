# agents-md

An agent skill for the AGENTS.md open format (agents.md): writing, placing, migrating and reviewing the Markdown file that guides coding agents in a repository.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill agents-md
```

Then ask your agent to "write an AGENTS.md for this repository", "split our AGENTS.md across the monorepo packages", "review our AGENTS.md" or "consolidate CLAUDE.md and copilot-instructions.md into AGENTS.md".

## What it covers

- What AGENTS.md is, and how it complements README.md.
- Placement: the root file, nested files in packages, and precedence (the closest file wins, user prompts override).
- What to put in it: setup, build and test commands, code style, testing instructions, commit and pull request rules, security considerations.
- Writing concise, verifiable, command-first instructions, with examples, common mistakes and a review checklist.
- Migrating from `AGENT.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md` and others, with each tool's documented way to read AGENTS.md.
- Governance: stewardship by the Agentic AI Foundation under the Linux Foundation.

## Versions

| Line                      | Status  |
| ------------------------- | ------- |
| AGENTS.md site 2026-03-10 | current |

The format is unversioned; the line is pinned to the last commit that changed the format text on the site. `references/versions.md` lists its history, how to refresh the pin, and open proposals to watch.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AGENTS.md](https://agents.md/): published, format text commit 342016eb22df (2026-03-10).
- [agentsmd/agents.md](https://github.com/agentsmd/agents.md): `main` at d001185d792e (2026-09-10).
- [AGENTS.md Technical Charter](https://github.com/agentsmd/agents.md/blob/main/Technical_Charter.pdf): adopted 2025-12-08.
- [Linux Foundation AAIF announcement](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation): 2025-12-09.
- [AAIF projects](https://aaif.io/projects/).
- Tool documentation for per-tool loading behaviour: [Codex](https://developers.openai.com/codex/guides/agents-md), [GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [Claude Code](https://code.claude.com/docs/en/memory), [Cursor](https://cursor.com/docs/context/rules), [Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md), [Aider](https://aider.chat/docs/usage/conventions.html).

## License

MIT
