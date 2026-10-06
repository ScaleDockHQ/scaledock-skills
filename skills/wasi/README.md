# wasi

An agent skill for WASI.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill wasi
```

Then ask the agent to apply WASI.

## What it covers

- when targeting the WebAssembly System Interface
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                        | Status          |
| --------------------------- | --------------- |
| WASI 0.2.12                 | current         |
| WASI 0.3.1                  | preview (track) |
| WebAssembly Component Model | current         |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WASI 0.2.12](https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.2.12/Overview.md): Specification, WASI 0.2.12, fetched 2026-10-06 (Specification, 2026-10-06).
- [WASI 0.3.1](https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.3.1/Overview.md): Specification, WASI 0.3.1, fetched 2026-10-06 (Specification, 2026-10-06).
- [WebAssembly Component Model](https://raw.githubusercontent.com/WebAssembly/component-model/main/design/mvp/Explainer.md): Explainer, Component Model MVP explainer, fetched 2026-10-06 (Explainer, 2026-10-06).

## License

MIT
