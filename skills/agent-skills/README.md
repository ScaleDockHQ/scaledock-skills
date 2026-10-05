# agent-skills

An agent skill for the Agent Skills open format (agentskills.io): writing, reviewing and validating `SKILL.md` skills, and adding skills support to an agent.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill agent-skills
```

Then ask your agent to "write a skill that teaches our release process", "check this skill against the Agent Skills spec" or "add Agent Skills discovery to our agent".

## What it covers

- The skill folder layout and the optional `scripts/`, `references/` and `assets/` directories.
- Every `SKILL.md` frontmatter field (`name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`) with its limits.
- Progressive disclosure: what loads at startup, on activation and on demand, and how to split a long skill.
- Writing descriptions that trigger, writing the body, and bundling scripts for agents.
- Validation with the `skills-ref` reference library, and what it does not check.
- Client integration: discovery paths, parsing, the skill catalog, activation and context management.

## Versions

| Line                         | Status  |
| ---------------------------- | ------- |
| Agent Skills spec 2026-08-04 | current |

The specification is unversioned; the line is pinned to the last commit of the specification page. `references/versions.md` lists its history, how to refresh the pin, and open proposals to watch.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agent Skills Specification](https://agentskills.io/specification): published, commit 217be548739f (2026-08-04).
- [Agent Skills Overview](https://agentskills.io/home): commit 092659e3ec0e (2026-04-19).
- [How to add skills support to your agent](https://agentskills.io/client-implementation/adding-skills-support): commit 22d6aeb3534d (2026-03-10).
- [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices): commit b8d2613ac050 (2026-04-19).
- [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions): commit b8d2613ac050 (2026-04-19).
- [Using scripts in skills](https://agentskills.io/skill-creation/using-scripts): commit 6102affec88b (2026-02-27).
- [agentskills/agentskills](https://github.com/agentskills/agentskills): `main` at 69ef37e9424c (2026-08-09).
- [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref): 0.1.0, demonstration only.

## License

MIT
