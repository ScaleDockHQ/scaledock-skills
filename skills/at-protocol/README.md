# at-protocol

An agent skill for AT Protocol: implementing AT Protocol clients, PDS hosts, relays and AppViews.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill at-protocol
```

Then ask your agent to apply AT Protocol.

## What it covers

- The Authenticated Transfer Protocol ("AT Protocol" or "atproto") from Bluesky Social, read from the specification pages on atproto.com in their Markdown source: the protocol overview, DIDs, handles, repositories, the data model, Lexicon, XRPC, sync and cryptography.
- The atproto specifications are published as one living set of pages without version numbers. OAuth, permissions, labels, accounts and the event stream framing have their own pages and are not quoted here.

## Versions

| Line        | Status  |
| ----------- | ------- |
| AT Protocol | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AT Protocol (overview) (atproto.com/specs/atp)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/atp/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [AT Protocol DIDs (atproto.com/specs/did)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/did/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Handles (atproto.com/specs/handle)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/handle/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Repository (atproto.com/specs/repository)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/repository/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Data Model (atproto.com/specs/data-model)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/data-model/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Lexicon (atproto.com/specs/lexicon)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/lexicon/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [HTTP API (XRPC) (atproto.com/specs/xrpc)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/xrpc/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Data Synchronization (atproto.com/specs/sync)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/sync/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.
- [Cryptography (atproto.com/specs/cryptography)](https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/cryptography/en.mdx): Specification, bluesky-social/atproto-website commit 7937e9c, 2026-10-02.

## License

MIT
