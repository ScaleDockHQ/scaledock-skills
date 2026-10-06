# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id             | Line                                                                       | Status  | Revision                                                            | Posture | Publisher                 |
| -------------- | -------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- | ------- | ------------------------- |
| `soap12-part1` | SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)              | current | soap12-part1 REC-soap12-part1-20070427 (Recommendation, 2007-04-27) |         | Recommendation 2007-04-27 |
| `soap12-part2` | SOAP Version 1.2 Part 2: Adjuncts (Second Edition)                         | current | soap12-part2 REC-soap12-part2-20070427 (Recommendation, 2007-04-27) |         | Recommendation 2007-04-27 |
| `wsdl20`       | Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language | current | wsdl20 REC-wsdl20-adjuncts-20070626 (Recommendation, 2007-06-26)    |         | Recommendation 2007-06-26 |
| `ws-addr-core` | Web Services Addressing 1.0 - Core                                         | current | ws-addr-core REC-xml-infoset-20040204 (Recommendation, 2006-05-09)  |         | Recommendation 2006-05-09 |
| `soapjms`      | SOAP over Java Message Service 1.0                                         | current | soapjms REC-soapjms-20120216 (Recommendation, 2012-02-16)           |         | Recommendation 2012-02-16 |
| `soap12-part0` | SOAP Version 1.2 Part 0: Primer (Second Edition)                           | current | W3C Recommendation 27 April 2007                                    |         | Recommendation 2007-04-27 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2007-04-27).
- Pinned text: https://www.w3.org/TR/soap12-part1/
- Revision token: soap12-part1 REC-soap12-part1-20070427 (Recommendation, 2007-04-27)

### SOAP Version 1.2 Part 2: Adjuncts (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2007-04-27).
- Pinned text: https://www.w3.org/TR/soap12-part2/
- Revision token: soap12-part2 REC-soap12-part2-20070427 (Recommendation, 2007-04-27)

### Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language

- Publisher status on 2026-10-06: Recommendation (2007-06-26).
- Pinned text: https://www.w3.org/TR/wsdl20/
- Revision token: wsdl20 REC-wsdl20-adjuncts-20070626 (Recommendation, 2007-06-26)

### Web Services Addressing 1.0 - Core

- Publisher status on 2026-10-06: Recommendation (2006-05-09).
- Pinned text: https://www.w3.org/TR/ws-addr-core/
- Revision token: ws-addr-core REC-xml-infoset-20040204 (Recommendation, 2006-05-09)

### SOAP over Java Message Service 1.0

- Publisher status on 2026-10-06: Recommendation (2012-02-16).
- Pinned text: https://www.w3.org/TR/soapjms/
- Revision token: soapjms REC-soapjms-20120216 (Recommendation, 2012-02-16)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
