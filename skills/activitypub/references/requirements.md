# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## ActivityPub

Source: https://www.w3.org/TR/activitypub/

The ActivityPub protocol is a decentralized social networking protocol based upon the [ ActivityStreams ] 2.0 data format. It provides a client to server API for creating, updating and deleting content, as well as a federated server to server API for delivering notifications and content.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **3. Objects.** Implementers SHOULD include the ActivityPub context in their object definitions.
- **3. Objects.** Servers SHOULD validate the content they receive to avoid content spoofing attacks.
- **3.1 Object Identifiers.** ActivityPub extends this requirement; all objects distributed by the ActivityPub protocol MUST have unique global identifiers, unless they are intentionally transient (short lived activities that are not intended to be able to be looked up, such as some kinds of chat messages or game notifications).
- **3.1 Object Identifiers.** (Publicly facing content SHOULD use HTTPS URIs).
- **3.1 Object Identifiers.** An ID explicitly specified as the JSON null object, which implies an anonymous object (a part of its parent context) Identifiers MUST be provided for activities posted in server to server communication, unless the activity is intentionally transient.
- **3.1 Object Identifiers.** However, for client to server communication, a server receiving an object posted to the outbox with no specified id SHOULD allocate an object ID in the actor's namespace and attach it to the posted object.
- **3.2 Retrieving objects.** Servers MAY use HTTP content negotiation as defined in [ RFC7231 ] to select the type of data to return in response to a request, but MUST present the ActivityStreams object representation in response to application/ld+json; profile="https://www.w3.org/ns/activitystreams" , and SHOULD also present the ActivityStreams representation in response to application/activity+json as well.

## Activity Streams 2.0

Source: https://www.w3.org/TR/activitystreams-core/

This specification details a model for representing potential and completed activities using the JSON format. It is intended to be used with vocabularies that detail the structure of activities, and define specific types of activities.

- **1. Introduction.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **1.2 Relationship to JSON Activity Streams 1.0.** When encountered in an Activity Streams 2.0 document, they SHOULD be processed in accordance to the guidelines listed in B.
- **2. Serialization.** If a property has an array value, the absence of any items in that array MUST be represented by omitting the property entirely or by setting the value to null.
- **2. Serialization.** Activity Streams 2.0 documents MUST be serialized using the UTF-8 character encoding.
- **2.1 JSON-LD.** The serialized JSON form of an Activity Streams 2.0 document MUST be consistent with what would be produced by the standard JSON-LD 1.0 Processing Algorithms and API [ JSON-LD-API ] Compaction Algorithm using, at least, the normative JSON-LD @context definition provided here .
- **2.1 JSON-LD.** Implementations MAY augment the provided @context with additional @context definitions but MUST NOT override or change the normative context.
- **2.1 JSON-LD.** Implementations producing Activity Streams 2.0 documents SHOULD include a @context property with a value that includes a reference to the normative Activity Streams 2.0 JSON-LD @context definition using the URL " https://www.w3.org/ns/activitystreams ".
- **2.2 IRIs and URLs.** There are two special considerations: (1) when an IRI that is not also a URI is given for dereferencing, it MUST be mapped to a URI using the steps in Section 3.1 of [ RFC3987 ] and (2) when an IRI is serving as an "id" value, it MUST NOT be so mapped.

## Activity Vocabulary

Source: https://www.w3.org/TR/activitystreams-vocabulary/

This specification describes the Activity vocabulary. It is intended to be used in the context of the ActivityStreams 2.0 format and provides a foundational vocabulary for activity structures, and specific activity types.

- **1. Introduction.** While not all Activity Streams 2.0 implementations are expected to implement support for the Extended properties, all implementations MUST at least be capable of serializing and deserializing the Extended properties in accordance with the Activity Streams 2.0 Core Syntax .
- **1. Introduction.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **1.1 Conventions.** Unless otherwise specified, all properties defined as xsd:dateTime values MUST conform to the rules defined in Activity Streams 2.0 Core, Section 2.3 .
- **3. Extended Types.** However, to avoid possible interoperability issues, implementations MUST avoid using extension types or properties that unduly overlap with or duplicate the extended vocabulary defined here.
- **3.1 Activity Types.** Either of the anyOf and oneOf properties MAY be used to express possible answers, but a Question object MUST NOT have both properties.
- **4. Properties.** The value MUST be expressed as an xsd:duration as defined by [ xmlschema11-2 ], section 3.3.6 (e.g.
- **4. Properties.** The value MUST conform to both the [ HTML5 ] and [ RFC5988 ] "link relation" definitions.
- **5.1 Audience Targeting.** When the event source generates the object and specifies values for the to and cc fields, the intermediary SHOULD redistribute that object with the values of those fields intact, allowing any processor to see who the object has been targeted to.
