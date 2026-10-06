# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8615 Well-Known Uniform Resource Identifiers (URIs)

Source: https://www.rfc-editor.org/rfc/rfc8615.html

- **document.** Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Applications that wish to mint new well-known URIs MUST register them, following the procedures in Section 5.1 , subject to the following requirements.
- **document.** Registered names MUST conform to the "segment-nz" production in [ RFC3986 ].
- **document.** Registered names for a specific application SHOULD be correspondingly precise; "squatting" on generic terms is not encouraged.
- **document.** Typically, applications will use the default port for the given scheme; if an alternative port is used, it MUST be explicitly specified by the application in question.
- **document.** Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.
- **document.** Note that this specification defines neither how to determine the hostname to use to find the well-known URI for a particular application, nor the scope of the metadata discovered by dereferencing the well-known URI; both should be defined by the application itself.
- **document.** Also, this specification does not define a format or media type for the resource located at "/.well-known/", and clients should not expect a resource to exist at that location.
