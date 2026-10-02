# AGENTS.md

This repo publishes agent skills for ScaleDock projects. Follow [CONTRIBUTING.md](CONTRIBUTING.md); the essentials:

- Published skills live in `skills/<skill-name>/SKILL.md`. Start new skills from `template/SKILL.md`.
- The frontmatter `name` must be kebab-case and match the folder name. The `description` must state what the skill does and when to use it (max 1024 characters).
- Keep `SKILL.md` concise; put long material in `references/`, `scripts/`, or `assets/` inside the skill folder.
- Run `npm run validate` after adding or changing a skill, and update the skills table in `README.md`.
- Do not edit `.agents/skills/` or `skills-lock.json` by hand. Those are skills installed into this repo for local use; manage them with `npx skills`.
