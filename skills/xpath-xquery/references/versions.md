# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line                                         | Status    | Revision                                                                        | Posture | Publisher                        |
| -------------------- | -------------------------------------------- | --------- | ------------------------------------------------------------------------------- | ------- | -------------------------------- |
| `xpath-31`           | XML Path Language (XPath) 3.1                | current   | xpath-31 REC-xpath-31-20170321 (Recommendation, 2017-03-21)                     |         | Recommendation 2017-03-21        |
| `xpath-30`           | XML Path Language (XPath) 3.0                | supported | xpath-30 REC-xpath-30-20140408 (Recommendation, 2014-04-08)                     |         | Recommendation 2014-04-08        |
| `xquery-40-preview`  | XQuery 4.0                                   | preview   | xquery-40-preview REC-xquery-31-20170321 (Community Group draft, 2026-10-05)    | track   | Community Group draft 2026-10-05 |
| `xquery-31`          | XQuery 3.1: An XML Query Language            | current   | xquery-31 REC-xquery-31-20170321 (Recommendation, 2017-03-21)                   |         | Recommendation 2017-03-21        |
| `xquery-30`          | XQuery 3.0: An XML Query Language            | supported | xquery-30 REC-xquery-30-20140408 (Recommendation, 2014-04-08)                   |         | Recommendation 2014-04-08        |
| `xpath-functions-31` | XPath and XQuery Functions and Operators 3.1 | current   | xpath-functions-31 REC-xpath-functions-31-20170321 (Recommendation, 2017-03-21) |         | Recommendation 2017-03-21        |
| `xpath-datamodel-31` | XQuery and XPath Data Model 3.1              | current   | xpath-datamodel-31 REC-xpath-datamodel-31-20170321 (Recommendation, 2017-03-21) |         | Recommendation 2017-03-21        |
| `xqueryx-31`         | XQueryX 3.1                                  | current   | xqueryx-31 REC-xqueryx-31-20170321 (Recommendation, 2017-03-21)                 |         | Recommendation 2017-03-21        |
| `xpath-full-text-30` | XQuery and XPath Full Text 3.0               | current   | xpath-full-text-30 REC-xpath-full-text-30-20151124 (Recommendation, 2015-11-24) |         | Recommendation 2015-11-24        |
| `xpath-10`           | XPath 1.0                                    | legacy    | W3C Recommendation 16 November 1999                                             |         | Recommendation 1999-11-16        |
| `xpath20`            | XPath 2.0                                    | legacy    | W3C Recommendation 14 December 2010                                             |         | Recommendation 2010-12-14        |
| `xpath-full-text-10` | XQuery and XPath Full Text 1.0               | legacy    | W3C Recommendation 17 March 2011                                                |         | Recommendation 2011-03-17        |
| `xquery-10`          | XQuery 1.0                                   | legacy    | W3C Recommendation 14 December 2010                                             |         | Recommendation 2010-12-14        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### XML Path Language (XPath) 3.1

- Publisher status on 2026-10-06: Recommendation (2017-03-21).
- Pinned text: https://www.w3.org/TR/xpath-31/
- Revision token: xpath-31 REC-xpath-31-20170321 (Recommendation, 2017-03-21)

### XML Path Language (XPath) 3.0

- Publisher status on 2026-10-06: Recommendation (2014-04-08).
- Pinned text: https://www.w3.org/TR/xpath-30/
- Revision token: xpath-30 REC-xpath-30-20140408 (Recommendation, 2014-04-08)

### XQuery 4.0

- Publisher status on 2026-10-06: Community Group draft (2026-10-05).
- Pinned text: https://qt4cg.org/specifications/xquery-40/xquery-40.html
- Revision token: xquery-40-preview REC-xquery-31-20170321 (Community Group draft, 2026-10-05)

### XQuery 3.1: An XML Query Language

- Publisher status on 2026-10-06: Recommendation (2017-03-21).
- Pinned text: https://www.w3.org/TR/xquery-31/
- Revision token: xquery-31 REC-xquery-31-20170321 (Recommendation, 2017-03-21)

### XQuery 3.0: An XML Query Language

- Publisher status on 2026-10-06: Recommendation (2014-04-08).
- Pinned text: https://www.w3.org/TR/xquery-30/
- Revision token: xquery-30 REC-xquery-30-20140408 (Recommendation, 2014-04-08)

### XPath and XQuery Functions and Operators 3.1

- Publisher status on 2026-10-06: Recommendation (2017-03-21).
- Pinned text: https://www.w3.org/TR/xpath-functions-31/
- Revision token: xpath-functions-31 REC-xpath-functions-31-20170321 (Recommendation, 2017-03-21)

### XQuery and XPath Data Model 3.1

- Publisher status on 2026-10-06: Recommendation (2017-03-21).
- Pinned text: https://www.w3.org/TR/xpath-datamodel-31/
- Revision token: xpath-datamodel-31 REC-xpath-datamodel-31-20170321 (Recommendation, 2017-03-21)

### XQueryX 3.1

- Publisher status on 2026-10-06: Recommendation (2017-03-21).
- Pinned text: https://www.w3.org/TR/xqueryx-31/
- Revision token: xqueryx-31 REC-xqueryx-31-20170321 (Recommendation, 2017-03-21)

### XQuery and XPath Full Text 3.0

- Publisher status on 2026-10-06: Recommendation (2015-11-24).
- Pinned text: https://www.w3.org/TR/xpath-full-text-30/
- Revision token: xpath-full-text-30 REC-xpath-full-text-30-20151124 (Recommendation, 2015-11-24)

## Upgrading

### xpath-30 to xpath-31

1. Treat documents that cite XML Path Language (XPath) 3.0 (xpath-30 REC-xpath-30-20140408 (Recommendation, 2014-04-08)) as input.
2. Re-read XML Path Language (XPath) 3.1 at https://www.w3.org/TR/xpath-31/.
3. Keep behavior that XML Path Language (XPath) 3.1 still requires, and replace behavior that only XML Path Language (XPath) 3.0 required.
4. Record the target revision on the artifact.

### xquery-30 to xquery-31

1. Treat documents that cite XQuery 3.0: An XML Query Language (xquery-30 REC-xquery-30-20140408 (Recommendation, 2014-04-08)) as input.
2. Re-read XQuery 3.1: An XML Query Language at https://www.w3.org/TR/xquery-31/.
3. Keep behavior that XQuery 3.1: An XML Query Language still requires, and replace behavior that only XQuery 3.0: An XML Query Language required.
4. Record the target revision on the artifact.

## Preview: XQuery 4.0

`xquery-40-preview` is a Community Group draft dated 2026-10-05, pinned at https://qt4cg.org/specifications/xquery-40/xquery-40.html. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
