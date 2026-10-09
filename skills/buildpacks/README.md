# buildpacks

An agent skill for Cloud Native Buildpacks: implementing buildpacks, lifecycles and platforms.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill buildpacks
```

Then ask your agent to apply Cloud Native Buildpacks.

## What it covers

- The Cloud Native Buildpacks specifications from the Buildpacks project (CNCF): the Platform Interface Specification and the Buildpack Interface Specification, read from the buildpacks/spec repository.

## Versions

| Line                    | Status  |
| ----------------------- | ------- |
| Buildpacks platform API | current |
| Buildpack API           | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Platform Interface Specification](https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/platform.md): Specification, Platform API 0.15 (main at commit b745fcf, 2025-12-11).
- [Buildpack Interface Specification](https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/buildpack.md): Specification, Buildpack API 0.12 (main at commit b745fcf, 2025-12-11).

## License

MIT
