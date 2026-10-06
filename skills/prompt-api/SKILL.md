---
name: prompt-api
description: >-
  Prompt API: The prompt API gives web pages the ability to directly prompt a language model Covers Prompt API (track). Use when a browser exposes an on-device language model to a page. Triggers: Prompt API, LanguageModel.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Prompt API

The prompt API gives web pages the ability to directly prompt a language model

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when a browser exposes an on-device language model to a page.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Prompt API (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **3.3. The LanguageModel class.** "The following are the event handlers (and their corresponding event handler event types ) that must be supported, as event handler IDL attributes , by all LanguageModel objects: Event handler Event handler event type oncontextoverflow contextoverflow onquotaoverflow quotaoverflow The prompt( input , options ) method steps are: Let responseConstraint be options [" responseConstraint "] if it exists ; otherwise null."
2. **3.3.1. Prefilling and generating.** "The process should use model ’s initial messages , model ’s sampling mode , model ’s top K , model ’s temperature , model ’s expected inputs , model ’s expected outputs , and model ’s tools to guide how the state is updated."
3. **3.3.1. Prefilling and generating.** "The process must conform to the guidance given in § 4 Privacy considerations and § 5 Security considerations ."
4. **3.3.1. Prefilling and generating.** "The process should use model ’s initial messages , model ’s sampling mode , model ’s top K , model ’s temperature , model ’s expected inputs , model ’s expected outputs , model ’s tools , and responseConstraint to guide the model’s behavior."
5. **3.3.1. Prefilling and generating.** "The prompting process must conform to the guidance given in § 4 Privacy considerations and § 5 Security considerations ."
6. **3.3.2. Usage.** "The returned context usage must be nonnegative and finite."
7. **3.3.2. Usage.** "It should be roughly proportional to the amount of data in inputToModel ."
8. **3.3.4. Errors.** "This table lists the possible DOMException names and the cases in which an implementation should use them: DOMException name Scenarios " NotAllowedError " Prompting is disabled by user choice or user agent policy."

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

- [Prompt API](https://webmachinelearning.github.io/prompt-api/): Draft Community Group Report, WebML CG Draft Community Group Report (Draft Community Group Report, 2026-10-06), checked 2026-10-06.
