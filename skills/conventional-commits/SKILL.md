---
name: conventional-commits
description: >-
  Conventional Commits: The Conventional Commits specification is a lightweight convention on top of commit messages. Covers Conventional Commits 1.0.0. Use when writing commit messages. Triggers: Conventional Commits.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Conventional Commits

The Conventional Commits specification is a lightweight convention on top of commit messages.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing commit messages.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Conventional Commits 1.0.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Specification.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 ."
2. **Specification.** "Commits MUST be prefixed with a type, which consists of a noun, feat , fix , etc., followed by the OPTIONAL scope, OPTIONAL !"
3. **Specification.** ", and REQUIRED terminal colon and space."
4. **Specification.** "The type feat MUST be used when a commit adds a new feature to your application or library."
5. **Specification.** "The type fix MUST be used when a commit represents a bug fix for your application."
6. **Specification.** "A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., fix(parser): A description MUST immediately follow the colon and space after the type/scope prefix."
7. **Specification.** "The body MUST begin one blank line after the description."
8. **Specification.** "Each footer MUST consist of a word token, followed by either a :<space> or <space># separator, followed by a string value (this is inspired by the git trailer convention )."

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

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): Specification, Conventional Commits 1.0.0, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
