# dom

An agent skill for DOM.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dom
```

Then ask the agent to apply DOM.

## What it covers

- when walking or mutating the DOM
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                | Status                |
| ------------------- | --------------------- |
| DOM Living Standard | current               |
| W3C DOM 4           | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [DOM Living Standard](https://dom.spec.whatwg.org/review-drafts/2026-06/): Review Draft, Review Draft 2026-06 (Review Draft, 2026-06).
- [W3C DOM 4](https://www.w3.org/TR/2015/REC-dom-20151119/): W3C Recommendation, REC-dom-20151119 (W3C Recommendation, 2015-11-19).

## License

MIT
