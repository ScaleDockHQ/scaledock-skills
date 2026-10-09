# oscal

An agent skill for OSCAL.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill oscal
```

Then ask the agent to apply OSCAL.

## What it covers

- OSCAL layers and models, identifier rules, and the Profile Resolution specification for resolving a profile into a catalog.
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line  | Status  |
| ----- | ------- |
| OSCAL | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OSCAL Profile Resolution specification](https://raw.githubusercontent.com/usnistgov/OSCAL/v1.2.3/src/specifications/profile-resolution/profile-resolution-specml.xml): Draft specification, OSCAL v1.2.3 release, 2026-08-07.
- [OSCAL concepts: layers and models](https://raw.githubusercontent.com/usnistgov/OSCAL-Pages/4e5c578e1459db44f616a612c01e6e7bbe352935/src/content/learn/concepts/layer/_index.md): Documentation, OSCAL-Pages commit 4e5c578e1459.
- [OSCAL concepts: identifier use](https://raw.githubusercontent.com/usnistgov/OSCAL-Pages/4e5c578e1459db44f616a612c01e6e7bbe352935/src/content/learn/concepts/identifier-use/_index.md): Documentation, OSCAL-Pages commit 4e5c578e1459.

## License

MIT
