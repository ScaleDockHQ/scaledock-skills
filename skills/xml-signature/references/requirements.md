# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XML Signature Syntax and Processing Version 1.1

Source: https://www.w3.org/TR/xmldsig-core1/

This document specifies XML digital signature processing rules and syntax. XML Signatures provide integrity , message authentication , and/or signer authentication services for data of any type, whether located within the XML that includes the signature or elsewhere.

- **1.1 Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this specification are to be interpreted as described in [ RFC2119 ].
- **1.1 Conformance.** "They MUST only be used where it is actually required for interoperation or to limit behavior which has potential for causing harm (e.g., limiting retransmissions)" Consequently, we use these capitalized key words to unambiguously specify requirements over protocol and application features and behavior that affect the interoperability and security of implementations.
- **1.1 Conformance.** For instance, an XML attribute might be described as being "optional." Compliance with the Namespaces in XML specification [ XML-NAMES ] is described as " REQUIRED ." This document specifies optional and mandatory to support algorithms, providing references for these algorithms.
- **1.3 Versions, Namespaces and Identifiers.** Implementations of this specification MUST use the following XML namespace URIs: URI namespace prefix XML internal entity http://www.w3.org/2000/09/xmldsig# default namespace , ds: , dsig: <!ENTITY dsig "http://www.w3.org/2000/09/xmldsig#"> http://www.w3.org/2009/xmldsig11# dsig11: <!ENTITY dsig11 "http://www.w3.org/2009/xmldsig11#"> While implementations MUST support XML and XML namespaces, and…
- **1.3 Versions, Namespaces and Identifiers.** Implementations of this specification MUST be fully interoperable with the algorithms specified in [ RFC6931 ], but MAY compute the requisite values through any technique that leads to the same output.
- **2.1 Simple Example ( Signature ,.** To promote application interoperability we specify a set of signature algorithms that MUST be implemented, though their use is at the discretion of the signature creator.
- **2.2 Extended Example ( Object and SignatureProperty ).** References to an XML data element within an Object element SHOULD identify the actual element pointed to.
- **2.2 Extended Example ( Object and SignatureProperty ).** content is not XML (perhaps it is binary or encoded data) the reference should identify the Object and the Reference Type , if given, SHOULD indicate Object .

## XML Signature Syntax and Processing (Second Edition)

Source: https://www.w3.org/TR/xmldsig-core/

This document specifies XML digital signature processing rules and syntax. XML Signatures provide integrity , message authentication , and/or signer authentication services for data of any type, whether located within the XML that includes the signature or elsewhere.

- **1.1 Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this specification are to be interpreted as described in [ RFC2119 ].
- **1.1 Conformance.** "They MUST only be used where it is actually required for interoperation or to limit behavior which has potential for causing harm (e.g., limiting retransmissions)" Consequently, we use these capitalized key words to unambiguously specify requirements over protocol and application features and behavior that affect the interoperability and security of implementations.
- **1.1 Conformance.** For instance, an XML attribute might be described as being "optional." Compliance with the Namespaces in XML specification [ XML-NAMES ] is described as " REQUIRED ." This document specifies optional and mandatory to support algorithms, providing references for these algorithms.
- **1.3 Versions, Namespaces and Identifiers.** Implementations of this specification MUST use the following XML namespace URIs: URI namespace prefix XML internal entity http://www.w3.org/2000/09/xmldsig# default namespace , ds: , dsig: <!ENTITY dsig "http://www.w3.org/2000/09/xmldsig#"> http://www.w3.org/2009/xmldsig11# dsig11: <!ENTITY dsig11 "http://www.w3.org/2009/xmldsig11#"> While implementations MUST support XML and XML namespaces, and…
- **1.3 Versions, Namespaces and Identifiers.** Implementations of this specification MUST be fully interoperable with the algorithms specified in [ RFC6931 ], but MAY compute the requisite values through any technique that leads to the same output.
- **2.1 Simple Example ( Signature ,.** To promote application interoperability we specify a set of signature algorithms that MUST be implemented, though their use is at the discretion of the signature creator.
- **2.2 Extended Example ( Object and SignatureProperty ).** References to an XML data element within an Object element SHOULD identify the actual element pointed to.
- **2.2 Extended Example ( Object and SignatureProperty ).** content is not XML (perhaps it is binary or encoded data) the reference should identify the Object and the Reference Type , if given, SHOULD indicate Object .

## Canonical XML Version 1.1

Source: https://www.w3.org/TR/xml-c14n11/

Canonical XML Version 1.1 is a revision to Canonical XML Version 1.0 to address issues related to inheritance of attributes in the XML namespace when canonicalizing document subsets, including the requirement not to inherit xml:id , and to treat xml:base URI path processing properly. Any XML document is part of a set of XML documents that are logically equivalent within an application context, but which vary in physical representation based on syntactic changes permitted by XML 1.0 [XML] and Namespaces in XML 1.0 [Names] . This specification describes a method for generating a physical representation, the canonical form, of an XML document that accounts for the permissible changes. Except fo

- **1.1 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [Keywords] .
- **1.3 Limitations Two XML documents may have differing information content that.** The processing SHOULD create a new document in which relative URIs have been converted to absolute URIs, thereby mitigating any security risk for the new document.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations SHOULD but need not be based on an XPath implementation.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** XML canonicalization is defined in terms of the XPath definition of a node-set, and implementations MUST produce equivalent results.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations MUST support the octet stream input and SHOULD also support the document subset feature via node-set input.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations are REQUIRED to be capable of producing canonical XML excluding all comments that may have appeared in the input document or document subset.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** The XML processor performs the following tasks in order: normalize line feeds normalize attribute values replace CDATA sections with their character content resolve character and parsed entity references The input octet stream MUST contain a well-formed XML document, but the input need not be validated.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** However, the attribute value normalization and entity reference resolution MUST be performed in accordance with the behaviors of a validating XML processor.

## Canonical XML Version 1.0

Source: https://www.w3.org/TR/xml-c14n/

Canonical XML Version 1.1 is a revision to Canonical XML Version 1.0 to address issues related to inheritance of attributes in the XML namespace when canonicalizing document subsets, including the requirement not to inherit xml:id , and to treat xml:base URI path processing properly. Any XML document is part of a set of XML documents that are logically equivalent within an application context, but which vary in physical representation based on syntactic changes permitted by XML 1.0 [XML] and Namespaces in XML 1.0 [Names] . This specification describes a method for generating a physical representation, the canonical form, of an XML document that accounts for the permissible changes. Except fo

- **1.1 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [Keywords] .
- **1.3 Limitations Two XML documents may have differing information content that.** The processing SHOULD create a new document in which relative URIs have been converted to absolute URIs, thereby mitigating any security risk for the new document.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations SHOULD but need not be based on an XPath implementation.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** XML canonicalization is defined in terms of the XPath definition of a node-set, and implementations MUST produce equivalent results.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations MUST support the octet stream input and SHOULD also support the document subset feature via node-set input.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** Implementations are REQUIRED to be capable of producing canonical XML excluding all comments that may have appeared in the input document or document subset.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** The XML processor performs the following tasks in order: normalize line feeds normalize attribute values replace CDATA sections with their character content resolve character and parsed entity references The input octet stream MUST contain a well-formed XML document, but the input need not be validated.
- **2.1 Data Model The data model defined in the XPath 1.0 Recommendation [XPath] is used to represent the input XML document.** However, the attribute value normalization and entity reference resolution MUST be performed in accordance with the behaviors of a validating XML processor.

## Exclusive XML Canonicalization Version 1.0

Source: https://www.w3.org/TR/xml-exc-c14n/

Canonical XML [ XML-C14N ] specifies a standard serialization of XML that, when applied to a subdocument, includes the subdocument's ancestor context including all of the namespace declarations and attributes in the "xml:" namespace. However, some applications require a method which, to the extent practical, excludes ancestor context from a canonicalized subdocument. For example, one might require a digital signature over an XML payload (subdocument) in an XML message that will not break when that subdocument is removed from its original message and/or inserted into a different context. This requirement is satisfied by Exclusive XML Canonicalization.

- **1.1 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [Keywords] .
- **1.1 Terminology.** Within this specification and [ XML-C14N ], a node-set is used to directly indicate whether or not each node should be rendered in the canonical form (in this sense, it is used as a formal mathematical set).
- **1.3 Limitations.** To avoid problems due to the non-importation of such attributes into an enveloped document subset, either they must be explicitly given in the apex nodes of the XML document subset being canonicalized or they must always be declared with an equivalent value in every context in which the XML document subset will be interpreted.
- **1.3 Limitations.** To avoid problems with such namespace declarations, the XML must be modified so that use of the namespace prefix involved is visible, or the namespace declarations must appear and be bound to the same values in every context in which the XML will be interpreted, or the prefixes for such namespaces must appear in the InclusiveNamespaces PrefixList .
- **4. Use in XML Security.** For example: <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"> <ec:InclusiveNamespaces PrefixList="dsig soap #default" xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/> </ds:Transform> indicates the exclusive canonicalization transform, but that namespaces with prefix "dsig" or "soap" and default namespaces should be processed according to [ XML-C14N ].
- **4. Use in XML Security.** Schema Definition : <?xml version="1.0" encoding="utf-8"?> <!DOCTYPE schema PUBLIC "-//W3C//DTD XMLSchema 200102//EN" "http://www.w3.org/2001/XMLSchema.dtd" [ <!ATTLIST schema xmlns:ec CDATA #FIXED 'http://www.w3.org/2001/10/xml-exc-c14n#'> <!ENTITY ec 'http://www.w3.org/2001/10/xml-exc-c14n#'> <!ENTITY % p ''> <!ENTITY % s ''> ]> <schema xmlns="http://www.w3.org/2001/XMLSchema"…
- **5. Security.** In addition to this section, the Limitations of this specification, the Resolutions of [ XML-C14N ], and the Security Considerations of [ XML-DSig ] should be carefully attended to.
- **5.1 Target.** For example, if the <Foo/> element is signed in its source instance of <Bar/><Foo/></Bar> and then removed and placed in the target instance <Baz xmlns="http://example.org/bar"/><Foo/></Baz> , the signature should still be valid, but won't be if <Foo/> is interprated as belonging to the http://example.org/bar namespace: this is dependent on how nodes are processed.
