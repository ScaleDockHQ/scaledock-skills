# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Clipboard API and events

Source: https://www.w3.org/TR/clipboard-apis/

This document describes APIs for accessing data on the system clipboard. It provides operations for overriding the default clipboard actions (cut, copy and paste), and for directly accessing the clipboard contents.

- **6.6. Unsanitized data types.** These data types MUST NOT be sanitized by UAs: image/png These data types MAY NOT be sanitized by UAs: optional unsanitized data types Optional unsanitized data types are mime type s specified by the web authors that MAY NOT be sanitized by the user agent.
- **7.2.3. getType(type).** If the system clipboard contents have changed since read() was called, this MUST fail rather than returning data that does not correspond to the current system clipboard state.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **5.2.1.4. ChangeId Generation.** Similarly, when a user clears site data, the affected tabs should be refreshed, which causes event listeners to be re-attached and only receive future events with new change IDs.
- **5.3.1. Event handlers that are allowed to modify the clipboard.** Synthetic cut and copy events must not modify data on the system clipboard.
- **5.3.2. Event handlers that are allowed to read from clipboard.** Synthetic paste events must not give a script access to data on the real system clipboard.
- **5.3.3. Integration with rich text editing APIs.** If an implementation supports ways to execute clipboard commands through scripting, for example by calling the document.execCommand() method with the commands "cut", "copy" and "paste", the implementation must trigger the corresponding action, which again will dispatch the associated clipboard event.
- **5.3.4. Interaction with other events.** If the clipboard operation is triggered by keyboard input, the implementation must fire the corresponding event that initiates the clipboard operation.
