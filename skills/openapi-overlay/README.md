# openapi-overlay

An agent skill for the OpenAPI Overlay Specification 1.2 and 1.1, with upgrades from 1.0: repeatable, reviewable changes to OpenAPI descriptions, kept outside the source document.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi-overlay
```

Then ask your agent to "write an overlay that removes our internal operations" or "upgrade this overlay to 1.2".

## What it covers

- The Overlay, Info, Action and reusable action objects, and the update, copy and remove semantics.
- The recursive merge rules and RFC 9535 JSONPath targets.
- Recipes: adding extensions, removing operations, moving paths, reusable error responses, traits.
- Upgrading from 1.0 to 1.1 and from 1.1 to 1.2, and validation against the Overlay JSON Schemas.
- Checks for applying overlays safely in a pipeline.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| Overlay 1.2 | current               |
| Overlay 1.1 | supported             |
| Overlay 1.0 | legacy (upgrade from) |

No preview is listed: the 1.3 milestone has no specification text yet. `references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Overlay Specification v1.2.0](https://spec.openapis.org/overlay/v1.2.0.html): Released, 1.2.0.
- [Overlay Specification v1.1.0](https://spec.openapis.org/overlay/v1.1.0.html): Released, 1.1.0.
- [Overlay Specification v1.0.0](https://spec.openapis.org/overlay/v1.0.0.html): Released, 1.0.0.
- [Overlay schema iterations](https://spec.openapis.org/overlay/): 1.1 and 1.0 iterations 2026-04-01; the 1.2 schema is unpublished and pinned to a work-in-progress commit.
- [Overlay 1.1 to 1.2 upgrade guide](https://learn.openapis.org/upgrading/overlay-v1.1-to-v1.2.html): OAI guide.
- [Overlay 1.0 to 1.1 upgrade guide](https://learn.openapis.org/upgrading/overlay-v1.0-to-v1.1.html): OAI guide.
- [RFC 9535](https://www.rfc-editor.org/rfc/rfc9535): RFC (Proposed Standard), JSONPath.

## License

MIT
