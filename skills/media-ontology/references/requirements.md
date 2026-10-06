# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Ontology for Media Resources 1.0

Source: https://www.w3.org/TR/mediaont-10/

This document defines the Ontology for Media Resources 1.0. The term "Ontology" is used in its broadest possible definition: a core vocabulary. The intent of this vocabulary is to bridge the different descriptions of media resources, and provide a core set of descriptive properties. This document defines a core set of metadata properties for media resources, along with their mappings to elements from a set of existing metadata formats. Besides that, the document presents a Semantic Web compatible implementation of the abstract ontology using RDF/OWL. The document is mostly targeted towards media resources available on the Web, as opposed to media resources that are only accessible in local r

- **2 Conformance.** For normative sections only, the keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in RFC2119 [ RFC 2119 ].
- **2 Conformance.** To facilitate the differentiation between the normative use of these terms as defined in RFC2119 and a non-normative use of these terms, the normative use of these terms MUST occur in all capital letters.
- **2 Conformance.** A "strictly conforming" application is one that satisfies all "MUST" and "SHALL" provisions in this document.
- **2 Conformance.** In contrast, a "conditionally conforming" application is one that satisfies all "MUST" provisions in this document, but not all "SHALL" provisions.
- **2 Conformance.** It should be noted that an application that does not specify all "MUST" provisions in this document is not conforming".
- **4.** Applications that wish to be conformant with this specification MUST use the data types specified in this section for property values that are defined in this specification.
- **4.1 URI.** Hence, in this specification, the term "URI" MUST be interpreted to also include IRI.
- **4.2 String.** A String value MUST be represented using the XML Schema string data type.

## Metadata API for Media Resources 1.0

Source: https://www.w3.org/TR/mediaont-api-1.0/

This specification defines an API to access metadata information related to media resources on the Web. The overall purpose is to provide developers with a convenient access to metadata information stored in different metadata formats. The API provides means to access the set of metadata properties defined in the Ontology for Media Resources 1.0 specification. These properties are used as a pivot vocabulary in this API. The core of this specification is the definition of API interfaces for retrieving metadata information in synchronous and asynchronous modes. It also defines interfaces for structured return types along with the specification of the behavior of an API implementation.

- **2. Conformance.** The keywords must , must not , required , should , should not , recommended , may , and optional in this specification are to be interpreted as described in [ RFC2119 ].
- **3. Design consideration.** Further, the metadata sources (the media resource and/or metadata document(s)) must be retrievable.
- **3. Design consideration.** Here, the Metadata API for Media Resources 1.0 should use the Ontology for Media Resources 1.0 specification [ MEDIA-ONTOLOGY ], where applicable.
- **4. API Description.** Implementations of this API must support asynchronous mode of operation, may support the synchronous one and must support the interfaces defined in this document.
- **4. API Description.** The IDL fragment in Appendix A of this specification must be interpreted as required for conforming IDL fragments, as described in the “Web IDL” specification.
- **4.1 MediaResource interface.** The mediaResource argument identifies the media resource, for which the implementation of this API should try to find relevant metadata sources.
- **4.1.1 Methods.** Parameter Type Nullable Optional Description mediaResource DOMString ✘ ✘ This attribute must set the specific media resource that should be processed by the API.
- **4.1.1 Methods.** metadataSources MetadataSource [] ✘ ✔ This attribute should specify additional metadata sources.
