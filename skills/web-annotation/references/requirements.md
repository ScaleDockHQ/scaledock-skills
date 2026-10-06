# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Annotation Data Model

Source: https://www.w3.org/TR/annotation-model/

Annotations are typically used to convey information about a resource or associations between resources. Simple examples include a comment or tag on a single web page or image, or a blog post about a news article. The Web Annotation Data Model specification describes a structured model and format to enable annotations to be shared and reused across different hardware and software platforms. Common use cases can be modeled in a manner that is simple and convenient, while at the same time enabling more complex requirements, including linking arbitrary content to a particular data point or to segments of timed multimedia resources. The specification provides a specific JSON format for ease of c

- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , NOT RECOMMENDED , RECOMMENDED , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **1.3.1 Conformance Requirements Related to Selectors.** A conforming implementation MUST implement that particular combination if it handles the corresponding media type.
- **1.3.1 Conformance Requirements Related to Selectors.** Conforming implementations SHOULD ignore that particular combination.
- **1.4 Terminology.** Web Resource A Resource that MUST be identified by an IRI , as described in the Web Architecture [ webarch ].
- **Model.** The Annotation MUST have 1 or more @context values and http://www.w3.org/ns/anno.jsonld MUST be one of them.
- **Model.** If there is only one value, then it MUST be provided as a string.
- **Model.** An Annotation MUST have exactly 1 IRI that identifies it.
- **Model.** An Annotation MUST have 1 or more types, and the Annotation class MUST be one of them.

## Web Annotation Protocol

Source: https://www.w3.org/TR/annotation-protocol/

Annotations are typically used to convey information about a resource or associations between resources. Simple examples include a comment or tag on a single web page or image, or a blog post about a news article. The Web Annotation Protocol describes the transport mechanisms for creating and managing annotations in a method that is consistent with the Web Architecture and REST best practices.

- **1.2 Summary.** Annotation Containers SHOULD only contain Annotations, and not other resources.
- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **3. Annotation Retrieval.** The Annotation Server MUST support the following HTTP methods on the Annotation's IRI: GET (retrieve the description of the Annotation), HEAD (retrieve the headers of the Annotation without an entity-body), OPTIONS (enable CORS pre-flight requests [ cors ]).
- **3. Annotation Retrieval.** Servers SHOULD use HTTPS rather than HTTP for all interactions, including retrieval of Annotations.
- **3. Annotation Retrieval.** Servers MUST support the JSON-LD representation using the Web Annotation profile.
- **3. Annotation Retrieval.** These responses MUST have a Content-Type header with the application/ld+json media type, and it SHOULD have the Web Annotation profile IRI of http://www.w3.org/ns/anno.jsonld in the profile parameter.
- **3. Annotation Retrieval.** Servers SHOULD support a Turtle representation, and MAY support other formats.
- **3. Annotation Retrieval.** If more than one representation of the Annotation is available, then the server SHOULD support content negotiation.

## Web Annotation Vocabulary

Source: https://www.w3.org/TR/annotation-vocab/

The Web Annotation Vocabulary specifies the set of RDF classes, predicates and named entities that are used by the Web Annotation Data Model [ annotation-model ]. It also lists recommended terms from other ontologies that are used in the model, and provides the JSON-LD Context and profile definitions needed to use the Web Annotation JSON serialization in a Linked Data context.

- **1. Introduction.** Each class lists the recommendations from the model for the REQUIRED , RECOMMENDED and OPTIONAL object and data properties for instances of the class.
- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **2.1.8 HttpRequestState.** The HttpRequestState class is used to record the HTTP request headers that a client SHOULD use to request the correct representation from the resource.
- **2.2.2 bodyValue.** The value MUST be an xsd:string and that data type MUST NOT be expressed in the serialization.
- **2.2.2 bodyValue.** Note that language MUST NOT be associated with the value either as a language tag, as that is only available for rdf:langString .
- **2.2.28 textDirection.** There MUST only be one text direction associated with any given resource.
- **4. Extensions.** Extension contexts MUST NOT redefine existing JSON-LD keys from the Web Annotation context.
- **4. Extensions.** Implementations MUST ignore unfamiliar properties when processing the data, but servers SHOULD preserve them if they are part of a valid and included context.
