# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Emotion Markup Language (EmotionML) 1.0

Source: https://www.w3.org/TR/emotionml/

As the Web is becoming ubiquitous, interactive, and multimodal, technology needs to deal increasingly with human factors, including emotions. The specification of Emotion Markup Language 1.0 aims to strike a balance between practical applicability and scientific well-foundedness. The language is conceived as a "plug-in" language suitable for use in three different areas: (1) manual annotation of data; (2) automatic recognition of emotion-related states from user behavior; and (3) generation of emotion-related system behavior.

- **Conventions of this document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **2.1.1 Document root: The <emotionml>.** Documents using this specification MUST use 1.0 for the value.
- **2.1.1 Document root: The <emotionml>.** The attribute MUST be of type xsd:anyURI and MUST refer to the ID of a <vocabulary> element defining an emotion vocabulary with type="category" , as specified in Defining vocabularies for representing emotions .
- **2.1.1 Document root: The <emotionml>.** The attribute MUST be of type xsd:anyURI and MUST refer to the ID of a <vocabulary> element defining an emotion vocabulary with type="dimension" , as specified in Defining vocabularies for representing emotions .
- **2.1.1 Document root: The <emotionml>.** The attribute MUST be of type xsd:anyURI and MUST refer to the ID of a <vocabulary> element defining an emotion vocabulary with type="appraisal" , as specified in Defining vocabularies for representing emotions .
- **2.1.1 Document root: The <emotionml>.** The attribute MUST be of type xsd:anyURI and MUST refer to the ID of a <vocabulary> element defining an emotion vocabulary with type="action-tendency" , as specified in Defining vocabularies for representing emotions .
- **2.1.1 Document root: The <emotionml>.** The root element of a standalone EmotionML document MUST be <emotionml> .
- **2.1.1 Document root: The <emotionml>.** The <emotionml> element MUST define the EmotionML namespace : 'http://www.w3.org/2009/10/emotionml'.
