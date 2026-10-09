# epss

An agent skill for EPSS: estimating and using the probability that a vulnerability will be exploited, with the Exploit Prediction Scoring System.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill epss
```

Then ask your agent to apply EPSS.

## What it covers

- The Exploit Prediction Scoring System (EPSS) from the FIRST EPSS Special Interest Group: what the score and percentile mean, how the model is calibrated and measured, how to combine EPSS with local context and the CISA KEV catalog, and how to get the data. Read from the FIRST EPSS pages for the current model, EPSS v5 (v2026.06.15).

## Versions

| Line | Status  |
| ---- | ------- |
| EPSS | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [How EPSS Works](https://www.first.org/epss/how-it-works): FIRST EPSS SIG documentation, EPSS v5 (v2026.06.15), page read 2026-10-06.
- [Using EPSS](https://www.first.org/epss/using-epss): FIRST EPSS SIG documentation, EPSS v5 (v2026.06.15), page read 2026-10-06.
- [Get the Data](https://www.first.org/epss/data): FIRST EPSS SIG documentation, EPSS v5 (v2026.06.15), page read 2026-10-06.

## License

MIT
