# wasi

An agent skill for WASI: targeting the WebAssembly System Interface and the Component Model.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill wasi
```

Then ask your agent to apply WASI.

## What it covers

- The WebAssembly System Interface from the WASI Subgroup of the WebAssembly Community Group, read from the WASI 0.2.12 and 0.3.1 specification overviews in the WebAssembly/WASI repository, and the Component Model it builds on, read from `design/mvp/Explainer.md` and `design/mvp/WIT.md` in the WebAssembly/component-model repository.

## Versions

| Line                        | Status  |
| --------------------------- | ------- |
| WASI 0.2.12                 | current |
| WASI 0.3.1                  | preview |
| WebAssembly Component Model | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WASI Specification v0.2.12](https://raw.githubusercontent.com/WebAssembly/WASI/90105ffc2a4eed594909f9df2f473596500b49d2/specifications/wasi-0.2.12/Overview.md): Released WASI version, v0.2.12 (released 2026-06-02), main at commit 90105ff.
- [WASI Specification v0.3.1](https://raw.githubusercontent.com/WebAssembly/WASI/90105ffc2a4eed594909f9df2f473596500b49d2/specifications/wasi-0.3.1/Overview.md): WASI preview release, v0.3.1 (released 2026-08-11), main at commit 90105ff.
- [Component Model explainer](https://raw.githubusercontent.com/WebAssembly/component-model/a25fc0b372dd21f07f0242c46e98bd0f1ea0c0e1/design/mvp/Explainer.md): Component Model design (explainer), main at commit a25fc0b, 2026-09-28.
- [The `wit` format](https://raw.githubusercontent.com/WebAssembly/component-model/a25fc0b372dd21f07f0242c46e98bd0f1ea0c0e1/design/mvp/WIT.md): Component Model design (WIT), main at commit a25fc0b, 2026-09-28.

## License

MIT
