---
name: xapi
description: >-
  xAPI: Experience API statements with an actor, verb and object. Covers Experience API. Use when recording a learning activity statement.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# xAPI

The Experience API (xAPI) from Advanced Distributed Learning: Part Two (Data) defines Statements with an actor, verb and object, and Part Three (Communication) defines how a Learning Record Store (LRS) receives, validates, versions and returns them, read from xAPI-Data.md and xAPI-Communication.md in adlnet/xAPI-Spec at a pinned commit.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Learning Record Provider, Learning Record Store (LRS) or Learning Record Consumer.
- Target version: Experience API (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **§ 2.2 Formatting Requirements.** "A Statement MUST use each property no more than one time."
2. **§ 2.2 Formatting Requirements.** "A Statement MUST use "actor", "verb", and "object"."
3. **§ 2.2 Learning Record Provider Requirements.** "Values requiring IRIs MUST be sent with valid IRIs."
4. **§ 2.3.2 Voiding.** "An LRS MUST consider a Statement it contains voided if and only if the Statement is not itself a voiding Statement and the LRS also contains a voiding Statement referring to the first Statement."
5. **§ 2.4.3 Verb Id Requirements.** "A single Verb IRI MUST NOT be used to refer to multiple meanings."
6. **§ 2.4.3 Verb Display Learning Record Consumer Requirements.** "A Learning Record Consumer MUST NOT use the "display" property to infer any meaning from the Statement."
7. **§ 2.4.7 Timestamp.** "A Learning Record Provider MUST NOT use a future time for a "timestamp" property in a Statement."
8. **§ 2.1.1 PUT Statements.** "An LRS MUST NOT make any modifications to its state based on receiving a Statement with a statementId that it already has a Statement for."
9. **§ 3.2 Error Codes.** "The LRS MUST reject a batch of statements if any Statement within that batch is rejected."
10. **§ 3.3 Versioning.** "The LRS MUST include the "X-Experience-API-Version" header in every response."
11. **§ 3.3 Versioning.** "The Client MUST include the "X-Experience-API-Version" header in every request."
12. **§ 4.0 Authentication.** "The LRS MUST support authentication using at least one of the authentication methods defined in this specification."

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
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `json`, `uuid`, `language-tags`, `oauth`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Experience API, Part Two: Data](https://raw.githubusercontent.com/adlnet/xAPI-Spec/ca782a1129bc6ae848640ff4e8e262334bdd0ba5/xAPI-Data.md): Specification, adlnet/xAPI-Spec commit ca782a1, 2025-07-03 (the 1.0.x text; examples use version 1.0.3), checked 2026-10-06.
- [Experience API, Part Three: Data Processing, Validation, and Security](https://raw.githubusercontent.com/adlnet/xAPI-Spec/ca782a1129bc6ae848640ff4e8e262334bdd0ba5/xAPI-Communication.md): Specification, adlnet/xAPI-Spec commit ca782a1, 2025-07-03 (the 1.0.x text; examples use version 1.0.3), checked 2026-10-06.
