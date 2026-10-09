# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## RESTful API (R5)

Source: https://hl7.org/fhir/R5/http.html

- **§ 3.2.0 RESTful API.** Servers SHALL provide a Capability Statement that specifies which interactions and resources are supported.
- **§ 3.2.0.1.10 Content Types and encodings.** UTF-8 encoding SHALL be used for FHIR instances.
- **§ 3.2.0.1.13 Support for Versions.** Servers that do not support versioning SHALL ensure that Resource.meta.versionId is not present on resources they return, and SHALL update the value of Resource.meta.lastUpdated correctly.
- **§ 3.2.0.4 update.** If no id element is provided, or the id disagrees with the id in the URL, the server SHALL respond with an HTTP 400 Bad Request error code, and SHOULD provide an OperationOutcome identifying the issue.
- **§ 3.2.0.4.1 Update as Create.** A server SHALL not return a 201 response if it did not create a new resource.
- **§ 3.2.0.5 Managing Resource Contention.** If provided, the value of the ETag SHALL match the value of the version id for the resource.
- **§ 3.2.0.6 patch.** For this reason, servers that support PATCH SHALL support Resource Contention on the PATCH operation.
- **§ 3.2.0.6.1 Conditional patch.** The server SHALL ensure that the narrative in a resource is not clinically unsafe after the PATCH interaction is performed.
- **§ 3.2.0.8 create.** If an id is provided, the server SHALL ignore it.

## Resource (R5)

Source: https://hl7.org/fhir/R5/resource.html

- **§ 2.1.27.5.3.3 Logical ID.** A logical id SHALL always be represented in the same way in resource references and URLs.
- **§ 2.1.27.5.3.3.3 Canonical URLs.** The canonical URL SHALL NOT refer to some other resource (though it may resolve to a different version of the same resource).

## References (R5)

Source: https://hl7.org/fhir/R5/references.html

- **§ 2.1.3.0.1 Reference (ref-2).** At least one of reference, identifier and display SHALL be present (unless an extension is provided).
- **§ 2.1.3.0.2 Target Type.** When the type is provided directly, it SHALL agree with the type determined by resolving the resource.
- **§ 2.1.3.0.3 Literal References.** References SHALL be a reference to an actual FHIR resource, and SHALL be resolvable (given that access control works, there is no temporary unavailability, etc.).
- **§ 2.1.3.0.10 Contained Resources.** Contained resources SHALL NOT contain additional contained resources.
- **§ 2.1.3.0.10 Contained Resources.** A contained resource SHALL only be included in a resource if something in that resource (potentially another contained resource) has a reference to it or if the contained resource references the container resource.

## JSON Representation (R5)

Source: https://hl7.org/fhir/R5/json.html

- **§ 2.1.6.4 JSON Representation of Resources.** If an element is present in the resource, it SHALL have properties as defined for its type, or 1 or more extensions
- **§ 2.1.6.4 JSON Representation of Resources.** While // is legal in Javascript, it is not legal in JSON, and comments SHALL not be in JSON instances irrespective of whether particular applications ignore them
- **§ 2.1.6.4.2 JSON representation of primitive elements.** If the length of a JSON "element" array is different from the length of its JSON "_element" array, implementations SHALL infer null values in the suffix of the shorter array.

## Conformance Rules (R5)

Source: https://hl7.org/fhir/R5/conformance-rules.html

- **§ 2.1.1.0.3 Cardinality.** Note that when present, elements cannot be empty - they SHALL have a value attribute, child elements, or extensions.
- **§ 2.1.1.0.4 Is-modifier.** Any element not marked is-modifier and without that explanation SHALL NOT be used by an implementer in such a manner as to make the element behave as a modifier.

## Search (R5)

Source: https://hl7.org/fhir/R5/search.html

- **§ 3.2.1.3.2 Self Link - Understanding a Performed Search.** In order to allow the client to be confident about what search parameters were used as criteria by a server, servers SHALL return the parameters that were actually used to process a search.
- **§ 3.2.1.5.5 Modifiers.** Since modifiers change the meaning of a search parameter, a server SHALL reject any search request that contains a search parameter with an unsupported modifier.
- **§ 3.2.1.7.3 Limiting Page Size (\_count).** Servers SHALL NOT return more resources in a single page than requested, even if they don't support paging, but may return less than the client requested.
- **§ 3.2.1.8.1.9 \_query.** Servers processing search requests SHALL refuse to process a search request if they do not recognize the _query parameter value.
