---
name: devcontainer
description: >-
  Development Containers: The purpose of the Development Container Specification is to provide a way to enrich containers with the content and metadata necessary to enable development inside them. Covers Development Containers. Use when writing a devcontainer.json. Triggers: devcontainer.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Development Containers

The purpose of the Development Container Specification is to provide a way to enrich containers with the content and metadata necessary to enable development inside them. These container environments should be easy to use, create, and recreate.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing a devcontainer.json.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Development Containers (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Development Container Specification.** "These container environments should be easy to use, create, and recreate."
2. **Development Container Specification.** "Tools that want to implement this specification should provide a set of features/commands that give more flexibility to users and allow development containers to scale to large development groups."
3. **devcontainer.json.** "Products using it should expect to find a devcontainer.json file in one or more of the following locations (in order of precedence): .devcontainer/devcontainer.json .devcontainer.json .devcontainer/<folder>/devcontainer.json (where <folder> is a sub-folder, one level deep) It is valid that these files may exist in more than one location, so consider providing a mechanism for users to select one when appropriate."
4. **Image Metadata.** "These contents should then be merged with any local devcontainer.json file contents at the time the container is created."
5. **Image Metadata.** "Metadata should be representative of with the following structure, using one entry per Dev Container Feature and devcontainer.json (see table below for the full list): [ { "id" ?: string , "init" ?: boolean , "privileged" ?: boolean , "capAdd" ?: string [], "securityOpt" ?: string [], "entrypoint" ?: string , "mounts" ?: [], ..."
6. **Notes.** "Using one line per Feature should allow for making full use of these limits."
7. **Image based.** "Image based configurations only reference an image that should be reachable and downloadable through docker pull commands."
8. **Docker Compose based.** "runServices : an optional property that indicates the set of services in the docker-compose configuration that should be started or stopped with the environment."

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

- [Development Containers](https://containers.dev/implementors/spec/): Specification, Development Containers spec, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
