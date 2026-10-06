# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebTransport

Source: https://www.w3.org/TR/webtransport/

This document defines a set of ECMAScript APIs in WebIDL to allow data to be sent and received between a browser and server, utilizing [WEB-TRANSPORT-OVERVIEW] . This specification is being developed in conjunction with protocol specifications developed by the IETF WEBTRANS Working Group.

- **2. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in [RFC2119] and [RFC8174] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [WEBIDL] , as this specification uses that specification and terminology.
- **4.3. Procedures.** The user agent MUST, for any WebTransport object whose [[State]] is "connecting" or "connected" , run sendDatagrams on a subset (determined by send-order rules ) of its associated WebTransportDatagramsWritable objects, and SHOULD do so as soon as reasonably possible whenever the algorithm can make progress.
- **4.3. Procedures.** The send-order rules are that sending in general MAY be interleaved with sending of previously queued streams and datagrams, as well as streams and datagrams yet to be queued to be sent over this transport, except that sending MUST starve until all bytes queued for sending on streams and datagrams with the same [[SendGroup]] and a higher [[SendOrder]] , that are neither errored nor blocked by…
- **5.2. Methods.** When called, the user agent MUST run these steps: Let transport be WebTransport object associated with this .
- **5.4. Procedures.** The user agent SHOULD run receiveDatagrams for any WebTransport object whose [[State]] is "connected" as soon as reasonably possible whenever the algorithm can make progress.
- **6.2. Constructor.** When the WebTransport() constructor is invoked, the user agent MUST run the following steps: Let baseURL be this ’s relevant settings object ’s API base URL .
- **6.3. Attributes.** ready , of type Promise< undefined >, readonly On getting, it MUST return this ’s [[Ready]] .
