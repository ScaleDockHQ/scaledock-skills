# 0002. Keep find-skills vendored in .agents/skills

- Status: accepted
- Date: 2026-10-02

## Context

`references/skills.md` in `scaledock-repo-standard` says repos that ship their own skills must never vendor third-party skills in `.agents/skills`, `.claude/skills` or `skills/`, because those are discovery roots for `npx skills add`. Without that rule, consumers could be offered someone else's skill when they install ours.

This repo vendors `find-skills` from `vercel-labs/skills` in `.agents/skills/find-skills`, tracked in `skills-lock.json`, so every contributor's agent can look up skills without a user-level install.

## Decision

Keep `find-skills` vendored.

On 2026-10-02 we checked with `pnpm dlx skills add . --list`. The CLI found one skill, `scaledock-repo-standard`, and did not offer `find-skills`, because it discovers skills in `skills/` first. The risk the standard guards against doesn't apply today.

## Consequences

- Re-run `pnpm dlx skills add . --list` after upgrading the skills CLI or adding skills. If `find-skills`, or any skill from `.agents/skills`, ever appears in the list, remove the vendored copy and install it at user level instead.
- Do not vendor more third-party skills without a new ADR.
