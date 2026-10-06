# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XSLT 4.0

Source: https://qt4cg.org/specifications/xslt-40/Overview.html

This specification defines the syntax and semantics of XSLT 4.0, a language designed primarily for transforming XML documents into other XML documents, but also offering support for other data formats including JSON, HTML, and CSV. XSLT 4.0 is a revised version of the XSLT 3.0 Recommendation [XSLT 3.0] published on 8 June 2017. Changes are presented in 1.2 What’s New in XSLT 4.0? . XSLT 4.0 is designed to be used in conjunction with XPath 4.0, which is defined in [XPath 4.0] . XSLT shares the same data model as XPath 4.0, which is defined in [XDM 4.0] , and it uses the library of functions and operators defined in [Functions and Operators 4.0] . XPath 4.0 and the underlying function library

- **H.2 Relax-NG Schema for XSLT Stylesheets.** IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE # FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL # DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR # SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER # CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, # OR TORT (INCLUDING…
- **2.1 Conformance Terms.** ] In this specification the phrases must , must not , should , should not , may , required , and recommended , when used in normative text and rendered in small capitals, are to be interpreted as described in [RFC2119] .
- **2.1 Conformance Terms.** Where the phrase must , must not , or required relates to the behavior of the XSLT processor, then an implementation is not conformant unless it behaves as specified, subject to the more detailed rules in 27 Conformance .
- **2.1 Conformance Terms.** Where the phrase must , must not , or required relates to a stylesheet then the processor must enforce this constraint on stylesheets by raising an error if the constraint is not satisfied.
- **2.1 Conformance Terms.** Where the phrase should , should not , or recommended relates to a stylesheet then a processor may produce warning messages if the constraint is not satisfied, but must not treat this as an error.
- **2.1 Conformance Terms.** [Definition: In this specification, the term implementation-defined refers to a feature where the implementation is allowed some flexibility, and where the choices made by the implementation must be described in documentation that accompanies any conformance claim.
- **2.2 General Terminology.** has an arity range , which defines the minimum and maximum number of arguments that must be supplied in a call to the function.
- **2.3 Notation.** prefix ; prefixes An xs:NCName representing a namespace prefix, which must

## XSL Transformations (XSLT) Version 3.0

Source: https://www.w3.org/TR/xslt-30/

This specification defines the syntax and semantics of XSLT 3.0 , a language designed primarily for transforming XML documents into other XML documents. XSLT 3.0 is a revised version of the XSLT 2.0 Recommendation [XSLT 2.0] published on 23 January 2007. The primary purpose of the changes in this version of the language is to enable transformations to be performed in streaming mode, where neither the source document nor the result document is ever held in memory in its entirety. Another important aim is to improve the modularity of large stylesheets, allowing stylesheets to be developed from

- **H.2 Relax-NG Schema for XSLT Stylesheets.** IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES # (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, # STRICT LIABILITY, OR TORT (INCLUDING…
- **W3C Recommendation 8 June 2017.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **1.2 What’s New in XSLT 3.0?.** Capabilities provided in this category include: A new xsl:source-document instruction, which reads and processes a source document, optionally in streaming mode; The ability to declare that a mode is a streaming mode, in which case all the template rules using that mode must be streamable; A new xsl:iterate instruction, which iterates over the items in a sequence, allowing parameters for the…
- **2.1 Terminology.** The processor may , and in some cases must , use streaming techniques to limit the amount of memory used to hold source and result documents.
- **2.1 Terminology.** In this specification the phrases must , must not , should , should not , may , required , and recommended , when used in normative text and rendered in capitals, are to be interpreted as described in [RFC2119] .
- **2.1 Terminology.** Where the phrase must , must not , or required relates to the behavior of the XSLT processor, then an implementation is not conformant unless it behaves as specified, subject to the more detailed rules in 27 Conformance .
- **2.1 Terminology.** Where the phrase must , must not , or required relates to a stylesheet then the processor must enforce this constraint on stylesheets by reporting an error if the constraint is not satisfied.
- **2.1 Terminology.** Where the phrase should , should not , or recommended relates to a stylesheet then a processor may produce warning messages if the constraint is not satisfied, but must not treat this as an error.

## XSL Transformations (XSLT) Version 2.0 (Second Edition)

Source: https://www.w3.org/TR/xslt20/

This specification defines the syntax and semantics of XSLT 2.0, a language for transforming XML documents into other XML documents. XSLT 2.0 is a revised version of the XSLT 1.0 Recommendation [XSLT 1.0] published on 16 November 1999. XSLT 2.0 is designed to be used in conjunction with XPath 2.0, which is defined in [XPath 2.0] . XSLT shares the same data model as XPath 2.0, which is defined in [Data Model] , and it uses the library of functions and operators defined in [Functions and Operators] . XSLT 2.0 also includes optional facilities to serialize the results of a transformation, by means of an interface to the serialization component described in [XSLT and XQuery Serialization] . This

- **1.2 What's New in XSLT 2.0?.** XSLT 2.0 has been developed in parallel with XPath 2.0 (see [XPath 2.0] ), so the changes to XPath must be considered alongside the changes to XSLT.
- **2.1 Terminology.** In this specification the phrases must , must not , should , should not , may , required , and recommended are to be interpreted as described in [RFC2119] .
- **2.1 Terminology.** Where the phrase must , must not , or required relates to the behavior of the XSLT processor, then an implementation is not conformant unless it behaves as specified, subject to the more detailed rules in 21 Conformance .
- **2.1 Terminology.** Where the phrase must , must not , or required relates to a stylesheet, then the processor must enforce this constraint on stylesheets by reporting an error if the constraint is not satisfied.
- **2.1 Terminology.** Where the phrase should , should not , or recommended relates to a stylesheet, then a processor may produce warning messages if the constraint is not satisfied, but must not treat this as an error.
- **2.1 Terminology.** [Definition: In this specification, the term implementation-defined refers to a feature where the implementation is allowed some flexibility, and where the choices made by the implementation must be described in
- **2.2 Notation.** It takes a mandatory select attribute, whose value is an XPath expression , and an optional debug attribute, whose value must be either yes or no ; the curly brackets indicate that the value can be defined as an attribute value
- **2.2 Notation.** The use of this term implies that stylesheet authors should not use the construct, and that the construct may be removed in a later version of this specification.

## XSL Transformations (XSLT) Version 1.0

Source: https://www.w3.org/TR/xslt-10/

This specification defines the syntax and semantics of XSLT, which is a language for transforming XML documents into other XML documents. XSLT is designed for use as part of XSL, which is a stylesheet language for XML. In addition to XSLT, XSL includes an XML vocabulary for specifying formatting. XSL specifies the styling of an XML document by using XSLT to describe how the document is transformed into another XML document that uses the formatting vocabulary. XSLT is also designed to be used independently of XSL. However, XSLT is not intended as a completely general-purpose XML transformation language. Rather it is designed primarily for the kinds of transformations that are needed when XSLT

- **C DTD Fragment for XSLT Stylesheets (Non-Normative).** | xsl:preserve-space | xsl:output | xsl:key | xsl:decimal-format | xsl:attribute-set | xsl:variable | xsl:param | xsl:template | xsl:namespace-alias %non-xsl-top-level;)*) "> <!ENTITY % top-level-atts ' extension-element-prefixes CDATA #IMPLIED exclude-result-prefixes CDATA #IMPLIED id ID #IMPLIED version NMTOKEN #REQUIRED xmlns:xsl CDATA #FIXED "http://www.w3.org/1999/XSL/Transform" %space-att;…
- **C DTD Fragment for XSLT Stylesheets (Non-Normative).** <!ELEMENT xsl:for-each (#PCDATA %instructions; %result-elements; | xsl:sort)* > <!ATTLIST xsl:for-each select %expr; #REQUIRED %space-att; > <!ELEMENT xsl:sort EMPTY> <!ATTLIST xsl:sort select %expr; "." lang %avt; #IMPLIED data-type %avt; "text" order %avt; "ascending" case-order %avt; #IMPLIED > <!ELEMENT xsl:if %template;> <!ATTLIST xsl:if test %expr; #REQUIRED %space-att; > <!ELEMENT…
- **W3C Recommendation 16 November 1999.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **1 Introduction.** When this or any other mechanism yields a sequence of more than one XSLT stylesheet to be applied simultaneously to a XML document, then the effect should be the same as applying a single stylesheet that imports each member of the sequence in order (see [ 2.6.2 Stylesheet Import ] ).
- **1 Introduction.** The MIME media types text/xml and application/xml [RFC2376] should be used for XSLT stylesheets.
- **2.1 XSLT Namespace.** XSLT processors must use the XML namespaces mechanism [XML Names] to recognize elements and attributes from this namespace.
- **2.1 XSLT Namespace.** Vendors must not extend the XSLT namespace with additional elements or attributes.
- **2.1 XSLT Namespace.** Instead, any extension must be in a separate namespace.
