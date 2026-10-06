# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Notifications Living Standard

Source: https://notifications.spec.whatwg.org/review-drafts/2026-01/

This standard defines an API to display notifications to the end user, typically outside the top-level browsing context’s viewport. It is designed to be compatible with existing notification systems, while remaining platform-independent.

- **Notifications API.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **2. Notifications.** When true, indicates that the end user should be alerted after the notification show steps have run with a new notification that has the same tag as an existing notification.
- **2. Notifications.** When true, indicates that no sounds or vibrations should be made.
- **2. Notifications.** When null, indicates that producing sounds or vibrations should be left to platform conventions.
- **2. Notifications.** When true, indicates that on devices with a sufficiently large screen, the notification should remain readily available until the end user activates or dismisses the notification.
- **2. Notifications.** An image resource is a picture shown as part of the content of the notification , and should be displayed with higher visual priority than the icon resource and badge resource , though it may be displayed in fewer circumstances.
- **2. Notifications.** It may also be displayed inside the notification , but then it should have less visual priority than the image resource and icon resource .
- **2.1. Lifetime and UI integration.** The user agent must keep a list of notifications , which is a list of zero or more notifications .
