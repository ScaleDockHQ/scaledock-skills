# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## DOM Living Standard

Source: https://dom.spec.whatwg.org/review-drafts/2026-06/

DOM defines a platform-neutral model for events, aborting activities, and node trees.

- **DOM.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **2.2. Interface Event.** The type attribute must return the value it was initialized to.
- **2.2. Interface Event.** When an event is created the attribute must be initialized to the empty string.
- **2.2. Interface Event.** The currentTarget attribute must return the value it was initialized to.
- **2.2. Interface Event.** When an event is created the attribute must be initialized to null.
- **2.2. Interface Event.** The eventPhase attribute must return the value it was initialized to, which must be one of the following: NONE (numeric value 0) Events not currently dispatched are in this phase.
- **2.2. Interface Event.** Initially the attribute must be initialized to NONE .
- **2.2. Interface Event.** The bubbles and cancelable attributes must return the values they were initialized to.

## W3C DOM 4

Source: https://www.w3.org/TR/2015/REC-dom-20151119/

DOM defines a platform-neutral model for events and node trees. DOM4 adds Mutation Observers as a replacement for Mutation Events .

- **1 Conformance.** The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.
- **A.2 Interface DOMError.** [ Constructor (DOMString name , optional DOMString message = "")] interface DOMError { readonly attribute DOMString name ; readonly attribute DOMString message ; }; DOMError is deprecated and MUST NOT be used.
- **1 Conformance.** [RFC2119] Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and terminate these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc.) used in introducing the algorithm.
- **1 Conformance.** When a method or an attribute is said to call another method or attribute, the user agent must invoke its internal API for that attribute or method so that e.g.
- **1.1 Dependencies.** The IDL fragments in this specification must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
- **1.2 Extensibility.** Authors must not use such extensions, as doing so reduces interoperability and fragments the user base, allowing only users of specific user agents to access the content in question.
- **3.2 Interface Event.** The type attribute must return the value it was initialized to.
- **3.2 Interface Event.** When an event is created the attribute must be initialized to the empty string.
