# digital-asset-links

An agent skill for Digital Asset Links: publishing an assetlinks.json statement.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill digital-asset-links
```

Then ask your agent to apply Digital Asset Links.

## What it covers

- Digital Asset Links is Google's protocol for public, verifiable statements that one digital asset (a website or an app) makes about another, such as a website delegating its URLs to an Android app. Websites publish a statement list at `/.well-known/assetlinks.json`; Android apps embed one in their manifest. This skill quotes the Asset Links specification in the google/digitalassetlinks repository and Google's statement list guides.

## Versions

| Line                | Status  |
| ------------------- | ------- |
| Digital Asset Links | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Asset Links Specification (google/digitalassetlinks, well-known/details.md)](https://raw.githubusercontent.com/google/digitalassetlinks/d893749ee3c84b31f72b552a7ed333789c3235d3/well-known/details.md): Specification, Commit d893749, 2017-09-14.
- [Creating a Statement List](https://developers.google.com/digital-asset-links/v1/create-statement): Google developer guide, Read 2026-10-06.
- [Statement List Syntax](https://developers.google.com/digital-asset-links/v1/statements): Google developer reference, Read 2026-10-06.

## License

MIT
