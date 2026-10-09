# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8620 The JSON Meta Application Protocol (JMAP)

Source: https://www.rfc-editor.org/rfc/rfc8620.html

- **RFC 8620 § 1.5.** All data sent from the client to the server or from the server to the client (except binary file upload/download) MUST be valid I-JSON according to the RFC and is therefore case sensitive and encoded in UTF-8 [RFC3629].
- **RFC 8620 § 1.7.** All HTTP requests MUST use the "https://" scheme (HTTP over TLS [RFC2818]).
- **RFC 8620 § 1.7.** All HTTP requests MUST be authenticated.
- **RFC 8620 § 1.8.** The client MUST opt in to use an extension by passing the appropriate capability identifier in the "using" array of the Request object, as described in Section 3.3.
- **RFC 8620 § 2.** The capabilities object MUST include a property called "urn:ietf:params:jmap:core".
- **RFC 8620 § 3.1.** The request MUST be of type "application/json" and consist of a single JSON-encoded "Request" object, as defined in Section 3.3.
- **RFC 8620 § 3.3.** The method calls MUST be processed sequentially, in order.
- **RFC 8620 § 3.3.** To ensure forwards compatibility, a server MUST ignore any other properties it does not understand on the JMAP Request object.
- **RFC 8620 § 3.6.2.** If a method encounters an error, the appropriate "error" response MUST be inserted at the current point in the "methodResponses" array and, unless otherwise specified, further processing MUST NOT happen within that method call.
- **RFC 8620 § 3.6.2.** Errors at the method level MUST NOT generate an HTTP-level error.
- **RFC 8620 § 3.6.2.** With the exception of when the "serverPartialFail" error is returned, the externally visible state of the server MUST NOT have changed if an error is returned at the method level.
- **RFC 8620 § 3.6.2.** Should a client receive an error type it does not understand, it MUST treat it the same as the "serverFail" type.
- **RFC 8620 § 3.7.** If any result reference fails to resolve, the whole method MUST be rejected with an "invalidResultReference" error.
- **RFC 8620 § 5.1.** When a client receives a response with a different state string to a previous call, it MUST either throw away all currently cached objects for the type or call "Foo/changes" to get the exact changes.
- **RFC 8620 § 5.3.** It is permissible for the server to commit changes to some objects but not others; however, it MUST NOT only commit part of an update to a single record (e.g., update a "name" property but not a "count" property, if both are supplied in the update object).
- **RFC 8620 § 6.1.** As access controls are often determined by the object holding the reference to a blob, unreferenced blobs MUST only be accessible to the uploader, even in shared accounts.
- **RFC 8620 § 8.1.** To ensure the confidentiality and integrity of data sent and received via JMAP, all requests MUST use TLS 1.2 [RFC5246] [RFC8446] or later, following the recommendations in [RFC7525].
- **RFC 8620 § 8.1.** Clients MUST validate TLS certificate chains to protect against man-in-the-middle attacks [RFC5280].
- **RFC 8620 § 8.5.** JMAP servers MUST implement sensible limits to mitigate against resource exhaustion attacks.
- **RFC 8620 § 8.6.** The server MUST ensure the URL is externally resolvable to avoid server-side request forgery, where the server makes a request to a resource on its internal network.

## RFC 8621 The JSON Meta Application Protocol (JMAP) for Mail

Source: https://www.rfc-editor.org/rfc/rfc8621.html

- **RFC 8621 § 4.1.1.** An Email in the mail store MUST belong to one or more Mailboxes at all times (until it is destroyed).
- **RFC 8621 § 4.1.1.** Because JSON is case sensitive, servers MUST return keywords in lowercase.
- **RFC 8621 § 7.5.** The server MUST remove any Bcc header field present on the message during delivery.
- **RFC 8621 § 4.2.** The server MUST ensure the truncation results in valid UTF-8 and does not occur mid-codepoint.
- **RFC 8621 § 2.** There MUST NOT be two sibling Mailboxes with both the same parent and the same name.
