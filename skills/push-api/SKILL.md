---
name: push-api
description: >-
  Push API: The Push API enables sending of a push message to a web application via a push service . Covers Push API (track). Use when subscribing to or delivering a web push message. Triggers: Push API, pushManager, RFC 8030.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Push API

The Push API enables sending of a push message to a web application via a push service . An application server can send a push message at any time, even when a web application or user agent is inactive. The push service ensures reliable and efficient delivery to the user agent . Push messages are delivered to a Service Worker that runs in the origin of the web application, which can use the information in the message to update local state or display a notification to the user. This specification is designed for use with the web push protocol , which describes how an application server or user agent interacts with a push service .

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when subscribing to or delivering a web push message.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Push API (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **3.4.** "It MUST be the absolute URL exposed by the push service where the application server can send push messages to."
2. **3.4.** "A push endpoint MUST uniquely identify the push subscription ."
3. **3.4.** "When set, it MUST be the time, in milliseconds since 00:00:00 UTC on 1 January 1970, at which the subscription will be deactivated ."
4. **3.4.** "The user agent SHOULD attempt to refresh the push subscription before the subscription expires."
5. **3.4.** "If the user agent has to change the keys of a push subscription for any reason and the push subscription 's associated service worker registration is non-null, it MUST refresh the push subscription ."
6. **3.4.2.** "When this happens, the user agent MUST run the steps to create a push subscription given the PushSubscriptionOptions that were provided for creating the current push subscription , and set the new push subscription 's scope to the original subscription's scope ."
7. **3.4.2.** "The new push subscription MUST have a key pair that's different from the original subscription."
8. **3.4.2.** "When successful, user agent then MUST fire the " pushsubscriptionchange " event with the service worker registration associated with the push subscription as registration , a PushSubscription instance representing the initial push subscription as oldSubscription and a PushSubscription instance representing the new push subscription as newSubscription ."

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

- [Push API](https://www.w3.org/TR/push-api/): Working Draft, push-api WD-push-api-20261005 (Working Draft, 2026-10-05), checked 2026-10-06.
- [Generic Event Delivery Using HTTP Push](https://www.rfc-editor.org/rfc/rfc8030.html): RFC, RFC 8030, checked 2026-10-06.
- [Message Encryption for Web Push](https://www.rfc-editor.org/rfc/rfc8291.html): RFC, RFC 8291, checked 2026-10-06.
- [Voluntary Application Server Identification (VAPID) for Web Push](https://www.rfc-editor.org/rfc/rfc8292.html): RFC, RFC 8292, checked 2026-10-06.
