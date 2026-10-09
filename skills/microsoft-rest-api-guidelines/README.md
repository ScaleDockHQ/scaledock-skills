# microsoft-rest-api-guidelines

An agent skill for Microsoft REST API Guidelines: designing REST APIs by the Microsoft Azure and Microsoft Graph guidelines.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill microsoft-rest-api-guidelines
```

Then ask your agent to apply Microsoft REST API Guidelines.

## What it covers

- The Microsoft REST API Guidelines from the microsoft/api-guidelines repository. The top-level vNext `Guidelines.md` is now a deprecation notice that points to two companion documents, so this skill reads those: the Microsoft Azure REST API Guidelines (`azure/Guidelines.md`) and the Microsoft Graph REST API Guidelines (`graph/GuidelinesGraph.md`).

## Versions

| Line                          | Status  |
| ----------------------------- | ------- |
| Microsoft REST API Guidelines | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Microsoft Azure REST API Guidelines](https://raw.githubusercontent.com/microsoft/api-guidelines/a7022a299442a8352431874e63ec4dff548a1b81/azure/Guidelines.md): Guidelines, vNext at commit a7022a2, 2026-08-05.
- [Microsoft Graph REST API Guidelines](https://raw.githubusercontent.com/microsoft/api-guidelines/a7022a299442a8352431874e63ec4dff548a1b81/graph/GuidelinesGraph.md): Guidelines, vNext at commit a7022a2, 2026-08-05.

## License

MIT
