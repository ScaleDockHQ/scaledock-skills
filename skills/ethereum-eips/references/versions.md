# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id         | Line     | Status  | Revision                                       | Posture | Publisher      |
| ---------- | -------- | ------- | ---------------------------------------------- | ------- | -------------- |
| `erc-20`   | ERC-20   | current | EIP-20, fetched 2026-10-06 (EIP, 2026-10-06)   |         | EIP 2026-10-06 |
| `eip-712`  | EIP-712  | current | EIP-712, fetched 2026-10-06 (EIP, 2026-10-06)  |         | EIP 2026-10-06 |
| `erc-4337` | ERC-4337 | current | EIP-4337, fetched 2026-10-06 (EIP, 2026-10-06) |         | EIP 2026-10-06 |
| `eip-1193` | EIP-1193 | current | EIP-1193, fetched 2026-10-06 (EIP, 2026-10-06) |         | EIP 2026-10-06 |
| `erc-8004` | ERC-8004 | current | EIP-8004, fetched 2026-10-06 (EIP, 2026-10-06) |         | EIP 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### ERC-20

- Publisher status on 2026-10-06: EIP (2026-10-06).
- Pinned text: https://eips.ethereum.org/EIPS/eip-20
- Revision token: EIP-20, fetched 2026-10-06 (EIP, 2026-10-06)

### EIP-712

- Publisher status on 2026-10-06: EIP (2026-10-06).
- Pinned text: https://eips.ethereum.org/EIPS/eip-712
- Revision token: EIP-712, fetched 2026-10-06 (EIP, 2026-10-06)

### ERC-4337

- Publisher status on 2026-10-06: EIP (2026-10-06).
- Pinned text: https://eips.ethereum.org/EIPS/eip-4337
- Revision token: EIP-4337, fetched 2026-10-06 (EIP, 2026-10-06)

### EIP-1193

- Publisher status on 2026-10-06: EIP (2026-10-06).
- Pinned text: https://eips.ethereum.org/EIPS/eip-1193
- Revision token: EIP-1193, fetched 2026-10-06 (EIP, 2026-10-06)

### ERC-8004

- Publisher status on 2026-10-06: EIP (2026-10-06).
- Pinned text: https://eips.ethereum.org/EIPS/eip-8004
- Revision token: EIP-8004, fetched 2026-10-06 (EIP, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
