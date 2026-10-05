# openapi-arazzo

An agent skill for the Arazzo Specification 1.1 and 1.0: multi-step API workflows over OpenAPI and AsyncAPI descriptions, with upgrades between lines and the 1.2 draft tracked.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi-arazzo
```

Then ask your agent to "write an Arazzo workflow for our checkout flow" or "review this arazzo.yaml".

## What it covers

- Source descriptions, workflows, steps, parameters, success criteria, and success and failure actions.
- Runtime expressions, Criterion conditions (simple, regex, JSONPath, XPath), selectors and payload replacements.
- AsyncAPI send and receive steps with `correlationId`, `timeout` and `dependsOn`.
- Execution order, retries, and security for tools that run workflows.
- Validation against the official Arazzo JSON Schemas, upgrades from 1.0 to 1.1, and the 1.2 development line.

## Versions

| Line       | Status          |
| ---------- | --------------- |
| Arazzo 1.2 | preview (track) |
| Arazzo 1.1 | current         |
| Arazzo 1.0 | supported       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Arazzo Specification v1.1.0](https://spec.openapis.org/arazzo/v1.1.0.html): Released, 1.1.0.
- [Arazzo 1.1.0 release notes](https://github.com/OAI/Arazzo-Specification/releases/tag/1.1.0): Released, 1.1.0.
- [Arazzo Specification v1.0.1](https://spec.openapis.org/arazzo/v1.0.1.html): Released, 1.0.1.
- [Arazzo 1.0.1 release notes](https://github.com/OAI/Arazzo-Specification/releases/tag/1.0.1): Released, 1.0.1.
- [Arazzo schema iterations](https://spec.openapis.org/arazzo/): 1.1 iteration 2026-04-15.
- [Arazzo `v1.2-dev` branch](https://raw.githubusercontent.com/OAI/Arazzo-Specification/6e089558f8a4eebe81162010b3d46842c8fb9892/src/arazzo.md): in development, commit 6e08955.
- [RFC 9535](https://www.rfc-editor.org/rfc/rfc9535): RFC (Proposed Standard), JSONPath.

## License

MIT
