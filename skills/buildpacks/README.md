# buildpacks

An agent skill for Cloud Native Buildpacks.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill buildpacks
```

Then ask the agent to apply Cloud Native Buildpacks.

## What it covers

- when implementing a buildpack or platform
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                    | Status  |
| ----------------------- | ------- |
| Buildpacks platform API | current |
| Buildpack API           | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Buildpacks platform API](https://raw.githubusercontent.com/buildpacks/spec/main/platform.md): Specification, Buildpacks platform specification, fetched 2026-10-06 (Specification, 2026-10-06).
- [Buildpack API](https://raw.githubusercontent.com/buildpacks/spec/main/buildpack.md): Specification, Buildpack specification, fetched 2026-10-06 (Specification, 2026-10-06).

## License

MIT
