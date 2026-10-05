# Migration from tool-specific files

Read this when a repository already has agent instruction files with other names, or when one agent in use does not read AGENTS.md on its own. The format gives one general rule; everything per tool comes from that tool's own documentation, as read on 2026-10-05. Sources: [Sources](../SKILL.md#sources).

## The general rule

"Rename existing files to AGENTS.md and create symbolic links for backward compatibility" (site, FAQ "How do I migrate existing docs to AGENTS.md?"):

```bash
mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md
```

The same pattern applies to any single-file instructions with a different name. When several files exist, merge their content into one AGENTS.md first, resolve contradictions, then link or import the old names.

## Steps

1. List every instruction file: root and nested `AGENTS.md`, `AGENT.md`, `CLAUDE.md`, `.claude/CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, `.cursorrules`, `.cursor/rules/`, `CONVENTIONS.md`, and anything else the agents in use load.
2. Merge the shared content into AGENTS.md (root, or nested where it is directory-specific). Keep tool-specific settings out of it.
3. Wire each agent in use to AGENTS.md with the method its documentation gives (table below).
4. Confirm with each tool's own check that it loads AGENTS.md once.
5. Remove the old file only when no agent in use still depends on it.

## Per-tool wiring, as documented by each tool

| Tool           | Old or native file                                                          | Documented way to use AGENTS.md                                                                                                                                                                                                                                                                                                                                | How to confirm                                                                       |
| -------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Aider          | `CONVENTIONS.md` loaded with `--read`                                       | `read: AGENTS.md` in `.aider.conf.yml` (site, FAQ "How do I configure Aider?"; Aider docs, Always load conventions).                                                                                                                                                                                                                                           | Aider prints that the file was added to the chat (Aider docs).                       |
| Claude Code    | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`                         | v2.1.277+ reads AGENTS.md when no `CLAUDE.md` or `CLAUDE.local.md` is on the path. To keep a `CLAUDE.md`, put `@AGENTS.md` at its top and Claude-specific notes below; or set Project instructions to `claude-md-and-agents-md`; or, with no Claude-specific content, `ln -s AGENTS.md CLAUDE.md`. Use the import, not a symlink, if anyone clones on Windows. | `/memory` lists the AGENTS.md path (Claude Code docs).                               |
| Codex          | reads `AGENTS.md` natively; `AGENTS.override.md`                            | Native. To keep another name, add it to `project_doc_fallback_filenames` in `~/.codex/config.toml`; a file named `AGENTS.override.md` in the same directory wins over `AGENTS.md`.                                                                                                                                                                             | `codex --ask-for-approval never "Summarize the current instructions."` (Codex docs). |
| Cursor         | `.cursor/rules/*.mdc` project rules                                         | Native in the project root and subdirectories. AGENTS.md is the plain-Markdown alternative to `.mdc` rules, which need frontmatter (Cursor docs).                                                                                                                                                                                                              | Not documented on the pinned page.                                                   |
| Gemini CLI     | `GEMINI.md`                                                                 | Set `context.fileName` in `.gemini/settings.json`, for example `{"context": {"fileName": ["AGENTS.md", "GEMINI.md"]}}` (Gemini CLI docs; site, FAQ "How do I configure Gemini CLI?").                                                                                                                                                                          | `/memory show` prints the loaded context (Gemini CLI docs).                          |
| GitHub Copilot | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | Native: AGENTS.md files anywhere in the repository, nearest takes precedence. Alternatively a single `CLAUDE.md` or `GEMINI.md` at the root (Copilot docs).                                                                                                                                                                                                    | The instructions file appears in the chat response's references (Copilot docs).      |

### Claude Code details

From the Claude Code docs, "Remove an earlier AGENTS.md workaround":

- A `CLAUDE.md` containing `@AGENTS.md` can stay; the import never loads AGENTS.md twice.
- A `CLAUDE.md` that tells Claude in words to read AGENTS.md is unreliable: replace it with `@AGENTS.md` or delete it.
- A `CLAUDE.md` symlinked to AGENTS.md is fine; the content is read once. Its Edit and Write tools refuse to write through a symlink and direct edits to the target.
- A SessionStart hook that prints AGENTS.md should be removed once AGENTS.md loads directly, or the content appears twice.
- Adding a personal `CLAUDE.local.md` stops the default setting from reading AGENTS.md.
- Running `/init` reads `.cursor/rules/`, `.cursorrules` and `.github/copilot-instructions.md` (and, with `CLAUDE_CODE_NEW_INIT=1`, AGENTS.md and others) into a generated `CLAUDE.md`; `/import` appends a one-time copy of instruction files such as AGENTS.md to `CLAUDE.md`. Both copy content rather than link it, so the copies can drift from AGENTS.md.

### Codex details

From the Codex docs: global guidance lives in `~/.codex/AGENTS.md` (or `$CODEX_HOME`); `~/.codex/AGENTS.override.md` is a temporary global override. Raise `project_doc_max_bytes` or split files if instructions are truncated.

## Symlinks or imports

- The site's general rule is a symlink (FAQ).
- One tool documents a limit: on Windows, creating a symlink needs Administrator privileges or Developer Mode, and Git checks a committed symlink out as a plain text file unless `core.symlinks` is enabled, leaving a one-line file in place of the instructions (Claude Code docs, Share one file with other coding tools). Where that tool supports an import (`@AGENTS.md`), prefer it in repositories cloned on Windows.
- Gemini CLI also supports `@file.md` imports inside `GEMINI.md` (Gemini CLI docs, Modularize context with imports), but its documented way to read AGENTS.md is `context.fileName`.

## Files without documented AGENTS.md wiring

The pinned sources do not document how to make `.cursorrules` or `.github/instructions/*.instructions.md` point at AGENTS.md. Move their shared content into AGENTS.md; keep the path-scoped Copilot files only for rules that need `applyTo` globs, since AGENTS.md has no frontmatter (site, FAQ "Are there required fields?"). Check the tool's current documentation before deleting an old file.
