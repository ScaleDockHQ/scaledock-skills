# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XML Encryption Syntax and Processing Version 1.1

Source: https://www.w3.org/TR/xmlenc-core1/

This document specifies a process for encrypting data and representing the result in XML. The data may be in a variety of formats, including octet streams and other unstructured data, or structured data formats such as XML documents, an XML element, or XML element content. The result of encrypting data is an XML Encryption element that contains or references the cipher data.

- **1.1 Editorial and Conformance Conventions.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this specification are to be interpreted as described in [ RFC2119 ]: "They MUST only be used where it is actually required for interoperation or to limit behavior which has potential for causing harm (e.g., limiting retransmissions)"…
- **1.1 Editorial and Conformance Conventions.** Compliance with the XML-namespace specification [ XML-NAMES ] is described as " REQUIRED ".
- **1.3 Versions, Namespaces, URIs, and Identifiers.** Implementations of this specification MUST use the following XML namespace URIs: URI namespace prefix XML internal entity http://www.w3.org/2001/04/xmlenc# default namespace , xenc: <!ENTITY xenc "http://www.w3.org/2001/04/xmlenc#"> http://www.w3.org/2009/xmlenc11# xenc11: <!ENTITY xenc11 "http://www.w3.org/2009/xmlenc11#"> The http://www.w3.org/2001/04/xmlenc# ( xenc: ) namespace was introduced…
- **2.1.4 Encrypting Arbitrary Data and XML Documents.** xml version = "1.0" ?> <EncryptedData xmlns = "http://www.w3.org/2001/04/xmlenc#" MimeType = "text/xml" > <CipherData> <CipherValue> A23B45C56 </CipherValue> </CipherData> </EncryptedData> Where appropriate, such as in the case of encrypting an entire EXI stream, the Type attribute SHOULD be provided and indicate the use of EXI.
- **3. Encryption Syntax.** Features described in this section MUST be implemented unless otherwise noted.
- **3.1 The EncryptedType Element.** Implementations MUST generate laxly schema valid [ XMLSCHEMA-1 ], [ XMLSCHEMA-2 ] EncryptedData or EncryptedKey elements as specified by the subsequent schema declarations.
- **3.1 The EncryptedType Element.** (Note the laxly schema valid generation means that the content permitted by xsd:ANY need not be valid.) Implementations SHOULD create these XML structures ( EncryptedType elements and their descendants/content) in Normalization Form C [ NFC ].
- **3.2 The EncryptionMethod Element.** (We rely upon the ANY schema construct because it is not possible to specify element content based on the value of an attribute.) The presence of any child element under EncryptionMethod that is not permitted by the algorithm or the presence of a KeySize child inconsistent with the algorithm MUST be treated as an error.
