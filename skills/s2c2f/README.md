# s2c2f

An agent skill for S2C2F: securing how an organization consumes open source dependencies, by practice and maturity level.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill s2c2f
```

Then ask your agent to apply S2C2F.

## What it covers

- The OpenSSF Secure Supply Chain Consumption Framework (S2C2F): eight practices (Ingest, Scan, Inventory, Update, Audit, Enforce, Rebuild, Fix and Upstream) and their 25 requirements ING-1 to FIX-1, each with a maturity level from L1 to L4, read from the framework's Markdown source at a pinned commit.

## Versions

| Line  | Status  |
| ----- | ------- |
| S2C2F | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Secure Supply Chain Consumption Framework (S2C2F) Simplified Requirements](https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md): OpenSSF Community Specification, Version 1.1, commit d0f0a7fbbc6c (2025-05-26).

## License

MIT
