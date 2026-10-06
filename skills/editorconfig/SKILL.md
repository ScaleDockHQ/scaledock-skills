---
name: editorconfig
description: >-
  EditorConfig: considered literally. Covers EditorConfig. Use when defining editor settings. Triggers: EditorConfig.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# EditorConfig

considered literally. It means, that pattern [ab*c{1..2}] is considered literally:

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when defining editor settings.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: EditorConfig (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Supported Pairs ¶.** "With the exception of the root key, all pairs MUST be located under a section to take effect."
2. **Indentation (Non-Normative) ¶.** "For another example, if we have the following EditorConfig file: root = true [another_file.py] indent_style = tab indent_size = 8 tab_width = 4 One MUST expect that spaces will not be used at all for indentation, since all the indentation can be achieved via tabs only."
3. **Terminology ¶.** "EditorConfig files must conform to this specification."
4. **Terminology ¶.** "A conforming core or plugin must pass the tests in the core-tests repository or plugin-tests repository , respectively."
5. **File Format ¶.** "EditorConfig files must be UTF-8 encoded, with LF or CRLF line separators."
6. **Glob Expressions ¶.** "Thus, the globs /subdir/_.c and subdir/_.c must yield the same result."
7. **Glob Expressions ¶.** "Cores must accept section names with length up to and including 1024 characters."
8. **Capitalization of the File Name ¶.** "As noted above, the .editorconfig filename should be lowercased."

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

- [EditorConfig](https://spec.editorconfig.org/): Specification, EditorConfig specification, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
