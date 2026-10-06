---
name: notifications
description: >-
  Notifications: This standard defines an API to display notifications to the end user, typically outside the top-level browsing context’s viewport. Covers Notifications Living Standard. Use when showing a notification. Triggers: Notification, Notifications API.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Notifications

This standard defines an API to display notifications to the end user, typically outside the top-level browsing context’s viewport. It is designed to be compatible with existing notification systems, while remaining platform-independent.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when showing a notification.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Notifications Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Notifications API.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **2. Notifications.** "When true, indicates that the end user should be alerted after the notification show steps have run with a new notification that has the same tag as an existing notification."
3. **2. Notifications.** "When true, indicates that no sounds or vibrations should be made."
4. **2. Notifications.** "When null, indicates that producing sounds or vibrations should be left to platform conventions."
5. **2. Notifications.** "When true, indicates that on devices with a sufficiently large screen, the notification should remain readily available until the end user activates or dismisses the notification."
6. **2. Notifications.** "An image resource is a picture shown as part of the content of the notification , and should be displayed with higher visual priority than the icon resource and badge resource , though it may be displayed in fewer circumstances."
7. **2. Notifications.** "It may also be displayed inside the notification , but then it should have less visual priority than the image resource and icon resource ."
8. **2.1. Lifetime and UI integration.** "The user agent must keep a list of notifications , which is a list of zero or more notifications ."

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

- [Notifications Living Standard](https://notifications.spec.whatwg.org/review-drafts/2026-01/): Review Draft, Review Draft 2026-01 (Review Draft, 2026-01), checked 2026-10-06.
