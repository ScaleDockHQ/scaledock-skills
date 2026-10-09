# Agent Description, discovery and meta-protocol negotiation

This covers ANP-07 (Agent Description, Released 1.2), ANP-08 (Agent Discovery, Released 1.2) and ANP-06 (meta-protocol, Draft, document version 1.2), all at tag `v1.2`. ANP-07 and ANP-08 have no numbered sections, so they are cited by heading; ANP-06 is cited by section number.

## Contents

- [Agent Description document](#agent-description-document)
- [Information and interfaces](#information-and-interfaces)
- [Security definitions](#security-definitions)
- [Human authorization](#human-authorization)
- [Proof](#proof)
- [Active discovery](#active-discovery)
- [Passive discovery](#passive-discovery)
- [Meta-protocol negotiation](#meta-protocol-negotiation)
- [Negotiation errors](#negotiation-errors)
- [Known inconsistencies in 1.2](#known-inconsistencies-in-12)

## Agent Description document

ANP-07, "Agent Description Document" and its field table.

The Agent Description (AD) is the agent's public entry point, comparable to a homepage. It is plain JSON. The ANP-07 example is annotated JSONC; strip the comments before sending it. A DID Document points to it through an `AgentDescription` service (ANP-03 § 2.5).

| Field                 | Required | Meaning                                                                                                                 |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `protocolType`        | yes      | Fixed `"ANP"`.                                                                                                          |
| `protocolVersion`     | yes      | ANP protocol version; currently `"1.0.0"`, even in the 1.2 release.                                                     |
| `type`                | yes      | `"AgentDescription"`.                                                                                                   |
| `name`                | yes      | Human-readable name.                                                                                                    |
| `securityDefinitions` | yes      | Named security schemes.                                                                                                 |
| `security`            | yes      | The name of the scheme that applies to the whole agent.                                                                 |
| `url`                 | no       | Where this document lives.                                                                                              |
| `did`                 | no       | The agent's DID.                                                                                                        |
| `owner`               | no       | Object with `type`, `name`, `url`.                                                                                      |
| `description`         | no       | What the agent does.                                                                                                    |
| `created`             | no       | ISO 8601 creation time.                                                                                                 |
| `Infomations`         | no       | Array of information resources. The field name is spelled this way in the specification; see the inconsistencies below. |
| `interfaces`          | no       | Array of interfaces.                                                                                                    |
| `proof`               | no       | Integrity proof.                                                                                                        |

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "AgentDescription",
  "url": "https://example.com/agents/assistant/ad.json",
  "name": "Example Assistant",
  "did": "did:wba:example.com:agents:assistant:e1_<fingerprint>",
  "securityDefinitions": {
    "didwba_sc": { "scheme": "didwba", "in": "header", "name": "Authorization" }
  },
  "security": "didwba_sc",
  "interfaces": [
    {
      "type": "NaturalLanguageInterface",
      "protocol": "YAML",
      "version": "1.2.2",
      "url": "https://example.com/api/nl-interface.yaml",
      "description": "Conversational interface."
    }
  ]
}
```

The example uses an `e1_` DID because ANP-03 § 2.2.1 requires one for new path DIDs; the ANP-07 example's DID lacks it.

## Information and interfaces

ANP-07, "Core Concepts", "Information Object Field Descriptions", "Interface Object Field Descriptions", "Product Description Document", "OpenRPC Interface Description Document" and "MCP Server Interface Document Description".

- An information object has `type` (for example `Product`, `Information`, `VideoObject`), `description` and `url`. Product documents reuse schema.org Product vocabulary, with the same `protocolType`, `protocolVersion` and `type` header.
- An interface object has `type` (`NaturalLanguageInterface` or `StructuredInterface`), `protocol` (for example `YAML`, `openrpc`, `MCP`, `WebRTC`), `version`, `url`, `description` and optional `humanAuthorization`. A structured interface MAY embed its definition in `content` instead of linking it with `url`.
- OpenRPC interface documents use OpenRPC `1.3.2`.
- The MCP interface document section is "To be supplemented": there is no defined shape for an MCP interface yet.
- ANP-07 recommends that every agent offer a natural-language interface, and that callers prefer a structured interface when one meets the need.
- ANP-06 adds a third interface type, `MetaProtocolInterface` (see below).

## Security definitions

ANP-07, "Security Mechanism" and "DIDWBASecurityScheme".

- A scheme has `scheme` (`didwba`), `in` (`header`, `query`, `body`, `cookie`, `uri` or `auto`; with `auto`, omit `name`) and `name`, plus optional `type` and `description`.
- `security` at the top level applies to every resource; `security` inside a resource overrides it for that resource.
- The usual configuration names the `Authorization` header. That only describes where an optional Bearer token goes after the first exchange. The first request is still signed with ANP-02 `Signature-Input`, `Signature` and `Content-Digest`.
- The AD describes how to access the agent; it never contains keys, passwords or anything else that grants access.
- did:wba and native did:web share the ANP-02 flow. `didwba` is retained vocabulary, not a claim that other DID methods are supported; interfaces should state which methods actually work.

## Human authorization

ANP-07, "Human Manual Authorization"; ANP-02 § 5.

`humanAuthorization: true` on an interface means a human must approve calls, for example purchases. It is a requirement, not evidence of approval and not a DID verification relationship. How approval is obtained and proved is up to the business protocol. ANP-02 § 5 suggests a different marker, `authorizationLevel` (`normal` or `user-presence-required`); see the inconsistencies below.

## Proof

ANP-07, "Proof (Integrity Verification)".

The optional `proof` follows W3C Data Integrity:

- `domain`: the domain the AD is served from. After fetching, the consumer MUST check the fetch domain equals `domain`; a mismatch suggests forgery.
- `challenge`: required whenever `domain` is set.
- `verificationMethod`: a verification method in the agent's did:wba document.
- `proofValue`: remove `proofValue`, canonicalize the document with JCS (RFC 8785), hash it with SHA-256, sign the hash, and encode the signature as URL-safe base64. Verification reverses this.

The ANP-07 example proof type is `EcdsaSecp256r1Signature2019` with a base58-looking `proofValue`, which does not match the URL-safe base64 rule or the Ed25519 `e1_` key. Agree the proof type with the peer before relying on AD proofs.

## Active discovery

ANP-08, "Active Discovery", ".well-known URI", "Discovery Document Format", "Pagination Mechanism".

- Serve `https://{domain}/.well-known/agent-descriptions`, listing every public AD on the domain.
- The document is JSON-LD: `@context` (schema.org as `@vocab`, plus `did` and `ad` prefixes), `@type` `"CollectionPage"`, `url`, `items`, and optional `next`.
- Each item has `@type` `"ad:AgentDescription"`, `name`, and `@id` (the AD URL).
- Clients follow `next` until it is absent. ANP-08 sets no page or loop limit, so a crawler has to choose its own.
- List only public agents (ANP-08, "Security Considerations").

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "did": "https://w3id.org/did#",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "CollectionPage",
  "url": "https://example.com/.well-known/agent-descriptions",
  "items": [
    {
      "@type": "ad:AgentDescription",
      "name": "Example Assistant",
      "@id": "https://example.com/agents/assistant/ad.json"
    }
  ],
  "next": "https://example.com/.well-known/agent-descriptions?page=2"
}
```

`agent-descriptions` is not in the IANA Well-Known URIs registry; ANP-08 cites RFC 8615 but registers nothing.

## Passive discovery

ANP-08, "Passive Discovery", "Registration API", "Security Considerations".

The agent reads a search service agent's AD, finds its registration API, and submits its own AD URL. The registration API is defined by each search service in its AD; ANP-08 defines no common shape. Search services should validate the AD, authenticate the registrant with ANP-02, and rate-limit.

## Meta-protocol negotiation

ANP-06 § 1 to § 13. **Draft, not part of the released 1.2 architecture.** Negotiation is optional: implement it only when a peer requires it.

Flow (ANP-06 Abstract, § 6): discovery -> Agent Description -> `MetaProtocolInterface` -> `anp.get_capabilities` -> `anp.negotiate` -> selected interface, profile, security profile and schema -> business call.

**Declaration** (§ 5.2). A `MetaProtocolInterface` in the AD `interfaces` array:

| Field                                                                                | Level  | Value                                                    |
| ------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------- |
| `type`                                                                               | MUST   | `MetaProtocolInterface`                                  |
| `profile`                                                                            | MUST   | `anp.meta.negotiation.v1`                                |
| `binding`                                                                            | MUST   | `jsonrpc-2.0`                                            |
| `url`                                                                                | MUST   | Negotiation endpoint; a static hint                      |
| `methods`                                                                            | MUST   | Includes `anp.negotiate`, usually `anp.get_capabilities` |
| `id`, `protocol` (`ANP`), `version`, `securityProfiles`, `negotiates`, `description` | SHOULD |                                                          |
| `security`, `inputSchema`, `outputSchema`                                            | MAY    |                                                          |

`negotiates` values (§ 5.3): `profiles`, `interfaces`, `schemas`, `security_profiles`, `content_types`, `execution_modes`, `protocol_artifacts`. Reusing one ANP endpoint (for example `https://example.com/anp`) is preferred (§ 5.5).

**Authority order** (§ 3.4). Trust the DID Document and its `ANPMessageService` for identity and endpoints, then `anp.get_capabilities` for runtime capabilities, then the AD's `MetaProtocolInterface` as a hint. When a static hint conflicts with runtime capabilities, the caller MUST use the runtime result and refresh its cache.

**Minimum support** (§ 4.3): declare the profile in runtime capabilities, handle `anp.negotiate`, read the basic `MetaProtocolInterface` fields, negotiate under `transport-protected`, return a structured result, return explicit errors, and never treat a result as authorization.

**Request** (§ 3.3, § 7). A JSON-RPC 2.0 request with `method` `anp.negotiate` and `params.meta`, `params.auth` and `params.body`. `params.meta.profile` MUST be exactly `anp.meta.negotiation.v1`; `meta` also carries `security_profile`, `sender_did`, `target`, `operation_id`, `created_at`, `content_type`. Body fields:

| Field                                                                                 | Level  | Meaning                                                                                                                                                                          |
| ------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent`                                                                              | MUST   | `name`, `description`, `intentTags`, optional `inputSummary`; disclose the minimum                                                                                               |
| `negotiation_id`                                                                      | SHOULD | Process identifier                                                                                                                                                               |
| `mode`                                                                                | SHOULD | Default `structured_selection`; or `natural_language_protocol_drafting`                                                                                                          |
| `callerCapabilities`                                                                  | SHOULD | `supportedProfiles`, `supportedSecurityProfiles`, `supportedContentTypes`, `supportedExecutionModes`, `limits`                                                                   |
| `requiredCapabilities`, `constraints`, `candidateInterfaceRefs`, `candidateProtocols` | MAY    | `constraints` covers `preferredInterfaceTypes`, `requiresHumanAuthorization`, `maxLatencyMs`, `allowNaturalLanguageFallback`, `requiredSecurityProfile`, `preferredContentTypes` |

**Result** (§ 8). `negotiationId` (MUST), `status` (MUST: `accepted`, `rejected` or `needs_more_information`), `selected` (MUST when accepted: `capability`, `interface`, `protocol`, `profile`, `securityProfile`, `contentType`, `url`, optional `protocolArtifact`), `execution` (SHOULD; `mode` is one of `direct_structured_call`, `direct_message`, `group_message`, `async_task`, `stream`, `natural_language`, `natural_language_protocol_drafting`), `negotiationDigest` (SHOULD), and optional `schemas`, `validUntil`, `alternatives`, `reason`.

**Caching** (§ 10.1). Key on at least the target DID, the caller DID or capability digest, the intent digest, the selected interface, `selected.profile`, `selected.securityProfile` and `negotiationDigest`. Renegotiate when `validUntil` passes, capabilities or the DID Document change, a business call reports an unsupported selection, or policy or authorization state changes.

**Natural-language drafting** (§ 9, § 10.2, § 12.5) is a fallback. A drafted protocol is not stable until both sides accept it. Verify an artifact's digest, publisher, schemas and dependencies, and never execute remote code; any code generation is local and sandboxed.

**Security** (§ 12):

- `anp.get_capabilities` MAY be anonymous. Send `auth.origin_proof` with `anp.negotiate` whenever it includes `sender_did`, sensitive intent, user context, restricted, payment, booking or identity capabilities, or non-public interfaces.
- A result never approves an action, authorizes access, creates a transaction or replaces the business profile's proof; `humanAuthorization` still applies.
- Never silently downgrade a security profile (for example `direct-e2ee` to `transport-protected`); return an error instead.
- Redact negotiation logs.

**Deprecation** (§ 13). The early model, with a binary `PT=00` header inside encrypted messages, `sourceHello` and `destinationHello` and code-generation flows, is deprecated. New implementations MUST NOT implement or depend on it, and no compatibility mapping exists.

## Negotiation errors

ANP-06 § 11. JSON-RPC `error` objects with `error.data.anp_code`:

| Code | `anp_code`                           |
| ---- | ------------------------------------ |
| 1600 | `meta.negotiation_rejected`          |
| 1601 | `meta.no_matching_interface`         |
| 1602 | `meta.unsupported_negotiation_mode`  |
| 1603 | `meta.unsupported_candidate_profile` |
| 1604 | `meta.unsupported_security_profile`  |
| 1605 | `meta.unsupported_content_type`      |
| 1606 | `meta.more_information_required`     |
| 1607 | `meta.authorization_required`        |
| 1608 | `meta.negotiation_expired`           |

## Known inconsistencies in 1.2

Handle these explicitly with the peer rather than guessing:

- **AD field spelling.** ANP-07's example and field table use `Infomations`. Accept it on input; emit what the peer reads.
- **AD format.** ANP-07 defines plain JSON (`type`, no `@context`); ANP-08 still describes the AD as JSON-LD and lists items as `ad:AgentDescription`.
- **Example DIDs.** ANP-07's example path DID has no `e1_` segment, which ANP-03 § 2.2.1 requires for new path DIDs.
- **AD proof type.** ANP-07's example uses `EcdsaSecp256r1Signature2019`; did:wba `e1_` keys are Ed25519.
- **Human approval marker.** ANP-07 uses `humanAuthorization`; ANP-02 § 5 suggests `authorizationLevel`.
- **Undefined dependencies.** `anp.get_capabilities`, `auth.origin_proof` and the `transport-protected` and `direct-e2ee` security profiles are defined in ANP Core Binding and messaging profiles, outside this skill's scope.
