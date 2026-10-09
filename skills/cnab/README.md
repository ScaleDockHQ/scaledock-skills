# cnab

An agent skill for CNAB: packaging and running Cloud Native Application Bundles.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cnab
```

Then ask your agent to apply CNAB.

## What it covers

- Cloud Native Application Bundle Core 1.2.0 (CNAB1) from the CNAB project: the overview, the bundle.json file and the invocation image chapters, read from the cnabio/cnab-spec repository.

## Versions

| Line       | Status  |
| ---------- | ------- |
| CNAB 1.2.0 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CNAB Core 1.2.0: overview](https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/100-CNAB.md): Specification, CNAB Core 1.2.0 (main at commit 5771c87, 2021-09-15).
- [CNAB Core 1.2.0: the bundle.json file](https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/101-bundle-json.md): Specification, CNAB Core 1.2.0 (main at commit 5771c87, 2021-09-15).
- [CNAB Core 1.2.0: the invocation images](https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/102-invocation-image.md): Specification, CNAB Core 1.2.0 (main at commit 5771c87, 2021-09-15).

## License

MIT
