# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Scalable Vector Graphics (SVG) 2

Source: https://www.w3.org/TR/SVG2/

This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 2. SVG is a language based on XML for describing two-dimensional vector and mixed vector/raster graphics. SVG content is stylable, scalable to different display resolutions, and can be viewed stand-alone, mixed with HTML content, or embedded using XML namespaces within other XML languages. SVG also supports dynamic changes; script can be used to create interactive documents, and animations can be performed using declarative animation features or by using script.

- **abstract.** This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 2. SVG is a language based on XML for describing two-dimensional vector and mixed vector/raster graphics. SVG content is stylable, scalable to different display resolutions, and can be viewed stand-alone, mixed with HTML content, or embedded using XML namespaces within other XML languages. SVG also supports dynamic changes; script can be used to create interactive documents, and animations can be performed using declarative animation features or by using script.

## Scalable Vector Graphics (SVG) 1.1 (Second Edition)

Source: https://www.w3.org/TR/SVG11/

This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 1.1, a modularized language for describing two-dimensional vector and mixed vector/raster graphics in XML.

- **abstract.** This specification defines the features and syntax for Scalable Vector Graphics (SVG) Version 1.1, a modularized language for describing two-dimensional vector and mixed vector/raster graphics in XML.

## SVG Accessibility API Mappings Level 1.0

Source: https://www.w3.org/TR/svg-aam-1.0/

SVG Accessibility API Mappings ( SVG -AAM) defines how user agents map Scalable Vector Graphics ( SVG ) [ SVG2 ] markup to platform accessibility application programming interfaces ( APIs ) . It is intended for SVG user agent developers responsible for SVG accessibility in their user agent. This specification allows SVG authors to create accessible rich internet applications, including charts, graphs, and other drawings. It does this by extending the Core Accessibility API Mappings 1.1 (CORE-AAM) [ CORE-AAM ] and the Accessible Name and Description: Computation and API Mappings 1.1 (ACCNAME-AAM) [ ACCNAME-AAM ] specifications for user agents. It leverages those core mappings and provides SVG

- **2. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1 Normative User Agent Implementation Requirements for SVG.** The keywords MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , RECOMMENDED , MAY , and OPTIONAL in this document are to be interpreted as described in Keywords for use in RFCs to indicate requirement levels [ rfc2119 ].
- **3. Supporting Keyboard Navigation.** Conforming user agents MUST conform to Supporting Keyboard Navigation requirements in the Core Accessibility API Mappings [ CORE-AAM ].
- **4.1 General rules for exposing WAI-ARIA semantics.** SVG user agents MUST conform to General rules for exposing WAI-ARIA semantics in the Core Accessibility API Mappings [ CORE-AAM ], with the additions described in the following sub-sections.
- **4.1.1 Excluding Elements from the Accessibility Tree.** User agents MUST NOT include any elements, or their descendant content, as an accessible object in the accessibility tree that are indicated as no accessible object created in the SVG Element Mapping Tables .
- **4.1.1 Excluding Elements from the Accessibility Tree.** User agents SHOULD also exclude any other element defined by past or future SVG specifications or modules that specifically indicate the element is never directly rendered .
- **4.1.1 Excluding Elements from the Accessibility Tree.** SVG user agents MUST NOT expose to accessibility APIs any elements that are not rendered because of conditional processing attributes on that element or because of the position of that element within a switch construct.
- **4.1.1 Excluding Elements from the Accessibility Tree.** The switch element itself SHOULD be omitted as if it had a role of none or presentation .
