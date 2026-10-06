# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Fullscreen API Living Standard

Source: https://fullscreen.spec.whatwg.org/review-drafts/2026-07/

The Fullscreen API standard defines an API for elements to display themselves fullscreen.

- **Fullscreen API.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **3. API.** The following are the event handlers (and their corresponding event handler event types ) that must be supported by Element and Document objects as event handler IDL attributes : event handler event handler event type onfullscreenchange fullscreenchange onfullscreenerror fullscreenerror These are not supported by ShadowRoot or Window objects, and there are no
- **4. UI.** Users should be clearly notified when keyboard locking is active, possibly through browser UI indicators.
- **4. UI.** There should be a simple and intuitive method for users to override keyboard locking, reverting control back to the system or user agent.
- **5.1. :fullscreen pseudo-class.** The :fullscreen pseudo-class must match any element element for which one of the following conditions is true: element ’s fullscreen flag is set.
- **6. Keyboard Locking.** Whenever a document ’s keyboard lock is changed from active to inactive, user agents must deactivate the keyboard lock and restore the handling of keyboard inputs to the default behavior of the user agent and the operating system.
- **6. Keyboard Locking.** User agents should reserve an additional input for the purposes of exiting fullscreen.
- **8. Security and Privacy Considerations.** User agents should provide a means of exiting fullscreen that always works and advertise this to the user.
