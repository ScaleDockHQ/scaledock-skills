---
name: dockerfile
description: >-
  Dockerfile: write and review Dockerfile build instructions for container images. Covers Dockerfile. Use when writing a Dockerfile. Triggers: Dockerfile.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Dockerfile

The Dockerfile reference from the Moby BuildKit project, the text that docs.docker.com publishes as its Dockerfile reference, read from the BuildKit repository at its latest release. It covers the format, parser directives, shell and exec form, and every instruction.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Dockerfile author or reviewer, or a tool that parses or lints Dockerfiles.
- Target version: Dockerfile (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Parser directives.** "Therefore, all parser directives must be at the top of a Dockerfile."
2. **Shell and exec form, Exec form.** "The exec form is parsed as a JSON array, which means that you must use double-quotes (") around words, not single-quotes (')."
3. **FROM.** "As such, a valid Dockerfile must start with a `FROM` instruction."
4. **FROM.** "`ARG` is the only instruction that may precede `FROM` in the Dockerfile."
5. **RUN --mount=type=secret.** "This mount type allows the build container to access secret values, such as tokens or private keys, without baking them into the image."
6. **CMD.** "There can only be one `CMD` instruction in a Dockerfile. If you list more than one `CMD`, only the last one takes effect."
7. **ENV.** "The environment variables set using `ENV` will persist when a container is run from the resulting image."
8. **Understand how CMD and ENTRYPOINT interact.** "Dockerfile should specify at least one of `CMD` or `ENTRYPOINT` commands."
9. **WORKDIR.** "Therefore, to avoid unintended operations in unknown directories, it's best practice to set your `WORKDIR` explicitly."
10. **ARG, Scope.** "To use an argument in multiple distinct stages, each stage must include the `ARG` instruction, or they must both be based on a shared base stage in the same Dockerfile where the variable is declared."
11. **HEALTHCHECK.** "There can only be one `HEALTHCHECK` instruction in a Dockerfile. If you list more than one then only the last `HEALTHCHECK` will take effect."

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
- [ ] Secrets reach the build through `RUN --mount=type=secret`, not through `ENV`, whose values persist when a container is run from the image.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `oci`, `compose-spec`, `buildpacks`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Dockerfile reference](https://raw.githubusercontent.com/moby/buildkit/8c91502cf280bd70a0c50912ce251c46a8881d9f/frontend/dockerfile/docs/reference.md): Reference, BuildKit v0.33.1 (commit 8c91502), Dockerfile syntax docker/dockerfile:1, checked 2026-10-06.
