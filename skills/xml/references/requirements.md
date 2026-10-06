# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Extensible Markup Language (XML) 1.0 (Fifth Edition)

Source: https://www.w3.org/TR/xml/

The Extensible Markup Language (XML) is a subset of SGML that is completely described in this document. Its goal is to enable generic SGML to be served, received, and processed on the Web in the way that is now possible with HTML. XML has been designed for ease of implementation and for interoperability with both SGML and HTML.

- **1.2 Terminology.** The key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL , when EMPHASIZED , are to be interpreted as described in [IETF RFC 2119] .
- **1.2 Terminology.** Unless otherwise specified, failure to observe a prescription of this specification indicated by one of the keywords MUST , REQUIRED , MUST NOT , SHALL and SHALL NOT is an error.
- **1.2 Terminology.** Conforming software MAY detect and report an error and MAY recover from it.] fatal error [ Definition : An error which a conforming XML processor MUST detect and report to the application.
- **1.2 Terminology.** Once a fatal error is detected, however, the processor MUST NOT continue normal processing (i.e., it MUST NOT continue to pass character data and information about the document's logical structure to the application in the normal way).] at user option [ Definition : Conforming software MAY or MUST (depending on the modal verb in the sentence) behave as described; if it does, it MUST provide users…
- **1.2 Terminology.** Violations of validity constraints are errors; they MUST , at user option, be reported by validating XML processors .] well-formedness constraint [ Definition : A rule which applies to all well-formed XML documents.
- **2 Documents.** The logical and physical structures MUST nest properly, as described in 4.3.2 Well-Formed Parsed Entities .
- **2.2 Characters.** Consequently, XML processors MUST accept any character in the range specified for Char .
- **Character Range.** All XML processors MUST accept the UTF-8 and UTF-16 encodings of Unicode [Unicode] ; the mechanisms for signaling which of the two is in use, or for bringing other encodings into play, are discussed later, in 4.3.3 Character Encoding in Entities .

## Extensible Markup Language (XML) 1.1 (Second Edition)

Source: https://www.w3.org/TR/xml11/

The Extensible Markup Language (XML) is a subset of SGML that is completely described in this document. Its goal is to enable generic SGML to be served, received, and processed on the Web in the way that is now possible with HTML. XML has been designed for ease of implementation and for interoperability with both SGML and HTML.

- **1.2 Terminology.** The key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL , when EMPHASIZED , are to be interpreted as described in [IETF RFC 2119] .
- **1.2 Terminology.** Unless otherwise specified, failure to observe a prescription of this specification indicated by one of the keywords MUST , REQUIRED , MUST NOT , SHALL and SHALL NOT is an error.
- **1.2 Terminology.** Conforming software MAY detect and report an error and MAY recover from it.] fatal error [ Definition : An error which a conforming XML processor MUST detect and report to the application.
- **1.2 Terminology.** Once a fatal error is detected, however, the processor MUST NOT continue normal processing (i.e., it MUST NOT continue to pass character data and information about the document's logical structure to the application in the normal way).] at user option [ Definition : Conforming software MAY or MUST (depending on the modal verb in the sentence) behave as described; if it does, it MUST provide users…
- **1.2 Terminology.** Violations of validity constraints are errors; they MUST , at user option, be reported by validating XML processors .] well-formedness constraint [ Definition : A rule which applies to all well-formed XML documents.
- **1.3 Rationale and list of changes for XML 1.1.** SHOULD adhere to, and document processors SHOULD verify.
- **2 Documents.** The logical and physical structures MUST nest properly, as described in 4.3.2 Well-Formed Parsed Entities .
- **2.2 Characters.** Consequently, XML processors MUST accept any character in the range specified for Char .]

## Namespaces in XML 1.0 (Third Edition)

Source: https://www.w3.org/TR/xml-names/

XML namespaces provide a simple method for qualifying element and attribute names used in Extensible Markup Language documents by associating them with namespaces identified by URI references.

- **1.1 A Note on Notation and Usage.** Where EMPHASIZED , the key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , MAY in this document are to be interpreted as described in [Keywords] .
- **1.1 A Note on Notation and Usage.** In this document's productions, the NSC is a "Namespace Constraint", one of the rules that documents conforming to this specification MUST follow.
- **2.1 Basic Concepts.** Processors conforming to this specification MUST recognize and act on these declarations and prefixes.
- **Attribute Names for Namespace Declaration.** [1] NSAttName ::= PrefixedAttName | DefaultAttName [2] PrefixedAttName ::= 'xmlns:' NCName [NSC: Reserved Prefixes and Namespace Names] [3] DefaultAttName ::= 'xmlns' [4] NCName ::= Name - ( Char * ':' Char _) /_ An XML Name , minus the ":" */ The attribute's normalized value MUST be either a URI reference — the namespace name identifying the namespace — or an empty string.
- **Attribute Names for Namespace Declaration.** The namespace name, to serve its intended purpose, SHOULD have the characteristics of uniqueness and persistence.
- **Attribute Names for Namespace Declaration.** It MAY , but need not, be declared, and MUST NOT be bound to any other namespace name.
- **Attribute Names for Namespace Declaration.** Other prefixes MUST NOT be bound to this namespace name, and it MUST NOT be declared as the default namespace.
- **Attribute Names for Namespace Declaration.** Element names MUST NOT have the prefix xmlns .

## Namespaces in XML 1.1 (Second Edition)

Source: https://www.w3.org/TR/xml-names11/

XML namespaces provide a simple method for qualifying element and attribute names used in Extensible Markup Language documents by associating them with namespaces identified by IRI references.

- **1.1 A Note on Notation and Usage.** Where EMPHASIZED , the key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , MAY in this document are to be interpreted as described in [Keywords] .
- **1.1 A Note on Notation and Usage.** In this document's productions, the NSC is a "Namespace Constraint", one of the rules that documents conforming to this specification MUST follow.
- **2.1 Basic Concepts.** Processors conforming to this specification MUST recognize and act on these declarations and prefixes.
- **Attribute Names for Namespace Declaration.** [1] NSAttName ::= PrefixedAttName | DefaultAttName [2] PrefixedAttName ::= 'xmlns:' NCName [NSC: Reserved Prefixes and Namespace Names] [3] DefaultAttName ::= 'xmlns' [4] NCName ::= NCNameStartChar NCNameChar * /* An XML Name , minus the ":" */ [5] NCNameChar ::= NameChar - ':' [6] NCNameStartChar ::= NameStartChar - ':' The attribute's normalized value MUST be either an IRI reference — the…
- **Attribute Names for Namespace Declaration.** The namespace name, to serve its intended purpose, SHOULD have the characteristics of uniqueness and persistence.
- **Attribute Names for Namespace Declaration.** It MAY , but need not, be declared, and MUST NOT be undeclared or bound to any other namespace name.
- **Attribute Names for Namespace Declaration.** Other prefixes MUST NOT be bound to this namespace name, and it MUST NOT be declared as the default namespace.
- **Attribute Names for Namespace Declaration.** Element names MUST NOT have the prefix xmlns .

## XML Inclusions (XInclude) Version 1.0 (Second Edition)

Source: https://www.w3.org/TR/xinclude/

This document specifies a processing model and syntax for general purpose inclusion. Inclusion is accomplished by merging a number of XML information sets into a single composite infoset. Specification of the XML documents (infosets) to be merged and control over the merging process is expressed in XML-friendly syntax (elements, attributes, URI references).

- **1.2 Relationship to XML External Entities.** Validating parsers must have a complete content model defined.
- **1.2 Relationship to XML External Entities.** External entities provide a level of indirection - the external entity must be declared and named, and separately invoked.
- **2 Terminology.** [ Definition : The key words must , must not , required , shall , shall not , should , should not , recommended , may , and optional in this specification are to be interpreted as described in [IETF RFC 2119] .] [ Definition : The term information set refers to the output of an [XML 1.0] or [XML 1.1] processor, expressed as a collection of information items and properties as defined by the [XML…
- **2 Terminology.** [ Definition : The term fatal error refers to the presence of factors that prevent normal processing from continuing.] [ Definition : The term resource error refers to a failure of an attempt to fetch a resource from a URL.] XInclude processors must stop processing when encountering errors other than resource errors , which must be handled as described in 4.4 Fallback Behavior .
- **3.1 xi:include Element.** If the href attribute is absent when parse="xml" , the xpointer attribute must be present.
- **3.1 xi:include Element.** Fragment identifiers must not be used; their appearance is a fatal error .
- **3.1 xi:include Element.** A value that results in a syntactically invalid URI or IRI should be reported as a fatal error , but some implementations may find it impractical to distinguish this case from a resource error .
- **3.1 xi:include Element.** A value of "xml" indicates that the resource must be parsed as XML and the infosets merged.

## XML Base (Second Edition)

Source: https://www.w3.org/TR/xmlbase/

This document describes a facility, similar to that of HTML BASE, for defining base URIs for parts of XML documents.

- **2 Terminology.** [ Definition : The key words must , must not , required , shall , shall not , should , should not , recommended , may , and optional in this specification are to be interpreted as described in [RFC 2119] .] The terms base URI and relative URI are used in this specification as they are defined in [RFC 3986] .
- **3 xml:base Attribute.** In a valid document the attribute must be declared in the DTD, and similar considerations apply to other schema languages.
- **3.1 URI Reference Encoding and Escaping.** (However, some characters allowed in LEIRIs are not legal XML characters, and cannot therefore appear in xml:base values.) In accordance with the principle that percent-encoding must occur as late as possible in the processing chain, applications which provide access to the base URI of an element should calculate and return the value without escaping.
- **3.1 URI Reference Encoding and Escaping.** In the example below, the base URI of element e2 should be returned as "http://example.org/wine/rosé".
- **4.3 Matching URIs with base URIs.** For these reasons, xml:base values should be provided either directly in the XML document instance or via default attributes declared in the internal subset of the DTD.
- **4.4 Interpretation of same-document references.** However, their use as the value of an xml:base attribute does not involve dereferencing, and XML Base processors should resolve them in the usual way.

## XML Entity Definitions for Characters (3rd Edition)

Source: https://www.w3.org/TR/xml-entity-names/

This document defines several sets of names, so that to each name is assigned a Unicode character or sequence of characters. Each of these sets is expressed as a file of XML entity declarations.

- **2.1 The HTML MathML Entity Set.** To incorporate the htmlmathml set into an XML DTD, a typical construct is: <!ENTITY % htmlmathml-f PUBLIC "-//W3C//ENTITIES HTML MathML Set//EN//XML" "https://www.w3.org/2003/entities/2007/htmlmathml-f.ent" > %htmlmathml-f; The public identifier should always be used verbatim, the system identifier should be changed to suit local requirements.
- **5.1 Negated Mathematical Characters.** A combining character should be placed immediately after its "base" character, with no intervening markup or space, just as is the case for combining accents.
- **5.1 Negated Mathematical Characters.** A MathML renderer should be able to use these pre-composed glyphs in these cases.
- **5.1 Negated Mathematical Characters.** combining long solidus overlay combining long vertical line overlay combining reverse solidus overlay Note that it is the policy of the W3C and of Unicode that if a single character is already defined for what can be achieved with a combining character, that character must be used instead of the decomposed form.
- **5.2 Variant.** For a code point to be assigned there should be more than a nuance in glyphs to be recorded.
- **A.3 Multiple Character Entities.** The fjlig entity is mapped to the pair of characters "fj"; modern typesetting engines should automatically use the fj ligature for this combination if the font supplies such a ligature.
- **D Source Files.** It should be edited to refer to the location of a local copy of the files.
