# 0008. GitHub Actions on major tags

- Status: accepted
- Date: 2026-10-21

## Context

`scaledock-repo-standard` pinned third-party actions to a commit SHA with a `# vX.Y.Z` comment and GitHub-owned actions to major tags. The repos kept switching between the two. Agents moved actions to SHAs on one run and back to tags on the next, each time with a large workflow diff and a zizmor configuration change. The SHA pins also meant one Dependabot PR per action patch, which nobody reviewed beyond the green check.

The user decided to pin every action, GitHub-owned or third-party, to its latest major tag.

## Decision

- Every `uses:` points at the action's latest major tag (`@v3`), never a commit SHA, a minor or a patch tag. An action that publishes no major tag (a 0.x action such as `zizmorcore/zizmor-action`) uses its latest release tag.
- `.github/zizmor.yml` sets `unpinned-uses` to `ref-pin` for `"*"`, so zizmor still rejects a branch ref or a missing ref.
- Dependabot opens the PR for each new major, with a 7-day cooldown. zizmor's `dependabot-cooldown` audit flags anything shorter.
- Supply-chain risk is handled by that cooldown, `minimumReleaseAge` for npm, least-privilege `permissions` on every workflow, and zizmor.

## Consequences

- Fixes inside a major reach every repo without a PR. A compromised tag inside a major would too; the cooldown and zizmor are the guard.
- `scaledock-repo-standard` (`references/ci.md`, the `SKILL.md` checklist and `references/audit.md`) states this rule, and an audit reports a SHA pin as a gap.
- Switching back to SHA pins needs a new ADR that supersedes this one.
