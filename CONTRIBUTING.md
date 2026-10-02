# Contributing

## Setup

You need the Node major in `.node-version` and the pnpm version in `package.json`. pnpm downloads the right Node for you through `devEngines.runtime`.

```bash
pnpm install
```

This also installs the git hooks: oxfmt formats staged files, commitlint checks the commit message, and `pnpm verify` runs before every push. Commit messages and PR titles are conventional commit headers of at most 72 characters, such as `feat: add scaledock-auth skill`.

## Naming

There are two kinds of skill, and the folder always has the same name as the skill. See [ADR 0003](docs/decisions/0003-spec-skills-without-prefix.md).

- **Opinionated skills** are named `scaledock-<topic>`. Installed skills from every publisher share flat folders such as `.agents/skills/<name>`, so an unprefixed name like `repo-standard` could overwrite, or be overwritten by, someone else's skill.
- **Spec skills** describe an open specification and are named after it, without a prefix: `openapi`, `scim`, `a2a`. They set `metadata.kind: standard`, pin their sources, and stay neutral: no ScaleDock, no PermDock. The only allowed mentions are `author: ScaleDockHQ` and the install source `ScaleDockHQ/scaledock-skills`.

`pnpm validate` rejects an unprefixed name unless the skill is a spec skill.

## Adding a skill

1. Copy the template into a new folder under `skills/`:

   ```bash
   cp -r template/skill skills/scaledock-<topic>     # opinionated skill
   cp -r template/standard-skill skills/<spec-name>  # spec skill
   ```

2. Edit `skills/scaledock-<topic>/SKILL.md`:
   - `name` must be `scaledock-<topic>` in kebab-case and match the folder name exactly.
   - `description` must say what the skill does **and when to use it**. Agents decide whether to load a skill based on this field alone, so include the situations and phrases that should trigger it. Keep it under 1024 characters.
   - Start `description` with the action. The install picker shows only its first 57 characters as the hint.
   - Set `metadata.author` and start `metadata.version` at `"1.0.0"`.
3. Keep `SKILL.md` focused and short: inputs, invariants, a step-by-step workflow, a "verify before done" checklist, and a reference index. Move the detail into `references/` and link to it from the workflow step that needs it, so agents load it only when they get there.
4. Fill in `README.md` (for people browsing GitHub) and `metadata.json` (version, date, abstract, reference URLs).
5. Validate:

   ```bash
   pnpm validate
   ```

6. Add the skill to the table in [README.md](README.md). The validator fails until it is listed.

## Layout

```
skills/<name>/
  SKILL.md        # required: frontmatter + workflow, always loaded
  README.md       # overview, install command, rules, reference list
  metadata.json   # version, organization, date, abstract, references (sources for spec skills)
  references/     # topic docs the agent loads on demand
  scripts/        # optional helper scripts the agent can run
  assets/         # optional templates and static files
```

`skills/` holds the skills this repo publishes. `template/skill/` and `template/standard-skill/` are the starting points; they sit one level deeper than `template/` so the `skills` CLI does not offer them in the install picker. `.agents/skills/` holds skills installed _into_ this repo for local development (managed by `pnpm dlx skills` and tracked in `skills-lock.json`); don't put published skills there.

## Updating a skill

Bump the version in `SKILL.md` (`metadata.version`) and `metadata.json` together, following semver: patch for wording fixes, minor for new guidance, major when the skill's workflow or invariants change. The validator fails when the two versions differ.

## Spec skill sources

A spec skill writes every rule from a source it has read, never from memory, and cites the section it comes from. Its sources live in two places that must agree:

- `metadata.json` `sources`: one entry per document, with `title`, `url`, `status` (the publishing body's maturity term, such as `RFC`, `Final`, `Implementer's Draft`, `WG draft`, `Released`), `revision` (the RFC number, version, draft revision or date you pinned), and `checked` (`YYYY-MM-DD`).
- The `## Sources` section of `SKILL.md`: every source URL, with the same status and revision.

For an unfinished specification, the skill also records its draft posture: **build** (implement the pinned revision's current shape), **name** (reserve identifiers only) or **track** (follow, nothing depends on it).

## Refreshing a spec skill

1. Run `pnpm sources:check` to list dead links and sources whose `checked` date is more than 90 days old.
2. For each skill you refresh, re-read every source in its `## Sources` section. Check the publishing body's index (IETF datatracker, OpenID Foundation specifications, OpenAPI Initiative, W3C, the protocol's own site) for a newer revision, a status change, a rename or a replacement.
3. Update the content that changed, the `status` and `revision` pins in both places, and every `checked` date you re-read.
4. Bump the version: patch when only pins or dates change, minor for new guidance, major when invariants change.
5. Run `pnpm verify`.

## Testing a skill locally

List what the picker would show, without installing anything:

```bash
pnpm dlx skills add . --list
```

Install from your working copy into another project to try it out:

```bash
pnpm dlx skills add /path/to/scaledock-skills --skill <name>
```
