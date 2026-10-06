# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures

Source: https://www.w3.org/TR/xmlschema11-1/

This document specifies the XML Schema Definition Language, which offers facilities for describing the structure and constraining the contents of XML documents, including those which exploit the XML Namespace facility. The schema language, which is itself represented in an XML vocabulary and uses namespaces, substantially reconstructs and considerably extends the capabilities found in XML document type definitions (DTDs). This specification depends on XML Schema Definition Language 1.1 Part 2: Datatypes .

- **G.1.15 Schema composition.** Schema processors are now explicitly recommended to provide a user option to control whether the processor attempts to dereference schema locations indicated in schemaLocation attributes in the instance document being validated; this resolves issue 5476 xsi:schemaLocation should be a hint, should be MAY not SHOULD .
- **1.1 Introduction to Version 1.1.** The Working Group's strategic guidelines for changes between versions 1.0 and 1.1 can be summarized as follows: Support for versioning (acknowledging that this may be slightly disruptive to the XML transfer syntax at the margins) Support for co-occurrence constraints (which will certainly involve additions to the XML transfer syntax, which will not be understood by 1.0 processors) Bug fixes…
- **1.3.1.1 The Schema Namespace ( xs ).** Users of the namespaces defined here should be aware, as a matter of namespace policy, that more names in this namespace may be given definitions in future versions of this or other specifications.
- **1.3.2 Namespaces with Special Status.** Except as otherwise specified elsewhere in this specification, if components are · present · in a schema, or source declarations are included in an XSD schema document, for components in any of the following namespaces, then the components, or the declarations, should agree with the descriptions given in the relevant specifications and with the declarations given in any applicable XSD schema…
- **1.3.2 Namespaces with Special Status.** Users who have an interest in such specialized processing should be aware of the attending interoperability problems and should exercise caution.
- **1.3.2 Namespaces with Special Status.** Components and source declarations must not specify http://www.w3.org/2000/xmlns/ as their target namespace.
- **1.4 Dependencies on Other Specifications.** If both are supported, the choice of which datatypes to use in a particular assessment episode should be under user control.
- **1.4 Dependencies on Other Specifications.** It should be noted however that the XML version number is not required to be present in the input to an assessment episode, and in any case the heuristic should be subject to override by users, to support cases where users wish to accept XML 1.1 input but validate it using the 1.0 datatypes, or accept XML 1.0 input and validate it using the 1.1 datatypes.

## XML Schema Part 1: Structures Second Edition

Source: https://www.w3.org/TR/xmlschema-1/

XML Schema: Structures specifies the XML Schema definition language, which offers facilities for describing the structure and constraining the contents of XML 1.0 documents, including those which exploit the XML Namespace facility. The schema language, which is itself represented in XML 1.0 and uses namespaces, substantially reconstructs and considerably extends the capabilities found in XML 1.0 document type definitions (DTDs). This specification depends on XML Schema Part 2: Datatypes .

- **G DTD for Schemas (non-normative).** ref iff not top level --> <!-- better reference mechanisms --> <!ELEMENT %unique; ((%annotation;)?, %selector;, (%field;)+)> <!ATTLIST %unique; name %NCName; #REQUIRED id ID #IMPLIED %uniqueAttrs;> <!ELEMENT %key; ((%annotation;)?, %selector;, (%field;)+)> <!ATTLIST %key; name %NCName; #REQUIRED id ID #IMPLIED %keyAttrs;> <!ELEMENT %keyref; ((%annotation;)?, %selector;, (%field;)+)> <!ATTLIST…
- **G DTD for Schemas (non-normative).** <!ATTLIST %redefine; schemaLocation %URIref; #REQUIRED id ID #IMPLIED %redefineAttrs;> <!ELEMENT %notation; (%annotation;)?> <!ATTLIST %notation; name %NCName; #REQUIRED id ID #IMPLIED public CDATA #REQUIRED system %URIref; #IMPLIED %notationAttrs;> <!-- Annotation is either application information or documentation --> <!-- By having these here they are available for datatypes as well as all the…
- **1.3 Documentation Conventions and Terminology.** Following [XML 1.0 (Second Edition)] , within normative prose in this specification, the words may and must are defined as follows: may Conforming documents and XML Schema-aware processors are permitted to but need not behave as described.
- **1.3 Documentation Conventions and Terminology.** must Conforming documents and XML Schema-aware processors are required to behave as described; otherwise they are in error.
- **2.2 XML Schema Abstract Data Model.** In defining XML Schemas in terms of an abstract data model, this specification rigorously specifies the information which must be available to a conforming XML Schema processor.
- **2.2 XML Schema Abstract Data Model.** The primary components, which may (type definitions) or must (element and attribute declarations) have names are as follows: Simple type definitions Complex type definitions Attribute declarations Element declarations The secondary components, which must have names, are as follows: Attribute group definitions Identity-constraint definitions Model group definitions Notation declarations Finally,…
- **2.2.2.2 Element Substitution Group.** In XML 1.0, the name and content of an element must correspond exactly to the element type referenced in the corresponding content model.
- **2.2.2.2 Element Substitution Group.** All such members must have type definitions which are either the same as the head's type definition or restrictions or extensions of it.

## W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes

Source: https://www.w3.org/TR/xmlschema11-2/

XML Schema: Datatypes is part 2 of the specification of the XML Schema language. It defines facilities for defining datatypes to be used in XML Schemas as well as other XML specifications. The datatype language, which is itself represented in XML, provides a superset of the capabilities found in XML document type definitions (DTDs) for specifying datatypes on elements and attributes.

- **3.4.3 language.** Note: [BCP 47] specifies that language codes "are to be treated as case insensitive; there exist conventions for capitalization of some of the subtags, but these MUST NOT be taken to carry meaning." Since the language datatype is derived from string , it inherits from string a one-to-one mapping from lexical representations to values.
- **B DTD for Datatype Definitions (non-normative).** <!ENTITY % unordered "%pattern; | %enumeration; | %whiteSpace; | %length; | %maxLength; | %minLength; | %assertion; | %explicitTimezone;"> <!ENTITY % implementation-defined-facets ""> <!ENTITY % facet "%ordered; | %unordered; %implementation-defined-facets;"> <!ENTITY % facetAttr "value CDATA #REQUIRED id ID #IMPLIED"> <!ENTITY % fixedAttr "fixed %boolean; #IMPLIED"> <!ENTITY % facetModel…
- **C.1 Illustrative XML representations for the built-in primitive type definitions.** The (not a) schema document for primitive built-in type definitions <?xml version='1.0'?> <!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [ <!-- keep this schema XML1.0 DTD valid --> <!ENTITY % schemaAttrs 'xmlns:hfp CDATA #IMPLIED'> <!ELEMENT hfp:hasFacet EMPTY> <!ATTLIST hfp:hasFacet name NMTOKEN #REQUIRED> <!ELEMENT hfp:hasProperty EMPTY> <!ATTLIST hfp:hasProperty name NMTOKEN…
- **C.2 Illustrative XML representations for the built-in ordinary type definitions.** Illustrative schema document for derived built-in type definitions <?xml version='1.0'?> <!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [ <!-- keep this schema XML1.0 DTD valid --> <!ENTITY % schemaAttrs 'xmlns:hfp CDATA #IMPLIED'> <!ELEMENT hfp:hasFacet EMPTY> <!ATTLIST hfp:hasFacet name NMTOKEN #REQUIRED> <!ELEMENT hfp:hasProperty EMPTY> <!ATTLIST hfp:hasProperty name NMTOKEN #REQUIRED…
- **1.1 Introduction to Version 1.1.** These goals are slightly in tension with one another -- the following summarizes the Working Group's strategic guidelines for changes between versions 1.0 and 1.1: Add support for versioning (acknowledging that this may be slightly disruptive to the XML transfer syntax at the margins) Allow bug fixes (unless in specific cases we decide that the fix is too disruptive for a point release) Allow…
- **1.3 Dependencies on Other Specifications.** If both are supported, the choice of which datatypes to use in a particular assessment episode should be under user control.
- **1.3 Dependencies on Other Specifications.** Note: When this specification is used to check the datatype validity of XML input, implementations may provide the heuristic of using the 1.1 datatypes if the input is labeled as XML 1.1, and using the 1.0 datatypes if the input is labeled 1.0, but this heuristic should be subject to override by users, to support cases where users wish to accept XML 1.1 input but validate it using the 1.0…
- **1.4 Requirements.** The [XML Schema Requirements] document spells out concrete requirements to be fulfilled by this specification, which state that the XML Schema Language must: provide for primitive data typing, including byte, date, integer, sequence, SQL and Java primitive datatypes, etc.; define a type system that is adequate for import/export from database systems (e.g., relational, object, OLAP); distinguish…

## XML Schema Part 2: Datatypes Second Edition

Source: https://www.w3.org/TR/xmlschema-2/

XML Schema: Datatypes is part 2 of the specification of the XML Schema language. It defines facilities for defining datatypes to be used in XML Schemas as well as other XML specifications. The datatype language, which is itself represented in XML 1.0, provides a superset of the capabilities found in XML 1.0 document type definitions (DTDs) for specifying datatypes on elements and attributes.

- **A Schema for Datatype Definitions (normative).** <!DOCTYPE xs:schema PUBLIC "-//W3C//DTD XMLSCHEMA 200102//EN" "XMLSchema.dtd" [ <!-- keep this schema XML1.0 DTD valid --> <!ENTITY % schemaAttrs 'xmlns:hfp CDATA #IMPLIED'> <!ELEMENT hfp:hasFacet EMPTY> <!ATTLIST hfp:hasFacet name NMTOKEN #REQUIRED> <!ELEMENT hfp:hasProperty EMPTY> <!ATTLIST hfp:hasProperty name NMTOKEN #REQUIRED value CDATA #REQUIRED> <!-- Make sure that processors that do not…
- **1.2 Requirements.** The [XML Schema Requirements] document spells out concrete requirements to be fulfilled by this specification, which state that the XML Schema Language must: provide for primitive data typing, including byte, date, integer, sequence, SQL and Java primitive datatypes, etc.; define a type system that is adequate for import/export from database systems (e.g., relational, object, OLAP); distinguish…
- **1.4 Terminology.** [Definition:] match (Of strings or names:) Two strings or names being compared must be identical.
- **1.4 Terminology.** [Definition:] must Conforming documents and processors are required to behave as described; otherwise they are in · error · .
- **1.5 Constraints and Contributions.** conditions components · must · satisfy to be components at all.
- **1.5 Constraints and Contributions.** [Definition:] Validation Rule Constraints expressed by schema components which information items · must · satisfy to be schema-valid.
- **2.5.2 Primitive vs. derived datatypes.** As described in more detail in XML Representation of Simple Type Definition Schema Components (§4.1.2) , each · user-derived · datatype · must · be defined in terms of another datatype in one of three ways: 1) by assigning · constraining facet · s which serve to restrict the · value space · of the · user-derived · datatype to a subset of that of the · base type · ; 2) by creating a · list ·…
- **3.2.1 string.** In such situations, a complex type that allows mixed content should be considered.
