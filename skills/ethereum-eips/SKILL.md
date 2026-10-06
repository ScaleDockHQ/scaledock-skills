---
name: ethereum-eips
description: >-
  Ethereum EIPs: Fabian Vogelsteller < fabian@ethereum.org >, Vitalik Buterin < vitalik.buterin@ethereum.org > Covers ERC-20, EIP-712, ERC-4337, EIP-1193, ERC-8004. Use when implementing ERC-20, EIP-712, ERC-4337, EIP-1193, or ERC-8004. Triggers: ERC-20, EIP-712, ERC-4337, EIP-1193, ERC-8004.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Ethereum EIPs

Fabian Vogelsteller < fabian@ethereum.org >, Vitalik Buterin < vitalik.buterin@ethereum.org >

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when implementing ERC-20, EIP-712, ERC-4337, EIP-1193, or ERC-8004.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: ERC-20 (default); EIP-712 (default); ERC-4337 (default); EIP-1193 (default); ERC-8004 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **abstract.** "Fabian Vogelsteller < fabian@ethereum.org >, Vitalik Buterin < vitalik.buterin@ethereum.org >"

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

- `x402`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill x402`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [ERC-20](https://eips.ethereum.org/EIPS/eip-20): EIP, EIP-20, fetched 2026-10-06 (EIP, 2026-10-06), checked 2026-10-06.
- [EIP-712](https://eips.ethereum.org/EIPS/eip-712): EIP, EIP-712, fetched 2026-10-06 (EIP, 2026-10-06), checked 2026-10-06.
- [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337): EIP, EIP-4337, fetched 2026-10-06 (EIP, 2026-10-06), checked 2026-10-06.
- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193): EIP, EIP-1193, fetched 2026-10-06 (EIP, 2026-10-06), checked 2026-10-06.
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): EIP, EIP-8004, fetched 2026-10-06 (EIP, 2026-10-06), checked 2026-10-06.
