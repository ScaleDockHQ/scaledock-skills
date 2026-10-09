# ethereum-eips

An agent skill for Ethereum EIPs: implementing ERC-20, EIP-712, ERC-4337, EIP-1193 or ERC-8004.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ethereum-eips
```

Then ask your agent to apply Ethereum EIPs.

## What it covers

- Five Ethereum Improvement Proposals read from their Markdown source: ERC-20 (token standard), ERC-4337 (account abstraction using an alt mempool) and ERC-8004 (trustless agents) from the ethereum/ERCs repository, and EIP-712 (typed structured data hashing and signing) and EIP-1193 (Ethereum provider JavaScript API) from the ethereum/EIPs repository.

## Versions

| Line     | Status  |
| -------- | ------- |
| ERC-20   | current |
| EIP-712  | current |
| ERC-4337 | current |
| EIP-1193 | current |
| ERC-8004 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ERC-20: Token Standard](https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-20.md): Final, ethereum/ERCs commit 365b4c0, 2026-10-02.
- [EIP-712: Typed structured data hashing and signing](https://raw.githubusercontent.com/ethereum/EIPs/3b5f9676205139c72da3e80774a8f5f27b911072/EIPS/eip-712.md): Final, ethereum/EIPs commit 3b5f967, 2026-10-06.
- [ERC-4337: Account Abstraction Using Alt Mempool](https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-4337.md): Final, ethereum/ERCs commit 365b4c0, 2026-10-02.
- [EIP-1193: Ethereum Provider JavaScript API](https://raw.githubusercontent.com/ethereum/EIPs/3b5f9676205139c72da3e80774a8f5f27b911072/EIPS/eip-1193.md): Final, ethereum/EIPs commit 3b5f967, 2026-10-06.
- [ERC-8004: Trustless Agents](https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-8004.md): Draft, ethereum/ERCs commit 365b4c0, 2026-10-02.

## License

MIT
