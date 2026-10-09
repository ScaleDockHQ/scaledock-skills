# devfile

An agent skill for Devfile: writing and reviewing devfile.yaml files.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill devfile
```

Then ask your agent to apply Devfile.

## What it covers

- The Devfile 2.3.0 schema from the Devfile project (CNCF), read from the devfile/api repository at the v2.3.0 tag, together with the Devfile 2.3.0 authoring guides published on devfile.io, read from their Markdown source in the devfile/devfile-web repository.

## Versions

| Line        | Status  |
| ----------- | ------- |
| Devfile 2.3 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Devfile schema 2.3.0](https://raw.githubusercontent.com/devfile/api/c088cf36a78ddadb8a45b951a2e7214a2ef2da26/schemas/latest/devfile.json): Specification, Devfile schema 2.3.0 (devfile/api v2.3.0, commit c088cf3).
- [Devfile 2.3.0 docs: Adding components](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-components.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Creating devfiles](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/create-devfiles.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Adding a command group](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-a-command-group.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Adding an exec command](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-an-exec-command.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Adding a container component](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-a-container-component.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Adding projects](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-projects.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Defining starter projects](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/defining-starter-projects.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Defining endpoints](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/defining-endpoints.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).
- [Devfile 2.3.0 docs: Referring to a parent devfile](https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/referring-to-a-parent-devfile.md): Documentation, 2.3.0 docs (devfile-web main at commit 5e4115c, 2026-09-27).

## License

MIT
