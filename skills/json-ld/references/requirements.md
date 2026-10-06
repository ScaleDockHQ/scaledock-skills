# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## JSON-LD 1.1

Source: https://www.w3.org/TR/json-ld11/

JSON is a useful data serialization and messaging format. This specification defines JSON-LD 1.1, a JSON-based format to serialize Linked Data. The syntax is designed to easily integrate into deployed systems that already use JSON, and provides a smooth upgrade path from JSON to JSON-LD. It is primarily intended to be a way to use Linked Data in Web-based programming environments, to build interoperable Web services, and to store Linked Data in JSON-based storage engines. This specification describes a superset of the features defined in JSON-LD 1.0 [ JSON-LD10 ] and, except where noted,

- **2. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1 Interpreting JSON as JSON-LD.** In order to use an external context with an ordinary JSON document, when retrieving an ordinary JSON document via HTTP, processors MUST attempt to retrieve any JSON-LD document referenced by a Link Header with: rel="http://www.w3.org/ns/json-ld#context" , and type="application/ld+json" .
- **6.1 Interpreting JSON as JSON-LD.** The referenced document MUST have a top-level JSON object .
- **6.1 Interpreting JSON as JSON-LD.** All extra information located outside of the @context subtree in the referenced document MUST be discarded.
- **6.1 Interpreting JSON as JSON-LD.** A response MUST NOT contain more than one HTTP Link Header using the http://www.w3.org/ns/json-ld#context link relation.
- **6.1 Interpreting JSON as JSON-LD.** Content-Type: application/json Link: <https://json-ld.org/contexts/person.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json" { "name": "Markus Lanthaler", "homepage": "http://www.markus-lanthaler.com/", "image": "http://twitter.com/account/profile_image/markuslanthaler" } Please note that JSON-LD documents served with the application/ld+json media type MUST have all…
- **6.1 Interpreting JSON as JSON-LD.** Contexts linked via a http://www.w3.org/ns/json-ld#context HTTP Link Header MUST be ignored for such documents.
- **6.2 Alternate Document Location.** A response MUST NOT contain more than one HTTP Link Header using the alternate link relation with type="application/ld+json" .

## JSON-LD 1.0

Source: https://www.w3.org/TR/json-ld/

JSON is a useful data serialization and messaging format. This specification defines JSON-LD 1.1, a JSON-based format to serialize Linked Data. The syntax is designed to easily integrate into deployed systems that already use JSON, and provides a smooth upgrade path from JSON to JSON-LD. It is primarily intended to be a way to use Linked Data in Web-based programming environments, to build interoperable Web services, and to store Linked Data in JSON-based storage engines. This specification describes a superset of the features defined in JSON-LD 1.0 [ JSON-LD10 ] and, except where noted,

- **2. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1 Interpreting JSON as JSON-LD.** In order to use an external context with an ordinary JSON document, when retrieving an ordinary JSON document via HTTP, processors MUST attempt to retrieve any JSON-LD document referenced by a Link Header with: rel="http://www.w3.org/ns/json-ld#context" , and type="application/ld+json" .
- **6.1 Interpreting JSON as JSON-LD.** The referenced document MUST have a top-level JSON object .
- **6.1 Interpreting JSON as JSON-LD.** All extra information located outside of the @context subtree in the referenced document MUST be discarded.
- **6.1 Interpreting JSON as JSON-LD.** A response MUST NOT contain more than one HTTP Link Header using the http://www.w3.org/ns/json-ld#context link relation.
- **6.1 Interpreting JSON as JSON-LD.** Content-Type: application/json Link: <https://json-ld.org/contexts/person.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json" { "name": "Markus Lanthaler", "homepage": "http://www.markus-lanthaler.com/", "image": "http://twitter.com/account/profile_image/markuslanthaler" } Please note that JSON-LD documents served with the application/ld+json media type MUST have all…
- **6.1 Interpreting JSON as JSON-LD.** Contexts linked via a http://www.w3.org/ns/json-ld#context HTTP Link Header MUST be ignored for such documents.
- **6.2 Alternate Document Location.** A response MUST NOT contain more than one HTTP Link Header using the alternate link relation with type="application/ld+json" .

## CBOR-LD 1.0

Source: https://www.w3.org/TR/cbor-ld-10/

CBOR is a compact binary data serialization and messaging format. This specification defines CBOR-LD 1.0, a CBOR-based format to serialize Linked Data. The encoding is designed to leverage the existing JSON-LD ecosystem, which is deployed on hundreds of millions of systems today, to provide a compact serialization format for those seeking efficient encoding schemes for Linked Data. By utilizing semantic compression schemes, compression ratios in excess of 60% better than generalized compression schemes are possible. This format is primarily intended to be a way to use Linked Data in storage and bandwidth constrained programming environments, to build interoperable semantic wire-level protoco

- **1.1.1 Conformance.** The key words MAY , MUST , and OPTIONAL in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.2.4 User-Specified Codecs.** Codecs that are defined in this specification MUST be identified with an IRI.
- **5. CBOR Tags for CBOR-LD.** CBOR-LD payloads MUST be structured such that the item tagged with tag 0xCB1D is a two-element array, and the first element MUST be a major type 0 integer .
- **6.5.3.1 URL Prefix Table.** Implementations that use the URL codec MUST use the table below.
- **1.3 Design Goals and Rationale.** CBOR-LD satisfies the following design goals: Simplicity Implementations should be simple to implement given an existing JSON-LD implementation.
- **1.3 Design Goals and Rationale.** Efficient Storage The encoding process should generate an aggressively compact Linked Data binary format.
- **1.3 Design Goals and Rationale.** Generalized Algorithm The encoding algorithm must be generalized.
- **1.3 Design Goals and Rationale.** Semantic Compression The encoding format should maximize compression of Linked Data URLs (terms and values).

## YAML-LD 1.0

Source: https://www.w3.org/TR/yaml-ld-10/

[ JSON-LD11 ] is a JSON-based format to serialize Linked Data [ LINKED-DATA ]. In recent years, [ YAML ] has emerged as a more concise format to represent information that had previously been serialized as [ JSON ], including API specifications, data schemas, and Linked Data. This document defines YAML-LD as a set of conventions on top of YAML which specify how to serialize Linked Data as YAML based on JSON-LD syntax, semantics, and APIs. Since YAML is more expressive than JSON, both in the available data types and in the document structure (see [ RFC9512 ]), this document identifies constraints on YAML

- **2. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1 Base Specification Versions.** YAML-LD processors MUST use a YAML 1.2 (or later, backward-compatible) implementation; see 8.
- **2.2 Test Suites.** To be conformant, an implementation MUST satisfy all test cases from the following test suites: YAML-LD tests (this specification); JSON-LD API tests [ JSON-LD11-API ]; JSON-LD Framing tests [ JSON-LD11-FRAMING ], ...disregarding the test cases where: processingMode option is provided and set to json-ld-1.0 .
- **4.1.1 Encoding.** JSON text exchanged between systems that are not part of a closed ecosystem MUST be encoded using UTF-8.
- **4.1.1 Encoding.** — [ JSON ] §8.1 Character Encoding A YAML-LD stream MUST be encoded in UTF-8; otherwise, an invalid-encoding error MUST be detected, and processing aborted.
- **4.2.1 Anchors and Aliases.** Consequently, anchor names MUST NOT be used to convey relevant information, MAY be altered when processing the document, and MAY be dropped during YAML-LD processing.
- **4.3 Representation.** A YAML-LD document MAY contain anchored nodes and alias nodes in its serialization, but its representation graph MUST NOT contain cycles; otherwise, a loading-document-failed error MUST be detected, and processing aborted.
- **4.3 Representation.** When composing the representation graph , each alias node MUST resolve to the node identified by its target anchor.
