# compose-spec

An agent skill for Compose specification: writing and reviewing compose.yaml files.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill compose-spec
```

Then ask your agent to apply Compose specification.

## What it covers

- The Compose Specification from the compose-spec project: the application model, the services, networks and volumes top-level elements, interpolation and merge rules, read from the numbered Markdown files in the compose-spec/compose-spec repository.

## Versions

| Line         | Status  |
| ------------ | ------- |
| Compose file | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Compose Specification: application model](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/02-model.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: the Compose file](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/03-compose-file.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: version and name](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/04-version-and-name.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: services](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/05-services.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: networks](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/06-networks.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: volumes](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/07-volumes.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: extensions](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/11-extension.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: interpolation](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/12-interpolation.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: merge and override](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/13-merge.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: include](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/14-include.md): Specification, main at commit 914ec15, 2026-09-17.
- [Compose Specification: profiles](https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/15-profiles.md): Specification, main at commit 914ec15, 2026-09-17.

## License

MIT
