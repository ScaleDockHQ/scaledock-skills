# Statement, Envelope and Bundle

Read this when producing or parsing an in-toto attestation: the Statement, its subjects and digests, the DSSE Envelope that signs it, and the Bundle that groups several. Sources: the Attestation Framework v1.2.0 `spec/v1/` files (`README.md`, `statement.md`, `resource_descriptor.md`, `digest_set.md`, `field_types.md`, `predicate.md`, `envelope.md`, `bundle.md`) and DSSE v1.0.2 `protocol.md` and `envelope.md`, listed in [Sources](../SKILL.md#sources). Cites name the file and the heading.

## The four layers

An in-toto attestation is authenticated metadata about one or more software artifacts (spec README). It has four layers that are independent but designed to work together (spec README):

| Layer     | Job                                                                               | Defined in     |
| --------- | --------------------------------------------------------------------------------- | -------------- |
| Predicate | Arbitrary metadata about the subject, with a type-specific schema.                | `predicate.md` |
| Statement | Binds the attestation to subjects and identifies the predicate type.              | `statement.md` |
| Envelope  | Authentication and serialization. DSSE is the recommended format.                 | `envelope.md`  |
| Bundle    | Groups several attestations in one JSON Lines file. Not authenticated as a whole. | `bundle.md`    |

## Statement

```jsonc
{
  "_type": "https://in-toto.io/Statement/v1",
  "subject": [{ "name": "fooly.apk", "digest": { "sha256": "7f4714fd..." } }],
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {},
}
```

Fields (`statement.md`, Fields):

- `_type` (TypeURI, required): always `https://in-toto.io/Statement/v1` for v1.
- `subject` (array of ResourceDescriptor, required): the artifacts the attestation applies to, one element per artifact. Each element MUST have `digest` set. Subjects are assumed immutable and SHOULD NOT change. If set, `name` and `uri` SHOULD be unique within `subject`. If the name is not meaningful, leave it unset or use `"_"`.
- `predicateType` (TypeURI, required): identifies the predicate.
- `predicate` (object, optional): unset is treated the same as set-but-empty; MAY be omitted if `predicateType` fully describes the predicate.

Subject artifacts are matched purely by digest, regardless of content type (`statement.md`, Fields, `subject`).

## ResourceDescriptor

A size-efficient description of any artifact or resource (`resource_descriptor.md`). Fields: `name`, `uri`, `digest`, `content` (base64 bytes), `downloadLocation`, `mediaType`, `annotations`.

- All fields are optional, but a descriptor MUST specify at least one of `uri`, `digest` or `content`. A predicate can require more fields but cannot lift that minimum (Fields).
- `name` SHOULD be stable, such as a filename, so policies can rely on it (Fields, `name`).
- `digest`: when known, the producer SHOULD set it to denote an immutable artifact; producer and consumer SHOULD agree on acceptable algorithms (Fields, `digest`).
- `content` SHOULD be under 1 KB (Fields, `content`).
- `mediaType`: for non-standard types, follow RFC 6838 §§ 3.2–3.4 prefixes `x.`, `prs.` or `vnd.` (Fields, `mediaType`).
- `annotations`: any JSON values; follow the extension field naming conventions (Fields, `annotations`).
- A descriptor with a `digest` is assumed to be immutable. The predicate type decides which field the digest is matched against and SHOULD document it (Semantics).

## DigestSet

A JSON object mapping algorithm name to an encoded value (`digest_set.md`, Fields).

- Each entry MUST be an immutable reference to the artifact. A cryptographically secure digest is STRONGLY RECOMMENDED (Fields).
- Standard names are the NIST names, lowercase with `-` replaced by `_`, with lowercase hex values: `sha256`, `sha384`, `sha512`, `sha3_256`, `sha1`, `md5` and others (Supported algorithms).
- `dirHash1` digests a file tree (go module dirhash in hex); `gitCommit`, `gitTree`, `gitBlob` and `gitTag` are the 40-character SHA-1 or 64-character SHA-256 git object IDs (Supported algorithms).
- Use at least `sha256` unless another algorithm is more conventional, such as `gitCommit` for git (Guidelines).
- Consumers MUST accept only algorithms they consider secure and MUST ignore unrecognized or unaccepted ones; most applications SHOULD NOT accept `md5` (Guidelines).
- Two DigestSets SHOULD match if ANY acceptable field matches: `{"sha256": "abcd", "sha512": "1234"}` matches `{"sha256": "abcd"}` (Guidelines, Examples).
- New algorithms MUST document their value encoding (Guidelines). Since v1.1 a non-cryptographic immutable identifier, such as a cloud VM image ID (`{"arn": "arn:aws:ec2:..."}`), MAY be used when the mutation risk is acceptable, and since v1.2 its encoding is identifier-specific (Use cases for non-cryptographic, immutable, digests).

## Field types

From `field_types.md`:

- **TypeURI**: an RFC 3986 URI used as a collision-resistant type identifier. Case sensitive, case normalized (scheme and authority lowercase). SHOULD resolve to a human-readable description, SHOULD include a version number. Not registered.
- **ResourceURI**: an RFC 3986 URI that identifies or locates a resource, same normalization. Package URL (`pkg:`) or SPDX download locations (`git+https:`) are RECOMMENDED.
- **Timestamp**: RFC 3339 in UTC (`Z`), for example `1985-04-12T23:20:50.52Z`.

## Parsing rules

These apply to the Statement and to every predicate that opts in (`spec/v1/README.md`, Parsing rules):

- Consumers MUST ignore unrecognized fields unless the predicate says otherwise.
- Each type has a SemVer version and the TypeURI carries only the major version. 0.X versions count as major versions.
- Producers MAY add extension fields to any object, with names unlikely to collide and without `.` or `$`. Their presence or absence MUST NOT change the meaning of any other field, and they MUST follow the monotonic principle.
- **Monotonic principle**: ignoring an attestation, or a field in one, must never turn DENY into ALLOW. Consumers SHOULD write policies as "deny unless a 'no vulnerabilities' attestation exists", not "deny if a 'has vulnerabilities' attestation exists".

`versioning.md` adds that a message parsed as another minor version of the same major MUST mean the same thing, minus fields the older version lacks.

## Envelope

The RECOMMENDED format is DSSE v1.0 (`envelope.md`, Schema). Other formats MAY be used if they meet ITE-5: they MUST support multiple signatures, SHOULD authenticate the payload type, SHOULD avoid relying on canonicalization, SHOULD carry a key hint, SHOULD NOT require parsing the payload before verifying, and SHOULD NOT require the key algorithm in the signature. COSE_Sign meets ITE-5; COSE_Sign1 and the single-signature Sigstore Bundle do not (Alternative Envelope schemas).

```json
{
  "payloadType": "application/vnd.in-toto+json",
  "payload": "<base64 of the Statement JSON>",
  "signatures": [{ "keyid": "<KEYID>", "sig": "<base64 signature>" }]
}
```

Framework requirements (`envelope.md`, Fields):

- `signatures` is REQUIRED and is an array; a `keyid` SHOULD be included for each key.
- `payloadType` MUST be signed with the `payload`.
- With DSSE, `payloadType` MUST be `application/vnd.in-toto+json` or, since v1.2, `application/vnd.in-toto.<predicate>+json`, where `<predicate>` MUST be the predicate specification filename without extension (for example `provenance`). The predicate version is not in the media type.
- Consumers SHOULD rely only on `predicateType` in the Statement, not on the media type, and MUST parse and verify the `payload` to get authenticated predicate information.
- `payload` MUST be a base64-encoded JSON Statement.

DSSE rules (DSSE `protocol.md` and `envelope.md`):

- The signature is `Sign(PAE(UTF8(payloadType), payload_bytes))`, with `PAE(type, body) = "DSSEv1" SP LEN(type) SP type SP LEN(body) SP body`, where LEN is the decimal byte length (Signature Definition).
- `payload`, `payloadType`, `signatures` and `signatures[].sig` are REQUIRED and MUST be set, even if empty; `keyid` is OPTIONAL; consumers MUST ignore unrecognized fields (envelope Parsing rules).
- Signers may use standard or URL-safe base64; verifiers MUST accept both (Protocol).
- `keyid` is an unauthenticated hint. It MUST NOT be used for security decisions, only to narrow the keys to try (Signature Definition).
- Implementations MUST pass to the application the same payload bytes they verified, and MUST NOT re-parse the envelope after verification to pull out the payload (Protocol; envelope Security considerations).
- A `(t, n)` envelope is valid if signatures verify against at least `t` unique trusted keys (Multi-signature Verification).

### Naming and media types

- An Envelope stored alone SHOULD use the `.json` suffix. For `in-toto-verify`, name it `<step-name>.json`; with several functionaries, `<step/env-name>.<keyid[0:8]>.json` (`envelope.md`, File naming convention).
- In storage systems, an individual attestation SHOULD use `application/vnd.in-toto.<predicate>+dsse`, for example `application/vnd.in-toto.provenance+dsse` or `application/vnd.in-toto.vsa+dsse` (`envelope.md`, Storage convention).

## Bundle

JSON Lines, one attestation per line (`bundle.md`, Data structure):

- Lines MAY differ in signing key, `_type`, `subject` and `predicateType`. Each line SHOULD be an Envelope; consumers MUST ignore unrecognized lines and attestations with unrecognized keys, types, subjects or predicates.
- Processing MUST NOT depend on order.
- The suffix SHOULD be `.intoto.jsonl`, and a bundle for `<filename>` SHOULD be `<filename>.intoto.jsonl` (File naming convention).
- The media type SHOULD be `application/vnd.in-toto.bundle`, with no encoding or predicate type in it; consumers MUST parse each line separately to get authenticated information (Storage convention).
- The Bundle is not authenticated as a whole: an attacker might delete, replay or inject attestations. Monotonic predicates are not hurt by deletion (Bundle layer specification).

## Common mistakes

- Putting the predicate URI with a minor version into `predicateType`. The TypeURI carries the major version only (`versioning.md`).
- Using `application/json` as the DSSE `payloadType`. DSSE says it SHOULD be application-specific (DSSE `protocol.md`), and in-toto requires one of its two values (`envelope.md`).
- Matching a subject by `name` alone. Matching is by digest (`statement.md`).
- Selecting a key by `keyid` and trusting it without verifying the signature (DSSE `protocol.md`).
- Decoding `payload` a second time from the raw file after verifying. Use the verified bytes (DSSE `protocol.md`).
