# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebSockets Living Standard

Source: https://websockets.spec.whatwg.org/review-drafts/2023-09/

This specification provides APIs to enable web applications to maintain bidirectional communications with server-side processes.

- **WebSockets.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **3.1. Interface definition.** The extensions attribute must initially return the empty string.
- **3.1. Interface definition.** The protocol attribute must initially return the empty string.
- **3.1. Interface definition.** [WSP] If neither code nor reason is present, the WebSocket Close message must not have a body.
- **3.1. Interface definition.** If code is present, then the status code to use in the WebSocket Close message must be the integer given by code .
- **3.1. Interface definition.** [WSP] If reason is also present, then reasonBytes must be provided in the Close message after the status code.
- **3.1. Interface definition.** Run the appropriate set of steps from the following list: If data is a string If the WebSocket connection is established and the WebSocket closing handshake has not yet started , then the user agent must send a WebSocket Message comprised of the data argument using a text frame opcode; if the data cannot be sent, e.g.
- **3.1. Interface definition.** because it would need to be buffered but the buffer is full, the user agent must flag the WebSocket as full and then close the WebSocket connection .
