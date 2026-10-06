# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## The Profiles Vocabulary 1.0

Source: https://www.w3.org/TR/dx-prof-1.0/

The Profiles Vocabulary is an RDF vocabulary created to allow the machine-readable description of profiles of standards for information resources. It can be used to describe profile hierarchies wherein profiles of standards may themselves have profiles indicated. It can also be used to link together multiple profile resources that make up a profile - guidelines, validation tools, schemas, term lists and so on - and it allows for those profile resources to be described with formats, roles, and digital artifacts. The namespace for PROF terms is http://www.w3.org/ns/dx/prof/ . The PROF vocabulary, defined in OWL and encoded in RDF Turtle, is available at prof.ttl .

- **1.1 Profile background.** Data that conforms to a profile, in PROF, must conform to anything the profile is a profile of.
- **6.2 Data Catalog Vocabulary (DCAT).** No normative alignment between DCAT & PROF is presented in this document however they can and should be used together and informative alignment between them (with revised DCAT [ VOCAB-DCAT-2 ]) is given in C.1 Dataset Catalogue Vocabulary .
- **6.3 Asset Description Metadata Schema (ADMS).** As with DCAT, PROF can and should be used with ADMS however no normative alignment between them is presented here but an informative alignment is given in C.2 Asset Description Metadata Schema .
- **7. Conceptual Model.** Resource Descriptor s must indicate the role they play (to guide, to validate etc.), the formalism they adhere to ( dct:format ) and any dct:Standard that they themselves conform to ( dct:conformsTo ).
- **8.3.3 Property: isTransitiveProfileOf.** If this property is used, then all such relationships should be present so a client can safely avoid hierarchy traversal.
- **8.3.3 Property: isTransitiveProfileOf.** While this vocabulary provides this prof:isProfileOf & prof:isTransitiveProfileOf pair of properties, it does not specify how a particular implementation of a Profile that is related to another Profile or Standard by prof:isTransitiveProfileOf should implement specific inferences.
- **8.4.5 Property: isInheritedFrom.** If this property is present, it should be used consistently and all relevant profile resources a client may need to utilise the profile should be present and described using this predicate Issue 18 : Replace isInheritedFrom with a subproperty of rdfs:isDefinedBy Proposal: replace isInhertiedFrom with a more general property that allows any ResourceDescriptor to directly indicate the Profile that…
- **8.5 Class: ResourceRole.** OWL Class prof:ResourceRole Label: Resource Role Definition: A role that an profile resource, described by a Resource Descriptor, plays Sub class of: skos:Concept Usage note: Specific terms must come from a vocabulary.

## Content Negotiation by Profile

Source: https://www.w3.org/TR/dx-prof-conneg/

This document describes how Internet clients may negotiate for content provided by servers based on data profiles to which the content conforms. This is distinct from negotiating by Media Type or Language: a profile may specify the content of information returned, which may be a subset of the information the responding server has about the requested resource, and may be structured in a specific way to meet interoperability requirements of a community of practice.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1.3 Using the Prefer/Preference-Applied header fields (RFC 7240).** Further, [ RFC7240 ] explicitly recommends that implementers " SHOULD NOT use the Prefer header mechanism for content negotiation."
- **7. Abstract Model.** To be a valid functional profile they MUST implement these Abstract Model functions.
- **7. Abstract Model.** Functional Profiles MAY extend upon this Abstract Model with additional features of their own as but these additions MUST NOT invalidate the functions defined here.
- **7. Abstract Model.** A data model for describing the representations of a resource that conform to different data profiles is given here and this model MUST be used by all Functional Profiles.
- **7. Abstract Model.** How conformance of implemented data models is demonstrated is not addressed here in detail and only this guidance is given: implementers SHOULD demonstrate conformance of their Alternate Representations Data Model implementations by providing a published mapping between their environment-specific realization of the model and a concrete realization of the model given in this specification, such as…
- **7.2 Profile Identification.** A client request ing the representation of a resource conforming to a data profile MUST identify the resource by a Uniform Resource Identifier (URI) [ RFC3986 ] and MUST identify the profile either by a URI or a token .
- **7.2 Profile Identification.** If a URI is used for profile identification, it SHOULD be an HTTP URI that dereferences to a description of the profile.
