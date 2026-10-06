# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RDF Dataset Canonicalization

Source: https://www.w3.org/TR/rdf-canon/

RDF [ RDF11-CONCEPTS ] describes a graph-based data model for making claims about the world and provides the foundation for reasoning upon that graph of information. At times, it becomes necessary to compare the differences between sets of graphs, digitally sign them, or generate short identifiers for graphs via hashing algorithms. This document outlines an algorithm for normalizing RDF datasets such that these operations can be performed.

- **2. Conformance.** The key words MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** The algorithms in this specification are normative, because to consistently reproduce the same canonical identifiers, implementations MUST strictly conform to the steps outlined in these algorithms.
- **3.1 Terms defined by this specification.** Implementations MUST support a parameter to define the hash algorithm , MUST support SHA-256 and SHA-384 [ FIPS-180-4 ], and SHOULD support the ability to specify other hash algorithms.
- **4.4.3 Algorithm.** Implementations MUST defend against potential denial-of-service attacks by raising suitable exceptions and terminating early.
- **5. Serialization.** When serializing quads in canonical n-quads form , components which are blank nodes MUST be serialized using the canonical label associated with each blank node from the issued identifiers map component of the canonicalized dataset .
- **A. A Canonical form of N-Quads.** Canonical N-Quads has the following additional constraints on layout: White space MUST NOT be used except after subject , predicate , object , and graphLabel , each of which MUST be a single space (code point U+0020 ).
- **A. A Canonical form of N-Quads.** Literals with the datatype http://www.w3.org/2001/XMLSchema#string MUST NOT use the datatype IRI part of the literal , and are represented using only STRING_LITERAL_QUOTE .
- **A. A Canonical form of N-Quads.** HEX MUST use only digits ( [0-9] ) and uppercase letters ( [A-F] ).
