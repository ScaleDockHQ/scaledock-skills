# ocpi

An agent skill for OCPI: exchanging OCPI roaming data for locations, sessions, tokens, tariffs, CDRs or commands.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ocpi
```

Then ask your agent to apply OCPI.

## What it covers

- Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

## Versions

| Line       | Status  |
| ---------- | ------- |
| OCPI 2.2.1 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCPI 2.2.1 locations](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_locations.asciidoc): Specification, OCPI 2.2.1.
- [OCPI 2.2.1 sessions](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_sessions.asciidoc): Specification, OCPI 2.2.1.
- [OCPI 2.2.1 tokens](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_tokens.asciidoc): Specification, OCPI 2.2.1.
- [OCPI 2.2.1 CDRs](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_cdrs.asciidoc): Specification, OCPI 2.2.1.
- [OCPI 2.2.1 commands](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_commands.asciidoc): Specification, OCPI 2.2.1.
- [OCPI 2.2.1 tariffs](https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_tariffs.asciidoc): Specification, OCPI 2.2.1.

## License

MIT
