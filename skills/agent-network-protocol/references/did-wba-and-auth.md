# did:wba and ANP DID authentication

This covers ANP-03 (the `did:wba` DID method) and ANP-02 (DID-based HTTP request authentication), both Released at version 1.2, tag `v1.2`. ANP-03 has two sections numbered 2.5 ("DID Document Description" and "DID method operation") and no 2.3; this file cites the first as "§ 2.5 (document)" and the operations by their subsection numbers 2.5.1 to 2.5.5.

## Contents

- [Identifier syntax](#identifier-syntax)
- [The `e1_` fingerprint](#the-e1_-fingerprint)
- [DID Document](#did-document)
- [Resolving a DID](#resolving-a-did)
- [Rotating the binding key](#rotating-the-binding-key)
- [Signing a request](#signing-a-request)
- [Verifying a request](#verifying-a-request)
- [Access tokens](#access-tokens)
- [Errors and challenges](#errors-and-challenges)
- [Native did:web](#native-didweb)
- [Security and privacy checklist](#security-and-privacy-checklist)

## Identifier syntax

ANP-03 § 2.1 and § 2.2.

- The method name is `wba`.
- The host is a fully qualified domain name protected by TLS. Verifiers match it against the certificate's `subjectAltName` dNSName, not the Common Name, and IP addresses are not allowed (ANP-03 § 2.2; ANP-02 § 7).
- A port is written with its colon percent-encoded: `did:wba:example.com%3A3000`.
- Path segments are separated by colons.
- A bare-domain DID (`did:wba:example.com`) has no path and no fingerprint. It resolves to `https://example.com/.well-known/did.json` and is the preferred form for service DIDs and `serviceDid` (ANP-03 § 2.2, § 2.5.1).
- A path DID created under 1.2 MUST end in an `e1_` segment: `did:wba:example.com:user:alice:e1_<fingerprint>`. Parsers MAY accept historical path DIDs without one (ANP-03 § 2.2.1).
- The stable subject path is everything before the `e1_` segment (`example.com:user:alice`). Once assigned to a subject it MUST NOT be modified, recycled or reassigned, and a shared stable path alone does not prove two DIDs belong to the same subject (ANP-03 § 2.2.3, § 7).

ANP-03 Appendix A defines a non-default `k1_` secp256k1 extension. It is out of scope here; implement it only if a named peer uses it.

## The `e1_` fingerprint

ANP-03 § 2.2.2.

1. Generate an Ed25519 binding key.
2. Express its public key as a JWK with exactly `crv`, `kty` and `x` (`{"crv":"Ed25519","kty":"OKP","x":"..."}`).
3. Compute the RFC 7638 thumbprint: SHA-256 over the canonical JWK members in lexicographic order.
4. Encode the 32-byte digest as base64url without padding: 43 characters.
5. Prefix it with `e1_`.

The thumbprint is also recommended as the key's `kid`. Recompute the fingerprint on every resolution; never trust a stored one.

## DID Document

ANP-03 § 2.5 (document).

| Member               | Rule                                                                                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`           | Must include `https://www.w3.org/ns/did/v1`. `e1_` documents also need `https://w3id.org/security/data-integrity/v2` and `https://w3id.org/security/multikey/v1`. Add the X25519 suite context when there is a key-agreement key.      |
| `id`                 | The DID itself. No IP; port encoded as `%3A`.                                                                                                                                                                                          |
| `verificationMethod` | For an `e1_` DID, at least one Ed25519 `Multikey` with `publicKeyMultibase` whose thumbprint equals the `e1_` segment.                                                                                                                 |
| `authentication`     | Required. The binding key MUST be in it.                                                                                                                                                                                               |
| `assertionMethod`    | The key that signs the document proof MUST be in it.                                                                                                                                                                                   |
| `keyAgreement`       | Optional. An X25519 key (`X25519KeyAgreementKey2019`) for end-to-end encryption profiles; signing keys never do key agreement. Absent means no E2EE support.                                                                           |
| `service`            | `AgentDescription` (endpoint is an ANP-07 document), `ANPHandleService` (WNS handle binding, ANP-04), `ANPMessageService` (unified messaging endpoint, with `serviceDid` naming the DID that signs outer service-to-service requests). |
| `alsoKnownAs`        | Optional; on a successor document, MAY name the direct predecessor. A claim, not proof.                                                                                                                                                |
| `deactivated`        | `true` on a superseded document: no new authentication or routing.                                                                                                                                                                     |
| `successorDid`       | On a superseded document: the full DID of the direct successor only.                                                                                                                                                                   |
| `proof`              | Required for an active `e1_` document; see below.                                                                                                                                                                                      |

Proof fields (ANP-03 § 2.5.5): `type` `DataIntegrityProof`, `cryptosuite` `eddsa-jcs-2022`, `created`, `verificationMethod` (full DID URL of the Ed25519 Multikey), `proofPurpose` `assertionMethod`, `proofValue` (base58-btc multibase, `z...`), and optional `domain` and `challenge`. Generation and verification follow W3C Data Integrity and Data Integrity EdDSA Cryptosuites; ANP-03 does not redefine them and defers to them on conflict.

## Resolving a DID

ANP-03 § 2.5.2.

1. Replace `:` with `/` in the method-specific identifier, then percent-decode the port colon.
2. Prepend `https://`; if there is no path, append `/.well-known`; then append `/did.json`.
   - `did:wba:example.com` -> `https://example.com/.well-known/did.json`
   - `did:wba:example.com%3A3000:user:alice:e1_x` -> `https://example.com:3000/user/alice/e1_x/did.json`
3. GET over HTTPS with did:web's transport security; use DNS over HTTPS (RFC 8484) for the lookup; do not follow untrusted cross-origin redirects (ANP-02 § 7).
4. Check that the document's `id` equals the DID exactly.
5. For an active `e1_` DID (no `deactivated: true`), all of these MUST hold or resolution fails, regardless of local policy:
   - a top-level `proof` exists and verifies as `DataIntegrityProof` with `eddsa-jcs-2022`;
   - `proof.verificationMethod` is an Ed25519 Multikey;
   - the RFC 7638 thumbprint of that key equals the `e1_` segment.
6. For a deactivated `e1_` DID, the original binding key must still be present, and a `successorDid` must share the stable subject path. Grade the hop as below.
7. For bare-domain DIDs, only the `id` check applies; there is no path binding.

## Rotating the binding key

ANP-03 § 2.5.3, § 2.5.4, § 2.5.5, § 2.6, § 3.2, § 7.

Changing the binding key changes the DID. To migrate:

1. Mint the new `e1_` DID under the same stable subject path and publish its document, proved by the new key. It MAY list the predecessor in `alsoKnownAs`.
2. Keep the old document published, now with `deactivated: true` and `successorDid` set to the new DID, re-proved over the whole document.
3. Never rewrite an earlier `successorDid` to skip a generation, and never delete a superseded document.
4. Update with an atomic compare-and-swap on the current full DID (for example `expected_current_did`) so concurrent rotations cannot create two successors.

A verifier grades each hop:

| Assurance           | When                                                                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verified`          | The old document's proof is by its original binding key.                                                                                                                                                              |
| `recovery_verified` | The proof is by a recovery key that a trusted, pre-deactivation version of the old document listed in `assertionMethod`.                                                                                              |
| `provider_asserted` | No proof, but the whole chain was fetched over authenticated same-origin HTTPS, every hop checked, and it ends at a proof-valid active `e1_` DID; or the provider vouched through a separately authenticated channel. |
| `unverified`        | Anything less: a lone `successorDid`, `alsoKnownAs`, handle mapping, 409 hint or broken chain.                                                                                                                        |

A proof that is present but invalid kills the transition; it is never downgraded to `provider_asserted` or `unverified`. Cache only `verified` and `recovery_verified` edges. Limit chain length, detect cycles, and reject chains whose stable paths differ or where one old DID has two successors (ANP-03 § 2.6, § 7).

Servers MUST NOT authenticate a deactivated DID. When it has a successor they should answer `409 Conflict` with `Cache-Control: no-store` and a JSON body `{"code":"did_superseded","requestedDid":...,"currentDid":...,"stableSubjectId":...}`. `currentDid` is only a hint: the client re-resolves the old document, walks the chain, and re-signs with the verified current DID; a 301 or 302 does not replace this (ANP-03 § 3.1.2, § 3.2).

## Signing a request

ANP-02 § 3.1, with the did:wba constraints in ANP-03 § 3.1.1.

1. If there is a body, compute an RFC 9530 `Content-Digest` (for example `sha-256=:...:`).
2. Pick a key in the DID Document's `authentication`. For an `e1_` DID, sign with the binding key by default.
3. Build `Signature-Input` covering at least `@method`, `@target-uri` and, with a body, `content-digest`. Also cover `@authority`, `content-type` and `content-length` when practical.
4. Set parameters: `keyid` (MUST, full DID URL such as `did:wba:example.com:user:alice:e1_x#key-1`), `created` (MUST), `expires` (SHOULD), `nonce` (MAY; MUST be the server's nonce if it issued one), `alg` (optional; the verifier infers it from the key type).
5. Build the RFC 9421 signature base, sign it (Ed25519 for a Multikey Ed25519 key) and send `Signature`.

```http
POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Digest: sha-256=:BASE64_SHA256_DIGEST:
Signature-Input: sig1=("@method" "@target-uri" "@authority" "content-digest");created=1733402096;expires=1733402156;nonce="abc123";keyid="did:wba:example.com:user:alice:e1_x#key-1"
Signature: sig1=:BASE64_SIGNATURE:
```

ANP-02 § 4 carries the same metadata in JSON for transports that separate metadata from payload; it does not add signed fields.

## Verifying a request

ANP-02 § 3.2.1 and § 3.2.2, in order:

1. `Signature-Input` and `Signature` are present, plus `Content-Digest` when there is a body.
2. `Content-Digest` matches the body.
3. Extract `keyid`; derive the DID and verification method.
4. Resolve and validate the DID Document under its method (for did:wba, the full resolution above).
5. The key exists and is in `authentication`; apply method-specific binding checks.
6. Rebuild the signature base from the actual request and verify the signature.
7. `created` and `expires` are inside the window; 1 to 5 minutes is recommended.
8. Replay protection: cache `(keyid, nonce)` for longer than signatures live; a server-issued nonce is single-use.
9. Authorization is a separate check: an authenticated DID without permission gets `403 Forbidden`.
10. Any authentication failure gets `401 Unauthorized` with a challenge.

## Access tokens

ANP-02 § 3.2.3, § 7.

- After a successful signed request the server MAY issue a token, JWT recommended.
- It MUST be returned in the `Authentication-Info` response header, not `Authorization`, and only over HTTPS: `Authentication-Info: access_token="...", token_type="Bearer", expires_in=3600, scope="orders.read"`.
- The client sends `Authorization: Bearer <token>` afterwards. A non-Bearer `token_type` follows its own extension.
- Sender-constrained tokens are recommended but not yet profiled; IP address or User-Agent are only auxiliary risk signals.
- Tokens MUST have a reasonable expiry and be stored securely.

## Errors and challenges

ANP-02 § 3.2.4.

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: DIDWba realm="api.example.com", error="invalid_signature", error_description="Signature verification failed.", nonce="xyz987"
Accept-Signature: sig1=("@method" "@target-uri" "@authority" "content-digest");created;expires;nonce;keyid
Cache-Control: no-store
```

`error` is required and one of `invalid_request`, `invalid_nonce`, `invalid_timestamp`, `invalid_did`, `invalid_signature`, `invalid_verification_method`, `invalid_content_digest`, `invalid_access_token` or `forbidden_did`. A server MAY require its own nonce by answering the first request with a 401 carrying `nonce`. On a 401 the client re-signs, with the server's nonce if one came back, and both sides cap retries. `403` means authenticated but not permitted. did:wba adds `409 did_superseded`.

## Native did:web

ANP-02 Appendix B. A `did:web` DID uses the same request authentication without converting to did:wba: resolve under did:web, check `id`, check the key is in `authentication`, then verify the signature. did:wba's `e1_`, proof and lifecycle rules MUST NOT be required of did:web.

## Security and privacy checklist

- Generate nonces with the operating system's cryptographically secure random generator (ANP-02 § 7).
- Require HTTPS, verify the CA chain, and match the dNSName (ANP-02 § 7).
- Keep the `e1_` binding key in hardware isolation, an HSM or the system enclave where available (ANP-03 § 7).
- Use separate DIDs and key pairs per role or context to limit tracking and blast radius (ANP-02 § 6, § 7).
- Keep the keys that sign human-approved actions behind a local confirmation step; the server verifies policy, not that a human signed (ANP-02 § 5).
- Keep private keys and access tokens out of logs and storage that others can read, and refresh keys on a schedule (ANP-02 § 7).
