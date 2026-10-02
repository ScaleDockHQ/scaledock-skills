# openapi-overlay

An agent skill for the OpenAPI Overlay Specification 1.2: repeatable, reviewable changes to OpenAPI descriptions, kept outside the source document.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi-overlay
```

Then ask your agent to "write an overlay that removes our internal operations" or "upgrade this overlay to 1.2".

## What it covers

- The Overlay, Info, Action and reusable action objects, and the update, copy and remove semantics.
- The recursive merge rules and RFC 9535 JSONPath targets.
- Recipes: adding extensions, removing operations, moving paths, reusable error responses, traits.
- Upgrading from 1.1 to 1.2, and validation against the Overlay JSON Schemas.
- Checks for applying overlays safely in a pipeline.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Overlay Specification v1.2.0](https://spec.openapis.org/overlay/v1.2.0.html): Released, 1.2.0.
- [Overlay Specification v1.1.0](https://spec.openapis.org/overlay/v1.1.0.html): Released, 1.1.0.
- [Overlay schema iterations](https://spec.openapis.org/overlay/): 1.1 iteration 2026-04-01; the 1.2 schema is unpublished and pinned to a work-in-progress commit.
- [Overlay 1.1 to 1.2 upgrade guide](https://learn.openapis.org/upgrading/overlay-v1.1-to-v1.2.html): OAI guide.
- [RFC 9535](https://www.rfc-editor.org/rfc/rfc9535): RFC (Proposed Standard), JSONPath.

## License

MIT
