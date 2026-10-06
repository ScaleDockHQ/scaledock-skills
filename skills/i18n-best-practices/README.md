# i18n-best-practices

An agent skill for Internationalization best practices.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill i18n-best-practices
```

Then ask the agent to apply Internationalization best practices.

## What it covers

- when internationalizing web content or specifications
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                     | Status          |
| -------------------------------------------------------- | --------------- |
| Character Model for the World Wide Web 1.0: Fundamentals | current         |
| Character Model for the World Wide Web: String Matching  | preview (track) |
| Strings on the Web: Language and Direction Metadata      | current (track) |
| Internationalization Tag Set (ITS) Version 2.0           | current         |
| Ruby Annotation                                          | current         |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Character Model for the World Wide Web 1.0: Fundamentals](https://www.w3.org/TR/charmod/): Recommendation, charmod REC-charmod-20050215 (Recommendation, 2005-02-15).
- [Character Model for the World Wide Web: String Matching](https://www.w3.org/TR/charmod-norm/): First Public Working Draft, charmod-norm WD-charmod-norm-20260716 (First Public Working Draft, 2026-07-16).
- [Strings on the Web: Language and Direction Metadata](https://www.w3.org/TR/string-meta/): First Public Working Draft, string-meta WD-string-meta-20260716 (First Public Working Draft, 2026-07-16).
- [Internationalization Tag Set (ITS) Version 2.0](https://www.w3.org/TR/its20/): Recommendation, its20 REC-its20-20131029 (Recommendation, 2013-10-29).
- [Ruby Annotation](https://www.w3.org/TR/ruby/): Recommendation, ruby REC-ruby-20010531 (Recommendation, 2001-05-31).
- [Working with Time and Timezones](https://www.w3.org/TR/timezone/): Draft Note, timezone (Draft Note, 2025-07-26).
- [Developing Localizable Manifests](https://www.w3.org/TR/localizable-manifests/): Note, localizable-manifests (Note, 2025-02-14).

## License

MIT
