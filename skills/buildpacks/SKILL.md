---
name: buildpacks
description: >-
  Cloud Native Buildpacks: A platform orchestrates a lifecycle to make buildpack functionality available to end-users such as application developers. Covers Buildpacks platform API, Buildpack API. Use when implementing a buildpack or platform. Triggers: buildpacks.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Cloud Native Buildpacks

The Cloud Native Buildpacks specifications from the Buildpacks project (CNCF): the Platform Interface Specification and the Buildpack Interface Specification, read from the buildpacks/spec repository.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Buildpack author (component or composite buildpack, or image extension), lifecycle implementer, or platform that drives the lifecycle.
- Target version: Buildpacks platform API (current); Buildpack API (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Execution Environments.** "When the `CNB_EXEC_ENV` environment variable is not set, buildpacks MUST assume the default value of `production`."
2. **Layer Types.** "The lifecycle MUST treat a layer with unset `types` as a `launch = false`, `build = false`, `cache = false` layer."
3. **Phase #1: Detection, Process.** "Image extensions MUST always be optional during detection."
4. **Phase #1: Detection, Process.** "In order to make contributions to the Build Plan, a `/bin/detect` executable MUST write entries to `<plan>` in two sections: `requires` and `provides`."
5. **Phase #5: Build, Process.** "For each buildpack in the group in order, the lifecycle MUST execute `/bin/build`."
6. **Unmet Buildpack Plan Entries.** "The lifecycle SHALL assume that all entries in the Buildpack Plan were satisfied by the buildpack unless the buildpack writes an entry with the given name to the `unmet` section of `build.toml`."
7. **buildpack.toml (TOML).** "Buildpack authors MUST choose a globally unique ID, for example: "io.buildpacks.ruby"."
8. **Rebase.** "To rebase an app image a platform MUST execute the `/cnb/lifecycle/rebaser` or perform an equivalent operation."
9. **launcher, Execution.** "The launcher MUST set the working directory for the start command to `<working-dir>`, or to `<app>` if `<working-dir>` is not specified."
10. **User-Provided Variables.** "User-provided environment variables MUST be supplied by the platform as files in the `<platform>/env/` directory."
11. **`group.toml` (TOML).** "`id`, `version`, and `api` MUST be present for each buildpack object in a group."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `oci`, `dockerfile`, `toml`, `spdx`, `cyclonedx`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Platform Interface Specification](https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/platform.md): Specification, Platform API 0.15 (main at commit b745fcf, 2025-12-11), checked 2026-10-06.
- [Buildpack Interface Specification](https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/buildpack.md): Specification, Buildpack API 0.12 (main at commit b745fcf, 2025-12-11), checked 2026-10-06.
