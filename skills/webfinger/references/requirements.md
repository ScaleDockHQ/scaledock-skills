# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 7033 WebFinger

Source: https://www.rfc-editor.org/rfc/rfc7033.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ 1 ].
- **document.** WebFinger resources MUST NOT be served with any other URI scheme (such as HTTP).
- **document.** If the query target contains a "host" portion ( Section 3.2.2 of RFC 3986 ), then the host to which the WebFinger query is issued SHOULD be the same as the "host" portion of the query target, unless the client receives instructions through some out-of-band mechanism to send the query to another host.
- **document.** The path component of a WebFinger URI MUST be the well-known path "/.well-known/webfinger".
- **document.** A WebFinger URI MUST contain a query component that encodes the query target and optional link relation types as specified in Section 4.1 .
- **document.** Constructing the Query Component of the Request URI A WebFinger URI MUST contain a query component (see Section 3.4 of RFC 3986 ).
- **document.** The query component MUST contain a "resource" parameter and MAY contain one or more "rel" parameters.
- **document.** Standards Track [Page 7] RFC 7033 WebFinger September 2013 parameter MUST contain the query target (URI), and the "rel" parameters MUST contain encoded link relation types according to the encoding described in this section.
