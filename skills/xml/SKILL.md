---
name: xml
description: >-
  XML: The Extensible Markup Language (XML) is a subset of SGML that is completely described in this document. Covers Extensible Markup Language (XML) 1.0 (Fifth Edition), Namespaces in XML 1.0 (Third Edition), XML Inclusions (XInclude) Version 1.0 (Second Edition), XML Base (Second Edition), XML Entity Definitions for Characters (3rd Edition). Use when parsing or producing XML. Triggers: XML, XML namespaces, XInclude.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# XML

The Extensible Markup Language (XML) is a subset of SGML that is completely described in this document. Its goal is to enable generic SGML to be served, received, and processed on the Web in the way that is now possible with HTML. XML has been designed for ease of implementation and for interoperability with both SGML and HTML.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when parsing or producing XML.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Extensible Markup Language (XML) 1.0 (Fifth Edition) (default); Extensible Markup Language (XML) 1.1 (Second Edition) (legacy: read and upgrade, never author); Namespaces in XML 1.0 (Third Edition) (default); Namespaces in XML 1.1 (Second Edition) (legacy: read and upgrade, never author); XML Inclusions (XInclude) Version 1.0 (Second Edition) (default); XML Base (Second Edition) (default); XML Entity Definitions for Characters (3rd Edition) (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.2 Terminology.** "The key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL , when EMPHASIZED , are to be interpreted as described in [IETF RFC 2119] ."
2. **1.2 Terminology.** "Unless otherwise specified, failure to observe a prescription of this specification indicated by one of the keywords MUST , REQUIRED , MUST NOT , SHALL and SHALL NOT is an error."
3. **1.2 Terminology.** "Conforming software MAY detect and report an error and MAY recover from it.] fatal error [ Definition : An error which a conforming XML processor MUST detect and report to the application."
4. **1.2 Terminology.** "Once a fatal error is detected, however, the processor MUST NOT continue normal processing (i.e., it MUST NOT continue to pass character data and information about the document's logical structure to the application in the normal way).] at user option [ Definition : Conforming software MAY or MUST (depending on the modal verb in the sentence) behave as described; if it does, it MUST provide users…"
5. **1.2 Terminology.** "Violations of validity constraints are errors; they MUST , at user option, be reported by validating XML processors .] well-formedness constraint [ Definition : A rule which applies to all well-formed XML documents."
6. **2 Documents.** "The logical and physical structures MUST nest properly, as described in 4.3.2 Well-Formed Parsed Entities ."
7. **2.2 Characters.** "Consequently, XML processors MUST accept any character in the range specified for Char ."
8. **Character Range.** "All XML processors MUST accept the UTF-8 and UTF-16 encodings of Unicode [Unicode] ; the mechanisms for signaling which of the two is in use, or for bringing other encodings into play, are discussed later, in 4.3.3 Character Encoding in Entities ."

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

- [Extensible Markup Language (XML) 1.0 (Fifth Edition)](https://www.w3.org/TR/xml/): Recommendation, xml REC-xml-20081126 (Recommendation, 2008-11-26), checked 2026-10-06.
- [Extensible Markup Language (XML) 1.1 (Second Edition)](https://www.w3.org/TR/xml11/): Recommendation, xml11 REC-xml11-20040204 (Recommendation, 2006-08-16), checked 2026-10-06.
- [Namespaces in XML 1.0 (Third Edition)](https://www.w3.org/TR/xml-names/): Recommendation, xml-names REC-xml-names-20091208 (Recommendation, 2009-12-08), checked 2026-10-06.
- [Namespaces in XML 1.1 (Second Edition)](https://www.w3.org/TR/xml-names11/): Recommendation, xml-names11 PER-xml-names11-20060614 (Recommendation, 2006-08-16), checked 2026-10-06.
- [XML Inclusions (XInclude) Version 1.0 (Second Edition)](https://www.w3.org/TR/xinclude/): Recommendation, xinclude REC-xinclude-20061115 (Recommendation, 2006-11-15), checked 2026-10-06.
- [XML Base (Second Edition)](https://www.w3.org/TR/xmlbase/): Recommendation, xmlbase REC-xmlbase-20090128 (Recommendation, 2009-01-28), checked 2026-10-06.
- [XML Entity Definitions for Characters (3rd Edition)](https://www.w3.org/TR/xml-entity-names/): Recommendation, xml-entity-names REC-xml-entity-names-20230307 (Recommendation, 2023-03-07), checked 2026-10-06.
