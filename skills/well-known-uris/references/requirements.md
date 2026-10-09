# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 8615 has only four BCP 14 sentences, so this list also quotes its defining rules and the lowercase guidance from its Security Considerations.

## RFC 8615 Well-Known Uniform Resource Identifiers (URIs)

Source: https://www.rfc-editor.org/rfc/rfc8615.html

- **RFC 8615 § 3.** A well-known URI is a URI [RFC3986] whose path component begins with the characters "/.well-known/", provided that the scheme is explicitly defined to support well-known URIs.
- **RFC 8615 § 1.** Well-known URIs can also be used with other URI schemes, but only when those schemes' definitions explicitly allow it.
- **RFC 8615 § 3.** Applications that wish to mint new well-known URIs MUST register them, following the procedures in Section 5.1, subject to the following requirements.
- **RFC 8615 § 3.** Registered names MUST conform to the "segment-nz" production in [RFC3986].
- **RFC 8615 § 3.** Registered names for a specific application SHOULD be correspondingly precise; "squatting" on generic terms is not encouraged.
- **RFC 8615 § 3.** If no URI schemes are explicitly specified, "http" and "https" are assumed.
- **RFC 8615 § 3.** Typically, applications will use the default port for the given scheme; if an alternative port is used, it MUST be explicitly specified by the application in question.
- **RFC 8615 § 3.** Also, this specification does not define a format or media type for the resource located at "/.well-known/", and clients should not expect a resource to exist at that location.
- **RFC 8615 § 3.** Well-known URIs are rooted in the top of the path's hierarchy; they are not well-known by definition in other parts of the path.
- **RFC 8615 § 4.1.** Because well-known locations effectively represent the entire origin, server operators should appropriately control the ability to write to them.
- **RFC 8615 § 4.2.** An application that defines well-known locations should not assume that it has sole access to these mechanisms or that it is the only application using the origin.
