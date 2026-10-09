# grpc

An agent skill for gRPC: speaking the gRPC over HTTP/2 wire protocol.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill grpc
```

Then ask your agent to apply gRPC.

## What it covers

- The gRPC over HTTP/2 wire protocol from the gRPC project: request and response header layout, length-prefixed messages, metadata encoding, status trailers and the mapping onto HTTP/2 frames, read from PROTOCOL-HTTP2.md in grpc/grpc at a pinned commit.

## Versions

| Line             | Status  |
| ---------------- | ------- |
| gRPC over HTTP/2 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [gRPC over HTTP/2](https://raw.githubusercontent.com/grpc/grpc/cf61c7d62a1a7f43b9d2ea6488186bc14fc41a8c/doc/PROTOCOL-HTTP2.md): Protocol document, grpc/grpc commit cf61c7d (last change to doc/PROTOCOL-HTTP2.md), 2025-04-17.

## License

MIT
