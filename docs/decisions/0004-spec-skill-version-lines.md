# 0004. Spec skills cover every major version line

- Status: accepted
- Date: 2026-10-05

## Context

Each spec skill pinned one current version and handled older versions in whatever way its author chose: a few had a `references/versions.md`, some a one-off migration file, most nothing. Agents meet older documents (an OpenAPI 3.0 description, a SCIM 1.1 client, an MCP server on the 2025-06-18 revision) and drafts of the next version (OpenAPI 3.3, the OAuth 2.1 draft). Without a list of lines, an agent cannot tell which version to write, whether an older one is still acceptable, or how to upgrade.

## Decision

One skill per specification keeps covering all of its version lines. We considered one skill per version (`openapi-3-1`, `openapi-3-2`), but skill names are kebab-case folder names, upgrades join two versions and belong next to both, and the agent picks the version at run time from the document in front of it.

Every spec skill has:

- A `versions` array in `metadata.json`. Each entry has `id`, `label`, `status`, `revision`, and optionally `posture`, `family` and `reference`.
- A fixed status vocabulary:
  - **current**: the default target, exactly one per family.
  - **supported**: released, and still a valid target for a consumer that needs it.
  - **legacy**: superseded. Read and upgraded from, never authored.
  - **preview**: an alpha, beta, draft, development branch or Implementer's Draft of a line that follows a released one. Its `id` ends in `-preview`, and it carries a draft posture (build, name or track). A specification whose only line is a draft is `current` with a posture.
- A `references/versions.md` hub with the same sections everywhere: version lines, which version to use, what changed, upgrading, and the preview.
- A `Target version` input in `SKILL.md` that names every line, and a description that names every non-legacy line and the preview.

`pnpm validate` enforces the fields, the statuses, one current line per family, the `-preview` rule, and that `references/versions.md` mentions every `id` and `SKILL.md` every `label`.

## Consequences

- Adding a line, or shipping a preview, touches `metadata.json`, `references/versions.md`, the description and both READMEs. AGENTS.md lists this.
- Patch work in progress and milestones without spec text are noted in `references/versions.md` but not listed as previews, so every listed line has text to cite.
- Multi-spec skills (for example `openid4vc`) use `family` so each specification has its own current line.
