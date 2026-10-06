# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Vibration API

Source: https://www.w3.org/TR/vibration/

This specification defines an API that provides access to the vibration mechanism of the hosting device. Vibration is a form of tactile feedback.

- **2. Conformance.** The key words MAY , MUST , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3..** When the user agent determines that the visibility state of the Document of the top-level browsing context changes, it MUST abort the already running processing
- **4..** The user agent SHOULD employ global rate limiting to restrict the number of vibration requests made within a certain period (e.g., per minute or hour) to prevent excessive use.
- **2. Conformance.** Implementations that use ECMAScript to implement the APIs defined in this specification must implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL-1 ], as this specification uses that specification and terminology.
- **3..** Note For example, an implementation might abort the algorithm because no vibration hardware is present, the user has set a preference indicating that pages at a given origin should never be able to vibrate the device, or an implementation might cap the total amount of time a page may cause the device to vibrate and reject requests in excess of this limit.
