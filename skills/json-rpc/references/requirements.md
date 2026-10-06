# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## JSON-RPC 2.0

Source: https://www.jsonrpc.org/specification

JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments. It uses JSON ( RFC 4627 ) as data format.

- **2 Conventions.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 .
- **4 Request object.** Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.
- **4 Request object.** id An identifier established by the Client that MUST contain a String, Number, or NULL value if included.
- **4 Request object.** The value SHOULD normally not be Null [1] and Numbers SHOULD NOT contain fractional parts [2] The Server MUST reply with the same value in the Response object if included.
- **4.1 Notification.** The Server MUST NOT reply to a Notification, including those that are within a batch request.
- **4.2 Parameter Structures.** If present, parameters for the rpc call MUST be provided as a Structured value.
- **4.2 Parameter Structures.** by-position: params MUST be an Array, containing the values in the Server expected order.
- **4.2 Parameter Structures.** by-name: params MUST be an Object, with member names that match the Server expected parameter names.
