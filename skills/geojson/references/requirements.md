# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 7946 The GeoJSON Format

Source: https://www.rfc-editor.org/rfc/rfc7946.html

- **document.** Requirements Language The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Conventions Used in This Document The ordering of the members of any JSON object defined in this document MUST be considered irrelevant, as specified by [ RFC7159 ].
- **document.** The value of the member MUST be one of the GeoJSON types.
- **document.** o A GeoJSON object MAY have a "bbox" member, the value of which MUST be a bounding box array (see Section 5 ).
- **document.** o The value of a Geometry object's "type" member MUST be one of the seven geometry types (see Section 1.4 ).
- **document.** Implementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous.
- **document.** o The first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.
- **document.** o A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.
