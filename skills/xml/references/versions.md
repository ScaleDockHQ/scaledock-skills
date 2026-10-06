# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                 | Line                                                   | Status  | Revision                                                                    | Posture | Publisher                 |
| ------------------ | ------------------------------------------------------ | ------- | --------------------------------------------------------------------------- | ------- | ------------------------- |
| `xml`              | Extensible Markup Language (XML) 1.0 (Fifth Edition)   | current | xml REC-xml-20081126 (Recommendation, 2008-11-26)                           |         | Recommendation 2008-11-26 |
| `xml11`            | Extensible Markup Language (XML) 1.1 (Second Edition)  | legacy  | xml11 REC-xml11-20040204 (Recommendation, 2006-08-16)                       |         | Recommendation 2006-08-16 |
| `xml-names`        | Namespaces in XML 1.0 (Third Edition)                  | current | xml-names REC-xml-names-20091208 (Recommendation, 2009-12-08)               |         | Recommendation 2009-12-08 |
| `xml-names11`      | Namespaces in XML 1.1 (Second Edition)                 | legacy  | xml-names11 PER-xml-names11-20060614 (Recommendation, 2006-08-16)           |         | Recommendation 2006-08-16 |
| `xinclude`         | XML Inclusions (XInclude) Version 1.0 (Second Edition) | current | xinclude REC-xinclude-20061115 (Recommendation, 2006-11-15)                 |         | Recommendation 2006-11-15 |
| `xmlbase`          | XML Base (Second Edition)                              | current | xmlbase REC-xmlbase-20090128 (Recommendation, 2009-01-28)                   |         | Recommendation 2009-01-28 |
| `xml-entity-names` | XML Entity Definitions for Characters (3rd Edition)    | current | xml-entity-names REC-xml-entity-names-20230307 (Recommendation, 2023-03-07) |         | Recommendation 2023-03-07 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Extensible Markup Language (XML) 1.0 (Fifth Edition)

- Publisher status on 2026-10-06: Recommendation (2008-11-26).
- Pinned text: https://www.w3.org/TR/xml/
- Revision token: xml REC-xml-20081126 (Recommendation, 2008-11-26)

### Extensible Markup Language (XML) 1.1 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2006-08-16).
- Pinned text: https://www.w3.org/TR/xml11/
- Revision token: xml11 REC-xml11-20040204 (Recommendation, 2006-08-16)

### Namespaces in XML 1.0 (Third Edition)

- Publisher status on 2026-10-06: Recommendation (2009-12-08).
- Pinned text: https://www.w3.org/TR/xml-names/
- Revision token: xml-names REC-xml-names-20091208 (Recommendation, 2009-12-08)

### Namespaces in XML 1.1 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2006-08-16).
- Pinned text: https://www.w3.org/TR/xml-names11/
- Revision token: xml-names11 PER-xml-names11-20060614 (Recommendation, 2006-08-16)

### XML Inclusions (XInclude) Version 1.0 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2006-11-15).
- Pinned text: https://www.w3.org/TR/xinclude/
- Revision token: xinclude REC-xinclude-20061115 (Recommendation, 2006-11-15)

### XML Base (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2009-01-28).
- Pinned text: https://www.w3.org/TR/xmlbase/
- Revision token: xmlbase REC-xmlbase-20090128 (Recommendation, 2009-01-28)

### XML Entity Definitions for Characters (3rd Edition)

- Publisher status on 2026-10-06: Recommendation (2023-03-07).
- Pinned text: https://www.w3.org/TR/xml-entity-names/
- Revision token: xml-entity-names REC-xml-entity-names-20230307 (Recommendation, 2023-03-07)

## Upgrading

### xml11 to xml

1. Treat documents that cite Extensible Markup Language (XML) 1.1 (Second Edition) (xml11 REC-xml11-20040204 (Recommendation, 2006-08-16)) as input.
2. Re-read Extensible Markup Language (XML) 1.0 (Fifth Edition) at https://www.w3.org/TR/xml/.
3. Keep behavior that Extensible Markup Language (XML) 1.0 (Fifth Edition) still requires, and replace behavior that only Extensible Markup Language (XML) 1.1 (Second Edition) required.
4. Record the target revision on the artifact.

### xml-names11 to xml-names

1. Treat documents that cite Namespaces in XML 1.1 (Second Edition) (xml-names11 PER-xml-names11-20060614 (Recommendation, 2006-08-16)) as input.
2. Re-read Namespaces in XML 1.0 (Third Edition) at https://www.w3.org/TR/xml-names/.
3. Keep behavior that Namespaces in XML 1.0 (Third Edition) still requires, and replace behavior that only Namespaces in XML 1.1 (Second Edition) required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
