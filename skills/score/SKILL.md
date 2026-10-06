---
name: score
description: >-
  Score: The Score Specification is a YAML file that contains the following top-level reference definitions. Covers Score specification. Use when writing a Score workload spec. Triggers: Score.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Score

The Score Specification is a YAML file that contains the following top-level reference definitions.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing a Score workload spec.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Score specification (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Container definition.** "to indicate that the image must be supplied at deploy time."
2. **Container definition.** "Either content , binaryContent or source must be specified."
3. **Container definition.** "readOnly : indicates if the volume should be mounted in a read-only mode."
4. **Container definition.** "Both httpGet and exec are supported and implementations should support one or both options."
5. **Service definition.** "The port specification must include the public port and should include the container targetPort ."
6. **Resources.** "This should be a type supported by the Score implementations being used."
7. **Supporting secret or sensitive resource outputs.** "For example, a database password should be kept as a secret where possible."
8. **Supporting secret or sensitive resource outputs.** "The Score specification itself does not provide any explicit support for indicating whether something is secret or how that should be handled by the runtime since each platform has different support and interpolation options."

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

- [Score specification](https://docs.score.dev/docs/score-specification/score-spec-reference/): Specification, Score specification, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
