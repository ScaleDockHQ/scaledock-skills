# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax (Second Edition)

Source: https://www.w3.org/TR/owl2-syntax/

The OWL 2 Web Ontology Language, informally OWL 2, is an ontology language for the Semantic Web with formally defined meaning. OWL 2 ontologies provide classes, properties, individuals, and data values and are stored as Semantic Web documents. OWL 2 ontologies can be used along with information written in RDF, and OWL 2 ontologies themselves are primarily exchanged as RDF documents. The OWL 2 Document Overview describes the overall state of OWL 2, and should be read before other OWL 2 documents. The meaningful constructs provided by OWL 2 are defined in terms of their structure. As well, a functional-style syntax is defined for these constructs, with examples and informal descriptions. One c

- **1 Introduction.** The italicized keywords MUST , MUST NOT , SHOULD , SHOULD NOT , and MAY are used to specify normative features of OWL 2 documents and tools, and are interpreted as specified in RFC 2119 [ RFC 2119 ].
- **2.1 Structural Specification.** Duplicates SHOULD be eliminated when ontology documents written in such syntaxes are converted into instances of the UML classes of the structural specification.
- **2.2 BNF Notation.** The following characters are called delimiters : = (U+3D) ( (U+28) ) (U+29) < (U+3C) > (U+3E) @ (U+40) ^ (U+5E) Given an input sequence of characters, an OWL 2 implementation MUST exhibit the same observable behavior as if it applied the BNF grammar rules to the sequence of terminal symbols obtained from the input as follows.
- **2.2 BNF Notation.** If there is no match, the input SHOULD be rejected.
- **2.2 BNF Notation.** If there is no match, the input SHOULD be rejected; otherwise, p is moved to the first character after the match (and thus the match is discarded).
- **2.3 Integers, Characters, Strings, Language Tags, and Node IDs.** Each character MUST match the Char production from XML [ XML ].
- **2.4 IRIs.** Each IRI MUST be absolute (i.e., not relative).
- **2.4 IRIs.** If a concrete syntax uses this IRI abbreviation mechanism, it SHOULD provide a suitable mechanism for declaring prefix names.

## OWL 2 Web Ontology Language Direct Semantics (Second Edition)

Source: https://www.w3.org/TR/owl2-direct-semantics/

The OWL 2 Web Ontology Language, informally OWL 2, is an ontology language for the Semantic Web with formally defined meaning. OWL 2 ontologies provide classes, properties, individuals, and data values and are stored as Semantic Web documents. OWL 2 ontologies can be used along with information written in RDF, and OWL 2 ontologies themselves are primarily exchanged as RDF documents. The OWL 2 Document Overview describes the overall state of OWL 2, and should be read before other OWL 2 documents. This document provides the direct model-theoretic semantics for OWL 2, which is compatible with the description logic SROIQ . Furthermore, this document defines the most common inference problems for

- **1 Introduction.** The semantics is defined for OWL 2 axioms and ontologies, which should be understood as instances of the structural specification [ OWL 2 Specification ].

## OWL 2 Web Ontology Language Document Overview (Second Edition)

Source: https://www.w3.org/TR/owl2-overview/

The OWL 2 Web Ontology Language, informally OWL 2, is an ontology language for the Semantic Web with formally defined meaning. OWL 2 ontologies provide classes, properties, individuals, and data values and are stored as Semantic Web documents. OWL 2 ontologies can be used along with information written in RDF, and OWL 2 ontologies themselves are primarily exchanged as RDF documents. This document serves as an introduction to OWL 2 and the various other OWL 2 documents. It describes the syntaxes for OWL 2, the different kinds of semantics, the available profiles (sub-languages), and the relationship between OWL 1 and OWL 2.

- **2.2 Syntaxes.** The primary exchange syntax for OWL 2 is RDF/XML [ RDF Syntax ]; this is indeed the only syntax that must be supported by all OWL 2 tools (see Section 2.1 of the OWL 2 Conformance document [ OWL 2 Conformance ]).
- **2.3 Semantics.** However, some conditions must be placed on ontology structures in order to ensure that they can be translated into a SROIQ knowledge base; for example, transitive properties cannot be used in number restrictions (see Section 3 of the OWL 2 Structural Specification document [ OWL 2 Structural Specification ] for a complete list of these conditions).
