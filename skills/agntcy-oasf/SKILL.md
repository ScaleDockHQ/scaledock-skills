---
name: agntcy-oasf
description: >-
  Open Agentic Schema Framework (OASF): describe AI agents, their skills and domains in standard records. Covers OASF 1.1.0, OASF 1.2 (track preview). Use when describing agent capabilities with OASF. Triggers: OASF.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Open Agentic Schema Framework

![GitHub Release (latest by date)](https://img.shields.io/github/v/release/agntcy/oasf)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when describing agent capabilities with OASF.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OASF 1.1.0 (default); OASF 1.2 (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "### Hot Reload In order to run the server in hot-reload mode, you must first deploy the services, and run another command to signal that the schema will be actively updated."

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

- [OASF 1.1.0](https://raw.githubusercontent.com/agntcy/oasf/v1.1.0/README.md): Release, OASF 1.1.0, fetched 2026-10-06 (Release, 2026-10-06), checked 2026-10-06.
- [OASF 1.2](https://raw.githubusercontent.com/agntcy/oasf/main/README.md): Development, OASF main development line, fetched 2026-10-06 (Development, 2026-10-06), checked 2026-10-06.
