# soap

An agent skill for SOAP.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill soap
```

Then ask the agent to apply SOAP.

## What it covers

- when building a SOAP service
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                       | Status  |
| -------------------------------------------------------------------------- | ------- |
| SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)              | current |
| SOAP Version 1.2 Part 2: Adjuncts (Second Edition)                         | current |
| Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language | current |
| Web Services Addressing 1.0 - Core                                         | current |
| SOAP over Java Message Service 1.0                                         | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)](https://www.w3.org/TR/soap12-part1/): Recommendation, soap12-part1 REC-soap12-part1-20070427 (Recommendation, 2007-04-27).
- [SOAP Version 1.2 Part 2: Adjuncts (Second Edition)](https://www.w3.org/TR/soap12-part2/): Recommendation, soap12-part2 REC-soap12-part2-20070427 (Recommendation, 2007-04-27).
- [Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language](https://www.w3.org/TR/wsdl20/): Recommendation, wsdl20 REC-wsdl20-adjuncts-20070626 (Recommendation, 2007-06-26).
- [Web Services Addressing 1.0 - Core](https://www.w3.org/TR/ws-addr-core/): Recommendation, ws-addr-core REC-xml-infoset-20040204 (Recommendation, 2006-05-09).
- [SOAP over Java Message Service 1.0](https://www.w3.org/TR/soapjms/): Recommendation, soapjms REC-soapjms-20120216 (Recommendation, 2012-02-16).

## License

MIT
