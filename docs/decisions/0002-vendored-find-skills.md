# 0002. Keep find-skills vendored in .agents/skills

- Status: superseded by `scaledock-repo-standard` 1.6.0
- Date: 2026-10-02

> Superseded on 2026-10-03. The standard now requires every repo kind, including repos that publish skills, to commit installed skills and manage them only with `pnpm dlx skills`, so committing `find-skills` is no longer a deviation. The reasoning below was also wrong: skills CLI 1.7.0 does not hide `.agents/skills` because `skills/` is found first. It hides installed skills because `skills-lock.json` tracks them. A hand-copied skill missing from the lock is offered to consumers even when `skills/` exists.

## Context

`references/skills.md` in `scaledock-repo-standard` says repos that ship their own skills must never vendor third-party skills in `.agents/skills`, `.claude/skills` or `skills/`, because those are discovery roots for `npx skills add`. Without that rule, consumers could be offered someone else's skill when they install ours.

This repo vendors `find-skills` from `vercel-labs/skills` in `.agents/skills/find-skills`, tracked in `skills-lock.json`, so every contributor's agent can look up skills without a user-level install.

## Decision

Keep `find-skills` vendored.

On 2026-10-02 we checked with `pnpm dlx skills add . --list`. The CLI found one skill, `scaledock-repo-standard`, and did not offer `find-skills`, because it discovers skills in `skills/` first. The risk the standard guards against doesn't apply today.

## Consequences

- Re-run `pnpm dlx skills add . --list` after upgrading the skills CLI or adding skills. If `find-skills`, or any skill from `.agents/skills`, ever appears in the list, remove the vendored copy and install it at user level instead.
- Do not vendor more third-party skills without a new ADR.
