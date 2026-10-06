# trusted-publishing

An agent skill for Trusted publishing.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill trusted-publishing
```

Then ask the agent to apply Trusted publishing.

## What it covers

- when publishing packages with OIDC trusted publishers
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                    | Status  |
| ----------------------- | ------- |
| npm trusted publishing  | current |
| PyPI trusted publishing | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers): Documentation, npm trusted publishers, fetched 2026-10-06 (Documentation, 2026-10-06).
- [PyPI trusted publishing](https://docs.pypi.org/trusted-publishers/): Documentation, PyPI trusted publishers, fetched 2026-10-06 (Documentation, 2026-10-06).

## License

MIT
