# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## EPUB 3.3

Source: https://www.w3.org/TR/epub-33/

EPUB® 3 defines a distribution and interchange format for digital publications and documents. The EPUB format provides a means of representing, packaging, and encoding structured and semantically enhanced web content — including HTML, CSS, SVG, and other resources — for distribution in a single-file container. This specification defines the authoring requirements for EPUB publications and represents the third major revision of the standard.

- **1.5 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. EPUB publication conformance.** An EPUB publication : MUST define at least one rendering of its content as follows: MUST contain a package document that conforms to 5.
- **2. EPUB publication conformance.** MUST contain an EPUB navigation document that conforms to 7.
- **2. EPUB publication conformance.** SHOULD conform to the accessibility requirements defined in [ epub-a11y-11 ].
- **2. EPUB publication conformance.** MUST be packaged in an EPUB container as defined in 4.
- **2. EPUB publication conformance.** In addition, all publication resources MUST adhere to the requirements in 3.
- **2.1 Conformance checking.** When verifying their EPUB publications, EPUB creators should ensure they do not violate the requirements of this specification (practices identified by the keywords " MUST ", " MUST NOT ", and " REQUIRED ").
- **2.1 Conformance checking.** EPUB creators should also ensure that their EPUB publications do not violate the recommendations of this specification (practices identified by the keywords " SHOULD ", " SHOULD NOT ", and " RECOMMENDED ").

## EPUB 3.4

Source: https://www.w3.org/TR/epub-34/

EPUB® 3 defines a distribution and interchange format for digital publications and documents. The EPUB format provides a means of representing, packaging, and encoding structured and semantically enhanced web content — including HTML, CSS, SVG, and other resources — for distribution in a single-file container. This specification defines the authoring requirements for EPUB publications — works of intellectual or artistic content that are represented by a set of interrelated resources and packaged for distribution in a specialized ZIP container.

- **1.5 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. EPUB publication conformance.** An EPUB publication : MUST define at least one rendering of its content as follows: MUST contain a package document that conforms to 5.
- **2. EPUB publication conformance.** MUST contain an EPUB navigation document that conforms to 8.
- **2. EPUB publication conformance.** SHOULD conform to the accessibility requirements defined in [ epub-a11y-12 ].
- **2. EPUB publication conformance.** MUST be packaged in an EPUB container as defined in 4.
- **2. EPUB publication conformance.** In addition, all publication resources MUST adhere to the requirements in 3.
- **2.1 Conformance checking.** When verifying EPUB publications, ensure that they do not violate the requirements of this specification (practices identified by the keywords " MUST ", " MUST NOT ", and " REQUIRED ").
- **2.1 Conformance checking.** Also ensure that EPUB publications do not violate the recommendations of this specification (practices identified by the keywords " SHOULD ", " SHOULD NOT ", and " RECOMMENDED ").

## EPUB Reading Systems 3.3

Source: https://www.w3.org/TR/epub-rs-33/

EPUB® 3 defines a distribution and interchange format for digital publications and documents. The EPUB format provides a means of representing, packaging, and encoding structured and semantically enhanced web content — including HTML, CSS, SVG and other resources — for distribution in a single-file container. This specification defines the conformance requirements for EPUB 3 reading systems — the user agents that render EPUB publications.

- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1 Requirements.** To be conformant with this specification, reading systems MUST support all required features as well as all applicable conditionally-required features (e.g., to support image rendering if the reading system has a viewport ) as defined in their respective sections.
- **2.1 Requirements.** When supporting recommended and optional features, reading systems MUST meet all normative requirements as defined in their respective sections.
- **2.1 Requirements.** Reading systems MUST meet these alternative requirements when not supporting a feature.
- **3. Publication resource processing.** Reading systems MUST process publication resources [ epub-33 ].
- **3.1 Core Media types.** If a reading system has a viewport , it MUST support the image core media type resources [ epub-33 ].
- **3.1 Core Media types.** If it has the capability to render prerecorded audio, it MUST support the audio core media type resources [ epub-33 ].
- **3.2 Foreign resources.** Reading systems MAY support an arbitrary set of foreign resource types, and if a foreign resource is not supported, MUST process fallbacks as defined in foreign resources [ epub-33 ].

## EPUB Reading Systems 3.4

Source: https://www.w3.org/TR/epub-rs-34/

EPUB® 3 defines a distribution and interchange format for digital publications and documents. The EPUB format provides a means of representing, packaging, and encoding structured and semantically enhanced web content — including HTML, CSS, SVG and other resources — for distribution in a single-file container. This specification defines the conformance requirements for EPUB 3 reading systems — the user agents that render EPUB publications.

- **1.3 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1 Requirements.** To be conformant with this specification, reading systems MUST support all required features as well as all applicable conditionally-required features (e.g., to support image rendering if the reading system has a viewport ) as defined in their respective sections.
- **2.1 Requirements.** When supporting recommended and optional features, reading systems MUST meet all normative requirements as defined in their respective sections.
- **2.1 Requirements.** Reading systems MUST meet these alternative requirements when not supporting a feature.
- **3. Publication resource processing.** Reading systems MUST process publication resources [ epub-34 ].
- **3.1 Core Media types.** If a reading system has a viewport , it MUST support the image core media type resources [ epub-34 ].
- **3.1 Core Media types.** If it has the capability to render prerecorded audio, it MUST support the audio core media type resources [ epub-34 ].
- **3.3 Manifest fallbacks.** For foreign content documents , if a reading system does not support the resource's MIME media type, it MUST traverse the resource's manifest fallback chain [ epub-34 ] until it identifies a supported publication resource to use in place of the unsupported resource.

## EPUB Accessibility 1.1

Source: https://www.w3.org/TR/epub-a11y-11/

This specification specifies content conformance requirements for verifying the accessibility of EPUB® Publications. It also specifies accessibility metadata requirements for the discoverability of EPUB publications.

- **1.5 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.2 Package metadata.** All EPUB publications MUST include [ schema-org ] accessibility metadata in the package document that exposes their accessible properties, regardless of whether the publications also meet the accessibility or optimization requirements.
- **2.2 Package metadata.** EPUB publications MUST include the following accessibility metadata: accessMode — a human sensory perceptual system or cognitive faculty necessary to process or perceive the content (e.g., textual, visual, auditory, tactile).
- **2.2 Package metadata.** EPUB publications SHOULD include the following [ schema-org ] accessibility metadata: accessibilitySummary — a human-readable summary of the accessibility that complements, but does not duplicate, the other discoverability metadata.
- **3.3.1 WCAG conformance requirements.** To conform to this specification, an EPUB publication : MUST , at the minimum, meet the requirements of WCAG 2.0 [ wcag20 ], but it is strongly recommended that it meet the requirements of the latest recommended version of WCAG 2 .
- **3.3.1 WCAG conformance requirements.** MUST , for whichever version of WCAG 2 selected, meet the requirements of Level A , but it is strongly recommended that it meet the requirements of Level AA .
- **3.3.2.1 Page and publication.** Rather, EPUB creators MUST evaluate their accessibility as part of the larger work.
- **3.3.2.1 Page and publication.** EPUB creators MUST evaluate the WCAG guidelines for content to be perceivable, operable, understandable, and robust against the full EPUB publication, not only against each EPUB content document within it.

## EPUB Accessibility 1.2

Source: https://www.w3.org/TR/epub-a11y-12/

This specification specifies content conformance requirements for verifying the accessibility of EPUB® Publications. It also specifies accessibility metadata requirements for the discoverability of EPUB publications.

- **1.6 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.2 Package metadata.** All EPUB publications MUST include [ schema-org ] accessibility metadata in the package document that exposes their accessible properties, regardless of whether the publications also meet the accessibility or optimization requirements.
- **2.2 Package metadata.** EPUB publications MUST include the following accessibility metadata: accessModeSufficient — a set of one or more access modes sufficient to consume the content without significant loss of information.
- **2.2 Package metadata.** EPUB publications SHOULD include the following [ schema-org ] accessibility metadata: accessMode — a human sensory perceptual system or cognitive faculty necessary to process or perceive the content (e.g., textual, visual, auditory, tactile).
- **3.3.1 WCAG conformance requirements.** To conform to this specification, an EPUB publication : MUST , at the minimum, meet the requirements of WCAG 2.0 [ wcag20 ], but it is strongly RECOMMENDED that it meet the requirements of the latest W3C Recommendation of WCAG 2 .
- **3.3.1 WCAG conformance requirements.** MUST , for whichever version of WCAG 2 selected, meet the requirements of Level A , but it is strongly RECOMMENDED that it meet the requirements of Level AA .
- **3.3.2.1 Page and publication.** Rather, the full EPUB publication MUST be evaluated against the WCAG guidelines for content to be perceivable, operable, understandable, and robust.
- **3.3.2.2 Applying the conformance criteria.** When evaluating an EPUB publication , the WCAG conformance criteria [ wcag2 ] are applied as follows: When determining compliance with a conformance level, the whole EPUB publication MUST meet the conformance requirements of the level claimed.

## EPUB Accessibility Techniques 1.1

Source: https://www.w3.org/TR/epub-a11y-tech-11/

EPUB Accessibility Techniques defines discovery and content accessibility requirements for EPUB® Publications.

- **1.1 Overview.** An EPUB publication must meet all the requirements of EPUB Accessibility 1.1 to make a claim of accessibility.
- **2. About the techniques.** As a result, this document should not be read as providing prescriptive requirements.
- **3.2 Identify sufficient access modes.** EPUB creators can set this value for EPUB publications that conform to Level A [ wcag2 ] or higher, for example, as there must be textual alternatives for non-text content to meet these thresholds.
- **3.2 Identify sufficient access modes.** When adding a schema:accessModeSufficient property with only a single value, all information in the publication must be available in that mode.
- **3.3 Setting access modes for synchronized text-audio.** Consequently, the EPUB creator would declare a schema:accessModeSufficient property with the value auditory : < meta property = "schema:accessModeSufficient" > auditory </ meta > Note When media overlays are present, EPUB creators should not add " auditory " to all the possible sufficient access modes just because it is possible to turn on text-audio playback.
- **3.4 Identify accessibility features.** Authors must indicate at least one feature that is not one of these values to claim conformance to EPUB Accessibility 1.1 [ epub-a11y-11 ].
- **3.5 Identify accessibility hazards.** This value should be used sparingly, however, as it is of no value to users.
- **3.5 Identify accessibility hazards.** EPUB creators should make every effort to determine if hazards are present.

## EPUB 3 Multiple-Rendition Publications 1.1

Source: https://www.w3.org/TR/epub-multi-rend-11/

This specification, EPUB Multiple-Rendition Publications, defines the creation and rendering of EPUB® Publications consisting of more than one rendition.

- **1.5 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Specifying multiple renditions.** Each rendition of an EPUB publication MUST meet the requirements for EPUB publications [ epub-33 ].
- **2. Specifying multiple renditions.** The package document for each rendition MUST be listed in the container.xml file [ epub-33 ], where the first package document listed represents the default rendition .
- **3.2.1 The metadata.xml file.** To ensure consistency of metadata at the Publication and rendition levels, this specification defines the content model of the root metadata element in the metadata.xml file [ epub-33 ] to be the same as the package document metadata element [ epub-33 ], with the following differences in syntax and semantics: A dc:identifier element [ dcterms ] MUST contain the unique identifier [ epub-33 ] for the EPUB publication.
- **3.2.1 The metadata.xml file.** A meta element [ epub-33 ] MUST contain the last modified date, expressed using the dcterms:modified property [ dcterms ].
- **3.2.1 The metadata.xml file.** The value of the property MUST conform to the pattern and rules defined in Last modified date [ epub-33 ].
- **3.2.1.1 Resource obfuscation.** Consequently, EPUB creators MUST use the unique identifier of the default rendition as the obfuscation key for all resources in a multiple-rendition publication .
- **3.2.1.1 Resource obfuscation.** Similarly, reading systems MUST use this unique identifier of the default rendition to de-obfuscate all resources in a multiple-rendition publication.

## EPUB Accessibility - EU Accessibility Act Mapping

Source: https://www.w3.org/TR/epub-a11y-eaa-mapping/

The European Accessibility Act (EAA) is an EU directive that establishes accessibility requirements for different types of products and services. It aims to strengthen the rights of people with disabilities by providing access to products and services, including e-books, dedicated e-reading devices and software, digital rights management software, and e-commerce. The EAA was enacted on 27 June 2019 to be forced from 28 June 2025. This note aims to demonstrate that EPUB® standard meets all the technical requirements related to e-books, as defined by the EAA. The methodology used is mapping the requirements of the EAA related to e-books to the EPUB Accessibility 1.1 specification.

- **1. How EPUB addresses all EAA requirements.** EPUB Accessibility 1.1 also defines the official accessibility criteria that EPUBs must adhere to, to claim conformance to the standard.
- **1. How EPUB addresses all EAA requirements.** Although it is technically possible to produce Fixed Layout publications with a good level of accessibility, it should be kept in mind that some accessibility requirements cannot be met.
