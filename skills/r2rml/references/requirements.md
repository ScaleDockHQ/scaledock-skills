# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## R2RML: RDB to RDF Mapping Language

Source: https://www.w3.org/TR/r2rml/

This document describes R2RML, a language for expressing customized mappings from relational databases to RDF datasets. Such mappings provide the ability to view existing relational data in the RDF data model, expressed in a structure and target vocabulary of the mapping author's choice. R2RML mappings are themselves RDF graphs and written down in Turtle syntax. R2RML enables different types of mapping implementations. Processors could, for example, offer a virtual SPARQL endpoint over the mapped relational data, or generate RDF dumps, or offer a Linked Data interface.

- **4 R2RML Processors and Mapping Documents.** It MUST be established with sufficient privileges for read access to all base tables and views that are referenced in the R2RML mapping.
- **4 R2RML Processors and Mapping Documents.** It MUST be configured with a default catalog and default schema that will be used when tables and views are accessed without an explicit catalog or schema reference.
- **4 R2RML Processors and Mapping Documents.** It SHOULD NOT contain question mark (“ ?
- **4 R2RML Processors and Mapping Documents.** ”) or hash (“ # ”) characters and SHOULD end in a slash (“ / ”) character.
- **4 R2RML Processors and Mapping Documents.** When checking the input database, a data validator MUST report any data errors that are raised in the process of generating the output dataset.
- **4.1 Mapping Graphs and the R2RML Vocabulary.** The R2RML vocabulary is the set of IRIs defined in this specification that start with the rr: namespace IRI: http://www.w3.org/ns/r2rml# An R2RML mapping graph : SHOULD NOT include any IRIs that start with the rr: namespace IRI, but are not defined in the R2RML vocabulary .
- **4.1 Mapping Graphs and the R2RML Vocabulary.** SHOULD NOT include IRIs from the R2RML vocabulary where such use is not explicitly allowed or required by a clause in this specification.
- **4.1 Mapping Graphs and the R2RML Vocabulary.** SHOULD contain only mapping components that are referenced by some triples map (in other words, all mapping components should actually be “used” in the mapping).

## A Direct Mapping of Relational Data to RDF

Source: https://www.w3.org/TR/rdb-direct-mapping/

Please refer to the errata for this document, which may include some normative corrections.

- **abstract.** Please refer to the errata for this document, which may include some normative corrections.
