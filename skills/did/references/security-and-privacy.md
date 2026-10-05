# Security and privacy

Read this when reviewing a DID-based design, verifying proofs made with DID keys, rotating or revoking keys, publishing a DID document, or choosing what to put in one. Sources: DID 1.0 § 9 and § 10, DID 1.1 § 8 and § 9, Controlled Identifiers v1.0 (CID) § 5 and § 6, and DID Resolution § 13 and § 14, listed in [Sources](../SKILL.md#sources). These sections are non-normative guidance unless a MUST is quoted. DID 1.1 moves the general material into CID § 5 and § 6 and keeps the DID-specific parts (DID 1.1 § 8, § 9).

## Proving control

- Proofs inside a DID document or its metadata do not by themselves prove control of a DID, or that the document is the correct one. To get the correct document and verify control, run DID resolution as the DID method defines it (DID 1.0 § 9.2).
- Proving control uses the `authentication` and `capabilityInvocation` relationships: the secret material behind those verification methods signs as part of an authentication or authorization protocol (DID 1.0 § 9.2).
- Binding a DID to a real-world person or organization is done with `assertionMethod`, for example through Verifiable Credentials whose subject is the DID. Balance such bindings against privacy (DID 1.0 § 9.2, § 10).
- Cryptographic proof of control is only one factor for high-stakes decisions. Control can be transferred by handing over the keys, and cryptography cannot show whether a key has also been copied (DID 1.0 § 9.16, DID 1.1 § 8.10).
- DIDs are valid contextually: a persistent DID does not imply the same subject or the same controller over time (DID 1.0 § 9.16).
- When a service endpoint is for authentication or authorization, the endpoint provider, subject or requesting party is responsible for meeting the requirements of the protocols it supports (DID 1.0 § 9.3, CID § 5.11).

## Keys over time

### Expiration (DID 1.0 § 9.6, CID § 5.3)

There may be no central authority enforcing expiry, so verifiers check that key material was not expired when it was used, and may apply their own window, for example five minutes or 500 milliseconds. CID verification methods can carry optional `expires` and `revoked` datetimes (CID § 2.2).

### Rotation (DID 1.0 § 9.7, CID § 5.4)

- Add the new verification method, then deactivate or destroy the old secret material.
- Rotation is proactive. Do it regularly, and more often in higher-security environments.
- Rotation shows up only in the latest DID document.
- Proofs made with methods no longer in the latest document may need historical registry data to validate, which not every method offers.
- Not all methods support rotation.

### Revocation (DID 1.0 § 9.8, CID § 5.5)

- Revocation is reactive. Revoke a compromised verification method immediately.
- Removing a method from the document is the only form of revocation that applies to every method that supports revocation. It cannot change earlier versions.
- Until revocation, an attacker's use of a compromised key may be indistinguishable from the controller's.
- Revocation means proofs created after it should be treated as invalid. Verifiers decide for themselves about earlier proofs.
- Revocation is not retroactive only if the method can show the state of the DID at a past time or version, and the time or version of the statement can be determined reliably. Otherwise an attacker with a revoked key could backdate statements, and the only safe course is to consider only the present state of the DID (DID 1.0 § 9.8, Revocation Semantics).
- **Trustless revocation** (DID 1.0 § 9.8, DID 1.1 § 8.3): to verify a proof made with a since-revoked key, the method must support `versionId` or `versionTime` and the `updated` and `nextUpdate` metadata. Accept the proof only if:
  - the proof carries the `versionId` or `versionTime` of the document used when it was made;
  - the verifier can determine when the proof was made, for example because it is anchored on a blockchain;
  - the resolved metadata has `updated` before that time and `nextUpdate` after it.

### Recovery (DID 1.0 § 9.9, DID 1.1 § 8.4)

- Never reuse recovery key material for other purposes.
- Methods may support quorum recovery through `controller`, or time locks.
- There is no common recovery mechanism across methods.

### Non-repudiation (DID 1.0 § 9.4, DID 1.1 § 8.2)

Non-repudiation of DIDs and updates holds only if:

- the registry supports verifiable timestamps;
- the subject monitors for unauthorized updates;
- the subject had a chance to revert malicious updates.

Change notification helps with the monitoring, but a third-party monitoring service adds an attack vector (DID 1.0 § 9.5).

## Document integrity

- **External links:** protect links to external content with integrity protection such as hashlinks. Avoid such links when the document's integrity depends on them and they cannot be protected (DID 1.0 § 9.15, CID § 5.8).
- **JSON-LD contexts:** cache static copies or check them against known hashes (DID 1.0 § 9.15). DID 1.1 implementations MUST treat the `v1.1` context as already retrieved (DID 1.1 § 6.2.4). Resolvers that fetch contexts remotely should check them against a hash registry and fail on a mismatch (Resolution § 13.3).
- **Remote controllers:** when `controller` delegates change control to another document, the delegator can pin a cryptographic hash of that document (CID § 5.9).
- **Immutability:** methods should lock down what they do not need, for example by not letting a service change its `type` or a key change its value. Beware of caches holding stale partial state (DID 1.0 § 9.12, DID 1.1 § 8.7).
- **Encrypted data:** assume anything encrypted in a DID document will eventually be readable by the same audience. Encryption is not a way to protect personal data in a DID document. Avoid correlatable hints about recipients (DID 1.0 § 9.13, CID § 5.7).
- **Equivalence:**
  - `equivalentId` and `canonicalId` carry the same guarantees as the resolved `id`.
  - `alsoKnownAs` needs verification outside the DID method.
  - After verifying, guard against the values being substituted in memory or on disk (DID 1.0 § 9.14, DID 1.1 § 8.9).

## Resolution

- **Resolvers:** choose them carefully; no central authority binds a method name to a specification (DID 1.0 § 9.1, DID 1.1 § 8.1).
- **Bindings:** prefer local, verifiable resolution. For remote bindings, use a trusted, ideally self-hosted resolver over a secure channel (Resolution § 8).
- **Request handling:**
  - Detect dereferencing cycles.
  - Reject `relativeRef` path traversal.
  - Normalize DID URLs before caching.
  - Percent-encode caller-supplied parameter values (Resolution § 13.6, § 13.7).
- See [`resolution.md`](resolution.md) for the details.

## Human-friendly identifiers

DIDs give up memorability for global uniqueness (Zooko's Triangle). Mapping names, domains, phone numbers or emails to DIDs is out of scope for DID Core. Specifications that do it should consider deception attacks and the correlation risk of globally unique human identifiers (DID 1.0 § 9.10).

## Persistence and assurance

- **Persistence:** a controller who wants a DID to act as a persistent URN should pick a method that supports that, for example by evaluating methods with the rubric, and publish operational policies. Without them, do not assume persistence (DID 1.0 § 9.11).
- **Level of assurance:** regulated scenarios, for example under eIDAS, PSD2, NIST 800-63-3 or ISO/IEC 29115, may need assurance information about the authentication. DID Core does not define how to express it; Verifiable Credentials or a data model extension can carry it (DID 1.0 § 9.17, CID § 5.10).

## Privacy

- **No personal data in public DID documents.** Send it through Verifiable Credentials or services the subject controls. Avoid service URLs that contain usernames or other human-meaningful data. New DID-aware endpoints should identify the subject only by the DID itself (DID 1.0 § 10.1, § 10.6; CID § 6.1).
- **Pairwise DIDs:** use a DID unique to each relationship, as a pseudonym, and share a DID with several parties only when correlation is intended (DID 1.0 § 10.2, CID § 6.3).
- **Document correlation:** reusing verification methods or bespoke service endpoints across pairwise DIDs defeats them. Make verification methods unique per relationship. Unique endpoints, however, make traffic easy to separate, so a shared endpoint can be better (DID 1.0 § 10.3, CID § 6.4).
- **Subject classification:** do not add properties that reveal what kind of thing the subject is, even for IoT devices. Keep properties to cryptographic material, endpoints and verification methods (DID 1.0 § 10.4, CID § 6.5).
- **Herd (group) privacy:**
  - Share common settings and keep negotiated options to a minimum.
  - Use encrypted transport and pad messages to standard lengths (DID 1.0 § 10.5, DID 1.1 § 9.1).
- **Service privacy:**
  - Each extra endpoint adds correlation risk. Country-code domains can even reveal location.
  - For maximum herd privacy, rely on one endpoint that is a proxy or mediator.
  - Alternatives: negotiator endpoints, Tor endpoints, mediator endpoints, confidential storage and polymorphic proxies (DID 1.0 § 10.6, CID § 6.6).
- **Same-origin:** sharing verification methods and services across origins cuts the burden of registering keys but enables tracking. A same-origin-bound key is sometimes enough (CID § 6.2).
- **Resolution privacy:**
  - Resolvers can log and profile requesters, and so can `did:web` hosts and their DNS providers.
  - Use trusted resolvers, Oblivious HTTP or proxies (Resolution § 14.1, `did:web` DNS Privacy Considerations).
- **Methods:** each method must cover the RFC 6973 § 5 privacy topics (DID 1.0 § 8.4). Read the privacy section of every method you support (Resolution § 14.2).

## Review checklist

- [ ] Proofs are verified by resolving the DID and checking the verification relationship, not by trusting a signed document or `alsoKnownAs`.
- [ ] A key compromise has a written revocation and rotation path for every supported method, and verifiers know whether the method supports historical state.
- [ ] No personal data, human-meaningful URLs, subject-type hints or reused keys appear in public DID documents.
- [ ] JSON-LD contexts and external links are pinned by hash or cached locally.
- [ ] Resolution is local or goes through a trusted resolver, and the resolver's privacy exposure is understood.
