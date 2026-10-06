# sarif

An agent skill for SARIF.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill sarif
```

Then ask the agent to apply SARIF.

## What it covers

- when exchanging static analysis results
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line        | Status  |
| ----------- | ------- |
| SARIF 2.1.0 | current |
| SARIF 2.2   | preview |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SARIF 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html): OASIS Standard, SARIF 2.1.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06).
- [SARIF 2.2 draft](https://raw.githubusercontent.com/oasis-tcs/sarif-spec/adbb670c018335b0f384e6dd8819f4ea055d7ee1/sarif-2.2/prose/share/sarif-v2.2-draft.md): Committee Specification Draft, SARIF 2.2 Committee Specification Draft 01, 2026-03-05 (editor draft at commit adbb670).

## License

MIT
