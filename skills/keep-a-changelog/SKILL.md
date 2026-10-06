---
name: keep-a-changelog
description: >-
  Keep a Changelog: Keep a Changelog Version 1.1 1.0 0.3 Language (28) العربية (n/a) Čeština Dansk Deutsch English Español Français Hrvatski (n/a) Indonesia (n/a) Italiano 日本語 Norsk (Bokmål) Nederlands polski Português (BR) română Pyccкий Slovenčina (n/a) ქართული (n/a) Slovenščina Srpski (n/a) Svenska Türkçe Українська 简体中文 正體中文 한국어 فارسی Covers Keep a Changelog 1.1.0. Use when writing a changelog. Triggers: Keep a Changelog.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Keep a Changelog

Keep a Changelog Version 1.1 1.0 0.3 Language (28) العربية (n/a) Čeština Dansk Deutsch English Español Français Hrvatski (n/a) Indonesia (n/a) Italiano 日本語 Norsk (Bokmål) Nederlands polski Português (BR) română Pyccкий Slovenčina (n/a) ქართული (n/a) Slovenščina Srpski (n/a) Svenska Türkçe Українська 简体中文 正體中文 한국어 فارسی

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing a changelog.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Keep a Changelog 1.1.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Don’t let your friends dump git logs into changelogs..** "## [0.0.3] - 2014-08-09 ### Added - "Why should I care?" section mentioning The Changelog podcast."
2. **Guiding Principles.** "There should be an entry for every single version."
3. **Guiding Principles.** "The same types of changes should be grouped."
4. **Guiding Principles.** "Versions and sections should be linkable."
5. **Ignoring Deprecations.** "When people upgrade from one version to another, it should be painfully clear when something will break."
6. **Ignoring Deprecations.** "It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals."
7. **Inconsistent Changes.** "While many of the changes may not be relevant - for instance, removing a single whitespace may not need to be recorded in all instances - any important changes should be mentioned in the changelog."
8. **What about yanked releases?.** "This is how you should display them: ## [0.0.5] - 2014-12-13 [YANKED] The [YANKED] tag is loud for a reason."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/): Convention, Keep a Changelog 1.1.0, fetched 2026-10-06 (Convention, 2026-10-06), checked 2026-10-06.
