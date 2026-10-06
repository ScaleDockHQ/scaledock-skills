---
name: xml-schema
description: >-
  XML Schema: This document specifies the XML Schema Definition Language, which offers facilities for describing the structure and constraining the contents of XML documents, including those which exploit the XML Namespace facility. Covers W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures, W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes. Use when validating XML with XSD. Triggers: XSD, XML Schema.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# XML Schema

This document specifies the XML Schema Definition Language, which offers facilities for describing the structure and constraining the contents of XML documents, including those which exploit the XML Namespace facility. The schema language, which is itself represented in an XML vocabulary and uses namespaces, substantially reconstructs and considerably extends the capabilities found in XML document type definitions (DTDs). This specification depends on XML Schema Definition Language 1.1 Part 2: Datatypes .

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when validating XML with XSD.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures (default); XML Schema Part 1: Structures Second Edition (legacy: read and upgrade, never author); W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes (default); XML Schema Part 2: Datatypes Second Edition (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **G.1.15 Schema composition.** "Schema processors are now explicitly recommended to provide a user option to control whether the processor attempts to dereference schema locations indicated in schemaLocation attributes in the instance document being validated; this resolves issue 5476 xsi:schemaLocation should be a hint, should be MAY not SHOULD ."
2. **1.1 Introduction to Version 1.1.** "The Working Group's strategic guidelines for changes between versions 1.0 and 1.1 can be summarized as follows: Support for versioning (acknowledging that this may be slightly disruptive to the XML transfer syntax at the margins) Support for co-occurrence constraints (which will certainly involve additions to the XML transfer syntax, which will not be understood by 1.0 processors) Bug fixes…"
3. **1.3.1.1 The Schema Namespace ( xs ).** "Users of the namespaces defined here should be aware, as a matter of namespace policy, that more names in this namespace may be given definitions in future versions of this or other specifications."
4. **1.3.2 Namespaces with Special Status.** "Except as otherwise specified elsewhere in this specification, if components are · present · in a schema, or source declarations are included in an XSD schema document, for components in any of the following namespaces, then the components, or the declarations, should agree with the descriptions given in the relevant specifications and with the declarations given in any applicable XSD schema…"
5. **1.3.2 Namespaces with Special Status.** "Users who have an interest in such specialized processing should be aware of the attending interoperability problems and should exercise caution."
6. **1.3.2 Namespaces with Special Status.** "Components and source declarations must not specify http://www.w3.org/2000/xmlns/ as their target namespace."
7. **1.4 Dependencies on Other Specifications.** "If both are supported, the choice of which datatypes to use in a particular assessment episode should be under user control."
8. **1.4 Dependencies on Other Specifications.** "It should be noted however that the XML version number is not required to be present in the input to an assessment episode, and in any case the heuristic should be subject to override by users, to support cases where users wish to accept XML 1.1 input but validate it using the 1.0 datatypes, or accept XML 1.0 input and validate it using the 1.1 datatypes."

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

- [W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures](https://www.w3.org/TR/xmlschema11-1/): Recommendation, xmlschema11-1 REC-xmlschema11-1-20120405 (Recommendation, 2012-04-05), checked 2026-10-06.
- [XML Schema Part 1: Structures Second Edition](https://www.w3.org/TR/xmlschema-1/): Recommendation, xmlschema-1 REC-xmlschema-1-20041028 (Recommendation, 2004-10-28), checked 2026-10-06.
- [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/): Recommendation, xmlschema11-2 REC-xmlschema11-2-20120405 (Recommendation, 2012-04-05), checked 2026-10-06.
- [XML Schema Part 2: Datatypes Second Edition](https://www.w3.org/TR/xmlschema-2/): Recommendation, xmlschema-2 REC-xmlschema-2-20041028 (Recommendation, 2004-10-28), checked 2026-10-06.
