# json-api

An agent skill for the JSON:API specification: building and reviewing APIs that exchange `application/vnd.api+json` documents, with extensions, profiles and the Atomic Operations extension.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill json-api
```

Then ask your agent to "build a JSON:API endpoint for articles with include and pagination" or "review our API against JSON:API 1.1".

## What it covers

- The media type, the `ext` and `profile` parameters, and `415` and `406` content negotiation.
- Document structure: top-level members, resource objects with `type`, `id` and `lid`, relationships, linkage, compound documents, links, meta and the `jsonapi` object.
- Fetching: `include`, sparse fieldsets, sorting, pagination, filtering, and the query parameter naming rules.
- Creating, updating and deleting resources and relationships, with the status code for each outcome.
- Error objects, extensions, profiles, and Atomic Operations.

## Versions

| Line               | Status          |
| ------------------ | --------------- |
| JSON:API 1.2 draft | preview (track) |
| JSON:API 1.1       | current         |
| JSON:API 1.0       | supported       |

`references/versions.md` says which line to use, what 1.1 added and how to upgrade from 1.0.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [JSON:API Latest Specification](https://jsonapi.org/format/): serves v1.1.
- [JSON:API v1.1](https://jsonapi.org/format/1.1/): Stable, finalized 2022-09-30.
- [JSON:API v1.0](https://jsonapi.org/format/1.0/): archived, final 2015-05-29.
- [JSON:API v1.2](https://jsonapi.org/format/1.2/): working draft.
- [Atomic Operations extension](https://jsonapi.org/ext/atomic/): unversioned.
- [Extensions and Profiles](https://jsonapi.org/extensions/): registry page.
- [JSON:API home page](https://jsonapi.org/): milestones.
- [json-api/json-api repository](https://github.com/json-api/json-api): `gh-pages` at `bde79ce`.

## License

MIT
