# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Device Posture API

Source: https://www.w3.org/TR/device-posture/

This document specifies an API that allows web applications to request and be notified of changes of the posture of a device.

- **4.1.** The type attribute: Get current device posture When getting the type attribute, the user agent MUST return the value of this 's relevant global object 's associated Document 's internal slot [[CurrentPosture]] .
- **6.1.** Value: continuous | folded Applies to: visual media types Accepts min/max prefixes: No A user agent MUST reflect the applied posture of the web application via a CSS media query [ MEDIAQ ].
- **7..** Reading the posture Every instance of Document has an internal slot [[CurrentPosture]] , which should be initialized when the Document is created, otherwise they MUST be initialized the first time they are accessed and before their value is read.
- **7..** The user agent MUST run the device posture change steps with document set to the Document and disallowRecursion set to true to initialize it.
- **7.1.** Device makers SHOULD make sure that the physical device postures map correctly to the postures defined by this specification.
- **7.1.** Some devices might also lack one or more of the postures due to physical constraints or device design, in which case the device SHOULD make sure that all combinations of angles and device orientation (which can be locked by [ SCREEN-ORIENTATION ] and host OS), as well as device specific signals, maps into one of the defined postures.
- **8.2.** Device Posture change When the user agent determines that the screen(s)' fold angle, orientation or device-specific signals have changed for a top-level traversable , it MUST run the device posture change steps with the top-level traversable 's active document .
- **14. Conformance.** The key words MUST and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
