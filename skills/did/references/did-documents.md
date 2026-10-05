# DID documents and representations

Read this when writing, validating or consuming a DID document: its properties, verification methods, verification relationships and services, and its JSON or JSON-LD serialization and media type. Sources: DID 1.0 § 4 to § 6, DID 1.1 § 4 to § 6, Controlled Identifiers v1.0 (CID) § 2 and § 3, and DID Extensions Properties, listed in [Sources](../SKILL.md#sources).

## Data model

A DID document is a map of entries; all keys are strings, and values use these types: map, list, set, datetime, string, integer, double, boolean, null (DID 1.0 § 4, DID 1.1 § 4). Lists, maps and sets are ordered as Infra structures, but unless stated otherwise their order is not significant and implementations are not expected to produce or consume deterministic order (DID 1.1 § 4).

Extensibility (DID 1.0 § 4.1, DID 1.1 § 4.1):

- For maximum interoperability it is RECOMMENDED that extensions use the DID Extensions (DID 1.1) or DID Specification Registries (DID 1.0) mechanism; it is the only specified mechanism that keeps two representations working together.
- Representations MAY define other extension mechanisms, which SHOULD support lossless conversion into any other conformant representation.
- Unregistered extensions agreed out of band are less reliable for interoperability with the wider ecosystem.

## Core properties

| Property               | Required | Value (DID 1.0)                                                      | DID 1.1 difference                                            |
| ---------------------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| `id`                   | yes      | A string conforming to DID syntax, in the root map (§ 5.1.1).        | Same (DID 1.1 § 5.1.1, CID § 2.1.1).                          |
| `controller`           | no       | A string or set of strings conforming to DID syntax (§ 5.1.2).       | Same (DID 1.1 § 5.1.2).                                       |
| `alsoKnownAs`          | no       | A set of URIs per RFC 3986 (§ 5.1.3).                                | Each item conforms to URL syntax or DID syntax (DID 1.1 § 5). |
| `verificationMethod`   | no       | A set of verification method maps (§ 5.2).                           | Defined by CID § 2.2 with DID restrictions (DID 1.1 § 5.2).   |
| `authentication`       | no       | A set of embedded verification methods or DID URL strings (§ 5.3.1). | CID § 2.3.1.                                                  |
| `assertionMethod`      | no       | Same shape (§ 5.3.2).                                                | CID § 2.3.2.                                                  |
| `keyAgreement`         | no       | Same shape (§ 5.3.3).                                                | CID § 2.3.3.                                                  |
| `capabilityInvocation` | no       | Same shape (§ 5.3.4).                                                | CID § 2.3.4.                                                  |
| `capabilityDelegation` | no       | Same shape (§ 5.3.5).                                                | CID § 2.3.5.                                                  |
| `service`              | no       | A set of service maps (§ 5.4).                                       | CID § 2.1.4 with DID restrictions (DID 1.1 § 5.4).            |

The only required property is `id`, so it is the only statement guaranteed to be in a DID document (DID 1.0 App. B.5, DID 1.1 App. B.5). `id`, `type` and `controller` appear in maps of different types with different constraints: the top-level `id` must be a DID, while a service `id` can be a URL (DID 1.1 § 5 note).

### `id`

The value MUST be a string conforming to DID syntax and MUST exist in the root map (DID 1.0 § 5.1.1). It denotes the DID subject only at the top level. Intermediate documents built during registration or resolution may lack it, but the fully resolved DID document always contains a valid `id` (DID 1.0 § 5.1.1 note, DID 1.1 § 5.1.1 note).

### `controller`

OPTIONAL. If present, a string or set of strings conforming to DID syntax. Verification methods in the controllers' DID documents SHOULD be accepted as authoritative, so proofs satisfying them count as proofs from the DID subject (DID 1.0 § 5.1.2). Authorization through `controller` is separate from `authentication` (DID 1.0 § 5.1.2 note). How a controller is authorized to make changes is defined by the DID method (DID 1.0 § 5.1.2, DID 1.1 § 5.1.2).

### `alsoKnownAs`

OPTIONAL. A statement that the subject is also identified by other identifiers. It does not prove the claim: treat two identifiers as equivalent only if the relationship is reciprocated, and obtain independent verification (DID 1.0 § 5.1.3 note, DID 1.1 § 8.9).

## Verification methods

From DID 1.0 § 5.2 and § 5.2.1:

- `verificationMethod`, if present, MUST be a set of maps. Each map MUST include `id`, `type`, `controller` and the verification material properties its `type` defines, and MAY include more properties.
- `id` MUST conform to DID URL syntax. DID 1.1 also allows a relative DID URL (DID 1.1 § 5.2).
- `type` MUST be a string that references exactly one verification method type. Types SHOULD be registered in the DID Specification Registries (DID 1.0) or DID Extensions.
- `controller` MUST be a string conforming to DID syntax (DID 1.0 § 5.2, DID 1.1 § 5.2). It names the key's controller, which is not necessarily the DID controller.
- A verification method MUST NOT contain multiple verification material properties for the same material, for example both `publicKeyJwk` and `publicKeyMultibase` (DID 1.0 § 5.2.1, CID § 2.2.1).

Verification material:

- **`publicKeyJwk`** (DID 1.0 § 5.2.1, CID § 2.2.3): a map that MUST conform to RFC 7517 and MUST NOT contain `d` or any other private-class member. It is RECOMMENDED to use the JWK `kid` as the fragment of the verification method `id`, and to set `kid` to the JWK thumbprint (RFC 7638; CID adds SHA-256). CID adds that `alg` SHOULD be included and a present `kid` SHOULD match or be included in the verification method `id`.
- **`publicKeyMultibase`** (DID 1.0 § 5.2.1, CID § 2.2.2): a Multibase-encoded public key string. DID 1.0 marks this feature non-normative and warns that Multibase is not yet a standard. CID defines the `Multikey` encoding: a multicodec header plus key bytes, base58-btc, prefixed with `z` (for Ed25519 the header is `0xed01` followed by the 32-byte key).
- **Secret material** (CID § 2.2.2, § 2.2.3): `secretKeyMultibase` and `secretKeyJwk` exist in CID, and `secretKeyJwk` MUST NOT be used where the data may be revealed to anyone but the key holder. Never put either in a DID document.
- DID 1.1 uses the CID types `Multikey` (type value `Multikey`) and `JsonWebKey` (type value `JsonWebKey`) (CID § 2.2.2, § 2.2.3; DID 1.1 App. A). DID 1.0 examples use suite-specific types such as `JsonWebKey2020` and `Ed25519VerificationKey2020`; DID Extensions Properties § 3.1 lists registered types including `JsonWebKey2020`, `Ed25519VerificationKey2018` and `X25519KeyAgreementKey2019`. `publicKeyBase58` and `publicKeyHex` are deprecated in favour of `publicKeyMultibase` or `publicKeyJwk`, but still needed to read older suites (DID Extensions Properties § 2.3.2, § 2.3.3).

Embedding and referencing (DID 1.0 § 5.2.2): a relationship entry that is a map embeds the method and may only be used for that relationship; a URL string references a method elsewhere in this or another DID document, found by dereferencing the URL and matching `id`.

## Verification relationships

A verification method is usable for a purpose only if it appears in that relationship; it is up to the verifier to check that the method used is in the appropriate relationship (DID 1.0 § 5.3). Each relationship is OPTIONAL and, if present, MUST be a set of one or more verification methods, each embedded or referenced (DID 1.0 § 5.3.1 to § 5.3.5).

| Relationship           | Use (DID 1.0 § 5.3)                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `authentication`       | Authenticate the DID subject, for example login or challenge-response.               |
| `assertionMethod`      | Express claims, for example issuing a Verifiable Credential.                         |
| `keyAgreement`         | Generate encryption material to send confidential data to the subject.               |
| `capabilityInvocation` | Invoke a cryptographic capability, such as authorization to update the DID document. |
| `capabilityDelegation` | Delegate a cryptographic capability to another party.                                |

Further rules:

- A key in `authentication` cannot be used for key agreement; use `keyAgreement` (DID 1.0 § 5.3).
- Revoked keys are not expressed with a relationship: a referenced method that is not in the latest DID document used to dereference it is considered invalid or revoked (DID 1.0 § 5.3; CID § 2.3).
- `authentication` authenticates only the DID subject. A different DID controller authenticates with its own DID document (DID 1.0 § 5.3.1).
- What follows a successful authentication (for example whether it permits an update) is up to the DID method or application (DID 1.0 § 5.3.1).
- Other relationship properties MAY be used and SHOULD be registered (DID 1.0 § 5.3).
- Using the same verification method for multiple purposes is best avoided (DID 1.1 App. A.1 note).

### Retrieving a verification method safely

When a proof names a verification method, retrieve it with the CID § 3.3 algorithm (DID 1.1 builds on it; DID Resolution § 5.4.2 applies the relationship check when the `verificationRelationship` dereferencing option is set). An error MUST be raised when:

1. The verification method identifier is not a valid URL.
2. The dereferenced document is not a conforming document, or its `id` does not match the identifier without the fragment.
3. The fragment does not lead to a conforming verification method.
4. The method's absolute `id` does not equal the identifier, or its absolute `controller` does not equal the document URL.
5. The method is not associated, by reference or by value, with the requested verification relationship.

Skipping these checks can let an attacker poison a cache by claiming control of a victim's verification method (CID § 3.3 note).

## Services

From DID 1.0 § 5.4 (DID 1.1 § 5.4 and CID § 2.1.4 carry the same structure):

- `service`, if present, MUST be a set of maps; each MUST contain `id`, `type` and `serviceEndpoint`, and MAY contain more properties.
- `id` MUST be a URI (DID 1.0) or a URL Standard URL or DID (DID 1.1 § 5, Service properties). A producer MUST NOT produce two services with the same `id`, and a consumer MUST produce an error if it detects them (DID 1.0 § 5.4; CID § 2.1.4).
- `type` MUST be a string or set of strings; the type and its properties SHOULD be registered.
- `serviceEndpoint` MUST be a string, a map, or a set of strings and maps. DID 1.0: strings MUST be RFC 3986 URIs normalized per RFC 3986 and the scheme. DID 1.1: each string MUST be a valid URL Standard URL.
- Revealing public information such as social media accounts, personal websites and email addresses through services is discouraged (DID 1.0 § 5.4); see [`security-and-privacy.md`](security-and-privacy.md).
- Registered service types include `LinkedDomains`, `LinkedVerifiablePresentation`, `DIDCommMessaging`, and OpenID4VCI and OpenID4VP entries (DID Extensions Properties § 3.2).

## Representations

### Rules for every representation, producer and consumer

From DID 1.0 § 6.1 (DID 1.1 § 6.1 is the same):

- A representation MUST define deterministic production and consumption rules for all data model types, MUST be uniquely associated with an IANA-registered media type, and MUST define fragment processing rules consistent with DID fragments.
- A conforming producer MUST serialize all data model entries and representation-specific entries without explicit rules using the representation's type rules, MUST return the media type string, and MUST NOT produce non-conforming DIDs or DID documents.
- A conforming consumer MUST determine the representation from the media type string, MUST put representation-specific entries (such as `@context`) into a separate map, MUST add the rest to the data model, and MUST produce errors when consuming non-conforming DIDs or DID documents.
- To convert between representations, consume into the data model and produce the target (DID 1.1 § 6.1 note).

### JSON

- Datetimes serialize as XML datetime strings normalized to UTC without sub-second precision, for example `2020-12-20T19:17:47Z`; integers without a fraction; doubles with one (DID 1.0 § 6.2.1, DID 1.1 § 6.2.1).
- All entries MUST be in the root JSON object (DID 1.0 § 6.2.1).
- A consumer that receives the DID media type MUST treat the root as a JSON object whose members are document entries, and MUST report an error if the root is not an object (DID 1.0 § 6.2.2, DID 1.1 § 6.2.2).
- Media type: DID 1.0 producers MUST specify `application/did+json` (DID 1.0 § 6.2.1); DID 1.1 producers MUST specify `application/did` (DID 1.1 § 6.2.1).

### JSON-LD

- DID 1.0: production MUST include `@context`, whose value MUST be `https://www.w3.org/ns/did/v1` or an array whose first item is that string; the producer MUST specify `application/did+ld+json` (DID 1.0 § 6.3.1). Consumption uses the JSON rules (DID 1.0 § 6.3.2).
- DID 1.1: for JSON-LD processing to occur `@context` MUST be present; production MUST include it with first value `https://www.w3.org/ns/did/v1.1`; the producer MUST specify `application/did` (DID 1.1 § 6.2.3). Semantics are the same with or without JSON-LD processing; a difference is an implementation or method error (DID 1.1 § 6.2.3).
- Both: producers SHOULD NOT emit terms not defined by the `@context`, and consumers SHOULD drop such terms; contexts and terms SHOULD be registered (DID 1.0 § 6.3.1, § 6.3.2; DID 1.1 § 6.2.3).
- DID 1.1: implementations MUST treat the `v1.1` base context as already retrieved; its SHA2-256 digest is `ea216ecc1cb02cd39b693dba2250141e270ba0bf95890be107dd9a9e8e43de85` (DID 1.1 § 6.2.4). For DID 1.0, cache contexts locally or check them against a known hash (DID 1.0 § 9.15).

### Media types

| Media type                | Defined by                | IANA registry (2026-09-24) |
| ------------------------- | ------------------------- | -------------------------- |
| `application/did`         | DID 1.1 § 6.3, App. E.1   | registered                 |
| `application/did+json`    | DID 1.0 § 6.2.1, App. E.1 | not listed                 |
| `application/did+ld+json` | DID 1.0 § 6.3.1, App. E.2 | not listed                 |

Lower-precision media types happen: servers default to `application/json` or `text/plain`, or a protocol requires `application/json`. DID 1.1 § 6.3.1 discourages raising errors when the intended type can be determined: parse as JSON, check that the first `@context` item is `https://www.w3.org/ns/did/v1.1`, and assume `application/did` if the top-level `id` is a valid DID. Receivers still check conformance whatever the label says.

## Examples

DID 1.0, JSON-LD:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [
    {
      "id": "did:example:123456789abcdefghi#keys-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:example:123456789abcdefghi",
      "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
  "authentication": ["did:example:123456789abcdefghi#keys-1"],
  "assertionMethod": ["did:example:123456789abcdefghi#keys-1"],
  "service": [
    {
      "id": "did:example:123456789abcdefghi#linked-domain",
      "type": "LinkedDomains",
      "serviceEndpoint": "https://bar.example.com"
    }
  ]
}
```

DID 1.1 (preview), `application/did`, with a relative reference:

```json
{
  "@context": "https://www.w3.org/ns/did/v1.1",
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [
    {
      "id": "did:example:123456789abcdefghi#key-1",
      "type": "Multikey",
      "controller": "did:example:123456789abcdefghi",
      "publicKeyMultibase": "z6MkmM42vxfqZQsv4ehtTjFFxQ4sQKS2w6WR7emozFAn5cxu"
    }
  ],
  "authentication": ["#key-1"]
}
```

## Validation checklist

- [ ] Root is a JSON object with a top-level `id` that parses as a DID (no `?` or `#`).
- [ ] The `@context` first item matches the line: `https://www.w3.org/ns/did/v1` for DID 1.0, `https://www.w3.org/ns/did/v1.1` for DID 1.1.
- [ ] Every verification method has `id`, `type`, `controller` and exactly one form of key material; no `d` or secret key members.
- [ ] Every relationship entry is an embedded method or a (possibly relative) DID URL that dereferences to a method in the document or another DID document.
- [ ] Service `id` values are unique; every `serviceEndpoint` string is a valid URI (DID 1.0) or URL (DID 1.1).
- [ ] The media type matches the line and representation.

## Common mistakes

- Including `"d"` in `publicKeyJwk`, or shipping `secretKeyMultibase` in a published document.
- Giving one verification method both `publicKeyJwk` and `publicKeyMultibase`.
- Accepting a signature from a key that is in `verificationMethod` but not in the relationship the proof claims.
- Trusting `alsoKnownAs` as proof that two identifiers belong to the same subject.
- Labelling a DID 1.1 document `application/did+ld+json`, or a DID 1.0 document with the `v1.1` context.
- Fetching JSON-LD contexts from the network on every request instead of using pinned, hash-checked copies.
