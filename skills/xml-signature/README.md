# xml-signature

An agent skill for XML Signature.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill xml-signature
```

Then ask the agent to apply XML Signature.

## What it covers

- when signing or verifying XML
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                 | Status                |
| ---------------------------------------------------- | --------------------- |
| XML Signature Syntax and Processing Version 1.1      | current               |
| XML Signature Syntax and Processing (Second Edition) | legacy (upgrade from) |
| Canonical XML Version 1.1                            | current               |
| Canonical XML Version 1.0                            | legacy (upgrade from) |
| Exclusive XML Canonicalization Version 1.0           | current               |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [XML Signature Syntax and Processing Version 1.1](https://www.w3.org/TR/xmldsig-core1/): Recommendation, xmldsig-core1 REC-xmldsig-core1-20130411 (Recommendation, 2013-04-11).
- [XML Signature Syntax and Processing (Second Edition)](https://www.w3.org/TR/xmldsig-core/): Recommendation, xmldsig-core REC-xmldsig-core1-20130411 (Recommendation, 2008-06-10).
- [Canonical XML Version 1.1](https://www.w3.org/TR/xml-c14n11/): Recommendation, xml-c14n11 REC-xml-c14n11-20080502 (Recommendation, 2008-05-02).
- [Canonical XML Version 1.0](https://www.w3.org/TR/xml-c14n/): Recommendation, xml-c14n10 REC-xml-c14n11-20080502 (Recommendation, 2001-03-15).
- [Exclusive XML Canonicalization Version 1.0](https://www.w3.org/TR/xml-exc-c14n/): Recommendation, xml-exc-c14n REC-xml-exc-c14n-20020718 (Recommendation, 2002-07-18).

## License

MIT
