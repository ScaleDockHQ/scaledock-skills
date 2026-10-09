# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 7946 The GeoJSON Format

Source: https://www.rfc-editor.org/rfc/rfc7946.html

- **RFC 7946 § 1.2.** The ordering of the members of any JSON object defined in this document MUST be considered irrelevant, as specified by [RFC7159].
- **RFC 7946 § 3.** A GeoJSON object has a member with the name "type". The value of the member MUST be one of the GeoJSON types.
- **RFC 7946 § 3.** A GeoJSON object MAY have a "bbox" member, the value of which MUST be a bounding box array (see Section 5).
- **RFC 7946 § 3.1.** The value of a Geometry object's "type" member MUST be one of the seven geometry types (see Section 1.4).
- **RFC 7946 § 3.1.1.** Implementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous.
- **RFC 7946 § 3.1.6.** The first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.
- **RFC 7946 § 3.1.6.** A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.
- **RFC 7946 § 3.1.6.** For backwards compatibility, parsers SHOULD NOT reject Polygons that do not follow the right-hand rule.
- **RFC 7946 § 3.1.6.** For type "Polygon", the "coordinates" member MUST be an array of linear ring coordinate arrays.
- **RFC 7946 § 3.1.6.** For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings.
- **RFC 7946 § 3.1.8.** To maximize interoperability, implementations SHOULD avoid nested GeometryCollections.
- **RFC 7946 § 3.1.9.** Any geometry that crosses the antimeridian SHOULD be represented by cutting it in two such that neither part's representation crosses the antimeridian.
- **RFC 7946 § 3.1.10.** As in [RFC5870], the number of digits of the values in coordinate positions MUST NOT be interpreted as an indication to the level of uncertainty.
- **RFC 7946 § 3.2.** The value of the geometry member SHALL be either a Geometry object as defined above or, in the case that the Feature is unlocated, a JSON null value.
- **RFC 7946 § 3.2.** If a Feature has a commonly used identifier, that identifier SHOULD be included as a member of the Feature object with the name "id", and the value of this member is either a JSON string or number.
- **RFC 7946 § 4.** An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid.
- **RFC 7946 § 5.** The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point.
- **RFC 7946 § 5.3.** Implementers MUST NOT use latitude values greater than 90 or less than -90 to imply an extent that is not a spherical cap.
- **RFC 7946 § 7.1.** Implementations MUST NOT change the semantics of GeoJSON members and types.
- **RFC 7946 § 7.1.** FeatureCollection and Feature objects, respectively, MUST NOT contain a "coordinates" or "geometries" member.
- **RFC 7946 § 7.1.** FeatureCollection and Geometry objects, respectively, MUST NOT contain a "geometry" or "properties" member.
- **RFC 7946 § 7.1.** Feature and Geometry objects, respectively, MUST NOT contain a "features" member.
- **RFC 7946 § 8.** A specification that alters the semantics of GeoJSON members or otherwise modifies the format does not create a new version of this format; instead, it defines an entirely new format that MUST NOT be identified as GeoJSON.
