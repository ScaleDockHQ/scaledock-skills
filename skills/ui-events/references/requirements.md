# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UI Events

Source: https://www.w3.org/TR/uievents/

This specification defines UI Events which extend the DOM Event objects defined in [DOM] . UI Events are those typically implemented by visual user agents for handling user interaction such as mouse and keyboard input.

- **1.2. Conformance.** Within this specification, the key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL are to be interpreted as described in [RFC2119] .
- **1.2. Conformance.** A user agent is not required to conform to the entirety of another specification in order to conform to this specification, but it MUST conform to the specific parts of any other specification which are called out in this specification (e.g., a conforming UI Events user agent MUST support the DOMString data type as defined in [WebIDL] , but need not support every method or data type defined in…
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST dispatch events appropriate to the given EventTarget when the conditions defined for that event type have been met.
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST support scripting, declarative interactivity, or some other means of detecting and dispatching events in the manner described by this specification, and MUST support the APIs specified for that event type .
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A browser which does not conform to all required portions of this specification MUST NOT claim conformance to UI Events.
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST also be a conforming implementation of the IDL fragments in this specification, as described in the Web IDL specification [WebIDL] .
- **1.2.2. Authoring tools.** A content authoring tool MUST NOT claim conformance to UI Events for content it produces which uses features of this specification marked as deprecated in this specification.
- **1.2.2. Authoring tools.** A conforming content authoring tool SHOULD provide to the content author a means to use all event types and interfaces appropriate to all host languages in the content document being produced.

## UI Events (uievents-old)

Source: https://www.w3.org/TR/uievents/

This specification defines UI Events which extend the DOM Event objects defined in [DOM] . UI Events are those typically implemented by visual user agents for handling user interaction such as mouse and keyboard input.

- **1.2. Conformance.** Within this specification, the key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL are to be interpreted as described in [RFC2119] .
- **1.2. Conformance.** A user agent is not required to conform to the entirety of another specification in order to conform to this specification, but it MUST conform to the specific parts of any other specification which are called out in this specification (e.g., a conforming UI Events user agent MUST support the DOMString data type as defined in [WebIDL] , but need not support every method or data type defined in…
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST dispatch events appropriate to the given EventTarget when the conditions defined for that event type have been met.
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST support scripting, declarative interactivity, or some other means of detecting and dispatching events in the manner described by this specification, and MUST support the APIs specified for that event type .
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A browser which does not conform to all required portions of this specification MUST NOT claim conformance to UI Events.
- **1.2.1. Web browsers and other dynamic or interactive user agents.** A conforming browser MUST also be a conforming implementation of the IDL fragments in this specification, as described in the Web IDL specification [WebIDL] .
- **1.2.2. Authoring tools.** A content authoring tool MUST NOT claim conformance to UI Events for content it produces which uses features of this specification marked as deprecated in this specification.
- **1.2.2. Authoring tools.** A conforming content authoring tool SHOULD provide to the content author a means to use all event types and interfaces appropriate to all host languages in the content document being produced.

## UI Events KeyboardEvent key Values

Source: https://www.w3.org/TR/uievents-key/

This specification defines the key attribute values that must be used for KeyboardEvent ’s key attribute, which is defined as part of the UI Events Specification [UIEvents] .

- **1. Introduction.** This document specifies the set of valid key attribute values that MUST be used in the KeyboardEvent 's key attribute to encode the key’s meaning.
- **2. Keyboard Event key Attribute Values.** A key attribute value MUST always contain a value that falls into one of these two categories (even if the value is " Unidentified " ).
- **2.1. Unicode Values.** Almost every Unicode character can be used as a valid key attribute value , but there is a small set of Unicode characters which MUST NOT be used.
- **2.1. Unicode Values.** The string MUST be in Normalized Form C (NFC) as described in [UAX15] .
- **3. Named key Attribute Values.** A conforming implementation of the KeyboardEvent interface MUST support this set of values for use in the key attributes, although not all values may be available on all platforms or devices.
- **3. Named key Attribute Values.** Rather than allowing user agents to define their own named key attribute values (which are unlikely to be consistent across multiple user agents), bugs SHOULD be filed so that this specification can be updated.
- **3.1. Special Keys.** Implementations that are unable to identify a key MUST use " Unidentified " as the key attribute value .
- **3.1. Special Keys.** Conforming implementations MUST only use " Unidentified " as a key value when there is no way for the implementation to detect the key value.

## UI Events KeyboardEvent code Values

Source: https://www.w3.org/TR/uievents-code/

This specification defines the values for the KeyboardEvent.code attribute, which is defined as part of the UI Events Specification [UIEvents] . The code value contains information about the key event that can be used to identify the physical key being pressed by the user.

- **2.4. Virtual Keyboards and Chording Keyboards.** Wherever possible, however, virtual keyboards SHOULD produce the normal range of keyboard events and values, for ease of authoring and compatibility with existing content.
- **2.4. Virtual Keyboards and Chording Keyboards.** A chording keyboard MAY have additional mode keys to switch between key values, and the number and type of keys pressed to produce a key value will vary, but the final key values produced by such keyboards SHOULD match the range of key values described in this specification.
- **3. Keyboard Event code Value Tables.** For every key listed as "Required" in this specification, a conforming implementation of the KeyboardEvent interface MUST return the correct value as long as that key is available on that platform.
- **3. Keyboard Event code Value Tables.** Rather than allowing user agents to define their own key code attribute values (which are unlikely to be consistent across multiple user agents), bugs SHOULD be filed so that this specification can be updated.
- **3.7. Legacy, Non-Standard and Special Keys.** Conforming implementations MUST only use " Unidentified " as a key code when there is no way for the implementation to determine the key code.
- **3.7. Legacy, Non-Standard and Special Keys.** Exposing only this value MUST NOT indicate a conforming implementation.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** This document provides an overview of the various keyboard layouts and specifies the code values that should be used for each of the keys.
