# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 7252 The Constrained Application Protocol (CoAP)

Source: https://www.rfc-editor.org/rfc/rfc7252.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ] when they appear in ALL CAPS.
- **document.** Implementations of this specification MUST set this field to 1 (01 binary).
- **document.** Messages with unknown version numbers MUST be silently ignored.
- **document.** Lengths 9-15 are reserved, MUST NOT be sent, and MUST be processed as a message format error.
- **document.** The presence of a marker followed by a zero-length payload MUST be processed as a message format error.
- **document.** Instead of specifying the Option Number directly, the instances MUST
- **document.** If the field is set to this value but the entire byte is not the payload marker, this MUST be processed as a message format error.
- **document.** If the field is set to this value, it MUST be processed as a message format error.
