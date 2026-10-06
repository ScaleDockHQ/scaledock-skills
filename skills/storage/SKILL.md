---
name: storage
description: >-
  Storage: The Storage Standard defines an API for persistent storage and quota estimates, as well as the platform storage architecture. Covers Storage Living Standard. Use when using the Storage standard. Triggers: Storage, bucket.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Storage

The Storage Standard defines an API for persistent storage and quota estimates, as well as the platform storage architecture.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when using the Storage standard.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Storage Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Storage.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **5. Persistence permission.** "The " persistent-storage " powerful feature ’s permission-related algorithms, and types are defaulted, except for: permission state " persistent-storage "'s permission state must have the same value for all environment settings objects with a given origin ."
3. **6. Usage and quota.** "This amount should be less than the total storage space on the device."
4. **6. Usage and quota.** "It must not be a function of the available storage space on the device."
5. **7. Management.** "Whenever a storage bucket is cleared by the user agent, it must be cleared in its entirety."
6. **7. Management.** "User agents should avoid clearing storage buckets while script that is able to access them is running, unless instructed otherwise by the user."
7. **7.1. Storage pressure.** "A user agent that comes under storage pressure should clear network state and local storage buckets whose mode is " best-effort ", ideally prioritizing removal in a manner that least impacts the user."
8. **7.1. Storage pressure.** "If a user agent continues to be under storage pressure, then the user agent should inform the user and offer a way to clear the remaining local storage buckets , i.e., those whose mode is " persistent "."

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

- [Storage Living Standard](https://storage.spec.whatwg.org/review-drafts/2026-02/): Review Draft, Review Draft 2026-02 (Review Draft, 2026-02), checked 2026-10-06.
