# vcard

An agent skill for vCard Format Specification.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill vcard
```

Then ask the agent to apply vCard Format Specification.

## What it covers

- when reading or writing contact data
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                      | Status  |
| --------------------------------------------------------- | ------- |
| RFC 6350 vCard Format Specification                       | current |
| RFC 7095 jCard: The JSON Format for vCard                 | current |
| RFC 9553 JSContact: A JSON Representation of Contact Data | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 6350 vCard Format Specification](https://www.rfc-editor.org/rfc/rfc6350.html): PROPOSED STANDARD, RFC 6350 (PROPOSED STANDARD, August 201).
- [RFC 7095 jCard: The JSON Format for vCard](https://www.rfc-editor.org/rfc/rfc7095.html): PROPOSED STANDARD, RFC 7095 (PROPOSED STANDARD, January 20).
- [RFC 9553 JSContact: A JSON Representation of Contact Data](https://www.rfc-editor.org/rfc/rfc9553.html): PROPOSED STANDARD, RFC 9553 (PROPOSED STANDARD, May 2024).

## License

MIT
