# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)

Source: https://www.rfc-editor.org/rfc/rfc4918.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** All instances of a given live property MUST comply with the definition associated with that property name.
- **document.** extensions because they will still have the data specified in the original schema and MUST ignore elements they do not understand.
- **document.** Servers MUST preserve the following XML Information Items (using the terminology from [ REC-XML-INFOSET ]) in storage and transmission of dead properties: For the property name Element Information Item itself: [namespace name] [local name] [ attributes ] named "xml:lang" or any such attribute in scope [ children ] of type element or character On all Element Information Items in the property…
- **document.** Servers MUST ignore the XML attribute xml:space if present and never use it to change whitespace handling.
- **document.** Dusseault Standards Track [Page 14] RFC 4918 WebDAV June 2007 All DAV-compliant resources MUST support the HTTP URL namespace model specified herein.
- **document.** A collection MUST contain at most one mapping for a given path segment, i.e., it is illegal to have the same path segment mapped to more than one resource.
- **document.** For all WebDAV-compliant resources A and B, identified by URLs "U" and "V", respectively, such that "V" is equal to "U/SEGMENT", A MUST be a collection that contains a mapping from "SEGMENT" to B.

## RFC 4791 Calendaring Extensions to WebDAV (CalDAV)

Source: https://www.rfc-editor.org/rfc/rfc4791.html

- **document.** Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** XML elements defined by individual implementations MUST NOT use the "urn:ietf:params:xml:ns:caldav" namespace, and instead should use a namespace that they control.
- **document.** Processing of XML by CalDAV clients and servers MUST follow the rules described in [ RFC2518 ]; in particular, Section 14 , and Appendix 3 of that specification.
- **document.** If a method precondition or postcondition for a request is not satisfied, the response status of the request MUST either be 403 (Forbidden), if the request should not be repeated because it will always fail, or 409 (Conflict), if it is expected that the user might be able to resolve the conflict and resubmit the request.
- **document.** When a particular precondition is not satisfied or a particular postcondition cannot be achieved, the appropriate XML element MUST be returned as the child of a top-level DAV:error element in the response body, unless otherwise negotiated by the request.
- **document.** To advertise support for CalDAV, a server: o MUST support iCalendar [ RFC2445 ] as a media type for the calendar object resource format; o MUST support WebDAV Class 1 [ RFC2518 ] (note that [ rfc2518bis ] describes clarifications to [ RFC2518 ] that aid interoperability); o MUST support WebDAV ACL [ RFC3744 ] with the additional privilege defined in Section 6.1 of this document; o MUST support…
- **document.** Standards Track [Page 6] RFC 4791 CalDAV March 2007 o MUST support all calendaring reports defined in Section 7 of this document; and o MUST advertise support on all calendar collections and calendar object resources for the calendaring reports in the DAV:supported- report-set property, as defined in Versioning Extensions to WebDAV [ RFC3253 ].
- **document.** In addition, a server: o SHOULD support the MKCALENDAR method defined in Section 5.3.1 of this document.

## RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV)

Source: https://www.rfc-editor.org/rfc/rfc6352.html

- **document.** Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** XML elements defined by individual implementations MUST NOT use the "urn:ietf:params:xml:ns:carddav" namespace, and instead should use a namespace that they control.
- **document.** o MUST support vCard v3 [ RFC2426 ] as a media type for the address object resource format; o MUST support WebDAV Class 3 [ RFC4918 ]; o MUST support WebDAV ACL [ RFC3744 ]; o MUST support secure transport as defined in [ RFC2818 ] using Transport Layer Security (TLS) [ RFC5246 ] and using the certificate validation procedures described in [ RFC5280 ]; o MUST support ETags [ RFC2616 ] with…
- **document.** In addition, a server: o SHOULD support vCard v4 [ RFC6350 ] as a media type for the address object resource format; o SHOULD support the extended MKCOL method [ RFC5689 ] to create address book collections as defined in Section 6.3.1 of this document.
- **document.** o SHOULD support the DAV:current-user-principal-URL property as defined in [ RFC5397 ] to give clients a fast way to locate user principals.
- **document.** Address object resources contained in address book collections MUST contain a single vCard component only.
- **document.** vCard components in an address book collection MUST have a UID property value that MUST be unique in the scope of the address book collection in which it is contained.
- **document.** When that happens, the server MUST return the CARDDAV:supported-address-data-conversion precondition (see below) in the response body (when the failure to convert applies to the entire response) or use that same precondition code in the DAV:response XML element in the response for the targeted address object resource when one of the REPORTs defined below is used.
