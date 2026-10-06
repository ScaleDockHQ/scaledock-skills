# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Window Management

Source: https://www.w3.org/TR/window-management/

This document defines a web platform API that allows script to query the device for information about its screens, and place content on specific screens.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1. Screen.** While many screen attributes could be used for active fingerprinting , the strings used as labels in particular should be considered carefully to minimize the uniqueness.
- **3.2.7. Window attribute and method definition changes.** The following Window attributes and method definitions are updated to return and interpret values relative to the multi-screen origin : screenX and screenLeft attributes must return the x-coordinate, relative to the multi-screen origin , of the left of the client window as number of CSS pixels , or zero if there is no such thing.
- **3.2.7. Window attribute and method definition changes.** screenY and screenTop attributes must return the y-coordinate, relative to the multi-screen origin , of the top of the client window as number of CSS pixels , or zero if there is no such thing.
- **3.2.7. Window attribute and method definition changes.** moveTo() steps must interpret x and y arguments to be specified relative to the multi-screen origin .
- **3.2.7. Window attribute and method definition changes.** open() steps must interpret "left" and "top" feature values to be specified relative to the multi-screen origin .
- **3.6.1. The 'display-state' media feature.** In child browsing contexts, the display state must match that of the top-level browsing context .
- **3.7. Permission API Integration.** User agents should carefully migrate to the updated permission string: " window-management ".
