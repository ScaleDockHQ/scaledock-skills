---
name: fetch
description: >-
  Fetch: The Fetch standard defines requests, responses, and the process that binds them: fetching. Covers Fetch Living Standard. Use when fetching resources, including CORS. Triggers: Fetch, Request, Response.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Fetch

The Fetch standard defines requests, responses, and the process that binds them: fetching.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when fetching resources, including CORS.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Fetch Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Fetch.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **2.2.4. Bodies.** "processBodyChunk must be an algorithm accepting a byte sequence ."
3. **2.2.4. Bodies.** "processEndOfBody must be an algorithm accepting no arguments."
4. **2.2.4. Bodies.** "processBodyError must be an algorithm accepting an exception."
5. **2.2.4. Bodies.** "processBody must be an algorithm accepting a byte sequence ."
6. **2.2.4. Bodies.** "processBodyError must be an algorithm optionally accepting an exception ."
7. **2.2.5. Requests.** "When displaying a user interface associated with a request in that request’s traversable for user prompts , the user agent should update the address bar to display something derived from the request’s current URL (and not, e.g., leave"
8. **2.2.5. Requests.** "Additionally, the user agent should avoid displaying content from the request’s initiator in the traversable for user prompts , especially in the case of cross-origin requests."

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

- [Fetch Living Standard](https://fetch.spec.whatwg.org/review-drafts/2026-06/): Review Draft, Review Draft 2026-06 (Review Draft, 2026-06), checked 2026-10-06.
