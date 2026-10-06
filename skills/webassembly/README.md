# webassembly

An agent skill for WebAssembly.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill webassembly
```

Then ask the agent to apply WebAssembly.

## What it covers

- when compiling or instantiating WebAssembly
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                       | Status          |
| ------------------------------------------ | --------------- |
| WebAssembly Core Specification Level 1     | current         |
| WebAssembly Core Specification Level 2.0   | preview (build) |
| WebAssembly JavaScript Interface Level 1   | current         |
| WebAssembly JavaScript Interface Level 2.0 | preview (build) |
| WebAssembly Web API Level 1                | current         |
| WebAssembly Web API Level 2.0              | preview (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WebAssembly Core Specification](https://www.w3.org/TR/wasm-core-1/): Recommendation, wasm-core-1 REC-wasm-core-1-20191205 (Recommendation, 2019-12-05).
- [WebAssembly Core Specification](https://www.w3.org/TR/wasm-core-2/): Candidate Recommendation Draft, wasm-core-2 CRD-wasm-core-2-20261003 (Candidate Recommendation Draft, 2026-10-03).
- [WebAssembly JavaScript Interface](https://www.w3.org/TR/wasm-js-api-1/): Recommendation, wasm-js-api-1 REC-wasm-js-api-1-20191205 (Recommendation, 2019-12-05).
- [WebAssembly JavaScript Interface](https://www.w3.org/TR/wasm-js-api-2/): Candidate Recommendation Draft, wasm-js-api-2 CRD-wasm-js-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03).
- [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-1/): Recommendation, wasm-web-api-1 REC-wasm-web-api-1-20191205 (Recommendation, 2019-12-05).
- [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-2/): Candidate Recommendation Draft, wasm-web-api-2 CRD-wasm-web-api-2-20261003 (Candidate Recommendation Draft, 2026-10-03).

## License

MIT
