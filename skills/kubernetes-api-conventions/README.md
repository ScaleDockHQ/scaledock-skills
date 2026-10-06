# kubernetes-api-conventions

An agent skill for Kubernetes API conventions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill kubernetes-api-conventions
```

Then ask the agent to apply Kubernetes API conventions.

## What it covers

- when designing a Kubernetes API
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                       | Status  |
| -------------------------- | ------- |
| Kubernetes API conventions | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Kubernetes API conventions](https://raw.githubusercontent.com/kubernetes/community/master/contributors/devel/sig-architecture/api-conventions.md): Convention, Kubernetes API conventions, fetched 2026-10-06 (Convention, 2026-10-06).

## License

MIT
