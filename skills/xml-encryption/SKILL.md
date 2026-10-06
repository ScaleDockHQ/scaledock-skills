---
name: xml-encryption
description: >-
  XML Encryption: This document specifies a process for encrypting data and representing the result in XML. Covers XML Encryption Syntax and Processing Version 1.1. Use when encrypting XML. Triggers: XML Encryption.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# XML Encryption

This document specifies a process for encrypting data and representing the result in XML. The data may be in a variety of formats, including octet streams and other unstructured data, or structured data formats such as XML documents, an XML element, or XML element content. The result of encrypting data is an XML Encryption element that contains or references the cipher data.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when encrypting XML.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: XML Encryption Syntax and Processing Version 1.1 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.1 Editorial and Conformance Conventions.** "The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this specification are to be interpreted as described in [ RFC2119 ]: "They MUST only be used where it is actually required for interoperation or to limit behavior which has potential for causing harm (e.g., limiting retransmissions)"…"
2. **1.1 Editorial and Conformance Conventions.** "Compliance with the XML-namespace specification [ XML-NAMES ] is described as " REQUIRED "."
3. **1.3 Versions, Namespaces, URIs, and Identifiers.** "Implementations of this specification MUST use the following XML namespace URIs: URI namespace prefix XML internal entity http://www.w3.org/2001/04/xmlenc# default namespace , xenc: <!ENTITY xenc "http://www.w3.org/2001/04/xmlenc#"> http://www.w3.org/2009/xmlenc11# xenc11: <!ENTITY xenc11 "http://www.w3.org/2009/xmlenc11#"> The http://www.w3.org/2001/04/xmlenc# ( xenc: ) namespace was introduced…"
4. **2.1.4 Encrypting Arbitrary Data and XML Documents.** "xml version = "1.0" ?> <EncryptedData xmlns = "http://www.w3.org/2001/04/xmlenc#" MimeType = "text/xml" > <CipherData> <CipherValue> A23B45C56 </CipherValue> </CipherData> </EncryptedData> Where appropriate, such as in the case of encrypting an entire EXI stream, the Type attribute SHOULD be provided and indicate the use of EXI."
5. **3. Encryption Syntax.** "Features described in this section MUST be implemented unless otherwise noted."
6. **3.1 The EncryptedType Element.** "Implementations MUST generate laxly schema valid [ XMLSCHEMA-1 ], [ XMLSCHEMA-2 ] EncryptedData or EncryptedKey elements as specified by the subsequent schema declarations."
7. **3.1 The EncryptedType Element.** "(Note the laxly schema valid generation means that the content permitted by xsd:ANY need not be valid.) Implementations SHOULD create these XML structures ( EncryptedType elements and their descendants/content) in Normalization Form C [ NFC ]."
8. **3.2 The EncryptionMethod Element.** "(We rely upon the ANY schema construct because it is not possible to specify element content based on the value of an attribute.) The presence of any child element under EncryptionMethod that is not permitted by the algorithm or the presence of a KeySize child inconsistent with the algorithm MUST be treated as an error."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [XML Encryption Syntax and Processing Version 1.1](https://www.w3.org/TR/xmlenc-core1/): Recommendation, xmlenc-core1 REC-xmlenc-core1-20130411 (Recommendation, 2013-04-11), checked 2026-10-06.
