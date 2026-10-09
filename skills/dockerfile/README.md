# dockerfile

An agent skill for Dockerfile: writing and reviewing Dockerfiles.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dockerfile
```

Then ask your agent to apply Dockerfile.

## What it covers

- The Dockerfile reference from the Moby BuildKit project, the text that docs.docker.com publishes as its Dockerfile reference, read from the BuildKit repository at its latest release. It covers the format, parser directives, shell and exec form, and every instruction.

## Versions

| Line       | Status  |
| ---------- | ------- |
| Dockerfile | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Dockerfile reference](https://raw.githubusercontent.com/moby/buildkit/8c91502cf280bd70a0c50912ce251c46a8881d9f/frontend/dockerfile/docs/reference.md): Reference, BuildKit v0.33.1 (commit 8c91502), Dockerfile syntax docker/dockerfile:1.

## License

MIT
