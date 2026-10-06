# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Screen Wake Lock API

Source: https://www.w3.org/TR/screen-wake-lock/

This document specifies an API that allows web applications to request a screen wake lock. Under the right conditions, and if allowed, the screen wake lock prevents the system from turning off a device's screen.

- **9.6.** Garbage collection While a WakeLockSentinel object has one or more event listeners registered for " release ", and the WakeLockSentinel object hasn't already been released, there MUST be a strong reference from the Window object that the WakeLockSentinel object's constructor was invoked from to the WakeLockSentinel object itself.
- **9.6.** While there is a task queued by an WakeLockSentinel object on the screen wake lock task source , there MUST be a strong reference from the Window object that the WakeLockSentinel object's constructor was invoked from to that WakeLockSentinel object.
- **11..** In other words, user agents MUST treat wake lock acquisition as advisory-only .
- **11..** The screen wake lock MUST NOT be applicable after the screen is manually switched off by the user until it is switched on again.
- **15. Conformance.** The key words MAY , MUST , MUST NOT , and RECOMMENDED in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **11.2.** Handling document loss of full activity When a Document document becomes no longer fully active , the user agent must run these steps: For each lock in document .
