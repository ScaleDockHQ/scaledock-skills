# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XML Path Language (XPath) 3.1

Source: https://www.w3.org/TR/xpath-31/

XPath 3.1 is an expression language that allows the processing of values conforming to the data model defined in [XQuery and XPath Data Model (XDM) 3.1] . The name of the language derives from its most distinctive feature, the path expression, which provides a means of hierarchic addressing of the nodes in an XML tree. As well as modeling the tree structure of XML, the data model also includes atomic values, function items, and sequences. This version of XPath supports JSON as well as XML, adding maps and arrays to the data model and supporting them with new expressions in the language and new functions in [XQuery and XPath Functions and Operators 3.1] . These are the most important new feat

- **4 Conformance.** [ Definition : MUST means that the item is an absolute requirement of the specification.] [ Definition : MUST NOT means that the item is an absolute prohibition of the specification.] [ Definition : MAY means that an item is truly optional.] XPath is intended primarily as a component that can be used by other specifications.
- **4 Conformance.** Specifications that set conformance criteria for their use of XPath MUST NOT change the syntactic or semantic definitions of XPath as given in this specification, except by subsetting and/or compatible extensions.
- **4 Conformance.** If a language is described as an extension of XPath, then every expression that conforms to the XPath grammar MUST behave as described in this specification.
- **G Glossary (Non-Normative).** must MUST means that the item is an absolute requirement of the specification.
- **G Glossary (Non-Normative).** must not MUST NOT means that the item is an absolute prohibition of the specification.
- **I.2.2 Editorial Changes.** Modified 4 Conformance to use the term MUST NOT .
- **W3C Recommendation 21 March 2017.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **1 Introduction.** ")" The productions should be read as follows: A function call consists of an EQName followed by an ArgumentList .

## XML Path Language (XPath) 3.0

Source: https://www.w3.org/TR/xpath-30/

XPath 3.0 is an expression language that allows the processing of values conforming to the data model defined in [XQuery and XPath Data Model (XDM) 3.0] . The data model provides a tree representation of XML documents as well as atomic values such as integers, strings, and booleans, and sequences that may contain both references to nodes in an XML document and atomic values. The result of an XPath expression may be a selection of nodes from the input documents, or an atomic value, or more generally, any sequence allowed by the data model. The name of the language derives from its most distinctive feature, the path expression, which provides a means of

- **J.5.1 Substantive.** conversion rules MUST raise a type error.
- **W3C Recommendation.** 08 April 2014 Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **1.** ")" The productions should be read as follows: A static function call consists of an EQName followed by an ArgumentList .
- **1.** [ Definition : Implementation-defined indicates an aspect that may differ between implementations, but must be specified by the implementor for each particular implementation.] [ Definition : Implementation-dependent indicates an aspect that may differ between implementations, is not specified by this or any W3C specification, and is not required to be specified by the implementor for any…
- **2.1.1 Static.** A default initial value for each component must be specified by the host language.
- **2.1.1 Static.** Implementations must ensure that no two functions have the same expanded QName and the same arity (even if the signatures are consistent).
- **2.1.1 Static.** This character must be a digit (category Nd in the Unicode property database), and it must have the numeric value zero.
- **2.1.1 Static.** In each case the value must be a single character.

## XQuery 4.0

Source: https://qt4cg.org/specifications/xquery-40/xquery-40.html

XML is a versatile markup language, capable of labeling the information content of diverse data sources, including structured and semi-structured documents, relational databases, and object repositories. A query language that uses the structure of XML intelligently can express queries across all these kinds of data, whether physically stored in XML or viewed as XML via middleware. This specification describes a query language called XQuery, which is designed to be broadly applicable across many types of XML data sources. A list of changes made since XQuery 3.1 can be found in J Change Log .

- **6 Conformance.** [Definition: MUST means that the item is an absolute requirement of the specification.
- **6 Conformance.** ] [Definition: MUST NOT means that the item is an absolute prohibition of the specification.
- **6 Conformance.** ] [Definition: SHOULD means that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.
- **6 Conformance.** ] An XQuery processor that claims to conform to this specification MUST include a claim of Minimal Conformance as defined in 6.1 Minimal Conformance .
- **6.1 Minimal Conformance.** An implementation that claims Minimal Conformance to this specification MUST provide all of the following items: An implementation of everything specified in this document except those features specified in 6.2 Optional Features to be optional.
- **6.1 Minimal Conformance.** If an implementation does not provide a given optional feature, it MUST implement any requirements specified in 6.2 Optional Features for implementations that do not provide that feature.
- **6.2.1 Schema Aware Feature.** ] If an XQuery implementation does not provide the Schema Aware Feature, it MUST raise a static error [ err:XQST0009 ] if it encounters a schema import, and it MUST raise a static error [ err:XQST0075 ] if it encounters a validate expression.
- **6.2.1 Schema Aware Feature.** If an implementation provides the Schema Aware Feature, it MUST also provide the 6.2.2 Typed Data Feature .

## XQuery 3.1: An XML Query Language

Source: https://www.w3.org/TR/xquery-31/

XML is a versatile markup language, capable of labeling the information content of diverse data sources including structured and semi-structured documents, relational databases, and object repositories. A query language that uses the structure of XML intelligently can express queries across all these kinds of data, whether physically stored in XML or viewed as XML via middleware. This specification describes a query language called XQuery, which is designed to be broadly applicable across many types of XML data sources. JSON is a lightweight data-interchange format that is widely used to exchange data on the web and to store data in databases. Many applications use JSON

- **5 Conformance.** [ Definition : MUST means that the item is an absolute requirement of the specification.] [ Definition : MUST NOT means that the item is an absolute prohibition of the specification.] [ Definition : MAY means that an item is truly optional.] [ Definition : SHOULD means that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be…
- **5.1 Minimal Conformance.** An implementation that claims Minimal Conformance to this specification MUST provide all of the following items: An implementation of everything specified in this document except those features specified in 5.2 Optional Features to be optional.
- **5.1 Minimal Conformance.** If an implementation does not provide a given optional feature, it MUST implement any requirements specified in 5.2 Optional Features for implementations that do not provide that feature.
- **5.2.1 Schema Aware Feature.** ] If an XQuery implementation does not provide the Schema Aware Feature, it MUST raise a static error [ err:XQST0009 ] if it encounters a schema import, and it MUST raise a static error [ err:XQST0075 ] if it encounters a validate expression.
- **5.2.1 Schema Aware Feature.** If an implementation provides the Schema Aware Feature, it MUST also provide the 5.2.2 Typed Data Feature .
- **5.2.2 Typed Data Feature.** [ Definition : The Typed Data Feature permits an XDM instance to contain element node types other than xs:untyped and attributes node types other than xs:untypedAtomic .] If an XQuery implementation does not provide the Typed Data Feature, it MUST guarantee that: The XDM has the type xs:untyped for every element node and xs:untypedAtomic for every attribute node, including nodes created by the query.
- **5.2.3 Static Typing Feature.** [ Definition : The Static Typing Feature requires implementations to report all type errors during the static analysis phase .] If an implementation provides the Static Typing Feature , then it MUST raise an error during static analysis whenever the inferred static type of an expression is not subsumed by the required type for the context in which it appears.
- **5.2.3 Static Typing Feature.** If an implementation does not provide the Static Typing Feature , then it MUST NOT report type errors during the static analysis phase except in cases where the inferred static type and the required type have an empty intersection (that is, where evaluation of the expression is guaranteed to fail).

## XQuery 3.0: An XML Query Language

Source: https://www.w3.org/TR/xquery-30/

XML is a versatile markup language, capable of labeling the information content of diverse data sources including structured and semi-structured documents, relational databases, and object repositories. A query language that uses the structure of XML intelligently can express queries across all these kinds of data, whether physically stored in XML or viewed as XML via middleware. This specification describes a query language called XQuery, which is designed to be broadly applicable across many types of XML data sources. XQuery 3.0 is an extended version of the XQuery 1.0 Recommendation published on 23 January 2007. A list of changes

- **5 Conformance.** [ Definition : MUST means that the item is an absolute requirement of the specification.] [ Definition : MUST NOT means that the item is an absolute prohibition of the specification.] [ Definition : MAY means that an item is truly optional.] [ Definition : SHOULD means that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be…
- **5.1 Minimal Conformance.** An implementation that claims Minimal Conformance to this specification MUST provide all of the following items: An implementation of everything specified in this document except those features specified in 5.2 Optional Features to be optional.
- **5.1 Minimal Conformance.** If an implementation does not provide a given optional feature, it MUST implement any requirements specified in 5.2 Optional Features for implementations that do not provide that feature.
- **5.2.3 Schema Aware Feature.** ] If an XQuery implementation does not provide the Schema Aware Feature, it MUST raise a static error [ err:XQST0009 ] if it encounters a schema import, and it MUST raise a static error [ err:XQST0075 ] if it encounters a validate expression.
- **5.2.3 Schema Aware Feature.** If an implementation provides the Schema Aware Feature, it MUST also provide the 5.2.4 Typed Data Feature .
- **5.2.4 Typed Data Feature.** [ Definition : The Typed Data Feature permits an XDM instance to contain element node types other than xs:untyped and attributes node types other than xs:untypedAtomic .] If an XQuery implementation does not provide the Typed Data Feature, it MUST guarantee that: The XDM has the type xs:untyped for every element node and xs:untypedAtomic for every attribute node, including nodes created by the query.
- **5.2.5 Static Typing Feature.** [ Definition : The Static Typing Feature requires implementations to report all type errors during the static analysis phase .] If an implementation provide s the Static Typing Feature , then it MUST raise an error during static analysis whenever the inferred static type of an expression is not subsumed by the required type for the context in which it appears.
- **5.2.6.** Module Feature [ Definition : The Module Feature allows a query Prolog to contain a Module Import and allows library modules to be created.] An implementation that does not provide the Module Feature MUST raise a static error [ err:XQST0016 ] if it encounters a module declaration or a module import .

## XPath and XQuery Functions and Operators 3.1

Source: https://www.w3.org/TR/xpath-functions-31/

This document defines constructor functions, operators, and functions on the datatypes defined in [XML Schema Part 2: Datatypes Second Edition] and the datatypes defined in [XQuery and XPath Data Model (XDM) 3.1] . It also defines functions and operators on nodes and node sequences as defined in the [XQuery and XPath Data Model (XDM) 3.1] . These functions and operators are defined for use in [XML Path Language (XPath) 3.1] and [XQuery 3.1: An XML Query Language] and [XSL Transformations (XSLT) Version 3.0] and other related XML standards. The signatures and summaries of functions defined in this document are available at: http://www.w3.org/2005/xpath-functions/ . At the time of writing, XSL

- **W3C Recommendation 21 March 2017.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **1.1 Conformance.** It is · implementation-defined · whether definitions that rely on XML (for example, the set of valid XML characters) should use the definitions in XML 1.0 or XML 1.1.
- **1.2 Namespaces and prefixes.** These functions are not available directly to users, and there is no requirement that implementations should actually provide these functions.
- **1.4 Function signatures and descriptions.** The function name is a QName as defined in [XML Schema Part 2: Datatypes Second Edition] and must adhere to its syntactic conventions.
- **1.4 Function signatures and descriptions.** Promotion to xs:double should be done directly, not via xs:float , to avoid loss of precision.
- **1.4 Function signatures and descriptions.** ", indicating that either a single value or the empty sequence must appear.
- **1.4 Function signatures and descriptions.** In the second signature, the argument must be present but may be the empty sequence, written as () .
- **1.5 Options.** Where a function adopts the · option parameter conventions · , the following rules apply: The value of the relevant argument must be a map.

## XQuery and XPath Data Model 3.1

Source: https://www.w3.org/TR/xpath-datamodel-31/

This document defines the XQuery and XPath Data Model 3.1, which is the data model of [XML Path Language (XPath) 3.1] , [XSL Transformations (XSLT) Version 3.0] , and [XQuery 3.1: An XML Query Language] , and any other specifications that reference it. This document is the result of joint work by the [XSLT Working Group] and the [XML Query Working Group] .

- **W3C Recommendation 21 March 2017.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **2.1 Terminology.** In this specification the words must , must not , should , should not , may and recommended are to be interpreted as described in [RFC 2119] .
- **2.1 Terminology.** [ Definition : Implementation-defined indicates an aspect that may differ between implementations, but must be specified by the implementor for each particular implementation.] [ Definition : Implementation-dependent indicates an aspect that may differ between implementations, is not specified by this or
- **2.2 Notation.** Note that this does not mean a lightweight schema processor cannot be used, it only means that the application must have some mechanism to access the necessary properties.
- **2.3 Node Identity.** No two distinct integers, for example, have the same value ; every instance of the value “5” as an integer is identical to every other instance of the value “5” as an integer.) Note: The concept of node identity should not be confused with the concept of a unique ID, which is a unique name assigned to an element by the author to represent references using ID/IDREF correlation.
- **2.7 Schema Information.** There is a constraint that the total set of components used during expression processing (both statically and dynamically) must constitute a valid schema.
- **2.7 Schema Information.** This specification does not say how this should be achieved.
- **2.7 Schema Information.** It is also a constraint that the schema available to the processor must contain at least the components and properties needed to correctly implement the semantics of the XPath and XQuery language.

## XQueryX 3.1

Source: https://www.w3.org/TR/xqueryx-31/

This document defines an XML Syntax for [XQuery 3.1: An XML Query Language] .

- **5 Conformance.** [Definition: MUST means that the item is an absolute requirement of the specification.] [Definition: SHOULD means that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.] [Definition: MAY means that an item is truly optional.] An XQueryX processor that claims…
- **W3C Recommendation 21 March 2017.** Status Update (6 April 2021): Feedback, comments, error reports on this specification should be sent via GitHub https://github.com/w3c/qtspecs/issues or email to public-qt-comments@w3.org .
- **4 An XML Schema for the XQuery XML Syntax.** Here is the XML Schema against which XQueryX documents must be valid.
- **B Transforming XQueryX to XQuery.** </xsl:call-template> </xsl:with-param> <xsl:with-param name="toBeReplaced" select="''"/> <xsl:with-param name="replacement">&amp;#x85;</xsl:with-param> </xsl:call-template> </xsl:with-param> <xsl:with-param name="toBeReplaced" select="' '"/> <xsl:with-param name="replacement">&amp;#xD;</xsl:with-param> </xsl:call-template> </xsl:with-param> <xsl:with-param name="toBeReplaced" select="' '"/>…
- **B Transforming XQueryX to XQuery.** xqx:functionName = 'item' or xqx:functionName = 'if' or xqx:functionName = 'switch' or xqx:functionName = 'typeswitch' or xqx:functionName = 'empty-sequence') and ((not(xqx:functionName/@xqx:prefix) and not(xqx:functionName/@xqx:URI)) or xqx:functionName/@xqx:prefix = '' or xqx:functionName/@xqx:URI = '')"> <xsl:variable name="message"><xsl:text>Incorrect XQueryX: function calls must not use…
- **B Transforming XQueryX to XQuery.** <xsl:value-of select="$RPAREN"/> </xsl:otherwise> </xsl:choose> </xsl:template> <!-- 2014-07-11/JM For new ArrayTest --> <xsl:template match="xqx:anyArrayTest"> <xsl:text> array(*)</xsl:text> </xsl:template> <!-- 2014-07-11/JM For new ArrayTest --> <xsl:template match="xqx:typedArrayTest"> <xsl:text> array(</xsl:text> <xsl:apply-templates select="xqx:sequenceType"/> <xsl:text>) </xsl:text>…
- **C.2.2 Security Considerations.** Therefore, the security issues of [RFC 3987] Section 8 should be considered.
- **C.2.2 Security Considerations.** The fn:transform() function should be sandboxed or disabled if untrusted queries are run.

## XQuery and XPath Full Text 3.0

Source: https://www.w3.org/TR/xpath-full-text-30/

This document defines the syntax and formal semantics of XQuery and XPath Full Text 3.0, which is a language that extends XQuery 3.0 [XQuery 3.0: An XML Query Language] and XPath 3.0 [XML Path Language (XPath) 3.0] with full-text search capabilities.

- **1.1.** Tokenization, including the definition of the term "tokens", SHOULD be implementation-defined .
- **1.1.** Implementations SHOULD expose the rules and sample results of tokenization as much as possible to enable users to predict and interpret the results of tokenization.
- **2.2.1 Description.** An XQuery and XPath Full Text 3.0 processor SHOULD try to use the information available in xml:lang for processing of collations, as well as the various match options defined in Section 3.4 Match Options .
- **2.3.1 Using Weights Within a Scored.** However, scoring algorithms MUST conform to the constraint that when no explicit weight is specified, the default weight is 1.0.
- **3.1.1 Weights.** The weight MUST have an absolute value between 0.0 and 1000.0 inclusive.
- **3.4.1.** An implementation MUST treat language identifiers that [BCP 47] defines as equivalent as identifying the same language.
- **3.4.3.** The set of relationships supported by an implementation is implementation-defined , but implementations SHOULD support the relationships defined in [ISO 2788] .
- **4.1.** Each token is assigned a starting and ending position.] Tokenization, including the definition of the term "token", SHOULD be implementation-defined .
