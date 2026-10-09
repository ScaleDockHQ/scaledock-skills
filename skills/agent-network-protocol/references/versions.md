# ANP version lines

ANP is published as a set of numbered documents in the `agent-network-protocol/AgentNetworkProtocol` GitHub repository, mirrored on agent-network-protocol.com. Releases are git tags. The repository README lists each document's status; publishing a specification there does not mean SDK or product support exists.

## Version lines

| Line    | Id        | Status  | Release                                        | Posture               |
| ------- | --------- | ------- | ---------------------------------------------- | --------------------- |
| ANP 1.2 | `anp-1.2` | current | tag `v1.2`, commit 26ff75c6, 24 September 2026 | track                 |
| ANP 1.0 | `anp-1.0` | legacy  | tag `V1.0`, commit 275339a, 19 May 2025        | read and upgrade only |

ANP 1.1 (tag `v1.1`, commit 6fc3854, 27 June 2026) is folded into the 1.2 line: for the documents this skill covers, 1.2 only reorganised and added to 1.1 (see What changed). Tags `v0.0.1` and `v0.0.2` predate 1.0 and are not covered. Tags named `release-YYYYMMDD` are website production releases, not specification versions.

Document status at `v1.2`:

| Document                                                                       | Status                                                   | In this skill |
| ------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------- |
| ANP-02 DID Authentication                                                      | Released 1.2                                             | yes           |
| ANP-03 did:wba Method                                                          | Released 1.2                                             | yes           |
| ANP-06 Meta-Protocol                                                           | Draft, document version 1.2                              | yes, as draft |
| ANP-07 Agent Description                                                       | Released 1.2                                             | yes           |
| ANP-08 Agent Discovery                                                         | Released 1.2                                             | yes           |
| ANP-01 white paper, ANP-04 WNS naming, ANP-09 messaging and messaging profiles | various                                                  | no            |
| ANP-05 DID-Based Authorization                                                 | Draft v0.6 on main after `v1.2`, outside the 1.2 release | no            |

## Which version to use

- **New integrations:** ANP 1.2, posture track. Build only what a named peer needs, behind an adapter.
- **Peers still on 1.0:** read their `Authorization: DIDWba` headers and JSON-LD descriptions in a legacy reader if you must, but answer in 1.2 and plan their upgrade. Never emit 1.0 shapes from new code.
- **ANP-06:** use only when a peer requires negotiation; it can change before release.

### Why track

Track means: follow the pinned release, keep the integration behind an adapter, and let nothing else depend on it.

- **No standards body.** ANP is an open-source community project (copyright "ANP Community" on main since 1 October 2026; earlier releases name a single author). There is no IETF, W3C or similar process, review or IANA registration. `/.well-known/agent-descriptions` is not in the IANA Well-Known URIs registry.
- **Unstable wire formats.** Between 1.0 (May 2025) and 1.1 (June 2026) authentication headers, DID syntax and the Agent Description format all broke.
- **No implementation commitment.** The README says publishing a specification does not establish SDK or product support.
- **Internal inconsistencies** in 1.2: the AD is plain JSON in ANP-07 but JSON-LD in ANP-08; the `Infomations` field spelling; ANP-07 examples use path DIDs without `e1_` and a P-256 proof type; `humanAuthorization` versus `authorizationLevel`; ANP-07's MCP interface section is empty.
- **Key parts are drafts.** ANP-06 is a draft "not released", and the authorization draft ANP-05 is outside the release.

Build would need a standards-track or at least stable, multi-implementer specification. Name would only fit if the value were reserving identifiers, which it is not.

## What changed

### 1.0 (tag `V1.0`)

- did:wba "V0.1": `did:wba:<domain>[:path...]` with no fingerprint segment; any key type.
- Authentication in a custom header: `Authorization: DIDWba did="...", nonce="...", timestamp="...", verification_method="key-1", signature="..."`, signing nonce, timestamp, service domain and DID; a JSON variant carried the same fields.
- Agent Description in JSON-LD: `@context` with schema.org and `ad:` prefixes, `@type` `"ad:AgentDescription"`, and interfaces typed `ad:NaturalLanguageInterface` and `ad:StructuredInterface`.
- Meta-protocol: a one-byte `PT` header inside end-to-end encrypted messages, with `sourceHello` and `destinationHello` flows and code generation.
- MIT licence.

### 1.1 (tag `v1.1`, folded into the 1.2 line)

- did:wba path DIDs end in `e1_<RFC 7638 Ed25519 thumbprint>`; active `e1_` documents need a `DataIntegrityProof` with `eddsa-jcs-2022`.
- Authentication moves to RFC 9421 HTTP Message Signatures plus RFC 9530 `Content-Digest`; challenges use `WWW-Authenticate: DIDWba`; tokens come back in `Authentication-Info`.
- Native did:web compatibility added as an appendix to the did:wba specification.
- Agent Description becomes plain JSON with `protocolType`, `protocolVersion` and `type`.
- ANP-06 rewritten as an independent JSON-RPC negotiation profile, `anp.meta.negotiation.v1` with `anp.negotiate` (then labelled 2.0-draft); `PT=00` deprecated.

### 1.2 (tag `v1.2`)

- Authentication extracted from ANP-03 into a method-independent ANP-02; native did:web becomes ANP-02 Appendix B, and did:wba-only rules MUST NOT be applied to it.
- did:wba gains continuity rules: `deactivated`, `successorDid`, `alsoKnownAs`, assurance levels and the 409 `did_superseded` response.
- ANP-07 clarifies that `Authorization` in `securityDefinitions` covers only the later Bearer token, and that `humanAuthorization` is not evidence of approval.
- Licence changes to Apache-2.0.

## Upgrading

### From 1.1 to 1.2

No wire change for the covered surface. Read ANP-02 instead of ANP-03 § 3 for authentication, publish superseded documents with `deactivated` and `successorDid` instead of deleting them, and validate native did:web peers under did:web rules only.

### From 1.0 to 1.2

1. **Mint new DIDs.** Generate an Ed25519 binding key, compute the `e1_` fingerprint and publish a new path DID with a `DataIntegrityProof`. Bare-domain DIDs can stay but need the 1.2 contexts. Old path DIDs may still be parsed (ANP-03 § 2.2.1) but are not created.
2. **Replace authentication.** Drop `Authorization: DIDWba did=...`; sign with `Signature-Input` and `Signature` over `@method`, `@target-uri` and `content-digest`, with `keyid` as a full DID URL. Read tokens from `Authentication-Info`, not from a response `Authorization` header.
3. **Rewrite the Agent Description.** Remove `@context` and `@type`; add `protocolType` `"ANP"`, `protocolVersion` `"1.0.0"` and `type` `"AgentDescription"`; turn `ad:`-prefixed interface types into `NaturalLanguageInterface` and `StructuredInterface`; keep `securityDefinitions` and `security`.
4. **Keep the discovery document.** ANP-08's `/.well-known/agent-descriptions` collection is still JSON-LD with `ad:AgentDescription` items.
5. **Drop `PT` negotiation.** Replace it with `anp.negotiate`, or no negotiation.

## Preview

ANP-06 is a draft inside the 1.2 release and ANP-05 (authorization) is a draft on main after it. Neither is a separate line. When either is released, or a new tag appears, re-read the documents, update the pins and the "What changed" section, and decide whether it adds a line.
