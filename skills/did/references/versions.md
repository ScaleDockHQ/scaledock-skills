# Versions and upgrades

Read this when choosing which DID version to produce or consume, reading a DID document or resolver written for another version, upgrading one, or deciding how far to go with DID 1.1. Sources: the DID 1.0 Recommendation, the DID 1.1 Candidate Recommendation Snapshot and its Revision History (Appendix C), the DID 1.1 editor's draft, the DID Resolution 1.0 Candidate Recommendation Draft and its Revision History (Appendix C), and the W3C publication history pages, listed in [Sources](../SKILL.md#sources). Citations name the document and section: "DID 1.0 § 6.3", "DID 1.1 § 5.2", "Resolution § 4.4".

## Version lines

There are two families. DID Core (no family) defines the identifier syntax, the DID document data model and representations. DID Resolution (family `resolution`) is a separate W3C specification for the resolution and dereferencing interface, versioned on its own.

| Id               | Line               | Status  | Revision                                                         | Posture | Summary                                                                                                          |
| ---------------- | ------------------ | ------- | ---------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `1.1-preview`    | DID 1.1            | preview | Candidate Recommendation Snapshot `CR-did-1.1-20260305`          | build   | Layers DID documents on Controlled Identifiers v1.0, one `application/did` media type, `v1.1` context.           |
| `1.0`            | DID 1.0            | current | W3C Recommendation `REC-did-core-20220719` (19 July 2022)        |         | The default target: syntax, data model, JSON and JSON-LD representations, resolution interface, method rules.    |
| `resolution-1.0` | DID Resolution 1.0 | current | Candidate Recommendation Draft `CRD-did-resolution-1.0-20261001` | build   | `resolve()` and `dereference()`, DID parameters, RFC 9457 errors, the HTTP(S) binding. The only resolution line. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. DID Resolution 1.0 is `current` with a posture because it is the only line of its specification and it is still a Candidate Recommendation (ADR 0004).

Notes on the pins:

- `https://www.w3.org/TR/did-core/` redirects to `https://www.w3.org/TR/did/`, which on 2026-10-05 serves the DID 1.0 Recommendation (`REC-did-core-20220719`). `https://www.w3.org/TR/did-1.0/` serves the same document.
- DID 1.1 has been a Candidate Recommendation Snapshot since 5 March 2026. Its status section says it would not advance to Recommendation before 5 April 2026, and lists as an exit criterion that DID Resolution has met its own Candidate Recommendation exit criteria (DID 1.1, Status of This Document). The editor's draft at `https://w3c.github.io/did/` (commit `a2bb463`, 27 August 2026) carries the same Revision History as the snapshot.
- DID 1.1 calls the resolution specification "DID Resolution v0.3". The W3C now publishes it as "Decentralized Identifier Resolution (DID Resolution) v1" at `did-resolution-1.0`: Working Drafts until 24 July 2026, a Candidate Recommendation Snapshot on 6 August 2026, and Candidate Recommendation Drafts on 28 August and 1 October 2026 (W3C history page for `did-resolution-1.0`). There is no separately published v0.3 line to target.
- DID Resolution 1.0 cites DID 1.0 normatively (Resolution, Normative references) but its examples use the DID 1.1 context and `application/did`. It works with documents of either DID line.

## Which version to use

- **DID documents and DIDs:** produce and consume DID 1.0. It is the only DID Recommendation. The DID syntax ABNF is identical in DID 1.0 and DID 1.1 (DID 1.0 § 3.1, DID 1.1 § 3.1), so a DID parser serves both.
- **DID 1.1 (posture build):** implement it behind a version switch when a named peer produces or expects DID 1.1 documents: the `https://www.w3.org/ns/did/v1.1` context, `application/did`, `Multikey` or `JsonWebKey` verification methods. Do not make it the default until it is a Recommendation. Accepting DID 1.1 documents as a consumer is lower risk than emitting them.
- **Resolution:** build resolvers and clients to DID Resolution 1.0 § 4 (`resolve()`, metadata, errors) with posture build: implement it, keep the shapes in one module, and watch for changes. Section 5 (DID URL dereferencing), section 6 (the provisional alternative dereferencing algorithm), section 8 (architectures) and section 10 (the dereferencing result) are marked "Feature at Risk" and may be heavily modified or removed (Resolution § 5, § 8, § 10). Keep code that depends on them isolated.
- **Clients of older resolvers:** a resolver written only to DID 1.0 § 7 returns keyword errors such as `notFound` and may implement `resolveRepresentation()`. Accept both error shapes when you call a resolver you do not control.

## What changed

### DID 1.1 (from DID 1.0)

From DID 1.1 Appendix C ("Changes since the DID v1.0 Recommendation") and a comparison of the two texts:

- Refactored to layer on Controlled Identifiers v1.0 (CID). The core property tables now point to CID § 2 for `alsoKnownAs`, `service`, verification methods and verification relationships, with DID-specific restrictions (DID 1.1 § 5, App. C).
- One media type: "Consolidated media types to `application/did` after IANA registration process completed" (DID 1.1 App. C). DID 1.1 defines a single JSON representation that is also compatible with JSON-LD processing, and producers MUST specify `application/did` for both plain JSON and JSON-LD serializations (DID 1.1 § 6.2.1, § 6.2.3). DID 1.0 had two: `application/did+json` and `application/did+ld+json` (DID 1.0 § 6.2.1, § 6.3.1). The IANA media types registry (last updated 2026-09-24) lists `application/did` and does not list `did+json` or `did+ld+json`.
- New JSON-LD context `https://www.w3.org/ns/did/v1.1`, which implementations MUST treat as already retrieved, with a published SHA2-256 digest `ea216ecc1cb02cd39b693dba2250141e270ba0bf95890be107dd9a9e8e43de85` (DID 1.1 § 6.2.3, § 6.2.4).
- Resolution and dereferencing moved to the DID Resolution specification (DID 1.1 App. C). DID 1.0 § 7 (`resolve`, `resolveRepresentation`, `dereference`, metadata) and the DID parameters table of DID 1.0 § 3.2.1 have no counterpart in DID 1.1; DID Resolution § 3 and § 4 carry them.
- Verification method types `Multikey` (`publicKeyMultibase`) and `JsonWebKey` (`publicKeyJwk`) come from CID § 2.2.2 and § 2.2.3; all DID 1.1 examples use them (DID 1.1 § 5, App. A).
- A verification method `id` MAY now be a relative DID URL: it MUST conform to DID URL syntax or Relative DID URLs (DID 1.1 § 5.2). DID 1.0 required DID URL syntax (DID 1.0 § 5.2).
- Service `serviceEndpoint` strings MUST be valid URLs per the URL Standard (DID 1.1 § 5, Service properties), where DID 1.0 required RFC 3986 URIs normalized per RFC 3986 (DID 1.0 § 5.4).
- New guidance on identifier restrictions: no query or fragment in subject and controller identifiers, query parameters discouraged in long-lived identifiers, fragments unique and not reused (DID 1.1 § 5.1.3).
- New media type precision guidance for payloads tagged `application/json` or `application/ld+json` (DID 1.1 § 6.3.1).
- "Clarified fragment resolution algorithm": fragments follow CID § 3.4 as extended by DID 1.1 (DID 1.1 App. C, App. E.1).
- Security and privacy sections now defer to CID § 5 and § 6 for rotation, revocation, expiration, content integrity and correlation; "Herd Privacy" is renamed "Group Privacy" (DID 1.1 § 8, § 9.1).

### DID Resolution 1.0 (from DID 1.0 § 7)

From DID Resolution Appendix C and a comparison with DID 1.0 § 7:

- One abstract function `resolve(did, resolutionOptions)`; `resolveRepresentation()` is gone (Resolution § 4, App. C). `dereference(didUrl, dereferenceOptions)` keeps its shape (Resolution § 5).
- Errors are RFC 9457 problem details whose `type` is a URL such as `https://www.w3.org/ns/did#NOT_FOUND` (Resolution § 4.2, § 11). DID 1.0 used single keyword strings: `invalidDid`, `notFound`, `representationNotSupported`, `invalidDidUrl` (DID 1.0 § 7.1.2, § 7.2.2). New error types: `INVALID_DID_DOCUMENT`, `METHOD_NOT_SUPPORTED`, `INVALID_OPTIONS`, `INTERNAL_ERROR`, `FEATURE_NOT_SUPPORTED` (Resolution § 11).
- New resolution options `expandRelativeUrls`, `versionId`, `versionTime` (Resolution § 4.1) and `noCache` (Resolution § 13.2); new dereferencing option `verificationRelationship` (Resolution § 5.1). `accept` uses the HTTP `Accept` header syntax (Resolution § 4.1); in DID 1.0 it was a single media type and MUST NOT be used with `resolve` (DID 1.0 § 7.1.1).
- `contentType` in resolution metadata is OPTIONAL (Resolution § 4.2); DID 1.0 required it for `resolveRepresentation` and forbade it for `resolve` (DID 1.0 § 7.1.2).
- DID parameters: `serviceType` is new; `hl` is not listed; values are scalar strings serialized into ASCII per RFC 3987 § 3.1; `versionTime` selects "the most recent version of the DID document that was valid for a DID before the specified versionTime" (Resolution § 3). DID 1.0 described it as the document "valid for a DID at a certain time" (DID 1.0 § 3.2.1).
- Metadata values may now also be numbers (Resolution § 7); DID 1.0 allowed string, map, list, set, boolean and null (DID 1.0 § 7.3).
- A normative HTTP(S) binding with an error-to-status table, `410` for deactivated DIDs and `303` redirects to service endpoints (Resolution § 12.1).
- Registration moves from the DID Specification Registries to the DID Extensions notes (Resolution App. C, § 4.1, § 4.3).
- A query normalization section and new security sections on dereferencing cycles, `relativeRef` path traversal, cache-key normalization and parameter injection (Resolution § 3.2, § 13.6, § 13.7).

## Upgrading

### DID 1.0 to DID 1.1 (preview, posture build: only behind a version switch)

1. Change the version marker: set `@context` to `https://www.w3.org/ns/did/v1.1`, or an array whose first item is that string (DID 1.1 § 6.2.3). Serve and label the document `application/did` instead of `application/did+json` or `application/did+ld+json` (DID 1.1 § 6.2.1, § 6.2.3).
2. Replace removed or renamed constructs:
   - Express keys as `Multikey` with `publicKeyMultibase` or `JsonWebKey` with `publicKeyJwk` (CID § 2.2.2, § 2.2.3). Suite-specific types such as `JsonWebKey2020` or `Ed25519VerificationKey2020` are not defined by DID 1.1; registered ones are listed in DID Extensions Properties § 3.1.
   - Replace deprecated `publicKeyBase58` and `publicKeyHex` with `publicKeyMultibase` or `publicKeyJwk` (DID Extensions Properties § 2.3.2, § 2.3.3).
   - Check every `serviceEndpoint` string parses as a URL Standard URL (DID 1.1 § 5).
   - Move any resolution code that relied on DID 1.0 § 7 to DID Resolution 1.0 (next section).
3. Validate against the target: run the DID 1.1 checks in [`did-documents.md`](did-documents.md) and compute the SHA2-256 of any locally cached `v1.1` context against the digest in DID 1.1 § 6.2.4.
4. Keep behaviour unchanged: the same DID, the same verification methods in the same verification relationships, the same services. Consumers that only understand DID 1.0 will not recognize the `v1.1` context; keep emitting DID 1.0 for them.

### DID 1.0 § 7 resolver to DID Resolution 1.0

1. Change the version marker: expose `resolve(did, resolutionOptions)` per Resolution § 4 and drop `resolveRepresentation`; return the document plus `contentType` when you know the representation.
2. Replace removed or renamed behaviour:
   - Map keyword errors to RFC 9457 objects: `invalidDid` to `https://www.w3.org/ns/did#INVALID_DID`, `notFound` to `#NOT_FOUND`, `representationNotSupported` to `#REPRESENTATION_NOT_SUPPORTED`, `invalidDidUrl` to `#INVALID_DID_URL` (DID 1.0 § 7.1.2, § 7.2.2; Resolution § 11).
   - Add `METHOD_NOT_SUPPORTED`, `FEATURE_NOT_SUPPORTED`, `INVALID_OPTIONS` and `INTERNAL_ERROR` at the steps of the resolution algorithm that define them (Resolution § 4.4).
   - Accept `versionId`, `versionTime`, `expandRelativeUrls` and, if you support it, `noCache` as options (Resolution § 4.1, § 13.2).
   - Over HTTP, follow the binding: GET is required, TLS is required, and errors map to the status table (Resolution § 12.1).
3. Validate against the target: run the resolution checks in [`resolution.md`](resolution.md), including an invalid DID, an unsupported method, a missing DID and a deactivated DID.
4. Keep behaviour unchanged: the same DID resolves to the same document and document metadata. Clients that parse `"error": "notFound"` need a transition period or a mapping layer.

## Preview: DID 1.1

DID 1.1 is a Candidate Recommendation Snapshot (`CR-did-1.1-20260305`), and the editor's draft has no substantive change since. Posture: **build**. Implement production and consumption of DID 1.1 documents behind a version switch, keyed on the `@context` value, and keep DID 1.0 the default for producers. Do not emit `v1.1` documents to consumers that have not opted in. Watch the W3C history page for `did-1.1` and the editor's draft for a Proposed Recommendation; its exit criteria tie it to DID Resolution leaving Candidate Recommendation. When DID 1.1 becomes a Recommendation: make it current, make DID 1.0 supported, update the default `@context` and media type, and turn the upgrade section above into the default path.
