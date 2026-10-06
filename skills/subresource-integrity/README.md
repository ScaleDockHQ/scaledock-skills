# subresource-integrity

An agent skill for Subresource Integrity (SRI).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill subresource-integrity
```

Then ask the agent to apply Subresource Integrity (SRI).

## What it covers

- when setting or checking integrity metadata on a fetched subresource
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                          | Status          |
| ----------------------------- | --------------- |
| Subresource Integrity Level 1 | current         |
| Subresource Integrity Level 2 | preview (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Subresource Integrity](https://www.w3.org/TR/SRI/): Recommendation, sri-1 WD-sri-2-20260320 (Recommendation, 2016-06-23).
- [Subresource Integrity](https://www.w3.org/TR/sri-2/): Working Draft, sri-2 WD-sri-2-20260320 (Working Draft, 2026-03-20).

## License

MIT
