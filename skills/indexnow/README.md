# indexnow

An agent skill for IndexNow: notifying search engines of URL changes.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill indexnow
```

Then ask your agent to apply IndexNow.

## What it covers

- IndexNow is a protocol for telling participating search engines that URLs on a site were added, updated or deleted. A site submits URLs with a GET request or a JSON POST to a search engine's `/indexnow` endpoint and proves ownership of the host with a key file. This skill quotes the protocol documentation published at indexnow.org.

## Versions

| Line     | Status  |
| -------- | ------- |
| IndexNow | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [IndexNow Documentation](https://www.indexnow.org/documentation): Protocol documentation, indexnow.org, read 2026-10-06.

## License

MIT
