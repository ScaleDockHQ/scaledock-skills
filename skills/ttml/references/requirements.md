# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Timed Text Markup Language 2 (TTML2) (2nd Edition)

Source: https://www.w3.org/TR/ttml2/

This document specifies the Timed Text Markup Language (TTML), Version 2, also known as TTML2, in terms of a vocabulary and semantics thereof. The Timed Text Markup Language is a content type that represents timed text media for the purpose of interchange among authoring systems. Timed text is textual information that is intrinsically or extrinsically associated with timing information. It is intended to be used for the purpose of transcoding or exchanging timed text information among legacy distribution content formats presently in use for subtitling and captioning functions. In addition to being used for interchange among legacy distribution content

- **1.2 Document Example.** Example Fragment – TTML Body <body region="subtitleArea"> <div> <p xml:id="subtitle1" begin="0.76s" end="3.45s"> It seems a paradox, does it not, </p> <p xml:id="subtitle2" begin="5.0s" end="10.0s"> that the image formed on<br/> the Retina should be inverted?
- **2.2 Terminology.** [content profile] A profile such that (1) the value of the type component of the associated profile instance is content and (2) the collection of features and extensions of which must not, must, or may be employed by Timed Text Markup Language content.
- **2.2 Terminology.** [processor profile] A profile such that (1) the value of the type component of the associated profile instance is processor and (2) the collection of features and extensions of which must or may be implemented (supported) by a content processor.
- **2.3 Documentation Conventions.** Within normative prose in this specification, the words may , should , and must are defined as follows: may Conforming documents and/or TTML processors are permitted to, but need not behave as described.
- **2.3 Documentation Conventions.** should Conforming documents and/or TTML processors are strongly recommended to, but need not behave as described.
- **2.3 Documentation Conventions.** must Conforming documents and/or TTML processors are required to behave as described; otherwise, they are in error.
- **2.3 Documentation Conventions.** If normative specification language takes an imperative form, then it is to be treated as if the term must applies.
- **2.3 Documentation Conventions.** Furthermore, if normative language takes a declarative form, and this language is governed by must , then it is also to be treated as if the term must applies.

## Timed Text Markup Language 1 (TTML1) (Third Edition)

Source: https://www.w3.org/TR/ttml1/

This document specifies Timed Text Markup Language (TTML), Version 1, also known as TTML1, in terms of a vocabulary and semantics thereof. The Timed Text Markup Language is a content type that represents timed text media for the purpose of interchange among authoring systems. Timed text is textual information that is intrinsically or extrinsically associated with timing information. It is intended to be used for the purpose of transcoding or exchanging timed text information among legacy distribution content formats presently in use for subtitling and captioning functions. In addition to being used for interchange among legacy distribution content

- **1.2 Document Example.** Example Fragment – TTML Body <body region="subtitleArea"> <div> <p xml:id="subtitle1" begin="0.76s" end="3.45s"> It seems a paradox, does it not, </p> <p xml:id="subtitle2" begin="5.0s" end="10.0s"> that the image formed on<br/> the Retina should be inverted?
- **2.3 Documentation Conventions.** Within normative prose in this specification, the words may , should , and must are defined as follows: may Conforming documents and/or TTML processors are permitted to, but need not behave as described.
- **2.3 Documentation Conventions.** should Conforming documents and/or TTML processors are strongly recommended to, but need not behave as described.
- **2.3 Documentation Conventions.** must Conforming documents and/or TTML processors are required to behave as described; otherwise, they are in error.
- **2.3 Documentation Conventions.** If normative specification language takes an imperative form, then it is to be treated as if the term must applies.
- **2.3 Documentation Conventions.** Furthermore, if normative language takes a declarative form, and this language is governed by must , then it is also to be treated as if the term must applies.
- **2.3 Documentation Conventions.** Similarly, if the specification prose is "X must apply", "X applies", or "X is mandatory", and "X" is further defined as "X is Y and Z", then, by transitive closure, this last declarative phrase is to be read as "Y is mandatory" and "Z is mandatory" in the context of use.
- **3.1 Content Conformance.** In addition, this Infoset should satisfy the web content accessibility guidelines specified by [WCAG] .

## IMSC Text Profile 1.3

Source: https://www.w3.org/TR/ttml-imsc1.3/

This specification defines a text-only profile of [ ttml2 ] intended for subtitle and caption delivery applications worldwide. It improves over the Text Profile specified at at [ ttml-imsc1.2 ], with the improvements summarized at L. Summary of substantive changes .

- **5. Conformance.** The key words MAY , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5. Conformance.** A Document Instance that conforms to the Text Profile : SHALL satisfy all normative provisions specified by the profile; MAY include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is permitted or optional in the profile; SHALL NOT include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is prohibited in the profile.
- **5. Conformance.** A presentation processor that conforms to the Text Profile : SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement presentation semantic support for every Feature and Extension designated as permitted or permitted-deprecated by the profile, subject to any additional…
- **5. Conformance.** A transformation processor that conforms to the Text Profile : SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement transformation semantic support for every Feature and Extension designated as permitted or or permitted-deprecated by the profile, subject to any additional…
- **6.3.2 Override.** If one or more ebuttm:conformsToStandard elements, as specified in [ EBU-TT-M ], are set to any of the following designators, then the override content profile SHALL be set to the profile associated with any one of the matching designators: [ ttml-imsc1.0.1 ] Text Profile Designator [ ttml-imsc1.1 ] Text Profile Designator [ ttml-imsc1.2 ] Text Profile Designator Text Profile Designator…
- **7. Supported Features and Extensions.** #length-version-2 permitted #lineBreak-uax14 The processor SHALL implement the #lineBreak-uax14 feature.
- **8.1.1 altText named metadata item.** The altText named metadata item SHOULD NOT be present since no image-based timed text information is used in a Text Profile Document Instance .
- **8.1.1 altText named metadata item.** A altText named metadata item SHALL NOT be present in a Document Instance if any ittm:altText element is also present.

## TTML Profiles for Internet Media Subtitles and Captions 1.2

Source: https://www.w3.org/TR/ttml-imsc1.2/

This specification defines two profiles of [ ttml2 ]: a text-only profile and an image-only profile. These profiles are intended to be used across subtitle and caption delivery applications worldwide, thereby simplifying interoperability, consistent rendering and conversion to other subtitling and captioning formats. This specification improves on [ ttml-imsc1.1 ] by supporting contemporary practices, while retaining compatibility with [ ttml-imsc1.1 ] documents. Relative to [ ttml-imsc1.1 ], any addition or deprecation of features are summarized at § L. Summary of substantive changes .

- **5. Conformance.** The key words MAY , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5. Conformance.** A Document Instance that conforms to a profile defined herein: SHALL satisfy all normative provisions specified by the profile; MAY include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is permitted or optional in the profile; SHALL NOT include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is…
- **5. Conformance.** A presentation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement presentation semantic support for every Feature and Extension designated as permitted or permitted-deprecated by the profile, subject to…
- **5. Conformance.** A transformation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement transformation semantic support for every Feature and Extension designated as permitted or or permitted-deprecated by the profile,…
- **6.4.2 Override.** If one or more ebuttm:conformsToStandard elements, as specified in [ EBU-TT-M ], are set to any of the following designators, then the override content profile SHALL be set to the profile associated with any one of the matching designators: [ ttml-imsc1.0.1 ] Text Profile Designator [ ttml-imsc1.0.1 ] Image Profile Designator [ ttml-imsc1.1 ] Text Profile Designator [ ttml-imsc1.1 ] Image Profile…
- **7. Supported Features and Extensions.** #lineBreak-uax14 The processor SHALL implement the #lineBreak-uax14 feature.
- **8.1 Document Encoding.** A Document Instance SHALL be concretely encoded as a well-formed XML 1.0 [ xml ] document using the UTF-8 character encoding as specified in [ UNICODE ].
- **8.1 Document Encoding.** The resulting [ xml ] document SHOULD NOT contain any of the following physical structures: entity declarations ; and entity references other than to predefined entities .

## TTML Profiles for Internet Media Subtitles and Captions 1.1

Source: https://www.w3.org/TR/ttml-imsc1.1/

This specification defines two profiles of [ ttml2 ]: a text-only profile and an image-only profile. These profiles are intended to be used across subtitle and caption delivery applications worldwide, thereby simplifying interoperability, consistent rendering and conversion to other subtitling and captioning formats. This specification improves on [ ttml-imsc1.0.1 ] by supporting contemporary practices, while retaining compatibility with [ ttml-imsc1.0.1 ] documents. Relative to [ ttml-imsc1.0.1 ], any addition or deprecation of features are summarized at Appendix L. Summary of substantive changes . It is feasible to create documents that simultaneously conform to both [ ttml10-sdp-us ] and

- **4. Conformance.** The key words MAY , SHALL , SHALL NOT , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **4. Conformance.** A Document Instance that conforms to a profile defined herein: SHALL satisfy all normative provisions specified by the profile; MAY include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is permitted or optional in the profile; SHALL NOT include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is…
- **4. Conformance.** A presentation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement presentation semantic support for every Feature and Extension designated as permitted or permitted-deprecated by the profile, subject to…
- **4. Conformance.** A transformation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ ttml2 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement transformation semantic support for every Feature and Extension designated as permitted or or permitted-deprecated by the profile,…
- **5.1 General.** In applications that require subtitle/caption content in image form to be simultaneously available in text form, two distinct Document Instances , one conforming to the Text Profile and the other conforming to the Image Profile , SHOULD be offered.
- **5.1 General.** In addition, the Text Profile Document Instance SHOULD be associated with the Image Profile Document Instance such that, when image content is encountered, assistive technologies have access to its corresponding text form.
- **5.4.2 Override.** If one or more ebuttm:conformsToStandard elements, as specified in [ EBU-TT-M ], are set to any of the following designators, then the override content profile SHALL be set to the profile associated with any one of the matching designators: [ ttml-imsc1.0.1 ] Text Profile Designator [ ttml-imsc1.0.1 ] Image Profile Designator Image Profile Designator Text Profile Designator…
- **6. Supported Features and Extensions.** #lineBreak-uax14 The processor SHALL implement the #lineBreak-uax14 feature.

## TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1)

Source: https://www.w3.org/TR/ttml-imsc1.0.1/

This document specifies two profiles of [ TTML1 ]: a text-only profile and an image-only profile. These profiles are intended to be used across subtitle and caption delivery applications worldwide, thereby simplifying interoperability, consistent rendering and conversion to other subtitling and captioning formats. It is feasible to create documents that simultaneously conform to both [ ttml10-sdp-us ] and the text-only profile. The document defines extensions to [ TTML1 ], as well as incorporates extensions specified in [ ST2052-1 ] and [ EBU-TT-D ]. Both profiles are based on [ SUBM ].

- **4. Conformance.** The key words MAY , SHALL , SHALL NOT , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **4. Conformance.** A Document Instance that conforms to a profile defined herein: SHALL satisfy all normative provisions specified by the profile; MAY include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is permitted or optional in the profile; SHALL NOT include any vocabulary, syntax or attribute value associated with a Feature or Extension whose disposition is…
- **4. Conformance.** A presentation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ TTML1 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement presentation semantic support for every Feature and Extension designated as permitted by the profile, subject to any additional constraints…
- **4. Conformance.** A transformation processor that conforms to a profile defined in this specification: SHALL satisfy the Generic Processor Conformance requirements at Section 3.2.1 of [ TTML1 ]; SHALL satisfy all normative provisions specified by the profile; and SHALL implement transformation semantic support for every Feature and Extension designated as permitted by the profile, subject to any additional…
- **5.1 General.** In applications that require subtitle/caption content in image form to be simultaneously available in text form, two distinct Document Instances , one conforming to the Text Profile and the other conforming to the Image Profile , SHOULD be offered.
- **5.1 General.** In addition, the Text Profile Document Instance SHOULD be associated with the Image Profile Document Instance such that, when image content is encountered, assistive technologies have access to its corresponding text form.
- **5.4 Profile Resolution Semantics.** For the purpose of content processing, the determination of the resolved profile SHOULD take into account both the signaled profile, as defined in 6.9 Profile Signaling , and profile metadata, as designated by either (or both) the Document Interchange Context or (and) the Document Processing Context , which MAY entail inspecting document content.
- **5.4 Profile Resolution Semantics.** If the resolved profile is a profile supported by the Processor , then the Processor SHOULD process the Document Instance according to the resolved profile.

## Dubbing and Audio description Profiles of TTML2

Source: https://www.w3.org/TR/dapt/

This specification defines DAPT , a TTML -based file format for the exchange of timed text content in transcription and translation workflows used in the production of dubbing scripts, audio description, translation subtitles and hard of hearing subtitles (also known as closed captions).

- **4.1.1 Script Represents.** To represent this property, the daptm:scriptRepresents attribute MUST be present on the <tt> element, with a value conforming to the following syntax: daptm:scriptRepresents : < content-descriptor > ( <lwsp>+ <content-descriptor>)* <lwsp> # as TTML2 Example 12 A dubbing script might have daptm:scriptRepresents="audio.dialogue" .
- **4.1.2 Default Language.** The Default Language is represented in a DAPT Document by the following structure and constraints: the xml:lang attribute MUST be present on the <tt> element and its value MUST NOT be empty.
- **4.1.3 Script Type.** To represent this property, the daptm:scriptType attribute MUST be present on the <tt> element: daptm:scriptType : "originalTranscript" | "translatedTranscript" | "preRecording" | "asRecorded" The definitions of the types of documents and the corresponding daptm:scriptType attribute values are: Original Language Transcript : When the daptm:scriptType attribute value is originalTranscript , the…
- **4.1.3 Script Type.** Script Events in this type of transcript : SHOULD contain Original Text objects; SHOULD NOT contain Translation Text objects.
- **4.1.3 Script Type.** Script Events in this type of transcript : SHOULD contain Translation Text objects; MAY also contain Original Text objects.
- **4.1.3 Script Type.** Script Events in this type of script : SHOULD contain Text objects in the Target Recording Language ;
- **4.1.3 Script Type.** MAY also contain Original Text objects from the Original Language Transcript in the case that their language is not the Target Recording Language , for context, to assist further processing; SHOULD NOT contain Audio objects.
- **4.1.3 Script Type.** Script Events in this type of script : SHOULD contain Text objects in the Target Recording Language ; MAY also contain Original Text objects from the Original Language Transcript or Translation Text objects in other languages for context and quality verification; MAY also contain links to audio and mixing instructions for the purpose of producing an audio track incorporating the recordings;…

## IMSC Hypothetical Render Model

Source: https://www.w3.org/TR/imsc-hrm/

This specification specifies a Hypothetical Render Model (HRM) that constrains the presentation complexity of documents that conform to the Text Profiles specified in any edition of Internet Media Subtitles and Captions ([ IMSC ]). The objective of the HRM is to allow subtitle and caption authors and providers to verify that the content they provide does not exceed defined complexity levels, so that playback systems can render the content synchronized with the author-specified display times. The model is not intended as a specification of the processing requirements for implementations. For instance, while the model defines glyph cache for the purpose of modelling how the number of glyph dra

- **4. Conformance.** The key word SHALL in this document is to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **7. Algorithm.** It SHALL be an error for the Presentation Compositor to fail to complete painting pixels for non-empty ISD E n before its presentation time.
- **9. Paint Text.** It SHALL be an error if the sum of NRGA(g i ) over all glyphs flagged retain in the Glyph Cache is at any time larger than the Normalized Glyph Cache Size ( NGBS ).
- **B.2 User customisation of presentation.** Implementers of presentation processors that support user customisation of presentation should ensure that those processors are able to present IMSC Document Instances that conform to the Hypothetical Render Model, even if the customisation effectively increases the complexity of presentation.
- **C.2 Implementation considerations.** Implementers of this specification should capture and meet privacy and security requirements for their intended application.
- **C.2 Implementation considerations.** If that content could include sensitive or personal information, the implementation should ensure that any such output is provided using appropriately secure protocols.
- **D.1 Error Reporting.** This specification does not define how, or even if, errors should be reported.
- **D.2 Exception Handling.** This specification does not define any runtime exceptions, or how such exceptions should be handled.

## TTML Media Type Definition and Profile Registry

Source: https://www.w3.org/TR/ttml-profile-registry/

This document defines the application/ttml+xml media type and provides a registry of compact (short) identifiers that may be used to identify TTML processor profiles. A processor profile specifies a set of capabilities that a processor must support in order to process a document, where this profile may be defined in a specification document, in a TTML Profile Definition Document , inline within a TTML Document Instance, or by using a combination of these methods. This document only considers the first two of these methods since the third method (the use

- **1. Purpose.** the requirements to fetch and begin decode/processing of a TTML document, where X+Y means that both X and Y processor profiles must be supported, and X|Y means that either X or Y processor profile must be supported.
- **2. Media Type Registration.** Optional parameters: charset If specified, the charset parameter must match the XML encoding declaration, or if absent, the actual encoding.
- **2. Media Type Registration.** profile The document profile of a TTMLDocument Instance may be specified using an optional profile parameter, which, if specified, the value of which must adhere to the syntax and semantics of ttp:profile parameter defined by TTML 1.0 Second Edition, Section 6.2.8 ttp:profile of the published specification.
- **2. Media Type Registration.** The example: "A+B|C+D|E" states that a TTML processor that implements any one of A+B or C+D or E processor profiles satisfies, at first order, the requirements to fetch and begin decode/processing of a TTML document, where X+Y means that both X and Y processor profiles must be supported, and X|Y means that either X or Y processor profile must be supported.
- **2. Media Type Registration.** Interoperability considerations: The published specification describes processing semantics that dictate behavior that must be followed when dealing with, among other things, unrecognized elements and attributes, both in TTML namespaces and in other namespaces.
- **3. Registration Entry Requirements and Update Process.** Each entry must include a unique identification, where the scope of uniqueness is the set of identifiers defined in this registry.
- **3. Registration Entry Requirements and Update Process.** An identifier must conform with the element non-terminal of [ RFC6381 ] and, furthermore, may not contain any of the characters in the regular expression character class [+|.] .
- **3. Registration Entry Requirements and Update Process.** Each entry must include an absolute URI that serves as the TTML Profile Designator that identifies the processor profile, or that identifies a content profile from which a processor profile can feasibly be inferred using the TTML2 [construct inferred processor profile] algorithm, or that is otherwise defined by the linked specification.
