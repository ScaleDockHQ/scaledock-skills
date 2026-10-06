# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SARIF 2.1.0

Source: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html

https://docs.oasis-open.org/sarif/sarif/v2.1.0/errata01/os/sarif-v2.1.0-errata01-os-complete.docx

- **1.2 Terminology.** The key words �MUST�, �MUST NOT�, �REQUIRED�, �SHALL�, �SHALL NOT�, �SHOULD�, �SHOULD NOT�, �RECOMMENDED�, �NOT RECOMMENDED�, �MAY�, and �OPTIONAL� in this document are to be interpreted as described in � Key words for use in RFCs to Indicate Requirement Levels� [ BCP14 ] [ RFC2119 ] and �Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words� [ RFC8174 ] when, and only when, they appear in…
- **3.1 General.** A SARIF log file SHALL contain a serialization of the SARIF object model into the JSON format.
- **3.1 General.** The top-level value in the log file, representing the sarifLog object, SHALL conform to the JSON object grammar; that is, it SHALL consist of a comma-separated sequence of name/value pairs, enclosed in curly brackets, as specified by JSON [ RFC8259 ].
- **3.1 General.** A SARIF log file SHALL be encoded in UTF-8 [ RFC3629 ].
- **3.2 SARIF file naming convention.** The file name of a SARIF log file SHOULD end with the extension ".sarif" .
- **3.3.2 text property.** If the external artifact is a text artifact, an artifactContent object SHOULD contain a property named text whose value is a string containing the relevant text.
- **3.3.2 text property.** Since SARIF log files are encoded in UTF-8 ([ RFC3629 ]; see �3.1), this means that if the external artifact is a text artifact in any encoding other than UTF-8, the SARIF producer SHALL transcode the text to UTF-8 before assigning it to the text property.
- **3.3.2 text property.** The SARIF producer SHALL escape any characters that JSON [ RFC8259 ] requires to be escaped.
