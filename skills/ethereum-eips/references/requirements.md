# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## ERC-20: Token Standard

Source: https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-20.md

- **ERC-20 Methods.** Callers MUST handle `false` from `returns (bool success)`. Callers MUST NOT assume that `false` is never returned!
- **ERC-20 name.** OPTIONAL - This method can be used to improve usability, but interfaces and other contracts MUST NOT expect these values to be present.
- **ERC-20 transfer.** _Note_ Transfers of 0 values MUST be treated as normal transfers and fire the `Transfer` event.
- **ERC-20 approve.** clients SHOULD make sure to create user interfaces in such a way that they set the allowance first to `0` before setting it to another value for the same spender.
- **ERC-20 Transfer.** MUST trigger when tokens are transferred, including zero value transfers.

## EIP-712: Typed structured data hashing and signing

Source: https://raw.githubusercontent.com/ethereum/EIPs/3b5f9676205139c72da3e80774a8f5f27b911072/EIPS/eip-712.md

- **EIP-712 Definition of encodeType.** If the struct type references other struct types (and these in turn reference even more struct types), then the set of referenced struct types is collected, sorted by name and appended to the encoding.
- **EIP-712 Definition of encodeData.** Each encoded member value is exactly 32-byte long.
- **EIP-712 Definition of encodeData.** The dynamic values `bytes` and `string` are encoded as a `keccak256` hash of their contents.
- **EIP-712 Definition of domainSeparator.** The user-agent _should_ refuse signing if it does not match the currently active chain.
- **EIP-712 Replay attacks.** It is _very important_ that implementers make sure the application behaves correctly when it sees the same signed message twice.

## ERC-4337: Account Abstraction Using Alt Mempool

Source: https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-4337.md

- **ERC-4337 The UserOperation structure.** To prevent replay attacks, either cross-chain or with multiple `EntryPoint` contract versions, the `signature` MUST depend on `chainid` and the `EntryPoint` address.
- **ERC-4337 Smart Contract Account Interface.** MUST validate the caller is a trusted `EntryPoint`
- **ERC-4337 Required EntryPoint contract functionality.** A node/bundler MUST reject a `UserOperation` that fails the validation, meaning not adding it to the local mempool and not propagating it to other peers.
- **ERC-4337 Simulation Specification.** The bundler MUST drop the `UserOperation` if the simulation reverts
- **ERC-4337 Paymasters contracts.** All `paymaster` contracts MUST check that all calls to the `validatePaymasterUserOp()` and `postOp()` functions originate from the `EntryPoint`.
- **ERC-4337 Transient Storage.** The transient storage MUST be cleaned up manually if contains any sensitive information or is used for access control.

## EIP-1193: Ethereum Provider JavaScript API

Source: https://raw.githubusercontent.com/ethereum/EIPs/3b5f9676205139c72da3e80774a8f5f27b911072/EIPS/eip-1193.md

- **EIP-1193 request.** The Promise **MUST NOT** resolve with any RPC protocol-specific response objects, unless the RPC method's return type is so defined.
- **EIP-1193 request (Provider disconnected).** If rejecting for this reason, the Promise rejection error `code` **MUST** be `4900`.
- **EIP-1193 Supported RPC Methods.** All supported RPC methods **MUST** be identified by unique strings.
- **EIP-1193 connect.** If the Provider becomes connected, the Provider **MUST** emit the event named `connect`.
- **EIP-1193 accountsChanged.** If the accounts available to the Provider change, the Provider **MUST** emit the event named `accountsChanged` with value `accounts: string[]`, containing the account addresses per the `eth_accounts` Ethereum RPC method.

## ERC-8004: Trustless Agents (Draft)

Source: https://raw.githubusercontent.com/ethereum/ERCs/365b4c02879f3e882b91281d42b4f57b406205e9/ERCS/erc-8004.md

- **ERC-8004 Agent URI and Agent Registration File.** The _agentURI_ MUST resolve to the agent registration file.
- **ERC-8004 On-chain metadata.** When the agent is transferred, `agentWallet` is automatically cleared (effectively resetting it to the zero address) and must be re-verified by the new owner.
- **ERC-8004 Giving Feedback.** The feedback submitter MUST NOT be the agent owner or an approved operator for _agentId_.
- **ERC-8004 Validation Response.** This function MUST be called by the _validatorAddress_ specified in the original request.
