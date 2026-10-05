---
name: agent-skills
description: >-
  Agent Skills spec 2026-08-04 (agentskills.io): write, review and validate SKILL.md skills, and load them in an agent.
  Covers the skill folder layout, the SKILL.md frontmatter (name, description, license, compatibility, metadata,
  allowed-tools) with its length and character limits, body guidance, progressive disclosure across metadata,
  instructions and resources, the optional scripts/, references/ and assets/ directories, relative file references,
  validation with the skills-ref reference library, and how clients discover, disclose, activate and keep skills in
  context. Use when creating or editing a skill, writing a description that triggers reliably, splitting a long
  SKILL.md, bundling scripts, checking a skill against the spec, running skills-ref validate, or adding Agent Skills
  support to an agent or tool (.agents/skills/ scanning, an available_skills catalog, an activate_skill tool).
  Triggers: SKILL.md, agent skill, skills-ref, progressive disclosure, allowed-tools, skill frontmatter.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Agent Skills

Agent Skills is an open format, published at agentskills.io and developed in the `agentskills/agentskills` GitHub repository, for giving agents task-specific instructions and resources. A skill is a folder with a `SKILL.md` file (YAML frontmatter plus Markdown) and optional bundled files. With this skill the agent writes and reviews skills that follow the specification, validates them with `skills-ref`, and implements skill discovery and loading in a client.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: skill author (writes or edits a skill), reviewer (checks one against the spec), or client implementer (adds skills support to an agent or tool).
- Target version: Agent Skills spec 2026-08-04 (default and only line). The specification is unversioned, so the line is pinned by the date and commit of the specification page. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the commit history of `docs/specification.mdx` in the GitHub repository for a newer commit, and update the pins.
- Skill purpose: the task the skill teaches, the user phrases that should trigger it, and the near-miss phrases that should not.
- Environment needs: tools, packages, runtimes or network access the skill's instructions rely on (for `compatibility`).
- Client environment (client role only): local filesystem or sandboxed/cloud, and whether the model can read files or needs a dedicated activation tool.

## Invariants

1. **A skill is a directory with a `SKILL.md`** (spec, Directory structure). Everything else in the folder is optional, and any extra files or directories are allowed (spec, Optional directories).
2. **`SKILL.md` is YAML frontmatter followed by Markdown** (spec, `SKILL.md` format). The frontmatter sits between `---` delimiters at the start of the file (client guide, Step 2).
3. **`name` is required and strict.** 1 to 64 characters; only lowercase `a-z`, `0-9` and `-`; no leading or trailing hyphen; no `--`; equal to the parent directory name (spec, `name` field).
4. **`description` is required.** 1 to 1024 characters, non-empty, and says both what the skill does and when to use it, with keywords that help agents match tasks (spec, `description` field). Clients skip a skill whose description is missing (client guide, Lenient validation).
5. **Only the six defined fields.** The spec defines `name`, `description`, `license`, `compatibility`, `metadata` and `allowed-tools` (spec, Frontmatter). `skills-ref` rejects any other top-level key (`validator.py`, `ALLOWED_FIELDS`). Extra properties go in `metadata` (spec, `metadata` field).
6. **`compatibility` is 1 to 500 characters when present**, and only used for real environment requirements (spec, `compatibility` field).
7. **`metadata` maps string keys to string values**; pick reasonably unique key names (spec, `metadata` field). Quote values such as `"1.0"` so they stay strings.
8. **`allowed-tools` is a space-separated string and is experimental**; support varies by client (spec, `allowed-tools` field).
9. **File references are relative to the skill root and one level deep** from `SKILL.md`; avoid nested reference chains (spec, File references).
10. **Progressive disclosure budget.** Name and description load at startup for every skill (~100 tokens); the full body loads on activation (< 5000 tokens recommended); resources load only when needed. Keep `SKILL.md` under 500 lines (spec, Progressive disclosure).

## Workflow

1. **Pick the version.** Use the Agent Skills spec 2026-08-04 line and note the pinned commit.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target line and commit are recorded.
2. **Scope and name the skill.** One coherent unit of work, neither so narrow that several skills must load for one task nor so broad it cannot activate precisely (best practices, Design coherent units). Pick a `name` that satisfies invariant 3 and create the folder with that exact name.
   -> [`references/format.md`](references/format.md)
   ✓ The folder name equals `name`, and `name` passes every rule in the `name` field section.
3. **Write the frontmatter.** `name`, `description`, then only the optional fields you need. Quote or block-scalar any value containing `: ` (client guide, Handling malformed YAML).
   -> [`references/format.md`](references/format.md)
   ✓ The frontmatter parses as YAML, has no extra top-level keys, and every length limit holds.
4. **Write the description for triggering.** Imperative ("Use this skill when…"), user intent over implementation, explicit contexts including ones where the user does not name the domain, at most 1024 characters (optimizing descriptions, Writing effective descriptions).
   -> [`references/authoring-and-validation.md`](references/authoring-and-validation.md)
   ✓ It states what the skill does and when to use it, and it is under 1024 characters.
5. **Write the body.** Add what the agent lacks and cut what it already knows; give defaults instead of menus; add gotchas, templates, checklists and validation loops where they fit (best practices).
   -> [`references/authoring-and-validation.md`](references/authoring-and-validation.md)
   ✓ Every instruction would change the agent's behaviour if removed.
6. **Split for progressive disclosure.** Move long material to `references/`, executable code to `scripts/`, templates and data to `assets/`, and say in the body _when_ to load each file (best practices, Structure large skills with progressive disclosure).
   -> [`references/progressive-disclosure.md`](references/progressive-disclosure.md)
   ✓ `SKILL.md` is under 500 lines, and every bundled file is referenced by a relative path one level deep with a load condition.
7. **Bundle scripts for agents** (when the skill runs code). No interactive prompts, `--help`, clear errors, structured stdout and diagnostics on stderr, pinned dependencies (using scripts).
   -> [`references/authoring-and-validation.md`](references/authoring-and-validation.md)
   ✓ Each script runs non-interactively from the skill root with a single documented command.
8. **Validate.** Run `skills-ref validate path/to/skill`, then check what it does not: body length, references, and description triggering against should-trigger and near-miss prompts.
   -> [`references/authoring-and-validation.md`](references/authoring-and-validation.md)
   ✓ `skills-ref validate` prints `Valid skill:` and exits 0, and trigger evals pass.
9. **Integrate in a client** (client role only). Discover, parse leniently, disclose a catalog, activate on demand, protect activated content from compaction.
   -> [`references/client-integration.md`](references/client-integration.md)
   ✓ A test skill appears in the catalog, activates from a matching task, and its resources load only when referenced.
10. **Upgrade** (only when asked). Re-read the specification at its latest commit, apply the changes listed in the upgrade section, and re-validate.
    -> [`references/versions.md`](references/versions.md)
    ✓ The skill validates against the new revision and behaves the same.

## Verify before done

- [ ] The folder contains `SKILL.md`, and the folder name equals `name` (spec, `name` field).
- [ ] `name` matches `^[a-z0-9]+(-[a-z0-9]+)*$` and is at most 64 characters.
- [ ] `description` is 1 to 1024 characters and says what and when.
- [ ] `compatibility`, if present, is at most 500 characters; `metadata` values are strings; `allowed-tools` is one space-separated string.
- [ ] No frontmatter keys beyond the six defined fields.
- [ ] `SKILL.md` is under 500 lines; bundled files are referenced by relative path, one level deep, with a load condition.
- [ ] `skills-ref validate` passes.
- [ ] For clients: project-level skills override user-level ones on a name collision, and untrusted project skills are gated (client guide, Step 1).

## Reference index

- **`references/versions.md`**: the single spec line, how it is pinned, its history, how to refresh the pin, and open spec proposals to watch. Load for steps 1 and 10.
- **`references/format.md`**: folder layout, every frontmatter field with its constraints and examples, body content, optional directories and file references. Load for steps 2 and 3.
- **`references/progressive-disclosure.md`**: the three loading tiers, their budgets, and how to split a skill so each tier stays small. Load for step 6.
- **`references/authoring-and-validation.md`**: description and body writing guidance, scripts for agentic use, `skills-ref` install and checks, trigger evals, and common mistakes. Load for steps 4, 5, 7 and 8.
- **`references/client-integration.md`**: discovery paths, parsing and lenient validation, the catalog, activation, and context management for clients. Load for step 9.

## Related skills

- `agents-md` for repository-wide agent instructions in `AGENTS.md`, which complement task-specific skills: `npx skills add ScaleDockHQ/scaledock-skills --skill agents-md`.
- `llms-txt` for publishing an `/llms.txt` index of documentation for language models: `npx skills add ScaleDockHQ/scaledock-skills --skill llms-txt`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Agent Skills Specification](https://agentskills.io/specification): published, unversioned, commit 217be548739f of `docs/specification.mdx` (2026-08-04), checked 2026-10-05.
- [Agent Skills Overview](https://agentskills.io/home): published, commit 092659e3ec0e of `docs/home.mdx` (2026-04-19), checked 2026-10-05.
- [How to add skills support to your agent](https://agentskills.io/client-implementation/adding-skills-support): published guide, commit 22d6aeb3534d (2026-03-10), checked 2026-10-05.
- [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices): published guide, commit b8d2613ac050 (2026-04-19), checked 2026-10-05.
- [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions): published guide, commit b8d2613ac050 (2026-04-19), checked 2026-10-05.
- [Using scripts in skills](https://agentskills.io/skill-creation/using-scripts): published guide, commit 6102affec88b (2026-02-27), checked 2026-10-05.
- [agentskills/agentskills on GitHub](https://github.com/agentskills/agentskills): specification and documentation repository, `main` at 69ef37e9424c (2026-08-09), with `CONTRIBUTING.md`, checked 2026-10-05.
- [skills-ref reference library](https://github.com/agentskills/agentskills/tree/main/skills-ref): reference library 0.1.0, demonstration only, commit f130f348f502 (2026-08-03), checked 2026-10-05.
