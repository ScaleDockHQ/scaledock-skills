# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Presentation API

Source: https://www.w3.org/TR/presentation-api/

This specification defines an API to enable Web content to access presentation displays and use them for presenting Web content.

- **3. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3. Conformance.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and terminate these steps") are to be interpreted with the meaning of the key word (" MUST ", " SHOULD ", " MAY ", etc.) used in introducing the algorithm.
- **6.1.** When an algorithm queues a Presentation API task T , the user agent MUST queue a global task T on the presentation task source using the global object of the current realm .
- **6.2.** It MUST return the Presentation instance.
- **6.2.1.** Controlling user agent Controlling user agents MUST implement the following partial interface: WebIDL partial interface Presentation { attribute PresentationRequest ?
- **6.2.1.** defaultRequest ; }; The defaultRequest attribute MUST return the default presentation request if any, null otherwise.
- **6.2.1.** On setting, the default presentation request MUST be set to the new value.
- **6.2.1.** The controlling user agent SHOULD initiate presentation using the default presentation request only when the user has expressed an intention to do so via a user gesture, for example by clicking a button in the browser chrome.
