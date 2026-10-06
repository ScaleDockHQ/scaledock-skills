# xml-schema

An agent skill for XML Schema.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill xml-schema
```

Then ask the agent to apply XML Schema.

## What it covers

- when validating XML with XSD
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                            | Status                |
| --------------------------------------------------------------- | --------------------- |
| W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures | current               |
| XML Schema Part 1: Structures Second Edition                    | legacy (upgrade from) |
| W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes  | current               |
| XML Schema Part 2: Datatypes Second Edition                     | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures](https://www.w3.org/TR/xmlschema11-1/): Recommendation, xmlschema11-1 REC-xmlschema11-1-20120405 (Recommendation, 2012-04-05).
- [XML Schema Part 1: Structures Second Edition](https://www.w3.org/TR/xmlschema-1/): Recommendation, xmlschema-1 REC-xmlschema-1-20041028 (Recommendation, 2004-10-28).
- [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/): Recommendation, xmlschema11-2 REC-xmlschema11-2-20120405 (Recommendation, 2012-04-05).
- [XML Schema Part 2: Datatypes Second Edition](https://www.w3.org/TR/xmlschema-2/): Recommendation, xmlschema-2 REC-xmlschema-2-20041028 (Recommendation, 2004-10-28).

## License

MIT
