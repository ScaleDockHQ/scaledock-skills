# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WAI-Adapt: Symbols Module Level 1.0

Source: https://www.w3.org/TR/adapt-symbols/

This specification provides web content authors a standard approach to support web users with various cognitive and learning disabilities who: Customarily communicate using symbolic languages generally known as Augmentative and Alternative Communications ( AAC ); Need more familiar icons (and other graphical symbols) in order to comprehend page content; The technology described in this specification is intended to be used to programmatically transform the appearance of typical web content including form controls, icons, and other user interface elements into a rendering incorporating an individual user's preferred AAC symbols. The W3C Augmentative and Alternative Communication ( AAC ) Symbol

- **3. Conformance.** The key words MAY and MUST in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1.1 Description.** The numeric values utilized to map to symbols MUST be published BCI index values.
- **1.3.2 Values.** In the case of conflict between an element's semantics and the attribute values, validation algorithms should issue a warning but not an error.
- **3. Conformance.** There is no requirement that all content must be marked with adapt-symbol index values, and there is no minimum.
- **4.1.1 Description.** In such situations content authors should join multiple BCI index values in order to map to a single conjugated symbol by using a plus ( + ) sign (with no spaces between the BCI index values).
- **4.1.1 Description.** The order of multiple concepts should be the same as used in typical speech in the natural language of the content.
- **4.1.1 Description.** Authors should not assume that one index value maps to one symbol—though authors should not need to make any assumptions about rendering, other than ensuring their content can be resized and will reflow, as per WCAG 2.1 Success Criteria 1.4.4 Resize Text and 1.4.10 Reflow .
- **5. Privacy and Security Considerations.** This specification adds context information about content to the document, and should not affect security.

## WAI-Adapt: Help and Support Module Level 1.0

Source: https://www.w3.org/TR/adapt-help/

This specification provides web content authors a standard approach to support web users who are persons with various cognitive and learning disabilities, including users who require: tooltips or similar on-demand help or clues; unambiguous (non-idiomatic) language that users can understand; critical numeric information in an alternative format that users can understand. This WAI-Adapt: Help and Support Module is a component of the WAI-Adapt series introduced in the WAI-Adapt Explainer document [ adapt ].

- **1.2 WAI-Adapt: Help and Support Module.** Therefore, critical numeric information must be provided in an alternative format that the user can understand.
- **1.3.2 Values.** In the case of conflict between an element's semantics and the attribute values, validation algorithms should issue a warning but not an error.
- **3.1.3 Values for types of help.** simplified Propose this should be easylang rather than simplified.
- **4.2.1.1 Description.** A user agent must be able to replace the non literal content with the literal alternative without loss of meaning.
- **4.2.2.1 Description.** The content must still be understandable when a user agent replaces the original content with the number free alternative.
- **4.2.3.1 Description.** The content must still be understandable when a user agent replaces the original content with the simpler alternative.
- **4.2.3.1 Description.** Supported values: String text Where easylang should use as simple well-known words as possible, and active voicing, literal text, small simple sentences.
- **4.2.3.1 Description.** Acronyms and abbreviations should be avoided, unless they are the common way to refer to an item.

## WAI-Adapt: Tools Module Level 1.0

Source: https://www.w3.org/TR/adapt-tools/

This specification provides web content authors a standard approach to support web users who are persons with various cognitive and learning disabilities, including users who: may get overwhelmed with the volume of on-screen messages, and wishes to filter out low priority messages and concentrate on critical priority messages; need to remember completed tasks in order to identify their location in a process. The technology described in this specification is intended to be used to programmatically transform the appearance of typical web content including form controls, icons, and other user interface elements into a rendering more familiar and comprehensible to an individual user. Use cases a

- **1.3.2 Values.** In the case of conflict between an element's semantics and the attribute values, validation algorithms should issue a warning but not an error.
- **3.1.1.1 Description.** The stepindicator defined values should be used whenever there is a sequence of tasks that the user is required to complete, so that users who have memory issues can keep track of the steps previously completed.
- **4. Privacy and Security Considerations.** This specification adds context information about content to the document, and should not affect security.

## WAI-Adapt Explainer

Source: https://www.w3.org/TR/adapt/

People have very different needs. There are many people with cognitive and learning disabilities that affect their ability to interact with the web. Some people cannot process numeric information (dyscalculia), but others understand numbers better than words. Some people with severe language disabilities use symbols to represent words; some people need (or want) simplified user-interfaces. Different people find different layouts and types of content easier to understand, and what is useable and understandable by one person can be be too complex for another. The WAI-Adapt Task Force seeks to address these varied and conflicting user needs, so that content can be made more understandable to in

- **1.2.2 Difficulty Understanding Numbers.** Therefore, critical numeric information must be provided in an alternative format that the user can understand.
- **1.2.5 Working Memory and Short-term Memory Impairment.** Example: Many processes consist of a sequence of separate steps or actions which must be performed by a user to complete a process or workflow.
- **1.2.5 Working Memory and Short-term Memory Impairment.** In addition, a user must be able to navigate to completed tasks to make modifications or corrections.
- **3.2 Values.** In the case of conflict between an element's semantics and the attribute values, validation algorithms should issue a warning but not an error.

## Requirements for WAI-Adapt specification

Source: https://www.w3.org/TR/adapt-requirements/

Requirements for WAI-Adapt specification

- **2.1 Familiar Terms and Symbols.** Common concepts used in controls should be machine understandable so the user agent or script should understand the context of links, buttons, and fields and other page elements so that symbols and text is displayed in a way each user understands.
- **2.4 Importance identification.** There must be a mechanism to identify and differentiate the features included in web content based on its importance (e.g.
- **2.9 Step Indicator.** Support to users must be able to track completed tasks in order to identify their location in a process.
- **2.9 Step Indicator.** In addition, a user must be able to navigate to completed tasks to make modifications or corrections.
