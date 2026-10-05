# Versions and upgrades

Read this when choosing a target version, reviewing an AGENTS.md written against older guidance, refreshing the pin, or deciding whether an open proposal changes anything. Sources: the agents.md site and the commit history of the `agentsmd/agents.md` repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                      | Status  | Revision                                                      | Posture | Summary                                              |
| ----------------- | ------------------------- | ------- | ------------------------------------------------------------- | ------- | ---------------------------------------------------- |
| `site-2026-03-10` | AGENTS.md site 2026-03-10 | current | commit 342016eb22df (2026-03-10), read at `main` d001185d792e |         | The format as published at agents.md; the only line. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

AGENTS.md has no version number. The repository has no tags and no releases, the site shows no version label, and there is no separate specification document: the format is defined by the site's sections (Why, How to use, Examples, FAQ) in `components/*.tsx` and by the README. The line is therefore pinned by the date and commit of the last change to that text, 342016eb22df (2026-03-10). Later commits up to `main` d001185d792e (2026-09-10) touch only the compatible-agents list, logos and the Technical Charter.

No earlier format is documented. `AGENT.md` appears on the site only as an example of an existing file to rename (FAQ "How do I migrate existing docs to AGENTS.md?"), not as an earlier version of AGENTS.md, so no legacy line is listed.

## Which version to use

- Author and review against `site-2026-03-10`.
- An AGENTS.md written against any earlier revision of the site is valid under this one: no rule about the file's name, placement, precedence or content changed.
- There is no preview line. Open issues and pull requests are not format text until merged (see [Watching for changes](#watching-for-changes)).

## What changed

### AGENTS.md site 2026-03-10

Every change to the format text since the initial commit (ba9474a69e9a, 2025-08-19) touches tool configuration examples in the FAQ; the How to use and Why sections are unchanged since that commit:

- FAQ: Aider and Gemini configuration examples added (4ad4c1bf2781, 2025-08-21); "Google Gemini" renamed to "Gemini CLI" (804f3c03dae0, 2025-08-21).
- FAQ: the Gemini CLI example changed from `{"contextFileName": "AGENTS.md"}` to `{"context": {"fileName": "AGENTS.md"}}` in `.gemini/settings.json` (342016eb22df, 2026-03-10).
- Governance, not format: the site's About section and footer now say AGENTS.md is stewarded by the Agentic AI Foundation under the Linux Foundation and is "a Series of LF Projects, LLC" (975cfbac2bc7, 40de070bb361, December 2025); the Technical Charter was added on 2026-09-10 (5d4013edb759, d001185d792e).

## Upgrading

### Earlier revision to site-2026-03-10

1. If `.gemini/settings.json` uses the top-level `contextFileName` key to load AGENTS.md, check the current Gemini CLI documentation; it documents `context.fileName`, which accepts a name or a list (Gemini CLI docs, Customize the context file name).
2. Re-check every tool-specific wiring against that tool's current documentation (see `migration.md`); tool loaders change more often than the format.
3. Keep the file's content unchanged: the format needs no edit for this upgrade.

### Refreshing the pin

1. List the history: `gh api 'repos/agentsmd/agents.md/commits?path=components&per_page=10'` and `gh api 'repos/agentsmd/agents.md/commits?path=README.md&per_page=5'`.
2. If a commit newer than 342016eb22df touches `HowToUseSection.tsx`, `WhySection.tsx`, `FAQSection.tsx`, `CodeExample.tsx` or `README.md`, diff it: `gh api repos/agentsmd/agents.md/compare/342016eb22df...<new-sha>`.
3. Wording or example changes: move the pin (id, label, revision, sources) to the new date and commit.
4. A new rule about naming, placement, precedence or content, or a published specification document or numbered version: add a new current line, make this one supported or legacy, and write an upgrade section here.
5. Check `git tags` and releases (`gh api repos/agentsmd/agents.md/releases`) in case the project starts versioning.

## Watching for changes

The project is governed by a Technical Steering Committee under its Technical Charter (adopted 2025-12-08); contributions are MIT and documentation is CC BY 4.0 (Charter, § 7). There is no RFC process or draft version.

On 2026-10-05 open issues propose extending the format, for example #211 (an implementation specification document), #9 (directory support), #10 (frontmatter), #11 (imports), #91 (a global user-level file at `~/.config/agents/AGENTS.md`) and #185 (different content for different agents). None is format text; author against the pinned revision and re-check when one lands on the site.
