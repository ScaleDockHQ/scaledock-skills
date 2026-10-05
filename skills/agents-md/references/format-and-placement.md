# Format and placement

Read this when deciding where AGENTS.md files go, how nested files interact, how AGENTS.md relates to README.md, or why an agent does not seem to read a file. Sources: the agents.md site and the tool documents listed in [Sources](../SKILL.md#sources).

## What AGENTS.md is

- "A simple, open format for guiding coding agents" (site, hero; repository README).
- "Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide context and instructions to help AI coding agents work on your project" (README).
- It is "just standard Markdown". There are no required fields; use any headings, and "the agent simply parses the text you provide" (site, FAQ "Are there required fields?").
- The name was chosen to avoid "another proprietary file": "a name and format that could work for anyone" (site, Why AGENTS.md?).

## AGENTS.md and README.md

The site separates the two audiences (Why AGENTS.md?):

| File      | Audience | Holds                                                                                                                                                                 |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| README.md | Humans   | Quick starts, project descriptions, contribution guidelines.                                                                                                          |
| AGENTS.md | Agents   | "The extra, sometimes detailed context coding agents need: build steps, tests, and conventions that might clutter a README or aren't relevant to human contributors." |

AGENTS.md is "kept separate" to give agents a predictable place, to keep READMEs concise, and to "provide precise, agent-focused guidance that complements existing README and docs". So: do not move README content into AGENTS.md, and do not delete README sections because AGENTS.md exists.

## Placement

1. **Root.** "Create an AGENTS.md file at the root of the repository" (site, How to use, step 1).
2. **Nested.** For a large monorepo, "place another AGENTS.md inside each package. Agents automatically read the nearest file in the directory tree, so the closest one takes precedence and every subproject can ship tailored instructions" (site, How to use, step 4). The site notes that the main OpenAI repository had 88 AGENTS.md files at the time of writing.

```text
repo/
  AGENTS.md                 # repository-wide: setup, CI, commit rules
  packages/
    web/AGENTS.md           # web package: its test and dev commands
    api/AGENTS.md           # api package: its test command, migration rules
```

## Precedence

The format states two rules (site, FAQ "What if instructions conflict?"):

1. "The closest AGENTS.md to the edited file wins."
2. "Explicit user chat prompts override everything."

The format does not say whether a nested file replaces or adds to its parents. Tools document different mechanics (see below). Write so that both readings are safe: put repository-wide rules in the root file, put only what differs in the nested file, and when a nested file overrides a root rule, say so explicitly ("In this package, use `make test-payments` instead of `npm test`").

## How documented tools discover files

Only what each tool's own documentation states, as read on 2026-10-05. Re-check before relying on it.

| Tool           | Documented discovery and precedence                                                                                                                                                                                                                                                                                                                                                                                                      | Source               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Claude Code    | By default reads AGENTS.md only when no `CLAUDE.md`, `.claude/CLAUDE.md` or `CLAUDE.local.md` exists in the working directory or above; then reads every `AGENTS.md` and `.claude/AGENTS.md` from the working directory upward at start, and a subdirectory's AGENTS.md when it reads a file there. Does not read `AGENTS.override.md` or `AGENTS.local.md`. A "Project instructions" setting can load both. Requires v2.1.277 or later. | Claude Code docs     |
| Codex          | Global `~/.codex/AGENTS.override.md` or `AGENTS.md`, then from the project root (usually the Git root) down to the current directory, at most one file per directory, checking `AGENTS.override.md`, then `AGENTS.md`, then configured fallback names. Concatenates root-down so closer files appear later and override; skips empty files; stops at `project_doc_max_bytes` (32 KiB default).                                           | Codex docs           |
| Cursor         | Supports AGENTS.md in the project root and subdirectories; nested files apply when working with files in that directory or its children, "combined with parent directories, with more specific instructions taking precedence".                                                                                                                                                                                                          | Cursor docs          |
| Gemini CLI     | Reads `GEMINI.md` by default; the `context.fileName` setting accepts a name or list such as `["AGENTS.md", "CONTEXT.md", "GEMINI.md"]`. Loads a global file, files in workspace directories and their parents, and just-in-time files when a tool touches a directory; concatenates all found files.                                                                                                                                     | Gemini CLI docs      |
| GitHub Copilot | "You can create one or more AGENTS.md files, stored anywhere within the repository. When Copilot is working, the nearest AGENTS.md file in the directory tree will take precedence." Alternatively a single `CLAUDE.md` or `GEMINI.md` at the root. Code review reads instructions from the pull request's head branch.                                                                                                                  | GitHub Copilot docs  |
| Aider          | Loads conventions files given to `--read` or `/read`, or always via `read:` in `.aider.conf.yml`; the agents.md FAQ gives `read: AGENTS.md`. Nesting is not documented.                                                                                                                                                                                                                                                                  | Aider docs; site FAQ |

Consequences for authors:

- Size limits are tool-specific. Codex stops adding files at 32 KiB combined by default; keep the root file small and push detail into nested files (Codex docs, "Instructions truncated").
- A tool-specific file can hide AGENTS.md. With Claude Code's default setting, a `CLAUDE.md` on the path means AGENTS.md is not read (Claude Code docs, "My AGENTS.md isn't loading"). See `migration.md`.
- Empty files are skipped by Codex (Codex docs); do not commit placeholder AGENTS.md files.

## Debugging "the agent ignores AGENTS.md"

1. Confirm the file is named exactly `AGENTS.md` and sits at the root or on the path between the root and the edited file.
2. Ask the agent which instruction files it loaded, using the tool's documented check: Codex `codex --ask-for-approval never "Summarize the current instructions."`; Claude Code `/memory`; Gemini CLI `/memory show` (each tool's docs).
3. Look for a tool-specific file or override that takes priority: `AGENTS.override.md` (Codex), `CLAUDE.md` or `CLAUDE.local.md` (Claude Code).
4. Check size limits and the tool's configuration (fallback names, `context.fileName`, `read:`).
5. Remember that a user prompt overrides the file (site, FAQ).

## Governance

AGENTS.md "emerged from collaborative efforts across the AI software development ecosystem, including OpenAI Codex, Amp, Jules from Google, Cursor, and Factory" (site, About). The Linux Foundation announced the Agentic AI Foundation on 2025-12-09 with AGENTS.md, contributed by OpenAI, as a founding project alongside MCP and goose; the release says AGENTS.md was released by OpenAI in August 2025 and adopted by more than 60,000 open-source projects (LF press release). The site says AGENTS.md "is now stewarded by the Agentic AI Foundation under the Linux Foundation" (About), and the AAIF projects page lists it. The project is "AGENTS.md a Series of LF Projects, LLC", run by a Technical Steering Committee whose mission is "to develop a simple, open format for guiding AI coding agents" (Technical Charter, § 1, § 2).
