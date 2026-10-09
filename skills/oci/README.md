# oci

An agent skill for OCI: building, distributing and running OCI images and containers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill oci
```

Then ask your agent to apply OCI.

## What it covers

- The Open Container Initiative specifications: the Image Format Specification (manifest, descriptor, image index and layer), the Distribution Specification (the registry HTTP API) and the Runtime Specification (runtime lifecycle and container configuration), read from the opencontainers repositories at their release tags.

## Versions

| Line                        | Status  |
| --------------------------- | ------- |
| OCI Image Spec 1.1.1        | current |
| OCI Distribution Spec 1.1.1 | current |
| OCI Runtime Spec 1.2.1      | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCI Image Format Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/spec.md): Release, image-spec v1.1.1 (commit 147f9c1).
- [OCI Image Manifest Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/manifest.md): Release, image-spec v1.1.1 (commit 147f9c1).
- [OCI Content Descriptors](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/descriptor.md): Release, image-spec v1.1.1 (commit 147f9c1).
- [OCI Image Index Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/image-index.md): Release, image-spec v1.1.1 (commit 147f9c1).
- [OCI Image Layer Filesystem Changeset](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/layer.md): Release, image-spec v1.1.1 (commit 147f9c1).
- [OCI Distribution Specification](https://raw.githubusercontent.com/opencontainers/distribution-spec/a139cc423184af6078077b9b7ee336eddbd03f8f/spec.md): Release, distribution-spec v1.1.1 (commit a139cc4).
- [OCI Runtime Specification: runtime and lifecycle](https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/runtime.md): Release, runtime-spec v1.2.1 (commit 524fc0e).
- [OCI Runtime Specification: configuration](https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/config.md): Release, runtime-spec v1.2.1 (commit 524fc0e).

## License

MIT
