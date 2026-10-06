# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Character Model for the World Wide Web 1.0: Fundamentals

Source: https://www.w3.org/TR/charmod/

This Architectural Specification provides authors of specifications, software developers, and content developers with a common reference for interoperable text manipulation on the World Wide Web, building on the Universal Character Set, defined jointly by the Unicode Standard and ISO/IEC 10646. Topics addressed include use of the terms ' character ', ' encoding ' and ' string ', a reference processing model, choice and identification of character encodings, character escaping, and string indexing. For normalization and string identity matching, see the companion document Character Model for the World Wide Web 1.0: Normalization [CharNorm] . For resource identifiers, see the companion documen

- **2 Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY " and " OPTIONAL " in this document are to be interpreted as described in RFC 2119 [RFC 2119] .
- **2 Conformance.** NOTE: RFC 2119 makes it clear that requirements that use SHOULD are not optional and must be complied with unless there are specific reasons not to: " This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.
- **2 Conformance.** A specification conforms to this document if it: does not violate any conformance criteria preceded by [S], documents the reason for any deviation from criteria where the imperative is SHOULD , SHOULD NOT , or RECOMMENDED , where applicable, requires implementations conforming to the specification to conform to this document, where applicable, requires content conforming to the specification to…
- **3.2 Units of aural rendering.** C001 [S] [I] [C] Specifications, software and content MUST NOT require or depend on a one-to-one correspondence between characters and the sounds of a language.
- **3.3 Units of visual.** C002 [S] [I] [C] Specifications, software and content MUST NOT require or depend on a one-to-one mapping between characters and units of displayed text.
- **3.3.1 Visual Rendering and Logical Order.** C003 [S] [I] [C] Protocols, data formats and APIs MUST store, interchange or process text data in logical order.
- **3.3.1 Visual Rendering and Logical Order.** C075 [I] Independent of whether some implementation uses logical selection or visual selection, characters selected MUST be kept in logical order in storage.
- **3.3.1 Visual Rendering and Logical Order.** C004 [S] Specifications of protocols and APIs that involve selection of ranges SHOULD provide for discontiguous logical selections, at least to the extent necessary to support implementation of visual selection on screen on top of those protocols and APIs.

## Character Model for the World Wide Web: String Matching

Source: https://www.w3.org/TR/charmod-norm/

This document builds upon Character Model for the World Wide Web 1.0: Fundamentals [ CHARMOD ] to provide authors of specifications, software developers, and content developers a common reference on string identity matching on the World Wide Web and thereby increase interoperability.

- **1.4 Terminology and Notation.** This is why [ CHARMOD ] recommends that "Specifications SHOULD NOT arbitrarily exclude code points from the full range of Unicode code points from U+0000 to U+10FFFF inclusive." Example 1 CSS defines the syntax of a style sheet and reserves a number of keywords, such as margin-left or font-family , or values such as 10px .
- **1.5 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **1.5 Conformance.** Specifications can claim conformance to this document if they: do not violate any conformance criteria preceded by [S] where the imperative is MUST or MUST NOT document the reason for any deviation from criteria where the imperative is SHOULD , SHOULD NOT , or RECOMMENDED make it a conformance requirement for implementations to conform to this document make it a conformance requirement for…
- **2.2.1 Canonical vs. Compatibility Equivalence.** Texts that are equivalent after compatibility decomposition often were not perceived as being identical beforehand and SHOULD NOT be treated as equivalent by a formal language.
- **2.9 Other Types of Equivalence.** Specifications for a vocabulary or which define a matching algorithm for use in a formal syntax SHOULD avoid trying to apply additional custom folding, mapping, or processing such as described in that document, since these interfere with producing consistent, predictable results.
- **3.1 Specifying Content Restrictions.** Some best practices for defining these restrictions include the following: § Specifications SHOULD NOT allow surrogate code points ( U+D800 to U+DFFF ) or non-character code points in identifiers.
- **3.1 Specifying Content Restrictions.** § Specifications SHOULD NOT allow the C0 ( U+0000 to U+001F ) and C1 ( U+0080 to U+009F ) control characters in identifiers.
- **3.1 Specifying Content Restrictions.** § Specifications that define application internal identifiers (which are never shown to users and are always used for matching or processing within an application or protocol) SHOULD limit the content to a printable subset of ASCII.

## Strings on the Web: Language and Direction Metadata

Source: https://www.w3.org/TR/string-meta/

This document describes the best practices for identifying the language and direction for strings used on the Web.

- **2. Best Practices, Recommendations, and Gaps.** The most basic best practice, which the Internationalization Working Group looks for in every specification, is: § For any string field containing natural language text, it MUST be possible to determine the language and string direction of that specific string.
- **2. Best Practices, Recommendations, and Gaps.** Such determination SHOULD use metadata at the string or document level and SHOULD NOT depend on heuristics.
- **2.1.1 Non-Linguistic Fields.** § Specifications SHOULD NOT specify or require the use of language metadata for syntactic content or for the value of fields that cannot contain natural language text.
- **2.1.1 Non-Linguistic Fields.** § If a consumer is required to assign a language tag to some non-linguistic data, the language tag zxx (Non-Linguistic) SHOULD be used.
- **2.1.1 Non-Linguistic Fields.** If a consumer is required to assign a string direction to such data, the value auto SHOULD be used.
- **2.1.1 Non-Linguistic Fields.** "help-file-url" : "https://example.org/en-US/help.html" § Specifications SHOULD be careful to distinguish syntactic content , including user-supplied values , from localizable text .
- **2.1.1 Non-Linguistic Fields.** § Specifications MUST NOT treat syntactic content values as "displayable".
- **2.1.3 Resource-wide Defaults.** However, specifications MUST NOT assume that a resource-wide default is sufficient.

## Internationalization Tag Set (ITS) Version 2.0

Source: https://www.w3.org/TR/its20/

The technology described in this document “ Internationalization Tag Set (ITS) 2.0 “ enhances the foundation to integrate automated processing of human language into core Web technologies. ITS 2.0 bears many commonalities with its predecessor, ITS 1.0 but provides additional concepts that are designed to foster the automated creation and processing of multilingual Web content. ITS 2.0 focuses on HTML, XML-based formats in general, and can leverage processing based on the XML Localization Interchange File Format (XLIFF), as well as the Natural Language Processing Interchange Format (NIF).

- **3.1 Notation.** The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119] .
- **3.1 Notation.** The namespace URI that MUST be used by implementations of this specification is: http://www.w3.org/2005/11/its The namespace prefix used in this specification for XML implementations of ITS for the above URI is its .
- **3.6 Usage of Internationalized Resource Identifiers in ITS.** All attributes that have the type anyURI in the normative RELAX NG schema in Appendix D: Schemas for ITS MUST allow the usage of Internationalized Resource Identifiers (IRIs, [RFC 3987] or its successor) to ease the adoption of ITS in international application scenarios.
- **4.1 Conformance Type 1: ITS Markup Declarations.** Conformance clauses: 1-1: At least one of the following MUST be in the schema: rules element one of the local ITS attributes span element 1-2: If the rules element is used, it MUST be part of the content model of at least one element declared in the schema.
- **4.1 Conformance Type 1: ITS Markup Declarations.** It SHOULD be in a content model for meta information, if this is available in that schema (e.g., the head element in [XHTML 1.0] ).
- **4.1 Conformance Type 1: ITS Markup Declarations.** 1-3: If the span element is used, it SHOULD be declared as an inline element.
- **4.1 Conformance Type 1: ITS Markup Declarations.** Statements related to this conformance type MUST list all markup declarations they implement.
- **4.2 Conformance Type 2: The Processing Expectations for ITS Markup.** Conformance clauses: 2-1: A processor MUST implement at least one data category .

## Ruby Annotation

Source: https://www.w3.org/TR/ruby/

"Ruby" are short runs of text alongside the base text, typically used in East Asian documents to indicate pronunciation or to provide a short annotation. This specification defines markup for ruby, in the form of an XHTML module [ XHTMLMOD ].

- **2.4 The rtc element.** More than two rtc elements MUST NOT appear inside a ruby element.
- **1.2.1 Simple ruby markup.** Here is an example of simple ruby markup: <ruby> <rb>WWW</rb> <rt>World Wide Web</rt> </ruby> Figure 1.4 : Example of simple ruby markup This may be rendered as follows: Figure 1.5 : Example of rendering for simple ruby markup in Figure 1.4 Note : The name of this enclosing element, "< ruby >", should be interpreted to mean that its contents are associating ruby text with base text.
- **1.2.1 Simple ruby markup.** It must not be misunderstood to mean that everything inside, including the base text, is ruby.
- **1.2.2 Simple ruby.** (It should be noted that text in parentheses in Japanese typography is never called "ruby".) For compatibility with older user agents that do not understand ruby markup and simply render the content of elements they do not understand, rp elements can be added to simple ruby markup to distinguish ruby text.
- **2.6 The rt element.** The rbspan attribute should not be used in simple ruby markup, and user agents should ignore the rbspan attribute when it appears in simple ruby markup.
- **2.7 The rp element.** The document or style sheet author should be aware of the potential for that confusion and is advised to choose an unambiguous delimiter for the fallback.
- **3.1 Ruby on the Web vs. traditional typographic.** This kind of presentation should be used wherever possible.
- **3.3 Positioning of ruby.** The words "before" and "after" should be understood as "before"/"after" the line containing the base text.

## Working with Time and Timezones

Source: https://www.w3.org/TR/timezone/

This document contains guidelines and best practices for working with time and time zones in applications and document formats. Use cases are provided to help choose an approach that ensures that geographically distributed applications work well with date and time values. This document also aims to provide a basic understanding and vocabulary for talking about time and time handling in software, a source of confusion for many developers and content authors on the Web.

- **3.4.4 Converting between representations.** Values received without a time zone or zone offset SHOULD generally be treated as if they are in UTC.
- **3.4.4 Converting between representations.** Specifications SHOULD provide guidance on how to handle these values.
- **4.2.1 Past-only Events.** You SHOULD use ZonedInstant type for past-only events.
- **4.2.2 Past and Future Events.** You SHOULD use ZonedInstant type if your application can have events in the future.
- **4.2.4 Floating Time Values.** You SHOULD use the appropriate floating time type, such as LocalDateTime (for values with both date and time), LocalDate (for date values), or LocalTime (for time-only values) for values that are not tied to a specific offset or time zone rules.
- **3.3.3 Time Zone Identifiers.** An exemplar city is a city in the time zone in question that should be well-known to people using the time zone.
- **3.4.5 Comparing representations.** Example 7 : Values with and without zone offsets 2005-06-07T13:14:27Z 2005-06-07T11:00:00 If one wishes to write a comparison between the value of <aDateTime> and <bDateTime> , then the two values must be reconciled to use the same reference point.
- **3.4.5 Comparing representations.** Such processing should be avoided whenever possible.

## Developing Localizable Manifests

Source: https://www.w3.org/TR/localizable-manifests/

This document provides definitions and best practices related to the specification of manifest files and similar document formats on the Web.

- **3.1 Non-Linguistic Fields.** For non-linguistic fields (that is, strings that contain data that is not human language) language or direction metadata SHOULD NOT be associated with the value.
- **3.1 Non-Linguistic Fields.** If a consumer is required to assign a language tag to the data, the value zxx (Non-Linguistic) SHOULD be used.
- **3.1 Non-Linguistic Fields.** If a consumer is required to assign a base direction to the data, the value auto SHOULD be used.
- **3.3 Document-Level Defaults.** If your specification defines its own document level defaults, provide two optional fields: The document's default language field SHOULD be called language and SHOULD be specified to contain a valid [ BCP47 ] language tag.
- **3.3 Document-Level Defaults.** Specifications SHOULD specify that implementations are only require to check if a [ BCP47 ] language tag is well-formed .
- **3.3 Document-Level Defaults.** The document's default base direction field SHOULD be called direction and support the values ltr , rtl , or auto .
- **1. Introduction.** A common design pattern is to provide a manifest or configuration file that defines which resources are available and how various resources should be used or to provide various kinds of metadata about a collection of resources.
- **2.1.1 Matching Language Tags and Locale Fallback.** Obviously, the entire list must be read to find the best match, since the entry for en could be considered a match for either value.
