---
name: console
description: >-
  Console: This specification defines APIs for console debugging facilities. Covers Console Living Standard. Use when writing console methods. Triggers: console, console.log.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Console

This specification defines APIs for console debugging facilities.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing console methods.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Console Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Console.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **1. Namespace console.** "For historical web-compatibility reasons, the namespace object for console must have as its [[Prototype]] an empty object, created as if by ObjectCreate ( %ObjectPrototype% ), instead of %ObjectPrototype% ."
3. **1.3.1. group(... data ).** "Optionally, if the environment supports interactive groups, group should be expanded by default."
4. **1.3.2. groupCollapsed(... data ).** "Optionally, if the environment supports interactive groups, group should be collapsed by default."
5. **2.3. Printer( logLevel , args [, options ]).** "How the implementation prints args is up to the implementation, but implementations should separate the objects by a space or something similar, as that has become a developer expectation."
6. **2.3. Printer( logLevel , args [, options ]).** "The output produced by calls to Printer should appear only within the last group on the appropriate group stack if the group stack is not empty, or elsewhere in the console otherwise."
7. **2.3. Printer( logLevel , args [, options ]).** "If the console is not open when the printer operation is called, implementations should buffer messages to show them in the future up to an implementation-defined limit (typically on the order of at least 100)."
8. **2.3.3. Common object formats.** "It should be noted that the formatting described in this section is applied to implementation-defined object representations that will eventually be passed into Printer , where the actual side effect of formatting will be seen."

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

- [Console Living Standard](https://console.spec.whatwg.org/review-drafts/2024-12/): Review Draft, Review Draft 2024-12 (Review Draft, 2024-12), checked 2026-10-06.
