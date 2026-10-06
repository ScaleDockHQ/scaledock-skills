# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## MathML Core

Source: https://www.w3.org/TR/mathml-core/

This specification defines a core subset of Mathematical Markup Language, or MathML, that is suitable for browser implementation. MathML is a markup language for describing mathematical notation and capturing both its structure and content. The goal of MathML is to enable mathematics to be served, received, and processed on the World Wide Web, just as HTML has enabled this functionality for text.

- **G. Conformance.** The key words “ MUST ”, “ MUST NOT ”, “ REQUIRED ”, “ SHALL ”, “ SHALL NOT ”, “ SHOULD ”, “ SHOULD NOT ”, “ RECOMMENDED ”, “ MAY ”, and “ OPTIONAL ” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **G. Conformance.** Advisements are normative sections styled to evoke special attention and are set apart from other normative text with <strong class="advisement"> , like this: UAs MUST provide an accessible alternative.
- **2.1.1 The Top-Level <math> Element.** All other MathML content must be contained in a <math> element.
- **2.1.1 The Top-Level <math> Element.** The <math> element accepts the attributes described in 2.1.3 Global Attributes as well as the following attributes: display alttext The display attribute, if present, must be an ASCII case-insensitive match to block or inline .
- **2.1.1 The Top-Level <math> Element.** Because good mathematical rendering requires use of mathematical fonts, the user agent stylesheet should set the font-family
- **2.1.4 Attributes common to HTML and MathML elements.** The dir attribute, if present, must be an ASCII case-insensitive match to ltr or rtl .
- **2.1.5 Legacy MathML Style Attributes.** The mathcolor and mathbackground attributes, if present, must have a value that is a <color> .
- **2.1.5 Legacy MathML Style Attributes.** The mathsize attribute, if present, must have a value that is a valid <length-percentage> .

## Mathematical Markup Language (MathML) Version 4.0

Source: https://www.w3.org/TR/mathml4/

This specification defines the Mathematical Markup Language, or MathML. MathML is a markup language for describing mathematical notation and capturing both its structure and content. The goal of MathML is to enable mathematics to be served, received, and processed on the World Wide Web, just as [ HTML ] has enabled this functionality for text. This specification of the markup language MathML is intended primarily for a readership consisting of those who will be developing or implementing renderers or editors using it, or software that will communicate using MathML as a protocol for input

- **2.1.2 MathML and Namespaces.** If a MathML expression is likely to be in contexts where it may be parsed by an XML parser or an HTML parser, it SHOULD use the following form to ensure maximum compatibility: < math xmlns = "http://www.w3.org/1998/Math/MathML" > ...
- **5.2 Intent Concept Dictionaries.** Such an AT SHOULD recognize the concepts in the Core list discussed below; it MAY also include concepts in the Open list discussed below, as well as any of its own.
- **5.3 Intent Properties.** For literal or unsupported concept names, the text generated from the function head SHOULD be read as specified in the property.
- **6.7.3 Using annotation-xml in HTML documents.** Documents SHOULD NOT use namespace prefixes and element names containing colon ( : ) as the element nodes produced by the HTML parser have local names containing a colon, which can not be constructed by a namespace aware XML parser.
- **7.3.1 Basic Transfer Flavor Names and Contents.** When transferring MathML, an application MUST ensure the content of the data transfer is a well-formed XML instance of a MathML document type.
- **7.3.1 Basic Transfer Flavor Names and Contents.** Specifically: The instance MAY begin with an XML declaration, e.g., <?xml version="1.0"?> The instance MUST contain exactly one root math element.
- **7.3.1 Basic Transfer Flavor Names and Contents.** The instance MUST declare the MathML namespace on the root math element.
- **7.3.1 Basic Transfer Flavor Names and Contents.** The instance SHOULD use numeric character references (e.g.

## Mathematical Markup Language (MathML) Version 3.0 2nd Edition

Source: https://www.w3.org/TR/MathML3/

This specification defines the Mathematical Markup Language, or MathML. MathML is a markup language for describing mathematical notation and capturing both its structure and content. The goal of MathML is to enable mathematics to be served, received, and processed on the World Wide Web, just as HTML has enabled this functionality for text. This specification of the markup language MathML is intended primarily for a readership consisting of those who will be developing or implementing renderers or editors using it, or software that will communicate using MathML as a protocol for input

- **abstract.** This specification defines the Mathematical Markup Language, or MathML. MathML is a markup language for describing mathematical notation and capturing both its structure and content. The goal of MathML is to enable mathematics to be served, received, and processed on the World Wide Web, just as HTML has enabled this functionality for text. This specification of the markup language MathML is intended primarily for a readership consisting of those who will be developing or implementing renderers or editors using it, or software that will communicate using MathML as a protocol for input
