# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SPARQL 1.1 Query Language

Source: https://www.w3.org/TR/sparql11-query/

RDF is a directed, labeled graph data format for representing information in the Web. This specification defines the syntax and semantics of the SPARQL query language for RDF. SPARQL can be used to express queries across diverse data sources, whether the data is stored natively as RDF or viewed as RDF via middleware. SPARQL contains capabilities for querying required and optional graph patterns along with their conjunctions and disjunctions. SPARQL also supports aggregation, subqueries, negation, creating values by expressions, extensible value testing, and constraining queries by source RDF graph. The results of SPARQL queries can be result sets or RDF graphs.

- **2.2 Multiple Matches.** This is a basic graph pattern match ; all the variables used in the query pattern must be bound in every solution.
- **2.4 Blank Node Labels in Query Results.** An application writer should not expect blank node labels in a query to refer to a particular blank node in the data.
- **5 Graph Patterns.** More complex graph patterns can be formed by combining smaller patterns in various ways: Basic Graph Patterns , where a set of triple patterns must match Group Graph Pattern , where a set of graph patterns must all match Optional Graph patterns , where additional patterns may extend the solution Alternative Graph Pattern , where two or more possible patterns are tried Patterns on Named Graphs ,…
- **6 Including Optional Values.** Basic graph patterns allow applications to make queries where the entire query pattern must match for there to be a solution.
- **6.1 Optional Pattern Matching.** The entire optional graph pattern must match for the optional graph pattern to affect the query solution.
- **10.1 BIND: Assigning to Variables.** The variable introduced by the BIND clause must not have been used in the group graph pattern up to the point of use in BIND .
- **11.1 Aggregate Example.** It should be noted that as per functions , aggregate expressions are required to be aliased (again, similar to the BIND clause, using the keyword AS ) in order to project them from queries or subqueries.
- **13.2 Specifying RDF Datasets.** The FROM and FROM NAMED keywords allow a query to specify an RDF dataset by reference; they indicate that the dataset should include graphs that are obtained from representations of the resources identified by the given IRIs (i.e.

## SPARQL Query Language for RDF

Source: https://www.w3.org/TR/rdf-sparql-query/

RDF is a directed, labeled graph data format for representing information in the Web. This specification defines the syntax and semantics of the SPARQL query language for RDF. SPARQL can be used to express queries across diverse data sources, whether the data is stored natively as RDF or viewed as RDF via middleware. SPARQL contains capabilities for querying required and optional graph patterns along with their conjunctions and disjunctions. SPARQL also supports extensible value testing and constraining queries by source RDF graph. The results of SPARQL queries can be results sets or RDF graphs.

- **2.2 Multiple Matches.** This is a basic graph pattern match ; all the variables used in the query pattern must be bound in every solution.
- **2.4 Blank Node Labels in Query Results.** An application writer should not expect blank node labels in a query to refer to a particular blank node in the data.
- **5 Graph Patterns.** More complex graph patterns can be formed by combining smaller patterns in various ways: Basic Graph Patterns , where a set of triple patterns must match Group Graph Pattern , where a set of graph patterns must all match Optional Graph patterns , where additional patterns may extend the solution Alternative Graph Pattern , where two or more possible patterns are tried Patterns on Named Graphs ,…
- **6 Including Optional Values.** Basic graph patterns allow applications to make queries where the entire query pattern must match for there to be a solution.
- **6.1 Optional Pattern Matching.** The entire optional graph pattern must match for the optional graph pattern to affect the query solution.
- **8.2 Specifying RDF Datasets.** The FROM and FROM NAMED keywords allow a query to specify an RDF dataset by reference; they indicate that the dataset should include graphs that are obtained from representations of the resources identified by the given IRIs (i.e.
- **11.4.4 isLiteral.** This could be used to look for erroneous data ( foaf:mbox should only have an IRI as its object).
- **12 Definition of SPARQL.** It does not imply a SPARQL implementation must use the process defined here.

## SPARQL 1.1 Protocol

Source: https://www.w3.org/TR/sparql11-protocol/

The SPARQL Protocol and RDF Query Language ( SPARQL ) is a query language and protocol for RDF . This document specifies the SPARQL Protocol; it describes a means for conveying SPARQL queries and updates to a SPARQL processing service and returning the results via HTTP to the entity that requested them. This protocol was developed by the W3C SPARQL Working Group , part of the Semantic Web Activity as described in the activity statement .

- **2.1 query operation.** The query operation MUST be invoked with either the HTTP GET or HTTP POST method.
- **2.1.1 query via GET.** The HTTP request MUST NOT include a message body.
- **1.1 Document Conventions.** When this document uses the words must , must not , should , should not , may and recommended , and the words appear as emphasized text, they must be interpreted as described in RFC 2119 [ RFC2119 ].
- **2 SPARQL Protocol Operations.** All HTTP requirements for requests and responses must be followed.
- **2.1 query operation.** Client requests for this operation must include exactly one SPARQL query string (parameter name: query ) and may include zero or more default graph URIs (parameter name: default-graph-uri ) and named graph URIs (parameter name: named-graph-uri ).
- **2.1 query operation.** query (exactly 1) default-graph-uri (0 or more) named-graph-uri (0 or more) query via POST directly POST default-graph-uri (0 or more) named-graph-uri (0 or more) application/sparql-query Unencoded SPARQL query string The query request's parameters must be sent according to one of these three options:
- **2.1.1 query via GET.** When using the GET method, clients must URL percent encode all parameters and include them as query parameter strings with the names given above [ RFC3986 ].
- **2.1.1 query via GET.** HTTP query string parameters must be separated with the ampersand ( & ) character.

## SPARQL Protocol for RDF

Source: https://www.w3.org/TR/rdf-sparql-protocol/

Please refer to the errata for this document, which may include some normative corrections.

- **Resolving an Ambiguous RDF Dataset.** In the case where both the query and the protocol specify an RDF dataset, but not the identical RDF dataset, the dataset specified in the protocol must be the RDF dataset consumed by SparqlQuery 's query operation.
- **Determining the Base IRI.** Finally, per section 5.1.4, SPARQL Protocol services must define their own base URI, which may be the service invocation URI.
- **2.1.4 query Fault Messages.** The query operation employs the Fault Replaces Message rule: Any message after the first in the pattern may be replaced with a fault message, which must have identical direction.
- **2.1.4 query Fault Messages.** The fault message must be delivered to the same target node as the message it replaces, unless otherwise specified by an extension or binding extension.
- **2.1.4 query Fault Messages.** If there is no path to this node, the fault must be discarded.
- **MalformedQuery.** When the value of the query type is not a legal sequence of characters in the language defined by the SPARQL grammar, the MalformedQuery or QueryRequestRefused fault message must be returned.
- **MalformedQuery.** According to the Fault Replaces Message Rule , if a WSDL fault is returned, including MalformedQuery , an Out Message must not be returned.
- **MalformedQuery.** When the MalformedQuery fault message is returned, query processing services must include explanatory, debugging, or other additional information for human consumption via the fault-details type defined in Excerpt 1.3.

## SPARQL 1.1 Update

Source: https://www.w3.org/TR/sparql11-update/

This document describes SPARQL 1.1 Update, an update language for RDF graphs. It uses a syntax derived from the SPARQL Query Language for RDF. Update operations are performed on a collection of graphs in a Graph Store. Operations are provided to update, create, and remove RDF graphs in a Graph Store.

- **1.1.2 Terminology.** When this document uses the words MUST , MUST NOT , SHOULD , SHOULD NOT , MAY and recommended , and the words appear as emphasized text, they must be interpreted as described in RFC 2119 [RFC2119].
- **2.2 SPARQL 1.1 Update Services.** Each request SHOULD be treated atomically by a SPARQL 1.1 Update service.
- **3 SPARQL 1.1 Update Language.** Implementations MUST ensure that the operations of a single request are executed in a fashion that guarantees the same effects as executing them sequentially in the order they appear in the request.
- **3 SPARQL 1.1 Update Language.** If multiple operations are present in a single request, then a result of failure from any operation MUST abort the sequence of operations, causing the subsequent operations to be ignored.
- **3.1 Graph Update.** Non-empty inserts into non-existing graphs will, however, implicitly create those graphs, i.e., an implementation fulfilling an update request SHOULD silently an automatically create graphs that do not exist before triples are inserted into them, and MUST return with failure if it fails to do so for any reason.
- **3.1 Graph Update.** If a graph is created implicitly by an update operation, then the behavior of the Graph Store MUST be functionally equivalent to its behavior if the graph had been created explicitly by a CREATE operation.
- **3.1 Graph Update.** This SHOULD create the destination graph if it does not exist.
- **3.1 Graph Update.** If the graph does not exist and it can not be created for any reason, then a failure MUST be returned.
