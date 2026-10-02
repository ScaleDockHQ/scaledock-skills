# Contributing

## Naming

Every skill is named `scaledock-<topic>`, and its folder has the same name. Installed skills from every publisher share flat folders such as `.agents/skills/<name>`, so an unprefixed name like `repo-standard` could overwrite, or be overwritten by, someone else's skill. `npm run validate` rejects names without the prefix.

## Adding a skill

1. Copy the template into a new folder under `skills/`:

   ```bash
   cp -r template/skill skills/scaledock-<topic>
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
   npm run validate
   ```

6. Add the skill to the table in [README.md](README.md). The validator fails until it is listed.

## Layout

```
skills/scaledock-<topic>/
  SKILL.md        # required: frontmatter + workflow, always loaded
  README.md       # overview, install command, rules, reference list
  metadata.json   # version, organization, date, abstract, references
  references/     # topic docs the agent loads on demand
  scripts/        # optional helper scripts the agent can run
  assets/         # optional templates and static files
```

`skills/` holds the skills this repo publishes. `template/skill/` is the starting point; it sits one level deeper than `template/` so the `skills` CLI does not offer it in the install picker. `.agents/skills/` holds skills installed *into* this repo for local development (managed by `npx skills` and tracked in `skills-lock.json`); don't put published skills there.

## Updating a skill

Bump the version in `SKILL.md` (`metadata.version`) and `metadata.json` together, following semver: patch for wording fixes, minor for new guidance, major when the skill's workflow or invariants change. The validator fails when the two versions differ.

## Testing a skill locally

List what the picker would show, without installing anything:

```bash
npx skills add . --list
```

Install from your working copy into another project to try it out:

```bash
npx skills add /path/to/scaledock-skills --skill scaledock-<topic>
```
