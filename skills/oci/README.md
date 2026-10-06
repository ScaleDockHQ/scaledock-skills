# oci

An agent skill for OCI.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill oci
```

Then ask the agent to apply OCI.

## What it covers

- when building or distributing OCI images
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                        | Status  |
| --------------------------- | ------- |
| OCI Image Spec 1.1.1        | current |
| OCI Distribution Spec 1.1.1 | current |
| OCI Runtime Spec 1.2.1      | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCI Image Spec 1.1.1](https://raw.githubusercontent.com/opencontainers/image-spec/v1.1.1/spec.md): Release, OCI image-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06).
- [OCI Distribution Spec 1.1.1](https://raw.githubusercontent.com/opencontainers/distribution-spec/v1.1.1/spec.md): Release, OCI distribution-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06).
- [OCI Runtime Spec 1.2.1](https://raw.githubusercontent.com/opencontainers/runtime-spec/v1.2.1/spec.md): Release, OCI runtime-spec v1.2.1, fetched 2026-10-06 (Release, 2026-10-06).

## License

MIT
