---
name: source-maps
description: >-
  Source maps (ECMA-426): + 4 Notational Conventions + 4.1 Algorithm Conventions + 4.1.1 Implicit Completions 4.1.1.1 GetTheAnswer ( input ) Covers ECMA-426. Use when writing or consuming a source map. Triggers: source map, ECMA-426.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Source maps (ECMA-426)

- 4 Notational Conventions + 4.1 Algorithm Conventions + 4.1.1 Implicit Completions 4.1.1.1 GetTheAnswer ( input )

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing or consuming a source map.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: ECMA-426 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Software License.** "SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS."
2. **Software License.** "IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…"
3. **2 Conformance.** "A conforming source map generator should generate documents which are conforming source map documents, and can be decoded by the algorithms in this specification without reporting any errors (even those which are specified as optional)."
4. **2 Conformance.** "A conforming source map consumer should implement the algorithms specified in this specification for retrieving (where applicable) and decoding source map documents."
5. **9 Source map format.** "Entries may be null if some original sources should be retrieved by name."
6. **9 Source map format.** "The ignoreList field is an optional list of indices of files that should be considered third party code, such as framework code or bundler- generated code ."
7. **9.2.1 Mappings grammar.** "The mappings String must adhere to the following grammar: MappingsField : LineList LineList : Line Line ; LineList Line : MappingList opt MappingList : Mapping Mapping , MappingList Mapping : GeneratedColumn GeneratedColumn OriginalSource OriginalLine OriginalColumn Name opt GeneratedColumn : Vlq OriginalSource : Vlq OriginalLine : Vlq OriginalColumn : Vlq Name : Vlq A Decode Mapping State Record…"
8. **9.2.4 Names for generated JavaScript code.** "Source map generators should create a mapping entry with a [[Name]] field for a JavaScript token, if: The original source language construct maps semantically to the generated JavaScript code."

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

- [ECMA-426](https://tc39.es/ecma426/): ECMA-426, tc39.es/ecma426 (ECMA-426, 2026-10-06), checked 2026-10-06.
