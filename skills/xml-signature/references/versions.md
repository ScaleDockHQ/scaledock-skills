# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id              | Line                                                 | Status  | Revision                                                              | Posture | Publisher                 |
| --------------- | ---------------------------------------------------- | ------- | --------------------------------------------------------------------- | ------- | ------------------------- |
| `xmldsig-core1` | XML Signature Syntax and Processing Version 1.1      | current | xmldsig-core1 REC-xmldsig-core1-20130411 (Recommendation, 2013-04-11) |         | Recommendation 2013-04-11 |
| `xmldsig-core`  | XML Signature Syntax and Processing (Second Edition) | legacy  | xmldsig-core REC-xmldsig-core1-20130411 (Recommendation, 2008-06-10)  |         | Recommendation 2008-06-10 |
| `xml-c14n11`    | Canonical XML Version 1.1                            | current | xml-c14n11 REC-xml-c14n11-20080502 (Recommendation, 2008-05-02)       |         | Recommendation 2008-05-02 |
| `xml-c14n10`    | Canonical XML Version 1.0                            | legacy  | xml-c14n10 REC-xml-c14n11-20080502 (Recommendation, 2001-03-15)       |         | Recommendation 2001-03-15 |
| `xml-exc-c14n`  | Exclusive XML Canonicalization Version 1.0           | current | xml-exc-c14n REC-xml-exc-c14n-20020718 (Recommendation, 2002-07-18)   |         | Recommendation 2002-07-18 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### XML Signature Syntax and Processing Version 1.1

- Publisher status on 2026-10-06: Recommendation (2013-04-11).
- Pinned text: https://www.w3.org/TR/xmldsig-core1/
- Revision token: xmldsig-core1 REC-xmldsig-core1-20130411 (Recommendation, 2013-04-11)

### XML Signature Syntax and Processing (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2008-06-10).
- Pinned text: https://www.w3.org/TR/xmldsig-core/
- Revision token: xmldsig-core REC-xmldsig-core1-20130411 (Recommendation, 2008-06-10)

### Canonical XML Version 1.1

- Publisher status on 2026-10-06: Recommendation (2008-05-02).
- Pinned text: https://www.w3.org/TR/xml-c14n11/
- Revision token: xml-c14n11 REC-xml-c14n11-20080502 (Recommendation, 2008-05-02)

### Canonical XML Version 1.0

- Publisher status on 2026-10-06: Recommendation (2001-03-15).
- Pinned text: https://www.w3.org/TR/xml-c14n/
- Revision token: xml-c14n10 REC-xml-c14n11-20080502 (Recommendation, 2001-03-15)

### Exclusive XML Canonicalization Version 1.0

- Publisher status on 2026-10-06: Recommendation (2002-07-18).
- Pinned text: https://www.w3.org/TR/xml-exc-c14n/
- Revision token: xml-exc-c14n REC-xml-exc-c14n-20020718 (Recommendation, 2002-07-18)

## Upgrading

### xmldsig-core to xmldsig-core1

1. Treat documents that cite XML Signature Syntax and Processing (Second Edition) (xmldsig-core REC-xmldsig-core1-20130411 (Recommendation, 2008-06-10)) as input.
2. Re-read XML Signature Syntax and Processing Version 1.1 at https://www.w3.org/TR/xmldsig-core1/.
3. Keep behavior that XML Signature Syntax and Processing Version 1.1 still requires, and replace behavior that only XML Signature Syntax and Processing (Second Edition) required.
4. Record the target revision on the artifact.

### xml-c14n10 to xml-c14n11

1. Treat documents that cite Canonical XML Version 1.0 (xml-c14n10 REC-xml-c14n11-20080502 (Recommendation, 2001-03-15)) as input.
2. Re-read Canonical XML Version 1.1 at https://www.w3.org/TR/xml-c14n11/.
3. Keep behavior that Canonical XML Version 1.1 still requires, and replace behavior that only Canonical XML Version 1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
