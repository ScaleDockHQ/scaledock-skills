# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Shapes Constraint Language (SHACL)

Source: https://www.w3.org/TR/shacl/

This document defines the SHACL Shapes Constraint Language, a language for validating RDF graphs against a set of conditions. These conditions are provided as shapes and other constructs expressed in the form of an RDF graph. RDF graphs that are used in this manner are called "shapes graphs" in SHACL and the RDF graphs that are validated against a shapes graph are called "data graphs". As SHACL shape graphs are used to validate that data graphs satisfy a set of conditions they can also be viewed as a description of the data graphs that do satisfy these conditions. Such descriptions may be used for a variety of purposes beside validation, including user interface building, code generation and

- **1.1 Terminology.** All SHACL implementations MUST at least implement SHACL Core.
- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **1.5 Relationship between SHACL and RDFS inferencing.** If a shapes graph contains any triple with the predicate sh:entailment and object E and the SHACL processor does not support E as an entailment regime for the given data graph then the processor MUST signal a failure .
- **1.5 Relationship between SHACL and RDFS inferencing.** Otherwise, the SHACL processor MUST provide the entailments for all of the values of sh:entailment in the shapes graph , and any inferred triples MUST be returned by all queries against the data graph during the validation process.
- **2.3.2.1 sh:name and sh:description.** If present, tools SHOULD prefer those locally specified labels over globally specified labels at the rdf:Property itself.
- **2.3.2.1 sh:name and sh:description.** For example, if a form displays a node that is in the target of a given property shape with an sh:name , then the tool SHOULD use the provided name.
- **3.1 Shapes Graph.** As a pre-validation step, SHACL processors SHOULD extend the originally provided shapes graph by transitively following and importing all referenced shapes graphs through the owl:imports predicate.
- **3.1 Shapes Graph.** The resulting graph forms the input shapes graph for validation and MUST NOT be further modified during the validation process.

## SHACL 1.2 Core

Source: https://www.w3.org/TR/shacl12-core/

This document defines the Core of SHACL. SHACL, the Shapes Constraint Language, is a language for describing the structure of RDF graphs. SHACL can be used to define classes and the properties that instances of these classes can have. More general than classes and instances, SHACL introduces the notion of shapes that can formally specify constraints on the structure of RDF nodes and edges. SHACL shapes are themselves represented in RDF graphs called shapes graphs. The RDF graphs that are described by a shapes graph are called data graphs. SHACL may be used for a variety of purposes such as validating, inferencing, modeling domains, generating ontologies to inform other agents, building user

- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **1.4 Relationship between SHACL and RDFS inferencing.** If a shapes graph contains any triple with the predicate sh:entailment and object E and the SHACL processor does not support E as an entailment regime for the given data graph , then the processor MUST signal a failure .
- **1.4 Relationship between SHACL and RDFS inferencing.** Otherwise, the SHACL processor MUST provide the entailments for all of the values of sh:entailment in the shapes graph , and any inferred triples MUST be returned by all queries against the data graph during the validation process.
- **6.1 Shapes Graph.** However it is constructed, the shapes graph used for validation MUST remain fixed during the validation process.
- **6.1 Shapes Graph.** In particular, the import closure of a shapes graph SHOULD NOT contain two graphs that are different versions of the same series, or where one declares owl:incompatibleWith the other.
- **6.3 Graph for rdfs:subClassOf Triples.** SHACL processors SHOULD offer a parameter subClassOfInShapesGraph that, if set to true , should alter the definition of SHACL Type so that the rdfs:subClassOf triples are queried from the shapes graph in addition to the data graph .
- **6.4 Linking data graphs to shapes graphs (sh:shapesGraph).** Every value of sh:shapesGraph is an IRI representing a graph that SHOULD be included into the shapes graph used to validate the data graph .
- **6.4 Linking data graphs to shapes graphs (sh:shapesGraph).** In the following example, a SHACL processor SHOULD use the union of ex:graph-shapes1 and ex:graph-shapes2 graphs (and their owl:imports ) as the shapes graph when validating the given graph.
