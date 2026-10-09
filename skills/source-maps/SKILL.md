---
name: source-maps
description: >-
  Source maps (ECMA-426): write and consume source maps that map generated code back to its sources. Covers ECMA-426. Use when writing or consuming a source map. Triggers: source map, ECMA-426.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Source maps (ECMA-426)

- 4 Notational Conventions + 4.1 Algorithm Conventions + 4.1.1 Implicit Completions 4.1.1.1 GetTheAnswer ( input )

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing or consuming a source map.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: ECMA-426 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **§ 2.** "A conforming source map generator should generate documents which are conforming source map documents, and can be decoded by the algorithms in this specification without reporting any errors (even those which are specified as optional)."
2. **§ 9.** "The version field shall always be the number 3 as an integer."
3. **§ 9.1.2.** "If mappingsField is not a String, throw an error."
4. **§ 9.1.2.** "If JSONObjectGet(json, "sources") is not a JSON array, throw an error."
5. **§ 9.3.** "If the sources are not absolute URLs after prepending the sourceRoot, the sources are resolved relative to the source map (like resolving the script src attribute in an HTML document)."
6. **§ 9.4.** "Source map consumers shall ignore any additional unrecognized properties, rather than causing the source map to be rejected, so that additional features can be added to this format without breaking existing users."
7. **§ 10.** "The sections shall be sorted by starting position and the represented sections shall not overlap."
8. **§ 11.1.** "Source maps are linked through URLs as defined in WHATWG URL; in particular, characters outside the set permitted to appear in URIs shall be percent-encoded and it may be a data URI."
9. **§ 11.1.** "The HTTP sourcemap header has precedence over a source annotation, and if both are present, the header URL should be used to resolve the source map file."
10. **§ 11.1.2.** "If a tool consumes one or more source files that unambiguously links to a source map and it produces an output file that links to a source map, it shall do so unambiguously."
11. **§ 11.1.2.1.1.** "Source map generators shall only emit //#, while source map consumers shall accept both //@ and //#."

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
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [ECMA-426](https://tc39.es/ecma426/): ECMA-426, tc39.es/ecma426 (ECMA-426, 2026-10-06), checked 2026-10-06.
