# iab-gpp

An agent skill for IAB GPP: encoding a Global Privacy Platform string.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill iab-gpp
```

Then ask your agent to apply IAB GPP.

## What it covers

- The IAB Tech Lab Global Privacy Platform (GPP) carries privacy and consent signals for several jurisdictions in one GPP String: a header that lists the section IDs, followed by one discrete section per framework (for example IAB Europe TCF or the US state sections), joined on `~`. IAB Tech Lab publishes the specifications on GitHub; this skill quotes the Core "Consent String Specification" and "CMP API Specification".
- Each discrete section (TCF EU, TCF Canada, MSPA US National and the US state sections) has its own technical specification under `Sections/` in the same repository; those are not pinned here.

## Versions

| Line                    | Status  |
| ----------------------- | ------- |
| Global Privacy Platform | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Global Privacy Protocol String (Core Consent String Specification)](https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/03fdf0332d261ee896b77d7f9a10edde1498fc7c/Core/Consent%20String%20Specification.md): IAB Tech Lab Final specification, Version 1.0 (2023-11-03 update), commit 03fdf03, 2026-08-06.
- [GPP CMP API Specification](https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/03fdf0332d261ee896b77d7f9a10edde1498fc7c/Core/CMP%20API%20Specification.md): IAB Tech Lab Final specification, Version 1.1 (June 2023), commit 03fdf03, 2026-08-06.

## License

MIT
