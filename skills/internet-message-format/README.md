# internet-message-format

An agent skill for Internet Message Format.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill internet-message-format
```

Then ask the agent to apply Internet Message Format.

## What it covers

- when parsing an email message or a MIME body
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                                                           | Status  |
| -------------------------------------------------------------------------------------------------------------- | ------- |
| RFC 5322 Internet Message Format                                                                               | current |
| RFC 2045 Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies              | current |
| RFC 2046 Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types                                    | current |
| RFC 2047 MIME (Multipurpose Internet Mail Extensions) Part Three: Message Header Extensions for Non-ASCII Text | current |
| RFC 2048 Multipurpose Internet Mail Extensions (MIME) Part Four: Registration Procedures                       | current |
| RFC 2049 Multipurpose Internet Mail Extensions (MIME) Part Five: Conformance Criteria and Examples             | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 5322 Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322.html): DRAFT STANDARD, RFC 5322 (DRAFT STANDARD, October 20).
- [RFC 2045 Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies](https://www.rfc-editor.org/rfc/rfc2045.html): DRAFT STANDARD, RFC 2045 (DRAFT STANDARD, November 1).
- [RFC 2046 Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types](https://www.rfc-editor.org/rfc/rfc2046.html): DRAFT STANDARD, RFC 2046 (DRAFT STANDARD, November 1).
- [RFC 2047 MIME (Multipurpose Internet Mail Extensions) Part Three: Message Header Extensions for Non-ASCII Text](https://www.rfc-editor.org/rfc/rfc2047.html): DRAFT STANDARD, RFC 2047 (DRAFT STANDARD, November 1).
- [RFC 2048 Multipurpose Internet Mail Extensions (MIME) Part Four: Registration Procedures](https://www.rfc-editor.org/rfc/rfc2048.html): BEST CURRENT PRACTICE, RFC 2048 (BEST CURRENT PRACTICE, November 1).
- [RFC 2049 Multipurpose Internet Mail Extensions (MIME) Part Five: Conformance Criteria and Examples](https://www.rfc-editor.org/rfc/rfc2049.html): DRAFT STANDARD, RFC 2049 (DRAFT STANDARD, November 1).

## License

MIT
