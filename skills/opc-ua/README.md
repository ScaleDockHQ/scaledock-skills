# opc-ua

An agent skill for OPC UA: implementing OPC UA clients and servers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill opc-ua
```

Then ask your agent to apply OPC UA.

## What it covers

- OPC Unified Architecture from the OPC Foundation (OPC 10000, also IEC 62541): Part 2 Security Model, Part 3 Address Space Model, Part 4 Services and Part 6 Mappings, read from the OPC Foundation's online reference in its Markdown download.

## Versions

| Line        | Status  |
| ----------- | ------- |
| OPC UA 1.05 | current |
| OPC UA 1.04 | legacy  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OPC 10000-2: Security Model](https://reference.opcfoundation.org/specs/OPC-10000-2/v1.05.06): OPC Foundation Specification, Version 1.05.06, 2025-10-22.
- [OPC 10000-3: Address Space Model](https://reference.opcfoundation.org/specs/OPC-10000-3/v1.05.06): OPC Foundation Specification, Version 1.05.06, 2025-10-22.
- [OPC 10000-4: Services](https://reference.opcfoundation.org/specs/OPC-10000-4/v1.05.07): OPC Foundation Specification, Version 1.05.07, 2026-04-15.
- [OPC 10000-6: Mappings](https://reference.opcfoundation.org/specs/OPC-10000-6/v1.05.07): OPC Foundation Specification, Version 1.05.07, 2026-04-15.

## License

MIT
