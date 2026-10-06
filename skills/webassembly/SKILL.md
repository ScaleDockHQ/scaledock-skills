---
name: webassembly
description: >-
  WebAssembly: This document describes version 1.0 of the core WebAssembly standard, a safe, portable, low-level code format designed for efficient execution and compact representation. Covers WebAssembly Core Specification Level 1, WebAssembly Core Specification Level 2.0 (build preview), WebAssembly JavaScript Interface Level 1, WebAssembly JavaScript Interface Level 2.0 (build preview), WebAssembly Web API Level 1, WebAssembly Web API Level 2.0 (build preview). Use when compiling or instantiating WebAssembly. Triggers: WebAssembly, WebAssembly.instantiate.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WebAssembly

This document describes version 1.0 of the core WebAssembly standard, a safe, portable, low-level code format designed for efficient execution and compact representation. Part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when compiling or instantiating WebAssembly.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: WebAssembly Core Specification Level 1 (default); WebAssembly Core Specification Level 2.0 (preview, posture build: emit only when the user opts in and the posture is build); WebAssembly JavaScript Interface Level 1 (default); WebAssembly JavaScript Interface Level 2.0 (preview, posture build: emit only when the user opts in and the posture is build); WebAssembly Web API Level 1 (default); WebAssembly Web API Level 2.0 (preview, posture build: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Document conventions.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
2. **2.4.5. Control Instructions.** "As the grammar prescribes, they must be well-nested."
3. **2.5.2. Types.** "All function types used in a module must be defined in this component."
4. **2.5.3. Functions.** "The b o d y is an instruction sequence that upon termination must produce a stack matching the function type’s result type ."
5. **3.1.2. Prose Notation.** "The formulation “Under context C ′ , … statement …” is adopted to express that the following statement must apply under the assumptions embodied in the extended context."
6. **3.1.3. Formal Notation.** "Moreover, the result type must match the block’s annotation [ t ?"
7. **3.2. Types.** "However, restrictions apply to function types as well as the limits of table types and memory types , which must be checked during validation."
8. **3.2.1. Limits.** "Limits must have meaningful bounds that are within a given range."

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

- [WebAssembly Core Specification](https://www.w3.org/TR/wasm-core-1/): Recommendation, wasm-core-1 REC-wasm-core-1-20191205 (Recommendation, 2019-12-05), checked 2026-10-06.
- [WebAssembly Core Specification](https://www.w3.org/TR/wasm-core-2/): Candidate Recommendation Draft, wasm-core-2 CRD-wasm-core-2-20261003 (Candidate Recommendation Draft, 2026-10-03), checked 2026-10-06.
- [WebAssembly JavaScript Interface](https://www.w3.org/TR/wasm-js-api-1/): Recommendation, wasm-js-api-1 REC-wasm-js-api-1-20191205 (Recommendation, 2019-12-05), checked 2026-10-06.
- [WebAssembly JavaScript Interface](https://www.w3.org/TR/wasm-js-api-2/): Candidate Recommendation Draft, wasm-js-api-2 CRD-wasm-js-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03), checked 2026-10-06.
- [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-1/): Recommendation, wasm-web-api-1 REC-wasm-web-api-1-20191205 (Recommendation, 2019-12-05), checked 2026-10-06.
- [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-2/): Candidate Recommendation Draft, wasm-web-api-2 CRD-wasm-web-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03), checked 2026-10-06.
