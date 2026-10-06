# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RDF 1.1 Concepts and Abstract Syntax

Source: https://www.w3.org/TR/rdf11-concepts/

The Resource Description Framework (RDF) is a framework for representing information in the Web. This document defines an abstract syntax (a data model) which serves to link all RDF-based languages and specifications. The abstract syntax has two key data structures: RDF graphs are sets of subject-predicate-object triples, where the elements may be IRIs, blank nodes, or datatyped literals. They are used to express descriptions of resources. RDF datasets are used to organize collections of RDF graphs, and comprise a default graph and zero or more named graphs. RDF 1.1 Concepts and Abstract Syntax also introduces key concepts and terminology, and discusses datatyping and the handling of fragmen

- **2. Conformance.** The key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [ RFC2119 ].
- **3.2 IRIs.** IRIs in the RDF abstract syntax MUST be absolute, and MAY contain a fragment identifier.
- **3.2 IRIs.** Further normalization MUST NOT be performed when comparing IRIs for equality.
- **3.3 Literals.** A literal in an RDF graph consists of two or three elements: a lexical form , being a Unicode [ UNICODE ] string, which SHOULD be in Normal Form C [ NFC ], a datatype IRI , being an IRI identifying a datatype that determines how the lexical form maps to a literal value , and if and only if the datatype IRI is http://www.w3.org/1999/02/22-rdf-syntax-ns#langString , a non-empty language tag as defined by [ BCP47 ].
- **3.3 Literals.** The language tag MUST be well-formed according to section 2.2.9 of [ BCP47 ].
- **3.3 Literals.** Implementations MUST accept ill-typed literals and produce RDF graphs from them.
- **3.5 Replacing Blank Nodes with IRIs.** Systems wishing to do this SHOULD mint a new, globally unique IRI (a Skolem IRI ) for each blank node so replaced.
- **3.5 Replacing Blank Nodes with IRIs.** Systems that want Skolem IRIs to be recognizable outside of the system boundaries SHOULD use a well-known IRI [ RFC5785 ] with the registered name genid .

## RDF 1.2 Concepts and Abstract Data Model

Source: https://www.w3.org/TR/rdf12-concepts/

The Resource Description Framework (RDF) is a framework for representing information on the Web. This document defines an abstract data model which serves to link all RDF-based languages and specifications. The abstract data model has two key data structures: RDF graphs are sets of subject-predicate-object triples, where the elements may be IRIs, blank nodes, datatyped literals, or triple terms. They are used to express descriptions of resources. RDF datasets are used to organize collections of RDF graphs, and consist of a default graph and zero or more named graphs. Compared to RDF 1.1, RDF 1.2 introduces the ability to use an RDF triple

- **2. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1 Version Labels.** For serializations supporting in-line version announcement, the version announcement SHOULD be made early in the document and certainly before serializing any feature depending on that version.
- **3.3 IRIs.** An IRI in the RDF abstract syntax MUST be resolved per [ RFC3986 ] and MUST NOT be a relative reference .
- **3.3 IRIs.** An IRI SHOULD follow rules defined by the IRI scheme .
- **3.3 IRIs.** (This is done in the abstract syntax, so the IRIs are resolved IRIs with no escaping or encoding.) Further normalization MUST NOT be performed before this comparison.
- **3.4 Literals.** The language tag MUST be well-formed according to section 2.2.9 of [ BCP47 ], and MUST be treated accordingly, that is, in a case-insensitive manner.
- **3.4 Literals.** If and only if the datatype IRI is http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString , there is a base direction that MUST be one of the following: ltr , indicating that the initial text direction is set to left-to-right rtl , indicating that the initial text direction is set to right-to-left A literal is a language-tagged string if the language tag is present and the base direction is not present.
- **3.4.2 Literal Value.** Implementations SHOULD accept ill-typed literals and produce RDF graphs from them.

## Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10

Source: https://www.w3.org/TR/rdf-concepts/

The Resource Description Framework (RDF) is a framework for representing information in the Web. This document defines an abstract syntax (a data model) which serves to link all RDF-based languages and specifications. The abstract syntax has two key data structures: RDF graphs are sets of subject-predicate-object triples, where the elements may be IRIs, blank nodes, or datatyped literals. They are used to express descriptions of resources. RDF datasets are used to organize collections of RDF graphs, and comprise a default graph and zero or more named graphs. RDF 1.1 Concepts and Abstract Syntax also introduces key concepts and terminology, and discusses datatyping and the handling of fragmen

- **2. Conformance.** The key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [ RFC2119 ].
- **3.2 IRIs.** IRIs in the RDF abstract syntax MUST be absolute, and MAY contain a fragment identifier.
- **3.2 IRIs.** Further normalization MUST NOT be performed when comparing IRIs for equality.
- **3.3 Literals.** A literal in an RDF graph consists of two or three elements: a lexical form , being a Unicode [ UNICODE ] string, which SHOULD be in Normal Form C [ NFC ], a datatype IRI , being an IRI identifying a datatype that determines how the lexical form maps to a literal value , and if and only if the datatype IRI is http://www.w3.org/1999/02/22-rdf-syntax-ns#langString , a non-empty language tag as defined by [ BCP47 ].
- **3.3 Literals.** The language tag MUST be well-formed according to section 2.2.9 of [ BCP47 ].
- **3.3 Literals.** Implementations MUST accept ill-typed literals and produce RDF graphs from them.
- **3.5 Replacing Blank Nodes with IRIs.** Systems wishing to do this SHOULD mint a new, globally unique IRI (a Skolem IRI ) for each blank node so replaced.
- **3.5 Replacing Blank Nodes with IRIs.** Systems that want Skolem IRIs to be recognizable outside of the system boundaries SHOULD use a well-known IRI [ RFC5785 ] with the registered name genid .

## RDF 1.1 N-Triples

Source: https://www.w3.org/TR/n-triples/

N-Triples is a line-based, plain text format for encoding an RDF graph.

- **4. A Canonical form of N-Triples.** Canonical N-Triples has the following additional constraints on layout: The whitespace following subject , predicate , and object MUST be a single space, ( U+0020 ).
- **4. A Canonical form of N-Triples.** All other locations that allow whitespace MUST be empty.
- **4. A Canonical form of N-Triples.** HEX MUST use only uppercase letters ( [A-F] ).
- **4. A Canonical form of N-Triples.** Characters MUST NOT be represented by UCHAR .
- **4. A Canonical form of N-Triples.** ECHAR MUST NOT be used for characters that are allowed directly in STRING_LITERAL_QUOTE .
- **5. Conformance.** The key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [ RFC2119 ].
- **6.1 Other Media Types.** When used in this way N-Triples MUST use the escaped form of any character outside US-ASCII.
- **7. Grammar.** However, as only the STRING_LITERAL_QUOTE production is allowed new lines in literals MUST be escaped.

## RDF 1.2 N-Triples

Source: https://www.w3.org/TR/rdf12-n-triples/

N-Triples is a line-based, plain text format for encoding an RDF graph . RDF 1.2 N-Triples introduces triple terms as a fourth kind of RDF term which can be used as the object of another triple , making it possible to make statements about other statements. RDF 1.2 N-Triples also adds support for directional language-tagged strings .

- **3. A Canonical form of N-Triples.** Canonical N-Triples has the following additional constraints on layout: White space MUST NOT be used except after subject , predicate , object , and the terminal <<( , any of which MUST be a single space .
- **3. A Canonical form of N-Triples.** A Canonical N-Triples document MUST NOT include a VERSION directive.
- **3. A Canonical form of N-Triples.** Literals with the datatype http://www.w3.org/2001/XMLSchema#string MUST NOT use the datatype IRI part of the literal , and are represented using only STRING_LITERAL_QUOTE .
- **3. A Canonical form of N-Triples.** HEX MUST use only digits ( [ 0 – 9 ] ) and uppercase letters ( [ A – F ] ).
- **3. A Canonical form of N-Triples.** Alphabetic characters in LANG_DIR MUST use only the lowercase letters ( [ a – z ] ) with any uppercase letters case mapped to lowercase.
- **3. A Canonical form of N-Triples.** Within STRING_LITERAL_QUOTE : Characters BS , HT , LF , FF , CR , " , and \ MUST be encoded using ECHAR .
- **3. A Canonical form of N-Triples.** Characters in the range from U+0000 to U+0007 , VT , characters in the range from U+000E to U+001F , DEL , and characters not matching the Char production from [ XML11 ] MUST be represented by UCHAR using a lowercase \u with 4 HEX es.
- **3. A Canonical form of N-Triples.** All characters not required to be represented by ECHAR or UCHAR MUST be represented by their native [ UNICODE ] representation.

## RDF 1.1 N-Quads

Source: https://www.w3.org/TR/n-quads/

N-Quads is a line-based, plain text format for encoding an RDF dataset.

- **3. Conformance.** The key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [ RFC2119 ].
- **4. Grammar.** However, as only the STRING_LITERAL_QUOTE production is allowed new lines in literals MUST be escaped.
- **B. N-Quads Internet Media Type, File Extension and Macintosh File Type.** Care must be taken to align the trust in consulted resources with the sensitivity of the intended use of the data; inferences of potential medical treatments would likely require different trust than inferences for trip planning.
- **B. N-Quads Internet Media Type, File Extension and Macintosh File Type.** Security/privacy protocols must be imposed which reflect the sensitivity of the embedded information.
- **B. N-Quads Internet Media Type, File Extension and Macintosh File Type.** Application rendering strings retrieved from untrusted N-Quads documents must ensure that malignant strings may not be used to mislead the reader.
- **B. N-Quads Internet Media Type, File Extension and Macintosh File Type.** Applications interpreting data expressed in N-Quads should address the security issues of Internationalized Resource Identifiers (IRIs) [ RFC3987 ] Section 8, as well as Uniform Resource Identifier (URI): Generic Syntax [ RFC3986 ] Section 7.
- **B. N-Quads Internet Media Type, File Extension and Macintosh File Type.** foo:resum鼯code> and fоо:resumé )--> Any person or application that is writing or interpreting data in Turtle must take care to use the IRI that matches the intended semantics, and avoid IRIs that make look similar.

## RDF 1.2 N-Quads

Source: https://www.w3.org/TR/rdf12-n-quads/

N-Quads is a line-based, plain text format for encoding an RDF dataset . RDF 1.2 N-Quads introduces triple terms as a fourth kind of RDF term which can be used as the object of another triple , making it possible to make statements about other statements. RDF 1.2 N-Quads also adds support for directional language-tagged strings .

- **3. A Canonical form of N-Quads.** Canonical N-Quads has the following additional constraints on layout: White space MUST NOT be used except after subject , predicate , object , and graphLabel , any of which MUST be a single space .
- **3. A Canonical form of N-Quads.** A Canonical N-Quads document MUST NOT include a VERSION directive.
- **3. A Canonical form of N-Quads.** Literals with the datatype http://www.w3.org/2001/XMLSchema#string MUST NOT use the datatype IRI part of the literal , and are represented using only STRING_LITERAL_QUOTE .
- **3. A Canonical form of N-Quads.** HEX MUST use only digits ( [ 0 – 9 ] ) and uppercase letters ( [ A – F ] ).
- **3. A Canonical form of N-Quads.** Alphabetic characters in LANG_DIR MUST use only the lowercase letters ( [ a – z ] ) with any uppercase letters case mapped to lowercase.
- **3. A Canonical form of N-Quads.** Within STRING_LITERAL_QUOTE : Characters BS , HT , LF , FF , CR , " , and \ MUST be encoded using ECHAR .
- **3. A Canonical form of N-Quads.** Characters in the range from U+0000 to U+0007 , VT , characters in the range from U+000E to U+001F , DEL , and characters not matching the Char production from [ XML11 ] MUST be represented by UCHAR using a lowercase \u with 4 HEX es.
- **3. A Canonical form of N-Quads.** All characters not required to be represented by ECHAR or UCHAR MUST be represented by their native [ UNICODE ] representation.
