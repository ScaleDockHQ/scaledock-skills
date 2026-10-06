---
name: web-audio
description: >-
  Web Audio API: This specification describes a high-level Web API for processing and synthesizing audio in web applications. Covers Web Audio API Level 1.0, Web Audio API 1.1 (track preview). Use when processing or synthesizing audio. Triggers: Web Audio, AudioContext.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Web Audio API

This specification describes a high-level Web API for processing and synthesizing audio in web applications. The primary paradigm is of an audio routing graph, where a number of AudioNode objects are connected together to define the overall audio rendering. The actual processing will primarily take place in the underlying implementation (typically optimized Assembly / C / C++ code), but direct script processing and synthesis is also supported. The Introduction section covers the motivation behind this specification. This API is designed to be used in conjunction with other APIs and elements on the web platform, notably: XMLHttpRequest [XHR] (using the responseType and response attributes). F

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when processing or synthesizing audio.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Web Audio API Level 1.0 (default); Web Audio API 1.1 (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.1.1. Attributes.** "currentTime MUST be read atomically on the control thread before being returned."
2. **1.1.2. Methods.** "A NotSupportedError exception MUST be thrown if any of the arguments is negative, zero, or outside its nominal range."
3. **1.1.2. Methods.** "An implementation MUST support at least 32 channels."
4. **1.1.2. Methods.** "An implementation MUST support sample rates in at least the range 8000 to 96000."
5. **1.1.2. Methods.** "An IndexSizeError exception MUST be thrown if numberOfInputs is less than 1 or is greater than the number of supported channels."
6. **1.1.2. Methods.** "An IndexSizeError exception MUST be thrown if numberOfOutputs is less than 1 or is greater than the number of supported channels."
7. **1.1.2. Methods.** "If specified, this value MUST be greater than zero and less than three minutes or a NotSupportedError exception MUST be thrown."
8. **1.1.2. Methods.** "If all of the values are zero, an InvalidStateError MUST be thrown ."

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

- [Web Audio API](https://www.w3.org/TR/webaudio-1.0/): Recommendation, webaudio-1.0 REC-webaudio-20210617 (Recommendation, 2021-06-17), checked 2026-10-06.
- [Web Audio API 1.1](https://www.w3.org/TR/webaudio-1.1/): Working Draft, webaudio-1.1 WD-webaudio-1.1-20260922 (Working Draft, 2026-09-22), checked 2026-10-06.
