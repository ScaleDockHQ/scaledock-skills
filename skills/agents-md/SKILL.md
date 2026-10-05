---
name: agents-md
description: >-
  AGENTS.md site 2026-03-10 (agents.md): write, place, migrate and review AGENTS.md agent instruction files.
  The open, unversioned Markdown format for guiding coding agents, stewarded by the Agentic AI Foundation (Linux
  Foundation). Covers placement (repository root, nested files, the closest file wins, user prompts override), content
  (setup, build and test commands, code style, testing, commit and PR conventions, security notes), how it complements
  README.md, and migrating from CLAUDE.md, GEMINI.md, .github/copilot-instructions.md or AGENT.md by renaming,
  symlinking, importing or configuring each tool as its own docs describe. Use when creating or editing an AGENTS.md,
  splitting one across a monorepo, reviewing one for stale or unverifiable instructions, consolidating agent
  instruction files, or checking why an agent ignores it. Triggers: AGENTS.md, agent instructions file, README for
  agents, nested AGENTS.md.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# AGENTS.md

AGENTS.md is "a simple, open format for guiding coding agents", published at agents.md and developed in the `agentsmd/agents.md` GitHub repository. It is a plain Markdown file, a "README for agents", that tells coding agents how to set up, build, test and change a project. OpenAI released it in August 2025; since December 2025 it is a project of the Agentic AI Foundation (AAIF) under the Linux Foundation. With this skill the agent writes, places, migrates and reviews AGENTS.md files.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: author (writes or edits AGENTS.md), reviewer (checks one), or migrator (consolidates tool-specific instruction files into AGENTS.md).
- Target version: AGENTS.md site 2026-03-10 (default and only line). The format has no version number, tags or releases, so the line is pinned by the date and commit of the last change to the format text on the site. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the commit history of `agentsmd/agents.md` for changes under `components/`, re-read each tool document you rely on, and update the pins.
- Repository shape: single project or monorepo, and the packages or services that need their own instructions.
- Agents in use: which coding agents read this repository, and which other instruction files exist (for example `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursorrules`, `AGENT.md`).
- Commands: the real setup, build, test, lint and format commands, and where CI runs them.

## Invariants

1. **The file is named `AGENTS.md` and is plain Markdown with no required fields.** Use any headings; the agent parses the text (site, FAQ "Are there required fields?").
2. **One file at the repository root.** Create `AGENTS.md` at the root of the repository (site, How to use, step 1).
3. **Nested files for subprojects; the closest one wins.** Place another `AGENTS.md` inside each package; agents read the nearest file in the directory tree, so the closest one takes precedence (site, How to use, step 4). On conflict, the closest `AGENTS.md` to the edited file wins (site, FAQ "What if instructions conflict?").
4. **Explicit user chat prompts override everything** (site, FAQ "What if instructions conflict?"). AGENTS.md is the default, not a lock.
5. **AGENTS.md complements README.md; it does not replace it.** README.md is for humans; AGENTS.md holds the extra context agents need: build steps, tests and conventions that would clutter a README (site, Why AGENTS.md?).
6. **Every listed check must actually run.** Agents attempt to execute the relevant programmatic checks listed in AGENTS.md and fix failures before finishing (site, FAQ "Will the agent run testing commands…?"). A wrong command costs every task.
7. **It is living documentation.** Update it when the project changes (site, FAQ "Can I update it later?").
8. **Migrate by renaming and symlinking.** Rename an existing instruction file to `AGENTS.md` and symlink the old name to it for backward compatibility (site, FAQ "How do I migrate existing docs to AGENTS.md?").
9. **Loaders differ; state per-tool behaviour only from that tool's documentation.** For example, one tool concatenates every file from the root down with a 32 KiB default cap (Codex docs), another reads AGENTS.md only when no `CLAUDE.md` is on the path by default (Claude Code docs). The format itself specifies none of this.
10. **Instructions are guidance, not enforcement.** Tool documentation calls instruction files "context, not enforced configuration" (Claude Code docs) and says "AI guidance should not be your only security control" (Cursor docs). Enforce critical rules in CI, hooks or permissions.

## Workflow

1. **Pick the version.** Use the AGENTS.md site 2026-03-10 line and note the pinned commit.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target line and commit are recorded.
2. **Inventory the repository.** Read README.md, CONTRIBUTING.md, the CI workflows, build scripts and every existing agent instruction file (Copilot docs, onboarding prompt "StepsToFollow").
   -> [`references/writing-guide.md`](references/writing-guide.md)
   ✓ You have a list of the commands CI runs, the conventions already written down, and every instruction file to migrate.
3. **Decide placement.** One root `AGENTS.md`; add nested files only where a package or service needs different commands or rules (invariant 3).
   -> [`references/format-and-placement.md`](references/format-and-placement.md)
   ✓ Every nested file has a reason that its parent cannot cover.
4. **Write the commands first.** Setup, build, test, a single focused test, lint and format, each as an exact command in backticks, with the directory it runs from (site, Examples).
   -> [`references/writing-guide.md`](references/writing-guide.md)
   ✓ You ran every command in a clean checkout and it did what the file says.
5. **Add conventions.** Code style, testing instructions, commit and pull request rules, security considerations, and anything you would tell a new teammate (site, How to use, steps 2 and 3).
   -> [`references/writing-guide.md`](references/writing-guide.md)
   ✓ Every instruction is concrete enough to check, and nothing repeats README.md.
6. **Keep it concise.** Cut what the agent can find in seconds, keep rules short, and split by directory instead of growing one file (writing guide, Concise).
   -> [`references/writing-guide.md`](references/writing-guide.md)
   ✓ The file fits the smallest loader limit of the agents in use.
7. **Migrate and wire up tools** (when other instruction files exist). Merge their content into AGENTS.md, then rename and symlink, import, or configure each tool as its own documentation says.
   -> [`references/migration.md`](references/migration.md)
   ✓ Each agent in use loads the same instructions once, confirmed with that tool's own check.
8. **Review.** Run the review checklist on new and existing files.
   -> [`references/writing-guide.md`](references/writing-guide.md)
   ✓ No stale paths, no failing commands, no contradictions between root and nested files.
9. **Upgrade** (only when asked). Re-read the site at its latest commit, apply the refresh steps, and re-check every tool document you cite.
   -> [`references/versions.md`](references/versions.md)
   ✓ The file follows the new revision and the agents in use behave the same.

## Verify before done

- [ ] A file named exactly `AGENTS.md` exists at the repository root (site, How to use).
- [ ] Every command in it ran successfully from the stated directory.
- [ ] Nested files exist only where instructions differ, and none contradicts its parent without saying so.
- [ ] README.md still serves humans; AGENTS.md does not duplicate it (site, Why AGENTS.md?).
- [ ] Every path, script and file the instructions name exists.
- [ ] Every symlink or import from an old instruction file resolves to `AGENTS.md`, and no agent loads the same content twice.
- [ ] Every claim about how a specific agent loads the file is backed by that agent's documentation in [Sources](#sources).
- [ ] Security-critical rules are also enforced outside AGENTS.md (invariant 10).

## Reference index

- **`references/versions.md`**: the single line, how it is pinned, its history, how to refresh the pin, and open proposals to watch. Load for steps 1 and 9.
- **`references/format-and-placement.md`**: the file's format, root and nested placement, precedence, the relation to README.md, governance, and how documented tools discover files. Load for step 3 and when an agent ignores a file.
- **`references/writing-guide.md`**: what to put in the file, command-first structure, writing concise and verifiable instructions, examples, common mistakes and the review checklist. Load for steps 2, 4, 5, 6 and 8.
- **`references/migration.md`**: moving from `AGENT.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursorrules` and others, with each tool's documented way to read AGENTS.md. Load for step 7.

## Related skills

- `agent-skills` for task-specific `SKILL.md` skills, which complement repository-wide AGENTS.md instructions: `npx skills add ScaleDockHQ/scaledock-skills --skill agent-skills`.
- `llms-txt` for publishing an `/llms.txt` index of documentation for language models: `npx skills add ScaleDockHQ/scaledock-skills --skill llms-txt`.
- `mcp` for connecting agents to tools and data with the Model Context Protocol: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [AGENTS.md](https://agents.md/): published, unversioned; format text last changed in commit 342016eb22df (2026-03-10), site read at `main` d001185d792e (2026-09-10), checked 2026-10-05.
- [agentsmd/agents.md on GitHub](https://github.com/agentsmd/agents.md): format and site repository (README, `components/`, `AGENTS.md`), MIT, `main` at d001185d792e (2026-09-10), no tags or releases, checked 2026-10-05.
- [AGENTS.md Technical Charter](https://github.com/agentsmd/agents.md/blob/main/Technical_Charter.pdf): adopted 2025-12-08, AGENTS.md a Series of LF Projects, LLC, checked 2026-10-05.
- [Linux Foundation Announces the Formation of the Agentic AI Foundation (AAIF)](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation): press release, 2025-12-09, checked 2026-10-05.
- [AAIF projects](https://aaif.io/projects/): foundation project list, undated, checked 2026-10-05.
- [Custom instructions with AGENTS.md (Codex)](https://developers.openai.com/codex/guides/agents-md): tool documentation, undated, checked 2026-10-05.
- [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions): tool documentation, undated, checked 2026-10-05.
- [How Claude remembers your project (Claude Code)](https://code.claude.com/docs/en/memory): tool documentation, covers v2.1.277 to v2.1.283, checked 2026-10-05.
- [Rules (Cursor)](https://cursor.com/docs/context/rules): tool documentation, undated, checked 2026-10-05.
- [Provide context with GEMINI.md files (Gemini CLI)](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md): tool documentation, commit 93844dfa10f6 (2026-06-18), checked 2026-10-05.
- [Specifying coding conventions (Aider)](https://aider.chat/docs/usage/conventions.html): tool documentation, undated, checked 2026-10-05.
