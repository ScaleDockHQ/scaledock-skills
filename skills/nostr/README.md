# nostr

An agent skill for Nostr: implementing a Nostr client or relay.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nostr
```

Then ask your agent to apply Nostr.

## What it covers

- Nostr is a protocol of signed JSON events exchanged between clients and relays over WebSockets. NIP-01 from the nostr-protocol/nips repository defines the basic protocol that every implementation follows: the event structure and how its ID is computed, the standard tags, kind ranges, subscription filters and the messages between clients and relays.
- Only NIP-01 is pinned. Other NIPs extend it with optional kinds, tags and messages; read them from the same repository when a feature needs one.

## Versions

| Line   | Status  |
| ------ | ------- |
| NIP-01 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [NIP-01: Basic protocol flow description](https://raw.githubusercontent.com/nostr-protocol/nips/a79e21d90fce5465b50ef385dd368bba99ec4a0b/01.md): NIP (draft, mandatory), nostr-protocol/nips commit a79e21d, 2026-10-05.

## License

MIT
