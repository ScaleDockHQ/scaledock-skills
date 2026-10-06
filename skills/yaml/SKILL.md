---
name: yaml
description: >-
  YAML: YAML Covers YAML 1.2.2. Use when parsing YAML. Triggers: YAML.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# YAML

YAML

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when parsing YAML.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: YAML 1.2.2 (default); YAML 1.1 (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.3. Terminology.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 12 ."
2. **1.1. Goals.** "The design goals for YAML are, in decreasing priority: YAML should be easily readable by humans."
3. **1.1. Goals.** "YAML data should be portable between programming languages."
4. **1.1. Goals.** "YAML should match the native data structures of dynamic languages."
5. **1.1. Goals.** "YAML should have a consistent model to support generic tools."
6. **1.1. Goals.** "YAML should support one-pass processing."
7. **1.1. Goals.** "YAML should be expressive and extensible."
8. **1.1. Goals.** "YAML should be easy to implement and use."

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

- [YAML 1.2.2](https://yaml.org/spec/1.2.2/): Specification, YAML 1.2.2, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
- [YAML 1.1](https://yaml.org/spec/1.1/): Specification, YAML 1.1, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
