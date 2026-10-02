# AGENTS.md

This repo publishes agent skills for ScaleDock projects. Follow [CONTRIBUTING.md](CONTRIBUTING.md); the essentials:

- Published skills live in `skills/scaledock-<topic>/SKILL.md`. Start new skills with `cp -r template/skill skills/scaledock-<topic>`.
- Every skill name starts with `scaledock-` so it can't collide with other publishers' skills once installed. The frontmatter `name` must be kebab-case and match the folder name. The `description` must start with what the skill does (the install picker shows only its first 57 characters), then say when to use it (max 1024 characters).
- Keep `SKILL.md` concise: inputs, invariants, workflow, verify checklist, reference index. Put long material in `references/`, `scripts/`, or `assets/` inside the skill folder. Each skill also has a `README.md` and a `metadata.json`.
- Bump `metadata.version` in `SKILL.md` and `version` in `metadata.json` together.
- Run `npm run validate` after adding or changing a skill, and update the skills table in `README.md`.
- Do not edit `.agents/skills/` or `skills-lock.json` by hand. Those are skills installed into this repo for local use; manage them with `npx skills`.
