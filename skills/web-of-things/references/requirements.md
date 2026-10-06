# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web of Things (WoT) Architecture 1.1

Source: https://www.w3.org/TR/wot-architecture11/

The W3C Web of Things (WoT) enables interoperability across IoT platforms and application domains. The goal of the WoT is to preserve and complement existing IoT standards and solutions. The W3C WoT architecture is designed to describe what exists, and only prescribes new mechanisms when necessary. This WoT Architecture specification describes the abstract architecture for the W3C Web of Things. This abstract architecture is based on requirements that were derived from use cases for multiple application domains.

- **2..** The key words MAY , MUST , MUST NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1.1.1 Thing Descriptions.** In W3C WoT, the description metadata for a Thing instance MUST be available as a WoT Thing Description (TD) [ WOT-THING-DESCRIPTION ].
- **6.1.1.1 Thing Descriptions.** To be considered a Thing , however, at least one TD representation MUST be available.
- **6.1.2.** Figure 17 Linked Things Things MUST be hosted on networked system components with a software stack to realize interaction through a network-facing interface, the WoT Interface of a Thing .
- **6.6.1.** Extension relation types MUST be compared as strings using ASCII case-insensitive comparison, (c.f.
- **6.6.1.** Nevertheless, all-lowercase URIs SHOULD be used for extension relation types [ RFC8288 ].
- **6.6.2.** Form contexts and submission targets MUST both be Internationalized Resource Identifiers (IRIs) [ RFC3987 ].
- **6.6.2.** The request method MUST identify one method of the standard set of the protocol identified by the submission target URI scheme.

## Web of Things (WoT) Architecture Level 1.0

Source: https://www.w3.org/TR/wot-architecture10/

The W3C Web of Things (WoT) is intended to enable interoperability across IoT platforms and application domains. Overall, the goal of the WoT is to preserve and complement existing IoT standards and solutions. In general, the W3C WoT architecture is designed to describe what exists rather than to prescribe what to implement. This WoT Architecture specification describes the abstract architecture for the W3C Web of Things. This abstract architecture is based on a set of requirements that were derived from use cases for multiple application domains,

- **2..** The key words MAY , MUST , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.1.** In W3C WoT, the description metadata MUST be a WoT Thing Description (TD) [ WOT-THING-DESCRIPTION ].
- **6.1.** Consumers MUST be able to parse and process the TD representation format, which is based on JSON [ RFC8259 ].
- **6.1.** To be a Thing , however, at least one TD representation MUST be available.
- **6.1.** An identifier in the WoT Thing Description MUST allow for the correlation of multiple TDs representing the same original Thing or ultimately unique physical entity.
- **6.4.1.** The state exposed by a Property MUST be retrievable (readable).
- **6.5.1.** Extension relation types MUST be compared as strings using a case-insensitive comparison.
- **6.5.1.** Nevertheless, all-lowercase URIs SHOULD be used for extension relation types.

## Web of Things (WoT) Thing Description 1.1

Source: https://www.w3.org/TR/wot-thing-description11/

This document describes a formal information model and a common representation for a Web of Things (WoT) Thing Description 1.1. A Thing Description describes the metadata and interfaces of Things , where a Thing is an abstraction of a physical or virtual entity that provides interactions to and participates in the Web of Things. Thing Descriptions provide a set of interactions based on a small vocabulary that makes it possible both to integrate diverse devices and to allow diverse applications to interoperate. Thing Descriptions, by default, are encoded in a JSON format that also allows JSON-LD

- **2..** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.3 Class Definitions.** A TD Processor MUST satisfy the Class instantiation constraints on all Classes defined in 5.3.1 Core Vocabulary Definitions , 5.3.2 Data Schema Vocabulary Definitions , 5.3.3 Security Vocabulary Definitions , and 5.3.4 Hypermedia Controls Vocabulary Definitions .
- **5.3.1.1 Thing.** optional Map of DataSchema For @context the following rules are defined for Thing Description instances: The @context name-value pair MUST contain the anyURI https://www.w3.org/2022/wot/td/v1.1 in order to identify the document as a TD 1.1 which would allow Consumers to use the newly introduced terms.
- **5.3.1.1 Thing.** When there are possibly TD 1.0 consumers the anyURI https://www.w3.org/2019/wot/td/v1 MUST be the first entry and the https://www.w3.org/2022/wot/td/v1.1 MUST be the second entry.
- **5.3.1.1 Thing.** TD 1.1 consumers MUST accept TDs satisfying the W3C WoT Thing Description 1.0 [ wot-thing-description10 ] specification.
- **5.3.1.1 Thing.** One Map contained in an @context Array SHOULD contain a name-value pair that defines the default language for the Thing Description, where the name is the Term @language and the value is a well-formed language tag as defined by [ BCP47 ] (e.g., en , de-AT , gsw-CH , zh-Hans , zh-Hant-HK , sl-nedis ).
- **5.3.1.1 Thing.** TD Processors SHOULD take care to use bidi isolation when presenting strings to users, particularly when embedding in surrounding text (e.g., for Web user interface) .
- **5.3.1.1 Thing.** TD producers SHOULD attempt to provide mixed direction strings in a way that can be displayed successfully by a naive user agent.

## Web of Things (WoT) Thing Description 2.0

Source: https://www.w3.org/TR/wot-thing-description-2.0/

This document describes a formal information model and a common representation for a Web of Things (WoT) Thing Description (TD), Version 2.0. A Thing Description describes the metadata and interfaces of Things , where a Thing is an abstraction of a physical or virtual entity that provides interactions to and participates in the Web of Things. Thing Descriptions provide a set of interactions based on a small vocabulary that makes it possible both to integrate diverse devices and to allow diverse applications to interoperate. Thing Descriptions, by default, are encoded in a JSON format that also allows JSON-LD processing. The latter provides a powerful foundation to

- **2..** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.3 Class Definitions.** A TD Processor MUST satisfy the Class instantiation constraints on all Classes defined in 5.3.1 Core Vocabulary Definitions , 5.3.2 Data Schema Vocabulary Definitions , 5.3.3 Security Vocabulary Definitions , and 5.3.4 Hypermedia Controls Vocabulary Definitions .
- **5.3.1.1 Thing.** For @context the following rules are defined for Thing Description instances: The @context name-value pair MUST contain the anyURI https://www.w3.org/2022/wot/td/v1.1 in order to identify the document as a TD 1.1 which would allow Consumers to use the newly introduced terms.
- **5.3.1.1 Thing.** When there are possibly TD 1.0 consumers the anyURI https://www.w3.org/2019/wot/td/v1 MUST be the first entry and the https://www.w3.org/2022/wot/td/v1.1 MUST be the second entry.
- **5.3.1.1 Thing.** TD 1.1 consumers MUST accept TDs satisfying the W3C WoT Thing Description 1.0 [ wot-thing-description10 ] specification.
- **5.3.1.1 Thing.** One Map contained in an @context Array SHOULD contain a name-value pair that defines the default language for the Thing Description, where the name is the Term @language and the value is a well-formed language tag as defined by [ BCP47 ] (e.g., en , de-AT , gsw-CH , zh-Hans , zh-Hant-HK , sl-nedis ).
- **5.3.1.1 Thing.** TD Processors SHOULD take care to use bidi isolation when presenting strings to users, particularly when embedding in surrounding text (e.g., for Web user interface) .
- **5.3.1.1 Thing.** TD producers SHOULD attempt to provide mixed direction

## Web of Things (WoT) Thing Description Level 1.0

Source: https://www.w3.org/TR/wot-thing-description10/

This document describes a formal model and a common representation for a Web of Things (WoT) Thing Description. A Thing Description describes the metadata and interfaces of Things , where a Thing is an abstraction of a physical or virtual entity that provides interactions to and participates in the Web of Things. Thing Descriptions provide a set of interactions based on a small vocabulary that makes it possible both to integrate diverse devices and to allow diverse applications to interoperate. Thing Descriptions, by default, are encoded in a JSON format that also allows JSON-LD processing. The latter provides a powerful foundation

- **2..** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.3.** Class Definitions A TD Processor MUST satisfy the Class instantiation constraints on all Classes defined in § 5.3.1 Core Vocabulary Definitions , § 5.3.2 Data Schema Vocabulary Definitions , § 5.3.3 Security Vocabulary Definitions , and § 5.3.4 Hypermedia Controls Vocabulary Definitions .
- **5.3.1.1.** name-value pair MUST contain the anyURI https://www.w3.org/2019/wot/td/v1 either directly when of type anyURI or as first element when of type Array .
- **5.3.1.1.** One Map contained in an @context Array SHOULD contain a name-value pair that defines the default language for the Thing Description, where the name is the Term @language and the value is a well-formed language tag as defined by [ BCP47 ] (e.g., en , de-AT , gsw-CH , zh-Hans , zh-Hant-HK , sl-nedis ).
- **5.3.1.1.** The computation of the base direction of all human-readable text strings is defined by the following set of rules: If no language tag is given, the base direction SHOULD be inferred through first-strong heuristics or detection algorithms such as the CLDR Likely Subtags [ LDML ].
- **5.3.1.1.** In cases where a language can be written in more than one script with different base directions, the corresponding language tag given in @language or MultiLanguage Maps MUST include a script subtag, so that an appropriate base direction can be inferred.
- **5.3.1.1.** instances, the string values assigned to the name op , either directly or within an Array , MUST be one of the following operation types : readallproperties , writeallproperties , readmultipleproperties , or writemultipleproperties .
- **5.3.1.3.** When a Form instance is within a PropertyAffordance instance, the value assigned to op MUST be one of readproperty , writeproperty , observeproperty , unobserveproperty or an Array containing a combination of these terms.

## Web of Things (WoT) Discovery

Source: https://www.w3.org/TR/wot-discovery/

The W3C Web of Things (WoT) is intended to enable interoperability across IoT platforms and application domains. One key mechanism for accomplishing this goal is the definition and use of metadata describing the interactions an IoT device or service makes available over the network at a suitable level of abstraction. The WoT Thing Description specification satisfies this objective. However, in order to use a Thing its Thing Description first has to be obtained. The WoT Discovery process described in this document addresses this problem. WoT

- **2..** The key words MAY , MUST , OPTIONAL , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5..** The following assertions describe the specific responsibilities of a Discoverer: A Discoverer MUST support at least one Introduction mechanism.
- **5..** A Discoverer MUST support fetching a TD from at least one URL provided as part of the Introduction process.
- **5..** A Discoverer MUST be able to merge URLs resulting from multiple Introduction mechanisms, multiple results from a single Introduction mechanism, and multiple Introduction invocations into a single set.
- **5..** A Discoverer MUST be able to identify whether a TD fetched from an Introduction URL has Thing Directory or Thing Link type.
- **5..** A Discoverer MUST track which TDs describing links or Exploration mechanisms have already been fetched and avoid fetching duplicate results.
- **6.1.** A request on all such URLs MUST result in a TD as prescribed in 7.
- **6.1.** If the URL references a Thing Description Directory , this MUST be the Thing Description of the Thing Description Directory .

## Web of Things (WoT) Profiles

Source: https://www.w3.org/TR/wot-profile/

This specification defines a Profiling Mechanism and a set of Profiles which enable out-of-the-box interoperability between Web Things and their Consumers on the Web of Things . Being out-of-the-box interoperable means that any Consumer which conforms with a given Profile can interact with any Thing which conforms with the same Profile , without additional customization. A Profile is a technical specification which provides a set of assertions to which conformant Consumers and Things must conform. The Profiling Mechanism provides a means to denote that a

- **2..** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4..** Profiling Mechanism In order to conform with a Profile , a Web Thing MUST conform with all the normative statements in the Profile 's specification.
- **4..** In order to denote that a given Web Thing conforms to one or more Profiles , its Thing Description MUST include a profile member [ wot-thing-description11 ].
- **4..** The value of the profile member MUST be set to either a valid URI [ RFC3986 ] identifying a single Profile , or an array of valid URIs identifying multiple Profiles .
- **4..** In order to use a profile member in a Thing Description , the @context member MUST contain the anyURI https://www.w3.org/2022/wot/td/v1.1 in order to denote that the document is using version 1.1 of the Thing Description specification.
- **4..** } All Things and Consumers conforming to a Profile MUST satisfy the assertions specified in the WoT Thing Description 1.1 specification [ wot-thing-description11 ], except for the assertion with text "TD 1.1 consumers MUST accept TDs satisfying the W3C WoT Thing Description 1.0 [wot-thing-description] specification." A Profile SHOULD NOT redefine defaults from protocol binding templates [ wot-binding-templates ].
- **4..** A Profile SHOULD NOT require a Thing to respond in a way which would be unexpected by a Consumer which does not implement the Profile .
- **5.2 Date.** Format Unless otherwise specified, all date and time values MUST use the date-time format defined in [ RFC3339 ].

## Web of Things (WoT) Binding Registry

Source: https://www.w3.org/TR/wot-binding-registry/

W3C Web of Things (WoT) enables applications to interact with and orchestrate connected Things at the Web scale. The standardized abstract interaction model exposed by the WoT Thing Description enables applications to scale and evolve independently of the individual Things. Through WoT Bindings, the abstract interactions can be bound to various network-level protocols, standards, and platforms for connected Things, which already have have millions of devices deployed in the field today. This is done through protocol-specific URI schemes, additional descriptive vocabularies, and examples that guide the implementors of WoT Things and Consumers alike. This document defines a registry of WoT bin

- **2. Conformance.** The key words MAY , MUST , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1 Entry format.** Each entry MUST contain the following information .
- **4.1 Entry format.** All parts of the entry MUST not conflict with existing bindings .
- **4.1 Entry format.** The submitter SHOULD trigger the registration at IANA.
- **4.1 Entry format.** Supported TD version string or Array of string A binding SHOULD correspond to specific TD specification version(s).
- **4.1 Entry format.** The version string SHOULD contain a UTC-based date in ISO 8601 format in the form of YYYY-MM-DD .
- **4.2.1 Technical submission mechanism.** If a new entry conflicts with another entry, the reviewer MUST mark the new submission accordingly.
- **4.2.1 Technical submission mechanism.** As two bindings that do the same are not allowed, either the old one MUST be deprecated or the new one MUST be rejected.
