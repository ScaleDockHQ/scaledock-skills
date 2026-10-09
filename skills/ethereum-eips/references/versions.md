# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id         | Line     | Status  | Revision                                        | Posture | Summary                                                                                       |
| ---------- | -------- | ------- | ----------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `erc-20`   | ERC-20   | current | Final, ethereum/ERCs commit 365b4c0, 2026-10-02 |         | Fungible token interface: transfers, allowances and the Transfer and Approval events.         |
| `eip-712`  | EIP-712  | current | Final, ethereum/EIPs commit 3b5f967, 2026-10-06 |         | Hashing and signing of typed structured data with a domain separator.                         |
| `erc-4337` | ERC-4337 | current | Final, ethereum/ERCs commit 365b4c0, 2026-10-02 |         | Account abstraction through UserOperations, bundlers, the EntryPoint contract and paymasters. |
| `eip-1193` | EIP-1193 | current | Final, ethereum/EIPs commit 3b5f967, 2026-10-06 |         | The JavaScript provider API: request, RPC errors and provider events.                         |
| `erc-8004` | ERC-8004 | current | Draft, ethereum/ERCs commit 365b4c0, 2026-10-02 |         | Identity, reputation and validation registries for trustless agents; still a Draft ERC.       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Each proposal is its own family with one line. ERC-20, EIP-712, ERC-4337 and EIP-1193 are Final; ERC-8004 is a Draft and can still change, so re-read it before relying on a rule. ERC-20, ERC-4337 and ERC-8004 live in the ethereum/ERCs repository; EIP-712 and EIP-1193 are in ethereum/EIPs.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
