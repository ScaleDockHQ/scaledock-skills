# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Input Events Level 2

Source: https://www.w3.org/TR/input-events-2/

This specification defines additions to events for text and related input to allow for the monitoring and manipulation of default browser behavior in the context of text editor applications and other applications that deal with text input and text formatting. This specification builds on the UI events spec [ UI-EVENTS ].

- **2. Conformance.** The key words MAY , MUST , and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1.2.** But if a given browser supports an editing operation which potentially leads to a change of the DOM, it MUST dispatch the corresponding beforeinput and input events.
- **6.1.2.** The returned StaticRanges MUST cover only the code points that the browser would normally replace, even if they are only part of a grapheme cluster .
- **6.2.** A user agent MUST dispatch this event when the user has attempted to input in a contenteditable element.
- **6.2.** A user agent MUST NOT dispatch this event due to events that are not caused by attempted user input, such as system events.
- **6.2.** A user agent MUST dispatch this event immediately after the DOM has been updated due to user expressed intention to change the document contents which the browser has handled.
- **6.2.** If the browser makes no DOM change, either because the editing host is an EditContext editing host (which does not do automatic DOM changes) or because the user agent concludes that no DOM change is needed, the user agent MUST NOT dispatch this event.
- **8..** Event order when using "insertFromPaste" When an "insertFromPaste" beforeinput event is dispatched, it MUST be preceded by a paste [ CLIPBOARD-APIS ] event.
