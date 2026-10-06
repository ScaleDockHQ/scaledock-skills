# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Explainer: Improving Spoken Presentation on the Web

Source: https://www.w3.org/TR/pronunciation-explainer/

The objective of the Pronunciation Task Force is to develop normative specifications and best practices guidance collaborating with other W3C groups as appropriate, to provide for proper pronunciation in HTML content when using text to speech (TTS) synthesis. This document defines a standard mechanism to allow content authors to include spoken presentation guidance in HTML content. Also, it contains two identified approaches and enumerates their advantages and disadvantages.

- **4. Goals.** Define a standard mechanism that enables spoken presentation guidance to be authored in HTML Leverage SSML, if possible, as it is an existing standard that meets all identified requirements, and is supported by many speech synthesis platforms The mechanism must be consumable by assistive technologies such as screen readers
- **6.2 Attribute-based Model of SSML.** This may cause problems for implementers who must parse the JSON values before processing.
- **6.2 Attribute-based Model of SSML.** Implementers must decide how to handle malformed JSON.

## Pronunciation Lexicon Specification (PLS) Version 1.0

Source: https://www.w3.org/TR/pronunciation-lexicon/

This document defines the syntax for specifying pronunciation lexicons to be used by Automatic Speech Recognition and Speech Synthesis engines in voice browser applications.

- **2. Pronunciation Alphabets.** A compliant PLS processor MUST support "ipa" as the value of the alphabet attribute.
- **2. Pronunciation Alphabets.** This means that the PLS processor MUST support the Unicode representations of the phonetic characters developed by the International Phonetic Association [ IPA ].
- **2. Pronunciation Alphabets.** For processors supporting this alphabet, The processor MUST syntactically accept all legal values.
- **2. Pronunciation Alphabets.** The processor SHOULD handle all Unicode IPA codes that can reasonably be considered to belong to the current language.
- **3.1 Document Form.** A legal Pronunciation Lexicon Specification document MUST have a legal XML Prolog from Section 2.8 of either XML 1.0 [ XML10 ] or XML 1.1 [ XML11 ].
- **3.1 Document Form.** The <lexicon> element MUST designate the PLS namespace.
- **3.2 Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **3.2.3 Conforming Pronunciation Lexicon.** Specification Processors A Conforming Pronunciation Lexicon Specification Processor MUST be able to parse and process Conforming Pronunciation Lexicon Specification documents .

## Pronunciation Gap Analysis

Source: https://www.w3.org/TR/pronunciation-gap-analysis/

Editor's note This document was previously merged into the Pronunciation Gap Analysis and Use Cases . The working group now intends to separate it again and continue work on this document independently. This document is the Gap Analysis Review which presents required features of Spoken Text Pronunciation and Presentation and existing standards or specifications that may support (or enable support) of those features. Gaps are defined when a required feature does not have a corresponding method by which it can be authored in HTML.

- **1. Introduction.** The "phonemes" functionality is therefore considered out-of-scope in CSS (the presentation layer) and should be addressed in the markup / content layer.
- **1. Introduction.** It should be noted that many of the required features are not well supported by a single attribute, as most follow the form of a presentation property / value pairing.
- **2.4 Rate / Pitch / Volume.** While end users should have full control over spoken presentation parameters such as speaking rate, pitch, and volume (e.g., WCAG 1.4.2 ), content authors may elect to make adjustments of those parameters to control the spoken presentation for purposes such as a theatrical presentation of a story.
- **2.6 Say As.** For example, the Smarter Balanced Assessment Consortium has developed Read Aloud Guidelines to be followed by human readers used by students who may require a spoken presentation of an educational test, which includes specific examples of how numeric values should be read aloud.
- **2.6.1 Presentation of Numeric Values.** Precise control as to how numeric values should be spoken may not always be correctly determined by text to speech engines from context.
- **2.6.2 Presentation of String Values.** Precise control as to how string values should be spoken, which may not be determined correctly by text to speech synthesizers.
- **3.6.1 HTML.** However, it should not be used simply to apply italic styling; use the CSS font-style property for that purpose.
- **3.7 Say As.** For example, content authors would be able to indicate that a series of four numbers should be spoken as a year rather than a cardinal number.

## Pronunciation Use Cases

Source: https://www.w3.org/TR/pronunciation-use-cases/

Editor's note This document was previously merged into the Pronunciation Gap Analysis and Use Cases . The working group now intends to separate it again and continue work on this document independently. The objective of the Pronunciation Task Force is to develop normative specifications and best practices guidance collaborating with other W3C groups as appropriate, to provide for proper pronunciation in HTML content when using text to speech (TTS) synthesis. This document provides various use cases highlighting the need for standardization of pronunciation markup, to ensure that consistent and accurate representation of the content. The requirements from the user scenarios provide the basis

- **2.4 Implementation Options.** aria-ssml as embedded JSON When AT encounters an element with aria-ssml, the AT should enhance the UI by processing the pronunciation content and passing it to the Web Speech API or an external API (e.g., Google's Text to Speech API ).
- **2.4 Implementation Options.** speak (msg); aria-ssml referencing XML by template ID Example 3 <!-- ssml must appear inside a template to be valid --> < template id = "pecan" > <?xml version= "1.0" ?> < speak version = "1.1" xmlns = "http://www.w3.org/2001/10/synthesis" xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation = "http://www.w3.org/2001/10/synthesis…
- **3.4 Implementation Options.** data-ssml as embedded JSON When an element with data-ssml is encountered by an SSML-aware AT, the AT should enhance the user interface by processing the referenced SSML content and passing it to the Web Speech API or an external API (e.g., Google's Text to Speech API ).
- **3.4 Implementation Options.** Example 10 var msg = new SpeechSynthesisUtterance() ; msg.text = convertJSONtoSSML(element.dataset.ssml) ; speechSynthesis.speak(msg) ; data-ssml referencing XML by template ID Example 11 <!-- ssml must appear inside a template to be valid --> < template id = "pecan" > <?xml version= "1.0" ?> < speak version = "1.1" xmlns = "http://www.w3.org/2001/10/synthesis" xmlns:xsi =…
- **4.4 Implementation Options.** SSML When an element with data-ssml is encountered by an SSML -aware AT, the AT should enhance the user interface by processing the referenced SSML content and passing it to the Web Speech API or an external API (e.g., Google's Text to Speech API ).
- **8.2.1 Educational Assessment.** For test administrators/educators, pronunciations must be consistent across instruction and assessment in order to avoid test bias or impact effects for students.
- **8.2.1 Educational Assessment.** Specific examples include: Mathematical formulas written in simple text with special formatting should convey the correct meaning of the expression to identify changes from normal text to super- or to sub-script text.
- **8.2.1 Educational Assessment.** As a test administrator/educator, pronunciations must be consistent across instruction and assessment, in order to avoid test bias and pronunciation effects on performance for students with disabilities (SWD) in comparison to students without disabilities (SWOD).
