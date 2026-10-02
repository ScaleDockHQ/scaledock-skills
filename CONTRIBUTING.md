# Contributing

## Adding a skill

1. Copy the template into a new folder under `skills/`:

   ```bash
   cp -r template skills/<skill-name>
   ```

2. Edit `skills/<skill-name>/SKILL.md`:
   - `name` must be kebab-case and match the folder name exactly.
   - `description` must say what the skill does **and when to use it**. Agents decide whether to load a skill based on this field alone, so include the situations and phrases that should trigger it. Keep it under 1024 characters.
3. Keep `SKILL.md` focused and short. Move supporting material into subfolders and link to it:
   - `references/` for longer docs the agent reads on demand
   - `scripts/` for helper scripts the agent can run
   - `assets/` for templates and static files
4. Validate:

   ```bash
   npm run validate
   ```

5. Add the skill to the table in [README.md](README.md).

## Layout

```
skills/<skill-name>/
  SKILL.md        # required
  references/     # optional
  scripts/        # optional
  assets/         # optional
```

`skills/` holds the skills this repo publishes. `.agents/skills/` holds skills installed *into* this repo for local development (managed by `npx skills` and tracked in `skills-lock.json`); don't put published skills there.

## Testing a skill locally

Install from your working copy into another project to try it out:

```bash
npx skills add /path/to/scaledock-skills@<skill-name>
```
