# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)

Source: https://www.rfc-editor.org/rfc/rfc4918.html

- **RFC 4918 § 4.3.** Servers MUST ignore the XML attribute xml:space if present and never use it to change whitespace handling.
- **RFC 4918 § 5.2.** Wherever a server produces a URL referring to a collection, the server SHOULD include the trailing slash.
- **RFC 4918 § 6.1.** A server MUST NOT create conflicting locks on a resource.
- **RFC 4918 § 6.4.** When a locked resource is modified, a server MUST check that the authenticated principal matches the lock creator (in addition to checking for valid lock token submission).
- **RFC 4918 § 6.5.** Lock token URIs MUST be unique across all resources for all time.
- **RFC 4918 § 6.6.** Clients MUST assume that locks can arbitrarily disappear at any time, regardless of the value given in the Timeout header.
- **RFC 4918 § 8.1.** Servers MUST return authorization errors in preference to other errors.
- **RFC 4918 § 8.2.** Implementations MUST accept both text/xml and application/xml in request and response bodies.
- **RFC 4918 § 8.2.** If a server receives XML that is not well-formed, then the server MUST reject the entire request with a 400 (Bad Request).
- **RFC 4918 § 8.5.** The server MUST do authorization checks before checking any HTTP conditional header.
- **RFC 4918 § 9.1.** A client MUST submit a Depth header with a value of "0", "1", or "infinity" with a PROPFIND request.
- **RFC 4918 § 9.1.** An empty PROPFIND request body MUST be treated as if it were an 'allprop' request.
- **RFC 4918 § 9.2.** Servers MUST process PROPPATCH instructions in document order (an exception to the normal rule that ordering is irrelevant).
- **RFC 4918 § 9.3.** When the MKCOL operation creates a new collection resource, all ancestors MUST already exist, or the method MUST fail with a 409 (Conflict) status code.
- **RFC 4918 § 9.6.1.** The DELETE method on a collection MUST act as if a "Depth: infinity" header was used on it.
- **RFC 4918 § 9.8.4.** If a COPY request has an Overwrite header with a value of "F", and a resource exists at the Destination URL, the server MUST fail the request.
- **RFC 4918 § 9.9.1.** Dead properties MUST be moved along with the resource.
- **RFC 4918 § 17.** A recipient of a WebDAV message with an XML body MUST NOT validate the XML document according to any hard-coded or dynamically-declared DTD.
- **RFC 4918 § 20.1.** Since Basic authentication for HTTP/1.1 performs essentially clear text transmission of a password, Basic authentication MUST NOT be used to authenticate a WebDAV client to a server unless the connection is secure.

## RFC 4791 Calendaring Extensions to WebDAV (CalDAV)

Source: https://www.rfc-editor.org/rfc/rfc4791.html

- **RFC 4791 § 4.1.** Calendar object resources contained in calendar collections MUST NOT specify the iCalendar METHOD property.
- **RFC 4791 § 4.1.** The UID property value of the calendar components contained in a calendar object resource MUST be unique in the scope of the calendar collection in which they are stored.
- **RFC 4791 § 5.1.** A server supporting the features described in this document MUST include "calendar-access" as a field in the DAV response header from an OPTIONS request on any resource that supports any calendar properties, reports, method, or privilege.

## RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV)

Source: https://www.rfc-editor.org/rfc/rfc6352.html

- **RFC 6352 § 5.1.** Address object resources contained in address book collections MUST contain a single vCard component only.
- **RFC 6352 § 6.1.** A server supporting the features described in this document MUST include "addressbook" as a field in the DAV response header from an OPTIONS request on any resource that supports any address book properties, reports, or methods.
- **RFC 6352 § 6.3.2.3.** The DAV:getetag property MUST be defined and set to a strong entity tag on all address object resources.
