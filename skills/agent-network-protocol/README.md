# agent-network-protocol

An agent skill for the Agent Network Protocol (ANP) 1.2: did:wba identities, DID-signed HTTP requests, Agent Description documents, agent discovery and the draft meta-protocol negotiation.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill agent-network-protocol
```

Then ask your agent to "make our agent callable by an ANP agent with did:wba authentication" or "review this ANP Agent Description and DID Document".

## What it covers

- did:wba identifiers: bare-domain and `e1_` path DIDs, the RFC 7638 Ed25519 fingerprint, DID Documents with `eddsa-jcs-2022` proofs, resolution, and key rotation with `deactivated`, `successorDid` and assurance levels.
- ANP-02 request authentication: RFC 9421 signatures and RFC 9530 `Content-Digest`, server verification, `WWW-Authenticate: DIDWba` challenges, `Authentication-Info` tokens, and native did:web.
- The ANP-07 Agent Description: required fields, information and interfaces, security definitions, human authorization and proofs.
- ANP-08 discovery through `/.well-known/agent-descriptions` and search-service registration.
- The ANP-06 draft meta-protocol: `MetaProtocolInterface`, `anp.negotiate`, results, caching and error codes.
- Upgrading from ANP 1.0's `Authorization: DIDWba` headers and JSON-LD descriptions.

## Draft posture

ANP is a community specification with no standards body behind it. Its wire formats changed completely between 1.0 and 1.1, its own README makes no promise of implementation support, ANP-06 is still a draft, and the 1.2 documents disagree with each other in places. The skill takes the **track** posture: follow the pinned 1.2 release, implement only what a named ANP peer needs, keep it behind an adapter, and let nothing else depend on it.

## Versions

| Line    | Status                |
| ------- | --------------------- |
| ANP 1.2 | current (track)       |
| ANP 1.0 | legacy (upgrade from) |

ANP 1.1 is folded into the 1.2 line. `references/versions.md` explains what changed in each release and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AgentNetworkProtocol at tag v1.2](https://github.com/agent-network-protocol/AgentNetworkProtocol/tree/v1.2) (commit 26ff75c6, 24 September 2026): ANP-02, ANP-03, ANP-07 and ANP-08 (Released 1.2) and ANP-06 (Draft).
- The v1.1 and V1.0 tags for history and the legacy line.
- [agent-network-protocol.com](https://agent-network-protocol.com/) and its [Agent Description page](https://agent-network-protocol.com/specs/1.2/agent-description): informative mirrors.
- RFC 9421 (HTTP Message Signatures), RFC 9530 (Digest Fields), RFC 7638 (JWK Thumbprint), the IANA Well-Known URIs registry, W3C DID Core and Data Integrity EdDSA Cryptosuites.

## License

MIT
