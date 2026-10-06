# hipaa

An agent skill for HIPAA Rules: applying the HIPAA privacy, security or breach notification rules.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill hipaa
```

Then ask your agent to apply HIPAA Rules.

## What it covers

- 45 CFR Part 160 (general administrative requirements) and Part 164 (security, breach notification and privacy), as served by the eCFR renderer for the current title 45 text.

## Versions

| Line                     | Status  |
| ------------------------ | ------- |
| 45 CFR Parts 160 and 164 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [45 CFR Part 160](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=160): eCFR, current title 45 part 160, fetched 2026-10-06.
- [45 CFR Part 164](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=164): eCFR, current title 45 part 164, fetched 2026-10-06.

## License

MIT
