# Versions and upgrades

Read this when choosing a target version, reading a skill written against an older revision of the specification, refreshing the pin, or deciding whether an open proposal changes anything. Sources: the specification page and the commit history of `docs/specification.mdx` in the `agentskills/agentskills` repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                         | Status  | Revision                         | Posture | Summary                                                            |
| ----------------- | ---------------------------- | ------- | -------------------------------- | ------- | ------------------------------------------------------------------ |
| `spec-2026-08-04` | Agent Skills spec 2026-08-04 | current | commit 217be548739f (2026-08-04) |         | The published specification at agentskills.io; the default target. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The specification carries no version number, release tag or changelog: the repository has no tags or releases, and the page has no version label. The line is therefore pinned by the date and commit of the last change to `docs/specification.mdx`. Every earlier revision (first published 2025-12-18) is the same format with less precise wording, so none is listed as a separate line.

## Which version to use

- Author and review against `spec-2026-08-04`.
- A skill written against an earlier revision is valid under this one; no field was added, removed or renamed (see below).
- There is no preview line. Open pull requests are not spec text until merged (see [Watching for changes](#watching-for-changes)).

## What changed

### Agent Skills spec 2026-08-04

Every change to `docs/specification.mdx` since the first commit (fb08d608bcb8, 2025-12-18) clarifies wording; none changes what a valid skill is:

- `name`: the character list now names digits explicitly, "`a-z`, `0-9`" (6868401b64f7, 2026-05-16). The frontmatter table already said "Lowercase letters, numbers, and hyphens only" in the first revision.
- `allowed-tools`: "space-delimited list" became "space-separated string" in the table and the field section (6f92fcdb78af, "Use precise type name for `allowed-tools` field", 2026-03-30): the value is a string.
- `metadata`: the frontmatter table now says "a map from string keys to string values", matching the field section (3f3bbec8133c, merged in 217be548739f, 2026-08-04).
- Directory structure: the tree now shows `scripts/`, `references/`, `assets/` and `...` (cbc354c2ffb5, fe28cce09e06, 2026-03-10), and the optional directories are stated to be recommendations: "A skill directory may contain any files and directories beyond the required `SKILL.md`" (675602ebc261, merged in 6b865a202a6d, 2026-08-04).
- `compatibility`: a runtime version example was added (99b8edf68572, 2026-03-16).
- The minimal example's description now includes "when to use" guidance (22d6aeb3534d, 2026-03-10).

## Upgrading

### Earlier revision to spec-2026-08-04

1. Write `allowed-tools`, if present, as a single space-separated string (for example `allowed-tools: Bash(git:*) Read`), not a YAML list.
2. Make every `metadata` value a string; quote numbers and versions such as `"1.0"`.
3. Check `name` against the rules: 1 to 64 characters, `a-z`, `0-9` and `-`, no leading, trailing or doubled hyphen, equal to the folder name.
4. Run `skills-ref validate` on the skill.
5. Keep behaviour unchanged: the body and bundled files need no change for this upgrade.

### Refreshing the pin

1. List the history: `gh api 'repos/agentskills/agentskills/commits?path=docs/specification.mdx&per_page=5'`.
2. If the newest commit is newer than 217be548739f, diff it: `gh api repos/agentskills/agentskills/compare/217be548739f...<new-sha>` and read the changes to `docs/specification.mdx`.
3. Clarifications: move the pin (id, label, revision, sources) to the new date and commit.
4. A field added, removed or with a new limit: add a new current line `spec-<YYYY-MM-DD>`, make this one supported or legacy, and write an upgrade section here.
5. Re-check `skills-ref/src/skills_ref/validator.py`, since its `ALLOWED_FIELDS` and length constants may move with the spec.

## Watching for changes

The project takes proposals through GitHub Discussions and keeps Issues for concrete bugs; it keeps "a high bar for additions to the spec" and is not accepting major architectural changes yet (`CONTRIBUTING.md`). There is no formal RFC process or draft version.

On 2026-10-05 several open, unmerged pull requests edit `docs/specification.mdx`, for example #573 (allow comma-separated strings and YAML arrays for `allowed-tools`), #520 (state that `allowed-tools` is not a YAML sequence), #546 (reserve the `io.modelcontextprotocol/` key prefix in `metadata`), #521 (nested skills and cross-skill references) and #486 (`name` constraints in the overview table). #573 and #520 point in opposite directions. None is spec text; author against the pinned revision and re-check when one merges.
